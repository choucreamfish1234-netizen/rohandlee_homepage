'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import ConsultationModal from './ConsultationModal'

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
  const [isOpen, setIsOpen] = useState(false)
  const [caseType, setCaseType] = useState('')

  const openConsultation = useCallback((defaultCaseType?: string) => {
    setCaseType(defaultCaseType || '')
    setIsOpen(true)
  }, [])

  return (
    <ConsultationContext.Provider value={{ openConsultation }}>
      {children}
      <ConsultationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        defaultCaseType={caseType}
      />
    </ConsultationContext.Provider>
  )
}
