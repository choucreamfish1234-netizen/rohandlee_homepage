import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { parseAIResponse } from '@/lib/parse-ai-response'

export async function POST(req: NextRequest) {
  try {
    const { competitorId } = await req.json()

    if (!competitorId) {
      return NextResponse.json({ error: '경쟁사 ID가 필요합니다.' }, { status: 400 })
    }

    // Fetch competitor info
    const { data: competitor, error: fetchError } = await supabaseAdmin
      .from('competitors')
      .select('*')
      .eq('id', competitorId)
      .single()

    if (fetchError || !competitor) {
      return NextResponse.json({ error: '경쟁사 정보를 찾을 수 없습니다.' }, { status: 404 })
    }

    // Fetch the competitor's website HTML
    let pageHtml = ''
    let fetchSuccess = false
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 10000)
      const res = await fetch(competitor.url, {
        signal: controller.signal,
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SEO Analyzer)' },
      })
      clearTimeout(timeout)
      if (res.ok) {
        pageHtml = await res.text()
        fetchSuccess = true
      }
    } catch {
      // Site may be unreachable - continue with limited analysis
    }

    // Extract basic SEO elements from HTML
    const extracted = {
      title: extractTag(pageHtml, 'title'),
      metaDescription: extractMeta(pageHtml, 'description'),
      metaKeywords: extractMeta(pageHtml, 'keywords'),
      h1Tags: extractAllTags(pageHtml, 'h1'),
      h2Tags: extractAllTags(pageHtml, 'h2').slice(0, 10),
      ogTitle: extractMeta(pageHtml, 'og:title', 'property'),
      ogDescription: extractMeta(pageHtml, 'og:description', 'property'),
      hasStructuredData: pageHtml.includes('application/ld+json'),
      fetchSuccess,
    }

    // Analyze with Claude API
    const anthropicApiKey = process.env.ANTHROPIC_API_KEY
    if (!anthropicApiKey) {
      return NextResponse.json({ error: 'ANTHROPIC_API_KEY가 설정되지 않았습니다.' }, { status: 500 })
    }

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
        system: `당신은 법률 마케팅 SEO 전문가입니다.

경쟁 법률사무소 웹사이트를 분석하고, 법률사무소 로앤이와 비교해주세요.

로앤이 정보:
- 전문: 성범죄·재산범죄 피해자 전문
- 슬로건: "오직 피해자만 변호합니다"
- 위치: 경기도 부천시
- 강점: 로톡 평점 4.9, 후기 600+, 피해자 전담

반드시 유효한 JSON만 응답하세요. 마크다운 코드블록(\`\`\`)을 사용하지 마세요. JSON 외에 다른 텍스트를 포함하지 마세요.
아래 JSON 형식으로 응답하세요:
{
  "title_analysis": { "text": "타이틀 텍스트", "score": 85, "keywords": ["키워드1"], "feedback": "분석 코멘트" },
  "meta_description_analysis": { "text": "디스크립션 텍스트", "score": 70, "feedback": "분석 코멘트" },
  "heading_structure": { "score": 75, "feedback": "H1/H2 구조 분석" },
  "target_keywords": ["주요 타겟 키워드 목록"],
  "content_strategy": { "has_blog": true, "feedback": "콘텐츠 전략 분석" },
  "vs_roandlee": {
    "competitor_strengths": ["경쟁사 강점1", "강점2"],
    "competitor_weaknesses": ["약점1", "약점2"],
    "our_advantages": ["로앤이 강점1", "강점2"]
  },
  "actionable_improvements": [
    { "priority": "high", "action": "즉시 적용할 개선사항", "detail": "상세 설명" },
    { "priority": "medium", "action": "개선사항2", "detail": "상세 설명" },
    { "priority": "low", "action": "개선사항3", "detail": "상세 설명" }
  ],
  "overall_score": 72,
  "summary": "전체 요약 1-2문장"
}`,
        messages: [
          {
            role: 'user',
            content: `경쟁사: ${competitor.name} (${competitor.url})
전문분야: ${competitor.speciality || '미상'}

${fetchSuccess ? `웹사이트 SEO 데이터:
- Title: ${extracted.title || '없음'}
- Meta Description: ${extracted.metaDescription || '없음'}
- Meta Keywords: ${extracted.metaKeywords || '없음'}
- H1 태그: ${extracted.h1Tags.join(', ') || '없음'}
- H2 태그: ${extracted.h2Tags.join(', ') || '없음'}
- OG Title: ${extracted.ogTitle || '없음'}
- OG Description: ${extracted.ogDescription || '없음'}
- 구조화 데이터: ${extracted.hasStructuredData ? '있음' : '없음'}` : '웹사이트 접근 불가 - 경쟁사 이름과 전문분야 정보만으로 분석해주세요.'}

이 경쟁사를 분석하고 로앤이와 비교해주세요.`,
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
    const analysis = parseAIResponse(rawText)

    // Save to seo_analyses
    await supabaseAdmin.from('seo_analyses').insert({
      analysis_type: 'competitor',
      data: { competitor_id: competitor.id, competitor_name: competitor.name, extracted, analysis },
      recommendations: analysis.actionable_improvements,
    })

    return NextResponse.json({ analysis, extracted })
  } catch (error) {
    console.error('Competitor analysis error:', error)
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
  // Try reverse order (content before name)
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
