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

  const revalidatedPaths = ['/', '/blogs', '/sitemap.xml']
  revalidatePath('/')
  revalidatePath('/blogs')
  revalidatePath('/sitemap.xml')
  if (slug) {
    const postPath = `/blogs/${slug}`
    revalidatePath(postPath)
    revalidatedPaths.push(postPath)
  }
  revalidatePath('/blogs/[slug]', 'page')
  revalidatedPaths.push('/blogs/[slug]')
  return NextResponse.json({ revalidated: true, paths: revalidatedPaths })
}
