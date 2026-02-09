'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: '개인회생과 개인파산의 차이가 뭔가요?',
    answer:
      '개인회생은 소득이 있는 경우 3~5년간 일부를 변제하고 나머지를 탕감받는 제도입니다. 개인파산은 갚을 능력이 없는 경우 채무 전액을 면책받는 제도입니다. 상담을 통해 어떤 제도가 유리한지 정확히 진단해드립니다.',
  },
  {
    question: '회생·파산하면 직장을 잃나요?',
    answer:
      '일반 직장인은 영향이 없습니다. 다만 금융기관, 법무사, 공인중개사 등 일부 자격 제한 직종은 파산 시 제한이 있을 수 있으며, 이 경우 회생을 권유드립니다.',
  },
  {
    question: '집이나 차를 뺏기나요?',
    answer:
      '개인회생의 경우 재산을 유지하면서 진행 가능합니다. 파산의 경우에도 생활에 필수적인 재산은 보호됩니다. 구체적인 재산 보전 방안을 상담 시 안내해드립니다.',
  },
  {
    question: '신용이 회복되기까지 얼마나 걸리나요?',
    answer:
      '개인회생 인가 후 변제 완료 시, 개인파산 면책 결정 후 약 5년 이내에 신용이 회복됩니다. 로앤이는 면책 후 신용 회복 절차까지 안내해드립니다.',
  },
  {
    question: '빚독촉 전화가 너무 힘든데 바로 멈출 수 있나요?',
    answer:
      '회생·파산 신청서가 접수되면 법원의 금지명령으로 모든 채권 추심이 즉시 중단됩니다. 접수 전이라도 변호사 선임 사실을 통보하면 직접 연락을 차단할 수 있습니다.',
  },
]

function AccordionItem({ faq, index }: { faq: FAQ; index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="flex items-center gap-4">
          <span className="text-xs text-gray-300 font-medium tabular-nums">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-base font-medium text-black group-hover:text-gray-600 transition-colors">
            {faq.question}
          </span>
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex-shrink-0 ml-4 text-gray-400"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 pl-10 pr-10">
              <p className="text-sm text-gray-500 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQAccordion() {
  return (
    <section className="py-28 sm:py-40 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">
            FAQ
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-16">
            자주 묻는 질문
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <div className="border-t border-gray-200">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} faq={faq} index={i} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
