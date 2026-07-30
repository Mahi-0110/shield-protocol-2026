// @ts-nocheck
/**
 * Reusable HTML Email Template for Brevo Email Automation
 * The Shield Protocol 2026
 * Theme: Dark Cybersecurity Mode, Glassmorphism, Cyber Blue Accent, Responsive & Outlook compatible
 */

export const SENDER_EMAIL = 'noreply@theshieldprotocol.site';
export const SENDER_NAME = 'The Shield Protocol';

export interface ConfirmationEmailTemplateInput {
  fullName: string;
  registrationId: string;
  college?: string;
  department?: string;
}

export function getBrevoConfirmationEmailTemplate(input: ConfirmationEmailTemplateInput): string {
  const {
    fullName,
    registrationId,
    college = 'BITS Vizag',
  } = input;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registration Confirmed – The Shield Protocol 2026</title>
</head>
<body style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #050b14; color: #e2e8f0; margin: 0; padding: 24px 12px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #0c1729; border: 1px solid rgba(14, 165, 233, 0.3); border-radius: 16px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6); overflow: hidden;">
    
    <!-- HEADER SECTION -->
    <tr>
      <td style="padding: 32px 32px 24px 32px; text-align: center; border-bottom: 1px solid rgba(14, 165, 233, 0.2); background: linear-gradient(180deg, rgba(14, 165, 233, 0.1) 0%, rgba(12, 23, 41, 0) 100%);">
        <!-- Logo / Icon -->
        <div style="margin-bottom: 12px;">
          <span style="font-size: 38px; line-height: 1;">🛡️</span>
        </div>
        <h1 style="color: #0ea5e9; font-size: 24px; font-weight: 800; margin: 0 0 6px 0; letter-spacing: 1.5px; text-transform: uppercase;">
          THE SHIELD PROTOCOL 2026
        </h1>
        <p style="color: #38bdf8; font-size: 13px; font-weight: 700; margin: 0; letter-spacing: 2px; text-transform: uppercase;">
          Registration Confirmed
        </p>
      </td>
    </tr>

    <!-- STATUS BADGES SECTION -->
    <tr>
      <td style="padding: 24px 32px 12px 32px; text-align: center;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center">
          <tr>
            <td style="padding: 4px 8px;">
              <span style="background-color: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; color: #34d399; padding: 6px 16px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; display: inline-block;">
                Registration Status: Confirmed
              </span>
            </td>
            <td style="padding: 4px 8px;">
              <span style="background-color: rgba(14, 165, 233, 0.15); border: 1px solid #0ea5e9; color: #38bdf8; padding: 6px 16px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; display: inline-block;">
                Payment Status: Verified
              </span>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- WELCOME MESSAGE -->
    <tr>
      <td style="padding: 16px 32px;">
        <h2 style="color: #f8fafc; font-size: 18px; font-weight: 700; margin: 0 0 12px 0;">
          Dear <strong>${fullName}</strong>,
        </h2>
        <p style="color: #cbd5e1; font-size: 14px; line-height: 1.7; margin: 0; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); padding: 16px; border-radius: 12px;">
          Congratulations! Your registration has been successfully verified by our organizing team. Your participation in <strong>The Shield Protocol 2026</strong> is now officially confirmed. We look forward to welcoming you to an exciting experience in cybersecurity, AI, innovation, and hands-on learning.
        </p>
      </td>
    </tr>

    <!-- PARTICIPANT & PASS INFORMATION -->
    <tr>
      <td style="padding: 12px 32px;">
        <div style="background: rgba(14, 165, 233, 0.08); border: 1px solid rgba(14, 165, 233, 0.3); border-radius: 14px; padding: 20px; text-align: center;">
          <p style="color: #94a3b8; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; margin: 0 0 6px 0;">
            Official Participant Gate Pass ID
          </p>
          <p style="color: #38bdf8; font-size: 26px; font-weight: 800; font-family: 'Courier New', Courier, monospace; letter-spacing: 2px; margin: 0 0 12px 0;">
            ${registrationId}
          </p>
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-top: 1px solid rgba(14, 165, 233, 0.2); padding-top: 12px; font-size: 13px;">
            <tr>
              <td style="color: #94a3b8; padding: 4px 0; text-align: left;">Participant Name:</td>
              <td style="color: #f1f5f9; font-weight: 600; padding: 4px 0; text-align: right;">${fullName}</td>
            </tr>
            <tr>
              <td style="color: #94a3b8; padding: 4px 0; text-align: left;">College / Institution:</td>
              <td style="color: #f1f5f9; font-weight: 600; padding: 4px 0; text-align: right;">${college}</td>
            </tr>
          </table>
        </div>
      </td>
    </tr>

    <!-- EVENT DETAILS SECTION -->
    <tr>
      <td style="padding: 16px 32px;">
        <div style="background-color: #111e36; border-radius: 12px; padding: 20px; border: 1px solid rgba(255, 255, 255, 0.08);">
          <h3 style="color: #38bdf8; font-size: 14px; font-weight: 700; margin: 0 0 14px 0; text-transform: uppercase; letter-spacing: 1px;">
            📍 Event Information
          </h3>
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 13px; line-height: 1.8;">
            <tr>
              <td style="color: #94a3b8; width: 40%;">Event Name:</td>
              <td style="color: #ffffff; font-weight: 600;">The Shield Protocol 2026</td>
            </tr>
            <tr>
              <td style="color: #94a3b8;">Event Date:</td>
              <td style="color: #ffffff; font-weight: 600;">August 11-14, 2026</td>
            </tr>
            <tr>
              <td style="color: #94a3b8;">Reporting Time:</td>
              <td style="color: #ffffff; font-weight: 600;">8:30 AM IST</td>
            </tr>
            <tr>
              <td style="color: #94a3b8;">Venue:</td>
              <td style="color: #ffffff; font-weight: 600;">Bits College Campus, Seminar Hall</td>
            </tr>
          </table>
        </div>
      </td>
    </tr>

    <!-- EVENT INSTRUCTIONS -->
    <tr>
      <td style="padding: 12px 32px;">
        <div style="background: rgba(234, 179, 8, 0.05); border-left: 4px solid #eab308; border-radius: 8px; padding: 16px;">
          <h3 style="color: #eab308; font-size: 13px; font-weight: 700; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 1px;">
            ⚠️ Event Instructions & Reminders
          </h3>
          <ul style="color: #cbd5e1; font-size: 13px; line-height: 1.8; margin: 0; padding-left: 20px;">
            <li>Carry your <strong>College ID Card</strong> for verification at the entrance.</li>
            <li>Bring your <strong>Laptop</strong> (if required for cybersecurity hands-on tracks).</li>
            <li>Carry your <strong>Laptop Charger</strong> and necessary extension cords.</li>
            <li>Arrive at the venue <strong>before the reporting time (8:30 AM IST)</strong>.</li>
            <li>Follow all event guidelines shared by the organizing committee.</li>
          </ul>
        </div>
      </td>
    </tr>

    <!-- SUPPORT SECTION -->
    <tr>
      <td style="padding: 20px 32px; text-align: center;">
        <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 12px; padding: 16px;">
          <p style="color: #94a3b8; font-size: 12px; font-weight: 600; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px;">
            Need Assistance?
          </p>
          <p style="color: #cbd5e1; font-size: 13px; margin: 0 0 6px 0;">
            Support Email: <a href="mailto:support@theshieldprotocol.site" style="color: #0ea5e9; text-decoration: none; font-weight: 600;">support@theshieldprotocol.site</a>
          </p>
          <p style="color: #cbd5e1; font-size: 13px; margin: 0;">
            Official Website: <a href="https://theshieldprotocol.site" target="_blank" rel="noopener noreferrer" style="color: #0ea5e9; text-decoration: none; font-weight: 600;">https://theshieldprotocol.site</a>
          </p>
        </div>
      </td>
    </tr>

    <!-- FOOTER SECTION -->
    <tr>
      <td style="padding: 24px 32px 32px 32px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.08); background-color: #08101d;">
        <p style="color: #0ea5e9; font-size: 13px; font-weight: 700; margin: 0 0 4px 0; letter-spacing: 1px;">
          The Shield Protocol 2026
        </p>
        <p style="color: #64748b; font-size: 12px; margin: 0 0 12px 0;">
          Building the Next Generation of Cybersecurity Innovators.
        </p>
        <p style="color: #475569; font-size: 10px; margin: 0;">
          This is an automated verification message. Please do not reply directly to this email.
        </p>
      </td>
    </tr>

  </table>
</body>
</html>`;
}
