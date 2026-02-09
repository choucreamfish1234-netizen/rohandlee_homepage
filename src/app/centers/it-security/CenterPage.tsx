'use client'

import { useState } from 'react'
import Image from 'next/image'
import CenterPageTemplate from '@/components/CenterPageTemplate'
import ScrollReveal from '@/components/ScrollReveal'

/* ── 개인정보보호법 카드 ── */
const privacyCards = [
  {
    icon: '\u{1F50D}',
    title: '개인정보 영향평가',
    desc: '신규 서비스 출시 전 개인정보 영향평가를 실시하여 법적 리스크를 사전에 차단합니다.',
  },
  {
    icon: '\u{1F4CB}',
    title: '개인정보 처리방침 수립',
    desc: '법령에 부합하는 개인정보 처리방침과 내부 관리계획을 수립하고 정기적으로 업데이트합니다.',
  },
  {
    icon: '\u{1F6A8}',
    title: '유출 사고 긴급 대응',
    desc: '개인정보 유출 발생 시 72시간 내 신고 의무 대응, 피해자 통지, 과징금 감경 전략까지 원스톱으로 처리합니다.',
  },
]

const stats = [
  { value: '200+', label: '개인정보 관련 자문 건수' },
  { value: '100%', label: '과징금 감경 달성률' },
  { value: '72h', label: '긴급 대응 체계' },
]

/* ── 성공사례 ── */
const cases = [
  {
    tag: '개인정보유출',
    title: '고객 DB 10만 건 유출 사고, 과징금 80% 감경',
    summary: '신속한 사고 대응과 재발 방지 체계 구축으로 과징금을 대폭 감경받았습니다.',
    badge: '과징금 80% 감경',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=450&fit=crop&q=80',
  },
  {
    tag: '해킹',
    title: '기업 서버 해킹 피해, 가해자 검거 및 손해배상 3억 원',
    summary: '디지털 포렌식과 수사기관 협력으로 가해자를 검거하고 손해배상을 이끌어냈습니다.',
    badge: '손해배상 3억',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=450&fit=crop&q=80',
  },
]

/* ── 프로세스 ── */
const steps = [
  { num: '01', title: '긴급 접수', desc: '24시간 긴급 접수. 피해 상황을 파악하고 즉시 증거 보전 조치를 시작합니다.' },
  { num: '02', title: '디지털 포렌식', desc: '전문 업체와 협력하여 디지털 증거를 수집·분석하고 법적 증거력을 확보합니다.' },
  { num: '03', title: '수사기관 신고·협력', desc: '경찰 사이버수사대에 고소장을 접수하고 수사에 적극 협력합니다.' },
  { num: '04', title: '법적 대응', desc: '민·형사 소송을 병행하여 가해자 처벌과 손해배상을 동시에 추진합니다.' },
  { num: '05', title: '재발 방지', desc: '보안 체계 점검, 개인정보 처리방침 개선 등 재발 방지 대책을 수립합니다.' },
]

/* ── FAQ ── */
const faqs = [
  {
    q: '개인정보보호법 위반 시 처벌이 어떻게 되나요?',
    a: '매출액의 3% 이하 과징금, 5년 이하 징역 또는 5천만 원 이하 벌금이 부과될 수 있습니다. 2024년 개정법 시행 후 처벌이 대폭 강화되었으므로 사전 대비가 필수입니다.',
  },
  {
    q: '해킹을 당했는데 어떻게 해야 하나요?',
    a: '즉시 증거를 보전하고 수사기관에 신고해야 합니다. 로앤이는 디지털 포렌식 전문 업체와 협력하여 증거 확보부터 수사 협력, 손해배상 청구까지 원스톱으로 진행합니다.',
  },
  {
    q: '우리 회사도 개인정보보호법 대상인가요?',
    a: '직원 1명이라도 고용하거나 고객 정보를 수집하는 모든 기업이 대상입니다. 규모와 관계없이 개인정보 처리방침과 내부 관리계획을 수립해야 합니다.',
  },
  {
    q: 'DPO(개인정보 보호책임자)를 외부에 맡길 수 있나요?',
    a: '네, 로앤이가 외부 DPO 역할을 수행할 수 있습니다. 법적 요건을 충족하면서도 비용 효율적으로 개인정보 보호 체계를 운영할 수 있습니다.',
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
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-40 pb-6' : 'max-h-0'}`}>
        <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
      </div>
    </div>
  )
}

/* ── 커스텀 섹션 ── */
function ITSecurityCustomSection() {
  return (
    <>
      {/* 개인정보보호법 전문 대응 */}
      <section className="py-28 sm:py-40" style={{ backgroundColor: '#1B3B2F' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-emerald-400 uppercase text-center mb-4">
              Privacy Law Expert
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-center text-white mb-4">
              개인정보보호법, 로앤이가 다릅니다.
            </h2>
            <p className="text-center text-gray-400 text-sm max-w-2xl mx-auto mb-20 leading-relaxed">
              2024년 개정 개인정보보호법 시행 이후, 기업의 법적 리스크가 급증하고 있습니다.
              로앤이는 개인정보보호법 전문 법률 서비스를 제공합니다.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {privacyCards.map((card, i) => (
              <ScrollReveal key={card.title} delay={i * 0.12}>
                <div className="bg-white rounded-2xl p-8 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                  <div className="text-3xl mb-4">{card.icon}</div>
                  <h3 className="text-base font-semibold text-black mb-3">{card.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* 강조 수치 */}
          <ScrollReveal delay={0.3}>
            <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl sm:text-4xl font-bold text-white font-display">{stat.value}</p>
                  <p className="mt-2 text-sm text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 성공사례 */}
      <section className="py-28 sm:py-40 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">
              Case Results
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-center text-black mb-16">
              IT·보안 센터 성공사례
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {cases.map((c, i) => (
              <ScrollReveal key={i} delay={i * 0.12}>
                <div className="group overflow-hidden rounded-2xl border border-gray-100 hover:border-gray-300 hover:shadow-lg transition-all duration-300">
                  <div className="aspect-[16/9] overflow-hidden">
                    <Image
                      src={c.image}
                      alt={c.title}
                      width={800}
                      height={450}
                      className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700 ease-out"
                    />
                  </div>
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                      <span className="text-xs text-gray-400 tracking-wide uppercase">{c.tag}</span>
                      <span className={`inline-flex self-start px-3 py-1 text-xs font-medium border rounded-full ${c.badgeColor}`}>
                        {c.badge}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-black leading-snug group-hover:text-accent transition-colors duration-300">
                      {c.title}
                    </h3>
                    <p className="mt-3 text-sm text-gray-500 leading-relaxed">{c.summary}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 디지털 피해 대응 프로세스 */}
      <section className="py-28 sm:py-40 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">
              Process
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-center text-black mb-20">
              디지털 피해 대응 프로세스
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 0.1}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-emerald-700 text-sm font-bold text-emerald-700 mb-5">
                    {step.num}
                  </div>
                  <h3 className="text-sm font-semibold text-black">{step.title}</h3>
                  <p className="mt-2 text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 sm:py-40 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">
              FAQ
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-center text-black mb-16">
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
export default function ITSecurityCenterPage() {
  return (
    <CenterPageTemplate
      centerName="IT·보안 법률센터"
      subtitle="IT·보안 법률센터"
      ctaLabel="IT보안 법률 상담"
      ctaHref="/consultation"
      defaultCaseType="IT·보안 법률 상담"
      services={[
        {
          title: '해킹 피해 대응',
          description: '해킹 피해 조사부터 법적 구제까지 원스톱으로 지원합니다.',
          image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '개인정보 유출 대응',
          description: '개인정보보호법 위반에 대한 피해 구제 및 손해배상을 청구합니다.',
          image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '랜섬웨어 피해 대응',
          description: '랜섬웨어 공격 피해에 대한 법적 대응과 피해 복구를 지원합니다.',
          image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '디지털 포렌식 지원',
          description: '전자 증거의 수집, 분석, 보전을 전문적으로 지원합니다.',
          image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '정보보호 컨설팅',
          description: '기업의 정보보호 체계 구축과 보안 점검을 자문합니다.',
          image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '사이버 수사 협력 및 고소 대리',
          description: '수사기관과 협력하여 사이버 범죄를 고소하고 가해자를 처벌합니다.',
          image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop&q=80',
        },
      ]}
      declaration={{
        title: '디지털 범죄는\n디지털로 대응합니다.',
        description:
          '기술과 법률의 융합.\n로앤이 IT·보안 법률센터가 디지털 세상의 정의를 세웁니다.',
      }}
      customSection={<ITSecurityCustomSection />}
      lawyers={[
        {
          name: '이유림',
          role: '대표변호사',
          specialty: 'IT·보안 법률 전문 변호사',
          quote: '디지털 시대의 새로운 위협에\n법률로 대응하겠습니다.',
          image: '/lawyer-lee.jpg',
        },
        {
          name: '노채은',
          role: '대표변호사',
          specialty: 'IT·보안 법률 전문 변호사',
          quote: '무뎌진 언어 뒤에도 도저히 묻혀지지 않는\n마음이 있습니다.',
          image: '/lawyer-noh.jpg',
        },
      ]}
      ctaTitle="디지털 피해, 혼자 대응하지 마세요."
      ctaDescription="IT·보안 법률 전문가의 상담을 받아보세요."
    />
  )
}
