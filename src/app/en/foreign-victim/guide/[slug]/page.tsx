import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ForeignVictimSubPage from '@/app/centers/foreign-victim/ForeignVictimSubPage'
import { guideContent, guideSlugs } from '@/lib/i18n/foreign-victim-content'
import { getAlternateLanguages } from '@/lib/i18n/hreflang'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return guideSlugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const content = guideContent[slug]?.en
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
      url: `https://lawfirmrohandlee.com/en/foreign-victim/guide/${slug}`,
      siteName: 'Law Firm Ro&Lee',
    },
    alternates: {
      canonical: `https://lawfirmrohandlee.com/en/foreign-victim/guide/${slug}`,
      languages: getAlternateLanguages(`/guide/${slug}`),
    },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  if (!(guideSlugs as readonly string[]).includes(slug)) {
    notFound()
  }
  return <ForeignVictimSubPage locale="en" slug={slug} type="guide" />
}
