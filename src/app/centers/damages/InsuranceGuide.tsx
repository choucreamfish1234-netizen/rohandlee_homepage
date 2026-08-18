'use client'

import ScrollReveal from '@/components/ScrollReveal'

const steps = [
  { num: '01', title: '치료가 완전히 끝났는지 확인하세요', desc: '치료 중에 합의하면 나중에 추가 치료비를 받을 수 없습니다. 치료가 완료되고 후유장해 여부가 확정된 후에 합의하는 것이 유리합니다.' },
  { num: '02', title: '후유장해 등급을 확인하세요', desc: '사고 후 남은 장해가 있으면 후유장해 보상을 받을 수 있습니다. 보험사가 인정한 등급이 실제보다 낮은 경우가 많으므로 이의신청으로 정정할 수 있습니다.' },
  { num: '03', title: '합의금 산정 내역을 요구하세요', desc: '보험사에 합의금이 어떻게 산정되었는지 항목별 내역을 요청하세요. 치료비, 휴업손해, 위자료, 향후 치료비, 후유장해 보상이 각각 얼마인지 확인해야 합니다.' },
  { num: '04', title: '합의서에 도장 찍기 전 변호사에게 검토받으세요', desc: '합의서에 서명하면 추가 청구가 불가능합니다. 합의금이 적정한지, 빠진 항목은 없는지 변호사의 검토를 받은 후 서명하세요.' },
]

export default function InsuranceGuide() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">Check Before You Sign</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-12">보험사 합의서에 도장 찍기 전, 이것만은 확인하세요</h2>
        </ScrollReveal>
        <div className="bg-red-50/50 border border-red-200/50 rounded-xl p-6 sm:p-8 space-y-6">
          {steps.map((s, i) => (
            <ScrollReveal key={s.num} delay={i * 0.08}>
              <div className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 text-red-700 text-xs font-bold flex items-center justify-center">{s.num}</span>
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
