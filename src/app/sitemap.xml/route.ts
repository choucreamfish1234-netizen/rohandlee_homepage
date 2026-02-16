import { createClient } from '@supabase/supabase-js'

const baseUrl = 'https://lawfirmrohandlee.com'

export async function GET() {
  const staticPages = [
    { url: baseUrl, changefreq: 'weekly', priority: '1.0' },
    { url: `${baseUrl}/consultation`, changefreq: 'monthly', priority: '0.9' },
    { url: `${baseUrl}/centers/sexual-crime`, changefreq: 'monthly', priority: '0.9' },
    { url: `${baseUrl}/centers/property-crime`, changefreq: 'monthly', priority: '0.9' },
    { url: `${baseUrl}/centers/bankruptcy`, changefreq: 'monthly', priority: '0.9' },
    { url: `${baseUrl}/centers/corporate`, changefreq: 'monthly', priority: '0.8' },
    { url: `${baseUrl}/centers/it-security`, changefreq: 'monthly', priority: '0.8' },
    { url: `${baseUrl}/cases`, changefreq: 'weekly', priority: '0.8' },
    { url: `${baseUrl}/blog`, changefreq: 'daily', priority: '0.8' },
    { url: `${baseUrl}/directions`, changefreq: 'yearly', priority: '0.5' },
  ]

  // Fetch published blog posts
  let blogPages: { url: string; lastmod: string; changefreq: string; priority: string }[] = []
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey)
      const { data: posts } = await supabase
        .from('blog_posts')
        .select('slug, updated_at, created_at')
        .eq('status', 'published')
        .lte('published_at', new Date().toISOString())

      if (posts) {
        blogPages = posts.map((post) => ({
          url: `${baseUrl}/blog/${post.slug}`,
          lastmod: new Date(post.updated_at || post.created_at).toISOString().split('T')[0],
          changefreq: 'weekly',
          priority: '0.7',
        }))
      }
    }
  } catch (err) {
    console.error('Sitemap blog fetch error:', err)
  }

  const today = new Date().toISOString().split('T')[0]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
${blogPages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
