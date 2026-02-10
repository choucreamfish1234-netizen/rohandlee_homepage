'use client'

import ScrollReveal from '@/components/ScrollReveal'

export default function DeclarationSection() {
  return (
    <section className="py-40 bg-accent">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-white/50 uppercase mb-10">
            Our Declaration
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-snug">
            가해자는 변호하지 않습니다.<br />
            오로지 피해자만을 변호합니다.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-10 w-16 h-px bg-white/40 mx-auto" />
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <p className="mt-10 text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
            피해자 변호사는 고소장만 내주면 끝이라는 착각,<br className="hidden sm:block" />
            로앤이에서는 피해자 변호의 <strong className="text-white">A-Z</strong>를 경험합니다.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
