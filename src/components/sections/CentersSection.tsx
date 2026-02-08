'use client'

import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'

const centers = [
  {
    title: '성범죄 피해자 전담 센터',
    description: '성범죄 피해자만을 위한 전담 변호 시스템',
    href: '/centers/sexual-crime',
    image: '/images/center-sexual.jpg',
  },
  {
    title: '재산범죄 피해자 전담 센터',
    description: '사기·횡령·배임 피해 전담 구제 시스템',
    href: '/centers/property-crime',
    image: '/images/center-property.jpg',
  },
  {
    title: '회생파산 전담 센터(리셋)',
    description: '새로운 시작을 위한 법적 리셋 시스템',
    href: '/centers/bankruptcy',
    image: '/images/center-reset.jpg',
  },
]

const centersRow2 = [
  {
    title: '기업경영 법무센터',
    description: '기업 운영의 법적 리스크를 사전 차단합니다',
    href: '/centers/corporate',
    image: '/images/center-corporate.jpg',
  },
  {
    title: 'IT보안 법률센터',
    description: '디지털 시대의 법적 보호막이 되겠습니다',
    href: '/centers/it-security',
    image: '/images/center-it.jpg',
  },
]

export default function CentersSection() {
  return (
    <section id="centers" className="py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.2em] text-gray-400 uppercase text-center mb-4">
            5 Specialized Centers
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-16">
            5대 전문센터
          </h2>
        </ScrollReveal>

        {/* 상단 3개 센터 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {centers.map((center, i) => (
            <ScrollReveal key={center.href} delay={i * 0.1}>
              <Link href={center.href} className="group block">
                <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden mb-4 img-placeholder">
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-lg font-semibold text-black group-hover:text-accent transition-colors">
                  {center.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{center.description}</p>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* 하단 2개 센터 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {centersRow2.map((center, i) => (
            <ScrollReveal key={center.href} delay={i * 0.1}>
              <Link href={center.href} className="group block">
                <div className="aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden mb-4 img-placeholder">
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-lg font-semibold text-black group-hover:text-accent transition-colors">
                  {center.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{center.description}</p>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
