'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface BlogPost {
  slug: string
  title: string
  category: string
  thumbnail_url: string | null
  created_at: string
}

export default function BlogPreviewSection() {
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('/api/cases?limit=3')
        if (!res.ok) return
        const data = await res.json()
        if (Array.isArray(data)) {
          setPosts(data.slice(0, 3))
        }
      } catch {
        // silently fail
      }
    }
    fetchPosts()
  }, [])

  // Fallback static data when no posts available
  const fallbackPosts = [
    {
      slug: '#',
      title: '성범죄 피해자가 알아야 할 법적 권리',
      category: '성범죄',
      thumbnail_url: null,
      created_at: '2025-01-15',
    },
    {
      slug: '#',
      title: '보이스피싱 피해 시 즉시 해야 할 5가지',
      category: '재산범죄',
      thumbnail_url: null,
      created_at: '2025-01-10',
    },
    {
      slug: '#',
      title: '개인회생 신청 조건과 절차 총정리',
      category: '회생·파산',
      thumbnail_url: null,
      created_at: '2025-01-05',
    },
  ]

  const displayPosts = posts.length > 0 ? posts : fallbackPosts

  return (
    <section className="bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <p className="text-xs tracking-widest text-gray-400 uppercase mb-4">
            Insights
          </p>
          <h2 className="text-3xl font-medium text-gray-900 tracking-tight mb-12 md:mb-16">
            피해자를 위한 법률 정보
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {displayPosts.map((post, i) => (
            <motion.div
              key={post.slug + i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
            >
              <Link
                href={post.slug === '#' ? '/blog' : `/blog/${post.slug}`}
                className="group block bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <div className="aspect-video bg-gray-100 overflow-hidden">
                  {post.thumbnail_url ? (
                    <Image
                      src={post.thumbnail_url}
                      alt={post.title}
                      width={600}
                      height={340}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
                      Blog
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <span className="text-xs text-gray-400">{post.category}</span>
                  <h3 className="mt-1 text-base font-medium text-gray-900 line-clamp-2">{post.title}</h3>
                  <span className="block mt-2 text-xs text-gray-300">
                    {new Date(post.created_at).toLocaleDateString('ko-KR')}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
          className="mt-10 text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-[#1B3B2F] font-medium hover:text-gray-900 transition-colors"
          >
            블로그 더 보기 &rarr;
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
