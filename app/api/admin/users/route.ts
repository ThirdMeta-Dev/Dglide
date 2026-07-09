import { NextResponse } from 'next/server'
import { listUsers, createUser } from '@/lib/blog-db'
import { requireAdmin } from '@/lib/admin-auth'

export async function GET() {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  return NextResponse.json(await listUsers())
}

export async function POST(req: Request) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  try {
    const body = await req.json()
    const user = await createUser(body)
    return NextResponse.json(user, { status: 201 })
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Failed to create user' },
      { status: 400 }
    )
  }
}
