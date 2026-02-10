'use client'

import { motion } from 'framer-motion'
import { EditableText } from '@/components/Editable'

export default function DeclarationSection() {
  return (
    <section className="bg-white">
      <div className="max-w-3xl mx-auto px-6 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <p className="text-xs tracking-widest text-gray-400 uppercase mb-6">
            Why Roh & Lee
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        >
          <EditableText
            page="home"
            section="declaration"
            fieldKey="title"
            defaultValue="가해자는 변호하지 않습니다."
            tag="h2"
            className="text-3xl md:text-4xl font-medium text-gray-900 tracking-tight"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        >
          <EditableText
            page="home"
            section="declaration"
            fieldKey="description"
            defaultValue="로앤이는 설립 이래 단 한 번도 가해자를 변호한 적이 없습니다. 피해자의 편에서만 싸우고, 피해자의 목소리에만 귀 기울입니다."
            tag="p"
            className="mt-6 text-base text-gray-500 leading-relaxed max-w-2xl"
          />
        </motion.div>
      </div>
    </section>
  )
}
