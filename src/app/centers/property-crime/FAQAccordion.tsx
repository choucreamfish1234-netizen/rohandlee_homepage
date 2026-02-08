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
    question: '사기 피해를 당했는데 돈을 돌려받을 수 있나요?',
    answer:
      '가능합니다. 가해자의 재산을 추적하고 가압류를 통해 재산 은닉을 차단한 후, 민사소송과 강제집행으로 피해금을 회수합니다. 신속한 대응이 회수율을 높이는 핵심입니다.',
  },
  {
    question: '가해자가 재산을 숨기면 어떻게 하나요?',
    answer:
      '재산조회 신청, 금융거래 추적, 부동산 등기 확인 등을 통해 은닉 재산을 추적합니다. 필요시 사해행위취소 소송으로 빼돌린 재산도 원상회복시킵니다.',
  },
  {
    question: '고소와 민사소송을 동시에 진행할 수 있나요?',
    answer:
      '네, 동시에 진행하는 것이 가장 효과적입니다. 형사 고소로 처벌 압박을 가하면서 민사소송으로 손해배상을 청구하면 합의 가능성과 회수율이 모두 높아집니다.',
  },
  {
    question: '보이스피싱 피해도 돈을 돌려받을 수 있나요?',
    answer:
      '피해 즉시 은행에 지급정지를 요청하고, 피해구제 신청을 통해 동결된 금액을 환급받을 수 있습니다. 로앤이는 추가적인 민사적 구제 방안까지 함께 진행합니다.',
  },
  {
    question: '횡령·배임은 어떻게 대응하나요?',
    answer:
      '회사 내부 자료, 회계 기록, 이메일 등 증거를 확보한 후 고소장을 접수합니다. 동시에 횡령금에 대한 가압류를 진행하여 재산 회수의 실효성을 확보합니다.',
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
