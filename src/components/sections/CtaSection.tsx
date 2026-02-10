'use client'

import { motion } from 'framer-motion'
import { useConsultation } from '@/components/ConsultationProvider'
import { EditableText } from '@/components/Editable'

export default function CtaSection() {
  const { openConsultation } = useConsultation()

  return (
    <section className="bg-[#1B3B2F]">
      <div className="max-w-3xl mx-auto px-6 py-20 md:py-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <EditableText
            page="home"
            section="cta"
            fieldKey="title"
            defaultValue="혼자 힘들지 마세요."
            tag="h2"
            className="text-3xl font-medium text-white tracking-tight"
          />
          <EditableText
            page="home"
            section="cta"
            fieldKey="description"
            defaultValue="지금 전문가와 이야기하세요."
            tag="p"
            className="mt-3 text-gray-400"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="mt-8"
        >
          <button
            onClick={() => openConsultation()}
            className="inline-flex items-center justify-center bg-white text-[#1B3B2F] rounded-full px-8 py-3.5 text-sm font-medium hover:bg-gray-100 transition-colors duration-200"
          >
            상담 신청하기
          </button>
          <p className="mt-4 text-sm text-white/50">032-207-8788</p>
        </motion.div>
      </div>
    </section>
  )
}
