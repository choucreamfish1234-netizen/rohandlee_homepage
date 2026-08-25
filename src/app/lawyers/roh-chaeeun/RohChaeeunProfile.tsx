'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import ScrollReveal from '@/components/ScrollReveal'
import { fetchLawyerImages, getFallbackImage } from '@/lib/lawyer-image'

const practiceAreas = [
  { title: '사기 피해 대리', desc: '투자사기, 중고거래사기, 코인사기 등 모든 유형의 사기 피해자를 대리하여 형사 고소부터 피해금 회수까지.' },
  { title: '횡령·배임 피해 대리', desc: '회사 자금 횡령, 업무상 배임 피해자를 대리하여 증거 확보, 고소, 손해배상 청구.' },
  { title: '보이스피싱 피해 대리', desc: '보이스피싱 피해자를 대리하여 계좌 동결, 피해금 환급, 민사 손해배상 소송.' },
  { title: '전세사기 피해 대리', desc: '전세사기 피해자를 대리하여 가압류, 형사 고소, 보증금 반환 소송.' },
]

const career = [
  '충북대학교 법학전문대학원 졸업',
  '변호사시험 합격',
  '법률사무소 로앤이 공동대표',
  '인천지방변호사회',
  '《피해자 감별사회》 공동저자 (박영사)',
]

export default function RohChaeeunProfile() {
  const [profileImage, setProfileImage] = useState(getFallbackImage('노채은'))

  useEffect(() => {
    fetchLawyerImages().then(images => {
      if (images['노채은']) setProfileImage(images['노채은'])
    })
  }, [])

  return (
    <>
      <section className="min-h-[50vh] flex flex-col items-center justify-center px-5 bg-[#FAFAFA]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200">
            <Image
              src={profileImage}
              alt="노채은 변호사"
              width={160}
              height={160}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-xs tracking-[0.3em] text-[#1B3B2F] uppercase mb-3">대표변호사</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-black">노채은</h1>
          <p className="mt-4 text-sm sm:text-base text-gray-500 leading-relaxed max-w-xl mx-auto">
            재산범죄 피해자 전문. 사기·횡령·배임·보이스피싱·전세사기 피해자를 대리합니다.
            <br />
            《피해자 감별사회》(박영사) 공동저자.
          </p>
        </motion.div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-black mb-3 text-center">전문 분야</h2>
            <p className="text-center text-sm text-gray-500 mb-12">돈을 돌려받아야 끝입니다. 고소장만 써주고 끝나는 곳과 다릅니다.</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {practiceAreas.map((area, i) => (
              <ScrollReveal key={area.title} delay={i * 0.1}>
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 h-full">
                  <h3 className="text-base font-bold text-black mb-2">{area.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{area.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-black mb-8 text-center">이력</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <ul className="space-y-3">
              {career.map(item => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="w-1.5 h-1.5 bg-[#1B3B2F] rounded-full mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 sm:py-24" style={{ backgroundColor: '#f7faf9' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-black mb-6 text-center">저서</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="bg-white border border-gray-100 rounded-xl p-6 sm:p-8">
              <h3 className="text-lg font-bold text-black mb-2">《피해자 감별사회》</h3>
              <p className="text-sm text-gray-500 mb-3">박영사 | 이유림·노채은 공저</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                왜 피해자가 오히려 의심받는가. 법정에서 피해자에게 쏟아지는 질문들의 구조적 문제를 분석하고,
                피해자의 권리를 지키기 위한 법적·사회적 과제를 제시합니다.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-xl font-bold text-black mb-6 text-center">담당 센터</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: '재산범죄 피해 전문센터', href: '/centers/property-crime' },
              { name: '재산회복 전담센터', href: '/centers/asset-recovery' },
              { name: '부동산 피해 전담센터', href: '/centers/real-estate' },
              { name: '손해배상 전담센터', href: '/centers/damages' },
            ].map(center => (
              <Link key={center.href} href={center.href} className="block p-4 border border-gray-100 rounded-lg hover:border-[#1B3B2F]/30 transition-colors">
                <span className="text-sm font-medium text-black">{center.name} &rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-[#1B3B2F] text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold">재산범죄 피해, 혼자 감당하지 마세요.</h2>
            <p className="mt-6 text-sm sm:text-base text-white/80 leading-relaxed">
              형사 고소부터 가압류, 강제집행, 피해금 회수까지.
              <br />
              노채은 변호사가 끝까지 함께합니다.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/consultation"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-[#1B3B2F] text-sm font-medium rounded-full hover:bg-gray-100 transition-colors min-h-[48px]"
              >
                상담 신청하기
              </Link>
              <a
                href="tel:032-207-8788"
                className="inline-flex items-center justify-center px-8 py-3.5 border border-white/30 text-white text-sm font-medium rounded-full hover:bg-white/10 transition-colors min-h-[48px]"
              >
                032-207-8788
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
