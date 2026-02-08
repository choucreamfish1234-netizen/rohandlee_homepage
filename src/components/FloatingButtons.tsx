'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FloatingButtons() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const kakaoChannelId = process.env.NEXT_PUBLIC_KAKAO_CHANNEL_ID

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col gap-3"
        >
          {/* 카카오톡 상담 */}
          <a
            href={`https://pf.kakao.com/${kakaoChannelId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 bg-[#FEE500] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
            aria-label="카카오톡 상담"
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path
                d="M14 4C8.477 4 4 7.477 4 11.667c0 2.7 1.737 5.067 4.36 6.433-.14.507-.9 3.267-.933 3.5 0 0-.02.167.087.233.107.067.233.033.233.033.307-.043 3.56-2.327 4.12-2.733.7.1 1.413.2 2.133.2 5.523 0 10-3.477 10-7.667S19.523 4 14 4z"
                fill="#3C1E1E"
              />
            </svg>
          </a>

          {/* 전화 상담 */}
          <a
            href="tel:055-261-8788"
            className="w-14 h-14 bg-black rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
            aria-label="전화 상담"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </a>

          {/* 스크롤 투 탑 */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-14 h-14 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
            aria-label="맨 위로"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 16V4M10 4L5 9M10 4L15 9" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
