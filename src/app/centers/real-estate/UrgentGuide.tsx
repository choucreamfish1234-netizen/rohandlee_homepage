'use client'

import ScrollReveal from '@/components/ScrollReveal'

const steps = [
  { num: '01', title: '등기부등본을 떼보세요', desc: '인터넷등기소(iros.go.kr)에서 즉시 확인 가능. 근저당·압류·가처분이 설정되어 있는지, 소유자가 바뀌었는지 확인하세요.' },
  { num: '02', title: '계약서와 입금 내역을 정리하세요', desc: '건축 계약서, 공사대금 입금 내역, 시공 사진, 하자 사진, 카카오톡 대화 등 증거를 전부 모아두세요.' },
  { num: '03', title: '내용증명을 보내세요', desc: '보증금 반환 또는 공사 이행을 공식적으로 요구하는 법적 문서. 발송 자체가 향후 소송에서 증거가 됩니다.' },
  { num: '04', title: '임차권등기명령을 신청하세요', desc: '전세의 경우, 이사를 나가야 하지만 보증금을 못 받았다면 신청하면 이사 후에도 대항력이 유지됩니다.' },
  { num: '05', title: '가압류를 걸어두세요', desc: '상대방이 재산을 처분하기 전에 부동산, 예금, 차량, 공사 장비 등을 묶어야 합니다. 여기서부터는 변호사의 도움이 필수입니다.' },
]

export default function UrgentGuide() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">Urgent</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-12">부동산 피해를 입었다면, 지금 이것부터 하세요</h2>
        </ScrollReveal>
        <div className="bg-amber-50/50 border border-amber-200/50 rounded-xl p-6 sm:p-8 space-y-6">
          {steps.map((s, i) => (
            <ScrollReveal key={s.num} delay={i * 0.08}>
              <div className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center">{s.num}</span>
                <div>
                  <h3 className="text-sm font-bold text-black mb-1">{s.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
