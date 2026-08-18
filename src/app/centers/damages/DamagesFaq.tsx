'use client'

import { useState } from 'react'
import ScrollReveal from '@/components/ScrollReveal'

const faqs = [
  { q: '교통사고 합의금이 적은 것 같은데, 더 받을 수 있나요?', a: '보험사는 자체 기준으로 최소한의 합의금을 제시합니다. 실제 치료비, 휴업손해, 위자료, 후유장해 보상을 정확하게 산정하면 보험사 제시액의 2~3배 이상 받는 경우도 많습니다. 합의서에 도장 찍기 전 반드시 적정성을 검토하세요.' },
  { q: '교통사고 과실비율에 불만이 있으면 어떻게 하나요?', a: '보험사가 결정한 과실비율은 확정이 아닙니다. 블랙박스 영상, CCTV, 목격자 진술, 도로 상황 등을 분석하여 과실비율을 다툴 수 있습니다.' },
  { q: '의료사고인지 아닌지 어떻게 알 수 있나요?', a: '치료 결과가 예상과 크게 다르거나, 설명 없이 추가 시술을 받았거나, 수술 후 비정상적인 합병증이 발생한 경우 의료 과실이 있을 수 있습니다. 의료 기록을 분석하여 과실 여부를 판단합니다.' },
  { q: '의료사고 소송은 승산이 있나요?', a: '의료사고 소송은 입증이 어렵지만 불가능하지 않습니다. 의료 기록 분석, 전문가 자문, 의료 감정을 통해 과실과 인과관계를 체계적으로 입증합니다.' },
  { q: '산재 신청을 회사가 안 해줘요.', a: '산재 신청은 근로자 본인이 직접 할 수 있습니다. 회사 동의가 필요 없습니다. 근로복지공단에 직접 산재 신청서를 제출하면 됩니다.' },
  { q: '산재 불승인 결정을 받았는데 방법이 있나요?', a: '산재 불승인 결정에 대해 심사 청구(90일 이내) → 재심사 청구 → 행정소송으로 다툴 수 있습니다. 포기하지 마세요.' },
  { q: '사고가 발생한 지 오래되었는데 소송이 가능한가요?', a: '손해배상 청구의 소멸시효는 피해 사실을 안 날로부터 3년, 사고 발생일로부터 10년입니다. 시효가 임박한 경우에도 긴급 조치가 가능합니다.' },
  { q: '뺑소니 사고를 당했는데 가해자를 못 찾으면 어떻게 하나요?', a: '가해자를 찾지 못하더라도 정부 보장사업을 통해 치료비와 위자료를 보상받을 수 있습니다. 동시에 경찰 수사를 통해 가해자를 특정하는 작업도 병행합니다.' },
  { q: '제조물 결함으로 다쳤는데 어디에 책임을 물어야 하나요?', a: '제조물책임법에 따라 제조사, 판매사, 수입사 모두에게 손해배상을 청구할 수 있습니다. 소비자는 결함과 손해 사이의 인과관계만 증명하면 됩니다.' },
  { q: '개에게 물렸는데 합의금은 얼마나 받을 수 있나요?', a: '치료비, 위자료, 휴업손해, 후유장해 보상 등을 종합하여 산정합니다. 맹견에 의한 사고인 경우 동물보호법 위반으로 형사 고소도 병행할 수 있습니다.' },
  { q: '전국에서 상담받을 수 있나요?', a: '네, 전화·화상·온라인 상담이 가능합니다. 사고 발생지 관할 법원에 소송을 제기해야 하지만, 로앤이는 전국 어디든 출장 대응합니다.' },
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

export default function DamagesFaq() {
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
      </div>
    </section>
  )
}
