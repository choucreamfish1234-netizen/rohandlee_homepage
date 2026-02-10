'use client'

import { useState } from 'react'
import CenterPageTemplate from '@/components/CenterPageTemplate'
import ScrollReveal from '@/components/ScrollReveal'
import { useConsultation } from '@/components/ConsultationProvider'

/* ── 패키지 데이터 ── */
const packages = [
  {
    icon: '\u{1F680}',
    name: '스타트업',
    price: '월 30만 원~',
    featured: false,
    items: [
      '법인 설립 및 등기',
      '주주간 계약서 작성',
      '투자 계약서 검토',
      '월 1회 법률 자문',
    ],
  },
  {
    icon: '\u{1F4C8}',
    name: '성장기업',
    price: '월 50만 원~',
    featured: true,
    items: [
      '스타트업 패키지 전체 포함',
      '노무·인사 자문',
      '지식재산권 출원·관리',
      '컴플라이언스 구축',
      '월 2회 법률 자문',
    ],
  },
  {
    icon: '\u{1F3E2}',
    name: '엔터프라이즈',
    price: '별도 협의',
    featured: false,
    items: [
      '성장기업 패키지 전체 포함',
      'M&A 자문',
      '소송·분쟁 대응',
      '해외 법률 이슈 대응',
      '전담 변호사 배정',
    ],
  },
]

/* ── 프로세스 데이터 ── */
const steps = [
  { num: '01', title: '무료 진단 상담', desc: '기업 현황과 법적 리스크를 무료로 진단합니다.' },
  { num: '02', title: '맞춤 패키지 설계', desc: '기업 규모와 업종에 맞는 최적의 법무 패키지를 설계합니다.' },
  { num: '03', title: '법무 시스템 구축', desc: '계약서 템플릿, 내부 규정, 컴플라이언스 체계를 구축합니다.' },
  { num: '04', title: '상시 법률 자문', desc: '일상적인 법률 이슈에 대해 실시간 자문을 제공합니다.' },
]

/* ── FAQ 데이터 ── */
const faqs = [
  {
    q: '소규모 기업도 법무 서비스가 필요한가요?',
    a: '네, 오히려 소규모일수록 초기 법적 리스크 관리가 중요합니다. 계약서 하나의 문제가 기업 존폐를 좌우할 수 있습니다. 스타트업 패키지로 부담 없이 시작하실 수 있습니다.',
  },
  {
    q: '기존 고문 변호사가 있는데 추가로 필요한가요?',
    a: '로앤이는 기존 고문 변호사와 병행 가능합니다. 특히 IT·지식재산권, 노무 등 전문 분야에서 보완적 역할을 할 수 있습니다.',
  },
  {
    q: '계약 기간과 해지 조건은 어떻게 되나요?',
    a: '최소 계약 기간은 3개월이며, 이후 월 단위로 연장됩니다. 해지는 1개월 전 통보로 자유롭게 가능합니다.',
  },
  {
    q: '비대면으로도 법무 서비스를 받을 수 있나요?',
    a: '네, 화상회의와 메신저를 통한 비대면 자문이 가능합니다. 계약서 검토, 법률 의견서 등 대부분의 업무를 비대면으로 처리합니다.',
  },
]

/* ── FAQ 아이템 ── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left"
      >
        <span className="text-base font-medium text-black pr-4">{q}</span>
        <span className={`flex-shrink-0 text-gray-400 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-40 pb-6' : 'max-h-0'}`}
      >
        <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
      </div>
    </div>
  )
}

/* ── 커스텀 섹션 ── */
function CorporateCustomSection() {
  const { openConsultation } = useConsultation()
  return (
    <>
      {/* 패키지 섹션 */}
      <section className="py-28 sm:py-40" style={{ backgroundColor: '#f7faf9' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">
              Business Package
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-4">
              기업 규모별 맞춤 법무 패키지
            </h2>
            <p className="text-center text-gray-500 text-sm mb-20">
              성장 단계에 맞는 법률 서비스를 제공합니다.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <ScrollReveal key={pkg.name} delay={i * 0.12}>
                <div
                  className={`relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    pkg.featured
                      ? 'border-2 border-emerald-700 bg-[#f7faf9] scale-[1.02]'
                      : 'border border-gray-200 bg-white'
                  }`}
                >
                  {pkg.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-emerald-700 text-white text-xs font-medium rounded-full">
                      BEST
                    </span>
                  )}
                  <div className="text-3xl mb-4">{pkg.icon}</div>
                  <h3 className="text-xl font-bold text-black">{pkg.name}</h3>
                  <p className="mt-2 text-lg font-semibold text-emerald-700">{pkg.price}</p>
                  <ul className="mt-6 space-y-3">
                    {pkg.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-emerald-600 mt-0.5 flex-shrink-0">&#10003;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <button
                      onClick={() => openConsultation('기업법무 상담')}
                      className={`block w-full text-center px-6 py-3 text-sm font-medium rounded-full transition-colors ${
                        pkg.featured
                          ? 'bg-emerald-800 text-white hover:bg-emerald-700'
                          : 'border border-gray-300 text-black hover:border-gray-500'
                      }`}
                    >
                      상담 신청하기
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 도입 프로세스 */}
      <section className="py-28 sm:py-40 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">
              Process
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-20">
              기업 법무 도입 프로세스
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 0.1}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-sm font-bold text-emerald-700 mb-5">
                    {step.num}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-6 left-[calc(50%+24px)] w-[calc(100%-48px)] h-px bg-gray-200" />
                  )}
                  <h3 className="text-base font-semibold text-black">{step.title}</h3>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 sm:py-40 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">
              FAQ
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-16">
              자주 묻는 질문
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div>
              {faqs.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}

/* ── 페이지 ── */
export default function CorporateCenterPage() {
  return (
    <CenterPageTemplate
      centerName="기업경영 법무센터"
      subtitle="기업경영 법무센터"
      ctaLabel="기업 법무 상담 예약"
      ctaHref="/consultation"
      defaultCaseType="기업법무 상담"
      services={[
        {
          title: '계약서 검토 및 작성',
          description: '사업 계약의 법적 리스크를 사전에 점검하고 차단합니다.',
          image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '기업 분쟁 해결',
          description: '소송, 중재, 조정 등 최적의 방법으로 분쟁을 해결합니다.',
          image: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '노무·인사 자문',
          description: '근로관계, 인사 이슈 등 노동 법률 전반에 대한 자문을 제공합니다.',
          image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '지식재산권 보호',
          description: '특허, 상표, 저작권 등 기업의 지식재산을 법적으로 보호합니다.',
          image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '컴플라이언스 구축',
          description: '기업 내부 규정 및 법규 준수 시스템을 구축합니다.',
          image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop&q=80',
        },
        {
          title: 'M&A 자문',
          description: '기업 인수합병 전 과정에 걸쳐 법률 지원을 제공합니다.',
          image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&q=80',
        },
      ]}
      declaration={{
        title: '기업의 성장에\n법적 안전장치를 더합니다.',
        description:
          '사후 대응이 아닌 사전 예방.\n로앤이 기업경영 법무센터가 함께합니다.',
      }}
      customSection={<CorporateCustomSection />}
      lawyers={[
        {
          name: '이유림',
          role: '대표변호사',
          specialty: '기업법무 전문 변호사',
          quote: '기업의 안정적인 성장을 위해\n법적 파트너로서 함께하겠습니다.',
          image: '/lawyer-lee.svg',
        },
        {
          name: '노채은',
          role: '대표변호사',
          specialty: '기업법무 전문 변호사',
          quote: '무뎌진 언어 뒤에도 도저히 묻혀지지 않는\n마음이 있습니다.',
          image: '/lawyer-noh.svg',
        },
      ]}
      ctaTitle="기업의 내일을 지키세요."
      ctaDescription="기업경영 법무 전문 상담을 받아보세요."
    />
  )
}
