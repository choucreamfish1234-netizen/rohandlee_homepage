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
  const content = crimeTypeContent[slug]?.zh
  if (!content) return {}

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    keywords: content.metaKeywords,
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      locale: 'zh_CN',
      type: 'website',
      url: `https://lawfirmrohandlee.com/zh/foreign-victim/${slug}`,
      siteName: '路安宜律师事务所',
    },
    alternates: {
      canonical: `https://lawfirmrohandlee.com/zh/foreign-victim/${slug}`,
      languages: getAlternateLanguages(`/${slug}`),
    },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  if (!crimeTypeSlugs.includes(slug as string)) {
    notFound()
  }
  return <ForeignVictimSubPage locale="zh" slug={slug} type="crime" />
}
