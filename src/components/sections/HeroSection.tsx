'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useConsultation } from '@/components/ConsultationProvider'

const heroImages = ['/hero/hero-1.jpg', '/hero/hero-2.jpg']

const SLIDE_DURATION = 5000

export default function HeroSection() {
  const { openConsultation } = useConsultation()
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroImages.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, SLIDE_DURATION)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section className="bg-white pt-0 pb-16 md:pb-24 -mt-16">
      {/* 1. Image Slider */}
      <div className="w-full h-[40vh] md:h-[55vh] relative overflow-hidden">
        {heroImages.map((src, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentIndex === i ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt="법률사무소 로앤이"
              className="w-full h-full object-cover"
              style={{
                transform: currentIndex === i ? 'scale(1.03)' : 'scale(1)',
                transition: 'transform 5s ease-out',
              }}
            />
          </div>
        ))}

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`슬라이드 ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                currentIndex === i ? 'bg-white w-6' : 'bg-white/40 w-1.5'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 2. Text below slider */}
      <div className="text-center px-4 mt-12 md:mt-16">
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-2xl md:text-4xl font-medium tracking-tight text-gray-900"
        >
          법률사무소 로앤이
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          className="text-sm text-gray-400 mt-2"
        >
          &ldquo;오직 피해자만 변호합니다&rdquo;
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
          className="text-base md:text-lg text-gray-500 mt-6 leading-relaxed"
        >
          당신의 잃어버린 일상을 되찾을 때까지,<br />
          로앤이가 끝까지 함께 합니다.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65, ease: 'easeOut' }}
          className="mt-6"
        >
          <button
            onClick={() => openConsultation()}
            className="bg-[#1B3B2F] text-white rounded-full px-6 py-3 text-sm font-medium hover:bg-[#152f25] transition"
          >
            상담 신청하기
          </button>
        </motion.div>
      </div>
    </section>
  )
}
