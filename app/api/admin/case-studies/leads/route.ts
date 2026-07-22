import { NextResponse } from 'next/server'
import { listCaseStudyLeads } from '@/lib/case-studies-db'
import { requireAdmin } from '@/lib/admin-auth'

export async function GET() {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  return NextResponse.json(await listCaseStudyLeads())
}
