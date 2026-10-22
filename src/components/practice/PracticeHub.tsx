import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'
import type { PracticeArea } from '@/data/practice'
import { practiceCases } from '@/data/practice/cases'
import {
  JsonLd,
  faqJsonLd,
  serviceJsonLd,
  PracticeHero,
  RelatedCases,
  FaqList,
  ConsultationCTA,
  SectionTitle,
} from './shared'

export default function PracticeHub({ area }: { area: PracticeArea }) {
  const cases = practiceCases.filter((c) => c.area === area.key)
  // 하위 분야별로 1건씩 골라 대표 사례 구성
  const featured = area.pages
    .map((p) => cases.find((c) => c.page === p.slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c))
    .slice(0, 6)

  return (
    <>
      <JsonLd data={serviceJsonLd(area.name, area.metaDescription, area.base)} />
      <JsonLd data={faqJsonLd(area.faqs)} />
      <PracticeHero title={area.heroTitle} subtitle={area.heroSubtitle} eyebrow={area.name} />
      <Breadcrumb items={[{ name: '홈', href: '/' }, { name: area.name }]} />

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <SectionTitle eyebrow="Overview" title={`${area.name}, 왜 로앤이인가`} className="lg:col-span-4" />
          <div className="lg:col-span-8 space-y-5">
            {area.intro.map((p) => (
              <p key={p} className="text-base sm:text-lg text-[#1C1C1A]/75 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <SectionTitle eyebrow="Practice" title={`${area.name} 분야`} className="mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#1C1C1A]/15">
            {area.pages.map((p, i) => (
              <Link
                key={p.slug}
                href={`${area.base}/${p.slug}`}
                className="group flex flex-col border-r border-b border-[#1C1C1A]/15 p-7 sm:p-8 min-h-[200px] transition-colors hover:bg-[#1B3B2F]"
              >
                <span className="font-serif text-sm text-[#B8955A]">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-5 font-serif text-xl sm:text-2xl font-semibold text-[#1C1C1A] group-hover:text-white transition-colors">
                  {p.name}
                </h3>
                <p className="mt-2 text-sm text-[#1C1C1A]/60 leading-relaxed group-hover:text-white/70 transition-colors flex-1">
                  {p.oneLiner}
                </p>
                <span className="mt-6 text-sm text-[#1C1C1A]/40 group-hover:text-[#d9bf8c] transition-colors">&rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {area.process && (
        <section className="py-20 sm:py-24 bg-[#1B3B2F] text-white">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <p className="eyebrow">Process</p>
            <h2 className="mt-4 font-serif text-2xl sm:text-4xl font-semibold mb-12">{area.processTitle}</h2>
            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-10">
              {area.process.map((s, i) => (
                <li key={s.title} className="border-t border-white/25 pt-6">
                  <span className="font-serif text-3xl text-[#d9bf8c]">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-4 text-base font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-white/60 leading-relaxed">{s.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <RelatedCases cases={featured} title="분야별 대표 사례" />
      <FaqList faqs={area.faqs} />
      <ConsultationCTA />
    </>
  )
}
