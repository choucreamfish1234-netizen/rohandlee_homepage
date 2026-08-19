'use client'

import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'

const points = [
  { title: '안전 확보 → 형사 고소 → 손해배상, 원스톱', desc: '대부분의 로펌은 형사 고소만 해주거나 접근금지만 신청해줍니다. 로앤이는 접근금지 가처분으로 안전을 먼저 확보하고, 형사 고소로 처벌을 받게 하고, 민사 손해배상으로 피해를 보상받는 전 과정을 한 팀이 수행합니다.', centers: [] },
  { title: '스토킹 + 성범죄가 동반된다면?', desc: '스토킹 가해자가 불법촬영, 촬영물 유포 협박, 성폭력까지 저지르는 경우. 로앤이는 신체범죄센터와 성범죄센터가 동시에 대응합니다.', centers: [{ name: '성범죄센터', path: '/centers/sexual-crime' }] },
  { title: '데이트폭력 + 금전 갈취까지 당하고 있다면?', desc: '맞으면서 돈도 뜯기고 있는 경우. 폭행 고소, 공갈 고소, 피해금 가압류, 손해배상을 동시에 진행합니다. 한 분야만 하는 로펌에서는 불가능한 대응입니다.', centers: [{ name: '재산범죄센터', path: '/centers/property-crime' }, { name: '재산회복센터', path: '/centers/asset-recovery' }] },
  { title: '《피해자 감별사회》를 쓴 변호사가 대리합니다', desc: '법정에서 "왜 헤어지지 않았나요?" "왜 다시 만났나요?"라는 질문을 받게 됩니다. 《피해자 감별사회》에서 이 질문의 구조적 문제를 분석한 이유림 변호사가 직접 반박합니다. 피해자가 가해자에게 돌아간 것은 트라우마 본딩이라는 정상적인 심리 반응입니다.', centers: [] },
]

export default function WhyRohandleePC() {
  return (
    <section className="py-16 sm:py-24" style={{ backgroundColor: '#f7faf9' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">Why ROH&LEE</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-3">스토킹·데이트폭력, 왜 로앤이인가요?</h2>
          <p className="text-center text-sm text-gray-500 mb-12">접근금지 신청만 해주는 곳이 많습니다. 로앤이는 다릅니다.</p>
        </ScrollReveal>
        <div className="space-y-5">
          {points.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 0.1}>
              <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8">
                <h3 className="text-base sm:text-lg font-bold text-black mb-3">{p.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{p.desc}</p>
                {p.centers.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    <span className="text-[10px] font-medium px-2.5 py-1 bg-[#1B3B2F]/8 text-[#1B3B2F] rounded-full">신체범죄센터</span>
                    {p.centers.map(c => (
                      <Link key={c.name} href={c.path} className="text-[10px] font-medium px-2.5 py-1 bg-[#1B3B2F]/8 text-[#1B3B2F] rounded-full hover:bg-[#1B3B2F]/15 transition-colors">{c.name} &rarr;</Link>
                    ))}
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
