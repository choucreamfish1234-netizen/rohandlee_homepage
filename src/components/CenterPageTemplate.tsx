'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'

interface Service {
  title: string
  description: string
}

interface CaseExample {
  title: string
  description: string
}

interface CenterPageTemplateProps {
  centerName: string
  subtitle: string
  ctaLabel: string
  ctaHref: string
  services: Service[]
  caseExamples?: CaseExample[]
  declaration: {
    title: string
    description: string
  }
  lawyerName: string
  lawyerRole: string
  lawyerSpecialty: string
  lawyerQuote: string
  ctaTitle: string
  ctaDescription: string
}

export default function CenterPageTemplate({
  centerName,
  subtitle,
  ctaLabel,
  ctaHref,
  services,
  caseExamples,
  declaration,
  lawyerName,
  lawyerRole,
  lawyerSpecialty,
  lawyerQuote,
  ctaTitle,
  ctaDescription,
}: CenterPageTemplateProps) {
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
            법률사무소 로앤이<br />
            <span className="text-gray-400">{subtitle}</span>
          </h1>
          <div className="mt-8">
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center px-6 py-3 bg-black text-white text-sm rounded-full hover:bg-gray-800 transition-colors"
            >
              {ctaLabel}
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 서비스 그리드 */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="group">
                  <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden mb-4 img-placeholder">
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h3 className="text-base font-semibold text-black">{service.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{service.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 사례 */}
      {caseExamples && caseExamples.length > 0 && (
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <h2 className="text-2xl font-bold text-center text-black mb-16">주요 성과 사례</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseExamples.map((c, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="bg-white rounded-xl p-6 border border-gray-100">
                    <h3 className="font-semibold text-black">{c.title}</h3>
                    <p className="mt-2 text-sm text-gray-500">{c.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 선언문 */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-black leading-snug">
              {declaration.title}
            </h2>
            <p className="mt-6 text-gray-500 leading-relaxed">{declaration.description}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* 의뢰인 후기 */}
      <section className="py-24 bg-gray-50">
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

      {/* 담당 변호사 */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <ScrollReveal>
            <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mb-8">
              {centerName} 전담 변호사
            </p>
            <div className="w-full max-w-xs mx-auto aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden mb-6 img-placeholder">
              <div className="w-full h-full bg-gradient-to-b from-gray-200 to-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-black">{lawyerName} {lawyerRole}</h3>
            <p className="mt-1 text-sm text-accent font-medium">{lawyerSpecialty}</p>
            <p className="mt-4 text-sm text-gray-500 leading-relaxed whitespace-pre-line">
              {lawyerQuote}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold">{ctaTitle}</h2>
            <p className="mt-4 text-gray-400 text-sm">{ctaDescription}</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/consultation"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-100 transition-colors"
              >
                {lawyerName} 변호사와 상담 예약하기
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
