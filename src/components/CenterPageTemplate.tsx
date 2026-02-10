'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'
import { useConsultation } from '@/components/ConsultationProvider'

interface Service {
  title: string
  description: string
  image?: string
}

interface CaseExample {
  title: string
  description: string
  image?: string
}

interface Lawyer {
  name: string
  role: string
  specialty: string
  quote: string
  image: string
}

interface CenterPageTemplateProps {
  centerName: string
  subtitle: string
  ctaLabel: string
  ctaHref?: string
  services: Service[]
  caseExamples?: CaseExample[]
  declaration: {
    title: string
    description: string
  }
  lawyers: Lawyer[]
  ctaTitle: string
  ctaDescription: string
  customSection?: React.ReactNode
  defaultCaseType?: string
}

export default function CenterPageTemplate({
  centerName,
  subtitle,
  ctaLabel,
  services,
  caseExamples,
  declaration,
  lawyers,
  ctaTitle,
  ctaDescription,
  customSection,
  defaultCaseType,
}: CenterPageTemplateProps) {
  const { openConsultation } = useConsultation()
  const handleCtaClick = () => openConsultation(defaultCaseType)
  return (
    <>
      {/* 히어로 */}
      <section className="min-h-[60vh] flex flex-col items-center justify-center px-4 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black leading-tight">
            법률사무소 로앤이
            <br />
            <span className="text-gray-400">{subtitle}</span>
          </h1>
          <div className="mt-8">
            <button
              onClick={handleCtaClick}
              className="inline-flex items-center justify-center px-6 py-3 bg-black text-white text-sm rounded-full hover:bg-gray-800 transition-colors"
            >
              {ctaLabel}
            </button>
          </div>
        </motion.div>
      </section>

      {/* 서비스 그리드 */}
      <section className="py-28 sm:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-16">
              주요 업무 영역
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="group">
                  <div className="aspect-[4/3] bg-gray-100 overflow-hidden mb-5">
                    {service.image ? (
                      <Image
                        src={service.image}
                        alt={service.title}
                        width={800}
                        height={600}
                        className="w-full h-full object-cover group-hover:scale-[1.04] group-hover:brightness-110 transition-all duration-700 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 group-hover:scale-105 transition-transform duration-500" />
                    )}
                  </div>
                  <h3 className="text-base font-semibold text-black">{service.title}</h3>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">{service.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 사례 */}
      {caseExamples && caseExamples.length > 0 && (
        <section className="py-28 sm:py-40 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-16">
                주요 성과 사례
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseExamples.map((c, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="group">
                    {c.image && (
                      <div className="aspect-[4/3] bg-gray-100 overflow-hidden mb-5">
                        <Image
                          src={c.image}
                          alt={c.title}
                          width={800}
                          height={600}
                          className="w-full h-full object-cover group-hover:scale-[1.04] group-hover:brightness-110 transition-all duration-700 ease-out"
                        />
                      </div>
                    )}
                    <h3 className="font-semibold text-black">{c.title}</h3>
                    <p className="mt-2 text-sm text-gray-500 leading-relaxed">{c.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 선언문 */}
      <section className="py-28 sm:py-40 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-black leading-snug whitespace-pre-line">
              {declaration.title}
            </h2>
            <div className="mt-8 w-16 h-px bg-accent mx-auto" />
            <p className="mt-8 text-gray-500 leading-relaxed whitespace-pre-line">
              {declaration.description}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 의뢰인 후기 또는 커스텀 섹션 */}
      {customSection ? customSection : (
        <section className="py-28 sm:py-40 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-2xl sm:text-3xl font-bold text-black">
                  <span className="text-accent">100</span>명 이상의 의뢰인이 증명합니다.
                </h2>
                <p className="mt-4 text-gray-500 text-sm">
                  압도적인 별점 <span className="text-accent font-bold">5.0</span>, 수많은 감사 인사가 로앤이의 실력을 말해줍니다.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* 담당 변호사 */}
      <section className="py-28 sm:py-40 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-4">
              Assigned Lawyers
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-black mb-16">
              {centerName} 전담 변호사
            </h2>
          </ScrollReveal>

          <div className={`grid gap-16 ${lawyers.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 max-w-xs mx-auto'}`}>
            {lawyers.map((lawyer, i) => (
              <ScrollReveal key={lawyer.name} delay={i * 0.15}>
                <div className="text-center">
                  <div className="w-full aspect-[3/4] max-w-xs mx-auto bg-gray-100 overflow-hidden mb-8 shadow-sm">
                    <Image
                      src={lawyer.image}
                      alt={`${lawyer.name} ${lawyer.role}`}
                      width={600}
                      height={800}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-black">
                    {lawyer.name}{' '}
                    <span className="font-sans text-base font-normal text-gray-400">
                      {lawyer.role}
                    </span>
                  </h3>
                  <p className="mt-1 text-sm text-accent font-medium">{lawyer.specialty}</p>
                  <p className="mt-5 text-sm text-gray-400 leading-relaxed whitespace-pre-line">
                    {lawyer.quote}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 sm:py-40 bg-black text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold">{ctaTitle}</h2>
            <p className="mt-4 text-gray-400 text-sm">{ctaDescription}</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleCtaClick}
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-100 transition-colors"
              >
                무료 상담 신청하기
              </button>
              <a
                href="tel:032-207-8788"
                className="inline-flex items-center justify-center px-8 py-3.5 border border-gray-600 text-white text-sm font-medium rounded-full hover:border-gray-400 transition-colors"
              >
                <span className="">032-207-8788</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
