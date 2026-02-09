'use client'

import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'

const steps = [
  {
    step: 1,
    title: '초기 상담',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    description: '24시간 긴급 접수 가능. 사건 개요를 파악하고 대응 방향을 수립합니다.',
  },
  {
    step: 2,
    title: '고소장 작성·접수',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    description: '피해 사실을 법적 언어로 정리. 증거 자료와 함께 고소장을 접수합니다.',
  },
  {
    step: 3,
    title: '수사 단계 동행',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    description: '경찰 조사에 동석하여 진술을 교정하고 심리적 안정을 지원합니다.',
  },
  {
    step: 4,
    title: '증거 보전·보강',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
    description: '디지털 포렌식, 영상 확보, 목격자 진술 등 증거를 보전하고 보강합니다.',
  },
  {
    step: 5,
    title: '법정 대응',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
      </svg>
    ),
    description: '재판에 출석하여 피해자 의견을 대변하고 엄벌을 이끌어냅니다.',
  },
  {
    step: 6,
    title: '피해 회복',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    description: '손해배상 청구, 접근금지 명령 등 일상 회복을 위한 후속 조치를 진행합니다.',
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
            피해 접수부터 회복까지, A-Z 전 과정
          </h2>
        </ScrollReveal>

        {/* 데스크톱: 가로 타임라인 */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* 연결선 */}
            <div className="absolute top-10 left-0 right-0 h-px bg-gray-200" />

            <div className="grid grid-cols-6 gap-6">
              {steps.map((step, i) => (
                <ScrollReveal key={step.step} delay={i * 0.1}>
                  <div className="relative flex flex-col items-center text-center">
                    {/* 아이콘 원 */}
                    <motion.div
                      initial={{ scale: 0.8 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      viewport={{ once: true }}
                      className="relative z-10 w-20 h-20 bg-white border-2 border-black rounded-full flex items-center justify-center mb-6"
                    >
                      <div className="text-black">{step.icon}</div>
                    </motion.div>

                    {/* 스텝 번호 */}
                    <span className="text-[11px] tracking-[0.2em] text-gray-400 uppercase mb-2">
                      Step {step.step}
                    </span>

                    {/* 제목 */}
                    <h3 className="text-sm font-semibold text-black mb-3">
                      {step.title}
                    </h3>

                    {/* 설명 */}
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
            {/* 세로 연결선 */}
            <div className="absolute top-0 bottom-0 left-6 w-px bg-gray-200" />

            <div className="space-y-12">
              {steps.map((step, i) => (
                <ScrollReveal key={step.step} delay={i * 0.08}>
                  <div className="relative flex gap-6">
                    {/* 아이콘 원 */}
                    <motion.div
                      initial={{ scale: 0.8 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: i * 0.08, duration: 0.4 }}
                      viewport={{ once: true }}
                      className="relative z-10 flex-shrink-0 w-12 h-12 bg-white border-2 border-black rounded-full flex items-center justify-center"
                    >
                      <div className="text-black [&>svg]:w-5 [&>svg]:h-5">{step.icon}</div>
                    </motion.div>

                    {/* 텍스트 */}
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
