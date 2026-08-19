'use client'

import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'

const scenarios = [
  { situation: '배우자에게 맞으면서 이혼을 준비하고 있습니다', normal: '이혼 소송만 해드려요. 폭행 고소는 다른 변호사를 찾으세요.', rohandlee: '접근금지 가처분으로 안전을 먼저 확보하고, 가정폭력 형사 고소와 이혼 소송을 동시에 진행합니다. 폭행 피해가 위자료 산정에도 반영됩니다.', centers: [{ name: '신체범죄센터', path: '/centers/physical-crime' }] },
  { situation: '배우자가 이혼 얘기를 꺼내자 재산을 빼돌리기 시작했습니다', normal: '재산분할 소송을 하면 됩니다.', rohandlee: '소송하는 동안 재산이 사라집니다. 먼저 가압류로 부동산·계좌·차량을 동결시키고, 숨긴 재산은 재산조회로 추적합니다.', centers: [{ name: '재산회복센터', path: '/centers/asset-recovery' }] },
  { situation: '이혼 후 전 배우자가 스토킹을 합니다', normal: '스토킹은 형사 사건이라 이혼 변호사가 못 해요.', rohandlee: '스토킹처벌법에 따른 형사 고소, 접근금지 가처분, 양육권 변경까지 한 팀이 처리합니다.', centers: [{ name: '신체범죄센터', path: '/centers/physical-crime' }] },
  { situation: '배우자의 외도 상대에게도 위자료를 청구하고 싶습니다', normal: '상간자 위자료 소송만 해드려요.', rohandlee: '배우자에 대한 이혼 소송 + 상간자에 대한 위자료 소송 + 재산분할을 한 번에 진행합니다. 증거 수집부터 소송까지 원스톱.', centers: [] },
]

export default function DivorceComplex() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">One-Stop</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-3">이혼은 이혼만의 문제가 아닙니다</h2>
          <p className="text-center text-sm text-gray-500 mb-12">이혼 과정에서 발생하는 폭력, 재산 은닉, 스토킹까지. 로앤이는 한 팀이 전부 처리합니다.</p>
        </ScrollReveal>
        <div className="space-y-5">
          {scenarios.map((s, i) => (
            <ScrollReveal key={s.situation} delay={i * 0.08}>
              <div className="border border-gray-200 rounded-2xl p-6 sm:p-8">
                <p className="text-base font-bold text-black mb-4">&ldquo;{s.situation}&rdquo;</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">일반 로펌</p>
                    <p className="text-sm text-gray-500">{s.normal}</p>
                  </div>
                  <div className="bg-[#1B3B2F]/5 rounded-lg p-4">
                    <p className="text-[10px] text-[#1B3B2F] uppercase tracking-wider mb-2 font-semibold">로앤이</p>
                    <p className="text-sm text-gray-700">{s.rohandlee}</p>
                  </div>
                </div>
                {s.centers.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    <span className="text-[10px] font-medium px-2.5 py-1 bg-[#1B3B2F]/8 text-[#1B3B2F] rounded-full">이혼센터</span>
                    {s.centers.map(c => (
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
