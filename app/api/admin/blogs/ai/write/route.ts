import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-auth'
import { callGemini, parseJsonResponse } from '@/lib/gemini'

const LENGTH_MAP: Record<string, string> = {
  Short: '500-700 words',
  Medium: '800-1100 words',
  Long: '1200-1800 words',
}

export async function POST(req: Request) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  try {
    const { topic, tone, length } = await req.json()
    const wordCount = LENGTH_MAP[length] ?? LENGTH_MAP.Medium
    const prompt = `Write a blog post about: ${topic}
Tone: ${tone}
Length: ${wordCount}

Return ONLY valid JSON, no markdown and no code fences:
{
  "title": "...",
  "slug": "url-friendly-slug",
  "excerpt": "2-3 sentence summary",
  "content": "full HTML with h2, h3, p, ul, li, strong, em tags",
  "tags": ["tag1", "tag2", "tag3"],
  "metaTitle": "SEO title under 60 chars",
  "metaDescription": "SEO description under 160 chars"
}`
    const text = await callGemini(prompt, { temperature: 0.7, maxOutputTokens: 4096 })
    return NextResponse.json(parseJsonResponse(text))
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'AI generation failed' },
      { status: 500 }
    )
  }
}
