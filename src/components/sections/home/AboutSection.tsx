import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'

const principles = [
  { no: '01', title: '대표변호사 직접 상담', desc: '첫 상담부터 대표변호사가 사건을 듣고 방향을 정합니다.' },
  { no: '02', title: '수사기관 동행', desc: '조사 현장에 직접 동석해 진술을 조력합니다.' },
  { no: '03', title: '법정 출석과 합의', desc: '재판 출석, 의견서, 합의 협상까지 같은 변호사가 이어갑니다.' },
]

export default function AboutSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#1B3B2F] text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <ScrollReveal className="lg:col-span-6">
          <p className="eyebrow">About ROH&amp;LEE</p>
          <h2 className="mt-6 font-serif text-3xl sm:text-5xl font-semibold leading-[1.3]">
            사건을 맡기는 것이 아니라,
            <br />
            함께 해결합니다.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1} className="lg:col-span-6">
          <p className="text-base sm:text-lg text-white/80 leading-relaxed">
            법률사무소 로앤이는 대표변호사 이유림·노채은이 상담부터 수사기관 동행, 법정 출석, 합의 협상까지 모든
            과정을 직접 수행합니다.
          </p>
          <p className="mt-4 font-serif text-lg sm:text-xl text-[#d9bf8c]">사건이 다른 변호사에게 넘어가지 않습니다.</p>
          <ul className="mt-10 border-t border-white/15">
            {principles.map((p) => (
              <li key={p.no} className="flex gap-6 py-5 border-b border-white/15">
                <span className="font-serif text-sm text-[#d9bf8c] pt-0.5">{p.no}</span>
                <div>
                  <p className="font-semibold">{p.title}</p>
                  <p className="mt-1 text-sm text-white/60">{p.desc}</p>
                </div>
              </li>
            ))}
          </ul>
          <Link
            href="/lawyers"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold border-b border-white/60 pb-1 hover:text-[#d9bf8c] hover:border-[#d9bf8c] transition-colors"
          >
            변호사 소개 <span aria-hidden>&rarr;</span>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  )
}
