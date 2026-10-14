import Image from 'next/image'
import { practiceCaseImage } from '@/lib/practice-case-image'
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
    <section className="bg-[#F6F2EA] pt-16 sm:pt-24 pb-14 sm:pb-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-8">
          {eyebrow && <p className="eyebrow tracking-[0.12em] text-xs">{eyebrow}</p>}
          <h1 className="mt-6 font-serif text-[2rem] leading-[1.3] sm:text-5xl sm:leading-[1.25] font-semibold text-[#1C1C1A] whitespace-pre-line tracking-tight">
            {title}
          </h1>
        </div>
        <div className="lg:col-span-4">
          <p className="text-sm sm:text-base text-[#1C1C1A]/65 leading-relaxed">{subtitle}</p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center px-7 py-3.5 bg-[#1B3B2F] text-white text-sm font-semibold tracking-wide hover:bg-[#152f25] transition-colors min-h-[50px]"
            >
              상담 신청하기
            </Link>
            <a
              href="tel:+82322078788"
              className="inline-flex items-center justify-center px-7 py-3.5 border border-[#1B3B2F]/30 text-[#1B3B2F] text-sm font-medium tracking-wide hover:bg-white transition-colors min-h-[50px]"
            >
              032-207-8788
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function SectionTitle({ eyebrow, title, className = '' }: { eyebrow: string; title: string; className?: string }) {
  return (
    <div className={className}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 font-serif text-2xl sm:text-4xl font-semibold text-[#1C1C1A] leading-tight">{title}</h2>
    </div>
  )
}

export function ConsultationCTA({ text }: { text?: string }) {
  return (
    <section className="records-cta bg-[#0f241c] text-white py-20 sm:py-28">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
        <p className="eyebrow justify-center">Consultation</p>
        <h2 className="mt-6 font-serif text-2xl sm:text-4xl font-semibold leading-snug">
          {text || '어떤 사건이든, 첫 상담이 결과를 바꿉니다.'}
        </h2>
        <p className="mt-5 text-sm text-white/60">대표변호사가 직접 상담합니다.</p>
        <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="https://www.latpeed.com/products/vy4Pu" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-10 py-4 bg-[#F6F2EA] text-[#1B3B2F] text-sm font-semibold tracking-wide hover:bg-white transition-colors min-h-[52px]"
          >
            상담예약하기
          </Link>
          <a
            href="tel:+82322078788"
            className="inline-flex items-center justify-center px-10 py-4 border border-white/40 text-white text-sm font-medium tracking-wide hover:bg-white/10 transition-colors min-h-[52px]"
          >
            032-207-8788
          </a>
          <Link href="/consultation#inquiry" className="inline-flex items-center justify-center px-10 py-4 text-sm underline underline-offset-4 min-h-[52px]">문의하기</Link>
        </div>
        <p className="mt-6 text-sm text-white/80"><a href="https://pf.kakao.com/_YxgWxcn/chat" target="_blank" rel="noopener noreferrer">기타 문의는 카카오톡으로 문의해주세요 ↗</a></p>
      </div>
    </section>
  )
}

export function CaseCard({ c }: { c: PracticeCase }) {
  return (
    <Link
      href={`/cases/${c.slug}`}
      className="record-card group flex flex-col h-full bg-white border-t-2 border-[#1C1C1A] pt-6 pb-2 transition-colors hover:border-[#B8955A]"
    >
      <Image src={practiceCaseImage(c).src} alt={practiceCaseImage(c).alt} width={1200} height={800} sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw" className="mb-5 w-full aspect-[3/2] object-cover" />
      <span className="text-[11px] tracking-[0.2em] uppercase text-[#1C1C1A]/50">{c.category}</span>
      <h3 className="mt-3 font-serif text-lg sm:text-xl font-semibold text-[#1C1C1A] leading-snug group-hover:text-[#1B3B2F] transition-colors">
        {c.title}
      </h3>
      <p className="mt-3 text-sm text-[#1C1C1A]/60 leading-relaxed flex-1">{c.summary}</p>
      <div className="record-result mt-5 flex items-center gap-3">
        <span className="h-px w-6 bg-[#B8955A]" />
        <p className="text-sm font-semibold text-[#8a6d3b]">{c.result}</p>
      </div>
      <span className="mt-4 text-xs text-[#1C1C1A]/40 group-hover:text-[#1B3B2F] transition-colors">사례 읽기 &rarr;</span>
    </Link>
  )
}

export function CaseDisclaimer({ className = '' }: { className?: string }) {
  return <p className={`text-xs text-[#1C1C1A]/40 leading-relaxed ${className}`}>{CASE_DISCLAIMER}</p>
}

export function RelatedCases({ cases, title = '관련 대응 사례' }: { cases: PracticeCase[]; title?: string }) {
  if (cases.length === 0) return null
  return (
    <section className="records-related py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-end justify-between gap-4 mb-10">
          <SectionTitle eyebrow="Cases" title={title} />
          <Link
            href="/cases"
            className="text-sm font-semibold text-[#1B3B2F] border-b border-[#1B3B2F] pb-1 hover:text-[#B8955A] hover:border-[#B8955A] transition-colors flex-shrink-0"
          >
            전체 사례 &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {cases.map((c) => (
            <CaseCard key={c.slug} c={c} />
          ))}
        </div>
        <CaseDisclaimer className="mt-10" />
      </div>
    </section>
  )
}

export function FaqList({ faqs }: { faqs: PracticeFaq[] }) {
  return (
    <section className="py-20 sm:py-24 bg-[#F6F2EA]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <SectionTitle eyebrow="FAQ" title="자주 묻는 질문" className="lg:col-span-4" />
        <div className="lg:col-span-8 border-t border-[#1C1C1A]/15">
          {faqs.map((f, i) => (
            <details key={f.q} className="group border-b border-[#1C1C1A]/15 py-6">
              <summary className="flex cursor-pointer list-none items-start gap-5 text-base sm:text-lg font-medium text-[#1C1C1A]">
                <span className="font-serif text-sm text-[#B8955A] pt-1 w-6 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <span className="flex-1">{f.q}</span>
                <span className="mt-0.5 flex-shrink-0 text-[#1C1C1A]/40 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 pl-11 text-sm sm:text-base text-[#1C1C1A]/65 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export function StepList({ steps, title, bg = 'bg-white' }: { steps: PracticeStep[]; title: string; bg?: string }) {
  return (
    <section className={`py-20 sm:py-24 ${bg}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionTitle eyebrow="Strategy" title={title} className="mb-12" />
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {steps.map((s, i) => (
            <li key={s.title} className="border-t border-[#1C1C1A]/20 pt-6">
              <span className="font-serif text-4xl text-[#B8955A]/80">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-4 text-base sm:text-lg font-semibold text-[#1C1C1A]">{s.title}</h3>
              <p className="mt-2 text-sm text-[#1C1C1A]/60 leading-relaxed">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function RelatedAreas({ items }: { items: RelatedArea[] }) {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionTitle eyebrow="Related" title="관련 분야" className="mb-8" />
        <div className="border-t border-[#1C1C1A]/15">
          {items.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="group flex items-center justify-between gap-6 py-6 border-b border-[#1C1C1A]/15"
            >
              <div>
                <span className="font-serif text-lg sm:text-2xl font-semibold text-[#1C1C1A] group-hover:text-[#1B3B2F] transition-colors">
                  {r.title}
                </span>
                <span className="block mt-1 text-sm text-[#1C1C1A]/55">{r.desc}</span>
              </div>
              <span className="text-xl text-[#1C1C1A]/30 group-hover:text-[#B8955A] group-hover:translate-x-1 transition-all">&rarr;</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
