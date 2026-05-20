'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'
import { useConsultation } from '@/components/ConsultationProvider'
import Script from 'next/script'

const faqs = [
  {
    question: '맞았는데 증거가 없어요. 고소 가능한가요?',
    answer:
      'CCTV, 목격자 진술, 진단서, 문자 메시지 등 다양한 방법으로 증거를 확보할 수 있습니다. 사건 직후가 아니더라도 고소는 가능하며, 증거 수집 방법을 함께 안내해드립니다.',
  },
  {
    question: '스토킹 신고했는데 경찰이 적극적으로 안 해요.',
    answer:
      '스토킹처벌법에 따라 경찰은 즉시 응급조치를 할 의무가 있습니다. 경찰 대응이 미흡한 경우 검찰 직접 고소, 법원 접근금지 가처분 신청 등 독자적인 법적 조치를 취할 수 있습니다.',
  },
  {
    question: '가정폭력인데 이혼하지 않고도 보호받을 수 있나요?',
    answer:
      '네, 가정폭력처벌법에 따라 이혼 여부와 관계없이 피해자 보호명령, 접근금지, 퇴거 조치를 받을 수 있습니다. 피해자의 안전이 최우선이며, 향후 방향은 상담을 통해 함께 결정합니다.',
  },
  {
    question: '합의금은 보통 얼마인가요?',
    answer:
      '피해 정도, 치료 기간, 후유증 유무, 가해자의 전과 여부 등에 따라 크게 달라집니다. 단순 폭행은 수백만 원부터, 중상해의 경우 수천만 원 이상의 합의금이 형성됩니다. 피해자가 최대한 보상받을 수 있도록 전략적으로 협상합니다.',
  },
  {
    question: '미성년자 자녀가 학교폭력을 당했어요.',
    answer:
      '학교폭력예방법에 따라 학교에 신고하여 심의위원회 조치를 받을 수 있고, 동시에 가해 학생 보호자를 상대로 민사 손해배상 청구도 가능합니다. 형사 처벌이 가능한 연령(14세 이상)이면 형사 고소도 진행할 수 있습니다.',
  },
]

const serviceAreas = [
  {
    title: '폭행·상해',
    description:
      '주먹, 발길질, 흉기 등에 의한 신체 공격. 폭행죄(형법 제260조), 상해죄(형법 제257조) 고소, 치료비·위자료 손해배상 청구. 진단서 확보부터 합의금 협상까지 전 과정을 함께합니다.',
    icon: (
      <svg className="w-6 h-6 text-[#1B3B2F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
      </svg>
    ),
  },
  {
    title: '스토킹',
    description:
      '반복적인 따라다니기, 연락, 감시, 대기. 스토킹처벌법에 따른 형사 고소, 접근금지 가처분 신청, 피해자 보호 조치 요청. 빠른 초기 대응이 가장 중요합니다.',
    icon: (
      <svg className="w-6 h-6 text-[#1B3B2F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: '협박·공갈',
    description:
      '해악을 고지하여 공포심을 일으키는 행위, 금품을 요구하는 행위. 협박죄(형법 제283조), 공갈죄(형법 제350조) 고소. 증거 확보 방법부터 안내해드립니다.',
    icon: (
      <svg className="w-6 h-6 text-[#1B3B2F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
  },
  {
    title: '가정폭력',
    description:
      '배우자, 동거인, 가족에 의한 신체적·정신적 폭력. 가정폭력처벌법에 따른 피해자 보호명령, 접근금지, 임시조치 신청. 피해자의 안전을 최우선으로 합니다.',
    icon: (
      <svg className="w-6 h-6 text-[#1B3B2F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
      </svg>
    ),
  },
  {
    title: '감금·체포',
    description:
      '불법적으로 신체의 자유를 구속하는 행위. 감금죄(형법 제276조) 고소 및 손해배상 청구.',
    icon: (
      <svg className="w-6 h-6 text-[#1B3B2F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    title: '데이트폭력',
    description:
      '연인 관계에서 발생하는 신체적·정신적 폭력, 통제, 감시. 폭행·상해·협박 등 해당 범죄로 고소하고, 접근금지 조치를 받을 수 있습니다.',
    icon: (
      <svg className="w-6 h-6 text-[#1B3B2F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    title: '학교폭력',
    description:
      '학교 내외에서 발생하는 폭행, 따돌림, 협박, 강요. 학교폭력예방법에 따른 피해자 보호 조치, 가해 학생 선도 조치, 손해배상 청구.',
    icon: (
      <svg className="w-6 h-6 text-[#1B3B2F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
]

const legalServiceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: '법률사무소 로앤이 신체범죄 피해 전담센터',
  description:
    '폭행·상해·스토킹·협박·공갈·감금·가정폭력 피해자 전문. 민사 손해배상과 형사 고소를 동시 진행.',
  url: 'https://lawfirmrohandlee.com/centers/physical-crime',
  telephone: '032-207-8788',
  areaServed: {
    '@type': 'Country',
    name: 'KR',
  },
  priceRange: '무료 상담',
  serviceType: ['폭행', '상해', '스토킹', '협박', '공갈', '감금', '가정폭력', '데이트폭력', '학교폭력'],
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

export default function PhysicalCrimePage() {
  const { openConsultation } = useConsultation()

  return (
    <>
      <Script
        id="physical-crime-legal-service-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceJsonLd) }}
      />
      <Script
        id="physical-crime-faq-jsonld"
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
            신체범죄 피해 전담센터
          </p>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-black leading-tight">
            맞아도 되는 사람은 없습니다.
            <br />
            <span className="text-[#1B3B2F]">당신의 몸과 안전, 법으로 지킵니다.</span>
          </h1>
          <p className="mt-6 text-sm sm:text-base text-gray-500 leading-relaxed max-w-xl mx-auto">
            폭행, 상해, 스토킹, 협박, 공갈, 감금, 가정폭력.
            <br />
            신체와 안전을 위협하는 모든 범죄, 로앤이가 피해자의 편에서 끝까지 싸웁니다.
          </p>
          <div className="mt-8">
            <button
              onClick={() => openConsultation('신체범죄 피해 상담')}
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
              왜 로앤이가 신체범죄 전담센터를 만들었는가
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <div className="space-y-6 text-sm sm:text-base text-gray-600 leading-relaxed">
              <p>
                갑자기 주먹이 날아왔습니다. 이유도 없이, 혹은 사소한 시비로. 병원에 다녀왔지만
                상대방은 사과 한마디 없습니다. &ldquo;맞을 짓을 했겠지&rdquo;라는 주변의 시선에
                오히려 피해자가 움츠러듭니다.
              </p>
              <p>
                매일 밤 협박 문자가 옵니다. 집 앞에서 기다리고 있는 사람이 있습니다. 무서워서
                신고했지만 경찰은 &ldquo;일단 지켜보겠다&rdquo;고만 합니다.
              </p>
              <p>
                신체범죄 피해자는 몸의 상처와 마음의 상처를 동시에 안고 삽니다. 그리고 너무 많은
                피해자가 제대로 된 법적 보호를 받지 못한 채 혼자 견디고 있습니다.
              </p>
              <p className="font-semibold text-black">
                법률사무소 로앤이는 창립 이래 단 한 번도 가해자를 변호한 적이 없습니다. 신체범죄
                피해 전담센터는 폭력의 피해자가 정당한 보호와 보상을 받을 수 있도록, 가해자에게
                확실한 법적 책임을 묻기 위해 만들었습니다.
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
              일반 로펌은 형사 고소만 하고 결과를 기다립니다. 로앤이는 다릅니다.
              <br />
              두 개의 칼날이 동시에 움직입니다.
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
                  이유림 변호사 — 증거를 확보하고 보호 조치를 선제 실행한다
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  CCTV 확보, 진단서 발급, 디지털 증거 수집을 신속하게 진행합니다. 스토킹·가정폭력의
                  경우 접근금지 가처분, 피해자 보호명령을 먼저 받아 피해자의 안전을 확보합니다.
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
                  노채은 변호사 — 형사 고소와 민사 손해배상을 동시에 추진한다
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  가해자에게 형사 처벌과 민사 배상 책임을 동시에 묻습니다. 형사 압박이 들어가는
                  순간 합의 협상의 주도권이 피해자에게 넘어옵니다. 합의금 협상도 피해자가 최대한
                  보상받을 수 있도록 전략적으로 진행합니다.
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
              폭력 앞에서 혼자 견디지 마세요.
            </h2>
            <div className="mt-8 space-y-4 text-sm sm:text-base text-white/80 leading-relaxed">
              <p>
                맞아도 되는 사람은 없고, 협박에 굴복할 이유도 없습니다. 로앤이 신체범죄 피해
                전담센터가 가해자에게 확실한 법적 책임을 묻겠습니다.
              </p>
              <p className="text-white font-medium">
                지금 바로 무료 상담을 신청하세요.
                <br />
                당신의 안전, 끝까지 함께 지키겠습니다.
              </p>
            </div>
            <div className="mt-8 sm:mt-10">
              <button
                onClick={() => openConsultation('신체범죄 피해 상담')}
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
