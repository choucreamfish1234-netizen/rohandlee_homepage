'use client'

import { motion } from 'framer-motion'
import { useConsultation } from '@/components/ConsultationProvider'
import { EditableText } from '@/components/Editable'

export default function HeroSection() {
  const { openConsultation } = useConsultation()

  return (
    <section className="bg-white">
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-24 md:pt-48 md:pb-36 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <span className="inline-block border border-gray-200 rounded-full px-4 py-1.5 text-xs text-gray-500 mb-8">
            오직 피해자만 변호합니다
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        >
          <EditableText
            page="home"
            section="hero"
            fieldKey="title"
            defaultValue={'당신의 잃어버린 일상을\n되찾을 때까지'}
            tag="h1"
            className="text-4xl md:text-5xl font-medium tracking-tight text-gray-900 leading-[1.15] whitespace-pre-line"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        >
          <EditableText
            page="home"
            section="hero"
            fieldKey="description"
            defaultValue="성범죄·재산범죄 피해자 전문 법률사무소"
            tag="p"
            className="text-lg text-gray-400 mt-6"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-10"
        >
          <button
            onClick={() => openConsultation()}
            className="w-full sm:w-auto inline-flex items-center justify-center bg-[#1B3B2F] text-white rounded-full px-8 py-3.5 text-sm font-medium hover:bg-[#162f25] transition-colors duration-200"
          >
            상담 신청하기
          </button>
          <a
            href="tel:032-207-8788"
            className="w-full sm:w-auto inline-flex items-center justify-center border border-gray-200 text-gray-700 rounded-full px-8 py-3.5 text-sm font-medium hover:bg-gray-50 transition-colors duration-200"
          >
            032-207-8788
          </a>
        </motion.div>
      </div>
    </section>
  )
}
