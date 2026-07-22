import { NextResponse } from 'next/server'
import { createCaseStudyLead, getCaseStudy } from '@/lib/case-studies-db'
import { sendCaseStudyPdf, sendNotification } from '@/lib/mailer'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'
import { appendLeadToSheet } from '@/lib/sheets'
import { readLeadSource } from '@/lib/lead-source'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_CHARS_RE = /^[+\d\s().-]+$/

function readString(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

export async function POST(req: Request) {
  // 5 submissions per IP per minute
  if (!checkRateLimit(`case-study:${getClientIp(req)}`, { max: 5, windowMs: 60_000 }))
    return NextResponse.json(
      { error: 'Too many requests. Please wait a moment.' },
      { status: 429 }
    )

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const caseStudyId = readString(body.caseStudyId)
  const name = readString(body.name)
  const email = readString(body.email).toLowerCase()
  const phone = readString(body.phone)
  const source = readLeadSource(body, 'Case Study Download', req.headers.get('referer'))

  const errors: Record<string, string> = {}
  const digitCount = phone.replace(/\D/g, '').length

  if (!name || name.length < 2 || name.length > 100)
    errors.name = 'Name must be 2–100 characters.'
  if (!email || email.length > 254 || !EMAIL_RE.test(email))
    errors.email = 'Enter a valid email address.'
  if (!phone || !PHONE_CHARS_RE.test(phone) || digitCount < 7 || digitCount > 15)
    errors.phone = 'Enter a valid phone number.'

  if (Object.keys(errors).length > 0)
    return NextResponse.json(
      { error: 'Please correct the highlighted fields.', fieldErrors: errors },
      { status: 400 }
    )

  const study = caseStudyId ? await getCaseStudy(caseStudyId) : null
  if (!study || study.status !== 'published' || !study.pdfUrl)
    return NextResponse.json(
      { error: 'This case study is not available for download right now.' },
      { status: 404 }
    )

  try {
    await createCaseStudyLead({
      caseStudyId: study.id,
      caseStudyTitle: study.title,
      name,
      email,
      phone,
      sourcePath: source.sourcePath,
    })
  } catch (err) {
    console.error('Case study lead error:', err)
    return NextResponse.json(
      { error: 'We could not process your request right now. Please try again in a moment.' },
      { status: 500 }
    )
  }

  try {
    await sendCaseStudyPdf({
      to: email,
      name,
      title: study.title,
      company: study.company,
      pdfUrl: study.pdfUrl,
    })
  } catch (err) {
    console.error('Case study PDF email error:', err)
    return NextResponse.json(
      { error: 'We saved your request but could not send the email. Please try again shortly.' },
      { status: 502 }
    )
  }

  sendNotification(`Case Study Download — ${study.title}`, {
    name,
    email,
    phone,
    company: study.company || '—',
    message: `Requested case study: ${study.title}`,
    formType: 'Case Study Download',
    ...source,
  }).catch((err: unknown) => console.error('Case study notification error:', err))

  appendLeadToSheet('Case Study Download', {
    name,
    email,
    phone,
    company: study.company,
    message: study.title,
    ...source,
  }).catch(() => {})

  return NextResponse.json({ success: true })
}
