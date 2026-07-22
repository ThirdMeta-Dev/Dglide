import { randomUUID } from 'node:crypto'
import { NextResponse } from 'next/server'
import { supabaseService as supabase } from '@/lib/supabase-service'
import { requireAdmin } from '@/lib/admin-auth'

const BUCKET = 'dglide-blog-media'
const MAX_IMAGE_SIZE = 10 * 1024 * 1024 // 10 MB
const MAX_PDF_SIZE = 25 * 1024 * 1024 // 25 MB
const ALLOWED_MIME = new Set([
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/avif',
  'image/svg+xml',
  'application/pdf',
])

export async function POST(req: Request) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

  if (!ALLOWED_MIME.has(file.type))
    return NextResponse.json(
      { error: 'Only images (JPEG, PNG, GIF, WebP, AVIF, SVG) or PDF files are allowed' },
      { status: 400 }
    )

  const isPdf = file.type === 'application/pdf'
  const maxSize = isPdf ? MAX_PDF_SIZE : MAX_IMAGE_SIZE
  if (file.size > maxSize)
    return NextResponse.json(
      { error: `File must be under ${Math.round(maxSize / 1024 / 1024)} MB` },
      { status: 400 }
    )

  const safeName = file.name
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
  const storagePath = `case-studies/${isPdf ? 'pdfs' : 'logos'}/${randomUUID()}-${safeName}`

  const buffer = Buffer.from(await file.arrayBuffer())
  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, buffer, {
      contentType: file.type,
      cacheControl: '31536000',
      upsert: false,
    })
  if (uploadError)
    return NextResponse.json({ error: uploadError.message }, { status: 500 })

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET).getPublicUrl(storagePath)

  return NextResponse.json({ url: publicUrl, filename: safeName }, { status: 201 })
}
