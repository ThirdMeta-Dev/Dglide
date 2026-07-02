// Uses Groq (free tier) — set GROQ_API_KEY in .env.local and Vercel env vars
// Get a free key at https://console.groq.com

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const GROQ_MODEL = 'llama-3.3-70b-versatile'

export async function callGemini(
  prompt: string,
  options: {
    temperature?: number
    maxOutputTokens?: number
    systemInstruction?: string
  } = {}
): Promise<string> {
  const key = process.env.GROQ_API_KEY
  if (!key) throw new Error('Missing GROQ_API_KEY — add it to .env.local and Vercel environment variables')

  const messages: { role: string; content: string }[] = []
  if (options.systemInstruction) {
    messages.push({ role: 'system', content: options.systemInstruction })
  }
  messages.push({ role: 'user', content: prompt })

  const res = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxOutputTokens ?? 4096,
    }),
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data?.error?.message || 'Groq request failed')

  const text = data?.choices?.[0]?.message?.content
  if (!text) throw new Error('Groq returned an empty response')
  return text as string
}

export function parseJsonResponse<T>(text: string): T {
  const clean = text
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```\s*$/i, '')
    .trim()
  return JSON.parse(clean) as T
}
