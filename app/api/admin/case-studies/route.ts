import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { createCaseStudy, listAllCaseStudies } from '@/lib/case-studies-db'
import { requireAdmin } from '@/lib/admin-auth'

export async function GET() {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  return NextResponse.json(await listAllCaseStudies())
}

export async function POST(req: Request) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  try {
    const body = await req.json()
    const created = await createCaseStudy(body)
    revalidatePath('/case-studies')
    return NextResponse.json(created, { status: 201 })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Could not create case study' },
      { status: 500 }
    )
  }
}
