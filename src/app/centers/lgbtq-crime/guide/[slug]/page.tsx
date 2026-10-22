import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPageSeo } from '@/lib/seo'
import Breadcrumb from '@/components/Breadcrumb'
import { guidePages, LGBTQ_BASE } from '@/data/lgbtq-crime'
import { JsonLd, ConsultCta, RelatedLinks, articleJsonLd } from '../../shared'

interface Props {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return guidePages.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = guidePages.find((p) => p.slug === slug)
  if (!page) return {}
  return getPageSeo(`${LGBTQ_BASE}/guide/${slug}`, {
    title: page.metaTitle,
    description: page.metaDescription,
    ogTitle: page.metaTitle,
    ogDescription: page.metaDescription,
  })
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const page = guidePages.find((p) => p.slug === slug)
  if (!page) notFound()

  const path = `${LGBTQ_BASE}/guide/${slug}`

  return (
    <>
      <JsonLd data={articleJsonLd(page.heroTitle, path)} />
      <Breadcrumb
        items={[
          { name: '홈', href: '/' },
          { name: '성소수자 범죄피해 지원센터', href: LGBTQ_BASE },
          { name: page.cardTitle },
        ]}
      />

      <section className="py-14 sm:py-20 bg-[#FAFAFA]">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-4">Guide</p>
          <h1 className="text-2xl sm:text-4xl font-bold text-black leading-tight">{page.heroTitle}</h1>
          <p className="mt-4 text-sm sm:text-base text-gray-600">{page.heroSubtitle}</p>
        </div>
      </section>

      <article className="py-14 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-12">
          {page.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-xl sm:text-2xl font-bold text-black mb-4">{s.heading}</h2>
              <div className="space-y-4">
                {s.paragraphs.map((p) => (
                  <p key={p} className="text-sm sm:text-base text-gray-700 leading-relaxed">{p}</p>
                ))}
              </div>
              {s.bullets && (
                <ul className="mt-4 space-y-2.5">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm sm:text-base text-gray-700 leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#1B3B2F] flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          <p className="text-xs text-gray-400">
            이 안내는 일반적인 법률 정보이며 개별 사건에 대한 법률 자문이 아닙니다. 구체적인 대응은 상담을 통해 확인하세요.
          </p>
        </div>
      </article>

      <RelatedLinks paths={page.related} title="함께 보면 좋은 안내" />
      <ConsultCta note={page.cta} />

      <nav aria-label="다른 가이드" className="py-10 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 flex flex-wrap gap-2">
          {guidePages.filter((g) => g.slug !== slug).map((g) => (
            <Link key={g.slug} href={`${LGBTQ_BASE}/guide/${g.slug}`} className="text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-[#1B3B2F]/10 transition-colors">
              {g.cardTitle}
            </Link>
          ))}
        </div>
      </nav>
    </>
  )
}
