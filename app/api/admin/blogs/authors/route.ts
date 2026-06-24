import { NextResponse } from 'next/server'
import { listAuthors } from '@/lib/blog-db'
import { requireAdmin } from '@/lib/admin-auth'

export async function GET(req: Request) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  return NextResponse.json(await listAuthors())
}
