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

      <section className="py-10 sm:py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-4">
          {area.intro.map((p) => (
            <p key={p} className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      </section>

      <section className="pb-14 sm:pb-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-black mb-8 text-center">{area.name} 분야</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {area.pages.map((p) => (
              <Link
                key={p.slug}
                href={`${area.base}/${p.slug}`}
                className="group block rounded-xl border border-gray-200 bg-white p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A24B] hover:shadow-md"
              >
                <h3 className="text-base font-bold text-black">{p.name}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{p.oneLiner}</p>
                <span className="inline-block mt-4 text-xs text-gray-400 group-hover:text-[#C9A24B] transition-colors">
                  자세히 보기 &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {area.process && (
        <section className="py-14 sm:py-20 bg-[#f7faf9]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-bold text-black mb-10 text-center">{area.processTitle}</h2>
            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {area.process.map((s, i) => (
                <li key={s.title} className="rounded-xl bg-white border border-gray-100 p-5 text-center">
                  <span className="inline-flex w-9 h-9 rounded-full bg-[#1B3B2F] text-white text-sm font-bold items-center justify-center">
                    {i + 1}
                  </span>
                  <h3 className="mt-3 text-sm font-bold text-black">{s.title}</h3>
                  <p className="mt-1.5 text-xs text-gray-500 leading-relaxed">{s.desc}</p>
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
