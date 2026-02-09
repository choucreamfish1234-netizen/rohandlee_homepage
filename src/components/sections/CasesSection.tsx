'use client'

import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'

const cases = [
  {
    tag: '보이스피싱',
    title: '보이스피싱 현금 수거책, 경찰 단계 불송치(무죄) 결정',
    badge: '불송치(무죄)',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=450&fit=crop&q=80',
  },
  {
    tag: '성범죄',
    title: '특수강간·감금 등 9개 혐의, 징역 8년 선고',
    badge: '징역 8년 선고',
    badgeColor: 'bg-red-50 text-red-700 border-red-200',
    image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=450&fit=crop&q=80',
  },
  {
    tag: '전세사기',
    title: '전세보증금 3억 원 전액 회수, 사기죄 유죄 판결',
    badge: '전액 회수',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=450&fit=crop&q=80',
  },
  {
    tag: '스토킹',
    title: '스토킹 가해자 구속 수사, 접근금지 보호명령 확보',
    badge: '구속 수사',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    image: 'https://images.unsplash.com/photo-1428592953211-077101b2021b?w=800&h=450&fit=crop&q=80',
  },
]

export default function CasesSection() {
  return (
    <section className="py-28 sm:py-40 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">
            Case Results
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-center text-black mb-20">
            성공사례
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cases.map((c, i) => (
            <ScrollReveal key={i} delay={i * 0.12}>
              <div className="group bg-white border border-gray-100 overflow-hidden rounded-2xl hover:border-gray-300 hover:shadow-lg transition-all duration-300">
                <div className="aspect-[16/9] overflow-hidden">
                  <Image
                    src={c.image}
                    alt={c.title}
                    width={800}
                    height={450}
                    className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <span className="text-xs text-gray-400 tracking-wide uppercase">
                      {c.tag}
                    </span>
                    <span className={`px-3 py-1 text-xs font-medium border rounded-full ${c.badgeColor}`}>
                      {c.badge}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-black leading-snug">
                    {c.title}
                  </h3>
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
              전체 성공사례 보기 →
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
