import { NextResponse } from 'next/server'
import {
  deleteBlogPost,
  getBlogPost,
  restoreBlogPost,
  trashBlogPost,
  updateBlogPost,
} from '@/lib/blog-db'
import { requireAdmin } from '@/lib/admin-auth'

type Ctx = { params: Promise<{ id: string }> }

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
  const updated = await updateBlogPost(id, body)
  if (!updated) return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  return NextResponse.json(updated)
}

export async function PATCH(req: Request, ctx: Ctx) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const { id } = await ctx.params
  const updated = await restoreBlogPost(id)
  if (!updated) return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  return NextResponse.json(updated)
}

export async function DELETE(req: Request, ctx: Ctx) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const { id } = await ctx.params
  const permanent = new URL(req.url).searchParams.get('permanent') === 'true'

  if (permanent) {
    await deleteBlogPost(id)
    return NextResponse.json({ deleted: true })
  }

  const updated = await trashBlogPost(id)
  if (!updated) return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  return NextResponse.json({ trashed: true })
}
