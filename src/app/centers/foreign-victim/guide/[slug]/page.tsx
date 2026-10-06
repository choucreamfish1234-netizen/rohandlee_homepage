import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ForeignVictimSubPage from '../../ForeignVictimSubPage'
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
  const content = guideContent[slug]?.ko
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
      url: `https://lawfirmrohandlee.com/centers/foreign-victim/guide/${slug}`,
      siteName: '법률사무소 로앤이',
    },
    alternates: {
      canonical: `https://lawfirmrohandlee.com/centers/foreign-victim/guide/${slug}`,
      languages: getAlternateLanguages(`/guide/${slug}`),
    },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  if (!(guideSlugs as readonly string[]).includes(slug)) {
    notFound()
  }
  return <ForeignVictimSubPage locale="ko" slug={slug} type="guide" />
}
