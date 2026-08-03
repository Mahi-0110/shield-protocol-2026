import { supabase } from './supabase';
import { PaymentRecord, PaymentInsert, RegistrationRecord } from '../types/database';
import { uploadPaymentProof } from './storageService';
import { updateRegistrationStatus, findRegistration, createRegistration } from './registrationService';

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
 * SUBMIT PAYMENT DETAILS (UPI / Proof Upload)
 */
export async function submitPayment(input: PaymentSubmissionInput): Promise<{ payment: PaymentRecord; registrationId: string }> {
  const cleanEmail = input.email.trim().toLowerCase();
  const cleanPhone = input.phone.trim();
  const cleanUtr = input.transactionId.trim();

  // 1. Find existing registration or auto-create one
  let registration: RegistrationRecord | null = null;
  if (input.registrationId) {
    registration = await findRegistration(input.registrationId.trim());
  }

  if (!registration && cleanEmail) {
    registration = await findRegistration(cleanEmail);
  }

  if (!registration && cleanPhone) {
    registration = await findRegistration(cleanPhone);
  }

  if (!registration) {
    registration = await createRegistration({
      full_name: 'Participant',
      email: cleanEmail,
      phone: cleanPhone,
      department: 'General',
    });
  }

  const registrationId = registration.registration_id;
  const participantEmail = registration.email || cleanEmail;
  const participantPhone = registration.phone || cleanPhone;

  // 2. Upload screenshot proof if provided
  let screenshotUrl = input.screenshotUrl || '';
  if (input.screenshotFile) {
    const uploadedUrl = await uploadPaymentProof(input.screenshotFile, registrationId);
    if (uploadedUrl) {
      screenshotUrl = uploadedUrl;
    }
  }

  // 3. Insert payment record
  const paymentPayload: PaymentInsert = {
    registration_id: registrationId,
    participant_email: participantEmail,
    participant_phone: participantPhone,
    utr_number: cleanUtr,
    amount: input.amount,
    payment_date: input.paymentDate,
    payment_screenshot: screenshotUrl,
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
    id: `pay-${Date.now()}`,
    registration_id: data.registration_id,
    participant_email: data.participant_email,
    participant_phone: data.participant_phone,
    utr_number: data.utr_number,
    amount: data.amount,
    payment_date: data.payment_date,
    payment_screenshot: data.payment_screenshot,
    verification_status: data.verification_status || 'PENDING',
    created_at: new Date().toISOString(),
  };

  records.push(newRecord);
  localStorage.setItem(LOCAL_PAYMENTS_KEY, JSON.stringify(records));
  return newRecord;
}
