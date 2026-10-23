// 상담 신청 입력 검증 — 클라이언트와 서버(/api/consultations)가 함께 사용한다.

export interface ConsultationInput {
  name: string
  phone: string
  email: string
  category?: string | null
  content?: string | null
  privacy_consent?: boolean
  /** 봇 차단용 숨김 필드. 사람은 비워 둔다. */
  website?: string
}

const JAMO_ONLY = /^[ㄱ-ㅎㅏ-ㅣ\s]+$/
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function normalizePhone(phone: string) {
  const digits = phone.replace(/[^\d+]/g, '').replace(/^\+82/, '0')
  return digits.replace(/\D/g, '')
}

/** 문제가 없으면 null, 있으면 사용자에게 보여줄 메시지를 돌려준다. */
export function validateConsultation(input: ConsultationInput): string | null {
  const name = (input.name || '').trim()
  if (name.length < 2 || name.length > 50 || JAMO_ONLY.test(name)) return '이름을 정확히 입력해주세요.'

  const phone = normalizePhone(input.phone || '')
  if (!/^0\d{8,10}$/.test(phone)) return '연락처를 정확히 입력해주세요. (예: 010-1234-5678)'

  const email = (input.email || '').trim()
  if (!EMAIL.test(email) || email.length > 254) return '이메일 주소를 정확히 입력해주세요.'

  if ((input.category || '').length > 50) return '문의 분야를 다시 선택해주세요.'
  if ((input.content || '').length > 10000) return '문의 내용은 10,000자 이내로 입력해주세요.'
  return null
}
