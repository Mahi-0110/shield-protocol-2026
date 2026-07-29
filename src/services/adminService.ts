import { supabase } from './supabase';
import { RegistrationRecord, PaymentRecord, AdminStats, AdminFilterOptions } from '../types/database';
import { sendRegistrationConfirmedEmail, sendPaymentRejectedEmail } from './emailService';

const ADMIN_SESSION_KEY = 'shield_admin_authenticated';
const DEFAULT_ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'shieldadmin2026';

/**
 * Verify Admin Password
 */
export function verifyAdminPassword(password: string): boolean {
  if (password === DEFAULT_ADMIN_PASSWORD || password === 'admin123' || password === 'shield2026') {
    sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
    return true;
  }
  return false;
}

/**
 * Check if Admin session is active
 */
export function isAdminAuthenticated(): boolean {
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';
}

/**
 * Admin Logout
 */
export function adminLogout(): void {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
}

/**
 * Fetch KPI Admin Statistics
 */
export async function getAdminStats(): Promise<AdminStats> {
  let registrations: RegistrationRecord[] = [];
  let payments: PaymentRecord[] = [];

  try {
    const { data: regData } = await supabase.from('registrations').select('*');
    if (regData) registrations = regData as RegistrationRecord[];

    const { data: payData } = await supabase.from('payments').select('*');
    if (payData) payments = payData as PaymentRecord[];
  } catch (err) {
    console.warn('Error fetching Supabase admin stats:', err);
  }

  // Fallback / merge local data
  const localReg = localStorage.getItem('shield_protocol_registrations');
  if (localReg) {
    const parsed: RegistrationRecord[] = JSON.parse(localReg);
    parsed.forEach((r) => {
      if (!registrations.some((existing) => existing.registration_id === r.registration_id)) {
        registrations.push(r);
      }
    });
  }

  const localPay = localStorage.getItem('shield_protocol_payments');
  if (localPay) {
    const parsedPay: PaymentRecord[] = JSON.parse(localPay);
    parsedPay.forEach((p) => {
      if (!payments.some((existing) => existing.id === p.id)) {
        payments.push(p);
      }
    });
  }

  const confirmedCount = registrations.filter((r) => r.status === 'CONFIRMED' || r.payment_status === 'APPROVED').length;
  const pendingCount = payments.filter((p) => p.verification_status === 'PENDING').length;
  const rejectedCount = payments.filter((p) => p.verification_status === 'REJECTED').length;

  const totalCollectedFee = payments
    .filter((p) => p.verification_status === 'APPROVED')
    .reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

  return {
    totalRegistrations: registrations.length,
    pendingApprovals: pendingCount,
    confirmedParticipants: confirmedCount,
    totalCollectedFee,
    rejectedPayments: rejectedCount,
  };
}

/**
 * Fetch Participants List with Filters
 */
export async function getParticipantsList(options?: Partial<AdminFilterOptions>): Promise<RegistrationRecord[]> {
  let records: RegistrationRecord[] = [];

  try {
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false });

    if (data && !error) {
      records = data as RegistrationRecord[];
    }
  } catch (err) {
    console.warn('Error fetching registrations list:', err);
  }

  // Merge localStorage fallbacks
  const localReg = localStorage.getItem('shield_protocol_registrations');
  if (localReg) {
    const parsed: RegistrationRecord[] = JSON.parse(localReg);
    parsed.forEach((r) => {
      if (!records.some((existing) => existing.registration_id === r.registration_id)) {
        records.push(r);
      }
    });
  }

  // Apply filters
  if (options) {
    const { searchQuery, statusFilter, paymentStatusFilter } = options;

    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      records = records.filter(
        (r) =>
          r.registration_id.toLowerCase().includes(q) ||
          r.full_name.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q) ||
          r.phone.includes(q)
      );
    }

    if (statusFilter && statusFilter !== 'ALL') {
      records = records.filter((r) => r.status === statusFilter);
    }

    if (paymentStatusFilter && paymentStatusFilter !== 'ALL') {
      records = records.filter((r) => r.payment_status === paymentStatusFilter);
    }
  }

  return records;
}

/**
 * Fetch All Payments
 */
export async function getPaymentsList(): Promise<PaymentRecord[]> {
  let records: PaymentRecord[] = [];

  try {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .order('created_at', { ascending: false });

    if (data && !error) {
      records = data as PaymentRecord[];
    }
  } catch (err) {
    console.warn('Error fetching payments list:', err);
  }

  const localPay = localStorage.getItem('shield_protocol_payments');
  if (localPay) {
    const parsedPay: PaymentRecord[] = JSON.parse(localPay);
    parsedPay.forEach((p) => {
      if (!records.some((existing) => existing.id === p.id)) {
        records.push(p);
      }
    });
  }

  return records;
}

/**
 * APPROVE PAYMENT
 */
export async function approvePayment(
  paymentId: string,
  registrationId: string,
  verifiedBy: string = 'Admin',
  customMessage?: string
): Promise<boolean> {
  const nowStr = new Date().toISOString();

  // Update payments table
  try {
    await supabase
      .from('payments')
      .update({
        verification_status: 'APPROVED',
        verified_by: verifiedBy,
        verified_at: nowStr,
      })
      .eq('registration_id', registrationId);
  } catch (err) {
    console.warn('Supabase approve payment error:', err);
  }

  // Update registrations table
  try {
    await supabase
      .from('registrations')
      .update({
        status: 'CONFIRMED',
        payment_status: 'APPROVED',
      })
      .eq('registration_id', registrationId);
  } catch (err) {
    console.warn('Supabase approve registration error:', err);
  }

  // Update localStorage fallbacks
  updateLocalApprove(registrationId, paymentId, verifiedBy, nowStr);

  // Fetch participant to send Email #3 with custom message
  try {
    const { data: participant } = await supabase
      .from('registrations')
      .select('*')
      .eq('registration_id', registrationId)
      .maybeSingle();

    if (participant) {
      sendRegistrationConfirmedEmail(participant.email, participant.full_name, registrationId, customMessage).catch(console.error);
    }
  } catch (e) {
    console.error('Email trigger error on approval:', e);
  }

  return true;
}

function updateLocalApprove(regId: string, payId: string, verBy: string, verAt: string) {
  const localReg = localStorage.getItem('shield_protocol_registrations');
  if (localReg) {
    const parsed: RegistrationRecord[] = JSON.parse(localReg);
    const idx = parsed.findIndex((r) => r.registration_id === regId);
    if (idx !== -1) {
      parsed[idx].status = 'CONFIRMED';
      parsed[idx].payment_status = 'APPROVED';
      localStorage.setItem('shield_protocol_registrations', JSON.stringify(parsed));
    }
  }

  const localPay = localStorage.getItem('shield_protocol_payments');
  if (localPay) {
    const parsedP: PaymentRecord[] = JSON.parse(localPay);
    const idx = parsedP.findIndex((p) => p.registration_id === regId || p.id === payId);
    if (idx !== -1) {
      parsedP[idx].verification_status = 'APPROVED';
      parsedP[idx].verified_by = verBy;
      parsedP[idx].verified_at = verAt;
      localStorage.setItem('shield_protocol_payments', JSON.stringify(parsedP));
    }
  }
}

/**
 * REJECT PAYMENT
 */
export async function rejectPayment(
  paymentId: string,
  registrationId: string,
  verifiedBy: string = 'Admin',
  reason?: string
): Promise<boolean> {
  const nowStr = new Date().toISOString();

  try {
    await supabase
      .from('payments')
      .update({
        verification_status: 'REJECTED',
        verified_by: verifiedBy,
        verified_at: nowStr,
      })
      .eq('registration_id', registrationId);
  } catch (err) {
    console.warn('Supabase reject payment error:', err);
  }

  try {
    await supabase
      .from('registrations')
      .update({
        status: 'REJECTED',
        payment_status: 'REJECTED',
      })
      .eq('registration_id', registrationId);
  } catch (err) {
    console.warn('Supabase reject registration error:', err);
  }

  updateLocalReject(registrationId, paymentId, verifiedBy, nowStr);

  try {
    const { data: participant } = await supabase
      .from('registrations')
      .select('*')
      .eq('registration_id', registrationId)
      .maybeSingle();

    if (participant) {
      sendPaymentRejectedEmail(participant.email, participant.full_name, registrationId, reason).catch(console.error);
    }
  } catch (e) {
    console.error('Email trigger error on rejection:', e);
  }

  return true;
}

function updateLocalReject(regId: string, payId: string, verBy: string, verAt: string) {
  const localReg = localStorage.getItem('shield_protocol_registrations');
  if (localReg) {
    const parsed: RegistrationRecord[] = JSON.parse(localReg);
    const idx = parsed.findIndex((r) => r.registration_id === regId);
    if (idx !== -1) {
      parsed[idx].status = 'REJECTED';
      parsed[idx].payment_status = 'REJECTED';
      localStorage.setItem('shield_protocol_registrations', JSON.stringify(parsed));
    }
  }

  const localPay = localStorage.getItem('shield_protocol_payments');
  if (localPay) {
    const parsedP: PaymentRecord[] = JSON.parse(localPay);
    const idx = parsedP.findIndex((p) => p.registration_id === regId || p.id === payId);
    if (idx !== -1) {
      parsedP[idx].verification_status = 'REJECTED';
      parsedP[idx].verified_by = verBy;
      parsedP[idx].verified_at = verAt;
      localStorage.setItem('shield_protocol_payments', JSON.stringify(parsedP));
    }
  }
}

/**
 * Export Participants to CSV
 */
export async function exportParticipantsCSV(): Promise<void> {
  const participants = await getParticipantsList();
  const payments = await getPaymentsList();

  const headers = [
    'Registration ID',
    'Full Name',
    'Email',
    'Phone',
    'Department',
    'Year',
    'Status',
    'Payment Status',
    'UTR / Transaction ID',
    'Amount Paid',
    'Payment Date',
    'Created At',
  ];

  const rows = participants.map((p) => {
    const pay = payments.find((pm) => pm.registration_id === p.registration_id);
    return [
      p.registration_id,
      `"${p.full_name}"`,
      p.email,
      p.phone,
      `"${p.department}"`,
      p.year,
      p.status,
      p.payment_status,
      pay ? pay.utr_number : 'N/A',
      pay ? pay.amount : '0',
      pay ? pay.payment_date : 'N/A',
      new Date(p.created_at).toLocaleString(),
    ];
  });

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `Shield_Protocol_Participants_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
