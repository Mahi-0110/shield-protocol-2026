/**
 * Reusable HTML Email Templates for The Shield Protocol 2026
 * Theme: Dark, Cyber Security, Professional, Mobile & Outlook Responsive
 */

export const SENDER_EMAIL = 'The Shield Protocol <noreply@theshieldprotocol.site>';

const BASE_STYLES = `
  font-family: 'Segoe UI', Arial, sans-serif;
  background-color: #050b14;
  color: #e2e8f0;
  margin: 0;
  padding: 20px;
  -webkit-text-size-adjust: 100%;
`;

const CARD_STYLES = `
  background-color: #0c1729;
  border: 1px solid #1e293b;
  border-radius: 16px;
  max-width: 600px;
  margin: 0 auto;
  padding: 32px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
`;

const HEADER = `
  <div style="text-align: center; margin-bottom: 28px; border-bottom: 1px solid rgba(14, 165, 233, 0.2); padding-bottom: 20px;">
    <h1 style="color: #0ea5e9; font-size: 26px; margin: 0 0 6px 0; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">
      🛡️ THE SHIELD PROTOCOL 2026
    </h1>
    <p style="color: #64748b; font-size: 12px; margin: 0; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">
      Flagship Cybersecurity & Innovation Summit
    </p>
  </div>
`;

const FOOTER = `
  <div style="margin-top: 36px; border-top: 1px solid #1e293b; padding-top: 20px; text-align: center;">
    <p style="color: #64748b; font-size: 12px; margin: 0 0 6px 0;">
      The Shield Protocol 2026 • Official Notification System
    </p>
    <p style="color: #475569; font-size: 11px; margin: 0;">
      If you have any questions, contact us at <a href="mailto:theshieldprotocol@bitsvizag.com" style="color: #0ea5e9; text-decoration: none;">theshieldprotocol@bitsvizag.com</a>
    </p>
  </div>
`;

/**
 * EMAIL 1: Registration Received (PARTIALLY REGISTERED)
 */
export function getRegistrationReceivedTemplate(data: {
  fullName: string;
  registrationId: string;
  eventName?: string;
  college?: string;
  registrationFee?: number;
  paymentUrl?: string;
}): string {
  const {
    fullName,
    registrationId,
    eventName = 'The Shield Protocol 2026',
    college = 'BITS Vizag',
    registrationFee = 725,
    paymentUrl = 'https://theshieldprotocol.site/#payment-portal',
  } = data;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registration Received – Complete Your Payment</title>
</head>
<body style="${BASE_STYLES}">
  <div style="${CARD_STYLES}">
    ${HEADER}

    <div style="text-align: center; margin-bottom: 20px;">
      <span style="background: rgba(234, 179, 8, 0.15); color: #eab308; border: 1px solid rgba(234, 179, 8, 0.4); padding: 6px 16px; border-radius: 9999px; font-size: 12px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; display: inline-block;">
        PARTIALLY REGISTERED
      </span>
    </div>

    <h2 style="color: #f8fafc; font-size: 18px; margin: 0 0 14px 0;">Dear <strong>${fullName}</strong>,</h2>

    <p style="color: #cbd5e1; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
      Thank you for registering for <strong>${eventName}</strong>. Your registration details have been successfully received.
    </p>

    <p style="color: #cbd5e1; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
      Your seat has been temporarily reserved. Please complete your payment of <strong>₹${registrationFee}</strong> to confirm your participation.
    </p>

    <div style="background: rgba(14, 165, 233, 0.08); border-left: 4px solid #0ea5e9; padding: 18px; border-radius: 8px; margin-bottom: 24px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="color: #94a3b8; padding: 4px 0;">Registration ID:</td>
          <td style="color: #38bdf8; font-weight: 700; font-family: monospace; font-size: 16px; text-align: right;">${registrationId}</td>
        </tr>
        <tr>
          <td style="color: #94a3b8; padding: 4px 0;">Institution / College:</td>
          <td style="color: #f1f5f9; text-align: right;">${college}</td>
        </tr>
        <tr>
          <td style="color: #94a3b8; padding: 4px 0;">Registration Fee:</td>
          <td style="color: #34d399; font-weight: 700; text-align: right;">₹${registrationFee}</td>
        </tr>
      </table>
    </div>

    <div style="text-align: center; margin: 28px 0;">
      <a href="${paymentUrl}" target="_blank" rel="noopener noreferrer" style="background-color: #0ea5e9; color: #ffffff; padding: 14px 32px; border-radius: 10px; font-weight: 700; font-size: 15px; text-decoration: none; display: inline-block; box-shadow: 0 4px 14px rgba(14, 165, 233, 0.4);">
        Complete Payment (₹${registrationFee}) →
      </a>
    </div>

    ${FOOTER}
  </div>
</body>
</html>
  `;
}

/**
 * EMAIL 2: Payment Submitted (UNDER VERIFICATION)
 */
export function getPaymentSubmittedTemplate(data: {
  fullName: string;
  registrationId: string;
  transactionId: string;
  amount?: number;
  paymentDate?: string;
}): string {
  const {
    fullName,
    registrationId,
    transactionId,
    amount = 725,
    paymentDate = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
  } = data;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Submitted Successfully</title>
</head>
<body style="${BASE_STYLES}">
  <div style="${CARD_STYLES}">
    ${HEADER}

    <div style="text-align: center; margin-bottom: 20px;">
      <span style="background: rgba(14, 165, 233, 0.15); color: #38bdf8; border: 1px solid rgba(14, 165, 233, 0.4); padding: 6px 16px; border-radius: 9999px; font-size: 12px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; display: inline-block;">
        UNDER VERIFICATION
      </span>
    </div>

    <h2 style="color: #f8fafc; font-size: 18px; margin: 0 0 14px 0;">Dear <strong>${fullName}</strong>,</h2>

    <p style="color: #cbd5e1; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
      We've received your payment details successfully for <strong>Registration ID: ${registrationId}</strong>.
    </p>

    <p style="color: #cbd5e1; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
      Our organizing team is currently verifying your payment of <strong>₹${amount}</strong>. No further action is required from your side. You'll receive another email once verification is complete.
    </p>

    <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.3); padding: 18px; border-radius: 8px; margin-bottom: 24px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="color: #94a3b8; padding: 4px 0;">Transaction / UTR ID:</td>
          <td style="color: #34d399; font-weight: 700; font-family: monospace; font-size: 15px; text-align: right;">${transactionId}</td>
        </tr>
        <tr>
          <td style="color: #94a3b8; padding: 4px 0;">Amount Submitted:</td>
          <td style="color: #f1f5f9; text-align: right; font-weight: 600;">₹${amount}</td>
        </tr>
        <tr>
          <td style="color: #94a3b8; padding: 4px 0;">Submission Date:</td>
          <td style="color: #f1f5f9; text-align: right;">${paymentDate}</td>
        </tr>
      </table>
    </div>

    ${FOOTER}
  </div>
</body>
</html>
  `;
}

/**
 * EMAIL 3: Registration Approved (REGISTRATION CONFIRMED)
 */
export function getRegistrationApprovedTemplate(data: {
  fullName: string;
  registrationId: string;
  eventName?: string;
  venue?: string;
  reportingTime?: string;
  customMessage?: string;
}): string {
  const {
    fullName,
    registrationId,
    eventName = 'The Shield Protocol 2026',
    venue = 'Bits College Campus, Seminar Hall',
    reportingTime = '8:30 AM IST',
    customMessage,
  } = data;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to The Shield Protocol 2026</title>
</head>
<body style="${BASE_STYLES}">
  <div style="${CARD_STYLES}">
    ${HEADER}

    <div style="text-align: center; margin-bottom: 20px;">
      <span style="background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.5); padding: 6px 18px; border-radius: 9999px; font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; display: inline-block;">
        ✓ REGISTRATION CONFIRMED
      </span>
    </div>

    <h2 style="color: #f8fafc; font-size: 20px; margin: 0 0 14px 0;">Congratulations, <strong>${fullName}</strong>! 🎉</h2>

    <p style="color: #cbd5e1; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
      Your registration has been verified successfully. Your participation in <strong>${eventName}</strong> has been officially confirmed.
    </p>

    <div style="background: rgba(14, 165, 233, 0.12); border: 1px solid #0ea5e9; padding: 22px; border-radius: 12px; margin-bottom: 24px; text-align: center;">
      <p style="color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 6px 0;">Official Participant Pass ID</p>
      <p style="color: #38bdf8; font-size: 28px; font-weight: 800; font-family: monospace; letter-spacing: 2px; margin: 0 0 8px 0;">${registrationId}</p>
      <p style="color: #34d399; font-size: 13px; font-weight: 600; margin: 0;">Verified & Gate Pass Ready</p>
    </div>

    ${customMessage ? `
      <div style="background: rgba(16, 185, 129, 0.08); border-left: 4px solid #10b981; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
        <p style="color: #a7f3d0; font-size: 12px; text-transform: uppercase; font-weight: 700; margin: 0 0 6px 0;">Organizer Instructions:</p>
        <p style="color: #ffffff; font-size: 14px; line-height: 1.6; margin: 0;">${customMessage.replace(/\n/g, '<br/>')}</p>
      </div>
    ` : ''}

    <div style="background: #111e36; padding: 20px; border-radius: 10px; margin-bottom: 24px;">
      <h3 style="color: #38bdf8; font-size: 15px; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 1px;">📍 Event Venue & Reporting</h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="color: #94a3b8; padding: 4px 0;">Event Dates:</td>
          <td style="color: #f1f5f9; text-align: right; font-weight: 600;">August 11-14, 2026</td>
        </tr>
        <tr>
          <td style="color: #94a3b8; padding: 4px 0;">Reporting Time:</td>
          <td style="color: #f1f5f9; text-align: right; font-weight: 600;">${reportingTime}</td>
        </tr>
        <tr>
          <td style="color: #94a3b8; padding: 4px 0;">Venue Location:</td>
          <td style="color: #f1f5f9; text-align: right; font-weight: 600;">${venue}</td>
        </tr>
      </table>
    </div>

    <p style="color: #cbd5e1; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0; text-align: center;">
      We look forward to welcoming you to The Shield Protocol 2026!
    </p>

    ${FOOTER}
  </div>
</body>
</html>
  `;
}
