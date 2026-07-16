'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Bookmark, Check, Copy, Heart } from 'lucide-react'
import Link from 'next/link'
import type { BlogDetailSettings } from '@/lib/blog-db'
import styles from './BlogDetail.module.css'

type TocItem = {
  id: string
  text: string
}

type BlogDetailSidebarProps = {
  toc: TocItem[]
  title: string
  slug: string
  articleUrl: string
  settings: BlogDetailSettings
}

const VISIBLE_TOC_ITEMS = 3

function classNames(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ')
}

function WhatsAppIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="white" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.108.55 4.088 1.514 5.808L0 24l6.344-1.487C8.014 23.468 9.972 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.85 0-3.587-.505-5.078-1.383l-.365-.214-3.768.883.918-3.652-.236-.378A9.94 9.94 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  )
}

export default function BlogDetailSidebar({
  toc,
  title,
  slug,
  articleUrl,
  settings,
}: BlogDetailSidebarProps) {
  const [expanded, setExpanded] = useState(false)
  const [activeId, setActiveId] = useState(toc[0]?.id || '')
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)
  const [currentUrl, setCurrentUrl] = useState(articleUrl)
  const tocNavRef = useRef<HTMLDivElement | null>(null)

  const visibleToc = expanded ? toc : toc.slice(0, VISIBLE_TOC_ITEMS)
  const hiddenCount = Math.max(0, toc.length - VISIBLE_TOC_ITEMS)

  useEffect(() => {
    setCurrentUrl(window.location.href || articleUrl)
  }, [articleUrl])

  useEffect(() => {
    try {
      const likes = JSON.parse(localStorage.getItem('blog_likes') || '{}') as Record<string, boolean | number>
      const bookmarks = JSON.parse(localStorage.getItem('blog_bookmarks') || '{}') as Record<string, boolean>
      setLiked(Boolean(likes[slug]))
      setLikeCount(Number(likes[`${slug}_count`]) || 0)
      setSaved(Boolean(bookmarks[slug]))
    } catch {
      setLiked(false)
      setLikeCount(0)
      setSaved(false)
    }
  }, [slug])

  useEffect(() => {
    if (toc.length === 0) return

    let frame = 0

    const updateActiveItem = () => {
      let current = toc[0]?.id || ''

      for (const item of toc) {
        const element = document.getElementById(item.id)
        if (!element) continue
        if (element.getBoundingClientRect().top <= 130) {
          current = item.id
        } else {
          break
        }
      }

      const currentIndex = toc.findIndex((item) => item.id === current)
      if (currentIndex >= VISIBLE_TOC_ITEMS) {
        setExpanded(true)
      }

      setActiveId((previous) => (previous === current ? previous : current))
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        updateActiveItem()
        frame = 0
      })
    }

    updateActiveItem()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [toc])

  useEffect(() => {
    if (!activeId || !tocNavRef.current) return
    tocNavRef.current
      .querySelector(`[data-tocid="${activeId}"]`)
      ?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [activeId])

  const scrollToTocItem = useCallback((item: TocItem) => {
    const element = document.getElementById(item.id)
    if (!element) return

    setActiveId(item.id)
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', `#${item.id}`)
  }, [])

  const toggleLike = () => {
    try {
      const likes = JSON.parse(localStorage.getItem('blog_likes') || '{}') as Record<string, boolean | number>
      const nextLiked = !liked
      const nextCount = Math.max(0, likeCount + (nextLiked ? 1 : -1))
      likes[slug] = nextLiked
      likes[`${slug}_count`] = nextCount
      localStorage.setItem('blog_likes', JSON.stringify(likes))
      setLiked(nextLiked)
      setLikeCount(nextCount)
    } catch {
      setLiked((current) => !current)
    }
  }

  const toggleSaved = () => {
    try {
      const bookmarks = JSON.parse(localStorage.getItem('blog_bookmarks') || '{}') as Record<string, boolean>
      const nextSaved = !saved
      bookmarks[slug] = nextSaved
      localStorage.setItem('blog_bookmarks', JSON.stringify(bookmarks))
      setSaved(nextSaved)
    } catch {
      setSaved((current) => !current)
    }
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(false)
    }
  }

  const encodedUrl = encodeURIComponent(currentUrl)
  const encodedTitle = encodeURIComponent(title)

  return (
    <aside className={styles.sidebar}>
      {toc.length > 0 && (
        <nav className={styles.tocCard} aria-label="Table of contents">
          <div className={styles.tocHeader}>
            <span className={styles.tocAccent} aria-hidden="true" />
            <h2>Contents</h2>
            <span className={styles.tocSectionCount}>{toc.length} sections</span>
          </div>

          <div ref={tocNavRef} className={styles.tocBody}>
            {visibleToc.map((item, index) => {
              const active = activeId === item.id

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  data-tocid={item.id}
                  className={classNames(
                    styles.tocLink,
                    active && styles.tocLinkActive
                  )}
                  aria-current={active ? 'true' : undefined}
                  onClick={(event) => {
                    event.preventDefault()
                    scrollToTocItem(item)
                  }}
                >
                  <span className={styles.tocIndex}>{String(index + 1).padStart(2, '0')}</span>
                  <span className={styles.tocText}>{item.text}</span>
                </a>
              )
            })}

            {toc.length > VISIBLE_TOC_ITEMS && (
              <button
                type="button"
                className={styles.tocShowMore}
                onClick={() => setExpanded((current) => !current)}
              >
                <span aria-hidden="true">{expanded ? '^' : 'v'}</span>
                {expanded ? 'Show fewer' : `+ ${hiddenCount} more section${hiddenCount === 1 ? '' : 's'}`}
              </button>
            )}
          </div>
        </nav>
      )}

      {settings.sidebarCtaEnabled && (
        <section className={styles.sidebarCta} aria-label={settings.sidebarCtaTitle}>
          {settings.sidebarCtaImageUrl && (
            <div className={styles.sidebarCtaImage}>
              <img src={settings.sidebarCtaImageUrl} alt="" loading="lazy" />
            </div>
          )}
          <span>{settings.sidebarCtaEyebrow}</span>
          <h2>{settings.sidebarCtaTitle}</h2>
          <p>{settings.sidebarCtaText}</p>
          <Link href={settings.sidebarCtaButtonHref || '/schedule-demo'}>
            {settings.sidebarCtaButtonLabel}<b aria-hidden>→</b>
          </Link>
        </section>
      )}

      <section className={styles.shareCard} aria-label="Share this post">
        <div className={styles.engagementRow}>
          <button
            type="button"
            className={classNames(styles.engagementButton, liked && styles.likeButtonActive)}
            onClick={toggleLike}
            title={liked ? 'Unlike this post' : 'Like this post'}
          >
            <Heart size={15} fill={liked ? 'currentColor' : 'none'} />
            <span>{likeCount > 0 ? likeCount : 'Like'}</span>
          </button>

          <button
            type="button"
            className={classNames(styles.engagementButton, saved && styles.saveButtonActive)}
            onClick={toggleSaved}
            title={saved ? 'Remove bookmark' : 'Save this post'}
          >
            <Bookmark size={15} fill={saved ? 'currentColor' : 'none'} />
            <span>{saved ? 'Saved' : 'Save'}</span>
          </button>
        </div>

        <h2>Share This Post</h2>

        <div className={styles.shareIcons}>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            target="_blank"
            rel="noreferrer"
            className={classNames(styles.shareCircle, styles.shareLinkedin)}
            aria-label="Share on LinkedIn"
          >
            in
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
            target="_blank"
            rel="noreferrer"
            className={classNames(styles.shareCircle, styles.shareTwitter)}
            aria-label="Share on X"
          >
            X
          </a>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${title} ${currentUrl}`)}`}
            target="_blank"
            rel="noreferrer"
            className={classNames(styles.shareCircle, styles.shareWhatsapp)}
            aria-label="Share on WhatsApp"
          >
            <WhatsAppIcon />
          </a>
          <button
            type="button"
            className={classNames(styles.shareCircle, styles.shareCopy, copied && styles.shareCopyActive)}
            onClick={copyLink}
            title="Copy link"
            aria-label="Copy link"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>

        {copied && <p className={styles.copyFeedback}>Link copied to clipboard.</p>}
      </section>
    </aside>
  )
}
