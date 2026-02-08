'use client'

import ScrollReveal from '@/components/ScrollReveal'

const testimonials = [
  {
    quote:
      '두 소녀의 엄마 시작으로 크나큰 슬픔으로부터 이겨낼 수 있었습니다. 긴 시간 동안 이유림 변호사님께서 끝까지 함께해 주셨기에 가능했습니다. 변호사님의 따뜻한 마음과 전문성에 깊이 감사드립니다.',
    author: '성범죄 피해 의뢰인',
    rating: 5,
  },
  {
    quote:
      '나의 모든것을 투자라고 속여 빼앗긴 돈... 겨우 신고를 했지만 경찰은 민사로 처리하라고만 했습니다. 노채은 변호사님이 전액 환수해 주셨습니다. 내 인생을 되찾은 기분입니다.',
    author: '재산범죄 피해 의뢰인',
    rating: 5,
  },
  {
    quote:
      '밤낮 기업간의 분쟁으로 두통이었는데 로앤이 기업경영 법무센터에서 깔끔히 해결해 주셨습니다. 사건 진행 상황도 앱으로 실시간 확인할 수 있어서 불안하지 않았습니다.',
    author: '기업 법무 의뢰인',
    rating: 5,
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-24 sm:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-black">
              <span className="text-accent">100</span>명 이상의 의뢰인이 증명합니다.
            </h2>
            <p className="mt-4 text-gray-500 text-sm">
              압도적인 별점 <span className="text-accent font-bold">5.0</span>, 수많은 감사 인사가 로앤이의 실력을 말해줍니다.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <ScrollReveal key={i} delay={i * 0.15}>
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 h-full flex flex-col">
                {/* 별점 */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <svg key={j} width="16" height="16" viewBox="0 0 16 16" fill="#1B3B2F">
                      <path d="M8 0l2.472 4.932L16 5.812l-4 3.78.944 5.408L8 12.616 3.056 15l.944-5.408-4-3.78 5.528-.88z" />
                    </svg>
                  ))}
                </div>

                <p className="text-sm text-gray-600 leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-400">{t.author}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
