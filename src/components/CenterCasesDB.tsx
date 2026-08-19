'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'
import { type SuccessCase } from '@/lib/cases'

interface Props {
  centerSlug: string
  title?: string
  maxItems?: number
}

export default function CenterCasesDB({ centerSlug, title = '성공사례', maxItems = 6 }: Props) {
  const [cases, setCases] = useState<SuccessCase[]>([])

  useEffect(() => {
    async function fetchCases() {
      try {
        const res = await fetch('/api/cases')
        const data = await res.json()
        const all: SuccessCase[] = data.cases || []
        const filtered = all.filter(c =>
          c.published !== false &&
          c.center_categories &&
          Array.isArray(c.center_categories) &&
          c.center_categories.includes(centerSlug)
        )
        setCases(filtered.slice(0, maxItems))
      } catch { /* keep empty */ }
    }
    fetchCases()
  }, [centerSlug, maxItems])

  if (cases.length === 0) return null

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">Cases</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-12">{title}</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cases.map((c, i) => (
            <ScrollReveal key={c.id} delay={i * 0.1}>
              <Link href={`/cases/${c.slug || c.id}`} className="group block">
                <div className="border border-gray-200 rounded-xl overflow-hidden hover:border-gray-400 transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 ${c.tag_color}`}>{c.tag}</span>
                      {c.representation_side === 'victim' && (
                        <span className="text-[10px] font-medium px-2 py-0.5 bg-[#1B3B2F]/8 text-[#1B3B2F] rounded">피해자 대리</span>
                      )}
                      {c.center_categories && c.center_categories.length > 1 && (
                        <span className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-600 rounded">복합 사례</span>
                      )}
                    </div>
                    <h3 className="text-base font-semibold text-black group-hover:text-[#1B3B2F] transition-colors mb-2 line-clamp-2">{c.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-3">{c.summary}</p>
                    <div className={`inline-flex items-center text-xs font-semibold px-3 py-1.5 border ${c.badge_color}`}>
                      {c.badge}
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="text-center mt-10">
            <Link href="/cases" className="inline-flex items-center text-sm text-gray-500 hover:text-[#1B3B2F] transition-colors py-3">
              성공사례 전체 보기 &rarr;
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
