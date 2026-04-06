'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'

interface Webtoon {
  id: string
  title: string
  description: string | null
  image_url: string | null
  images: string[] | null
  link_url: string | null
  display_order: number
}

function getImages(item: Webtoon): string[] {
  if (item.images && Array.isArray(item.images) && item.images.length > 0) {
    return item.images
  }
  if (item.image_url) return [item.image_url]
  return []
}

export default function WebtoonSection() {
  const [webtoons, setWebtoons] = useState<Webtoon[]>([])
  const [selectedWebtoon, setSelectedWebtoon] = useState<Webtoon | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  useEffect(() => {
    async function fetchWebtoons() {
      const { data } = await supabase
        .from('webtoons')
        .select('id, title, description, image_url, images, link_url, display_order')
        .eq('visible', true)
        .order('display_order', { ascending: true })
      if (data) setWebtoons(data)
    }
    fetchWebtoons()
  }, [])

  // Modal keyboard navigation
  useEffect(() => {
    if (!selectedWebtoon) return
    const images = getImages(selectedWebtoon)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedWebtoon(null)
      } else if (e.key === 'ArrowRight') {
        setCurrentImageIndex(prev => Math.min(prev + 1, images.length - 1))
      } else if (e.key === 'ArrowLeft') {
        setCurrentImageIndex(prev => Math.max(prev - 1, 0))
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [selectedWebtoon])

  // Drag scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 1.5
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const openViewer = (webtoon: Webtoon) => {
    const imgs = getImages(webtoon)
    if (imgs.length === 0) return
    setSelectedWebtoon(webtoon)
    setCurrentImageIndex(0)
  }

  if (webtoons.length === 0) return null

  return (
    <>
      <section className="py-20 relative" style={{ background: 'linear-gradient(180deg, #FAFAFA 0%, #FFF8F0 50%, #FFFFFF 100%)' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-14 px-4"
        >
          <span className="inline-block text-[11px] tracking-[0.25em] text-rose-400 uppercase font-medium bg-rose-50 px-4 py-1.5 rounded-full">
            INSTAGRAM WEBTOON
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-4">
            피해자들이 직접 참여한 범죄예방 인스타툰
          </h2>
          <p className="text-sm md:text-base text-gray-500 mt-3 max-w-lg mx-auto">
            실제 사건을 바탕으로, 피해를 예방하는 이야기를 전합니다
          </p>
        </motion.div>

        {/* Horizontal scroll slider */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`overflow-x-auto scrollbar-hide ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <div className="flex gap-5 px-4 md:px-8 lg:px-16 pb-4" style={{ width: 'max-content' }}>
            {webtoons.map((item, i) => (
              <WebtoonCard
                key={item.id}
                item={item}
                index={i}
                onClick={() => openViewer(item)}
                isDragging={isDragging}
              />
            ))}
          </div>
        </div>

        {/* Instagram link */}
        <div className="mt-8 text-center">
          <a
            href="https://www.instagram.com/lawfirm_rohandlee/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[#1B3B2F] font-medium hover:underline transition-all"
          >
            로앤이 인스타그램에서 더 보기 →
          </a>
        </div>
      </section>

      {/* Image Viewer Modal */}
      <AnimatePresence>
        {selectedWebtoon && (
          <ImageViewerModal
            webtoon={selectedWebtoon}
            currentIndex={currentImageIndex}
            onIndexChange={setCurrentImageIndex}
            onClose={() => setSelectedWebtoon(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

function WebtoonCard({
  item,
  index,
  onClick,
  isDragging,
}: {
  item: Webtoon
  index: number
  onClick: () => void
  isDragging: boolean
}) {
  const images = getImages(item)
  const coverImage = images[0]

  const handleClick = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault()
      return
    }
    onClick()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      className="flex-shrink-0 w-[260px] md:w-[280px] lg:w-[300px]"
      style={{ scrollSnapAlign: 'center', perspective: '800px' }}
    >
      <div
        onClick={handleClick}
        className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Cover image */}
        {coverImage ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={coverImage}
            alt={item.title}
            className="w-full aspect-[4/5] object-cover"
            draggable={false}
          />
        ) : (
          <div className="w-full aspect-[4/5] bg-gradient-to-br from-[#1B3B2F] to-[#2D5A47] flex items-center justify-center">
            <span className="text-white text-lg font-semibold">WEBTOON</span>
          </div>
        )}

        {/* Image count badge */}
        {images.length > 1 && (
          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
            1/{images.length}
          </div>
        )}

        {/* Bottom gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Title on overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="text-white font-bold text-base leading-snug line-clamp-2 drop-shadow-lg">
            {item.title}
          </h3>
          {item.description && (
            <p className="text-white/70 text-xs mt-1 line-clamp-1">{item.description}</p>
          )}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-gray-800">
            {images.length > 1 ? `${images.length}장의 이미지 보기` : '자세히 보기'}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ImageViewerModal({
  webtoon,
  currentIndex,
  onIndexChange,
  onClose,
}: {
  webtoon: Webtoon
  currentIndex: number
  onIndexChange: (index: number) => void
  onClose: () => void
}) {
  const images = getImages(webtoon)
  const [direction, setDirection] = useState(0)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)

  const goTo = useCallback((newIndex: number) => {
    if (newIndex < 0 || newIndex >= images.length) return
    setDirection(newIndex > currentIndex ? 1 : -1)
    onIndexChange(newIndex)
  }, [currentIndex, images.length, onIndexChange])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return
    const diff = touchStartX - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < images.length - 1) {
        goTo(currentIndex + 1)
      } else if (diff < 0 && currentIndex > 0) {
        goTo(currentIndex - 1)
      }
    }
    setTouchStartX(null)
  }

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0.5,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0.5,
    }),
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex flex-col"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.92)' }}
      onClick={onClose}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 md:px-6 py-4 relative z-10" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-white font-bold text-base md:text-lg truncate max-w-[70%]">
          {webtoon.title}
        </h3>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white transition-colors w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Image area */}
      <div
        ref={imageContainerRef}
        className="flex-1 flex items-center justify-center relative overflow-hidden px-4"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Left arrow */}
        {currentIndex > 0 && (
          <button
            onClick={() => goTo(currentIndex - 1)}
            className="absolute left-2 md:left-6 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center text-white transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Right arrow */}
        {currentIndex < images.length - 1 && (
          <button
            onClick={() => goTo(currentIndex + 1)}
            className="absolute right-2 md:right-6 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center text-white transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Image with slide animation */}
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="w-full flex items-center justify-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[currentIndex]}
              alt={`${webtoon.title} - ${currentIndex + 1}`}
              className="max-h-[85vh] max-w-full object-contain rounded-lg select-none"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom area */}
      <div className="px-4 md:px-6 py-4 flex flex-col items-center gap-3 relative z-10" onClick={(e) => e.stopPropagation()}>
        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="flex items-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1)
                  onIndexChange(i)
                }}
                className={`rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? 'w-6 h-2 bg-white'
                    : 'w-2 h-2 bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        )}

        {/* Image counter */}
        {images.length > 1 && (
          <p className="text-white/50 text-xs">
            {currentIndex + 1} / {images.length}
          </p>
        )}

        {/* Instagram link */}
        {webtoon.link_url && (
          <a
            href={webtoon.link_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            인스타그램에서 보기
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        )}
      </div>
    </motion.div>
  )
}
