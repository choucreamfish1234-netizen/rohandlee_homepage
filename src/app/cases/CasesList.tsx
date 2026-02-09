'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'

const cases = [
  {
    id: 1,
    tag: '보이스피싱',
    title: '보이스피싱 현금 수거책, 경찰 단계 불송치(무죄) 결정',
    summary:
      '의뢰인은 보이스피싱 현금 수거책으로 지목되어 수사를 받았습니다. 로앤이는 치밀한 무죄 변론을 통해 경찰 단계에서 불송치(무죄) 결정을 이끌어냈습니다.',
    badge: '불송치(무죄)',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=450&fit=crop&q=80',
  },
  {
    id: 2,
    tag: '성범죄',
    title: '특수강간·감금 등 9개 혐의, 징역 8년 선고',
    summary:
      '특수강간, 감금 등 9개 혐의로 기소된 가해자에 대해, 로앤이는 구속 수사를 관철하고 집요한 서면 제출로 징역 8년이라는 엄벌을 이끌어냈습니다.',
    badge: '징역 8년 선고',
    badgeColor: 'bg-red-50 text-red-700 border-red-200',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168d5c?w=800&h=450&fit=crop&q=80',
  },
  {
    id: 3,
    tag: '전세사기',
    title: '전세보증금 3억 원 전액 회수, 사기죄 유죄 판결',
    summary:
      '전세사기로 보증금 3억 원을 잃을 위기에 처한 의뢰인을 위해, 로앤이는 긴급 가압류와 형사 고소를 병행하여 전액 회수에 성공했습니다.',
    badge: '전액 회수',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=450&fit=crop&q=80',
  },
  {
    id: 4,
    tag: '스토킹',
    title: '스토킹 가해자 구속 수사, 접근금지 보호명령 확보',
    summary:
      '지속적인 스토킹으로 고통받던 의뢰인을 위해, 로앤이는 긴급 보호명령을 확보하고 가해자의 구속 수사를 이끌어내 안전한 일상을 되찾아드렸습니다.',
    badge: '구속 수사',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    image: 'https://images.unsplash.com/photo-1428592953211-077101b2021b?w=800&h=450&fit=crop&q=80',
  },
]

export default function CasesList() {
  return (
    <section className="pt-32 pb-28 sm:pb-40 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-4">
            Case Results
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-black">
            성공사례
          </h1>
          <p className="mt-5 text-gray-400 text-sm">
            로앤이가 만들어낸 결과로 증명합니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {cases.map((c, i) => (
            <ScrollReveal key={c.id} delay={i * 0.12}>
              <div className="group overflow-hidden rounded-2xl border border-gray-100 hover:border-gray-300 hover:shadow-lg transition-all duration-300">
                <div className="aspect-[16/9] overflow-hidden">
                  <Image
                    src={c.image}
                    alt={c.title}
                    width={800}
                    height={450}
                    className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <span className="text-xs text-gray-400 tracking-wide uppercase">
                      {c.tag}
                    </span>
                    <span className={`inline-flex self-start px-3 py-1 text-xs font-medium border rounded-full ${c.badgeColor}`}>
                      {c.badge}
                    </span>
                  </div>

                  <h2 className="font-serif text-lg sm:text-xl font-bold text-black leading-snug group-hover:text-accent transition-colors duration-300">
                    {c.title}
                  </h2>

                  <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                    {c.summary}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
