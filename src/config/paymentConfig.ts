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
  registrationDeadline: string;
  supportEmail: string;
  supportPhone: string;
}

export const PAYMENT_CONFIG: PaymentConfig = {
  merchantName: "The Shield Protocol 2026",
  registrationFee: 725,
  currency: "INR",
  currencySymbol: "₹",
  upiId: "7842381129@axl",
  payeeName: "THONDAVARAPU KEERTHANA",
  eventName: "The Shield Protocol 2026",
  eventSubtitle: "Cybersecurity Summit & Hackathon",
  venue: "Bits Vizag Campus",
  eventDuration: "4 Days (August 11-14, 2026)",
  registrationDeadline: "2026-08-08T23:59:59",
  supportEmail: "theshieldprotocol@bitsvizag.com",
  supportPhone: "+91 82972 93834",
};

export const getStandardUpiUrl = (amount: number = PAYMENT_CONFIG.registrationFee) => {
  const pa = encodeURIComponent(PAYMENT_CONFIG.upiId);
  const pn = encodeURIComponent(PAYMENT_CONFIG.payeeName);
  const tn = encodeURIComponent("Shield Protocol Registration");
  return `upi://pay?pa=${pa}&pn=${pn}&am=${amount}&cu=INR&tn=${tn}`;
};
