import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/admin-auth'

export async function POST(req: Request) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  let slug = ''
  try {
    const body = await req.json()
    slug = typeof body?.slug === 'string' ? body.slug.trim().replace(/^\/?blogs\//, '') : ''
  } catch {
    slug = ''
  }

  revalidatePath('/blogs')
  if (slug) revalidatePath(`/blogs/${slug}`)
  revalidatePath('/blogs/[slug]', 'page')
  return NextResponse.json({ revalidated: true })
}
