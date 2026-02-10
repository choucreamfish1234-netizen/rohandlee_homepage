import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { parseAIResponse } from '@/lib/parse-ai-response'
import { callClaude } from '@/lib/claude-api'

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

const PAGE_AUDIT_SYSTEM = `당신은 법률 웹사이트 SEO 감사 전문가입니다.
법률사무소 로앤이(roandlee.com)의 페이지 1개를 감사합니다.
100점 만점으로 평가하고 문제점과 개선사항을 제시하세요.

반드시 유효한 JSON만 응답하세요. 마크다운 코드블록 사용 금지.
{"score":85,"issues":["문제점1","문제점2"],"improvements":["개선사항1","개선사항2"],"title_feedback":"타이틀 평가","description_feedback":"디스크립션 평가"}`

export async function POST() {
  try {
    const anthropicApiKey = process.env.ANTHROPIC_API_KEY
    if (!anthropicApiKey) {
      return NextResponse.json({ error: 'ANTHROPIC_API_KEY가 설정되지 않았습니다.' }, { status: 500 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://roandlee.com'

    // Step 1: Fetch all pages HTML in parallel
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

    // Step 2: Audit each page individually via Claude
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const auditPages: any[] = []
    const allIssues: string[] = []

    for (const p of pageResults) {
      if (!p.fetchSuccess || !p.extracted) {
        auditPages.push({
          path: p.path,
          name: p.name,
          score: 0,
          issues: ['페이지 접근 불가'],
          improvements: ['서버 상태 확인 필요'],
          title_feedback: '확인 불가',
          description_feedback: '확인 불가',
        })
        continue
      }

      try {
        const e = p.extracted
        const pageData = `${p.name} (${p.path}):
- Title: ${e.title || '없음'}
- Meta Description: ${e.metaDescription || '없음'}
- H1: ${e.h1Tags.join(', ') || '없음'}
- H2: ${e.h2Tags.join(', ') || '없음'}
- OG Title: ${e.ogTitle || '없음'}
- 구조화 데이터: ${e.hasStructuredData ? '있음' : '없음'}
- 이미지 alt 누락: ${e.imgWithoutAlt}/${e.totalImages}
- Canonical: ${e.canonical || '없음'}
- HTML lang: ${e.htmlLang || '없음'}`

        const text = await callClaude(
          anthropicApiKey,
          PAGE_AUDIT_SYSTEM,
          `이 페이지를 SEO 감사해주세요:\n\n${pageData}`,
          1024,
        )
        const parsed = parseAIResponse(text)
        auditPages.push({ path: p.path, name: p.name, ...parsed })
        if (parsed.issues) allIssues.push(...parsed.issues)
      } catch (err) {
        console.error(`Audit failed for ${p.path}:`, err)
        auditPages.push({
          path: p.path,
          name: p.name,
          score: 0,
          issues: ['AI 분석 실패'],
          improvements: [],
          title_feedback: '',
          description_feedback: '',
        })
      }
    }

    // Calculate overall score
    const scores = auditPages.filter((p) => p.score > 0).map((p) => p.score)
    const overallScore = scores.length > 0
      ? Math.round(scores.reduce((a: number, b: number) => a + b, 0) / scores.length)
      : 0

    // Deduplicate critical issues
    const criticalIssues = Array.from(new Set(allIssues)).slice(0, 5)

    const audit = {
      pages: auditPages,
      overall_score: overallScore,
      critical_issues: criticalIssues,
      top_priorities: criticalIssues.slice(0, 3),
      summary: `${auditPages.length}개 페이지 감사 완료. 평균 점수: ${overallScore}점/100점`,
    }

    // Save
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
