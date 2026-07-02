const WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL

// Row: [Timestamp, Form Type, Name, Email, Phone, Company, Message]
export async function appendLeadToSheet(
  formType: string,
  fields: {
    name?: string
    email?: string
    phone?: string
    company?: string
    message?: string
  }
): Promise<void> {
  if (!WEBHOOK_URL) return
  try {
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType,
        name:    fields.name    ?? '',
        email:   fields.email   ?? '',
        phone:   fields.phone   ?? '',
        company: fields.company ?? '',
        message: fields.message ?? '',
      }),
    })
  } catch (err) {
    console.error('[Sheets] Webhook error:', err)
  }
}
