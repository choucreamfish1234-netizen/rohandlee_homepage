import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPageSeo } from '@/lib/seo'
import Breadcrumb from '@/components/Breadcrumb'
import { crimePages, LGBTQ_BASE } from '@/data/lgbtq-crime'
import { JsonLd, FaqList, ConsultCta, RelatedLinks, faqJsonLd, articleJsonLd } from '../shared'

interface Props {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return crimePages.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = crimePages.find((p) => p.slug === slug)
  if (!page) return {}
  return getPageSeo(`${LGBTQ_BASE}/${slug}`, {
    title: page.metaTitle,
    description: page.metaDescription,
    ogTitle: page.metaTitle,
    ogDescription: page.metaDescription,
  })
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const page = crimePages.find((p) => p.slug === slug)
  if (!page) notFound()

  const path = `${LGBTQ_BASE}/${slug}`

  return (
    <>
      <JsonLd data={articleJsonLd(page.metaTitle, path)} />
      <JsonLd data={faqJsonLd(page.faqs)} />
      <Breadcrumb
        items={[
          { name: '홈', href: '/' },
          { name: '성소수자 범죄피해 지원센터', href: LGBTQ_BASE },
          { name: page.cardTitle },
        ]}
      />

      <section className="py-14 sm:py-20 bg-[#FAFAFA]">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <span className="text-4xl block mb-4" aria-hidden>{page.icon}</span>
          <h1 className="text-2xl sm:text-4xl font-bold text-black leading-tight">{page.heroTitle}</h1>
          <p className="mt-4 text-base sm:text-lg text-[#1B3B2F] font-medium">{page.heroSubtitle}</p>
          <p className="mt-6 text-sm sm:text-base text-gray-600 leading-relaxed text-left sm:text-center">{page.intro}</p>
        </div>
      </section>

      {page.urgent && (
        <section className="py-10 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-amber-900 mb-4">⚠️ {page.urgent.title}</h2>
              <ol className="space-y-2 list-decimal pl-5 text-sm text-amber-900 leading-relaxed">
                {page.urgent.items.map((item) => <li key={item}>{item}</li>)}
              </ol>
              <p className="mt-4 text-sm font-medium text-amber-900">{page.urgent.note}</p>
            </div>
          </div>
        </section>
      )}

      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-black mb-6">이런 경우에 해당합니다</h2>
          <ul className="space-y-3">
            {page.checklist.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm sm:text-base text-gray-700">
                <span className="mt-0.5 flex-shrink-0 text-[#1B3B2F] font-bold">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-gray-500">하나라도 해당한다면 법적 대응을 검토할 수 있습니다. 판단이 어렵다면 상담에서 함께 확인하세요.</p>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-[#f7faf9]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-black mb-6">적용 법률</h2>
          <div className="space-y-3">
            {page.laws.map((law) => (
              <div key={law.name} className="rounded-xl border border-gray-100 bg-white p-5">
                <h3 className="text-sm font-bold text-[#1B3B2F] mb-1.5">{law.name}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{law.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs text-gray-400">법정형은 조문 기준의 일반 안내이며, 실제 적용 죄명과 처벌은 사건의 구체적 사정에 따라 달라집니다.</p>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-black mb-6">로앤이는 이렇게 대응합니다</h2>
          <ol className="space-y-4">
            {[
              ['비밀이 보장되는 상담', '대표변호사가 직접 상담하고, 사건 내용을 다른 직원과 공유하지 않습니다.'],
              ['증거 확보 안내', '사라지기 쉬운 메시지·기록·CCTV를 먼저 보존하도록 안내합니다.'],
              ['고소장 작성·제출', '적용 죄명과 증거를 정리한 고소장을 대표변호사가 직접 작성합니다.'],
              ['수사기관 동행', '피해자 조사에 동석해 사건과 무관한 사생활 질문을 제지합니다.'],
              ['재판·합의·손해배상', '피해자 의견서 제출, 합의 협상 대리, 민사 손해배상 청구까지 이어갑니다.'],
            ].map(([title, desc], i) => (
              <li key={title} className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1B3B2F] text-white text-sm font-bold flex items-center justify-center">{i + 1}</span>
                <div>
                  <h3 className="text-sm font-bold text-black">{title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FaqList faqs={page.faqs} />
      <RelatedLinks paths={page.related} />
      <ConsultCta />

      <p className="sr-only">
        법률사무소 로앤이 성소수자 범죄피해 지원센터는 {page.cardTitle} 피해자를 대리하며, 대표변호사 이유림·노채은이 상담부터 수사기관 동행, 합의 협상까지 모든 과정을 직접 수행한다.
      </p>

      <nav aria-label="다른 범죄 유형" className="pb-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 flex flex-wrap gap-2">
          {crimePages.filter((p) => p.slug !== slug).map((p) => (
            <Link key={p.slug} href={`${LGBTQ_BASE}/${p.slug}`} className="text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-[#1B3B2F]/10 transition-colors">
              {p.cardTitle}
            </Link>
          ))}
        </div>
      </nav>
    </>
  )
}
