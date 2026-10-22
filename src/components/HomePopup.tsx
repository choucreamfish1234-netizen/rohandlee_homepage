'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function HomePopup() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    try {
      if (sessionStorage.getItem('popup-shown')) return
    } catch { return }

    const timer = setTimeout(() => {
      setShow(true)
      try { sessionStorage.setItem('popup-shown', '1') } catch {}
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          onClick={() => setShow(false)}
        >
          <div className="absolute inset-0 bg-black/50" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative bg-[#F6F2EA] shadow-2xl max-w-md w-full mx-auto overflow-y-auto max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShow(false)}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors z-10"
              aria-label="닫기"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="px-7 sm:px-10 pt-10 pb-8">
              <p className="eyebrow">Before You Choose</p>
              <h2 className="mt-5 font-serif text-2xl font-semibold text-[#1C1C1A] leading-snug">
                변호사를 고르기 전,<br />이 두 가지만 물어보세요
              </h2>

              <ol className="mt-7 border-t border-[#1C1C1A]/15">
                <li className="py-5 border-b border-[#1C1C1A]/15 flex gap-4">
                  <span className="font-serif text-sm text-[#B8955A] pt-0.5">01</span>
                  <div>
                    <p className="font-semibold text-[#1C1C1A] leading-snug">&ldquo;지금 상담해주시는 분이 변호사님 맞나요?&rdquo;</p>
                    <p className="text-xs text-[#1C1C1A]/55 mt-2 leading-relaxed">
                      24시간 상담을 내세우는 곳일수록 첫 상담을 받는 사람이 변호사가 아닌 사무장이나 상담 직원인 경우가 많습니다. 사건의 핵심을 파악하지 못한 채 상담이 진행됩니다.
                    </p>
                  </div>
                </li>
                <li className="py-5 border-b border-[#1C1C1A]/15 flex gap-4">
                  <span className="font-serif text-sm text-[#B8955A] pt-0.5">02</span>
                  <div>
                    <p className="font-semibold text-[#1C1C1A] leading-snug">
                      &ldquo;상담해주시는 대표변호사님이 직접 수사기관 동행도 해주시는 건가요?&rdquo;
                    </p>
                    <p className="text-xs text-[#1C1C1A]/55 mt-2 leading-relaxed">
                      이 질문에 명확하게 답하지 못하는 곳이라면, 당신의 사건은 상담한 변호사가 아닌 다른 변호사가 맡게 될 가능성이 높습니다.
                    </p>
                  </div>
                </li>
              </ol>

              <div className="mt-6 bg-[#1B3B2F] px-5 py-5">
                <p className="text-white/85 text-sm leading-relaxed">
                  로앤이는 두 질문 모두 필요 없습니다. 첫 전화부터 대표변호사가 직접 받고, 상담부터 사건 종결까지 직접 수행합니다.
                </p>
                <p className="mt-2 font-serif text-[#d9bf8c]">24시 사무장이 아니라, 변호사가 답합니다.</p>
              </div>

              <p className="mt-4 text-xs text-[#1C1C1A]/45">언론이 전문가 의견을 구할 때 찾는 로펌입니다.</p>

              <button
                onClick={() => setShow(false)}
                className="mt-6 w-full inline-flex items-center justify-center px-6 py-4 bg-[#1C1C1A] text-white text-sm font-semibold tracking-wide hover:bg-[#1B3B2F] transition-colors min-h-[52px]"
              >
                확인했습니다
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
