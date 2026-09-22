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
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto overflow-hidden"
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

            <div className="px-6 sm:px-8 pt-8 pb-6">
              <div className="text-center mb-5">
                <span className="text-4xl block mb-4">💡</span>
                <h2 className="text-xl font-bold text-black leading-snug">
                  변호사를 고르기 전,<br />이 질문을 꼭 하세요
                </h2>
              </div>

              <div className="border-t border-gray-100 my-5" />

              <div className="text-center text-base sm:text-lg text-gray-600 leading-8 sm:leading-9 space-y-4">
                <p>
                  어떤 로펌이든 상담할 때,<br />
                  이 한 마디만 물어보세요.
                </p>
                <p className="font-semibold text-black text-lg sm:text-xl leading-8 sm:leading-9">
                  &ldquo;상담해주시는 대표변호사님이<br />
                  직접 수사기관 동행도 해주시는 건가요?&rdquo;
                </p>
                <p className="text-sm text-gray-500">
                  이 질문에 명확하게 답하지 못하는 곳이라면,<br />
                  당신의 사건은 다른 변호사가 맡게 됩니다.
                </p>
              </div>

              <div className="border-t border-gray-100 my-5" />

              <div className="bg-[#1B3B2F] rounded-lg p-4 text-center">
                <p className="text-white text-sm leading-relaxed">
                  로앤이는 묻지 않아도 됩니다.<br />
                  <span className="font-bold">대표변호사가 상담부터 사건 종결까지 직접 수행합니다.</span>
                </p>
              </div>

              <button
                onClick={() => setShow(false)}
                className="mt-5 w-full inline-flex items-center justify-center px-6 py-3.5 bg-[#1B3B2F] text-white text-sm font-medium rounded-full hover:bg-[#153126] transition-colors min-h-[48px]"
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
