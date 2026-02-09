import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST() {
  try {
    const anthropicApiKey = process.env.ANTHROPIC_API_KEY
    if (!anthropicApiKey) {
      return NextResponse.json({ error: 'ANTHROPIC_API_KEY가 설정되지 않았습니다.' }, { status: 500 })
    }

    // Fetch latest analyses for context
    const [keywordResult, auditResult, competitorResult] = await Promise.all([
      supabase
        .from('seo_analyses')
        .select('data')
        .eq('analysis_type', 'keyword')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle(),
      supabase
        .from('seo_analyses')
        .select('data')
        .eq('analysis_type', 'our_site')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle(),
      supabase
        .from('seo_analyses')
        .select('data')
        .eq('analysis_type', 'competitor')
        .order('created_at', { ascending: false })
        .limit(3),
    ])

    const keywordData = keywordResult.data?.data
    const auditData = auditResult.data?.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const competitorData: any[] = competitorResult.data?.map((r: { data: unknown }) => r.data) || []

    // Build context
    const contextParts: string[] = []

    if (keywordData) {
      const keywords = (keywordData.keyword_analyses || [])
        .slice(0, 10)
        .map((k: Record<string, string>) => `${k.keyword} (검색량: ${k.search_volume}, 난이도: ${k.difficulty})`)
        .join('\n')
      contextParts.push(`주요 키워드 분석:\n${keywords}`)
    }

    if (auditData?.audit?.pages) {
      const pages = auditData.audit.pages
        .map((p: Record<string, string | number | string[]>) => `${p.path}: 점수 ${p.score}/100, 문제: ${(p.issues as string[]).join(', ')}`)
        .join('\n')
      contextParts.push(`사이트 감사 결과:\n${pages}`)
    }

    if (competitorData.length > 0) {
      const competitors = competitorData
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((c: any) => `${c.competitor_name}: ${c.analysis?.summary || '분석 없음'}`)
        .join('\n')
      contextParts.push(`경쟁사 분석 요약:\n${competitors}`)
    }

    const contextStr = contextParts.length > 0
      ? contextParts.join('\n\n---\n\n')
      : '아직 수집된 분석 데이터가 없습니다. 일반적인 법률사무소 SEO 모범사례를 기반으로 제안해주세요.'

    const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicApiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250514',
        max_tokens: 4096,
        system: `당신은 법률사무소 SEO 메타태그 최적화 전문가입니다.

법률사무소 로앤이(roandlee.com) 각 페이지에 최적화된 title과 meta description을 생성해주세요.

로앤이 정보:
- 전문: 성범죄·재산범죄 피해자 전문
- 슬로건: "오직 피해자만 변호합니다"
- 위치: 경기도 부천시
- 강점: 로톡 평점 4.9, 후기 600+, 피해자 전담
- 대표변호사: 이유림(성범죄), 노채은(재산범죄)

규칙:
- Title: 60자 이내, 핵심 키워드 포함, 브랜드명 포함
- Description: 155자 이내, 행동 유도(CTA) 포함, 차별점 강조
- 각 페이지별 고유한 title/description
- 한국어 자연스러운 문장

반드시 아래 JSON 형식으로만 응답하세요:
{
  "suggestions": [
    {
      "page_path": "/",
      "page_name": "메인 페이지",
      "current_title": "현재 타이틀 (모르면 빈 문자열)",
      "suggested_title": "제안 타이틀",
      "current_description": "현재 디스크립션 (모르면 빈 문자열)",
      "suggested_description": "제안 디스크립션",
      "reason": "변경 이유",
      "target_keywords": ["타겟 키워드1", "키워드2"]
    }
  ],
  "general_recommendations": ["전반적 권장사항1", "권장사항2"],
  "summary": "메타태그 최적화 전체 요약"
}`,
        messages: [
          {
            role: 'user',
            content: `아래 분석 데이터를 참고하여 로앤이 각 페이지의 최적화된 메타태그를 제안해주세요.

페이지 목록:
/ - 메인 페이지
/consultation - 상담 신청
/blog - 블로그
/cases - 성공 사례
/directions - 오시는 길
/centers/sexual-crime - 성범죄 센터
/centers/property-crime - 재산범죄 센터
/centers/it-security - IT보안 센터
/centers/corporate - 기업법무 센터
/centers/bankruptcy - 회생/파산 센터

분석 데이터:
${contextStr}`,
          },
        ],
      }),
    })

    if (!claudeRes.ok) {
      const err = await claudeRes.text()
      console.error('Claude API error:', err)
      return NextResponse.json({ error: 'AI 분석에 실패했습니다.' }, { status: 500 })
    }

    const claudeData = await claudeRes.json()
    const text = claudeData.content?.[0]?.text || ''
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return NextResponse.json({ error: 'AI 응답을 파싱할 수 없습니다.' }, { status: 500 })
    }

    const result = JSON.parse(jsonMatch[0])

    // Save suggestions as seo_changes
    if (result.suggestions) {
      const changes = result.suggestions.flatMap((s: Record<string, string>) => {
        const rows = []
        if (s.suggested_title) {
          rows.push({
            page_path: s.page_path,
            field_changed: 'title',
            old_value: s.current_title || null,
            new_value: s.suggested_title,
            reason: s.reason,
          })
        }
        if (s.suggested_description) {
          rows.push({
            page_path: s.page_path,
            field_changed: 'description',
            old_value: s.current_description || null,
            new_value: s.suggested_description,
            reason: s.reason,
          })
        }
        return rows
      })

      if (changes.length > 0) {
        await supabase.from('seo_changes').insert(changes)
      }
    }

    // Save full report
    await supabase.from('seo_analyses').insert({
      analysis_type: 'full_report',
      data: result,
      recommendations: result.general_recommendations,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Generate meta error:', error)
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}
