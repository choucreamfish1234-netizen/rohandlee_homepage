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

  const title = seo?.title || defaults.title
  const description = seo?.description || defaults.description
  const keywords = seo?.keywords || defaults.keywords
  const ogTitle = seo?.og_title || defaults.ogTitle || title
  const ogDescription = seo?.og_description || defaults.ogDescription || description

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
