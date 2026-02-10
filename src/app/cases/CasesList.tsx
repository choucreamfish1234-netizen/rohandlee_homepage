'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'

const categories = ['전체', '성범죄', '재산범죄', '스토킹', '보이스피싱', '전세사기']

const cases = [
  {
    id: 1,
    tag: '보이스피싱',
    category: '보이스피싱',
    title: '보이스피싱 현금 수거책, 경찰 단계 불송치(무죄) 결정',
    summary:
      '의뢰인은 보이스피싱 현금 수거책으로 지목되어 수사를 받았습니다. 로앤이는 치밀한 무죄 변론을 통해 경찰 단계에서 불송치(무죄) 결정을 이끌어냈습니다.',
    badge: '불송치(무죄)',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    tagColor: 'bg-emerald-50 text-emerald-600',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
  },
  {
    id: 2,
    tag: '성범죄',
    category: '성범죄',
    title: '특수강간·감금 등 9개 혐의, 징역 8년 선고',
    summary:
      '특수강간, 감금 등 9개 혐의로 기소된 가해자에 대해, 로앤이는 구속 수사를 관철하고 집요한 서면 제출로 징역 8년이라는 엄벌을 이끌어냈습니다.',
    badge: '징역 8년 선고',
    badgeColor: 'bg-red-50 text-red-700 border-red-200',
    tagColor: 'bg-red-50 text-red-600',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
  },
  {
    id: 3,
    tag: '전세사기',
    category: '전세사기',
    title: '전세보증금 2억 원 반환 소송, 전액 회수 성공',
    summary:
      '전세사기 피해자를 대리하여 가압류 및 민사소송을 진행, 보증금 전액을 회수하였습니다.',
    badge: '전액 회수',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    tagColor: 'bg-emerald-50 text-emerald-600',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
  },
  {
    id: 4,
    tag: '스토킹',
    category: '스토킹',
    title: '직장 내 지속적 스토킹, 접근금지 명령 및 실형 선고',
    summary:
      '피해자의 일상 회복을 위해 접근금지 가처분과 형사 고소를 병행, 가해자에게 실형을 이끌어냈습니다.',
    badge: '실형 선고',
    badgeColor: 'bg-red-50 text-red-700 border-red-200',
    tagColor: 'bg-red-50 text-red-600',
    image: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=800&q=80',
  },
]

export default function CasesList() {
  const [activeCategory, setActiveCategory] = useState('전체')

  const filteredCases = activeCategory === '전체'
    ? cases
    : cases.filter(c => c.category === activeCategory)

  return (
    <section className="pt-32 pb-28 sm:pb-40 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-4">
            Case Results
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black">
            성공사례
          </h1>
          <p className="mt-5 text-gray-400 text-sm">
            로앤이가 만들어낸 결과로 증명합니다.
          </p>
        </motion.div>

        {/* 필터 버튼 */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-accent text-white'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 카드 그리드 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {filteredCases.map((c, i) => (
              <ScrollReveal key={c.id} delay={i * 0.1}>
                <div className="group border border-gray-200 rounded-xl overflow-hidden hover:border-gray-400 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                  <div className="aspect-[16/9] overflow-hidden rounded-t-xl">
                    <Image
                      src={c.image}
                      alt={c.title}
                      width={800}
                      height={450}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-8">
                    <div className="flex items-center justify-between mb-5">
                      <span className={`inline-block text-xs font-semibold px-3 py-1 ${c.tagColor}`}>
                        {c.tag}
                      </span>
                      <span className={`inline-flex px-4 py-1.5 text-xs font-bold border ${c.badgeColor}`}>
                        {c.badge}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-black leading-snug group-hover:text-accent transition-colors duration-300 mb-4">
                      {c.title}
                    </h2>

                    <p className="text-sm text-gray-500 leading-relaxed">
                      {c.summary}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredCases.length === 0 && (
          <p className="text-center text-gray-400 py-20">해당 카테고리의 사례가 아직 없습니다.</p>
        )}
      </div>

      {/* CTA 섹션 */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-28 sm:mt-40">
        <ScrollReveal>
          <div className="bg-accent py-16 sm:py-20 px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              비슷한 사건으로 고민 중이신가요?
            </h2>
            <p className="text-white/60 text-sm mb-10">
              로앤이의 전문 변호사가 무료로 상담해드립니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/consultation"
                className="inline-flex items-center justify-center px-10 py-4 bg-white text-accent text-sm font-medium rounded-full hover:bg-gray-100 transition-colors"
              >
                무료 상담 신청하기
              </Link>
              <a
                href="tel:032-207-8788"
                className="inline-flex items-center justify-center px-10 py-4 border border-white/30 text-white text-sm font-medium rounded-full hover:border-white/60 transition-colors"
              >
                032-207-8788
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
