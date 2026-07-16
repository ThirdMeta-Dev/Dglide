import type { MetadataRoute } from 'next'
import { listBlogPostsSafe } from '@/lib/blog-db'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dglide.com'

export const revalidate = 86400

const STATIC_PAGES: MetadataRoute.Sitemap = [
  { url: SITE_URL,                            priority: 1.0, changeFrequency: 'weekly',  lastModified: new Date() },
  { url: `${SITE_URL}/platform`,              priority: 0.9, changeFrequency: 'monthly', lastModified: new Date() },
  { url: `${SITE_URL}/it-service-management-itsm`, priority: 0.9, changeFrequency: 'monthly', lastModified: new Date() },
  { url: `${SITE_URL}/field-service-management-fsm`, priority: 0.9, changeFrequency: 'monthly', lastModified: new Date() },
  { url: `${SITE_URL}/customer-relationship-management-crm`, priority: 0.9, changeFrequency: 'monthly', lastModified: new Date() },
  { url: `${SITE_URL}/manufacturing-management-software`, priority: 0.9, changeFrequency: 'monthly', lastModified: new Date() },
  { url: `${SITE_URL}/why-dglide`,            priority: 0.8, changeFrequency: 'monthly', lastModified: new Date() },
  { url: `${SITE_URL}/about`,                 priority: 0.7, changeFrequency: 'monthly', lastModified: new Date() },
  { url: `${SITE_URL}/pricing`,               priority: 0.8, changeFrequency: 'weekly',  lastModified: new Date() },
  { url: `${SITE_URL}/blogs`,                 priority: 0.8, changeFrequency: 'daily',   lastModified: new Date() },
  { url: `${SITE_URL}/contact-us`,            priority: 0.6, changeFrequency: 'monthly', lastModified: new Date() },
  { url: `${SITE_URL}/schedule-demo`,         priority: 0.7, changeFrequency: 'monthly', lastModified: new Date() },
  { url: `${SITE_URL}/privacy-policy`,        priority: 0.3, changeFrequency: 'yearly',  lastModified: new Date() },
  { url: `${SITE_URL}/terms-conditions`,      priority: 0.3, changeFrequency: 'yearly',  lastModified: new Date() },
  { url: `${SITE_URL}/account-deletion`,      priority: 0.3, changeFrequency: 'yearly',  lastModified: new Date() },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { docs: posts } = await listBlogPostsSafe({
    publishedOnly: true,
    limit: 500,
    sortField: 'publishedAt',
    sortDir: 'desc',
    fields: 'list',
  })

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blogs/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt || new Date()),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...STATIC_PAGES, ...blogEntries]
}
