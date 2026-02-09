'use client'

import CenterPageTemplate from '@/components/CenterPageTemplate'
import ScrollReveal from '@/components/ScrollReveal'
import { useConsultation } from '@/components/ConsultationProvider'

const processSteps = [
  {
    num: '01',
    title: '채무 현황 입력',
    description:
      '의뢰인이 간단한 질문에 답하면, RE-Set이 채무 규모·채권자·소득 정보를 자동으로 정리합니다.',
  },
  {
    num: '02',
    title: '서류 자동 수집',
    description:
      '주민등록등본, 가족관계증명서, 소득증명원 등 47종의 서류를 관공서·금융기관에서 원클릭으로 수집합니다.',
  },
  {
    num: '03',
    title: 'AI 서류 검증',
    description:
      '수집된 서류의 누락 항목, 기재 오류, 금액 불일치를 AI가 자동으로 검출하고 보정 가이드를 제공합니다.',
  },
  {
    num: '04',
    title: '신청서 자동 생성',
    description:
      '검증된 데이터를 바탕으로 법원 제출용 회생·파산 신청서를 자동으로 생성합니다. 변호사는 최종 검토만 하면 됩니다.',
  },
  {
    num: '05',
    title: '변호사 최종 검토',
    description:
      '이유림·노채은 대표변호사가 AI가 생성한 신청서를 직접 검토하고 보완하여 법원에 제출합니다.',
  },
]

const comparisonRows = [
  { label: '서류 준비 기간', general: '평균 2~3주', reset: '평균 3일' },
  { label: '서류 누락률', general: '30% 이상', reset: '5% 미만' },
  { label: '의뢰인 방문 횟수', general: '5~7회', reset: '1~2회' },
  { label: '서류 수집 방식', general: '의뢰인 직접 발급', reset: 'AI 자동 수집' },
  { label: '비용', general: '추가 수수료 발생', reset: '수임료에 포함' },
]

function ReSetSection() {
  const { openConsultation } = useConsultation()
  return (
    <>
      {/* 1. 섹션 헤더 */}
      <section className="py-28 sm:py-40 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <p
              className="text-xs tracking-[0.35em] uppercase mb-6"
              style={{ color: '#1B3B2F' }}
            >
              Developed by Roh &amp; Lee
            </p>
            <h2 className="font-serif text-5xl sm:text-6xl font-bold text-black mb-4">
              RE-Set
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 font-medium mb-8">
              회생·파산 서류 자동화 시스템
            </p>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-2xl mx-auto">
              법률사무소 로앤이가 직접 개발한 리걸테크 솔루션입니다.
              복잡하고 방대한 회생·파산 서류 준비를 AI가 자동화하여,
              의뢰인의 부담은 줄이고 변호사의 검토에 집중합니다.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. 핵심 수치 배너 */}
      <section style={{ backgroundColor: '#1B3B2F' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0 sm:divide-x sm:divide-white/20 text-center text-white">
              <div className="px-4">
                <p className="font-serif text-3xl sm:text-4xl font-bold mb-2">
                  2주 <span className="text-white/50 mx-2">&rarr;</span> 3일
                </p>
                <p className="text-sm text-white/70">서류 준비 기간</p>
              </div>
              <div className="px-4">
                <p className="font-serif text-3xl sm:text-4xl font-bold mb-2">
                  47<span className="text-lg font-normal text-white/70 ml-1">종</span>
                </p>
                <p className="text-sm text-white/70">자동 수집 가능 서류</p>
              </div>
              <div className="px-4">
                <p className="font-serif text-3xl sm:text-4xl font-bold mb-2">
                  95<span className="text-lg font-normal text-white/70 ml-1">%</span>
                </p>
                <p className="text-sm text-white/70">서류 오류율 감소</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. RE-Set 작동 프로세스 */}
      <section className="py-28 sm:py-40 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">
              How It Works
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-center text-black mb-20">
              RE-Set 작동 프로세스
            </h3>
          </ScrollReveal>

          {/* 데스크탑: 가로 플로우 */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-5 gap-0">
              {processSteps.map((step, i) => (
                <ScrollReveal key={step.num} delay={i * 0.1}>
                  <div className="relative px-5">
                    {/* 연결선 */}
                    {i < processSteps.length - 1 && (
                      <div className="absolute top-5 left-[calc(50%+24px)] right-0 h-px bg-gray-200" />
                    )}
                    <p
                      className="font-serif text-3xl font-bold mb-4"
                      style={{ color: '#1B3B2F' }}
                    >
                      {step.num}
                    </p>
                    <h4 className="text-sm font-semibold text-black mb-3">
                      {step.title}
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* 모바일: 세로 플로우 */}
          <div className="lg:hidden space-y-0">
            {processSteps.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 0.08}>
                <div className="flex gap-6">
                  {/* 좌측: 번호 + 세로선 */}
                  <div className="flex flex-col items-center">
                    <p
                      className="font-serif text-2xl font-bold flex-shrink-0"
                      style={{ color: '#1B3B2F' }}
                    >
                      {step.num}
                    </p>
                    {i < processSteps.length - 1 && (
                      <div className="w-px flex-1 bg-gray-200 mt-3" />
                    )}
                  </div>
                  {/* 우측: 내용 */}
                  <div className="pb-10">
                    <h4 className="text-base font-semibold text-black mb-2">
                      {step.title}
                    </h4>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 강조 블록 */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div
              className="rounded-2xl px-8 sm:px-14 py-12 sm:py-16"
              style={{ backgroundColor: '#f7faf9' }}
            >
              <p
                className="text-xs tracking-[0.3em] uppercase mb-6"
                style={{ color: '#1B3B2F' }}
              >
                Why RE-Set
              </p>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-black mb-6 leading-snug">
                로앤이가 직접 개발했습니다.
              </h3>
              <div className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed">
                <p>
                  RE-Set은 외부 솔루션이 아닙니다.
                  <br className="hidden sm:block" />
                  법률사무소 로앤이의 이유림 대표변호사가 수백 건의 회생·파산 사건 경험을
                  바탕으로 직접 설계하고 개발한 시스템입니다.
                </p>
                <p>
                  실무에서 가장 시간이 오래 걸리는 서류 수집과 검증 과정을 자동화하여,
                  변호사는 법률 판단에, 의뢰인은 일상 회복에 집중할 수 있습니다.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 5. 비교 테이블 */}
      <section className="py-28 sm:py-40 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">
              Comparison
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-center text-black mb-16">
              RE-Set vs 일반 법률사무소
            </h3>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            {/* 데스크탑 테이블 */}
            <div className="hidden sm:block overflow-hidden rounded-2xl">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left text-xs tracking-wider text-gray-400 uppercase py-4 px-6 bg-white">
                      구분
                    </th>
                    <th className="text-left text-xs tracking-wider text-gray-400 uppercase py-4 px-6 bg-white">
                      일반 법률사무소
                    </th>
                    <th
                      className="text-left text-xs tracking-wider uppercase py-4 px-6 text-white/80"
                      style={{ backgroundColor: '#1B3B2F' }}
                    >
                      로앤이 RE-Set
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={row.label} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                      <td className="py-4 px-6 text-sm font-medium text-black">
                        {row.label}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500">
                        {row.general}
                      </td>
                      <td
                        className="py-4 px-6 text-sm font-semibold text-white"
                        style={{ backgroundColor: i % 2 === 0 ? '#1B3B2F' : '#22483a' }}
                      >
                        {row.reset}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 모바일 카드 */}
            <div className="sm:hidden space-y-4">
              {comparisonRows.map((row) => (
                <div key={row.label} className="bg-white rounded-xl p-5">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">
                    {row.label}
                  </p>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-xs text-gray-400 mb-1">일반</p>
                      <p className="text-sm text-gray-500">{row.general}</p>
                    </div>
                    <div className="w-px h-8 bg-gray-200" />
                    <div className="flex-1 text-right">
                      <p className="text-xs mb-1" style={{ color: '#1B3B2F' }}>
                        RE-Set
                      </p>
                      <p className="text-sm font-semibold" style={{ color: '#1B3B2F' }}>
                        {row.reset}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 6. 하단 CTA */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => openConsultation('회생·파산 상담')}
                className="inline-flex items-center justify-center px-10 py-4 text-white text-sm font-medium rounded-full hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#1B3B2F' }}
              >
                RE-Set으로 새 출발 준비하기
              </button>
              <a
                href="tel:032-207-8788"
                className="inline-flex items-center justify-center px-10 py-4 border text-sm font-medium rounded-full hover:bg-gray-50 transition-colors"
                style={{ borderColor: '#1B3B2F', color: '#1B3B2F' }}
              >
                무료 상담 신청: 032-207-8788
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}

export default function BankruptcyCenterPage() {
  return (
    <CenterPageTemplate
      centerName="회생·파산 전문센터 리셋"
      subtitle="회생·파산 전문센터(리셋)"
      ctaLabel="무료 회생 가능성 진단"
      ctaHref="/consultation"
      defaultCaseType="회생·파산 상담"
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
