import nodemailer from 'nodemailer'

/**
 * Minimal structural types for the Vercel Node runtime's request/response objects —
 * kept local instead of depending on @vercel/node (which drags in a large, currently
 * vulnerable dev-tooling dependency chain just for these two type shapes).
 */
interface VercelRequest {
  method?: string
  body?: unknown
}

interface VercelResponse {
  status(code: number): VercelResponse
  json(body: unknown): void
}

interface ContactPayload {
  name: string
  email: string
  message: string
  company?: string // honeypot field — real users never fill this in
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function parseBody(body: unknown): ContactPayload | null {
  const data = typeof body === 'string' ? safeJsonParse(body) : body
  if (!data || typeof data !== 'object') return null

  const { name, email, message, company } = data as Record<string, unknown>
  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
    return null
  }
  return { name, email, message, company: typeof company === 'string' ? company : undefined }
}

function safeJsonParse(value: string): unknown {
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' })
    return
  }

  const payload = parseBody(req.body)
  if (!payload) {
    res.status(400).json({ ok: false, error: 'Invalid request body' })
    return
  }

  const name = payload.name.trim()
  const email = payload.email.trim()
  const message = payload.message.trim()

  // Honeypot: bots fill every field, real visitors never see or fill this one.
  if (payload.company) {
    res.status(200).json({ ok: true })
    return
  }

  if (!name || name.length > 100) {
    res.status(400).json({ ok: false, error: 'Please provide a valid name.' })
    return
  }
  if (!EMAIL_RE.test(email) || email.length > 200) {
    res.status(400).json({ ok: false, error: 'Please provide a valid email address.' })
    return
  }
  if (!message || message.length > 5000) {
    res.status(400).json({ ok: false, error: 'Message must be between 1 and 5000 characters.' })
    return
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } = process.env

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    console.error('Contact form misconfigured: missing SMTP_* environment variables')
    res.status(500).json({ ok: false, error: 'Email service is not configured.' })
    return
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: SMTP_SECURE === 'true',
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })

    await transporter.sendMail({
      from: `"${name} (Portfolio Contact)" <${SMTP_USER}>`,
      to: CONTACT_TO_EMAIL || SMTP_USER,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `
        <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
      `,
    })

    res.status(200).json({ ok: true })
  } catch (error) {
    console.error('Failed to send contact email', error)
    res.status(500).json({ ok: false, error: 'Failed to send message. Please try again later.' })
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
