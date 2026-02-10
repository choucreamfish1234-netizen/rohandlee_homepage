'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts'

interface Competitor { id: number; name: string; url: string; lawtalk_url: string | null; speciality: string | null; notes: string | null; created_at: string }
interface KeywordRow { id: number; keyword: string; category: string | null; our_google_rank: number | null; our_naver_rank: number | null; search_volume: string | null; difficulty: string | null; trend: string | null; checked_at: string }
interface SeoChange { id: number; page_path: string; field_changed: string; old_value: string | null; new_value: string | null; reason: string | null; applied_at: string }
interface AuditPage { path: string; name: string; score: number; issues: string[]; improvements: string[]; title_feedback: string; description_feedback: string }
interface SeoAnalysis { id: number; analysis_type: string; data: Record<string, unknown>; recommendations: unknown; created_at: string }
interface CompetitorAnalysis { overall_score: number; summary: string; vs_roandlee?: { competitor_strengths: string[]; competitor_weaknesses: string[]; our_advantages: string[] }; actionable_improvements?: { priority: string; action: string; detail: string }[]; title_analysis?: { text: string; score: number; keywords: string[]; feedback: string }; meta_description_analysis?: { text: string; score: number; feedback: string }; target_keywords?: string[] }
interface PageSeoRow { id: number; page_path: string; title: string | null; description: string | null; keywords: string | null; og_title: string | null; og_description: string | null; updated_at: string }
interface AiSuggestion { page_path: string; page_name: string; current_title: string; suggested_title: string; current_description: string; suggested_description: string; reason: string; target_keywords: string[] }

type Tab = 'keywords' | 'competitors' | 'audit' | 'meta'

const DEFAULT_COMPETITORS = [
  { name: '법무법인 온강', url: 'https://ongang.co.kr', speciality: '성범죄 전문' },
  { name: '법무법인 도담', url: 'https://dodamlaw.com', speciality: '성범죄 전문' },
  { name: '법률사무소 율', url: 'https://yullaw.co.kr', speciality: '성범죄/재산범죄' },
]

const PAGE_NAMES: Record<string, string> = {
  '/': '메인 페이지', '/blog': '블로그', '/cases': '성공사례', '/consultation': '무료 상담 예약',
  '/directions': '오시는 길', '/centers/sexual-crime': '성범죄 센터', '/centers/property-crime': '재산범죄 센터',
  '/centers/bankruptcy': '회생/파산 센터', '/centers/corporate': '기업법무 센터', '/centers/it-security': 'IT보안 센터',
}

export default function AdminSeoPage() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('keywords')
  const [loading, setLoading] = useState(true)

  const [keywords, setKeywords] = useState<KeywordRow[]>([])
  const [competitors, setCompetitors] = useState<Competitor[]>([])
  const [seoChanges, setSeoChanges] = useState<SeoChange[]>([])
  const [latestAudit, setLatestAudit] = useState<SeoAnalysis | null>(null)
  const [lastAnalysisDate, setLastAnalysisDate] = useState<string | null>(null)
  const [pageSeoList, setPageSeoList] = useState<PageSeoRow[]>([])

  const [analyzingKeywords, setAnalyzingKeywords] = useState(false)
  const [analyzingCompetitor, setAnalyzingCompetitor] = useState<number | null>(null)
  const [auditing, setAuditing] = useState(false)
  const [generatingMeta, setGeneratingMeta] = useState(false)
  const [competitorAnalysisResult, setCompetitorAnalysisResult] = useState<CompetitorAnalysis | null>(null)
  const [showCompetitorModal, setShowCompetitorModal] = useState(false)
  const [showAddCompetitor, setShowAddCompetitor] = useState(false)
  const [newCompetitor, setNewCompetitor] = useState({ name: '', url: '', speciality: '' })

  const [editingPage, setEditingPage] = useState<PageSeoRow | null>(null)
  const [editForm, setEditForm] = useState({ title: '', description: '', keywords: '', og_title: '', og_description: '' })
  const [savingEdit, setSavingEdit] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState<AiSuggestion[]>([])
  const [applyingAll, setApplyingAll] = useState(false)
  const [applyingSingle, setApplyingSingle] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('admin_authenticated') !== 'true') {
      router.push('/admin')
      return
    }
    fetchAll()
  }, [router])

  const fetchAll = useCallback(async () => {
    setLoading(true)
    const [kw, comp, changes, audit, analyses, pageSeo] = await Promise.all([
      supabase.from('keyword_tracking').select('*').order('checked_at', { ascending: false }),
      supabase.from('competitors').select('*').order('created_at', { ascending: false }),
      supabase.from('seo_changes').select('*').order('applied_at', { ascending: false }).limit(50),
      supabase.from('seo_analyses').select('*').eq('analysis_type', 'our_site').order('created_at', { ascending: false }).limit(1).maybeSingle(),
      supabase.from('seo_analyses').select('created_at').order('created_at', { ascending: false }).limit(1).maybeSingle(),
      fetch('/api/seo/page-seo').then(r => r.json()).catch(() => []),
    ])
    setKeywords((kw.data as KeywordRow[]) || [])
    setCompetitors((comp.data as Competitor[]) || [])
    setSeoChanges((changes.data as SeoChange[]) || [])
    setLatestAudit(audit.data as SeoAnalysis | null)
    setLastAnalysisDate(analyses.data?.created_at || null)
    setPageSeoList(Array.isArray(pageSeo) ? pageSeo : [])
    setLoading(false)
  }, [])

  async function handleAnalyzeKeywords() {
    setAnalyzingKeywords(true)
    try {
      const res = await fetch('/api/seo/analyze-keywords', { method: 'POST' })
      const data = await res.json()
      if (data.error) { alert(data.error); return }
      await fetchAll()
    } catch (err) { alert(`키워드 분석 실패: ${err instanceof Error ? err.message : '네트워크 오류'}`) }
    finally { setAnalyzingKeywords(false) }
  }

  async function handleAnalyzeCompetitor(id: number) {
    setAnalyzingCompetitor(id)
    try {
      const res = await fetch('/api/seo/analyze-competitor', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ competitorId: id }) })
      const data = await res.json()
      if (data.error) { alert(data.error); return }
      setCompetitorAnalysisResult(data.analysis as CompetitorAnalysis)
      setShowCompetitorModal(true)
    } catch (err) { alert(`경쟁사 분석 실패: ${err instanceof Error ? err.message : '네트워크 오류'}`) }
    finally { setAnalyzingCompetitor(null) }
  }

  async function handleAudit() {
    setAuditing(true)
    try {
      const res = await fetch('/api/seo/audit-our-site', { method: 'POST' })
      const data = await res.json()
      if (data.error) { alert(data.error); return }
      await fetchAll()
    } catch (err) { alert(`사이트 감사 실패: ${err instanceof Error ? err.message : '네트워크 오류'}`) }
    finally { setAuditing(false) }
  }

  async function handleGenerateMeta() {
    setGeneratingMeta(true)
    setAiSuggestions([])
    try {
      const res = await fetch('/api/seo/generate-meta', { method: 'POST' })
      const data = await res.json()
      if (data.error) { alert(data.error); return }
      if (data.suggestions) {
        const enriched = data.suggestions.map((s: AiSuggestion) => {
          const current = pageSeoList.find(p => p.page_path === s.page_path)
          return { ...s, current_title: current?.title || s.current_title || '', current_description: current?.description || s.current_description || '' }
        })
        setAiSuggestions(enriched)
      }
      await fetchAll()
    } catch (err) { alert(`메타태그 제안 생성 실패: ${err instanceof Error ? err.message : '네트워크 오류'}`) }
    finally { setGeneratingMeta(false) }
  }

  async function handleApplySuggestion(s: AiSuggestion) {
    setApplyingSingle(s.page_path)
    try {
      const res = await fetch('/api/seo/apply-suggestions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ suggestions: [s] }) })
      const data = await res.json()
      if (data.error) { alert(data.error); return }
      setAiSuggestions(prev => prev.filter(x => x.page_path !== s.page_path))
      await fetchAll()
    } catch (err) { alert(`적용 실패: ${err instanceof Error ? err.message : '네트워크 오류'}`) }
    finally { setApplyingSingle(null) }
  }

  async function handleApplyAll() {
    if (!confirm(`${aiSuggestions.length}개 페이지에 AI 제안을 모두 적용하시겠습니까?`)) return
    setApplyingAll(true)
    try {
      const res = await fetch('/api/seo/apply-suggestions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ suggestions: aiSuggestions }) })
      const data = await res.json()
      if (data.error) { alert(data.error); return }
      setAiSuggestions([])
      await fetchAll()
    } catch (err) { alert(`전체 적용 실패: ${err instanceof Error ? err.message : '네트워크 오류'}`) }
    finally { setApplyingAll(false) }
  }

  function openEditModal(page: PageSeoRow) {
    setEditingPage(page)
    setEditForm({ title: page.title || '', description: page.description || '', keywords: page.keywords || '', og_title: page.og_title || '', og_description: page.og_description || '' })
  }

  async function handleSaveEdit() {
    if (!editingPage) return
    setSavingEdit(true)
    try {
      const res = await fetch('/api/seo/page-seo', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ page_path: editingPage.page_path, ...editForm }) })
      const data = await res.json()
      if (data.error) { alert(data.error); return }
      setEditingPage(null)
      await fetchAll()
    } catch (err) { alert(`저장 실패: ${err instanceof Error ? err.message : '네트워크 오류'}`) }
    finally { setSavingEdit(false) }
  }

  async function handleAddCompetitor() {
    if (!newCompetitor.name || !newCompetitor.url) return
    await supabase.from('competitors').insert({ name: newCompetitor.name, url: newCompetitor.url, speciality: newCompetitor.speciality || null })
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

  const auditPages: AuditPage[] = latestAudit?.data ? ((latestAudit.data as Record<string, unknown>).audit as Record<string, unknown>)?.pages as AuditPage[] || [] : []
  const overallScore = latestAudit?.data ? ((latestAudit.data as Record<string, unknown>).audit as Record<string, number>)?.overall_score || 0 : 0
  const optimizedPages = auditPages.filter(p => p.score >= 80).length
  const totalPages = auditPages.length || 10
  const scoreChartData = [{ name: 'score', value: overallScore, fill: overallScore >= 80 ? '#059669' : overallScore >= 60 ? '#d97706' : '#dc2626' }]

  function formatDate(d: string) { return new Date(d).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) }
  const trendIcon = (t: string | null) => { switch (t) { case 'up': return <span className="text-emerald-600">&#9650;</span>; case 'down': return <span className="text-red-600">&#9660;</span>; case 'new': return <span className="text-xs px-1.5 py-0.5 bg-blue-50 text-blue-700 font-medium">NEW</span>; default: return <span className="text-gray-400">&#8212;</span> } }
  const badge = (v: string | null, styles: Record<string, string>) => <span className={`text-xs px-2 py-0.5 ${styles[v || ''] || 'bg-gray-100 text-gray-600'}`}>{v || '-'}</span>
  const diffBadge = (d: string | null) => badge(d, { high: 'bg-red-50 text-red-700', medium: 'bg-yellow-50 text-yellow-700', low: 'bg-emerald-50 text-emerald-700' })
  const volBadge = (v: string | null) => badge(v, { high: 'bg-emerald-50 text-emerald-700', medium: 'bg-yellow-50 text-yellow-700', low: 'bg-gray-100 text-gray-600' })
  function ccColor(len: number, max: number) { return len === 0 ? 'text-gray-400' : len <= max ? 'text-emerald-600' : 'text-red-600' }

  if (loading) return <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="space-y-4">{[1,2,3,4].map(i => <div key={i} className="animate-pulse h-20 bg-gray-50 border border-gray-100" />)}</div></div>

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Nav */}
      <div className="flex items-center gap-6 mb-6 border-b border-gray-200 pb-3">
        <Link href="/admin/dashboard" className="text-sm text-gray-500 hover:text-[#1B3B2F] transition-colors pb-3 -mb-3">블로그 관리</Link>
        <Link href="/admin/consultations" className="text-sm text-gray-500 hover:text-[#1B3B2F] transition-colors pb-3 -mb-3">상담 관리</Link>
        <span className="text-sm font-semibold text-[#1B3B2F] border-b-2 border-[#1B3B2F] pb-3 -mb-3">SEO 관리</span>
        <Link href="/admin/analytics" className="text-sm text-gray-500 hover:text-[#1B3B2F] transition-colors pb-3 -mb-3">방문자 분석</Link>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-black">SEO 관리</h1>
          <p className="text-sm text-gray-500 mt-1">경쟁 분석과 키워드 트래킹으로 검색 노출을 최적화하세요.</p>
        </div>
        <button onClick={() => { sessionStorage.removeItem('admin_authenticated'); router.push('/admin') }} className="px-4 py-2.5 border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors">로그아웃</button>
      </div>

      {/* Score Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="p-5 border border-gray-100 bg-white flex items-center gap-4">
          <div className="w-16 h-16 flex-shrink-0"><ResponsiveContainer width="100%" height="100%"><RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" barSize={6} data={scoreChartData} startAngle={90} endAngle={-270}><RadialBar background dataKey="value" cornerRadius={3} /></RadialBarChart></ResponsiveContainer></div>
          <div><p className="text-xs text-gray-400 mb-1">SEO 점수</p><p className={`text-2xl font-bold ${overallScore >= 80 ? 'text-emerald-600' : overallScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>{overallScore || '-'}</p></div>
        </div>
        <div className="p-5 border border-gray-100 bg-white"><p className="text-xs text-gray-400 mb-1">최적화 페이지</p><p className="text-2xl font-bold text-[#1B3B2F]">{optimizedPages}/{totalPages}</p></div>
        <div className="p-5 border border-gray-100 bg-white"><p className="text-xs text-gray-400 mb-1">추적 키워드</p><p className="text-2xl font-bold text-blue-600">{keywords.length}</p></div>
        <div className="p-5 border border-gray-100 bg-white"><p className="text-xs text-gray-400 mb-1">마지막 분석</p><p className="text-sm font-medium text-gray-700 mt-1">{lastAnalysisDate ? formatDate(lastAnalysisDate) : '-'}</p></div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-gray-200">
        {([{ key: 'keywords', label: '키워드 트래킹' }, { key: 'competitors', label: '경쟁사 분석' }, { key: 'audit', label: '사이트 감사' }, { key: 'meta', label: '메타태그 관리' }] as { key: Tab; label: string }[]).map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${tab === t.key ? 'border-[#1B3B2F] text-[#1B3B2F]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>{t.label}</button>
        ))}
      </div>

      {/* Keywords Tab */}
      {tab === 'keywords' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-black">키워드 트래킹</h3>
            <button onClick={handleAnalyzeKeywords} disabled={analyzingKeywords} className="px-4 py-2 bg-[#1B3B2F] text-white text-sm font-medium hover:bg-[#1B3B2F]/90 disabled:opacity-50 transition-colors">{analyzingKeywords ? '분석 중...' : '키워드 분석 실행'}</button>
          </div>
          {keywords.length === 0 ? (
            <div className="text-center py-16 border border-gray-100 bg-white"><p className="text-gray-500 text-sm mb-4">아직 키워드 데이터가 없습니다.</p><button onClick={handleAnalyzeKeywords} disabled={analyzingKeywords} className="text-sm text-[#1B3B2F] font-medium hover:underline">키워드 분석 실행하기</button></div>
          ) : (
            <div className="border border-gray-100 bg-white overflow-x-auto">
              <table className="w-full text-sm"><thead><tr className="bg-gray-50 text-xs text-gray-500"><th className="text-left px-4 py-3 font-medium">키워드</th><th className="text-left px-4 py-3 font-medium">카테고리</th><th className="text-center px-4 py-3 font-medium">검색량</th><th className="text-center px-4 py-3 font-medium">난이도</th><th className="text-center px-4 py-3 font-medium">트렌드</th><th className="text-right px-4 py-3 font-medium">체크일</th></tr></thead>
              <tbody className="divide-y divide-gray-100">{keywords.map(kw => (
                <tr key={kw.id} className="hover:bg-gray-50 transition-colors"><td className="px-4 py-3 font-medium text-black">{kw.keyword}</td><td className="px-4 py-3 text-gray-600">{kw.category || '-'}</td><td className="px-4 py-3 text-center">{volBadge(kw.search_volume)}</td><td className="px-4 py-3 text-center">{diffBadge(kw.difficulty)}</td><td className="px-4 py-3 text-center">{trendIcon(kw.trend)}</td><td className="px-4 py-3 text-right text-gray-400 text-xs">{formatDate(kw.checked_at)}</td></tr>
              ))}</tbody></table>
            </div>
          )}
        </div>
      )}

      {/* Competitors Tab */}
      {tab === 'competitors' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-black">경쟁사 분석</h3>
            <div className="flex gap-2">
              {competitors.length === 0 && <button onClick={seedDefaultCompetitors} className="px-4 py-2 border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors">기본 경쟁사 등록</button>}
              <button onClick={() => setShowAddCompetitor(true)} className="px-4 py-2 bg-[#1B3B2F] text-white text-sm font-medium hover:bg-[#1B3B2F]/90 transition-colors">+ 경쟁사 추가</button>
            </div>
          </div>
          {competitors.length === 0 ? (
            <div className="text-center py-16 border border-gray-100 bg-white"><p className="text-gray-500 text-sm mb-4">등록된 경쟁사가 없습니다.</p><button onClick={seedDefaultCompetitors} className="text-sm text-[#1B3B2F] font-medium hover:underline">기본 경쟁사 3곳 등록하기</button></div>
          ) : (
            <div className="border border-gray-100 bg-white divide-y divide-gray-100">{competitors.map(c => (
              <div key={c.id} className="flex flex-wrap items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex-1 min-w-0"><p className="font-medium text-black text-sm">{c.name}</p><p className="text-xs text-gray-400 truncate">{c.url}</p></div>
                <span className="text-xs text-gray-500">{c.speciality || '-'}</span>
                <div className="flex gap-2">
                  <button onClick={() => handleAnalyzeCompetitor(c.id)} disabled={analyzingCompetitor === c.id} className="px-3 py-1.5 bg-[#1B3B2F] text-white text-xs font-medium hover:bg-[#1B3B2F]/90 disabled:opacity-50 transition-colors">{analyzingCompetitor === c.id ? '분석 중...' : '분석'}</button>
                  <button onClick={() => handleDeleteCompetitor(c.id)} className="px-3 py-1.5 text-xs text-red-500 hover:text-red-700 transition-colors">삭제</button>
                </div>
              </div>
            ))}</div>
          )}

          {showAddCompetitor && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAddCompetitor(false)}>
              <div className="bg-white max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
                <h3 className="text-lg font-bold text-black mb-4">경쟁사 추가</h3>
                <div className="space-y-3">
                  <input type="text" value={newCompetitor.name} onChange={e => setNewCompetitor({ ...newCompetitor, name: e.target.value })} placeholder="법률사무소 이름" className="w-full px-4 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-[#1B3B2F]" />
                  <input type="url" value={newCompetitor.url} onChange={e => setNewCompetitor({ ...newCompetitor, url: e.target.value })} placeholder="https://example.com" className="w-full px-4 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-[#1B3B2F]" />
                  <input type="text" value={newCompetitor.speciality} onChange={e => setNewCompetitor({ ...newCompetitor, speciality: e.target.value })} placeholder="전문분야 (선택)" className="w-full px-4 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-[#1B3B2F]" />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button onClick={() => setShowAddCompetitor(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors">취소</button>
                  <button onClick={handleAddCompetitor} className="px-4 py-2 bg-[#1B3B2F] text-white text-sm font-medium hover:bg-[#1B3B2F]/90 transition-colors">추가</button>
                </div>
              </div>
            </div>
          )}

          {showCompetitorModal && competitorAnalysisResult && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowCompetitorModal(false)}>
              <div className="bg-white max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-start mb-6"><h3 className="text-lg font-bold text-black">경쟁사 분석 결과</h3><button onClick={() => setShowCompetitorModal(false)} className="text-gray-400 hover:text-gray-600 text-xl">&times;</button></div>
                <div className="flex items-center gap-3 mb-6 p-4 bg-gray-50">
                  <span className={`text-3xl font-bold ${competitorAnalysisResult.overall_score >= 80 ? 'text-emerald-600' : competitorAnalysisResult.overall_score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>{competitorAnalysisResult.overall_score}/100</span>
                  <p className="text-sm text-gray-600">{competitorAnalysisResult.summary}</p>
                </div>
                {competitorAnalysisResult.vs_roandlee && (
                  <div className="mb-6"><h4 className="text-sm font-bold text-black mb-3">로앤이 vs 경쟁사</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3 bg-red-50"><p className="text-xs font-medium text-red-700 mb-2">경쟁사 강점</p><ul className="text-xs text-red-600 space-y-1">{(competitorAnalysisResult.vs_roandlee.competitor_strengths || []).map((s, i) => <li key={i}>- {s}</li>)}</ul></div>
                      <div className="p-3 bg-gray-50"><p className="text-xs font-medium text-gray-700 mb-2">경쟁사 약점</p><ul className="text-xs text-gray-600 space-y-1">{(competitorAnalysisResult.vs_roandlee.competitor_weaknesses || []).map((s, i) => <li key={i}>- {s}</li>)}</ul></div>
                      <div className="p-3 bg-emerald-50"><p className="text-xs font-medium text-emerald-700 mb-2">로앤이 강점</p><ul className="text-xs text-emerald-600 space-y-1">{(competitorAnalysisResult.vs_roandlee.our_advantages || []).map((s, i) => <li key={i}>- {s}</li>)}</ul></div>
                    </div>
                  </div>
                )}
                {competitorAnalysisResult.actionable_improvements && (
                  <div><h4 className="text-sm font-bold text-black mb-3">즉시 적용 가능한 개선사항</h4><div className="space-y-2">{competitorAnalysisResult.actionable_improvements.map((item, i) => (
                    <div key={i} className="p-3 border border-gray-100"><div className="flex items-center gap-2 mb-1"><span className={`text-xs px-2 py-0.5 font-medium ${item.priority === 'high' ? 'bg-red-50 text-red-700' : item.priority === 'medium' ? 'bg-yellow-50 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}>{item.priority}</span><span className="text-sm font-medium text-black">{item.action}</span></div><p className="text-xs text-gray-500">{item.detail}</p></div>
                  ))}</div></div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Audit Tab */}
      {tab === 'audit' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-black">사이트 감사</h3>
            <button onClick={handleAudit} disabled={auditing} className="px-4 py-2 bg-[#1B3B2F] text-white text-sm font-medium hover:bg-[#1B3B2F]/90 disabled:opacity-50 transition-colors">{auditing ? '감사 진행 중...' : '사이트 전체 감사'}</button>
          </div>
          {auditPages.length === 0 ? (
            <div className="text-center py-16 border border-gray-100 bg-white"><p className="text-gray-500 text-sm mb-4">아직 감사 데이터가 없습니다.</p><button onClick={handleAudit} disabled={auditing} className="text-sm text-[#1B3B2F] font-medium hover:underline">사이트 감사 실행하기</button></div>
          ) : (
            <>
              {((latestAudit?.data as Record<string, unknown>)?.audit as Record<string, string[]>)?.critical_issues?.length > 0 && (
                <div className="mb-4 p-4 bg-red-50 border border-red-100"><p className="text-sm font-bold text-red-700 mb-2">심각한 문제</p><ul className="text-xs text-red-600 space-y-1">{((latestAudit?.data as Record<string, unknown>)?.audit as Record<string, string[]>).critical_issues.map((issue, i) => <li key={i}>- {issue}</li>)}</ul></div>
              )}
              <div className="border border-gray-100 bg-white overflow-x-auto">
                <table className="w-full text-sm"><thead><tr className="bg-gray-50 text-xs text-gray-500"><th className="text-left px-4 py-3 font-medium">페이지</th><th className="text-left px-4 py-3 font-medium">경로</th><th className="text-center px-4 py-3 font-medium">점수</th><th className="text-left px-4 py-3 font-medium">문제점</th></tr></thead>
                <tbody className="divide-y divide-gray-100">{auditPages.sort((a, b) => a.score - b.score).map(page => (
                  <tr key={page.path} className={`hover:bg-gray-50 transition-colors ${page.score < 60 ? 'bg-red-50/50' : ''}`}>
                    <td className="px-4 py-3 font-medium text-black">{page.name}</td><td className="px-4 py-3 text-gray-500 text-xs">{page.path}</td>
                    <td className="px-4 py-3 text-center"><span className={`text-sm font-bold ${page.score >= 80 ? 'text-emerald-600' : page.score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>{page.score}</span></td>
                    <td className="px-4 py-3"><div className="space-y-1">{page.issues?.slice(0, 2).map((issue, i) => <p key={i} className="text-xs text-gray-500">- {issue}</p>)}{(page.issues?.length || 0) > 2 && <p className="text-xs text-gray-400">+{page.issues.length - 2}개 더</p>}</div></td>
                  </tr>
                ))}</tbody></table>
              </div>
            </>
          )}
        </div>
      )}

      {/* Meta Tab - UPGRADED */}
      {tab === 'meta' && (
        <div>
          <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
            <h3 className="text-lg font-bold text-black">메타태그 관리</h3>
            <div className="flex gap-2">
              {aiSuggestions.length > 0 && <button onClick={handleApplyAll} disabled={applyingAll} className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 disabled:opacity-50 transition-colors">{applyingAll ? '적용 중...' : `전체 적용 (${aiSuggestions.length})`}</button>}
              <button onClick={handleGenerateMeta} disabled={generatingMeta} className="px-4 py-2 bg-[#1B3B2F] text-white text-sm font-medium hover:bg-[#1B3B2F]/90 disabled:opacity-50 transition-colors">{generatingMeta ? 'AI 분석 중...' : 'AI 최적화 제안 생성'}</button>
            </div>
          </div>

          {/* Current SEO Table */}
          <div className="border border-gray-100 bg-white overflow-x-auto mb-8">
            <table className="w-full text-sm"><thead><tr className="bg-gray-50 text-xs text-gray-500"><th className="text-left px-4 py-3 font-medium">페이지</th><th className="text-left px-4 py-3 font-medium">Title</th><th className="text-left px-4 py-3 font-medium">Description</th><th className="text-center px-4 py-3 font-medium w-24">수정</th></tr></thead>
            <tbody className="divide-y divide-gray-100">
              {pageSeoList.length === 0 ? (
                <tr><td colSpan={4} className="px-4 py-10 text-center text-gray-400 text-sm">page_seo 테이블에 데이터가 없습니다. 마이그레이션을 실행해주세요.</td></tr>
              ) : pageSeoList.map(page => {
                const sg = aiSuggestions.find(s => s.page_path === page.page_path)
                return (
                  <tr key={page.id} className={`hover:bg-gray-50 transition-colors ${sg ? 'bg-blue-50/30' : ''}`}>
                    <td className="px-4 py-3"><p className="font-medium text-black text-sm">{PAGE_NAMES[page.page_path] || page.page_path}</p><p className="text-xs text-gray-400">{page.page_path}</p></td>
                    <td className="px-4 py-3 max-w-[250px]"><p className="text-xs text-gray-700 truncate">{page.title || '-'}</p>{sg?.suggested_title && <p className="text-xs text-emerald-700 bg-emerald-50 px-1.5 py-0.5 mt-1 truncate">AI: {sg.suggested_title}</p>}</td>
                    <td className="px-4 py-3 max-w-[300px]"><p className="text-xs text-gray-700 truncate">{page.description || '-'}</p>{sg?.suggested_description && <p className="text-xs text-emerald-700 bg-emerald-50 px-1.5 py-0.5 mt-1 truncate">AI: {sg.suggested_description}</p>}</td>
                    <td className="px-4 py-3 text-center"><div className="flex items-center justify-center gap-1">
                      <button onClick={() => openEditModal(page)} className="px-2.5 py-1 text-xs text-[#1B3B2F] border border-[#1B3B2F]/30 hover:bg-[#1B3B2F]/5 transition-colors">편집</button>
                      {sg && <button onClick={() => handleApplySuggestion(sg)} disabled={applyingSingle === sg.page_path} className="px-2.5 py-1 text-xs bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 transition-colors">{applyingSingle === sg.page_path ? '...' : '적용'}</button>}
                    </div></td>
                  </tr>
                )
              })}
            </tbody></table>
          </div>

          {/* AI Suggestions Detail */}
          {aiSuggestions.length > 0 && (
            <div className="mb-8"><h4 className="text-sm font-bold text-black mb-3">AI 최적화 제안 상세</h4><div className="space-y-3">{aiSuggestions.map(s => (
              <div key={s.page_path} className="border border-blue-100 bg-blue-50/30 p-4">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <div><span className="text-sm font-medium text-black">{s.page_name || PAGE_NAMES[s.page_path] || s.page_path}</span><span className="text-xs text-gray-400 ml-2">{s.page_path}</span></div>
                  <button onClick={() => handleApplySuggestion(s)} disabled={applyingSingle === s.page_path} className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-700 disabled:opacity-50 transition-colors">{applyingSingle === s.page_path ? '적용 중...' : '이 페이지 적용'}</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div><p className="text-xs text-gray-400 mb-1">Title</p>{s.current_title && <p className="text-xs text-gray-500 bg-red-50/50 p-2 mb-1 line-through">{s.current_title}</p>}<p className="text-xs text-black bg-emerald-50 p-2 font-medium">{s.suggested_title}</p></div>
                  <div><p className="text-xs text-gray-400 mb-1">Description</p>{s.current_description && <p className="text-xs text-gray-500 bg-red-50/50 p-2 mb-1 line-through">{s.current_description}</p>}<p className="text-xs text-black bg-emerald-50 p-2 font-medium">{s.suggested_description}</p></div>
                </div>
                {s.target_keywords?.length > 0 && <div className="mt-2 flex flex-wrap gap-1">{s.target_keywords.map((kw, i) => <span key={i} className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700">{kw}</span>)}</div>}
                {s.reason && <p className="text-xs text-gray-500 mt-2">이유: {s.reason}</p>}
              </div>
            ))}</div></div>
          )}

          {/* Change History */}
          <div><h4 className="text-sm font-bold text-black mb-3">변경 이력</h4>
            {seoChanges.length === 0 ? (
              <div className="text-center py-8 border border-gray-100 bg-white"><p className="text-gray-400 text-sm">아직 변경 이력이 없습니다.</p></div>
            ) : (
              <div className="border border-gray-100 bg-white overflow-x-auto">
                <table className="w-full text-sm"><thead><tr className="bg-gray-50 text-xs text-gray-500"><th className="text-left px-4 py-2.5 font-medium">일시</th><th className="text-left px-4 py-2.5 font-medium">페이지</th><th className="text-left px-4 py-2.5 font-medium">필드</th><th className="text-left px-4 py-2.5 font-medium">이전</th><th className="text-left px-4 py-2.5 font-medium">변경</th><th className="text-left px-4 py-2.5 font-medium">이유</th></tr></thead>
                <tbody className="divide-y divide-gray-100">{seoChanges.slice(0, 20).map(ch => (
                  <tr key={ch.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-2.5 text-xs text-gray-400 whitespace-nowrap">{formatDate(ch.applied_at)}</td>
                    <td className="px-4 py-2.5"><span className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-600">{ch.page_path}</span></td>
                    <td className="px-4 py-2.5"><span className={`text-xs px-1.5 py-0.5 ${ch.field_changed === 'title' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'}`}>{ch.field_changed}</span></td>
                    <td className="px-4 py-2.5 max-w-[150px]"><p className="text-xs text-gray-400 truncate">{ch.old_value || '-'}</p></td>
                    <td className="px-4 py-2.5 max-w-[150px]"><p className="text-xs text-black truncate">{ch.new_value || '-'}</p></td>
                    <td className="px-4 py-2.5 max-w-[120px]"><p className="text-xs text-gray-400 truncate">{ch.reason || '-'}</p></td>
                  </tr>
                ))}</tbody></table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingPage && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setEditingPage(null)}>
          <div className="bg-white max-w-xl w-full max-h-[90vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-5">
              <div><h3 className="text-lg font-bold text-black">SEO 메타태그 편집</h3><p className="text-sm text-gray-500 mt-1">{PAGE_NAMES[editingPage.page_path] || editingPage.page_path}<span className="text-xs text-gray-400 ml-2">{editingPage.page_path}</span></p></div>
              <button onClick={() => setEditingPage(null)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">&times;</button>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1"><label className="text-sm font-medium text-black">Title</label><span className={`text-xs ${ccColor(editForm.title.length, 60)}`}>{editForm.title.length}/60</span></div>
                <input type="text" value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-[#1B3B2F]" placeholder="페이지 타이틀" />
                <div className="mt-1 h-1 bg-gray-100 overflow-hidden"><div className={`h-full transition-all ${editForm.title.length <= 60 ? 'bg-emerald-500' : 'bg-red-500'}`} style={{ width: `${Math.min((editForm.title.length / 60) * 100, 100)}%` }} /></div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1"><label className="text-sm font-medium text-black">Description</label><span className={`text-xs ${ccColor(editForm.description.length, 160)}`}>{editForm.description.length}/160</span></div>
                <textarea value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })} rows={3} className="w-full px-4 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-[#1B3B2F] resize-none" placeholder="페이지 설명" />
                <div className="mt-1 h-1 bg-gray-100 overflow-hidden"><div className={`h-full transition-all ${editForm.description.length <= 160 ? 'bg-emerald-500' : 'bg-red-500'}`} style={{ width: `${Math.min((editForm.description.length / 160) * 100, 100)}%` }} /></div>
              </div>
              <div><label className="text-sm font-medium text-black mb-1 block">Keywords</label><input type="text" value={editForm.keywords} onChange={e => setEditForm({ ...editForm, keywords: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-[#1B3B2F]" placeholder="키워드1, 키워드2, 키워드3" /></div>
              <div>
                <div className="flex justify-between items-center mb-1"><label className="text-sm font-medium text-black">OG Title</label><span className={`text-xs ${ccColor(editForm.og_title.length, 60)}`}>{editForm.og_title.length}/60</span></div>
                <input type="text" value={editForm.og_title} onChange={e => setEditForm({ ...editForm, og_title: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-[#1B3B2F]" placeholder="SNS 공유 타이틀 (비워두면 Title 사용)" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1"><label className="text-sm font-medium text-black">OG Description</label><span className={`text-xs ${ccColor(editForm.og_description.length, 160)}`}>{editForm.og_description.length}/160</span></div>
                <textarea value={editForm.og_description} onChange={e => setEditForm({ ...editForm, og_description: e.target.value })} rows={2} className="w-full px-4 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-[#1B3B2F] resize-none" placeholder="SNS 공유 설명 (비워두면 Description 사용)" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-gray-100">
              <button onClick={() => setEditingPage(null)} className="px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors">취소</button>
              <button onClick={handleSaveEdit} disabled={savingEdit} className="px-6 py-2.5 bg-[#1B3B2F] text-white text-sm font-medium hover:bg-[#1B3B2F]/90 disabled:opacity-50 transition-colors">{savingEdit ? '저장 중...' : '저장'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
