'use client'

import ScrollReveal from '@/components/ScrollReveal'

const evidenceCategories = [
  {
    title: '디지털 증거',
    items: [
      { what: '카카오톡·문자·DM 캡처', tip: '전후 맥락이 보이도록 넓은 범위로 캡처. 발신번호·시간 포함.' },
      { what: '전화 녹음', tip: '대화 당사자의 녹음은 합법. 녹음 시작 전 상대방 이름과 날짜를 말하면 증거력 강화.' },
      { what: '이메일·SNS 기록', tip: '삭제 가능성 대비, 캡처 후 PDF로 저장. URL도 함께 기록.' },
      { what: '위치 추적 앱 스크린샷', tip: '상대가 설치한 추적 앱 발견 시, 삭제 전에 스크린샷 + 앱 정보 캡처.' },
    ],
  },
  {
    title: '물리적 증거',
    items: [
      { what: 'CCTV 영상', tip: '아파트 관리실, 편의점, 도로 CCTV. 보존 기간(보통 30일)이 지나면 삭제되므로 즉시 보존 요청.' },
      { what: '상처 사진 + 진단서', tip: '폭행 직후 사진 촬영(날짜 표시). 48시간 이내 병원 방문하여 진단서 발급.' },
      { what: '우편물·선물 보존', tip: '스토커가 보낸 편지, 선물, 물건은 버리지 말고 날짜와 함께 보관.' },
    ],
  },
  {
    title: '기록 증거',
    items: [
      { what: '피해 일지 작성', tip: '날짜, 시간, 장소, 행위 내용, 목격자 유무를 매일 기록. 법정에서 반복성 입증의 핵심.' },
      { what: '112 신고 기록', tip: '경찰 신고 접수번호를 반드시 받아두세요. 신고 이력 자체가 증거.' },
      { what: '목격자 진술', tip: '친구, 가족, 동료의 목격 진술서. 날짜와 목격 내용을 구체적으로.' },
    ],
  },
]

export default function StalkingEvidence() {
  return (
    <section className="py-16 sm:py-24" style={{ backgroundColor: '#f7faf9' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">Evidence Guide</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-3">스토킹 증거 확보 체크리스트</h2>
          <p className="text-center text-sm text-gray-500 mb-12">수집한 증거가 많을수록 접근금지와 형사 처벌의 가능성이 높아집니다.</p>
        </ScrollReveal>

        <div className="space-y-6">
          {evidenceCategories.map((cat, ci) => (
            <ScrollReveal key={cat.title} delay={ci * 0.1}>
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="bg-[#1B3B2F] px-5 py-3">
                  <h3 className="text-sm font-bold text-white">{cat.title}</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {cat.items.map(item => (
                    <div key={item.what} className="px-5 py-4">
                      <p className="text-sm font-semibold text-black mb-1">{item.what}</p>
                      <p className="text-xs text-gray-500 leading-relaxed">{item.tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
