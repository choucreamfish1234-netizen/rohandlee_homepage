'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Webtoon {
  id: string
  title: string
  description: string | null
  image_url: string | null
  link_url: string | null
  display_order: number
  visible: boolean
  created_at: string
}

type FormData = {
  title: string
  description: string
  link_url: string
  image_url: string | null
  display_order: number
  visible: boolean
}

const emptyForm: FormData = {
  title: '',
  description: '',
  link_url: '',
  image_url: null,
  display_order: 0,
  visible: true,
}

export default function AdminWebtoonPage() {
  const router = useRouter()
  const [webtoons, setWebtoons] = useState<Webtoon[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormData>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

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

  const openAddModal = () => {
    setEditingId(null)
    setForm(emptyForm)
    setImagePreview(null)
    setModalOpen(true)
  }

  const openEditModal = (item: Webtoon) => {
    setEditingId(item.id)
    setForm({
      title: item.title,
      description: item.description || '',
      link_url: item.link_url || '',
      image_url: item.image_url,
      display_order: item.display_order,
      visible: item.visible,
    })
    setImagePreview(item.image_url)
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
        image_url: form.image_url,
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new globalThis.FormData()
      formData.append('file', file)
      const res = await fetch('/api/webtoon/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.url) {
        setForm(prev => ({ ...prev, image_url: data.url }))
        setImagePreview(data.url)
      } else {
        alert(data.error || '업로드 실패')
      }
    } catch {
      alert('이미지 업로드에 실패했습니다.')
    }
    setUploading(false)
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
                <th className="px-4 py-3 w-16 text-center">순서</th>
                <th className="px-4 py-3 w-16 text-center">노출</th>
                <th className="px-4 py-3 w-32 text-center">관리</th>
              </tr>
            </thead>
            <tbody>
              {webtoons.map((item) => (
                <tr key={item.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {item.image_url ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={item.image_url} alt="" className="w-12 h-12 object-cover rounded" />
                    ) : (
                      <div className="w-12 h-12 bg-[#1B3B2F] rounded flex items-center justify-center">
                        <span className="text-[8px] text-white font-bold">TOON</span>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-700 font-medium">{item.title}</td>
                  <td className="px-4 py-3 text-gray-500 max-w-xs truncate">{item.description || '-'}</td>
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
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">대표 이미지</label>
                {imagePreview && (
                  <div className="mb-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imagePreview} alt="미리보기" className="w-full aspect-square object-cover rounded-lg" />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleImageUpload}
                  className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                />
                {uploading && <p className="text-xs text-gray-400 mt-1">업로드 중...</p>}
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
