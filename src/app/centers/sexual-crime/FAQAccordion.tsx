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
    question: '증거가 부족해도 고소할 수 있나요?',
    answer:
      '네, 가능합니다. 직접적인 증거가 없더라도 정황 증거, 카카오톡 대화, CCTV 등을 활용하여 사건을 입증할 수 있습니다. 로앤이는 증거 수집 단계부터 함께합니다.',
  },
  {
    question: '고소하면 제 신원이 가해자에게 노출되나요?',
    answer:
      '성범죄 피해자의 신원은 법적으로 보호됩니다. 수사 및 재판 과정에서 피해자 신원 비공개를 철저히 요청하며, 필요시 영상 증인 신문 등을 활용합니다.',
  },
  {
    question: '가해자가 합의를 요청하면 어떻게 하나요?',
    answer:
      '합의 여부는 전적으로 피해자의 선택입니다. 로앤이는 합의가 피해자에게 유리한지 면밀히 분석하고, 합의할 경우 최대한의 금액과 조건을 이끌어냅니다.',
  },
  {
    question: '상담 내용이 외부에 알려지지 않나요?',
    answer:
      '변호사에게는 법적 비밀유지 의무가 있습니다. 상담 내용은 절대 외부에 공개되지 않으며, 의뢰인의 프라이버시를 최우선으로 보호합니다.',
  },
  {
    question: '피해자 국선변호사와 사선변호사의 차이가 뭔가요?',
    answer:
      '국선변호사는 국가가 지정하지만 사건 선택이 불가합니다. 사선변호사는 피해자가 직접 선임하여 더 적극적이고 맞춤형 변호를 받을 수 있습니다. 로앤이는 피해자 전문 사선변호사로서 A-Z 전 과정을 책임집니다.',
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
