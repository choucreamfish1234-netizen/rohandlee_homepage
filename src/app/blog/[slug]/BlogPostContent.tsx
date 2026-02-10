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
  incrementViewCount,
  getCategoryThumbnail,
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
      incrementViewCount(initialPost.id)
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
          incrementViewCount(data.id)
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
      <section className="py-20 max-w-3xl mx-auto px-4">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-100 w-1/4" />
          <div className="h-8 bg-gray-100 w-3/4" />
          <div className="h-4 bg-gray-100 w-1/3" />
          <div className="mt-8 aspect-[16/9] bg-gray-100" />
          <div className="space-y-3 mt-8">
            <div className="h-4 bg-gray-100 w-full" />
            <div className="h-4 bg-gray-100 w-5/6" />
            <div className="h-4 bg-gray-100 w-4/6" />
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
    <section className="py-20">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto px-4"
      >
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-8">
          <Link href="/blog" className="hover:text-black transition-colors">블로그</Link>
          <span>/</span>
          <Link href={`/blog?category=${post.category}`} className="hover:text-black transition-colors">{post.category}</Link>
        </div>

        {/* Category & Title */}
        <span className="inline-block text-xs font-medium px-3 py-1 bg-[#1B3B2F]/10 text-[#1B3B2F] mb-4">
          {post.category}
        </span>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black leading-tight">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-400">
          <span>{post.author}</span>
          <span>·</span>
          <span>{formatDate(post.published_at || post.created_at)}</span>
          <span>·</span>
          <span>{readingTime}분 읽기</span>
          <span>·</span>
          <span>조회 {post.view_count}</span>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-2 py-1">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Thumbnail */}
        <div className="mt-8 aspect-[16/9] overflow-hidden">
          <Image
            src={post.thumbnail_url || getCategoryThumbnail(post.category)}
            alt={post.title}
            width={1200}
            height={675}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="mt-10 prose prose-sm sm:prose max-w-none
          prose-headings:text-black prose-headings:font-bold
          prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
          prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-gray-700 prose-p:leading-relaxed
          prose-a:text-[#1B3B2F] prose-a:font-medium
          prose-strong:text-black
          prose-ul:text-gray-700 prose-ol:text-gray-700
          prose-blockquote:border-[#1B3B2F] prose-blockquote:text-gray-600
          prose-img:rounded-lg
          prose-table:text-sm
          prose-th:bg-gray-50 prose-th:px-4 prose-th:py-2
          prose-td:px-4 prose-td:py-2
        ">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Divider */}
        <hr className="mt-16 mb-8 border-gray-100" />

        {/* Adjacent Posts Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {adjacent.prev ? (
            <Link href={`/blog/${adjacent.prev.slug}`} className="group p-4 border border-gray-100 hover:border-gray-300 transition-colors">
              <span className="text-xs text-gray-400">이전 글</span>
              <p className="mt-1 text-sm font-medium text-black group-hover:text-[#1B3B2F] transition-colors line-clamp-1">
                {adjacent.prev.title}
              </p>
            </Link>
          ) : <div />}
          {adjacent.next ? (
            <Link href={`/blog/${adjacent.next.slug}`} className="group p-4 border border-gray-100 hover:border-gray-300 transition-colors text-right">
              <span className="text-xs text-gray-400">다음 글</span>
              <p className="mt-1 text-sm font-medium text-black group-hover:text-[#1B3B2F] transition-colors line-clamp-1">
                {adjacent.next.title}
              </p>
            </Link>
          ) : <div />}
        </div>

        {/* CTA */}
        <div className="mt-12 p-8 bg-[#1B3B2F] text-center">
          <h3 className="text-lg font-bold text-white mb-2">법률 상담이 필요하신가요?</h3>
          <p className="text-sm text-white/70 mb-6">
            로앤이가 끝까지 함께하겠습니다. 지금 바로 무료 상담을 신청하세요.
          </p>
          <button
            onClick={() => openConsultation()}
            className="bg-white text-[#1B3B2F] text-sm font-medium px-6 py-3 hover:bg-white/90 transition-colors"
          >
            무료 상담 신청
          </button>
        </div>
      </motion.article>

      {/* Related Posts */}
      {related.length > 0 && (
        <div className="max-w-5xl mx-auto px-4 mt-16">
          <h2 className="text-lg font-bold text-black mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#1B3B2F] rounded-full" />
            관련 글
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((r) => (
              <Link key={r.id} href={`/blog/${r.slug}`} className="group block">
                <div className="aspect-[16/10] bg-gray-100 overflow-hidden mb-3">
                  <Image
                    src={r.thumbnail_url || getCategoryThumbnail(r.category)}
                    alt={r.title}
                    width={800}
                    height={500}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <span className="text-xs text-[#1B3B2F] font-medium">{r.category}</span>
                <h3 className="mt-1 text-sm font-semibold text-black group-hover:text-[#1B3B2F] transition-colors line-clamp-2">
                  {r.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
