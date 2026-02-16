'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'

const caseTypes = [
  '성범죄 피해',
  '재산범죄 피해',
  '회생·파산',
  '기업경영 법무',
  'IT보안 법률',
  '스토킹',
  '데이트폭력',
  '가정폭력',
  '디지털성범죄',
  '몰카·딥페이크',
  '학교폭력',
  '명예훼손',
  '협박·공갈',
  '무고 대응',
  '기타',
]

export default function ConsultationForm() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    category: '',
    content: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.email.trim()) {
      setError('이메일을 입력해주세요')
      return
    }
    setSubmitting(true)
    setError('')

    try {
      const { error: supabaseError } = await supabase
        .from('consultations')
        .insert([
          {
            name: form.name,
            phone: form.phone,
            email: form.email || null,
            category: form.category,
            content: form.content,
            status: 'new',
            created_at: new Date().toISOString(),
          },
        ])

      if (supabaseError) throw supabaseError
      setSubmitted(true)
    } catch {
      setError('전송에 실패했습니다. 전화(032-207-8788)로 문의해주세요.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <section className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1B3B2F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-black mb-4">상담 신청이 완료되었습니다</h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            빠른 시간 내에 담당 변호사가 연락드리겠습니다.<br />
            긴급 상담은 <a href="tel:032-207-8788" className="text-accent font-medium">032-207-8788</a>로 전화주세요.
          </p>
        </motion.div>
      </section>
    )
  }

  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-black">상담 예약</h1>
            <p className="mt-4 text-gray-500 text-sm">
              아래 양식을 작성해 주시면 빠른 시간 내에 연락드리겠습니다.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-black mb-2">
                이름 <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-accent transition-colors"
                placeholder="홍길동"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-black mb-2">
                연락처 <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-accent transition-colors"
                placeholder="010-0000-0000"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                이메일 <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-accent transition-colors"
                placeholder="답변 받으실 이메일 주소"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-black mb-2">
                사건 유형 <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                required
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-accent transition-colors bg-white"
              >
                <option value="">선택해주세요</option>
                {caseTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-black mb-2">
                상담 내용 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                required
                rows={6}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-accent transition-colors resize-none"
                placeholder="사건 경위를 자세히 적어주세요. 자세할수록 정확한 상담이 가능합니다. 비밀이 철저히 보장됩니다."
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? '전송 중...' : '상담 신청하기'}
            </button>

            <p className="text-xs text-gray-400 text-center">
              제출하신 개인정보는 상담 목적으로만 사용되며, 상담 종료 후 즉시 폐기됩니다.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
