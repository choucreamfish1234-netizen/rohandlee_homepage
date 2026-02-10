'use client'

import ScrollReveal from '@/components/ScrollReveal'

const differences = [
  {
    title: '피해자 전담 시스템',
    description: '가해자 사건은 일절 수임하지 않습니다. 오직 피해자만을 위한 전략을 수립합니다.',
  },
  {
    title: '전용 앱 실시간 공유',
    description: '사건 진행 상황을 전용 앱으로 실시간 확인. 변호사에게 직접 연락하지 않아도 됩니다.',
  },
  {
    title: '최고의 전문 변호사',
    description: '각 분야 전문 변호사가 전담합니다. 일반 변호사가 아닌 해당 분야 최고의 전문가.',
  },
  {
    title: '투명한 비용 체계',
    description: '숨겨진 비용 없이 처음부터 끝까지 투명하게 안내합니다.',
  },
]

export default function DifferenceSection() {
  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">
            Why Ro&Lee
          </p>
          <h2 className="text-xl sm:text-3xl font-bold text-center text-black mb-10 sm:mb-20">
            로앤이가 다른 이유
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-10">
          {differences.map((diff, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="p-6 sm:p-8 border border-gray-100 rounded-2xl hover:border-accent/20 transition-all duration-300 hover:shadow-sm">
                <span className="text-4xl font-light text-gray-200">
                  0{i + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-black">{diff.title}</h3>
                <p className="mt-3 text-sm text-gray-400 leading-relaxed">{diff.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
