'use client'

import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'

export default function SincerityAppSection() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-4">LegalTech</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4">
            《진심의 무게》
          </h2>
          <p className="text-sm text-gray-500 mb-10">
            이유림 변호사가 직접 개발한 엄벌탄원서 생성 애플리케이션
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="bg-[#f8faf9] border border-gray-100 rounded-2xl p-8 sm:p-10 text-left">
            <p className="text-base text-gray-700 leading-8">
              범죄피해자가 가해자에 대한 엄벌 의사를 체계적으로 작성할 수 있도록 돕는 무료 서비스입니다.
              피해 내용과 처벌 의사를 단계별로 입력하면, AI가 탄원서 초안을 생성합니다.
            </p>
            <div className="mt-6">
              <Link
                href="/apps/sincerity"
                className="inline-flex items-center text-sm text-[#1B3B2F] font-medium hover:underline py-3"
              >
                진심의 무게 바로가기 &rarr;
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
