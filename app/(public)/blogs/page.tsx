import type { Metadata } from 'next'
import { listBlogPostsSafe } from '@/lib/blog-db'
import BlogsClient from './BlogsClient'

export const metadata: Metadata = {
  title: 'Blog | DGlide',
  description: "The best blogs and articles on DGlide's Operations Platform",
}

export default async function BlogsPage() {
  const { docs: posts } = await listBlogPostsSafe({
    publishedOnly: true,
    limit: 100,
    sortField: 'publishedAt',
    sortDir: 'desc',
  })

  return <BlogsClient posts={posts} />
}
