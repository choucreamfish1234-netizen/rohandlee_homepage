'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from 'recharts'

// Types
interface Competitor {
  id: number
  name: string
  url: string
  lawtalk_url: string | null
  speciality: string | null
  notes: string | null
  created_at: string
}

interface KeywordRow {
  id: number
  keyword: string
  category: string | null
  our_google_rank: number | null
  our_naver_rank: number | null
  search_volume: string | null
  difficulty: string | null
  trend: string | null
  checked_at: string
}

interface SeoChange {
  id: number
  page_path: string
  field_changed: string
  old_value: string | null
  new_value: string | null
  reason: string | null
  applied_at: string
}

interface AuditPage {
  path: string
  name: string
  score: number
  issues: string[]
  improvements: string[]
  title_feedback: string
  description_feedback: string
}

interface SeoAnalysis {
  id: number
  analysis_type: string
  data: Record<string, unknown>
  recommendations: unknown
  created_at: string
}

interface CompetitorAnalysis {
  overall_score: number
  summary: string
  vs_roandlee?: {
    competitor_strengths: string[]
    competitor_weaknesses: string[]
    our_advantages: string[]
  }
  actionable_improvements?: {
    priority: string
    action: string
    detail: string
  }[]
  title_analysis?: { text: string; score: number; keywords: string[]; feedback: string }
  meta_description_analysis?: { text: string; score: number; feedback: string }
  target_keywords?: string[]
}

type Tab = 'keywords' | 'competitors' | 'audit' | 'meta'

const DEFAULT_COMPETITORS = [
  { name: '법무법인 온강', url: 'https://ongang.co.kr', speciality: '성범죄 전문' },
  { name: '법무법인 도담', url: 'https://dodamlaw.com', speciality: '성범죄 전문' },
  { name: '법률사무소 율', url: 'https://yullaw.co.kr', speciality: '성범죄/재산범죄' },
]

export default function AdminSeoPage() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('keywords')
  const [loading, setLoading] = useState(true)

  // Data
  const [keywords, setKeywords] = useState<KeywordRow[]>([])
  const [competitors, setCompetitors] = useState<Competitor[]>([])
  const [seoChanges, setSeoChanges] = useState<SeoChange[]>([])
  const [latestAudit, setLatestAudit] = useState<SeoAnalysis | null>(null)
  const [lastAnalysisDate, setLastAnalysisDate] = useState<string | null>(null)

  // UI states
  const [analyzingKeywords, setAnalyzingKeywords] = useState(false)
  const [analyzingCompetitor, setAnalyzingCompetitor] = useState<number | null>(null)
  const [auditing, setAuditing] = useState(false)
  const [generatingMeta, setGeneratingMeta] = useState(false)
  const [competitorAnalysisResult, setCompetitorAnalysisResult] = useState<CompetitorAnalysis | null>(null)
  const [showCompetitorModal, setShowCompetitorModal] = useState(false)
  const [showAddCompetitor, setShowAddCompetitor] = useState(false)
  const [newCompetitor, setNewCompetitor] = useState({ name: '', url: '', speciality: '' })

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('admin_authenticated') !== 'true') {
      router.push('/admin')
      return
    }
    fetchAll()
  }, [router])

  const fetchAll = useCallback(async () => {
    setLoading(true)
    const [kw, comp, changes, audit, analyses] = await Promise.all([
      supabase.from('keyword_tracking').select('*').order('checked_at', { ascending: false }),
      supabase.from('competitors').select('*').order('created_at', { ascending: false }),
      supabase.from('seo_changes').select('*').order('applied_at', { ascending: false }),
      supabase
        .from('seo_analyses')
        .select('*')
        .eq('analysis_type', 'our_site')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle(),
      supabase
        .from('seo_analyses')
        .select('created_at')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle(),
    ])
    setKeywords((kw.data as KeywordRow[]) || [])
    setCompetitors((comp.data as Competitor[]) || [])
    setSeoChanges((changes.data as SeoChange[]) || [])
    setLatestAudit(audit.data as SeoAnalysis | null)
    setLastAnalysisDate(analyses.data?.created_at || null)
    setLoading(false)
  }, [])

  // --- Actions ---
  async function handleAnalyzeKeywords() {
    setAnalyzingKeywords(true)
    try {
      const res = await fetch('/api/seo/analyze-keywords', { method: 'POST' })
      const data = await res.json()
      if (data.error) { alert(data.error); return }
      await fetchAll()
    } catch { alert('키워드 분석에 실패했습니다.') }
    finally { setAnalyzingKeywords(false) }
  }

  async function handleAnalyzeCompetitor(id: number) {
    setAnalyzingCompetitor(id)
    try {
      const res = await fetch('/api/seo/analyze-competitor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ competitorId: id }),
      })
      const data = await res.json()
      if (data.error) { alert(data.error); return }
      setCompetitorAnalysisResult(data.analysis as CompetitorAnalysis)
      setShowCompetitorModal(true)
    } catch { alert('경쟁사 분석에 실패했습니다.') }
    finally { setAnalyzingCompetitor(null) }
  }

  async function handleAudit() {
    setAuditing(true)
    try {
      const res = await fetch('/api/seo/audit-our-site', { method: 'POST' })
      const data = await res.json()
      if (data.error) { alert(data.error); return }
      await fetchAll()
    } catch { alert('사이트 감사에 실패했습니다.') }
    finally { setAuditing(false) }
  }

  async function handleGenerateMeta() {
    setGeneratingMeta(true)
    try {
      const res = await fetch('/api/seo/generate-meta', { method: 'POST' })
      const data = await res.json()
      if (data.error) { alert(data.error); return }
      await fetchAll()
    } catch { alert('메타태그 제안 생성에 실패했습니다.') }
    finally { setGeneratingMeta(false) }
  }

  async function handleAddCompetitor() {
    if (!newCompetitor.name || !newCompetitor.url) return
    await supabase.from('competitors').insert({
      name: newCompetitor.name,
      url: newCompetitor.url,
      speciality: newCompetitor.speciality || null,
    })
    setNewCompetitor({ name: '', url: '', speciality: '' })
    setShowAddCompetitor(false)
    fetchAll()
  }

  async function handleDeleteCompetitor(id: number) {
    if (!confirm('삭제하시겠습니까?')) return
    await supabase.from('competitors').delete().eq('id', id)
    fetchAll()
  }

  async function seedDefaultCompetitors() {
    await supabase.from('competitors').insert(DEFAULT_COMPETITORS)
    fetchAll()
  }

  function copyPrompt(change: SeoChange) {
    const prompt = `${change.page_path} 페이지의 ${change.field_changed === 'title' ? '타이틀' : '메타 디스크립션'}을 다음과 같이 변경해줘:\n\n변경 전: ${change.old_value || '(없음)'}\n변경 후: ${change.new_value}\n\n이유: ${change.reason || '(없음)'}`
    navigator.clipboard.writeText(prompt)
    alert('프롬프트가 클립보드에 복사되었습니다.')
  }

  // --- Computed ---
  const auditPages: AuditPage[] = latestAudit?.data
    ? ((latestAudit.data as Record<string, unknown>).audit as Record<string, unknown>)?.pages as AuditPage[] || []
    : []
  const overallScore = latestAudit?.data
    ? ((latestAudit.data as Record<string, unknown>).audit as Record<string, number>)?.overall_score || 0
    : 0
  const optimizedPages = auditPages.filter((p) => p.score >= 80).length
  const totalPages = auditPages.length || 10

  const scoreChartData = [
    { name: 'score', value: overallScore, fill: overallScore >= 80 ? '#059669' : overallScore >= 60 ? '#d97706' : '#dc2626' },
  ]

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  const trendIcon = (trend: string | null) => {
    switch (trend) {
      case 'up': return <span className="text-emerald-600">&#9650;</span>
      case 'down': return <span className="text-red-600">&#9660;</span>
      case 'new': return <span className="text-xs px-1.5 py-0.5 bg-blue-50 text-blue-700 font-medium">NEW</span>
      default: return <span className="text-gray-400">&#8212;</span>
    }
  }

  const difficultyBadge = (d: string | null) => {
    const styles: Record<string, string> = {
      high: 'bg-red-50 text-red-700',
      medium: 'bg-yellow-50 text-yellow-700',
      low: 'bg-emerald-50 text-emerald-700',
    }
    return <span className={`text-xs px-2 py-0.5 ${styles[d || ''] || 'bg-gray-100 text-gray-600'}`}>{d || '-'}</span>
  }

  const volumeBadge = (v: string | null) => {
    const styles: Record<string, string> = {
      high: 'bg-emerald-50 text-emerald-700',
      medium: 'bg-yellow-50 text-yellow-700',
      low: 'bg-gray-100 text-gray-600',
    }
    return <span className={`text-xs px-2 py-0.5 ${styles[v || ''] || 'bg-gray-100 text-gray-600'}`}>{v || '-'}</span>
  }

  if (loading) {
    return (
      <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse h-20 bg-gray-50 border border-gray-100" />
          ))}
        </div>
      </div>
    )
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
          SEO 관리
        </span>
      </div>

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-black">SEO 관리</h1>
          <p className="text-sm text-gray-500 mt-1">경쟁 분석과 키워드 트래킹으로 검색 노출을 최적화하세요.</p>
        </div>
        <button
          onClick={() => { sessionStorage.removeItem('admin_authenticated'); router.push('/admin') }}
          className="px-4 py-2.5 border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
        >
          로그아웃
        </button>
      </div>

      {/* Score Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="p-5 border border-gray-100 bg-white flex items-center gap-4">
          <div className="w-16 h-16 flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="70%"
                outerRadius="100%"
                barSize={6}
                data={scoreChartData}
                startAngle={90}
                endAngle={-270}
              >
                <RadialBar background dataKey="value" cornerRadius={3} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">SEO 점수</p>
            <p className={`text-2xl font-bold ${overallScore >= 80 ? 'text-emerald-600' : overallScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
              {overallScore || '-'}
            </p>
          </div>
        </div>
        <div className="p-5 border border-gray-100 bg-white">
          <p className="text-xs text-gray-400 mb-1">최적화 페이지</p>
          <p className="text-2xl font-bold text-[#1B3B2F]">{optimizedPages}/{totalPages}</p>
        </div>
        <div className="p-5 border border-gray-100 bg-white">
          <p className="text-xs text-gray-400 mb-1">추적 키워드</p>
          <p className="text-2xl font-bold text-blue-600">{keywords.length}</p>
        </div>
        <div className="p-5 border border-gray-100 bg-white">
          <p className="text-xs text-gray-400 mb-1">마지막 분석</p>
          <p className="text-sm font-medium text-gray-700 mt-1">
            {lastAnalysisDate ? formatDate(lastAnalysisDate) : '-'}
          </p>
        </div>
      </div>

      {/* Tab Selector */}
      <div className="flex gap-1 mb-6 border-b border-gray-200">
        {([
          { key: 'keywords', label: '키워드 트래킹' },
          { key: 'competitors', label: '경쟁사 분석' },
          { key: 'audit', label: '사이트 감사' },
          { key: 'meta', label: '메타태그 관리' },
        ] as { key: Tab; label: string }[]).map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
              tab === t.key
                ? 'border-[#1B3B2F] text-[#1B3B2F]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tab === 'keywords' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-black">키워드 트래킹</h3>
            <button
              onClick={handleAnalyzeKeywords}
              disabled={analyzingKeywords}
              className="px-4 py-2 bg-[#1B3B2F] text-white text-sm font-medium hover:bg-[#1B3B2F]/90 disabled:opacity-50 transition-colors"
            >
              {analyzingKeywords ? '분석 중...' : '키워드 분석 실행'}
            </button>
          </div>

          {keywords.length === 0 ? (
            <div className="text-center py-16 border border-gray-100 bg-white">
              <p className="text-gray-500 text-sm mb-4">아직 키워드 데이터가 없습니다.</p>
              <button
                onClick={handleAnalyzeKeywords}
                disabled={analyzingKeywords}
                className="text-sm text-[#1B3B2F] font-medium hover:underline"
              >
                키워드 분석 실행하기
              </button>
            </div>
          ) : (
            <div className="border border-gray-100 bg-white overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-xs text-gray-500">
                    <th className="text-left px-4 py-3 font-medium">키워드</th>
                    <th className="text-left px-4 py-3 font-medium">카테고리</th>
                    <th className="text-center px-4 py-3 font-medium">검색량</th>
                    <th className="text-center px-4 py-3 font-medium">난이도</th>
                    <th className="text-center px-4 py-3 font-medium">트렌드</th>
                    <th className="text-right px-4 py-3 font-medium">체크일</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {keywords.map((kw) => (
                    <tr key={kw.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-black">{kw.keyword}</td>
                      <td className="px-4 py-3 text-gray-600">{kw.category || '-'}</td>
                      <td className="px-4 py-3 text-center">{volumeBadge(kw.search_volume)}</td>
                      <td className="px-4 py-3 text-center">{difficultyBadge(kw.difficulty)}</td>
                      <td className="px-4 py-3 text-center">{trendIcon(kw.trend)}</td>
                      <td className="px-4 py-3 text-right text-gray-400 text-xs">{formatDate(kw.checked_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {tab === 'competitors' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-black">경쟁사 분석</h3>
            <div className="flex gap-2">
              {competitors.length === 0 && (
                <button
                  onClick={seedDefaultCompetitors}
                  className="px-4 py-2 border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  기본 경쟁사 등록
                </button>
              )}
              <button
                onClick={() => setShowAddCompetitor(true)}
                className="px-4 py-2 bg-[#1B3B2F] text-white text-sm font-medium hover:bg-[#1B3B2F]/90 transition-colors"
              >
                + 경쟁사 추가
              </button>
            </div>
          </div>

          {competitors.length === 0 ? (
            <div className="text-center py-16 border border-gray-100 bg-white">
              <p className="text-gray-500 text-sm mb-4">등록된 경쟁사가 없습니다.</p>
              <button
                onClick={seedDefaultCompetitors}
                className="text-sm text-[#1B3B2F] font-medium hover:underline"
              >
                기본 경쟁사 3곳 등록하기
              </button>
            </div>
          ) : (
            <div className="border border-gray-100 bg-white divide-y divide-gray-100">
              {competitors.map((c) => (
                <div key={c.id} className="flex flex-wrap items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-black text-sm">{c.name}</p>
                    <p className="text-xs text-gray-400 truncate">{c.url}</p>
                  </div>
                  <span className="text-xs text-gray-500">{c.speciality || '-'}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAnalyzeCompetitor(c.id)}
                      disabled={analyzingCompetitor === c.id}
                      className="px-3 py-1.5 bg-[#1B3B2F] text-white text-xs font-medium hover:bg-[#1B3B2F]/90 disabled:opacity-50 transition-colors"
                    >
                      {analyzingCompetitor === c.id ? '분석 중...' : '분석'}
                    </button>
                    <button
                      onClick={() => handleDeleteCompetitor(c.id)}
                      className="px-3 py-1.5 text-xs text-red-500 hover:text-red-700 transition-colors"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add Competitor Modal */}
          {showAddCompetitor && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAddCompetitor(false)}>
              <div className="bg-white max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-lg font-bold text-black mb-4">경쟁사 추가</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={newCompetitor.name}
                    onChange={(e) => setNewCompetitor({ ...newCompetitor, name: e.target.value })}
                    placeholder="법률사무소 이름"
                    className="w-full px-4 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-[#1B3B2F]"
                  />
                  <input
                    type="url"
                    value={newCompetitor.url}
                    onChange={(e) => setNewCompetitor({ ...newCompetitor, url: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full px-4 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-[#1B3B2F]"
                  />
                  <input
                    type="text"
                    value={newCompetitor.speciality}
                    onChange={(e) => setNewCompetitor({ ...newCompetitor, speciality: e.target.value })}
                    placeholder="전문분야 (선택)"
                    className="w-full px-4 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-[#1B3B2F]"
                  />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => setShowAddCompetitor(false)}
                    className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleAddCompetitor}
                    className="px-4 py-2 bg-[#1B3B2F] text-white text-sm font-medium hover:bg-[#1B3B2F]/90 transition-colors"
                  >
                    추가
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Competitor Analysis Result Modal */}
          {showCompetitorModal && competitorAnalysisResult && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowCompetitorModal(false)}>
              <div className="bg-white max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-lg font-bold text-black">경쟁사 분석 결과</h3>
                  <button onClick={() => setShowCompetitorModal(false)} className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
                </div>

                {/* Overall Score */}
                <div className="flex items-center gap-3 mb-6 p-4 bg-gray-50">
                  <span className={`text-3xl font-bold ${
                    competitorAnalysisResult.overall_score >= 80 ? 'text-emerald-600' :
                    competitorAnalysisResult.overall_score >= 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {competitorAnalysisResult.overall_score}/100
                  </span>
                  <p className="text-sm text-gray-600">{competitorAnalysisResult.summary}</p>
                </div>

                {/* VS Roandlee */}
                {competitorAnalysisResult.vs_roandlee && (
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-black mb-3">로앤이 vs 경쟁사</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3 bg-red-50">
                        <p className="text-xs font-medium text-red-700 mb-2">경쟁사 강점</p>
                        <ul className="text-xs text-red-600 space-y-1">
                          {(competitorAnalysisResult.vs_roandlee.competitor_strengths || []).map((s, i) => (
                            <li key={i}>- {s}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-3 bg-gray-50">
                        <p className="text-xs font-medium text-gray-700 mb-2">경쟁사 약점</p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {(competitorAnalysisResult.vs_roandlee.competitor_weaknesses || []).map((s, i) => (
                            <li key={i}>- {s}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-3 bg-emerald-50">
                        <p className="text-xs font-medium text-emerald-700 mb-2">로앤이 강점</p>
                        <ul className="text-xs text-emerald-600 space-y-1">
                          {(competitorAnalysisResult.vs_roandlee.our_advantages || []).map((s, i) => (
                            <li key={i}>- {s}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Improvements */}
                {competitorAnalysisResult.actionable_improvements && (
                  <div>
                    <h4 className="text-sm font-bold text-black mb-3">즉시 적용 가능한 개선사항</h4>
                    <div className="space-y-2">
                      {competitorAnalysisResult.actionable_improvements.map((item, i) => (
                        <div key={i} className="p-3 border border-gray-100">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs px-2 py-0.5 font-medium ${
                              item.priority === 'high' ? 'bg-red-50 text-red-700' :
                              item.priority === 'medium' ? 'bg-yellow-50 text-yellow-700' : 'bg-gray-100 text-gray-600'
                            }`}>{item.priority}</span>
                            <span className="text-sm font-medium text-black">{item.action}</span>
                          </div>
                          <p className="text-xs text-gray-500">{item.detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'audit' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-black">사이트 감사</h3>
            <button
              onClick={handleAudit}
              disabled={auditing}
              className="px-4 py-2 bg-[#1B3B2F] text-white text-sm font-medium hover:bg-[#1B3B2F]/90 disabled:opacity-50 transition-colors"
            >
              {auditing ? '감사 진행 중...' : '사이트 전체 감사'}
            </button>
          </div>

          {auditPages.length === 0 ? (
            <div className="text-center py-16 border border-gray-100 bg-white">
              <p className="text-gray-500 text-sm mb-4">아직 감사 데이터가 없습니다.</p>
              <button
                onClick={handleAudit}
                disabled={auditing}
                className="text-sm text-[#1B3B2F] font-medium hover:underline"
              >
                사이트 감사 실행하기
              </button>
            </div>
          ) : (
            <>
              {/* Critical Issues */}
              {((latestAudit?.data as Record<string, unknown>)?.audit as Record<string, string[]>)?.critical_issues?.length > 0 && (
                <div className="mb-4 p-4 bg-red-50 border border-red-100">
                  <p className="text-sm font-bold text-red-700 mb-2">심각한 문제</p>
                  <ul className="text-xs text-red-600 space-y-1">
                    {((latestAudit?.data as Record<string, unknown>)?.audit as Record<string, string[]>).critical_issues.map((issue, i) => (
                      <li key={i}>- {issue}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="border border-gray-100 bg-white overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-xs text-gray-500">
                      <th className="text-left px-4 py-3 font-medium">페이지</th>
                      <th className="text-left px-4 py-3 font-medium">경로</th>
                      <th className="text-center px-4 py-3 font-medium">점수</th>
                      <th className="text-left px-4 py-3 font-medium">문제점</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {auditPages
                      .sort((a, b) => a.score - b.score)
                      .map((page) => (
                      <tr
                        key={page.path}
                        className={`hover:bg-gray-50 transition-colors ${page.score < 60 ? 'bg-red-50/50' : ''}`}
                      >
                        <td className="px-4 py-3 font-medium text-black">{page.name}</td>
                        <td className="px-4 py-3 text-gray-500 text-xs">{page.path}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`text-sm font-bold ${
                            page.score >= 80 ? 'text-emerald-600' :
                            page.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                          }`}>{page.score}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="space-y-1">
                            {page.issues?.slice(0, 2).map((issue, i) => (
                              <p key={i} className="text-xs text-gray-500">- {issue}</p>
                            ))}
                            {(page.issues?.length || 0) > 2 && (
                              <p className="text-xs text-gray-400">+{page.issues.length - 2}개 더</p>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}

      {tab === 'meta' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-black">메타태그 관리</h3>
            <button
              onClick={handleGenerateMeta}
              disabled={generatingMeta}
              className="px-4 py-2 bg-[#1B3B2F] text-white text-sm font-medium hover:bg-[#1B3B2F]/90 disabled:opacity-50 transition-colors"
            >
              {generatingMeta ? '생성 중...' : '메타태그 최적화 제안 생성'}
            </button>
          </div>

          {seoChanges.length === 0 ? (
            <div className="text-center py-16 border border-gray-100 bg-white">
              <p className="text-gray-500 text-sm mb-4">아직 메타태그 제안이 없습니다.</p>
              <p className="text-xs text-gray-400">키워드 분석과 사이트 감사를 먼저 실행하면 더 정확한 제안을 받을 수 있습니다.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {seoChanges.map((change) => (
                <div key={change.id} className="border border-gray-100 bg-white p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 font-medium">{change.page_path}</span>
                      <span className={`text-xs px-2 py-0.5 ${
                        change.field_changed === 'title' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'
                      }`}>{change.field_changed}</span>
                    </div>
                    <button
                      onClick={() => copyPrompt(change)}
                      className="px-3 py-1 text-xs bg-[#1B3B2F] text-white font-medium hover:bg-[#1B3B2F]/90 transition-colors"
                    >
                      프롬프트 복사
                    </button>
                  </div>

                  {change.old_value && (
                    <div className="mb-2">
                      <p className="text-xs text-gray-400 mb-1">현재</p>
                      <p className="text-xs text-gray-500 bg-red-50/50 p-2 line-through">{change.old_value}</p>
                    </div>
                  )}
                  <div className="mb-2">
                    <p className="text-xs text-gray-400 mb-1">제안</p>
                    <p className="text-xs text-black bg-emerald-50/50 p-2 font-medium">{change.new_value}</p>
                  </div>
                  {change.reason && (
                    <p className="text-xs text-gray-400 mt-2">이유: {change.reason}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
