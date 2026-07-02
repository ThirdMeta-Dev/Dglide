'use client'

import { useEffect, useState } from 'react'
import {
  Plus,
  Search,
  ChevronUp,
  ChevronDown,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  RotateCcw,
  X,
  Check,
} from 'lucide-react'
import type { BlogPost, BlogPostType, BlogStatus } from '@/lib/blog-db'
// blog-db is server-only — only type imports allowed here
import BlogEditor from './BlogEditor'

type Mode = 'list' | 'editor'

type Counts = {
  all: number
  published: number
  draft: number
  trashed: number
}

type QuickEdit = {
  title: string
  slug: string
  author: string
  postType: BlogPostType
  status: BlogStatus
  publishedAt: string
  isFeatured: boolean
  tagInput: string
  tags: string[]
}

function statusBadge(status: BlogStatus) {
  const map: Record<BlogStatus, string> = {
    published: 'bg-green-100 text-green-700',
    draft: 'bg-yellow-100 text-yellow-700',
    trashed: 'bg-red-100 text-red-500',
  }
  return (
    <span
      className={`text-[10px] font-medium px-2 py-0.5 rounded-full [font-family:var(--font-inter)] ${map[status]}`}
    >
      {status}
    </span>
  )
}

function SortBtn({
  col,
  current,
  dir,
}: {
  col: string
  current: string
  dir: 'asc' | 'desc'
}) {
  const active = current === col
  return (
    <span className="flex items-center gap-0.5">
      {active ? (
        dir === 'asc' ? (
          <ChevronUp className="w-3 h-3 text-[#1C2BFF]" />
        ) : (
          <ChevronDown className="w-3 h-3 text-[#1C2BFF]" />
        )
      ) : (
        <ChevronDown className="w-3 h-3 text-[#CCC] group-hover:text-[#888]" />
      )}
    </span>
  )
}

export default function BlogAdmin() {
  const [mode, setMode] = useState<Mode>('list')
  const [editingId, setEditingId] = useState<string | null>(null)

  if (mode === 'editor') {
    return (
      <div className="-m-8">
        <BlogEditor
          postId={editingId}
          onBack={() => {
            setMode('list')
            setEditingId(null)
          }}
        />
      </div>
    )
  }

  return (
    <BlogList
      onEdit={(id) => {
        setEditingId(id)
        setMode('editor')
      }}
      onCreate={() => {
        setEditingId(null)
        setMode('editor')
      }}
    />
  )
}

function BlogList({
  onEdit,
  onCreate,
}: {
  onEdit: (id: string) => void
  onCreate: () => void
}) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | BlogStatus>('all')
  const [postTypeFilter, setPostTypeFilter] = useState('')
  const [sortField, setSortField] = useState('publishedAt')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [counts, setCounts] = useState<Counts>({ all: 0, published: 0, draft: 0, trashed: 0 })
  const [loading, setLoading] = useState(false)
  const [quickEditId, setQuickEditId] = useState<string | null>(null)
  const [quickEdit, setQuickEdit] = useState<QuickEdit | null>(null)
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [creatingNew, setCreatingNew] = useState(false)

  function buildUrl(overrides: Record<string, string | number> = {}) {
    const params = new URLSearchParams({
      page: String(page),
      search,
      sortField,
      sortDir,
      limit: '20',
      ...(statusFilter !== 'all' ? { status: statusFilter } : {}),
      ...(postTypeFilter ? { postType: postTypeFilter } : {}),
      ...Object.fromEntries(Object.entries(overrides).map(([k, v]) => [k, String(v)])),
    })
    return `/api/admin/blogs?${params}`
  }

  async function fetchPosts() {
    setLoading(true)
    try {
      const res = await fetch(buildUrl())
      const data = await res.json()
      setPosts(data.docs || [])
      setTotalPages(data.totalPages || 1)
    } finally {
      setLoading(false)
    }
  }

  async function fetchCounts() {
    const [all, published, draft, trashed] = await Promise.all([
      fetch('/api/admin/blogs?count=true').then((r) => r.json()),
      fetch('/api/admin/blogs?count=true&status=published').then((r) => r.json()),
      fetch('/api/admin/blogs?count=true&status=draft').then((r) => r.json()),
      fetch('/api/admin/blogs?count=true&status=trashed').then((r) => r.json()),
    ])
    setCounts({
      all: all.totalDocs ?? 0,
      published: published.totalDocs ?? 0,
      draft: draft.totalDocs ?? 0,
      trashed: trashed.totalDocs ?? 0,
    })
  }

  useEffect(() => {
    fetchPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search, statusFilter, postTypeFilter, sortField, sortDir])

  useEffect(() => {
    fetchCounts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function toggleSort(col: string) {
    if (sortField === col) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(col)
      setSortDir('desc')
    }
    setPage(1)
  }

  async function handleNewPost() {
    setCreatingNew(true)
    onCreate()
    setCreatingNew(false)
  }

  async function handleTrash(id: string) {
    await fetch(`/api/admin/blogs/${id}`, { method: 'DELETE' })
    fetchPosts()
    fetchCounts()
    setOpenMenuId(null)
  }

  async function handleRestore(id: string) {
    await fetch(`/api/admin/blogs/${id}`, { method: 'PATCH' })
    fetchPosts()
    fetchCounts()
    setOpenMenuId(null)
  }

  async function handleDelete(id: string) {
    if (!confirm('Permanently delete this post? This cannot be undone.')) return
    await fetch(`/api/admin/blogs/${id}?permanent=true`, { method: 'DELETE' })
    fetchPosts()
    fetchCounts()
    setOpenMenuId(null)
  }

  function openQuickEdit(post: BlogPost) {
    setQuickEditId(post.id)
    setQuickEdit({
      title: post.title,
      slug: post.slug,
      author: post.author,
      postType: post.postType,
      status: post.status,
      publishedAt: post.publishedAt ? post.publishedAt.slice(0, 16) : '',
      isFeatured: post.isFeatured,
      tagInput: '',
      tags: post.tags.map((t) => t.tag),
    })
    setOpenMenuId(null)
  }

  async function saveQuickEdit() {
    if (!quickEditId || !quickEdit) return
    await fetch(`/api/admin/blogs/${quickEditId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: quickEdit.title,
        slug: quickEdit.slug,
        author: quickEdit.author,
        postType: quickEdit.postType,
        status: quickEdit.status,
        publishedAt: quickEdit.publishedAt || null,
        isFeatured: quickEdit.isFeatured,
        tags: quickEdit.tags.map((t) => ({ tag: t })),
      }),
    })
    setQuickEditId(null)
    setQuickEdit(null)
    fetchPosts()
    fetchCounts()
  }

  const statusTabs: { key: 'all' | BlogStatus; label: string }[] = [
    { key: 'all', label: `All (${counts.all})` },
    { key: 'published', label: `Published (${counts.published})` },
    { key: 'draft', label: `Draft (${counts.draft})` },
    { key: 'trashed', label: `Trash (${counts.trashed})` },
  ]

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold [font-family:var(--font-sora)] text-black">
            Blog Posts
          </h1>
          <p className="text-sm text-[#888] [font-family:var(--font-inter)] mt-0.5">
            Create and manage your blog content
          </p>
        </div>
        <button
          onClick={handleNewPost}
          disabled={creatingNew}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1C2BFF] text-white text-sm font-medium [font-family:var(--font-inter)] hover:bg-[#141FB5] transition-colors disabled:opacity-60"
        >
          <Plus className="w-4 h-4" />
          New Post
        </button>
      </div>

      {/* Status tabs */}
      <div className="flex gap-1 mb-4 border-b border-[#F0F0F0]">
        {statusTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setStatusFilter(tab.key)
              setPage(1)
            }}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors [font-family:var(--font-inter)] ${
              statusFilter === tab.key
                ? 'border-[#1C2BFF] text-[#1C2BFF]'
                : 'border-transparent text-[#888] hover:text-black'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AAA]" />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            placeholder="Search posts…"
            className="w-full h-9 pl-9 pr-4 rounded-xl border border-[#E5E5E5] text-sm [font-family:var(--font-inter)] focus:outline-none focus:border-[#1C2BFF] bg-white"
          />
        </div>
        <select
          value={postTypeFilter}
          onChange={(e) => {
            setPostTypeFilter(e.target.value)
            setPage(1)
          }}
          className="h-9 px-3 rounded-xl border border-[#E5E5E5] text-sm [font-family:var(--font-inter)] focus:outline-none focus:border-[#1C2BFF] bg-white text-[#555]"
        >
          <option value="">All types</option>
          <option value="blog">Blog</option>
          <option value="glossary">Glossary</option>
          <option value="tutorial">Tutorial</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#F0F0F0] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#F0F0F0]">
              {[
                { label: 'Title', col: 'title' },
                { label: 'Type', col: 'postType' },
                { label: 'Author', col: 'author' },
                { label: 'Tags', col: null },
                { label: 'Status', col: 'status' },
                { label: 'Published', col: 'publishedAt' },
                { label: 'Updated', col: 'updatedAt' },
                { label: '', col: null },
              ].map(({ label, col }) => (
                <th
                  key={label || 'actions'}
                  className="text-left px-4 py-3 text-[11px] font-semibold text-[#AAA] uppercase tracking-wider [font-family:var(--font-sora)]"
                >
                  {col ? (
                    <button
                      onClick={() => toggleSort(col)}
                      className="flex items-center gap-1 hover:text-[#555] transition-colors"
                    >
                      {label}
                      <SortBtn col={col} current={sortField} dir={sortDir} />
                    </button>
                  ) : (
                    label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-12 text-sm text-[#888] [font-family:var(--font-inter)]"
                >
                  Loading…
                </td>
              </tr>
            ) : posts.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-12 text-sm text-[#888] [font-family:var(--font-inter)]"
                >
                  No posts found.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <>
                  <tr
                    key={post.id}
                    className="border-b border-[#F8F8F8] hover:bg-[#FAFAFA] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div>
                        <button
                          onClick={() => onEdit(post.id)}
                          className="text-sm font-medium text-black hover:text-[#1C2BFF] transition-colors [font-family:var(--font-inter)] text-left"
                        >
                          {post.title}
                        </button>
                        {post.isFeatured && (
                          <span className="ml-2 text-[10px] bg-[#FF7F1C]/10 text-[#FF7F1C] px-1.5 py-0.5 rounded-full [font-family:var(--font-inter)]">
                            Featured
                          </span>
                        )}
                        <p className="text-[11px] text-[#AAA] [font-family:var(--font-inter)] mt-0.5">
                          /{post.slug}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-[#666] [font-family:var(--font-inter)] capitalize">
                        {post.postType}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-[#666] [font-family:var(--font-inter)]">
                        {post.author || '—'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 2).map((t) => (
                          <span
                            key={t.tag}
                            className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#F0F0F0] text-[#666] [font-family:var(--font-inter)]"
                          >
                            {t.tag}
                          </span>
                        ))}
                        {post.tags.length > 2 && (
                          <span className="text-[10px] text-[#AAA] [font-family:var(--font-inter)]">
                            +{post.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">{statusBadge(post.status)}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-[#AAA] [font-family:var(--font-inter)]">
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })
                          : '—'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-[#AAA] [font-family:var(--font-inter)]">
                        {new Date(post.updatedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="relative flex items-center justify-end">
                        <button
                          onClick={() =>
                            setOpenMenuId(openMenuId === post.id ? null : post.id)
                          }
                          className="p-1.5 rounded-lg text-[#AAA] hover:bg-[#F0F0F0] hover:text-[#555] transition-colors"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                        {openMenuId === post.id && (
                          <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-[#E5E5E5] py-1.5 w-44 z-20">
                            <button
                              onClick={() => onEdit(post.id)}
                              className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-[#333] hover:bg-[#F5F5F5] [font-family:var(--font-inter)]"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                              Edit
                            </button>
                            <button
                              onClick={() => openQuickEdit(post)}
                              className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-[#333] hover:bg-[#F5F5F5] [font-family:var(--font-inter)]"
                            >
                              <MoreHorizontal className="w-3.5 h-3.5" />
                              Quick Edit
                            </button>
                            {post.status === 'published' && (
                              <a
                                href={`/blogs/${post.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-[#333] hover:bg-[#F5F5F5] [font-family:var(--font-inter)]"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                View
                              </a>
                            )}
                            <div className="my-1 border-t border-[#F0F0F0]" />
                            {post.status === 'trashed' ? (
                              <>
                                <button
                                  onClick={() => handleRestore(post.id)}
                                  className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-green-600 hover:bg-green-50 [font-family:var(--font-inter)]"
                                >
                                  <RotateCcw className="w-3.5 h-3.5" />
                                  Restore
                                </button>
                                <button
                                  onClick={() => handleDelete(post.id)}
                                  className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50 [font-family:var(--font-inter)]"
                                >
                                  <X className="w-3.5 h-3.5" />
                                  Delete Permanently
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => handleTrash(post.id)}
                                className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50 [font-family:var(--font-inter)]"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                Move to Trash
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>

                  {/* Quick Edit row */}
                  {quickEditId === post.id && quickEdit && (
                    <tr key={`qe-${post.id}`} className="bg-[#F8F9FF]">
                      <td colSpan={7} className="px-4 py-4">
                        <div className="grid grid-cols-3 gap-3 mb-3">
                          <div>
                            <label className="text-[10px] text-[#AAA] [font-family:var(--font-inter)] block mb-1">
                              Title
                            </label>
                            <input
                              value={quickEdit.title}
                              onChange={(e) =>
                                setQuickEdit((q) => q && { ...q, title: e.target.value })
                              }
                              className="w-full h-8 px-2 rounded-lg border border-[#E5E5E5] text-xs [font-family:var(--font-inter)] focus:outline-none focus:border-[#1C2BFF] bg-white"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-[#AAA] [font-family:var(--font-inter)] block mb-1">
                              Slug
                            </label>
                            <input
                              value={quickEdit.slug}
                              onChange={(e) =>
                                setQuickEdit((q) => q && { ...q, slug: e.target.value })
                              }
                              className="w-full h-8 px-2 rounded-lg border border-[#E5E5E5] text-xs [font-family:var(--font-inter)] focus:outline-none focus:border-[#1C2BFF] bg-white"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-[#AAA] [font-family:var(--font-inter)] block mb-1">
                              Author
                            </label>
                            <input
                              value={quickEdit.author}
                              onChange={(e) =>
                                setQuickEdit((q) => q && { ...q, author: e.target.value })
                              }
                              className="w-full h-8 px-2 rounded-lg border border-[#E5E5E5] text-xs [font-family:var(--font-inter)] focus:outline-none focus:border-[#1C2BFF] bg-white"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-[#AAA] [font-family:var(--font-inter)] block mb-1">
                              Type
                            </label>
                            <select
                              value={quickEdit.postType}
                              onChange={(e) =>
                                setQuickEdit(
                                  (q) =>
                                    q && { ...q, postType: e.target.value as BlogPostType }
                                )
                              }
                              className="w-full h-8 px-2 rounded-lg border border-[#E5E5E5] text-xs [font-family:var(--font-inter)] focus:outline-none focus:border-[#1C2BFF] bg-white"
                            >
                              <option value="blog">Blog</option>
                              <option value="glossary">Glossary</option>
                              <option value="tutorial">Tutorial</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-[10px] text-[#AAA] [font-family:var(--font-inter)] block mb-1">
                              Status
                            </label>
                            <select
                              value={quickEdit.status}
                              onChange={(e) =>
                                setQuickEdit(
                                  (q) => q && { ...q, status: e.target.value as BlogStatus }
                                )
                              }
                              className="w-full h-8 px-2 rounded-lg border border-[#E5E5E5] text-xs [font-family:var(--font-inter)] focus:outline-none focus:border-[#1C2BFF] bg-white"
                            >
                              <option value="draft">Draft</option>
                              <option value="published">Published</option>
                              <option value="trashed">Trashed</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-[10px] text-[#AAA] [font-family:var(--font-inter)] block mb-1">
                              Publish Date
                            </label>
                            <input
                              type="datetime-local"
                              value={quickEdit.publishedAt}
                              onChange={(e) =>
                                setQuickEdit((q) => q && { ...q, publishedAt: e.target.value })
                              }
                              className="w-full h-8 px-2 rounded-lg border border-[#E5E5E5] text-xs [font-family:var(--font-inter)] focus:outline-none focus:border-[#1C2BFF] bg-white"
                            />
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="mb-3">
                          <label className="text-[10px] text-[#AAA] [font-family:var(--font-inter)] block mb-1">
                            Tags
                          </label>
                          <div className="flex flex-wrap gap-1.5 mb-1.5">
                            {quickEdit.tags.map((t) => (
                              <span
                                key={t}
                                className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#1C2BFF]/10 text-[#1C2BFF] text-[11px] [font-family:var(--font-inter)]"
                              >
                                {t}
                                <button
                                  onClick={() =>
                                    setQuickEdit(
                                      (q) =>
                                        q && { ...q, tags: q.tags.filter((x) => x !== t) }
                                    )
                                  }
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </span>
                            ))}
                          </div>
                          <div className="flex gap-1.5 max-w-xs">
                            <input
                              value={quickEdit.tagInput}
                              onChange={(e) =>
                                setQuickEdit((q) => q && { ...q, tagInput: e.target.value })
                              }
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault()
                                  const t = quickEdit.tagInput.trim()
                                  if (t && !quickEdit.tags.includes(t)) {
                                    setQuickEdit((q) =>
                                      q && { ...q, tags: [...q.tags, t], tagInput: '' }
                                    )
                                  }
                                }
                              }}
                              placeholder="Add tag…"
                              className="flex-1 h-7 px-2 rounded-lg border border-[#E5E5E5] text-xs [font-family:var(--font-inter)] focus:outline-none focus:border-[#1C2BFF] bg-white"
                            />
                            <button
                              onClick={() => {
                                const t = quickEdit.tagInput.trim()
                                if (t && !quickEdit.tags.includes(t)) {
                                  setQuickEdit((q) =>
                                    q && { ...q, tags: [...q.tags, t], tagInput: '' }
                                  )
                                }
                              }}
                              className="h-7 px-3 rounded-lg bg-[#F0F0F0] text-xs [font-family:var(--font-inter)]"
                            >
                              Add
                            </button>
                          </div>
                        </div>

                        <label className="flex items-center gap-2 mb-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={quickEdit.isFeatured}
                            onChange={(e) =>
                              setQuickEdit((q) => q && { ...q, isFeatured: e.target.checked })
                            }
                            className="rounded"
                          />
                          <span className="text-xs text-[#555] [font-family:var(--font-inter)]">
                            Featured post
                          </span>
                        </label>

                        <div className="flex gap-2">
                          <button
                            onClick={saveQuickEdit}
                            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#1C2BFF] text-white text-xs font-medium [font-family:var(--font-inter)] hover:bg-[#141FB5] transition-colors"
                          >
                            <Check className="w-3.5 h-3.5" />
                            Save
                          </button>
                          <button
                            onClick={() => {
                              setQuickEditId(null)
                              setQuickEdit(null)
                            }}
                            className="px-4 py-1.5 rounded-lg border border-[#E5E5E5] text-xs text-[#555] [font-family:var(--font-inter)] hover:bg-[#F5F5F5] transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 py-4 border-t border-[#F0F0F0]">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1.5 rounded-lg border border-[#E5E5E5] text-xs text-[#555] disabled:opacity-40 hover:border-[#1C2BFF] hover:text-[#1C2BFF] transition-colors [font-family:var(--font-inter)]"
            >
              Previous
            </button>
            <span className="text-xs text-[#888] [font-family:var(--font-inter)]">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1.5 rounded-lg border border-[#E5E5E5] text-xs text-[#555] disabled:opacity-40 hover:border-[#1C2BFF] hover:text-[#1C2BFF] transition-colors [font-family:var(--font-inter)]"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
