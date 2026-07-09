import { NextResponse } from 'next/server'
import { updateUser, deleteUser } from '@/lib/blog-db'
import { requireAdmin } from '@/lib/admin-auth'

type Ctx = { params: Promise<{ id: string }> }

export async function PUT(req: Request, ctx: Ctx) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  try {
    const { id } = await ctx.params
    const body = await req.json()
    const user = await updateUser(id, body)
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
    return NextResponse.json(user)
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Failed to update user' },
      { status: 400 }
    )
  }
}

export async function DELETE(req: Request, ctx: Ctx) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const { id } = await ctx.params
  await deleteUser(id)
  return NextResponse.json({ deleted: true })
}
