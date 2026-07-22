import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { deleteCaseStudy, getCaseStudy, updateCaseStudy } from '@/lib/case-studies-db'
import { requireAdmin } from '@/lib/admin-auth'

type Ctx = { params: Promise<{ id: string }> }

export async function GET(req: Request, ctx: Ctx) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const { id } = await ctx.params
  const study = await getCaseStudy(id)
  if (!study) return NextResponse.json({ error: 'Case study not found' }, { status: 404 })
  return NextResponse.json(study)
}

export async function PUT(req: Request, ctx: Ctx) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const { id } = await ctx.params
  try {
    const body = await req.json()
    const updated = await updateCaseStudy(id, body)
    if (!updated) return NextResponse.json({ error: 'Case study not found' }, { status: 404 })
    revalidatePath('/case-studies')
    return NextResponse.json(updated)
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Could not update case study' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request, ctx: Ctx) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const { id } = await ctx.params
  await deleteCaseStudy(id)
  revalidatePath('/case-studies')
  return NextResponse.json({ deleted: true })
}
