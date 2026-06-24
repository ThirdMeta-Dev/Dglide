'use client'

import { FormEvent, useCallback, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { BlogPost } from '@/lib/blog-db'
import styles from './BlogsClient.module.css'

const PAGE_SIZE = 9

const POST_TYPES = [
  { value: '', label: 'All Types' },
  { value: 'blog', label: 'Blog' },
  { value: 'tutorial', label: 'Tutorial' },
  { value: 'glossary', label: 'Glossary' },
]

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

function formatDate(iso: string | null): string {
  if (!iso) return ''

  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function postDate(post: BlogPost) {
  return formatDate(post.publishedAt || post.createdAt)
}

function typeLabel(post: BlogPost) {
  return post.postType === 'blog' ? 'Blog' : 'Article'
}

function postHref(post: BlogPost) {
  return `/blogs/${post.slug}`
}

function SvgIcon({
  src,
  alt = '',
  width,
  height,
  className,
}: {
  src: string
  alt?: string
  width: number
  height: number
  className?: string
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      aria-hidden={alt ? undefined : true}
    />
  )
}

function SearchField({
  value,
  onChange,
  onSubmit,
  variant = 'hero',
}: {
  value: string
  onChange: (value: string) => void
  onSubmit?: () => void
  variant?: 'hero' | 'library'
}) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit?.()
  }

  return (
    <form
      className={cx(styles.searchField, variant === 'library' && styles.searchFieldLibrary)}
      onSubmit={handleSubmit}
    >
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search articles and topics"
        className={styles.searchInput}
        aria-label="Search articles and topics"
      />
      <button className={styles.searchButton} type="submit" aria-label="Search articles">
        <SvgIcon src="/blogs/search-button.svg" width={32} height={32} />
      </button>
    </form>
  )
}

function BlogCard({
  post,
  stat,
  large = false,
}: {
  post: BlogPost
  stat?: string
  large?: boolean
}) {
  const [imageFailed, setImageFailed] = useState(false)
  const label = typeLabel(post)

  return (
    <Link href={postHref(post)} className={cx(styles.card, large && styles.cardLarge)}>
      <div className={styles.cardImage}>
        {post.featuredImageUrl && !imageFailed ? (
          <Image
            src={post.featuredImageUrl}
            alt={post.title}
            fill
            sizes={large ? '391px' : '(max-width: 900px) 100vw, 354px'}
            className={styles.cardPhoto}
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className={styles.cardImageFallback} />
        )}

        <span className={styles.categoryBadge}>{label}</span>
        {stat && <span className={styles.statRibbon}>{stat}</span>}
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardText}>
          <div className={styles.dateRow}>
            <span>{postDate(post)}</span>
            <SvgIcon src="/blogs/date-bookmark.svg" width={14} height={21} className={styles.dateIcon} />
          </div>
          <h3 className={styles.cardTitle}>{post.title}</h3>
        </div>

        <span className={styles.readMore}>
          Read More
          <SvgIcon src="/blogs/read-arrow.svg" width={11} height={15} />
        </span>
      </div>
    </Link>
  )
}

function CarouselSection({
  title,
  posts,
  statForIndex,
}: {
  title: string
  posts: BlogPost[]
  statForIndex?: (index: number) => string | undefined
}) {
  const [page, setPage] = useState(0)
  const totalPages = Math.max(1, Math.ceil(posts.length / 3))
  const visiblePosts = posts.slice(page * 3, page * 3 + 3)

  if (posts.length === 0) return null

  return (
    <section className={styles.carouselSection} aria-label={title}>
      <div className={styles.carouselHeader}>
        <h2 className={styles.sectionTitleSmall}>{title}</h2>

        <div className={styles.carouselControls}>
          <span className={styles.carouselCount}>
            {page + 1}/{totalPages}
          </span>
          <div className={styles.carouselButtons}>
            <button
              type="button"
              className={styles.carouselButton}
              disabled={page === 0}
              onClick={() => setPage((value) => Math.max(0, value - 1))}
              aria-label={`Previous ${title}`}
            >
              <SvgIcon src="/blogs/carousel-left.svg" width={15} height={12} />
            </button>
            <button
              type="button"
              className={cx(styles.carouselButton, styles.carouselButtonActive)}
              disabled={page + 1 >= totalPages}
              onClick={() => setPage((value) => Math.min(totalPages - 1, value + 1))}
              aria-label={`Next ${title}`}
            >
              <SvgIcon src="/blogs/carousel-right.svg" width={15} height={12} className={styles.invertIcon} />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.cardGrid}>
        {visiblePosts.map((post, index) => (
          <BlogCard key={post.id} post={post} stat={statForIndex?.(page * 3 + index)} />
        ))}
      </div>
    </section>
  )
}

function EditorialSection({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null

  return (
    <section className={styles.editorialBand} data-section="blog-editorial">
      <div className={styles.editorialSection}>
        <div className={styles.editorialInner}>
          <div className={styles.editorialHeader}>
            <h2 className={styles.editorialTitle}>Editorial Picks Of The Week</h2>
            <p className={styles.editorialSubtitle}>Hand-picked reads based on what you&apos;re exploring</p>
          </div>

          <div className={styles.editorialGrid}>
            {posts.slice(0, 2).map((post, index) => (
              <BlogCard key={post.id} post={post} large stat={index === 1 ? "Editor's Pick" : undefined} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function LibrarySection({
  posts,
  search,
  onSearchChange,
}: {
  posts: BlogPost[]
  search: string
  onSearchChange: (value: string) => void
}) {
  const [filterType, setFilterType] = useState('')
  const [page, setPage] = useState(1)
  const [showFilter, setShowFilter] = useState(false)

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()

    return posts.filter((post) => {
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(({ tag }) => tag.toLowerCase().includes(query)) ||
        post.categories.some(({ category }) => category.toLowerCase().includes(query))
      const matchesType = !filterType || post.postType === filterType

      return matchesSearch && matchesType
    })
  }, [filterType, posts, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const visiblePosts = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  const activeFilterLabel = POST_TYPES.find((type) => type.value === filterType)?.label ?? 'All Types'

  function handleSearchChange(value: string) {
    onSearchChange(value)
    setPage(1)
  }

  function goToPage(nextPage: number) {
    setPage(Math.min(totalPages, Math.max(1, nextPage)))
  }

  const visiblePageNumbers = (() => {
    if (totalPages <= 4) return Array.from({ length: totalPages }, (_, index) => index + 1)
    if (currentPage <= 2) return [1, 2, 3, totalPages]
    if (currentPage >= totalPages - 1) return [1, totalPages - 2, totalPages - 1, totalPages]
    return [1, currentPage, currentPage + 1, totalPages]
  })()

  return (
    <section className={styles.librarySection} aria-label="Reading library">
      <header className={styles.libraryHeader}>
        <h2 className={styles.libraryTitle}>Our Entire Reading Library</h2>
      </header>

      <div className={styles.libraryContent}>
        <div className={styles.libraryToolbar}>
          <SearchField value={search} onChange={handleSearchChange} variant="library" />

          <div className={styles.filterWrap}>
            <span className={styles.filterLabel}>Filter by Type :</span>
            <button
              type="button"
              className={styles.filterButton}
              onClick={() => setShowFilter((value) => !value)}
              aria-expanded={showFilter}
            >
              {activeFilterLabel}
              <SvgIcon src="/blogs/dropdown.svg" width={16} height={16} />
            </button>

            {showFilter && (
              <div className={styles.filterMenu}>
                {POST_TYPES.map((type) => (
                  <button
                    key={type.value || 'all'}
                    type="button"
                    className={cx(styles.filterMenuItem, filterType === type.value && styles.filterMenuItemActive)}
                    onClick={() => {
                      setFilterType(type.value)
                      setPage(1)
                      setShowFilter(false)
                    }}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {visiblePosts.length > 0 ? (
          <div className={styles.libraryList}>
            <div className={styles.cardGrid}>
              {visiblePosts.map((post, index) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  stat={index === 1 || index === 4 ? "Editor's Pick" : undefined}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <nav className={styles.pagination} aria-label="Blog pagination">
                <button
                  type="button"
                  className={styles.pageTextButton}
                  disabled={currentPage === 1}
                  onClick={() => goToPage(currentPage - 1)}
                >
                  Previous
                </button>

                <div className={styles.pageNumbers}>
                  {visiblePageNumbers.map((pageNumber, index) => {
                    const previous = visiblePageNumbers[index - 1]
                    const showDots = previous && pageNumber - previous > 1

                    return (
                      <span key={pageNumber} className={styles.pageNumberGroup}>
                        {showDots && <span className={styles.pageNumber}>...</span>}
                        <button
                          type="button"
                          className={cx(styles.pageNumber, pageNumber === currentPage && styles.pageNumberActive)}
                          onClick={() => goToPage(pageNumber)}
                        >
                          {pageNumber}
                        </button>
                      </span>
                    )
                  })}
                </div>

                <button
                  type="button"
                  className={styles.pageTextButton}
                  disabled={currentPage === totalPages}
                  onClick={() => goToPage(currentPage + 1)}
                >
                  Next
                </button>
              </nav>
            )}
          </div>
        ) : (
          <p className={styles.emptyState}>No articles found. Try a different search.</p>
        )}
      </div>
    </section>
  )
}

function ResourceHubSection({ post }: { post: BlogPost | undefined }) {
  if (!post) return null

  return (
    <section className={styles.resourceSection}>
      <div className={styles.resourceInner}>
        <header className={styles.resourceHeader}>
          <h2 className={styles.resourceTitle}>DGlide&apos;s Resource Hub</h2>
          <p className={styles.resourceSubtitle}>Explore our full library of operations intelligence content.</p>
        </header>

        <div className={styles.resourceBody}>
          <nav className={styles.resourceTabs} aria-label="Resource categories">
            <Link href="/blogs" className={styles.resourceTab}>
              Blogs &amp; Articles
            </Link>
            <Link href="/ebooks" className={cx(styles.resourceTab, styles.resourceTabActive)}>
              Ebooks
            </Link>
            <Link href="/case-studies" className={styles.resourceTab}>
              Case Studies
            </Link>
          </nav>

          <Link href={postHref(post)} className={styles.resourceCard}>
            <div className={styles.resourceCardInner}>
              <div className={styles.resourceImage}>
                {post.featuredImageUrl ? (
                  <Image
                    src={post.featuredImageUrl}
                    alt={post.title}
                    fill
                    sizes="364px"
                    className={styles.cardPhoto}
                  />
                ) : (
                  <div className={styles.cardImageFallback} />
                )}
              </div>

              <div className={styles.resourceText}>
                <div className={styles.resourceCopy}>
                  <h3 className={styles.resourceCardTitle}>{post.title}</h3>
                  <p className={styles.resourceExcerpt}>{post.excerpt}</p>
                </div>

                <span className={styles.readMore}>
                  Read More
                  <SvgIcon src="/blogs/read-arrow.svg" width={11} height={15} />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}

function DemoCtaSection() {
  return (
    <section className={styles.demoCta}>
      <div className={styles.demoCtaInner}>
        <div className={styles.demoCtaCopy}>
          <div className={styles.demoEyebrow}>
            <span className={styles.demoEyebrowLine} />
            Ready to see it work?
          </div>
          <h2 className={styles.demoTitle}>Run your operations your way. See how in One Free Demo.</h2>
        </div>

        <Link href="/schedule-demo" className={styles.demoButton}>
          Book A Free Demo
          <SvgIcon src="/blogs/read-arrow.svg" width={11} height={15} />
        </Link>
      </div>
    </section>
  )
}

export default function BlogsClient({ posts }: { posts: BlogPost[] }) {
  const [heroSearch, setHeroSearch] = useState('')
  const [librarySearch, setLibrarySearch] = useState('')
  const libraryRef = useRef<HTMLElement>(null)

  const scrollToLibrary = useCallback(() => {
    libraryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  function submitHeroSearch() {
    setLibrarySearch(heroSearch)
    scrollToLibrary()
  }

  const featuredPosts = posts.slice(0, 12)
  const latestPosts = posts.slice(12, 24)
  const editorialPosts = posts.slice(24, 26)
  const fallbackEditorialPosts = editorialPosts.length > 0 ? editorialPosts : posts.slice(0, 2)

  return (
    <div className={styles.page}>
      <section className={styles.hero} data-section="blog-hero">
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className={styles.breadcrumbChevron}>/</span>
              <Link href="/resources">Resources</Link>
              <span className={styles.breadcrumbChevron}>/</span>
              <span>Blog Listing</span>
            </nav>

            <h1 className={styles.heroTitle}>The Best Blogs And Articles On DGlide&apos;s Operations Platform</h1>
          </div>

          <SearchField value={heroSearch} onChange={setHeroSearch} onSubmit={submitHeroSearch} />
        </div>
      </section>

      <main className={styles.main}>
        <div className={styles.carouselStack}>
          <CarouselSection
            title="Featured Reads"
            posts={featuredPosts}
            statForIndex={(index) => {
              if (index === 0) return 'Top 2% most read, 1099 Shares'
              if (index === 2) return 'Most Shared Blog'
              return undefined
            }}
          />

          <CarouselSection
            title="Our Latest Articles"
            posts={latestPosts}
            statForIndex={(index) => (index === 1 ? "Editor's Pick" : undefined)}
          />
        </div>

        <EditorialSection posts={fallbackEditorialPosts} />

        <section ref={libraryRef} className={styles.libraryAnchor}>
          <LibrarySection posts={posts} search={librarySearch} onSearchChange={setLibrarySearch} />
        </section>

        <ResourceHubSection post={posts[0]} />

        <DemoCtaSection />
      </main>
    </div>
  )
}
