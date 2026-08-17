'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'
import { type SuccessCase, DEFAULT_CASES } from '@/lib/cases'

export default function CenterCases() {
  const [cases, setCases] = useState<SuccessCase[]>([])

  useEffect(() => {
    async function fetchCases() {
      try {
        const res = await fetch('/api/cases')
        const data = await res.json()
        const all: SuccessCase[] = data.cases || []
        const filtered = all.filter(c =>
          c.published !== false &&
          c.representation_side === 'victim' &&
          (c.practice_area === 'sexual_crime' || c.practice_area === 'stalking' || c.practice_area === 'digital_sex_crime' ||
           c.category === '성범죄' || c.category === '스토킹')
        )
        setCases(filtered.slice(0, 4))
      } catch {
        const fallback = DEFAULT_CASES.filter(c =>
          c.category === '성범죄' || c.category === '스토킹'
        )
        setCases(fallback.slice(0, 4))
      }
    }
    fetchCases()
  }, [])

  if (cases.length === 0) return null

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">
            Cases
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-16">
            성범죄 피해자 대리 사례
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cases.map((c, i) => (
            <ScrollReveal key={c.id} delay={i * 0.15}>
              <Link href={`/cases/${c.slug || c.id}`} className="group block">
                <div className="border border-gray-200 overflow-hidden hover:border-gray-400 transition-colors duration-300">
                  <div className="aspect-[16/10] overflow-hidden">
                    <Image
                      src={c.image_url}
                      alt={c.title}
                      width={800}
                      height={500}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      unoptimized
                    />
                  </div>
                  <div className="p-8">
                    <span className={`inline-block text-xs font-medium px-3 py-1 ${c.tag_color} mb-3`}>
                      {c.representation_side === 'victim' ? '피해자 대리' : c.tag}
                    </span>
                    {c.procedure_stages && c.procedure_stages.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {c.procedure_stages.slice(0, 3).map(s => (
                          <span key={s} className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded">{s}</span>
                        ))}
                      </div>
                    )}
                    <h3 className="text-lg font-semibold text-black leading-snug mb-6 group-hover:text-[#1B3B2F] transition-colors">
                      {c.title}
                    </h3>
                    <div className={`inline-flex items-center text-sm font-semibold px-4 py-2 border ${c.badge_color}`}>
                      {c.badge}
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="text-center mt-12">
            <Link
              href="/cases"
              className="inline-flex items-center text-sm text-gray-500 hover:text-black transition-colors py-3"
            >
              피해자 대리 사례 전체 보기
              <span className="ml-1">&rarr;</span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
