'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { EditableText, EditableImage } from '@/components/Editable'

const centers = [
  {
    title: '성범죄 피해자 전담 센터',
    description: '성범죄 피해자만을 위한 전담 변호 시스템',
    href: '/centers/sexual-crime',
    image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=600&fit=crop&q=80',
    alt: '희망과 회복',
  },
  {
    title: '재산범죄 피해자 전담 센터',
    description: '사기·횡령·배임 피해 전담 구제 시스템',
    href: '/centers/property-crime',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop&q=80',
    alt: '법률과 계약',
  },
  {
    title: '회생파산 전담 센터(리셋)',
    description: '새로운 시작을 위한 법적 리셋 시스템',
    href: '/centers/bankruptcy',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop&q=80',
    alt: '새로운 출발',
  },
  {
    title: '기업경영 법무센터',
    description: '기업 운영의 법적 리스크를 사전 차단합니다',
    href: '/centers/corporate',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&q=80',
    alt: '기업 법무',
  },
  {
    title: 'IT·보안 법률센터',
    description: '디지털 시대의 법적 보호막이 되겠습니다',
    href: '/centers/it-security',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop&q=80',
    alt: '디지털과 기술',
  },
]

export default function CentersSection() {
  return (
    <section id="centers" className="bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <p className="text-xs tracking-widest text-gray-400 uppercase mb-4">
            Practice Areas
          </p>
          <EditableText
            page="home"
            section="centers"
            fieldKey="heading"
            defaultValue="각 분야 전문 변호사가 전담합니다"
            tag="h2"
            className="text-3xl font-medium text-gray-900 tracking-tight mb-12 md:mb-16"
          />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {centers.map((center, i) => (
            <motion.div
              key={center.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
            >
              <Link href={center.href} className="group block bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-[4/3] overflow-hidden">
                  <EditableImage
                    page="home"
                    section="centers"
                    fieldKey={`center-${i}-image`}
                    defaultSrc={center.image}
                    alt={center.alt}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-medium text-gray-900">{center.title}</h3>
                  <EditableText
                    page="home"
                    section="centers"
                    fieldKey={`center-${i}-desc`}
                    defaultValue={center.description}
                    tag="p"
                    className="mt-1 text-sm text-gray-500"
                  />
                  <span className="inline-block mt-3 text-sm text-[#1B3B2F] font-medium">
                    자세히 보기 &rarr;
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
