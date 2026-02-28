'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  type BlogPost,
  getPostBySlug,
  getAdjacentPosts,
  getRelatedPosts,
  getCategoryImagePool,
  getReadingTime,
  formatDate,
} from '@/lib/blog'
import { useConsultation } from '@/components/ConsultationProvider'

export default function BlogPostContent({ slug, initialPost }: { slug: string; initialPost?: BlogPost | null }) {
  const [post, setPost] = useState<BlogPost | null>(initialPost ?? null)
  const [loading, setLoading] = useState(!initialPost)
  const [adjacent, setAdjacent] = useState<{ prev: { title: string; slug: string } | null; next: { title: string; slug: string } | null }>({ prev: null, next: null })
  const [related, setRelated] = useState<BlogPost[]>([])
  const { openConsultation } = useConsultation()

  useEffect(() => {
    // If we already have the post from server-side, just load extras
    if (initialPost) {
      if (initialPost.published_at) {
        getAdjacentPosts(initialPost.published_at).then(setAdjacent)
      }
      getRelatedPosts(initialPost.category, initialPost.id).then(setRelated)
      return
    }

    // Fallback: fetch client-side if no initialPost
    async function fetchPost() {
      try {
        const { post: data } = await getPostBySlug(slug)
        if (data) {
          setPost(data)
          if (data.published_at) {
            getAdjacentPosts(data.published_at).then(setAdjacent)
          }
          getRelatedPosts(data.category, data.id).then(setRelated)
        }
      } catch {
        setPost(null)
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [slug, initialPost])

  if (loading) {
    return (
      <section className="py-20 max-w-3xl mx-auto px-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-100 rounded w-1/4" />
          <div className="h-10 bg-gray-100 rounded w-3/4" />
          <div className="h-4 bg-gray-100 rounded w-1/3" />
          <div className="mt-8 aspect-[16/9] bg-gray-100 rounded-xl" />
          <div className="space-y-3 mt-8">
            <div className="h-4 bg-gray-100 rounded w-full" />
            <div className="h-4 bg-gray-100 rounded w-5/6" />
            <div className="h-4 bg-gray-100 rounded w-4/6" />
          </div>
        </div>
      </section>
    )
  }

  if (!post) {
    return (
      <section className="py-20 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-black mb-4">게시글을 찾을 수 없습니다</h1>
        <p className="text-sm text-gray-500 mb-6">삭제되었거나 존재하지 않는 게시글입니다.</p>
        <Link href="/blog" className="text-sm text-[#1B3B2F] font-medium hover:underline">
          블로그 목록으로 돌아가기
        </Link>
      </section>
    )
  }

  const readingTime = getReadingTime(post.content)

  return (
    <section className="py-16 sm:py-20">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto px-4 sm:px-6 md:px-0"
      >
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-8">
          <Link href="/blog" className="hover:text-black transition-colors">블로그</Link>
          <span>/</span>
          <Link href={`/blog?category=${post.category}`} className="hover:text-black transition-colors">{post.category}</Link>
        </div>

        {/* Category Badge */}
        <span className="inline-block text-xs font-semibold px-4 py-1.5 bg-[#1B3B2F] text-white rounded-full mb-5">
          {post.category}
        </span>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-black leading-tight mb-6">
          {post.title}
        </h1>

        {/* Meta with icons */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-8">
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="7" r="4" />
              <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
            </svg>
            {post.author}
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {formatDate(post.published_at || post.created_at)}
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {readingTime}분 읽기
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            조회 {post.view_count}
          </span>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs text-[#1B3B2F] bg-[#1B3B2F]/8 px-3 py-1 rounded-full font-medium">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Thumbnail */}
        <div className="aspect-[16/9] overflow-hidden rounded-xl shadow-lg mb-12">
          <Image
            src={post.thumbnail_url || getCategoryImagePool(post.category)[0]}
            alt={post.title}
            width={1200}
            height={675}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        {/* Content - Rich Markdown */}
        <div className="blog-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ children }) => (
                <div className="mt-12 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-[#1B3B2F] rounded-full" />
                    <h2 className="text-2xl font-bold text-[#1B3B2F]">{children}</h2>
                  </div>
                </div>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-semibold text-[#2d5a47] mt-8 mb-3 pl-4 border-l-2 border-[#1B3B2F]/30">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-gray-700 leading-8 mb-5 text-[17px] tracking-tight">
                  {children}
                </p>
              ),
              strong: ({ children }) => (
                <strong className="text-[#1B3B2F] font-bold bg-[#1B3B2F]/5 px-1 rounded">
                  {children}
                </strong>
              ),
              blockquote: ({ children }) => (
                <div className="my-6 bg-[#f8faf9] border-l-4 border-[#1B3B2F] rounded-r-lg p-5 shadow-sm">
                  <div className="text-[#1B3B2F]/80 text-[16px] leading-7 italic">
                    {children}
                  </div>
                </div>
              ),
              ul: ({ children }) => (
                <ul className="my-5 space-y-3 pl-2">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="my-5 space-y-3 pl-2 list-none counter-reset-[list]">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="flex items-start gap-3 text-gray-700 leading-7 text-[17px]">
                  <span className="mt-2.5 w-2 h-2 bg-[#1B3B2F] rounded-full flex-shrink-0" />
                  <span>{children}</span>
                </li>
              ),
              a: ({ href, children }) => (
                <a href={href} className="text-[#1B3B2F] font-medium underline underline-offset-2 hover:text-[#2d5a47] transition-colors" target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              ),
              hr: () => (
                <div className="my-10 flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-[#1B3B2F]/20 rounded-full" />
                  <div className="w-2 h-2 bg-[#1B3B2F]/40 rounded-full" />
                  <div className="w-2 h-2 bg-[#1B3B2F]/20 rounded-full" />
                </div>
              ),
              table: ({ children }) => (
                <div className="my-6 overflow-x-auto rounded-lg border border-gray-200">
                  <table className="w-full text-sm">{children}</table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="bg-[#1B3B2F]/5">{children}</thead>
              ),
              th: ({ children }) => (
                <th className="px-4 py-3 text-left font-semibold text-[#1B3B2F] border-b border-gray-200">{children}</th>
              ),
              td: ({ children }) => (
                <td className="px-4 py-3 border-b border-gray-100 text-gray-700">{children}</td>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Divider */}
        <div className="my-14 flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-[#1B3B2F]/20 rounded-full" />
          <div className="w-2 h-2 bg-[#1B3B2F]/40 rounded-full" />
          <div className="w-2 h-2 bg-[#1B3B2F]/20 rounded-full" />
        </div>

        {/* Adjacent Posts Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {adjacent.prev ? (
            <Link href={`/blog/${adjacent.prev.slug}`} className="group p-5 border border-gray-200 rounded-xl hover:border-[#1B3B2F]/30 hover:shadow-sm transition-all">
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                이전 글
              </span>
              <p className="mt-2 text-sm font-medium text-black group-hover:text-[#1B3B2F] transition-colors line-clamp-1">
                {adjacent.prev.title}
              </p>
            </Link>
          ) : <div />}
          {adjacent.next ? (
            <Link href={`/blog/${adjacent.next.slug}`} className="group p-5 border border-gray-200 rounded-xl hover:border-[#1B3B2F]/30 hover:shadow-sm transition-all text-right">
              <span className="text-xs text-gray-400 flex items-center justify-end gap-1">
                다음 글
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
              </span>
              <p className="mt-2 text-sm font-medium text-black group-hover:text-[#1B3B2F] transition-colors line-clamp-1">
                {adjacent.next.title}
              </p>
            </Link>
          ) : <div />}
        </div>

        {/* CTA */}
        <div className="rounded-2xl bg-gradient-to-br from-[#1B3B2F] to-[#2d5a47] p-6 sm:p-10 text-center shadow-xl">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-3">법률사무소 로앤이에 상담하기</h3>
          <p className="text-sm text-white/70 mb-6 sm:mb-8 max-w-md mx-auto">
            전문 변호사가 끝까지 함께합니다. 지금 바로 무료 상담을 신청하세요.
          </p>
          <button
            onClick={() => openConsultation()}
            className="bg-white text-[#1B3B2F] text-sm font-semibold px-8 py-3.5 rounded-full hover:bg-white/90 transition-colors shadow-md min-h-[48px]"
          >
            무료 상담 신청
          </button>
        </div>

        {/* Author Profile Box */}
        <AuthorProfileBox author={post.author} category={post.category} />
      </motion.article>

      {/* Related Posts */}
      {related.length > 0 && (
        <div className="max-w-5xl mx-auto px-6 md:px-4 mt-16">
          <h2 className="text-lg font-bold text-black mb-8 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#1B3B2F] rounded-full" />
            관련 글 더보기
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((r) => (
              <Link key={r.id} href={`/blog/${r.slug}`} className="group block bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="aspect-[16/10] bg-gray-100 overflow-hidden">
                  <Image
                    src={r.thumbnail_url || getCategoryImagePool(r.category)[0]}
                    alt={r.title}
                    width={800}
                    height={500}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs text-[#1B3B2F] font-semibold">{r.category}</span>
                  <h3 className="mt-1.5 text-sm font-semibold text-black group-hover:text-[#1B3B2F] transition-colors line-clamp-2">
                    {r.title}
                  </h3>
                  {r.excerpt && (
                    <p className="mt-2 text-xs text-gray-500 line-clamp-2">{r.excerpt}</p>
                  )}
                  <p className="mt-3 text-xs text-gray-400">
                    {formatDate(r.published_at || r.created_at)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

function AuthorProfileBox({ author, category }: { author: string; category: string }) {
  const isLee = author?.includes('이유림') || ['성범죄', '일반'].includes(category)

  if (isLee) {
    return (
      <div className="mt-12 p-5 sm:p-6 bg-gray-50 rounded-2xl flex flex-col sm:flex-row gap-4 items-center sm:items-start">
        <Image src="/images/lawyers/lawyer-lee.svg" alt="이유림 변호사" width={64} height={64} className="w-16 h-16 rounded-full object-cover flex-shrink-0" />
        <div className="text-center sm:text-left">
          <p className="font-medium text-gray-900">이유림 변호사</p>
          <p className="text-sm text-gray-500">법률사무소 로앤이 대표변호사 | 성범죄 피해자 전문</p>
          <p className="text-xs text-gray-400 mt-1 leading-relaxed">
            충북대학교 법학전문대학원 졸업. 서울지방변호사회 국선변호사.
            디지털 포렌식 및 IT 법률에 정통한 피해자 전문 변호사.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-12 p-5 sm:p-6 bg-gray-50 rounded-2xl flex flex-col sm:flex-row gap-4 items-center sm:items-start">
      <Image src="/images/lawyers/lawyer-noh.svg" alt="노채은 변호사" width={64} height={64} className="w-16 h-16 rounded-full object-cover flex-shrink-0" />
      <div className="text-center sm:text-left">
        <p className="font-medium text-gray-900">노채은 변호사</p>
        <p className="text-sm text-gray-500">법률사무소 로앤이 대표변호사 | 재산범죄·회생파산 전문</p>
        <p className="text-xs text-gray-400 mt-1 leading-relaxed">
          경북대학교 법학전문대학원 졸업. 대법원 국선변호인.
          보이스피싱·전세사기 피해 구제 및 개인회생·파산에 정통한 전문 변호사.
        </p>
      </div>
    </div>
  )
}
