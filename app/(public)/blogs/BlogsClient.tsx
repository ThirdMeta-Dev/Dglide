'use client'

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { BlogPost } from '@/lib/blog-db'
import styles from './BlogsClient.module.css'
import { StaggerReveal, StaggerItem } from '@/components/animations/MotionPrimitives'

const PAGE_SIZE = 9
const BOOKMARKS_KEY = 'dglide_bookmarks'

function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set())

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(BOOKMARKS_KEY) || '[]')
      setBookmarks(new Set(stored))
    } catch {}
  }, [])

  const toggle = useCallback((slug: string) => {
    setBookmarks((prev) => {
      const next = new Set(prev)
      if (next.has(slug)) {
        next.delete(slug)
      } else {
        next.add(slug)
      }
      try {
        localStorage.setItem(BOOKMARKS_KEY, JSON.stringify([...next]))
      } catch {}
      return next
    })
  }, [])

  return { bookmarks, toggle }
}

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

function postRenderKey(section: string, post: BlogPost, index: number) {
  return `${section}-${post.id || post.slug || post.title}-${index}`
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

function BookmarkIcon({ saved }: { saved: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="21" viewBox="0 0 14 21" fill="none" aria-hidden>
      <path
        d="M1 1H13V19.5L7 15.5L1 19.5V1Z"
        fill={saved ? '#FF7F1C' : 'none'}
        stroke={saved ? '#FF7F1C' : '#9CA3AF'}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ReadArrow({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="19"
      viewBox="0 0 20 19"
      fill="none"
      aria-hidden
      className={className}
    >
      <path d="M1.00003 8.0939C0.447744 8.09392 1.60277e-05 8.54165 5.96046e-08 9.09393C-1.59085e-05 9.64622 0.447686 10.0939 0.999971 10.0939L1 9.0939L1.00003 8.0939ZM15.1442 10.0935C15.6964 10.0935 16.1442 9.64575 16.1442 9.09346C16.1442 8.54118 15.6965 8.09348 15.1442 8.09349L15.1442 9.09349L15.1442 10.0935ZM1 9.0939L0.999971 10.0939L15.1442 10.0935L15.1442 9.09349L15.1442 8.09349L1.00003 8.0939L1 9.0939Z" fill="currentColor"/>
      <path d="M10.3978 12.4279C10.0072 12.8184 10.0072 13.4516 10.3977 13.8421C10.7882 14.2326 11.4214 14.2326 11.8119 13.842L11.1049 13.1349L10.3978 12.4279ZM15.8533 9.80072C16.2438 9.41018 16.2438 8.77702 15.8533 8.38651C15.4628 7.99599 14.8296 7.99601 14.4391 8.38655L15.1462 9.09363L15.8533 9.80072ZM11.1049 13.1349L11.8119 13.842L15.8533 9.80072L15.1462 9.09363L14.4391 8.38655L10.3978 12.4279L11.1049 13.1349Z" fill="currentColor"/>
      <path d="M11.8077 4.34185C11.4172 3.95134 10.784 3.95136 10.3935 4.34189C10.003 4.73243 10.0029 5.36559 10.3935 5.75611L11.1006 5.04898L11.8077 4.34185ZM14.4345 9.79719C14.8251 10.1877 15.4582 10.1877 15.8488 9.79715C16.2393 9.40661 16.2393 8.77345 15.8488 8.38293L15.1417 9.09006L14.4345 9.79719ZM11.1006 5.04898L10.3935 5.75611L14.4345 9.79719L15.1417 9.09006L15.8488 8.38293L11.8077 4.34185L11.1006 5.04898Z" fill="currentColor"/>
    </svg>
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
  isBookmarked = false,
  onBookmark,
}: {
  post: BlogPost
  stat?: string
  large?: boolean
  isBookmarked?: boolean
  onBookmark?: (slug: string) => void
}) {
  const [imageFailed, setImageFailed] = useState(false)
  const label = typeLabel(post)

  function handleBookmark(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    onBookmark?.(post.slug)
  }

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
            <button
              type="button"
              className={styles.bookmarkBtn}
              onClick={handleBookmark}
              aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark this post'}
            >
              <BookmarkIcon saved={isBookmarked} />
            </button>
          </div>
          <h3 className={styles.cardTitle}>{post.title}</h3>
        </div>

        <span className={styles.readMore}>
          Read More
          <ReadArrow className={styles.readArrow} />
        </span>
      </div>
    </Link>
  )
}

function CarouselSection({
  title,
  posts,
  statForIndex,
  bookmarks,
  onBookmark,
}: {
  title: string
  posts: BlogPost[]
  statForIndex?: (index: number) => string | undefined
  bookmarks: Set<string>
  onBookmark: (slug: string) => void
}) {
  const [page, setPage] = useState(0)
  const totalPages = Math.max(1, Math.ceil(posts.length / 3))
  const currentPage = Math.min(page, totalPages - 1)
  const visiblePosts = posts.slice(currentPage * 3, currentPage * 3 + 3)

  if (posts.length === 0) return null

  return (
    <section className={styles.carouselSection} aria-label={title}>
      <div className={styles.carouselHeader}>
        <h2 className={styles.sectionTitleSmall}>{title}</h2>

        <div className={styles.carouselControls}>
          <span className={styles.carouselCount}>
            {currentPage + 1}/{totalPages}
          </span>
          <div className={styles.carouselButtons}>
            <button
              type="button"
              className={styles.carouselButton}
              disabled={currentPage === 0}
              onClick={() => setPage((value) => Math.max(0, value - 1))}
              aria-label={`Previous ${title}`}
            >
              <SvgIcon src="/blogs/carousel-left.svg" width={15} height={12} className={styles.invertIcon} />
            </button>
            <button
              type="button"
              className={styles.carouselButton}
              disabled={currentPage + 1 >= totalPages}
              onClick={() => setPage((value) => Math.min(totalPages - 1, value + 1))}
              aria-label={`Next ${title}`}
            >
              <SvgIcon src="/blogs/carousel-right.svg" width={15} height={12} className={styles.invertIcon} />
            </button>
          </div>
        </div>
      </div>

      <StaggerReveal key={currentPage} className={styles.cardGrid}>
        {visiblePosts.map((post, index) => {
          const postIndex = currentPage * 3 + index

          return (
            <StaggerItem key={postRenderKey(title, post, postIndex)}>
              <BlogCard
                post={post}
                stat={statForIndex?.(postIndex)}
                isBookmarked={bookmarks.has(post.slug)}
                onBookmark={onBookmark}
              />
            </StaggerItem>
          )
        })}
      </StaggerReveal>
    </section>
  )
}

function EditorialSection({ posts, bookmarks, onBookmark }: { posts: BlogPost[]; bookmarks: Set<string>; onBookmark: (slug: string) => void }) {
  if (posts.length === 0) return null

  return (
    <section className={styles.editorialBand} data-section="blog-editorial">
      <div className={styles.editorialSection}>
        <div className={styles.editorialInner}>
          <div className={styles.editorialHeader}>
            <h2 className={styles.editorialTitle}>Editorial Picks Of The Week</h2>
            <p className={styles.editorialSubtitle}>Hand-picked reads based on what you&apos;re exploring</p>
          </div>

          <StaggerReveal className={styles.editorialGrid}>
            {posts.slice(0, 2).map((post, index) => (
              <StaggerItem key={postRenderKey('editorial', post, index)}>
                <BlogCard
                  post={post}
                  large
                  stat={index === 1 ? "Editor's Pick" : undefined}
                  isBookmarked={bookmarks.has(post.slug)}
                  onBookmark={onBookmark}
                />
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </div>
    </section>
  )
}

function LibrarySection({
  posts,
  search,
  onSearchChange,
  bookmarks,
  onBookmark,
}: {
  posts: BlogPost[]
  search: string
  onSearchChange: (value: string) => void
  bookmarks: Set<string>
  onBookmark: (slug: string) => void
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
            <StaggerReveal key={`${currentPage}-${search}-${filterType}`} className={styles.cardGrid}>
              {visiblePosts.map((post, index) => {
                const postIndex = (currentPage - 1) * PAGE_SIZE + index

                return (
                  <StaggerItem key={postRenderKey('library', post, postIndex)}>
                    <BlogCard
                      post={post}
                      stat={index === 1 || index === 4 ? "Editor's Pick" : undefined}
                      isBookmarked={bookmarks.has(post.slug)}
                      onBookmark={onBookmark}
                    />
                  </StaggerItem>
                )
              })}
            </StaggerReveal>

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
  const [activeTab, setActiveTab] = useState<'blogs' | 'ebooks' | 'case-studies'>('blogs')

  if (!post) return null

  const tabs = [
    { key: 'blogs' as const, label: 'Blogs & Articles' },
    { key: 'ebooks' as const, label: 'Ebooks' },
    { key: 'case-studies' as const, label: 'Case Studies' },
  ]

  return (
    <section className={styles.resourceSection}>
      <div className={styles.resourceInner}>
        <header className={styles.resourceHeader}>
          <h2 className={styles.resourceTitle}>DGlide&apos;s Resource Hub</h2>
          <p className={styles.resourceSubtitle}>Explore our full library of operations intelligence content.</p>
        </header>

        <div className={styles.resourceBody}>
          <nav className={styles.resourceTabs} aria-label="Resource categories">
            {tabs.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                className={cx(styles.resourceTabBtn, activeTab === key && styles.resourceTabActive)}
                onClick={() => setActiveTab(key)}
              >
                {label}
              </button>
            ))}
          </nav>

          {activeTab === 'blogs' ? (
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
                    <ReadArrow className={styles.readArrow} />
                  </span>
                </div>
              </div>
            </Link>
          ) : (
            <div className={styles.comingSoonPanel}>
              <div className={styles.comingSoonContent}>
                <span className={styles.comingSoonIcon}>🚀</span>
                <h3 className={styles.comingSoonTitle}>Coming Soon</h3>
                <p className={styles.comingSoonDesc}>
                  We&apos;re working on our {activeTab === 'ebooks' ? 'Ebooks' : 'Case Studies'} library. Check back soon!
                </p>
              </div>
            </div>
          )}
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
          <ReadArrow />
        </Link>
      </div>
    </section>
  )
}

export default function BlogsClient({ posts }: { posts: BlogPost[] }) {
  const [heroSearch, setHeroSearch] = useState('')
  const [librarySearch, setLibrarySearch] = useState('')
  const libraryRef = useRef<HTMLElement>(null)
  const { bookmarks, toggle: toggleBookmark } = useBookmarks()

  const scrollToLibrary = useCallback(() => {
    libraryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  function submitHeroSearch() {
    setLibrarySearch(heroSearch)
    scrollToLibrary()
  }

  const featuredPosts = posts.filter(p => p.isFeatured).length > 0
    ? posts.filter(p => p.isFeatured)
    : posts.slice(0, 3) // fallback to most recent when no posts are marked featured
  const nonFeaturedPosts = posts.filter(p => !p.isFeatured)
  const latestPosts = nonFeaturedPosts.slice(0, 12)
  const editorialPosts = nonFeaturedPosts.slice(12, 14)
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

          <SearchField
            value={heroSearch}
            onChange={(v) => { setHeroSearch(v); setLibrarySearch(v); }}
            onSubmit={submitHeroSearch}
          />
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
            bookmarks={bookmarks}
            onBookmark={toggleBookmark}
          />

          <CarouselSection
            title="Our Latest Articles"
            posts={latestPosts}
            statForIndex={(index) => (index === 1 ? "Editor's Pick" : undefined)}
            bookmarks={bookmarks}
            onBookmark={toggleBookmark}
          />
        </div>

        <EditorialSection posts={fallbackEditorialPosts} bookmarks={bookmarks} onBookmark={toggleBookmark} />

        <section ref={libraryRef} className={styles.libraryAnchor}>
          <LibrarySection posts={posts} search={librarySearch} onSearchChange={setLibrarySearch} bookmarks={bookmarks} onBookmark={toggleBookmark} />
        </section>

        <ResourceHubSection post={posts[0]} />

        <DemoCtaSection />
      </main>
    </div>
  )
}
