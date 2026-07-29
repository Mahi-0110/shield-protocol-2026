export interface PaymentConfig {
  merchantName: string;
  registrationFee: number;
  currency: string;
  currencySymbol: string;
  upiId: string;
  payeeName: string;
  eventName: string;
  eventSubtitle: string;
  venue: string;
  eventDuration: string;
  registrationDeadline: string; // ISO date string or relative text
  supportEmail: string;
  supportPhone: string;
}

export const PAYMENT_CONFIG: PaymentConfig = {
  merchantName: "The Shield Protocol 2026",
  registrationFee: 725,
  currency: "INR",
  currencySymbol: "₹",
  upiId: "9299608440-5@ybl",
  payeeName: "The Shield Protocol",
  eventName: "The Shield Protocol 2026",
  eventSubtitle: "Cybersecurity Summit & Hackathon",
  venue: "College Campus, Tech Auditorium",
  eventDuration: "4 Days (March 15 - 18, 2026)",
  registrationDeadline: "2026-08-15T23:59:59",
  supportEmail: "support@shieldprotocol.io",
  supportPhone: "+91 98765 43210",
};
