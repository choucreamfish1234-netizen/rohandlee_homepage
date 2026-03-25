'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface PaidConsultation {
  id: number
  name: string
  phone: string
  email: string | null
  amount: number
  payment_method: string | null
  product_option: string | null
  paid_at: string
  status: string
  callback_status: string
  callback_at: string | null
  canceled_reason: string | null
  forms: { question: string; answer: string }[] | null
  agreements: { question: string; answer: boolean }[] | null
  notes: string | null
  raw_data: Record<string, unknown> | null
  created_at: string
}

function formatDateTime(d: string | null): string {
  if (!d) return ''
  const date = new Date(d)
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const h = String(date.getHours()).padStart(2, '0')
  const min = String(date.getMinutes()).padStart(2, '0')
  return `${y}.${m}.${day} ${h}:${min}`
}

function formatAmount(amount: number): string {
  return amount.toLocaleString('ko-KR') + '원'
}

function getCallbackStatusStyle(status: string): { bg: string; text: string } {
  switch (status) {
    case '회신대기':
      return { bg: 'bg-yellow-50', text: 'text-yellow-700' }
    case '회신완료':
      return { bg: 'bg-emerald-50', text: 'text-emerald-700' }
    case '결제취소':
      return { bg: 'bg-red-50', text: 'text-red-700' }
    default:
      return { bg: 'bg-gray-100', text: 'text-gray-600' }
  }
}

export default function AdminPaidConsultationsPage() {
  const router = useRouter()
  const [items, setItems] = useState<PaidConsultation[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null)
  const [noteInput, setNoteInput] = useState('')
  const [selected, setSelected] = useState<PaidConsultation | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('admin_authenticated') !== 'true') {
      router.push('/admin')
      return
    }
    fetchItems()
  }, [router])

  const fetchItems = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from('paid_consultations')
      .select('*')
      .order('created_at', { ascending: false })
    setItems((data as PaidConsultation[]) || [])
    setLoading(false)
  }, [])

  const filtered = items.filter((c) => filter === 'all' || c.callback_status === filter)

  const stats = {
    waiting: items.filter((c) => c.callback_status === '회신대기').length,
    todayPayments: items.filter((c) => {
      const today = new Date()
      const paid = new Date(c.paid_at)
      return (
        paid.getFullYear() === today.getFullYear() &&
        paid.getMonth() === today.getMonth() &&
        paid.getDate() === today.getDate() &&
        c.status !== '결제취소'
      )
    }).length,
    monthRevenue: items
      .filter((c) => {
        const today = new Date()
        const paid = new Date(c.paid_at)
        return (
          paid.getFullYear() === today.getFullYear() &&
          paid.getMonth() === today.getMonth() &&
          c.status !== '결제취소'
        )
      })
      .reduce((sum, c) => sum + c.amount, 0),
  }

  async function handleCallback(id: number) {
    if (!confirm('회신완료로 변경하시겠습니까?')) return
    try {
      const res = await fetch('/api/paid-consultations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          callback_status: '회신완료',
          callback_at: new Date().toISOString(),
        }),
      })
      const data = await res.json()
      if (data.error) {
        alert('변경 실패: ' + data.error)
        return
      }
    } catch {
      alert('변경에 실패했습니다.')
      return
    }
    fetchItems()
    if (selected?.id === id) setSelected(null)
  }

  async function handleSaveNote(id: number) {
    try {
      const res = await fetch('/api/paid-consultations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, notes: noteInput }),
      })
      const data = await res.json()
      if (data.error) {
        alert('메모 저장 실패: ' + data.error)
        return
      }
    } catch {
      alert('메모 저장에 실패했습니다.')
      return
    }
    setEditingNoteId(null)
    setNoteInput('')
    fetchItems()
  }

  async function handleDelete(id: number) {
    if (!confirm('정말 삭제하시겠습니까?')) return
    try {
      const res = await fetch('/api/paid-consultations', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      const data = await res.json()
      if (data.error) {
        alert('삭제 실패: ' + data.error)
        return
      }
    } catch {
      alert('삭제에 실패했습니다.')
      return
    }
    if (selected?.id === id) setSelected(null)
    fetchItems()
  }

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Navigation Tabs */}
      <div className="flex items-center gap-6 mb-6 border-b border-gray-200 pb-3">
        <Link
          href="/admin/dashboard"
          className="text-sm text-gray-500 hover:text-[#1B3B2F] transition-colors pb-3 -mb-3"
        >
          블로그 관리
        </Link>
        <Link
          href="/admin/consultations"
          className="text-sm text-gray-500 hover:text-[#1B3B2F] transition-colors pb-3 -mb-3"
        >
          상담 관리
        </Link>
        <span className="text-sm font-semibold text-[#1B3B2F] border-b-2 border-[#1B3B2F] pb-3 -mb-3">
          유료 상담
        </span>
        <Link
          href="/admin/press"
          className="text-sm text-gray-500 hover:text-[#1B3B2F] transition-colors pb-3 -mb-3"
        >
          언론보도
        </Link>
        <Link
          href="/admin/seo"
          className="text-sm text-gray-500 hover:text-[#1B3B2F] transition-colors pb-3 -mb-3"
        >
          SEO 관리
        </Link>
        <Link
          href="/admin/analytics"
          className="text-sm text-gray-500 hover:text-[#1B3B2F] transition-colors pb-3 -mb-3"
        >
          방문자 분석
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-black">유료 상담 관리</h1>
          <p className="text-sm text-gray-500 mt-1">래피드(Latpeed) 결제 및 구글 폼 접수 상담을 관리합니다.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => { sessionStorage.removeItem('admin_authenticated'); router.push('/admin') }}
            className="px-4 py-2.5 border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            로그아웃
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="p-5 border border-gray-100 bg-white">
          <p className="text-xs text-gray-400 mb-1">회신대기</p>
          <p className="text-2xl font-bold text-red-600">{stats.waiting}건</p>
        </div>
        <div className="p-5 border border-gray-100 bg-white">
          <p className="text-xs text-gray-400 mb-1">오늘 결제</p>
          <p className="text-2xl font-bold text-blue-600">{stats.todayPayments}건</p>
        </div>
        <div className="p-5 border border-gray-100 bg-white">
          <p className="text-xs text-gray-400 mb-1">이번 달 매출</p>
          <p className="text-2xl font-bold text-emerald-600">{formatAmount(stats.monthRevenue)}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { value: 'all', label: '전체' },
          { value: '회신대기', label: '회신대기' },
          { value: '회신완료', label: '회신완료' },
          { value: '결제취소', label: '결제취소' },
        ].map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === f.value ? 'bg-[#1B3B2F] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Card List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="animate-pulse h-28 bg-gray-50 border border-gray-100 rounded-xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-sm">유료 상담 내역이 없습니다.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((c) => {
            const ss = getCallbackStatusStyle(c.callback_status)
            return (
              <div
                key={c.id}
                className={`border border-gray-100 bg-white rounded-xl p-5 hover:shadow-sm transition-shadow ${
                  c.callback_status === '결제취소' ? 'opacity-60' : ''
                }`}
              >
                {/* Row 1: Name + Source Badge */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base font-semibold text-black">{c.name}</span>
                  {c.status === '폼접수' ? (
                    <span className="text-[10px] px-1.5 py-0.5 bg-blue-50 text-blue-600 font-medium rounded">폼접수</span>
                  ) : (
                    <span className="text-[10px] px-1.5 py-0.5 bg-emerald-50 text-emerald-600 font-medium rounded">래피드</span>
                  )}
                </div>

                {/* Row 2: Phone | Email */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <span>{c.phone}</span>
                  <span className="text-gray-300">|</span>
                  <span className="truncate">{c.email || '-'}</span>
                </div>

                {/* Row 3: Amount | Option | Date */}
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <span className="font-medium text-black">{formatAmount(c.amount)}</span>
                  <span className="text-gray-300">|</span>
                  <span>{c.product_option || '-'}</span>
                  <span className="text-gray-300">|</span>
                  <span>{formatDateTime(c.paid_at)}</span>
                </div>

                {/* Row 4: Status + Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`inline-block text-xs px-2 py-0.5 rounded ${ss.bg} ${ss.text}`}>
                      {c.callback_status}
                    </span>
                    {c.callback_at && (
                      <span className="text-xs text-gray-400">{formatDateTime(c.callback_at)}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {c.callback_status === '회신대기' && (
                      <button
                        onClick={() => handleCallback(c.id)}
                        className="text-xs px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded transition-colors"
                      >
                        회신완료
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setEditingNoteId(c.id)
                        setNoteInput(c.notes || '')
                      }}
                      className="text-xs px-3 py-1.5 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded transition-colors"
                    >
                      메모
                    </button>
                    <button
                      onClick={() => setSelected(c)}
                      className="text-xs px-3 py-1.5 bg-[#1B3B2F] text-white hover:bg-[#152e24] rounded transition-colors"
                    >
                      상세보기
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="text-xs px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded transition-colors"
                    >
                      삭제
                    </button>
                  </div>
                </div>

                {/* Inline note display */}
                {c.notes && editingNoteId !== c.id && (
                  <div className="mt-3 px-3 py-2 bg-yellow-50 text-xs text-yellow-800 rounded-lg">
                    {c.notes}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Note Edit Modal */}
      {editingNoteId !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => { setEditingNoteId(null); setNoteInput('') }} />
          <div className="relative w-full max-w-md bg-white shadow-2xl rounded-xl p-6">
            <h3 className="text-sm font-semibold text-black mb-3">메모 작성</h3>
            <textarea
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              placeholder="메모를 입력하세요..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-[#1B3B2F] transition-colors resize-none"
              autoFocus
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => { setEditingNoteId(null); setNoteInput('') }}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                onClick={() => handleSaveNote(editingNoteId)}
                className="px-4 py-2 text-sm bg-[#1B3B2F] text-white hover:bg-[#152e24] transition-colors"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelected(null)} />
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl rounded-xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10 rounded-t-xl">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold text-black">상담 상세 정보</h2>
                {selected.status === '폼접수' ? (
                  <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 font-medium rounded">폼접수</span>
                ) : (
                  <span className="text-xs px-2 py-0.5 bg-emerald-50 text-emerald-600 font-medium rounded">래피드</span>
                )}
                <span className={`text-xs px-2 py-0.5 rounded ${getCallbackStatusStyle(selected.callback_status).bg} ${getCallbackStatusStyle(selected.callback_status).text}`}>
                  {selected.callback_status}
                </span>
              </div>
              <button onClick={() => setSelected(null)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M4 4L12 12M12 4L4 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="text-sm font-semibold text-black mb-3">기본 정보</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-2"><span className="text-gray-400 w-20 shrink-0">이름</span><span className="text-black font-medium">{selected.name}</span></div>
                  <div className="flex gap-2"><span className="text-gray-400 w-20 shrink-0">연락처</span><a href={`tel:${selected.phone}`} className="text-[#1B3B2F] font-medium">{selected.phone}</a></div>
                  <div className="flex gap-2"><span className="text-gray-400 w-20 shrink-0">이메일</span><span className="text-black">{selected.email || '미등록'}</span></div>
                  <div className="flex gap-2"><span className="text-gray-400 w-20 shrink-0">결제금액</span><span className="text-black font-medium">{formatAmount(selected.amount)}</span></div>
                  <div className="flex gap-2"><span className="text-gray-400 w-20 shrink-0">결제수단</span><span className="text-black">{selected.payment_method || '-'}</span></div>
                  <div className="flex gap-2"><span className="text-gray-400 w-20 shrink-0">상품옵션</span><span className="text-black">{selected.product_option || '-'}</span></div>
                  <div className="flex gap-2"><span className="text-gray-400 w-20 shrink-0">접수일시</span><span className="text-black">{formatDateTime(selected.created_at)}</span></div>
                  <div className="flex gap-2"><span className="text-gray-400 w-20 shrink-0">출처</span><span className="text-black">{selected.status === '폼접수' ? '구글 폼' : '래피드 결제'}</span></div>
                  {selected.callback_at && (
                    <div className="flex gap-2"><span className="text-gray-400 w-20 shrink-0">회신일시</span><span className="text-black">{formatDateTime(selected.callback_at)}</span></div>
                  )}
                  {selected.canceled_reason && (
                    <div className="flex gap-2"><span className="text-gray-400 w-20 shrink-0">취소사유</span><span className="text-red-600">{selected.canceled_reason}</span></div>
                  )}
                </div>
              </div>

              {/* Google Form Responses from raw_data */}
              {Array.isArray(selected.raw_data?.formResponses) && (
                <div>
                  <h3 className="text-sm font-semibold text-black mb-3">상담 내용</h3>
                  <div className="space-y-2">
                    {(selected.raw_data.formResponses as { question: string; answer: string }[]).map((r, i) => (
                      <div key={i} className="p-3 bg-gray-50 rounded-lg text-sm">
                        <p className="text-xs text-gray-400 mb-1">{r.question}</p>
                        <p className="text-black whitespace-pre-wrap">{r.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Latpeed Forms */}
              {selected.forms && selected.forms.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-black mb-3">추가 정보</h3>
                  <div className="space-y-2">
                    {selected.forms.map((f, i) => (
                      <div key={i} className="p-3 bg-gray-50 rounded-lg text-sm">
                        <p className="text-xs text-gray-400 mb-1">{f.question}</p>
                        <p className="text-black">{f.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Raw Data (Latpeed payment details) */}
              {selected.raw_data && !Array.isArray(selected.raw_data.formResponses) && selected.status !== '폼접수' && (
                <div>
                  <h3 className="text-sm font-semibold text-black mb-3">결제 상세 데이터</h3>
                  <div className="space-y-2 text-sm">
                    {Object.entries(selected.raw_data)
                      .filter(([key]) => !['formResponses', 'googleFormSubmittedAt'].includes(key))
                      .map(([key, value]) => (
                        <div key={key} className="flex gap-2">
                          <span className="text-gray-400 w-28 shrink-0 text-xs">{key}</span>
                          <span className="text-black text-xs break-all">{typeof value === 'object' ? JSON.stringify(value) : String(value ?? '')}</span>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {selected.notes && (
                <div>
                  <h3 className="text-sm font-semibold text-black mb-3">메모</h3>
                  <div className="p-3 bg-yellow-50 text-sm text-yellow-800 rounded-lg">{selected.notes}</div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                {selected.callback_status === '회신대기' && (
                  <button
                    onClick={() => handleCallback(selected.id)}
                    className="px-6 py-2.5 bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 rounded-lg transition-colors"
                  >
                    회신완료
                  </button>
                )}
                <button
                  onClick={() => {
                    setEditingNoteId(selected.id)
                    setNoteInput(selected.notes || '')
                  }}
                  className="px-6 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 rounded-lg transition-colors"
                >
                  메모 작성
                </button>
                <button
                  onClick={() => setSelected(null)}
                  className="px-6 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 rounded-lg transition-colors ml-auto"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
