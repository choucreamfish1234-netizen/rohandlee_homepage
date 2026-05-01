'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Webtoon {
  id: string
  title: string
  description: string | null
  image_url: string | null
  images: string[]
  link_url: string | null
  display_order: number
  visible: boolean
  created_at: string
}

type FormData = {
  title: string
  description: string
  link_url: string
  images: string[]
  display_order: number
  visible: boolean
}

const emptyForm: FormData = {
  title: '',
  description: '',
  link_url: '',
  images: [],
  display_order: 0,
  visible: true,
}

const MAX_IMAGES = 10

export default function AdminWebtoonPage() {
  const router = useRouter()
  const [webtoons, setWebtoons] = useState<Webtoon[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormData>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('admin_authenticated') !== 'true') {
      router.push('/admin')
      return
    }
    fetchWebtoons()
  }, [router])

  const fetchWebtoons = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/webtoon')
      const data = await res.json()
      if (Array.isArray(data)) setWebtoons(data)
    } catch (e) {
      console.error('Failed to fetch webtoons:', e)
    }
    setLoading(false)
  }, [])

  const getWebtoonImages = (item: Webtoon): string[] => {
    if (item.images && Array.isArray(item.images) && item.images.length > 0) {
      return item.images
    }
    if (item.image_url) return [item.image_url]
    return []
  }

  const openAddModal = () => {
    setEditingId(null)
    setForm(emptyForm)
    setModalOpen(true)
  }

  const openEditModal = (item: Webtoon) => {
    setEditingId(item.id)
    setForm({
      title: item.title,
      description: item.description || '',
      link_url: item.link_url || '',
      images: getWebtoonImages(item),
      display_order: item.display_order,
      visible: item.visible,
    })
    setModalOpen(true)
  }

  const handleSave = async () => {
    if (!form.title) {
      alert('제목을 입력해주세요.')
      return
    }
    setSaving(true)
    try {
      const payload = {
        title: form.title,
        description: form.description || null,
        link_url: form.link_url || null,
        images: form.images,
        image_url: form.images.length > 0 ? form.images[0] : null,
        display_order: form.display_order,
        visible: form.visible,
      }

      if (editingId) {
        await fetch('/api/webtoon', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, ...payload }),
        })
      } else {
        await fetch('/api/webtoon', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      }
      setModalOpen(false)
      fetchWebtoons()
    } catch (e) {
      console.error('Save failed:', e)
      alert('저장에 실패했습니다.')
    }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return
    try {
      await fetch('/api/webtoon', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      fetchWebtoons()
    } catch (e) {
      console.error('Delete failed:', e)
    }
  }

  const handleToggleVisible = async (item: Webtoon) => {
    try {
      await fetch('/api/webtoon', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item.id, visible: !item.visible }),
      })
      fetchWebtoons()
    } catch (e) {
      console.error('Toggle failed:', e)
    }
  }

  const uploadFiles = async (files: File[]) => {
    const remaining = MAX_IMAGES - form.images.length
    if (remaining <= 0) {
      alert(`최대 ${MAX_IMAGES}장까지 업로드할 수 있습니다.`)
      return
    }
    const toUpload = files.slice(0, remaining)
    if (files.length > remaining) {
      alert(`${remaining}장만 추가로 업로드할 수 있습니다. (최대 ${MAX_IMAGES}장)`)
    }

    setUploading(true)
    const newUrls: string[] = []

    for (const file of toUpload) {
      try {
        const fd = new globalThis.FormData()
        fd.append('file', file)
        const res = await fetch('/api/webtoon/upload', { method: 'POST', body: fd })
        const data = await res.json()
        if (data.url) {
          newUrls.push(data.url)
        } else {
          alert(data.error || `업로드 실패: ${file.name}`)
        }
      } catch {
        alert(`이미지 업로드에 실패했습니다: ${file.name}`)
      }
    }

    if (newUrls.length > 0) {
      setForm(prev => ({ ...prev, images: [...prev.images, ...newUrls] }))
    }
    setUploading(false)
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return
    await uploadFiles(files)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOverIndex(null)
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'))
    if (files.length > 0) await uploadFiles(files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const removeImage = (index: number) => {
    setForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const handleThumbDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleThumbDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === index) return
    setDragOverIndex(index)
  }

  const handleThumbDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    e.stopPropagation()
    if (draggedIndex === null || draggedIndex === index) {
      setDraggedIndex(null)
      setDragOverIndex(null)
      return
    }
    setForm(prev => {
      const newImages = [...prev.images]
      const [moved] = newImages.splice(draggedIndex, 1)
      newImages.splice(index, 0, moved)
      return { ...prev, images: newImages }
    })
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  const handleThumbDragEnd = () => {
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Navigation Tabs */}
      <div className="flex items-center gap-6 mb-6 border-b border-gray-200 pb-3 overflow-x-auto">
        <Link
          href="/admin/dashboard"
          className="text-sm text-gray-500 hover:text-[#1B3B2F] transition-colors pb-3 -mb-3 whitespace-nowrap"
        >
          블로그 관리
        </Link>
        <Link
          href="/admin/consultations"
          className="text-sm text-gray-500 hover:text-[#1B3B2F] transition-colors pb-3 -mb-3 whitespace-nowrap"
        >
          상담 관리
        </Link>
        <Link
          href="/admin/paid-consultations"
          className="text-sm text-gray-500 hover:text-[#1B3B2F] transition-colors pb-3 -mb-3 whitespace-nowrap"
        >
          유료 상담
        </Link>
        <Link
          href="/admin/press"
          className="text-sm text-gray-500 hover:text-[#1B3B2F] transition-colors pb-3 -mb-3 whitespace-nowrap"
        >
          언론보도
        </Link>
        <span className="text-sm font-semibold text-[#1B3B2F] border-b-2 border-[#1B3B2F] pb-3 -mb-3 whitespace-nowrap">
          인스타툰
        </span>
        <Link
          href="/admin/lawyers"
          className="text-sm text-gray-500 hover:text-[#1B3B2F] transition-colors pb-3 -mb-3 whitespace-nowrap"
        >
          변호사 관리
        </Link>
        <Link
          href="/admin/seo"
          className="text-sm text-gray-500 hover:text-[#1B3B2F] transition-colors pb-3 -mb-3 whitespace-nowrap"
        >
          SEO 관리
        </Link>
        <Link
          href="/admin/analytics"
          className="text-sm text-gray-500 hover:text-[#1B3B2F] transition-colors pb-3 -mb-3 whitespace-nowrap"
        >
          방문자 분석
        </Link>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-black">인스타툰 관리</h1>
          <p className="text-sm text-gray-500 mt-1">범죄예방 인스타툰을 관리하고 메인 페이지에 노출하세요.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={openAddModal}
            className="px-4 py-2.5 bg-[#1B3B2F] text-white text-sm font-medium hover:bg-[#15302A] transition-colors rounded-lg"
          >
            + 추가
          </button>
          <button
            onClick={() => { sessionStorage.removeItem('admin_authenticated'); router.push('/admin') }}
            className="px-4 py-2.5 border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors rounded-lg"
          >
            로그아웃
          </button>
        </div>
      </div>

      {/* List */}
      {loading ? (
        <p className="text-center text-gray-400 py-12">불러오는 중...</p>
      ) : webtoons.length === 0 ? (
        <p className="text-center text-gray-400 py-12">등록된 인스타툰이 없습니다.</p>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-500">
                <th className="px-4 py-3 w-16">이미지</th>
                <th className="px-4 py-3">제목</th>
                <th className="px-4 py-3">설명</th>
                <th className="px-4 py-3 w-20 text-center">이미지수</th>
                <th className="px-4 py-3 w-16 text-center">순서</th>
                <th className="px-4 py-3 w-16 text-center">노출</th>
                <th className="px-4 py-3 w-32 text-center">관리</th>
              </tr>
            </thead>
            <tbody>
              {webtoons.map((item) => {
                const imgs = getWebtoonImages(item)
                return (
                  <tr key={item.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3">
                      {imgs.length > 0 ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={imgs[0]} alt="" className="w-12 h-12 object-cover rounded" />
                      ) : (
                        <div className="w-12 h-12 bg-[#1B3B2F] rounded flex items-center justify-center">
                          <span className="text-[8px] text-white font-bold">TOON</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-700 font-medium">{item.title}</td>
                    <td className="px-4 py-3 text-gray-500 max-w-xs truncate">{item.description || '-'}</td>
                    <td className="px-4 py-3 text-center text-gray-500">{imgs.length}장</td>
                    <td className="px-4 py-3 text-center text-gray-500">{item.display_order}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleToggleVisible(item)}
                        className={`w-10 h-5 rounded-full relative transition-colors ${
                          item.visible ? 'bg-[#1B3B2F]' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                            item.visible ? 'left-5' : 'left-0.5'
                          }`}
                        />
                      </button>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => openEditModal(item)}
                        className="text-[#1B3B2F] hover:underline mr-3"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-500 hover:underline"
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-lg font-bold text-black mb-6">
              {editingId ? '인스타툰 수정' : '인스타툰 추가'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">제목 *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3B2F]"
                  placeholder="인스타툰 제목"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3B2F]"
                  placeholder="간단한 설명 (선택)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">인스타그램 링크</label>
                <input
                  type="text"
                  value={form.link_url}
                  onChange={(e) => setForm(prev => ({ ...prev, link_url: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3B2F]"
                  placeholder="https://www.instagram.com/p/..."
                />
              </div>

              {/* Multi-image upload area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  이미지 ({form.images.length}/{MAX_IMAGES})
                </label>

                {/* Thumbnail previews */}
                {form.images.length > 0 && (
                  <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
                    {form.images.map((url, i) => (
                      <div
                        key={`${url}-${i}`}
                        draggable
                        onDragStart={() => handleThumbDragStart(i)}
                        onDragOver={(e) => handleThumbDragOver(e, i)}
                        onDrop={(e) => handleThumbDrop(e, i)}
                        onDragEnd={handleThumbDragEnd}
                        className={`relative flex-shrink-0 group cursor-grab active:cursor-grabbing transition-all ${
                          draggedIndex === i ? 'opacity-40 scale-95' : ''
                        } ${dragOverIndex === i ? 'ring-2 ring-[#1B3B2F] ring-offset-2' : ''}`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={url}
                          alt={`이미지 ${i + 1}`}
                          className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                        />
                        {i === 0 && (
                          <span className="absolute bottom-0 left-0 right-0 bg-[#1B3B2F] text-white text-[9px] text-center py-0.5 rounded-b-lg">
                            커버
                          </span>
                        )}
                        <button
                          onClick={() => removeImage(i)}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          &times;
                        </button>
                        <span className="absolute top-0.5 left-0.5 bg-black/60 text-white text-[9px] px-1 rounded">
                          {i + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {form.images.length > 1 && (
                  <p className="text-xs text-gray-400 mb-2">드래그하여 순서를 변경할 수 있습니다. 첫 번째 이미지가 커버로 사용됩니다.</p>
                )}

                {/* Drop zone */}
                {form.images.length < MAX_IMAGES && (
                  <div
                    ref={dropZoneRef}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragEnter={(e) => { e.preventDefault(); dropZoneRef.current?.classList.add('border-[#1B3B2F]', 'bg-green-50') }}
                    onDragLeave={(e) => { e.preventDefault(); dropZoneRef.current?.classList.remove('border-[#1B3B2F]', 'bg-green-50') }}
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-[#1B3B2F] hover:bg-green-50 transition-colors"
                  >
                    <div className="text-gray-400 text-sm">
                      <p className="font-medium text-gray-600">클릭하거나 이미지를 드래그하세요</p>
                      <p className="text-xs mt-1">JPG, PNG, WebP, GIF (최대 {MAX_IMAGES - form.images.length}장 추가 가능)</p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      multiple
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </div>
                )}

                {uploading && (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-4 h-4 border-2 border-[#1B3B2F] border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs text-gray-500">업로드 중...</span>
                  </div>
                )}

                {form.images.length >= MAX_IMAGES && (
                  <p className="text-xs text-amber-600 mt-2">최대 {MAX_IMAGES}장까지 업로드할 수 있습니다.</p>
                )}
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">표시 순서</label>
                  <input
                    type="number"
                    value={form.display_order}
                    onChange={(e) => setForm(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3B2F]"
                  />
                </div>
                <div className="flex items-end pb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.visible}
                      onChange={(e) => setForm(prev => ({ ...prev, visible: e.target.checked }))}
                      className="w-4 h-4 accent-[#1B3B2F]"
                    />
                    <span className="text-sm text-gray-700">노출</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 text-sm text-white bg-[#1B3B2F] hover:bg-[#15302A] rounded-lg transition-colors disabled:opacity-50"
              >
                {saving ? '저장 중...' : '저장'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
