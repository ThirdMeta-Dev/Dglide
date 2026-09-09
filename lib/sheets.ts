const WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL
const FSM_INDIA_WEBHOOK_URL = process.env.FSM_INDIA_GOOGLE_SHEETS_WEBHOOK_URL

// Row: [Timestamp, Form Type, Name, Email, Phone, Company, Message, Source Page, Source URL]
export async function appendLeadToSheet(
  formType: string,
  fields: {
    name?: string
    email?: string
    phone?: string
    company?: string
    message?: string
    sourcePath?: string
    sourceUrl?: string
    referrer?: string
    utmSource?: string
    utmMedium?: string
    utmCampaign?: string
    utmTerm?: string
    utmContent?: string
    utmId?: string
    utmSourcePlatform?: string
    utmCreativeFormat?: string
    utmMarketingTactic?: string
    gclid?: string
    fbclid?: string
    msclkid?: string
    utmParameters?: string
  },
  options?: {
    destination?: 'default' | 'fsm-india'
    required?: boolean
  }
): Promise<void> {
  const webhookUrl = options?.destination === 'fsm-india' ? FSM_INDIA_WEBHOOK_URL : WEBHOOK_URL
  if (!webhookUrl) {
    if (options?.required) throw new Error('Lead sheet webhook is not configured')
    return
  }

  const parsedWebhookUrl = new URL(webhookUrl)
  if (parsedWebhookUrl.protocol !== 'https:' || parsedWebhookUrl.hostname !== 'script.google.com' || !parsedWebhookUrl.pathname.startsWith('/macros/s/')) {
    throw new Error('Lead sheet webhook URL is invalid')
  }

  const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType,
        name:    fields.name    ?? '',
        email:   fields.email   ?? '',
        phone:   fields.phone   ?? '',
        company: fields.company ?? '',
        message: fields.message ?? '',
        sourcePath: fields.sourcePath ?? '',
        sourceUrl: fields.sourceUrl ?? '',
        referrer: fields.referrer ?? '',
        utmSource: fields.utmSource ?? '',
        utmMedium: fields.utmMedium ?? '',
        utmCampaign: fields.utmCampaign ?? '',
        utmTerm: fields.utmTerm ?? '',
        utmContent: fields.utmContent ?? '',
        utmId: fields.utmId ?? '',
        utmSourcePlatform: fields.utmSourcePlatform ?? '',
        utmCreativeFormat: fields.utmCreativeFormat ?? '',
        utmMarketingTactic: fields.utmMarketingTactic ?? '',
        gclid: fields.gclid ?? '',
        fbclid: fields.fbclid ?? '',
        msclkid: fields.msclkid ?? '',
        utmParameters: fields.utmParameters ?? '',
      }),
    })

  if (!response.ok) {
    throw new Error(`Lead sheet webhook failed (${response.status})`)
  }
}
