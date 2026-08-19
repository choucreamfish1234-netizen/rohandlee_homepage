'use client'

import { useState } from 'react'
import ScrollReveal from '@/components/ScrollReveal'
import { useConsultation } from '@/components/ConsultationProvider'

const questions = [
  '상대방이 내 휴대폰을 검사하거나 비밀번호를 요구한다',
  '누구를 만나는지, 어디에 있는지 항상 보고해야 한다',
  '상대방이 화가 나면 물건을 던지거나 벽을 친다',
  '상대방이 나를 때리거나 밀치거나 팔을 잡아끈 적이 있다',
  '헤어지자고 하면 자해하겠다고 협박한다',
  '"네가 그렇게 행동하니까 내가 화가 나는 거다"라고 말한다',
  '친구나 가족을 만나는 것을 싫어하거나 금지한다',
  '내 돈을 관리하려 하거나 경제적으로 통제한다',
  '모욕적인 말, 외모 비하, 인격 모독을 한다',
  '사과 후에 극진히 잘해주지만 같은 행동이 반복된다',
]

const results = [
  { range: [0, 2], level: '주의 단계', color: 'text-yellow-700', bg: 'bg-yellow-50 border-yellow-200', message: '아직 심각하지 않을 수 있지만, 통제적 행동의 시작일 수 있습니다. 주변에 이야기하고 상황을 관찰하세요.' },
  { range: [3, 5], level: '경고 단계', color: 'text-orange-700', bg: 'bg-orange-50 border-orange-200', message: '데이트폭력의 전형적인 패턴이 나타나고 있습니다. 증거를 수집하고 전문가 상담을 받으세요. 이 단계에서 벗어나지 않으면 악화됩니다.' },
  { range: [6, 10], level: '위험 단계', color: 'text-red-700', bg: 'bg-red-50 border-red-200', message: '심각한 데이트폭력 상황입니다. 안전을 최우선으로 확보하세요. 법적 보호(접근금지, 형사 고소)가 필요합니다. 지금 바로 상담하세요.' },
]

export default function DatingViolenceDiagnosis() {
  const [checked, setChecked] = useState<boolean[]>(new Array(questions.length).fill(false))
  const [showResult, setShowResult] = useState(false)
  const { openConsultation } = useConsultation()

  const count = checked.filter(Boolean).length

  const getResult = () => {
    return results.find(r => count >= r.range[0] && count <= r.range[1]) || results[0]
  }

  const toggle = (index: number) => {
    const next = [...checked]
    next[index] = !next[index]
    setChecked(next)
    setShowResult(false)
  }

  const result = getResult()

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">Self-Check</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-3">데이트폭력 자가진단</h2>
          <p className="text-center text-sm text-gray-500 mb-10">해당되는 항목에 체크하세요.</p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="space-y-3">
            {questions.map((q, i) => (
              <button
                key={i}
                onClick={() => toggle(i)}
                className={`w-full flex items-start gap-3 text-left p-4 rounded-lg border transition-colors ${
                  checked[i] ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-100 hover:border-gray-200'
                }`}
              >
                <span className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center transition-colors ${
                  checked[i] ? 'bg-red-500 border-red-500' : 'border-gray-300'
                }`}>
                  {checked[i] && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
                <span className="text-sm text-gray-700">{q}</span>
              </button>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => setShowResult(true)}
              className="inline-flex items-center justify-center px-8 py-3 bg-[#1B3B2F] text-white text-sm font-medium rounded-full hover:bg-[#153126] transition-colors"
            >
              결과 확인하기
            </button>
          </div>

          {showResult && (
            <div className={`mt-6 border rounded-xl p-6 ${result.bg}`}>
              <div className="flex items-center gap-3 mb-3">
                <span className={`text-lg font-bold ${result.color}`}>{count}/10</span>
                <span className={`text-sm font-bold ${result.color}`}>{result.level}</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">{result.message}</p>
              {count >= 3 && (
                <button
                  onClick={() => openConsultation('데이트폭력 피해 상담')}
                  className="inline-flex items-center justify-center px-6 py-2.5 bg-[#1B3B2F] text-white text-sm font-medium rounded-full hover:bg-[#153126] transition-colors"
                >
                  상담 신청하기
                </button>
              )}
            </div>
          )}
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-10 bg-gray-50 rounded-xl p-5">
            <p className="text-xs text-gray-500 leading-relaxed">
              <span className="font-semibold text-gray-700">《피해자 감별사회》(박영사)</span>에서 이유림 변호사는 &ldquo;왜 헤어지지 않았나요?&rdquo;라는 질문이 피해자에게 가하는 2차 가해의 구조를 분석합니다. 피해자가 가해자에게 돌아간 것은 &apos;트라우마 본딩&apos;이라는 심리적 기제이며, 이것은 피해자의 잘못이 아닙니다. 법정에서 이 질문을 받게 될 때, 이유림 변호사가 직접 반박합니다.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
