import { randomUUID } from 'node:crypto'
import { NextResponse } from 'next/server'
import { supabaseService as supabase } from '@/lib/supabase-service'
import { createMediaItem, deleteMediaItem, listMediaItems } from '@/lib/blog-db'
import { requireAdmin } from '@/lib/admin-auth'

const BUCKET = 'dglide-blog-media'

export async function GET(req: Request) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  return NextResponse.json(
    await listMediaItems({
      page: Number(searchParams.get('page') || 1),
      limit: Number(searchParams.get('limit') || 24),
      search: searchParams.get('search') || '',
    })
  )
}

export async function POST(req: Request) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

  const ext = file.name.split('.').pop() || 'jpg'
  const safeName = file.name
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
  const storagePath = `uploads/${randomUUID()}-${safeName}`

  const buffer = Buffer.from(await file.arrayBuffer())
  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, buffer, {
      contentType: file.type || `image/${ext}`,
      upsert: false,
    })
  if (uploadError)
    return NextResponse.json({ error: uploadError.message }, { status: 500 })

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET).getPublicUrl(storagePath)

  const media = await createMediaItem({
    url: publicUrl,
    filename: safeName,
    alt: safeName.replace(/\.[^.]+$/, '').replace(/-/g, ' '),
    mimeType: file.type,
    size: file.size,
    storagePath,
  })
  return NextResponse.json(media, { status: 201 })
}

export async function DELETE(req: Request) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const { id } = await req.json()
  await deleteMediaItem(id)
  return NextResponse.json({ deleted: true })
}
