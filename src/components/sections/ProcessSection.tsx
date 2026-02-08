'use client'

import ScrollReveal from '@/components/ScrollReveal'

const steps = [
  {
    number: '01',
    title: '상담 예약',
    description: '전화, 카카오톡, 또는 온라인 폼으로 상담을 예약합니다.',
  },
  {
    number: '02',
    title: '사건 분석',
    description: '전담 변호사가 사건을 면밀히 분석하고 전략을 수립합니다.',
  },
  {
    number: '03',
    title: '수임 계약',
    description: '투명한 비용 안내와 함께 수임 계약을 체결합니다.',
  },
  {
    number: '04',
    title: '사건 진행',
    description: '전용 앱으로 진행 상황을 실시간 공유합니다.',
  },
  {
    number: '05',
    title: '사건 종결',
    description: '최선의 결과를 이끌어내고 사후 관리까지 진행합니다.',
  },
]

export default function ProcessSection() {
  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.2em] text-gray-400 uppercase text-center mb-4">
            How We Work
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-4">
            수임 절차
          </h2>
          <p className="text-center text-gray-500 text-sm mb-16">
            의뢰인의 불안이 안심으로 바뀌는 순간
          </p>
        </ScrollReveal>

        <div className="relative">
          {/* 연결선 */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2" />

          <div className="space-y-12 md:space-y-0">
            {steps.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 0.1}>
                <div
                  className={`md:flex items-center gap-8 mb-12 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                      <span className="text-xs text-accent font-mono font-bold">
                        STEP {step.number}
                      </span>
                      <h3 className="mt-2 text-lg font-semibold text-black">{step.title}</h3>
                      <p className="mt-2 text-sm text-gray-500">{step.description}</p>
                    </div>
                  </div>

                  {/* 중앙 점 */}
                  <div className="hidden md:flex items-center justify-center w-8 h-8 bg-accent rounded-full border-4 border-white shadow-sm z-10">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>

                  <div className="md:w-1/2" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
