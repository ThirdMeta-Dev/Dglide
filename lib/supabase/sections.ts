import { unstable_cache } from 'next/cache'
import { anonClient } from './anon'

export type SectionData = Record<string, string>
export type HomepageSections = Record<string, SectionData>

async function _fetchSections(slug: string): Promise<HomepageSections> {
  try {
    const { data: page } = await anonClient
      .from('dglide_pages')
      .select('id')
      .eq('slug', slug)
      .single()

    if (!page) return {}

    const { data: sections } = await anonClient
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

export const getHomepageSections = unstable_cache(
  () => _fetchSections('home'),
  ['sections-home'],
  { revalidate: 300 }
)

export const getScheduleDemoSections = unstable_cache(
  () => _fetchSections('schedule-demo'),
  ['sections-schedule-demo'],
  { revalidate: 300 }
)
