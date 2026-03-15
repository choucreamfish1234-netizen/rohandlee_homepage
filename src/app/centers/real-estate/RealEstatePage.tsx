'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'
import { useConsultation } from '@/components/ConsultationProvider'
import Script from 'next/script'

const faqs = [
  {
    question: '보증금을 돌려받지 못하고 있는데, 소송 말고 다른 방법이 있나요?',
    answer:
      '네, 있습니다. 소송 전에 내용증명 발송, 임차권등기명령, 가압류 등 다양한 법적 보전조치를 먼저 진행할 수 있습니다. 특히 임대인의 재산이 빠져나가기 전에 가압류를 신속하게 걸어두는 것이 핵심입니다. 로앤이는 소송 전 선제적 보전조치에 강점이 있습니다.',
  },
  {
    question: '전세 사기로 형사 고소가 가능한가요?',
    answer:
      '임대인이 처음부터 보증금을 돌려줄 의사나 능력이 없었음에도 계약을 체결했다면 사기죄(형법 제347조)에 해당할 수 있습니다. 근저당 설정 사실을 숨기거나, 이미 다른 임차인에게 이중계약을 한 경우 등이 대표적입니다.',
  },
  {
    question: '토지를 샀는데 개발이 안 되는 땅이었어요. 사기인가요?',
    answer:
      '매도인이 개발 가능성에 대해 허위 정보를 제공하거나, 중요한 사실(개발제한구역, 군사시설보호구역 등)을 의도적으로 숨긴 경우 사기죄가 성립할 수 있습니다. 매매 당시의 정황과 계약서를 분석하여 형사 고소 및 민사 손해배상 가능 여부를 판단해드립니다.',
  },
  {
    question: '상가 권리금을 받지 못하고 쫓겨났는데 구제 방법이 있나요?',
    answer:
      '상가건물 임대차보호법 제10조의4에 따라 임대인이 정당한 사유 없이 권리금 회수를 방해하면 손해배상 책임이 있습니다. 권리금 회수 방해 행위가 있었다면 손해배상 청구가 가능하며, 시효는 3년입니다.',
  },
  {
    question: '중개사가 중요한 사실을 알려주지 않아서 피해를 봤어요.',
    answer:
      '공인중개사는 중개대상물의 권리관계, 법적 제한사항 등을 성실하게 설명할 의무가 있습니다(공인중개사법 제25조). 이를 위반하여 피해가 발생한 경우 중개사 및 중개법인에 대한 손해배상 청구가 가능합니다.',
  },
  {
    question: '변호사 비용이 부담됩니다.',
    answer:
      '무료 상담을 통해 먼저 사건의 가능성을 판단해드립니다. 비용 대비 회수 가능성이 높은 경우에만 수임을 권유드리며, 착수금 분할 등 피해자의 상황에 맞는 비용 구조를 안내해드립니다.',
  },
]

const serviceAreas = [
  {
    title: '전세·임대차 분쟁',
    description: '보증금 미반환, 전세 사기, 계약갱신청구권 거부, 부당 퇴거 요구, 월세 분쟁, 임차권등기명령',
    icon: (
      <svg className="w-6 h-6 text-[#1B3B2F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
      </svg>
    ),
  },
  {
    title: '토지·매매 분쟁',
    description: '토지 매매 사기, 허위 개발 정보로 인한 사기, 이중매매, 소유권 분쟁, 등기 사기',
    icon: (
      <svg className="w-6 h-6 text-[#1B3B2F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
      </svg>
    ),
  },
  {
    title: '상가·권리금 분쟁',
    description: '권리금 회수 방해, 상가 임대차 보호법 위반, 부당한 퇴거, 원상복구 비용 과다 청구',
    icon: (
      <svg className="w-6 h-6 text-[#1B3B2F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36c-.602 0-1.088-.487-1.088-1.088A5.912 5.912 0 017.184 14H12m1.5 7H21V3.75a.75.75 0 00-.75-.75h-4.5a.75.75 0 00-.75.75V21m0 0H4.5" />
      </svg>
    ),
  },
  {
    title: '중개사고',
    description: '공인중개사의 이중계약, 허위매물, 중요 사항 미고지, 중개 과실로 인한 손해',
    icon: (
      <svg className="w-6 h-6 text-[#1B3B2F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
  },
  {
    title: '하자·수리 분쟁',
    description: '누수, 곰팡이 등 하자 보수 책임 회피, 무단 출입, 생활 방해',
    icon: (
      <svg className="w-6 h-6 text-[#1B3B2F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.384 3.03A.75.75 0 015.25 17.6V6.4a.75.75 0 01.786-.6l5.384 3.03a.75.75 0 010 1.34zM15.75 7.5v9m3-6v3" />
      </svg>
    ),
  },
]

const legalServiceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: '법률사무소 로앤이 부동산 피해 전담센터',
  description:
    '전세 사기·보증금 미반환·토지 매매 사기·권리금 분쟁. 민사 가압류와 형사 고소 동시 진행.',
  url: 'https://lawfirmrohandlee.com/centers/real-estate',
  telephone: '032-207-8788',
  areaServed: {
    '@type': 'Country',
    name: 'KR',
  },
  priceRange: '무료 상담',
  serviceType: ['전세 사기', '보증금 반환', '토지 매매 사기', '권리금 분쟁', '임대차 분쟁', '가압류', '중개사고'],
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

export default function RealEstatePage() {
  const { openConsultation } = useConsultation()

  return (
    <>
      <Script
        id="real-estate-legal-service-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceJsonLd) }}
      />
      <Script
        id="real-estate-faq-jsonld"
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
            부동산 피해 전담센터
          </p>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-black leading-tight">
            빼앗긴 보증금, 속아 산 땅,
            <br />
            사라진 권리금.
            <br />
            <span className="text-[#1B3B2F]">부동산 피해, 끝까지 되찾습니다.</span>
          </h1>
          <p className="mt-6 text-sm sm:text-base text-gray-500 leading-relaxed max-w-xl mx-auto">
            전세 사기부터 토지 매매 사기, 상가 권리금 분쟁까지.
            <br />
            부동산을 둘러싼 모든 피해, 로앤이가 민사와 형사로 동시에 추적합니다.
          </p>
          <div className="mt-8">
            <button
              onClick={() => openConsultation('부동산 피해 상담')}
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
              왜 로앤이가 부동산 피해 전담센터를 만들었는가
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <div className="space-y-6 text-sm sm:text-base text-gray-600 leading-relaxed">
              <p>
                전 재산이었습니다. 2년 동안 모아 마련한 전세보증금이 돌아오지 않습니다. 10년 모은
                돈으로 산 토지가 개발 불가능한 땅이었습니다. 10년 운영한 가게의 권리금을 한 푼도
                받지 못하고 쫓겨났습니다. 믿었던 중개사가 이중계약을 맺고 사라졌습니다.
              </p>
              <p>
                부동산은 대부분의 사람에게 인생에서 가장 큰 돈이 오가는 거래입니다. 그래서 피해
                규모도 가장 크고, 회복도 가장 어렵습니다.
              </p>
              <p>
                법률사무소 로앤이는 창립 이래 단 한 번도 가해자를 변호한 적이 없습니다. 부동산
                거래에서 신뢰를 악용해 남의 재산을 삼킨 사람은 명백한 가해자이고, 재산을 빼앗긴
                사람은 명백한 피해자입니다.
              </p>
              <p className="font-semibold text-black">
                그래서 만들었습니다.
                <br />
                부동산 피해 전담센터.
                <br />
                오직 피해자만을 위한 센터입니다.
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
              타 로펌이 할 수 없는, 로앤이만의 전략
            </h2>
            <p className="text-sm sm:text-base text-gray-500 text-center max-w-2xl mx-auto leading-relaxed mb-16">
              일반 로펌은 민사소송 하나만 겁니다. 소장을 넣고 기다립니다. 그동안 상대방은 재산을
              빼돌립니다.
              <br />
              로앤이는 다릅니다. 두 개의 칼날이 동시에 움직입니다.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* 카드1 - 민사 */}
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
                  이유림 변호사 — 데이터로 재산을 먼저 잠근다
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  소송 전에 승부를 결정짓습니다. 등기부, 재산조회, 금융거래 흐름을 분석하여
                  가압류·가처분을 선제적으로 집행합니다. 상대방이 재산을 숨길 틈을 주지
                  않습니다. IT 기술을 직접 활용하는 변호사이기에 가능한 속도입니다.
                </p>
              </div>
            </ScrollReveal>

            {/* 카드2 - 형사 */}
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
                  노채은 변호사 — 형사 고소로 숨통을 조인다
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  부동산 거래에서의 기망 행위는 사기죄에 해당합니다. 노채은 변호사는 재산범죄
                  전담 변호사로서 상대방의 범죄 구조를 파헤치고, 형사 고소로 직접 타격합니다.
                  형사 압박이 들어가는 순간, 민사 협상의 판이 완전히 달라집니다.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <p className="mt-12 sm:mt-16 text-center text-sm sm:text-base font-semibold text-black">
              민사로 재산을 잠그고, 형사로 숨통을 조이는 입체 전략.
              <br />
              이것이 로앤이 부동산 피해 전담센터의 방식입니다.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-16 sm:py-28 md:py-40 bg-[#1B3B2F] text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold">
              부동산 피해, 반드시 되찾으실 수 있습니다.
            </h2>
            <div className="mt-8 space-y-4 text-sm sm:text-base text-white/80 leading-relaxed">
              <p>
                혼자 싸우지 마세요. 로앤이 부동산 피해 전담센터는 오직 피해자만을 위해
                존재합니다. 상대방 측의 의뢰는 정중히 거절합니다.
              </p>
              <p className="text-white font-medium">
                지금 바로 무료 상담을 신청하세요.
                <br />
                당신의 재산, 끝까지 함께 지켜드리겠습니다.
              </p>
            </div>
            <div className="mt-8 sm:mt-10">
              <button
                onClick={() => openConsultation('부동산 피해 상담')}
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
