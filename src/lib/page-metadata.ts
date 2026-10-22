import type { Metadata } from 'next'
import pages from '@/data/page-metadata.json'

export const SITE_URL = 'https://lawfirmrohandlee.com'
const BRAND = '법률사무소 로앤이'

// Keep a single brand suffix without truncating an article's meaningful title.
export function brandedTitle(value: string): string {
  const subject = value.trim().replace(/(?:\s*[|｜]\s*(?:법률사무소 로앤이|로앤이 법률사무소))+\s*$/, '').trim()
  return subject === BRAND ? BRAND : `${subject} | ${BRAND}`
}

// These reviewed routes use versioned copy, not stale page_seo DB overrides.
// Routes not listed (including victim centers) retain their existing behavior.
export function getCuratedMetadata(path: string): Metadata | undefined {
  const copy = (pages as Record<string, { title: string; description: string }>)[path]
  if (!copy) return undefined
  const url = path === '/' ? SITE_URL : `${SITE_URL}${path}`
  const image = `${SITE_URL}/og-image.png`
  return {
    title: { absolute: copy.title },
    description: copy.description,
    keywords: [],
    alternates: { canonical: url },
    openGraph: {
      type: 'website', locale: 'ko_KR', siteName: BRAND, url,
      title: copy.title, description: copy.description,
      images: [{ url: image, width: 1200, height: 630, alt: BRAND }],
    },
    twitter: {
      card: 'summary_large_image', title: copy.title,
      description: copy.description, images: [image],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  }
}
