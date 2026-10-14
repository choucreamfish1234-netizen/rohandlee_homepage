'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'

export interface FeaturedCase {
  slug: string
  label: string
  title: string
  summary: string
  result: string
}

const INTERVAL = 5000

export default function FeaturedCasesSection({ cases, disclaimer }: { cases: FeaturedCase[]; disclaimer: string }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => setIndex((i) => (i + 1) % cases.length), [cases.length])
  const prev = () => setIndex((i) => (i - 1 + cases.length) % cases.length)

  useEffect(() => {
    if (paused || cases.length < 2) return
    const t = setInterval(next, INTERVAL)
    return () => clearInterval(t)
  }, [paused, next, cases.length])

  return (
    <section className="py-12 sm:py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">Recent Cases</p>
          <h2 className="text-xl sm:text-3xl font-bold text-center text-black mb-10 sm:mb-14">최근 대응 사례</h2>
        </ScrollReveal>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="overflow-hidden rounded-2xl">
            <ul
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
              aria-live="polite"
            >
              {cases.map((c, i) => (
                <li key={c.slug} className="w-full flex-shrink-0" aria-hidden={i !== index}>
                  <Link
                    href={`/cases/${c.slug}`}
                    tabIndex={i === index ? 0 : -1}
                    className="block bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 hover:border-[#C9A24B] transition-colors"
                  >
                    <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-[#1B3B2F]/5 text-[#1B3B2F]">
                      {c.label}
                    </span>
                    <h3 className="mt-4 text-lg sm:text-2xl font-bold text-black leading-snug">{c.title}</h3>
                    <p className="mt-3 text-sm sm:text-base text-gray-500 leading-relaxed">{c.summary}</p>
                    <p className="mt-6 text-base sm:text-lg font-bold text-[#C9A24B]">{c.result}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex gap-2">
              {cases.map((c, i) => (
                <button
                  key={c.slug}
                  onClick={() => setIndex(i)}
                  aria-label={`${i + 1}번째 사례 보기`}
                  className={`h-1.5 rounded-full transition-all ${i === index ? 'bg-[#1B3B2F] w-6' : 'bg-gray-300 w-1.5'}`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                aria-label="이전 사례"
                className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:border-[#1B3B2F] hover:text-[#1B3B2F] transition-colors"
              >
                &larr;
              </button>
              <button
                onClick={next}
                aria-label="다음 사례"
                className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:border-[#1B3B2F] hover:text-[#1B3B2F] transition-colors"
              >
                &rarr;
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/cases" className="text-sm font-medium text-[#1B3B2F] hover:text-[#C9A24B] transition-colors">
            전체 사례 보기 &rarr;
          </Link>
        </div>
        <p className="mt-6 text-xs text-gray-400 leading-relaxed text-center max-w-2xl mx-auto">{disclaimer}</p>
      </div>
    </section>
  )
}
