'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { type SuccessCase, DEFAULT_CASES } from '@/lib/cases'
import { useConsultation } from '@/components/ConsultationProvider'

export default function CaseDetailContent({ slug, initialCase }: { slug: string; initialCase?: SuccessCase | null }) {
  const [caseData, setCaseData] = useState<SuccessCase | null>(initialCase ?? null)
  const [loading, setLoading] = useState(!initialCase)
  const { openConsultation } = useConsultation()

  useEffect(() => {
    if (initialCase?.content) return

    async function fetchCase() {
      try {
        const res = await fetch(`/api/cases/${encodeURIComponent(slug)}`)
        const data = await res.json()
        if (data.case) {
          setCaseData(data.case)
        }
      } catch {
        if (!initialCase) {
          const fallback = DEFAULT_CASES.find(c => c.slug === slug)
          if (fallback) setCaseData(fallback)
        }
      } finally {
        setLoading(false)
      }
    }
    fetchCase()
  }, [slug, initialCase])

  if (loading) {
    return (
      <section className="py-20 max-w-3xl mx-auto px-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-100 rounded w-1/4" />
          <div className="h-10 bg-gray-100 rounded w-3/4" />
          <div className="h-4 bg-gray-100 rounded w-1/3" />
          <div className="mt-8 aspect-[16/9] bg-gray-100 rounded-xl" />
          <div className="space-y-3 mt-8">
            <div className="h-4 bg-gray-100 rounded w-full" />
            <div className="h-4 bg-gray-100 rounded w-5/6" />
            <div className="h-4 bg-gray-100 rounded w-4/6" />
          </div>
        </div>
      </section>
    )
  }

  if (!caseData) {
    return (
      <section className="py-20 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-black mb-4">성공사례를 찾을 수 없습니다</h1>
        <p className="text-sm text-gray-500 mb-6">삭제되었거나 존재하지 않는 사례입니다.</p>
        <Link href="/cases" className="text-sm text-[#1B3B2F] font-medium hover:underline">
          성공사례 목록으로 돌아가기
        </Link>
      </section>
    )
  }

  const hasContent = caseData.content && caseData.content.trim().length > 0

  return (
    <section className="py-16 sm:py-20">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto px-4 sm:px-6 md:px-0"
      >
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-8">
          <Link href="/cases" className="hover:text-black transition-colors">성공사례</Link>
          <span>/</span>
          <span>{caseData.tag}</span>
        </div>

        {/* Tag Badge */}
        <span className={`inline-block text-xs font-semibold px-4 py-1.5 mb-5 ${caseData.tag_color}`}>
          {caseData.tag}
        </span>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-black leading-tight mb-6">
          {caseData.title}
        </h1>

        {/* Badge */}
        <div className="mb-8">
          <span className={`inline-flex items-center text-sm font-semibold px-5 py-2 border shadow-sm ${caseData.badge_color}`}>
            {caseData.badge}
          </span>
        </div>

        {/* Thumbnail */}
        <div className="aspect-[16/9] overflow-hidden rounded-xl shadow-lg mb-12">
          <Image
            src={caseData.image_url}
            alt={caseData.title}
            width={1200}
            height={675}
            className="w-full h-full object-cover"
            priority
            unoptimized
          />
        </div>

        {/* Summary */}
        <div className="bg-[#f8faf9] border-l-4 border-[#1B3B2F] rounded-r-lg p-5 mb-10 shadow-sm">
          <p className="text-[#1B3B2F]/80 text-[17px] leading-8">
            {caseData.summary}
          </p>
        </div>

        {/* Markdown Content */}
        {hasContent ? (
          <div className="case-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => (
                  <div className="mt-12 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-8 bg-[#1B3B2F] rounded-full" />
                      <h2 className="text-2xl font-bold text-[#1B3B2F]">{children}</h2>
                    </div>
                  </div>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold text-[#2d5a47] mt-8 mb-3 pl-4 border-l-2 border-[#1B3B2F]/30">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-gray-700 leading-8 mb-5 text-[17px] tracking-tight">
                    {children}
                  </p>
                ),
                strong: ({ children }) => (
                  <strong className="text-[#1B3B2F] font-bold bg-[#1B3B2F]/5 px-1 rounded">
                    {children}
                  </strong>
                ),
                blockquote: ({ children }) => (
                  <div className="my-6 bg-[#f8faf9] border-l-4 border-[#1B3B2F] rounded-r-lg p-5 shadow-sm">
                    <div className="text-[#1B3B2F]/80 text-[16px] leading-7 italic">
                      {children}
                    </div>
                  </div>
                ),
                ul: ({ children }) => (
                  <ul className="my-5 space-y-3 pl-2">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="my-5 space-y-3 pl-2 list-none">{children}</ol>
                ),
                li: ({ children }) => (
                  <li className="flex items-start gap-3 text-gray-700 leading-7 text-[17px]">
                    <span className="mt-2.5 w-2 h-2 bg-[#1B3B2F] rounded-full flex-shrink-0" />
                    <span>{children}</span>
                  </li>
                ),
                a: ({ href, children }) => (
                  <a href={href} className="text-[#1B3B2F] font-medium underline underline-offset-2 hover:text-[#2d5a47] transition-colors" target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                ),
                hr: () => (
                  <div className="my-10 flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-[#1B3B2F]/20 rounded-full" />
                    <div className="w-2 h-2 bg-[#1B3B2F]/40 rounded-full" />
                    <div className="w-2 h-2 bg-[#1B3B2F]/20 rounded-full" />
                  </div>
                ),
                img: ({ src, alt }) => (
                  <span className="block my-8">
                    <Image
                      src={src || ''}
                      alt={alt || ''}
                      width={800}
                      height={450}
                      className="w-full rounded-lg shadow-md"
                      unoptimized
                    />
                    {alt && <span className="block text-center text-xs text-gray-400 mt-2">{alt}</span>}
                  </span>
                ),
              }}
            >
              {caseData.content!}
            </ReactMarkdown>
          </div>
        ) : (
          <div className="text-center py-10 text-gray-400 text-sm">
            <p>상세 내용이 아직 준비되지 않았습니다.</p>
          </div>
        )}

        {/* Divider */}
        <div className="my-14 flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-[#1B3B2F]/20 rounded-full" />
          <div className="w-2 h-2 bg-[#1B3B2F]/40 rounded-full" />
          <div className="w-2 h-2 bg-[#1B3B2F]/20 rounded-full" />
        </div>

        {/* Back to list */}
        <div className="mb-12">
          <Link
            href="/cases"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#1B3B2F] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            성공사례 목록으로 돌아가기
          </Link>
        </div>

        {/* CTA */}
        <div className="rounded-2xl bg-gradient-to-br from-[#1B3B2F] to-[#2d5a47] p-6 sm:p-10 text-center shadow-xl">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-3">비슷한 사건으로 고민 중이신가요?</h3>
          <p className="text-sm text-white/70 mb-6 sm:mb-8 max-w-md mx-auto">
            전문 변호사가 끝까지 함께합니다. 지금 바로 무료 상담을 신청하세요.
          </p>
          <button
            onClick={() => openConsultation()}
            className="bg-white text-[#1B3B2F] text-sm font-semibold px-8 py-3.5 rounded-full hover:bg-white/90 transition-colors shadow-md min-h-[48px]"
          >
            무료 상담 신청
          </button>
        </div>
      </motion.article>
    </section>
  )
}
