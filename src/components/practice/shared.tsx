import Link from 'next/link'
import type { PracticeFaq, PracticeStep, RelatedArea } from '@/data/practice'
import { CASE_DISCLAIMER, type PracticeCase } from '@/data/practice/cases'

const BASE_URL = 'https://lawfirmrohandlee.com'

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export function faqJsonLd(faqs: PracticeFaq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function serviceJsonLd(name: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `${BASE_URL}${path}`,
    areaServed: { '@type': 'Country', name: 'KR' },
    provider: { '@type': 'LegalService', '@id': `${BASE_URL}/#legalservice`, name: '법률사무소 로앤이', url: BASE_URL },
  }
}

export function PracticeHero({ title, subtitle, eyebrow }: { title: string; subtitle: string; eyebrow?: string }) {
  return (
    <section
      className="relative overflow-hidden text-white py-16 sm:py-24"
      style={{ background: 'linear-gradient(135deg, #1B3B2F 0%, #2d5a47 55%, #1B3B2F 100%)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.08) 0%, transparent 60%)' }}
      />
      <div className="relative max-w-4xl mx-auto px-5 text-center">
        {eyebrow && (
          <span className="inline-block text-xs sm:text-sm font-semibold text-[#C9A24B] tracking-wide mb-5">{eyebrow}</span>
        )}
        <h1 className="text-2xl sm:text-4xl font-bold leading-snug whitespace-pre-line">{title}</h1>
        <p className="mt-5 text-sm sm:text-base text-white/75 leading-relaxed max-w-2xl mx-auto">{subtitle}</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/consultation"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-[#1B3B2F] text-sm font-semibold rounded-full hover:bg-gray-100 transition-colors min-h-[48px]"
          >
            상담 신청하기
          </Link>
          <a
            href="tel:+82322078788"
            className="inline-flex items-center justify-center px-8 py-3.5 border border-white/40 text-white text-sm font-medium rounded-full hover:bg-white/10 transition-colors min-h-[48px]"
          >
            032-207-8788
          </a>
        </div>
      </div>
    </section>
  )
}

export function ConsultationCTA({ text }: { text?: string }) {
  return (
    <section
      className="py-16 sm:py-20 text-white"
      style={{ background: 'linear-gradient(135deg, #1B3B2F 0%, #2d5a47 50%, #1B3B2F 100%)' }}
    >
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-xl sm:text-3xl font-bold leading-snug">{text || '어떤 사건이든, 첫 상담이 결과를 바꿉니다.'}</h2>
        <p className="mt-4 text-sm text-[#C9A24B] font-medium">대표변호사가 직접 상담합니다.</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/consultation"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-[#C9A24B] text-[#1B3B2F] text-sm font-bold rounded-full hover:bg-[#d6b25f] transition-colors min-h-[48px]"
          >
            상담 신청하기
          </Link>
          <a
            href="tel:+82322078788"
            className="inline-flex items-center justify-center px-8 py-3.5 border border-white/40 text-white text-sm font-medium rounded-full hover:bg-white/10 transition-colors min-h-[48px]"
          >
            032-207-8788
          </a>
        </div>
      </div>
    </section>
  )
}

export function CaseCard({ c }: { c: PracticeCase }) {
  return (
    <Link
      href={`/cases/${c.slug}`}
      className="group flex flex-col h-full rounded-xl border border-gray-200 bg-white p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A24B] hover:shadow-md"
    >
      <span className="text-xs font-bold text-[#C9A24B]">{c.category}</span>
      <h3 className="mt-2 text-base font-bold text-black leading-snug">{c.title}</h3>
      <p className="mt-2 text-sm text-gray-500 leading-relaxed flex-1">{c.summary}</p>
      <p className="mt-4 text-sm font-bold text-[#1B3B2F]">
        <span className="text-[#C9A24B]">결과</span> · {c.result}
      </p>
    </Link>
  )
}

export function CaseDisclaimer({ className = '' }: { className?: string }) {
  return <p className={`text-xs text-gray-400 leading-relaxed ${className}`}>{CASE_DISCLAIMER}</p>
}

export function RelatedCases({ cases, title = '관련 대응 사례' }: { cases: PracticeCase[]; title?: string }) {
  if (cases.length === 0) return null
  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between gap-4 mb-8">
          <h2 className="text-2xl font-bold text-black">{title}</h2>
          <Link href="/cases" className="text-sm text-gray-500 hover:text-[#1B3B2F] transition-colors flex-shrink-0">
            전체 사례 보기 &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cases.map((c) => (
            <CaseCard key={c.slug} c={c} />
          ))}
        </div>
        <CaseDisclaimer className="mt-6" />
      </div>
    </section>
  )
}

export function FaqList({ faqs }: { faqs: PracticeFaq[] }) {
  return (
    <section className="py-14 sm:py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-3">FAQ</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-10">자주 묻는 질문</h2>
        <div className="divide-y divide-gray-200 border-y border-gray-200">
          {faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-sm sm:text-base font-medium text-black">
                {f.q}
                <span className="mt-0.5 flex-shrink-0 text-gray-400 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export function StepList({ steps, title, bg = 'bg-white' }: { steps: PracticeStep[]; title: string; bg?: string }) {
  return (
    <section className={`py-14 sm:py-20 ${bg}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl font-bold text-black mb-8">{title}</h2>
        <ol className="space-y-5">
          {steps.map((s, i) => (
            <li key={s.title} className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1B3B2F] text-white text-sm font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-black">{s.title}</h3>
                <p className="mt-1 text-sm text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function RelatedAreas({ items }: { items: RelatedArea[] }) {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-lg font-bold text-black mb-5">관련 분야</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {items.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="group block rounded-xl border border-gray-200 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C9A24B]"
            >
              <span className="text-sm font-bold text-black">{r.title}</span>
              <span className="block mt-1.5 text-xs text-gray-500 leading-relaxed">{r.desc}</span>
              <span className="inline-block mt-3 text-xs text-gray-400 group-hover:text-[#C9A24B] transition-colors">더 보기 &rarr;</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
