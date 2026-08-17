'use client'

import ScrollReveal from '@/components/ScrollReveal'

const points = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    title: '전국 어디서든 상담',
    desc: '전화·화상·온라인으로 첫 상담 가능. 방문 없이 수임까지 진행됩니다.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: '전국 출장 대응',
    desc: '경찰서 동행, 법원 출석, 현장 조사까지 전국 어디든 직접 갑니다.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    title: '전용 앱 실시간 공유',
    desc: '사건 진행 상황을 앱으로 실시간 확인. 거리와 상관없이 밀착 소통합니다.',
  },
]

export default function NationwideSection() {
  return (
    <section className="py-16 sm:py-24" style={{ background: 'linear-gradient(135deg, #1B3B2F 0%, #2d5a47 100%)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-white/40 uppercase text-center mb-4">Nationwide</p>
          <h2 className="text-xl sm:text-3xl font-bold text-center text-white mb-3">
            부천에 본사, 전국에서 찾아오는 로펌
          </h2>
          <p className="text-center text-white/50 text-sm mb-10 sm:mb-16">
            거리는 사건에 아무 지장이 없습니다
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="text-center text-white/70 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-12 sm:mb-16">
            로앤이의 의뢰인은 부천뿐 아니라 서울, 인천, 수원, 대전, 대구, 부산 등 전국 각지에서 찾아옵니다.
            전화·화상 상담으로 전국 어디서든 첫 상담이 가능하고,
            수사기관 동행, 법원 출석, 증거 확보까지 전국 어디든 직접 갑니다.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {points.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 0.12}>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 text-center hover:bg-white/10 transition-colors">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-5 text-white">
                  {p.icon}
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{p.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{p.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
