'use client'

import { useState } from 'react'
import ScrollReveal from '@/components/ScrollReveal'
import { useConsultation } from '@/components/ConsultationProvider'

const AGE_RANGES = ['0~2세', '3~5세', '6~11세', '12~14세', '15~18세']
const BASE_AMOUNTS: Record<string, number> = { '0~2세': 60, '3~5세': 65, '6~11세': 70, '12~14세': 80, '15~18세': 90 }

export default function ChildSupportCalc() {
  const { openConsultation } = useConsultation()
  const [age, setAge] = useState('6~11세')
  const [children, setChildren] = useState(1)
  const [custodialIncome, setCustodialIncome] = useState('')
  const [nonCustodialIncome, setNonCustodialIncome] = useState('')
  const [result, setResult] = useState<{ min: number; max: number } | null>(null)

  function calculate() {
    const base = BASE_AMOUNTS[age] || 70
    const ci = parseInt(custodialIncome) || 0
    const nci = parseInt(nonCustodialIncome) || 0
    const totalIncome = ci + nci
    if (totalIncome === 0) { setResult(null); return }
    const ratio = nci / totalIncome
    const perChild = Math.round(base * ratio * 1.2)
    const total = perChild * children
    setResult({ min: Math.round(total * 0.85), max: Math.round(total * 1.15) })
  }

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">Calculator</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-3">양육비, 얼마를 받을 수 있을까요?</h2>
          <p className="text-center text-sm text-gray-500 mb-10">서울가정법원 양육비 산정 기준표를 참고한 예상치입니다</p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 space-y-5">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">자녀 나이</label>
              <select value={age} onChange={e => setAge(e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 text-sm rounded-lg focus:outline-none focus:border-[#1B3B2F] bg-white">
                {AGE_RANGES.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">자녀 수</label>
              <div className="flex gap-2">
                {[1, 2, 3].map(n => (
                  <button key={n} onClick={() => setChildren(n)} className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors ${children === n ? 'bg-[#1B3B2F] text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>
                    {n === 3 ? '3명 이상' : `${n}명`}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">양육자 월소득 (만원)</label>
                <input type="number" value={custodialIncome} onChange={e => setCustodialIncome(e.target.value)} placeholder="300" className="w-full px-3 py-2.5 border border-gray-200 text-sm rounded-lg focus:outline-none focus:border-[#1B3B2F]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">비양육자 월소득 (만원)</label>
                <input type="number" value={nonCustodialIncome} onChange={e => setNonCustodialIncome(e.target.value)} placeholder="400" className="w-full px-3 py-2.5 border border-gray-200 text-sm rounded-lg focus:outline-none focus:border-[#1B3B2F]" />
              </div>
            </div>
            <button onClick={calculate} className="w-full py-3 bg-[#1B3B2F] text-white text-sm font-medium rounded-lg hover:bg-[#1B3B2F]/90 transition-colors min-h-[48px]">
              예상 양육비 확인
            </button>

            {result && (
              <div className="bg-white rounded-xl p-5 text-center border border-[#1B3B2F]/20">
                <p className="text-sm text-gray-500 mb-2">월 예상 양육비</p>
                <p className="text-2xl sm:text-3xl font-bold text-[#1B3B2F]">약 {result.min}만원 ~ {result.max}만원</p>
                <p className="text-xs text-gray-400 mt-3 leading-relaxed">이 금액은 서울가정법원 양육비 산정 기준표를 참고한 예상치이며, 실제 양육비는 구체적 사정에 따라 달라질 수 있습니다.</p>
                <button onClick={() => openConsultation('양육비 상담')} className="mt-4 text-sm text-[#1B3B2F] font-medium hover:underline py-2">
                  정확한 산정이 필요하시면 상담을 신청하세요 &rarr;
                </button>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
