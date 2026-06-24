import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getBlogDetailSettings, updateBlogDetailSettings } from '@/lib/blog-db'
import { requireAdmin } from '@/lib/admin-auth'

export async function GET(req: Request) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  return NextResponse.json(await getBlogDetailSettings())
}

export async function PUT(req: Request) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const body = await req.json()
  const settings = await updateBlogDetailSettings(body)
  revalidatePath('/blogs')
  revalidatePath('/blogs/[slug]', 'page')
  return NextResponse.json(settings)
}
