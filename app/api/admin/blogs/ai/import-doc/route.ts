import { NextResponse } from 'next/server'
import mammoth from 'mammoth'
import { requireAdmin } from '@/lib/admin-auth'
import { callGemini, parseJsonResponse } from '@/lib/gemini'
import { slugify } from '@/lib/blog-utils'

function extractMetaField(html: string, label: string) {
  const patterns = [
    new RegExp(`<strong>${label}:\\s*<\\/strong>([^<]+)`, 'i'),
    new RegExp(`${label}:\\s*</strong>([^<]+)`, 'i'),
    new RegExp(`${label}:\\s*([^<\\n]+)`, 'i'),
  ]
  for (const re of patterns) {
    const match = html.match(re)
    if (match?.[1]?.trim()) return match[1].trim()
  }
  return ''
}

function extractH1(html: string) {
  const match = html.match(/<h1[^>]*>(?:<[^>]+>)*([^<]+)/i)
  return match?.[1]?.trim() || ''
}

function stripMetaHeader(html: string) {
  const h1Index = html.search(/<h1/i)
  return h1Index > 0 ? html.slice(h1Index) : html
}

export async function POST(req: Request) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    if (file.name.split('.').pop()?.toLowerCase() !== 'docx') {
      return NextResponse.json({ error: 'Only .docx files are supported.' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const { value: rawHtml } = await mammoth.convertToHtml({ buffer })

    const metaTitle = extractMetaField(rawHtml, 'Meta Title')
    const metaDescription = extractMetaField(rawHtml, 'Description')
    const urlSlug = extractMetaField(rawHtml, 'URL Slug')
    const primaryKeyword = extractMetaField(rawHtml, 'Primary Keyword')
    const h1Title = extractH1(rawHtml)
    const contentHtml = stripMetaHeader(rawHtml)
    const title = h1Title || metaTitle || ''
    const slug = urlSlug || slugify(title)
    let excerpt = metaDescription || ''
    let tags: string[] = []

    if (!excerpt || !title) {
      const plainText = rawHtml
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 3000)
      const prompt = `Blog content: ${plainText}

Return ONLY valid JSON:
{"title":"${title || 'extract from content'}","excerpt":"2-3 sentence summary","tags":["tag1","tag2","tag3"]}`
      const text = await callGemini(prompt, { temperature: 0.3, maxOutputTokens: 800 })
      const meta = parseJsonResponse<{ title?: string; excerpt?: string; tags?: string[] }>(text)
      excerpt = excerpt || meta.excerpt || ''
      tags = meta.tags || []
    }

    return NextResponse.json({
      title,
      slug,
      excerpt,
      contentHtml,
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || excerpt,
      focusKeyword: primaryKeyword,
      tags,
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Document import failed' },
      { status: 500 }
    )
  }
}
