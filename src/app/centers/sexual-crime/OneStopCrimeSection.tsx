'use client'

import ScrollReveal from '@/components/ScrollReveal'

const scenarios = [
  {
    title: '연인에게 성폭행과 금전 갈취를 동시에 당했습니다',
    desc: '이유림 변호사가 성범죄 형사 고소 + 접근금지 가처분을 진행하는 동시에, 노채은 변호사가 공갈 형사 고소 + 피해 금액 회수를 병행합니다.',
    centers: ['성범죄센터', '재산범죄센터', '재산회복센터'],
  },
  {
    title: '직장 상사에게 성추행을 당하고 부당해고까지 당했습니다',
    desc: '성추행 형사 고소 + 부당해고 구제 + 손해배상을 한 팀이 동시에 진행합니다. 피해자가 여러 곳을 돌아다닐 필요가 없습니다.',
    centers: ['성범죄센터', '손해배상센터'],
  },
  {
    title: '고소 후 가해자가 무고로 역고소했습니다',
    desc: '《피해자 감별사회》 제3부 3장이 분석한 바로 그 문제입니다. 역고소 무고 사건 중 84.1%가 \'죄가 안 됨\'으로 종결됩니다. 원사건 대리와 역고소 방어를 하나의 팀이 동시에 수행합니다.',
    centers: ['성범죄센터', '신체범죄센터'],
  },
]

export default function OneStopCrimeSection() {
  return (
    <section className="py-28 sm:py-40" style={{ backgroundColor: '#f7faf9' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">
            One-Stop
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-4">
            성범죄 피해는 성범죄로 끝나지 않습니다
          </h2>
          <p className="text-center text-sm text-gray-500 mb-16 max-w-2xl mx-auto">
            종합 피해자 중심 로펌이기 때문에 가능한 원스톱 해결. 성범죄와 연결된 모든 파생 피해를 하나의 팀이 동시에 대응합니다.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {scenarios.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 0.12}>
              <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 h-full">
                <h3 className="text-base font-bold text-black mb-4 leading-snug">{s.title}</h3>
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
