import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'

const areas = [
  { icon: '⚖️', name: '형사 사건 대응', desc: '수사 초기부터 재판까지, 체계적인 형사 대응', href: '/defense' },
  { icon: '🛡️', name: '피해자 전문센터', desc: '11대 전문센터 — 범죄 피해 구제의 모든 것', href: '/centers' },
  { icon: '📋', name: '채권추심센터', desc: '받아야 할 돈, 확실하게 회수합니다', href: '/collection' },
  { icon: '🪙', name: '가상자산·코인', desc: '코인 상장 자문부터 거래소 분쟁까지', href: '/crypto' },
  { icon: '🏢', name: '기업 법률자문', desc: '스타트업부터 중소기업까지, 사업의 법적 리스크 관리', href: '/business' },
]

export default function PracticeAreasSection() {
  return (
    <section id="areas" className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">Practice Areas</p>
          <h2 className="text-xl sm:text-3xl font-bold text-center text-black mb-10 sm:mb-14">주요 업무 분야</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
          {areas.map((a, i) => (
            <ScrollReveal key={a.href} delay={i * 0.06}>
              <Link
                href={a.href}
                className="group flex flex-col h-full border border-gray-200 border-t-[3px] border-t-[#1B3B2F] bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#C9A24B] hover:shadow-lg"
              >
                <span className="text-3xl" aria-hidden>{a.icon}</span>
                <h3 className="mt-4 text-base sm:text-lg font-bold text-black">{a.name}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed flex-1">{a.desc}</p>
                <span className="inline-flex items-center mt-4 text-xs text-gray-400 group-hover:text-[#C9A24B] transition-colors">
                  더 보기 <span className="ml-1">&rarr;</span>
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
