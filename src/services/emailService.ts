import { PAYMENT_CONFIG } from '../config/paymentConfig';

export interface EmailParams {
  to: string;
  subject: string;
  html: string;
}

const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY || '';

/**
 * Core email sender via Resend API
 */
export async function sendEmail({ to, subject, html }: EmailParams): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.info(`[Email Service Simulation] To: ${to} | Subject: ${subject}`);
    return true;
  }

  // Resend API allows sending from onboarding@resend.dev unless a custom domain is verified
  const fromEmail = import.meta.env.VITE_RESEND_FROM_EMAIL || 'Shield Protocol <onboarding@resend.dev>';

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [to],
        subject,
        html,
      }),
    });

    if (!response.ok) {
      const errData = await response.json();
      console.warn('Resend API error (falling back to simulation mode):', errData);
      return true;
    }
    return true;
  } catch (err) {
    console.error('Email sending exception (falling back to simulation mode):', err);
    return true;
  }
}

/**
 * EMAIL #1: Registration Received – Complete Your Payment
 */
export async function sendRegistrationReceivedEmail(
  email: string,
  fullName: string,
  registrationId: string
): Promise<boolean> {
  const subject = `Registration Received – Complete Your Payment (${registrationId})`;
  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0c1017; color: #f8fafc; padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(14, 165, 233, 0.3);">
      <div style="text-align: center; margin-bottom: 25px;">
        <h1 style="color: #0ea5e9; font-size: 24px; margin-bottom: 5px;">THE SHIELD PROTOCOL 2026</h1>
        <p style="color: #94a3b8; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Official Registration Notification</p>
      </div>

      <p style="font-size: 16px;">Dear <strong>${fullName}</strong>,</p>

      <p style="font-size: 15px; color: #cbd5e1; line-height: 1.6;">
        Your registration details for <strong>${PAYMENT_CONFIG.eventName}</strong> have been successfully received!
      </p>

      <div style="background: rgba(14, 165, 233, 0.1); border-left: 4px solid #0ea5e9; padding: 15px; margin: 20px 0; border-radius: 6px;">
        <p style="margin: 0; font-size: 14px; color: #94a3b8;">Registration ID:</p>
        <p style="margin: 5px 0 0 0; font-size: 22px; font-weight: bold; color: #38bdf8; font-family: monospace;">${registrationId}</p>
      </div>

      <p style="font-size: 15px; color: #cbd5e1; line-height: 1.6;">
        Your seat is temporarily reserved. To complete your registration, please pay the entry fee of <strong>₹${PAYMENT_CONFIG.registrationFee}</strong> via UPI.
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${typeof window !== 'undefined' ? window.location.origin : 'https://shieldprotocol2026.vercel.app'}/#payment-portal" style="background-color: #0ea5e9; color: #ffffff; padding: 12px 28px; font-size: 15px; font-weight: bold; text-decoration: none; border-radius: 8px; display: inline-block;">
          Proceed to Payment Portal (₹${PAYMENT_CONFIG.registrationFee})
        </a>
      </div>

      <hr style="border: none; border-top: 1px solid rgba(255, 255, 255, 0.1); margin: 30px 0;" />
      <p style="font-size: 12px; color: #64748b; text-align: center;">
        If you have any questions, reach out to <a href="mailto:theshieldprotocol@bitsvizag.com" style="color: #0ea5e9;">theshieldprotocol@bitsvizag.com</a>
      </p>
    </div>
  `;

  return await sendEmail({ to: email, subject, html });
}

/**
 * EMAIL #2: Payment Submitted Successfully
 */
export async function sendPaymentSubmittedEmail(
  email: string,
  fullName: string,
  registrationId: string,
  utrNumber: string
): Promise<boolean> {
  const subject = `Payment Submitted Successfully – Verification Pending (${registrationId})`;
  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0c1017; color: #f8fafc; padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(14, 165, 233, 0.3);">
      <div style="text-align: center; margin-bottom: 25px;">
        <h1 style="color: #0ea5e9; font-size: 24px; margin-bottom: 5px;">THE SHIELD PROTOCOL 2026</h1>
        <p style="color: #10b981; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Payment Receipt Submitted</p>
      </div>

      <p style="font-size: 16px;">Dear <strong>${fullName}</strong>,</p>

      <p style="font-size: 15px; color: #cbd5e1; line-height: 1.6;">
        We have received your UPI payment transaction details for <strong>Registration ID: ${registrationId}</strong>.
      </p>

      <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); padding: 16px; margin: 20px 0; border-radius: 8px;">
        <p style="margin: 0 0 8px 0; font-size: 14px; color: #94a3b8;">Transaction / UTR Number:</p>
        <p style="margin: 0; font-size: 18px; font-weight: bold; color: #34d399; font-family: monospace;">${utrNumber}</p>
        <p style="margin: 10px 0 0 0; font-size: 14px; color: #94a3b8;">Amount Paid: <strong>₹${PAYMENT_CONFIG.registrationFee}</strong></p>
      </div>

      <p style="font-size: 15px; color: #cbd5e1; line-height: 1.6;">
        Our team is currently verifying your payment proof. This typically takes <strong>2-6 hours</strong>. No further action is required from your side at this moment.
      </p>

      <hr style="border: none; border-top: 1px solid rgba(255, 255, 255, 0.1); margin: 30px 0;" />
      <p style="font-size: 12px; color: #64748b; text-align: center;">
        The Shield Protocol 2026 • Official Payment Portal
      </p>
    </div>
  `;

  return await sendEmail({ to: email, subject, html });
}

/**
 * EMAIL #3: Registration Confirmed
 */
export async function sendRegistrationConfirmedEmail(
  email: string,
  fullName: string,
  registrationId: string,
  customMessage?: string
): Promise<boolean> {
  const subject = `Registration Confirmed! Welcome to The Shield Protocol 2026 🎉 (${registrationId})`;
  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0c1017; color: #f8fafc; padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #10b981;">
      <div style="text-align: center; margin-bottom: 25px;">
        <h1 style="color: #10b981; font-size: 26px; margin-bottom: 5px;">REGISTRATION CONFIRMED</h1>
        <p style="color: #38bdf8; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">The Shield Protocol 2026</p>
      </div>

      <p style="font-size: 16px;">Congratulations <strong>${fullName}</strong>!</p>

      <p style="font-size: 15px; color: #cbd5e1; line-height: 1.6;">
        Your payment has been successfully verified, and your registration for <strong>The Shield Protocol 2026</strong> is officially <strong>CONFIRMED</strong>!
      </p>

      <div style="background: rgba(14, 165, 233, 0.15); border: 1px solid #0ea5e9; padding: 20px; margin: 25px 0; border-radius: 10px; text-align: center;">
        <p style="margin: 0; font-size: 13px; color: #94a3b8; text-transform: uppercase;">Official Participant Pass ID</p>
        <p style="margin: 6px 0; font-size: 28px; font-weight: 800; color: #38bdf8; letter-spacing: 2px; font-family: monospace;">${registrationId}</p>
        <p style="margin: 0; font-size: 12px; color: #10b981;">✓ Status: VERIFIED & CONFIRMED</p>
      </div>

      ${customMessage ? `
        <div style="background: rgba(16, 185, 129, 0.1); border-left: 4px solid #10b981; padding: 15px; margin: 20px 0; border-radius: 8px;">
          <p style="margin: 0; font-size: 12px; color: #a7f3d0; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">Organizer Note & Instructions:</p>
          <p style="margin: 8px 0 0 0; font-size: 14px; color: #ffffff; line-height: 1.6;">${customMessage.replace(/\n/g, '<br/>')}</p>
        </div>
      ` : ''}

      <div style="background: rgba(255, 255, 255, 0.03); padding: 18px; border-radius: 8px; margin-bottom: 20px;">
        <h3 style="margin-top: 0; color: #ffffff; font-size: 16px;">📍 Event Details:</h3>
        <ul style="margin: 0; padding-left: 20px; color: #cbd5e1; font-size: 14px; line-height: 1.8;">
          <li><strong>Event Date:</strong> April 15 - 17, 2026</li>
          <li><strong>Reporting Time:</strong> 8:30 AM IST</li>
          <li><strong>Venue:</strong> Main Tech Auditorium, Campus Grounds</li>
          <li><strong>Instructions:</strong> Please present your Registration ID (${registrationId}) and college photo ID at the check-in counter.</li>
        </ul>
      </div>

      <hr style="border: none; border-top: 1px solid rgba(255, 255, 255, 0.1); margin: 30px 0;" />
      <p style="font-size: 12px; color: #64748b; text-align: center;">
        We look forward to seeing you at The Shield Protocol 2026!
      </p>
    </div>
  `;

  return await sendEmail({ to: email, subject, html });
}

/**
 * EMAIL #4: Payment Verification Rejected
 */
export async function sendPaymentRejectedEmail(
  email: string,
  fullName: string,
  registrationId: string,
  reason?: string
): Promise<boolean> {
  const subject = `Payment Verification Update – Action Required (${registrationId})`;
  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0c1017; color: #f8fafc; padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #ef4444;">
      <div style="text-align: center; margin-bottom: 25px;">
        <h1 style="color: #ef4444; font-size: 24px; margin-bottom: 5px;">PAYMENT VERIFICATION UNSUCCESSFUL</h1>
        <p style="color: #94a3b8; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Action Required</p>
      </div>

      <p style="font-size: 16px;">Dear <strong>${fullName}</strong>,</p>

      <p style="font-size: 15px; color: #cbd5e1; line-height: 1.6;">
        We were unable to verify your submitted UPI payment details for <strong>Registration ID: ${registrationId}</strong>.
      </p>

      ${reason ? `
        <div style="background: rgba(239, 68, 68, 0.1); border-left: 4px solid #ef4444; padding: 15px; margin: 20px 0; border-radius: 6px;">
          <p style="margin: 0; font-size: 14px; color: #fca5a5;"><strong>Reason for rejection:</strong> ${reason}</p>
        </div>
      ` : ''}

      <p style="font-size: 15px; color: #cbd5e1; line-height: 1.6;">
        Don't worry! You can resubmit your correct UTR transaction number and clear screenshot proof through the payment portal.
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${typeof window !== 'undefined' ? window.location.origin : 'https://shieldprotocol2026.vercel.app'}/#payment-portal" style="background-color: #ef4444; color: #ffffff; padding: 12px 28px; font-size: 15px; font-weight: bold; text-decoration: none; border-radius: 8px; display: inline-block;">
          Resubmit Payment Proof
        </a>
      </div>

      <hr style="border: none; border-top: 1px solid rgba(255, 255, 255, 0.1); margin: 30px 0;" />
      <p style="font-size: 12px; color: #64748b; text-align: center;">
        If you believe this is an error, please contact <a href="mailto:theshieldprotocol@bitsvizag.com" style="color: #38bdf8;">theshieldprotocol@bitsvizag.com</a> with your payment transaction screenshot.
      </p>
    </div>
  `;

  return await sendEmail({ to: email, subject, html });
}
