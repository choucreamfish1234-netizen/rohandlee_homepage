'use client'

import ScrollReveal from '@/components/ScrollReveal'

export default function AppSection() {
  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-black">
              로앤이 전용 앱 출시.
            </h2>
            <p className="mt-4 text-gray-500 text-sm">
              변 호사를 직접 대면하지 않아도,<br />
              로앤이톡 법률서비스 무제한 이용가능.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ScrollReveal delay={0.1}>
            <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-100">
              <div className="w-20 h-20 mx-auto mb-6 bg-black rounded-2xl flex items-center justify-center">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19l7-7 3 3-7 7-3-3z" />
                  <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                  <path d="M2 2l7.586 7.586" />
                  <circle cx="11" cy="11" r="2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-black">진심의 무게</h3>
              <p className="mt-2 text-sm text-gray-500">
                고통받는 당신의 편이 도우미
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-100">
              <div className="w-20 h-20 mx-auto mb-6 bg-orange-500 rounded-2xl flex items-center justify-center">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="1 4 1 10 7 10" />
                  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-black">리셋(E-Set)</h3>
              <p className="mt-2 text-sm text-gray-500">
                회생파산 사건의 자동화 EDI 서류수집 시스템
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
