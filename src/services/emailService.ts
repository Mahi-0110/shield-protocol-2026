import { supabase } from './supabase';
import { PAYMENT_CONFIG } from '../config/paymentConfig';

export interface EmailParams {
  to: string;
  subject: string;
  html: string;
}

const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY || '';
const FROM_EMAIL = import.meta.env.VITE_RESEND_FROM_EMAIL || 'The Shield Protocol <noreply@theshieldprotocol.site>';

/**
 * Direct email sender fallback via Resend API
 */
export async function sendEmail({ to, subject, html }: EmailParams): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.info(`[Email Service Simulation] To: ${to} | Subject: ${subject}`);
    return true;
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [to],
        subject,
        html,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.warn('[Resend Direct API Response]:', result);
      return true;
    }

    console.log('[Resend Direct Email Sent]:', result);
    return true;
  } catch (err) {
    console.error('[Email Direct Send Exception]:', err);
    return true;
  }
}

/**
 * EMAIL 1: Registration Received (PARTIALLY REGISTERED)
 * Invokes Supabase Edge Function 'send-registration-email'
 */
export async function sendRegistrationReceivedEmail(
  email: string,
  fullName: string,
  registrationId: string,
  college?: string
): Promise<boolean> {
  const paymentUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/#payment-portal`
    : 'https://theshieldprotocol.site/#payment-portal';

  try {
    const { data, error } = await supabase.functions.invoke('send-registration-email', {
      body: {
        email,
        fullName,
        registrationId,
        college,
        registrationFee: PAYMENT_CONFIG.registrationFee,
        paymentUrl,
      },
    });

    if (error) {
      console.warn('[Edge Function send-registration-email fallback]:', error.message || error);
      return await sendEmailFallbackRegistration(email, fullName, registrationId);
    }

    console.log('[Edge Function send-registration-email Success]:', data);
    return true;
  } catch (err) {
    console.error('[sendRegistrationReceivedEmail Exception]:', err);
    return await sendEmailFallbackRegistration(email, fullName, registrationId);
  }
}

/**
 * EMAIL 2: Payment Submitted (UNDER VERIFICATION)
 * Invokes Supabase Edge Function 'send-payment-submitted-email'
 */
export async function sendPaymentSubmittedEmail(
  email: string,
  fullName: string,
  registrationId: string,
  utrNumber: string
): Promise<boolean> {
  try {
    const { data, error } = await supabase.functions.invoke('send-payment-submitted-email', {
      body: {
        email,
        fullName,
        registrationId,
        transactionId: utrNumber,
        amount: PAYMENT_CONFIG.registrationFee,
      },
    });

    if (error) {
      console.warn('[Edge Function send-payment-submitted-email fallback]:', error.message || error);
      return await sendEmailFallbackPaymentSubmitted(email, fullName, registrationId, utrNumber);
    }

    console.log('[Edge Function send-payment-submitted-email Success]:', data);
    return true;
  } catch (err) {
    console.error('[sendPaymentSubmittedEmail Exception]:', err);
    return await sendEmailFallbackPaymentSubmitted(email, fullName, registrationId, utrNumber);
  }
}

/**
 * EMAIL 3: Registration Approved (REGISTRATION CONFIRMED)
 * Invokes Supabase Edge Function 'send-registration-approved-email'
 */
export async function sendRegistrationConfirmedEmail(
  email: string,
  fullName: string,
  registrationId: string,
  customMessage?: string
): Promise<boolean> {
  try {
    const { data, error } = await supabase.functions.invoke('send-registration-approved-email', {
      body: {
        email,
        fullName,
        registrationId,
        customMessage,
      },
    });

    if (error) {
      console.warn('[Edge Function send-registration-approved-email fallback]:', error.message || error);
      return await sendEmailFallbackApproved(email, fullName, registrationId, customMessage);
    }

    console.log('[Edge Function send-registration-approved-email Success]:', data);
    return true;
  } catch (err) {
    console.error('[sendRegistrationConfirmedEmail Exception]:', err);
    return await sendEmailFallbackApproved(email, fullName, registrationId, customMessage);
  }
}

/**
 * EMAIL 4: Payment Verification Rejected
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

/* Fallback helper functions for direct API resilience */
async function sendEmailFallbackRegistration(email: string, fullName: string, registrationId: string): Promise<boolean> {
  const subject = `Registration Received – Complete Your Payment (${registrationId})`;
  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #0c1017; color: #f8fafc; padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(14, 165, 233, 0.3);">
      <h1 style="color: #0ea5e9; font-size: 24px;">THE SHIELD PROTOCOL 2026</h1>
      <p>Dear <strong>${fullName}</strong>,</p>
      <p>Thank you for registering for <strong>The Shield Protocol 2026</strong>. Your registration details have been received (Registration ID: <strong>${registrationId}</strong>).</p>
      <p>Your seat has been temporarily reserved. Complete your payment to confirm your participation.</p>
    </div>
  `;
  return await sendEmail({ to: email, subject, html });
}

async function sendEmailFallbackPaymentSubmitted(email: string, fullName: string, registrationId: string, utrNumber: string): Promise<boolean> {
  const subject = `Payment Submitted Successfully – Verification Pending (${registrationId})`;
  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #0c1017; color: #f8fafc; padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #10b981;">
      <h1 style="color: #0ea5e9; font-size: 24px;">THE SHIELD PROTOCOL 2026</h1>
      <p>Dear <strong>${fullName}</strong>,</p>
      <p>We've received your payment details (UTR: <strong>${utrNumber}</strong>) for Registration ID: <strong>${registrationId}</strong>.</p>
      <p>Our organizing team is currently verifying your payment. No further action is required from your side.</p>
    </div>
  `;
  return await sendEmail({ to: email, subject, html });
}

async function sendEmailFallbackApproved(email: string, fullName: string, registrationId: string, customMessage?: string): Promise<boolean> {
  const subject = `Welcome to The Shield Protocol 2026 🎉 (${registrationId})`;
  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #0c1017; color: #f8fafc; padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #10b981;">
      <h1 style="color: #10b981; font-size: 24px;">REGISTRATION CONFIRMED</h1>
      <p>Congratulations <strong>${fullName}</strong>!</p>
      <p>Your participation in <strong>The Shield Protocol 2026</strong> has been officially confirmed (Pass ID: <strong>${registrationId}</strong>).</p>
      ${customMessage ? `<p><strong>Note:</strong> ${customMessage}</p>` : ''}
    </div>
  `;
  return await sendEmail({ to: email, subject, html });
}
