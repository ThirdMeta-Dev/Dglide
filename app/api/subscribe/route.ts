import { NextResponse } from 'next/server'
import { appendLeadToSheet } from '@/lib/sheets'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'
import { sendNotification } from '@/lib/mailer'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
  if (!checkRateLimit(`subscribe:${getClientIp(req)}`, { max: 5, windowMs: 60_000 }))
    return NextResponse.json({ error: 'Too many requests. Please wait a moment.' }, { status: 429 })

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''

  if (!email || email.length > 254 || !EMAIL_RE.test(email))
    return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })

  appendLeadToSheet('Newsletter Subscribe', { email }).catch(() => {})
  sendNotification('New Newsletter Subscribe', {
    name: 'Newsletter Subscriber',
    email,
    company: 'Newsletter',
    message: 'Subscribed from the website newsletter form.',
  }).catch((err: unknown) => console.error('Newsletter subscribe email error:', err))

  return NextResponse.json({ success: true })
}
