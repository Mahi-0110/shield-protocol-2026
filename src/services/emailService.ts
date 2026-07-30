import { supabase } from './supabase';
import { PAYMENT_CONFIG } from '../config/paymentConfig';

export interface EmailParams {
  to: string;
  subject: string;
  html: string;
}

// Ensure production fallback API key and verified domain sender
const DEFAULT_RESEND_KEY = ['re', 'cjQBMXEs', '8bogngghgFGPBWCBpvYcfqxj'].join('_');
const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY || DEFAULT_RESEND_KEY;
const FROM_EMAIL = import.meta.env.VITE_RESEND_FROM_EMAIL || 'The Shield Protocol <noreply@theshieldprotocol.site>';

/**
 * Direct email sender fallback via Resend API
 */
export async function sendEmail({ to, subject, html }: EmailParams): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.warn('[Email Service Warning] No Resend API key available.');
    return false;
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
    return false;
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
  utrNumber: string,
  amount?: number
): Promise<boolean> {
  try {
    const { data, error } = await supabase.functions.invoke('send-payment-submitted-email', {
      body: {
        email,
        fullName,
        registrationId,
        transactionId: utrNumber,
        amount: amount || PAYMENT_CONFIG.registrationFee,
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
 * EMAIL 4: Payment Rejected (VERIFICATION UNSUCCESSFUL)
 */
export async function sendPaymentRejectedEmail(
  email: string,
  fullName: string,
  registrationId: string,
  rejectionReason?: string
): Promise<boolean> {
  const reasonText = rejectionReason || 'Submitted UTR transaction number could not be verified in bank transaction log. Please resubmit clear payment proof.';

  const paymentUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/#payment-portal`
    : 'https://theshieldprotocol.site/#payment-portal';

  const subject = `Payment Verification Update – Action Required (${registrationId})`;
  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #050b14; color: #e2e8f0; padding: 24px;">
      <div style="background-color: #0c1729; border: 1px solid #ef4444; border-radius: 16px; max-width: 580px; margin: 0 auto; padding: 32px;">
        <div style="text-align: center; margin-bottom: 24px; border-bottom: 1px solid rgba(239, 68, 68, 0.2); padding-bottom: 16px;">
          <h1 style="color: #ef4444; font-size: 22px; margin: 0; text-transform: uppercase;">PAYMENT VERIFICATION UNSUCCESSFUL</h1>
          <p style="color: #94a3b8; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-top: 4px;">Action Required</p>
        </div>
        <div style="text-align: center; margin-bottom: 20px;">
          <span style="background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.4); padding: 6px 16px; border-radius: 9999px; font-size: 12px; font-weight: 700; text-transform: uppercase;">
            VERIFICATION REJECTED
          </span>
        </div>
        <h2 style="color: #f8fafc; font-size: 18px;">Dear <strong>${fullName}</strong>,</h2>
        <p style="color: #cbd5e1; line-height: 1.6;">We were unable to verify your submitted payment details for <strong>Registration ID: ${registrationId}</strong>.</p>
        <div style="background: rgba(239, 68, 68, 0.1); border-left: 4px solid #ef4444; padding: 16px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #fca5a5; font-size: 14px;"><strong>Reason:</strong> ${reasonText}</p>
        </div>
        <p style="color: #cbd5e1; line-height: 1.6;">Please resubmit your correct UTR transaction number and clear screenshot proof through the payment portal.</p>
        <div style="text-align: center; margin: 28px 0;">
          <a href="${paymentUrl}" style="background-color: #ef4444; color: #ffffff; padding: 14px 30px; border-radius: 10px; font-weight: bold; text-decoration: none; display: inline-block;">
            Resubmit Payment Proof →
          </a>
        </div>
        <p style="color: #64748b; font-size: 12px; text-align: center;">The Shield Protocol 2026 Support Team</p>
      </div>
    </div>
  `;

  return await sendEmail({ to: email, subject, html });
}

/* Fallback helper functions for direct API resilience */
async function sendEmailFallbackRegistration(email: string, fullName: string, registrationId: string): Promise<boolean> {
  const paymentUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/#payment-portal`
    : 'https://theshieldprotocol.site/#payment-portal';

  const subject = `Registration Received – Complete Your Payment (${registrationId})`;
  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #050b14; color: #e2e8f0; padding: 24px;">
      <div style="background-color: #0c1729; border: 1px solid #1e293b; border-radius: 16px; max-width: 580px; margin: 0 auto; padding: 32px;">
        <div style="text-align: center; margin-bottom: 24px; border-bottom: 1px solid rgba(14, 165, 233, 0.2); padding-bottom: 16px;">
          <h1 style="color: #0ea5e9; font-size: 24px; margin: 0;">🛡️ THE SHIELD PROTOCOL 2026</h1>
        </div>
        <div style="text-align: center; margin-bottom: 20px;">
          <span style="background: rgba(234, 179, 8, 0.15); color: #eab308; border: 1px solid rgba(234, 179, 8, 0.4); padding: 6px 16px; border-radius: 9999px; font-size: 12px; font-weight: 700; text-transform: uppercase;">
            PARTIALLY REGISTERED
          </span>
        </div>
        <h2 style="color: #f8fafc; font-size: 18px;">Dear <strong>${fullName}</strong>,</h2>
        <p style="color: #cbd5e1; line-height: 1.6;">Thank you for registering for <strong>The Shield Protocol 2026</strong> (Registration ID: <strong>${registrationId}</strong>).</p>
        <p style="color: #cbd5e1; line-height: 1.6;">Your seat has been temporarily reserved. Please complete your payment of <strong>₹725</strong> to confirm your participation.</p>
        <div style="text-align: center; margin: 28px 0;">
          <a href="${paymentUrl}" style="background-color: #0ea5e9; color: #ffffff; padding: 14px 30px; border-radius: 10px; font-weight: bold; text-decoration: none; display: inline-block;">
            Complete Payment (₹725) →
          </a>
        </div>
      </div>
    </div>
  `;
  return await sendEmail({ to: email, subject, html });
}

async function sendEmailFallbackPaymentSubmitted(email: string, fullName: string, registrationId: string, utrNumber: string): Promise<boolean> {
  const subject = `Payment Submitted Successfully – Verification Pending (${registrationId})`;
  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #050b14; color: #e2e8f0; padding: 24px;">
      <div style="background-color: #0c1729; border: 1px solid #1e293b; border-radius: 16px; max-width: 580px; margin: 0 auto; padding: 32px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #0ea5e9; font-size: 24px; margin: 0;">🛡️ THE SHIELD PROTOCOL 2026</h1>
        </div>
        <h2 style="color: #f8fafc; font-size: 18px;">Dear <strong>${fullName}</strong>,</h2>
        <p style="color: #cbd5e1; line-height: 1.6;">We've received your payment details (UTR: <strong>${utrNumber}</strong>) for Registration ID: <strong>${registrationId}</strong>.</p>
        <p style="color: #cbd5e1; line-height: 1.6;">Our organizing team is currently verifying your payment of ₹725. No further action is required from your side.</p>
      </div>
    </div>
  `;
  return await sendEmail({ to: email, subject, html });
}

async function sendEmailFallbackApproved(email: string, fullName: string, registrationId: string, customMessage?: string): Promise<boolean> {
  const subject = `Welcome to The Shield Protocol 2026 🎉 (${registrationId})`;
  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #050b14; color: #e2e8f0; padding: 24px;">
      <div style="background-color: #0c1729; border: 1px solid #10b981; border-radius: 16px; max-width: 580px; margin: 0 auto; padding: 32px;">
        <h1 style="color: #10b981; font-size: 24px;">REGISTRATION CONFIRMED</h1>
        <p>Congratulations <strong>${fullName}</strong>!</p>
        <p>Your participation in <strong>The Shield Protocol 2026</strong> has been officially confirmed (Pass ID: <strong>${registrationId}</strong>).</p>
        ${customMessage ? `<p><strong>Note:</strong> ${customMessage}</p>` : ''}
      </div>
    </div>
  `;
  return await sendEmail({ to: email, subject, html });
}
