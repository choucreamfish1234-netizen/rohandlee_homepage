'use client'

import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'

const centers = [
  {
    title: '성범죄 피해자 전담 센터',
    description: '성범죄 피해자만을 위한 전담 변호 시스템',
    href: '/centers/sexual-crime',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop&q=80',
    alt: '싱잉볼을 치는 손 - 힐링과 치유',
  },
  {
    title: '재산범죄 피해자 전담 센터',
    description: '사기·횡령·배임 피해 전담 구제 시스템',
    href: '/centers/property-crime',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop&q=80',
    alt: '밀밭에 손을 뻗는 모습 - 자연과 회복',
  },
  {
    title: '회생파산 전담 센터(리셋)',
    description: '새로운 시작을 위한 법적 리셋 시스템',
    href: '/centers/bankruptcy',
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&h=600&fit=crop&q=80',
    alt: '빛나는 크리스탈볼 - 새출발',
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
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200&h=675&fit=crop&q=80',
    alt: '노트북 키보드 클로즈업',
  },
]

function CenterCard({ center, aspectClass, imgW, imgH }: { center: typeof centers[0]; aspectClass: string; imgW: number; imgH: number }) {
  return (
    <Link href={center.href} className="group block">
      <div className={`${aspectClass} bg-gray-50 overflow-hidden mb-5`}>
        <Image
          src={center.image}
          alt={center.alt}
          width={imgW}
          height={imgH}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
      </div>
      <div className="transition-transform duration-300 group-hover:-translate-y-1">
        <h3 className="text-lg font-semibold text-black group-hover:text-accent transition-colors duration-300">
          {center.title}
        </h3>
        <p className="mt-1.5 text-sm text-gray-400">{center.description}</p>
        <span className="inline-flex items-center mt-3 text-xs text-gray-400 group-hover:text-accent transition-colors duration-300">
          자세히 보기 <span className="ml-1">&rarr;</span>
        </span>
      </div>
    </Link>
  )
}

export default function CentersSection() {
  return (
    <section id="centers" className="py-40 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">
            5 Specialized Centers
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-black mb-20">
            5대 전문센터
          </h2>
        </ScrollReveal>

        {/* 상단 3개 센터 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {centers.map((center, i) => (
            <ScrollReveal key={center.href} delay={i * 0.12}>
              <CenterCard center={center} aspectClass="aspect-[4/3]" imgW={800} imgH={600} />
            </ScrollReveal>
          ))}
        </div>

        {/* 하단 2개 센터 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
