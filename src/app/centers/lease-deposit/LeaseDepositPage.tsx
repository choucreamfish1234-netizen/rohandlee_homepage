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
      '임대인이 처음부터 보증금을 돌려줄 의사나 능력이 없었음에도 계약을 체결했다면 사기죄(형법 제347조)에 해당할 수 있습니다. 근저당 설정 사실을 숨기거나, 이미 다른 임차인에게 이중계약을 한 경우 등이 대표적입니다. 노채은 변호사가 형사 고소 가능 여부를 정확하게 판단해드립니다.',
  },
  {
    question: '임대인이 연락을 안 받는데 어떻게 해야 하나요?',
    answer:
      '내용증명을 발송하면 법적으로 의사를 통보한 것으로 인정됩니다. 로앤이의 내용증명 자동 생성 도구를 이용하시면 지금 바로 작성하실 수 있습니다. 이후 임차권등기명령 등 법적 절차를 병행하여 임대인이 응하지 않을 수 없는 환경을 만듭니다.',
  },
  {
    question: '이미 계약이 만료되었는데 보증금을 받을 수 있나요?',
    answer:
      '보증금반환청구권의 소멸시효는 10년입니다. 계약 만료 후에도 충분히 법적 청구가 가능합니다. 다만 시간이 지날수록 임대인의 재산이 줄어들 수 있으므로 가능한 빨리 법적 조치를 시작하시는 것이 유리합니다.',
  },
  {
    question: '변호사 비용이 부담됩니다.',
    answer:
      '무료 상담을 통해 먼저 사건의 가능성을 판단해드립니다. 비용 대비 회수 가능성이 높은 경우에만 수임을 권유드리며, 착수금 분할 등 피해자의 상황에 맞는 비용 구조를 안내해드립니다.',
  },
]

const legalServiceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: '법률사무소 로앤이 임대차·보증금 피해 전담센터',
  description:
    '전세 사기·보증금 미반환 피해자 전문. 민사 가압류와 형사 고소를 동시에 진행하는 입체 전략.',
  url: 'https://lawfirmrohandlee.com/centers/lease-deposit',
  telephone: '032-207-8788',
  areaServed: {
    '@type': 'Country',
    name: 'KR',
  },
  priceRange: '무료 상담',
  serviceType: ['임대차 분쟁', '보증금 반환 소송', '전세 사기 형사 고소', '가압류', '임차권등기명령'],
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

export default function LeaseDepositPage() {
  const { openConsultation } = useConsultation()

  return (
    <>
      <Script
        id="lease-deposit-legal-service-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceJsonLd) }}
      />
      <Script
        id="lease-deposit-faq-jsonld"
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
            제6센터 — 임대차·보증금 피해 전담
          </p>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-black leading-tight">
            돌려받아야 할 돈이 아닙니다.
            <br />
            <span className="text-[#1B3B2F]">돌려받아야 할 삶입니다.</span>
          </h1>
          <p className="mt-6 text-sm sm:text-base text-gray-500 leading-relaxed max-w-xl mx-auto">
            보증금을 돌려주지 않는 임대인, 더 이상 기다리지 마세요.
            <br />
            로앤이가 끝까지 추적하고, 반드시 받아냅니다.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => openConsultation('임대차·보증금 피해 상담')}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#1B3B2F] text-white text-sm font-medium rounded-full hover:bg-[#153126] transition-colors min-h-[48px]"
            >
              무료 상담 신청하기
            </button>
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-[#1B3B2F] text-[#1B3B2F] text-sm font-medium rounded-full hover:bg-[#1B3B2F]/5 transition-colors min-h-[48px]"
            >
              내용증명 바로 작성하기
            </a>
          </div>
        </motion.div>
      </section>

      {/* 설립 배경 섹션 */}
      <section className="py-16 sm:py-28 md:py-40 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-black text-center mb-12">
              왜 로앤이가 임대차 전담 센터를 만들었는가
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <div className="space-y-6 text-sm sm:text-base text-gray-600 leading-relaxed">
              <p>
                전 재산이었습니다. 2년 동안 아끼고 모아 마련한 전세보증금. 계약 만료일이 지나도
                임대인은 전화를 받지 않습니다. &ldquo;조금만 기다려달라&rdquo;는 말만 반복하다, 어느
                날 번호가 바뀌어 있습니다.
              </p>
              <p>등기부를 떼보니 근저당이 잔뜩 설정되어 있습니다.</p>
              <p>이런 사연을 마주할 때마다 저희는 분노했습니다.</p>
              <p>
                법률사무소 로앤이는 창립 이래 단 한 번도 가해자를 변호한 적이 없습니다. 성범죄
                피해자, 재산범죄 피해자, 사기 피해자 — 언제나 부당하게 빼앗긴 사람들의 곁에 서
                왔습니다.
              </p>
              <p>
                전세 사기 피해자도 다르지 않습니다. 신뢰를 악용해 남의 전 재산을 삼킨 악성 임대인은
                명백한 가해자이고, 보증금을 빼앗긴 임차인은 명백한 피해자입니다.
              </p>
              <p className="font-semibold text-black">
                그래서 만들었습니다.
                <br />
                제6센터, 임대차·보증금 피해 전담 센터.
                <br />
                오직 임차인만을 위한 센터입니다.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 차별점 섹션 */}
      <section className="py-16 sm:py-28 md:py-40 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-black text-center mb-6">
              타 로펌이 할 수 없는, 로앤이만의 전략
            </h2>
            <p className="text-sm sm:text-base text-gray-500 text-center max-w-2xl mx-auto leading-relaxed mb-16">
              일반 로펌은 민사소송 하나만 겁니다. 보증금반환청구 소장을 넣고 기다립니다. 그동안
              임대인은 재산을 빼돌립니다.
              <br />
              로앤이는 다릅니다. 두 개의 칼날이 동시에 움직입니다.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* 카드1 - 민사 */}
            <ScrollReveal delay={0}>
              <div className="bg-white p-6 sm:p-8 h-full border-t-[3px] border-[#1B3B2F]">
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
                  가압류·임차권등기명령을 선제적으로 집행합니다. 임대인이 재산을 숨길 틈을 주지
                  않습니다. IT 기술을 직접 활용하는 변호사이기에 가능한 속도입니다.
                </p>
              </div>
            </ScrollReveal>

            {/* 카드2 - 형사 */}
            <ScrollReveal delay={0.12}>
              <div className="bg-white p-6 sm:p-8 h-full border-t-[3px] border-[#1B3B2F]">
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
                  보증금을 돌려주지 않는 것은 단순한 채무불이행이 아닙니다. 처음부터 돌려줄 의사
                  없이 계약했다면 사기죄입니다. 노채은 변호사는 재산범죄 전담 변호사로서 악성
                  임대인의 범죄 구조를 파헤치고, 형사 고소로 직접 타격합니다. 형사 압박이 들어가는
                  순간, 민사 협상의 판이 완전히 달라집니다.
                </p>
              </div>
            </ScrollReveal>

            {/* 카드3 - 리걸테크 */}
            <ScrollReveal delay={0.24}>
              <div className="bg-white p-6 sm:p-8 h-full border-t-[3px] border-[#1B3B2F]">
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
                      d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-black mb-3">
                  기술이 피해자의 무기가 됩니다
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  로앤이는 대한민국 유일의 리걸테크 피해자 전담 로펌입니다. 제6센터에서는 보증금
                  반환 촉구 내용증명 자동 생성 도구를 제공합니다. 변호사를 만나기 전에, 지금 이
                  자리에서 바로 내용증명을 보낼 수 있습니다. 어렵고 복잡한 법률 문서를 혼자 고민할
                  필요가 없습니다. 몇 가지 정보만 입력하면 법적 효력이 있는 내용증명이 완성됩니다.
                  초기 대응이 빠를수록 보증금을 되찾을 확률은 높아집니다.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <p className="mt-12 sm:mt-16 text-center text-sm sm:text-base font-semibold text-black">
              민사로 재산을 잠그고, 형사로 숨통을 조이는 입체 전략.
              <br />
              이것이 로앤이 제6센터의 방식입니다.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-16 sm:py-28 md:py-40 bg-[#1B3B2F] text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold">
              보증금, 반드시 돌려받으실 수 있습니다.
            </h2>
            <div className="mt-8 space-y-4 text-sm sm:text-base text-white/80 leading-relaxed">
              <p>
                혼자 임대인과 싸우지 마세요. 혼자 보낸 문자, 혼자 쓴 내용증명, 혼자 찾아간 경찰서
                — 효과가 없었다면, 이제 전문가에게 맡기세요.
              </p>
              <p>
                로앤이 제6센터는 임차인 피해자만을 위해 존재합니다. 가해자의 사건은 받지 않습니다.
                임대인 측의 의뢰는 정중히 거절합니다. 오직 피해자의 보증금을 되찾는 일에만
                집중합니다.
              </p>
              <p className="text-white font-medium">
                지금 바로 무료 상담을 신청하세요.
                <br />
                당신의 전 재산, 끝까지 함께 지켜드리겠습니다.
              </p>
            </div>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                onClick={() => openConsultation('임대차·보증금 피해 상담')}
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-[#1B3B2F] text-sm font-medium rounded-full hover:bg-gray-100 transition-colors min-h-[48px]"
              >
                무료 상담 신청하기
              </button>
              <a
                href="#"
                className="inline-flex items-center justify-center px-8 py-3.5 border border-white/40 text-white text-sm font-medium rounded-full hover:border-white/70 transition-colors min-h-[48px]"
              >
                내용증명 바로 작성하기
              </a>
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
