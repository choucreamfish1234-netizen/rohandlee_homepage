'use client'

import ScrollReveal from '@/components/ScrollReveal'

const steps = [
  {
    number: '01',
    title: '상담 예약',
    description: '전화, 카카오톡, 온라인 폼으로 상담을 예약합니다.',
  },
  {
    number: '02',
    title: '초기 상담',
    description: '전담 변호사가 사건 개요를 파악하고 방향을 안내합니다.',
  },
  {
    number: '03',
    title: '사건 분석',
    description: '증거와 법리를 면밀히 분석하고 최적의 전략을 수립합니다.',
  },
  {
    number: '04',
    title: '수임 계약',
    description: '투명한 비용 안내와 함께 수임 계약을 체결합니다.',
  },
  {
    number: '05',
    title: '사건 진행',
    description: '전용 앱으로 진행 상황을 실시간 공유합니다.',
  },
  {
    number: '06',
    title: '사건 종결',
    description: '최선의 결과를 이끌어내고 사후 관리까지 진행합니다.',
  },
]

export default function ProcessSection() {
  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">
            How We Work
          </p>
          <h2 className="text-xl sm:text-3xl font-bold text-center text-black mb-5">
            수임 절차
          </h2>
          <p className="text-center text-gray-400 text-sm mb-10 sm:mb-20">
            의뢰인의 불안이 안심으로 바뀌는 순간
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-8 lg:gap-6">
          {steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 0.1}>
              <div className="text-center lg:text-left">
                {/* 큰 세리프 숫자 */}
                <span className="text-5xl lg:text-6xl font-light text-gray-200 leading-none">
                  {step.number}
                </span>
                <h3 className="mt-4 text-base font-semibold text-black">{step.title}</h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{step.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
