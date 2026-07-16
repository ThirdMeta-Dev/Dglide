import type { Metadata } from 'next'
import { listBlogPostsSafe } from '@/lib/blog-db'
import BlogsClient from './BlogsClient'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dglide.com'

export const revalidate = 300 // re-fetch from Supabase at most every 5 minutes

export const metadata: Metadata = {
  title: { absolute: 'ITSM & Field Service Blog | DGlide' },
  description: 'Insights on ITSM, field service management, and workflow automation for operations and IT teams running field-heavy businesses.',
  alternates: {
    canonical: `${SITE_URL}/blogs`,
  },
  openGraph: {
    title: 'ITSM & Field Service Blog | DGlide',
    description: 'Insights on ITSM, field service management, and workflow automation for operations and IT teams running field-heavy businesses.',
    url: `${SITE_URL}/blogs`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ITSM & Field Service Blog | DGlide',
    description: 'Insights on ITSM, field service management, and workflow automation for operations and IT teams running field-heavy businesses.',
  },
}

export default async function BlogsPage() {
  const { docs: posts } = await listBlogPostsSafe({
    publishedOnly: true,
    limit: 100,
    sortField: 'publishedAt',
    sortDir: 'desc',
    fields: 'list',
  })

  return <BlogsClient posts={posts} />
}
