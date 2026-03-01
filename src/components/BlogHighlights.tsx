'use client'

import { useEffect, useState, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function BlogHighlights() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [posts, setPosts] = useState<any[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await supabase
        .from('blog_posts')
        .select('id, title, slug, category, thumbnail_url, author, created_at, view_count')
        .eq('status', 'published')
        .lte('published_at', new Date().toISOString())
        .order('view_count', { ascending: false })
        .limit(10)
      if (data) setPosts(data)
    }
    fetchPosts()
  }, [])

  return (
    <section className="bg-[#FAFAFA] py-16 md:py-24">
      <div className="text-center mb-10">
        <span className="text-xs tracking-widest text-gray-400 uppercase">INSIGHTS</span>
        <h2 className="text-2xl md:text-3xl font-medium text-gray-900 mt-2">피해자를 위한 법률 정보</h2>
      </div>
      {posts.length === 0 ? (
        <p className="text-center text-gray-400 text-sm">게시글을 불러오는 중...</p>
      ) : (
      <>
      <div ref={scrollRef} className="overflow-x-auto scrollbar-hide snap-x snap-mandatory">
        <div className="flex gap-4 px-4 md:px-8 lg:px-16 pb-4" style={{ width: 'max-content' }}>
          {posts.map((post, i) => (
            <a key={post.id} href={`/blog/${post.slug}`}
              className="snap-start flex-shrink-0 w-[260px] md:w-[320px] bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
              <div className="aspect-[16/10] overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.thumbnail_url || '/og-image.png'} alt={post.title} className="w-full h-full object-cover" />
                {i === 0 && <span className="absolute top-3 left-3 bg-[#1B3B2F] text-white text-xs px-2 py-0.5 rounded-full">BEST</span>}
              </div>
              <div className="p-4">
                <span className="text-xs text-gray-400">{post.category}</span>
                <h3 className="text-sm font-medium text-gray-900 mt-1 line-clamp-2">{post.title}</h3>
                <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
                  <span>{post.author || '이유림 변호사'}</span>
                  <span>·</span>
                  <span>조회 {post.view_count || 0}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-3 mt-6">
        <button onClick={() => scrollRef.current?.scrollBy({ left: -340, behavior: 'smooth' })}
          className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-900 transition">&larr;</button>
        <button onClick={() => scrollRef.current?.scrollBy({ left: 340, behavior: 'smooth' })}
          className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-900 transition">&rarr;</button>
      </div>
      <div className="text-center mt-5">
        <a href="/blog" className="inline-flex items-center text-sm text-[#1B3B2F] hover:underline min-h-[44px]">블로그 더 보기 &rarr;</a>
      </div>
      </>
      )}
    </section>
  )
}
