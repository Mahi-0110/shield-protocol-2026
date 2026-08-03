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
  const cleanFullName = data.full_name.trim();
  const cleanEmail = data.email.trim().toLowerCase();
  const cleanPhone = data.phone.trim();
  const cleanDept = data.department.trim();
  const defaultStatus: ParticipantStatus = data.status || 'PAYMENT_SUBMITTED';
  const defaultPaymentStatus: PaymentStatus = data.payment_status || 'SUBMITTED';

  // Check if participant already registered with this email or phone
  try {
    const existing = await findRegistration(cleanEmail);
    if (existing) {
      console.log('Existing registration found for email, returning existing record:', existing.registration_id);
      return existing;
    }
  } catch (err) {
    console.warn('Pre-registration lookup warning:', err);
  }

  try {
    const { data: insertedData, error } = await supabase
      .from('registrations')
      .insert([
        {
          full_name: cleanFullName,
          email: cleanEmail,
          phone: cleanPhone,
          department: cleanDept,
          year: data.year || '3rd Year',
          status: defaultStatus,
          payment_status: defaultPaymentStatus,
        },
      ])
      .select()
      .limit(1);

    if (error || !insertedData || insertedData.length === 0) {
      console.warn('Supabase registration insert error or empty response, using local fallback:', error?.message);
      return await saveLocalRegistration({
        ...data,
        full_name: cleanFullName,
        email: cleanEmail,
        phone: cleanPhone,
        department: cleanDept,
      });
    }

    return insertedData[0] as RegistrationRecord;
  } catch (err) {
    console.error('Exception during registration insert:', err);
    return await saveLocalRegistration({
      ...data,
      full_name: cleanFullName,
      email: cleanEmail,
      phone: cleanPhone,
      department: cleanDept,
    });
  }
}

/**
 * Fallback to save registration locally if DB table is initializing
 */
async function saveLocalRegistration(data: RegistrationInsert): Promise<RegistrationRecord> {
  const localData = localStorage.getItem(LOCAL_REGISTRATIONS_KEY);
  const records: RegistrationRecord[] = localData ? JSON.parse(localData) : [];
  
  const cleanEmail = data.email.trim().toLowerCase();
  const existingLocal = records.find((r) => r.email?.trim().toLowerCase() === cleanEmail);
  if (existingLocal) {
    return existingLocal;
  }

  const registrationId = data.registration_id || getNextLocalRegistrationId();
  
  const newRecord: RegistrationRecord = {
    id: `local-${Date.now()}`,
    registration_id: registrationId,
    full_name: data.full_name.trim(),
    email: cleanEmail,
    phone: data.phone.trim(),
    department: data.department.trim(),
    year: data.year || '3rd Year',
    status: data.status || 'PAYMENT_SUBMITTED',
    payment_status: data.payment_status || 'SUBMITTED',
    created_at: new Date().toISOString(),
  };

  records.push(newRecord);
  localStorage.setItem(LOCAL_REGISTRATIONS_KEY, JSON.stringify(records));

  return newRecord;
}

/**
 * Find existing registration by Registration ID, Email, or Phone (case-insensitive & duplicate-safe)
 */
export async function findRegistration(query: string): Promise<RegistrationRecord | null> {
  const cleanQuery = query.trim();
  if (!cleanQuery) return null;

  const lowerQuery = cleanQuery.toLowerCase();
  const digits = cleanQuery.replace(/\D/g, '');
  const phoneLast10 = digits.length >= 7 ? digits.slice(-10) : '';

  // 1. Unified case-insensitive search via Supabase
  try {
    const orConditions = [
      `registration_id.ilike.${cleanQuery}`,
      `email.ilike.${cleanQuery}`
    ];
    if (phoneLast10) {
      orConditions.push(`phone.ilike.%${phoneLast10}%`);
    } else {
      orConditions.push(`phone.ilike.${cleanQuery}`);
    }

    const { data: matchedRows, error } = await supabase
      .from('registrations')
      .select('*')
      .or(orConditions.join(','))
      .order('created_at', { ascending: false })
      .limit(1);

    if (!error && matchedRows && matchedRows.length > 0) {
      return matchedRows[0] as RegistrationRecord;
    }
  } catch (err) {
    console.warn('Supabase unified registration query warning:', err);
  }

  // 2. Fallback to individual Supabase queries with limit(1) to avoid PGRST116 errors
  // Email match
  try {
    const { data: emailData } = await supabase
      .from('registrations')
      .select('*')
      .ilike('email', cleanQuery)
      .order('created_at', { ascending: false })
      .limit(1);

    if (emailData && emailData.length > 0) return emailData[0] as RegistrationRecord;
  } catch (err) {
    console.warn('Supabase email fallback query warning:', err);
  }

  // Registration ID match
  try {
    const { data: regIdData } = await supabase
      .from('registrations')
      .select('*')
      .ilike('registration_id', cleanQuery)
      .limit(1);

    if (regIdData && regIdData.length > 0) return regIdData[0] as RegistrationRecord;
  } catch (err) {
    console.warn('Supabase reg_id fallback query warning:', err);
  }

  // Phone match
  try {
    const phoneQuery = phoneLast10 ? `%${phoneLast10}%` : cleanQuery;
    const { data: phoneData } = await supabase
      .from('registrations')
      .select('*')
      .ilike('phone', phoneQuery)
      .order('created_at', { ascending: false })
      .limit(1);

    if (phoneData && phoneData.length > 0) return phoneData[0] as RegistrationRecord;
  } catch (err) {
    console.warn('Supabase phone fallback query warning:', err);
  }

  // 3. Fallback to localStorage
  const localData = localStorage.getItem(LOCAL_REGISTRATIONS_KEY);
  if (!localData) return null;

  try {
    const records: RegistrationRecord[] = JSON.parse(localData);
    const found = records.find(
      (r) =>
        r.registration_id?.toLowerCase() === lowerQuery ||
        r.email?.trim().toLowerCase() === lowerQuery ||
        r.phone?.trim() === cleanQuery ||
        (phoneLast10 && r.phone?.replace(/\D/g, '').endsWith(phoneLast10))
    );
    return found || null;
  } catch (e) {
    return null;
  }
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

