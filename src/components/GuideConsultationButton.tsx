'use client'
import { useConsultation } from './ConsultationProvider'

export default function GuideConsultationButton() {
  const { openConsultation } = useConsultation()
  return <button type="button" onClick={() => openConsultation()} className="inline-block mt-6 border-b border-white/60 py-2">문의·상담예약 안내 ↗</button>
}
