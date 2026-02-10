'use client'

import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'

const tags = [
  '스토킹',
  '데이트폭력',
  '가정폭력',
  '디지털성범죄',
  '몰카',
  '딥페이크',
  '동물학대',
  '학교폭력',
  '접근금지',
  '투자리딩방사기',
  '보이스피싱',
  '업무상횡령',
  '명예훼손',
  '협박공갈',
  '무고대응',
]

const tagVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.03 * i, duration: 0.4 },
  }),
}

export default function TagsSection() {
  return (
    <section className="py-12 sm:py-20 bg-[#f5f8f6]">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-4">
            Practice Areas
          </p>
          <h2 className="text-xl sm:text-3xl font-bold text-black mb-8 sm:mb-14">
            기타 전문 분야
          </h2>
        </ScrollReveal>

        <div className="flex flex-wrap justify-center gap-3">
          {tags.map((tag, i) => (
            <motion.span
              key={tag}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={tagVariants}
              whileHover={{
                scale: 1.05,
                backgroundColor: '#1B3B2F',
                color: '#ffffff',
                borderColor: '#1B3B2F',
              }}
              className="px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm text-gray-600 cursor-default transition-shadow duration-300 hover:shadow-md"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}
