/// <reference path="../deno.d.ts" />
import { corsHeaders } from '../_shared/cors.ts'
import { getRegistrationReceivedTemplate, SENDER_EMAIL } from '../_shared/emailTemplates.ts'

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

    const { email, fullName, registrationId, college, registrationFee, paymentUrl } = await req.json()

    if (!email || !fullName || !registrationId) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters: email, fullName, registrationId' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    if (!resendApiKey) {
      console.warn('[send-registration-email] RESEND_API_KEY is not set in secrets')
      return new Response(
        JSON.stringify({ success: false, message: 'RESEND_API_KEY missing in secrets' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const html = getRegistrationReceivedTemplate({
      fullName,
      registrationId,
      college,
      registrationFee: registrationFee || 725,
      paymentUrl: paymentUrl || 'https://theshieldprotocol.site/#payment-portal',
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
        subject: `Registration Received – Complete Your Payment (${registrationId})`,
        html,
      }),
    })

    const result = await resendResponse.json()

    if (!resendResponse.ok) {
      console.error('[send-registration-email] Resend API Failure:', result)
      return new Response(
        JSON.stringify({ success: false, error: result }),
        { status: resendResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('[send-registration-email] Email dispatched successfully:', result)
    return new Response(
      JSON.stringify({ success: true, data: result }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err: any) {
    console.error('[send-registration-email] Edge function exception:', err)
    return new Response(
      JSON.stringify({ success: false, error: err?.message || 'Internal Server Error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
