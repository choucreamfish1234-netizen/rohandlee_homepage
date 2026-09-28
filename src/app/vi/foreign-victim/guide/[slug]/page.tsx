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
  const content = guideContent[slug]?.vi
  if (!content) return {}

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    keywords: content.metaKeywords,
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      locale: 'vi_VN',
      type: 'website',
      url: `https://lawfirmrohandlee.com/vi/foreign-victim/guide/${slug}`,
      siteName: 'Công ty Luật Ro&Lee',
    },
    alternates: {
      canonical: `https://lawfirmrohandlee.com/vi/foreign-victim/guide/${slug}`,
      languages: getAlternateLanguages(`/guide/${slug}`),
    },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  if (!guideSlugs.includes(slug as string)) {
    notFound()
  }
  return <ForeignVictimSubPage locale="vi" slug={slug} type="guide" />
}
