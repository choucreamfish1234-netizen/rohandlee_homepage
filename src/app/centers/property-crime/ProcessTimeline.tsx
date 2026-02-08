'use client'

import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'

const steps = [
  {
    step: 1,
    title: '긴급 상담',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    description: '24시간 긴급 접수. 피해 규모를 파악하고 즉시 대응 전략을 수립합니다.',
  },
  {
    step: 2,
    title: '증거 확보·계좌 추적',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
    description: '거래내역, 대화기록, 계좌 흐름 등 핵심 증거를 신속하게 확보합니다.',
  },
  {
    step: 3,
    title: '고소장 작성·접수',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    description: '사기·횡령·배임 등 피해 사실을 법적 언어로 정리하여 고소장을 접수합니다.',
  },
  {
    step: 4,
    title: '가압류·보전처분',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    description: '가해자 재산에 대한 가압류를 신청하여 재산 은닉을 사전에 차단합니다.',
  },
  {
    step: 5,
    title: '수사 협력·재판 대응',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    description: '수사기관과 긴밀히 협력하고, 재판에서 피해 사실을 입증합니다.',
  },
  {
    step: 6,
    title: '피해금 회수',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    description: '손해배상 청구, 강제집행 등을 통해 피해금을 최대한 회수합니다.',
  },
]

export default function ProcessTimeline() {
  return (
    <section className="py-28 sm:py-40 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">
            Process
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-20">
            피해 발생부터 자산 회복까지, A-Z 전 과정
          </h2>
        </ScrollReveal>

        {/* 데스크톱: 가로 타임라인 */}
        <div className="hidden lg:block">
          <div className="relative">
            <div className="absolute top-10 left-0 right-0 h-px bg-gray-200" />

            <div className="grid grid-cols-6 gap-6">
              {steps.map((step, i) => (
                <ScrollReveal key={step.step} delay={i * 0.1}>
                  <div className="relative flex flex-col items-center text-center">
                    <motion.div
                      initial={{ scale: 0.8 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      viewport={{ once: true }}
                      className="relative z-10 w-20 h-20 bg-white border-2 border-black rounded-full flex items-center justify-center mb-6"
                    >
                      <div className="text-black">{step.icon}</div>
                    </motion.div>

                    <span className="text-[11px] tracking-[0.2em] text-gray-400 uppercase mb-2">
                      Step {step.step}
                    </span>

                    <h3 className="text-sm font-semibold text-black mb-3">
                      {step.title}
                    </h3>

                    <p className="text-xs text-gray-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        {/* 모바일/태블릿: 세로 타임라인 */}
        <div className="lg:hidden">
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-6 w-px bg-gray-200" />

            <div className="space-y-12">
              {steps.map((step, i) => (
                <ScrollReveal key={step.step} delay={i * 0.08}>
                  <div className="relative flex gap-6">
                    <motion.div
                      initial={{ scale: 0.8 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: i * 0.08, duration: 0.4 }}
                      viewport={{ once: true }}
                      className="relative z-10 flex-shrink-0 w-12 h-12 bg-white border-2 border-black rounded-full flex items-center justify-center"
                    >
                      <div className="text-black [&>svg]:w-5 [&>svg]:h-5">{step.icon}</div>
                    </motion.div>

                    <div className="pt-1">
                      <span className="text-[10px] tracking-[0.2em] text-gray-400 uppercase">
                        Step {step.step}
                      </span>
                      <h3 className="text-base font-semibold text-black mt-1">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed mt-2">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
