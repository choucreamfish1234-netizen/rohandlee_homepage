import { NextRequest, NextResponse } from 'next/server'
import { getRandomThumbnail } from '@/lib/blog'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { parseAIResponse } from '@/lib/parse-ai-response'
import { getAuthorByCategory, buildGeoSystemPrompt } from '@/lib/geo-prompt'

export async function POST(req: NextRequest) {
  try {
    const { topic, category, index } = await req.json()

    if (!topic) {
      return NextResponse.json({ error: '주제를 입력해주세요.' }, { status: 400 })
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'API 키가 설정되지 않았습니다.' }, { status: 500 })
    }

    const cat = category || '일반'
    const author = getAuthorByCategory(cat)

    // Duplicate check: search for posts with similar slugs or exact topic match
    const { data: existingPosts } = await supabaseAdmin
      .from('blog_posts')
      .select('id, title, slug')

    if (existingPosts && existingPosts.length > 0) {
      // Check for title similarity (simple keyword overlap)
      const topicWords = topic.toLowerCase().replace(/[^가-힣a-z0-9\s]/g, '').split(/\s+/).filter((w: string) => w.length > 1)
      for (const existing of existingPosts) {
        const existingWords = existing.title.toLowerCase().replace(/[^가-힣a-z0-9\s]/g, '').split(/\s+/).filter((w: string) => w.length > 1)
        const overlap = topicWords.filter((w: string) => existingWords.includes(w))
        const similarity = topicWords.length > 0 ? overlap.length / topicWords.length : 0
        if (similarity >= 0.8) {
          return NextResponse.json({
            success: true,
            skipped: true,
            reason: '중복 주제',
            existingTitle: existing.title,
            index,
          })
        }
      }
    }

    // Generate blog content via Claude API (GEO-optimized)
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
        system: buildGeoSystemPrompt(author, cat),
        messages: [{
          role: 'user',
          content: `주제: ${topic}\n카테고리: ${cat}\n작성자: ${author}\n\n위 주제에 대한 법률 블로그 글을 홈페이지용(마크다운)과 네이버용(순수 HTML) 두 가지 버전으로 작성해주세요. 반드시 ${author}의 말투로 작성하세요.\n\n[필수] 글 하단에 "## 자주 묻는 질문" 섹션을 반드시 포함하세요. Q: / A: 형식으로 3~5개 작성하세요.`,
        }],
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('Claude API error:', response.status, err)
      return NextResponse.json({
        success: false,
        error: `AI 생성 실패 (HTTP ${response.status}): ${err.substring(0, 100)}`,
        index,
      }, { status: 500 })
    }

    const data = await response.json()
    const text = data.content?.[0]?.text || ''
    const parsed = parseAIResponse(text)

    // Generate slug, handle duplicates
    let slug = parsed.slug || topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    const { data: slugCheck } = await supabaseAdmin
      .from('blog_posts')
      .select('id')
      .eq('slug', slug)
      .maybeSingle()
    if (slugCheck) {
      slug = `${slug}-${Date.now()}`
    }

    // Get unique thumbnail
    const { data: existingThumbs } = await supabaseAdmin
      .from('blog_posts')
      .select('thumbnail_url')
      .eq('category', cat)
    const usedUrls = (existingThumbs || [])
      .map((p: { thumbnail_url: string | null }) => p.thumbnail_url)
      .filter(Boolean) as string[]
    const thumbnailUrl = getRandomThumbnail(cat, usedUrls)

    // Insert into Supabase
    const { data: inserted, error: insertError } = await supabaseAdmin
      .from('blog_posts')
      .insert({
        title: parsed.title || topic,
        slug,
        content: parsed.content || '',
        naver_content: parsed.naverContent || null,
        excerpt: parsed.excerpt || '',
        meta_description: parsed.meta_description || '',
        category: cat,
        tags: parsed.tags || [],
        author,
        status: 'published',
        published_at: new Date().toISOString(),
        thumbnail_url: thumbnailUrl,
        view_count: 0,
        is_featured: false,
        naver_published: !!parsed.naverContent,
      })
      .select('id, title, slug')
      .single()

    if (insertError) {
      return NextResponse.json({
        success: false,
        error: `DB 저장 실패: ${insertError.message}`,
        index,
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      title: inserted.title,
      slug: inserted.slug,
      category: cat,
      author,
      index,
    })
  } catch (error) {
    console.error('Generate single blog error:', error)
    const message = error instanceof Error ? error.message : '알 수 없는 오류'
    return NextResponse.json({
      success: false,
      error: `서버 오류: ${message}`,
    }, { status: 500 })
  }
}
