import type { Metadata } from 'next'
import { supabaseAdmin } from './supabase-admin'

interface PageSeo {
  title: string | null
  description: string | null
  keywords: string | null
  og_title: string | null
  og_description: string | null
}

interface SeoDefaults {
  title: string
  description: string
  keywords?: string
  ogTitle?: string
  ogDescription?: string
}

export async function getPageSeo(
  pagePath: string,
  defaults: SeoDefaults
): Promise<Metadata> {
  let seo: PageSeo | null = null

  try {
    const { data } = await supabaseAdmin
      .from('page_seo')
      .select('title, description, keywords, og_title, og_description')
      .eq('page_path', pagePath)
      .single()
    seo = data
  } catch {
    // Fall back to defaults if table doesn't exist or query fails
  }

  // DB에 "부천"이 포함된 이전 값이 있으면 코드 기본값 사용
  const hasOldBucheon = (v: string | null) => v && v.includes('부천')
  const title = (hasOldBucheon(seo?.title ?? null) ? null : seo?.title) || defaults.title
  const description = (hasOldBucheon(seo?.description ?? null) ? null : seo?.description) || defaults.description
  const keywords = seo?.keywords || defaults.keywords
  const ogTitle = (hasOldBucheon(seo?.og_title ?? null) ? null : seo?.og_title) || defaults.ogTitle || title
  const ogDescription = (hasOldBucheon(seo?.og_description ?? null) ? null : seo?.og_description) || defaults.ogDescription || description

  return {
    title,
    description,
    ...(keywords ? { keywords: keywords.split(',').map((k) => k.trim()) } : {}),
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      images: [{ url: 'https://lawfirmrohandlee.com/og-image.png', width: 1200, height: 630 }],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}
