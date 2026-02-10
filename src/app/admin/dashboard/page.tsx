'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { type BlogPost, getAllPosts, getAdminStats, deletePost, updatePost, formatDate } from '@/lib/blog'
import { supabase } from '@/lib/supabase'

interface BulkResult {
  type: string
  index?: number
  topic?: string
  title?: string
  slug?: string
  category?: string
  author?: string
  error?: string
  total?: number
  status?: string
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [stats, setStats] = useState({ total: 0, published: 0, draft: 0, totalViews: 0 })
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [deleting, setDeleting] = useState<number | null>(null)
  const [newConsultationCount, setNewConsultationCount] = useState(0)

  // Bulk generation state
  const [bulkRunning, setBulkRunning] = useState(false)
  const [bulkTotal, setBulkTotal] = useState(0)
  const [bulkCompleted, setBulkCompleted] = useState(0)
  const [bulkErrors, setBulkErrors] = useState(0)
  const [bulkCurrent, setBulkCurrent] = useState('')
  const [bulkResults, setBulkResults] = useState<BulkResult[]>([])
  const [bulkDone, setBulkDone] = useState(false)
  const bulkLogRef = useRef<HTMLDivElement>(null)

  // Delete all state
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deletingAll, setDeletingAll] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('admin_authenticated') !== 'true') {
      router.push('/admin')
      return
    }
    fetchData()
  }, [router])

  async function fetchData() {
    setLoading(true)
    try {
      const [postsResult, statsResult] = await Promise.all([getAllPosts(), getAdminStats()])
      setPosts(postsResult.posts)
      setStats(statsResult)
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }

    try {
      const { count } = await supabase
        .from('consultations')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'new')
      setNewConsultationCount(count || 0)
    } catch {
      // ignore
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) return
    setDeleting(id)
    const { error } = await deletePost(id)
    if (!error) {
      setPosts((prev) => prev.filter((p) => p.id !== id))
      setStats((prev) => ({ ...prev, total: prev.total - 1 }))
    }
    setDeleting(null)
  }

  async function toggleNaverPublished(post: BlogPost) {
    const newValue = !post.naver_published
    const { error } = await updatePost(post.id, { naver_published: newValue } as Partial<BlogPost>)
    if (!error) {
      setPosts((prev) =>
        prev.map((p) => p.id === post.id ? { ...p, naver_published: newValue } : p)
      )
    }
  }

  async function handleDeleteAll() {
    setDeletingAll(true)
    try {
      const res = await fetch('/api/delete-all-blogs', { method: 'DELETE' })
      if (res.ok) {
        setPosts([])
        setStats({ total: 0, published: 0, draft: 0, totalViews: 0 })
        setShowDeleteModal(false)
      } else {
        const data = await res.json()
        alert(`삭제 실패: ${data.error}`)
      }
    } catch {
      alert('삭제 중 오류가 발생했습니다.')
    } finally {
      setDeletingAll(false)
    }
  }

  async function handleBulkGenerate() {
    if (bulkRunning) return
    if (!confirm('SEO 블로그 30개를 자동 생성합니다. 약 3~4분 소요됩니다. 진행하시겠습니까?')) return

    setBulkRunning(true)
    setBulkCompleted(0)
    setBulkErrors(0)
    setBulkTotal(30)
    setBulkCurrent('시작 중...')
    setBulkResults([])
    setBulkDone(false)

    try {
      const res = await fetch('/api/bulk-generate-blog', { method: 'POST' })
      if (!res.body) {
        alert('스트리밍을 지원하지 않는 환경입니다.')
        setBulkRunning(false)
        return
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          try {
            const data: BulkResult = JSON.parse(line.slice(6))

            if (data.type === 'start') {
              setBulkTotal(data.total || 30)
            } else if (data.type === 'progress') {
              setBulkCurrent(`${data.topic} (${data.author})`)
            } else if (data.type === 'done') {
              setBulkCompleted((prev) => prev + 1)
              setBulkResults((prev) => [...prev, data])
              setTimeout(() => {
                bulkLogRef.current?.scrollTo({ top: bulkLogRef.current.scrollHeight, behavior: 'smooth' })
              }, 100)
            } else if (data.type === 'error') {
              setBulkErrors((prev) => prev + 1)
              setBulkResults((prev) => [...prev, data])
              setTimeout(() => {
                bulkLogRef.current?.scrollTo({ top: bulkLogRef.current.scrollHeight, behavior: 'smooth' })
              }, 100)
            } else if (data.type === 'complete') {
              setBulkDone(true)
              setBulkCurrent('완료!')
            }
          } catch {
            // skip parse errors
          }
        }
      }
    } catch (err) {
      alert(`오류: ${err instanceof Error ? err.message : '알 수 없는 오류'}`)
    } finally {
      setBulkRunning(false)
      fetchData()
    }
  }

  const filteredPosts = search
    ? posts.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()) || p.category.includes(search))
    : posts

  const statusLabel = (status: string) => {
    switch (status) {
      case 'published': return { text: '게시됨', color: 'bg-emerald-50 text-emerald-700' }
      case 'draft': return { text: '임시저장', color: 'bg-gray-100 text-gray-600' }
      case 'scheduled': return { text: '예약', color: 'bg-blue-50 text-blue-700' }
      default: return { text: status, color: 'bg-gray-100 text-gray-600' }
    }
  }

  return (
    <div className="py-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Navigation Tabs */}
      <div className="flex items-center gap-6 mb-6 border-b border-gray-200 pb-3">
        <span className="text-sm font-semibold text-[#1B3B2F] border-b-2 border-[#1B3B2F] pb-3 -mb-3">
          블로그 관리
        </span>
        <Link
          href="/admin/consultations"
          className="relative text-sm text-gray-500 hover:text-[#1B3B2F] transition-colors pb-3 -mb-3"
        >
          상담 관리
          {newConsultationCount > 0 && (
            <span className="absolute -top-1 -right-5 inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-red-500 rounded-full">
              {newConsultationCount > 99 ? '99+' : newConsultationCount}
            </span>
          )}
        </Link>
        <Link
          href="/admin/seo"
          className="text-sm text-gray-500 hover:text-[#1B3B2F] transition-colors pb-3 -mb-3"
        >
          SEO 관리
        </Link>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-black">블로그 관리</h1>
          <p className="text-sm text-gray-500 mt-1">게시글을 관리하고 새로운 글을 작성하세요.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/write"
            className="px-4 py-2.5 bg-[#1B3B2F] text-white text-sm font-medium hover:bg-[#1B3B2F]/90 transition-colors"
          >
            + 새 글 작성
          </Link>
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

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: '전체 글', value: stats.total, color: 'text-black' },
          { label: '게시됨', value: stats.published, color: 'text-emerald-600' },
          { label: '임시저장', value: stats.draft, color: 'text-gray-500' },
          { label: '총 조회수', value: stats.totalViews.toLocaleString(), color: 'text-blue-600' },
        ].map((stat) => (
          <div key={stat.label} className="p-5 border border-gray-100 bg-white">
            <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Bulk Actions */}
      <div className="mb-8 p-6 border border-gray-200 bg-gray-50 rounded-lg">
        <h2 className="text-sm font-bold text-black mb-3">SEO 블로그 대량 생성</h2>
        <p className="text-xs text-gray-500 mb-4">
          성범죄(10개), 재산범죄(10개), 회생파산(5개), 일반(5개) 총 30개 블로그 글을 AI로 자동 생성합니다.
          카테고리별 담당 변호사 말투가 자동 적용됩니다.
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={handleBulkGenerate}
            disabled={bulkRunning}
            className="px-5 py-2.5 bg-[#1B3B2F] text-white text-sm font-medium hover:bg-[#1B3B2F]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded"
          >
            {bulkRunning ? '생성 중...' : 'SEO 블로그 30개 자동 생성'}
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            disabled={bulkRunning}
            className="px-5 py-2.5 border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded"
          >
            기존 글 전체 삭제
          </button>
        </div>

        {/* Progress UI */}
        {(bulkRunning || bulkDone) && (
          <div className="mt-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1B3B2F] rounded-full transition-all duration-500"
                  style={{ width: `${bulkTotal > 0 ? ((bulkCompleted + bulkErrors) / bulkTotal) * 100 : 0}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-black whitespace-nowrap">
                {bulkCompleted + bulkErrors} / {bulkTotal}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
              <span className="text-emerald-600 font-medium">성공: {bulkCompleted}</span>
              {bulkErrors > 0 && <span className="text-red-500 font-medium">실패: {bulkErrors}</span>}
              {bulkRunning && <span className="animate-pulse">생성 중: {bulkCurrent}</span>}
              {bulkDone && <span className="text-[#1B3B2F] font-semibold">완료!</span>}
            </div>

            <div
              ref={bulkLogRef}
              className="max-h-64 overflow-y-auto border border-gray-200 bg-white rounded text-xs divide-y divide-gray-100"
            >
              {bulkResults.map((r, i) => (
                <div key={i} className={`px-4 py-2.5 flex items-center justify-between ${r.type === 'error' ? 'bg-red-50' : ''}`}>
                  {r.type === 'done' ? (
                    <>
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-emerald-500 flex-shrink-0">&#10003;</span>
                        <span className="font-medium text-black truncate">{r.title}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                        <span className="text-gray-400">{r.category}</span>
                        <span className="text-gray-400">{r.author}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-red-500 flex-shrink-0">&#10007;</span>
                        <span className="text-red-600 truncate">{r.topic}</span>
                      </div>
                      <span className="text-red-400 flex-shrink-0 ml-3">{r.error}</span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Delete All Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-bold text-black mb-2">블로그 글 전체 삭제</h3>
            <p className="text-sm text-gray-500 mb-1">
              현재 {stats.total}개의 글이 있습니다.
            </p>
            <p className="text-sm text-red-500 font-medium mb-6">
              이 작업은 되돌릴 수 없습니다. 모든 블로그 글이 영구 삭제됩니다.
            </p>
            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={deletingAll}
                className="px-5 py-2.5 border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors rounded"
              >
                취소
              </button>
              <button
                onClick={handleDeleteAll}
                disabled={deletingAll}
                className="px-5 py-2.5 bg-red-600 text-white text-sm font-medium hover:bg-red-700 disabled:opacity-50 transition-colors rounded"
              >
                {deletingAll ? '삭제 중...' : '전체 삭제'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative mb-6">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="제목 또는 카테고리로 검색..."
          className="w-full pl-10 pr-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-[#1B3B2F] transition-colors"
        />
      </div>

      {/* Posts Table */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="animate-pulse h-16 bg-gray-50 border border-gray-100" />
          ))}
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-sm">
            {search ? '검색 결과가 없습니다.' : '아직 작성된 글이 없습니다.'}
          </p>
          <Link href="/admin/write" className="inline-block mt-4 text-sm text-[#1B3B2F] font-medium hover:underline">
            첫 번째 글 작성하기
          </Link>
        </div>
      ) : (
        <div className="border border-gray-100 divide-y divide-gray-100 bg-white">
          <div className="hidden sm:grid sm:grid-cols-12 gap-4 px-5 py-3 bg-gray-50 text-xs font-medium text-gray-500">
            <div className="col-span-4">제목</div>
            <div className="col-span-1">카테고리</div>
            <div className="col-span-1">상태</div>
            <div className="col-span-1">네이버</div>
            <div className="col-span-1 text-right">조회</div>
            <div className="col-span-2">날짜</div>
            <div className="col-span-2 text-right">관리</div>
          </div>

          {filteredPosts.map((post) => {
            const s = statusLabel(post.status)
            return (
              <div
                key={post.id}
                className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 px-5 py-4 hover:bg-gray-50 transition-colors items-center"
              >
                <div className="col-span-4">
                  <Link
                    href={`/admin/write?id=${post.id}`}
                    className="text-sm font-medium text-black hover:text-[#1B3B2F] transition-colors line-clamp-1"
                  >
                    {post.title}
                  </Link>
                  <p className="text-xs text-gray-400 mt-0.5 line-clamp-1 sm:hidden">
                    {post.category} · {s.text} · 조회 {post.view_count}
                  </p>
                </div>
                <div className="col-span-1 hidden sm:block">
                  <span className="text-xs text-gray-600">{post.category}</span>
                </div>
                <div className="col-span-1 hidden sm:block">
                  <span className={`inline-block text-xs px-2 py-0.5 ${s.color}`}>{s.text}</span>
                </div>
                <div className="col-span-1 hidden sm:block">
                  <button
                    onClick={() => toggleNaverPublished(post)}
                    className={`inline-block text-xs px-2 py-0.5 cursor-pointer transition-colors ${
                      post.naver_published
                        ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {post.naver_published ? '발행됨' : '미발행'}
                  </button>
                </div>
                <div className="col-span-1 hidden sm:block text-right">
                  <span className="text-xs text-gray-500">{post.view_count}</span>
                </div>
                <div className="col-span-2 hidden sm:block">
                  <span className="text-xs text-gray-400">
                    {formatDate(post.published_at || post.created_at)}
                  </span>
                </div>
                <div className="col-span-2 flex justify-end gap-2">
                  <Link
                    href={`/admin/write?id=${post.id}`}
                    className="text-xs text-gray-500 hover:text-[#1B3B2F] transition-colors"
                  >
                    수정
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    disabled={deleting === post.id}
                    className="text-xs text-red-400 hover:text-red-600 disabled:opacity-50 transition-colors"
                  >
                    {deleting === post.id ? '...' : '삭제'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
