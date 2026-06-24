import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/admin-auth'

export async function POST(req: Request) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  revalidatePath('/blogs')
  revalidatePath('/blogs/[slug]', 'page')
  return NextResponse.json({ revalidated: true })
}
