import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'

export default function AboutSection() {
  return (
    <section className="py-14 sm:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-4">About ROH&amp;LEE</p>
          <h2 className="text-xl sm:text-3xl font-bold text-black leading-snug">
            사건을 맡기는 것이 아니라,<br className="sm:hidden" /> 함께 해결합니다
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="mt-8 text-sm sm:text-base text-gray-600 leading-relaxed">
            법률사무소 로앤이는 대표변호사 이유림·노채은이 상담부터 수사기관 동행, 법정 출석, 합의 협상까지
            모든 과정을 직접 수행합니다.
          </p>
          <p className="mt-4 text-sm sm:text-base font-semibold text-[#1B3B2F]">
            사건이 다른 변호사에게 넘어가지 않습니다.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <Link
            href="/lawyers"
            className="inline-flex items-center mt-8 text-sm font-medium text-[#1B3B2F] hover:text-[#C9A24B] transition-colors"
          >
            변호사 소개 &rarr;
          </Link>
        </ScrollReveal>
      </div>
    </section>
  )
}
