'use client'

import { useState } from 'react'
import ScrollReveal from '@/components/ScrollReveal'

const faqs = [
  { q: '스토킹으로 경찰에 신고하면 바로 접근금지가 되나요?', a: '네, 경찰은 스토킹처벌법에 따라 즉시 긴급응급조치를 내릴 수 있습니다. 접근금지, 연락금지, 100미터 이내 접근 금지 등이 포함됩니다. 더 강력한 보호가 필요하면 법원 접근금지 가처분을 별도로 신청합니다.' },
  { q: '스토킹 증거가 부족한데 신고할 수 있나요?', a: '반복적 행위가 핵심입니다. 문자, 카톡, DM, 전화 기록, CCTV, 목격자 진술 등을 모아서 반복성을 입증하면 됩니다.' },
  { q: '스토킹 접근금지를 위반하면 어떻게 되나요?', a: '스토킹처벌법상 잠정조치 위반 시 2년 이하 징역 또는 2천만 원 이하 벌금에 처해집니다. 위반 사실을 증거로 확보하여 추가 고소하면 가중 처벌이 가능합니다.' },
  { q: '데이트폭력인데 연인 사이에도 고소가 되나요?', a: '당연히 됩니다. 연인 관계는 폭력의 면책 사유가 아닙니다. 폭행, 상해, 협박, 감금, 공갈, 강요 등 모든 범죄가 연인 사이에서도 동일하게 적용됩니다.' },
  { q: '데이트폭력 피해자인데 상대가 자해하겠다고 협박합니다', a: '이것은 전형적인 정서적 협박입니다. 상대의 자해 협박은 당신의 책임이 아닙니다. 이별을 통보한 후 상대가 자해를 암시하면 119에 신고하세요. 그리고 접근금지와 형사 고소를 진행하세요.' },
  { q: '폭행 합의금은 보통 얼마인가요?', a: '피해 정도, 치료 기간, 후유증 유무, 가해자 전과 여부에 따라 크게 달라집니다. 단순 폭행은 수백만 원부터, 중상해의 경우 수천만 원 이상의 합의금이 형성됩니다.' },
  { q: '가정폭력인데 이혼하지 않고도 보호받을 수 있나요?', a: '네, 가정폭력처벌법에 따라 이혼 여부와 관계없이 접근금지, 퇴거, 피해자 보호명령을 받을 수 있습니다.' },
  { q: '학교폭력 가해자를 형사 고소할 수 있나요?', a: '14세 이상이면 형사 처벌이 가능합니다. 학교폭력예방법에 따른 학교 심의와 별도로, 형사 고소와 보호자 상대 민사 손해배상을 병행할 수 있습니다.' },
  { q: '협박 증거를 어떻게 확보하나요?', a: '대화 당사자의 녹음은 합법입니다. 전화 통화를 녹음하거나, 대면 대화를 녹음할 수 있습니다. 카카오톡, 문자, SNS DM은 전후 맥락이 포함되도록 넓은 범위로 캡처하세요.' },
  { q: '전국에서 상담받을 수 있나요?', a: '네, 전화·화상·온라인 상담이 가능합니다. 수사기관 동행, 법원 출석까지 전국 어디든 직접 갑니다.' },
]

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
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-60 pb-5' : 'max-h-0'}`}>
        <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
      </div>
    </div>
  )
}

export default function PhysicalCrimeFaq() {
  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">FAQ</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-12">자주 묻는 질문</h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div>{faqs.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}</div>
        </ScrollReveal>
        <p className="sr-only">법률사무소 로앤이 신체범죄 피해 전담센터는 스토킹, 데이트폭력, 폭행, 상해, 협박, 공갈, 가정폭력, 감금, 학교폭력 등 모든 신체범죄 피해를 대리하며, 접근금지 가처분·긴급응급조치 신청·형사 고소·민사 손해배상을 원스톱으로 수행한다. 이유림 변호사는 박영사 베스트셀러 《피해자 감별사회》의 공동저자다.</p>
      </div>
    </section>
  )
}
