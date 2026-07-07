import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { createBlogPost, listBlogPosts } from '@/lib/blog-db'
import { requireAdmin } from '@/lib/admin-auth'

export async function GET(req: Request) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const result = await listBlogPosts({
    page: Number(searchParams.get('page') || 1),
    limit: Number(searchParams.get('limit') || 20),
    search: searchParams.get('search') || '',
    status: searchParams.get('status') || '',
    excludeStatus: searchParams.get('excludeStatus') || '',
    postType: searchParams.get('postType') || '',
    sortField: searchParams.get('sortField') || 'updatedAt',
    sortDir: searchParams.get('sortDir') === 'asc' ? 'asc' : 'desc',
  })

  if (searchParams.get('count') === 'true')
    return NextResponse.json({ totalDocs: result.totalDocs })

  return NextResponse.json(result)
}

export async function POST(req: Request) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const body = await req.json()
  const created = await createBlogPost(body)
  revalidatePath('/blogs')
  if (created?.slug) revalidatePath(`/blogs/${created.slug}`)
  return NextResponse.json(created, { status: 201 })
}
