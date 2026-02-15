'use client'

import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import { supabase } from '@/lib/supabase'

interface PendingChange {
  page: string
  section: string
  fieldKey: string
  fieldType: 'text' | 'image' | 'link'
  value: string
}

interface AdminContextValue {
  isEditMode: boolean
  pendingChanges: Map<string, PendingChange>
  addChange: (change: PendingChange) => void
  saveAll: () => Promise<void>
  saving: boolean
}

const AdminContext = createContext<AdminContextValue>({
  isEditMode: false,
  pendingChanges: new Map(),
  addChange: () => {},
  saveAll: async () => {},
  saving: false,
})

export function useAdmin() {
  return useContext(AdminContext)
}

export default function AdminMode({ children }: { children: React.ReactNode }) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [pendingChanges, setPendingChanges] = useState<Map<string, PendingChange>>(new Map())
  const [saving, setSaving] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Check session on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('admin_edit_mode') === 'true') {
      setIsEditMode(true)
    }
  }, [])

  // Ctrl+Shift+E shortcut
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.code === 'KeyE') {
        e.preventDefault()
        if (isEditMode) {
          setIsEditMode(false)
          sessionStorage.removeItem('admin_edit_mode')
          setPendingChanges(new Map())
        } else {
          setShowPasswordModal(true)
          setPassword('')
          setPasswordError('')
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isEditMode])

  // Focus input when modal opens
  useEffect(() => {
    if (showPasswordModal) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [showPasswordModal])

  function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault()
    const adminPw = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'roandlee2026'
    if (password === adminPw) {
      setIsEditMode(true)
      sessionStorage.setItem('admin_edit_mode', 'true')
      setShowPasswordModal(false)
      setPassword('')
    } else {
      setPasswordError('비밀번호가 일치하지 않습니다.')
    }
  }

  const addChange = useCallback((change: PendingChange) => {
    setPendingChanges(prev => {
      const next = new Map(prev)
      next.set(`${change.page}.${change.section}.${change.fieldKey}`, change)
      return next
    })
  }, [])

  const saveAll = useCallback(async () => {
    if (pendingChanges.size === 0) return
    setSaving(true)
    try {
      const upserts = Array.from(pendingChanges.values()).map(c => ({
        page: c.page,
        section: c.section,
        field_key: c.fieldKey,
        field_type: c.fieldType,
        value: c.value,
      }))

      const { error } = await supabase
        .from('site_content')
        .upsert(upserts, { onConflict: 'page,section,field_key' })

      if (error) {
        console.error('Save error:', error)
        alert('저장에 실패했습니다.')
        return
      }

      setPendingChanges(new Map())
      alert('저장되었습니다.')
      window.location.reload()
    } catch {
      alert('저장 중 오류가 발생했습니다.')
    } finally {
      setSaving(false)
    }
  }, [pendingChanges])

  return (
    <AdminContext.Provider value={{ isEditMode, pendingChanges, addChange, saveAll, saving }}>
      {children}

      {/* Admin Toolbar */}
      {isEditMode && (
        <div
          className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-4 sm:px-6"
          style={{ background: '#1B3B2F', height: '48px' }}
        >
          <span className="text-white text-sm font-medium">관리자 편집 모드</span>
          <span className="text-white/70 text-xs hidden sm:inline">
            {pendingChanges.size > 0
              ? `저장되지 않은 변경사항 ${pendingChanges.size}개`
              : '변경사항 없음'}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={saveAll}
              disabled={saving || pendingChanges.size === 0}
              className="px-4 py-1.5 text-xs font-medium text-white rounded transition-colors disabled:opacity-40"
              style={{ background: '#16a34a' }}
            >
              {saving ? '저장 중...' : `모두 저장 (${pendingChanges.size})`}
            </button>
            <button
              onClick={() => {
                setIsEditMode(false)
                sessionStorage.removeItem('admin_edit_mode')
                setPendingChanges(new Map())
              }}
              className="px-4 py-1.5 text-xs font-medium text-white/80 bg-white/10 rounded hover:bg-white/20 transition-colors"
            >
              종료
            </button>
          </div>
        </div>
      )}

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowPasswordModal(false)} />
          <form
            onSubmit={handlePasswordSubmit}
            className="relative bg-white rounded-xl shadow-2xl p-8 w-full max-w-sm mx-4"
          >
            <h3 className="text-lg font-bold text-black mb-2">관리자 인증</h3>
            <p className="text-sm text-gray-500 mb-6">편집 모드에 진입하려면 비밀번호를 입력하세요.</p>
            <input
              ref={inputRef}
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setPasswordError('') }}
              placeholder="비밀번호"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1B3B2F] transition-colors"
            />
            {passwordError && (
              <p className="text-red-500 text-xs mt-2">{passwordError}</p>
            )}
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 py-2.5 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 text-sm text-white rounded-lg transition-colors"
                style={{ background: '#1B3B2F' }}
              >
                확인
              </button>
            </div>
          </form>
        </div>
      )}
    </AdminContext.Provider>
  )
}
