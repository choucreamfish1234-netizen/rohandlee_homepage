'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, CartesianGrid,
} from 'recharts'

type Tab = 'overview' | 'channels' | 'pages' | 'devices' | 'conversions' | 'realtime'

const COLORS = ['#1B3B2F', '#2D6A4F', '#40916C', '#52B788', '#74C69D', '#95D5B2', '#B7E4C7', '#D8F3DC']
const CHANNEL_LABELS: Record<string, string> = {
  naver: '네이버', google: '구글', daum: '다음', kakao: '카카오',
  lawtalk: '로톡', instagram: '인스타그램', threads: '스레드',
  youtube: '유튜브', direct: '직접 방문', other: '기타',
}
const EVENT_LABELS: Record<string, string> = {
  form_open: '상담폼 열기', form_submit: '상담 신청', kakao_click: '카카오톡 클릭',
  phone_click: '전화 클릭', blog_read: '블로그 읽기', case_view: '사례 조회',
  center_view: '센터 조회', cta_click: 'CTA 클릭',
}
const PAGE_NAMES: Record<string, string> = {
  '/': '메인', '/blog': '블로그', '/cases': '성공사례', '/consultation': '무료 상담',
  '/directions': '오시는 길', '/centers/sexual-crime': '성범죄 센터',
  '/centers/property-crime': '재산범죄 센터', '/centers/bankruptcy': '회생/파산 센터',
  '/centers/corporate': '기업법무 센터', '/centers/it-security': 'IT보안 센터',
}

function fmtDuration(s: number) {
  if (s < 60) return `${s}초`
  const m = Math.floor(s / 60)
  const sec = s % 60
  return sec > 0 ? `${m}분 ${sec}초` : `${m}분`
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return '방금'
  if (mins < 60) return `${mins}분 전`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}시간 전`
  return `${Math.floor(hrs / 24)}일 전`
}

export default function AdminAnalyticsPage() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('overview')
  const [days, setDays] = useState(30)
  const [loading, setLoading] = useState(true)

  // Overview data
  const [stats, setStats] = useState<{
    totalViews: number; uniqueVisitors: number; totalSessions: number;
    bounceRate: number; newVisitors: number; avgDuration: number;
    avgPages: number; totalEvents: number;
    dailyChart: { date: string; views: number }[];
    hourlyHeatmap: number[];
  } | null>(null)

  // Channel data
  const [channelData, setChannelData] = useState<{
    channels: { name: string; value: number }[];
    topKeywords: { keyword: string; count: number }[];
    campaigns: { source: string; medium: string; campaign: string; count: number }[];
  } | null>(null)

  // Page data
  const [pageData, setPageData] = useState<{
    popularPages: { path: string; title: string; views: number; avgTime: number; avgScroll: number; bounceRate: number }[];
    landingPages: { path: string; count: number }[];
    exitPages: { path: string; count: number }[];
  } | null>(null)

  // Device data
  const [deviceData, setDeviceData] = useState<{
    deviceTypes: { name: string; count: number }[];
    brands: { name: string; count: number }[];
    browsers: { name: string; count: number }[];
    operatingSystems: { name: string; count: number }[];
    resolutions: { name: string; count: number }[];
  } | null>(null)

  // Conversion data
  const [convData, setConvData] = useState<{
    funnel: { type: string; count: number }[];
    eventCounts: { type: string; count: number }[];
    conversionPaths: { path: string; count: number }[];
    channelPerformance: { channel: string; sessions: number; conversions: number; rate: number }[];
    overallConversionRate: number; totalSessions: number;
  } | null>(null)

  // Realtime data
  const [realtime, setRealtime] = useState<{
    activeVisitors: number;
    topPages: { path: string; count: number }[];
    recentEvents: { event_type: string; event_label: string; page_path: string; created_at: string; device_type: string }[];
    liveFeed: { page_path: string; page_title: string; referrer_type: string; device_type: string; created_at: string }[];
  } | null>(null)

  const fetchTabData = useCallback(async (t: Tab) => {
    setLoading(true)
    try {
      if (t === 'overview') {
        const res = await fetch(`/api/analytics/stats?days=${days}`)
        setStats(await res.json())
      } else if (t === 'channels') {
        const res = await fetch(`/api/analytics/channels?days=${days}`)
        setChannelData(await res.json())
      } else if (t === 'pages') {
        const res = await fetch(`/api/analytics/pages?days=${days}`)
        setPageData(await res.json())
      } else if (t === 'devices') {
        const res = await fetch(`/api/analytics/devices?days=${days}`)
        setDeviceData(await res.json())
      } else if (t === 'conversions') {
        const res = await fetch(`/api/analytics/conversions?days=${days}`)
        setConvData(await res.json())
      } else if (t === 'realtime') {
        const res = await fetch('/api/analytics/realtime')
        setRealtime(await res.json())
      }
    } catch (err) {
      console.error('Analytics fetch error:', err)
    } finally {
      setLoading(false)
    }
  }, [days])

  useEffect(() => {
    const authed = sessionStorage.getItem('admin_authenticated')
    if (!authed) { router.push('/admin'); return }
    fetchTabData(tab)
  }, [tab, days, router, fetchTabData])

  // Realtime auto-refresh
  useEffect(() => {
    if (tab !== 'realtime') return
    const interval = setInterval(() => fetchTabData('realtime'), 15000)
    return () => clearInterval(interval)
  }, [tab, fetchTabData])

  const tabs: { key: Tab; label: string }[] = [
    { key: 'overview', label: '트래픽 개요' },
    { key: 'channels', label: '채널 분석' },
    { key: 'pages', label: '페이지 분석' },
    { key: 'devices', label: '디바이스 분석' },
    { key: 'conversions', label: '전환 분석' },
    { key: 'realtime', label: '실시간' },
  ]

  return (
    <div className="py-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Admin Navigation */}
      <div className="flex items-center gap-6 mb-6 border-b border-gray-200 pb-3">
        <Link href="/admin/dashboard" className="text-sm text-gray-500 hover:text-[#1B3B2F] transition-colors pb-3 -mb-3">
          블로그 관리
        </Link>
        <Link href="/admin/consultations" className="text-sm text-gray-500 hover:text-[#1B3B2F] transition-colors pb-3 -mb-3">
          상담 관리
        </Link>
        <Link href="/admin/seo" className="text-sm text-gray-500 hover:text-[#1B3B2F] transition-colors pb-3 -mb-3">
          SEO 관리
        </Link>
        <span className="text-sm font-semibold text-[#1B3B2F] border-b-2 border-[#1B3B2F] pb-3 -mb-3">
          방문자 분석
        </span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-black">방문자 분석</h1>
          <p className="text-sm text-gray-500 mt-1">사이트 방문자 행동을 분석하고 마케팅 효과를 측정합니다.</p>
        </div>
        <div className="flex items-center gap-3">
          {tab !== 'realtime' && (
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="px-3 py-2 border border-gray-200 text-sm bg-white"
            >
              <option value={7}>최근 7일</option>
              <option value={14}>최근 14일</option>
              <option value={30}>최근 30일</option>
              <option value={90}>최근 90일</option>
            </select>
          )}
          <button
            onClick={() => {
              sessionStorage.removeItem('admin_authenticated')
              router.push('/admin')
            }}
            className="px-4 py-2.5 border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            로그아웃
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-lg">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              tab === t.key ? 'bg-white text-[#1B3B2F] shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t.label}
            {t.key === 'realtime' && realtime && (
              <span className="ml-1.5 inline-flex items-center justify-center w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin w-8 h-8 border-2 border-[#1B3B2F] border-t-transparent rounded-full" />
        </div>
      ) : (
        <>
          {/* ── 1. OVERVIEW ── */}
          {tab === 'overview' && stats && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: '총 조회수', value: stats.totalViews.toLocaleString() },
                  { label: '순 방문자', value: stats.uniqueVisitors.toLocaleString() },
                  { label: '세션', value: stats.totalSessions.toLocaleString() },
                  { label: '이탈률', value: `${stats.bounceRate}%` },
                  { label: '신규 방문자', value: stats.newVisitors.toLocaleString() },
                  { label: '평균 체류시간', value: fmtDuration(stats.avgDuration) },
                  { label: '평균 페이지/세션', value: `${stats.avgPages}` },
                  { label: '전환 이벤트', value: stats.totalEvents.toLocaleString() },
                ].map((card) => (
                  <div key={card.label} className="bg-white border border-gray-200 p-4 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">{card.label}</p>
                    <p className="text-xl font-bold text-black">{card.value}</p>
                  </div>
                ))}
              </div>

              {/* Daily Chart */}
              <div className="bg-white border border-gray-200 p-6 rounded-lg">
                <h3 className="text-sm font-semibold text-black mb-4">일별 페이지 조회수</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stats.dailyChart}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={(v) => v.slice(5)} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="views" stroke="#1B3B2F" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Hourly Heatmap */}
              <div className="bg-white border border-gray-200 p-6 rounded-lg">
                <h3 className="text-sm font-semibold text-black mb-4">시간대별 트래픽 분포</h3>
                <div className="grid grid-cols-24 gap-1">
                  {stats.hourlyHeatmap.map((count, hour) => {
                    const max = Math.max(...stats.hourlyHeatmap, 1)
                    const intensity = count / max
                    return (
                      <div key={hour} className="text-center">
                        <div
                          className="h-10 rounded-sm mb-1 relative group cursor-default"
                          style={{
                            backgroundColor: `rgba(27, 59, 47, ${0.1 + intensity * 0.9})`,
                          }}
                        >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded hidden group-hover:block whitespace-nowrap z-10">
                            {hour}시: {count}회
                          </div>
                        </div>
                        <span className="text-[10px] text-gray-400">{hour}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ── 2. CHANNELS ── */}
          {tab === 'channels' && channelData && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Channel Distribution Pie */}
                <div className="bg-white border border-gray-200 p-6 rounded-lg">
                  <h3 className="text-sm font-semibold text-black mb-4">유입 채널 분포</h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={channelData.channels.map((c) => ({ ...c, name: CHANNEL_LABELS[c.name] || c.name }))}
                          cx="50%" cy="50%" innerRadius={60} outerRadius={100}
                          dataKey="value" nameKey="name"
                          label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                        >
                          {channelData.channels.map((_, i) => (
                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Channel Table */}
                <div className="bg-white border border-gray-200 p-6 rounded-lg">
                  <h3 className="text-sm font-semibold text-black mb-4">채널별 방문수</h3>
                  <div className="space-y-2">
                    {channelData.channels.map((ch, i) => {
                      const total = channelData.channels.reduce((s, c) => s + c.value, 0)
                      const pct = total > 0 ? (ch.value / total) * 100 : 0
                      return (
                        <div key={ch.name} className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                          <span className="text-sm text-gray-700 w-24">{CHANNEL_LABELS[ch.name] || ch.name}</span>
                          <div className="flex-1 bg-gray-100 h-5 rounded overflow-hidden">
                            <div className="h-full rounded" style={{ width: `${pct}%`, backgroundColor: COLORS[i % COLORS.length] }} />
                          </div>
                          <span className="text-sm font-medium text-black w-16 text-right">{ch.value.toLocaleString()}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Keywords */}
              <div className="bg-white border border-gray-200 p-6 rounded-lg">
                <h3 className="text-sm font-semibold text-black mb-4">검색 키워드 TOP 20</h3>
                {channelData.topKeywords.length === 0 ? (
                  <p className="text-sm text-gray-400">검색 키워드 데이터가 없습니다.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
                    {channelData.topKeywords.map((kw, i) => (
                      <div key={kw.keyword} className="flex items-center gap-3 py-1.5 border-b border-gray-50">
                        <span className="text-xs text-gray-400 w-5 text-right">{i + 1}</span>
                        <span className="text-sm text-gray-700 flex-1">{kw.keyword}</span>
                        <span className="text-sm font-medium text-black">{kw.count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* UTM Campaigns */}
              {channelData.campaigns.length > 0 && (
                <div className="bg-white border border-gray-200 p-6 rounded-lg">
                  <h3 className="text-sm font-semibold text-black mb-4">UTM 캠페인</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 text-gray-500 font-medium">소스</th>
                          <th className="text-left py-2 text-gray-500 font-medium">매체</th>
                          <th className="text-left py-2 text-gray-500 font-medium">캠페인</th>
                          <th className="text-right py-2 text-gray-500 font-medium">세션</th>
                        </tr>
                      </thead>
                      <tbody>
                        {channelData.campaigns.map((c, i) => (
                          <tr key={i} className="border-b border-gray-50">
                            <td className="py-2">{c.source}</td>
                            <td className="py-2 text-gray-600">{c.medium || '-'}</td>
                            <td className="py-2 text-gray-600">{c.campaign || '-'}</td>
                            <td className="py-2 text-right font-medium">{c.count}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── 3. PAGES ── */}
          {tab === 'pages' && pageData && (
            <div className="space-y-6">
              {/* Popular Pages */}
              <div className="bg-white border border-gray-200 p-6 rounded-lg">
                <h3 className="text-sm font-semibold text-black mb-4">인기 페이지</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 text-gray-500 font-medium">페이지</th>
                        <th className="text-right py-2 text-gray-500 font-medium">조회수</th>
                        <th className="text-right py-2 text-gray-500 font-medium">평균 체류</th>
                        <th className="text-right py-2 text-gray-500 font-medium">스크롤 깊이</th>
                        <th className="text-right py-2 text-gray-500 font-medium">이탈률</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pageData.popularPages.map((p) => (
                        <tr key={p.path} className="border-b border-gray-50">
                          <td className="py-2">
                            <span className="font-medium">{PAGE_NAMES[p.path] || p.title}</span>
                            <span className="text-gray-400 text-xs ml-2">{p.path}</span>
                          </td>
                          <td className="py-2 text-right font-medium">{p.views.toLocaleString()}</td>
                          <td className="py-2 text-right text-gray-600">{fmtDuration(p.avgTime)}</td>
                          <td className="py-2 text-right text-gray-600">{p.avgScroll}%</td>
                          <td className="py-2 text-right">
                            <span className={p.bounceRate > 70 ? 'text-red-600' : p.bounceRate > 50 ? 'text-yellow-600' : 'text-green-600'}>
                              {p.bounceRate}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Landing Pages */}
                <div className="bg-white border border-gray-200 p-6 rounded-lg">
                  <h3 className="text-sm font-semibold text-black mb-4">랜딩 페이지</h3>
                  <div className="space-y-1">
                    {pageData.landingPages.map((p, i) => (
                      <div key={p.path} className="flex items-center gap-3 py-1.5 border-b border-gray-50">
                        <span className="text-xs text-gray-400 w-5 text-right">{i + 1}</span>
                        <span className="text-sm text-gray-700 flex-1 truncate">{PAGE_NAMES[p.path] || p.path}</span>
                        <span className="text-sm font-medium text-black">{p.count}</span>
                      </div>
                    ))}
                    {pageData.landingPages.length === 0 && (
                      <p className="text-sm text-gray-400">데이터가 없습니다.</p>
                    )}
                  </div>
                </div>

                {/* Exit Pages */}
                <div className="bg-white border border-gray-200 p-6 rounded-lg">
                  <h3 className="text-sm font-semibold text-black mb-4">이탈 페이지</h3>
                  <div className="space-y-1">
                    {pageData.exitPages.map((p, i) => (
                      <div key={p.path} className="flex items-center gap-3 py-1.5 border-b border-gray-50">
                        <span className="text-xs text-gray-400 w-5 text-right">{i + 1}</span>
                        <span className="text-sm text-gray-700 flex-1 truncate">{PAGE_NAMES[p.path] || p.path}</span>
                        <span className="text-sm font-medium text-black">{p.count}</span>
                      </div>
                    ))}
                    {pageData.exitPages.length === 0 && (
                      <p className="text-sm text-gray-400">데이터가 없습니다.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── 4. DEVICES ── */}
          {tab === 'devices' && deviceData && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Device Type Pie */}
                <div className="bg-white border border-gray-200 p-6 rounded-lg">
                  <h3 className="text-sm font-semibold text-black mb-4">디바이스 유형</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={deviceData.deviceTypes.map((d) => ({
                            ...d, name: d.name === 'mobile' ? '모바일' : d.name === 'desktop' ? '데스크톱' : '태블릿',
                          }))}
                          cx="50%" cy="50%" innerRadius={50} outerRadius={90}
                          dataKey="count" nameKey="name"
                          label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                        >
                          {deviceData.deviceTypes.map((_, i) => (
                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Brands */}
                <div className="bg-white border border-gray-200 p-6 rounded-lg">
                  <h3 className="text-sm font-semibold text-black mb-4">기기 브랜드</h3>
                  {deviceData.brands.length === 0 ? (
                    <p className="text-sm text-gray-400">브랜드 데이터가 없습니다.</p>
                  ) : (
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={deviceData.brands.slice(0, 8)} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis type="number" tick={{ fontSize: 11 }} />
                          <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={80} />
                          <Tooltip />
                          <Bar dataKey="count" fill="#1B3B2F" radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>

                {/* Browsers */}
                <div className="bg-white border border-gray-200 p-6 rounded-lg">
                  <h3 className="text-sm font-semibold text-black mb-4">브라우저</h3>
                  <div className="space-y-2">
                    {deviceData.browsers.map((b, i) => {
                      const total = deviceData.browsers.reduce((s, x) => s + x.count, 0)
                      const pct = total > 0 ? (b.count / total) * 100 : 0
                      return (
                        <div key={b.name} className="flex items-center gap-3">
                          <span className="text-sm text-gray-700 w-20">{b.name}</span>
                          <div className="flex-1 bg-gray-100 h-5 rounded overflow-hidden">
                            <div className="h-full rounded" style={{ width: `${pct}%`, backgroundColor: COLORS[i % COLORS.length] }} />
                          </div>
                          <span className="text-sm font-medium text-black w-16 text-right">{b.count}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* OS */}
                <div className="bg-white border border-gray-200 p-6 rounded-lg">
                  <h3 className="text-sm font-semibold text-black mb-4">운영체제</h3>
                  <div className="space-y-2">
                    {deviceData.operatingSystems.map((o, i) => {
                      const total = deviceData.operatingSystems.reduce((s, x) => s + x.count, 0)
                      const pct = total > 0 ? (o.count / total) * 100 : 0
                      return (
                        <div key={o.name} className="flex items-center gap-3">
                          <span className="text-sm text-gray-700 w-20">{o.name}</span>
                          <div className="flex-1 bg-gray-100 h-5 rounded overflow-hidden">
                            <div className="h-full rounded" style={{ width: `${pct}%`, backgroundColor: COLORS[i % COLORS.length] }} />
                          </div>
                          <span className="text-sm font-medium text-black w-16 text-right">{o.count}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Screen Resolutions */}
              <div className="bg-white border border-gray-200 p-6 rounded-lg">
                <h3 className="text-sm font-semibold text-black mb-4">화면 해상도</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {deviceData.resolutions.map((r) => (
                    <div key={r.name} className="bg-gray-50 p-3 rounded text-center">
                      <p className="text-sm font-medium text-black">{r.name}</p>
                      <p className="text-xs text-gray-500">{r.count}회</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── 5. CONVERSIONS ── */}
          {tab === 'conversions' && convData && (
            <div className="space-y-6">
              {/* Conversion Rate Card */}
              <div className="bg-white border border-gray-200 p-6 rounded-lg flex items-center gap-8">
                <div>
                  <p className="text-xs text-gray-500 mb-1">전체 전환율</p>
                  <p className="text-3xl font-bold text-[#1B3B2F]">{convData.overallConversionRate}%</p>
                  <p className="text-xs text-gray-400 mt-1">총 {convData.totalSessions.toLocaleString()} 세션 기준</p>
                </div>
                <div className="flex-1 h-20">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={convData.funnel.map((f) => ({ ...f, type: EVENT_LABELS[f.type] || f.type }))}>
                      <XAxis dataKey="type" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#1B3B2F" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Event Counts */}
                <div className="bg-white border border-gray-200 p-6 rounded-lg">
                  <h3 className="text-sm font-semibold text-black mb-4">이벤트별 횟수</h3>
                  <div className="space-y-2">
                    {convData.eventCounts.map((e) => (
                      <div key={e.type} className="flex items-center justify-between py-1.5 border-b border-gray-50">
                        <span className="text-sm text-gray-700">{EVENT_LABELS[e.type] || e.type}</span>
                        <span className="text-sm font-medium text-black">{e.count}</span>
                      </div>
                    ))}
                    {convData.eventCounts.length === 0 && (
                      <p className="text-sm text-gray-400">이벤트 데이터가 없습니다.</p>
                    )}
                  </div>
                </div>

                {/* Conversion Paths */}
                <div className="bg-white border border-gray-200 p-6 rounded-lg">
                  <h3 className="text-sm font-semibold text-black mb-4">전환이 발생한 페이지</h3>
                  <div className="space-y-2">
                    {convData.conversionPaths.map((p, i) => (
                      <div key={p.path} className="flex items-center gap-3 py-1.5 border-b border-gray-50">
                        <span className="text-xs text-gray-400 w-5 text-right">{i + 1}</span>
                        <span className="text-sm text-gray-700 flex-1 truncate">{PAGE_NAMES[p.path] || p.path}</span>
                        <span className="text-sm font-medium text-black">{p.count}건</span>
                      </div>
                    ))}
                    {convData.conversionPaths.length === 0 && (
                      <p className="text-sm text-gray-400">전환 데이터가 없습니다.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Channel Performance */}
              <div className="bg-white border border-gray-200 p-6 rounded-lg">
                <h3 className="text-sm font-semibold text-black mb-4">채널별 전환 성과</h3>
                {convData.channelPerformance.length === 0 ? (
                  <p className="text-sm text-gray-400">데이터가 없습니다.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 text-gray-500 font-medium">채널</th>
                          <th className="text-right py-2 text-gray-500 font-medium">이벤트 수</th>
                          <th className="text-right py-2 text-gray-500 font-medium">전환</th>
                          <th className="text-right py-2 text-gray-500 font-medium">전환율</th>
                        </tr>
                      </thead>
                      <tbody>
                        {convData.channelPerformance.map((c) => (
                          <tr key={c.channel} className="border-b border-gray-50">
                            <td className="py-2">{CHANNEL_LABELS[c.channel] || c.channel}</td>
                            <td className="py-2 text-right">{c.sessions}</td>
                            <td className="py-2 text-right font-medium">{c.conversions}</td>
                            <td className="py-2 text-right">
                              <span className={c.rate > 5 ? 'text-green-600 font-medium' : 'text-gray-600'}>
                                {c.rate}%
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── 6. REALTIME ── */}
          {tab === 'realtime' && realtime && (
            <div className="space-y-6">
              {/* Active Visitors */}
              <div className="bg-white border border-gray-200 p-6 rounded-lg flex items-center gap-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <div>
                  <p className="text-xs text-gray-500">현재 활성 방문자 (5분 이내)</p>
                  <p className="text-3xl font-bold text-[#1B3B2F]">{realtime.activeVisitors}명</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Current Page Distribution */}
                <div className="bg-white border border-gray-200 p-6 rounded-lg">
                  <h3 className="text-sm font-semibold text-black mb-4">현재 페이지 분포</h3>
                  <div className="space-y-2">
                    {realtime.topPages.map((p) => (
                      <div key={p.path} className="flex items-center justify-between py-1.5 border-b border-gray-50">
                        <span className="text-sm text-gray-700">{PAGE_NAMES[p.path] || p.path}</span>
                        <span className="text-sm font-medium text-[#1B3B2F]">{p.count}명</span>
                      </div>
                    ))}
                    {realtime.topPages.length === 0 && (
                      <p className="text-sm text-gray-400">현재 활성 방문자가 없습니다.</p>
                    )}
                  </div>
                </div>

                {/* Recent Events */}
                <div className="bg-white border border-gray-200 p-6 rounded-lg">
                  <h3 className="text-sm font-semibold text-black mb-4">최근 이벤트 (30분)</h3>
                  <div className="space-y-2 max-h-80 overflow-y-auto">
                    {realtime.recentEvents.map((e, i) => (
                      <div key={i} className="flex items-center gap-2 py-1.5 border-b border-gray-50">
                        <span className={`inline-block w-2 h-2 rounded-full flex-shrink-0 ${
                          ['form_submit', 'kakao_click', 'phone_click'].includes(e.event_type)
                            ? 'bg-green-500' : 'bg-blue-400'
                        }`} />
                        <span className="text-sm text-gray-700 flex-1">
                          {EVENT_LABELS[e.event_type] || e.event_type}
                          {e.event_label && <span className="text-gray-400 ml-1">({e.event_label})</span>}
                        </span>
                        <span className="text-xs text-gray-400">{timeAgo(e.created_at)}</span>
                      </div>
                    ))}
                    {realtime.recentEvents.length === 0 && (
                      <p className="text-sm text-gray-400">최근 이벤트가 없습니다.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Live Feed */}
              <div className="bg-white border border-gray-200 p-6 rounded-lg">
                <h3 className="text-sm font-semibold text-black mb-4">실시간 피드 (30분)</h3>
                <div className="space-y-1 max-h-96 overflow-y-auto">
                  {realtime.liveFeed.map((v, i) => (
                    <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 text-sm">
                      <span className="text-gray-400 text-xs w-16 flex-shrink-0">{timeAgo(v.created_at)}</span>
                      <span className={`inline-block px-1.5 py-0.5 text-[10px] rounded flex-shrink-0 ${
                        v.device_type === 'mobile' ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-600'
                      }`}>
                        {v.device_type === 'mobile' ? '모바일' : v.device_type === 'tablet' ? '태블릿' : 'PC'}
                      </span>
                      <span className="text-gray-700 flex-1 truncate">{PAGE_NAMES[v.page_path] || v.page_path}</span>
                      {v.referrer_type && (
                        <span className="text-xs text-gray-400">{CHANNEL_LABELS[v.referrer_type] || v.referrer_type}</span>
                      )}
                    </div>
                  ))}
                  {realtime.liveFeed.length === 0 && (
                    <p className="text-sm text-gray-400">최근 30분간 방문 기록이 없습니다.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
