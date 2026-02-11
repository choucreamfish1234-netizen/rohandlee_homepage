'use client'

import { useEffect, useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  type BlogPost,
  CATEGORIES,
  getCategoryImagePool,
  getReadingTime,
  formatDate,
} from '@/lib/blog'

const POSTS_PER_PAGE = 9

export default function BlogListClient({
  initialPosts,
  initialFeatured,
}: {
  initialPosts: BlogPost[]
  initialFeatured: BlogPost[]
}) {
  const [featured] = useState<BlogPost[]>(initialFeatured)
  const [category, setCategory] = useState('전체')
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [page, setPage] = useState(1)

  // Derive pagination from filtered posts
  const filteredPosts = useMemo(() => {
    let result = initialPosts
    if (category !== '전체') {
      result = result.filter(p => p.category === category)
    }
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase()
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q)
      )
    }
    return result
  }, [initialPosts, category, debouncedSearch])

  const totalCount = filteredPosts.length
  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE)
  const pagedPosts = filteredPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE)

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300)
    return () => clearTimeout(timer)
  }, [search])

  // Reset page when category/search changes
  useEffect(() => {
    setPage(1)
  }, [category, debouncedSearch])

  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-3">Blog</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-black">법률 블로그</h1>
          <p className="mt-4 text-gray-500 text-sm max-w-lg mx-auto">
            법률 정보와 판례 분석, 로앤이의 이야기를 전합니다.
          </p>
        </motion.div>

        {/* Featured Posts TOP 3 */}
        {featured.length > 0 && !debouncedSearch && category === '전체' && page === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-16"
          >
            <h2 className="text-sm font-semibold text-black mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#1B3B2F] rounded-full" />
              인기 글
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featured.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                  <div className="aspect-[16/10] bg-gray-100 overflow-hidden mb-4">
                    <Image
                      src={post.thumbnail_url || getCategoryImagePool(post.category)[0]}
                      alt={post.title}
                      width={800}
                      height={500}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-xs text-[#1B3B2F] font-medium">{post.category}</span>
                  <h3 className="mt-1 text-base font-semibold text-black group-hover:text-[#1B3B2F] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="mt-1.5 text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
                  )}
                  <div className="mt-2 flex items-center gap-3 text-xs text-gray-400">
                    <span>{formatDate(post.published_at || post.created_at)}</span>
                    <span>·</span>
                    <span>{getReadingTime(post.content)}분 읽기</span>
                    <span>·</span>
                    <span>조회 {post.view_count}</span>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* Search & Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-10"
        >
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
              placeholder="제목 또는 내용으로 검색..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-[#1B3B2F] transition-colors"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 text-xs font-medium transition-colors ${
                  category === cat
                    ? 'bg-[#1B3B2F] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results count */}
        <p className="text-xs text-gray-400 mb-6">
          총 {totalCount}개의 글
        </p>

        {pagedPosts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-black mb-2">
              {debouncedSearch ? '검색 결과가 없습니다' : '아직 게시글이 없습니다'}
            </h3>
            <p className="text-sm text-gray-500">
              {debouncedSearch
                ? '다른 키워드로 검색해 보세요.'
                : '곧 유용한 법률 정보를 전해드리겠습니다.'}
            </p>
          </motion.div>
        ) : (
          <>
            {/* Post Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="wait">
                {pagedPosts.map((post, i) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link href={`/blog/${post.slug}`} className="group block h-full">
                      <div className="bg-white border border-gray-100 hover:border-gray-300 transition-all duration-300 h-full flex flex-col overflow-hidden">
                        <div className="aspect-[16/10] overflow-hidden">
                          <Image
                            src={post.thumbnail_url || getCategoryImagePool(post.category)[0]}
                            alt={post.title}
                            width={800}
                            height={500}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                          <span className="text-xs text-[#1B3B2F] font-medium">{post.category}</span>
                          <h3 className="mt-1.5 text-base font-semibold text-black group-hover:text-[#1B3B2F] transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          {post.excerpt && (
                            <p className="mt-2 text-sm text-gray-500 line-clamp-2 flex-1">{post.excerpt}</p>
                          )}
                          <div className="mt-4 flex items-center gap-3 text-xs text-gray-400">
                            <span>{formatDate(post.published_at || post.created_at)}</span>
                            <span>·</span>
                            <span>{getReadingTime(post.content)}분</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-2 text-sm border border-gray-200 disabled:opacity-30 hover:bg-gray-50 transition-colors"
                >
                  이전
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-9 h-9 text-sm font-medium transition-colors ${
                      page === p
                        ? 'bg-[#1B3B2F] text-white'
                        : 'border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-2 text-sm border border-gray-200 disabled:opacity-30 hover:bg-gray-50 transition-colors"
                >
                  다음
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
