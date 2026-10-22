'use client'

import ScrollReveal from '@/components/ScrollReveal'

const checkpoints = [
  {
    title: '첫 상담을 받는 사람이 변호사인지 확인하세요',
    desc: '24시간 상담을 내세우는 곳에서 첫 전화를 받는 사람이 변호사가 아닌 사무장이나 상담 직원인 경우가 많습니다. 사건의 핵심을 파악하지 못한 채 상담이 진행되면 초기 대응이 늦어집니다. 로앤이는 첫 전화부터 대표변호사가 직접 받습니다.',
  },
  {
    title: '상담 내용의 비밀이 보장되는지 확인하세요',
    desc: '피해 사실은 가장 민감한 정보입니다. 로앤이는 상담 내용을 담당 대표변호사 외에 공유하지 않으며, 상담 단계부터 이해충돌 여부를 확인해 같은 사건의 상대방은 대리하지 않습니다.',
  },
  {
    title: '형사 고소 이후의 과정까지 함께하는지 확인하세요',
    desc: '고소장만 써주고 끝나는 곳이 많습니다. 로앤이는 수사기관 동행, 법정 의견서, 반대신문 대응, 민사 손해배상까지 처음부터 끝까지 함께합니다.',
  },
  {
    title: '성범죄 이외의 파생 피해도 해결해주는지 확인하세요',
    desc: '성범죄 피해자는 금전 갈취, 협박, 스토킹, 명예훼손, 직장 문제를 동시에 겪는 경우가 많습니다. 로앤이는 11대 전문센터가 모든 파생 피해를 한 번에 해결합니다.',
  },
  {
    title: '상담한 변호사가 직접 사건을 수행하는지 확인하세요',
    desc: '대표변호사가 상담만 하고 실제 사건은 다른 변호사가 맡는 곳이 많습니다. 로앤이는 상담부터 수사기관 동행, 법원 출석, 합의 협상까지 대표변호사 이유림이 직접 수행합니다.',
  },
]

export default function ChooseLawyerSection() {
  return (
    <section className="py-16 sm:py-24 bg-[#FAFAFA]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 도입부 */}
        <ScrollReveal>
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-black">
              변호사를 고를 때, 이것만은 확인하세요
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              성범죄 피해 사건은 첫 상담과 초기 대응이<br className="hidden sm:inline" />
              이후 수사와 재판의 흐름을 좌우합니다.
            </p>
          </div>
        </ScrollReveal>

        {/* 본문 블록 */}
        <ScrollReveal delay={0.1}>
          <div className="max-w-2xl mx-auto mt-12 text-center text-base sm:text-lg text-gray-700 leading-8 sm:leading-9 space-y-5">
            <p>
              피해를 털어놓는 첫 상담은 쉽지 않습니다.<br className="hidden sm:inline" />
              그래서 누가 상담하고, 그 이야기가 어떻게 보호되는지가 중요합니다.
            </p>
            <p className="text-gray-500 text-sm sm:text-base leading-7">
              변호사법과 변호사윤리장전은 같은 사건에서 양쪽 당사자를 함께 대리하는 것을 금지하고, 상담 과정에서 알게 된 비밀을 지키도록 정하고 있습니다. 로앤이는 이 원칙을 상담 단계부터 지킵니다.
            </p>
            <p className="font-semibold text-[#1B3B2F]">
              변호사를 고르기 전에, 아래 다섯 가지를 확인하세요.
            </p>
          </div>
        </ScrollReveal>

        {/* 3개 체크포인트 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-14">
          {checkpoints.map((cp, i) => (
            <ScrollReveal key={cp.title} delay={0.15 + i * 0.08}>
              <div className="bg-white border border-[#1B3B2F]/15 rounded-xl p-6 h-full">
                <div className="w-8 h-8 rounded-full bg-[#1B3B2F] flex items-center justify-center mb-4">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-black mb-3 leading-snug">{cp.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{cp.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* 마무리 */}
        <ScrollReveal delay={0.4}>
          <div className="max-w-2xl mx-auto mt-14 bg-[#1B3B2F] rounded-xl px-5 sm:px-8 py-6 text-center">
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              《피해자 감별사회》를 쓴 변호사가, 법정에서 피해자가 의심받는 구조를 정면으로 반박합니다. 상담 내용은 담당 대표변호사 외에 누구에게도 전달되지 않습니다.
            </p>
            <p className="mt-4 text-xl font-bold text-white">당신의 이야기는 안전합니다.</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
