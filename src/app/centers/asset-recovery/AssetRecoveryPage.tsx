'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'
import { useConsultation } from '@/components/ConsultationProvider'
import Script from 'next/script'

const faqs = [
  {
    question: '소송에서 이겼는데 상대방이 돈을 안 줘요.',
    answer: '강제집행을 해야 합니다. 상대방의 부동산, 예금, 급여 등을 압류하여 강제로 회수할 수 있습니다. 확정 판결문, 조정조서, 공정증서가 있으면 바로 진행 가능합니다.',
  },
  {
    question: '상대방이 재산을 숨기고 있는 것 같아요.',
    answer: '법원을 통한 재산조회·재산명시 제도를 활용하면 상대방의 부동산, 금융자산, 자동차 등을 파악할 수 있습니다. 재산 은닉이 확인되면 형사 고소도 가능합니다.',
  },
  {
    question: '가압류는 언제 해야 하나요?',
    answer: '소송을 제기하기 전에, 가능한 빨리 해야 합니다. 상대방이 재산을 처분하거나 빼돌리기 전에 먼저 잡아두는 것이 핵심입니다. 소송 중이라도 언제든 가능합니다.',
  },
  {
    question: '스토킹 가해자에게 접근금지를 받을 수 있나요?',
    answer: '네, 접근금지 가처분을 신청할 수 있습니다. 법원이 인용하면 가해자가 일정 거리 이내 접근, 연락, 통신을 금지당하며, 위반 시 제재를 받습니다. 긴급한 경우 빠르게 결정이 나옵니다.',
  },
]

const serviceAreas = [
  {
    title: '가압류',
    description: '소송 전에 상대방 재산을 먼저 잡습니다. 부동산, 계좌, 매출채권 가압류로 재산 도피를 원천 차단합니다. 소송에서 이겨도 재산이 없으면 의미가 없기 때문에, 가장 먼저 해야 할 조치입니다.',
  },
  {
    title: '가처분',
    description: '긴급한 권리 보전이 필요할 때. 스토킹 범죄의 접근금지 가처분, 명예훼손 게시물 삭제 가처분, 부동산 처분금지 가처분 등. 본안 소송 전에 피해를 먼저 멈추게 합니다.',
  },
  {
    title: '강제집행',
    description: '확정 판결, 조정조서, 공정증서를 가지고 있다면 상대방의 재산을 강제로 회수할 수 있습니다. 부동산 경매, 채권 압류 및 추심, 동산 압류까지 모든 집행 수단을 동원합니다.',
  },
  {
    title: '압류·추심',
    description: '상대방의 급여, 예금, 매출채권, 임대보증금 반환채권 등을 압류하고 직접 추심합니다. 제3채무자(은행, 회사 등)에 대한 추심 절차까지 끝까지 진행합니다.',
  },
  {
    title: '재산조회·재산명시',
    description: '상대방이 재산을 숨기고 있다면 법원을 통해 재산을 조회합니다. 재산명시신청, 재산조회신청, 채무불이행자 명부 등재로 압박합니다.',
  },
]

const legalServiceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: '법률사무소 로앤이 재산회복 전담센터',
  description: '가압류·가처분·강제집행·압류추심. 판결문을 실제 돈으로 바꾸는 마지막 단계.',
  url: 'https://lawfirmrohandlee.com/centers/asset-recovery',
  telephone: '032-207-8788',
  areaServed: { '@type': 'Country', name: 'KR' },
  serviceType: ['가압류', '가처분', '강제집행', '압류추심', '재산조회', '재산명시'],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-200">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left">
        <span className="text-sm sm:text-base font-medium text-black pr-4">{question}</span>
        <svg className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <motion.div initial={false} animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
        <p className="pb-5 text-sm text-gray-500 leading-relaxed">{answer}</p>
      </motion.div>
    </div>
  )
}

export default function AssetRecoveryPage() {
  const { openConsultation } = useConsultation()

  return (
    <>
      <Script id="asset-recovery-legal-service-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceJsonLd) }} />
      <Script id="asset-recovery-faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* 히어로 섹션 */}
      <section className="min-h-[60vh] flex flex-col items-center justify-center px-5 sm:px-4 bg-[#FAFAFA]">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] text-[#1B3B2F] uppercase mb-6">재산회복 전담센터</p>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-black leading-tight">
            받아야 할 돈, 지켜야 할 재산.
            <br />
            <span className="text-[#1B3B2F]">끝까지 추적하고 반드시 집행합니다.</span>
          </h1>
          <p className="mt-6 text-sm sm:text-base text-gray-500 leading-relaxed max-w-xl mx-auto">
            가압류·가처분·강제집행·압류추심.
            <br />
            판결문을 실제 돈으로 바꾸는 마지막 단계, 로앤이가 끝까지 해냅니다.
          </p>
          <div className="mt-8">
            <button onClick={() => openConsultation('재산회복 상담')} className="inline-flex items-center justify-center px-8 py-3.5 bg-[#1B3B2F] text-white text-sm font-medium rounded-full hover:bg-[#153126] transition-colors min-h-[48px]">
              상담 신청하기
            </button>
          </div>
        </motion.div>
      </section>

      {/* 설립 배경 섹션 */}
      <section className="py-16 sm:py-28 md:py-40 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-black text-center mb-12">왜 로앤이가 재산회복 전담센터를 만들었는가</h2>
          </ScrollReveal>
          <ScrollReveal>
            <div className="space-y-6 text-sm sm:text-base text-gray-600 leading-relaxed">
              <p className="font-semibold text-black text-lg">승소했는데 돈을 못 받고 있습니다.</p>
              <p>
                판결문을 받았지만 상대방은 재산을 숨기고 연락을 끊습니다. 소송에서 이기는 것은 절반일 뿐, 실제로 돈을 회수하는 것이 진짜 승리입니다. 그런데 대부분의 로펌은 판결까지만 해주고 집행은 알아서 하라고 합니다.
              </p>
              <p className="font-semibold text-black">
                법률사무소 로앤이는 다릅니다. 판결을 받아내는 것에서 끝나지 않습니다. 상대방의 재산을 추적하고, 압류하고, 추심하여 실제로 돈을 받아내는 것까지가 저희의 일입니다.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 취급 분야 섹션 */}
      <section className="py-16 sm:py-28 md:py-40 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-black text-center mb-16">이런 업무를 다룹니다</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {serviceAreas.map((area, i) => (
              <ScrollReveal key={area.title} delay={i * 0.1}>
                <div className="bg-white p-6 sm:p-8 h-full border-t-[3px] border-[#1B3B2F]">
                  <h3 className="text-lg font-bold text-black mb-3">{area.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{area.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 차별점 섹션 */}
      <section className="py-16 sm:py-28 md:py-40 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-black text-center mb-16">로앤이만의 전략</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <ScrollReveal delay={0}>
              <div className="bg-[#FAFAFA] p-6 sm:p-8 h-full border-t-[3px] border-[#1B3B2F]">
                <h3 className="text-lg font-bold text-black mb-3">이유림 변호사 — 데이터로 재산을 추적한다</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  등기부, 금융거래, 사업자 정보를 분석하여 숨겨진 재산을 찾아내고, 가장 효과적인 집행 대상을 선정합니다. IT 기술을 활용하기 때문에 남들보다 빠릅니다.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.12}>
              <div className="bg-[#FAFAFA] p-6 sm:p-8 h-full border-t-[3px] border-[#1B3B2F]">
                <h3 className="text-lg font-bold text-black mb-3">노채은 변호사 — 강제집행을 끝까지 수행한다</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  재산범죄 전담 경험으로 상대방의 재산 은닉 패턴을 꿰뚫고 있으며, 필요시 재산 은닉에 대한 형사 고소를 병행하여 숨통을 조입니다.
                </p>
              </div>
            </ScrollReveal>
          </div>
          <ScrollReveal>
            <p className="mt-12 sm:mt-16 text-center text-sm sm:text-base font-semibold text-black">
              판결을 돈으로 바꾸는 것. 이것이 로앤이 재산회복센터의 존재 이유입니다.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 부가 서비스 섹션 */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <ScrollReveal>
            <h3 className="text-base sm:text-lg font-semibold text-gray-600 text-center mb-4">부가 서비스: 개인회생·파산</h3>
            <p className="text-sm text-gray-400 leading-relaxed text-center">
              채무가 과도하여 정상적인 생활이 어려운 경우, 개인회생 또는 파산을 통해 법적으로 새로운 시작을 할 수 있습니다. 채무 규모와 소득 상황을 분석하여 가장 유리한 방법을 안내해드립니다.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-16 sm:py-28 md:py-40 bg-[#1B3B2F] text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold">판결문만 가지고 계신가요?</h2>
            <div className="mt-8 space-y-4 text-sm sm:text-base text-white/80 leading-relaxed">
              <p>이긴 소송인데 돈을 못 받고 계신가요?</p>
              <p className="text-white font-medium">
                로앤이 재산회복센터가 판결을 실제 돈으로 바꿔드리겠습니다.
              </p>
            </div>
            <div className="mt-8 sm:mt-10">
              <button onClick={() => openConsultation('재산회복 상담')} className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-[#1B3B2F] text-sm font-medium rounded-full hover:bg-gray-100 transition-colors min-h-[48px]">
                상담 신청하기
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ 섹션 */}
      <section className="py-16 sm:py-28 md:py-40 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-black text-center mb-12">자주 묻는 질문</h2>
          </ScrollReveal>
          <ScrollReveal>
            <div>
              {faqs.map((faq, i) => (
                <FAQItem key={i} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
