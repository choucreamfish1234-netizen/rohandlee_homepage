'use client'

import ScrollReveal from '@/components/ScrollReveal'

const consensual = [
  { num: '01', title: '합의', desc: '재산분할, 양육권, 양육비, 위자료 합의. 로앤이가 합의서를 법적으로 검토합니다.' },
  { num: '02', title: '법원 신청', desc: '협의이혼의사 확인 신청서를 가정법원에 제출합니다.' },
  { num: '03', title: '숙려기간', desc: '자녀 있으면 3개월, 없으면 1개월. 이 기간에 합의 내용을 최종 점검합니다.' },
  { num: '04', title: '법원 출석', desc: '판사 앞에서 이혼 의사를 확인합니다. 로앤이가 동행합니다.' },
  { num: '05', title: '이혼 확정', desc: '가정법원 확인 후 이혼 신고. 합의 내용에 따라 재산 이전을 진행합니다.' },
]

const litigation = [
  { num: '01', title: '증거 수집', desc: '외도, 폭력, 유기 등 이혼 사유 증거를 확보합니다. 로앤이가 증거 수집 방법을 안내합니다.' },
  { num: '02', title: '소장 접수', desc: '가정법원에 이혼 소송을 제기합니다. 재산분할, 양육권, 위자료를 함께 청구합니다.' },
  { num: '03', title: '조정 절차', desc: '법원 조정위원회에서 조정을 시도합니다. 여기서 합의되면 소송보다 빠릅니다.' },
  { num: '04', title: '재판', desc: '조정 불성립 시 본안 재판을 진행합니다. 로앤이가 변론을 담당합니다.' },
  { num: '05', title: '판결', desc: '이혼, 재산분할, 양육권, 위자료가 확정됩니다.' },
  { num: '06', title: '집행', desc: '재산분할 미이행 시 강제집행. 재산회복센터가 담당합니다.' },
]

function Timeline({ steps, label }: { steps: { num: string; title: string; desc: string }[]; label: string }) {
  return (
    <div>
      <p className="text-xs font-bold text-[#1B3B2F] uppercase tracking-wider mb-6">{label}</p>
      <div className="space-y-4">
        {steps.map(s => (
          <div key={s.num} className="flex gap-4">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#1B3B2F]/10 text-[#1B3B2F] text-[10px] font-bold flex items-center justify-center">{s.num}</span>
            <div>
              <h4 className="text-sm font-semibold text-black">{s.title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function DivorceProcess() {
  return (
    <section className="py-16 sm:py-24" style={{ backgroundColor: '#f7faf9' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">Process</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-12">이혼, 어떻게 진행되나요?</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ScrollReveal delay={0.1}>
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100">
              <Timeline steps={consensual} label="협의이혼" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100">
              <Timeline steps={litigation} label="재판이혼 (소송)" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
