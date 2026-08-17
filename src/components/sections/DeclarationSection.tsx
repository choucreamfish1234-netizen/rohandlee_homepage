'use client'

import ScrollReveal from '@/components/ScrollReveal'

export default function DeclarationSection() {
  return (
    <section className="py-12 sm:py-20 bg-[#f5f8f6] relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-[#1B3B2F]/40 uppercase mb-10">
            Our Declaration
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-xl sm:text-3xl font-bold text-[#1B3B2F] leading-snug">
            왜 &ldquo;종합&rdquo; 피해자 전문 로펌인가
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-10 text-base sm:text-lg text-[#1B3B2F]/70 leading-relaxed max-w-2xl mx-auto space-y-4 text-left sm:text-center">
            <p>성범죄만 전문? 재산범죄만 전문?<br className="hidden sm:inline" /> 현실의 피해는 그렇게 깔끔하게 나뉘지 않습니다.</p>
            <p className="text-[#1B3B2F]/50 text-sm leading-relaxed">
              데이트폭력을 당하면서 돈도 뜯겼습니다.<br />
              전세사기를 당했는데 협박도 받고 있습니다.<br />
              직장에서 성추행을 당했는데 부당해고까지 당했습니다.
            </p>
            <p>
              한 로펌에서 성범죄 고소, 사기 고소, 손해배상, 접근금지 가처분을<br className="hidden sm:inline" /> 한 번에 해결할 수 있다면?
            </p>
            <p className="font-semibold text-[#1B3B2F]">
              그것이 법률사무소 로앤이가<br className="sm:hidden" /> &ldquo;종합 피해자 전문 로펌&rdquo;인 이유입니다.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
