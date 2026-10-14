'use client'

import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'
import { useConsultation } from '@/components/ConsultationProvider'

export default function CtaSection() {
  const { openConsultation } = useConsultation()
  return (
    <section className="relative overflow-hidden bg-[#0f241c] text-white py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center relative z-10">
        <ScrollReveal>
          <p className="eyebrow justify-center">Consultation</p>
          <h2 className="mt-6 font-serif text-3xl sm:text-5xl font-semibold leading-[1.3]">
            어떤 사건이든,
            <br />
            첫 상담이 결과를 바꿉니다.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mt-6 text-sm sm:text-base text-white/60">대표변호사가 직접 상담합니다.</p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => openConsultation()}
              className="w-full max-w-[280px] sm:w-auto inline-flex items-center justify-center px-10 py-4 bg-[#F6F2EA] text-[#1B3B2F] text-sm font-semibold tracking-wide hover:bg-white transition-colors min-h-[52px]"
            >
              상담 신청하기
            </button>
            <a
              href="tel:+82322078788"
              className="w-full max-w-[280px] sm:w-auto inline-flex items-center justify-center px-10 py-4 border border-white/40 text-white text-sm font-medium tracking-wide hover:bg-white/10 transition-colors min-h-[52px]"
            >
              032-207-8788
            </a>
          </div>
          <Link href="/consultation" className="mt-6 inline-block text-xs text-white/50 hover:text-white transition-colors">
            상담 안내 보기 &rarr;
          </Link>
        </ScrollReveal>
      </div>
    </section>
  )
}
