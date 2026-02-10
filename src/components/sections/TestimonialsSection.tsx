'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'

const testimonials = [
  {
    title: '여태까지 찾아 헤맸던 변호사님',
    quote:
      '유명하신데는 이유가 있으시더라고요. 전화상담 하나에 이렇게 공들여주실 줄 몰랐어요. 관련 판례도 찾아주시고 지금 제 상황에서 어떻게 하는 게 제일 좋을지 다른 변호사도 제시해주지 못한 해결책을 제시해주셨어요.',
    source: '로톡 후기',
    rating: 5,
  },
  {
    title: '유쾌, 상쾌, 명쾌. 명사수 이유림 변호사님.',
    quote:
      '사건의 본질에 대해서 정확하게 판단하시고 문제 해결의 방향성을 정확하게 제시하여 주셔서 의뢰인 입장에서 든든하고 변호사님의 냉철한 판단은 사건을 객관적으로 보게 만들어 주셨습니다.',
    source: '로톡 후기',
    rating: 5,
  },
  {
    title: '성범죄 피해자를 위한 변호사님.',
    quote:
      '오직 피해자만을 변호하신다 하셔서 더 신뢰가 갔습니다. 현실적인 조언과 함께 내담자의 상황에 경청하시고 변호사님 스스로가 성범죄 퇴치와 피해자 보호에 진심이신 듯 합니다.',
    source: '로톡 후기',
    rating: 5,
  },
  {
    title: '애매한 사안에도 희망의 빛을 찾아주신 분',
    quote:
      '휴일에도 같이 머리 싸매고 최선의 방법을 찾아주셔서 너무 감사드립니다. 소통이 잘 되고 지인처럼 편하게 대화해 주셔서 상담이지만 부담이 적습니다.',
    source: '로톡 후기',
    rating: 5,
  },
  {
    title: '왜 이제야.... 지난날의 저를 꾸짖습니다.',
    quote:
      '상담을 시작하시면서 단번에 핵심을 짚어주셨습니다. 판례까지 준비해서 꼼꼼하게 답변해주신 변호사님은 처음이었습니다. 사건을 해결해주시겠다는 의지가 느껴졌습니다.',
    source: '로톡 후기',
    rating: 5,
  },
]

export default function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-10 sm:mb-16">
            <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-4">
              Client Reviews
            </p>
            <h2 className="text-xl sm:text-3xl font-bold text-black">
              <span className="text-accent">100</span>명 이상의 의뢰인이 증명합니다.
            </h2>
            <p className="mt-5 text-gray-400 text-sm">
              압도적인 별점 <span className="text-accent font-bold">5.0</span>, 수많은 감사 인사가 로앤이의 실력을 말해줍니다.
            </p>
          </div>
        </ScrollReveal>

        {/* 가로 스크롤 슬라이더 */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 snap-x snap-mandatory"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex-shrink-0 w-[340px] sm:w-[400px] snap-start"
            >
              <div className="bg-[#f5f8f6] p-8 shadow-sm border border-gray-100 h-full flex flex-col relative hover:shadow-md transition-shadow duration-300">
                {/* 큰따옴표 장식 */}
                <span className="absolute top-5 right-6 text-[60px] leading-none text-[#1B3B2F]/[0.06] select-none">
                  &ldquo;
                </span>

                {/* 별점 */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <svg key={j} width="18" height="18" viewBox="0 0 16 16" fill="#1B3B2F">
                      <path d="M8 0l2.472 4.932L16 5.812l-4 3.78.944 5.408L8 12.616 3.056 15l.944-5.408-4-3.78 5.528-.88z" />
                    </svg>
                  ))}
                </div>

                {/* 제목 */}
                <h3 className="text-base font-semibold text-black mb-3 pr-8">
                  {t.title}
                </h3>

                {/* 본문 */}
                <p className="text-sm text-gray-500 leading-relaxed flex-1">
                  {t.quote}
                </p>

                {/* 출처 */}
                <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
                  <span className="text-xs text-gray-400">{t.source}</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <div key={j} className="w-1.5 h-1.5 rounded-full bg-accent/30" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 로톡 링크 */}
        <ScrollReveal delay={0.2}>
          <div className="mt-10 text-center">
            <a
              href="https://www.lawtalk.co.kr/directory/profile/8292-%EC%9D%B4%EC%9C%A0%EB%A6%BC/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-black font-medium hover:text-accent transition-colors"
            >
              로톡에서 600+개의 후기 보기 <span className="ml-1">&rarr;</span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
