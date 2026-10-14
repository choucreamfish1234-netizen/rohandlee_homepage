'use client'

import { useState } from 'react'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'
import { areaNavs } from '@/data/practice/nav'

export default function AreaShortcutsSection() {
  const [active, setActive] = useState(0)

  return (
    <section className="py-12 sm:py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">Quick Links</p>
          <h2 className="text-xl sm:text-3xl font-bold text-center text-black mb-8 sm:mb-12">분야별 바로가기</h2>
        </ScrollReveal>

        <div role="tablist" aria-label="업무 분야" className="-mx-4 px-4 overflow-x-auto">
          <div className="flex sm:justify-center gap-2 min-w-max sm:min-w-0">
            {areaNavs.map((a, i) => (
              <button
                key={a.href}
                role="tab"
                id={`area-tab-${i}`}
                aria-selected={i === active}
                aria-controls={`area-panel-${i}`}
                onClick={() => setActive(i)}
                className={`text-sm px-4 py-2.5 rounded-full border transition-colors whitespace-nowrap ${
                  i === active
                    ? 'bg-[#1B3B2F] border-[#1B3B2F] text-white'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-[#1B3B2F]/40'
                }`}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>

        {/* 비활성 패널도 HTML에 남겨 두어(hidden) 하위 페이지 링크가 크롤링되도록 한다 */}
        {areaNavs.map((a, i) => (
          <div
            key={a.href}
            role="tabpanel"
            id={`area-panel-${i}`}
            aria-labelledby={`area-tab-${i}`}
            hidden={i !== active}
            className="mt-6 rounded-2xl bg-white border border-gray-200 p-5 sm:p-8"
          >
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {a.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block text-sm text-gray-700 hover:text-[#1B3B2F] hover:bg-[#1B3B2F]/5 rounded-lg px-3 py-2.5 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={a.href}
              className="inline-block mt-5 text-sm font-medium text-[#1B3B2F] hover:text-[#C9A24B] transition-colors"
            >
              {a.label} 전체 보기 &rarr;
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
