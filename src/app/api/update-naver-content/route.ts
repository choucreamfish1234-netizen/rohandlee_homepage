import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { parseAIResponse } from '@/lib/parse-ai-response'

function getAuthorByCategory(category: string): string {
  switch (category) {
    case '재산범죄':
    case '회생파산':
      return '노채은 변호사'
    case '성범죄':
    case '일반':
    default:
      return '이유림 변호사'
  }
}

function buildNaverPrompt(author: string): string {
  return `당신은 법률사무소 로앤이의 블로그 글을 네이버 블로그용 HTML로 변환하는 AI입니다.

[작성자: ${author}]

[네이버 블로그용 규칙]
- 순수 HTML 형식으로 작성 (네이버 에디터에 HTML로 붙여넣기용)
- 마크다운 문법(**굵은**, *기울임*, ## 제목 등)을 절대 사용하지 마세요.
- 소제목은 <h3> 태그, 굵은 글씨는 <b> 태그, 기울임은 <em> 태그를 사용하세요.
- 문단 사이 <br><br>로 여백 충분히
- 핵심 내용은 <blockquote> 태그로 강조
- 원본의 말투/톤을 그대로 유지
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

반드시 유효한 JSON만 응답하세요. 마크다운 코드블록(\`\`\`)을 사용하지 마세요.
아래 JSON 형식으로 응답하세요:
{
  "naverContent": "네이버 블로그용 본문 (순수 HTML)"
}`
}

export async function POST(req: NextRequest) {
  try {
    let postId: number | undefined
    try {
      const body = await req.json()
      postId = body.postId
    } catch {
      // Empty body or invalid JSON — treat as bulk mode
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'API 키가 설정되지 않았습니다.' }, { status: 500 })
    }

    // If postId is provided, update single post. Otherwise, update all posts without naver_content.
    let postsToUpdate: { id: number; title: string; content: string; category: string }[]

    if (postId) {
      const { data, error } = await supabaseAdmin
        .from('blog_posts')
        .select('id, title, content, category')
        .eq('id', postId)
        .single()
      if (error || !data) {
        return NextResponse.json({ error: '해당 글을 찾을 수 없습니다.' }, { status: 404 })
      }
      postsToUpdate = [data]
    } else {
      // Fetch all published posts, then filter in JS for missing naver_content
      // (avoids PostgREST filter issues with .or('...eq.') for empty strings)
      const { data, error } = await supabaseAdmin
        .from('blog_posts')
        .select('id, title, content, category, naver_content')
        .eq('status', 'published')
        .order('created_at', { ascending: true })
      if (error) {
        return NextResponse.json({ error: `DB 조회 실패: ${error.message}` }, { status: 500 })
      }
      postsToUpdate = (data || [])
        .filter((post: { naver_content?: string | null }) => !post.naver_content || post.naver_content.trim() === '')
        .map(({ id, title, content, category }: { id: number; title: string; content: string; category: string; naver_content?: string | null }) => ({ id, title, content, category }))
    }

    if (postsToUpdate.length === 0) {
      return NextResponse.json({ message: '업데이트할 글이 없습니다.', updated: 0 })
    }

    const results: { id: number; title: string; success: boolean; error?: string }[] = []

    for (const post of postsToUpdate) {
      const author = getAuthorByCategory(post.category)

      try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: 'claude-sonnet-4-5-20250929',
            max_tokens: 4096,
            system: buildNaverPrompt(author),
            messages: [{
              role: 'user',
              content: `아래 블로그 글을 네이버 블로그용 순수 HTML로 변환해주세요.\n\n제목: ${post.title}\n\n본문:\n${post.content}`,
            }],
          }),
        })

        if (!response.ok) {
          results.push({ id: post.id, title: post.title, success: false, error: `API HTTP ${response.status}` })
          continue
        }

        const data = await response.json()
        const text = data.content?.[0]?.text || ''

        let naverContent = ''
        try {
          const parsed = parseAIResponse(text)
          naverContent = parsed.naverContent || ''
        } catch {
          // If JSON parsing fails, the AI may have returned raw HTML directly
          // Use the raw text as naverContent if it looks like HTML
          if (text.includes('<') && text.includes('>')) {
            naverContent = text
          }
        }

        if (!naverContent) {
          results.push({ id: post.id, title: post.title, success: false, error: '네이버 콘텐츠 생성 실패 (파싱 오류)' })
          continue
        }

        const { error: updateError } = await supabaseAdmin
          .from('blog_posts')
          .update({ naver_content: naverContent, naver_published: true })
          .eq('id', post.id)

        if (updateError) {
          results.push({ id: post.id, title: post.title, success: false, error: updateError.message })
        } else {
          results.push({ id: post.id, title: post.title, success: true })
        }
      } catch (err) {
        results.push({ id: post.id, title: post.title, success: false, error: err instanceof Error ? err.message : '알 수 없는 오류' })
      }

      // Rate limit: wait 2 seconds between requests
      if (postsToUpdate.indexOf(post) < postsToUpdate.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 2000))
      }
    }

    const successCount = results.filter((r) => r.success).length
    const failCount = results.filter((r) => !r.success).length

    return NextResponse.json({
      message: `${successCount}개 성공, ${failCount}개 실패 (총 ${results.length}개)`,
      updated: successCount,
      failed: failCount,
      total: results.length,
      results,
    })
  } catch (error) {
    console.error('Update naver content error:', error)
    const message = error instanceof Error ? error.message : '알 수 없는 오류'
    return NextResponse.json({ error: `서버 오류: ${message}` }, { status: 500 })
  }
}
