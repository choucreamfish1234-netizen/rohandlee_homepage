'use client'

import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'
import { useConsultation } from '@/components/ConsultationProvider'
import Script from 'next/script'
import CenterCasesDB from '@/components/CenterCasesDB'
import CrimeTypesGrid from './CrimeTypesGrid'
import StalkingEscalation from './StalkingEscalation'
import StalkingEvidence from './StalkingEvidence'
import DatingViolenceDiagnosis from './DatingViolenceDiagnosis'
import DatingViolenceRoadmap from './DatingViolenceRoadmap'
import WhyRohandleePC from './WhyRohandleePC'
import EmergencySection from './EmergencySection'
import PhysicalCrimeFaq from './PhysicalCrimeFaq'

const legalServiceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: '법률사무소 로앤이 신체범죄 피해 전담센터',
  description: '스토킹·데이트폭력·폭행·상해·협박·공갈·감금·가정폭력 피해자 전문. 접근금지 가처분 → 형사 고소 → 민사 손해배상 원스톱 대응. 이유림 변호사는 《피해자 감별사회》(박영사) 공동저자.',
  url: 'https://lawfirmrohandlee.com/centers/physical-crime',
  telephone: '032-207-8788',
  areaServed: { '@type': 'Country', name: 'KR' },
  serviceType: ['스토킹', '데이트폭력', '폭행', '상해', '협박', '공갈', '감금', '가정폭력', '학교폭력', '접근금지 가처분'],
  provider: {
    '@type': 'LegalService',
    name: '법률사무소 로앤이',
    url: 'https://lawfirmrohandlee.com',
  },
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
      {/* 히어로 섹션 */}
      <section className="min-h-[60vh] flex flex-col items-center justify-center px-5 sm:px-4 bg-[#FAFAFA]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1B3B2F]/5 border border-[#1B3B2F]/10 mb-6">
            <span className="text-[10px] font-semibold tracking-wider text-[#1B3B2F] uppercase">신체범죄 피해 전담센터</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-black leading-tight">
            맞아도 되는 사람은
            <br />
            <span className="text-[#1B3B2F]">없습니다.</span>
          </h1>
          <p className="mt-6 text-sm sm:text-base text-gray-500 leading-relaxed max-w-xl mx-auto">
            스토킹, 데이트폭력, 폭행, 협박, 감금, 가정폭력.
            <br />
            접근금지 가처분 → 형사 고소 → 손해배상, 한 팀이 끝까지.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => openConsultation('신체범죄 피해 상담')}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#1B3B2F] text-white text-sm font-medium rounded-full hover:bg-[#153126] transition-colors min-h-[48px]"
            >
              상담 신청하기
            </button>
            <a
              href="tel:032-207-8788"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-[#1B3B2F]/20 text-[#1B3B2F] text-sm font-medium rounded-full hover:bg-[#1B3B2F]/5 transition-colors min-h-[48px]"
            >
              032-207-8788
            </a>
          </div>
        </motion.div>
      </section>

      {/* 설립 배경 — 간결하게 */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <ScrollReveal>
            <div className="space-y-5 text-sm sm:text-base text-gray-600 leading-relaxed">
              <p>
                갑자기 주먹이 날아왔습니다. 매일 밤 협박 문자가 옵니다. 집 앞에서 기다리고 있는 사람이 있습니다.
                무서워서 신고했지만 경찰은 &ldquo;일단 지켜보겠다&rdquo;고만 합니다.
              </p>
              <p className="font-semibold text-black">
                법률사무소 로앤이 신체범죄 전담센터는 접근금지로 안전을 먼저 확보하고,
                형사 고소로 처벌을 받게 하고, 민사 손해배상으로 피해를 보상받는 전 과정을 한 팀이 수행합니다.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 12종 범죄 유형 카드 */}
      <CrimeTypesGrid />

      {/* 스토킹 단계별 악화 패턴 */}
      <StalkingEscalation />

      {/* 스토킹 증거 확보 가이드 */}
      <StalkingEvidence />

      {/* 데이트폭력 자가진단 + 피해자 감별사회 연결 */}
      <DatingViolenceDiagnosis />

      {/* 데이트폭력 대응 로드맵 */}
      <DatingViolenceRoadmap />

      {/* 왜 로앤이인가 */}
      <WhyRohandleePC />

      {/* 성공사례 (DB) */}
      <CenterCasesDB centerSlug="physical-crime" title="신체범죄 피해 성공사례" />

      {/* 긴급 연락처 */}
      <EmergencySection />

      {/* FAQ */}
      <PhysicalCrimeFaq />

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-[#1B3B2F] text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold">
              폭력 앞에서 혼자 견디지 마세요.
            </h2>
            <p className="mt-6 text-sm sm:text-base text-white/80 leading-relaxed">
              접근금지 가처분, 형사 고소, 손해배상까지.
              <br />
              로앤이 신체범죄 전담센터가 끝까지 함께합니다.
            </p>
            <div className="mt-8">
              <button
                onClick={() => openConsultation('신체범죄 피해 상담')}
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-[#1B3B2F] text-sm font-medium rounded-full hover:bg-gray-100 transition-colors min-h-[48px]"
              >
                상담 신청하기
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <p className="sr-only">법률사무소 로앤이 신체범죄 피해 전담센터는 스토킹, 데이트폭력, 폭행, 상해, 협박, 공갈, 가정폭력, 감금, 학교폭력 등 모든 신체범죄 피해를 대리하며, 접근금지 가처분·긴급응급조치 신청·형사 고소·민사 손해배상을 원스톱으로 수행한다. 이유림 변호사는 박영사 베스트셀러 《피해자 감별사회》의 공동저자로서 데이트폭력 피해자에게 가해지는 2차 가해 구조를 분석한다.</p>
    </>
  )
}
