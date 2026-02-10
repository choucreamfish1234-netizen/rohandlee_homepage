import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { parseAIResponse } from '@/lib/parse-ai-response'
import { callClaude } from '@/lib/claude-api'

const PAGES = [
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

const SYSTEM_PROMPT = `법률사무소 로앤이의 SEO 메타태그 최적화 전문가입니다.
요청한 페이지 1개에 대해 최적화된 메타태그를 제안하세요.

로앤이 정보:
- 전문: 성범죄·재산범죄 피해자 전문
- 슬로건: "오직 피해자만 변호합니다"
- 위치: 경기도 부천시
- 강점: 로톡 평점 4.9, 후기 600+, 피해자 전담
- 대표변호사: 이유림(성범죄), 노채은(재산범죄)

규칙:
- Title: 60자 이내, 핵심 키워드 포함, 브랜드명 포함
- Description: 155자 이내, 행동 유도(CTA) 포함, 차별점 강조

반드시 유효한 JSON만 응답하세요. 마크다운 코드블록을 사용하지 마세요.
{"suggested_title":"...","suggested_description":"...","target_keywords":["k1","k2"],"og_title":"...","og_description":"...","reason":"변경 이유"}`

export async function POST() {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'ANTHROPIC_API_KEY가 설정되지 않았습니다.' }, { status: 500 })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const suggestions: any[] = []

    for (const page of PAGES) {
      try {
        const text = await callClaude(
          apiKey,
          SYSTEM_PROMPT,
          `페이지: ${page.path} (${page.name})\n이 페이지에 최적화된 메타태그를 JSON으로 제안해주세요.`,
          1024,
        )
        const parsed = parseAIResponse(text)
        suggestions.push({ page_path: page.path, page_name: page.name, ...parsed })
      } catch (err) {
        console.error(`Meta generation failed for ${page.path}:`, err)
        suggestions.push({
          page_path: page.path,
          page_name: page.name,
          suggested_title: '',
          suggested_description: '',
          error: err instanceof Error ? err.message : 'Unknown error',
        })
      }
    }

    // Save to seo_changes
    const changes = suggestions.flatMap((s) => {
      const rows: { page_path: string; field_changed: string; old_value: null; new_value: string; reason: string | null }[] = []
      if (s.suggested_title) {
        rows.push({
          page_path: s.page_path,
          field_changed: 'title',
          old_value: null,
          new_value: s.suggested_title,
          reason: s.reason || null,
        })
      }
      if (s.suggested_description) {
        rows.push({
          page_path: s.page_path,
          field_changed: 'description',
          old_value: null,
          new_value: s.suggested_description,
          reason: s.reason || null,
        })
      }
      return rows
    })

    if (changes.length > 0) {
      await supabaseAdmin.from('seo_changes').insert(changes)
    }

    const result = {
      suggestions,
      general_recommendations: [
        '각 페이지에 고유한 title과 description 설정',
        '핵심 키워드를 title 앞쪽에 배치',
        'CTA(무료 상담, 전화번호 등)를 description에 포함',
      ],
      summary: `${suggestions.filter((s) => s.suggested_title).length}개 페이지의 메타태그 최적화 제안이 생성되었습니다.`,
    }

    await supabaseAdmin.from('seo_analyses').insert({
      analysis_type: 'full_report',
      data: result,
      recommendations: result.general_recommendations,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Generate meta error:', error)
    const msg = error instanceof Error ? error.message : '알 수 없는 오류'
    return NextResponse.json({ error: `서버 오류: ${msg}` }, { status: 500 })
  }
}
