'use client'

import ScrollReveal from '@/components/ScrollReveal'

const types = [
  { emoji: '🏠', title: '전세보증금 미반환', keywords: '보증금 안 돌려줄 때, 집주인 보증금 미반환', desc: '계약 만료 후 보증금을 돌려주지 않는 임대인. 내용증명, 임차권등기명령, 보증금반환청구 소송, 가압류까지 단계별로 대응합니다.' },
  { emoji: '🚨', title: '전세사기', keywords: '전세사기 고소 방법, 깡통전세, 전세사기 피해 구제', desc: '근저당 사실을 숨기거나 이중계약을 한 경우. 사기죄(형법 제347조) 형사 고소와 동시에 가압류로 재산을 확보합니다.' },
  { emoji: '🏗️', title: '건축사기·공사대금 먹튀', keywords: '건축사기 변호사, 공사대금 먹튀, 시공사 도주', desc: '건축대금을 받고 공사 중간에 도주하거나 부실 시공 후 포기하는 경우. 사기죄 형사 고소와 공사대금 반환 민사소송, 시공사 재산 가압류를 동시에 진행합니다.' },
  { emoji: '🔨', title: '건축 하자·부실 시공', keywords: '건축 하자 소송, 부실 시공 손해배상, 인테리어 하자', desc: '균열, 누수, 구조적 결함, 설계와 다른 시공. 하자 보수 청구, 하자 감정 신청, 손해배상 청구를 진행합니다.' },
  { emoji: '📋', title: '임차권등기명령', keywords: '임차권등기명령 신청 방법, 대항력 유지', desc: '이사를 나가야 하는데 보증금을 못 받은 경우, 임차권등기명령을 신청하면 이사 후에도 대항력이 유지됩니다.' },
  { emoji: '🏔️', title: '토지매매 사기', keywords: '토지 사기 변호사, 허위 개발 정보 사기', desc: '개발 가능성에 대해 허위 정보를 제공하거나 중요한 사실을 숨긴 경우. 사기죄 형사 고소 및 매매대금 반환을 청구합니다.' },
  { emoji: '🏪', title: '상가 권리금 분쟁', keywords: '권리금 회수 방해, 상가임대차보호법', desc: '임대인이 정당한 사유 없이 권리금 회수를 방해하면 손해배상 책임이 있습니다(상가건물 임대차보호법 제10조의4). 시효 3년.' },
  { emoji: '🔑', title: '계약갱신 거부·부당 퇴거', keywords: '계약갱신청구권 거부, 부당퇴거 대처', desc: '계약갱신청구권을 부당하게 거부하거나 실거주 명목으로 퇴거시킨 뒤 거주하지 않는 경우. 손해배상 청구가 가능합니다.' },
  { emoji: '🔍', title: '중개사고·허위매물', keywords: '중개사 손해배상, 공인중개사 과실', desc: '중요 사항(근저당, 압류 등)을 고지하지 않은 경우, 공인중개사법 제25조 위반으로 손해배상 청구가 가능합니다.' },
  { emoji: '📝', title: '이중계약·다중계약', keywords: '이중계약 사기, 전세 이중계약', desc: '같은 주택에 여러 임차인과 동시에 계약하여 보증금을 편취하는 사기. 사기죄 형사 고소와 보증금 가압류를 즉시 진행합니다.' },
  { emoji: '💸', title: '원상복구 비용 과다 청구', keywords: '원상복구 비용 분쟁, 보증금에서 공제', desc: '퇴거 시 과도한 원상복구 비용을 보증금에서 공제하는 경우. 통상 마모에 해당하면 임차인 부담이 아닙니다.' },
]

export default function RealEstateCrimeTypes() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">Case Types</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-3">어떤 피해를 겪으셨나요?</h2>
          <p className="text-center text-sm text-gray-500 mb-12 sm:mb-16">상황별로 정리했습니다. 해당하는 문제와 대응 방법을 확인하세요.</p>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {types.map((t, i) => (
            <ScrollReveal key={t.title} delay={i * 0.05}>
              <div className="border border-gray-200 rounded-xl p-6 hover:border-[#1B3B2F]/30 hover:shadow-sm transition-all duration-300 h-full">
                <span className="text-2xl">{t.emoji}</span>
                <h3 className="text-base font-semibold text-black mt-3 mb-1">{t.title}</h3>
                <p className="text-[11px] text-[#1B3B2F]/60 mb-3">{t.keywords}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{t.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
