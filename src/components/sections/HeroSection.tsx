'use client'

import { motion } from 'framer-motion'
import { useConsultation } from '@/components/ConsultationProvider'

export default function HeroSection() {
  const { openConsultation } = useConsultation()

  return (
    <section
      className="relative flex flex-col items-center justify-center px-4 overflow-hidden -mt-16"
      style={{ minHeight: '80vh', background: '#fafafa' }}
    >
      {/* Content */}
      <div className="text-center max-w-4xl mx-auto relative z-10 pt-16">
        {/* English subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-[10px] sm:text-xs tracking-[0.45em] uppercase mb-8"
          style={{ color: '#9CA3AF' }}
        >
          ROH &amp; LEE LAW FIRM
        </motion.p>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-[42px] sm:text-[56px] md:text-[64px] font-bold tracking-[-0.02em] leading-[1.1]"
          style={{ color: '#1B3B2F', fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
        >
          법률사무소 로앤이
        </motion.h1>

        {/* Slogan */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-8 text-lg sm:text-xl md:text-2xl font-medium tracking-wide italic"
          style={{ color: '#4B5563' }}
        >
          &ldquo;오직 피해자만 변호합니다&rdquo;
        </motion.p>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-7 mx-auto w-20 h-[1px]"
          style={{ background: '#D1D5DB' }}
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-7 text-base sm:text-lg leading-relaxed"
          style={{ color: '#6B7280' }}
        >
          당신의 잃어버린 일상을 되찾을 때까지,
          <br />
          로앤이가 끝까지 함께 합니다.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => openConsultation()}
            className="inline-flex items-center justify-center px-10 py-4 text-sm font-semibold rounded-full transition-all duration-300 hover:opacity-90 hover:shadow-lg"
            style={{ background: '#1B3B2F', color: '#ffffff' }}
          >
            무료 상담 신청하기
          </button>
          <a
            href="tel:032-207-8788"
            className="inline-flex items-center justify-center px-10 py-4 rounded-full text-sm font-medium transition-all duration-300 hover:bg-gray-100"
            style={{ border: '1px solid #1B3B2F', color: '#1B3B2F', background: 'transparent' }}
          >
            032-207-8788
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 rounded-full flex items-start justify-center p-1.5"
          style={{ borderColor: '#D1D5DB' }}
        >
          <div className="w-1 h-2 rounded-full" style={{ background: '#9CA3AF' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}
