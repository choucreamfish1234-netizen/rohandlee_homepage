'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'
import { useAdmin } from '@/components/AdminMode'
import { type SuccessCase, DEFAULT_CASES, getRandomCaseImage } from '@/lib/cases'

const categories = ['전체', '성범죄', '재산범죄', '스토킹', '보이스피싱', '전세사기']

export default function CasesList() {
  const { isEditMode } = useAdmin()
  const [cases, setCases] = useState<SuccessCase[]>(DEFAULT_CASES)
  const [dbReady, setDbReady] = useState(false)
  const [activeCategory, setActiveCategory] = useState('전체')
  const [imagePopupId, setImagePopupId] = useState<number | null>(null)
  const [uploading, setUploading] = useState(false)
  const [seeding, setSeeding] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const uploadTargetId = useRef<number | null>(null)

  useEffect(() => {
    fetchCases()
  }, [])

  async function fetchCases() {
    try {
      const res = await fetch('/api/cases')
      const data = await res.json()
      setCases(data.cases)
      setDbReady(data.source === 'database')
    } catch {
      setCases(DEFAULT_CASES)
    }
  }

  async function updateCaseField(id: number, field: string, value: string) {
    setCases(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c))
    if (!dbReady) return
    try {
      await fetch('/api/cases', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, [field]: value }),
      })
    } catch (err) {
      console.error('Failed to save case:', err)
    }
  }

  function handleRandomImage(caseId: number) {
    const c = cases.find(x => x.id === caseId)
    if (!c) return
    const newUrl = getRandomCaseImage(c.category, c.image_url)
    updateCaseField(caseId, 'image_url', newUrl)
    setImagePopupId(null)
  }

  function resizeImage(file: File, maxWidth: number, quality: number): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const img = new window.Image()
      img.onload = () => {
        let w = img.width
        let h = img.height
        if (w > maxWidth) {
          h = Math.round(h * (maxWidth / w))
          w = maxWidth
        }
        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext('2d')
        if (!ctx) { reject(new Error('Canvas not supported')); return }
        ctx.drawImage(img, 0, 0, w, h)
        canvas.toBlob(
          blob => blob ? resolve(blob) : reject(new Error('Blob creation failed')),
          'image/jpeg',
          quality,
        )
      }
      img.onerror = reject
      img.src = URL.createObjectURL(file)
    })
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !uploadTargetId.current) return

    if (file.size > 20 * 1024 * 1024) {
      alert('파일 크기는 20MB 이하여야 합니다.')
      return
    }

    setUploading(true)
    try {
      const resized = await resizeImage(file, 1600, 0.8)
      const formData = new FormData()
      formData.append('file', resized, file.name.replace(/\.[^.]+$/, '.jpg'))
      const res = await fetch('/api/upload-image', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      updateCaseField(uploadTargetId.current, 'image_url', data.url)
      setImagePopupId(null)
    } catch (err) {
      alert(err instanceof Error ? err.message : '이미지 업로드에 실패했습니다.')
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  async function handleSeed() {
    setSeeding(true)
    try {
      const res = await fetch('/api/cases/seed', { method: 'POST' })
      const data = await res.json()
      if (data.error) {
        alert(data.error)
        if (data.sql) console.log('테이블 생성 SQL:', data.sql)
        return
      }
      await fetchCases()
    } catch {
      alert('DB 초기화 실패')
    } finally {
      setSeeding(false)
    }
  }

  const filteredCases = activeCategory === '전체'
    ? cases
    : cases.filter(c => c.category === activeCategory)

  const canEdit = isEditMode && dbReady

  return (
    <section className="pt-24 sm:pt-32 pb-16 sm:pb-40 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-16"
        >
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-4">
            Case Results
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black">
            성공사례
          </h1>
          <p className="mt-5 text-gray-400 text-sm">
            로앤이가 만들어낸 결과로 증명합니다.
          </p>
        </motion.div>

        {/* Admin: DB seed banner */}
        {isEditMode && !dbReady && (
          <div className="mb-8 p-4 bg-amber-50 border border-amber-200 text-center rounded-lg">
            <p className="text-sm text-amber-800 mb-3">
              성공사례가 아직 DB에 저장되지 않았습니다. 편집하려면 초기화해주세요.
            </p>
            <button
              onClick={handleSeed}
              disabled={seeding}
              className="px-6 py-2 bg-amber-500 text-white text-sm font-medium rounded hover:bg-amber-600 disabled:opacity-50 transition-colors"
            >
              {seeding ? '초기화 중...' : 'DB 초기화'}
            </button>
          </div>
        )}

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 sm:mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 text-sm font-medium transition-all duration-300 min-h-[44px] ${
                activeCategory === cat
                  ? 'bg-accent text-white'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cases grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {filteredCases.map((c, i) => (
              <ScrollReveal key={c.id} delay={i * 0.1}>
                <div className="group border border-gray-200 rounded-xl overflow-hidden hover:border-gray-400 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                  {/* Image area */}
                  <div className="relative aspect-[16/9] overflow-hidden rounded-t-xl">
                    <Image
                      src={c.image_url}
                      alt={c.title}
                      width={800}
                      height={450}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />

                    {/* Admin: image overlay */}
                    {canEdit && (
                      <div
                        className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer bg-black/0 hover:bg-black/40 transition-all"
                        onClick={() => setImagePopupId(imagePopupId === c.id ? null : c.id)}
                      >
                        <div className="opacity-0 group-hover:opacity-100 hover:!opacity-100 transition-opacity flex flex-col items-center">
                          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                          </svg>
                          <span className="text-white text-sm font-medium mt-2">이미지 변경</span>
                        </div>
                      </div>
                    )}

                    {/* Image change popup */}
                    {imagePopupId === c.id && (
                      <div
                        className="absolute bottom-0 left-0 right-0 bg-white p-4 shadow-lg z-10"
                        onClick={e => e.stopPropagation()}
                      >
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleRandomImage(c.id)}
                            className="flex-1 px-3 py-2 text-xs font-medium border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors rounded"
                          >
                            랜덤 이미지
                          </button>
                          <button
                            onClick={() => {
                              uploadTargetId.current = c.id
                              fileRef.current?.click()
                            }}
                            disabled={uploading}
                            className="flex-1 px-3 py-2 text-xs font-medium border border-green-200 text-green-600 hover:bg-green-50 disabled:opacity-50 transition-colors rounded"
                          >
                            {uploading && uploadTargetId.current === c.id ? '업로드 중...' : '이미지 업로드'}
                          </button>
                        </div>
                        <button
                          onClick={() => setImagePopupId(null)}
                          className="mt-2 w-full text-xs text-gray-400 hover:text-gray-600"
                        >
                          닫기
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Content area */}
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-5">
                      {canEdit ? (
                        <InlineEdit
                          value={c.tag}
                          onSave={val => updateCaseField(c.id, 'tag', val)}
                          className={`inline-block text-xs font-semibold px-3 py-1 ${c.tag_color}`}
                        />
                      ) : (
                        <span className={`inline-block text-xs font-semibold px-3 py-1 ${c.tag_color}`}>
                          {c.tag}
                        </span>
                      )}
                      {canEdit ? (
                        <InlineEdit
                          value={c.badge}
                          onSave={val => updateCaseField(c.id, 'badge', val)}
                          className={`inline-flex px-4 py-1.5 text-xs font-bold border ${c.badge_color}`}
                        />
                      ) : (
                        <span className={`inline-flex px-4 py-1.5 text-xs font-bold border ${c.badge_color}`}>
                          {c.badge}
                        </span>
                      )}
                    </div>

                    {canEdit ? (
                      <InlineEdit
                        value={c.title}
                        onSave={val => updateCaseField(c.id, 'title', val)}
                        className="text-lg font-bold text-black leading-snug mb-4"
                      />
                    ) : (
                      <h2 className="text-lg font-bold text-black leading-snug group-hover:text-accent transition-colors duration-300 mb-4">
                        {c.title}
                      </h2>
                    )}

                    {canEdit ? (
                      <InlineEdit
                        value={c.summary}
                        onSave={val => updateCaseField(c.id, 'summary', val)}
                        className="text-sm text-gray-500 leading-relaxed"
                        multiline
                      />
                    ) : (
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {c.summary}
                      </p>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredCases.length === 0 && (
          <p className="text-center text-gray-400 py-20">해당 카테고리의 사례가 아직 없습니다.</p>
        )}

        {/* Hidden file input for image upload */}
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>

      {/* CTA */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-40">
        <ScrollReveal>
          <div className="bg-accent py-12 sm:py-20 px-5 sm:px-8 text-center">
            <h2 className="text-xl sm:text-3xl font-bold text-white mb-4">
              비슷한 사건으로 고민 중이신가요?
            </h2>
            <p className="text-white/60 text-sm mb-8 sm:mb-10">
              로앤이의 전문 변호사가 무료로 상담해드립니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/consultation"
                className="inline-flex items-center justify-center px-8 sm:px-10 py-4 bg-white text-accent text-sm font-medium rounded-full hover:bg-gray-100 transition-colors min-h-[48px]"
              >
                무료 상담 신청하기
              </Link>
              <a
                href="tel:032-207-8788"
                className="inline-flex items-center justify-center px-8 sm:px-10 py-4 border border-white/30 text-white text-sm font-medium rounded-full hover:border-white/60 transition-colors min-h-[48px]"
              >
                032-207-8788
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

// ─── InlineEdit ──────────────────────────────────────────────

interface InlineEditProps {
  value: string
  onSave: (value: string) => void
  className?: string
  multiline?: boolean
}

function InlineEdit({ value, onSave, className = '', multiline }: InlineEditProps) {
  const [editing, setEditing] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (editing && ref.current) {
      ref.current.focus()
      const range = document.createRange()
      range.selectNodeContents(ref.current)
      range.collapse(false)
      const sel = window.getSelection()
      sel?.removeAllRanges()
      sel?.addRange(range)
    }
  }, [editing])

  function handleBlur() {
    setEditing(false)
    const newValue = ref.current?.innerText?.trim() || ''
    if (newValue && newValue !== value) {
      onSave(newValue)
    }
  }

  return (
    <div
      ref={ref}
      className={`${className} ${editing ? '' : 'cursor-pointer'}`}
      style={{
        outline: editing ? '2px solid #3B82F6' : '2px dashed rgba(59,130,246,0.3)',
        outlineOffset: '2px',
        borderRadius: '2px',
        background: editing ? 'rgba(59,130,246,0.05)' : undefined,
      }}
      contentEditable={editing}
      suppressContentEditableWarning
      onClick={() => { if (!editing) setEditing(true) }}
      onBlur={handleBlur}
      onKeyDown={e => {
        if (e.key === 'Escape') setEditing(false)
        if (e.key === 'Enter' && !multiline) { e.preventDefault(); ref.current?.blur() }
      }}
    >
      {value}
    </div>
  )
}
