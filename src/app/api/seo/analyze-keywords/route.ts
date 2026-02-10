import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

const CORE_KEYWORDS = [
  { keyword: '성범죄 변호사', category: '성범죄' },
  { keyword: '성범죄 피해자 변호사', category: '성범죄' },
  { keyword: '성폭력 변호사', category: '성범죄' },
  { keyword: '디지털성범죄 변호사', category: '성범죄' },
  { keyword: '스토킹 변호사', category: '성범죄' },
  { keyword: '불법촬영 변호사', category: '성범죄' },
  { keyword: '몰카 변호사', category: '성범죄' },
  { keyword: '데이트폭력 변호사', category: '성범죄' },
  { keyword: '보이스피싱 변호사', category: '재산범죄' },
  { keyword: '전세사기 변호사', category: '재산범죄' },
  { keyword: '투자사기 변호사', category: '재산범죄' },
  { keyword: '사기 피해 변호사', category: '재산범죄' },
  { keyword: '개인회생 변호사', category: '회생/파산' },
  { keyword: '개인파산 변호사', category: '회생/파산' },
  { keyword: '부천 변호사', category: '지역' },
  { keyword: '부천 법률사무소', category: '지역' },
  { keyword: '피해자 전문 변호사', category: '브랜드' },
  { keyword: '딥페이크 변호사', category: '성범죄' },
  { keyword: '리벤지포르노 변호사', category: '성범죄' },
]

export async function POST() {
  try {
    const anthropicApiKey = process.env.ANTHROPIC_API_KEY
    if (!anthropicApiKey) {
      return NextResponse.json({ error: 'ANTHROPIC_API_KEY가 설정되지 않았습니다.' }, { status: 500 })
    }

    const keywordList = CORE_KEYWORDS.map((k) => `${k.keyword} (${k.category})`).join('\n')

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
        system: `당신은 한국 법률 시장 SEO/SEM 전문가입니다.

법률사무소 로앤이의 핵심 키워드를 분석해주세요.

로앤이 정보:
- 전문: 성범죄·재산범죄 피해자 전문
- 슬로건: "오직 피해자만 변호합니다"
- 위치: 경기도 부천시
- 웹사이트: roandlee.com

각 키워드에 대해 분석하고, 추가로 공략할 새 키워드도 제안해주세요.

반드시 아래 JSON 형식으로만 응답하세요:
{
  "keyword_analyses": [
    {
      "keyword": "키워드",
      "category": "카테고리",
      "search_volume": "high/medium/low",
      "difficulty": "high/medium/low",
      "trend": "up/down/stable",
      "our_optimization": "good/fair/poor",
      "recommendation": "최적화 제안"
    }
  ],
  "new_keyword_suggestions": [
    {
      "keyword": "새 키워드",
      "category": "카테고리",
      "search_volume": "medium",
      "difficulty": "low",
      "trend": "new",
      "reason": "추천 이유"
    }
  ],
  "priority_actions": [
    "우선 조치사항 1",
    "우선 조치사항 2",
    "우선 조치사항 3"
  ],
  "summary": "전체 키워드 전략 요약"
}`,
        messages: [
          {
            role: 'user',
            content: `로앤이 핵심 키워드 목록:\n${keywordList}\n\n각 키워드를 분석하고, 새로 공략할 키워드도 제안해주세요.`,
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
    const text = claudeData.content?.[0]?.text || ''
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return NextResponse.json({ error: 'AI 응답을 파싱할 수 없습니다.' }, { status: 500 })
    }

    const result = JSON.parse(jsonMatch[0])

    // Clear old keyword tracking and insert fresh data
    await supabaseAdmin.from('keyword_tracking').delete().neq('id', 0)

    const keywordRows = [
      ...(result.keyword_analyses || []).map((k: Record<string, string>) => ({
        keyword: k.keyword,
        category: k.category,
        search_volume: k.search_volume,
        difficulty: k.difficulty,
        trend: k.trend,
        checked_at: new Date().toISOString(),
      })),
      ...(result.new_keyword_suggestions || []).map((k: Record<string, string>) => ({
        keyword: k.keyword,
        category: k.category,
        search_volume: k.search_volume,
        difficulty: k.difficulty,
        trend: 'new' as const,
        checked_at: new Date().toISOString(),
      })),
    ]

    if (keywordRows.length > 0) {
      await supabaseAdmin.from('keyword_tracking').insert(keywordRows)
    }

    // Save analysis record
    await supabaseAdmin.from('seo_analyses').insert({
      analysis_type: 'keyword',
      data: result,
      recommendations: result.priority_actions,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Keyword analysis error:', error)
    const msg = error instanceof Error ? error.message : '알 수 없는 오류'
    return NextResponse.json({ error: `서버 오류: ${msg}` }, { status: 500 })
  }
}
