'use client'

import ScrollReveal from '@/components/ScrollReveal'
import { useConsultation } from '@/components/ConsultationProvider'

export default function CtaSection() {
  const { openConsultation } = useConsultation()
  return (
    <section className="py-40 bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-bold leading-snug">
            혼자 앓지 마세요.<br />
            지금 전문가와 이야기하세요.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mt-8 text-gray-500 text-sm leading-relaxed">
            성범죄 전담 10년 변호사의<br />
            무료 상담을 지금 바로 받아보세요.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => openConsultation()}
              className="inline-flex items-center justify-center px-10 py-4 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-100 transition-all duration-300"
            >
              무료 상담 신청하기
            </button>
            <a
              href="tel:032-207-8788"
              className="inline-flex items-center justify-center px-10 py-4 border border-gray-600 text-white text-sm font-medium rounded-full hover:border-gray-400 transition-all duration-300"
            >
              <span className="">032-207-8788</span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
