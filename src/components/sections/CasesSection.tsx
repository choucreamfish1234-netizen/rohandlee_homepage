'use client'

import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'

const cases = [
  {
    tag: '보이스피싱',
    title: '보이스피싱 현금 수거책, 경찰 단계 불송치(무죄)',
    description: '치밀한 무죄 변론으로 경찰 단계에서 불송치 결정을 이끌어냈습니다.',
    badge: '불송치(무죄)',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    tagColor: 'bg-emerald-50 text-emerald-600',
  },
  {
    tag: '성범죄',
    title: '특수강간·감금 등 9개 혐의, 징역 8년 선고',
    description: '구속 수사 관철, 집요한 서면 제출로 엄벌을 이끌어냈습니다.',
    badge: '징역 8년',
    badgeColor: 'bg-red-50 text-red-700 border-red-200',
    tagColor: 'bg-red-50 text-red-600',
  },
]

export default function CasesSection() {
  return (
    <section className="py-40 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">
            Results
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-black mb-20">
            결과로 증명합니다.
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cases.map((c, i) => (
            <ScrollReveal key={i} delay={i * 0.15}>
              <div className="bg-white border border-gray-100 p-8 sm:p-10 hover:border-gray-300 transition-all duration-300 h-full flex flex-col">
                {/* 태그 */}
                <span className={`self-start inline-block text-xs font-medium px-3 py-1 ${c.tagColor} mb-6`}>
                  {c.tag}
                </span>

                {/* 제목 */}
                <h3 className="text-lg sm:text-xl font-bold text-black leading-snug mb-3">
                  {c.title}
                </h3>

                {/* 설명 */}
                <p className="text-sm text-gray-500 leading-relaxed mb-8 flex-1">
                  {c.description}
                </p>

                {/* 결과 뱃지 */}
                <div className={`self-start inline-flex items-center text-sm font-semibold px-4 py-2 border ${c.badgeColor}`}>
                  {c.badge}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-12 text-center">
            <Link
              href="/cases"
              className="inline-flex items-center text-sm text-black font-medium hover:text-accent transition-colors"
            >
              성공사례 더보기 <span className="ml-1">&rarr;</span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
