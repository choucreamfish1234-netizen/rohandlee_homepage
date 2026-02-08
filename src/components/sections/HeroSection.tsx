'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center max-w-3xl mx-auto"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-black leading-tight">
          법률사무소 로앤이
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-accent font-medium">
          &ldquo;오직 피해자만 변호합니다&rdquo;
        </p>

        <p className="mt-4 text-base sm:text-lg text-gray-500 leading-relaxed">
          당신의 잃어버린 일상을 되찾을 때까지,<br />
          로앤이가 끝까지 함께 합니다.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/consultation"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
          >
            무료 상담 신청하기
          </Link>
          <a
            href="tel:055-261-8788"
            className="inline-flex items-center justify-center px-8 py-3.5 border border-gray-200 text-sm font-medium rounded-full hover:border-gray-400 transition-colors"
          >
            055-261-8788
          </a>
        </div>
      </motion.div>

      {/* 스크롤 인디케이터 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-gray-300 rounded-full flex items-start justify-center p-1.5"
        >
          <div className="w-1 h-2 bg-gray-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
