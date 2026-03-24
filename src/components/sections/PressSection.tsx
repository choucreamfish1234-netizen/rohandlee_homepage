'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface PressArticle {
  id: string
  outlet: string
  title: string
  url: string
  date: string
  image_url: string | null
  display_order: number
}

export default function PressSection() {
  const [articles, setArticles] = useState<PressArticle[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchArticles() {
      const { data } = await supabase
        .from('press_articles')
        .select('id, outlet, title, url, date, image_url, display_order')
        .eq('visible', true)
        .order('display_order', { ascending: true })
      if (data) setArticles(data)
    }
    fetchArticles()
  }, [])

  if (articles.length === 0) return null

  const showSlider = articles.length >= 3

  return (
    <section className="bg-[#FAFAFA] py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center mb-12"
      >
        <span className="text-xs tracking-widest text-gray-400 uppercase">PRESS</span>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">
          언론이 주목한 법률사무소 로앤이
        </h2>
        <p className="text-sm text-gray-500 mt-3">
          피해자를 위해 싸우는 로앤이의 이야기가 언론에 소개되었습니다
        </p>
      </motion.div>

      {showSlider ? (
        <>
          <div
            ref={scrollRef}
            className="overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          >
            <div
              className="flex gap-6 px-4 md:px-8 lg:px-16 pb-4"
              style={{ width: 'max-content' }}
            >
              {articles.map((article, i) => (
                <ArticleCard key={article.id} article={article} index={i} />
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={() => scrollRef.current?.scrollBy({ left: -340, behavior: 'smooth' })}
              className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-900 transition"
            >
              &larr;
            </button>
            <button
              onClick={() => scrollRef.current?.scrollBy({ left: 340, behavior: 'smooth' })}
              className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-900 transition"
            >
              &rarr;
            </button>
          </div>
        </>
      ) : (
        <div className="flex justify-center gap-6 px-4 md:px-8 lg:px-16">
          {articles.map((article, i) => (
            <ArticleCard key={article.id} article={article} index={i} />
          ))}
        </div>
      )}
    </section>
  )
}

function ArticleCard({
  article,
  index,
}: {
  article: PressArticle
  index: number
}) {
  const isExternal = article.url.startsWith('http')
  const cardContent = (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 h-full">
      {article.image_url ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={article.image_url}
          alt={article.title}
          className="w-full aspect-video object-cover"
        />
      ) : (
        <div className="w-full aspect-video bg-[#1B3B2F] flex items-center justify-center">
          <span className="text-white text-sm font-semibold">{article.outlet}</span>
        </div>
      )}
      <div className="p-5">
        <p className="text-sm font-semibold text-[#1B3B2F]">{article.outlet}</p>
        <h3 className="text-lg font-medium text-gray-900 mt-2 line-clamp-2">
          {article.title}
        </h3>
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-gray-400">{article.date}</span>
          <span className="text-sm text-[#1B3B2F]">기사 보기 &rarr;</span>
        </div>
      </div>
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className="flex-shrink-0 w-[280px] md:w-[320px] snap-start"
    >
      {isExternal ? (
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="block h-full">
          {cardContent}
        </a>
      ) : (
        <Link href={article.url} className="block h-full">
          {cardContent}
        </Link>
      )}
    </motion.div>
  )
}
