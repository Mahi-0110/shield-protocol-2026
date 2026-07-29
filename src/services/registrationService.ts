import { supabase } from './supabase';
import { RegistrationRecord, RegistrationInsert, ParticipantStatus, PaymentStatus } from '../types/database';
import { sendRegistrationReceivedEmail } from './emailService';

// Local storage key fallback when database is initializing
const LOCAL_REGISTRATIONS_KEY = 'shield_protocol_registrations';

/**
 * Generate formatted Registration ID (SP2026-XXXXXX)
 */

function formatRegistrationId(counter: number): string {
  return `SP2026-${counter.toString().padStart(6, '0')}`;
}

/**
 * Get next fallback registration ID from localStorage
 */
function getNextLocalRegistrationId(): string {
  const localData = localStorage.getItem(LOCAL_REGISTRATIONS_KEY);
  const records: RegistrationRecord[] = localData ? JSON.parse(localData) : [];
  const counter = records.length + 1;
  return formatRegistrationId(counter);
}

/**
 * Create a new participant registration record in Supabase 'registrations' table
 */
export async function createRegistration(data: RegistrationInsert): Promise<RegistrationRecord> {
  const defaultStatus: ParticipantStatus = data.status || 'PARTIAL';
  const defaultPaymentStatus: PaymentStatus = data.payment_status || 'PENDING';

  try {
    // Insert into Supabase registrations table
    const { data: insertedData, error } = await supabase
      .from('registrations')
      .insert([
        {
          full_name: data.full_name,
          email: data.email,
          phone: data.phone,
          college: data.college,
          department: data.department,
          year: data.year,
          team_name: data.team_name || '',
          team_size: data.team_size || 1,
          status: defaultStatus,
          payment_status: defaultPaymentStatus,
        },
      ])
      .select()
      .single();

    if (error) {
      console.warn('Supabase registration insert error, using local fallback:', error.message);
      return saveLocalRegistration(data);
    }

    const record: RegistrationRecord = insertedData;

    // Send Email #1 asynchronously
    sendRegistrationReceivedEmail(record.email, record.full_name, record.registration_id).catch(console.error);

    return record;
  } catch (err) {
    console.error('Exception during registration insert:', err);
    return saveLocalRegistration(data);
  }
}

/**
 * Fallback to save registration locally if DB table is initializing
 */
function saveLocalRegistration(data: RegistrationInsert): RegistrationRecord {
  const localData = localStorage.getItem(LOCAL_REGISTRATIONS_KEY);
  const records: RegistrationRecord[] = localData ? JSON.parse(localData) : [];
  
  const registrationId = data.registration_id || getNextLocalRegistrationId();
  
  const newRecord: RegistrationRecord = {
    id: `local-${Date.now()}`,
    registration_id: registrationId,
    full_name: data.full_name,
    email: data.email,
    phone: data.phone,
    college: data.college,
    department: data.department,
    year: data.year,
    team_name: data.team_name || '',
    team_size: data.team_size || 1,
    status: data.status || 'PARTIAL',
    payment_status: data.payment_status || 'PENDING',
    created_at: new Date().toISOString(),
  };

  records.push(newRecord);
  localStorage.setItem(LOCAL_REGISTRATIONS_KEY, JSON.stringify(records));

  // Trigger Email #1
  sendRegistrationReceivedEmail(newRecord.email, newRecord.full_name, newRecord.registration_id).catch(console.error);

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
      .or(`registration_id.eq.${cleanQuery},email.ilike.${cleanQuery},phone.eq.${cleanQuery}`)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (data && !error) {
      return data as RegistrationRecord;
    }
  } catch (err) {
    console.warn('Error querying Supabase registration:', err);
  }

  // Fallback to localStorage
  const localData = localStorage.getItem(LOCAL_REGISTRATIONS_KEY);
  if (localData) {
    const records: RegistrationRecord[] = JSON.parse(localData);
    const match = records.find(
      (r) =>
        r.registration_id.toLowerCase() === cleanQuery.toLowerCase() ||
        r.email.toLowerCase() === cleanQuery.toLowerCase() ||
        r.phone === cleanQuery
    );
    if (match) return match;
  }

  return null;
}

/**
 * Update Registration Status
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

    if (!error) {
      updateLocalRegistrationStatus(registrationId, status, paymentStatus);
      return true;
    }
  } catch (err) {
    console.warn('Error updating Supabase registration status:', err);
  }

  updateLocalRegistrationStatus(registrationId, status, paymentStatus);
  return true;
}

function updateLocalRegistrationStatus(
  registrationId: string,
  status: ParticipantStatus,
  paymentStatus: PaymentStatus
) {
  const localData = localStorage.getItem(LOCAL_REGISTRATIONS_KEY);
  if (localData) {
    const records: RegistrationRecord[] = JSON.parse(localData);
    const index = records.findIndex((r) => r.registration_id === registrationId);
    if (index !== -1) {
      records[index].status = status;
      records[index].payment_status = paymentStatus;
      localStorage.setItem(LOCAL_REGISTRATIONS_KEY, JSON.stringify(records));
    }
  }
}
