import { randomUUID } from 'node:crypto'
import { NextResponse } from 'next/server'
import { supabaseService as supabase } from '@/lib/supabase-service'
import { createMediaItem } from '@/lib/blog-db'
import { requireAdmin } from '@/lib/admin-auth'

const BUCKET = 'dglide-blog-media'
const MAX_SIZE = 10 * 1024 * 1024

const ALLOWED_MIME = new Set([
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/avif',
])

// Only fetch images from these domains (prevents SSRF)
const ALLOWED_HOSTS = new Set([
  'lh3.googleusercontent.com',
  'lh4.googleusercontent.com',
  'lh5.googleusercontent.com',
  'lh6.googleusercontent.com',
  'docs.google.com',
  'drive.google.com',
])

export async function POST(req: Request) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const { url } = await req.json()
  if (!url || typeof url !== 'string')
    return NextResponse.json({ error: 'Missing url' }, { status: 400 })

  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 })
  }

  if (!ALLOWED_HOSTS.has(parsed.hostname))
    return NextResponse.json({ error: 'Domain not allowed' }, { status: 400 })

  let fetchRes: Response
  try {
    fetchRes = await fetch(url, { signal: AbortSignal.timeout(15000) })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch image' }, { status: 502 })
  }

  if (!fetchRes.ok)
    return NextResponse.json({ error: 'Image fetch failed' }, { status: 502 })

  const contentType = fetchRes.headers.get('content-type') || 'image/jpeg'
  const mimeType = contentType.split(';')[0].trim()
  if (!ALLOWED_MIME.has(mimeType))
    return NextResponse.json({ error: 'Not a supported image type' }, { status: 400 })

  const buffer = Buffer.from(await fetchRes.arrayBuffer())
  if (buffer.length > MAX_SIZE)
    return NextResponse.json({ error: 'Image exceeds 10 MB limit' }, { status: 400 })

  const ext = mimeType.split('/')[1] || 'jpg'
  const filename = `gdocs-${randomUUID()}.${ext}`
  const storagePath = `uploads/${filename}`

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, buffer, { contentType: mimeType, cacheControl: '31536000', upsert: false })

  if (uploadError)
    return NextResponse.json({ error: uploadError.message }, { status: 500 })

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET).getPublicUrl(storagePath)

  await createMediaItem({
    url: publicUrl,
    filename,
    alt: 'Pasted image',
    mimeType,
    size: buffer.length,
    storagePath,
  })

  return NextResponse.json({ url: publicUrl })
}
