import { supabase } from './supabase';

export interface ConfirmationEmailInput {
  registrationId: string;
  email: string;
  fullName: string;
  college?: string;
  department?: string;
  forceResend?: boolean;
}

export interface ConfirmationEmailResult {
  success: boolean;
  alreadySent?: boolean;
  message?: string;
  messageId?: string;
}

/**
 * Invokes Supabase Edge Function 'send-confirmation-email'
 * Uses Brevo Transactional Email API server-side
 * Triggered ONLY when Admin approves participant
 */
export async function sendConfirmationEmail(
  input: ConfirmationEmailInput
): Promise<ConfirmationEmailResult> {
  const { registrationId, email, fullName, college, department, forceResend } = input;

  try {
    const { data, error } = await supabase.functions.invoke('send-confirmation-email', {
      body: {
        registrationId,
        email,
        fullName,
        college,
        department,
        forceResend: forceResend || false,
      },
    });

    if (error) {
      console.error('[sendConfirmationEmail Edge Function Error]:', error.message || error);
      return {
        success: false,
        message: error.message || 'Failed to invoke confirmation email edge function.',
      };
    }

    if (data?.alreadySent) {
      return {
        success: false,
        alreadySent: true,
        message: data.message || 'Confirmation email has already been sent.',
      };
    }

    if (!data?.success) {
      return {
        success: false,
        message: data?.message || 'Confirmation email sending failed.',
      };
    }

    console.log('[sendConfirmationEmail Success]:', data);
    return {
      success: true,
      messageId: data.messageId,
      message: data.message,
    };
  } catch (err: any) {
    console.error('[sendConfirmationEmail Exception]:', err);
    return {
      success: false,
      message: err.message || 'An unexpected error occurred while sending confirmation email.',
    };
  }
}
