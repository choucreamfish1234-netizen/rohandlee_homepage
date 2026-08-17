'use client'

import ScrollReveal from '@/components/ScrollReveal'
import { useConsultation } from '@/components/ConsultationProvider'

export default function CtaSection() {
  const { openConsultation } = useConsultation()
  return (
    <section
      className="py-16 sm:py-24 text-white relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1B3B2F 0%, #2d5a47 50%, #1B3B2F 100%)',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.08) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
        <ScrollReveal>
          <h2 className="text-2xl sm:text-4xl font-bold leading-snug">
            어떤 피해든, 로앤이가 답을 찾겠습니다.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mt-6 sm:mt-8 text-white/50 text-sm leading-relaxed">
            국내최초 종합 피해자 전문 로펌. 8대 전문센터가 함께합니다.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-8 sm:mt-12 flex justify-center">
            <button
              onClick={() => openConsultation()}
              className="w-full max-w-[280px] sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white text-[#1B3B2F] text-base font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 min-h-[48px]"
            >
              무료 상담 신청하기
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
