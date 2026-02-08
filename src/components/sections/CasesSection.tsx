'use client'

import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'

const cases = [
  {
    tag: '보이스피싱',
    title: '보이스피싱 현금 수거책, 경찰 단계 불송치(무죄) 결정',
    badge: '불송치(무죄)',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    tag: '성범죄',
    title: '특수강간·감금 등 9개 혐의, 징역 8년 선고',
    badge: '징역 8년 선고',
    badgeColor: 'bg-red-50 text-red-700 border-red-200',
  },
]

export default function CasesSection() {
  return (
    <section className="py-28 sm:py-40 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">
            Case Results
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-center text-black mb-20">
            성공사례
          </h2>
        </ScrollReveal>

        <div className="space-y-6">
          {cases.map((c, i) => (
            <ScrollReveal key={i} delay={i * 0.12}>
              <div className="group bg-white border border-gray-100 p-8 hover:border-gray-300 transition-all duration-300">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <span className="text-xs text-gray-400 tracking-wide uppercase">
                    {c.tag}
                  </span>
                  <span className={`px-3 py-1 text-xs font-medium border ${c.badgeColor}`}>
                    {c.badge}
                  </span>
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-black leading-snug">
                  {c.title}
                </h3>
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
              전체 성공사례 보기 →
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
