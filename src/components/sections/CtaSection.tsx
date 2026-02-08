'use client'

import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'

export default function CtaSection() {
  return (
    <section className="py-24 sm:py-32 bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <ScrollReveal>
          <h2 className="text-2xl sm:text-3xl font-bold leading-snug">
            혼자 앓지 마세요.<br />
            지금 전문가와 이야기하세요.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mt-6 text-gray-400 text-sm">
            성범죄 전담 10년 변호사의<br />
            무료 상담을 지금 바로 받아보세요.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-100 transition-colors"
            >
              무료 상담 신청하기
            </Link>
            <a
              href="tel:055-261-8788"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-gray-600 text-white text-sm font-medium rounded-full hover:border-gray-400 transition-colors"
            >
              055-261-8788
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
