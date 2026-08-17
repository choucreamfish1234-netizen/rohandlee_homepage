'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'
import { useConsultation } from '@/components/ConsultationProvider'
import type { SexualCrimeGuide } from '@/data/sexual-crime-guides'

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

export default function GuideDetail({ data }: { data: SexualCrimeGuide }) {
  const { openConsultation } = useConsultation()

  return (
    <>
      <section className="min-h-[35vh] flex flex-col items-center justify-center px-5 bg-white pt-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mb-6">
            <Link href="/centers/sexual-crime" className="hover:text-black transition-colors">성범죄 피해자 전담센터</Link>
            <span>/</span>
            <span className="text-black">가이드</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black leading-tight">{data.title}</h1>
          <div className="mt-8">
            <button onClick={() => openConsultation('성범죄 상담')} className="inline-flex items-center justify-center px-8 py-3.5 bg-black text-white text-sm rounded-full hover:bg-gray-800 transition-colors min-h-[48px]">
              상담 신청하기
            </button>
          </div>
        </motion.div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <ScrollReveal>
            <p className="text-base text-gray-700 leading-8 whitespace-pre-line">{data.content}</p>
          </ScrollReveal>
        </div>
      </section>

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
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-8 text-sm text-gray-500 leading-relaxed">{data.geoStatement}</p>
          </ScrollReveal>
        </div>
      </section>

      {data.faqs.length > 0 && (
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="text-xl sm:text-2xl font-bold text-black mb-10">자주 묻는 질문</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div>{data.faqs.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}</div>
            </ScrollReveal>
          </div>
        </section>
      )}

      <section className="py-16 sm:py-24 bg-black text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold">혼자 앓지 마세요.</h2>
            <p className="mt-4 text-gray-400 text-sm">이유림 변호사에게 상담을 신청하세요.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={() => openConsultation('성범죄 상담')} className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-100 transition-colors min-h-[48px]">상담 신청하기</button>
              <a href="tel:032-207-8788" className="inline-flex items-center justify-center px-8 py-3.5 border border-gray-600 text-white text-sm font-medium rounded-full hover:border-gray-400 transition-colors min-h-[48px]">032-207-8788</a>
            </div>
          </ScrollReveal>
        </div>
      </section>

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
