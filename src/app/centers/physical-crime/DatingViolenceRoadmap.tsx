'use client'

import ScrollReveal from '@/components/ScrollReveal'

const steps = [
  { num: '01', title: '안전 확보가 최우선', desc: '당장의 위험에서 벗어나세요. 여성긴급전화 1366, 해바라기센터에 연락하면 긴급 피난처를 연결받을 수 있습니다. 가해자에게 이별을 통보하는 것은 안전이 확보된 후에.' },
  { num: '02', title: '증거 확보', desc: '폭행 직후 상처 사진, 진단서 발급, 폭언·협박 녹음, 카톡 캡처. 폭력이 반복되고 있다면 날짜별 일지를 작성하세요. 이 일지가 법정에서 핵심 증거가 됩니다.' },
  { num: '03', title: '접근금지 + 형사 고소 동시 진행', desc: '스토킹이 동반되면 접근금지 가처분, 폭행·상해가 있으면 형사 고소, 금전 갈취가 있으면 사기·공갈 고소. 로앤이는 이 모든 것을 한 팀이 동시에 처리합니다.' },
]

export default function DatingViolenceRoadmap() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">Action Plan</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-12">데이트폭력 대응 로드맵</h2>
        </ScrollReveal>
        <div className="space-y-6">
          {steps.map((s, i) => (
            <ScrollReveal key={s.num} delay={i * 0.1}>
              <div className="flex gap-4">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1B3B2F] text-white text-sm font-bold flex items-center justify-center">{s.num}</span>
                <div>
                  <h3 className="text-base font-bold text-black mb-2">{s.title}</h3>
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
