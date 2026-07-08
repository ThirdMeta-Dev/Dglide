import type { Metadata } from 'next'
import { listBlogPostsSafe } from '@/lib/blog-db'
import BlogsClient from './BlogsClient'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dglide.com'

export const revalidate = 300 // re-fetch from Supabase at most every 5 minutes

export const metadata: Metadata = {
  title: 'Blog',
  description: "The best blogs and articles on DGlide's Operations Platform — ITSM, field service management, workflow automation, and more.",
  alternates: {
    canonical: `${SITE_URL}/blogs`,
  },
  openGraph: {
    title: "Blog | DGlide",
    description: "The best blogs and articles on DGlide's Operations Platform — ITSM, field service management, workflow automation, and more.",
    url: `${SITE_URL}/blogs`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Blog | DGlide",
    description: "The best blogs and articles on DGlide's Operations Platform — ITSM, field service management, workflow automation, and more.",
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
