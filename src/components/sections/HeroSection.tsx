'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { useConsultation } from '@/components/ConsultationProvider'
import { useAdmin } from '@/components/AdminMode'

interface HeroImage {
  name: string
  url: string
}

const SLIDE_DURATION = 5000

export default function HeroSection() {
  const { openConsultation } = useConsultation()
  const { isEditMode } = useAdmin()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [images, setImages] = useState<HeroImage[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  // Fetch images from Supabase Storage
  const fetchImages = useCallback(async () => {
    try {
      const res = await fetch('/api/hero-images')
      const data = await res.json()
      setImages(data.images || [])
    } catch {
      setImages([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchImages()
  }, [fetchImages])

  // Auto-advance slider
  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % (images.length || 1))
  }, [images.length])

  useEffect(() => {
    if (images.length < 2) return
    const timer = setInterval(next, SLIDE_DURATION)
    return () => clearInterval(timer)
  }, [next, images.length])

  // Reset index if images change
  useEffect(() => {
    setCurrentIndex(0)
  }, [images.length])

  return (
    <section className="bg-white pt-0 pb-16 md:pb-24 -mt-16">
      {/* Image Slider */}
      <div className="w-full h-[35vh] sm:h-[40vh] md:h-[55vh] relative overflow-hidden">
        {loading ? (
          <div className="absolute inset-0 bg-[#1B3B2F] animate-pulse" />
        ) : images.length === 0 ? (
          /* Fallback: deep green background */
          <div className="absolute inset-0 bg-[#1B3B2F]" />
        ) : (
          images.map((img, i) => (
            <div
              key={img.name}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                currentIndex === i ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt="법률사무소 로앤이"
                className="w-full h-full object-cover"
                style={{
                  transform: currentIndex === i ? 'scale(1.03)' : 'scale(1)',
                  transition: 'transform 5s ease-out',
                }}
              />
            </div>
          ))
        )}

        {/* Indicators (only 2+ images) */}
        {images.length >= 2 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`슬라이드 ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  currentIndex === i ? 'bg-white w-6' : 'bg-white/40 w-1.5'
                }`}
              />
            ))}
          </div>
        )}

        {/* Admin overlay button */}
        {isEditMode && (
          <button
            onClick={() => setShowModal(true)}
            className="absolute top-20 right-4 z-30 bg-white/90 hover:bg-white text-gray-800 text-xs font-medium px-3 py-2 rounded-lg shadow-lg transition-all flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            히어로 이미지 관리
          </button>
        )}
      </div>

      {/* Text below slider */}
      <div className="text-center px-5 sm:px-4 mt-8 sm:mt-12 md:mt-16">
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-2xl md:text-4xl font-medium tracking-tight text-gray-900"
        >
          법률사무소 로앤이
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          className="text-sm text-gray-400 mt-2"
        >
          &ldquo;오직 피해자만 변호합니다&rdquo;
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
          className="text-base md:text-lg text-gray-500 mt-6 leading-relaxed"
        >
          당신의 잃어버린 일상을 되찾을 때까지,<br />
          로앤이가 끝까지 함께 합니다.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65, ease: 'easeOut' }}
          className="mt-6"
        >
          <button
            onClick={() => openConsultation()}
            className="bg-[#1B3B2F] text-white rounded-full px-8 py-3.5 text-sm font-medium hover:bg-[#152f25] transition min-h-[48px]"
          >
            상담 신청하기
          </button>
        </motion.div>
      </div>

      {/* Admin Modal */}
      {showModal && (
        <HeroImageModal
          images={images}
          onClose={() => setShowModal(false)}
          onRefresh={fetchImages}
        />
      )}
    </section>
  )
}

/* ─── Admin Modal ─── */
function HeroImageModal({
  images,
  onClose,
  onRefresh,
}: {
  images: HeroImage[]
  onClose: () => void
  onRefresh: () => Promise<void>
}) {
  const [items, setItems] = useState<HeroImage[]>(images)
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [reordering, setReordering] = useState(false)
  const [orderChanged, setOrderChanged] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dragItem = useRef<number | null>(null)
  const dragOver = useRef<number | null>(null)

  useEffect(() => {
    setItems(images)
  }, [images])

  // Client-side image resize before upload
  function resizeImage(file: File): Promise<Blob> {
    return new Promise((resolve) => {
      const img = new window.Image()
      const url = URL.createObjectURL(file)
      img.onload = () => {
        URL.revokeObjectURL(url)
        const MAX_W = 1920
        let w = img.width
        let h = img.height
        if (w > MAX_W) {
          h = Math.round((h * MAX_W) / w)
          w = MAX_W
        }
        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext('2d')!
        ctx.drawImage(img, 0, 0, w, h)
        canvas.toBlob(
          (blob) => resolve(blob || file),
          'image/jpeg',
          0.85
        )
      }
      img.src = url
    })
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const resized = await resizeImage(file)
        const order = String(items.length + i + 1).padStart(2, '0')

        const formData = new FormData()
        formData.append('file', resized, file.name)
        formData.append('order', order)

        await fetch('/api/hero-images', { method: 'POST', body: formData })
      }
      await onRefresh()
    } catch (err) {
      console.error('Upload error:', err)
      alert('업로드에 실패했습니다.')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  async function handleDelete(name: string) {
    if (!confirm('이 이미지를 삭제하시겠습니까?')) return
    setDeleting(name)
    try {
      await fetch('/api/hero-images', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      })
      await onRefresh()
    } catch {
      alert('삭제에 실패했습니다.')
    } finally {
      setDeleting(null)
    }
  }

  // Drag and drop reorder
  function handleDragStart(idx: number) {
    dragItem.current = idx
  }

  function handleDragEnter(idx: number) {
    dragOver.current = idx
  }

  function handleDragEnd() {
    if (dragItem.current === null || dragOver.current === null) return
    if (dragItem.current === dragOver.current) return

    const copy = [...items]
    const dragged = copy.splice(dragItem.current, 1)[0]
    copy.splice(dragOver.current, 0, dragged)
    setItems(copy)
    setOrderChanged(true)
    dragItem.current = null
    dragOver.current = null
  }

  async function handleSaveOrder() {
    setReordering(true)
    try {
      await fetch('/api/hero-images', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: items.map(i => i.name) }),
      })
      setOrderChanged(false)
      await onRefresh()
    } catch {
      alert('순서 저장에 실패했습니다.')
    } finally {
      setReordering(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <h3 className="text-lg font-bold text-gray-900">히어로 이미지 관리</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">&times;</button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <p className="text-center text-gray-400 text-sm py-8">등록된 이미지가 없습니다.</p>
          ) : (
            <div className="space-y-3">
              {items.map((img, idx) => (
                <div
                  key={img.name}
                  draggable
                  onDragStart={() => handleDragStart(idx)}
                  onDragEnter={() => handleDragEnter(idx)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => e.preventDefault()}
                  className="flex items-center gap-3 p-2 rounded-lg border border-gray-100 hover:border-gray-200 bg-gray-50 cursor-grab active:cursor-grabbing transition-colors"
                >
                  {/* Drag handle */}
                  <div className="text-gray-300 flex-shrink-0 select-none">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="9" cy="6" r="1.5" />
                      <circle cx="15" cy="6" r="1.5" />
                      <circle cx="9" cy="12" r="1.5" />
                      <circle cx="15" cy="12" r="1.5" />
                      <circle cx="9" cy="18" r="1.5" />
                      <circle cx="15" cy="18" r="1.5" />
                    </svg>
                  </div>

                  {/* Order number */}
                  <span className="text-xs font-mono text-gray-400 w-5 text-center flex-shrink-0">{idx + 1}</span>

                  {/* Thumbnail */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt={img.name}
                    className="w-20 h-14 object-cover rounded flex-shrink-0"
                  />

                  {/* Filename */}
                  <span className="text-xs text-gray-500 truncate flex-1 min-w-0">{img.name}</span>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(img.name)}
                    disabled={deleting === img.name}
                    className="flex-shrink-0 text-xs text-red-400 hover:text-red-600 disabled:opacity-40 px-2 py-1"
                  >
                    {deleting === img.name ? '...' : '삭제'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t flex flex-wrap gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={handleUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex-1 py-2.5 text-sm font-medium text-white rounded-lg transition-colors disabled:opacity-50"
            style={{ background: '#1B3B2F' }}
          >
            {uploading ? '업로드 중...' : '이미지 추가'}
          </button>
          {orderChanged && (
            <button
              onClick={handleSaveOrder}
              disabled={reordering}
              className="flex-1 py-2.5 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              {reordering ? '저장 중...' : '순서 저장'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
