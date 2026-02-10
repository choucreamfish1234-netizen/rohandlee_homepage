'use client'

import ScrollReveal from '@/components/ScrollReveal'
import { useConsultation } from '@/components/ConsultationProvider'

export default function CtaSection() {
  const { openConsultation } = useConsultation()
  return (
    <section className="py-12 sm:py-20 bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <ScrollReveal>
          <h2 className="text-xl sm:text-3xl font-bold leading-snug">
            혼자 앓지 마세요.<br />
            지금 전문가와 이야기하세요.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mt-6 sm:mt-8 text-gray-500 text-sm leading-relaxed">
            성범죄 전담 10년 변호사의<br />
            상담을 지금 바로 받아보세요.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => openConsultation()}
              className="w-full max-w-[280px] sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white text-black text-base font-medium rounded-xl hover:bg-gray-100 transition-all duration-300 min-h-[48px]"
            >
              상담 신청하기
            </button>
            <a
              href="tel:032-207-8788"
              className="w-full max-w-[280px] sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-gray-600 text-white text-base font-medium rounded-xl hover:border-gray-400 transition-all duration-300 min-h-[48px]"
            >
              032-207-8788
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
