'use client'

import ScrollReveal from '@/components/ScrollReveal'

export default function AppSection() {
  return (
    <section className="py-40 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-black">
              로앤이 전용 앱 출시.
            </h2>
            <p className="mt-5 text-gray-400 text-sm leading-relaxed">
              변호사를 직접 만나지 않아도,<br />
              로앤이의 법률서비스를 무료로 이용하세요.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* 진심의 무게 */}
          <ScrollReveal delay={0.1}>
            <div className="bg-gray-50 p-10 border border-gray-100 h-full flex flex-col">
              <div className="w-20 h-20 mx-auto mb-8 bg-black flex items-center justify-center">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19l7-7 3 3-7 7-3-3z" />
                  <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                  <path d="M2 2l7.586 7.586" />
                  <circle cx="11" cy="11" r="2" />
                </svg>
              </div>
              <div className="text-center flex-1">
                <h3 className="text-lg font-semibold text-black">진심의 무게</h3>
                <p className="mt-2 text-sm text-accent font-medium">
                  피해자의 진심을, 법의 언어로.
                </p>
                <p className="mt-4 text-sm text-gray-400 leading-relaxed">
                  쉬운 질문에 답하기만 하면, AI가 법원 제출용 엄벌 탄원서를 자동으로 완성합니다.
                  피해 유형 선택부터 정신적·신체적 피해 체크, Word 파일 다운로드까지.
                  전문 변호사 검토 서비스도 제공합니다.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  <span className="px-3 py-1 bg-gray-100 text-xs text-gray-600 border border-gray-200">AI 탄원서 작성</span>
                  <span className="px-3 py-1 bg-gray-100 text-xs text-gray-600 border border-gray-200">Word 다운로드</span>
                  <span className="px-3 py-1 bg-gray-100 text-xs text-gray-600 border border-gray-200">변호사 검토</span>
                </div>
              </div>
              <div className="mt-8 text-center">
                <a href="https://pf.kakao.com/_YxgWxcn/chat" target="_blank" rel="noopener noreferrer" className="text-sm text-black font-medium hover:text-accent transition-colors">
                  자세히 보기 →
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* 리셋 RE-Set */}
          <ScrollReveal delay={0.2}>
            <div className="bg-gray-50 p-10 border border-gray-100 h-full flex flex-col">
              <div className="w-20 h-20 mx-auto mb-8 bg-orange-500 flex items-center justify-center">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="1 4 1 10 7 10" />
                  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                </svg>
              </div>
              <div className="text-center flex-1">
                <h3 className="text-lg font-semibold text-black">리셋 RE-Set</h3>
                <p className="mt-2 text-sm text-accent font-medium">
                  새로운 출발을 위한 법적 리셋.
                </p>
                <p className="mt-4 text-sm text-gray-400 leading-relaxed">
                  개인회생·파산 사건에 필요한 서류를 자동으로 수집하고 정리합니다.
                  복잡한 절차를 간단하게, 새 출발까지 함께합니다.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  <span className="px-3 py-1 bg-gray-100 text-xs text-gray-600 border border-gray-200">서류 자동수집</span>
                  <span className="px-3 py-1 bg-gray-100 text-xs text-gray-600 border border-gray-200">회생파산 전문</span>
                  <span className="px-3 py-1 bg-gray-100 text-xs text-gray-600 border border-gray-200">원스톱 지원</span>
                </div>
              </div>
              <div className="mt-8 text-center">
                <a href="https://pf.kakao.com/_YxgWxcn/chat" target="_blank" rel="noopener noreferrer" className="text-sm text-black font-medium hover:text-accent transition-colors">
                  자세히 보기 →
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
