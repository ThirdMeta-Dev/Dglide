import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const pagePath = new URL('../app/(public)/blogs/page.tsx', import.meta.url)
const dataPath = new URL('../lib/blog-db.ts', import.meta.url)

test('blog listing bypasses stale production page and Supabase caches', async () => {
  const [pageSource, dataSource] = await Promise.all([
    readFile(pagePath, 'utf8'),
    readFile(dataPath, 'utf8'),
  ])

  assert.match(pageSource, /export const dynamic = ['"]force-dynamic['"]/)
  assert.match(pageSource, /export const revalidate = 0/)
  assert.match(pageSource, /listBlogPostsFreshSafe\(/)
  assert.match(pageSource, /publishedOnly:\s*true/)
  assert.match(pageSource, /sortField:\s*['"]publishedAt['"]/)
  assert.match(pageSource, /sortDir:\s*['"]desc['"]/)
  assert.match(dataSource, /supabaseServiceUncached as supabaseUncached/)

  const freshQuery = dataSource.match(
    /export async function listBlogPostsFreshSafe\([\s\S]*?\n\}/
  )

  assert.ok(freshQuery, 'fresh public blog query must be exported')
  assert.match(freshQuery[0], /listBlogPostsWithClient\(supabaseUncached, options\)/)

  const cachedQuery = dataSource.match(
    /export async function listBlogPosts\([\s\S]*?\n\}/
  )

  assert.ok(cachedQuery, 'cached blog query must remain available')
  assert.match(cachedQuery[0], /listBlogPostsWithClient\(supabase, options\)/)
})
