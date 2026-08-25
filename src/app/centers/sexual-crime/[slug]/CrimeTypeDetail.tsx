'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'
import Breadcrumb from '@/components/Breadcrumb'
import { useConsultation } from '@/components/ConsultationProvider'
import type { SexualCrimeType } from '@/data/sexual-crime-types'

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-200">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left">
        <span className="text-sm font-medium text-black pr-4">{q}</span>
        <span className={`flex-shrink-0 text-gray-400 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-40 pb-5' : 'max-h-0'}`}>
        <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
      </div>
    </div>
  )
}

export default function CrimeTypeDetail({ data }: { data: SexualCrimeType }) {
  const { openConsultation } = useConsultation()

  return (
    <>
      <Breadcrumb items={[{ name: '홈', href: '/' }, { name: '성범죄 피해자 전담센터', href: '/centers/sexual-crime' }, { name: data.title }]} />
      {/* Hero */}
      <section className="min-h-[40vh] flex flex-col items-center justify-center px-5 bg-white pt-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mb-6">
            <Link href="/centers/sexual-crime" className="hover:text-black transition-colors">성범죄 피해자 전담센터</Link>
            <span>/</span>
            <span className="text-black">{data.title.split(',')[0]}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black leading-tight">{data.title}</h1>
          <p className="mt-4 text-sm text-gray-500">{data.law}</p>
          <div className="mt-8">
            <button onClick={() => openConsultation('성범죄 상담')} className="inline-flex items-center justify-center px-8 py-3.5 bg-black text-white text-sm rounded-full hover:bg-gray-800 transition-colors min-h-[48px]">
              상담 신청하기
            </button>
          </div>
        </motion.div>
      </section>

      {/* 1단: 공감 + 핵심 요약 */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <ScrollReveal>
            <div className="bg-[#f8faf9] border-l-4 border-[#1B3B2F] rounded-r-lg p-6 sm:p-8">
              <p className="text-base text-[#1B3B2F]/80 leading-8">{data.empathy}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2단: 법률 해설 */}
      <section className="py-16 sm:py-24" style={{ backgroundColor: '#f7faf9' }}>
        <div className="max-w-3xl mx-auto px-6">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-4">Legal Guide</p>
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-8">법률 해설</h2>
            <p className="text-base text-gray-700 leading-8">{data.legalExplanation}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* 3단: 실전 대응 가이드 */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-4">Action Guide</p>
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-8">실전 대응 가이드</h2>
            <p className="text-base text-gray-700 leading-8 whitespace-pre-line">{data.practicalGuide}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* 4단: 《피해자 감별사회》 블록 */}
      <section className="py-16 sm:py-24" style={{ backgroundColor: '#f7faf9' }}>
        <div className="max-w-3xl mx-auto px-6">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-4">Authority</p>
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-2">
              《피해자 감별사회》 {data.bookReference.chapter}
            </h2>
            <p className="text-sm text-gray-500 mb-8">{data.bookReference.chapterTitle}</p>
            <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8">
              <p className="text-base text-gray-700 leading-8 whitespace-pre-line">{data.bookReference.content}</p>
            </div>
            <div className="mt-6">
              <a href="https://product.kyobobook.co.kr/detail/S000220843163" target="_blank" rel="noopener noreferrer" className="text-sm text-[#1B3B2F] font-medium hover:underline">
                《피해자 감별사회》 더 알아보기 &rarr;
              </a>
            </div>
          </ScrollReveal>

          {/* 종합 피해자 중심 블록 */}
          <ScrollReveal delay={0.1}>
            <div className="mt-12 bg-white border border-gray-100 rounded-2xl p-6 sm:p-8">
              <h3 className="text-base font-bold text-black mb-4">종합 피해자 중심 로펌의 원스톱 대응</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">{data.comprehensiveBlock.description}</p>
              <div className="flex flex-wrap gap-2">
                {data.comprehensiveBlock.linkedCenters.map(c => (
                  <Link key={c.name} href={c.path} className="text-xs font-medium px-3 py-1.5 bg-[#1B3B2F]/8 text-[#1B3B2F] rounded-full hover:bg-[#1B3B2F]/15 transition-colors">
                    {c.name} &rarr;
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* GEO 완결문장 */}
          <ScrollReveal delay={0.2}>
            <p className="mt-8 text-sm text-gray-500 leading-relaxed">{data.geoStatement}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* 5단: FAQ + CTA */}
      {data.faqs.length > 0 && (
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <ScrollReveal>
              <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-4">FAQ</p>
              <h2 className="text-xl sm:text-2xl font-bold text-black mb-10">자주 묻는 질문</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div>{data.faqs.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}</div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-black text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold">혼자 앓지 마세요.</h2>
            <p className="mt-4 text-gray-400 text-sm">이유림 변호사에게 상담을 신청하세요.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={() => openConsultation('성범죄 상담')} className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-100 transition-colors min-h-[48px]">
                상담 신청하기
              </button>
              <a href="tel:032-207-8788" className="inline-flex items-center justify-center px-8 py-3.5 border border-gray-600 text-white text-sm font-medium rounded-full hover:border-gray-400 transition-colors min-h-[48px]">
                032-207-8788
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 다른 유형 보기 */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <ScrollReveal>
            <h3 className="text-lg font-bold text-black mb-6 text-center">다른 성범죄 유형 보기</h3>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { name: '강간', slug: 'rape' },
              { name: '강제추행', slug: 'molestation' },
              { name: '준강간·준강제추행', slug: 'intoxication' },
              { name: '미성년자 대상 성범죄', slug: 'minors' },
              { name: '친족 성폭력', slug: 'family' },
              { name: '불법촬영(몰카)', slug: 'hidden-camera' },
              { name: '촬영물 유포', slug: 'distribution' },
              { name: '딥페이크', slug: 'deepfake' },
              { name: '온라인 성범죄', slug: 'online' },
              { name: '직장 내 성범죄', slug: 'workplace' },
              { name: '스토킹', slug: 'stalking' },
              { name: '성병 감염', slug: 'std' },
            ].map(item => (
              <Link key={item.slug} href={`/centers/sexual-crime/${item.slug}`} className="block p-3 border border-gray-100 rounded-lg hover:border-[#1B3B2F]/30 hover:bg-[#1B3B2F]/5 transition-colors text-center">
                <span className="text-sm font-medium text-black">{item.name}</span>
              </Link>
            ))}
          </div>
          <ScrollReveal delay={0.1}>
            <h3 className="text-lg font-bold text-black mt-12 mb-6 text-center">가이드 보기</h3>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { name: '수사 절차 안내', slug: 'investigation' },
              { name: '재판 절차', slug: 'trial' },
              { name: '항소·상고', slug: 'appeal' },
              { name: '합의 가이드', slug: 'settlement' },
              { name: '손해배상 청구', slug: 'damages' },
              { name: '비용 회수', slug: 'cost-recovery' },
              { name: '무고 대응', slug: 'false-accusation' },
              { name: '증거 확보', slug: 'evidence' },
              { name: '공소시효', slug: 'statute-of-limitations' },
            ].map(item => (
              <Link key={item.slug} href={`/centers/sexual-crime/guide/${item.slug}`} className="block p-3 border border-gray-100 rounded-lg hover:border-[#1B3B2F]/30 hover:bg-[#1B3B2F]/5 transition-colors text-center">
                <span className="text-sm font-medium text-black">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <Link href="/centers/sexual-crime" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#1B3B2F] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
            성범죄 피해자 전담센터로 돌아가기
          </Link>
        </div>
      </section>
    </>
  )
}
