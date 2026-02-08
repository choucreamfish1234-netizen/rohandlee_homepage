'use client'

import ScrollReveal from '@/components/ScrollReveal'

const tags = [
  '스토킹',
  '데이트폭력',
  '가정폭력',
  '디지털성범죄',
  '몰카',
  '딥페이크',
  '동물학대',
  '학교폭력',
  '접근금지',
  '투자리딩방사기',
  '보이스피싱',
  '업무상횡령',
  '명예훼손',
  '협박공갈',
  '무고대응',
]

export default function TagsSection() {
  return (
    <section className="py-20 sm:py-28 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <ScrollReveal>
          <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mb-4">
            Practice Areas
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-black mb-12">
            기타 전문 분야
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-accent hover:text-accent transition-colors cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
