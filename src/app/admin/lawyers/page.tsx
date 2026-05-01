'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

interface Lawyer {
  id: string
  name: string
  title: string
  specialties: string | null
  description: string | null
  image_url: string | null
  is_representative: boolean
  display_order: number
  visible: boolean
  created_at: string
}

interface FormData {
  name: string
  title: string
  specialties: string
  description: string
  image_url: string
  is_representative: boolean
  display_order: number
  visible: boolean
}

const emptyForm: FormData = {
  name: '',
  title: '변호사',
  specialties: '',
  description: '',
  image_url: '',
  is_representative: false,
  display_order: 0,
  visible: true,
}

export default function AdminLawyersPage() {
  const router = useRouter()
  const [lawyers, setLawyers] = useState<Lawyer[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormData>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('admin_authenticated') !== 'true') {
      router.push('/admin')
      return
    }
    fetchLawyers()
  }, [router])

  const fetchLawyers = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/lawyers')
      const data = await res.json()
      if (Array.isArray(data)) setLawyers(data)
    } catch (e) {
      console.error('Failed to fetch lawyers:', e)
    }
    setLoading(false)
  }

  const openAddModal = () => {
    setEditingId(null)
    const nextOrder = lawyers.length > 0 ? Math.max(...lawyers.map((l) => l.display_order)) + 1 : 1
    setForm({ ...emptyForm, display_order: nextOrder })
    setModalOpen(true)
  }

  const openEditModal = (item: Lawyer) => {
    setEditingId(item.id)
    setForm({
      name: item.name,
      title: item.title,
      specialties: item.specialties || '',
      description: item.description || '',
      image_url: item.image_url || '',
      is_representative: item.is_representative,
      display_order: item.display_order,
      visible: item.visible,
    })
    setModalOpen(true)
  }

  const handleSave = async () => {
    if (!form.name.trim() || !form.title.trim()) {
      alert('이름과 직급은 필수입니다.')
      return
    }
    setSaving(true)
    try {
      const payload = {
        name: form.name.trim(),
        title: form.title.trim(),
        specialties: form.specialties.trim() || null,
        description: form.description.trim() || null,
        image_url: form.image_url.trim() || null,
        is_representative: form.is_representative,
        display_order: form.display_order,
        visible: form.visible,
      }

      const res = editingId
        ? await fetch('/api/lawyers', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: editingId, ...payload }),
          })
        : await fetch('/api/lawyers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })

      if (!res.ok) {
        const err = await res.json()
        alert(err.error || '저장 실패')
        return
      }
      setModalOpen(false)
      fetchLawyers()
    } catch (e) {
      console.error('Save error:', e)
      alert('저장 중 오류가 발생했습니다.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`"${name}" 변호사를 삭제하시겠습니까?`)) return
    try {
      await fetch('/api/lawyers', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      fetchLawyers()
    } catch (e) {
      console.error('Delete error:', e)
      alert('삭제 실패')
    }
  }

  const toggleVisible = async (item: Lawyer) => {
    try {
      await fetch('/api/lawyers', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item.id, visible: !item.visible }),
      })
      fetchLawyers()
    } catch (e) {
      console.error('Toggle error:', e)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/lawyers/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.url) {
        setForm((prev) => ({ ...prev, image_url: data.url }))
      } else {
        alert(data.error || '업로드 실패')
      }
    } catch (err) {
      console.error('Upload error:', err)
      alert('업로드 중 오류가 발생했습니다.')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Navigation Tabs */}
      <div className="flex items-center gap-6 mb-6 border-b border-gray-200 pb-3 overflow-x-auto">
        <Link href="/admin/dashboard" className="text-sm text-gray-500 hover:text-[#1B3B2F] transition-colors pb-3 -mb-3 whitespace-nowrap">
          블로그 관리
        </Link>
        <Link href="/admin/consultations" className="text-sm text-gray-500 hover:text-[#1B3B2F] transition-colors pb-3 -mb-3 whitespace-nowrap">
          상담 관리
        </Link>
        <Link href="/admin/paid-consultations" className="text-sm text-gray-500 hover:text-[#1B3B2F] transition-colors pb-3 -mb-3 whitespace-nowrap">
          유료 상담
        </Link>
        <Link href="/admin/press" className="text-sm text-gray-500 hover:text-[#1B3B2F] transition-colors pb-3 -mb-3 whitespace-nowrap">
          언론보도
        </Link>
        <Link href="/admin/webtoon" className="text-sm text-gray-500 hover:text-[#1B3B2F] transition-colors pb-3 -mb-3 whitespace-nowrap">
          인스타툰
        </Link>
        <span className="text-sm font-semibold text-[#1B3B2F] border-b-2 border-[#1B3B2F] pb-3 -mb-3 whitespace-nowrap">
          변호사 관리
        </span>
        <Link href="/admin/seo" className="text-sm text-gray-500 hover:text-[#1B3B2F] transition-colors pb-3 -mb-3 whitespace-nowrap">
          SEO 관리
        </Link>
        <Link href="/admin/analytics" className="text-sm text-gray-500 hover:text-[#1B3B2F] transition-colors pb-3 -mb-3 whitespace-nowrap">
          방문자 분석
        </Link>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-black">변호사 관리</h1>
          <p className="text-sm text-gray-500 mt-1">변호사 정보를 관리하고 메인 페이지에 노출하세요.</p>
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
      ) : lawyers.length === 0 ? (
        <p className="text-center text-gray-400 py-12">등록된 변호사가 없습니다.</p>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-500">
                <th className="px-4 py-3 w-16">사진</th>
                <th className="px-4 py-3">이름</th>
                <th className="px-4 py-3">직급</th>
                <th className="px-4 py-3">전문분야</th>
                <th className="px-4 py-3 w-20 text-center">대표</th>
                <th className="px-4 py-3 w-16 text-center">순서</th>
                <th className="px-4 py-3 w-20 text-center">노출</th>
                <th className="px-4 py-3 w-32 text-center">관리</th>
              </tr>
            </thead>
            <tbody>
              {lawyers.map((item) => (
                <tr key={item.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {item.image_url ? (
                      <Image src={item.image_url} alt={item.name} width={40} height={40} className="w-10 h-10 rounded-lg object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-[#1B3B2F] flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">{item.name.charAt(0)}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">{item.name}</td>
                  <td className="px-4 py-3 text-gray-600">{item.title}</td>
                  <td className="px-4 py-3 text-gray-500">{item.specialties || '-'}</td>
                  <td className="px-4 py-3 text-center">
                    {item.is_representative && (
                      <span className="inline-flex px-2 py-0.5 bg-[#1B3B2F] text-white text-xs rounded-full">대표</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-500">{item.display_order}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => toggleVisible(item)}
                      className={`w-10 h-5 rounded-full transition-colors relative ${item.visible ? 'bg-[#1B3B2F]' : 'bg-gray-300'}`}
                    >
                      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${item.visible ? 'left-5' : 'left-0.5'}`} />
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => openEditModal(item)} className="text-xs text-blue-600 hover:underline">수정</button>
                      <button onClick={() => handleDelete(item.id, item.name)} className="text-xs text-red-500 hover:underline">삭제</button>
                    </div>
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
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-lg font-bold text-black mb-6">
              {editingId ? '변호사 수정' : '변호사 추가'}
            </h2>

            <div className="space-y-4">
              {/* 이름 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이름 *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3B2F]"
                  placeholder="홍길동"
                />
              </div>

              {/* 직급 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">직급 *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3B2F]"
                  placeholder="대표변호사, 변호사, 파트너변호사 등"
                />
              </div>

              {/* 전문분야 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">전문분야</label>
                <input
                  type="text"
                  value={form.specialties}
                  onChange={(e) => setForm({ ...form, specialties: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3B2F]"
                  placeholder="성범죄·디지털성범죄·스토킹"
                />
              </div>

              {/* 소개글 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">소개글</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3B2F] resize-none"
                  placeholder="변호사 소개 한 줄"
                />
              </div>

              {/* 사진 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">사진</label>
                <div className="flex items-center gap-3">
                  {form.image_url ? (
                    <Image src={form.image_url} alt="미리보기" width={64} height={64} className="w-16 h-16 rounded-lg object-cover" />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                      없음
                    </div>
                  )}
                  <div className="flex-1">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                    >
                      {uploading ? '업로드 중...' : '파일 선택'}
                    </button>
                    {form.image_url && (
                      <button
                        onClick={() => setForm({ ...form, image_url: '' })}
                        className="ml-2 text-xs text-red-500 hover:underline"
                      >
                        삭제
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* 대표변호사 여부 */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="is_representative"
                  checked={form.is_representative}
                  onChange={(e) => setForm({ ...form, is_representative: e.target.checked })}
                  className="w-4 h-4 accent-[#1B3B2F]"
                />
                <label htmlFor="is_representative" className="text-sm text-gray-700">대표변호사</label>
              </div>

              {/* 표시 순서 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">표시 순서</label>
                <input
                  type="number"
                  value={form.display_order}
                  onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })}
                  className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3B2F]"
                />
              </div>

              {/* 노출 여부 */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="visible"
                  checked={form.visible}
                  onChange={(e) => setForm({ ...form, visible: e.target.checked })}
                  className="w-4 h-4 accent-[#1B3B2F]"
                />
                <label htmlFor="visible" className="text-sm text-gray-700">노출</label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 bg-[#1B3B2F] text-white rounded-lg text-sm font-medium hover:bg-[#15302A] disabled:opacity-50"
              >
                {saving ? '저장 중...' : editingId ? '수정' : '추가'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
