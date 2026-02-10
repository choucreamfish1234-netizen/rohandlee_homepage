import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { parseAIResponse } from '@/lib/parse-ai-response'

const SITE_PAGES = [
  { path: '/', name: '메인 페이지' },
  { path: '/consultation', name: '상담 신청' },
  { path: '/blog', name: '블로그' },
  { path: '/cases', name: '성공 사례' },
  { path: '/directions', name: '오시는 길' },
  { path: '/centers/sexual-crime', name: '성범죄 센터' },
  { path: '/centers/property-crime', name: '재산범죄 센터' },
  { path: '/centers/it-security', name: 'IT보안 센터' },
  { path: '/centers/corporate', name: '기업법무 센터' },
  { path: '/centers/bankruptcy', name: '회생/파산 센터' },
]

export async function POST() {
  try {
    const anthropicApiKey = process.env.ANTHROPIC_API_KEY
    if (!anthropicApiKey) {
      return NextResponse.json({ error: 'ANTHROPIC_API_KEY가 설정되지 않았습니다.' }, { status: 500 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://roandlee.com'

    // Fetch all pages and extract SEO data
    const pageResults = await Promise.all(
      SITE_PAGES.map(async (page) => {
        try {
          const controller = new AbortController()
          const timeout = setTimeout(() => controller.abort(), 8000)
          const res = await fetch(`${baseUrl}${page.path}`, {
            signal: controller.signal,
            headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SEO Auditor)' },
          })
          clearTimeout(timeout)

          if (!res.ok) {
            return { ...page, fetchSuccess: false, extracted: null }
          }

          const html = await res.text()
          return {
            ...page,
            fetchSuccess: true,
            extracted: {
              title: extractTag(html, 'title'),
              metaDescription: extractMeta(html, 'description'),
              metaKeywords: extractMeta(html, 'keywords'),
              h1Tags: extractAllTags(html, 'h1'),
              h2Tags: extractAllTags(html, 'h2').slice(0, 10),
              ogTitle: extractMeta(html, 'og:title', 'property'),
              ogDescription: extractMeta(html, 'og:description', 'property'),
              hasStructuredData: html.includes('application/ld+json'),
              imgWithoutAlt: countImagesWithoutAlt(html),
              totalImages: countTotalImages(html),
              canonical: extractLink(html, 'canonical'),
              htmlLang: extractHtmlLang(html),
            },
          }
        } catch {
          return { ...page, fetchSuccess: false, extracted: null }
        }
      })
    )

    // Build analysis prompt
    const pagesData = pageResults
      .map((p) => {
        if (!p.fetchSuccess || !p.extracted) {
          return `${p.name} (${p.path}): 접근 불가`
        }
        const e = p.extracted
        return `${p.name} (${p.path}):
  - Title: ${e.title || '없음'}
  - Meta Description: ${e.metaDescription || '없음'}
  - H1: ${e.h1Tags.join(', ') || '없음'}
  - H2: ${e.h2Tags.join(', ') || '없음'}
  - OG Title: ${e.ogTitle || '없음'}
  - 구조화 데이터: ${e.hasStructuredData ? '있음' : '없음'}
  - 이미지 alt 누락: ${e.imgWithoutAlt}/${e.totalImages}
  - Canonical: ${e.canonical || '없음'}
  - HTML lang: ${e.htmlLang || '없음'}`
      })
      .join('\n\n')

    const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicApiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 4096,
        system: `당신은 법률 웹사이트 SEO 감사 전문가입니다.

법률사무소 로앤이(roandlee.com)의 각 페이지 SEO를 감사합니다.

각 페이지를 100점 만점으로 평가하고, 구체적인 문제점과 개선사항을 제시해주세요.

반드시 유효한 JSON만 응답하세요. 마크다운 코드블록(\`\`\`)을 사용하지 마세요. JSON 외에 다른 텍스트를 포함하지 마세요.
아래 JSON 형식으로 응답하세요:
{
  "pages": [
    {
      "path": "/",
      "name": "메인 페이지",
      "score": 85,
      "issues": ["문제점1", "문제점2"],
      "improvements": ["개선사항1", "개선사항2"],
      "title_feedback": "타이틀 평가",
      "description_feedback": "디스크립션 평가"
    }
  ],
  "overall_score": 78,
  "critical_issues": ["심각한 문제1", "심각한 문제2"],
  "top_priorities": ["최우선 개선사항1", "최우선 개선사항2", "최우선 개선사항3"],
  "technical_issues": ["기술적 문제1"],
  "summary": "전체 감사 결과 요약"
}`,
        messages: [
          {
            role: 'user',
            content: `로앤이 웹사이트 각 페이지 SEO 데이터:\n\n${pagesData}\n\n각 페이지를 감사하고 점수를 매겨주세요.`,
          },
        ],
      }),
    })

    if (!claudeRes.ok) {
      const err = await claudeRes.text()
      console.error('Claude API error:', claudeRes.status, err)
      return NextResponse.json({ error: `AI 분석 실패 (HTTP ${claudeRes.status}): ${err.substring(0, 200)}` }, { status: 500 })
    }

    const claudeData = await claudeRes.json()
    const rawText = claudeData.content?.[0]?.text || ''
    const audit = parseAIResponse(rawText)

    // Save to seo_analyses
    await supabaseAdmin.from('seo_analyses').insert({
      analysis_type: 'our_site',
      data: { pages: pageResults, audit },
      recommendations: audit.top_priorities,
    })

    return NextResponse.json({ audit, pageResults })
  } catch (error) {
    console.error('Site audit error:', error)
    const msg = error instanceof Error ? error.message : '알 수 없는 오류'
    return NextResponse.json({ error: `서버 오류: ${msg}` }, { status: 500 })
  }
}

function extractTag(html: string, tag: string): string {
  const match = html.match(new RegExp(`<${tag}[^>]*>([^<]*)</${tag}>`, 'i'))
  return match ? match[1].trim() : ''
}

function extractMeta(html: string, name: string, attr = 'name'): string {
  const pattern = new RegExp(`<meta[^>]+${attr}=["']${name}["'][^>]+content=["']([^"']*)["']`, 'i')
  const match = html.match(pattern)
  if (match) return match[1].trim()
  const pattern2 = new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+${attr}=["']${name}["']`, 'i')
  const match2 = html.match(pattern2)
  return match2 ? match2[1].trim() : ''
}

function extractAllTags(html: string, tag: string): string[] {
  const regex = new RegExp(`<${tag}[^>]*>([^<]*)</${tag}>`, 'gi')
  const matches: string[] = []
  let m
  while ((m = regex.exec(html)) !== null) {
    const text = m[1].trim()
    if (text) matches.push(text)
  }
  return matches
}

function countImagesWithoutAlt(html: string): number {
  const imgs = html.match(/<img[^>]*>/gi) || []
  return imgs.filter((img) => !img.includes('alt=') || img.match(/alt=["']\s*["']/)).length
}

function countTotalImages(html: string): number {
  return (html.match(/<img[^>]*>/gi) || []).length
}

function extractLink(html: string, rel: string): string {
  const match = html.match(new RegExp(`<link[^>]+rel=["']${rel}["'][^>]+href=["']([^"']*)["']`, 'i'))
  return match ? match[1].trim() : ''
}

function extractHtmlLang(html: string): string {
  const match = html.match(/<html[^>]+lang=["']([^"']*)["']/i)
  return match ? match[1].trim() : ''
}
