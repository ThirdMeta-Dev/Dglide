import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import {
  deleteBlogPost,
  getBlogPost,
  restoreBlogPost,
  trashBlogPost,
  updateBlogPost,
} from '@/lib/blog-db'
import { requireAdmin } from '@/lib/admin-auth'

type Ctx = { params: Promise<{ id: string }> }

function revalidateBlogPaths(...slugs: Array<string | null | undefined>) {
  revalidatePath('/blogs')
  slugs
    .filter((slug): slug is string => Boolean(slug))
    .forEach((slug) => revalidatePath(`/blogs/${slug}`))
  revalidatePath('/blogs/[slug]', 'page')
}

export async function GET(req: Request, ctx: Ctx) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const { id } = await ctx.params
  const post = await getBlogPost(id)
  if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  return NextResponse.json(post)
}

export async function PUT(req: Request, ctx: Ctx) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const { id } = await ctx.params
  const body = await req.json()
  const before = await getBlogPost(id)
  // Safety net: an editor instance that saves before its data has loaded sends
  // its empty initial state (blank title/slug, status 'draft'). Never let such
  // a request blank an existing title/slug or silently unpublish the post.
  if (before && body && typeof body === 'object') {
    const blankingTitle = body.title === '' && before.title !== ''
    if (blankingTitle) {
      delete body.title
      if (body.status === 'draft' && before.status === 'published') delete body.status
    }
    if (body.slug === '' && before.slug !== '') delete body.slug
  }
  const updated = await updateBlogPost(id, body)
  if (!updated) return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  revalidateBlogPaths(before?.slug, updated.slug)
  return NextResponse.json(updated)
}

export async function PATCH(req: Request, ctx: Ctx) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const { id } = await ctx.params
  const updated = await restoreBlogPost(id)
  if (!updated) return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  revalidateBlogPaths(updated.slug)
  return NextResponse.json(updated)
}

export async function DELETE(req: Request, ctx: Ctx) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const { id } = await ctx.params
  const permanent = new URL(req.url).searchParams.get('permanent') === 'true'
  const post = await getBlogPost(id)

  if (permanent) {
    await deleteBlogPost(id)
    revalidateBlogPaths(post?.slug)
    return NextResponse.json({ deleted: true })
  }

  const updated = await trashBlogPost(id)
  if (!updated) return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  revalidateBlogPaths(updated.slug)
  return NextResponse.json({ trashed: true })
}
