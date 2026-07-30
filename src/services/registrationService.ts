import { supabase } from './supabase';
import { ParticipantStatus, PaymentStatus, RegistrationRecord } from '../types/database';

export interface RegistrationInsert {
  full_name: string;
  email: string;
  phone: string;
  department: string;
  year?: string;
  status?: ParticipantStatus;
  payment_status?: PaymentStatus;
  registration_id?: string;
}

const LOCAL_REGISTRATIONS_KEY = 'shield_protocol_registrations';
const LOCAL_ID_COUNTER_KEY = 'shield_protocol_id_counter';

/**
 * Generate sequential registration ID (e.g. SP2026-000001)
 */
export function getNextLocalRegistrationId(): string {
  const currentCounter = localStorage.getItem(LOCAL_ID_COUNTER_KEY);
  const nextNumber = currentCounter ? parseInt(currentCounter, 10) + 1 : 1;
  localStorage.setItem(LOCAL_ID_COUNTER_KEY, nextNumber.toString());
  return `SP2026-${nextNumber.toString().padStart(6, '0')}`;
}

/**
 * CREATE REGISTRATION
 */
export async function createRegistration(data: RegistrationInsert): Promise<RegistrationRecord> {
  const defaultStatus: ParticipantStatus = data.status || 'PARTIAL';
  const defaultPaymentStatus: PaymentStatus = data.payment_status || 'PENDING';

  try {
    const { data: insertedData, error } = await supabase
      .from('registrations')
      .insert([
        {
          full_name: data.full_name,
          email: data.email,
          phone: data.phone,
          department: data.department,
          year: data.year,
          status: defaultStatus,
          payment_status: defaultPaymentStatus,
        },
      ])
      .select()
      .single();

    if (error) {
      console.warn('Supabase registration insert error, using local fallback:', error.message);
      return await saveLocalRegistration(data);
    }

    return insertedData as RegistrationRecord;
  } catch (err) {
    console.error('Exception during registration insert:', err);
    return await saveLocalRegistration(data);
  }
}

/**
 * Fallback to save registration locally if DB table is initializing
 */
async function saveLocalRegistration(data: RegistrationInsert): Promise<RegistrationRecord> {
  const localData = localStorage.getItem(LOCAL_REGISTRATIONS_KEY);
  const records: RegistrationRecord[] = localData ? JSON.parse(localData) : [];
  
  const registrationId = data.registration_id || getNextLocalRegistrationId();
  
  const newRecord: RegistrationRecord = {
    id: `local-${Date.now()}`,
    registration_id: registrationId,
    full_name: data.full_name,
    email: data.email,
    phone: data.phone,
    department: data.department,
    year: data.year || '4th Year',
    status: data.status || 'PARTIAL',
    payment_status: data.payment_status || 'PENDING',
    created_at: new Date().toISOString(),
  };

  records.push(newRecord);
  localStorage.setItem(LOCAL_REGISTRATIONS_KEY, JSON.stringify(records));

  return newRecord;
}

/**
 * Find existing registration by Registration ID, Email, or Phone
 */
export async function findRegistration(query: string): Promise<RegistrationRecord | null> {
  const cleanQuery = query.trim();
  if (!cleanQuery) return null;

  try {
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .or(`registration_id.eq.${cleanQuery},email.eq.${cleanQuery},phone.eq.${cleanQuery}`)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!error && data) {
      return data;
    }
  } catch (err) {
    console.warn('Error querying Supabase registration:', err);
  }

  // Fallback to localStorage
  const localData = localStorage.getItem(LOCAL_REGISTRATIONS_KEY);
  if (!localData) return null;

  const records: RegistrationRecord[] = JSON.parse(localData);
  const found = records.find(
    (r) =>
      r.registration_id.toLowerCase() === cleanQuery.toLowerCase() ||
      r.email.toLowerCase() === cleanQuery.toLowerCase() ||
      r.phone === cleanQuery
  );

  return found || null;
}

/**
 * Update registration status
 */
export async function updateRegistrationStatus(
  registrationId: string,
  status: ParticipantStatus,
  paymentStatus: PaymentStatus
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('registrations')
      .update({ status, payment_status: paymentStatus })
      .eq('registration_id', registrationId);

    if (error) {
      console.warn('Supabase registration status update error:', error.message);
      updateLocalRegistrationStatus(registrationId, status, paymentStatus);
    } else {
      updateLocalRegistrationStatus(registrationId, status, paymentStatus);
    }
    return true;
  } catch (err) {
    console.error('Exception updating registration status:', err);
    updateLocalRegistrationStatus(registrationId, status, paymentStatus);
    return true;
  }
}

function updateLocalRegistrationStatus(
  registrationId: string,
  status: ParticipantStatus,
  paymentStatus: PaymentStatus
) {
  const localData = localStorage.getItem(LOCAL_REGISTRATIONS_KEY);
  if (!localData) return;

  const records: RegistrationRecord[] = JSON.parse(localData);
  const index = records.findIndex((r) => r.registration_id === registrationId);

  if (index !== -1) {
    records[index].status = status;
    records[index].payment_status = paymentStatus;
    localStorage.setItem(LOCAL_REGISTRATIONS_KEY, JSON.stringify(records));
  }
}
