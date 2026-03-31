import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { getAuthorByCategory } from '@/lib/geo-prompt'

export const maxDuration = 60

export async function POST(req: NextRequest) {
  try {
    const { postId } = await req.json()

    if (!postId) {
      return NextResponse.json({ error: 'postId가 필요합니다.' }, { status: 400 })
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'API 키가 설정되지 않았습니다.' }, { status: 500 })
    }

    // 기존 글 조회
    const { data: post, error: fetchError } = await supabaseAdmin
      .from('blog_posts')
      .select('id, title, content, category, tags, meta_description, author')
      .eq('id', postId)
      .single()

    if (fetchError || !post) {
      return NextResponse.json({ error: '글을 찾을 수 없습니다.' }, { status: 404 })
    }

    const author = post.author || getAuthorByCategory(post.category)

    const systemPrompt = `당신은 법률사무소 로앤이의 SEO 전문 에디터입니다.
기존 블로그 글을 아래 규칙에 맞게 수정해주세요.
원본의 핵심 내용과 법률 정보는 유지하되, SEO에 최적화된 형태로 리라이트합니다.

수정 규칙:

제목:
- 사람들이 실제로 검색하는 롱테일 키워드를 제목에 포함
- 40자 이내
- 예: "성범죄 피해를 당했을 때" → "성범죄 피해 신고 방법과 증거 수집 총정리"

본문 구조:
- 도입부: 피해자 공감 2~3문장 ("~해요"체, 따뜻한 톤)
- H2 소제목 3~5개로 구조화 (각 소제목에 검색 키워드 포함)
- 관련 법조문 반드시 인용 (조문 번호 명시). 없으면 추가
- FAQ 섹션 3개 이상 (Q&A 형식). 없으면 추가
- 마무리: 로앤이 상담 안내 + "무료 상담 032-207-8788"
- 총 1500자 이상. 짧으면 내용 보강

톤:
- "~해요"체 통일
- 피해자에게는 따뜻하고 든든하게
- 법률 내용은 정확하고 전문적으로
- ${author} 이름 자연스럽게 포함

메타 정보도 함께 생성:
- description: 80자 이내 요약 (검색 결과 표시용)
- tags: 관련 키워드 5~8개 배열

로펌 정보:
- 법률사무소 로앤이, 슬로건 "오직 피해자만 변호합니다"
- 이유림 대표변호사: 성범죄/IT/디지털성범죄 전문
- 노채은 대표변호사: 재산범죄/사기/횡령 전문
- 전화: 032-207-8788

반드시 유효한 JSON만 응답하세요. 마크다운 코드블록(\`\`\`)을 사용하지 마세요. JSON 외에 다른 텍스트를 포함하지 마세요.`

    const userPrompt = `아래 블로그 글을 SEO 최적화 규칙에 맞게 리라이트해주세요.
기존 법률 정보의 정확성은 유지하면서, 구조와 키워드를 개선해주세요.

카테고리: ${post.category}
기존 제목: ${post.title}
기존 본문:
${post.content}

JSON으로 응답해주세요:
{
  "title": "수정된 제목",
  "content": "수정된 본문 (마크다운)",
  "description": "80자 이내 요약",
  "tags": ["태그1", "태그2"]
}`

    console.log('optimize-blog-seo: calling Claude for post', postId, post.title)

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('optimize-blog-seo: Claude API error', response.status, err.substring(0, 200))
      return NextResponse.json({
        success: false,
        error: `AI 생성 실패 (HTTP ${response.status})`,
      }, { status: 500 })
    }

    const data = await response.json()
    const rawText = data.content?.[0]?.text || ''

    if (!rawText || rawText.length < 50) {
      return NextResponse.json({
        success: false,
        error: 'AI 응답이 비어있습니다.',
      }, { status: 500 })
    }

    // Parse JSON response
    let parsed: { title: string; content: string; description: string; tags: string[] }
    try {
      // Strip markdown code block wrappers if present
      const cleaned = rawText.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?```\s*$/, '').trim()
      parsed = JSON.parse(cleaned)
    } catch {
      console.error('optimize-blog-seo: JSON parse error', rawText.substring(0, 200))
      return NextResponse.json({
        success: false,
        error: 'AI 응답 파싱 실패',
      }, { status: 500 })
    }

    if (!parsed.title || !parsed.content) {
      return NextResponse.json({
        success: false,
        error: 'AI 응답에 필수 필드가 없습니다.',
      }, { status: 500 })
    }

    // Return optimized data WITHOUT saving (preview mode)
    return NextResponse.json({
      success: true,
      postId: post.id,
      original: {
        title: post.title,
        content: post.content,
        description: post.meta_description,
        tags: post.tags,
      },
      optimized: {
        title: parsed.title,
        content: parsed.content,
        description: parsed.description || post.meta_description,
        tags: parsed.tags || post.tags,
      },
    })
  } catch (error) {
    console.error('optimize-blog-seo: error', error)
    const message = error instanceof Error ? error.message : '알 수 없는 오류'
    return NextResponse.json({
      success: false,
      error: `서버 오류: ${message}`,
    }, { status: 500 })
  }
}

// Apply optimized content to a post
export async function PUT(req: NextRequest) {
  try {
    const { postId, title, content, description, tags } = await req.json()

    if (!postId) {
      return NextResponse.json({ error: 'postId가 필요합니다.' }, { status: 400 })
    }

    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    }
    if (title) updateData.title = title
    if (content) updateData.content = content
    if (description) updateData.meta_description = description
    if (tags) updateData.tags = tags

    // Extract new excerpt
    if (content) {
      updateData.excerpt = content
        .split('\n')
        .filter((line: string) => line.trim() && !line.startsWith('#') && !line.startsWith('>') && !line.startsWith('작성:'))
        .slice(0, 2)
        .join(' ')
        .replace(/\*+/g, '')
        .substring(0, 200)
    }

    const { error: updateError } = await supabaseAdmin
      .from('blog_posts')
      .update(updateData)
      .eq('id', postId)

    if (updateError) {
      return NextResponse.json({
        success: false,
        error: `DB 업데이트 실패: ${updateError.message}`,
      }, { status: 500 })
    }

    return NextResponse.json({ success: true, postId })
  } catch (error) {
    const message = error instanceof Error ? error.message : '알 수 없는 오류'
    return NextResponse.json({
      success: false,
      error: `서버 오류: ${message}`,
    }, { status: 500 })
  }
}
