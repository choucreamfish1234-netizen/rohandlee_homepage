import { NextRequest, NextResponse } from 'next/server'
import { getRandomThumbnail } from '@/lib/blog'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { getAuthorByCategory } from '@/lib/geo-prompt'

export const maxDuration = 60

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
    const authorName = author.replace(' 변호사', '')

    // Claude API: request markdown content ONLY (no JSON)
    const systemPrompt = `당신은 법률사무소 로앤이의 ${author}입니다.
주어진 주제로 블로그 글 본문을 마크다운으로 작성하세요.

[작성 규칙]
- 관련 법조문 최소 2개 인용 (조문 번호 명시)
- "${authorName} 변호사"를 전문성과 묶어서 최소 3회 언급
- 하단에 "## 자주 묻는 질문" Q&A 3개 추가 (**Q: 질문** / **A:** 답변 형식)
- 글 상단에 "작성: ${author} (법률사무소 로앤이)" 추가
- 하단에 "본 글은 법률사무소 로앤이 ${author}가 직접 작성·감수한 법률 정보입니다." 추가
- 따뜻하고 부드러운 말투 (~하셨을 거예요, ~하시면 돼요)
- 피해자 감정 공감으로 시작
- 소제목은 ## 사용
- 중요 키워드 **볼드** 처리
- 1500~2500자 분량
- 마크다운 본문만 응답. JSON 금지. 코드블록으로 감싸지 마세요. 글 본문 텍스트만 응답하세요.`

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 3000,
        system: systemPrompt,
        messages: [{ role: 'user', content: `주제: ${topic}\n카테고리: ${cat}\n\n위 주제로 블로그 글 본문을 작성해주세요.` }],
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('generate-blog: Claude API error', response.status, err.substring(0, 200))
      return NextResponse.json({ error: `AI 생성 실패 (HTTP ${response.status})` }, { status: 500 })
    }

    const data = await response.json()
    const content = data.content?.[0]?.text || ''

    if (!content || content.length < 100) {
      return NextResponse.json({ error: 'AI 응답이 비어있습니다.' }, { status: 500 })
    }

    // Generate slug from topic
    const slug = topic
      .replace(/[^\w\sㄱ-ㅎ가-힣]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .toLowerCase()
      .substring(0, 60)

    // Extract excerpt
    const excerpt = content
      .split('\n')
      .filter((line: string) => line.trim() && !line.startsWith('#') && !line.startsWith('>') && !line.startsWith('작성:'))
      .slice(0, 2)
      .join(' ')
      .replace(/\*+/g, '')
      .substring(0, 200)

    // Get thumbnail
    const { data: existing } = await supabaseAdmin
      .from('blog_posts')
      .select('thumbnail_url')
      .eq('category', cat)
    const usedUrls = (existing || []).map((p: { thumbnail_url: string | null }) => p.thumbnail_url).filter(Boolean) as string[]
    const thumbnailUrl = getRandomThumbnail(cat, usedUrls)

    // Return data for the editor to use (no JSON parsing from AI needed)
    return NextResponse.json({
      title: topic,
      slug,
      content,
      excerpt,
      tags: [cat, author.replace(' 변호사', ''), '법률사무소 로앤이'],
      meta_description: `${topic}에 대한 법률 정보. 법률사무소 로앤이 ${author} 감수.`,
      thumbnail_url: thumbnailUrl,
      author,
    })
  } catch (error) {
    console.error('generate-blog: error', error)
    const message = error instanceof Error ? error.message : '알 수 없는 오류'
    return NextResponse.json({ error: `서버 오류: ${message}` }, { status: 500 })
  }
}
