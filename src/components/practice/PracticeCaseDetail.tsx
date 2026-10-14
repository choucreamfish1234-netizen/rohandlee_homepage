import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'
import { AREA_LABEL, caseAreaLink, practiceCases, type PracticeCase } from '@/data/practice/cases'
import { JsonLd, CaseDisclaimer, RelatedCases, ConsultationCTA } from './shared'

const BASE_URL = 'https://lawfirmrohandlee.com'
const PUBLISHED = '2026-10-14'

export function practiceCaseJsonLd(c: PracticeCase) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: c.title,
    description: c.summary,
    author: { '@type': 'LegalService', '@id': `${BASE_URL}/#legalservice`, name: '법률사무소 로앤이', url: BASE_URL },
    publisher: { '@type': 'LegalService', '@id': `${BASE_URL}/#legalservice`, name: '법률사무소 로앤이', url: BASE_URL },
    articleSection: `${AREA_LABEL[c.area]} 사례`,
    about: { '@type': 'Thing', name: c.category },
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
    mainEntityOfPage: `${BASE_URL}/cases/${c.slug}`,
    inLanguage: 'ko',
  }
}

export default function PracticeCaseDetail({ c }: { c: PracticeCase }) {
  const areaLink = caseAreaLink(c)
  const middle = c.charge
    ? { label: c.area === 'defense' ? '혐의' : '사건', value: c.charge }
    : c.issue
      ? { label: '쟁점', value: c.issue }
      : c.situation
        ? { label: '사건', value: c.situation }
        : null
  const related = practiceCases.filter((x) => x.category === c.category && x.slug !== c.slug).slice(0, 3)

  const sections: { heading: string; text: string }[] =
    c.body ??
    [
      c.situation && { heading: '사건 경위', text: c.situation },
      c.issue && { heading: '법률적 쟁점', text: c.issue },
      c.response && { heading: '대응 전략', text: c.response },
      { heading: '결과', text: c.result },
    ].filter((s): s is { heading: string; text: string } => Boolean(s))

  return (
    <>
      <JsonLd data={practiceCaseJsonLd(c)} />
      <Breadcrumb items={[{ name: '홈', href: '/' }, { name: '대응 사례', href: '/cases' }, { name: c.title }]} />

      <article className="bg-white">
        <header className="bg-[#F6F2EA] pt-12 sm:pt-20 pb-12 sm:pb-16">
          <div className="max-w-4xl mx-auto px-5 sm:px-8">
            <Link href={`/cases?category=${encodeURIComponent(c.category)}`} className="eyebrow tracking-[0.12em] text-xs hover:opacity-80">
              {c.category}
            </Link>
            <h1 className="mt-6 font-serif text-[1.75rem] leading-[1.35] sm:text-[2.6rem] sm:leading-[1.3] font-semibold text-[#1C1C1A] tracking-tight">
              {c.title}
            </h1>
            <p className="mt-6 text-base sm:text-lg text-[#1C1C1A]/65 leading-relaxed">{c.summary}</p>

            <dl className={`mt-10 grid grid-cols-1 ${middle ? 'sm:grid-cols-3' : 'sm:grid-cols-2'} border-t border-[#1C1C1A]/20`}>
              <div className="py-5 sm:pr-6 border-b sm:border-b-0 border-[#1C1C1A]/10">
                <dt className="text-[11px] tracking-[0.2em] uppercase text-[#1C1C1A]/45">분야</dt>
                <dd className="mt-2 text-sm sm:text-base text-[#1C1C1A]">{AREA_LABEL[c.area]}</dd>
              </div>
              {middle && (
                <div className="py-5 sm:px-6 sm:border-l border-b sm:border-b-0 border-[#1C1C1A]/10">
                  <dt className="text-[11px] tracking-[0.2em] uppercase text-[#1C1C1A]/45">{middle.label}</dt>
                  <dd className="mt-2 text-sm sm:text-base text-[#1C1C1A]">{middle.value}</dd>
                </div>
              )}
              <div className="py-5 sm:pl-6 sm:border-l border-[#1C1C1A]/10">
                <dt className="text-[11px] tracking-[0.2em] uppercase text-[#1C1C1A]/45">결과</dt>
                <dd className="mt-2 font-serif text-base sm:text-lg font-semibold text-[#8a6d3b]">{c.result}</dd>
              </div>
            </dl>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <div className="space-y-12">
            {sections.map((s, i) => (
              <section key={s.heading}>
                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-sm text-[#B8955A]">{String(i + 1).padStart(2, '0')}</span>
                  <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1C1C1A]">{s.heading}</h2>
                </div>
                <p className="mt-4 text-base sm:text-[17px] text-[#1C1C1A]/80 leading-[1.9]">{s.text}</p>
              </section>
            ))}
          </div>

          <CaseDisclaimer className="mt-14 pt-6 border-t border-[#1C1C1A]/10" />

          <Link
            href={areaLink.href}
            className="group mt-10 flex items-center justify-between border-y border-[#1C1C1A]/15 py-6"
          >
            <div>
              <span className="text-[11px] tracking-[0.2em] uppercase text-[#1C1C1A]/45">Related Practice</span>
              <span className="block mt-1 font-serif text-lg sm:text-xl font-semibold text-[#1C1C1A] group-hover:text-[#1B3B2F]">
                {areaLink.label} 안내 보기
              </span>
            </div>
            <span className="text-xl text-[#1C1C1A]/30 group-hover:text-[#B8955A] transition-colors">&rarr;</span>
          </Link>
        </div>
      </article>

      <RelatedCases cases={related} title="같은 분야 사례" />
      <ConsultationCTA text="비슷한 상황이시라면, 초기 대응이 결과를 바꿉니다." />
    </>
  )
}
