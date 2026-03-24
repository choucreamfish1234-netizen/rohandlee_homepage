'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const pressArticles = [
  {
    outlet: '스타데일리뉴스',
    title: '피해자 전담 법률사무소 로앤이, 드라마 \'아너\'와 닮은 현실 이야기',
    url: '/blog/honor-drama-real-story-lawfirm-rohandlee',
    date: '2026.03.19',
  },
  // 향후 기사 추가 시 여기에 객체 추가하면 자동 확장
]

export default function PressSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const showSlider = pressArticles.length >= 3

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
        <h2 className="text-2xl md:text-3xl font-medium text-gray-900 mt-2">
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
              {pressArticles.map((article, i) => (
                <ArticleCard key={i} article={article} index={i} />
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
          {pressArticles.map((article, i) => (
            <ArticleCard key={i} article={article} index={i} />
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
  article: (typeof pressArticles)[number]
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className="flex-shrink-0 w-[280px] md:w-[320px]"
    >
      <Link
        href={article.url}
        className="block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 h-full"
      >
        <p className="text-sm font-semibold text-[#1B3B2F]">{article.outlet}</p>
        <h3 className="text-lg font-medium text-gray-900 mt-3 line-clamp-2">
          {article.title}
        </h3>
        <div className="flex items-center justify-between mt-6">
          <span className="text-sm text-gray-400">{article.date}</span>
          <span className="text-sm text-[#1B3B2F]">기사 보기 &rarr;</span>
        </div>
      </Link>
    </motion.div>
  )
}
