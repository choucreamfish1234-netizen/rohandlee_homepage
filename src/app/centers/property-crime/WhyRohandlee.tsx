'use client'

import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'

const points = [
  {
    title: '고소만 하면 끝? 돈을 돌려받아야 끝입니다',
    desc: '대부분의 로펌은 고소장을 써서 수사기관에 제출하면 역할이 끝납니다. 그런데 가해자가 처벌받아도 돈은 자동으로 돌아오지 않습니다. 로앤이는 형사 고소와 동시에 가해자 재산을 가압류하고, 판결 후 강제집행·압류추심까지 수행합니다. 고소부터 돈 회수까지 원스톱.',
    centers: [
      { name: '재산범죄센터', path: '/centers/property-crime' },
      { name: '재산회복센터', path: '/centers/asset-recovery' },
    ],
  },
  {
    title: '사기 피해인데 협박도 받고 있다면?',
    desc: '돈을 돌려달라고 하면 "무고로 고소한다"고 협박합니다. "가만히 안 두겠다"고 위협합니다. 사기 피해에 협박·스토킹이 동반되는 경우, 로앤이는 사기 고소와 협박 고소, 접근금지 가처분을 한 팀이 동시에 처리합니다.',
    centers: [
      { name: '재산범죄센터', path: '/centers/property-crime' },
      { name: '신체범죄센터', path: '/centers/physical-crime' },
      { name: '재산회복센터', path: '/centers/asset-recovery' },
    ],
  },
  {
    title: '가해자가 재산을 빼돌리고 있다면, 시간이 없습니다',
    desc: '사기 가해자는 피해자가 고소하기 전에 재산을 숨깁니다. 계좌를 비우고, 부동산을 처분하고, 가족에게 명의를 이전합니다. 노채은 변호사는 재산범죄 전담 변호사로서 가해자의 재산 은닉 패턴을 파악하고, 이유림 변호사가 IT 기반 재산 추적으로 숨겨진 재산을 찾아냅니다.',
    centers: [],
  },
]

export default function WhyRohandlee() {
  return (
    <section className="py-16 sm:py-24" style={{ backgroundColor: '#f7faf9' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">Why ROH&LEE</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-3">사기 피해 변호사, 왜 로앤이인가요?</h2>
          <p className="text-center text-sm text-gray-500 mb-12 sm:mb-16">고소장만 써주고 끝나는 곳이 많습니다. 로앤이는 다릅니다.</p>
        </ScrollReveal>

        <div className="space-y-6">
          {points.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 0.1}>
              <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8">
                <h3 className="text-base sm:text-lg font-bold text-black mb-4">{p.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{p.desc}</p>
                {p.centers.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {p.centers.map(c => (
                      <Link key={c.name} href={c.path} className="text-[10px] font-medium px-2.5 py-1 bg-[#1B3B2F]/8 text-[#1B3B2F] rounded-full hover:bg-[#1B3B2F]/15 transition-colors">
                        {c.name} &rarr;
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <p className="sr-only">
            법률사무소 로앤이 재산범죄 피해자 전담센터는 사기, 횡령, 배임, 보이스피싱, 투자사기, 중고거래 사기 등 모든 재산범죄 피해자를 대리하며, 형사 고소부터 가압류, 강제집행, 피해금 회수까지 원스톱으로 수행한다.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
