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
      subject,
      companyName,
      companySize,
      rfpTypes,
      proposalsPerYear,
      interest,
      notes,
      message,
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
        error: 'Please enter a valid full name (at least 2 characters).',
      });
    }
    if (name.length > 120) {
      return res.status(400).json({
        success: false,
        error: 'Full name must be under 120 characters.',
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid work email address.',
      });
    }

    if (!companyName || typeof companyName !== 'string' || companyName.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Please enter your company name.',
      });
    }

    const rfpList = Array.isArray(rfpTypes)
      ? rfpTypes.map((v) => String(v).trim()).filter(Boolean)
      : [];

    if (rfpList.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Please select at least one RFP type (Federal, State, or Local).',
      });
    }

    const rawNotes = typeof notes === 'string' ? notes.trim() : typeof message === 'string' ? message.trim() : '';
    if (rawNotes.length > 10000) {
      return res.status(400).json({
        success: false,
        error: 'Notes must be under 10,000 characters.',
      });
    }

    // 3. Server-only API key check
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || apiKey.trim() === '') {
      console.error('[Tridral Early Access API] RESEND_API_KEY is not configured.');
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
    const safeCompany = escapeHtml(companyName.trim());
    const safeSize = companySize ? escapeHtml(String(companySize).trim()) : 'Not specified';
    const safeRfpTypes = escapeHtml(rfpList.join(', '));
    const safeVolume = proposalsPerYear ? escapeHtml(String(proposalsPerYear).trim()) : 'Not specified';
    const safeInterest = interest ? escapeHtml(String(interest).trim()) : 'Early access';
    const safeNotes = rawNotes
      ? escapeHtml(rawNotes).replace(/\n/g, '<br />')
      : '<span style="color:#5B6472;">No additional notes provided.</span>';

    const emailSubject =
      subject && typeof subject === 'string' && subject.trim()
        ? `[Tridral] ${subject.trim()}`
        : `[Tridral Early Access] ${safeName} (${safeCompany})`;

    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Tridral Early Access Request</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #F7F9FC; margin: 0; padding: 24px; color: #0B0F1A;">
  <div style="max-width: 600px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden;">
    <div style="background-color: #0B0F1A; padding: 20px 24px; border-bottom: 3px solid #2F5FFF;">
      <h2 style="color: #FFFFFF; margin: 0; font-size: 18px; font-weight: 700;">
        Tridral · New Early Access Request
      </h2>
      <p style="color: #2DD4BF; margin: 4px 0 0 0; font-size: 12px; font-family: monospace;">
        ${new Date().toUTCString()}
      </p>
    </div>

    <div style="padding: 24px; border-bottom: 1px solid #F1F5F9;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 6px 0; color: #5B6472; width: 150px;">Full name:</td>
          <td style="padding: 6px 0; color: #0B0F1A; font-weight: 600;">${safeName}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #5B6472;">Work email:</td>
          <td style="padding: 6px 0;"><a href="mailto:${safeEmail}" style="color: #2F5FFF; text-decoration: none; font-weight: 600;">${safeEmail}</a></td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #5B6472;">Company:</td>
          <td style="padding: 6px 0; color: #0B0F1A;">${safeCompany}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #5B6472;">Company size:</td>
          <td style="padding: 6px 0; color: #0B0F1A;">${safeSize}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #5B6472;">RFP types:</td>
          <td style="padding: 6px 0; color: #0B0F1A; font-weight: 600;">${safeRfpTypes}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #5B6472;">Proposals / year:</td>
          <td style="padding: 6px 0; color: #0B0F1A;">${safeVolume}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #5B6472;">I'd like:</td>
          <td style="padding: 6px 0; color: #0B0F1A; font-weight: 600;">${safeInterest}</td>
        </tr>
      </table>
    </div>

    <div style="padding: 24px; background-color: #FAFCFE;">
      <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #5B6472; margin-bottom: 10px;">
        Notes
      </div>
      <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; padding: 14px; font-size: 14px; line-height: 1.6; color: #0B0F1A;">
        ${safeNotes}
      </div>
    </div>

    <div style="padding: 14px 24px; background-color: #F8FAFC; border-top: 1px solid #E2E8F0; font-size: 11px; color: #5B6472;">
      Reply-To is set to ${safeEmail}.
    </div>
  </div>
</body>
</html>
    `.trim();

    const textBody = `
Tridral · New Early Access Request
Timestamp: ${new Date().toUTCString()}
------------------------------------------------------
Full name: ${name.trim()}
Work email: ${email.trim()}
Company: ${companyName.trim()}
Company size: ${companySize || 'Not specified'}
RFP types: ${rfpList.join(', ')}
Proposals per year: ${proposalsPerYear || 'Not specified'}
I'd like: ${interest || 'Early access'}

Notes:
${rawNotes || 'No additional notes provided.'}
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
      console.error('[Tridral Early Access API] Resend delivery failed:', error);
      return res.status(502).json({
        success: false,
        error: `Email delivery failed: ${error.message || 'Unknown provider error'}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Early access request delivered to info@tridral.com.',
      id: data?.id,
    });
  } catch (err: any) {
    console.error('[Tridral Early Access API] Unexpected error:', err);
    return res.status(500).json({
      success: false,
      error: err?.message || 'An unexpected error occurred while processing your request.',
    });
  }
}
