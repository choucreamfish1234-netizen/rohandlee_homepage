'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'

interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  category: string
  created_at: string
  thumbnail_url?: string
}

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false })

        if (error) throw error
        setPosts(data || [])
      } catch {
        // Supabase not configured yet - show placeholder
        setPosts([])
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-black">블로그</h1>
          <p className="mt-4 text-gray-500 text-sm">
            법률 정보와 판례 분석, 로앤이의 이야기를 전합니다.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[16/10] bg-gray-100 rounded-lg mb-4" />
                <div className="h-4 bg-gray-100 rounded mb-2 w-3/4" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-black mb-2">아직 게시글이 없습니다</h3>
            <p className="text-sm text-gray-500">곧 유용한 법률 정보를 전해드리겠습니다.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="aspect-[16/10] bg-gray-100 rounded-lg overflow-hidden mb-4 img-placeholder">
                    {post.thumbnail_url ? (
                      <img
                        src={post.thumbnail_url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 group-hover:scale-105 transition-transform duration-500" />
                    )}
                  </div>
                  {post.category && (
                    <span className="text-xs text-accent font-medium">{post.category}</span>
                  )}
                  <h2 className="mt-1 text-lg font-semibold text-black group-hover:text-accent transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
                  <p className="mt-3 text-xs text-gray-400">
                    {new Date(post.created_at).toLocaleDateString('ko-KR')}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
