'use client'

import ScrollReveal from '@/components/ScrollReveal'

const scenarios = [
  {
    title: '데이트폭력 + 금전 갈취',
    desc: '폭행·상해 형사 고소 + 공갈 형사 고소 + 접근금지 가처분 + 손해배상 민사소송. 4가지를 각각 다른 로펌에 맡기시겠습니까? 로앤이는 한 팀이 전부 처리합니다.',
    centers: ['신체범죄센터', '재산범죄센터', '재산회복센터'],
  },
  {
    title: '전세사기 + 협박',
    desc: '보증금 가압류 + 사기죄 형사 고소 + 협박죄 형사 고소 + 임차권등기명령. 민사와 형사가 동시에 돌아가야 임대인이 움직입니다.',
    centers: ['부동산센터', '재산회복센터', '신체범죄센터'],
  },
  {
    title: '직장 내 성추행 + 부당해고',
    desc: '성추행 형사 고소 + 부당해고 구제 신청 + 손해배상 민사소송. 피해자가 직장을 잃고 범죄까지 당한 상황, 한 로펌에서 모든 법적 대응을 합니다.',
    centers: ['성범죄센터', '손해배상센터'],
  },
]

export default function OneStopSection() {
  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">One-Stop</p>
          <h2 className="text-xl sm:text-3xl font-bold text-center text-black mb-4">
            하나의 피해, 여러 개의 법적 문제.<br className="sm:hidden" /> 로앤이는 한 번에 해결합니다.
          </h2>
          <p className="text-center text-sm text-gray-500 mb-12 sm:mb-16 max-w-2xl mx-auto">
            현실의 피해는 하나의 법률 분야에 한정되지 않습니다. 로앤이의 9대 전문센터가 협력하여 민사·형사를 동시에 진행합니다.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {scenarios.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 0.12}>
              <div className="border border-gray-200 rounded-2xl p-6 sm:p-8 h-full hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-bold text-black mb-4">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">{s.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.centers.map(c => (
                    <span key={c} className="text-[10px] font-medium px-2.5 py-1 bg-[#1B3B2F]/8 text-[#1B3B2F] rounded-full">{c}</span>
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
