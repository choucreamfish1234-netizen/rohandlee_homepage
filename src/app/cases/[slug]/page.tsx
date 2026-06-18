import { supabaseAdmin } from '@/lib/supabase-admin'
import { DEFAULT_CASES } from '@/lib/cases'
import type { Metadata } from 'next'
import CaseDetailContent from './CaseDetailContent'

const baseUrl = 'https://lawfirmrohandlee.com'

export const revalidate = 3600

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const { data: cases } = await supabaseAdmin
    .from('success_cases')
    .select('slug')
    .eq('published', true)

  const dbSlugs = (cases || [])
    .filter(c => c.slug && typeof c.slug === 'string')
    .map(c => ({ slug: c.slug as string }))
  const defaultSlugs = DEFAULT_CASES
    .filter(c => c.slug && typeof c.slug === 'string')
    .map(c => ({ slug: c.slug as string }))

  const allSlugs = new Map<string, { slug: string }>()
  for (const s of [...defaultSlugs, ...dbSlugs]) {
    allSlugs.set(s.slug, s)
  }

  return Array.from(allSlugs.values())
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)

  let title = ''
  let description = ''
  let imageUrl = ''

  const { data } = await supabaseAdmin
    .from('success_cases')
    .select('title, summary, image_url')
    .eq('slug', decodedSlug)
    .maybeSingle()

  if (data) {
    title = data.title
    description = data.summary
    imageUrl = data.image_url
  } else {
    const fallback = DEFAULT_CASES.find(c => c.slug === decodedSlug)
    if (fallback) {
      title = fallback.title
      description = fallback.summary
      imageUrl = fallback.image_url
    }
  }

  if (!title) {
    return { title: '성공사례 | 법률사무소 로앤이' }
  }

  return {
    title: `${title} | 법률사무소 로앤이 성공사례`,
    description,
    alternates: {
      canonical: `${baseUrl}/cases/${decodedSlug}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      images: imageUrl ? [imageUrl] : [`${baseUrl}/og-image.png`],
      url: `${baseUrl}/cases/${decodedSlug}`,
      siteName: '법률사무소 로앤이',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : [`${baseUrl}/og-image.png`],
    },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)

  let caseData = null

  const { data } = await supabaseAdmin
    .from('success_cases')
    .select('*')
    .eq('slug', decodedSlug)
    .maybeSingle()

  if (data) {
    caseData = data
  } else {
    const fallback = DEFAULT_CASES.find(c => c.slug === decodedSlug)
    if (fallback) {
      caseData = fallback
    }
  }

  const jsonLd = caseData ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: caseData.title,
    description: caseData.summary,
    image: caseData.image_url,
    publisher: {
      '@type': 'Organization',
      name: '법률사무소 로앤이',
      url: baseUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/cases/${decodedSlug}`,
    },
    isAccessibleForFree: true,
    inLanguage: 'ko',
  } : null

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <CaseDetailContent slug={decodedSlug} initialCase={caseData} />
    </>
  )
}
