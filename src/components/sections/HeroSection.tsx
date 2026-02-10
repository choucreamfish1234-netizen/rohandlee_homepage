'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useConsultation } from '@/components/ConsultationProvider'

const heroImages = ['/hero/hero-1.jpg', '/hero/hero-2.jpg']

const SLIDE_DURATION = 5000 // 5s per slide
const FADE_DURATION = 1.2

export default function HeroSection() {
  const { openConsultation } = useConsultation()
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroImages.length)
  }, [])

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, SLIDE_DURATION)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden -mt-16">
      {/* Slides */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_DURATION, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[current]}
              alt="법률사무소 로앤이"
              fill
              priority={current === 0}
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Dark overlay + bottom gradient */}
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />

      {/* Text overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Badge */}
          <span className="inline-block border border-white/40 rounded-full px-4 py-1.5 text-xs sm:text-sm text-white/90 tracking-wider mb-5">
            오직 피해자만 변호합니다
          </span>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight"
          >
            법률사무소 로앤이
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
            className="mt-4 text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-[320px] sm:max-w-none mx-auto"
          >
            당신의 잃어버린 일상을 되찾을 때까지, 로앤이가 끝까지 함께 합니다.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65, ease: 'easeOut' }}
            className="flex justify-center mt-8"
          >
            <button
              onClick={() => openConsultation()}
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-base font-semibold bg-white text-[#1B3B2F] transition-all duration-300 hover:bg-white/90 min-h-[48px]"
            >
              상담 신청하기
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {heroImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            aria-label={`슬라이드 ${idx + 1}`}
            className={`transition-all duration-300 rounded-full ${
              idx === current
                ? 'w-6 h-2 bg-white'
                : 'w-2 h-2 bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
