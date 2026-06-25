'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Image from 'next/image'
import { type SuccessCase, CASE_IMAGE_POOLS, getRandomCaseImage } from '@/lib/cases'

const CATEGORIES = ['성범죄', '보이스피싱', '전세사기', '스토킹', '재산범죄', '일반']

const BADGE_PRESETS: Record<string, { badge_color: string; tag_color: string }> = {
  '성범죄': { badge_color: 'bg-red-50 text-red-700 border-red-200', tag_color: 'bg-red-50 text-red-600' },
  '보이스피싱': { badge_color: 'bg-emerald-50 text-emerald-700 border-emerald-200', tag_color: 'bg-emerald-50 text-emerald-600' },
  '전세사기': { badge_color: 'bg-blue-50 text-blue-700 border-blue-200', tag_color: 'bg-blue-50 text-blue-600' },
  '스토킹': { badge_color: 'bg-amber-50 text-amber-700 border-amber-200', tag_color: 'bg-amber-50 text-amber-600' },
  '재산범죄': { badge_color: 'bg-emerald-50 text-emerald-700 border-emerald-200', tag_color: 'bg-emerald-50 text-emerald-600' },
  '일반': { badge_color: 'bg-gray-50 text-gray-700 border-gray-200', tag_color: 'bg-gray-50 text-gray-600' },
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 100)
}

export default function AdminCasesPageWrapper() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-gray-400 text-sm">로딩 중...</div>}>
      <AdminCasesPage />
    </Suspense>
  )
}

function AdminCasesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams.get('id')

  const [mode, setMode] = useState<'list' | 'edit'>(editId ? 'edit' : 'list')
  const [cases, setCases] = useState<SuccessCase[]>([])
  const [loading, setLoading] = useState(true)

  // Editor state
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [tag, setTag] = useState('')
  const [category, setCategory] = useState('일반')
  const [summary, setSummary] = useState('')
  const [content, setContent] = useState('')
  const [badge, setBadge] = useState('')
  const [badgeColor, setBadgeColor] = useState('bg-emerald-50 text-emerald-700 border-emerald-200')
  const [tagColor, setTagColor] = useState('bg-emerald-50 text-emerald-600')
  const [imageUrl, setImageUrl] = useState('')
  const [saving, setSaving] = useState(false)
  const [showPreview, setShowPreview] = useState(true)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const contentFileInputRef = useRef<HTMLInputElement>(null)
  const [contentUploading, setContentUploading] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('admin_authenticated') !== 'true') {
      router.push('/admin')
      return
    }
    fetchCases()
    if (editId) {
      loadCase(Number(editId))
    }
  }, [editId, router])

  useEffect(() => {
    if (!editId && title) {
      setSlug(generateSlug(title))
    }
  }, [title, editId])

  useEffect(() => {
    if (!editId) {
      const preset = BADGE_PRESETS[category] || BADGE_PRESETS['일반']
      setBadgeColor(preset.badge_color)
      setTagColor(preset.tag_color)
      if (!tag) setTag(category)
    }
  }, [category, editId, tag])

  async function fetchCases() {
    setLoading(true)
    try {
      const res = await fetch('/api/cases')
      const data = await res.json()
      setCases(data.cases || [])
    } catch {
      setCases([])
    } finally {
      setLoading(false)
    }
  }

  async function loadCase(id: number) {
    try {
      const res = await fetch('/api/cases')
      const data = await res.json()
      const found = (data.cases || []).find((c: SuccessCase) => c.id === id)
      if (found) {
        setTitle(found.title)
        setSlug(found.slug || generateSlug(found.title))
        setTag(found.tag)
        setCategory(found.category)
        setSummary(found.summary)
        setContent(found.content || '')
        setBadge(found.badge)
        setBadgeColor(found.badge_color)
        setTagColor(found.tag_color)
        setImageUrl(found.image_url)
        setMode('edit')
      }
    } catch {
      // ignore
    }
  }

  function resetForm() {
    setTitle('')
    setSlug('')
    setTag('')
    setCategory('일반')
    setSummary('')
    setContent('')
    setBadge('')
    setBadgeColor('bg-emerald-50 text-emerald-700 border-emerald-200')
    setTagColor('bg-emerald-50 text-emerald-600')
    setImageUrl('')
  }

  const handleSave = async (published: boolean) => {
    if (!title.trim() || !summary.trim()) {
      alert('제목과 요약을 입력해주세요.')
      return
    }

    setSaving(true)
    const casePayload: Record<string, unknown> = {
      title: title.trim(),
      tag: tag.trim() || category,
      category,
      summary: summary.trim(),
      content: content.trim() || null,
      badge: badge.trim(),
      badge_color: badgeColor,
      tag_color: tagColor,
      image_url: imageUrl.trim() || getRandomCaseImage(category),
      published,
    }

    if (!editId) {
      casePayload.slug = slug.trim() || generateSlug(title)
    }

    try {
      if (editId) {
        const res = await fetch('/api/cases', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: Number(editId), ...casePayload }),
        })
        const data = await res.json()
        if (data.error) throw new Error(data.error)
      } else {
        const res = await fetch('/api/cases', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(casePayload),
        })
        const data = await res.json()
        if (data.error) throw new Error(data.error)
      }
      router.push('/admin/cases')
      resetForm()
      setMode('list')
      fetchCases()
    } catch (err) {
      alert(err instanceof Error ? err.message : '저장에 실패했습니다.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return
    try {
      const res = await fetch('/api/cases', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      fetchCases()
    } catch (err) {
      alert(err instanceof Error ? err.message : '삭제에 실패했습니다.')
    }
  }

  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = document.getElementById('case-content-editor') as HTMLTextAreaElement
    if (!textarea) return
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selected = content.substring(start, end)
    const replacement = before + (selected || '텍스트') + after
    const newContent = content.substring(0, start) + replacement + content.substring(end)
    setContent(newContent)
    setTimeout(() => {
      textarea.focus()
      textarea.selectionStart = start + before.length
      textarea.selectionEnd = start + before.length + (selected || '텍스트').length
    }, 0)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 20 * 1024 * 1024) {
      alert('파일 크기는 20MB 이하여야 합니다.')
      return
    }
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/upload-image', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setImageUrl(data.url)
    } catch (err) {
      alert(err instanceof Error ? err.message : '이미지 업로드에 실패했습니다.')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleContentImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 20 * 1024 * 1024) {
      alert('파일 크기는 20MB 이하여야 합니다.')
      return
    }
    setContentUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/upload-image', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      insertMarkdown(`\n![이미지 설명](${data.url})\n`, '')
    } catch (err) {
      alert(err instanceof Error ? err.message : '이미지 업로드에 실패했습니다.')
    } finally {
      setContentUploading(false)
      if (contentFileInputRef.current) contentFileInputRef.current.value = ''
    }
  }

  const handleRandomImage = () => {
    const pool = CASE_IMAGE_POOLS[category] || CASE_IMAGE_POOLS['일반']
    const candidates = pool.filter(url => url !== imageUrl)
    const pick = candidates.length > 0
      ? candidates[Math.floor(Math.random() * candidates.length)]
      : pool[Math.floor(Math.random() * pool.length)]
    setImageUrl(pick)
  }

  const toolbarButtons = [
    { label: 'B', action: () => insertMarkdown('**', '**'), title: '굵게' },
    { label: 'I', action: () => insertMarkdown('*', '*'), title: '기울임' },
    { label: 'H2', action: () => insertMarkdown('\n## ', '\n'), title: '제목 2' },
    { label: 'H3', action: () => insertMarkdown('\n### ', '\n'), title: '제목 3' },
    { label: '""', action: () => insertMarkdown('\n> ', '\n'), title: '인용' },
    { label: '-', action: () => insertMarkdown('\n- ', '\n'), title: '목록' },
    { label: '---', action: () => insertMarkdown('\n---\n', ''), title: '구분선' },
    { label: 'Link', action: () => insertMarkdown('[', '](url)'), title: '링크' },
    { label: 'Img', action: () => insertMarkdown('![설명](', ')'), title: '이미지 URL' },
    {
      label: contentUploading ? '업로드 중...' : '이미지 삽입',
      action: () => contentFileInputRef.current?.click(),
      title: '본문에 이미지 파일 삽입',
    },
  ]

  // ─── List Mode ─────────────────────────────────────

  if (mode === 'list' && !editId) {
    return (
      <div className="py-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="flex items-center gap-6 mb-6 border-b border-gray-200 pb-3">
          <Link href="/admin/dashboard" className="text-sm text-gray-500 hover:text-[#1B3B2F] transition-colors pb-3 -mb-3">
            블로그 관리
          </Link>
          <Link href="/admin/consultations" className="text-sm text-gray-500 hover:text-[#1B3B2F] transition-colors pb-3 -mb-3">
            상담 관리
          </Link>
          <span className="text-sm font-semibold text-[#1B3B2F] border-b-2 border-[#1B3B2F] pb-3 -mb-3">
            성공사례 관리
          </span>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-black">성공사례 관리</h1>
            <p className="text-sm text-gray-500 mt-1">성공사례를 작성하고 관리하세요.</p>
          </div>
          <button
            onClick={() => { resetForm(); setMode('edit'); router.push('/admin/cases') }}
            className="px-4 py-2.5 bg-[#1B3B2F] text-white text-sm font-medium hover:bg-[#1B3B2F]/90 transition-colors"
          >
            + 새 성공사례 작성
          </button>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse h-20 bg-gray-50 border border-gray-100" />
            ))}
          </div>
        ) : cases.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-sm">아직 성공사례가 없습니다.</p>
          </div>
        ) : (
          <div className="border border-gray-100 divide-y divide-gray-100 bg-white">
            {cases.map(c => (
              <div key={c.id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors">
                <div className="w-16 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                  <Image
                    src={c.image_url}
                    alt={c.title}
                    width={64}
                    height={48}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 ${c.tag_color}`}>{c.tag}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 border ${c.badge_color}`}>{c.badge}</span>
                    {c.published ? (
                      <span className="text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-700">게시됨</span>
                    ) : (
                      <span className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-500">미게시</span>
                    )}
                    {c.content ? (
                      <span className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-600">상세글 있음</span>
                    ) : (
                      <span className="text-[10px] px-2 py-0.5 bg-gray-50 text-gray-400">상세글 없음</span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-black truncate">{c.title}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link
                    href={`/admin/cases?id=${c.id}`}
                    className="text-xs text-gray-500 hover:text-[#1B3B2F] transition-colors"
                  >
                    수정
                  </Link>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="text-xs text-red-400 hover:text-red-600 transition-colors"
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  // ─── Edit Mode ─────────────────────────────────────

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-black">
            {editId ? '성공사례 수정' : '새 성공사례 작성'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">마크다운으로 상세 글을 작성하세요.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={`px-4 py-2.5 border text-sm font-medium transition-colors ${
              showPreview
                ? 'border-[#1B3B2F] text-[#1B3B2F] bg-[#1B3B2F]/5'
                : 'border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {showPreview ? '미리보기 ON' : '미리보기 OFF'}
          </button>
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="px-4 py-2.5 border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            임시저장
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="px-4 py-2.5 bg-[#1B3B2F] text-white text-sm font-medium hover:bg-[#1B3B2F]/90 disabled:opacity-50 transition-colors"
          >
            {saving ? '저장 중...' : '게시하기'}
          </button>
        </div>
      </div>

      {/* Title / Slug / Summary */}
      <div className="space-y-4 mb-6">
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="성공사례 제목 (예: 보이스피싱 현금 수거책, 경찰 단계 불송치(무죄) 결정)"
          className="w-full px-4 py-3 border border-gray-200 text-lg font-bold focus:outline-none focus:border-[#1B3B2F] transition-colors"
        />
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 whitespace-nowrap">/cases/</span>
          <input
            type="text"
            value={slug}
            onChange={e => { if (!editId) setSlug(e.target.value) }}
            placeholder="url-slug"
            readOnly={!!editId}
            className={`flex-1 px-3 py-2 border text-xs focus:outline-none transition-colors ${
              editId
                ? 'border-gray-100 text-gray-400 bg-gray-50 cursor-not-allowed'
                : 'border-gray-200 text-gray-600 focus:border-[#1B3B2F]'
            }`}
          />
        </div>
        {editId && (
          <p className="text-[11px] text-amber-600">
            SEO 보호: 기존 성공사례의 URL(slug)은 검색엔진 노출에 영향을 주므로 변경할 수 없습니다.
          </p>
        )}
        <textarea
          value={summary}
          onChange={e => setSummary(e.target.value)}
          placeholder="요약 (카드에 표시될 설명)"
          rows={2}
          className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-[#1B3B2F] transition-colors resize-none"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-3 space-y-4">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-1 border border-gray-200 border-b-0 bg-gray-50 px-2 py-1.5">
            {toolbarButtons.map(btn => (
              <button
                key={btn.title}
                onClick={btn.action}
                title={btn.title}
                className="px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-white hover:text-black rounded transition-colors"
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Split Editor + Preview */}
          <div className={`border border-gray-200 ${showPreview ? 'grid grid-cols-2' : ''}`}>
            <textarea
              id="case-content-editor"
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="마크다운으로 상세 내용을 작성하세요...&#10;&#10;## 사건 개요&#10;의뢰인은...&#10;&#10;## 로앤이의 대응&#10;로앤이는...&#10;&#10;## 결과&#10;최종적으로..."
              className={`w-full px-4 py-4 text-sm font-mono leading-relaxed focus:outline-none resize-y min-h-[500px] ${
                showPreview ? 'border-r border-gray-200' : ''
              }`}
            />
            {showPreview && (
              <div className="px-6 py-4 overflow-y-auto min-h-[500px] max-h-[700px] bg-white">
                <div className="prose prose-sm max-w-none
                  prose-headings:text-black prose-headings:font-bold
                  prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3
                  prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2
                  prose-p:text-gray-700 prose-p:leading-relaxed
                  prose-a:text-[#1B3B2F] prose-a:font-medium
                  prose-strong:text-black prose-strong:font-bold
                  prose-em:italic
                  prose-ul:text-gray-700 prose-ol:text-gray-700
                  prose-li:my-1
                  prose-blockquote:border-[#1B3B2F] prose-blockquote:text-gray-600 prose-blockquote:not-italic
                  prose-hr:border-gray-200
                  prose-img:rounded-lg
                ">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {content || '*왼쪽에 마크다운을 입력하면 여기에 미리보기가 표시됩니다.*'}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          </div>

          <input
            ref={contentFileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleContentImageUpload}
            className="hidden"
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">카테고리</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-[#1B3B2F] transition-colors bg-white"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">태그 (카드에 표시)</label>
            <input
              type="text"
              value={tag}
              onChange={e => setTag(e.target.value)}
              placeholder="예: 보이스피싱"
              className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-[#1B3B2F] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">결과 배지</label>
            <input
              type="text"
              value={badge}
              onChange={e => setBadge(e.target.value)}
              placeholder="예: 불송치(무죄), 징역 8년, 전액 회수"
              className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-[#1B3B2F] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">썸네일</label>
            <input
              type="text"
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              placeholder="이미지 URL"
              className="w-full px-3 py-2 border border-gray-200 text-xs focus:outline-none focus:border-[#1B3B2F] transition-colors"
            />
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={handleRandomImage}
                className="flex-1 px-3 py-2 text-xs font-medium border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors"
              >
                랜덤 이미지
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="flex-1 px-3 py-2 text-xs font-medium border border-green-200 text-green-600 hover:bg-green-50 disabled:opacity-50 transition-colors"
              >
                {uploading ? '업로드 중...' : '이미지 업로드'}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            {imageUrl && (
              <div className="mt-2 aspect-[16/10] bg-gray-100 overflow-hidden">
                <img
                  src={imageUrl}
                  alt="썸네일 미리보기"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-gray-100">
            <button
              onClick={() => { resetForm(); setMode('list'); router.push('/admin/cases') }}
              className="text-xs text-gray-500 hover:text-black transition-colors"
            >
              &larr; 성공사례 목록으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
