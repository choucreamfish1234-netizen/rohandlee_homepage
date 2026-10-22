'use client'

import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'
import { EditableImage } from '@/components/Editable'
import { areaNavs } from '@/data/practice/nav'

const areaMeta: Record<string, { title: string; desc: string; image: string; alt: string }> = {
  '/defense': {
    title: '형사 사건 대응',
    desc: '수사 초기부터 재판까지, 체계적인 형사 대응. 조사 동행부터 구속영장 대응, 공판 변론까지 대표변호사가 직접 수행합니다.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=675&fit=crop&q=80',
    alt: '법정의 의사봉 - 형사 사건 대응',
  },
  '/centers': {
    title: '피해자 전문센터',
    desc: '11대 전문센터 — 범죄 피해 구제의 모든 것. 고소 대리부터 손해배상, 재산 회복까지 피해 유형별로 대응합니다.',
    image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1200&h=675&fit=crop&q=80',
    alt: '창문으로 빛이 들어오는 방 - 피해 회복',
  },
  '/collection': {
    title: '채권추심센터',
    desc: '받아야 할 돈, 확실하게 회수합니다. 내용증명부터 가압류, 지급명령, 강제집행까지 회수의 전 과정을 수행합니다.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=675&fit=crop&q=80',
    alt: '금융 서류와 계산기 - 채권 회수',
  },
  '/crypto': {
    title: '가상자산·코인',
    desc: '코인 상장 자문부터 거래소 분쟁까지. 토큰 발행 규제, 가상자산 압류, 코인 관련 형사 사건까지 다룹니다.',
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=1200&h=675&fit=crop&q=80',
    alt: '가상자산 코인 - 가상자산 법률자문',
  },
  '/business': {
    title: '기업 법률자문',
    desc: '스타트업부터 중소기업까지, 사업의 법적 리스크 관리. 설립·투자 자문, 컴플라이언스, 계약서 검토를 제공합니다.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=675&fit=crop&q=80',
    alt: '고층 빌딩 - 기업 법률자문',
  },
}

export default function PracticeAreasSection() {
  return (
    <section id="areas" className="py-20 sm:py-28 bg-[#F6F2EA]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 sm:mb-16">
            <div>
              <p className="eyebrow">Practice Areas</p>
              <h2 className="mt-5 font-serif text-3xl sm:text-5xl font-semibold text-[#1C1C1A] leading-tight">5대 업무 분야</h2>
            </div>
            <p className="text-sm sm:text-base text-[#1C1C1A]/60 leading-relaxed sm:max-w-sm">
              수사 대응부터 피해 구제, 채권 회수, 가상자산, 기업 자문까지. 사건의 처음과 끝을 대표변호사가 함께합니다.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-x-6 gap-y-12 sm:gap-y-16">
          {areaNavs.map((area, i) => {
            const meta = areaMeta[area.href]
            const large = i < 2
            return (
              <ScrollReveal key={area.href} delay={i * 0.06} className={large ? 'lg:col-span-3' : 'lg:col-span-2'}>
                <article className="group flex flex-col h-full">
                  <Link href={area.href} className={`block overflow-hidden relative ${large ? 'aspect-[4/3]' : 'aspect-[4/5]'}`}>
                    <EditableImage
                      page="home"
                      section="areas"
                      fieldKey={`area-${i}-image`}
                      defaultSrc={meta.image}
                      alt={meta.alt}
                      width={1200}
                      height={900}
                      className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms] ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />
                    <span className="absolute top-5 left-5 font-serif text-sm text-white/90 tracking-widest pointer-events-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="absolute bottom-5 left-5 right-5 font-serif text-2xl sm:text-3xl font-semibold text-white pointer-events-none">
                      {meta.title}
                    </h3>
                  </Link>
                  <p className="mt-5 text-sm sm:text-[15px] text-[#1C1C1A]/70 leading-relaxed">{meta.desc}</p>
                  <ul className="mt-5 border-t border-[#1C1C1A]/15">
                    {area.links.map((link) => (
                      <li key={link.href} className="border-b border-[#1C1C1A]/10">
                        <Link
                          href={link.href}
                          className="flex items-center justify-between py-2.5 text-sm text-[#1C1C1A]/80 hover:text-[#1B3B2F] hover:pl-1 transition-all"
                        >
                          {link.label}
                          <span className="text-[#B8955A]/70 text-xs">&rarr;</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={area.href}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#1B3B2F] hover:text-[#B8955A] transition-colors"
                  >
                    {meta.title} 전체 보기 <span aria-hidden>&rarr;</span>
                  </Link>
                </article>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
