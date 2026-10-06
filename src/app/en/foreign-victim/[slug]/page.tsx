import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ForeignVictimSubPage from '@/app/centers/foreign-victim/ForeignVictimSubPage'
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
  const content = crimeTypeContent[slug]?.en
  if (!content) return {}

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    keywords: content.metaKeywords,
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      locale: 'en_US',
      type: 'website',
      url: `https://lawfirmrohandlee.com/en/foreign-victim/${slug}`,
      siteName: 'Law Firm Ro&Lee',
    },
    alternates: {
      canonical: `https://lawfirmrohandlee.com/en/foreign-victim/${slug}`,
      languages: getAlternateLanguages(`/${slug}`),
    },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  if (!(crimeTypeSlugs as readonly string[]).includes(slug)) {
    notFound()
  }
  return <ForeignVictimSubPage locale="en" slug={slug} type="crime" />
}
