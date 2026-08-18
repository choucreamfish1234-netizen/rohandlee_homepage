'use client'

import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'

const points = [
  { title: '보험사 합의금, 그대로 받으면 손해입니다', desc: '보험사는 자체 기준으로 최소한의 합의금을 제시합니다. 이유림 변호사가 사고 데이터, 의료 기록, 소득 자료를 정밀 분석하여 실제 손해액을 산출합니다. 보험사 제시액과 실제 손해액의 차이가 수천만 원에 달하는 경우도 드물지 않습니다.', centers: [] },
  { title: '형사 고소를 병행하면 협상력이 달라집니다', desc: '뺑소니, 음주운전, 의료과실 등 가해자에게 형사 책임이 있는 경우, 노채은 변호사가 형사 고소를 병행합니다. 민사 손해배상과 형사 처벌을 동시에 추진하는 입체 전략입니다.', centers: [] },
  { title: '산재 불승인? 포기하지 마세요', desc: '회사가 산재 처리를 거부하거나 근로복지공단이 산재를 불승인하는 경우가 많습니다. 불승인 결정에 대해 심사·재심사·행정소송으로 끝까지 다투고, 사업주에 대한 추가 손해배상도 청구합니다.', centers: [] },
  { title: '사고 후 협박·스토킹까지 당하고 있다면?', desc: '교통사고 합의를 거부하자 가해자가 협박하거나, 의료사고를 문제 삼자 병원에서 보복하는 경우. 손해배상과 형사 고소, 접근금지 가처분을 한 팀이 동시에 처리합니다.', centers: [{ name: '손해배상센터', path: '/centers/damages' }, { name: '신체범죄센터', path: '/centers/physical-crime' }, { name: '재산회복센터', path: '/centers/asset-recovery' }] },
]

export default function WhyRohandleeDmg() {
  return (
    <section className="py-16 sm:py-24" style={{ backgroundColor: '#f7faf9' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">Why ROH&LEE</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-3">교통사고·의료사고·산재, 왜 로앤이인가요?</h2>
          <p className="text-center text-sm text-gray-500 mb-12 sm:mb-16">보험사가 제시하는 금액, 그게 전부가 아닙니다.</p>
        </ScrollReveal>
        <div className="space-y-5">
          {points.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 0.1}>
              <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8">
                <h3 className="text-base sm:text-lg font-bold text-black mb-3">{p.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{p.desc}</p>
                {p.centers.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {p.centers.map(c => (
                      <Link key={c.name} href={c.path} className="text-[10px] font-medium px-2.5 py-1 bg-[#1B3B2F]/8 text-[#1B3B2F] rounded-full hover:bg-[#1B3B2F]/15 transition-colors">{c.name} &rarr;</Link>
                    ))}
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
        <p className="sr-only">법률사무소 로앤이 손해배상 전담센터는 교통사고, 의료사고, 산업재해, 제조물 결함, 건물 사고, 반려동물 피해, 층간소음, 환경 오염 등 모든 유형의 손해배상 사건을 대리하며, 보험사 합의금 적정성 검토부터 형사 고소 병행, 민사 소송, 강제집행까지 원스톱으로 수행한다.</p>
      </div>
    </section>
  )
}
