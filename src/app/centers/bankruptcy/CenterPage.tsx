'use client'

import Image from 'next/image'
import Link from 'next/link'
import CenterPageTemplate from '@/components/CenterPageTemplate'
import ScrollReveal from '@/components/ScrollReveal'

const features = [
  {
    icon: '\u{1F4C4}',
    title: '서류 자동 수집',
    description:
      '필요한 서류 목록을 자동으로 생성하고, 발급 가능한 서류는 원클릭으로 수집합니다.',
  },
  {
    icon: '\u{1F916}',
    title: 'AI 서류 분석',
    description:
      '제출된 서류의 누락 항목과 오류를 AI가 자동으로 검토하여 보정합니다.',
  },
  {
    icon: '\u{26A1}',
    title: '신청서 자동 작성',
    description:
      '수집된 정보를 바탕으로 법원 제출용 회생·파산 신청서를 자동으로 생성합니다.',
  },
]

function ReSetSection() {
  return (
    <section className="py-28 sm:py-40" style={{ backgroundColor: '#f7faf9' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">
            Legal Tech
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-center text-black mb-4">
            RE-Set: 회생·파산 서류 자동화 시스템
          </h2>
          <p className="text-center text-gray-500 text-sm mb-20">
            복잡한 서류 준비, AI가 대신합니다.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* 왼쪽: 앱 이미지 */}
          <ScrollReveal>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&q=80"
                alt="RE-Set 앱 화면"
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollReveal>

          {/* 오른쪽: 기능 소개 */}
          <div className="space-y-10">
            {features.map((feature, i) => (
              <ScrollReveal key={feature.title} delay={i * 0.12}>
                <div className="flex gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-2xl">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-black">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* 강조 문구 */}
        <ScrollReveal delay={0.3}>
          <div className="mt-20 text-center">
            <p className="text-base sm:text-lg font-medium text-black leading-relaxed">
              로앤이 의뢰인이라면, RE-Set으로<br className="sm:hidden" /> 서류 준비 기간을<br className="hidden sm:block" />
              평균 <span className="text-emerald-700 font-bold">2주</span>에서{' '}
              <span className="text-emerald-700 font-bold">3일</span>로 단축할 수 있습니다.
            </p>
          </div>
        </ScrollReveal>

        {/* CTA 버튼 */}
        <ScrollReveal delay={0.4}>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-emerald-800 text-white text-sm font-medium rounded-full hover:bg-emerald-700 transition-colors"
            >
              RE-Set 자세히 보기 →
            </Link>
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-emerald-800 text-emerald-800 text-sm font-medium rounded-full hover:bg-emerald-50 transition-colors"
            >
              무료 상담 신청
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default function BankruptcyCenterPage() {
  return (
    <CenterPageTemplate
      centerName="회생·파산 전문센터 리셋"
      subtitle="회생·파산 전문센터(리셋)"
      ctaLabel="무료 회생 가능성 진단"
      ctaHref="/consultation"
      services={[
        {
          title: '개인회생 신청',
          description: '법원 인가를 통해 채무를 조정하고, 새로운 출발을 돕습니다.',
          image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '개인파산·면책 신청',
          description: '면책 결정을 받아 모든 채무에서 벗어나는 완전한 리셋을 지원합니다.',
          image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '법인회생 지원',
          description: '기업의 경영 정상화를 위한 법적 절차를 전담합니다.',
          image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '자동화 서류 수집 (E-Set)',
          description: 'EDI 서류를 자동으로 수집하는 자체 시스템으로 빠르고 정확하게 처리합니다.',
          image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '채권자 협상',
          description: '채권자와의 원만한 합의를 이끌어 의뢰인의 부담을 줄입니다.',
          image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '면책 후 신용 회복 지원',
          description: '면책 결정 이후 신용 회복까지 사후 관리를 지원합니다.',
          image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop&q=80',
        },
      ]}
      declaration={{
        title: '빚은 끝이 아닙니다.\n새로운 시작의 문을 열어드립니다.',
        description:
          '회생과 파산은 포기가 아니라, 법이 보장하는 새로운 시작입니다.\n로앤이 리셋 센터가 함께합니다.',
      }}
      customSection={<ReSetSection />}
      lawyers={[
        {
          name: '이유림',
          role: '대표변호사',
          specialty: '회생·파산 전문 변호사',
          quote: '빚에 짓눌린 삶에서 벗어나\n다시 일어설 수 있도록 돕겠습니다.',
          image: '/lawyer-lee.jpg',
        },
        {
          name: '노채은',
          role: '대표변호사',
          specialty: '회생·파산 전문 변호사',
          quote: '무뎌진 언어 뒤에도 도저히 묻혀지지 않는\n마음이 있습니다.',
          image: '/lawyer-noh.jpg',
        },
      ]}
      ctaTitle="빚의 무게에서 벗어나세요."
      ctaDescription="무료 회생 가능성 진단을 받아보세요."
    />
  )
}
