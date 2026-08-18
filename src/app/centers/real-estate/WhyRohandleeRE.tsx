'use client'

import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'

const points = [
  {
    title: '소송 걸면 끝? 재산을 먼저 잡아야 끝입니다',
    desc: '소송에서 이겨도 상대방이 재산을 빼돌렸으면 받을 수 없습니다. 로앤이는 소송 전에 가압류로 부동산·계좌를 동결시킵니다. 임차권등기명령으로 대항력을 확보하고, 가압류로 처분을 차단합니다.',
    centers: [{ name: '부동산센터', path: '/centers/real-estate' }, { name: '재산회복센터', path: '/centers/asset-recovery' }],
  },
  {
    title: '건축업자가 도주했다면, 시간이 없습니다',
    desc: '공사대금을 받고 도주한 시공사는 다른 현장에서 같은 짓을 반복합니다. 사업자등록, 계좌 내역, 하도급 관계를 추적하여 시공사의 재산을 가압류하고, 사기죄 형사 고소로 압박합니다.',
    centers: [{ name: '부동산센터', path: '/centers/real-estate' }, { name: '재산범죄센터', path: '/centers/property-crime' }, { name: '재산회복센터', path: '/centers/asset-recovery' }],
  },
  {
    title: '보증금만 문제가 아니라 협박도 받고 있다면?',
    desc: '보증금을 돌려달라고 하면 임대인이 역으로 위협하거나 출입문 잠금장치를 교체하는 경우도 있습니다. 민사 보증금반환과 형사 고소를 한 팀이 동시에 처리합니다.',
    centers: [{ name: '부동산센터', path: '/centers/real-estate' }, { name: '신체범죄센터', path: '/centers/physical-crime' }],
  },
  {
    title: '중개사가 속였다면, 중개사도 책임져야 합니다',
    desc: '임대인뿐 아니라 허위 정보를 제공한 중개사에게도 손해배상을 청구할 수 있습니다. 임대인에 대한 보증금반환 + 사기 고소와 동시에, 중개사에 대한 손해배상까지 한 번에 진행합니다.',
    centers: [],
  },
]

export default function WhyRohandleeRE() {
  return (
    <section className="py-16 sm:py-24" style={{ backgroundColor: '#f7faf9' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">Why ROH&LEE</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-3">전세사기·건축사기, 왜 로앤이인가요?</h2>
          <p className="text-center text-sm text-gray-500 mb-12 sm:mb-16">소장만 써주는 곳이 많습니다. 로앤이는 다릅니다.</p>
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
      </div>
    </section>
  )
}
