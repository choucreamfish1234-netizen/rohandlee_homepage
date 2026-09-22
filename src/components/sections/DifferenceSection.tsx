'use client'

import ScrollReveal from '@/components/ScrollReveal'
import { Users, Smartphone, Award, Layers, Zap, UserCheck } from 'lucide-react'

const differences = [
  {
    title: '국내최초 종합 피해자 중심 로펌',
    description: '성범죄부터 강제집행까지, 모든 피해를 한 곳에서 대리하는 종합 피해자 전문 로펌입니다.',
    icon: Users,
  },
  {
    title: '민형사 동시 타격',
    description: '민사 가압류로 재산을 잠그고, 형사 고소로 숨통을 조이는 입체 전략. 한쪽만으로는 부족합니다.',
    icon: Zap,
  },
  {
    title: '리걸테크 결합',
    description: '변호사가 직접 개발한 IT 시스템. AI 탄원서 작성, 전용 앱 실시간 공유.',
    icon: Layers,
  },
  {
    title: '9대 전문센터',
    description: '각 분야 전문 변호사가 전담합니다. 사건 유형에 맞는 최적의 센터에서 전문성을.',
    icon: Award,
  },
  {
    title: '전용 앱 실시간 공유',
    description: '사건 진행 상황을 전용 앱으로 실시간 확인. 변호사에게 직접 연락하지 않아도 됩니다.',
    icon: Smartphone,
  },
  {
    title: '대표변호사 직접 수행',
    description: '상담부터 고소장 작성, 수사기관 동행, 법원 출석, 합의 협상까지 대표변호사가 직접 수행합니다.',
    icon: UserCheck,
  },
]

export default function DifferenceSection() {
  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">
            Why ROH&LEE
          </p>
          <h2 className="text-xl sm:text-3xl font-bold text-center text-black mb-10 sm:mb-20">
            로앤이가 다른 이유
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {differences.map((diff, i) => {
            const Icon = diff.icon
            return (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="p-6 sm:p-8 border border-gray-100 rounded-2xl hover:border-[#1B3B2F]/20 transition-all duration-300 hover:shadow-md hover:-translate-y-1 group h-full">
                  <div className="w-10 h-10 rounded-lg bg-[#1B3B2F]/5 flex items-center justify-center mb-4 group-hover:bg-[#1B3B2F]/10 transition-colors">
                    <Icon size={20} className="text-[#1B3B2F]" />
                  </div>
                  <span className="text-4xl font-light text-gray-200">0{i + 1}</span>
                  <h3 className="mt-2 text-lg font-semibold text-black">{diff.title}</h3>
                  <p className="mt-3 text-sm text-gray-400 leading-relaxed">{diff.description}</p>
                </div>
              </ScrollReveal>
            )
          })}
        </div>

        <ScrollReveal delay={0.5}>
          <div className="max-w-2xl mx-auto mt-16 sm:mt-24 text-center text-sm sm:text-base text-gray-500 leading-8 sm:leading-9 space-y-4">
            <p>
              어떤 로펌이든 상담할 때,<br />
              이 두 가지만 물어보세요.
            </p>
            <p className="text-gray-700 font-semibold">
              하나.<br />
              &ldquo;지금 상담해주시는 분이 변호사님 맞나요?&rdquo;
            </p>
            <p className="text-gray-400 text-xs sm:text-sm">
              24시간 상담을 내세우는 곳일수록<br />
              첫 상담을 받는 사람이 변호사가 아닌<br />
              사무장이나 상담 직원인 경우가 많습니다.
            </p>
            <p className="text-gray-700 font-semibold">
              둘.<br />
              &ldquo;상담해주시는 대표변호사님이<br />
              직접 수사기관 동행도 해주시는 건가요?&rdquo;
            </p>
            <p className="text-gray-400 text-xs sm:text-sm">
              이 질문에 명확하게 답하지 못하는 곳이라면,<br />
              당신의 사건은 상담한 변호사가 아닌<br />
              다른 변호사가 맡게 될 가능성이 높습니다.
            </p>
            <div className="pt-4">
              <div className="bg-[#1B3B2F] rounded-xl p-5 text-white text-sm leading-relaxed">
                <p>
                  로앤이는 두 질문 모두 필요 없습니다.<br />
                  첫 전화부터 대표변호사가 직접 받고,<br />
                  상담부터 사건 종결까지 직접 수행합니다.<br />
                  <span className="font-bold">24시 사무장이 아니라, 변호사가 답합니다.</span>
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
