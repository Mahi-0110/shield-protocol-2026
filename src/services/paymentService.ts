import { supabase } from './supabase';
import { PaymentRecord, PaymentInsert } from '../types/database';
import { uploadPaymentProof } from './storageService';
import { updateRegistrationStatus, findRegistration, createRegistration } from './registrationService';
import { sendPaymentSubmittedEmail } from './emailService';

const LOCAL_PAYMENTS_KEY = 'shield_protocol_payments';

export interface PaymentSubmissionInput {
  email: string;
  phone: string;
  transactionId: string;
  amount: number;
  paymentDate: string;
  screenshotFile?: File;
  screenshotUrl?: string;
  registrationId?: string;
}

/**
 * Submit manual UPI payment transaction and screenshot proof to Supabase
 */
export async function submitPayment(input: PaymentSubmissionInput): Promise<{ payment: PaymentRecord; registrationId: string }> {
  // 1. Locate or create registration record to ensure valid registration_id reference
  let registration = await findRegistration(input.registrationId || input.email);

  if (!registration) {
    // Auto-create registration if participant directly submitted payment
    registration = await createRegistration({
      full_name: 'Participant',
      email: input.email,
      phone: input.phone,
      college: 'Registered via Payment Portal',
      department: 'N/A',
      year: '2026',
      status: 'PAYMENT_SUBMITTED',
      payment_status: 'SUBMITTED',
    });
  }

  const registrationId = registration.registration_id;

  // 2. Upload screenshot proof image to Supabase Storage
  let imageUrl = input.screenshotUrl || '';
  if (input.screenshotFile) {
    imageUrl = await uploadPaymentProof(input.screenshotFile, registrationId);
  }

  // 3. Insert payment record into Supabase payments table
  const paymentPayload: PaymentInsert = {
    registration_id: registrationId,
    participant_email: input.email,
    participant_phone: input.phone,
    utr_number: input.transactionId,
    amount: input.amount,
    payment_date: input.paymentDate,
    payment_screenshot: imageUrl,
    verification_status: 'PENDING',
  };

  let paymentRecord: PaymentRecord;

  try {
    const { data: insertedData, error } = await supabase
      .from('payments')
      .insert([paymentPayload])
      .select()
      .single();

    if (error) {
      console.warn('Supabase payment insert warning, using local fallback:', error.message);
      paymentRecord = saveLocalPayment(paymentPayload);
    } else {
      paymentRecord = insertedData;
    }
  } catch (err) {
    console.error('Exception during payment insert:', err);
    paymentRecord = saveLocalPayment(paymentPayload);
  }

  // 4. Update registration statuses
  await updateRegistrationStatus(registrationId, 'PAYMENT_SUBMITTED', 'SUBMITTED');

  // 5. Trigger Email #2: Payment Submitted Successfully
  sendPaymentSubmittedEmail(input.email, registration.full_name, registrationId, input.transactionId).catch(console.error);

  return {
    payment: paymentRecord,
    registrationId,
  };
}

/**
 * Fallback local storage saver for payments
 */
function saveLocalPayment(data: PaymentInsert): PaymentRecord {
  const localData = localStorage.getItem(LOCAL_PAYMENTS_KEY);
  const records: PaymentRecord[] = localData ? JSON.parse(localData) : [];

  const newRecord: PaymentRecord = {
    id: `local-pay-${Date.now()}`,
    registration_id: data.registration_id,
    participant_email: data.participant_email,
    participant_phone: data.participant_phone,
    utr_number: data.utr_number,
    amount: data.amount,
    payment_date: data.payment_date,
    payment_screenshot: data.payment_screenshot,
    verification_status: 'PENDING',
    created_at: new Date().toISOString(),
  };

  records.push(newRecord);
  localStorage.setItem(LOCAL_PAYMENTS_KEY, JSON.stringify(records));
  return newRecord;
}
