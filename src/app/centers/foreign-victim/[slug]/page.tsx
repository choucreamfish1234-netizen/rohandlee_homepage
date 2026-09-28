import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ForeignVictimSubPage from '../ForeignVictimSubPage'
import { crimeTypeContent, crimeTypeSlugs } from '@/lib/i18n/foreign-victim-content'
import { getAlternateLanguages } from '@/lib/i18n/hreflang'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return crimeTypeSlugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const content = crimeTypeContent[slug]?.ko
  if (!content) return {}

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    keywords: content.metaKeywords,
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      locale: 'ko_KR',
      type: 'website',
      url: `https://lawfirmrohandlee.com/centers/foreign-victim/${slug}`,
      siteName: '법률사무소 로앤이',
    },
    alternates: {
      canonical: `https://lawfirmrohandlee.com/centers/foreign-victim/${slug}`,
      languages: getAlternateLanguages(`/${slug}`),
    },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  if (!crimeTypeSlugs.includes(slug as string)) {
    notFound()
  }
  return <ForeignVictimSubPage locale="ko" slug={slug} type="crime" />
}
