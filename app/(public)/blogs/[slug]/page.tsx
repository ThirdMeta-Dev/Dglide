import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { DemoSection as ContactDemoSection } from '@/components/contact-us/ContactPageSections'
import { getBlogPostBySlug } from '@/lib/blog-db'
import type { BlogPost } from '@/lib/blog-db'
import BlogDetailSidebar from './BlogDetailSidebar'
import styles from './BlogDetail.module.css'
import { ScrollReveal } from '@/components/animations/MotionPrimitives'

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>
}

type TocItem = {
  id: string
  text: string
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dglide.com'

function formatDate(iso: string | null): string {
  if (!iso) return ''

  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function textFromHtml(value: string): string {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function cleanArticleHtml(value: string): string {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/\son[a-z]+\s*=\s*(["']).*?\1/gi, '')
    .replace(/\shref\s*=\s*(["'])\s*javascript:[\s\S]*?\1/gi, ' href="#"')
}

function anchorId(text: string, index: number): string {
  const base = text
    .toLowerCase()
    .replace(/&[^;\s]+;/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return base ? `${base}-${index + 1}` : `section-${index + 1}`
}

function isFaqHeading(text: string): boolean {
  return /\b(faqs?|frequently asked questions?)\b/i.test(text)
}

function renderFaqAccordion(items: Array<{ question: string; answer: string }>): string {
  if (items.length === 0) return ''

  return `<div class="${styles.articleFaqAccordion}">${items
    .map(
      (item) => `<details class="${styles.articleFaqItem}">
        <summary class="${styles.articleFaqQuestion}">
          <span>${escapeHtml(item.question)}</span>
          <span class="${styles.articleFaqToggle}" aria-hidden="true"></span>
        </summary>
        <div class="${styles.articleFaqAnswer}">${item.answer}</div>
      </details>`
    )
    .join('')}</div>`
}

function transformHeadingFaqBody(body: string): string | null {
  const questionRegex = /<h([3-4])([^>]*)>([\s\S]*?)<\/h\1>/gi
  const matches = Array.from(body.matchAll(questionRegex))
  if (matches.length === 0) return null

  const intro = body.slice(0, matches[0].index || 0).trim()
  const items = matches
    .map((match, index) => {
      const question = textFromHtml(match[3] || '')
      const answerStart = (match.index || 0) + match[0].length
      const answerEnd = matches[index + 1]?.index ?? body.length
      const answer = body.slice(answerStart, answerEnd).trim()

      return question && answer ? { question, answer } : null
    })
    .filter((item): item is { question: string; answer: string } => Boolean(item))

  if (items.length === 0) return null
  return `${intro}${renderFaqAccordion(items)}`
}

function isFaqQuestionBlock(block: string): boolean {
  const text = textFromHtml(block)
  if (!text) return false

  return (
    /\?$/.test(text) ||
    /^q(?:uestion)?\s*[:.)-]/i.test(text) ||
    /<strong\b[^>]*>[\s\S]*\?[\s\S]*<\/strong>/i.test(block)
  )
}

function transformParagraphFaqBody(body: string): string | null {
  const paragraphRegex = /<p\b[^>]*>[\s\S]*?<\/p>/gi
  const matches = Array.from(body.matchAll(paragraphRegex))
  if (matches.length < 2) return null

  const items: Array<{ question: string; answer: string }> = []
  let introEnd = 0
  let currentQuestion = ''
  let currentAnswerStart = 0

  matches.forEach((match) => {
    const block = match[0]
    const blockStart = match.index || 0
    const blockEnd = blockStart + block.length

    if (!isFaqQuestionBlock(block)) return

    if (currentQuestion) {
      const answer = body.slice(currentAnswerStart, blockStart).trim()
      if (answer) items.push({ question: currentQuestion, answer })
    } else {
      introEnd = blockStart
    }

    currentQuestion = textFromHtml(block)
    currentAnswerStart = blockEnd
  })

  if (currentQuestion) {
    const answer = body.slice(currentAnswerStart).trim()
    if (answer) items.push({ question: currentQuestion, answer })
  }

  if (items.length === 0) return null
  return `${body.slice(0, introEnd).trim()}${renderFaqAccordion(items)}`
}

function transformFaqSections(value: string): string {
  return value.replace(
    /(<h2\b[^>]*>[\s\S]*?<\/h2>)([\s\S]*?)(?=<h2\b|$)/gi,
    (section, heading: string, body: string) => {
      if (!isFaqHeading(textFromHtml(heading))) return section
      if (/<details\b/i.test(body)) return section

      const transformedBody = transformHeadingFaqBody(body) || transformParagraphFaqBody(body)
      return transformedBody ? `${heading}${transformedBody}` : section
    }
  )
}

function extractFaqItems(html: string): Array<{ question: string; answer: string }> {
  const items: Array<{ question: string; answer: string }> = []
  const sectionRegex = /(<h2\b[^>]*>[\s\S]*?<\/h2>)([\s\S]*?)(?=<h2\b|$)/gi

  for (const sectionMatch of html.matchAll(sectionRegex)) {
    const heading = sectionMatch[1]
    const body = sectionMatch[2]
    if (!isFaqHeading(textFromHtml(heading))) continue

    const headingMatches = Array.from(body.matchAll(/<h([3-4])([^>]*)>([\s\S]*?)<\/h\1>/gi))
    if (headingMatches.length > 0) {
      headingMatches.forEach((m, i) => {
        const question = textFromHtml(m[3] || '')
        const answerStart = (m.index || 0) + m[0].length
        const answerEnd = headingMatches[i + 1]?.index ?? body.length
        const answer = textFromHtml(body.slice(answerStart, answerEnd).trim())
        if (question && answer) items.push({ question, answer })
      })
    } else {
      const paraMatches = Array.from(body.matchAll(/<p\b[^>]*>[\s\S]*?<\/p>/gi))
      let currentQuestion = ''
      let currentAnswerStart = 0
      paraMatches.forEach((m) => {
        if (!isFaqQuestionBlock(m[0])) return
        if (currentQuestion) {
          const answer = textFromHtml(body.slice(currentAnswerStart, m.index || 0).trim())
          if (answer) items.push({ question: currentQuestion, answer })
        }
        currentQuestion = textFromHtml(m[0])
        currentAnswerStart = (m.index || 0) + m[0].length
      })
      if (currentQuestion) {
        const answer = textFromHtml(body.slice(currentAnswerStart).trim())
        if (answer) items.push({ question: currentQuestion, answer })
      }
    }
  }

  return items
}

function buildArticleSchema(post: BlogPost, siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    image: post.featuredImageUrl || undefined,
    url: `${siteUrl}/blogs/${post.slug}`,
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt || post.publishedAt || post.createdAt,
    author: {
      '@type': 'Person',
      name: post.author || 'DGlide Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'DGlide',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    keywords: post.tags.map((t) => t.tag).join(', ') || post.focusKeyword || undefined,
  }
}

function buildFaqSchema(items: Array<{ question: string; answer: string }>) {
  if (items.length === 0) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

function buildBreadcrumbSchema(post: BlogPost, siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blogs` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${siteUrl}/blogs/${post.slug}` },
    ],
  }
}

function prepareArticleHtml(post: BlogPost): { html: string; toc: TocItem[] } {
  const source = transformFaqSections(cleanArticleHtml(post.contentHtml.trim())) || `<p>${escapeHtml(post.excerpt)}</p>`
  const toc: TocItem[] = []

  const html = source.replace(
    /<h2([^>]*)>([\s\S]*?)<\/h2>/gi,
    (match, attributes: string, innerHtml: string) => {
      const text = textFromHtml(innerHtml)
      if (!text) return match

      const existingId = attributes.match(/\sid=["']([^"']+)["']/i)?.[1]
      const id = existingId || anchorId(text, toc.length)
      toc.push({ id, text })

      if (existingId) return match
      return `<h2${attributes} id="${id}">${innerHtml}</h2>`
    }
  )

  return { html, toc }
}

function postDate(post: BlogPost) {
  return formatDate(post.publishedAt || post.createdAt)
}

function postTypeLabel(post: BlogPost) {
  if (post.postType === 'tutorial') return 'Tutorial'
  if (post.postType === 'glossary') return 'Glossary'
  return 'Blog'
}

function HeroSection({ post }: { post: BlogPost }) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/resources">Resources</Link>
            <span aria-hidden="true">/</span>
            <span>{post.title}</span>
          </nav>

          <div className={styles.heroText}>
            <p className={styles.postType}>{postTypeLabel(post)}</p>
            <h1>{post.title}</h1>
          </div>

          <div className={styles.metaRow}>
            <div className={styles.authorMini}>
              <div className={styles.authorMiniImage}>
                {post.authorAvatarUrl ? (
                  <Image src={post.authorAvatarUrl} alt={post.author || 'Author'} fill sizes="44px" />
                ) : (
                  <span>{(post.author || 'D').slice(0, 1).toUpperCase()}</span>
                )}
              </div>
              <div>
                <strong>{post.author || 'DGlide Team'}</strong>
                <span>{post.authorTitle || 'Operations Writer'}</span>
              </div>
            </div>
            <span className={styles.metaDivider}>|</span>
            <span>{postDate(post)}</span>
            <span className={styles.metaDivider}>|</span>
            <span>{String(post.readingTime || 1).padStart(2, '0')} Mins read</span>
          </div>
        </div>

        <div className={styles.heroImageWrap}>
          {post.featuredImageUrl ? (
            <Image
              src={post.featuredImageUrl}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 480px"
              className={styles.heroImage}
            />
          ) : (
            <div className={styles.imagePlaceholder} />
          )}
        </div>
      </div>
    </section>
  )
}

function AuthorSection({ post }: { post: BlogPost }) {
  return (
    <section className={styles.authorBox}>
      <div className={styles.authorBoxTop}>
        <div className={styles.authorBoxImage}>
          {post.authorAvatarUrl ? (
            <Image src={post.authorAvatarUrl} alt={post.author || 'Author'} fill sizes="74px" />
          ) : (
            <span>{(post.author || 'D').slice(0, 1).toUpperCase()}</span>
          )}
        </div>
        <div className={styles.authorBoxText}>
          <h2>{post.author || 'DGlide Team'}</h2>
          <p>{post.authorTitle || 'Operations Writer'}</p>
          <div className={styles.authorSocials}>
            {[
              { src: '/footer/social-linkedin.png', label: 'LinkedIn' },
              { src: '/footer/social-twitter.png',  label: 'Twitter'  },
              { src: '/footer/social-instagram.png', label: 'Instagram' },
            ].map(({ src, label }) => (
              <span key={label} className={styles.authorSocialIcon} aria-label={label}>
                <Image src={src} alt={label} width={18} height={18} style={{ objectFit: 'contain' }} />
              </span>
            ))}
          </div>
        </div>
      </div>
      {post.authorBio && <p className={styles.authorBio}>{post.authorBio}</p>}
    </section>
  )
}

export async function generateStaticParams() {
  const { listBlogPosts } = await import('@/lib/blog-db')
  const { docs } = await listBlogPosts({ publishedOnly: true, limit: 500 })
  return docs.map((p) => ({ slug: p.slug }))
}

export const revalidate = 3600

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return { title: 'Blog Not Found' }
  }

  const title = post.seoTitle || post.title
  const description = post.seoDescription || post.excerpt
  const canonicalUrl = `${SITE_URL}/blogs/${post.slug}`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'article',
      title,
      description,
      url: canonicalUrl,
      images: post.featuredImageUrl
        ? [{ url: post.featuredImageUrl, width: 1200, height: 630, alt: title }]
        : undefined,
      publishedTime: post.publishedAt || undefined,
      modifiedTime: post.updatedAt || undefined,
      authors: post.author ? [post.author] : undefined,
      tags: post.tags.map((t) => t.tag),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: post.featuredImageUrl ? [post.featuredImageUrl] : undefined,
    },
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post || post.status !== 'published') notFound()

  const { html, toc } = prepareArticleHtml(post)

  const faqItems = extractFaqItems(cleanArticleHtml(post.contentHtml))
  const articleSchema = buildArticleSchema(post, SITE_URL)
  const faqSchema = buildFaqSchema(faqItems)
  const breadcrumbSchema = buildBreadcrumbSchema(post, SITE_URL)

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <ScrollReveal direction="up">
        <HeroSection post={post} />
      </ScrollReveal>

      <main className={styles.contentShell}>
        <div className={styles.articleGrid}>
          <BlogDetailSidebar
            toc={toc}
            title={post.title}
            slug={post.slug}
            articleUrl={`${SITE_URL}/blogs/${post.slug}`}
          />

          <article className={styles.article}>
            <div id="article-start" className={styles.articleContent} dangerouslySetInnerHTML={{ __html: html }} />
          </article>
        </div>

        <ScrollReveal direction="up">
          <AuthorSection post={post} />
        </ScrollReveal>
      </main>

      <div className={styles.contactDemoWrap}>
        <ContactDemoSection />
      </div>
    </div>
  )
}
