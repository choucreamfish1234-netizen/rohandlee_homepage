'use client'

import { motion } from 'framer-motion'
import { useConsultation } from '@/components/ConsultationProvider'

export default function HeroSection() {
  const { openConsultation } = useConsultation()

  return (
    <section
      className="relative flex flex-col items-center justify-center px-4 overflow-hidden -mt-16"
      style={{
        minHeight: '80vh',
        background: 'linear-gradient(135deg, #0a1f17 0%, #1B3B2F 40%, #2d5a47 70%, #1B3B2F 100%)',
      }}
    >
      {/* Radial light overlays for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse 700px 500px at 25% 15%, rgba(201,169,110,0.07) 0%, transparent 70%)',
            'radial-gradient(ellipse 600px 600px at 75% 85%, rgba(45,90,71,0.35) 0%, transparent 70%)',
            'radial-gradient(ellipse 400px 400px at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 60%)',
            'radial-gradient(ellipse 800px 300px at 50% 0%, rgba(27,59,47,0.5) 0%, transparent 70%)',
          ].join(', '),
        }}
      />

      {/* Subtle top gold accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent 10%, rgba(201,169,110,0.4) 50%, transparent 90%)' }}
      />

      {/* Content */}
      <div className="text-center max-w-4xl mx-auto relative z-10 pt-16">
        {/* English subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-[10px] sm:text-xs tracking-[0.45em] uppercase mb-8"
          style={{ color: 'rgba(255,255,255,0.35)' }}
        >
          ROH &amp; LEE LAW FIRM
        </motion.p>

        {/* Main title - Noto Serif KR */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-serif text-[42px] sm:text-[56px] md:text-[64px] font-bold tracking-[-0.02em] leading-[1.1] text-white"
          style={{ textShadow: '0 2px 30px rgba(0,0,0,0.4)' }}
        >
          법률사무소 로앤이
        </motion.h1>

        {/* Slogan - gold */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-8 text-lg sm:text-xl md:text-2xl font-medium tracking-wide"
          style={{ color: '#C9A96E', textShadow: '0 0 40px rgba(201,169,110,0.25)' }}
        >
          &ldquo;오직 피해자만 변호합니다&rdquo;
        </motion.p>

        {/* Gold divider line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-7 mx-auto w-20 h-[1px]"
          style={{ background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)' }}
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-7 text-base sm:text-lg leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.7)', textShadow: '0 1px 10px rgba(0,0,0,0.2)' }}
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
          {/* White CTA button */}
          <button
            onClick={() => openConsultation()}
            className="inline-flex items-center justify-center px-10 py-4 bg-white text-[#1B3B2F] text-sm font-semibold rounded-full transition-all duration-300 hover:bg-white/90 hover:shadow-lg hover:shadow-white/10"
          >
            무료 상담 신청하기
          </button>
          {/* White border phone button */}
          <a
            href="tel:032-207-8788"
            className="inline-flex items-center justify-center px-10 py-4 border rounded-full text-sm font-medium transition-all duration-300 hover:bg-white/10"
            style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.9)' }}
          >
            <span className="font-display tracking-wide">032-207-8788</span>
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
          style={{ borderColor: 'rgba(255,255,255,0.2)' }}
        >
          <div className="w-1 h-2 rounded-full" style={{ background: 'rgba(201,169,110,0.5)' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}
