import { randomUUID } from 'node:crypto'
import { supabaseService as supabase } from './supabase-service'
import { slugify, countWords, calcReadingTime } from './blog-utils'

export { slugify, countWords, calcReadingTime }

export type BlogStatus = 'draft' | 'published' | 'trashed'
export type BlogPostType = 'blog' | 'glossary' | 'tutorial'
export type BlogTag = { tag: string }
export type BlogRevision = {
  timestamp: string
  title: string
  excerpt: string
  contentHtml: string
}
export type BlogDetailLayout = 'sidebar-left' | 'sidebar-right' | 'three-column'

export type BlogDetailSettings = {
  detailLayout: BlogDetailLayout
  hideSidebarCta: boolean
  sidebarCtaEyebrow: string
  sidebarCtaTitle: string
  sidebarCtaText: string
  sidebarCtaButtonLabel: string
  sidebarCtaButtonHref: string
  sidebarSecondaryText: string
  sidebarSecondaryButtonLabel: string
  sidebarSecondaryButtonHref: string
  inlineCtaEnabled: boolean
  inlineCtaTitle: string
  inlineCtaText: string
  inlineCtaButtonLabel: string
  inlineCtaButtonHref: string
}

export const DEFAULT_BLOG_DETAIL_SETTINGS: BlogDetailSettings = {
  detailLayout: 'sidebar-left',
  hideSidebarCta: false,
  sidebarCtaEyebrow: 'DGlide Insights',
  sidebarCtaTitle: 'Scale Your Operations',
  sidebarCtaText: 'No more guesswork. Get measurable results.',
  sidebarCtaButtonLabel: 'Get a FREE Demo',
  sidebarCtaButtonHref: '/schedule-demo',
  sidebarSecondaryText: 'Explore our field-backed systems.',
  sidebarSecondaryButtonLabel: 'Download Case Study',
  sidebarSecondaryButtonHref: '/contact-us',
  inlineCtaEnabled: true,
  inlineCtaTitle: 'Ready to move from insight to implementation?',
  inlineCtaText: 'Explore our systems for measurable outcomes.',
  inlineCtaButtonLabel: 'Download Case Study',
  inlineCtaButtonHref: '/contact-us',
}

export type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt: string
  contentHtml: string
  status: BlogStatus
  postType: BlogPostType
  author: string
  authorBio: string
  authorTitle: string
  authorAvatarUrl: string
  featuredImageUrl: string
  seoTitle: string
  seoDescription: string
  focusKeyword: string
  publishedAt: string | null
  isFeatured: boolean
  readingTime: number
  tags: BlogTag[]
  categories: { category: string }[]
  revisions: BlogRevision[]
  detailSettings: BlogDetailSettings
  createdAt: string
  updatedAt: string
}

export type BlogMediaItem = {
  id: string
  url: string
  filename: string
  alt: string
  width?: number | null
  height?: number | null
  mimeType?: string | null
  size?: number | null
  storagePath?: string | null
  createdAt: string
}

export type BlogAuthor = {
  id: string
  name: string
  title: string
  bio: string
  avatarUrl: string
  linkedin: string
  twitter: string
  createdAt: string
  updatedAt: string
}


function normalizeDetailSettings(value: unknown): BlogDetailSettings {
  const data =
    value && typeof value === 'object' && !Array.isArray(value)
      ? (value as Partial<BlogDetailSettings>)
      : {}
  const layout: BlogDetailLayout =
    data.detailLayout === 'sidebar-right' || data.detailLayout === 'three-column'
      ? data.detailLayout
      : 'sidebar-left'
  return {
    ...DEFAULT_BLOG_DETAIL_SETTINGS,
    ...data,
    detailLayout: layout,
    hideSidebarCta: Boolean(data.hideSidebarCta),
    inlineCtaEnabled: data.inlineCtaEnabled !== false,
  }
}

export function normalizeBlogDetailSettings(value: unknown): BlogDetailSettings {
  return normalizeDetailSettings(value)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeBlog(row: any): BlogPost {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt || '',
    contentHtml: row.content_html || '',
    status: row.status || 'draft',
    postType: row.post_type || 'blog',
    author: row.author || '',
    authorBio: row.author_bio || '',
    authorTitle: row.author_title || '',
    authorAvatarUrl: row.author_avatar_url || '',
    featuredImageUrl: row.featured_image_url || '',
    seoTitle: row.seo_title || '',
    seoDescription: row.seo_description || '',
    focusKeyword: row.focus_keyword || '',
    publishedAt: row.published_at ? new Date(row.published_at).toISOString() : null,
    isFeatured: Boolean(row.is_featured),
    readingTime: row.reading_time || 1,
    tags: Array.isArray(row.tags) ? row.tags : [],
    categories: Array.isArray(row.categories) ? row.categories : [],
    revisions: Array.isArray(row.revisions) ? row.revisions : [],
    detailSettings: normalizeDetailSettings(row.detail_settings),
    createdAt: row.created_at
      ? new Date(row.created_at).toISOString()
      : new Date().toISOString(),
    updatedAt: row.updated_at
      ? new Date(row.updated_at).toISOString()
      : new Date().toISOString(),
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeMedia(row: any): BlogMediaItem {
  return {
    id: row.id,
    url: row.url,
    filename: row.filename,
    alt: row.alt || '',
    width: row.width,
    height: row.height,
    mimeType: row.mime_type,
    size: row.size,
    storagePath: row.storage_path || null,
    createdAt: row.created_at
      ? new Date(row.created_at).toISOString()
      : new Date().toISOString(),
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeAuthor(row: any): BlogAuthor {
  return {
    id: row.id,
    name: row.name,
    title: row.title || '',
    bio: row.bio || '',
    avatarUrl: row.avatar_url || '',
    linkedin: row.linkedin || '',
    twitter: row.twitter || '',
    createdAt: row.created_at
      ? new Date(row.created_at).toISOString()
      : new Date().toISOString(),
    updatedAt: row.updated_at
      ? new Date(row.updated_at).toISOString()
      : new Date().toISOString(),
  }
}

const T_BLOGS = 'dglide_blogs'
const T_MEDIA = 'dglide_blog_media'
const T_AUTHORS = 'dglide_blog_authors'
const T_SETTINGS = 'dglide_blog_settings'
const STORAGE_BUCKET = 'dglide-blog-media'

async function uniqueSlug(baseSlug: string, currentId?: string): Promise<string> {
  const base = slugify(baseSlug || 'untitled') || 'untitled'
  let slug = base
  let i = 2
  while (true) {
    const { data } = await supabase
      .from(T_BLOGS)
      .select('id')
      .eq('slug', slug)
      .maybeSingle()
    if (!data || data.id === currentId) return slug
    slug = `${base}-${i}`
    i++
  }
}

export async function getBlogPost(id: string): Promise<BlogPost | null> {
  const { data } = await supabase.from(T_BLOGS).select('*').eq('id', id).maybeSingle()
  return data ? normalizeBlog(data) : null
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const { data } = await supabase.from(T_BLOGS).select('*').eq('slug', slug).maybeSingle()
    return data ? normalizeBlog(data) : null
  } catch {
    return null
  }
}

export async function listBlogPosts(
  options: {
    page?: number
    limit?: number
    search?: string
    status?: string
    excludeStatus?: string
    postType?: string
    sortField?: string
    sortDir?: 'asc' | 'desc'
    publishedOnly?: boolean
  } = {}
) {
  const page = Math.max(1, options.page || 1)
  const limit = Math.min(100, Math.max(1, options.limit || 20))
  const offset = (page - 1) * limit
  const sortMap: Record<string, string> = {
    title: 'title',
    postType: 'post_type',
    author: 'author',
    updatedAt: 'updated_at',
    publishedAt: 'published_at',
    status: 'status',
    createdAt: 'created_at',
  }
  const sortCol = sortMap[options.sortField || ''] || 'updated_at'
  const ascending = options.sortDir === 'asc'

  let query = supabase.from(T_BLOGS).select('*', { count: 'exact' })

  if (options.search) {
    // Strip PostgREST special characters to prevent filter injection
    const safe = options.search.replace(/[,()]/g, ' ').trim().slice(0, 200)
    const q = `%${safe}%`
    query = query.or(`title.ilike.${q},excerpt.ilike.${q},author.ilike.${q}`)
  }
  if (options.publishedOnly) {
    query = query.eq('status', 'published')
  } else if (options.status) {
    query = query.eq('status', options.status)
  } else if (options.excludeStatus) {
    query = query.neq('status', options.excludeStatus)
  }
  if (options.postType) query = query.eq('post_type', options.postType)

  const orderedQuery = query.order(sortCol, { ascending, nullsFirst: false })
  if (sortCol !== 'created_at') {
    orderedQuery.order('created_at', { ascending: false, nullsFirst: false })
  }

  const { data, count, error } = await orderedQuery.range(offset, offset + limit - 1)

  if (error) throw error
  const totalDocs = count ?? 0
  return {
    docs: (data || []).map(normalizeBlog),
    totalDocs,
    totalPages: Math.max(1, Math.ceil(totalDocs / limit)),
    page,
    limit,
  }
}

export async function listBlogPostsSafe(
  options?: Parameters<typeof listBlogPosts>[0]
): Promise<Awaited<ReturnType<typeof listBlogPosts>>> {
  try {
    return await listBlogPosts(options)
  } catch {
    return { docs: [], totalDocs: 0, totalPages: 1, page: 1, limit: 20 }
  }
}

export async function createBlogPost(input: Partial<BlogPost>): Promise<BlogPost | null> {
  const id = randomUUID()
  const title = input.title || 'Untitled'
  const contentHtml = input.contentHtml || ''
  const slug = await uniqueSlug(
    input.slug || slugify(title) || `draft-${Date.now()}`
  )
  const now = new Date().toISOString()
  const status = input.status || 'draft'
  const publishedAt = input.publishedAt || (status === 'published' ? now : null)
  const { error } = await supabase.from(T_BLOGS).insert({
    id,
    title,
    slug,
    excerpt: input.excerpt || '',
    content_html: contentHtml,
    status,
    post_type: input.postType || 'blog',
    author: input.author || '',
    author_bio: input.authorBio || '',
    author_title: input.authorTitle || '',
    author_avatar_url: input.authorAvatarUrl || '',
    featured_image_url: input.featuredImageUrl || '',
    seo_title: input.seoTitle || '',
    seo_description: input.seoDescription || '',
    focus_keyword: input.focusKeyword || '',
    published_at: publishedAt,
    is_featured: input.isFeatured ?? false,
    reading_time: calcReadingTime(contentHtml),
    tags: input.tags || [],
    categories: input.categories || [],
    revisions: [],
    detail_settings: normalizeDetailSettings(input.detailSettings),
    created_at: now,
    updated_at: now,
  })
  if (error) throw error
  return getBlogPost(id)
}

export async function updateBlogPost(
  id: string,
  input: Partial<BlogPost>,
  saveRevision = true
): Promise<BlogPost | null> {
  const current = await getBlogPost(id)
  if (!current) return null
  const now = new Date().toISOString()
  const contentHtml = input.contentHtml ?? current.contentHtml
  const nextStatus = input.status ?? current.status
  const nextPublishedAt =
    input.publishedAt !== undefined
      ? input.publishedAt
      : nextStatus === 'published'
        ? current.publishedAt || now
        : current.publishedAt
  const revisions = saveRevision
    ? [
        {
          timestamp: now,
          title: current.title,
          excerpt: current.excerpt,
          contentHtml: current.contentHtml,
        },
        ...current.revisions,
      ].slice(0, 10)
    : current.revisions
  const newSlug = await uniqueSlug(input.slug ?? current.slug, id)
  const { error } = await supabase
    .from(T_BLOGS)
    .update({
      title: input.title ?? current.title,
      slug: newSlug,
      excerpt: input.excerpt ?? current.excerpt,
      content_html: contentHtml,
      status: nextStatus,
      post_type: input.postType ?? current.postType,
      author: input.author ?? current.author,
      author_bio: input.authorBio ?? current.authorBio,
      author_title: input.authorTitle ?? current.authorTitle,
      author_avatar_url: input.authorAvatarUrl ?? current.authorAvatarUrl,
      featured_image_url: input.featuredImageUrl ?? current.featuredImageUrl,
      seo_title: input.seoTitle ?? current.seoTitle,
      seo_description: input.seoDescription ?? current.seoDescription,
      focus_keyword: input.focusKeyword ?? current.focusKeyword,
      published_at: nextPublishedAt,
      is_featured: input.isFeatured ?? current.isFeatured,
      reading_time: calcReadingTime(contentHtml),
      tags: input.tags ?? current.tags,
      categories: input.categories ?? current.categories,
      revisions,
      detail_settings:
        input.detailSettings !== undefined
          ? normalizeDetailSettings(input.detailSettings)
          : current.detailSettings,
      updated_at: now,
    })
    .eq('id', id)
  if (error) throw error
  return getBlogPost(id)
}

export async function trashBlogPost(id: string): Promise<BlogPost | null> {
  return updateBlogPost(id, { status: 'trashed' }, false)
}

export async function restoreBlogPost(id: string): Promise<BlogPost | null> {
  return updateBlogPost(id, { status: 'draft' }, false)
}

export async function deleteBlogPost(id: string): Promise<void> {
  await supabase.from(T_BLOGS).delete().eq('id', id)
}

const DETAIL_SETTINGS_KEY = 'detail'

export async function getBlogDetailSettings(): Promise<BlogDetailSettings> {
  const { data } = await supabase
    .from(T_SETTINGS)
    .select('value')
    .eq('key', DETAIL_SETTINGS_KEY)
    .maybeSingle()
  return normalizeDetailSettings(data?.value)
}

export async function updateBlogDetailSettings(
  input: Partial<BlogDetailSettings>
): Promise<BlogDetailSettings> {
  const next = normalizeDetailSettings(input)
  const { data, error } = await supabase
    .from(T_SETTINGS)
    .upsert(
      { key: DETAIL_SETTINGS_KEY, value: next, updated_at: new Date().toISOString() },
      { onConflict: 'key' }
    )
    .select('value')
    .single()
  if (error) throw error
  return normalizeDetailSettings(data.value)
}

export async function listAuthors(): Promise<BlogAuthor[]> {
  const { data } = await supabase.from(T_AUTHORS).select('*').order('name')
  if (data && data.length > 0) return data.map(normalizeAuthor)
  const { data: posts } = await supabase
    .from(T_BLOGS)
    .select('author,author_bio,author_title,author_avatar_url')
    .neq('author', '')
  if (!posts) return []
  const seen = new Set<string>()
  return posts
    .filter((p) => p.author && !seen.has(p.author) && seen.add(p.author))
    .map((p) => ({
      id: p.author,
      name: p.author,
      title: p.author_title || '',
      bio: p.author_bio || '',
      avatarUrl: p.author_avatar_url || '',
      linkedin: '',
      twitter: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }))
}

export async function listMediaItems(
  options: { page?: number; limit?: number; search?: string } = {}
) {
  const page = Math.max(1, options.page || 1)
  const limit = Math.min(100, options.limit || 24)
  const offset = (page - 1) * limit
  let query = supabase.from(T_MEDIA).select('*', { count: 'exact' })
  if (options.search) query = query.ilike('filename', `%${options.search}%`)
  const { data, count } = await query
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)
  return {
    docs: (data || []).map(normalizeMedia),
    totalDocs: count ?? 0,
    totalPages: Math.max(1, Math.ceil((count ?? 0) / limit)),
    page,
    limit,
  }
}

export async function createMediaItem(input: {
  url: string
  filename: string
  alt?: string
  mimeType?: string
  size?: number
  width?: number
  height?: number
  storagePath?: string
}): Promise<BlogMediaItem> {
  const { data, error } = await supabase
    .from(T_MEDIA)
    .insert({
      id: randomUUID(),
      url: input.url,
      filename: input.filename,
      alt: input.alt || '',
      mime_type: input.mimeType || null,
      size: input.size || null,
      width: input.width || null,
      height: input.height || null,
      storage_path: input.storagePath || null,
      created_at: new Date().toISOString(),
    })
    .select()
    .single()
  if (error) throw error
  return normalizeMedia(data)
}

export async function deleteMediaItem(id: string): Promise<void> {
  const { data } = await supabase
    .from(T_MEDIA)
    .select('storage_path')
    .eq('id', id)
    .maybeSingle()
  if (data?.storage_path) {
    await supabase.storage.from(STORAGE_BUCKET).remove([data.storage_path])
  }
  await supabase.from(T_MEDIA).delete().eq('id', id)
}
