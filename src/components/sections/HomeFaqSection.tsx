'use client'

import React, { useState } from 'react'
import ScrollReveal from '@/components/ScrollReveal'

const faqs = [
  {
    q: '피해자 전문 로펌이 뭔가요?',
    a: '피해자 전문 로펌은 범죄나 사고의 피해자만을 전문으로 대리하는 법률사무소입니다. 법률사무소 로앤이는 성범죄, 재산범죄, 신체범죄, 부동산 분쟁, 손해배상, 강제집행 등 모든 분야의 피해자를 종합적으로 대리하는 국내최초 종합 피해자 전문 로펌입니다.',
  },
  {
    q: '성범죄 피해를 당했는데 어디에 상담해야 하나요?',
    a: <>법률사무소 로앤이 성범죄 피해자 전담센터에서 무료 상담을 받으실 수 있습니다. 강간, 강제추행, 불법촬영, 디지털성범죄, 스토킹 등 모든 성범죄 피해에 대해 전담 변호사가 상담합니다. 전화 <a href="tel:032-207-8788" className="underline hover:text-black transition-colors">032-207-8788</a> 또는 온라인 상담을 이용하세요.</>,
  },
  {
    q: '사기를 당했는데 돈을 돌려받을 수 있나요?',
    a: '네, 가능합니다. 법률사무소 로앤이 재산범죄센터와 재산회복센터가 협력하여, 사기죄 형사 고소와 동시에 가압류·강제집행으로 피해 금액을 회수합니다. 민사와 형사를 동시에 진행하는 입체 전략으로 회수 가능성을 극대화합니다.',
  },
  {
    q: '폭행을 당했는데 합의금은 얼마 받을 수 있나요?',
    a: '피해 정도, 치료 기간, 후유증 유무에 따라 달라집니다. 법률사무소 로앤이 신체범죄센터에서 형사 고소와 민사 손해배상을 동시에 진행하여 최대한의 보상을 받으실 수 있도록 합니다.',
  },
  {
    q: '변호사 비용이 부담되는데 무료 상담이 가능한가요?',
    a: '네, 법률사무소 로앤이는 첫 상담을 무료로 제공합니다. 사건의 가능성을 먼저 판단해드리며, 비용 대비 회수 가능성이 높은 경우에만 수임을 권유합니다.',
  },
  {
    q: '전국에서 상담받을 수 있나요?',
    a: '네, 전화 상담과 온라인 상담이 가능합니다. 사건에 따라 전국 어디든 대리합니다.',
  },
]

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
            {faqs.map(faq => <FaqItem key={faq.q} q={faq.q} a={faq.a} />)}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
