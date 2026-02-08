'use client'

import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'

interface CaseCard {
  tag: string
  title: string
  result: string
  resultColor: 'red' | 'green' | 'blue'
}

const cases: CaseCard[] = [
  {
    tag: '성범죄',
    title: '특수강간·감금 등 9개 혐의, 징역 8년 선고',
    result: '징역 8년',
    resultColor: 'red',
  },
  {
    tag: '스토킹',
    title: '지속적 스토킹 행위에 대한 접근금지 명령 및 실형 선고',
    result: '실형 선고',
    resultColor: 'red',
  },
]

const colorMap = {
  red: 'bg-red-50 text-red-600 border-red-200',
  green: 'bg-green-50 text-green-600 border-green-200',
  blue: 'bg-blue-50 text-blue-600 border-blue-200',
}

const tagColorMap = {
  red: 'bg-red-50 text-red-500',
  green: 'bg-green-50 text-green-500',
  blue: 'bg-blue-50 text-blue-500',
}

export default function CenterCases() {
  return (
    <section className="py-28 sm:py-40 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">
            Cases
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-16">
            성범죄 센터 성공사례
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cases.map((c, i) => (
            <ScrollReveal key={i} delay={i * 0.15}>
              <div className="border border-gray-200 p-8 hover:border-gray-400 transition-colors duration-300">
                {/* 태그 */}
                <span className={`inline-block text-xs font-medium px-3 py-1 ${tagColorMap[c.resultColor]} mb-5`}>
                  {c.tag}
                </span>

                {/* 제목 */}
                <h3 className="text-lg font-semibold text-black leading-snug mb-6">
                  {c.title}
                </h3>

                {/* 결과 뱃지 */}
                <div className={`inline-flex items-center text-sm font-semibold px-4 py-2 border ${colorMap[c.resultColor]}`}>
                  {c.result}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="text-center mt-12">
            <Link
              href="/cases"
              className="inline-flex items-center text-sm text-gray-500 hover:text-black transition-colors"
            >
              전체 성공사례 보기
              <span className="ml-1">&rarr;</span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
