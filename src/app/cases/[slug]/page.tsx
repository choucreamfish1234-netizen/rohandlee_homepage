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

  const offenseStr = caseData.offense_types?.length ? caseData.offense_types.join('·') : ''
  const outcomeStr = caseData.outcome_types?.length ? caseData.outcome_types.join('·') : ''
  const autoTitle = offenseStr && outcomeStr
    ? `${offenseStr} ${outcomeStr} 사례`
    : caseData.title
  const metaTitle = caseData.seo_title || autoTitle
  const autoDesc = caseData.seo_description || (
    offenseStr
      ? `법률사무소 로앤이가 ${offenseStr} 사건에서 ${caseData.services_provided?.slice(0, 2).join(', ') || '법률 조력'}을 수행하여 ${outcomeStr || caseData.badge}을 이끌어낸 사례입니다.`
      : caseData.summary
  )
  const metaDesc = autoDesc
  const pageUrl = `${baseUrl}/cases/${caseData.slug || decodedSlug}`

  return {
    title: metaTitle,
    description: metaDesc,
    keywords: caseData.offense_types || [],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      type: 'article',
      images: caseData.image_url ? [caseData.image_url] : [`${baseUrl}/og-image.png`],
      url: pageUrl,
      siteName: '법률사무소 로앤이',
      locale: 'ko_KR',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDesc,
      images: caseData.image_url ? [caseData.image_url] : [`${baseUrl}/og-image.png`],
    },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)

  const caseData = await findCase(decodedSlug)

  const ldOffenses = caseData?.offense_types?.length
    ? caseData.offense_types.map((t: string) => ({ '@type': 'Thing', name: t }))
    : undefined
  const ldAuthor = caseData?.lawyer_ids?.length
    ? caseData.lawyer_ids.map((name: string) => ({ '@type': 'Person', name, worksFor: { '@type': 'LegalService', name: '법률사무소 로앤이' } }))
    : { '@type': 'Organization', name: '법률사무소 로앤이' }
  const ldDesc = caseData?.seo_description || caseData?.summary || ''

  const jsonLd = caseData ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: caseData.seo_title || caseData.title,
    description: ldDesc,
    image: caseData.image_url,
    ...(caseData.offense_types?.length ? { keywords: caseData.offense_types.join(', ') } : {}),
    author: ldAuthor,
    publisher: {
      '@type': 'Organization',
      name: '법률사무소 로앤이',
      url: baseUrl,
    },
    datePublished: caseData.created_at || undefined,
    dateModified: caseData.updated_at || caseData.created_at || undefined,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/cases/${caseData.slug || decodedSlug}`,
    },
    ...(ldOffenses ? { about: ldOffenses } : {}),
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
