'use client'

import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'

const centers = [
  {
    title: '성범죄 피해자 전담 센터',
    description: '성범죄 피해자만을 위한 전담 변호 시스템',
    href: '/centers/sexual-crime',
    image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=600&fit=crop&q=80',
    alt: '어두운 방에 창문으로 빛이 들어오는 모습 - 희망과 회복',
  },
  {
    title: '재산범죄 피해자 전담 센터',
    description: '사기·횡령·배임 피해 전담 구제 시스템',
    href: '/centers/property-crime',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop&q=80',
    alt: '서류와 펜이 있는 깔끔한 데스크 - 법률과 계약',
  },
  {
    title: '회생파산 전담 센터(리셋)',
    description: '새로운 시작을 위한 법적 리셋 시스템',
    href: '/centers/bankruptcy',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop&q=80',
    alt: '새벽 들판의 일출 - 새로운 출발',
  },
]

const centersRow2 = [
  {
    title: '기업경영 법무센터',
    description: '기업 운영의 법적 리스크를 사전 차단합니다',
    href: '/centers/corporate',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=675&fit=crop&q=80',
    alt: '고층 빌딩을 올려다 본 모습',
  },
  {
    title: 'IT·보안 법률센터',
    description: '디지털 시대의 법적 보호막이 되겠습니다',
    href: '/centers/it-security',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=675&fit=crop&q=80',
    alt: '코드가 흐르는 화면 - 디지털과 기술',
  },
]

function CenterCard({ center, aspectClass, imgW, imgH }: { center: typeof centers[0]; aspectClass: string; imgW: number; imgH: number }) {
  return (
    <Link href={center.href} className="group block">
      <div className="border-t-[3px] border-[#1B3B2F] bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
        <div className={`${aspectClass} overflow-hidden relative`}>
          <Image
            src={center.image}
            alt={center.alt}
            width={imgW}
            height={imgH}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* Deep green gradient overlay from bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B3B2F]/70 via-[#1B3B2F]/20 to-transparent" />
          {/* Center name overlay on image */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-white drop-shadow-sm">
              {center.title}
            </h3>
          </div>
        </div>
        <div className="p-4 sm:p-5">
          <p className="text-sm text-gray-400">{center.description}</p>
          <span className="inline-flex items-center mt-3 text-xs text-gray-400 group-hover:text-accent transition-colors duration-300">
            자세히 보기 <span className="ml-1">&rarr;</span>
          </span>
        </div>
      </div>
    </Link>
  )
}

export default function CentersSection() {
  return (
    <section id="centers" className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">
            5 Specialized Centers
          </p>
          <h2 className="text-xl sm:text-3xl font-bold text-center text-black mb-10 sm:mb-20">
            5대 전문센터
          </h2>
        </ScrollReveal>

        {/* 상단 3개 센터 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8 mb-5 sm:mb-8">
          {centers.map((center, i) => (
            <ScrollReveal key={center.href} delay={i * 0.12}>
              <CenterCard center={center} aspectClass="aspect-[4/3]" imgW={800} imgH={600} />
            </ScrollReveal>
          ))}
        </div>

        {/* 하단 2개 센터 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
          {centersRow2.map((center, i) => (
            <ScrollReveal key={center.href} delay={i * 0.12}>
              <CenterCard center={center} aspectClass="aspect-[16/9]" imgW={1200} imgH={675} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
