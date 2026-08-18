'use client'

import ScrollReveal from '@/components/ScrollReveal'

const types = [
  { emoji: '📱', title: '보이스피싱·전화금융사기', keywords: '보이스피싱 피해 구제, 현금수거책 처벌, 대포통장', desc: '검찰·경찰·금감원을 사칭한 전화 사기, 현금수거책 처벌, 계좌 동결 및 피해금 환급 신청. 형사 고소와 동시에 계좌 추적으로 피해금을 회수합니다.' },
  { emoji: '💰', title: '투자사기·코인사기', keywords: '투자사기 피해 변호사, 가상화폐 사기, 유사수신', desc: '고수익 보장 투자, 가상화폐 투자 사기, 유사수신행위. 사기죄 형사 고소와 함께 가해자 재산을 가압류하여 투자금을 회수합니다.' },
  { emoji: '🏢', title: '횡령·배임', keywords: '횡령죄 고소 방법, 배임죄 성립요건, 업무상 횡령', desc: '회사 자금 횡령, 업무상 배임, 위탁 재산 횡령. 형법 제355조·제356조에 따른 형사 고소와 손해배상 청구를 동시에 진행합니다.' },
  { emoji: '📦', title: '중고거래·온라인 사기', keywords: '중고거래 사기 고소, 당근마켓 사기, 인터넷 사기', desc: '당근마켓, 중고나라, 번개장터 등 중고거래 사기, 인터넷 쇼핑몰 사기. 소액이라도 형사 고소가 가능하며, 여러 피해자를 모아 공동 대응하면 효과적입니다.' },
  { emoji: '💳', title: '대여금·채무 사기', keywords: '돈 빌려주고 안 갚을 때, 차용증 없이 빌려준 돈', desc: '처음부터 갚을 의사 없이 돈을 빌린 경우 사기죄에 해당합니다. 차용증이 없어도 카톡, 계좌이체 내역 등으로 입증 가능합니다.' },
  { emoji: '🏗️', title: '공사·용역 사기', keywords: '공사대금 먹튀, 인테리어 사기, 용역 대금 미지급', desc: '공사대금·용역비를 받고 도주하거나, 하자 있는 시공 후 보수를 거부하는 경우. 사기죄 고소와 함께 가압류로 재산을 확보합니다.' },
  { emoji: '💍', title: '결혼·로맨스 사기', keywords: '결혼사기 고소, 로맨스스캠, 국제결혼사기', desc: '결혼을 빌미로 금전을 편취하는 결혼사기, SNS를 통한 로맨스스캠. 사기죄 형사 고소와 편취 금액 환수를 동시에 진행합니다.' },
  { emoji: '📄', title: '보험사기 피해', keywords: '보험사기 피해자, 보험금 미지급, 보험 분쟁', desc: '보험사의 부당한 보험금 미지급, 보험설계사의 기망에 의한 피해. 보험금 청구 소송과 함께 보험사기에 대한 형사 대응을 합니다.' },
]

export default function CrimeTypesGrid() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">Crime Types</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-3">어떤 피해를 겪으셨나요?</h2>
          <p className="text-center text-sm text-gray-500 mb-12 sm:mb-16">상황별로 정리했습니다. 해당하는 범죄와 대응 방법을 확인하세요.</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {types.map((t, i) => (
            <ScrollReveal key={t.title} delay={i * 0.06}>
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
