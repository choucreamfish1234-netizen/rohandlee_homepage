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
  SectionTitle,
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

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <SectionTitle eyebrow="Situation" title="이런 상황이시라면" className="lg:col-span-4" />
          <ul className="lg:col-span-8 border-t border-[#1C1C1A]/15">
            {page.situations.map((s, i) => (
              <li key={s} className="flex items-start gap-5 py-5 border-b border-[#1C1C1A]/15">
                <span className="font-serif text-sm text-[#B8955A] pt-1 w-6 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <p className="text-base sm:text-lg text-[#1C1C1A]/85">{s}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-[#F6F2EA]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionTitle eyebrow="Legal Guide" title={page.legalTitle} />
              {page.legalNote && <p className="mt-6 text-xs text-[#1C1C1A]/45 leading-relaxed">{page.legalNote}</p>}
            </div>
          </div>
          <div className="lg:col-span-8 space-y-6">
            {page.legal.map((p) => (
              <p key={p} className="text-base sm:text-[17px] text-[#1C1C1A]/80 leading-[1.85]">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {page.sections?.map((sec) => (
        <section key={sec.title} className="py-20 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <SectionTitle eyebrow="Key Points" title={sec.title} className="mb-10" />
            {sec.paragraphs && (
              <div className="space-y-5 max-w-3xl mb-10">
                {sec.paragraphs.map((p) => (
                  <p key={p} className="text-base sm:text-lg text-[#1C1C1A]/75 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            )}
            {sec.items && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10">
                {sec.items.map((it) => (
                  <div key={it.title} className="border-t border-[#1C1C1A]/15 py-6">
                    <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#1C1C1A]">{it.title}</h3>
                    <p className="mt-2 text-sm sm:text-base text-[#1C1C1A]/65 leading-relaxed">{it.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}

      <StepList steps={page.strategy} title="로앤이의 대응 방식" bg={page.sections?.length ? 'bg-[#F6F2EA]' : 'bg-white'} />
      <RelatedCases cases={cases} />
      <FaqList faqs={page.faqs} />
      <RelatedAreas items={page.related} />

      <nav aria-label={`${area.name} 다른 분야`} className="pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <p className="text-xs tracking-[0.2em] uppercase text-[#1C1C1A]/45 mb-4">{area.name} 다른 분야</p>
          <div className="flex flex-wrap gap-2">
            {area.pages
              .filter((p) => p.slug !== page.slug)
              .map((p) => (
                <Link
                  key={p.slug}
                  href={`${area.base}/${p.slug}`}
                  className="text-sm px-4 py-2 border border-[#1C1C1A]/15 text-[#1C1C1A]/70 hover:bg-[#1B3B2F] hover:text-white hover:border-[#1B3B2F] transition-colors"
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
