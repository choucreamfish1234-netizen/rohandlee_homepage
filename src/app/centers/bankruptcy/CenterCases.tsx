'use client'

import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'

interface CaseCard {
  tag: string
  title: string
  result: string
  resultColor: 'red' | 'green' | 'blue'
  image: string
}

const cases: CaseCard[] = [
  {
    tag: '개인회생',
    title: '채무 1억 2천만 원, 월 변제금 35만 원으로 감축',
    result: '변제금 70% 감축',
    resultColor: 'green',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=500&fit=crop&q=80',
  },
  {
    tag: '개인파산',
    title: '채무 8천만 원 전액 면책 결정',
    result: '전액 면책',
    resultColor: 'green',
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&h=500&fit=crop&q=80',
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
    <section className="py-40 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">
            Cases
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-16">
            회생·파산 센터 성공사례
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cases.map((c, i) => (
            <ScrollReveal key={i} delay={i * 0.15}>
              <div className="border border-gray-200 overflow-hidden hover:border-gray-400 transition-colors duration-300">
                <div className="aspect-[16/10] overflow-hidden">
                  <Image
                    src={c.image}
                    alt={c.title}
                    width={800}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-8">
                  <span className={`inline-block text-xs font-medium px-3 py-1 ${tagColorMap[c.resultColor]} mb-5`}>
                    {c.tag}
                  </span>

                  <h3 className="text-lg font-semibold text-black leading-snug mb-6">
                    {c.title}
                  </h3>

                  <div className={`inline-flex items-center text-sm font-semibold px-4 py-2 border ${colorMap[c.resultColor]}`}>
                    {c.result}
                  </div>
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
