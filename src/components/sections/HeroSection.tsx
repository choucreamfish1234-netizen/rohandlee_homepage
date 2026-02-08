'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

function useCountUp(end: number, duration = 2000) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const startTime = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress >= 1) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [started, end, duration])

  return { count, ref }
}

function StatItem({ label, end, suffix, isDecimal }: { label: string; end: number; suffix: string; isDecimal?: boolean }) {
  const { count, ref } = useCountUp(end, 2200)

  return (
    <div className="text-center">
      <span ref={ref} className="block text-2xl sm:text-3xl md:text-4xl font-bold text-black tracking-tight">
        {isDecimal ? (count / 10).toFixed(1) : count}
        {suffix}
      </span>
      <span className="block mt-2 text-[11px] sm:text-xs text-gray-400">{label}</span>
    </div>
  )
}

export default function HeroSection() {
  return (
    <section className="relative min-h-[100vh] flex flex-col items-center justify-center px-4 bg-gradient-to-b from-white via-white to-gray-50">
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
          className="mt-6 text-xl sm:text-2xl md:text-3xl text-accent font-medium tracking-wide"
        >
          &ldquo;오직 피해자만 변호합니다&rdquo;
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-5 text-base sm:text-lg text-gray-400 leading-relaxed"
        >
          당신의 잃어버린 일상을 되찾을 때까지,<br />
          로앤이가 끝까지 함께 합니다.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/consultation"
            className="inline-flex items-center justify-center px-10 py-4 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all duration-300 hover:shadow-lg"
          >
            무료 상담 신청하기
          </Link>
          <a
            href="tel:055-261-8788"
            className="inline-flex items-center justify-center px-10 py-4 border border-gray-200 text-sm font-medium rounded-full hover:border-gray-400 transition-all duration-300"
          >
            055-261-8788
          </a>
        </motion.div>
      </motion.div>

      {/* 통계 카운트업 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-20 left-0 right-0"
      >
        <div className="max-w-2xl mx-auto px-4">
          <div className="grid grid-cols-4 gap-4">
            <StatItem label="의뢰인 수" end={100} suffix="+" />
            <StatItem label="로톡 평점" end={49} suffix="" isDecimal />
            <StatItem label="감사 후기" end={600} suffix="+" />
            <div className="text-center">
              <span className="block text-2xl sm:text-3xl md:text-4xl font-bold text-black tracking-tight">
                A-Z
              </span>
              <span className="block mt-2 text-[11px] sm:text-xs text-gray-400">전 과정 변호</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 스크롤 인디케이터 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
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
