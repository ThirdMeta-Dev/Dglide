import { randomUUID } from 'node:crypto'
import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-auth'
import { callGemini, parseJsonResponse } from '@/lib/gemini'
import { slugify } from '@/lib/blog-utils'
import { supabaseService as supabase } from '@/lib/supabase-service'
import { createMediaItem } from '@/lib/blog-db'

const BUCKET = 'dglide-blog-media'

function extractDocId(url: string): string | null {
  const match = url.match(/\/document\/d\/([a-zA-Z0-9_-]+)/)
  return match?.[1] ?? null
}

async function uploadBuffer(buffer: Buffer, mimeType: string): Promise<string | null> {
  try {
    if (buffer.length > 10 * 1024 * 1024) return null
    const ext = mimeType.split('/')[1]?.replace('jpeg', 'jpg') || 'png'
    const filename = `gdoc-${randomUUID()}.${ext}`
    const storagePath = `uploads/${filename}`
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, buffer, { contentType: mimeType, upsert: false })
    if (error) return null
    const { data: { publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(storagePath)
    await createMediaItem({ url: publicUrl, filename, alt: 'Imported image', mimeType, size: buffer.length, storagePath })
    return publicUrl
  } catch {
    return null
  }
}

async function uploadDataUrl(dataUrl: string): Promise<string | null> {
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/)
  if (!match) return null
  const mimeType = match[1]
  if (!mimeType.startsWith('image/')) return null
  const buffer = Buffer.from(match[2], 'base64')
  return uploadBuffer(buffer, mimeType)
}

async function uploadImageFromUrl(imageUrl: string): Promise<string | null> {
  try {
    const res = await fetch(imageUrl, { signal: AbortSignal.timeout(15000) })
    if (!res.ok) return null
    const contentType = res.headers.get('content-type') || 'image/jpeg'
    const mimeType = contentType.split(';')[0].trim()
    if (!mimeType.startsWith('image/')) return null
    const buffer = Buffer.from(await res.arrayBuffer())
    return uploadBuffer(buffer, mimeType)
  } catch {
    return null
  }
}

function cleanGdocHtml(rawHtml: string): string {
  let html = rawHtml

  // Remove <head> entirely
  html = html.replace(/<head[\s\S]*?<\/head>/i, '')

  // Unwrap <body>
  html = html.replace(/^[\s\S]*?<body[^>]*>/i, '').replace(/<\/body>[\s\S]*$/i, '')

  // Remove style/script blocks
  html = html.replace(/<style[\s\S]*?<\/style>/gi, '')
  html = html.replace(/<script[\s\S]*?<\/script>/gi, '')

  // Remove class, id, dir attributes (keep src, alt, href)
  html = html.replace(/\s(?:class|id|dir)="[^"]*"/g, '')

  // Convert font-weight spans to <strong>
  html = html.replace(/<span\s+style="[^"]*font-weight:\s*(?:bold|[6-9]\d\d)[^"]*">([\s\S]*?)<\/span>/gi, '<strong>$1</strong>')

  // Convert italic spans to <em>
  html = html.replace(/<span\s+style="[^"]*font-style:\s*italic[^"]*">([\s\S]*?)<\/span>/gi, '<em>$1</em>')

  // Strip remaining style attributes
  html = html.replace(/\s+style="[^"]*"/g, '')

  // Remove empty spans
  html = html.replace(/<span>([\s\S]*?)<\/span>/gi, '$1')

  return html.trim()
}

export async function POST(req: Request) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  try {
    const { url } = await req.json()
    if (!url || typeof url !== 'string')
      return NextResponse.json({ error: 'Missing url' }, { status: 400 })

    const docId = extractDocId(url)
    if (!docId)
      return NextResponse.json({ error: 'Invalid Google Doc URL — could not extract document ID' }, { status: 400 })

    const exportUrl = `https://docs.google.com/document/d/${docId}/export?format=html`
    const exportRes = await fetch(exportUrl, { signal: AbortSignal.timeout(30000) })
    if (!exportRes.ok) {
      return NextResponse.json(
        { error: 'Could not fetch Google Doc. Make sure the document is set to "Anyone with the link can view".' },
        { status: 502 }
      )
    }

    const rawHtml = await exportRes.text()
    let contentHtml = cleanGdocHtml(rawHtml)

    // --- Upload base64 data: images (Google Docs export embeds images as data: URLs) ---
    const dataUrlMatches = [...contentHtml.matchAll(/src="(data:image\/[^;]+;base64,[^"]+)"/gi)]
    const dataUrlMap = new Map<string, string>()
    await Promise.all(
      dataUrlMatches.map(async ([, dataUrl]) => {
        if (dataUrlMap.has(dataUrl)) return
        const hosted = await uploadDataUrl(dataUrl)
        if (hosted) dataUrlMap.set(dataUrl, hosted)
      })
    )
    for (const [original, hosted] of dataUrlMap.entries()) {
      contentHtml = contentHtml.split(original).join(hosted)
    }

    // --- Upload googleusercontent.com images (fallback for older export format) ---
    const cdnMatches = [...contentHtml.matchAll(/src="(https:\/\/[^"]*googleusercontent\.com[^"]+)"/gi)]
    const cdnMap = new Map<string, string>()
    await Promise.all(
      cdnMatches.map(async ([, imgUrl]) => {
        if (cdnMap.has(imgUrl)) return
        const hosted = await uploadImageFromUrl(imgUrl)
        if (hosted) cdnMap.set(imgUrl, hosted)
      })
    )
    for (const [original, hosted] of cdnMap.entries()) {
      contentHtml = contentHtml.split(original).join(hosted)
    }

    // Extract H1 as title — strip all inner tags, decode entities
    const h1Match = contentHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)
    const title = h1Match
      ? h1Match[1]
          .replace(/<[^>]+>/g, '')
          .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ')
          .trim()
      : ''

    // Use Groq to extract excerpt and tags
    const plainText = contentHtml
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 3000)

    const prompt = `Blog content: ${plainText}

Return ONLY valid JSON:
{"title":"${title || 'extract from content'}","excerpt":"2-3 sentence summary","tags":["tag1","tag2","tag3"]}`

    const aiText = await callGemini(prompt, { temperature: 0.3, maxOutputTokens: 800 })
    const meta = parseJsonResponse<{ title?: string; excerpt?: string; tags?: string[] }>(aiText)
    const finalTitle = title || meta.title || ''

    return NextResponse.json({
      title: finalTitle,
      slug: slugify(finalTitle),
      excerpt: meta.excerpt || '',
      contentHtml,
      metaTitle: finalTitle,
      metaDescription: meta.excerpt || '',
      focusKeyword: '',
      tags: meta.tags || [],
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Google Doc import failed' },
      { status: 500 }
    )
  }
}
