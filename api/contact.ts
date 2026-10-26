import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

// Basic HTML sanitizer for secure email rendering
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// RFC 5322 compliant simplified email validator
function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  if (email.length > 254) return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS / Method check
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
    // Parse JSON body if needed
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};

    const {
      name,
      email,
      subject,
      message,
      companyName,
      companySize,
      primaryRequirement,
      deploymentTimeline,
      honeypot,
      clientTimestamp,
    } = body;

    // 1. Anti-spam checks
    // Honeypot check: bots fill hidden fields
    if (honeypot && String(honeypot).trim() !== '') {
      // Reject silently or with bad request
      return res.status(400).json({
        success: false,
        error: 'Spam submission detected by honeypot verification.',
      });
    }

    // Velocity check: human submission takes at least 1.2 seconds from page render
    if (clientTimestamp && typeof clientTimestamp === 'number') {
      const durationMs = Date.now() - clientTimestamp;
      if (durationMs < 1200) {
        return res.status(400).json({
          success: false,
          error: 'Submission was too fast. Please take a moment before submitting.',
        });
      }
    }

    // 2. Server-side field validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid full name (minimum 2 characters).',
      });
    }
    if (name.length > 120) {
      return res.status(400).json({
        success: false,
        error: 'Name exceeds maximum length limit of 120 characters.',
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid work email address.',
      });
    }

    const trimmedMessage = typeof message === 'string' ? message.trim() : '';
    if (!trimmedMessage || trimmedMessage.length < 5) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a message or environment details (minimum 5 characters).',
      });
    }
    if (trimmedMessage.length > 10000) {
      return res.status(400).json({
        success: false,
        error: 'Message exceeds maximum length limit of 10,000 characters.',
      });
    }

    // 3. Verify Resend API Key is configured in environment
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || apiKey.trim() === '') {
      console.error('[Tridral Contact API] RESEND_API_KEY environment variable is not configured.');
      return res.status(500).json({
        success: false,
        error: 'Email delivery service is not configured. Please ensure RESEND_API_KEY is set in Vercel environment variables.',
      });
    }

    const resend = new Resend(apiKey);

    // Sender configuration:
    // With tridral.com verified in Resend, default sender is contact@tridral.com.
    // Can also be customized via RESEND_FROM_EMAIL in Vercel environment variables.
    const fromAddress = process.env.RESEND_FROM_EMAIL || 'Tridral Contact <contact@tridral.com>';
    const toAddress = 'info@tridral.com';

    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeCompany = companyName ? escapeHtml(String(companyName).trim()) : 'Not specified';
    const safeCompanySize = companySize ? escapeHtml(String(companySize).trim()) : 'Not specified';
    const safeRequirement = primaryRequirement ? escapeHtml(String(primaryRequirement).trim()) : 'General Inquiries';
    const safeTimeline = deploymentTimeline ? escapeHtml(String(deploymentTimeline).trim()) : 'Not specified';
    const safeMessage = escapeHtml(trimmedMessage).replace(/\n/g, '<br />');

    const emailSubject = subject && typeof subject === 'string' && subject.trim()
      ? `[Tridral Contact] ${subject.trim()}`
      : `[Tridral Contact] New inquiry from ${safeName} (${safeCompany})`;

    // Formatted HTML Email Body
    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Tridral Inquiry</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F7F9FC; margin: 0; padding: 24px; color: #0B0F1A;">
  <div style="max-width: 620px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(11, 15, 26, 0.05);">
    
    <!-- Header -->
    <div style="background-color: #0B0F1A; padding: 20px 24px; border-bottom: 3px solid #2F5FFF;">
      <h2 style="color: #FFFFFF; margin: 0; font-size: 18px; font-weight: 700; letter-spacing: -0.01em;">
        Tridral · New Inbound Transmission
      </h2>
      <p style="color: #2DD4BF; margin: 4px 0 0 0; font-size: 12px; font-family: monospace;">
        Timestamp: ${new Date().toUTCString()}
      </p>
    </div>

    <!-- Contact & Company Details -->
    <div style="padding: 24px; border-bottom: 1px solid #F1F5F9;">
      <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #2F5FFF; margin: 0 0 16px 0;">
        Sender Information
      </h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 6px 0; color: #5B6472; width: 140px; font-weight: 500;">Full Name:</td>
          <td style="padding: 6px 0; color: #0B0F1A; font-weight: 600;">${safeName}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #5B6472; font-weight: 500;">Work Email:</td>
          <td style="padding: 6px 0; color: #2F5FFF; font-weight: 600;">
            <a href="mailto:${safeEmail}" style="color: #2F5FFF; text-decoration: none;">${safeEmail}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #5B6472; font-weight: 500;">Company:</td>
          <td style="padding: 6px 0; color: #0B0F1A;">${safeCompany}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #5B6472; font-weight: 500;">Company Size:</td>
          <td style="padding: 6px 0; color: #0B0F1A;">${safeCompanySize}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #5B6472; font-weight: 500;">Primary Requirement:</td>
          <td style="padding: 6px 0; color: #0B0F1A; font-weight: 600;">${safeRequirement}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #5B6472; font-weight: 500;">Deployment Horizon:</td>
          <td style="padding: 6px 0; color: #0B0F1A;">${safeTimeline}</td>
        </tr>
      </table>
    </div>

    <!-- Message / Environment Content -->
    <div style="padding: 24px; background-color: #FAFCFE;">
      <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #5B6472; margin: 0 0 12px 0;">
        Message / Environment Specifications
      </h3>
      <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6; color: #1E293B;">
        ${safeMessage}
      </div>
    </div>

    <!-- Footer metadata -->
    <div style="padding: 16px 24px; background-color: #F8FAFC; border-top: 1px solid #E2E8F0; font-size: 11px; color: #64748B;">
      Reply-to is configured directly to <a href="mailto:${safeEmail}" style="color: #2F5FFF;">${safeEmail}</a>. You can hit reply directly in Namecheap Private Email to respond.
    </div>
  </div>
</body>
</html>
    `.trim();

    // Plain text alternative
    const textBody = `
New Tridral Inquiry / Pilot Request
Timestamp: ${new Date().toUTCString()}
------------------------------------------------------
Sender: ${name.trim()}
Email: ${email.trim()}
Company: ${companyName || 'Not specified'} (${companySize || 'Not specified'})
Primary Requirement: ${primaryRequirement || 'General Inquiries'}
Deployment Timeline: ${deploymentTimeline || 'Not specified'}

Message / Environment Details:
${trimmedMessage}
------------------------------------------------------
Reply-To: ${email.trim()}
    `.trim();

    // 4. Send email via Resend
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      replyTo: email.trim(),
      subject: emailSubject,
      html: htmlBody,
      text: textBody,
    });

    if (error) {
      console.error('[Tridral Contact API] Resend email delivery failed:', error);
      return res.status(502).json({
        success: false,
        error: `Email delivery failed: ${error.message || 'Unknown provider error'}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Your inquiry has been successfully delivered to info@tridral.com.',
      id: data?.id,
    });
  } catch (err: any) {
    console.error('[Tridral Contact API] Unexpected error in handler:', err);
    return res.status(500).json({
      success: false,
      error: err.message || 'An unexpected error occurred while processing your request.',
    });
  }
}
