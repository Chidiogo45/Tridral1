import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  if (email.length > 254) return false;
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: `Method ${req.method} not allowed. Please use POST.`,
    });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};

    const {
      name,
      email,
      organization,
      companyName,
      inquiryType,
      subject,
      message,
      notes,
      honeypot,
      clientTimestamp,
    } = body;

    // 1. Anti-spam checks
    if (honeypot && String(honeypot).trim() !== '') {
      return res.status(400).json({
        success: false,
        error: 'Submission rejected by spam check.',
      });
    }

    if (clientTimestamp && typeof clientTimestamp === 'number') {
      const durationMs = Date.now() - clientTimestamp;
      if (durationMs < 1200) {
        return res.status(400).json({
          success: false,
          error: 'Submission was too fast. Please wait a moment and try again.',
        });
      }
    }

    // 2. Server-side validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Please enter your name (at least 2 characters).',
      });
    }
    if (name.length > 120) {
      return res.status(400).json({
        success: false,
        error: 'Name must be under 120 characters.',
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid business email address.',
      });
    }

    const orgValue =
      typeof organization === 'string' && organization.trim()
        ? organization.trim()
        : typeof companyName === 'string' && companyName.trim()
        ? companyName.trim()
        : '';

    if (orgValue.length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Please enter your organization name.',
      });
    }
    if (orgValue.length > 160) {
      return res.status(400).json({
        success: false,
        error: 'Organization name must be under 160 characters.',
      });
    }

    const inquiryValue =
      typeof inquiryType === 'string' && inquiryType.trim()
        ? inquiryType.trim()
        : 'General Inquiry';

    const rawMessage =
      typeof message === 'string' && message.trim()
        ? message.trim()
        : typeof notes === 'string' && notes.trim()
        ? notes.trim()
        : '';

    if (rawMessage.length < 5) {
      return res.status(400).json({
        success: false,
        error: 'Please include a short message (at least 5 characters).',
      });
    }
    if (rawMessage.length > 10000) {
      return res.status(400).json({
        success: false,
        error: 'Message must be under 10,000 characters.',
      });
    }

    // 3. Server-only API key check
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || apiKey.trim() === '') {
      console.error('[Tridral Contact API] RESEND_API_KEY is not configured.');
      return res.status(500).json({
        success: false,
        error: 'Email delivery is not configured on this server yet. Please email info@tridral.com directly.',
      });
    }

    const resend = new Resend(apiKey);
    const fromAddress = process.env.RESEND_FROM_EMAIL || 'Tridral Contact <contact@tridral.com>';
    const toAddress = 'info@tridral.com';

    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeOrg = escapeHtml(orgValue);
    const safeInquiry = escapeHtml(inquiryValue);
    const safeMessageHtml = escapeHtml(rawMessage).replace(/\n/g, '<br />');

    const emailSubject =
      subject && typeof subject === 'string' && subject.trim()
        ? `[Tridral] ${subject.trim()}`
        : `[Tridral Contact] ${inquiryValue} — ${orgValue}`;

    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Tridral Contact Inquiry</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #F4F6FA; margin: 0; padding: 24px; color: #172337;">
  <div style="max-width: 600px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 10px; overflow: hidden;">
    <div style="background-color: #101B2C; padding: 20px 24px; border-bottom: 3px solid #3979F6;">
      <h2 style="color: #FFFFFF; margin: 0; font-size: 18px; font-weight: 700;">
        Tridral · New Website Inquiry
      </h2>
      <p style="color: #18B8A6; margin: 4px 0 0 0; font-size: 12px; font-family: monospace;">
        ${new Date().toUTCString()}
      </p>
    </div>

    <div style="padding: 24px; border-bottom: 1px solid #E2E8F0;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 6px 0; color: #64748B; width: 140px;">Name:</td>
          <td style="padding: 6px 0; color: #172337; font-weight: 600;">${safeName}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #64748B;">Business email:</td>
          <td style="padding: 6px 0;"><a href="mailto:${safeEmail}" style="color: #3979F6; text-decoration: none; font-weight: 600;">${safeEmail}</a></td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #64748B;">Organization:</td>
          <td style="padding: 6px 0; color: #172337;">${safeOrg}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #64748B;">Inquiry type:</td>
          <td style="padding: 6px 0; color: #172337; font-weight: 600;">${safeInquiry}</td>
        </tr>
      </table>
    </div>

    <div style="padding: 24px; background-color: #F4F6FA;">
      <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748B; margin-bottom: 10px;">
        Message
      </div>
      <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; padding: 14px; font-size: 14px; line-height: 1.6; color: #172337;">
        ${safeMessageHtml}
      </div>
    </div>

    <div style="padding: 14px 24px; background-color: #FFFFFF; border-top: 1px solid #E2E8F0; font-size: 11px; color: #64748B;">
      Reply-To is set to ${safeEmail}.
    </div>
  </div>
</body>
</html>
    `.trim();

    const textBody = `
Tridral · New Website Inquiry
Timestamp: ${new Date().toUTCString()}
------------------------------------------------------
Name: ${name.trim()}
Business email: ${email.trim()}
Organization: ${orgValue}
Inquiry type: ${inquiryValue}

Message:
${rawMessage}
------------------------------------------------------
Reply-To: ${email.trim()}
    `.trim();

    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      replyTo: email.trim(),
      subject: emailSubject,
      html: htmlBody,
      text: textBody,
    });

    if (error) {
      console.error('[Tridral Contact API] Resend delivery failed:', error);
      return res.status(502).json({
        success: false,
        error: `Email delivery failed: ${error.message || 'Unknown provider error'}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Message delivered to info@tridral.com.',
      id: data?.id,
    });
  } catch (err: any) {
    console.error('[Tridral Contact API] Unexpected error:', err);
    return res.status(500).json({
      success: false,
      error: err?.message || 'An unexpected error occurred while processing your request.',
    });
  }
}
