import type { Metadata } from 'next'
import { listBlogPostsFreshSafe } from '@/lib/blog-db'
import BlogsClient from './BlogsClient'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dglide.com'

export const dynamic = 'force-dynamic'
export const revalidate = 0

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
  const { docs: posts } = await listBlogPostsFreshSafe({
    publishedOnly: true,
    limit: 100,
    sortField: 'publishedAt',
    sortDir: 'desc',
    fields: 'list',
  })

  return <BlogsClient posts={posts} />
}
