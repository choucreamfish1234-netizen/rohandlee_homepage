import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'
import type { PracticeArea, PracticePage } from '@/data/practice'
import { casesForPage } from '@/data/practice/cases'
import {
  JsonLd,
  faqJsonLd,
  serviceJsonLd,
  PracticeHero,
  StepList,
  RelatedCases,
  FaqList,
  RelatedAreas,
  ConsultationCTA,
} from './shared'

export default function PracticeDetail({ area, page }: { area: PracticeArea; page: PracticePage }) {
  const path = `${area.base}/${page.slug}`
  const cases = casesForPage(area.key, page.slug)

  return (
    <>
      <JsonLd data={serviceJsonLd(page.name, page.metaDescription, path)} />
      <JsonLd data={faqJsonLd(page.faqs)} />
      <PracticeHero title={page.heroTitle} subtitle={page.heroSubtitle} eyebrow={`${area.name} · ${page.name}`} />
      <Breadcrumb
        items={[
          { name: '홈', href: '/' },
          { name: area.name, href: area.base },
          { name: page.name },
        ]}
      />

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-black mb-8 text-center">이런 상황이시라면</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {page.situations.map((s) => (
              <div key={s} className="flex items-start gap-3 rounded-xl border border-gray-200 p-5">
                <span className="mt-0.5 flex-shrink-0 text-[#C9A24B] font-bold">✓</span>
                <p className="text-sm sm:text-base text-gray-700">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-[#f7faf9]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-black mb-6">{page.legalTitle}</h2>
          <div className="space-y-4">
            {page.legal.map((p) => (
              <p key={p} className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
          {page.legalNote && <p className="mt-6 text-xs text-gray-400">{page.legalNote}</p>}
        </div>
      </section>

      {page.sections?.map((sec) => (
        <section key={sec.title} className="py-14 sm:py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-bold text-black mb-8">{sec.title}</h2>
            {sec.paragraphs && (
              <div className="space-y-4 max-w-3xl">
                {sec.paragraphs.map((p) => (
                  <p key={p} className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            )}
            {sec.items && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sec.items.map((it) => (
                  <div key={it.title} className="rounded-xl border border-gray-100 bg-white p-5 border-l-4 border-l-[#1B3B2F]">
                    <h3 className="text-sm sm:text-base font-bold text-black">{it.title}</h3>
                    <p className="mt-1.5 text-sm text-gray-600 leading-relaxed">{it.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}

      <StepList steps={page.strategy} title="로앤이의 대응 방식" bg={page.sections?.length ? 'bg-[#f7faf9]' : 'bg-white'} />
      <RelatedCases cases={cases} />
      <FaqList faqs={page.faqs} />
      <RelatedAreas items={page.related} />

      <nav aria-label={`${area.name} 다른 분야`} className="pb-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-xs text-gray-400 mb-3">{area.name} 다른 분야</p>
          <div className="flex flex-wrap gap-2">
            {area.pages
              .filter((p) => p.slug !== page.slug)
              .map((p) => (
                <Link
                  key={p.slug}
                  href={`${area.base}/${p.slug}`}
                  className="text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-[#1B3B2F]/10 transition-colors"
                >
                  {p.name}
                </Link>
              ))}
          </div>
        </div>
      </nav>

      <ConsultationCTA text="비슷한 상황이시라면, 초기 대응이 결과를 바꿉니다." />
    </>
  )
}
