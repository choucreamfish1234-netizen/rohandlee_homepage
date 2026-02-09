'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'

const caseTypeOptions = [
  '성범죄 피해 상담',
  '재산범죄 피해 상담',
  '회생·파산 상담',
  '기업법무 상담',
  'IT·보안 법률 상담',
  '기타 상담',
]

interface ConsultationModalProps {
  isOpen: boolean
  onClose: () => void
  defaultCaseType?: string
}

export default function ConsultationModal({
  isOpen,
  onClose,
  defaultCaseType = '',
}: ConsultationModalProps) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    case_type: defaultCaseType,
    content: '',
    privacy_agreed: false,
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  // defaultCaseType이 바뀌면 반영
  useEffect(() => {
    if (defaultCaseType) {
      setForm((prev) => ({ ...prev, case_type: defaultCaseType }))
    }
  }, [defaultCaseType])

  // 모달 열릴 때 body 스크롤 잠금
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // ESC 키 닫기
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  // 모달 닫힐 때 폼 리셋
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setForm({
          name: '',
          phone: '',
          case_type: defaultCaseType,
          content: '',
          privacy_agreed: false,
        })
        setSubmitted(false)
        setError('')
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen, defaultCaseType])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.privacy_agreed) return
    setSubmitting(true)
    setError('')

    try {
      const { error: supabaseError } = await supabase
        .from('consultations')
        .insert([
          {
            name: form.name,
            phone: form.phone,
            case_type: form.case_type || null,
            content: form.content || null,
            privacy_agreed: form.privacy_agreed,
            created_at: new Date().toISOString(),
          },
        ])

      if (supabaseError) throw supabaseError
      setSubmitted(true)
      setTimeout(() => {
        onClose()
      }, 3000)
    } catch {
      setError(
        '일시적인 오류가 발생했습니다. 전화(032-207-8788)로 문의해주세요.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
          {/* 오버레이 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />

          {/* 모달 */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-[500px] max-h-[90vh] overflow-y-auto bg-white sm:rounded-2xl rounded-t-2xl shadow-2xl"
          >
            {/* 닫기 버튼 */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors z-10"
              aria-label="닫기"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M4 4L12 12M12 4L4 12" />
              </svg>
            </button>

            <div className="p-6 sm:p-8">
              {submitted ? (
                /* 성공 화면 */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ backgroundColor: 'rgba(27, 59, 47, 0.1)' }}
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#1B3B2F"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-black mb-3">
                    상담 신청이 완료되었습니다
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    영업일 기준 24시간 내 연락드리겠습니다.
                  </p>
                </motion.div>
              ) : (
                /* 폼 */
                <>
                  <div className="mb-8">
                    <p
                      className="text-xs tracking-[0.2em] uppercase mb-2"
                      style={{ color: '#1B3B2F' }}
                    >
                      Consultation
                    </p>
                    <h2 className="font-serif text-2xl font-bold text-black">
                      무료 상담 신청
                    </h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* 이름 */}
                    <div>
                      <label
                        htmlFor="modal-name"
                        className="block text-sm font-medium text-black mb-2"
                      >
                        이름 <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="modal-name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-400 transition-colors"
                        placeholder="홍길동"
                      />
                    </div>

                    {/* 연락처 */}
                    <div>
                      <label
                        htmlFor="modal-phone"
                        className="block text-sm font-medium text-black mb-2"
                      >
                        연락처 <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="modal-phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-400 transition-colors"
                        placeholder="010-0000-0000"
                      />
                    </div>

                    {/* 상담 유형 */}
                    <div>
                      <label
                        htmlFor="modal-case-type"
                        className="block text-sm font-medium text-black mb-2"
                      >
                        상담 유형
                      </label>
                      <select
                        id="modal-case-type"
                        value={form.case_type}
                        onChange={(e) =>
                          setForm({ ...form, case_type: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-400 transition-colors bg-white"
                      >
                        <option value="">선택해주세요</option>
                        {caseTypeOptions.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* 상담 내용 */}
                    <div>
                      <label
                        htmlFor="modal-content"
                        className="block text-sm font-medium text-black mb-2"
                      >
                        상담 내용
                      </label>
                      <textarea
                        id="modal-content"
                        rows={4}
                        maxLength={500}
                        value={form.content}
                        onChange={(e) =>
                          setForm({ ...form, content: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-400 transition-colors resize-none"
                        placeholder="사건 경위를 간략히 적어주세요. 비밀이 철저히 보장됩니다."
                      />
                      <p className="mt-1 text-xs text-gray-400 text-right">
                        {form.content.length}/500
                      </p>
                    </div>

                    {/* 개인정보 동의 */}
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.privacy_agreed}
                        onChange={(e) =>
                          setForm({ ...form, privacy_agreed: e.target.checked })
                        }
                        className="mt-0.5 w-4 h-4 accent-[#1B3B2F] rounded"
                      />
                      <span className="text-xs text-gray-500 leading-relaxed">
                        상담 목적으로 개인정보(성함, 연락처)를 수집·이용하는 것에
                        동의합니다.{' '}
                        <span className="text-red-500">*</span>
                      </span>
                    </label>

                    {error && (
                      <p className="text-red-500 text-sm">{error}</p>
                    )}

                    {/* 제출 버튼 */}
                    <button
                      type="submit"
                      disabled={submitting || !form.privacy_agreed}
                      className="w-full py-4 text-white text-sm font-medium rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
                      style={{ backgroundColor: '#1B3B2F' }}
                    >
                      {submitting ? (
                        <span className="inline-flex items-center gap-2">
                          <svg
                            className="animate-spin w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                          </svg>
                          전송 중...
                        </span>
                      ) : (
                        '상담 신청하기'
                      )}
                    </button>
                    {/* 카카오톡 안내 */}
                    <div className="pt-2 text-center">
                      <p className="text-xs text-gray-400 mb-3">
                        카카오톡으로도 상담 가능합니다
                      </p>
                      <a
                        href="https://pf.kakao.com/_YxgWxcn/chat"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#FEE500] text-[#191919] text-sm font-medium rounded-full hover:brightness-95 transition-all"
                      >
                        <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
                          <path
                            d="M14 4C8.477 4 4 7.477 4 11.667c0 2.7 1.737 5.067 4.36 6.433-.14.507-.9 3.267-.933 3.5 0 0-.02.167.087.233.107.067.233.033.233.033.307-.043 3.56-2.327 4.12-2.733.7.1 1.413.2 2.133.2 5.523 0 10-3.477 10-7.667S19.523 4 14 4z"
                            fill="#191919"
                          />
                        </svg>
                        카카오톡 상담하기
                      </a>
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
