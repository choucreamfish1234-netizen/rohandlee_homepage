'use client'

import ScrollReveal from '@/components/ScrollReveal'
import { Users, Smartphone, Award, Eye, Layers, Zap } from 'lucide-react'

const differences = [
  {
    title: '국내최초 종합 피해자 전문',
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
    title: '8대 전문센터',
    description: '각 분야 전문 변호사가 전담합니다. 사건 유형에 맞는 최적의 센터에서 전문성을.',
    icon: Award,
  },
  {
    title: '전용 앱 실시간 공유',
    description: '사건 진행 상황을 전용 앱으로 실시간 확인. 변호사에게 직접 연락하지 않아도 됩니다.',
    icon: Smartphone,
  },
  {
    title: '투명한 비용 체계',
    description: '숨겨진 비용 없이 처음부터 끝까지 투명하게 안내합니다.',
    icon: Eye,
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
      </div>
    </section>
  )
}
