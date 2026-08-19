'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'
import { type SuccessCase, DEFAULT_CASES, CENTER_CATEGORY_OPTIONS } from '@/lib/cases'

export default function CasesSection() {
  const [cases, setCases] = useState<SuccessCase[]>(DEFAULT_CASES.filter(c => c.featured).slice(0, 8))

  useEffect(() => {
    async function fetchCases() {
      try {
        const res = await fetch('/api/cases')
        const data = await res.json()
        if (data.cases && data.cases.length > 0) {
          const published = (data.cases as SuccessCase[]).filter(c => c.published !== false)
          const featured = published.filter(c => c.featured)
          if (featured.length > 0) {
            setCases(featured.slice(0, 8))
          } else {
            setCases(published.slice(0, 8))
          }
        }
      } catch {
        // keep fallback
      }
    }
    fetchCases()
  }, [])

  return (
    <section className="py-12 sm:py-20 bg-[#f5f8f6]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">
            Results
          </p>
          <h2 className="text-xl sm:text-3xl font-bold text-center text-black mb-10 sm:mb-20">
            결과로 증명합니다.
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {cases.map((c, i) => (
            <ScrollReveal key={c.id || i} delay={i * 0.1}>
              <Link href={`/cases/${c.slug || c.id}`} className="group block h-full">
                <div className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-gray-300 transition-all duration-300 h-full flex flex-col">
                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                    {/* Center category badges */}
                    {c.center_categories && c.center_categories.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {c.center_categories.map((cat: string) => {
                          const info = CENTER_CATEGORY_OPTIONS.find(o => o.value === cat)
                          return info ? (
                            <span key={cat} className="text-[10px] font-medium px-2 py-0.5 bg-[#1B3B2F] text-white rounded-full">{info.label}</span>
                          ) : null
                        })}
                      </div>
                    ) : (
                      <span className={`self-start inline-block text-[10px] font-medium px-2.5 py-0.5 ${c.tag_color} rounded-full mb-3`}>
                        {c.tag}
                      </span>
                    )}

                    <h3 className="text-base sm:text-lg font-semibold text-black leading-snug mb-2 group-hover:text-[#1B3B2F] transition-colors line-clamp-2">
                      {c.title}
                    </h3>

                    <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1 line-clamp-2">
                      {c.summary}
                    </p>

                    <div className={`self-start inline-flex items-center text-xs font-bold px-3 py-1.5 border ${c.badge_color}`}>
                      {c.badge}
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-12 text-center">
            <Link
              href="/cases"
              className="inline-flex items-center text-sm text-black font-medium hover:text-accent transition-colors"
            >
              성공사례 더보기 <span className="ml-1">&rarr;</span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
