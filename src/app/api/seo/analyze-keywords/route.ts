import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { parseAIResponse } from '@/lib/parse-ai-response'
import { callClaude } from '@/lib/claude-api'

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

const CHUNK_SYSTEM = `당신은 한국 법률 시장 SEO/SEM 전문가입니다.

법률사무소 로앤이의 키워드를 분석합니다.
- 전문: 성범죄·재산범죄 피해자 전문
- 슬로건: "오직 피해자만 변호합니다"
- 위치: 경기도 부천시

반드시 유효한 JSON만 응답하세요. 마크다운 코드블록 사용 금지.
{"keyword_analyses":[{"keyword":"...","category":"...","search_volume":"high/medium/low","difficulty":"high/medium/low","trend":"up/down/stable","our_optimization":"good/fair/poor","recommendation":"..."}]}`

const SUMMARY_SYSTEM = `당신은 한국 법률 시장 SEO/SEM 전문가입니다.

분석된 키워드를 바탕으로 새로운 키워드 제안과 우선 조치사항을 알려주세요.

반드시 유효한 JSON만 응답하세요. 마크다운 코드블록 사용 금지.
{"new_keyword_suggestions":[{"keyword":"...","category":"...","search_volume":"medium","difficulty":"low","trend":"new","reason":"..."}],"priority_actions":["조치1","조치2","조치3"],"summary":"전체 키워드 전략 요약"}`

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size))
  }
  return chunks
}

export async function POST() {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'ANTHROPIC_API_KEY가 설정되지 않았습니다.' }, { status: 500 })
    }

    // Analyze keywords in chunks of 5
    const chunks = chunkArray(CORE_KEYWORDS, 5)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const allAnalyses: any[] = []

    for (const chunk of chunks) {
      try {
        const keywordList = chunk.map((k) => `${k.keyword} (${k.category})`).join('\n')
        const text = await callClaude(
          apiKey,
          CHUNK_SYSTEM,
          `아래 키워드를 각각 분석해주세요:\n${keywordList}`,
          1024,
        )
        const parsed = parseAIResponse(text)
        if (parsed.keyword_analyses) {
          allAnalyses.push(...parsed.keyword_analyses)
        }
      } catch (err) {
        console.error('Keyword chunk analysis failed:', err)
      }
    }

    // Get new keyword suggestions and summary
    let newSuggestions: unknown[] = []
    let priorityActions: string[] = []
    let summary = `${allAnalyses.length}개 키워드 분석 완료`

    try {
      const analyzed = allAnalyses.map((k: { keyword: string }) => k.keyword).join(', ')
      const summaryText = await callClaude(
        apiKey,
        SUMMARY_SYSTEM,
        `분석된 키워드: ${analyzed}\n\n법률사무소 로앤이가 새로 공략할 키워드와 우선 조치사항을 제안해주세요.`,
        1024,
      )
      const summaryParsed = parseAIResponse(summaryText)
      newSuggestions = summaryParsed.new_keyword_suggestions || []
      priorityActions = summaryParsed.priority_actions || []
      summary = summaryParsed.summary || summary
    } catch (err) {
      console.error('Keyword summary generation failed:', err)
    }

    // Clear old and insert fresh keyword tracking
    await supabaseAdmin.from('keyword_tracking').delete().neq('id', 0)

    const keywordRows = [
      ...allAnalyses.map((k: Record<string, string>) => ({
        keyword: k.keyword,
        category: k.category,
        search_volume: k.search_volume,
        difficulty: k.difficulty,
        trend: k.trend,
        checked_at: new Date().toISOString(),
      })),
      ...(newSuggestions as Record<string, string>[]).map((k) => ({
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

    const result = {
      keyword_analyses: allAnalyses,
      new_keyword_suggestions: newSuggestions,
      priority_actions: priorityActions,
      summary,
    }

    await supabaseAdmin.from('seo_analyses').insert({
      analysis_type: 'keyword',
      data: result,
      recommendations: priorityActions,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Keyword analysis error:', error)
    const msg = error instanceof Error ? error.message : '알 수 없는 오류'
    return NextResponse.json({ error: `서버 오류: ${msg}` }, { status: 500 })
  }
}
