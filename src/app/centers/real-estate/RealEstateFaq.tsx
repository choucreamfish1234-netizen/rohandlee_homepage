'use client'

import { useState } from 'react'
import ScrollReveal from '@/components/ScrollReveal'

const faqs = [
  { q: '전세 만기 후 보증금을 안 돌려주면 어떻게 하나요?', a: '먼저 내용증명을 발송하여 공식적으로 반환을 요구하세요. 그래도 돌려주지 않으면 임차권등기명령을 신청하고, 임대인 재산에 가압류를 건 뒤 보증금반환청구 소송을 제기합니다. 법률사무소 로앤이는 이 전 과정을 한 번에 대리합니다.' },
  { q: '전세사기로 형사 고소가 가능한가요?', a: '임대인이 처음부터 보증금을 돌려줄 의사나 능력이 없었음에도 계약을 체결했다면 사기죄(형법 제347조)에 해당할 수 있습니다. 근저당 설정 사실을 숨기거나 이중계약을 한 경우가 대표적입니다.' },
  { q: '건축업자가 공사대금 받고 도주하면 어떻게 하나요?', a: '사기죄 형사 고소가 가능합니다. 동시에 시공사의 사업자등록 정보로 다른 재산(공사 장비, 차량, 계좌)을 추적하여 가압류하고, 공사대금 반환 민사소송도 병행합니다.' },
  { q: '건축 하자가 발견되면 어떻게 대응하나요?', a: '먼저 하자 부분을 사진과 영상으로 기록하고, 시공사에 서면으로 하자 보수를 요청하세요. 시공사가 보수를 거부하면 하자 감정을 신청하고, 감정 결과를 근거로 손해배상을 청구합니다.' },
  { q: '인테리어 업자가 돈만 받고 사라졌어요.', a: '건축사기와 동일하게 사기죄 형사 고소가 가능합니다. 계약서, 입금 내역, 카카오톡 대화 등 증거를 확보하고, 업자의 사업자 정보로 재산을 추적하여 가압류합니다.' },
  { q: '임차권등기명령이 뭔가요?', a: '이사를 나가야 하는데 보증금을 못 받은 경우, 법원에 신청하면 등기부에 임차권이 기재됩니다. 이후 이사를 가더라도 대항력과 우선변제권이 유지되어 보증금을 보호받을 수 있습니다.' },
  { q: '깡통전세인데 보증금을 돌려받을 수 있나요?', a: '주택 가격보다 근저당과 보증금 합계가 큰 깡통전세의 경우에도 보증금반환청구, 사기죄 고소, 경매 배당 참여, 전세보증금 반환보증보험 청구 등 다양한 방법으로 회수가 가능합니다.' },
  { q: '상가 권리금을 못 받고 쫓겨났는데 방법이 있나요?', a: '상가건물 임대차보호법 제10조의4에 따라 임대인이 정당한 사유 없이 권리금 회수를 방해하면 손해배상 책임이 있습니다. 시효는 권리금 회수 기회 방해일로부터 3년입니다.' },
  { q: '중개사가 근저당 사실을 안 알려줬어요.', a: '공인중개사는 중개대상물의 권리관계, 법적 제한사항 등을 성실하게 설명할 의무가 있습니다(공인중개사법 제25조). 이를 위반하여 피해가 발생한 경우 중개사 및 중개법인에 손해배상 청구가 가능합니다.' },
  { q: '보증금반환청구 소송에 얼마나 걸리나요?', a: '통상 6개월에서 1년 정도 소요됩니다. 하지만 소송 전에 가압류를 걸어두면 상대방이 합의에 응할 가능성이 높아지고, 조정으로 빠르게 해결되는 경우도 많습니다.' },
  { q: '전국에서 상담받을 수 있나요?', a: '네, 전화·화상·온라인 상담이 가능합니다. 부동산 소재지 관할 법원에 소송을 제기해야 하지만, 로앤이는 전국 어디든 출장 대응합니다.' },
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

export default function RealEstateFaq() {
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

        <p className="sr-only">
          법률사무소 로앤이 부동산 피해 전담센터는 전세사기, 보증금 미반환, 건축사기, 공사대금 먹튀, 건축 하자, 토지매매 사기, 상가 권리금 분쟁, 중개사고 등 모든 부동산 관련 피해를 대리하며, 임차권등기명령·가압류·형사 고소·손해배상·강제집행을 원스톱으로 수행한다.
        </p>
      </div>
    </section>
  )
}
