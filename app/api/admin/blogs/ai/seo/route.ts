import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-auth'
import { callGemini, parseJsonResponse } from '@/lib/gemini'

function stripHtml(html: string) {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim()
}

export async function POST(req: Request) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  try {
    const { title, content, metaTitle, metaDescription, focusKeyword } = await req.json()
    const prompt = `Analyze this blog post for SEO and readability.

Title: ${title}
Focus Keyword: ${focusKeyword}
Meta Title: ${metaTitle}
Meta Description: ${metaDescription}
Content: ${stripHtml(content || '')}

Return ONLY valid JSON:
{
  "seoScore": 0-100,
  "readabilityScore": 0-100,
  "keywordDensity": "X.X%",
  "suggestions": ["suggestion1", "suggestion2", "suggestion3", "suggestion4"]
}`
    const text = await callGemini(prompt, { temperature: 0.3, maxOutputTokens: 800 })
    return NextResponse.json(parseJsonResponse(text))
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'SEO analysis failed' },
      { status: 500 }
    )
  }
}
