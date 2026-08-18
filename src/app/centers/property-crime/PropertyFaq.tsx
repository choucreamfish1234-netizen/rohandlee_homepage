'use client'

import { useState } from 'react'
import ScrollReveal from '@/components/ScrollReveal'

const faqs = [
  { q: '사기죄 고소장은 어떻게 쓰나요?', a: '사기죄 고소장에는 가해자의 기망 행위, 피해자의 착오, 재산상 피해를 구체적으로 기재해야 합니다. 계좌이체 내역, 대화 기록, 계약서 등 증거를 함께 제출하면 수사가 빨라집니다. 법률사무소 로앤이는 고소장 작성부터 수사기관 동행까지 전 과정을 함께합니다.' },
  { q: '보이스피싱 당했는데 돈을 돌려받을 수 있나요?', a: '보이스피싱 피해금은 계좌 동결과 피해금 환급 제도를 통해 일부 회수가 가능합니다. 피해 직후 즉시 경찰 신고와 은행 계좌 동결을 요청하는 것이 핵심입니다. 시간이 지났더라도 가해자 특정 후 민사 손해배상으로 추가 회수가 가능합니다.' },
  { q: '횡령죄와 배임죄의 차이가 뭔가요?', a: '횡령은 맡겨진 재물을 임의로 사용하는 것이고, 배임은 타인의 사무를 처리하면서 본인에게 손해를 끼치는 것입니다. 예를 들어 회사 자금을 개인 통장으로 옮기면 횡령, 회사에 불리한 계약을 체결하면 배임입니다. 둘 다 형법 제355조~356조에 따라 처벌됩니다.' },
  { q: '중고거래 사기인데 금액이 작아도 고소 가능한가요?', a: '금액과 관계없이 사기죄 고소가 가능합니다. 소액 사기는 같은 가해자에게 당한 다른 피해자를 찾아 공동 고소하면 수사 효율이 높아지고 처벌도 무거워집니다.' },
  { q: '차용증 없이 빌려준 돈도 받을 수 있나요?', a: '차용증이 없어도 카카오톡 대화, 계좌이체 내역, 목격자 증언 등으로 대여 사실을 입증할 수 있습니다. 처음부터 갚을 의사 없이 빌린 경우 사기죄에 해당하며, 형사 고소와 민사 대여금반환청구를 동시에 진행할 수 있습니다.' },
  { q: '투자사기 피해인데 계약서에 서명했으면 구제가 안 되나요?', a: '계약서에 서명했더라도 가해자가 허위 정보를 제공하거나 중요한 사실을 숨긴 경우 사기죄가 성립합니다. 계약 당시의 기망 행위를 입증하면 형사 고소와 계약 취소, 투자금 반환 청구가 가능합니다.' },
  { q: '사기 가해자가 재산을 숨기면 어떻게 하나요?', a: '법원을 통한 재산조회·재산명시 제도로 가해자의 부동산, 금융자산, 자동차 등을 파악할 수 있습니다. 로앤이는 고소와 동시에 가압류를 진행하여 재산이 빠져나가기 전에 먼저 확보합니다.' },
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

export default function PropertyFaq() {
  return (
    <section className="py-16 sm:py-24 bg-white">
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
