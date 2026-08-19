'use client'

import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'
import { useConsultation } from '@/components/ConsultationProvider'
import Script from 'next/script'
import RealEstateCrimeTypes from './RealEstateCrimeTypes'
import WhyRohandleeRE from './WhyRohandleeRE'
import UrgentGuide from './UrgentGuide'
import RealEstateFaq from './RealEstateFaq'
import CenterCasesDB from '@/components/CenterCasesDB'

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

export default function RealEstatePage() {
  const { openConsultation } = useConsultation()

  return (
    <>
      <Script
        id="real-estate-legal-service-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceJsonLd) }}
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
                부동산 거래에서 신뢰를 악용해 남의 재산을 삼킨 사람은 명백한 가해자이고, 재산을
                빼앗긴 사람은 명백한 피해자입니다. 법률사무소 로앤이는 피해자의 권리를 최우선으로
                합니다.
              </p>
              <p className="font-semibold text-black">
                그래서 만들었습니다.
                <br />
                부동산 피해 전담센터.
                <br />
                피해자 중심의 법률 서비스를 제공합니다.
              </p>
            </div>
          </ScrollReveal>
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

      <RealEstateCrimeTypes />
      <WhyRohandleeRE />
      <UrgentGuide />
      <CenterCasesDB centerSlug="real-estate" title="부동산 피해 성공사례" />
      <RealEstateFaq />

      {/* CTA 섹션 — 맨 하단 */}
      <section className="py-16 sm:py-24 bg-[#1B3B2F] text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold">
              부동산 피해, 반드시 되찾으실 수 있습니다.
            </h2>
            <div className="mt-8 space-y-4 text-sm sm:text-base text-white/80 leading-relaxed">
              <p>혼자 싸우지 마세요. 로앤이 부동산 피해 전담센터는 피해자의 권리를 최우선으로 합니다.</p>
              <p className="text-white font-medium">당신의 재산, 끝까지 함께 지켜드리겠습니다.</p>
            </div>
            <div className="mt-8">
              <button
                onClick={() => openConsultation('부동산 피해 상담')}
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-[#1B3B2F] text-sm font-medium rounded-full hover:bg-gray-100 transition-colors min-h-[48px]"
              >
                상담 신청하기
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
