import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { getAuthorByCategory } from '@/lib/geo-prompt'

export async function POST(req: NextRequest) {
  try {
    const { postId } = await req.json()

    if (!postId) {
      return NextResponse.json({ error: '글 ID가 필요합니다.' }, { status: 400 })
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'API 키가 설정되지 않았습니다.' }, { status: 500 })
    }

    // Fetch existing post
    const { data: post, error: fetchError } = await supabaseAdmin
      .from('blog_posts')
      .select('id, title, content, category, author')
      .eq('id', postId)
      .single()

    if (fetchError || !post) {
      console.error('GEO rewrite: post fetch error', fetchError?.message, 'postId:', postId)
      return NextResponse.json({ error: '글을 찾을 수 없습니다.' }, { status: 404 })
    }

    const author = post.author || getAuthorByCategory(post.category)
    const authorName = author.replace(' 변호사', '')

    const systemPrompt = `당신은 법률사무소 로앤이의 ${author}입니다.
아래 블로그 글을 GEO(Generative Engine Optimization) 최적화해서 리라이트하세요.

[필수 추가 요소]
1. 관련 법조문 최소 3개 인용 (형법, 성폭력처벌법 등 조문 번호 명시)
2. "${authorName} 변호사"를 전문성과 묶어서 최소 3회 언급
3. 글 하단에 "## 자주 묻는 질문" Q&A 3~5개 추가 (**Q: 질문** / **A:** 답변 형식)
4. 글 상단에 "작성: ${author} (법률사무소 로앤이)" 추가
5. 글 하단에 "본 글은 법률사무소 로앤이 ${author}가 직접 작성·감수한 법률 정보입니다." 추가
6. 기존 말투와 톤 유지
7. 마크다운 형식으로만 응답. JSON이나 코드블록으로 감싸지 마세요. 글 내용만 응답하세요.`

    console.log('GEO rewrite: calling Claude API for post', postId, post.title)

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
        system: systemPrompt,
        messages: [{
          role: 'user',
          content: `다음 블로그 글을 GEO 최적화해서 리라이트해주세요:\n\n제목: ${post.title}\n카테고리: ${post.category}\n\n${post.content}`,
        }],
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('GEO rewrite: Claude API error', response.status, err.substring(0, 300))
      return NextResponse.json({
        error: `AI API 오류 (HTTP ${response.status}): ${err.substring(0, 100)}`,
      }, { status: 500 })
    }

    const data = await response.json()
    const rewrittenContent = data.content?.[0]?.text || ''

    if (!rewrittenContent || rewrittenContent.length < 100) {
      console.error('GEO rewrite: empty or too short response', rewrittenContent.substring(0, 200))
      return NextResponse.json({
        error: 'AI 응답이 비어있거나 너무 짧습니다.',
      }, { status: 500 })
    }

    console.log('GEO rewrite: got response, length:', rewrittenContent.length, 'for post', postId)

    // Update content directly (no JSON parsing needed)
    const { error: updateError } = await supabaseAdmin
      .from('blog_posts')
      .update({
        content: rewrittenContent,
        updated_at: new Date().toISOString(),
      })
      .eq('id', postId)

    if (updateError) {
      console.error('GEO rewrite: DB update error', updateError.message)
      return NextResponse.json({
        error: `DB 업데이트 실패: ${updateError.message}`,
      }, { status: 500 })
    }

    console.log('GEO rewrite: success for post', postId, post.title)

    return NextResponse.json({
      success: true,
      title: post.title,
      postId,
    })
  } catch (error) {
    console.error('GEO rewrite: unexpected error', error)
    const message = error instanceof Error ? error.message : '알 수 없는 오류'
    return NextResponse.json({ error: `서버 오류: ${message}` }, { status: 500 })
  }
}
