import { createClient } from '@/lib/supabase/server'

export type SectionData = Record<string, string>
export type HomepageSections = Record<string, SectionData>

export async function getHomepageSections(): Promise<HomepageSections> {
  try {
    const supabase = await createClient()

    const { data: page } = await supabase
      .from('dglide_pages')
      .select('id')
      .eq('slug', 'home')
      .single()

    if (!page) return {}

    const { data: sections } = await supabase
      .from('dglide_sections')
      .select('section_type, dglide_content_blocks(block_key, value)')
      .eq('page_id', page.id)
      .eq('is_visible', true)
      .order('order_index')

    const result: HomepageSections = {}
    for (const section of sections ?? []) {
      const blocks: SectionData = {}
      const raw = section.dglide_content_blocks as Array<{ block_key: string; value: { v: unknown } }>
      for (const block of raw ?? []) {
        blocks[block.block_key] = String(block.value?.v ?? '')
      }
      result[section.section_type] = blocks
    }
    return result
  } catch {
    return {}
  }
}
