export type ParticipantStatus = 
  | 'PARTIAL' 
  | 'PAYMENT_PENDING' 
  | 'PAYMENT_SUBMITTED' 
  | 'CONFIRMED' 
  | 'CHECKED_IN' 
  | 'REJECTED';

export type PaymentVerificationStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export type PaymentStatus = 'PENDING' | 'SUBMITTED' | 'APPROVED' | 'REJECTED';

export interface RegistrationRecord {
  id: string;
  registration_id: string;
  full_name: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  year: string;
  team_name?: string;
  team_size?: number;
  status: ParticipantStatus;
  payment_status: PaymentStatus;
  created_at: string;
}

export interface RegistrationInsert {
  full_name: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  year: string;
  team_name?: string;
  team_size?: number;
  registration_id?: string;
  status?: ParticipantStatus;
  payment_status?: PaymentStatus;
}

export interface PaymentRecord {
  id: string;
  registration_id: string;
  participant_email: string;
  participant_phone: string;
  utr_number: string;
  amount: number;
  payment_date: string;
  payment_screenshot: string;
  verification_status: PaymentVerificationStatus;
  verified_by?: string;
  verified_at?: string;
  created_at: string;
}

export interface PaymentInsert {
  registration_id: string;
  participant_email: string;
  participant_phone: string;
  utr_number: string;
  amount: number;
  payment_date: string;
  payment_screenshot: string;
  verification_status?: PaymentVerificationStatus;
}

export interface AdminStats {
  totalRegistrations: number;
  pendingApprovals: number;
  confirmedParticipants: number;
  totalCollectedFee: number;
  rejectedPayments: number;
}

export interface AdminFilterOptions {
  searchQuery: string;
  statusFilter: string;
  paymentStatusFilter: string;
}
