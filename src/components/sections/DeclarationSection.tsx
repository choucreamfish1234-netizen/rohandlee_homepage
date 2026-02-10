'use client'

import ScrollReveal from '@/components/ScrollReveal'

export default function DeclarationSection() {
  return (
    <section className="py-12 sm:py-20 bg-[#f5f8f6] relative overflow-hidden">
      {/* Large decorative quote marks */}
      <div className="absolute top-8 left-8 sm:left-16 text-[120px] sm:text-[200px] leading-none text-[#1B3B2F]/[0.07] font-serif select-none pointer-events-none">
        &ldquo;
      </div>
      <div className="absolute bottom-8 right-8 sm:right-16 text-[120px] sm:text-[200px] leading-none text-[#1B3B2F]/[0.07] font-serif select-none pointer-events-none">
        &rdquo;
      </div>

      {/* Vertical line decorations */}
      <div className="absolute left-4 sm:left-12 top-1/2 -translate-y-1/2 w-[2px] h-24 sm:h-32 bg-[#1B3B2F]/10" />
      <div className="absolute right-4 sm:right-12 top-1/2 -translate-y-1/2 w-[2px] h-24 sm:h-32 bg-[#1B3B2F]/10" />

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-[#1B3B2F]/40 uppercase mb-10">
            Our Declaration
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-xl sm:text-3xl font-bold text-[#1B3B2F] leading-snug">
            가해자는 변호하지 않습니다.<br />
            오로지 피해자만을 변호합니다.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-10 w-16 h-px bg-[#B8960C] mx-auto" />
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <p className="mt-10 text-base sm:text-lg text-[#1B3B2F]/60 leading-relaxed max-w-2xl mx-auto">
            피해자 변호사는 고소장만 내주면 끝이라는 착각,<br className="hidden sm:block" />
            로앤이에서는 피해자 변호의 <strong className="text-[#1B3B2F]">A-Z</strong>를 경험합니다.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
