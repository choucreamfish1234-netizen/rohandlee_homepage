import sitemap from '../sitemap'

// /sitemap.xml 응답은 sitemap.ts 한 곳에서 관리하는 목록을 그대로 렌더링한다.
export async function GET() {
  const entries = await sitemap()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map((e) => {
    const lastmod = e.lastModified
      ? new Date(e.lastModified).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0]
    return `  <url>
    <loc>${e.url}</loc>
    <lastmod>${lastmod}</lastmod>${e.changeFrequency ? `\n    <changefreq>${e.changeFrequency}</changefreq>` : ''}${
      e.priority !== undefined ? `\n    <priority>${e.priority.toFixed(1)}</priority>` : ''
    }
  </url>`
  })
  .join('\n')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
