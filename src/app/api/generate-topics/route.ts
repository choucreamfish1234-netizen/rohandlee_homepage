import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export const maxDuration = 30

export async function POST() {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json({ success: false, error: 'API 키가 설정되지 않았습니다.' }, { status: 500 })
    }

    // 1. DB에서 기존 글 title 목록 조회
    const { data: existing, error: dbError } = await supabaseAdmin
      .from('blog_posts')
      .select('title')
      .eq('status', 'published')

    if (dbError) {
      return NextResponse.json({ success: false, error: `DB 조회 실패: ${dbError.message}` }, { status: 500 })
    }

    const existingTitles = (existing || []).map((p: { title: string }) => p.title)

    // 2. Claude에게 새 주제 30개 요청
    const topicResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 2000,
        system: `법률사무소 로앤이의 블로그 주제를 생성하세요.

카테고리별 배분:
- 성범죄 10개 (작성자: 이유림 변호사)
- 재산범죄 10개 (작성자: 노채은 변호사)
- 회생파산 5개 (작성자: 노채은 변호사)
- 일반 5개 (작성자: 이유림 변호사)

규칙:
- 피해자 관점의 실용적인 주제
- 검색에 잘 걸리는 구체적인 제목
- 아래 기존 제목과 절대 중복 금지

반드시 아래 JSON 형식으로만 응답:
[{"title":"제목","category":"카테고리","author":"작성자"}]
JSON만 응답. 다른 텍스트 금지.`,
        messages: [{
          role: 'user',
          content: `기존 블로그 제목 목록 (중복 금지):\n${existingTitles.join('\n')}\n\n위 제목과 겹치지 않는 새로운 주제 30개를 JSON 배열로 생성해주세요.`,
        }],
      }),
    })

    if (!topicResponse.ok) {
      const err = await topicResponse.text()
      console.error('generate-topics: Claude API error', topicResponse.status, err.substring(0, 200))
      return NextResponse.json({
        success: false,
        error: `AI 주제 생성 실패 (HTTP ${topicResponse.status})`,
      }, { status: 500 })
    }

    const topicData = await topicResponse.json()
    let topicsText = topicData.content?.[0]?.text || ''

    // JSON 추출
    topicsText = topicsText.replace(/```json|```/g, '').trim()

    let topics: { title: string; category: string; author: string }[]
    try {
      topics = JSON.parse(topicsText)
    } catch {
      // 줄 단위 파싱 시도
      const lines = topicsText.split('\n').filter((l: string) => l.includes('"title"'))
      topics = lines.map((line: string) => {
        const match = line.match(/"title"\s*:\s*"([^"]+)"/)
        const catMatch = line.match(/"category"\s*:\s*"([^"]+)"/)
        const authMatch = line.match(/"author"\s*:\s*"([^"]+)"/)
        return match ? {
          title: match[1],
          category: catMatch?.[1] || '일반',
          author: authMatch?.[1] || '이유림 변호사',
        } : null
      }).filter(Boolean) as { title: string; category: string; author: string }[]
    }

    if (topics.length === 0) {
      return NextResponse.json({ success: false, error: '주제 생성 실패: AI 응답을 파싱할 수 없습니다.' })
    }

    return NextResponse.json({
      success: true,
      topics,
      existingCount: existingTitles.length,
    })
  } catch (error) {
    console.error('generate-topics: error', error)
    const message = error instanceof Error ? error.message : '알 수 없는 오류'
    return NextResponse.json({
      success: false,
      error: `서버 오류: ${message}`,
    }, { status: 500 })
  }
}
