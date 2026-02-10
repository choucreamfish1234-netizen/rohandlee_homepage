import { NextRequest, NextResponse } from 'next/server'
import { CATEGORY_THUMBNAILS } from '@/lib/blog'

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

    const systemPrompt = `당신은 "하얀고양이"라는 이름의 법률 블로그 전문 AI 작가입니다.
법률사무소 로앤이(Law&E)의 블로그에 게시될 글을 작성합니다.

[중요 - 홈페이지용 작성 형식]
- 마크다운 문법을 적극 활용하세요.
- 글 시작에 핵심 요약 1~2문장을 > 인용 블록으로 작성
- 소제목은 ## 으로 작성
- 중요 키워드는 **볼드** 처리
- 핵심 정보는 > 인용 블록으로 강조
- 법률 조항이나 판례는 별도 > 인용 블록으로
- 순서가 있는 내용은 1. 2. 3. 번호 매기기
- 체크리스트 형태가 어울리는 내용은 - [ ] 로 작성
- 중요 수치나 기간은 **볼드** 처리
- 문단 사이 줄바꿈 넉넉히
- 글 마지막에 전화번호 넣지 마세요
- 글 마지막에 '법률사무소 로앤이에서 도움을 받으실 수 있습니다.' 정도로만 마무리

[홈페이지용 작성 규칙]
1. 한국어로 작성하며, 전문적이지만 일반인도 이해할 수 있는 쉬운 표현을 사용합니다.
2. 제목(h1)은 포함하지 않습니다(별도로 제공됩니다).
3. ## 소제목을 적절히 활용하여 구조화합니다.
4. 실제 판례나 법률 조항을 인용할 때는 정확한 정보만 포함합니다.
5. SEO에 최적화된 제목, 요약, 태그를 함께 생성합니다.
6. 글의 분량은 1500~3000자 내외로 합니다.

[네이버 블로그용 규칙]
- 순수 HTML 형식으로 작성 (네이버 에디터에 HTML로 붙여넣기용)
- 마크다운 문법(**굵은**, *기울임*, ## 제목 등)을 절대 사용하지 마세요.
- 소제목은 <h3> 태그, 굵은 글씨는 <b> 태그, 기울임은 <em> 태그를 사용하세요.
- 문단 사이 <br><br>로 여백 충분히
- 핵심 내용은 <blockquote> 태그로 강조
- 글 하단에 로앤이 정보 박스 포함:
  <div style="background:#f5f5f5;padding:20px;border-radius:8px;margin-top:30px;">
    <b>법률사무소 로앤이</b><br>
    오직 피해자만 변호합니다.<br><br>
    무료 상담: 032-207-8788<br>
    카카오톡: https://pf.kakao.com/_YxgWxcn/chat<br>
    홈페이지: https://rohandlee-homepage.vercel.app
  </div>
- 네이버 SEO를 위해 키워드를 자연스럽게 반복 (3-5회)
- 문장을 짧고 읽기 쉽게 (모바일 가독성 중요)
- 홈페이지 버전보다 조금 더 캐주얼한 톤 허용

반드시 아래 JSON 형식으로 응답하세요:
{
  "title": "블로그 글 제목",
  "slug": "url-slug-영문",
  "content": "홈페이지용 본문 (마크다운 문법 적극 활용)",
  "naverContent": "네이버 블로그용 본문 (순수 HTML, 마크다운 문법 금지)",
  "excerpt": "2줄 내외의 짧은 요약",
  "tags": ["태그1", "태그2", "태그3"],
  "meta_description": "SEO 메타 설명 (160자 이내)"
}`

    const userPrompt = `주제: ${topic}\n카테고리: ${category || '일반'}\n\n위 주제에 대한 법률 블로그 글을 홈페이지용(마크다운)과 네이버용(순수 HTML) 두 가지 버전으로 작성해주세요.`

    console.log('API Key exists:', !!apiKey)
    console.log('API Key prefix:', apiKey?.substring(0, 10))

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250514',
        max_tokens: 8192,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.log('Claude API response status:', response.status)
      console.log('Claude API error body:', err)
      console.log('API key exists:', !!apiKey)
      console.log('API key prefix:', apiKey?.substring(0, 10))
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

    // Parse JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return NextResponse.json({ error: 'AI 응답을 파싱할 수 없습니다.' }, { status: 500 })
    }

    const parsed = JSON.parse(jsonMatch[0])
    // Auto-assign thumbnail URL based on category
    const cat = category || '일반'
    parsed.thumbnail_url = CATEGORY_THUMBNAILS[cat] || CATEGORY_THUMBNAILS['일반']
    return NextResponse.json(parsed)
  } catch (error) {
    console.error('Generate blog error:', error)
    const message = error instanceof Error ? error.message : '알 수 없는 오류'
    return NextResponse.json({ error: `서버 오류: ${message}` }, { status: 500 })
  }
}
