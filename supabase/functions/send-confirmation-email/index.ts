// @ts-nocheck
/// <reference path="../deno.d.ts" />
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.111.0'
import { getBrevoConfirmationEmailTemplate } from '../_shared/emailTemplates.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
  // 1. Handle CORS OPTIONS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  // 2. Reject non-POST methods
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ success: false, message: 'Method Not Allowed. Only POST requests are accepted.' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  try {
    // 3. Parse request payload
    const body = await req.json()
    const { registrationId, email, fullName, college, department, forceResend } = body

    if (!registrationId || !email || !fullName) {
      return new Response(
        JSON.stringify({ success: false, message: 'Missing required parameters: registrationId, email, fullName' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // 4. Read secrets & env vars
    const denoEnv = (typeof Deno !== 'undefined' ? Deno.env : null)
    const brevoApiKey = denoEnv?.get('BREVO_API_KEY')
    const senderEmail = denoEnv?.get('BREVO_SENDER_EMAIL') || 'noreply@theshieldprotocol.site'
    const senderName = denoEnv?.get('BREVO_SENDER_NAME') || 'The Shield Protocol'
    const supabaseUrl = denoEnv?.get('SUPABASE_URL') || 'https://dayhrigdfggmspksyuya.supabase.co'
    const supabaseKey = denoEnv?.get('SUPABASE_SERVICE_ROLE_KEY') || denoEnv?.get('SUPABASE_ANON_KEY') || ''

    if (!brevoApiKey) {
      console.error('[send-confirmation-email] BREVO_API_KEY secret is not set!')
      return new Response(
        JSON.stringify({ success: false, message: 'BREVO_API_KEY secret missing in Supabase Edge Function Secrets.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Initialize Supabase Client
    const supabase = createClient(supabaseUrl, supabaseKey)

    // 5. Check duplicate email prevention if not forceResend
    if (!forceResend) {
      try {
        const { data: regRecord } = await supabase
          .from('registrations')
          .select('email_sent')
          .eq('registration_id', registrationId)
          .maybeSingle()

        if (regRecord && regRecord.email_sent === true) {
          console.log(`[send-confirmation-email] Email already sent for ${registrationId}. Rejecting auto-resend.`)
          return new Response(
            JSON.stringify({
              success: false,
              alreadySent: true,
              message: 'Confirmation email has already been sent.',
            }),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }
      } catch (dbErr) {
        console.warn('[send-confirmation-email] Database lookup warning:', dbErr)
      }
    }

    // 6. Generate HTML Email Template
    const htmlContent = getBrevoConfirmationEmailTemplate({
      fullName,
      registrationId,
      college,
      department,
    })

    // 7. Call Brevo Transactional Email API
    console.log(`[send-confirmation-email] Dispatching Brevo email for Reg ID: ${registrationId} to ${email}...`)

    const brevoPayload = {
      sender: { name: senderName, email: senderEmail },
      to: [{ email, name: fullName }],
      subject: `Registration Confirmed – The Shield Protocol 2026 (${registrationId})`,
      htmlContent,
    }

    const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': brevoApiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(brevoPayload),
    })

    const brevoResult = await brevoRes.json()

    // 8. Handle Brevo API Failure
    if (!brevoRes.ok) {
      let failureReason = brevoResult.message || brevoResult.code || JSON.stringify(brevoResult)
      console.error(`[send-confirmation-email] Brevo API Error (${brevoRes.status}):`, failureReason)

      if (failureReason.includes('unrecognised IP address') || failureReason.includes('authorised_ips')) {
        failureReason = 'Brevo IP restriction detected. Please disable Authorized IPs setting at https://app.brevo.com/security/authorised_ips so Supabase cloud servers can send emails.'
      }

      // Try logging failure in email_logs
      try {
        await supabase.from('email_logs').insert([
          {
            registration_id: registrationId,
            participant_email: email,
            timestamp: new Date().toISOString(),
            delivery_status: 'FAILURE',
            failure_reason: failureReason,
          },
        ])
      } catch (logErr) {
        console.warn('Logging failure warning:', logErr)
      }

      return new Response(
        JSON.stringify({
          success: false,
          message: `Brevo email dispatch failed: ${failureReason}`,
          error: brevoResult,
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // 9. Handle Brevo API Success
    const messageId = brevoResult.messageId || brevoResult.messageID || `brevo-${Date.now()}`
    console.log(`[send-confirmation-email] Success! Message ID: ${messageId}`)

    // Update registrations table setting email_sent = true
    try {
      await supabase
        .from('registrations')
        .update({ email_sent: true })
        .eq('registration_id', registrationId)
    } catch (updErr) {
      console.warn('Update email_sent warning:', updErr)
    }

    // Log success in email_logs
    try {
      await supabase.from('email_logs').insert([
        {
          registration_id: registrationId,
          participant_email: email,
          timestamp: new Date().toISOString(),
          delivery_status: 'SUCCESS',
          provider_response_id: messageId,
        },
      ])
    } catch (logErr) {
      console.warn('Log success warning:', logErr)
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Confirmation email successfully dispatched via Brevo.',
        messageId,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err: any) {
    console.error('[send-confirmation-email] Edge function exception:', err)
    return new Response(
      JSON.stringify({ success: false, message: err.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
