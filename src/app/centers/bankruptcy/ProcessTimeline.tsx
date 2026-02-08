'use client'

import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'

const steps = [
  {
    step: 1,
    title: '무료 상담',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    description: '현재 채무 상황을 파악하고 개인회생과 파산 중 최적의 방법을 진단합니다.',
  },
  {
    step: 2,
    title: '서류 준비·수집',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    description: 'RE-Set 자동화 시스템으로 필요 서류를 신속하게 수집하고 정리합니다.',
  },
  {
    step: 3,
    title: '신청서 작성·접수',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
      </svg>
    ),
    description: '법원 제출용 신청서를 꼼꼼하게 작성하여 접수합니다.',
  },
  {
    step: 4,
    title: '개시 결정',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    description: '법원의 개시 결정을 받아 채권자 추심이 즉시 중단됩니다.',
  },
  {
    step: 5,
    title: '변제 계획·면책',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
    description: '회생: 3~5년 변제 계획 수행 / 파산: 면책 결정으로 채무 탕감.',
  },
  {
    step: 6,
    title: '새 출발',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
    description: '신용 회복 지원과 연체 정보 삭제까지, 완전한 새 출발을 돕습니다.',
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
            빚의 무게에서 벗어나는 과정, A-Z 전 과정
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
                    <h3 className="text-sm font-semibold text-black mb-3">{step.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{step.description}</p>
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
                      <h3 className="text-base font-semibold text-black mt-1">{step.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed mt-2">{step.description}</p>
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
