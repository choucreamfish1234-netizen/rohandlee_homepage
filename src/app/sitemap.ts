import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://lawfirmrohandlee.com'

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: '2025-08-25', changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/consultation`, lastModified: '2025-08-25', changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/privacy`, lastModified: '2025-06-01', changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: '2025-06-01', changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/apps/sincerity`, lastModified: '2025-07-01', changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/directions`, lastModified: '2025-06-01', changeFrequency: 'yearly', priority: 0.5 },

    { url: `${baseUrl}/centers/sexual-crime`, lastModified: '2025-08-20', changeFrequency: 'monthly', priority: 0.9 },
    ...['rape','molestation','intoxication','minors','family','hidden-camera','distribution','deepfake','online','workplace','stalking','std'].map(slug => ({
      url: `${baseUrl}/centers/sexual-crime/${slug}`,
      lastModified: '2025-08-20',
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...['investigation','trial','appeal','settlement','damages','cost-recovery','false-accusation','evidence','statute-of-limitations'].map(slug => ({
      url: `${baseUrl}/centers/sexual-crime/guide/${slug}`,
      lastModified: '2025-08-20',
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),

    { url: `${baseUrl}/centers/property-crime`, lastModified: '2025-08-20', changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/centers/asset-recovery`, lastModified: '2025-08-20', changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/centers/damages`, lastModified: '2025-08-20', changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/centers/divorce`, lastModified: '2025-08-20', changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/centers/physical-crime`, lastModified: '2025-08-25', changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/centers/real-estate`, lastModified: '2025-08-20', changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/centers/school-violence`, lastModified: '2025-08-20', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/centers/corporate`, lastModified: '2025-08-20', changeFrequency: 'monthly', priority: 0.8 },

    { url: `${baseUrl}/lawyers/lee-yurim`, lastModified: '2025-08-15', changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/lawyers/roh-chaeeun`, lastModified: '2025-08-25', changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/lawyers`, lastModified: '2025-08-25', changeFrequency: 'monthly', priority: 0.8 },

    { url: `${baseUrl}/cases`, lastModified: '2025-08-20', changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date().toISOString(), changeFrequency: 'daily', priority: 0.8 },
  ]

  const dynamicPages: MetadataRoute.Sitemap = []
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey)

      const { data: posts } = await supabase
        .from('blog_posts')
        .select('slug, updated_at, created_at')
        .eq('status', 'published')

      if (posts) {
        dynamicPages.push(...posts.map((post) => ({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: new Date(post.updated_at || post.created_at),
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        })))
      }

      const { data: cases } = await supabase
        .from('success_cases')
        .select('slug, updated_at, created_at')
        .eq('published', true)

      if (cases) {
        dynamicPages.push(...cases.map((c) => ({
          url: `${baseUrl}/cases/${c.slug}`,
          lastModified: new Date(c.updated_at || c.created_at),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        })))
      }
    }
  } catch (err) {
    console.error('Sitemap dynamic fetch error:', err)
  }

  return [...staticPages, ...dynamicPages]
}
