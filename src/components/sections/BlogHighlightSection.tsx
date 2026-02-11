'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

interface BlogPost {
  id: string
  title: string
  slug: string
  category: string | null
  thumbnail_url: string | null
  author: string | null
  created_at: string
  view_count: number | null
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

export default function BlogHighlightSection() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await supabase
        .from('blog_posts')
        .select('id, title, slug, category, thumbnail_url, author, created_at, view_count')
        .eq('published', true)
        .order('view_count', { ascending: false })
        .limit(10)

      if (data) setPosts(data)
    }
    fetchPosts()
  }, [])

  if (posts.length === 0) return null

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="py-20 md:py-28"
      style={{ background: '#FAFAFA' }}
    >
      {/* Header */}
      <div className="text-center px-4">
        <p className="text-xs tracking-widest text-gray-400 uppercase">Insights</p>
        <h2 className="text-3xl font-medium text-gray-900 mt-2">피해자를 위한 법률 정보</h2>
      </div>

      {/* Card Slider */}
      <div
        ref={scrollRef}
        className="mt-10 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
      >
        <div className="flex gap-4 px-4 md:px-8 lg:px-16 pb-4" style={{ width: 'max-content' }}>
          {posts.map((post, i) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="snap-start flex-shrink-0 w-[260px] md:w-[320px] bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
            >
              {/* Thumbnail */}
              <div className="aspect-[16/10] overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.thumbnail_url || '/og-image.png'}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                {i === 0 && (
                  <span className="absolute top-3 left-3 bg-[#1B3B2F] text-white text-xs px-2 py-0.5 rounded-full">
                    BEST
                  </span>
                )}
              </div>
              {/* Text */}
              <div className="p-4">
                <span className="text-xs text-gray-400">{post.category}</span>
                <h3 className="text-sm font-medium text-gray-900 mt-1 line-clamp-2">
                  {post.title}
                </h3>
                <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
                  <span>{post.author || '이유림 변호사'}</span>
                  <span>·</span>
                  <span>{formatDate(post.created_at)}</span>
                  <span>·</span>
                  <span>조회 {post.view_count || 0}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="flex justify-center gap-2 mt-6">
        <button
          onClick={() => scrollRef.current?.scrollBy({ left: -340, behavior: 'smooth' })}
          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:border-gray-400 transition"
        >
          &larr;
        </button>
        <button
          onClick={() => scrollRef.current?.scrollBy({ left: 340, behavior: 'smooth' })}
          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:border-gray-400 transition"
        >
          &rarr;
        </button>
      </div>

      {/* Blog link */}
      <div className="text-center mt-4">
        <Link href="/blog" className="text-sm text-[#1B3B2F] hover:underline">
          블로그 더 보기 &rarr;
        </Link>
      </div>
    </motion.section>
  )
}
