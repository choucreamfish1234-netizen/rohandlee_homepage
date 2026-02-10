'use client'

import { motion } from 'framer-motion'
import { EditableText } from '@/components/Editable'

const steps = [
  { num: '01', title: '상담', description: '전화·온라인으로 사건 개요를 파악합니다.' },
  { num: '02', title: '사건 분석', description: '증거와 법리를 면밀히 검토합니다.' },
  { num: '03', title: '증거 수집', description: '디지털 포렌식, 진술 조력 등을 진행합니다.' },
  { num: '04', title: '수사·재판', description: '수사 동행부터 법정 변론까지 전담합니다.' },
  { num: '05', title: '피해 회복', description: '합의금·배상금 회수로 일상을 되찾습니다.' },
]

export default function ProcessSection() {
  return (
    <section className="bg-white">
      <div className="max-w-5xl mx-auto px-6 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <p className="text-xs tracking-widest text-gray-400 uppercase mb-4">
            Process
          </p>
          <EditableText
            page="home"
            section="process"
            fieldKey="heading"
            defaultValue="수임부터 해결까지"
            tag="h2"
            className="text-3xl font-medium text-gray-900 tracking-tight mb-12 md:mb-16"
          />
        </motion.div>

        {/* Desktop: horizontal */}
        <div className="hidden md:grid md:grid-cols-5 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              className="relative"
            >
              {i < steps.length - 1 && (
                <div className="absolute top-3 left-[calc(50%+20px)] right-0 border-t border-dashed border-gray-200" />
              )}
              <span className="text-sm text-gray-300 font-mono">{step.num}</span>
              <EditableText
                page="home"
                section="process"
                fieldKey={`step-${i}-title`}
                defaultValue={step.title}
                tag="h3"
                className="mt-3 text-base font-medium text-gray-900"
              />
              <EditableText
                page="home"
                section="process"
                fieldKey={`step-${i}-desc`}
                defaultValue={step.description}
                tag="p"
                className="mt-2 text-sm text-gray-500 leading-relaxed"
              />
            </motion.div>
          ))}
        </div>

        {/* Mobile: vertical */}
        <div className="md:hidden space-y-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              className="flex gap-5"
            >
              <span className="text-sm text-gray-300 font-mono flex-shrink-0 pt-0.5">{step.num}</span>
              <div>
                <h3 className="text-base font-medium text-gray-900">{step.title}</h3>
                <p className="mt-1 text-sm text-gray-500 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
