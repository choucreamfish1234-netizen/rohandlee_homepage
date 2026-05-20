'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'
import { useConsultation } from '@/components/ConsultationProvider'
import Script from 'next/script'

const faqs = [
  {
    question: '보험사 합의금이 적은 것 같은데, 더 받을 수 있나요?',
    answer:
      '보험사는 자체 기준으로 최소한의 합의금을 제시합니다. 실제 치료비, 휴업 손해, 위자료, 후유장해 보상을 정확하게 산정하면 보험사 제시액의 2~3배 이상 받는 경우도 많습니다.',
  },
  {
    question: '의료사고인지 아닌지 어떻게 알 수 있나요?',
    answer:
      '치료 결과가 예상과 크게 다르거나, 설명 없이 추가 시술을 받았거나, 수술 후 비정상적인 합병증이 발생한 경우 의료 과실이 있을 수 있습니다. 의료 기록을 분석하여 과실 여부를 판단해드립니다.',
  },
  {
    question: '산재 신청을 회사가 안 해줘요.',
    answer:
      '산재 신청은 근로자 본인이 직접 할 수 있습니다. 회사 동의가 필요 없습니다. 로앤이가 산재 신청서 작성부터 승인까지 전 과정을 대리합니다.',
  },
  {
    question: '사고가 발생한 지 오래되었는데 소송이 가능한가요?',
    answer:
      '손해배상 청구의 소멸시효는 사고를 안 날로부터 3년, 사고 발생일로부터 10년입니다. 시효가 임박한 경우에도 긴급 조치가 가능하니 빨리 상담받으시는 것이 좋습니다.',
  },
]

const serviceAreas = [
  {
    title: '교통사고',
    description:
      '자동차, 오토바이, 자전거, 보행자 사고. 보험사 합의금 적정성 검토, 과실 비율 다툼, 후유장해 등급 이의신청, 대인·대물 손해배상 청구.',
    icon: (
      <svg className="w-6 h-6 text-[#1B3B2F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H21M3.375 14.25h3.86c.324 0 .637-.116.882-.326l2.108-1.812a1.125 1.125 0 011.468 0l2.108 1.812c.245.21.558.326.882.326h3.86" />
      </svg>
    ),
  },
  {
    title: '의료사고',
    description:
      '수술 과실, 오진, 투약 사고, 마취 사고. 의료 기록 분석, 의료 감정 신청, 병원 상대 손해배상 소송.',
    icon: (
      <svg className="w-6 h-6 text-[#1B3B2F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    title: '산업재해',
    description:
      '공장, 건설 현장, 사무실에서 발생한 업무상 재해. 산재 신청 대리, 산재 불승인 불복, 사업주 상대 손해배상 청구.',
    icon: (
      <svg className="w-6 h-6 text-[#1B3B2F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.384 3.03A.75.75 0 015.25 17.6V6.4a.75.75 0 01.786-.6l5.384 3.03a.75.75 0 010 1.34zM15.75 7.5v9m3-6v3" />
      </svg>
    ),
  },
  {
    title: '제조물 책임',
    description:
      '불량 제품, 결함 식품, 전자기기 폭발 등으로 인한 피해. 제조사·판매사 상대 손해배상 청구.',
    icon: (
      <svg className="w-6 h-6 text-[#1B3B2F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
  },
  {
    title: '기타 손해배상',
    description:
      '반려동물 피해, 층간소음, 공사 소음·진동 피해, 환경 오염 피해. 가해자 특정부터 손해액 산정, 소송까지.',
    icon: (
      <svg className="w-6 h-6 text-[#1B3B2F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
]

const legalServiceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: '법률사무소 로앤이 손해배상 전담센터',
  description:
    '교통사고·의료사고·산업재해·제조물결함. 정당한 보상을 받을 권리, 끝까지 싸웁니다.',
  url: 'https://lawfirmrohandlee.com/centers/damages',
  telephone: '032-207-8788',
  areaServed: {
    '@type': 'Country',
    name: 'KR',
  },
  priceRange: '무료 상담',
  serviceType: ['교통사고', '의료사고', '산업재해', '제조물책임', '손해배상'],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="text-sm sm:text-base font-medium text-black pr-4">{question}</span>
        <svg
          className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-sm text-gray-500 leading-relaxed">{answer}</p>
      </motion.div>
    </div>
  )
}

export default function DamagesPage() {
  const { openConsultation } = useConsultation()

  return (
    <>
      <Script
        id="damages-legal-service-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceJsonLd) }}
      />
      <Script
        id="damages-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* 히어로 섹션 */}
      <section className="min-h-[60vh] flex flex-col items-center justify-center px-5 sm:px-4 bg-[#FAFAFA]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="text-xs tracking-[0.3em] text-[#1B3B2F] uppercase mb-6">
            손해배상 전담센터
          </p>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-black leading-tight">
            누군가의 잘못으로 입은 피해,
            <br />
            <span className="text-[#1B3B2F]">정당한 보상을 받을 권리가 있습니다.</span>
          </h1>
          <p className="mt-6 text-sm sm:text-base text-gray-500 leading-relaxed max-w-xl mx-auto">
            교통사고, 의료사고, 산업재해, 제조물 결함.
            <br />
            모든 손해에는 책임져야 할 사람이 있습니다. 로앤이가 끝까지 물을 것입니다.
          </p>
          <div className="mt-8">
            <button
              onClick={() => openConsultation('손해배상 상담')}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#1B3B2F] text-white text-sm font-medium rounded-full hover:bg-[#153126] transition-colors min-h-[48px]"
            >
              무료 상담 신청하기
            </button>
          </div>
        </motion.div>
      </section>

      {/* 설립 배경 섹션 */}
      <section className="py-16 sm:py-28 md:py-40 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-black text-center mb-12">
              왜 로앤이가 손해배상 전담센터를 만들었는가
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <div className="space-y-6 text-sm sm:text-base text-gray-600 leading-relaxed">
              <p>
                어느 날 갑자기 사고를 당합니다. 교통사고로 수개월째 병원 신세를 지고, 일을 할 수
                없어 수입이 끊깁니다. 보험사는 적은 합의금을 제시하며 빨리 끝내자고 합니다.
              </p>
              <p>
                공장에서 다쳤는데 회사는 산재 처리를 해주지 않습니다. 수술이 잘못되었는데 병원은
                책임이 없다고 합니다. 불량 제품 때문에 다쳤는데 제조사는 사용자 과실이라고 합니다.
              </p>
              <p>
                이 모든 상황에서 피해자는 혼자 싸워야 합니다. 상대방에게는 변호사가 있고,
                보험사에는 전문 인력이 있는데, 피해자만 맨몸입니다.
              </p>
              <p className="font-semibold text-black">
                법률사무소 로앤이는 언제나 피해자의 편에 섭니다. 손해배상센터는 부당하게 피해를
                입은 분들이 정당한 보상을 받을 수 있도록 끝까지 싸웁니다.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 취급 분야 섹션 */}
      <section className="py-16 sm:py-28 md:py-40 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-black text-center mb-16">
              이런 피해를 다룹니다
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {serviceAreas.map((area, i) => (
              <ScrollReveal key={area.title} delay={i * 0.1}>
                <div className="bg-white p-6 sm:p-8 h-full border-t-[3px] border-[#1B3B2F]">
                  <div className="w-12 h-12 rounded-full bg-[#1B3B2F]/10 flex items-center justify-center mb-5">
                    {area.icon}
                  </div>
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
            <h2 className="text-2xl sm:text-3xl font-bold text-black text-center mb-6">
              로앤이만의 전략
            </h2>
            <p className="text-sm sm:text-base text-gray-500 text-center max-w-2xl mx-auto leading-relaxed mb-16">
              일반 로펌은 보험사가 제시하는 합의금을 그대로 받으라고 합니다. 로앤이는 다릅니다.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <ScrollReveal delay={0}>
              <div className="bg-[#FAFAFA] p-6 sm:p-8 h-full border-t-[3px] border-[#1B3B2F]">
                <div className="w-12 h-12 rounded-full bg-[#1B3B2F]/10 flex items-center justify-center mb-5">
                  <svg
                    className="w-6 h-6 text-[#1B3B2F]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-black mb-3">
                  이유림 변호사 — 데이터로 실제 손해액을 산출한다
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  사고 데이터, 의료 기록, 소득 자료를 정밀 분석하여 실제 손해액을 산출합니다.
                  보험사의 저가 합의 제안에 넘어가지 않도록, 숫자로 무장합니다.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.12}>
              <div className="bg-[#FAFAFA] p-6 sm:p-8 h-full border-t-[3px] border-[#1B3B2F]">
                <div className="w-12 h-12 rounded-full bg-[#1B3B2F]/10 flex items-center justify-center mb-5">
                  <svg
                    className="w-6 h-6 text-[#1B3B2F]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.97z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-black mb-3">
                  노채은 변호사 — 형사 고소로 협상력을 극대화한다
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  가해자의 과실을 입증하고, 필요시 형사 고소를 병행하여 협상력을 극대화합니다.
                  민사 손해배상과 형사 처벌을 동시에 추진하는 입체 전략으로, 피해자가 받을 수
                  있는 최대한의 보상을 이끌어냅니다.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-16 sm:py-28 md:py-40 bg-[#1B3B2F] text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold">
              사고 후 혼자 보험사와 싸우고 계신가요?
            </h2>
            <div className="mt-8 space-y-4 text-sm sm:text-base text-white/80 leading-relaxed">
              <p>
                회사가 산재 처리를 거부하고 있나요?
              </p>
              <p className="text-white font-medium">
                피해자에게는 정당한 보상을 받을 권리가 있습니다.
                <br />
                로앤이 손해배상센터가 그 권리를 지켜드리겠습니다.
              </p>
            </div>
            <div className="mt-8 sm:mt-10">
              <button
                onClick={() => openConsultation('손해배상 상담')}
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-[#1B3B2F] text-sm font-medium rounded-full hover:bg-gray-100 transition-colors min-h-[48px]"
              >
                무료 상담 신청하기
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ 섹션 */}
      <section className="py-16 sm:py-28 md:py-40 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-black text-center mb-12">
              자주 묻는 질문
            </h2>
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
