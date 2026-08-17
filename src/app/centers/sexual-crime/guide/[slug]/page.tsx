import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { SEXUAL_CRIME_GUIDES, findGuide } from '@/data/sexual-crime-guides'
import GuideDetail from './GuideDetail'

const baseUrl = 'https://lawfirmrohandlee.com'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return SEXUAL_CRIME_GUIDES.map(g => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = findGuide(slug)
  if (!data) return { title: '성범죄 피해자 전담센터' }

  const pageUrl = `${baseUrl}/centers/sexual-crime/guide/${slug}`
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical: pageUrl },
    openGraph: {
      type: 'article',
      title: data.metaTitle,
      description: data.metaDescription,
      url: pageUrl,
      siteName: '법률사무소 로앤이',
      locale: 'ko_KR',
    },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const data = findGuide(slug)
  if (!data) notFound()

  const pageUrl = `${baseUrl}/centers/sexual-crime/guide/${slug}`

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title,
    description: data.metaDescription,
    author: { '@type': 'Person', name: '이유림', jobTitle: '대표변호사', worksFor: { '@type': 'LegalService', name: '법률사무소 로앤이' } },
    publisher: { '@type': 'Organization', name: '법률사무소 로앤이', url: baseUrl },
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
    mentions: { '@type': 'Book', name: '피해자 감별사회', publisher: { '@type': 'Organization', name: '박영사' } },
    inLanguage: 'ko',
  }

  const faqJsonLd = data.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  } : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}
      <GuideDetail data={data} />
    </>
  )
}
