import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { callClaude } from '@/lib/claude-api'
import { parseAIResponse } from '@/lib/parse-ai-response'

const SYSTEM_PROMPT = `당신은 법률사무소 웹사이트 SEO 전문가입니다.
법률사무소 로앤이(roandlee.com) 정보:
- 오직 피해자만 변호
- 성범죄 전문: 이유림 변호사
- 재산범죄 전문: 노채은 변호사
- 로톡 평점 4.9, 후기 600건 이상
- 위치: 경기도 부천시

주어진 페이지의 SEO 메타태그를 최적화해주세요.
반드시 유효한 JSON만 응답하세요. 마크다운 코드블록 사용 금지.
{"title":"50-60자 최적화된 타이틀","description":"140-160자 최적화된 설명","keywords":"키워드1, 키워드2, 키워드3"}`

interface OptimizeRequest {
  pages: {
    page_path: string
    page_name: string
    current_title: string
    current_description: string
    issues: string[]
    score: number
  }[]
}

export async function POST(req: NextRequest) {
  try {
    const anthropicApiKey = process.env.ANTHROPIC_API_KEY
    if (!anthropicApiKey) {
      return NextResponse.json({ error: 'ANTHROPIC_API_KEY가 설정되지 않았습니다.' }, { status: 500 })
    }

    const { pages } = (await req.json()) as OptimizeRequest

    if (!pages || !Array.isArray(pages) || pages.length === 0) {
      return NextResponse.json({ error: '최적화할 페이지가 없습니다.' }, { status: 400 })
    }

    const suggestions: {
      page_path: string
      page_name: string
      current_title: string
      suggested_title: string
      current_description: string
      suggested_description: string
      target_keywords: string[]
      reason: string
    }[] = []

    for (const page of pages) {
      try {
        const userMessage = `이 페이지의 SEO 메타태그를 최적화해주세요.

페이지: ${page.page_name} (${page.page_path})
현재 문제점: ${page.issues.join(', ')}
현재 title: ${page.current_title}
현재 description: ${page.current_description}

문제점을 해결하는 최적화된 title(50-60자)과 description(140-160자)을 제안해주세요.`

        const text = await callClaude(anthropicApiKey, SYSTEM_PROMPT, userMessage, 512)
        const parsed = parseAIResponse(text)

        if (parsed.title && parsed.description) {
          suggestions.push({
            page_path: page.page_path,
            page_name: page.page_name,
            current_title: page.current_title,
            suggested_title: parsed.title,
            current_description: page.current_description,
            suggested_description: parsed.description,
            target_keywords: parsed.keywords
              ? (typeof parsed.keywords === 'string' ? parsed.keywords.split(',').map((k: string) => k.trim()) : parsed.keywords)
              : [],
            reason: `감사 점수 ${page.score}점 → 문제점: ${page.issues.join(', ')}`,
          })
        }
      } catch (err) {
        console.error(`Optimize failed for ${page.page_path}:`, err)
        // Skip failed pages, continue with others
      }
    }

    // Save analysis record
    await supabaseAdmin.from('seo_analyses').insert({
      analysis_type: 'audit_optimize',
      data: { input_pages: pages, suggestions },
      recommendations: suggestions.map(s => `${s.page_name}: title/description 최적화`),
    })

    return NextResponse.json({ suggestions })
  } catch (error) {
    const msg = error instanceof Error ? error.message : '알 수 없는 오류'
    return NextResponse.json({ error: `서버 오류: ${msg}` }, { status: 500 })
  }
}
