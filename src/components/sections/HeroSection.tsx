'use client'

import { motion } from 'framer-motion'
import { useConsultation } from '@/components/ConsultationProvider'

export default function HeroSection() {
  const { openConsultation } = useConsultation()
  return (
    <section className="relative min-h-[100vh] flex flex-col items-center justify-center px-4 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-center max-w-4xl mx-auto"
      >
        <h1 className="font-inter text-[40px] font-bold tracking-[-0.04em] text-black leading-[1.2]">
          법률사무소 로앤이
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-8 text-lg sm:text-xl md:text-2xl text-accent font-serif font-medium tracking-wide"
        >
          &ldquo;오직 피해자만 변호합니다&rdquo;
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-6 text-base sm:text-lg text-gray-400 leading-relaxed"
        >
          당신의 잃어버린 일상을 되찾을 때까지,<br />
          로앤이가 끝까지 함께 합니다.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => openConsultation()}
            className="inline-flex items-center justify-center px-10 py-4 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all duration-300 hover:shadow-lg"
          >
            무료 상담 신청하기
          </button>
          <a
            href="tel:032-207-8788"
            className="inline-flex items-center justify-center px-10 py-4 border border-gray-200 text-sm font-medium rounded-full hover:border-gray-400 transition-all duration-300"
          >
            <span className="font-display">032-207-8788</span>
          </a>
        </motion.div>
      </motion.div>

      {/* 스크롤 인디케이터 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-gray-300 rounded-full flex items-start justify-center p-1.5"
        >
          <div className="w-1 h-2 bg-gray-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
