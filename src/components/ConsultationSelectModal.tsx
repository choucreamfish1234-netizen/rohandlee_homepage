'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useCallback } from 'react'

interface ConsultationSelectModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectEmail: () => void
}

export default function ConsultationSelectModal({
  isOpen,
  onClose,
  onSelectEmail,
}: ConsultationSelectModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-[400px] mx-4 bg-white rounded-2xl shadow-2xl"
          >
            {/* 닫기 버튼 */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors z-10"
              aria-label="닫기"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M4 4L12 12M12 4L4 12" />
              </svg>
            </button>

            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-bold text-black mb-6 text-center pr-6">
                상담 방법을 선택해주세요
              </h2>

              <div className="flex flex-col gap-3">
                {/* 이메일 상담 버튼 */}
                <button
                  onClick={() => {
                    onClose()
                    onSelectEmail()
                  }}
                  className="w-full px-6 py-4 rounded-xl text-left transition-all hover:opacity-90"
                  style={{ backgroundColor: '#1B3B2F' }}
                >
                  <span className="block text-white font-semibold text-base">
                    첫 회 무료 이메일 상담받기
                  </span>
                  <span className="block text-sm text-white/50 mt-1">
                    이메일로 사건을 검토해드립니다
                  </span>
                </button>

                {/* 바로 상담 버튼 */}
                <a
                  href="https://www.latpeed.com/products/vy4Pu"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="w-full px-6 py-4 rounded-xl text-left transition-all hover:bg-gray-50 border-2"
                  style={{ borderColor: '#1B3B2F' }}
                >
                  <span
                    className="block font-semibold text-base"
                    style={{ color: '#1B3B2F' }}
                  >
                    바로 상담받기
                  </span>
                  <span className="block text-sm text-gray-400 mt-1">
                    전문 변호사와 즉시 상담합니다
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
