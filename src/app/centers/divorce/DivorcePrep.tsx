'use client'

import { useState } from 'react'
import ScrollReveal from '@/components/ScrollReveal'

const items = [
  { title: '이혼 전 재산을 미리 옮기면 안 됩니다', content: '이혼을 앞두고 재산을 빼돌리면 \'사해행위\'로 취소될 수 있고, 재산분할 시 불리하게 작용합니다. 반대로 배우자가 재산을 빼돌리고 있다면, 즉시 가압류로 묶어야 합니다. 로앤이 재산회복센터가 재산 추적과 보전조치를 담당합니다.' },
  { title: '녹음, 카톡 캡처는 지금부터 시작하세요', content: '배우자의 폭언, 폭행, 외도 정황 등 증거는 이혼을 결심한 순간부터 모아야 합니다. 대화 당사자의 녹음은 합법입니다. 카카오톡, 문자, 통화 녹음, 사진, CCTV 등 모든 기록을 날짜별로 정리해두세요.' },
  { title: '별거 기간이 길수록 이혼 사유가 됩니다', content: '배우자가 이혼에 동의하지 않더라도, 장기간 별거 상태가 지속되면 \'혼인을 계속하기 어려운 중대한 사유\'(민법 제840조 제6호)로 인정받을 수 있습니다.' },
  { title: '아이가 있다면 양육 환경을 먼저 확보하세요', content: '양육권 판단에서 법원은 \'아이의 복리\'를 최우선으로 봅니다. 안정적인 주거, 경제력, 양육 의지를 보여줄 수 있는 환경을 미리 준비하는 것이 유리합니다.' },
  { title: '합의이혼이라도 반드시 변호사 검토를 받으세요', content: '협의이혼 합의서에 재산분할, 양육비, 위자료를 명확히 적지 않으면 나중에 분쟁이 생겨도 추가 청구가 어렵습니다. 합의서 한 줄이 수천만 원의 차이를 만듭니다.' },
]

function AccordionItem({ title, content }: { title: string; content: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-200">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left">
        <span className="text-sm font-medium text-black pr-4">{title}</span>
        <span className={`flex-shrink-0 text-gray-400 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-60 pb-5' : 'max-h-0'}`}>
        <p className="text-sm text-gray-500 leading-relaxed">{content}</p>
      </div>
    </div>
  )
}

export default function DivorcePrep() {
  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">Before You Start</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-3">이혼을 결심했다면, 먼저 읽어주세요</h2>
          <p className="text-center text-sm text-gray-500 mb-12">잘 모르고 시작하면 돌이킬 수 없는 불이익을 당합니다</p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div>{items.map(item => <AccordionItem key={item.title} title={item.title} content={item.content} />)}</div>
        </ScrollReveal>
      </div>
    </section>
  )
}
