'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import ConsultationModal from './ConsultationModal'
import ConsultationSelectModal from './ConsultationSelectModal'
import { trackConversion } from '@/lib/track-conversion'

interface ConsultationContextValue {
  openConsultation: (defaultCaseType?: string) => void
}

const ConsultationContext = createContext<ConsultationContextValue>({
  openConsultation: () => {},
})

export function useConsultation() {
  return useContext(ConsultationContext)
}

export default function ConsultationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSelectOpen, setIsSelectOpen] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [caseType, setCaseType] = useState('')

  const openConsultation = useCallback((defaultCaseType?: string) => {
    setCaseType(defaultCaseType || '')
    setIsSelectOpen(true)
    trackConversion('consultation_open')
  }, [])

  const handleSelectEmail = useCallback(() => {
    setIsSelectOpen(false)
    trackConversion('email_consultation_select')
    setTimeout(() => {
      setIsFormOpen(true)
    }, 200)
  }, [])

  return (
    <ConsultationContext.Provider value={{ openConsultation }}>
      {children}
      <ConsultationSelectModal
        isOpen={isSelectOpen}
        onClose={() => setIsSelectOpen(false)}
        onSelectEmail={handleSelectEmail}
      />
      <ConsultationModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        defaultCaseType={caseType}
      />
    </ConsultationContext.Provider>
  )
}
