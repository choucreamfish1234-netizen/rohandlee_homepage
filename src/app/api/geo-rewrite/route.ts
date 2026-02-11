import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { parseAIResponse } from '@/lib/parse-ai-response'
import { getAuthorByCategory, buildGeoRewritePrompt } from '@/lib/geo-prompt'

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
      .select('*')
      .eq('id', postId)
      .single()

    if (fetchError || !post) {
      return NextResponse.json({ error: '글을 찾을 수 없습니다.' }, { status: 404 })
    }

    const author = post.author || getAuthorByCategory(post.category)
    const systemPrompt = buildGeoRewritePrompt(author, post.category)

    const userPrompt = `아래 기존 블로그 글을 GEO 관점에서 리라이트해주세요.

[기존 글 제목]: ${post.title}
[카테고리]: ${post.category}
[작성자]: ${author}

[기존 홈페이지용 본문 (마크다운)]:
${post.content}

[기존 네이버용 본문 (HTML)]:
${post.naver_content || '(없음 - 새로 생성해주세요)'}

위 글을 GEO 규칙에 맞게 리라이트해주세요. 법조문, Entity Linking, Q&A 섹션을 추가/보강하세요.`

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
      return NextResponse.json({
        error: `AI 리라이트 실패 (HTTP ${response.status})`,
      }, { status: 500 })
    }

    const data = await response.json()
    const text = data.content?.[0]?.text || ''
    const parsed = parseAIResponse(text)

    // Update the post with rewritten content
    const updateData: Record<string, unknown> = {
      content: parsed.content || post.content,
      updated_at: new Date().toISOString(),
    }
    if (parsed.naverContent) {
      updateData.naver_content = parsed.naverContent
    }
    if (parsed.meta_description) {
      updateData.meta_description = parsed.meta_description
    }

    const { error: updateError } = await supabaseAdmin
      .from('blog_posts')
      .update(updateData)
      .eq('id', postId)

    if (updateError) {
      return NextResponse.json({
        error: `DB 업데이트 실패: ${updateError.message}`,
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      title: post.title,
      postId,
    })
  } catch (error) {
    console.error('GEO rewrite error:', error)
    const message = error instanceof Error ? error.message : '알 수 없는 오류'
    return NextResponse.json({ error: `서버 오류: ${message}` }, { status: 500 })
  }
}
