'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'

interface BlogPost {
  id: number
  title: string
  content: string
  category: string
  created_at: string
  thumbnail_url?: string
}

export default function BlogPostContent({ slug }: { slug: string }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPost() {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .single()

        if (error) throw error
        setPost(data)
      } catch {
        setPost(null)
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [slug])

  if (loading) {
    return (
      <section className="py-20 max-w-3xl mx-auto px-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-100 rounded w-3/4" />
          <div className="h-4 bg-gray-100 rounded w-1/4" />
          <div className="h-64 bg-gray-100 rounded" />
        </div>
      </section>
    )
  }

  if (!post) {
    return (
      <section className="py-20 text-center">
        <h1 className="text-2xl font-bold text-black mb-4">게시글을 찾을 수 없습니다</h1>
        <Link href="/blog" className="text-accent text-sm hover:underline">
          블로그 목록으로 돌아가기
        </Link>
      </section>
    )
  }

  return (
    <section className="py-20">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto px-4"
      >
        {post.category && (
          <span className="text-xs text-accent font-medium">{post.category}</span>
        )}
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-black">{post.title}</h1>
        <p className="mt-4 text-sm text-gray-400">
          {new Date(post.created_at).toLocaleDateString('ko-KR')}
        </p>

        {post.thumbnail_url && (
          <div className="mt-8 aspect-[16/9] rounded-lg overflow-hidden">
            <img src={post.thumbnail_url} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div
          className="mt-10 prose prose-sm max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-16 pt-8 border-t border-gray-100">
          <Link href="/blog" className="text-sm text-gray-500 hover:text-black transition-colors">
            &larr; 블로그 목록으로
          </Link>
        </div>
      </motion.article>
    </section>
  )
}
