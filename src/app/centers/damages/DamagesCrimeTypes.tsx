'use client'

import ScrollReveal from '@/components/ScrollReveal'

const types = [
  { emoji: '🚗', title: '자동차 교통사고', keywords: '교통사고 합의금, 보험사 합의 적정성, 과실비율 다툼', desc: '보험사는 자체 기준으로 최소한의 합의금을 제시합니다. 실제 치료비, 휴업손해, 위자료, 후유장해 보상을 정확하게 산정하면 보험사 제시액의 2~3배 이상 받는 경우도 많습니다.' },
  { emoji: '🏍️', title: '오토바이·자전거·킥보드 사고', keywords: '오토바이 사고 합의금, 자전거 사고 손해배상, 전동킥보드 사고', desc: '이륜차·자전거·전동킥보드 사고는 신체 피해가 크지만 보험 처리가 복잡합니다. 가능한 모든 보상 경로를 확인합니다.' },
  { emoji: '🚶', title: '보행자 교통사고', keywords: '보행자 교통사고 합의금, 횡단보도 사고, 어린이 교통사고', desc: '보행자 과실이 인정되더라도 운전자에게 더 큰 책임이 있습니다. 보행자 과실비율을 최소화하고 정당한 보상을 받아냅니다.' },
  { emoji: '🏥', title: '의료사고·의료과실', keywords: '의료사고 소송 방법, 의료과실 변호사, 수술 실패 소송', desc: '수술 과실, 오진, 투약 사고, 마취 사고, 분만 사고, 성형 부작용. 의료 기록을 분석하고 의료 감정을 신청하여 과실을 입증합니다.' },
  { emoji: '⚙️', title: '산업재해·산재', keywords: '산재 신청 방법, 산재 불승인 불복, 산업재해 변호사', desc: '산재 신청은 회사 동의 없이 근로자 본인이 직접 할 수 있습니다. 산재 신청 대리, 불승인 불복 심사·재심사, 사업주 상대 추가 손해배상까지.' },
  { emoji: '🔧', title: '제조물 결함·불량 제품', keywords: '제조물 책임 소송, 불량 제품 피해, 전자기기 폭발', desc: '전자기기 폭발, 자동차 결함, 식품 이물질, 의약품 부작용. 제조물책임법에 따라 제조사·판매사·수입사에 손해배상을 청구합니다.' },
  { emoji: '🏢', title: '건물·시설물 사고', keywords: '건물 사고 손해배상, 시설물 관리 과실, 엘리베이터 사고', desc: '엘리베이터, 에스컬레이터, 놀이기구 사고, 건물 내 낙상, 주차장 사고. 시설물 소유자·관리자의 안전관리 의무 위반을 입증합니다.' },
  { emoji: '🐕', title: '반려동물 피해', keywords: '개 물림 사고 합의금, 반려동물 피해 손해배상, 맹견 사고', desc: '개 물림 사고, 맹견 피해. 동물보호법에 따른 소유자 책임과 민법상 동물점유자 책임으로 치료비, 위자료, 후유장해 보상을 청구합니다.' },
  { emoji: '🔊', title: '층간소음·공사 피해', keywords: '층간소음 손해배상, 공사 소음 피해, 진동 피해 보상', desc: '아파트 층간소음, 공사장 소음·진동·분진. 소음·진동 측정 결과를 근거로 생활방해에 대한 손해배상과 방지청구를 합니다.' },
  { emoji: '🌍', title: '환경 오염 피해', keywords: '환경 오염 손해배상, 수질 오염 피해, 토양 오염 소송', desc: '공장 폐수, 악취, 토양 오염, 수질 오염으로 인한 건강 피해와 재산 피해. 환경 관련 법령 위반을 근거로 손해배상을 청구합니다.' },
]

export default function DamagesCrimeTypes() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">Case Types</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-3">어떤 피해를 겪으셨나요?</h2>
          <p className="text-center text-sm text-gray-500 mb-12 sm:mb-16">상황별로 정리했습니다. 해당하는 사고와 대응 방법을 확인하세요.</p>
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
