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
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <ScrollReveal className="lg:col-span-4">
          <p className="eyebrow">Recent Cases</p>
          <h2 className="mt-5 font-serif text-3xl sm:text-5xl font-semibold text-[#1C1C1A] leading-tight">
            최근 대응 사례
          </h2>
          <p className="mt-6 text-sm sm:text-base text-[#1C1C1A]/60 leading-relaxed">
            분야마다 다른 쟁점, 다른 전략. 로앤이가 실제로 걸어온 사건의 기록입니다.
          </p>
          <Link
            href="/cases"
            className="mt-8 hidden lg:inline-flex items-center gap-2 text-sm font-semibold text-[#1B3B2F] border-b border-[#1B3B2F] pb-1 hover:text-[#B8955A] hover:border-[#B8955A] transition-colors"
          >
            전체 사례 보기 <span aria-hidden>&rarr;</span>
          </Link>
        </ScrollReveal>

        <div
          className="lg:col-span-8"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="overflow-hidden">
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
                    className="group bg-[#F6F2EA] p-7 sm:p-12 min-h-[320px] sm:min-h-[360px] flex flex-col"
                  >
                    <div className="flex items-center justify-between text-xs tracking-[0.2em] text-[#1C1C1A]/50">
                      <span className="uppercase">{c.label}</span>
                      <span className="font-serif">
                        {String(i + 1).padStart(2, '0')} / {String(cases.length).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="mt-8 font-serif text-2xl sm:text-[2rem] font-semibold text-[#1C1C1A] leading-snug group-hover:text-[#1B3B2F] transition-colors">
                      {c.title}
                    </h3>
                    <p className="mt-4 text-sm sm:text-base text-[#1C1C1A]/65 leading-relaxed">{c.summary}</p>
                    <div className="mt-auto pt-8 flex items-center gap-4">
                      <span className="h-px w-10 bg-[#B8955A]" />
                      <p className="font-serif text-base sm:text-xl font-semibold text-[#8a6d3b]">{c.result}</p>
                    </div>
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
                  className={`h-[2px] transition-all ${i === index ? 'bg-[#1B3B2F] w-10' : 'bg-[#1C1C1A]/20 w-5'}`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                aria-label="이전 사례"
                className="w-11 h-11 border border-[#1C1C1A]/15 flex items-center justify-center text-[#1C1C1A]/60 hover:bg-[#1B3B2F] hover:text-white hover:border-[#1B3B2F] transition-colors"
              >
                &larr;
              </button>
              <button
                onClick={next}
                aria-label="다음 사례"
                className="w-11 h-11 border border-[#1C1C1A]/15 flex items-center justify-center text-[#1C1C1A]/60 hover:bg-[#1B3B2F] hover:text-white hover:border-[#1B3B2F] transition-colors"
              >
                &rarr;
              </button>
            </div>
          </div>
          <Link href="/cases" className="mt-6 inline-flex lg:hidden text-sm font-semibold text-[#1B3B2F]">
            전체 사례 보기 &rarr;
          </Link>
          <p className="mt-6 text-xs text-[#1C1C1A]/40 leading-relaxed">{disclaimer}</p>
        </div>
      </div>
    </section>
  )
}
