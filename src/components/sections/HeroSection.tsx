'use client'

import { motion } from 'framer-motion'
import { useConsultation } from '@/components/ConsultationProvider'
import { EditableText } from '@/components/Editable'

export default function HeroSection() {
  const { openConsultation } = useConsultation()

  return (
    <section
      className="relative flex flex-col items-center justify-center px-4 overflow-hidden -mt-16"
      style={{ minHeight: '80vh', background: '#f9f9f9' }}
    >
      <div className="text-center max-w-4xl mx-auto relative z-10 pt-16">
        {/* Main title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <EditableText
            page="home"
            section="hero"
            fieldKey="title"
            defaultValue="법률사무소 로앤이"
            tag="h1"
            style={{ color: '#111', fontWeight: 700, fontSize: '2rem' }}
          />
        </motion.div>

        {/* Slogan */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{ marginTop: '16px' }}
        >
          <EditableText
            page="home"
            section="hero"
            fieldKey="slogan"
            defaultValue={'\u201c오직 피해자만 변호합니다\u201d'}
            tag="p"
            style={{ color: '#888', fontWeight: 400, fontSize: '1.25rem' }}
          />
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{ marginTop: '24px' }}
        >
          <EditableText
            page="home"
            section="hero"
            fieldKey="description"
            defaultValue="당신의 잃어버린 일상을 되찾을 때까지, 로앤이가 끝까지 함께 합니다."
            tag="p"
            style={{ color: '#333', fontWeight: 500, fontSize: '1.5rem', lineHeight: 1.6 }}
          />
        </motion.div>

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
            style={{ background: '#1B3B2F', color: '#fff' }}
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
    </section>
  )
}
