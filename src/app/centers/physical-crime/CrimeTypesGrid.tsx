'use client'

import ScrollReveal from '@/components/ScrollReveal'

const crimeTypes = [
  {
    category: '스토킹',
    items: [
      { title: '오프라인 스토킹', desc: '따라다니기, 집·직장 앞 대기, 미행, 우편물 투입. 스토킹처벌법 위반으로 형사 고소 + 접근금지 가처분 신청.' },
      { title: '사이버 스토킹', desc: '반복적 SNS DM, 카톡 폭탄, 새 계정 생성 접근, 위치 추적 앱 설치. 정보통신망법 + 스토킹처벌법 동시 적용.' },
      { title: '지인 스토킹', desc: '전 연인, 전 배우자, 직장 동료에 의한 스토킹. 관계 종료 후 시작되는 경우가 대부분. 접근금지 + 피해자 보호명령.' },
      { title: '불특정 스토킹', desc: '일면식 없는 상대의 집착적 접근. 신상 파악, 귀가길 미행. 초기 대응이 늦으면 빠르게 악화됩니다.' },
    ],
  },
  {
    category: '데이트폭력',
    items: [
      { title: '신체적 데이트폭력', desc: '때리기, 밀기, 물건 던지기, 흉기 위협. 폭행·상해·특수협박으로 형사 고소. 진단서 확보가 핵심.' },
      { title: '정서적 데이트폭력', desc: '감시, 통제, 고립, 모욕, 자해 협박. 형법상 협박·강요죄 적용. 녹음과 메시지 캡처가 핵심 증거.' },
      { title: '경제적 데이트폭력', desc: '금전 갈취, 카드 무단 사용, 빚 강요, 퇴직 강요. 공갈·사기·횡령으로 고소 + 민사 손해배상 병행.' },
    ],
  },
  {
    category: '폭행·상해',
    items: [
      { title: '단순 폭행·상해', desc: '주먹, 발길질, 밀침 등 신체적 공격. 폭행죄(형법 §260), 상해죄(형법 §257) 고소 + 치료비·위자료 손해배상.' },
      { title: '특수폭행·특수상해', desc: '흉기, 위험한 물건을 사용하거나 2인 이상이 공동으로 가한 폭행. 가중 처벌 대상.' },
    ],
  },
  {
    category: '기타 신체범죄',
    items: [
      { title: '협박·공갈', desc: '해악 고지, 금품 요구. 협박죄(§283), 공갈죄(§350). 녹음과 메시지 증거 확보 후 고소.' },
      { title: '가정폭력', desc: '배우자, 동거인에 의한 폭력. 피해자 보호명령, 접근금지, 퇴거 조치. 이혼 여부와 무관하게 보호 가능.' },
      { title: '감금·강요', desc: '신체의 자유를 불법 구속하거나 의무 없는 일을 강제. 감금죄(§276), 강요죄(§324).' },
    ],
  },
]

export default function CrimeTypesGrid() {
  return (
    <section className="py-16 sm:py-24 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">Coverage</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-3">이런 피해를 다룹니다</h2>
          <p className="text-center text-sm text-gray-500 mb-12">스토킹부터 감금까지, 신체와 안전을 위협하는 모든 범죄를 대리합니다.</p>
        </ScrollReveal>

        {crimeTypes.map((group, gi) => (
          <div key={group.category} className={gi > 0 ? 'mt-10' : ''}>
            <ScrollReveal delay={gi * 0.05}>
              <h3 className="text-sm font-bold text-[#1B3B2F] uppercase tracking-widest mb-4">{group.category}</h3>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.items.map((item, i) => (
                <ScrollReveal key={item.title} delay={gi * 0.05 + i * 0.08}>
                  <div className="bg-white border border-gray-100 rounded-xl p-5 h-full hover:border-[#1B3B2F]/20 transition-colors">
                    <h4 className="text-sm font-bold text-black mb-2">{item.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
