'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAdmin } from '@/components/AdminMode'

/* ─── Animation variants ─── */
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: 'easeOut' as const },
  }),
}

/* ─── Types ─── */
interface ScreenshotImage {
  name: string
  url: string
}

/* ─── Screenshot Gallery (Section 2) ─── */
function ScreenshotGallery() {
  const { isEditMode } = useAdmin()
  const [images, setImages] = useState<ScreenshotImage[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [sliderIndex, setSliderIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const fetchImages = useCallback(async () => {
    try {
      const res = await fetch('/api/app-screenshots')
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

  const bannerImage = images.find(img => img.name.startsWith('00_'))
  const sliderImages = images.filter(img => !img.name.startsWith('00_'))

  const scrollTo = useCallback((index: number) => {
    if (!scrollRef.current) return
    const children = scrollRef.current.children
    if (children[index]) {
      children[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    }
    setSliderIndex(index)
  }, [])

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return
    const container = scrollRef.current
    const scrollLeft = container.scrollLeft
    const childWidth = container.children[0]?.clientWidth || 280
    const gap = 16
    const newIndex = Math.round(scrollLeft / (childWidth + gap))
    setSliderIndex(Math.min(newIndex, sliderImages.length - 1))
  }, [sliderImages.length])

  if (loading) return null
  if (images.length === 0 && !isEditMode) return null

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Admin button */}
        {isEditMode && (
          <div className="mb-6 flex justify-end">
            <button
              onClick={() => setShowModal(true)}
              className="bg-white hover:bg-gray-50 text-gray-800 text-xs font-medium px-3 py-2 rounded-lg shadow border border-gray-200 transition-all flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              앱 스크린샷 관리
            </button>
          </div>
        )}

        {/* Banner image (00_ prefix) */}
        {bannerImage && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            custom={0}
            variants={fadeInUp}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={bannerImage.url}
              alt="진심의무게 앱 배너"
              className="w-full rounded-2xl shadow-sm"
            />
          </motion.div>
        )}

        {/* Slider images (01_ and above) */}
        {sliderImages.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            custom={0.2}
            variants={fadeInUp}
            className={bannerImage ? 'mt-10' : ''}
          >
            <div className="relative">
              {/* Left arrow */}
              {sliderImages.length > 1 && (
                <button
                  onClick={() => scrollTo(Math.max(0, sliderIndex - 1))}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-md flex items-center justify-center transition -ml-2"
                  aria-label="이전"
                >
                  <svg className="w-5 h-5 text-[#111111]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}

              {/* Scrollable container */}
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {sliderImages.map((img) => (
                  <div key={img.name} className="flex-shrink-0 snap-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.url}
                      alt="진심의무게 앱 스크린샷"
                      className="max-h-[500px] object-contain rounded-xl"
                    />
                  </div>
                ))}
              </div>

              {/* Right arrow */}
              {sliderImages.length > 1 && (
                <button
                  onClick={() => scrollTo(Math.min(sliderImages.length - 1, sliderIndex + 1))}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-md flex items-center justify-center transition -mr-2"
                  aria-label="다음"
                >
                  <svg className="w-5 h-5 text-[#111111]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>

            {/* Dot indicators */}
            {sliderImages.length > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {sliderImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollTo(i)}
                    aria-label={`스크린샷 ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      sliderIndex === i ? 'bg-[#1B3B2F] w-6' : 'bg-gray-200 w-1.5'
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Admin Modal */}
      {showModal && (
        <ScreenshotModal
          images={images}
          onClose={() => setShowModal(false)}
          onRefresh={fetchImages}
        />
      )}
    </section>
  )
}

/* ─── Screenshot Admin Modal ─── */
function ScreenshotModal({
  images,
  onClose,
  onRefresh,
}: {
  images: ScreenshotImage[]
  onClose: () => void
  onRefresh: () => Promise<void>
}) {
  const [items, setItems] = useState<ScreenshotImage[]>(images)
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [reordering, setReordering] = useState(false)
  const [orderChanged, setOrderChanged] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dragItem = useRef<number | null>(null)
  const dragOver = useRef<number | null>(null)

  useEffect(() => { setItems(images) }, [images])

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || files.length === 0) return
    setUploading(true)
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const order = String(items.length + i).padStart(2, '0')
        const formData = new FormData()
        formData.append('file', file, file.name)
        formData.append('order', order)
        await fetch('/api/app-screenshots', { method: 'POST', body: formData })
      }
      await onRefresh()
    } catch {
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
      await fetch('/api/app-screenshots', {
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

  function handleDragStart(idx: number) { dragItem.current = idx }
  function handleDragEnter(idx: number) { dragOver.current = idx }

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
      await fetch('/api/app-screenshots', {
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
        <div className="flex items-center justify-between p-5 border-b">
          <h3 className="text-lg font-semibold text-[#111111]">앱 스크린샷 관리</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">&times;</button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          <p className="text-xs text-[#888888] mb-4">00_ 접두사 파일 = 상단 배너 (가로형), 01_ 이후 = 슬라이더 (세로형)</p>
          {items.length === 0 ? (
            <p className="text-center text-[#888888] text-sm py-8">등록된 이미지가 없습니다.</p>
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
                  className="flex items-center gap-3 p-2 rounded-lg border border-[#F0F0F0] hover:border-gray-200 bg-[#FAFAFA] cursor-grab active:cursor-grabbing transition-colors"
                >
                  <div className="text-gray-300 flex-shrink-0 select-none">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="9" cy="6" r="1.5" /><circle cx="15" cy="6" r="1.5" />
                      <circle cx="9" cy="12" r="1.5" /><circle cx="15" cy="12" r="1.5" />
                      <circle cx="9" cy="18" r="1.5" /><circle cx="15" cy="18" r="1.5" />
                    </svg>
                  </div>
                  <span className="text-xs font-mono text-[#888888] w-5 text-center flex-shrink-0">{idx}</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.url} alt={img.name} className="w-16 h-12 object-cover rounded flex-shrink-0" />
                  <span className="text-xs text-[#444444] truncate flex-1 min-w-0">{img.name}</span>
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
        <div className="p-5 border-t flex flex-wrap gap-2">
          <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={handleUpload} className="hidden" />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex-1 py-2.5 text-sm font-medium text-white rounded-lg transition-colors disabled:opacity-50 bg-[#1B3B2F] hover:bg-[#152f25]"
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

/* ─── FAQ Accordion ─── */
const faqData = [
  {
    q: '진심의무게는 무료인가요?',
    a: '네, AI 탄원서 작성과 Word 다운로드는 무료입니다. 변호사 검수 서비스는 별도 비용이 발생하며, 신청 시 안내해 드립니다.',
  },
  {
    q: '어떤 종류의 탄원서를 작성할 수 있나요?',
    a: '성범죄(강간, 강제추행, 불법촬영 등), 재산범죄(사기, 횡령, 배임), 스토킹, 폭행·상해, 협박, 명예훼손 등 피해자가 제출하는 엄벌 탄원서를 작성할 수 있습니다. 법원 제출용과 검찰 제출용 모두 지원합니다.',
  },
  {
    q: '법률 용어를 몰라도 되나요?',
    a: '네, 전혀 몰라도 됩니다. 쉬운 질문에 답하고 해당 항목을 터치하기만 하면 AI가 법률 용어와 형식에 맞춰 탄원서를 자동 완성합니다.',
  },
  {
    q: '작성한 탄원서를 법원에 직접 제출해야 하나요?',
    a: '네, 탄원서의 법원·검찰 제출은 본인이 직접 하셔야 합니다. 진심의무게에서 Word 파일로 다운로드한 후 인쇄하여 제출하시면 됩니다.',
  },
  {
    q: '개인정보는 안전한가요?',
    a: '작성 내용은 내 기기에만 저장됩니다. 서버에 개인정보가 전송되지 않으므로 안심하고 이용하실 수 있습니다.',
  },
  {
    q: '피해자 본인이 아닌 가족이나 친구도 작성할 수 있나요?',
    a: "네, '피해자의 지인' 모드를 선택하면 가족, 친구 등이 대신 작성할 수 있습니다. 작성자에 따라 탄원서의 문맥이 자동으로 변경됩니다.",
  },
]

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      custom={index * 0.05}
      variants={fadeInUp}
      className="border-b border-[#F0F0F0]"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="text-[15px] font-medium text-[#111111] pr-4">{q}</span>
        <svg
          className={`w-5 h-5 text-[#888888] flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-[#444444] leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ─── Feature Card Icons ─── */
function FeatureIcon({ type }: { type: string }) {
  const cls = 'w-8 h-8 text-[#1B3B2F]'
  switch (type) {
    case 'mode':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      )
    case 'court':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
        </svg>
      )
    case 'steps':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      )
    case 'ocr':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      )
    case 'tap':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3.15M10.05 4.575a1.575 1.575 0 013.15 0v3.15M10.05 4.575v3.15M3.75 7.725c0-.621.504-1.125 1.125-1.125H6.6m10.8 0h1.725c.621 0 1.125.504 1.125 1.125v10.65c0 .621-.504 1.125-1.125 1.125H5.025a1.275 1.275 0 01-1.275-1.275V7.725z" />
        </svg>
      )
    case 'ai':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
      )
    default:
      return null
  }
}

/* ─── Features data ─── */
const features = [
  {
    icon: 'mode',
    title: '피해자 본인 vs 지인 맞춤형 모드',
    desc: '누가 작성하나요? 피해자 본인 또는 가족·친구가 대신 작성할 수 있습니다. 작성자에 따라 문맥이 자동으로 변경됩니다.',
  },
  {
    icon: 'court',
    title: '법원 or 검찰 제출서 맞춤 작성',
    desc: '어디에 제출하실 탄원서인가요? 법원 제출용(재판 중 - 엄벌 요청)과 검찰 제출용(수사 중 - 기소 요청) 중 선택하면 제출 기관에 따라 탄원 내용이 달라집니다.',
  },
  {
    icon: 'steps',
    title: '6단계 질문에 답하기만 하면 OK',
    desc: '사건 정보, 피해 경위, 피해 증상, 무너진 일상 등 단계별 질문에 답하기만 하세요. 법률 용어를 몰라도, 글 재주가 없어도 괜찮습니다.',
  },
  {
    icon: 'ocr',
    title: '사건 문서 AI 분석·OCR 지원',
    desc: '기소장 또는 관련 서류를 업로드하면 AI가 범죄경위 핵심을 알아서 추출합니다. PDF, Word, 한글(HWP), TXT, 이미지 파일을 지원합니다.',
  },
  {
    icon: 'tap',
    title: '탭 한 번으로 피해 항목 선택',
    desc: '심리적 피해(불안감, 우울감, PTSD, 수면장애 등)와 신체적 피해, 무너진 일상(퇴사, 이사, 외출 두려움 등)을 터치만으로 선택합니다. 탄원서의 설득력을 높여줍니다.',
  },
  {
    icon: 'ai',
    title: '논리적이고 호소력 짙은 탄원서 자동 완성',
    desc: 'AI가 작성한 탄원서를 직접 수정할 수 있습니다. Word 파일 다운로드, 전문가 검토 신청, 카톡 공유 기능을 제공합니다.',
  },
]

/* ─── Process steps ─── */
const processSteps = [
  { num: '01', title: '작성자·제출처 선택', desc: '본인/지인, 법원/검찰을 선택합니다.' },
  { num: '02', title: '사건 정보 입력', desc: '죄명, 피고인 이름, 사건번호 등을 입력합니다.' },
  { num: '03', title: '피해 내용 작성', desc: '질문에 답하거나 서류를 업로드합니다.' },
  { num: '04', title: '탄원서 자동 완성', desc: 'AI가 엄벌 탄원서를 작성합니다.' },
  { num: '05', title: '다운로드·검토 신청', desc: 'Word 다운로드 또는 변호사 검토를 신청합니다.' },
]

/* ─── Main Content Component ─── */
export default function SincerityContent() {
  return (
    <>
      {/* ─── Section 1: Hero ─── */}
      <section className="bg-[#FAFAFA] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeInUp}
            className="text-xs tracking-[0.2em] text-[#888888] font-medium mb-4 uppercase"
          >
            ROH &amp; LEE APP
          </motion.p>

          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.1}
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#111111] tracking-tight"
          >
            진심의 무게
          </motion.h1>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.2}
            variants={fadeInUp}
            className="mt-6 text-lg md:text-xl text-[#444444]"
          >
            피해자의 마음을 담아, AI가 함께 쓰는 탄원서.
          </motion.p>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.3}
            variants={fadeInUp}
            className="mt-4 text-sm md:text-base text-[#888888] leading-relaxed max-w-2xl mx-auto"
          >
            피해자 전문 변호사가 직접 설계한 엄벌 탄원서 작성 도우미.<br />
            뭘 써야 할지 막막했던 엄벌 탄원서, 3분이면 완성됩니다.
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.4}
            variants={fadeInUp}
            className="mt-10"
          >
            <a
              href="https://sincerity-weight.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#1B3B2F] text-white px-8 py-4 rounded-lg hover:bg-[#152f25] transition font-medium text-sm md:text-base"
            >
              무료로 작성 시작하기
            </a>
            <p className="mt-3 text-xs text-[#888888]">
              작성 내용은 내 기기에만 저장됩니다
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Section 2: Screenshot Gallery ─── */}
      <ScreenshotGallery />

      {/* ─── Section 3: About ─── */}
      <section className="bg-[#FAFAFA] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            custom={0}
            variants={fadeInUp}
            className="text-xs tracking-[0.2em] text-[#888888] font-medium mb-4 uppercase"
          >
            About
          </motion.p>

          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            custom={0.1}
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-semibold text-[#111111] tracking-tight"
          >
            탄원서, 이제 혼자 쓰지 마세요.
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            custom={0.2}
            variants={fadeInUp}
            className="mt-8 max-w-3xl"
          >
            <p className="text-[15px] text-[#444444] leading-relaxed">
              탄원서는 피해자의 고통을 법원과 검찰에 전달하는 가장 직접적인 수단입니다. 하지만 법률 용어와 형식을 모르면 진심이 제대로 전달되지 않습니다.
            </p>
            <p className="mt-4 text-[15px] text-[#444444] leading-relaxed">
              진심의무게는 피해자 전문 변호사가 직접 설계한 AI 엄벌 탄원서 작성 도우미입니다. 쉬운 질문에 답하기만 하면, AI가 법원·검찰 제출에 적합한 형식과 언어로 탄원서를 완성합니다.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            custom={0.3}
            variants={fadeInUp}
            className="mt-8 flex flex-wrap gap-3"
          >
            {['변호사가 만든 서비스', '10,000+ 이용', '무료 작성'].map((badge) => (
              <span
                key={badge}
                className="px-4 py-2 bg-white text-sm text-[#444444] font-medium border border-[#F0F0F0] rounded-full"
              >
                {badge}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Section 4: Features ─── */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            custom={0}
            variants={fadeInUp}
            className="text-xs tracking-[0.2em] text-[#888888] font-medium mb-4 uppercase"
          >
            Features
          </motion.p>

          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            custom={0.1}
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-semibold text-[#111111] tracking-tight mb-12"
          >
            이렇게 작동합니다
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.icon}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                custom={i * 0.1}
                variants={fadeInUp}
                className="bg-[#FAFAFA] rounded-2xl p-8 border border-[#F0F0F0]"
              >
                <div className="mb-5">
                  <FeatureIcon type={f.icon} />
                </div>
                <h3 className="text-base font-semibold text-[#111111] tracking-tight">
                  {f.title}
                </h3>
                <p className="mt-3 text-sm text-[#444444] leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 5: Process ─── */}
      <section className="bg-[#FAFAFA] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            custom={0}
            variants={fadeInUp}
            className="text-xs tracking-[0.2em] text-[#888888] font-medium mb-4 uppercase"
          >
            Process
          </motion.p>

          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            custom={0.1}
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-semibold text-[#111111] tracking-tight mb-12"
          >
            이용 절차
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.num}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                custom={i * 0.1}
                variants={fadeInUp}
                className="relative flex md:flex-col items-start md:items-center md:text-center gap-4 md:gap-0"
              >
                {/* Step number */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1B3B2F] flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">{step.num}</span>
                </div>

                {/* Connector line (desktop) */}
                {i < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-5 left-[calc(50%+24px)] w-[calc(100%-48px)] h-px bg-[#E0E0E0]" />
                )}

                {/* Connector line (mobile) */}
                {i < processSteps.length - 1 && (
                  <div className="md:hidden absolute top-10 left-5 w-px h-[calc(100%)] bg-[#E0E0E0] -translate-x-1/2" />
                )}

                <div className="md:mt-4">
                  <h3 className="text-sm font-semibold text-[#111111]">{step.title}</h3>
                  <p className="mt-1 text-xs text-[#888888] leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 6: Expert Review ─── */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            custom={0}
            variants={fadeInUp}
            className="text-xs tracking-[0.2em] text-[#888888] font-medium mb-4 uppercase"
          >
            Expert Review
          </motion.p>

          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            custom={0.1}
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-semibold text-[#111111] tracking-tight"
          >
            변호사가 직접 검토합니다
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            custom={0.2}
            variants={fadeInUp}
            className="mt-8 max-w-3xl"
          >
            <p className="text-[15px] text-[#444444] leading-relaxed">
              AI가 작성한 탄원서, 그대로 제출해도 되지만 변호사 검수를 거치면 설득력이 달라집니다.
            </p>
            <p className="mt-4 text-[15px] text-[#444444] leading-relaxed">
              이유림·노채은 대표변호사가 직접 검토하고 피드백을 드립니다.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            custom={0.3}
            variants={fadeInUp}
            className="mt-8 bg-[#FAFAFA] rounded-2xl p-8 border border-[#F0F0F0] max-w-2xl"
          >
            <div className="flex flex-col gap-4">
              {[
                { num: '1', text: '탄원서 작성 후 전문가 검토 신청 버튼 클릭' },
                { num: '2', text: '이유림·노채은 대표변호사가 직접 검토' },
                { num: '3', text: '수정사항 피드백 제공' },
              ].map((item) => (
                <div key={item.num} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1B3B2F] text-white text-xs font-semibold flex items-center justify-center">
                    {item.num}
                  </span>
                  <p className="text-sm text-[#444444] leading-relaxed pt-0.5">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Section 7: FAQ ─── */}
      <section className="bg-[#FAFAFA] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            custom={0}
            variants={fadeInUp}
            className="text-xs tracking-[0.2em] text-[#888888] font-medium mb-4 uppercase"
          >
            FAQ
          </motion.p>

          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            custom={0.1}
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-semibold text-[#111111] tracking-tight mb-10"
          >
            자주 묻는 질문
          </motion.h2>

          <div className="max-w-3xl">
            {faqData.map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 8: CTA ─── */}
      <section className="bg-[#1B3B2F] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            custom={0}
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-semibold text-white tracking-tight"
          >
            지금 당신의 진심을 전하세요.
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            custom={0.1}
            variants={fadeInUp}
            className="mt-4 text-lg text-white/80"
          >
            뭘 써야 할지 막막했던 엄벌 탄원서, 3분이면 완성됩니다.
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            custom={0.2}
            variants={fadeInUp}
            className="mt-10"
          >
            <a
              href="https://sincerity-weight.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-[#1B3B2F] font-medium px-8 py-4 rounded-lg hover:bg-gray-100 transition text-sm md:text-base"
            >
              무료로 작성 시작하기
            </a>
            <p className="mt-4 text-sm text-white/60">
              또는 전화 상담: 032-207-8788
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}
