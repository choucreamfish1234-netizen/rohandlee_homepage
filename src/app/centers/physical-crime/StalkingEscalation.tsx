'use client'

import ScrollReveal from '@/components/ScrollReveal'

const stages = [
  {
    stage: '1단계',
    title: '접근 시도',
    color: 'bg-yellow-50 border-yellow-200',
    textColor: 'text-yellow-800',
    tagColor: 'bg-yellow-100 text-yellow-700',
    behaviors: ['반복적 연락 (카톡, 문자, 전화)', '우연을 가장한 마주침', 'SNS 팔로우·좋아요·DM'],
    response: '증거 수집 시작. 모든 연락을 캡처·녹음. 거부 의사를 명확히 전달 (1회, 문서로).',
  },
  {
    stage: '2단계',
    title: '감시·추적',
    color: 'bg-orange-50 border-orange-200',
    textColor: 'text-orange-800',
    tagColor: 'bg-orange-100 text-orange-700',
    behaviors: ['귀가길 미행, 집·직장 앞 대기', '제3자를 통한 동향 파악', '위치 추적 앱·에어태그 설치'],
    response: '경찰 신고 → 긴급응급조치 요청. 접근금지 가처분 신청 준비.',
  },
  {
    stage: '3단계',
    title: '위협·협박',
    color: 'bg-red-50 border-red-200',
    textColor: 'text-red-800',
    tagColor: 'bg-red-100 text-red-700',
    behaviors: ['자해·자살 암시로 이별 거부', '"네 사진(영상) 퍼뜨리겠다" 협박', '가족·직장에 찾아가겠다는 위협'],
    response: '즉시 112 신고 + 접근금지 가처분 + 형사 고소 (스토킹·협박). 안전한 장소 확보.',
  },
  {
    stage: '4단계',
    title: '물리적 폭력',
    color: 'bg-red-100 border-red-300',
    textColor: 'text-red-900',
    tagColor: 'bg-red-200 text-red-800',
    behaviors: ['직접 물리력 행사 (폭행, 상해)', '주거 침입, 차량 손괴', '납치, 감금, 흉기 사용'],
    response: '112 + 1366 긴급 대피. 상해 진단서 + 현장 사진 확보. 특수폭행·주거침입·감금 등 가중 처벌 고소.',
  },
]

export default function StalkingEscalation() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">Escalation Pattern</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-3">스토킹은 단계적으로 악화됩니다</h2>
          <p className="text-center text-sm text-gray-500 mb-12">지금 어느 단계인지 확인하세요. 빠른 대응이 피해를 줄입니다.</p>
        </ScrollReveal>

        <div className="space-y-4">
          {stages.map((s, i) => (
            <ScrollReveal key={s.stage} delay={i * 0.1}>
              <div className={`border rounded-xl p-5 sm:p-6 ${s.color}`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${s.tagColor}`}>{s.stage}</span>
                  <h3 className={`text-base sm:text-lg font-bold ${s.textColor}`}>{s.title}</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">행위 패턴</p>
                    <ul className="space-y-1.5">
                      {s.behaviors.map(b => (
                        <li key={b} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-gray-400 mt-0.5 flex-shrink-0">•</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">대응 방법</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{s.response}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.5}>
          <div className="mt-8 bg-gray-50 rounded-xl p-5 text-center">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-black">스토킹의 95%는 1~2단계에서 시작됩니다.</span>
              <br className="hidden sm:block" />
              {' '}&ldquo;아직 괜찮다&rdquo;고 생각하는 순간 3단계로 넘어갑니다. 지금이 가장 빠른 대응 시점입니다.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
