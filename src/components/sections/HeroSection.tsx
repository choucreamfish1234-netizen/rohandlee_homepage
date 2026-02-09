'use client'

import { motion } from 'framer-motion'
import { useConsultation } from '@/components/ConsultationProvider'

export default function HeroSection() {
  const { openConsultation } = useConsultation()

  return (
    <section
      className="relative flex flex-col items-center justify-center px-4 overflow-hidden -mt-16"
      style={{ minHeight: '80vh', background: '#f9f9f9' }}
    >
      <div className="text-center max-w-4xl mx-auto relative z-10 pt-16">
        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{ color: '#111', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '2rem' }}
        >
          법률사무소 로앤이
        </motion.h1>

        {/* Slogan */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{ color: '#888', fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '1.25rem', marginTop: '16px' }}
        >
          &ldquo;오직 피해자만 변호합니다&rdquo;
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{ color: '#333', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '1.5rem', marginTop: '24px', lineHeight: 1.6 }}
        >
          당신의 잃어버린 일상을 되찾을 때까지,
          <br />
          로앤이가 끝까지 함께 합니다.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
          style={{ marginTop: '40px' }}
        >
          <button
            onClick={() => openConsultation()}
            className="inline-flex items-center justify-center px-10 py-4 rounded-full text-sm font-semibold transition-all duration-300 hover:opacity-90"
            style={{ background: '#1B3B2F', color: '#fff', fontFamily: 'Inter, sans-serif' }}
          >
            무료 상담 신청하기
          </button>
          <a
            href="tel:032-207-8788"
            className="inline-flex items-center justify-center px-10 py-4 rounded-full text-sm font-medium transition-all duration-300 hover:bg-gray-100"
            style={{ border: '1px solid #1B3B2F', color: '#1B3B2F', background: 'transparent', fontFamily: 'Inter, sans-serif' }}
          >
            032-207-8788
          </a>
        </motion.div>
      </div>
    </section>
  )
}
