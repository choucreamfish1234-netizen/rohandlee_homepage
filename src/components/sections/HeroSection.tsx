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
    <section className="-mt-16">
      {/* Image Slider */}
      <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
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
      </div>

      {/* Text below slider */}
      <div className="text-center px-6 py-16">
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-3xl md:text-5xl font-medium tracking-tight text-gray-900"
        >
          법률사무소 로앤이
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          className="text-sm text-gray-400 tracking-widest mt-3"
        >
          오직 피해자만 변호합니다
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
          className="text-lg text-gray-500 mt-6 leading-relaxed"
        >
          당신의 잃어버린 일상을 되찾을 때까지, 로앤이가 끝까지 함께 합니다.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65, ease: 'easeOut' }}
          className="mt-8"
        >
          <button
            onClick={() => openConsultation()}
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-base font-semibold bg-[#1B3B2F] text-white transition-all duration-300 hover:opacity-90 min-h-[48px]"
          >
            상담 신청하기
          </button>
        </motion.div>
      </div>
    </section>
  )
}
