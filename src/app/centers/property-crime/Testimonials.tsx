'use client'

import { useRef } from 'react'
import ScrollReveal from '@/components/ScrollReveal'

interface Review {
  title: string
  content: string
}

const reviews: Review[] = [
  {
    title: '마음고생 한결 놓였습니다',
    content: '나긋나긋하게 전화받아 주시고 공감해주셔서 너무 감사했습니다. 통화 한번으로 마음이 편안해지고 차분해졌습니다. 의뢰인 편에 서있는 변호사, 그런 느낌을 많이 받을 수 있는 상담이었습니다.',
  },
  {
    title: '정확한 판단, 신중한 대응',
    content: '사건 진단을 하시고는 대응 방법과 과한 대응보다는 현실에 맞고 신중한 대응을 권하셨습니다. 일처리에 적극적이며 열정이 있으신 분 같아서 믿고 맡길 수 있겠다는 느낌이 강했습니다.',
  },
  {
    title: '현실적 판단 + 공감 모두 잡아주시는 변호사님',
    content: '궁금했지만 여쭤보긴 애매했던 것까지 시원하게 대답해주셨습니다. 중간중간 공감도 해주시는데 그게 심적으로 엄청난 도움이 되었어요.',
  },
  {
    title: '아묻따 그냥 상담 신청하세요!',
    content: '친절과 전문성 두 가지 다 겸비하기는 어렵다고 생각합니다. 그런데 두 가지 다 빵빵하게 겸비하고 계셔서 아주 감사하게 상담 받았습니다. 제발 엄한 곳 돌지 말고 여기에서 하세요!!',
  },
  {
    title: '신속하고 따뜻한 상담에 감사드립니다',
    content: '보이스피싱 피해로 큰 충격을 받았지만, 상담을 통해 마음의 짐을 덜 수 있었습니다. 제 상황을 끝까지 경청해주시고 명확하게 공감하며 해결 방향을 제시해주셔서 정말 큰 위로가 되었습니다.',
  },
  {
    title: '너무나 깔끔하면서도 친절하신 상담',
    content: '법률 상담이 처음이라 걱정했는데 너무 친절하시고 명확하게 결론부터 이유까지 자세히 말씀해주셨습니다. 추가적인 상황까지도 답변해주신다고 해주셔서 심리적으로 훨씬 편해졌습니다.',
  },
  {
    title: '속이 뻥 뚫립니다!',
    content: '짧은 시간 내에 딱! 이건 이렇게, 저건 저렇게 하면 된다고 해주셨습니다. 무조건 수임하는 쪽으로 유도하지 않아서 믿음직스러웠고, 상담만으로도 큰 도움 됐어요.',
  },
  {
    title: '믿고 사건을 맡겨도 될 변호사님',
    content: '사건의 경위에 대해서 정확하게 판단하고 쟁점을 명확히 하시는 변호사님. 선임에만 혈안이 되는 변호사들이랑 전혀 다른, 전화상담임에도 정말 많은 것을 얻어갑니다.',
  },
]

function Stars() {
  return (
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-[18px] h-[18px] text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = 360
    scrollRef.current.scrollBy({
      left: dir === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }

  return (
    <section className="py-28 sm:py-40 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-4">
                Testimonials
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-black">
                노채은 변호사 의뢰인 후기
              </h2>
              <p className="mt-3 text-sm text-gray-400">
                출처: 로톡 후기
              </p>
            </div>
            <div className="hidden sm:flex gap-2">
              <button
                onClick={() => scroll('left')}
                className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:border-gray-400 transition-colors"
                aria-label="이전"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:border-gray-400 transition-colors"
                aria-label="다음"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </ScrollReveal>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {reviews.map((review, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div className="flex-shrink-0 w-[320px] snap-start bg-white border border-gray-200 p-8 hover:border-gray-400 transition-colors duration-300">
                <Stars />
                <h3 className="text-base font-semibold text-black mb-3">
                  &ldquo;{review.title}&rdquo;
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {review.content}
                </p>
                <p className="mt-6 text-xs text-gray-300">
                  로톡 후기
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
