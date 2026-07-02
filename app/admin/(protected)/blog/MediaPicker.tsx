'use client'

import { useEffect, useRef, useState } from 'react'
import { X, Upload, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import type { BlogMediaItem } from '@/lib/blog-db'

type Props = {
  open: boolean
  onClose: () => void
  onSelect: (url: string) => void
}

export default function MediaPicker({ open, onClose, onSelect }: Props) {
  const [tab, setTab] = useState<'library' | 'upload'>('library')
  const [items, setItems] = useState<BlogMediaItem[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open || tab !== 'library') return
    setLoading(true)
    fetch(`/api/admin/blogs/media?page=${page}&search=${encodeURIComponent(search)}`)
      .then((r) => r.json())
      .then((d) => {
        setItems(d.docs || [])
        setTotalPages(d.totalPages || 1)
      })
      .finally(() => setLoading(false))
  }, [open, tab, page, search])

  async function handleUpload(file: File) {
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    try {
      const res = await fetch('/api/admin/blogs/media', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.url) {
        onSelect(data.url)
        onClose()
      }
    } finally {
      setUploading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl w-[800px] max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F0F0F0]">
          <h2 className="text-base font-semibold [font-family:var(--font-sora)] text-black">
            Media Library
          </h2>
          <button
            onClick={onClose}
            className="text-[#888] hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#F0F0F0] px-6">
          {(['library', 'upload'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors -mb-px [font-family:var(--font-inter)] capitalize ${
                tab === t
                  ? 'border-[#1C2BFF] text-[#1C2BFF]'
                  : 'border-transparent text-[#888] hover:text-black'
              }`}
            >
              {t === 'library' ? 'Media Library' : 'Upload New'}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {tab === 'library' ? (
            <>
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AAA]" />
                <input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value)
                    setPage(1)
                  }}
                  placeholder="Search files…"
                  className="w-full h-10 pl-9 pr-4 rounded-lg border border-[#E5E5E5] text-sm [font-family:var(--font-inter)] focus:outline-none focus:border-[#1C2BFF]"
                />
              </div>

              {loading ? (
                <div className="text-center py-12 text-sm text-[#888] [font-family:var(--font-inter)]">
                  Loading…
                </div>
              ) : items.length === 0 ? (
                <div className="text-center py-12 text-sm text-[#888] [font-family:var(--font-inter)]">
                  No media found. Upload something first.
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-3">
                  {items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelect(item.url)
                        onClose()
                      }}
                      className="group relative aspect-square rounded-lg overflow-hidden border border-[#E5E5E5] hover:border-[#1C2BFF] hover:ring-2 hover:ring-[#1C2BFF]/20 transition-all bg-[#F8F8F8]"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.url}
                        alt={item.alt || item.filename}
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => {
                          const t = e.currentTarget
                          t.style.display = 'none'
                          const placeholder = t.nextElementSibling as HTMLElement | null
                          if (placeholder) placeholder.style.display = 'flex'
                        }}
                      />
                      <div className="absolute inset-0 hidden flex-col items-center justify-center gap-1 p-2 bg-[#F3F3F3]">
                        <svg className="w-6 h-6 text-[#CCC]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        <span className="text-[9px] text-[#BBB] text-center leading-tight [font-family:var(--font-inter)]">Image not found</span>
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                      <div className="absolute bottom-0 left-0 right-0 p-1.5 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white text-[10px] truncate [font-family:var(--font-inter)]">
                          {item.filename}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 mt-4">
                  <button
                    disabled={page <= 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="p-1.5 rounded-lg border border-[#E5E5E5] text-[#888] disabled:opacity-40 hover:border-[#1C2BFF] hover:text-[#1C2BFF] transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-sm text-[#888] [font-family:var(--font-inter)]">
                    {page} / {totalPages}
                  </span>
                  <button
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    className="p-1.5 rounded-lg border border-[#E5E5E5] text-[#888] disabled:opacity-40 hover:border-[#1C2BFF] hover:text-[#1C2BFF] transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div
              onDragOver={(e) => {
                e.preventDefault()
                setDragging(true)
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault()
                setDragging(false)
                const file = e.dataTransfer.files[0]
                if (file) handleUpload(file)
              }}
              onClick={() => fileRef.current?.click()}
              className={`border-2 border-dashed rounded-xl flex flex-col items-center justify-center h-48 cursor-pointer transition-colors ${
                dragging
                  ? 'border-[#1C2BFF] bg-[#1C2BFF]/5'
                  : 'border-[#DDD] hover:border-[#1C2BFF] hover:bg-[#F8F8FF]'
              }`}
            >
              <Upload
                className={`w-8 h-8 mb-3 ${dragging ? 'text-[#1C2BFF]' : 'text-[#BBB]'}`}
              />
              <p className="text-sm font-medium text-[#555] [font-family:var(--font-inter)]">
                {uploading ? 'Uploading…' : 'Drop an image here or click to browse'}
              </p>
              <p className="text-xs text-[#AAA] mt-1 [font-family:var(--font-inter)]">
                PNG, JPG, GIF, WebP up to 10MB
              </p>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleUpload(file)
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
