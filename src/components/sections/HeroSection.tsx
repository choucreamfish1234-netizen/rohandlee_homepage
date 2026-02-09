'use client'

import { motion } from 'framer-motion'
import { useConsultation } from '@/components/ConsultationProvider'

export default function HeroSection() {
  const { openConsultation } = useConsultation()
  return (
    <section
      className="relative min-h-[100vh] flex flex-col items-center justify-center px-4 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a1f17 0%, #1B3B2F 40%, #2d5a47 70%, #1B3B2F 100%)',
      }}
    >
      {/* Radial light effects */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 600px 400px at 30% 20%, rgba(201,169,110,0.08) 0%, transparent 70%), radial-gradient(ellipse 500px 500px at 70% 80%, rgba(45,90,71,0.3) 0%, transparent 70%), radial-gradient(ellipse 300px 300px at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 60%)',
        }}
      />

      {/* Subtle top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.3), transparent)' }}
      />

      <div className="text-center max-w-4xl mx-auto relative z-10">
        {/* English subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-xs tracking-[0.4em] uppercase mb-6"
          style={{ color: 'rgba(255,255,255,0.3)' }}
        >
          ROH &amp; LEE LAW FIRM
        </motion.p>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-inter text-[40px] sm:text-[52px] md:text-[60px] font-bold tracking-[-0.04em] leading-[1.15] text-white"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
        >
          법률사무소 로앤이
        </motion.h1>

        {/* Slogan with gold accent */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-8 text-lg sm:text-xl md:text-2xl font-medium tracking-wide"
          style={{ color: '#C9A96E', textShadow: '0 0 30px rgba(201,169,110,0.3)' }}
        >
          &ldquo;오직 피해자만 변호합니다&rdquo;
        </motion.p>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-6 mx-auto w-16 h-[1px]"
          style={{ background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)' }}
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-6 text-base sm:text-lg leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.55)', textShadow: '0 1px 8px rgba(0,0,0,0.2)' }}
        >
          당신의 잃어버린 일상을 되찾을 때까지,<br />
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
            className="inline-flex items-center justify-center px-10 py-4 text-sm font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#C9A96E]/20"
            style={{ background: 'linear-gradient(135deg, #C9A96E, #B8944F)', color: '#0a1f17' }}
          >
            무료 상담 신청하기
          </button>
          <a
            href="tel:032-207-8788"
            className="inline-flex items-center justify-center px-10 py-4 border text-sm font-medium rounded-full transition-all duration-300 hover:bg-white/10"
            style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)' }}
          >
            <span className="font-display">032-207-8788</span>
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
