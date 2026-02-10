'use client'

import { motion } from 'framer-motion'
import { useConsultation } from '@/components/ConsultationProvider'
import { EditableText } from '@/components/Editable'

export default function HeroSection() {
  const { openConsultation } = useConsultation()

  return (
    <section
      className="relative flex flex-col items-center justify-center px-6 sm:px-8 overflow-hidden -mt-16"
      style={{
        minHeight: '80vh',
        background: 'linear-gradient(135deg, rgba(27,59,47,0.03) 0%, rgba(27,59,47,0.06) 50%, rgba(255,255,255,1) 100%)',
      }}
    >
      {/* Geometric pattern SVG background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 0L60 30L30 60L0 30Z" fill="none" stroke="#1B3B2F" strokeWidth="0.5" opacity="0.04" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-pattern)" />
        </svg>
      </div>

      <div className="text-center max-w-4xl mx-auto relative z-10 pt-16">
        {/* Badge / Slogan - fade-in, delay 0 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <EditableText
            page="home"
            section="hero"
            fieldKey="slogan"
            defaultValue={'\u201c오직 피해자만 변호합니다\u201d'}
            tag="p"
            className="text-base sm:text-xl text-gray-500"
          />
        </motion.div>

        {/* Main copy line 1 - fade-in-up, delay 0.2 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          className="mt-4"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-black">
            법률사무소 로앤이
          </h1>
          <EditableText
            page="home"
            section="hero"
            fieldKey="title"
            defaultValue="법률사무소 로앤이"
            tag="span"
            className="sr-only"
          />
        </motion.div>

        {/* Main copy line 2 - fade-in-up, delay 0.35 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
          className="mt-6"
        >
          <EditableText
            page="home"
            section="hero"
            fieldKey="description"
            defaultValue="당신의 잃어버린 일상을 되찾을 때까지, 로앤이가 끝까지 함께 합니다."
            tag="p"
            className="text-lg sm:text-2xl font-medium text-gray-800 leading-relaxed max-w-[320px] sm:max-w-none mx-auto"
          />
        </motion.div>

        {/* CTA Buttons - fade-in-up, delay 0.65 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10"
        >
          <button
            onClick={() => openConsultation()}
            className="group w-full max-w-[280px] sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300 hover:opacity-90 min-h-[48px] relative"
            style={{ background: '#1B3B2F', color: '#fff' }}
          >
            <span className="absolute inset-0 rounded-xl animate-pulse-shadow" />
            <span className="relative z-10">상담 신청하기</span>
          </button>
          <a
            href="tel:032-207-8788"
            className="w-full max-w-[280px] sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-medium transition-all duration-300 hover:bg-gray-100 min-h-[48px]"
            style={{ border: '1px solid #1B3B2F', color: '#1B3B2F', background: 'transparent' }}
          >
            032-207-8788
          </a>
        </motion.div>
      </div>

    </section>
  )
}
