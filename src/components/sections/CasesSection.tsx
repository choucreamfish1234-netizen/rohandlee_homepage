'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ScrollReveal from '@/components/ScrollReveal'
import { EditableText } from '@/components/Editable'
import { type SuccessCase, DEFAULT_CASES } from '@/lib/cases'

export default function CasesSection() {
  const [cases, setCases] = useState<SuccessCase[]>(DEFAULT_CASES.slice(0, 4))

  useEffect(() => {
    async function fetchCases() {
      try {
        const res = await fetch('/api/cases')
        const data = await res.json()
        if (data.cases && data.cases.length > 0) {
          const published = data.cases.filter((c: SuccessCase) => c.published !== false)
          setCases(published.slice(0, 4))
        }
      } catch {
        // keep DEFAULT_CASES
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
          <EditableText
            page="home"
            section="cases"
            fieldKey="heading"
            defaultValue="결과로 증명합니다."
            tag="h2"
            className="text-xl sm:text-3xl font-bold text-center text-black mb-10 sm:mb-20"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          {cases.map((c, i) => (
            <ScrollReveal key={c.id || i} delay={i * 0.15}>
              <Link href={`/cases/${c.slug || c.id}`} className="group block h-full">
                <div className="bg-white border border-gray-100 overflow-hidden hover:border-gray-200 transition-all duration-300 h-full flex flex-col relative">

                  <div className="aspect-[16/10] overflow-hidden">
                    <Image
                      src={c.image_url}
                      alt={c.title}
                      width={800}
                      height={500}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  </div>

                  <div className="p-5 sm:p-10 flex flex-col flex-1">
                    <span className={`self-start inline-block text-xs font-medium px-3 py-1 ${c.tag_color} mb-5`}>
                      {c.tag}
                    </span>

                    <h3 className="text-lg sm:text-xl font-bold text-black leading-snug mb-3 group-hover:text-[#1B3B2F] transition-colors">
                      {c.title}
                    </h3>

                    <p className="text-sm text-gray-500 leading-relaxed mb-8 flex-1">
                      {c.summary}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className={`inline-flex items-center text-sm font-semibold px-4 py-2 border shadow-sm ${c.badge_color}`}>
                        {c.badge}
                      </div>
                      <span className="text-xs text-gray-400 group-hover:text-[#1B3B2F] transition-colors">
                        자세히 보기 &rarr;
                      </span>
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
