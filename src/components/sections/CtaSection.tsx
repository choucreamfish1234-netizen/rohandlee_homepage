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
      {/* Radial light effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.08) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
        <ScrollReveal>
          <h2 className="text-2xl sm:text-4xl font-bold leading-snug">
            혼자 앓지 마세요.<br />
            지금 전문가와 이야기하세요.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mt-6 sm:mt-8 text-white/50 text-sm leading-relaxed">
            성범죄 전담 10년 변호사의<br />
            상담을 지금 바로 받아보세요.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => openConsultation()}
              className="w-full max-w-[280px] sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white text-[#1B3B2F] text-base font-semibold rounded-xl hover:bg-gray-100 hover:border-[#B8960C] transition-all duration-300 min-h-[48px] border-2 border-transparent"
            >
              상담 신청하기
            </button>
            <a
              href="tel:032-207-8788"
              className="w-full max-w-[280px] sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-white/30 text-white text-base font-medium rounded-xl hover:border-white/60 transition-all duration-300 min-h-[48px]"
            >
              032-207-8788
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
