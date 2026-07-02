'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { Table, TableRow, TableHeader, TableCell } from '@tiptap/extension-table'
import {
  ArrowLeft,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Highlighter,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  Image as ImageIcon,
  Table as TableIcon,
  Undo,
  Redo,
  ChevronDown,
  Plus,
  Minus,
  Trash2,
  Sparkles,
  X,
  ExternalLink,
  FileText,
  Wand2,
  BarChart2,
  Upload,
  ChevronRight,
} from 'lucide-react'
import type { BlogAuthor, BlogPost, BlogTag } from '@/lib/blog-db'
import { slugify, countWords, calcReadingTime } from '@/lib/blog-utils'
import MediaPicker from './MediaPicker'

type Props = {
  postId: string | null
  onBack: () => void
}

type SaveStatus = 'saved' | 'saving' | 'unsaved' | ''
type AiTab = 'write' | 'import' | 'improve' | 'seo'

type SeoResult = {
  seoScore: number
  readabilityScore: number
  keywordDensity: string
  suggestions: string[]
}

function ScoreCircle({ score, label }: { score: number; label: string }) {
  const color = score >= 70 ? '#22c55e' : score >= 40 ? '#f97316' : '#ef4444'
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-white"
        style={{ background: color }}
      >
        {score}
      </div>
      <span className="text-xs text-[#888] [font-family:var(--font-inter)]">{label}</span>
    </div>
  )
}

function Collapsible({
  label,
  children,
  defaultOpen = false,
}: {
  label: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-t border-[#F0F0F0]">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full py-3 px-4 text-sm font-medium text-[#333] [font-family:var(--font-sora)] hover:bg-[#FAFAFA] transition-colors"
      >
        {label}
        <ChevronRight
          className={`w-4 h-4 text-[#AAA] transition-transform ${open ? 'rotate-90' : ''}`}
        />
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  )
}

function ToolbarBtn({
  active,
  onClick,
  disabled,
  title,
  children,
}: {
  active?: boolean
  onClick: () => void
  disabled?: boolean
  title: string
  children: React.ReactNode
}) {
  return (
    <button
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`p-1.5 rounded-md transition-colors disabled:opacity-30 ${
        active
          ? 'bg-[#1C2BFF]/10 text-[#1C2BFF]'
          : 'text-[#555] hover:bg-[#F0F0F0] hover:text-black'
      }`}
    >
      {children}
    </button>
  )
}

export default function BlogEditor({ postId, onBack }: Props) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentId, setCurrentId] = useState<string | null>(postId)

  // Core fields
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [slugManual, setSlugManual] = useState(false)
  const [excerpt, setExcerpt] = useState('')
  const [status, setStatus] = useState<'draft' | 'published'>('draft')
  const [postType, setPostType] = useState<'blog' | 'glossary' | 'tutorial'>('blog')
  const [isFeatured, setIsFeatured] = useState(false)
  const [publishedAt, setPublishedAt] = useState('')

  // Author
  const [author, setAuthor] = useState('')
  const [authorTitle, setAuthorTitle] = useState('')
  const [authorBio, setAuthorBio] = useState('')
  const [authorAvatarUrl, setAuthorAvatarUrl] = useState('')
  const [authorSuggestions, setAuthorSuggestions] = useState<BlogAuthor[]>([])
  const [showAuthorSugg, setShowAuthorSugg] = useState(false)

  // Featured image
  const [featuredImageUrl, setFeaturedImageUrl] = useState('')

  // SEO
  const [seoTitle, setSeoTitle] = useState('')
  const [seoDescription, setSeoDescription] = useState('')
  const [focusKeyword, setFocusKeyword] = useState('')

  // Tags
  const [tags, setTags] = useState<BlogTag[]>([])
  const [tagInput, setTagInput] = useState('')

  // UI state
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('')
  const [wordCount, setWordCount] = useState(0)
  const [readingTime, setReadingTime] = useState(1)
  const [showAiPanel, setShowAiPanel] = useState(false)
  const [aiTab, setAiTab] = useState<AiTab>('write')
  const [mediaTarget, setMediaTarget] = useState<'featured' | 'editor' | null>(null)

  // AI write
  const [aiTopic, setAiTopic] = useState('')
  const [aiTone, setAiTone] = useState('Professional')
  const [aiLength, setAiLength] = useState('Medium')
  const [aiWriteLoading, setAiWriteLoading] = useState(false)
  const [aiWriteError, setAiWriteError] = useState('')

  // AI improve
  const [aiInstruction, setAiInstruction] = useState('')
  const [aiImproveLoading, setAiImproveLoading] = useState(false)
  const [aiImproveError, setAiImproveError] = useState('')

  // AI SEO
  const [seoResult, setSeoResult] = useState<SeoResult | null>(null)
  const [seoLoading, setSeoLoading] = useState(false)
  const [seoError, setSeoError] = useState('')

  // AI import doc
  const [docFile, setDocFile] = useState<File | null>(null)
  const [docLoading, setDocLoading] = useState(false)
  const [docError, setDocError] = useState('')
  const docRef = useRef<HTMLInputElement>(null)

  // AI import gdoc URL
  const [gdocUrl, setGdocUrl] = useState('')
  const [gdocLoading, setGdocLoading] = useState(false)
  const [gdocError, setGdocError] = useState('')

  // Warning banner shown after paste when blob: images were dropped
  const [pasteImageWarning, setPasteImageWarning] = useState(false)

  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  // Stable refs so closures inside useEditor always call the latest function
  const uploadBinaryImageRef = useRef<(file: File) => Promise<void>>(async () => {})
  const triggerAutoSaveRef = useRef<() => void>(() => {})
  const googleDocsPasteRef = useRef<(html: string, imageFiles: File[]) => Promise<void>>(async () => {})

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TextStyle,
      Highlight.configure({ multicolor: false }),
      Image.configure({ inline: true }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: 'Start writing your post…' }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      const wc = countWords(html)
      setWordCount(wc)
      setReadingTime(calcReadingTime(html))
      setSaveStatus('unsaved')
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current)
      autoSaveTimer.current = setTimeout(() => triggerAutoSaveRef.current(), 30000)
    },
    editorProps: {
      // Convert Google Docs clipboard HTML into clean semantic HTML that TipTap understands.
      // Google Docs wraps everything in <b style="font-weight:normal" id="docs-internal-guid-...">
      // and encodes bold/italic as <span style="font-weight:700"> instead of <strong>/<em>.
      transformPastedHTML(html: string) {
        const parser = new DOMParser()
        const doc = parser.parseFromString(html, 'text/html')

        // Unwrap the Google Docs outer <b id="docs-internal-guid-..."> wrapper.
        // It has font-weight:normal to cancel itself out — stripping the style would make
        // everything bold, so we remove the element entirely and keep its children.
        doc.querySelectorAll('b[id^="docs-internal-guid"]').forEach(wrapper => {
          const frag = doc.createDocumentFragment()
          Array.from(wrapper.childNodes).forEach(n => frag.appendChild(n))
          wrapper.replaceWith(frag)
        })

        // Remove noise elements
        doc.querySelectorAll('meta, link, style').forEach(el => el.remove())

        // Convert styled <span> elements to semantic equivalents.
        // Process innermost spans first (reverse document order) so nested
        // bold+italic combinations are handled correctly.
        Array.from(doc.querySelectorAll('span[style]')).reverse().forEach(spanEl => {
          const span = spanEl as HTMLSpanElement
          const cs = span.style
          const bold = cs.fontWeight === 'bold' || Number(cs.fontWeight) >= 600
          const italic = cs.fontStyle === 'italic'
          const underline = cs.textDecoration.includes('underline')
          const strike = cs.textDecoration.includes('line-through')

          // Move children out of the span into a fragment
          const frag = doc.createDocumentFragment()
          Array.from(span.childNodes).forEach(n => frag.appendChild(n))

          if (bold || italic || underline || strike) {
            let node: Node = frag
            if (strike)    { const e = doc.createElement('s');      e.appendChild(node); node = e }
            if (underline) { const e = doc.createElement('u');      e.appendChild(node); node = e }
            if (italic)    { const e = doc.createElement('em');     e.appendChild(node); node = e }
            if (bold)      { const e = doc.createElement('strong'); e.appendChild(node); node = e }
            span.replaceWith(node)
          } else {
            span.replaceWith(frag)
          }
        })

        // Strip style/class/id/dir from all remaining non-img elements
        doc.querySelectorAll('*:not(img)').forEach(el => {
          el.removeAttribute('style')
          el.removeAttribute('class')
          el.removeAttribute('id')
          el.removeAttribute('dir')
        })

        // Normalize <img>: keep only src and alt so TipTap's Image extension can insert it
        doc.querySelectorAll('img').forEach(img => {
          const src = img.getAttribute('src') || ''
          const alt = img.getAttribute('alt') || ''
          while (img.attributes.length > 0) img.removeAttribute(img.attributes[0].name)
          if (src) img.setAttribute('src', src)
          if (alt) img.setAttribute('alt', alt)
        })

        return doc.body.innerHTML
      },
      handlePaste(_view, event) {
        const html = event.clipboardData?.getData('text/html') || ''

        // Google Docs paste: intercept, capture binary image files synchronously, upload async
        if (html.includes('docs-internal-guid')) {
          const items = Array.from(event.clipboardData?.items ?? [])
          const imageFiles: File[] = items
            .filter(i => i.type.startsWith('image/') && i.kind === 'file')
            .map(i => i.getAsFile())
            .filter((f): f is File => f !== null)
          event.preventDefault()
          void googleDocsPasteRef.current(html, imageFiles)
          return true
        }

        // Pure binary paste (screenshot, no HTML)
        if (!html) {
          const items = Array.from(event.clipboardData?.items ?? [])
          const imageItem = items.find(i => i.type.startsWith('image/') && i.kind === 'file')
          if (imageItem) {
            const file = imageItem.getAsFile()
            if (file) {
              void uploadBinaryImageRef.current(file)
              return true
            }
          }
        }

        return false
      },
    },
  })

  // Keep uploadBinaryImageRef.current pointing at the latest editor instance
  useEffect(() => {
    uploadBinaryImageRef.current = async (file: File) => {
      const fd = new FormData()
      fd.append('file', file)
      try {
        const res = await fetch('/api/admin/blogs/media', { method: 'POST', body: fd })
        if (!res.ok) return
        const data = await res.json() as { url: string }
        editor?.chain().focus().setImage({ src: data.url }).run()
      } catch (err) {
        console.error('[BlogEditor] Binary image upload failed:', err)
      }
    }
  }, [editor])

  // Handle Google Docs paste: clean HTML + upload images from binary clipboard files
  useEffect(() => {
    googleDocsPasteRef.current = async (html: string, imageFiles: File[]) => {
      if (!editor) return

      const parser = new DOMParser()
      const doc = parser.parseFromString(html, 'text/html')

      // Unwrap docs-internal-guid outer wrapper
      doc.querySelectorAll('b[id^="docs-internal-guid"]').forEach(wrapper => {
        const frag = doc.createDocumentFragment()
        Array.from(wrapper.childNodes).forEach(n => frag.appendChild(n))
        wrapper.replaceWith(frag)
      })

      doc.querySelectorAll('meta, link, style').forEach(el => el.remove())

      // Convert styled spans to semantic elements (innermost first)
      Array.from(doc.querySelectorAll('span[style]')).reverse().forEach(spanEl => {
        const span = spanEl as HTMLSpanElement
        const cs = span.style
        const bold = cs.fontWeight === 'bold' || Number(cs.fontWeight) >= 600
        const italic = cs.fontStyle === 'italic'
        const underline = cs.textDecoration.includes('underline')
        const strike = cs.textDecoration.includes('line-through')
        const frag = doc.createDocumentFragment()
        Array.from(span.childNodes).forEach(n => frag.appendChild(n))
        if (bold || italic || underline || strike) {
          let node: Node = frag
          if (strike)    { const e = doc.createElement('s');      e.appendChild(node); node = e }
          if (underline) { const e = doc.createElement('u');      e.appendChild(node); node = e }
          if (italic)    { const e = doc.createElement('em');     e.appendChild(node); node = e }
          if (bold)      { const e = doc.createElement('strong'); e.appendChild(node); node = e }
          span.replaceWith(node)
        } else {
          span.replaceWith(frag)
        }
      })

      doc.querySelectorAll('*:not(img)').forEach(el => {
        el.removeAttribute('style')
        el.removeAttribute('class')
        el.removeAttribute('id')
        el.removeAttribute('dir')
      })

      doc.querySelectorAll('img').forEach(img => {
        const src = img.getAttribute('src') || ''
        const alt = img.getAttribute('alt') || ''
        while (img.attributes.length > 0) img.removeAttribute(img.attributes[0].name)
        if (src) img.setAttribute('src', src)
        if (alt) img.setAttribute('alt', alt)
      })

      const allImgs = Array.from(doc.querySelectorAll('img'))
      const uploads: Promise<void>[] = []
      let skippedBlobs = 0

      allImgs.forEach((imgEl, idx) => {
        const src = imgEl.getAttribute('src') || ''

        if (src.startsWith('data:image/')) {
          // data: URLs are accessible from JS — decode and upload directly
          uploads.push((async () => {
            const match = src.match(/^data:([^;]+);base64,(.+)$/)
            if (!match) return
            const mimeType = match[1]
            const binary = atob(match[2])
            const bytes = new Uint8Array(binary.length)
            for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
            const blob = new Blob([bytes], { type: mimeType })
            const ext = mimeType.split('/')[1] || 'png'
            const file = new File([blob], `paste.${ext}`, { type: mimeType })
            const fd = new FormData()
            fd.append('file', file)
            const res = await fetch('/api/admin/blogs/media', { method: 'POST', body: fd })
            if (res.ok) {
              const data = await res.json() as { url: string }
              imgEl.setAttribute('src', data.url)
            }
          })())
        } else if (src.startsWith('blob:')) {
          // blob: URLs are cross-origin from docs.google.com — try binary clipboard file first
          const file = imageFiles[idx]
          if (file) {
            uploads.push((async () => {
              const fd = new FormData()
              fd.append('file', file)
              const res = await fetch('/api/admin/blogs/media', { method: 'POST', body: fd })
              if (res.ok) {
                const data = await res.json() as { url: string }
                imgEl.setAttribute('src', data.url)
              } else {
                imgEl.remove()
                skippedBlobs++
              }
            })())
          } else {
            // No binary file — can't recover this image, remove it
            imgEl.remove()
            skippedBlobs++
          }
        } else if (src.includes('googleusercontent.com') || src.includes('docs.google.com')) {
          // Google CDN URLs — proxy via server
          uploads.push((async () => {
            const res = await fetch('/api/admin/blogs/media/from-url', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ url: src }),
            })
            if (res.ok) {
              const data = await res.json() as { url: string }
              imgEl.setAttribute('src', data.url)
            }
          })())
        }
      })

      await Promise.all(uploads)

      editor.chain().focus().insertContent(doc.body.innerHTML).run()

      if (skippedBlobs > 0) {
        setPasteImageWarning(true)
        setTimeout(() => setPasteImageWarning(false), 8000)
      }
    }
  }, [editor])

  const triggerAutoSave = useCallback(async () => {
    if (!currentId || !editor) return
    await saveDraft()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentId, editor])

  // Keep triggerAutoSaveRef current so the stale onUpdate closure always calls the latest version
  useEffect(() => {
    triggerAutoSaveRef.current = triggerAutoSave
  }, [triggerAutoSave])

  async function saveDraft(overrides: Partial<BlogPost> = {}): Promise<boolean> {
    if (!currentId || !editor) return false
    setSaveStatus('saving')
    try {
      const res = await fetch(`/api/admin/blogs/${currentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          contentHtml: editor.getHTML(),
          status: overrides.status ?? status,
          postType,
          isFeatured,
          author,
          authorTitle,
          authorBio,
          authorAvatarUrl,
          featuredImageUrl,
          seoTitle,
          seoDescription,
          focusKeyword,
          publishedAt: overrides.publishedAt ?? (publishedAt || null),
          tags,
          readingTime,
          ...overrides,
        }),
      })
      if (!res.ok) throw new Error(`Save failed: ${res.status}`)
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus(''), 2500)
      return true
    } catch {
      setSaveStatus('unsaved')
      return false
    }
  }

  async function handlePublish() {
    const now = publishedAt || new Date().toISOString()
    const ok = await saveDraft({ status: 'published', publishedAt: now })
    if (!ok) return
    setStatus('published')
    await fetch('/api/admin/blogs/revalidate', { method: 'POST' })
  }

  async function handleUnpublish() {
    const ok = await saveDraft({ status: 'draft' })
    if (!ok) return
    setStatus('draft')
  }

  // Load or create post on mount
  useEffect(() => {
    async function init() {
      if (postId) {
        const res = await fetch(`/api/admin/blogs/${postId}`)
        if (!res.ok) { setLoading(false); return }
        const data: BlogPost = await res.json()
        setPost(data)
        populatePost(data)
      } else {
        const res = await fetch('/api/admin/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: 'Untitled', status: 'draft' }),
        })
        if (!res.ok) { setLoading(false); return }
        const data: BlogPost = await res.json()
        setCurrentId(data.id)
        setPost(data)
        populatePost(data)
      }
      setLoading(false)
    }
    init()
    // Load author suggestions
    fetch('/api/admin/blogs/authors')
      .then((r) => r.json())
      .then((d) => setAuthorSuggestions(Array.isArray(d) ? d : []))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId])

  function populatePost(data: BlogPost) {
    setTitle(data.title === 'Untitled' ? '' : data.title)
    setSlug(data.slug)
    if (data.slug) setSlugManual(true) // prevent auto-slug from overwriting saved slug
    setExcerpt(data.excerpt)
    setStatus(data.status === 'published' ? 'published' : 'draft')
    setPostType(data.postType)
    setIsFeatured(data.isFeatured)
    setPublishedAt(data.publishedAt ? data.publishedAt.slice(0, 16) : '')
    setAuthor(data.author)
    setAuthorTitle(data.authorTitle)
    setAuthorBio(data.authorBio)
    setAuthorAvatarUrl(data.authorAvatarUrl)
    setFeaturedImageUrl(data.featuredImageUrl)
    setSeoTitle(data.seoTitle)
    setSeoDescription(data.seoDescription)
    setFocusKeyword(data.focusKeyword)
    setTags(data.tags)
    setReadingTime(data.readingTime)
    setWordCount(countWords(data.contentHtml))
  }

  // Set editor content after editor + post are ready
  useEffect(() => {
    if (editor && post?.contentHtml) {
      editor.commands.setContent(post.contentHtml)
    }
  }, [editor, post])

  // Auto-slug from title
  useEffect(() => {
    if (!slugManual && title) {
      setSlug(slugify(title))
    }
  }, [title, slugManual])

  function addTag() {
    const t = tagInput.trim()
    if (t && !tags.find((x) => x.tag === t)) {
      setTags((prev) => [...prev, { tag: t }])
    }
    setTagInput('')
  }

  function removeTag(tag: string) {
    setTags((prev) => prev.filter((x) => x.tag !== tag))
  }

  function setLink() {
    const url = window.prompt('Enter URL')
    if (!url) return
    if (editor?.state.selection.empty) {
      editor.chain().focus().setLink({ href: url }).run()
    } else {
      editor?.chain().focus().setLink({ href: url }).run()
    }
  }

  function insertImage(url: string) {
    editor?.chain().focus().setImage({ src: url }).run()
  }

  // AI write
  async function handleAiWrite() {
    if (!aiTopic.trim()) return
    setAiWriteLoading(true)
    setAiWriteError('')
    try {
      const res = await fetch('/api/admin/blogs/ai/write', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: aiTopic, tone: aiTone, length: aiLength }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setTitle(data.title || '')
      setSlug(data.slug || slugify(data.title || ''))
      setExcerpt(data.excerpt || '')
      setSeoTitle(data.metaTitle || '')
      setSeoDescription(data.metaDescription || '')
      if (data.tags) setTags(data.tags.map((t: string) => ({ tag: t })))
      editor?.commands.setContent(data.content || '')
      setShowAiPanel(false)
    } catch (e) {
      setAiWriteError(e instanceof Error ? e.message : 'Failed')
    } finally {
      setAiWriteLoading(false)
    }
  }

  // AI improve
  async function handleAiImprove() {
    if (!editor) return
    setAiImproveLoading(true)
    setAiImproveError('')
    try {
      const res = await fetch('/api/admin/blogs/ai/improve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: editor.getHTML(), instruction: aiInstruction }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      editor.commands.setContent(data.result || '')
      setShowAiPanel(false)
    } catch (e) {
      setAiImproveError(e instanceof Error ? e.message : 'Failed')
    } finally {
      setAiImproveLoading(false)
    }
  }

  // AI SEO
  async function handleAiSeo() {
    if (!editor) return
    setSeoLoading(true)
    setSeoError('')
    try {
      const res = await fetch('/api/admin/blogs/ai/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content: editor.getHTML(),
          metaTitle: seoTitle,
          metaDescription: seoDescription,
          focusKeyword,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setSeoResult(data)
    } catch (e) {
      setSeoError(e instanceof Error ? e.message : 'Failed')
    } finally {
      setSeoLoading(false)
    }
  }

  // AI import doc
  async function handleDocImport() {
    if (!docFile) return
    setDocLoading(true)
    setDocError('')
    try {
      const fd = new FormData()
      fd.append('file', docFile)
      const res = await fetch('/api/admin/blogs/ai/import-doc', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setTitle(data.title || '')
      setSlug(data.slug || slugify(data.title || ''))
      setExcerpt(data.excerpt || '')
      setSeoTitle(data.metaTitle || '')
      setSeoDescription(data.metaDescription || '')
      setFocusKeyword(data.focusKeyword || '')
      if (data.tags) setTags(data.tags.map((t: string) => ({ tag: t })))
      editor?.commands.setContent(data.contentHtml || '')
      setDocFile(null)
      setShowAiPanel(false)
    } catch (e) {
      setDocError(e instanceof Error ? e.message : 'Failed')
    } finally {
      setDocLoading(false)
    }
  }

  // AI import Google Doc URL
  async function handleGdocImport() {
    if (!gdocUrl.trim()) return
    setGdocLoading(true)
    setGdocError('')
    try {
      const res = await fetch('/api/admin/blogs/ai/import-gdoc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: gdocUrl.trim() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setTitle(data.title || '')
      setSlug(data.slug || slugify(data.title || ''))
      setExcerpt(data.excerpt || '')
      setSeoTitle(data.metaTitle || '')
      setSeoDescription(data.metaDescription || '')
      setFocusKeyword(data.focusKeyword || '')
      if (data.tags) setTags(data.tags.map((t: string) => ({ tag: t })))
      editor?.commands.setContent(data.contentHtml || '')
      setGdocUrl('')
      setShowAiPanel(false)
    } catch (e) {
      setGdocError(e instanceof Error ? e.message : 'Failed')
    } finally {
      setGdocLoading(false)
    }
  }

  const isInTable = editor?.isActive('table') ?? false

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-sm text-[#888] [font-family:var(--font-inter)]">
        Loading…
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-0px)] bg-[#F7F7F7]">
      {/* Top bar */}
      <div className="bg-white border-b border-[#F0F0F0] px-4 h-12 flex items-center gap-3 flex-shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-[#888] hover:text-black transition-colors [font-family:var(--font-inter)]"
        >
          <ArrowLeft className="w-4 h-4" />
          All Posts
        </button>
        <div className="w-px h-4 bg-[#E5E5E5]" />
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title…"
          className="flex-1 text-sm font-medium text-black [font-family:var(--font-sora)] bg-transparent focus:outline-none placeholder:text-[#BBB] min-w-0"
        />
        <div className="flex items-center gap-2 ml-auto flex-shrink-0">
          {saveStatus === 'saving' && (
            <span className="text-xs text-[#AAA] [font-family:var(--font-inter)]">Saving…</span>
          )}
          {saveStatus === 'saved' && (
            <span className="text-xs text-green-500 [font-family:var(--font-inter)]">Saved</span>
          )}
          {saveStatus === 'unsaved' && (
            <span className="text-xs text-orange-400 [font-family:var(--font-inter)]">Unsaved</span>
          )}
          <span className="text-xs text-[#AAA] [font-family:var(--font-inter)]">
            {wordCount} words · {readingTime} min
          </span>
          <button
            onClick={() => setShowAiPanel((p) => !p)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors [font-family:var(--font-inter)] ${
              showAiPanel
                ? 'bg-[#1C2BFF] text-white'
                : 'bg-[#F0F0F0] text-[#555] hover:bg-[#E5E5E5]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI
          </button>
          <button
            onClick={() => saveDraft()}
            className="px-3 py-1.5 rounded-lg bg-[#F0F0F0] text-[#333] text-xs font-medium hover:bg-[#E5E5E5] transition-colors [font-family:var(--font-inter)]"
          >
            Save Draft
          </button>
          {status === 'published' ? (
            <button
              onClick={handleUnpublish}
              className="px-3 py-1.5 rounded-lg bg-orange-500 text-white text-xs font-medium hover:bg-orange-600 transition-colors [font-family:var(--font-inter)]"
            >
              Unpublish
            </button>
          ) : (
            <button
              onClick={handlePublish}
              className="px-3 py-1.5 rounded-lg bg-[#1C2BFF] text-white text-xs font-medium hover:bg-[#141FB5] transition-colors [font-family:var(--font-inter)]"
            >
              Publish
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Editor area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Toolbar */}
          <div className="bg-white border-b border-[#F0F0F0] px-3 py-1.5 flex items-center gap-0.5 flex-wrap flex-shrink-0">
            <ToolbarBtn
              onClick={() => editor?.chain().focus().undo().run()}
              disabled={!editor?.can().undo()}
              title="Undo"
            >
              <Undo className="w-4 h-4" />
            </ToolbarBtn>
            <ToolbarBtn
              onClick={() => editor?.chain().focus().redo().run()}
              disabled={!editor?.can().redo()}
              title="Redo"
            >
              <Redo className="w-4 h-4" />
            </ToolbarBtn>

            <div className="w-px h-5 bg-[#E5E5E5] mx-1" />

            {/* Heading dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-2 py-1.5 rounded-md text-sm text-[#555] hover:bg-[#F0F0F0] transition-colors [font-family:var(--font-inter)]">
                {editor?.isActive('heading', { level: 1 })
                  ? 'H1'
                  : editor?.isActive('heading', { level: 2 })
                  ? 'H2'
                  : editor?.isActive('heading', { level: 3 })
                  ? 'H3'
                  : 'P'}
                <ChevronDown className="w-3 h-3" />
              </button>
              <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-[#E5E5E5] py-1 w-32 z-10 hidden group-hover:block">
                {[
                  { label: 'Paragraph', action: () => editor?.chain().focus().setParagraph().run() },
                  { label: 'Heading 1', action: () => editor?.chain().focus().toggleHeading({ level: 1 }).run() },
                  { label: 'Heading 2', action: () => editor?.chain().focus().toggleHeading({ level: 2 }).run() },
                  { label: 'Heading 3', action: () => editor?.chain().focus().toggleHeading({ level: 3 }).run() },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={item.action}
                    className="w-full text-left px-3 py-1.5 text-sm text-[#333] hover:bg-[#F5F5F5] [font-family:var(--font-inter)]"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-px h-5 bg-[#E5E5E5] mx-1" />

            <ToolbarBtn
              active={editor?.isActive('bold')}
              onClick={() => editor?.chain().focus().toggleBold().run()}
              title="Bold"
            >
              <Bold className="w-4 h-4" />
            </ToolbarBtn>
            <ToolbarBtn
              active={editor?.isActive('italic')}
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              title="Italic"
            >
              <Italic className="w-4 h-4" />
            </ToolbarBtn>
            <ToolbarBtn
              active={editor?.isActive('underline')}
              onClick={() => editor?.chain().focus().toggleUnderline().run()}
              title="Underline"
            >
              <UnderlineIcon className="w-4 h-4" />
            </ToolbarBtn>
            <ToolbarBtn
              active={editor?.isActive('strike')}
              onClick={() => editor?.chain().focus().toggleStrike().run()}
              title="Strikethrough"
            >
              <Strikethrough className="w-4 h-4" />
            </ToolbarBtn>
            <ToolbarBtn
              active={editor?.isActive('highlight')}
              onClick={() => editor?.chain().focus().toggleHighlight().run()}
              title="Highlight"
            >
              <Highlighter className="w-4 h-4" />
            </ToolbarBtn>

            <div className="w-px h-5 bg-[#E5E5E5] mx-1" />

            <ToolbarBtn
              active={editor?.isActive({ textAlign: 'left' })}
              onClick={() => editor?.chain().focus().setTextAlign('left').run()}
              title="Align left"
            >
              <AlignLeft className="w-4 h-4" />
            </ToolbarBtn>
            <ToolbarBtn
              active={editor?.isActive({ textAlign: 'center' })}
              onClick={() => editor?.chain().focus().setTextAlign('center').run()}
              title="Align center"
            >
              <AlignCenter className="w-4 h-4" />
            </ToolbarBtn>
            <ToolbarBtn
              active={editor?.isActive({ textAlign: 'right' })}
              onClick={() => editor?.chain().focus().setTextAlign('right').run()}
              title="Align right"
            >
              <AlignRight className="w-4 h-4" />
            </ToolbarBtn>

            <div className="w-px h-5 bg-[#E5E5E5] mx-1" />

            <ToolbarBtn
              active={editor?.isActive('bulletList')}
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
              title="Bullet list"
            >
              <List className="w-4 h-4" />
            </ToolbarBtn>
            <ToolbarBtn
              active={editor?.isActive('orderedList')}
              onClick={() => editor?.chain().focus().toggleOrderedList().run()}
              title="Ordered list"
            >
              <ListOrdered className="w-4 h-4" />
            </ToolbarBtn>
            <ToolbarBtn
              active={editor?.isActive('blockquote')}
              onClick={() => editor?.chain().focus().toggleBlockquote().run()}
              title="Blockquote"
            >
              <Quote className="w-4 h-4" />
            </ToolbarBtn>
            <ToolbarBtn
              active={editor?.isActive('codeBlock')}
              onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
              title="Code block"
            >
              <Code className="w-4 h-4" />
            </ToolbarBtn>

            <div className="w-px h-5 bg-[#E5E5E5] mx-1" />

            <ToolbarBtn
              active={editor?.isActive('link')}
              onClick={setLink}
              title="Link"
            >
              <LinkIcon className="w-4 h-4" />
            </ToolbarBtn>
            <ToolbarBtn
              onClick={() => setMediaTarget('editor')}
              title="Insert image"
            >
              <ImageIcon className="w-4 h-4" />
            </ToolbarBtn>

            <div className="w-px h-5 bg-[#E5E5E5] mx-1" />

            <ToolbarBtn
              onClick={() =>
                editor
                  ?.chain()
                  .focus()
                  .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                  .run()
              }
              title="Insert table"
            >
              <TableIcon className="w-4 h-4" />
            </ToolbarBtn>

            {isInTable && (
              <>
                <ToolbarBtn
                  onClick={() => editor?.chain().focus().addColumnAfter().run()}
                  title="Add column"
                >
                  <Plus className="w-4 h-4" />
                </ToolbarBtn>
                <ToolbarBtn
                  onClick={() => editor?.chain().focus().addRowAfter().run()}
                  title="Add row"
                >
                  <Minus className="w-4 h-4" />
                </ToolbarBtn>
                <ToolbarBtn
                  onClick={() => editor?.chain().focus().deleteTable().run()}
                  title="Delete table"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </ToolbarBtn>
              </>
            )}
          </div>

          {/* Paste image warning */}
          {pasteImageWarning && (
            <div className="mx-4 mt-3 px-4 py-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800 [font-family:var(--font-inter)] flex items-start gap-2">
              <span className="mt-0.5">⚠️</span>
              <span>
                <strong>Images skipped:</strong> Google Docs images can&apos;t be pasted directly (browser security restriction).
                Use <strong>AI → Import → Import from Google Doc</strong> with the doc&apos;s shareable link to include images.
              </span>
              <button onClick={() => setPasteImageWarning(false)} className="ml-auto text-amber-500 hover:text-amber-800 shrink-0">✕</button>
            </div>
          )}

          {/* Editor content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-3xl mx-auto">
              <EditorContent editor={editor} className="tiptap-editor" />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-72 bg-white border-l border-[#F0F0F0] flex-shrink-0 overflow-y-auto">
          {/* Publish box */}
          <div className="p-4 border-b border-[#F0F0F0]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-[#999] uppercase tracking-wider [font-family:var(--font-sora)]">
                Publish
              </span>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full [font-family:var(--font-inter)] ${
                  status === 'published'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {status === 'published' ? 'Published' : 'Draft'}
              </span>
            </div>

            <div className="space-y-2">
              <select
                value={postType}
                onChange={(e) => setPostType(e.target.value as typeof postType)}
                className="w-full h-8 rounded-lg border border-[#E5E5E5] px-2 text-xs text-[#333] [font-family:var(--font-inter)] focus:outline-none focus:border-[#1C2BFF] bg-white"
              >
                <option value="blog">Blog Post</option>
                <option value="glossary">Glossary</option>
                <option value="tutorial">Tutorial</option>
              </select>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded"
                />
                <span className="text-xs text-[#555] [font-family:var(--font-inter)]">
                  Featured post
                </span>
              </label>

              {status === 'published' && post?.slug && (
                <a
                  href={`/blogs/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-[#1C2BFF] hover:underline [font-family:var(--font-inter)]"
                >
                  <ExternalLink className="w-3 h-3" />
                  View post
                </a>
              )}
            </div>
          </div>

          {/* Featured image */}
          <div className="p-4 border-b border-[#F0F0F0]">
            <p className="text-xs font-semibold text-[#999] uppercase tracking-wider [font-family:var(--font-sora)] mb-3">
              Featured Image
            </p>
            {featuredImageUrl ? (
              <div className="space-y-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featuredImageUrl}
                  alt="Featured"
                  className="w-full aspect-video object-cover rounded-lg border border-[#E5E5E5]"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setMediaTarget('featured')}
                    className="flex-1 h-7 rounded-lg border border-[#E5E5E5] text-xs text-[#555] hover:border-[#1C2BFF] hover:text-[#1C2BFF] transition-colors [font-family:var(--font-inter)]"
                  >
                    Change
                  </button>
                  <button
                    onClick={() => setFeaturedImageUrl('')}
                    className="h-7 px-2 rounded-lg border border-[#E5E5E5] text-xs text-red-400 hover:border-red-300 hover:bg-red-50 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setMediaTarget('featured')}
                className="w-full h-20 rounded-lg border-2 border-dashed border-[#E5E5E5] hover:border-[#1C2BFF] hover:bg-[#F8F8FF] transition-colors flex flex-col items-center justify-center gap-1"
              >
                <ImageIcon className="w-5 h-5 text-[#BBB]" />
                <span className="text-xs text-[#AAA] [font-family:var(--font-inter)]">
                  Choose image
                </span>
              </button>
            )}
          </div>

          {/* Excerpt */}
          <div className="p-4 border-b border-[#F0F0F0]">
            <p className="text-xs font-semibold text-[#999] uppercase tracking-wider [font-family:var(--font-sora)] mb-2">
              Excerpt
            </p>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              placeholder="Brief summary of the post…"
              className="w-full rounded-lg border border-[#E5E5E5] p-2 text-xs text-[#333] [font-family:var(--font-inter)] focus:outline-none focus:border-[#1C2BFF] resize-none"
            />
          </div>

          {/* SEO */}
          <Collapsible label="SEO">
            <div className="space-y-2">
              <div>
                <label className="text-[10px] text-[#AAA] [font-family:var(--font-inter)] block mb-1">
                  Slug
                </label>
                <input
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value)
                    setSlugManual(true)
                  }}
                  className="w-full h-8 px-2 rounded-lg border border-[#E5E5E5] text-xs [font-family:var(--font-inter)] focus:outline-none focus:border-[#1C2BFF]"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#AAA] [font-family:var(--font-inter)] block mb-1">
                  Focus Keyword
                </label>
                <input
                  value={focusKeyword}
                  onChange={(e) => setFocusKeyword(e.target.value)}
                  className="w-full h-8 px-2 rounded-lg border border-[#E5E5E5] text-xs [font-family:var(--font-inter)] focus:outline-none focus:border-[#1C2BFF]"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#AAA] [font-family:var(--font-inter)] flex justify-between mb-1">
                  Meta Title
                  <span className={seoTitle.length > 60 ? 'text-red-400' : ''}>
                    {seoTitle.length}/60
                  </span>
                </label>
                <input
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  className="w-full h-8 px-2 rounded-lg border border-[#E5E5E5] text-xs [font-family:var(--font-inter)] focus:outline-none focus:border-[#1C2BFF]"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#AAA] [font-family:var(--font-inter)] flex justify-between mb-1">
                  Meta Description
                  <span className={seoDescription.length > 160 ? 'text-red-400' : ''}>
                    {seoDescription.length}/160
                  </span>
                </label>
                <textarea
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  rows={3}
                  className="w-full rounded-lg border border-[#E5E5E5] p-2 text-xs [font-family:var(--font-inter)] focus:outline-none focus:border-[#1C2BFF] resize-none"
                />
              </div>
            </div>
          </Collapsible>

          {/* Author */}
          <Collapsible label="Author">
            <div className="space-y-2">
              <div className="relative">
                <label className="text-[10px] text-[#AAA] [font-family:var(--font-inter)] block mb-1">
                  Name
                </label>
                <input
                  value={author}
                  onChange={(e) => {
                    setAuthor(e.target.value)
                    setShowAuthorSugg(true)
                  }}
                  onBlur={() => setTimeout(() => setShowAuthorSugg(false), 200)}
                  className="w-full h-8 px-2 rounded-lg border border-[#E5E5E5] text-xs [font-family:var(--font-inter)] focus:outline-none focus:border-[#1C2BFF]"
                />
                {showAuthorSugg &&
                  authorSuggestions.filter((a) =>
                    a.name.toLowerCase().includes(author.toLowerCase())
                  ).length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-[#E5E5E5] rounded-lg shadow-lg mt-1 z-10 max-h-32 overflow-y-auto">
                      {authorSuggestions
                        .filter((a) => a.name.toLowerCase().includes(author.toLowerCase()))
                        .map((a) => (
                          <button
                            key={a.id}
                            onClick={() => {
                              setAuthor(a.name)
                              setAuthorTitle(a.title)
                              setAuthorBio(a.bio)
                              setAuthorAvatarUrl(a.avatarUrl)
                              setShowAuthorSugg(false)
                            }}
                            className="w-full text-left px-3 py-1.5 text-xs text-[#333] hover:bg-[#F5F5F5] [font-family:var(--font-inter)]"
                          >
                            {a.name}
                          </button>
                        ))}
                    </div>
                  )}
              </div>
              <div>
                <label className="text-[10px] text-[#AAA] [font-family:var(--font-inter)] block mb-1">
                  Title / Role
                </label>
                <input
                  value={authorTitle}
                  onChange={(e) => setAuthorTitle(e.target.value)}
                  className="w-full h-8 px-2 rounded-lg border border-[#E5E5E5] text-xs [font-family:var(--font-inter)] focus:outline-none focus:border-[#1C2BFF]"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#AAA] [font-family:var(--font-inter)] block mb-1">
                  Avatar URL
                </label>
                <input
                  value={authorAvatarUrl}
                  onChange={(e) => setAuthorAvatarUrl(e.target.value)}
                  className="w-full h-8 px-2 rounded-lg border border-[#E5E5E5] text-xs [font-family:var(--font-inter)] focus:outline-none focus:border-[#1C2BFF]"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#AAA] [font-family:var(--font-inter)] block mb-1">
                  Bio
                </label>
                <textarea
                  value={authorBio}
                  onChange={(e) => setAuthorBio(e.target.value)}
                  rows={2}
                  className="w-full rounded-lg border border-[#E5E5E5] p-2 text-xs [font-family:var(--font-inter)] focus:outline-none focus:border-[#1C2BFF] resize-none"
                />
              </div>
            </div>
          </Collapsible>

          {/* Tags */}
          <Collapsible label="Tags">
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1.5">
                {tags.map((t) => (
                  <span
                    key={t.tag}
                    className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#1C2BFF]/10 text-[#1C2BFF] text-[11px] [font-family:var(--font-inter)]"
                  >
                    {t.tag}
                    <button
                      onClick={() => removeTag(t.tag)}
                      className="hover:text-red-500 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-1">
                <input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="Add tag…"
                  className="flex-1 h-7 px-2 rounded-lg border border-[#E5E5E5] text-xs [font-family:var(--font-inter)] focus:outline-none focus:border-[#1C2BFF]"
                />
                <button
                  onClick={addTag}
                  className="h-7 px-3 rounded-lg bg-[#F0F0F0] text-xs text-[#555] hover:bg-[#E5E5E5] transition-colors [font-family:var(--font-inter)]"
                >
                  Add
                </button>
              </div>
            </div>
          </Collapsible>
        </div>

        {/* AI Panel overlay */}
        {showAiPanel && (
          <div className="w-80 bg-white border-l border-[#F0F0F0] flex flex-col flex-shrink-0 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#F0F0F0]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#1C2BFF]" />
                <span className="text-sm font-semibold text-black [font-family:var(--font-sora)]">
                  AI Assistant
                </span>
              </div>
              <button
                onClick={() => setShowAiPanel(false)}
                className="text-[#888] hover:text-black transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-[#F0F0F0]">
              {([
                { id: 'write', icon: Wand2, label: 'Write' },
                { id: 'import', icon: FileText, label: 'Import' },
                { id: 'improve', icon: Sparkles, label: 'Improve' },
                { id: 'seo', icon: BarChart2, label: 'SEO' },
              ] as const).map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => setAiTab(id)}
                  className={`flex-1 flex flex-col items-center py-2 text-[10px] font-medium transition-colors [font-family:var(--font-inter)] border-b-2 ${
                    aiTab === id
                      ? 'border-[#1C2BFF] text-[#1C2BFF]'
                      : 'border-transparent text-[#888] hover:text-black'
                  }`}
                >
                  <Icon className="w-4 h-4 mb-0.5" />
                  {label}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {aiTab === 'write' && (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-[#888] [font-family:var(--font-inter)] block mb-1">
                      Topic
                    </label>
                    <input
                      value={aiTopic}
                      onChange={(e) => setAiTopic(e.target.value)}
                      placeholder="e.g. Supply chain efficiency tips"
                      className="w-full h-9 px-3 rounded-lg border border-[#E5E5E5] text-sm [font-family:var(--font-inter)] focus:outline-none focus:border-[#1C2BFF]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#888] [font-family:var(--font-inter)] block mb-1">
                      Tone
                    </label>
                    <select
                      value={aiTone}
                      onChange={(e) => setAiTone(e.target.value)}
                      className="w-full h-9 px-3 rounded-lg border border-[#E5E5E5] text-sm [font-family:var(--font-inter)] focus:outline-none focus:border-[#1C2BFF] bg-white"
                    >
                      <option>Professional</option>
                      <option>Conversational</option>
                      <option>Technical</option>
                      <option>Persuasive</option>
                      <option>Educational</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-[#888] [font-family:var(--font-inter)] block mb-1">
                      Length
                    </label>
                    <select
                      value={aiLength}
                      onChange={(e) => setAiLength(e.target.value)}
                      className="w-full h-9 px-3 rounded-lg border border-[#E5E5E5] text-sm [font-family:var(--font-inter)] focus:outline-none focus:border-[#1C2BFF] bg-white"
                    >
                      <option>Short</option>
                      <option>Medium</option>
                      <option>Long</option>
                    </select>
                  </div>
                  {aiWriteError && (
                    <p className="text-xs text-red-500 [font-family:var(--font-inter)]">
                      {aiWriteError}
                    </p>
                  )}
                  <button
                    onClick={handleAiWrite}
                    disabled={aiWriteLoading || !aiTopic.trim()}
                    className="w-full h-9 rounded-lg bg-[#1C2BFF] text-white text-sm font-medium disabled:opacity-50 hover:bg-[#141FB5] transition-colors [font-family:var(--font-inter)]"
                  >
                    {aiWriteLoading ? 'Generating…' : 'Generate Post'}
                  </button>
                </div>
              )}

              {aiTab === 'import' && (
                <div className="space-y-3">
                  <p className="text-xs text-[#888] [font-family:var(--font-inter)]">
                    Import a .docx file to extract title, content, and metadata automatically.
                  </p>
                  <div
                    onClick={() => docRef.current?.click()}
                    className="border-2 border-dashed border-[#E5E5E5] rounded-xl h-24 flex flex-col items-center justify-center cursor-pointer hover:border-[#1C2BFF] hover:bg-[#F8F8FF] transition-colors"
                  >
                    <Upload className="w-6 h-6 text-[#BBB] mb-1" />
                    <span className="text-xs text-[#888] [font-family:var(--font-inter)]">
                      {docFile ? docFile.name : 'Click to select .docx file'}
                    </span>
                    <input
                      ref={docRef}
                      type="file"
                      accept=".docx"
                      className="hidden"
                      onChange={(e) => setDocFile(e.target.files?.[0] || null)}
                    />
                  </div>
                  {docError && (
                    <p className="text-xs text-red-500 [font-family:var(--font-inter)]">{docError}</p>
                  )}
                  <button
                    onClick={handleDocImport}
                    disabled={docLoading || !docFile}
                    className="w-full h-9 rounded-lg bg-[#1C2BFF] text-white text-sm font-medium disabled:opacity-50 hover:bg-[#141FB5] transition-colors [font-family:var(--font-inter)]"
                  >
                    {docLoading ? 'Importing…' : 'Import Document'}
                  </button>

                  <div className="border-t border-[#F0F0F0] pt-3">
                    <p className="text-xs text-[#888] [font-family:var(--font-inter)] mb-2">
                      Or import from a public Google Doc URL
                    </p>
                    <input
                      value={gdocUrl}
                      onChange={(e) => setGdocUrl(e.target.value)}
                      placeholder="https://docs.google.com/document/d/…"
                      className="w-full h-9 px-3 rounded-lg border border-[#E5E5E5] text-sm [font-family:var(--font-inter)] focus:outline-none focus:border-[#1C2BFF] mb-2"
                    />
                    {gdocError && (
                      <p className="text-xs text-red-500 [font-family:var(--font-inter)] mb-2">{gdocError}</p>
                    )}
                    <button
                      onClick={handleGdocImport}
                      disabled={gdocLoading || !gdocUrl.trim()}
                      className="w-full h-9 rounded-lg bg-[#FF6B00] text-white text-sm font-medium disabled:opacity-50 hover:bg-[#E05E00] transition-colors [font-family:var(--font-inter)]"
                    >
                      {gdocLoading ? 'Importing…' : 'Import from Google Doc'}
                    </button>
                  </div>
                </div>
              )}

              {aiTab === 'improve' && (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-[#888] [font-family:var(--font-inter)] block mb-1">
                      Instruction
                    </label>
                    <textarea
                      value={aiInstruction}
                      onChange={(e) => setAiInstruction(e.target.value)}
                      rows={4}
                      placeholder="e.g. Make this more concise and add subheadings"
                      className="w-full rounded-lg border border-[#E5E5E5] p-2 text-sm [font-family:var(--font-inter)] focus:outline-none focus:border-[#1C2BFF] resize-none"
                    />
                  </div>
                  {aiImproveError && (
                    <p className="text-xs text-red-500 [font-family:var(--font-inter)]">
                      {aiImproveError}
                    </p>
                  )}
                  <button
                    onClick={handleAiImprove}
                    disabled={aiImproveLoading || !aiInstruction.trim()}
                    className="w-full h-9 rounded-lg bg-[#1C2BFF] text-white text-sm font-medium disabled:opacity-50 hover:bg-[#141FB5] transition-colors [font-family:var(--font-inter)]"
                  >
                    {aiImproveLoading ? 'Improving…' : 'Improve Content'}
                  </button>
                </div>
              )}

              {aiTab === 'seo' && (
                <div className="space-y-3">
                  <p className="text-xs text-[#888] [font-family:var(--font-inter)]">
                    Analyzes your title, content, meta fields, and focus keyword.
                  </p>
                  {seoError && (
                    <p className="text-xs text-red-500 [font-family:var(--font-inter)]">{seoError}</p>
                  )}
                  <button
                    onClick={handleAiSeo}
                    disabled={seoLoading}
                    className="w-full h-9 rounded-lg bg-[#1C2BFF] text-white text-sm font-medium disabled:opacity-50 hover:bg-[#141FB5] transition-colors [font-family:var(--font-inter)]"
                  >
                    {seoLoading ? 'Analyzing…' : 'Analyze SEO'}
                  </button>

                  {seoResult && (
                    <div className="space-y-4 mt-2">
                      <div className="flex justify-around">
                        <ScoreCircle score={seoResult.seoScore} label="SEO Score" />
                        <ScoreCircle
                          score={seoResult.readabilityScore}
                          label="Readability"
                        />
                      </div>
                      <div className="text-center">
                        <span className="text-xs text-[#888] [font-family:var(--font-inter)]">
                          Keyword density:{' '}
                          <strong className="text-[#333]">{seoResult.keywordDensity}</strong>
                        </span>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-[#333] [font-family:var(--font-inter)] mb-2">
                          Suggestions
                        </p>
                        <ul className="space-y-1.5">
                          {seoResult.suggestions.map((s, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-xs text-[#555] [font-family:var(--font-inter)]"
                            >
                              <span className="text-[#1C2BFF] flex-shrink-0 mt-0.5">•</span>
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Media picker */}
      <MediaPicker
        open={mediaTarget !== null}
        onClose={() => setMediaTarget(null)}
        onSelect={(url) => {
          if (mediaTarget === 'featured') setFeaturedImageUrl(url)
          else if (mediaTarget === 'editor') insertImage(url)
          setMediaTarget(null)
        }}
      />
    </div>
  )
}
