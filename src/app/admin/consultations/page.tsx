'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface Consultation {
  id: number
  name: string
  phone: string
  email: string | null
  category: string | null
  content: string | null
  status: string
  grade: string | null
  ai_analysis: {
    case_category?: string
    case_subcategory?: string
    urgency?: string
    statute_of_limitations?: string
    estimated_fee_range?: string
    key_issues?: string[]
    recommended_action?: string
    grade_reason?: string
    email_subject?: string
  } | null
  email_draft: string | null
  email_sent_at: string | null
  called_at: string | null
  notes: string | null
  assigned_to: string | null
  created_at: string
  privacy_consent?: boolean
}

const gradeStyles: Record<string, { bg: string; text: string }> = {
  A: { bg: 'bg-red-50', text: 'text-red-700' },
  B: { bg: 'bg-orange-50', text: 'text-orange-700' },
  C: { bg: 'bg-emerald-50', text: 'text-emerald-700' },
  D: { bg: 'bg-gray-100', text: 'text-gray-600' },
}

const STATUS_OPTIONS = [
  { value: 'new', label: '신규접수' },
  { value: 'analyzed', label: '분석완료' },
  { value: 'sent', label: '이메일발송' },
  { value: 'called', label: '전화완료' },
  { value: 'retained', label: '수임완료' },
  { value: 'hold', label: '보류' },
  { value: 'closed', label: '종결' },
]

function getStatusLabel(status: string): string {
  const found = STATUS_OPTIONS.find((o) => o.value === status)
  return found ? found.label : status
}

function getStatusStyle(status: string): { bg: string; text: string } {
  const styles: Record<string, { bg: string; text: string }> = {
    new: { bg: 'bg-red-50', text: 'text-red-700' },
    analyzed: { bg: 'bg-yellow-50', text: 'text-yellow-700' },
    sent: { bg: 'bg-emerald-50', text: 'text-emerald-700' },
    called: { bg: 'bg-blue-50', text: 'text-blue-700' },
    retained: { bg: 'bg-purple-50', text: 'text-purple-700' },
    hold: { bg: 'bg-orange-50', text: 'text-orange-700' },
    closed: { bg: 'bg-gray-100', text: 'text-gray-600' },
  }
  return styles[status] || { bg: 'bg-gray-100', text: 'text-gray-600' }
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

export default function AdminConsultationsPage() {
  const router = useRouter()
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')
  const [gradeFilter, setGradeFilter] = useState<string>('all')
  const [analyzing, setAnalyzing] = useState<number | null>(null)
  const [selected, setSelected] = useState<Consultation | null>(null)
  const [emailSubject, setEmailSubject] = useState('')
  const [emailBody, setEmailBody] = useState('')
  const [sending, setSending] = useState(false)
  const [notes, setNotes] = useState('')
  const [statusEditId, setStatusEditId] = useState<number | null>(null)
  const [customStatusInput, setCustomStatusInput] = useState('')
  const [showCustomInput, setShowCustomInput] = useState(false)
  const statusDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('admin_authenticated') !== 'true') {
      router.push('/admin')
      return
    }
    fetchConsultations()
  }, [router])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(e.target as Node)) {
        setStatusEditId(null)
        setShowCustomInput(false)
        setCustomStatusInput('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const fetchConsultations = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from('consultations')
      .select('*')
      .order('created_at', { ascending: false })
    setConsultations((data as Consultation[]) || [])
    setLoading(false)
  }, [])

  // "미발송" = email_sent_at이 null이고 전화완료가 아닌 건
  const isUnsent = (c: Consultation) => !c.email_sent_at && c.status !== 'called'

  const stats = {
    new: consultations.filter(isUnsent).length,
    analyzed: consultations.filter((c) => c.status === 'analyzed').length,
    sent: consultations.filter((c) => c.status === 'sent').length,
    called: consultations.filter((c) => c.status === 'called').length,
  }

  // 항상 접수일자(created_at) 최신순 정렬
  const filtered = consultations
    .filter((c) => filter === 'all' || (filter === 'new' ? isUnsent(c) : c.status === filter))
    .filter((c) => gradeFilter === 'all' || c.grade === gradeFilter)

  async function handleAnalyze(id: number) {
    setAnalyzing(id)
    try {
      const res = await fetch('/api/analyze-consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ consultationId: id }),
      })
      const data = await res.json()
      if (data.error) {
        alert(data.error)
        return
      }
      await fetchConsultations()
      const refreshed = await supabase.from('consultations').select('*').eq('id', id).single()
      if (refreshed.data) openDetail(refreshed.data as Consultation)
    } catch {
      alert('AI 분석에 실패했습니다.')
    } finally {
      setAnalyzing(null)
    }
  }

  function openDetail(c: Consultation) {
    setSelected(c)
    setEmailSubject(
      c.ai_analysis?.email_subject ||
      (c.ai_analysis ? `[법률사무소 로앤이] ${c.name}님, 상담 신청 관련 안내드립니다` : '')
    )
    setEmailBody(c.email_draft || '')
    setNotes(c.notes || '')
  }

  async function handleSendEmail() {
    if (!selected || !emailBody.trim()) return
    if (!selected.email) {
      alert('의뢰인 이메일이 등록되지 않았습니다.')
      return
    }
    if (!confirm('이메일을 발송하시겠습니까?')) return
    setSending(true)
    try {
      const res = await fetch('/api/send-consultation-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          consultationId: selected.id,
          emailBody: emailBody.trim(),
          emailSubject: emailSubject.trim(),
        }),
      })
      const data = await res.json()
      if (data.error) {
        alert(data.error)
        return
      }
      alert('이메일이 발송되었습니다.')
      setSelected(null)
      fetchConsultations()
    } catch {
      alert('이메일 발송에 실패했습니다.')
    } finally {
      setSending(false)
    }
  }

  async function handleStatusChange(id: number, status: string) {
    try {
      // 먼저 상태만 변경
      const res = await fetch('/api/consultations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      })
      const data = await res.json()
      if (data.error) {
        alert('상태 변경에 실패했습니다: ' + data.error)
        return
      }
      // 전화완료인 경우 called_at 별도 업데이트 (실패해도 상태는 이미 변경됨)
      if (status === 'called') {
        try {
          await fetch('/api/consultations', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, called_at: new Date().toISOString() }),
          })
        } catch {
          // called_at 업데이트 실패해도 상태 변경은 유지
        }
      }
    } catch {
      alert('상태 변경에 실패했습니다.')
      return
    }
    setStatusEditId(null)
    setShowCustomInput(false)
    setCustomStatusInput('')
    fetchConsultations()
    if (selected?.id === id) setSelected(null)
  }

  async function handleDelete(id: number) {
    if (!confirm('정말 삭제하시겠습니까?')) return
    try {
      const res = await fetch('/api/consultations', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      const data = await res.json()
      if (data.error) {
        alert('삭제에 실패했습니다: ' + data.error)
        return
      }
    } catch {
      alert('삭제에 실패했습니다.')
      return
    }
    if (selected?.id === id) setSelected(null)
    fetchConsultations()
  }

  async function handleSaveNotes() {
    if (!selected) return
    try {
      const res = await fetch('/api/consultations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selected.id, notes }),
      })
      const data = await res.json()
      if (data.error) {
        alert('메모 저장에 실패했습니다: ' + data.error)
        return
      }
    } catch {
      alert('메모 저장에 실패했습니다.')
      return
    }
    fetchConsultations()
  }

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  function renderStatusWithTimestamp(c: Consultation) {
    const parts: string[] = []
    if (c.email_sent_at) {
      parts.push(`이메일 발송 (${formatDateTime(c.email_sent_at)})`)
    }
    if (c.called_at) {
      parts.push(`전화완료 (${formatDateTime(c.called_at)})`)
    }
    if (parts.length > 0) {
      return (
        <div className="space-y-0.5">
          {parts.map((p, i) => (
            <p key={i} className="text-xs text-gray-500">{p}</p>
          ))}
        </div>
      )
    }
    return null
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
        <span className="text-sm font-semibold text-[#1B3B2F] border-b-2 border-[#1B3B2F] pb-3 -mb-3">
          상담 관리
        </span>
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
          <h1 className="text-2xl font-bold text-black">상담 관리</h1>
          <p className="text-sm text-gray-500 mt-1">AI 분석으로 상담을 효율적으로 관리하세요.</p>
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

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: '미발송', value: stats.new, color: 'text-red-600', key: 'new' },
          { label: '분석 완료', value: stats.analyzed, color: 'text-yellow-600', key: 'analyzed' },
          { label: '발송 완료', value: stats.sent, color: 'text-emerald-600', key: 'sent' },
          { label: '전화 완료', value: stats.called, color: 'text-blue-600', key: 'called' },
        ].map((stat) => (
          <button
            key={stat.key}
            onClick={() => setFilter(filter === stat.key ? 'all' : stat.key)}
            className={`p-5 border bg-white text-left transition-colors ${
              filter === stat.key ? 'border-[#1B3B2F]' : 'border-gray-100 hover:border-gray-200'
            }`}
          >
            <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="text-xs text-gray-400 py-1.5">등급:</span>
        {['all', 'A', 'B', 'C', 'D'].map((g) => (
          <button
            key={g}
            onClick={() => setGradeFilter(g)}
            className={`px-3 py-1.5 text-xs font-medium transition-colors ${
              gradeFilter === g ? 'bg-[#1B3B2F] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {g === 'all' ? '전체' : `${g}등급`}
          </button>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="animate-pulse h-16 bg-gray-50 border border-gray-100" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-sm">상담 내역이 없습니다.</p>
        </div>
      ) : (
        <div className="border border-gray-100 divide-y divide-gray-100 bg-white">
          {/* Table Header */}
          <div className="hidden sm:grid sm:grid-cols-12 gap-4 px-5 py-3 bg-gray-50 text-xs font-medium text-gray-500">
            <div className="col-span-1">등급</div>
            <div className="col-span-2">이름</div>
            <div className="col-span-2">연락처</div>
            <div className="col-span-1">유형</div>
            <div className="col-span-2">접수일</div>
            <div className="col-span-2">상태</div>
            <div className="col-span-2 text-right">액션</div>
          </div>

          {filtered.map((c) => {
            const gs = c.grade ? gradeStyles[c.grade] : null
            const ss = getStatusStyle(c.status)
            return (
              <div
                key={c.id}
                className={`grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 px-5 py-4 hover:bg-gray-50 transition-colors items-center ${
                  c.grade === 'A' ? 'bg-red-50/30' : ''
                }`}
              >
                <div className="col-span-1">
                  {gs ? (
                    <span className={`inline-block text-xs font-bold px-2.5 py-1 ${gs.bg} ${gs.text}`}>
                      {c.grade}
                    </span>
                  ) : (
                    <span className="text-xs text-gray-300">-</span>
                  )}
                </div>
                <div className="col-span-2">
                  <button onClick={() => openDetail(c)} className="text-sm font-medium text-black hover:text-[#1B3B2F] transition-colors text-left">
                    {c.name}
                  </button>
                  <p className="text-xs text-gray-400 sm:hidden mt-0.5">
                    {c.category} · {getStatusLabel(c.status)}
                  </p>
                </div>
                <div className="col-span-2 hidden sm:block text-sm text-gray-600">{c.phone}</div>
                <div className="col-span-1 hidden sm:block text-xs text-gray-600">{c.category || '-'}</div>
                <div className="col-span-2 hidden sm:block text-xs text-gray-400">{formatDate(c.created_at)}</div>
                <div className="col-span-2 hidden sm:block relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setStatusEditId(statusEditId === c.id ? null : c.id)
                      setShowCustomInput(false)
                      setCustomStatusInput('')
                    }}
                    className={`inline-block text-xs px-2 py-0.5 cursor-pointer hover:ring-1 hover:ring-gray-300 ${ss.bg} ${ss.text}`}
                    title="클릭하여 상태 변경"
                  >
                    {getStatusLabel(c.status)}
                  </button>
                  {renderStatusWithTimestamp(c)}
                  {statusEditId === c.id && (
                    <div ref={statusDropdownRef} className="absolute z-50 top-full left-0 mt-1 bg-white border border-gray-200 shadow-lg py-1 min-w-[160px]">
                      {STATUS_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => handleStatusChange(c.id, opt.value)}
                          className={`block w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 ${
                            c.status === opt.value ? 'font-bold text-[#1B3B2F]' : 'text-gray-700'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        {!showCustomInput ? (
                          <button
                            onClick={() => setShowCustomInput(true)}
                            className="block w-full text-left px-3 py-1.5 text-xs text-gray-400 hover:bg-gray-50"
                          >
                            직접 입력...
                          </button>
                        ) : (
                          <div className="px-2 py-1">
                            <input
                              type="text"
                              value={customStatusInput}
                              onChange={(e) => setCustomStatusInput(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && customStatusInput.trim()) {
                                  handleStatusChange(c.id, customStatusInput.trim())
                                }
                              }}
                              placeholder="상태 입력"
                              className="w-full px-2 py-1 text-xs border border-gray-200 focus:outline-none focus:border-[#1B3B2F]"
                              autoFocus
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className="col-span-2 flex justify-end gap-2">
                  {!c.ai_analysis && (
                    <button
                      onClick={() => handleAnalyze(c.id)}
                      disabled={analyzing === c.id}
                      className="text-xs px-3 py-1.5 bg-purple-50 text-purple-700 hover:bg-purple-100 disabled:opacity-50 transition-colors"
                    >
                      {analyzing === c.id ? '분석 중...' : 'AI 분석'}
                    </button>
                  )}
                  <button
                    onClick={() => openDetail(c)}
                    className="text-xs px-3 py-1.5 bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    상세
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="text-xs px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                  >
                    삭제
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelected(null)} />
          <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold text-black">{selected.name}님 상담</h2>
                {selected.grade && (
                  <span className={`text-sm font-bold px-3 py-1 ${gradeStyles[selected.grade]?.bg} ${gradeStyles[selected.grade]?.text}`}>
                    {selected.grade}등급
                  </span>
                )}
                <span className={`text-xs px-2 py-0.5 ${getStatusStyle(selected.status).bg} ${getStatusStyle(selected.status).text}`}>
                  {getStatusLabel(selected.status)}
                </span>
              </div>
              <button onClick={() => setSelected(null)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M4 4L12 12M12 4L4 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
              {/* Left: Consultation Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-black mb-3">의뢰인 정보</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex gap-2"><span className="text-gray-400 w-16 shrink-0">이름</span><span className="text-black font-medium">{selected.name}</span></div>
                    <div className="flex gap-2"><span className="text-gray-400 w-16 shrink-0">연락처</span><a href={`tel:${selected.phone}`} className="text-[#1B3B2F] font-medium">{selected.phone}</a></div>
                    <div className="flex gap-2"><span className="text-gray-400 w-16 shrink-0">이메일</span><span className="text-black">{selected.email || '미등록'}</span></div>
                    <div className="flex gap-2"><span className="text-gray-400 w-16 shrink-0">유형</span><span className="text-black">{selected.category || '-'}</span></div>
                    <div className="flex gap-2"><span className="text-gray-400 w-16 shrink-0">접수일</span><span className="text-black">{formatDate(selected.created_at)}</span></div>
                  </div>
                </div>

                {/* Status timestamps */}
                {(selected.email_sent_at || selected.called_at) && (
                  <div>
                    <h3 className="text-sm font-semibold text-black mb-3">처리 이력</h3>
                    <div className="space-y-1.5 text-sm">
                      {selected.email_sent_at && (
                        <div className="flex gap-2">
                          <span className="text-gray-400 w-20 shrink-0">이메일 발송</span>
                          <span className="text-black">{formatDateTime(selected.email_sent_at)}</span>
                        </div>
                      )}
                      {selected.called_at && (
                        <div className="flex gap-2">
                          <span className="text-gray-400 w-20 shrink-0">전화 완료</span>
                          <span className="text-black">{formatDateTime(selected.called_at)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-semibold text-black mb-3">상담 내용</h3>
                  <div className="p-4 bg-gray-50 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selected.content || '내용 없음'}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <h3 className="text-sm font-semibold text-black mb-3">변호사 메모</h3>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="내부 메모를 입력하세요..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-[#1B3B2F] transition-colors resize-none"
                  />
                  <button
                    onClick={handleSaveNotes}
                    className="mt-2 text-xs text-[#1B3B2F] font-medium hover:underline"
                  >
                    메모 저장
                  </button>
                </div>
              </div>

              {/* Right: AI Analysis */}
              <div className="space-y-6">
                {selected.ai_analysis ? (
                  <>
                    <div>
                      <h3 className="text-sm font-semibold text-black mb-3">AI 분석 결과</h3>
                      <div className="space-y-3">
                        {selected.ai_analysis.grade_reason && (
                          <div className="p-3 bg-yellow-50 border border-yellow-100 text-sm text-yellow-800">
                            {selected.ai_analysis.grade_reason}
                          </div>
                        )}
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="p-3 bg-gray-50">
                            <span className="text-xs text-gray-400">사건 분류</span>
                            <p className="font-medium text-black mt-0.5">
                              {selected.ai_analysis.case_category}
                              {selected.ai_analysis.case_subcategory && ` / ${selected.ai_analysis.case_subcategory}`}
                            </p>
                          </div>
                          <div className="p-3 bg-gray-50">
                            <span className="text-xs text-gray-400">긴급도</span>
                            <p className={`font-medium mt-0.5 ${
                              selected.ai_analysis.urgency === '높음' ? 'text-red-600' : selected.ai_analysis.urgency === '보통' ? 'text-yellow-600' : 'text-gray-600'
                            }`}>{selected.ai_analysis.urgency}</p>
                          </div>
                          <div className="p-3 bg-gray-50">
                            <span className="text-xs text-gray-400">공소시효</span>
                            <p className="font-medium text-black mt-0.5">{selected.ai_analysis.statute_of_limitations}</p>
                          </div>
                          <div className="p-3 bg-gray-50">
                            <span className="text-xs text-gray-400">예상 수임료</span>
                            <p className="font-medium text-black mt-0.5">{selected.ai_analysis.estimated_fee_range}</p>
                          </div>
                        </div>
                        {selected.ai_analysis.key_issues && selected.ai_analysis.key_issues.length > 0 && (
                          <div className="p-3 bg-gray-50">
                            <span className="text-xs text-gray-400">핵심 쟁점</span>
                            <ul className="mt-1 space-y-1">
                              {selected.ai_analysis.key_issues.map((issue, i) => (
                                <li key={i} className="text-sm text-black flex items-start gap-2">
                                  <span className="w-1 h-1 bg-[#1B3B2F] rounded-full mt-2 shrink-0" />
                                  {issue}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <div className="p-3 bg-gray-50">
                          <span className="text-xs text-gray-400">권장 조치</span>
                          <p className="font-medium text-black mt-0.5">{selected.ai_analysis.recommended_action}</p>
                        </div>
                        {selected.assigned_to && (
                          <div className="p-3 bg-[#1B3B2F]/5">
                            <span className="text-xs text-gray-400">담당 변호사</span>
                            <p className="font-medium text-[#1B3B2F] mt-0.5">{selected.assigned_to}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-sm text-gray-400 mb-4">아직 AI 분석이 수행되지 않았습니다.</p>
                    <button
                      onClick={() => handleAnalyze(selected.id)}
                      disabled={analyzing === selected.id}
                      className="px-6 py-2.5 bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 disabled:opacity-50 transition-colors"
                    >
                      {analyzing === selected.id ? '분석 중...' : 'AI 분석 실행'}
                    </button>
                  </div>
                )}

                {/* Email Draft */}
                {selected.ai_analysis && (
                  <div>
                    <h3 className="text-sm font-semibold text-black mb-3">이메일 초안</h3>
                    <input
                      type="text"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      placeholder="이메일 제목"
                      className="w-full px-4 py-2.5 border border-gray-200 text-sm mb-3 focus:outline-none focus:border-[#1B3B2F] transition-colors"
                    />
                    <textarea
                      value={emailBody}
                      onChange={(e) => setEmailBody(e.target.value)}
                      rows={10}
                      className="w-full px-4 py-3 border border-gray-200 text-sm font-mono leading-relaxed focus:outline-none focus:border-[#1B3B2F] transition-colors resize-y"
                    />
                    <div className="mt-4">
                      <button
                        onClick={handleSendEmail}
                        disabled={sending || !selected.email}
                        className="w-full py-3 bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 disabled:opacity-50 transition-colors"
                      >
                        {sending ? '발송 중...' : selected.email ? '이메일 발송' : '이메일 미등록'}
                      </button>
                    </div>
                  </div>
                )}

                {/* 전화완료 버튼 - 이메일 발송과 독립적으로 항상 표시 */}
                {selected.status !== 'called' && (
                  <div>
                    <button
                      onClick={() => handleStatusChange(selected.id, 'called')}
                      className="w-full py-3 bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      전화 완료로 표시
                    </button>
                  </div>
                )}

                {/* 삭제 버튼 */}
                <div className="pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handleDelete(selected.id)}
                    className="text-xs text-red-500 hover:text-red-700 transition-colors"
                  >
                    이 상담 삭제
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
