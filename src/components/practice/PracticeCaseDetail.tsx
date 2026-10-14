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

      <article className="pt-6 sm:pt-10 pb-14 sm:pb-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <header>
            <Link
              href={`/cases?category=${encodeURIComponent(c.category)}`}
              className="inline-block text-xs font-bold text-[#C9A24B] hover:underline"
            >
              {c.category}
            </Link>
            <h1 className="mt-3 text-2xl sm:text-3xl font-bold text-black leading-snug">{c.title}</h1>
            <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">{c.summary}</p>
          </header>

          <dl className="mt-8 rounded-2xl border border-gray-200 bg-[#f7faf9] p-5 sm:p-6 space-y-3 text-sm">
            <div className="flex gap-3">
              <dt className="w-16 flex-shrink-0 text-gray-400">분야</dt>
              <dd className="text-gray-800">{AREA_LABEL[c.area]}</dd>
            </div>
            {c.charge && (
              <div className="flex gap-3">
                <dt className="w-16 flex-shrink-0 text-gray-400">{c.area === 'defense' ? '혐의' : '사건'}</dt>
                <dd className="text-gray-800">{c.charge}</dd>
              </div>
            )}
            {c.issue && (
              <div className="flex gap-3">
                <dt className="w-16 flex-shrink-0 text-gray-400">쟁점</dt>
                <dd className="text-gray-800">{c.issue}</dd>
              </div>
            )}
            <div className="flex gap-3">
              <dt className="w-16 flex-shrink-0 text-gray-400">결과</dt>
              <dd className="font-bold text-[#C9A24B]">{c.result}</dd>
            </div>
          </dl>

          <div className="mt-10 space-y-8">
            {sections.map((s) => (
              <section key={s.heading}>
                <h2 className="text-lg sm:text-xl font-bold text-black mb-3">{s.heading}</h2>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{s.text}</p>
              </section>
            ))}
          </div>

          <CaseDisclaimer className="mt-10 pt-6 border-t border-gray-100" />

          <Link
            href={areaLink.href}
            className="mt-8 flex items-center justify-between rounded-xl border border-gray-200 p-5 hover:border-[#C9A24B] transition-colors"
          >
            <span className="text-sm font-bold text-black">{areaLink.label} 안내 보기</span>
            <span className="text-gray-400">&rarr;</span>
          </Link>
        </div>
      </article>

      <RelatedCases cases={related} title="같은 분야 사례" />
      <ConsultationCTA text="비슷한 상황이시라면, 초기 대응이 결과를 바꿉니다." />
    </>
  )
}
