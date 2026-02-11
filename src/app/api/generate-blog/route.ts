import { NextRequest, NextResponse } from 'next/server'
import { getRandomThumbnail } from '@/lib/blog'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { parseAIResponse } from '@/lib/parse-ai-response'
import { getAuthorByCategory, buildGeoSystemPrompt } from '@/lib/geo-prompt'

export async function POST(req: NextRequest) {
  try {
    const { topic, category } = await req.json()

    if (!topic) {
      return NextResponse.json({ error: '주제를 입력해주세요.' }, { status: 400 })
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'API 키가 설정되지 않았습니다.' }, { status: 500 })
    }

    const cat = category || '일반'
    const author = getAuthorByCategory(cat)
    const systemPrompt = buildGeoSystemPrompt(author, cat)

    const userPrompt = `주제: ${topic}\n카테고리: ${cat}\n작성자: ${author}\n\n위 주제에 대한 법률 블로그 글을 홈페이지용(마크다운)과 네이버용(순수 HTML) 두 가지 버전으로 작성해주세요. 반드시 ${author}의 말투로 작성하세요.\n\n[필수] 글 하단에 "## 자주 묻는 질문" 섹션을 반드시 포함하세요. Q: / A: 형식으로 3~5개 작성하세요.`

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 8192,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('Claude API error:', response.status, err)
      if (response.status === 401) {
        return NextResponse.json({ error: 'API 키가 유효하지 않습니다. 환경변수를 확인해주세요.' }, { status: 401 })
      }
      if (response.status === 400) {
        return NextResponse.json({ error: `API 요청 오류: ${err}` }, { status: 400 })
      }
      return NextResponse.json({ error: `AI 생성 실패 (HTTP ${response.status}): ${err.substring(0, 200)}` }, { status: 500 })
    }

    const data = await response.json()
    const text = data.content?.[0]?.text || ''

    const parsed = parseAIResponse(text)
    // Fetch existing thumbnails for this category to avoid duplicates
    const { data: existing } = await supabaseAdmin
      .from('blog_posts')
      .select('thumbnail_url')
      .eq('category', cat)
    const usedUrls = (existing || []).map((p: { thumbnail_url: string | null }) => p.thumbnail_url).filter(Boolean) as string[]
    parsed.thumbnail_url = getRandomThumbnail(cat, usedUrls)
    parsed.author = author
    return NextResponse.json(parsed)
  } catch (error) {
    console.error('Generate blog error:', error)
    const message = error instanceof Error ? error.message : '알 수 없는 오류'
    return NextResponse.json({ error: `서버 오류: ${message}` }, { status: 500 })
  }
}
