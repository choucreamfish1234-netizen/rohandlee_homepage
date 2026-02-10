'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { EditableText } from '@/components/Editable'

const cases = [
  {
    category: '보이스피싱',
    title: '보이스피싱 현금 수거책, 경찰 단계 불송치',
    description: '치밀한 무죄 변론으로 경찰 단계에서 불송치 결정을 이끌어냈습니다.',
    result: '불송치(무죄)',
  },
  {
    category: '성범죄',
    title: '특수강간·감금 등 9개 혐의',
    description: '구속 수사 관철, 집요한 서면 제출로 엄벌을 이끌어냈습니다.',
    result: '징역 8년',
  },
  {
    category: '전세사기',
    title: '전세보증금 3억 원 전액 회수',
    description: '긴급 가압류 신청과 민·형사 병행으로 보증금 전액을 회수했습니다.',
    result: '전액 회수',
  },
  {
    category: '스토킹',
    title: '지속적 스토킹 행위, 접근금지 명령',
    description: '피해자 보호명령 신청과 함께 가해자에 대한 엄벌을 이끌어냈습니다.',
    result: '실형 선고',
  },
]

export default function CasesSection() {
  return (
    <section className="bg-[#FAFAFA]">
      <div className="max-w-5xl mx-auto px-6 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <p className="text-xs tracking-widest text-gray-400 uppercase mb-4">
            Case Results
          </p>
          <EditableText
            page="home"
            section="cases"
            fieldKey="heading"
            defaultValue="결과로 증명합니다"
            tag="h2"
            className="text-3xl font-medium text-gray-900 tracking-tight mb-12 md:mb-16"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
            >
              <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
                <span className="text-xs text-gray-400">{c.category}</span>
                <EditableText
                  page="home"
                  section="cases"
                  fieldKey={`case-${i}-title`}
                  defaultValue={c.title}
                  tag="h3"
                  className="mt-2 text-lg font-medium text-gray-900"
                />
                <EditableText
                  page="home"
                  section="cases"
                  fieldKey={`case-${i}-desc`}
                  defaultValue={c.description}
                  tag="p"
                  className="mt-2 text-sm text-gray-500 leading-relaxed flex-1"
                />
                <p className="mt-4 text-sm font-medium text-[#1B3B2F]">{c.result}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
          className="mt-10 text-center"
        >
          <Link
            href="/cases"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            성공사례 더보기 &rarr;
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
