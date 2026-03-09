'use client'

import { useRef } from 'react'
import CenterPageTemplate from '@/components/CenterPageTemplate'
import ScrollReveal from '@/components/ScrollReveal'
import ProcessTimeline from './ProcessTimeline'
import CenterCases from './CenterCases'
import FAQAccordion from './FAQAccordion'

const reviews = [
  {
    title: '빠르고 현실적인 조언을 알기 쉽게 설명해주셨어요',
    content:
      '똑부러지는 목소리로 현재 사건의 방향 가능성과 그에 대비하는 방법을 잘 설명해 주셔서 믿음이 갔습니다. 고소만 대리하는 것이 아닌 피해자 분들 케어에도 신경 써주시는 것 같아 마음이 쏠렸어요.',
  },
  {
    title: '변호사님의 시선에서 먼저 사건을 해석해서 풀이해주셔서 명쾌합니다',
    content:
      '변호사상담을 많이 받아보았는데 제일 만족한 변호사님입니다. 다른 변호사분들은 보통 어떤게 궁금한지를 계속 물어보시는데 이유림변호사님은 먼저 사건개요를 보시고 변호사님의 시선에서 사건을 해석해서 정말 상세히 말씀해주십니다.',
  },
  {
    title: '여태까지 찾아 헤맸던 변호사님',
    content:
      '유명하신데는 이유가 있으시더라고요. 전화상담 하나에 이렇게 공들여주실 줄 몰랐어요. 관련 판례도 찾아주시고 다른 변호사도 제시해주지 못한 해결책을 제시해주셨어요. 전화상담이었지만 너무 큰 위로와 실제적인 방향까지 잡아주셨어요.',
  },
  {
    title: '성추행 및 계약 해지 관련 문의',
    content:
      '제 입장에서 공감해주시면서 대처 방법까지 자세하게 설명해주셔서 너무 감사합니다. 제가 생각하지 못했던 부분들도 콕 집어서 알려주셨어요.',
  },
  {
    title: '성범죄 피해자를 위한 변호사님',
    content:
      '오직 피해자만을 변호하신다 하셔서 더 신뢰가 갔습니다. 현실적인 조언과 함께 내담자의 상황에 경청하시고 변호사님 스스로가 성범죄 퇴치와 피해자 보호에 진심이신 듯 합니다.',
  },
  {
    title: '너무나도 따뜻하시고 명쾌하신 분',
    content:
      '전화듣는 내내 피해자 편에서 너무 자세한 설명과 바로잡을 수 있는 상황까지 친절하게 알려주셨습니다. 따뜻한 마음과 진정성이 느껴지는 분이셨고 이분께 의뢰하면 정말 다 해결될 것 같은 기분이 듭니다.',
  },
  {
    title: '제가 알 수 없었던 부분까지 짚어주셨어요',
    content:
      '법률 전문가의 시각으로 사건을 면밀히 봐주시고, 제가 알 수 없던 부분까지 이끌어내주셔서 믿음이 갔습니다. 의뢰인의 입장에서 공감해주시고 현실적이고 명확한 대응 방안까지 제시해주셨습니다.',
  },
]

function StarIcon() {
  return (
    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

function ReviewsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = 380
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }

  return (
    <section className="py-28 sm:py-40 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">
            Client Reviews
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-4">
            로앤이 성범죄 전문 변호 실적
          </h2>
          <p className="text-center text-gray-500 text-sm mb-16">
            압도적인 별점 <span className="text-accent font-bold">5.0</span>, 수많은 감사 인사가 로앤이의 실력을 말해줍니다.
          </p>
        </ScrollReveal>

        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label="이전 후기"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label="다음 후기"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-4 px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reviews.map((review, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="flex-shrink-0 w-[340px] sm:w-[360px] snap-start bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-300">
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <StarIcon key={j} />
                    ))}
                  </div>
                  <h3 className="text-base font-semibold text-black leading-snug mb-3 line-clamp-2">
                    &ldquo;{review.title}&rdquo;
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-4">
                    {review.content}
                  </p>
                  <p className="mt-5 text-xs text-gray-400">로톡 후기</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-12 text-center">
            <a
              href="https://www.lawtalk.co.kr/directory/profile/8292-%EC%9D%B4%EC%9C%A0%EB%A6%BC/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 text-white text-sm font-medium rounded-full hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#1B3B2F' }}
            >
              로톡 상담후기 보러가기 &rarr;
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

// ── 변호 분야 카드 섹션 ──
const crimeTypes = [
  { title: '성폭행·성추행', description: '강간, 유사강간, 강제추행, 준강간 등 모든 성폭력 범죄 피해자를 변호합니다.' },
  { title: '강제추행', description: '직장, 학교, 공공장소 등에서 발생하는 강제추행 피해에 대한 법적 대응을 지원합니다.' },
  { title: '불법촬영·몰카', description: '몰래카메라, 불법촬영물 유포, 리벤지포르노 피해자의 권리를 보호합니다.' },
  { title: '디지털성범죄', description: '온라인 그루밍, 사이버 성착취, SNS를 통한 성적 괴롭힘 등 디지털 환경의 성범죄에 대응합니다.' },
  { title: '리벤지포르노·딥페이크', description: '불법 합성물(딥페이크), 리벤지포르노 유포 차단 및 삭제 요청, 가해자 처벌을 진행합니다.' },
  { title: '스토킹', description: '스토킹처벌법에 따른 고소, 접근금지 가처분, 피해자 보호 조치를 전문적으로 수행합니다.' },
  { title: '데이트폭력', description: '친밀한 관계에서 발생하는 폭력, 협박, 감시 행위에 대한 법적 보호를 제공합니다.' },
  { title: '직장 내 성희롱', description: '직장 내 성희롱 피해자의 권리 구제, 사용자 책임 추궁, 손해배상 청구를 지원합니다.' },
  { title: '아동·청소년 대상 성범죄', description: '아동·청소년 성보호법에 따른 엄격한 가해자 처벌과 피해 회복을 도와드립니다.' },
]

function CrimeTypesSection() {
  return (
    <section className="py-28 sm:py-40 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">
            Practice Areas
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-16">
            이유림 변호사가 전담하는 성범죄 유형
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {crimeTypes.map((crime, i) => (
            <ScrollReveal key={i} delay={i * 0.06}>
              <div className="border border-gray-200 rounded-xl p-6 hover:border-[#1B3B2F] hover:shadow-sm transition-all duration-300 h-full">
                <h3 className="text-base font-semibold text-black mb-3">{crime.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{crime.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── 신뢰 지표 섹션 ──
function TrustIndicators() {
  return (
    <section className="py-16 bg-[#1B3B2F]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '4.9', suffix: ' ★', label: '로톡 평점' },
            { value: '600', suffix: '+', label: '상담 후기' },
            { value: '100', suffix: '%', label: '피해자 전담률' },
            { value: '', suffix: '무료', label: '첫 상담' },
          ].map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div>
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  {item.value}{item.suffix}
                </p>
                <p className="mt-2 text-xs sm:text-sm text-white/60">{item.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── 피해자 국선변호사 안내 ──
function VictimLawyerSection() {
  return (
    <section className="py-28 sm:py-40 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">
            Victim Advocate
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-8">
            피해자 국선변호사 제도 안내
          </h2>
          <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
            <p>
              성범죄 피해자는 <strong className="text-black">「성폭력범죄의 처벌 등에 관한 특례법」</strong>에 따라
              국가가 지정하는 국선변호사의 조력을 무료로 받을 수 있습니다.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 space-y-3">
              <p><strong className="text-black">국선변호사:</strong> 국가 지정, 비용 무료, 변호사 선택 불가</p>
              <p><strong className="text-black">사선변호사:</strong> 피해자가 직접 선임, 전문성 선택 가능, 적극적 맞춤형 변호</p>
            </div>
            <p>
              로앤이는 <strong className="text-black">피해자 전문 사선변호사</strong>로서,
              상담부터 수사 동행, 재판, 피해 회복까지 A-Z 전 과정을 책임집니다.
              오직 피해자만 변호하기 때문에 보다 적극적이고 전문적인 변호가 가능합니다.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default function SexualCrimeCenterPage() {
  return (
    <CenterPageTemplate
      pagePath="centers/sexual-crime"
      centerName="성범죄 피해 전문센터"
      subtitle="성범죄 피해자를 위한 전문 법률 서비스"
      ctaLabel="무료 상담 신청하기"
      ctaHref="/consultation"
      defaultCaseType="성범죄 피해 상담"
      services={[
        {
          title: '가해자 연락 전면 대리',
          description: '가해자와 직접 마주할 필요 없이, 모든 연락과 협상을 변호사가 대신합니다.',
          image: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '24시간 심리 케어',
          description: '불안한 밤에도 전화 한 통이면 즉시 대응합니다. 언제든 연락하세요.',
          image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '철저한 비밀 보장',
          description: '사건 내용부터 의뢰인 신원까지, 모든 정보를 철저하게 보호합니다.',
          image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '경찰 조사 동석',
          description: '수사 단계부터 변호사가 동석하여 진술을 조력하고 심리적 안정을 지원합니다.',
          image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '증거 보전 및 디지털 포렌식',
          description: '휴대폰, 영상 등 디지털 증거를 확보하고 포렌식 절차를 진행합니다.',
          image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '변호사 의견서 제출',
          description: '수사기관에 변호사 의견서를 제출하여 수사 방향을 유리하게 이끕니다.',
          image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '합의 협상 및 재판 대리',
          description: '형사 처벌 압박을 통한 합의금 극대화와 민사 손해배상 청구를 진행합니다.',
          image: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '피해자 보호명령 신청',
          description: '접근금지, 연락금지 등 보호명령을 신청하여 2차 피해를 차단합니다.',
          image: 'https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=800&h=600&fit=crop&q=80',
        },
        {
          title: '범죄피해 보상금 청구',
          description: '국가 범죄피해자 보상 제도를 활용하여 정당한 피해 보상을 받을 수 있도록 지원합니다.',
          image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop&q=80',
        },
      ]}
      declaration={{
        title: '가해자는 변호하지 않습니다.\n오로지 피해자만을 변호합니다.',
        description:
          '피해자 변호사는 고소장만 내주면 끝이라는 착각.\n로앤이 성범죄피해전문센터에서는\n피해자 변호의 처음부터 끝까지, A-Z를 책임집니다.',
      }}
      customSection={
        <>
          <CrimeTypesSection />
          <TrustIndicators />
          <VictimLawyerSection />
          <ProcessTimeline />
          <CenterCases />
          <FAQAccordion />
          <ReviewsSection />
        </>
      }
      lawyers={[
        {
          name: '이유림',
          role: '대표변호사',
          specialty: '성범죄 피해자 전문 변호사',
          quote: '끝까지 당신의 편에 서겠습니다.\n피해자의 시간 앞에서 겸허히 걷겠습니다.',
          image: '/images/lawyers/lawyer-lee.svg',
        },
      ]}
      ctaTitle="혼자 앓지 마세요. 지금 전문가와 이야기하세요."
      ctaDescription="성범죄 전담 변호사의 무료 상담을 지금 바로 받아보세요."
    />
  )
}
