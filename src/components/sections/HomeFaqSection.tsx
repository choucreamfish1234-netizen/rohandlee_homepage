'use client'

import React, { useState } from 'react'
import ScrollReveal from '@/components/ScrollReveal'
import { homeFaqs } from '@/data/practice/home-faqs'

function FaqItem({ q, a }: { q: string; a: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-200">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 sm:py-6 text-left">
        <span className="text-sm sm:text-base font-medium text-black pr-4">{q}</span>
        <span className={`flex-shrink-0 text-gray-400 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-60 pb-5' : 'max-h-0'}`}>
        <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
      </div>
    </div>
  )
}

export default function HomeFaqSection() {
  return (
    <section className="py-12 sm:py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">FAQ</p>
          <h2 className="text-xl sm:text-3xl font-bold text-center text-black mb-12 sm:mb-16">자주 묻는 질문</h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div>
            {homeFaqs.map(faq => <FaqItem key={faq.q} q={faq.q} a={faq.a} />)}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
