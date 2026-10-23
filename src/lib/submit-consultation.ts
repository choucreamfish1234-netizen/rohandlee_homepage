import { validateConsultation, type ConsultationInput } from './consultation-validation'

/** 상담 신청을 서버로 보낸다. 실패하면 사용자에게 보여줄 메시지를 던진다. */
export async function submitConsultation(input: ConsultationInput) {
  const invalid = validateConsultation(input)
  if (invalid) throw new Error(invalid)

  const res = await fetch('/api/consultations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  if (!res.ok) {
    const data = await res.json().catch(() => null)
    throw new Error(data?.error || '일시적인 오류가 발생했습니다. 전화(032-207-8788)로 문의해주세요.')
  }
}
