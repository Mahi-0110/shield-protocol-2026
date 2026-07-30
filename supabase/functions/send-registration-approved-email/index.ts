/// <reference path="../deno.d.ts" />
import { corsHeaders } from '../_shared/cors.ts'
import { getRegistrationApprovedTemplate, SENDER_EMAIL } from '../_shared/emailTemplates.ts'

Deno.serve(async (req: Request) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const { email, fullName, registrationId, venue, reportingTime, customMessage } = await req.json()

    if (!email || !fullName || !registrationId) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters: email, fullName, registrationId' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    if (!resendApiKey) {
      console.warn('[send-registration-approved-email] RESEND_API_KEY is not set in secrets')
      return new Response(
        JSON.stringify({ success: false, message: 'RESEND_API_KEY missing in secrets' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const html = getRegistrationApprovedTemplate({
      fullName,
      registrationId,
      venue,
      reportingTime,
      customMessage,
    })

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: SENDER_EMAIL,
        to: [email],
        subject: 'Welcome to The Shield Protocol 2026',
        html,
      }),
    })

    const result = await resendResponse.json()

    if (!resendResponse.ok) {
      console.error('[send-registration-approved-email] Resend API Failure:', result)
      return new Response(
        JSON.stringify({ success: false, error: result }),
        { status: resendResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('[send-registration-approved-email] Email dispatched successfully:', result)
    return new Response(
      JSON.stringify({ success: true, data: result }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err: any) {
    console.error('[send-registration-approved-email] Edge function exception:', err)
    return new Response(
      JSON.stringify({ success: false, error: err?.message || 'Internal Server Error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
