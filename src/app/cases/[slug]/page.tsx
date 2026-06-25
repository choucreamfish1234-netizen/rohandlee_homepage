import { supabaseAdmin } from '@/lib/supabase-admin'
import { DEFAULT_CASES } from '@/lib/cases'
import type { Metadata } from 'next'
import CaseDetailContent from './CaseDetailContent'

const baseUrl = 'https://lawfirmrohandlee.com'

export const revalidate = 3600
export const dynamicParams = true

interface Props {
  params: Promise<{ slug: string }>
}

async function findCase(slugOrId: string) {
  // 1. slug로 검색
  const { data: bySlug } = await supabaseAdmin
    .from('success_cases')
    .select('*')
    .eq('slug', slugOrId)
    .maybeSingle()

  if (bySlug) return bySlug

  // 2. id로 검색 (숫자인 경우)
  const numId = parseInt(slugOrId)
  if (!isNaN(numId)) {
    const { data: byId } = await supabaseAdmin
      .from('success_cases')
      .select('*')
      .eq('id', numId)
      .maybeSingle()

    if (byId) return byId
  }

  // 3. DEFAULT_CASES 폴백
  return DEFAULT_CASES.find(c => c.slug === slugOrId || String(c.id) === slugOrId) || null
}

export async function generateStaticParams() {
  const { data: cases } = await supabaseAdmin
    .from('success_cases')
    .select('slug, id')
    .eq('published', true)

  const slugs: { slug: string }[] = []
  const seen = new Set<string>()

  for (const c of cases || []) {
    if (c.slug && typeof c.slug === 'string' && !seen.has(c.slug)) {
      slugs.push({ slug: c.slug })
      seen.add(c.slug)
    }
    const idStr = String(c.id)
    if (!seen.has(idStr)) {
      slugs.push({ slug: idStr })
      seen.add(idStr)
    }
  }

  for (const c of DEFAULT_CASES) {
    if (c.slug && !seen.has(c.slug)) {
      slugs.push({ slug: c.slug })
      seen.add(c.slug)
    }
  }

  return slugs
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)

  const caseData = await findCase(decodedSlug)

  if (!caseData) {
    return { title: '성공사례 | 법률사무소 로앤이' }
  }

  return {
    title: `${caseData.title} | 법률사무소 로앤이 성공사례`,
    description: caseData.summary,
    alternates: {
      canonical: `${baseUrl}/cases/${caseData.slug || decodedSlug}`,
    },
    openGraph: {
      title: caseData.title,
      description: caseData.summary,
      type: 'article',
      images: caseData.image_url ? [caseData.image_url] : [`${baseUrl}/og-image.png`],
      url: `${baseUrl}/cases/${caseData.slug || decodedSlug}`,
      siteName: '법률사무소 로앤이',
    },
    twitter: {
      card: 'summary_large_image',
      title: caseData.title,
      description: caseData.summary,
      images: caseData.image_url ? [caseData.image_url] : [`${baseUrl}/og-image.png`],
    },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)

  const caseData = await findCase(decodedSlug)

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
      '@id': `${baseUrl}/cases/${caseData.slug || decodedSlug}`,
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
