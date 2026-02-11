'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { type BlogPost, getAllPosts, getAdminStats, deletePost, updatePost, formatDate } from '@/lib/blog'
import { supabase } from '@/lib/supabase'

const TOPICS = [
  { topic: '성범죄 피해를 당했을 때 가장 먼저 해야 할 것들', category: '성범죄' },
  { topic: '디지털 성범죄 증거, 이렇게 보존하세요', category: '성범죄' },
  { topic: '스토킹 피해, 접근금지 가처분으로 나를 지키는 방법', category: '성범죄' },
  { topic: '불법촬영 피해를 발견했다면 당황하지 마세요', category: '성범죄' },
  { topic: '데이트폭력, 사랑이 아니라 범죄입니다', category: '성범죄' },
  { topic: '딥페이크 성범죄 피해자가 알아야 할 모든 것', category: '성범죄' },
  { topic: '리벤지포르노 유포 피해, 혼자 해결하려 하지 마세요', category: '성범죄' },
  { topic: '성범죄 피해자 국선변호사 제도 활용하는 방법', category: '성범죄' },
  { topic: '직장 내 성희롱 피해, 어디에 어떻게 신고하나요', category: '성범죄' },
  { topic: '아동 청소년 대상 성범죄 신고와 보호 절차', category: '성범죄' },
  { topic: '보이스피싱 피해금 환급받는 방법 총정리', category: '재산범죄' },
  { topic: '전세사기 피해자 특별법, 이렇게 활용하세요', category: '재산범죄' },
  { topic: '투자사기 피해 민형사 동시 진행하는 전략', category: '재산범죄' },
  { topic: '횡령 배임 피해자의 고소장 이렇게 쓰세요', category: '재산범죄' },
  { topic: '사기죄 고소할 때 꼭 필요한 증거 체크리스트', category: '재산범죄' },
  { topic: '중고거래 사기 당했을 때 대처법', category: '재산범죄' },
  { topic: '보험사기 피해자가 보상받는 절차', category: '재산범죄' },
  { topic: '임금체불 피해, 체불 사업주를 처벌하는 방법', category: '재산범죄' },
  { topic: '온라인 쇼핑몰 사기 피해 신고와 환불 받기', category: '재산범죄' },
  { topic: '가상화폐 투자사기 피해 구제 방법', category: '재산범죄' },
  { topic: '개인회생 신청 자격, 나도 가능할까요', category: '회생파산' },
  { topic: '개인파산 면책까지의 과정 쉽게 정리', category: '회생파산' },
  { topic: '개인회생 vs 개인파산, 나에게 맞는 선택은', category: '회생파산' },
  { topic: '신용회복위원회 vs 개인회생, 뭐가 다른가요', category: '회생파산' },
  { topic: '개인회생 중 주의해야 할 것들', category: '회생파산' },
  { topic: '형사 고소장, 어렵지 않게 작성하는 방법', category: '일반' },
  { topic: '합의금 협상할 때 피해자가 꼭 알아야 할 것', category: '일반' },
  { topic: '피해자가 법정에 서야 할 때 준비하는 방법', category: '일반' },
  { topic: '고소와 고발의 차이, 헷갈리시죠', category: '일반' },
  { topic: '좋은 변호사 선택하는 기준 5가지', category: '일반' },
]

function getAuthorByCategory(category: string): string {
  switch (category) {
    case '재산범죄':
    case '회생파산':
      return '노채은 변호사'
    case '성범죄':
    case '일반':
    default:
      return '이유림 변호사'
  }
}

interface BulkResult {
  type: 'done' | 'error' | 'skipped'
  index: number
  topic: string
  title?: string
  slug?: string
  category?: string
  author?: string
  error?: string
  reason?: string
  existingTitle?: string
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
  const [bulkSkipped, setBulkSkipped] = useState(0)
  const [bulkCurrent, setBulkCurrent] = useState('')
  const [bulkResults, setBulkResults] = useState<BulkResult[]>([])
  const [bulkDone, setBulkDone] = useState(false)
  const bulkLogRef = useRef<HTMLDivElement>(null)
  const stopRef = useRef(false)

  // Thumbnail re-assign state
  const [thumbnailUpdating, setThumbnailUpdating] = useState(false)
  const [thumbnailResult, setThumbnailResult] = useState('')

  // Naver content bulk generation state
  const [naverUpdating, setNaverUpdating] = useState(false)
  const [naverResult, setNaverResult] = useState('')
  const [naverTotal, setNaverTotal] = useState(0)
  const [naverCompleted, setNaverCompleted] = useState(0)
  const [naverErrors, setNaverErrors] = useState(0)
  const [naverCurrent, setNaverCurrent] = useState('')
  const [naverFailedList, setNaverFailedList] = useState<{ id: number; title: string; error: string }[]>([])

  // GEO rewrite state
  const [geoRewriting, setGeoRewriting] = useState(false)
  const [geoPostId, setGeoPostId] = useState<number | null>(null)
  const [geoResult, setGeoResult] = useState('')
  const [geoBulkRunning, setGeoBulkRunning] = useState(false)
  const [geoBulkTotal, setGeoBulkTotal] = useState(0)
  const [geoBulkCompleted, setGeoBulkCompleted] = useState(0)
  const [geoBulkErrors, setGeoBulkErrors] = useState(0)
  const [geoBulkCurrent, setGeoBulkCurrent] = useState('')
  const geoBulkStopRef = useRef(false)

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

  async function handleThumbnailReassign() {
    if (thumbnailUpdating) return
    if (!confirm('모든 블로그 글의 썸네일을 다양한 이미지로 재할당합니다. 진행하시겠습니까?')) return

    setThumbnailUpdating(true)
    setThumbnailResult('')
    try {
      const res = await fetch('/api/update-blog-thumbnails', { method: 'POST' })
      const data = await res.json()
      if (res.ok) {
        setThumbnailResult(data.message)
        fetchData()
      } else {
        setThumbnailResult(`오류: ${data.error}`)
      }
    } catch {
      setThumbnailResult('썸네일 업데이트 중 오류가 발생했습니다.')
    } finally {
      setThumbnailUpdating(false)
    }
  }

  async function handleNaverBulkGenerate() {
    if (naverUpdating) return
    if (!confirm('네이버 콘텐츠가 없는 모든 블로그 글에 대해 네이버용 HTML을 생성합니다. 진행하시겠습니까?')) return

    setNaverUpdating(true)
    setNaverResult('')
    setNaverCompleted(0)
    setNaverErrors(0)
    setNaverCurrent('')
    setNaverFailedList([])

    try {
      // 1. Fetch posts without naver_content from client side
      const { data: postsToUpdate, error: fetchErr } = await supabase
        .from('blog_posts')
        .select('id, title')
        .eq('status', 'published')
        .or('naver_content.is.null,naver_content.eq.')
        .order('created_at', { ascending: true })

      if (fetchErr) {
        // Column might not exist
        setNaverResult(`DB 오류: ${fetchErr.message}. naver_content 컬럼이 없을 수 있습니다.`)
        setNaverUpdating(false)
        return
      }

      const targetPosts = postsToUpdate || []
      if (targetPosts.length === 0) {
        setNaverResult('업데이트할 글이 없습니다. (모든 글에 네이버 콘텐츠가 이미 있음)')
        setNaverUpdating(false)
        return
      }

      setNaverTotal(targetPosts.length)

      // 2. Process 1 by 1
      let successCount = 0
      let errorCount = 0
      const failed: { id: number; title: string; error: string }[] = []

      for (let i = 0; i < targetPosts.length; i++) {
        const post = targetPosts[i]
        setNaverCurrent(`${i + 1}/${targetPosts.length} - ${post.title}`)

        try {
          const res = await fetch('/api/update-single-naver', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ postId: post.id }),
          })
          const data = await res.json()

          if (res.ok && data.success) {
            successCount++
            setNaverCompleted(successCount)
          } else {
            errorCount++
            setNaverErrors(errorCount)
            failed.push({ id: post.id, title: post.title, error: data.error || '알 수 없는 오류' })
            setNaverFailedList([...failed])
          }
        } catch (err) {
          errorCount++
          setNaverErrors(errorCount)
          failed.push({ id: post.id, title: post.title, error: err instanceof Error ? err.message : '네트워크 오류' })
          setNaverFailedList([...failed])
        }

        // Wait 1 second between requests
        if (i < targetPosts.length - 1) {
          await sleep(1000)
        }
      }

      setNaverCurrent('')
      setNaverResult(`${successCount}개 성공, ${errorCount}개 실패 (총 ${targetPosts.length}개)`)
      fetchData()
    } catch {
      setNaverResult('네이버 콘텐츠 생성 중 오류가 발생했습니다.')
    } finally {
      setNaverUpdating(false)
    }
  }

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  async function handleBulkGenerate() {
    if (bulkRunning) return
    if (!confirm('SEO 블로그 30개를 자동 생성합니다. 약 10~15분 소요됩니다. 진행하시겠습니까?')) return

    setBulkRunning(true)
    setBulkCompleted(0)
    setBulkErrors(0)
    setBulkSkipped(0)
    setBulkTotal(TOPICS.length)
    setBulkCurrent('시작 중...')
    setBulkResults([])
    setBulkDone(false)
    stopRef.current = false

    for (let i = 0; i < TOPICS.length; i++) {
      // Check if stop was requested
      if (stopRef.current) {
        setBulkCurrent('중지됨')
        break
      }

      const { topic, category } = TOPICS[i]
      const author = getAuthorByCategory(category)
      setBulkCurrent(`${topic} (${author})`)

      try {
        const res = await fetch('/api/generate-single-blog', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ topic, category, index: i }),
        })

        const data = await res.json()

        if (data.skipped) {
          // Duplicate — skip
          setBulkSkipped((prev) => prev + 1)
          setBulkResults((prev) => [...prev, {
            type: 'skipped',
            index: i,
            topic,
            category,
            author,
            reason: data.reason,
            existingTitle: data.existingTitle,
          }])
        } else if (data.success) {
          setBulkCompleted((prev) => prev + 1)
          setBulkResults((prev) => [...prev, {
            type: 'done',
            index: i,
            topic,
            title: data.title,
            slug: data.slug,
            category: data.category,
            author: data.author,
          }])
        } else {
          setBulkErrors((prev) => prev + 1)
          setBulkResults((prev) => [...prev, {
            type: 'error',
            index: i,
            topic,
            category,
            author,
            error: data.error || '알 수 없는 오류',
          }])
        }
      } catch (err) {
        setBulkErrors((prev) => prev + 1)
        setBulkResults((prev) => [...prev, {
          type: 'error',
          index: i,
          topic,
          category,
          author,
          error: err instanceof Error ? err.message : '네트워크 오류',
        }])
      }

      // Scroll log to bottom
      setTimeout(() => {
        bulkLogRef.current?.scrollTo({ top: bulkLogRef.current.scrollHeight, behavior: 'smooth' })
      }, 100)

      // Wait 3 seconds between requests (API rate limit prevention)
      if (i < TOPICS.length - 1 && !stopRef.current) {
        await sleep(3000)
      }
    }

    setBulkDone(true)
    setBulkCurrent(stopRef.current ? '중지됨' : '완료!')
    setBulkRunning(false)
    fetchData()
  }

  function handleStopGeneration() {
    stopRef.current = true
    setBulkCurrent('중지 요청됨...')
  }

  async function handleGeoRewrite(postId: number) {
    if (geoRewriting) return
    setGeoRewriting(true)
    setGeoPostId(postId)
    setGeoResult('')
    try {
      const res = await fetch('/api/geo-rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setGeoResult(`"${data.title}" GEO 리라이트 완료`)
        fetchData()
      } else {
        setGeoResult(`오류: ${data.error}`)
      }
    } catch {
      setGeoResult('GEO 리라이트 중 오류가 발생했습니다.')
    } finally {
      setGeoRewriting(false)
      setGeoPostId(null)
    }
  }

  async function handleGeoBulkRewrite() {
    if (geoBulkRunning) return
    if (!confirm('모든 게시된 블로그 글을 GEO 규칙에 맞게 리라이트합니다. 원본이 덮어쓰여집니다. 진행하시겠습니까?')) return

    setGeoBulkRunning(true)
    setGeoBulkCompleted(0)
    setGeoBulkErrors(0)
    setGeoResult('')
    geoBulkStopRef.current = false

    try {
      const { data: targetPosts } = await supabase
        .from('blog_posts')
        .select('id, title')
        .eq('status', 'published')
        .order('created_at', { ascending: true })

      const targets = targetPosts || []
      if (targets.length === 0) {
        setGeoResult('리라이트할 글이 없습니다.')
        setGeoBulkRunning(false)
        return
      }

      setGeoBulkTotal(targets.length)
      let successCount = 0
      let errorCount = 0

      for (let i = 0; i < targets.length; i++) {
        if (geoBulkStopRef.current) {
          setGeoBulkCurrent('중지됨')
          break
        }

        const post = targets[i]
        setGeoBulkCurrent(`${i + 1}/${targets.length} - ${post.title}`)

        try {
          const res = await fetch('/api/geo-rewrite', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ postId: post.id }),
          })
          const data = await res.json()
          if (res.ok && data.success) {
            successCount++
            setGeoBulkCompleted(successCount)
          } else {
            errorCount++
            setGeoBulkErrors(errorCount)
          }
        } catch {
          errorCount++
          setGeoBulkErrors(errorCount)
        }

        if (i < targets.length - 1 && !geoBulkStopRef.current) {
          await sleep(2000)
        }
      }

      setGeoBulkCurrent('')
      setGeoResult(`GEO 리라이트 완료: ${successCount}개 성공, ${errorCount}개 실패`)
      fetchData()
    } catch {
      setGeoResult('GEO 리라이트 중 오류가 발생했습니다.')
    } finally {
      setGeoBulkRunning(false)
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

  const bulkProcessed = bulkCompleted + bulkErrors + bulkSkipped

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
        <Link
          href="/admin/analytics"
          className="text-sm text-gray-500 hover:text-[#1B3B2F] transition-colors pb-3 -mb-3"
        >
          방문자 분석
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
          카테고리별 담당 변호사 말투가 자동 적용됩니다. 중복 주제는 자동으로 건너뜁니다.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleBulkGenerate}
            disabled={bulkRunning}
            className="px-5 py-2.5 bg-[#1B3B2F] text-white text-sm font-medium hover:bg-[#1B3B2F]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded"
          >
            {bulkRunning ? '생성 중...' : 'SEO 블로그 30개 자동 생성'}
          </button>
          {bulkRunning && (
            <button
              onClick={handleStopGeneration}
              className="px-5 py-2.5 bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors rounded"
            >
              중지
            </button>
          )}
          <button
            onClick={handleThumbnailReassign}
            disabled={bulkRunning || thumbnailUpdating}
            className="px-5 py-2.5 border border-[#1B3B2F] text-[#1B3B2F] text-sm font-medium hover:bg-[#1B3B2F]/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded"
          >
            {thumbnailUpdating ? '재할당 중...' : '블로그 썸네일 재할당'}
          </button>
          <button
            onClick={handleNaverBulkGenerate}
            disabled={bulkRunning || naverUpdating}
            className="px-5 py-2.5 border border-green-600 text-green-700 text-sm font-medium hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded"
          >
            {naverUpdating ? '생성 중...' : '네이버 콘텐츠 일괄 생성'}
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            disabled={bulkRunning}
            className="px-5 py-2.5 border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded"
          >
            기존 글 전체 삭제
          </button>
        </div>
        {thumbnailResult && (
          <p className="mt-3 text-xs text-gray-600">{thumbnailResult}</p>
        )}
        {/* Naver progress */}
        {naverUpdating && naverTotal > 0 && (
          <div className="mt-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-600 rounded-full transition-all duration-300"
                  style={{ width: `${((naverCompleted + naverErrors) / naverTotal) * 100}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-black whitespace-nowrap">
                {naverCompleted + naverErrors} / {naverTotal}
              </span>
            </div>
            <p className="text-xs text-gray-500 animate-pulse">{naverCurrent}</p>
          </div>
        )}
        {naverResult && (
          <p className="mt-3 text-xs text-gray-600 font-medium">{naverResult}</p>
        )}
        {naverFailedList.length > 0 && (
          <div className="mt-2 text-xs text-red-500 space-y-1">
            {naverFailedList.map((f) => (
              <p key={f.id}>- [{f.id}] {f.title}: {f.error}</p>
            ))}
          </div>
        )}

        {/* Progress UI */}
        {(bulkRunning || bulkDone) && (
          <div className="mt-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1B3B2F] rounded-full transition-all duration-500"
                  style={{ width: `${bulkTotal > 0 ? (bulkProcessed / bulkTotal) * 100 : 0}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-black whitespace-nowrap">
                {bulkProcessed} / {bulkTotal}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-3">
              <span className="text-emerald-600 font-medium">성공: {bulkCompleted}</span>
              {bulkSkipped > 0 && <span className="text-amber-600 font-medium">중복 건너뜀: {bulkSkipped}</span>}
              {bulkErrors > 0 && <span className="text-red-500 font-medium">실패: {bulkErrors}</span>}
              {bulkRunning && <span className="animate-pulse">생성 중: {bulkCurrent}</span>}
              {bulkDone && <span className="text-[#1B3B2F] font-semibold">{bulkCurrent}</span>}
            </div>

            <div
              ref={bulkLogRef}
              className="max-h-64 overflow-y-auto border border-gray-200 bg-white rounded text-xs divide-y divide-gray-100"
            >
              {bulkResults.map((r, i) => (
                <div key={i} className={`px-4 py-2.5 flex items-center justify-between ${r.type === 'error' ? 'bg-red-50' : r.type === 'skipped' ? 'bg-amber-50' : ''}`}>
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
                  ) : r.type === 'skipped' ? (
                    <>
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-amber-500 flex-shrink-0">&#8722;</span>
                        <span className="text-amber-700 truncate">{r.topic}</span>
                      </div>
                      <span className="text-amber-500 flex-shrink-0 ml-3">{r.reason}</span>
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

      {/* GEO Rewrite Section */}
      <div className="mb-8 p-6 border border-purple-200 bg-purple-50/50 rounded-lg">
        <h2 className="text-sm font-bold text-purple-900 mb-1">GEO 리라이트</h2>
        <p className="text-xs text-purple-600 mb-4">
          기존 블로그 글에 법조문 인용, Entity Linking, Q&A 섹션을 추가하여 AI 검색엔진 최적화를 강화합니다.
          새로 생성하는 글에는 자동 적용됩니다.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleGeoBulkRewrite}
            disabled={geoBulkRunning || bulkRunning}
            className="px-5 py-2.5 bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded"
          >
            {geoBulkRunning ? 'GEO 리라이트 중...' : '전체 글 GEO 리라이트'}
          </button>
          {geoBulkRunning && (
            <button
              onClick={() => { geoBulkStopRef.current = true; setGeoBulkCurrent('중지 요청됨...') }}
              className="px-5 py-2.5 bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors rounded"
            >
              중지
            </button>
          )}
        </div>
        {geoBulkRunning && geoBulkTotal > 0 && (
          <div className="mt-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex-1 h-3 bg-purple-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-600 rounded-full transition-all duration-300"
                  style={{ width: `${((geoBulkCompleted + geoBulkErrors) / geoBulkTotal) * 100}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-black whitespace-nowrap">
                {geoBulkCompleted + geoBulkErrors} / {geoBulkTotal}
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="text-emerald-600 font-medium">성공: {geoBulkCompleted}</span>
              {geoBulkErrors > 0 && <span className="text-red-500 font-medium">실패: {geoBulkErrors}</span>}
              <span className="animate-pulse">{geoBulkCurrent}</span>
            </div>
          </div>
        )}
        {geoResult && (
          <p className="mt-3 text-xs text-purple-800 font-medium">{geoResult}</p>
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
                  <button
                    onClick={() => handleGeoRewrite(post.id)}
                    disabled={geoRewriting || geoBulkRunning}
                    className="text-xs text-purple-500 hover:text-purple-700 disabled:opacity-50 transition-colors"
                  >
                    {geoPostId === post.id ? '...' : 'GEO'}
                  </button>
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
