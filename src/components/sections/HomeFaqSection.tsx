'use client'

import React, { useState } from 'react'
import ScrollReveal from '@/components/ScrollReveal'
import { homeFaqs } from '@/data/practice/home-faqs'

function FaqItem({ q, a, no }: { q: string; a: React.ReactNode; no: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-[#1C1C1A]/15">
      <button onClick={() => setOpen(!open)} className="w-full flex items-start gap-5 py-6 text-left" aria-expanded={open}>
        <span className="font-serif text-sm text-[#B8955A] pt-0.5 w-6 flex-shrink-0">{String(no).padStart(2, '0')}</span>
        <span className="flex-1 text-base sm:text-lg font-medium text-[#1C1C1A]">{q}</span>
        <span className={`flex-shrink-0 text-[#1C1C1A]/40 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-80 pb-6' : 'max-h-0'}`}>
        <p className="pl-11 text-sm sm:text-base text-[#1C1C1A]/65 leading-relaxed">{a}</p>
      </div>
    </div>
  )
}

export default function HomeFaqSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#F6F2EA]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <ScrollReveal className="lg:col-span-4">
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-5 font-serif text-3xl sm:text-4xl font-semibold text-[#1C1C1A] leading-tight">자주 묻는 질문</h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1} className="lg:col-span-8">
          <div className="border-t border-[#1C1C1A]/15">
            {homeFaqs.map((faq, i) => <FaqItem key={faq.q} q={faq.q} a={faq.a} no={i + 1} />)}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
