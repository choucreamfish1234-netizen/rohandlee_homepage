'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { useAdmin } from './AdminMode'
import { useSiteContent } from '@/hooks/useSiteContent'

// ─── EditableText ───────────────────────────────────────────────

interface EditableTextProps {
  page: string
  section: string
  fieldKey: string
  defaultValue: string
  tag?: keyof JSX.IntrinsicElements
  className?: string
  style?: React.CSSProperties
}

export function EditableText({
  page,
  section,
  fieldKey,
  defaultValue,
  tag: Tag = 'span',
  className = '',
  style,
}: EditableTextProps) {
  const { isEditMode, addChange, pendingChanges } = useAdmin()
  const { getValue } = useSiteContent(page)
  const [editing, setEditing] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const changeKey = `${page}.${section}.${fieldKey}`
  const pending = pendingChanges.get(changeKey)
  const displayValue = pending?.value ?? getValue(section, fieldKey, defaultValue)

  useEffect(() => {
    if (editing && ref.current) {
      ref.current.focus()
      const range = document.createRange()
      range.selectNodeContents(ref.current)
      range.collapse(false)
      const sel = window.getSelection()
      sel?.removeAllRanges()
      sel?.addRange(range)
    }
  }, [editing])

  function handleBlur() {
    setEditing(false)
    const newValue = ref.current?.innerText?.trim() || ''
    if (newValue && newValue !== displayValue) {
      addChange({ page, section, fieldKey, fieldType: 'text', value: newValue })
    }
  }

  if (!isEditMode) {
    return <Tag className={className} style={style}>{displayValue}</Tag>
  }

  return (
    <div
      ref={ref}
      className={`${className} ${editing ? '' : 'cursor-pointer'}`}
      style={{
        ...style,
        outline: editing ? '2px solid #3B82F6' : '2px dashed rgba(59,130,246,0.4)',
        outlineOffset: '2px',
        borderRadius: '2px',
        background: editing ? 'rgba(59,130,246,0.05)' : undefined,
      }}
      contentEditable={editing}
      suppressContentEditableWarning
      onClick={() => { if (!editing) setEditing(true) }}
      onBlur={handleBlur}
      onKeyDown={(e) => {
        if (e.key === 'Escape') setEditing(false)
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); ref.current?.blur() }
      }}
    >
      {displayValue}
    </div>
  )
}

// ─── EditableImage ──────────────────────────────────────────────

interface EditableImageProps {
  page: string
  section: string
  fieldKey: string
  defaultSrc: string
  alt: string
  width: number
  height: number
  className?: string
}

export function EditableImage({
  page,
  section,
  fieldKey,
  defaultSrc,
  alt,
  width,
  height,
  className = '',
}: EditableImageProps) {
  const { isEditMode, addChange, pendingChanges } = useAdmin()
  const { getValue } = useSiteContent(page)
  const [uploading, setUploading] = useState(false)
  const [hover, setHover] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const changeKey = `${page}.${section}.${fieldKey}`
  const pending = pendingChanges.get(changeKey)
  const displaySrc = pending?.value ?? getValue(section, fieldKey, defaultSrc)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      alert('jpg, png, webp 형식만 지원합니다.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('파일 크기는 5MB 이하여야 합니다.')
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/upload-image', { method: 'POST', body: formData })
      const data = await res.json()

      if (data.error) {
        alert(data.error)
        return
      }

      addChange({ page, section, fieldKey, fieldType: 'image', value: data.url })
    } catch {
      alert('이미지 업로드에 실패했습니다.')
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  if (!isEditMode) {
    return (
      <Image src={displaySrc} alt={alt} width={width} height={height} className={className} />
    )
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ outline: '2px dashed rgba(59,130,246,0.4)', outlineOffset: '2px', borderRadius: '2px' }}
    >
      <Image
        src={displaySrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        unoptimized={displaySrc.startsWith('http')}
      />

      {(hover || uploading) && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer"
          style={{ background: 'rgba(0,0,0,0.5)' }}
          onClick={() => fileRef.current?.click()}
        >
          {uploading ? (
            <div className="text-white text-sm font-medium">업로드 중...</div>
          ) : (
            <>
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
              </svg>
              <span className="text-white text-sm font-medium mt-2">이미지 변경</span>
            </>
          )}
        </div>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  )
}
