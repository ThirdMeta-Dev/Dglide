// Public listing uses the cached client (5-min data cache, refreshed via
// revalidatePath on admin edits). Everything else — admin lists, the download
// route's lookup, writes — must always see fresh data.
import {
  supabaseService as supabaseCached,
  supabaseServiceUncached as supabase,
} from '@/lib/supabase-service'

export type CaseStudy = {
  id: string
  company: string
  logoUrl: string
  category: string
  title: string
  excerpt: string
  personName: string
  personRole: string
  metricOneValue: string
  metricOneLabel: string
  metricTwoValue: string
  metricTwoLabel: string
  pdfUrl: string
  isFeatured: boolean
  status: 'draft' | 'published'
  orderIndex: number
  createdAt: string
  updatedAt: string
}

export type CaseStudyLead = {
  id: string
  caseStudyId: string | null
  caseStudyTitle: string
  name: string
  email: string
  phone: string
  sourcePath: string | null
  createdAt: string
}

export const CASE_STUDY_CATEGORIES = [
  'Operations',
  'Field Service',
  'Workflow & Process',
  'Configurable vs Custom',
  'Continuous Fit (LSM)',
  'Industry Insights',
]

const T_STUDIES = 'dglide_case_studies'
const T_LEADS = 'dglide_case_study_leads'

function normalizeStudy(row: any): CaseStudy {
  return {
    id: row.id,
    company: row.company || '',
    logoUrl: row.logo_url || '',
    category: row.category || '',
    title: row.title || '',
    excerpt: row.excerpt || '',
    personName: row.person_name || '',
    personRole: row.person_role || '',
    metricOneValue: row.metric_one_value || '',
    metricOneLabel: row.metric_one_label || '',
    metricTwoValue: row.metric_two_value || '',
    metricTwoLabel: row.metric_two_label || '',
    pdfUrl: row.pdf_url || '',
    isFeatured: Boolean(row.is_featured),
    status: row.status === 'published' ? 'published' : 'draft',
    orderIndex: Number(row.order_index) || 0,
    createdAt: row.created_at || '',
    updatedAt: row.updated_at || '',
  }
}

function toRow(input: Partial<CaseStudy>): Record<string, unknown> {
  const row: Record<string, unknown> = {}
  if (input.company !== undefined) row.company = input.company
  if (input.logoUrl !== undefined) row.logo_url = input.logoUrl
  if (input.category !== undefined) row.category = input.category
  if (input.title !== undefined) row.title = input.title
  if (input.excerpt !== undefined) row.excerpt = input.excerpt
  if (input.personName !== undefined) row.person_name = input.personName
  if (input.personRole !== undefined) row.person_role = input.personRole
  if (input.metricOneValue !== undefined) row.metric_one_value = input.metricOneValue
  if (input.metricOneLabel !== undefined) row.metric_one_label = input.metricOneLabel
  if (input.metricTwoValue !== undefined) row.metric_two_value = input.metricTwoValue
  if (input.metricTwoLabel !== undefined) row.metric_two_label = input.metricTwoLabel
  if (input.pdfUrl !== undefined) row.pdf_url = input.pdfUrl
  if (input.isFeatured !== undefined) row.is_featured = input.isFeatured
  if (input.status !== undefined) row.status = input.status
  if (input.orderIndex !== undefined) row.order_index = input.orderIndex
  return row
}

export async function listPublishedCaseStudies(): Promise<CaseStudy[]> {
  const { data, error } = await supabaseCached
    .from(T_STUDIES)
    .select('*')
    .eq('status', 'published')
    .order('order_index', { ascending: true })
    .order('created_at', { ascending: false })
  if (error || !data) return []
  return data.map(normalizeStudy)
}

export async function listPublishedCaseStudiesFresh(): Promise<CaseStudy[]> {
  const { data, error } = await supabase
    .from(T_STUDIES)
    .select('*')
    .eq('status', 'published')
    .order('order_index', { ascending: true })
    .order('created_at', { ascending: false })
  if (error || !data) return []
  return data.map(normalizeStudy)
}

export async function listAllCaseStudies(): Promise<CaseStudy[]> {
  const { data, error } = await supabase
    .from(T_STUDIES)
    .select('*')
    .order('order_index', { ascending: true })
    .order('created_at', { ascending: false })
  if (error || !data) return []
  return data.map(normalizeStudy)
}

export async function getCaseStudy(id: string): Promise<CaseStudy | null> {
  const { data } = await supabase.from(T_STUDIES).select('*').eq('id', id).maybeSingle()
  return data ? normalizeStudy(data) : null
}

export async function createCaseStudy(input: Partial<CaseStudy>): Promise<CaseStudy | null> {
  const { data, error } = await supabase
    .from(T_STUDIES)
    .insert(toRow(input))
    .select('*')
    .single()
  if (error) throw new Error(error.message)
  return data ? normalizeStudy(data) : null
}

export async function updateCaseStudy(
  id: string,
  input: Partial<CaseStudy>
): Promise<CaseStudy | null> {
  const { data, error } = await supabase
    .from(T_STUDIES)
    .update({ ...toRow(input), updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('*')
    .maybeSingle()
  if (error) throw new Error(error.message)
  return data ? normalizeStudy(data) : null
}

export async function deleteCaseStudy(id: string): Promise<void> {
  await supabase.from(T_STUDIES).delete().eq('id', id)
}

export async function createCaseStudyLead(input: {
  caseStudyId: string
  caseStudyTitle: string
  name: string
  email: string
  phone: string
  sourcePath?: string
}): Promise<void> {
  const { error } = await supabase.from(T_LEADS).insert({
    case_study_id: input.caseStudyId,
    case_study_title: input.caseStudyTitle,
    name: input.name,
    email: input.email,
    phone: input.phone,
    source_path: input.sourcePath || null,
  })
  if (error) throw new Error(error.message)
}

export async function listCaseStudyLeads(): Promise<CaseStudyLead[]> {
  const { data, error } = await supabase
    .from(T_LEADS)
    .select('*')
    .order('created_at', { ascending: false })
  if (error || !data) return []
  return data.map((row: any) => ({
    id: row.id,
    caseStudyId: row.case_study_id || null,
    caseStudyTitle: row.case_study_title || '',
    name: row.name || '',
    email: row.email || '',
    phone: row.phone || '',
    sourcePath: row.source_path || null,
    createdAt: row.created_at || '',
  }))
}
