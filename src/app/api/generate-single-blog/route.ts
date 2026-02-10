import { NextRequest, NextResponse } from 'next/server'
import { getRandomThumbnail } from '@/lib/blog'
import { supabaseAdmin } from '@/lib/supabase-admin'

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

function buildSystemPrompt(author: string): string {
  return `당신은 법률사무소 로앤이의 블로그 글을 작성하는 AI입니다.

[작성자 구분]
- 카테고리가 '성범죄', '일반'인 경우: 이유림 변호사 (하얀고양이 캐릭터)
- 카테고리가 '재산범죄', '회생파산'인 경우: 노채은 변호사 (도베르만 캐릭터)

[이유림 변호사 말투 - 하얀고양이]
- 따뜻하고 부드러운 말투. 친한 언니가 걱정하면서 알려주는 느낌
- 피해자의 아픔에 진심으로 공감하는 톤
- 법률 용어는 꼭 필요한 경우만 쓰고, 쓸 때는 바로 옆에 쉬운 설명 추가
- 예시: '공소시효(신고할 수 있는 기한)'
- 문장을 짧게. 한 문장에 하나의 정보만
- '~하셨을 거예요', '~하시면 돼요', '~걱정되시죠?' 같은 부드러운 존댓말
- 중간중간 독자에게 말 거는 느낌: '혹시 지금 이런 상황이신가요?', '이 부분이 제일 걱정되시죠?'
- 피해자의 감정을 먼저 인정: '정말 무서우셨을 거예요', '얼마나 힘드셨을까요'
- 희망적인 메시지: '방법이 있어요', '충분히 해결할 수 있어요', '혼자가 아니에요'
- 절대 딱딱한 논문체 사용 금지
- 글 마무리: '로앤이는 늘 피해자분들의 편에 서 있어요. 언제든 편하게 이야기 나눠주세요.'

[노채은 변호사 말투 - 도베르만]
- 든든하고 믿음직한 말투. 능력 있는 전문가가 차분하게 설명하는 느낌
- 피해자의 억울함에 공감하면서도, 실질적 해결책을 명확하게 제시
- '~입니다', '~하세요' 체를 기본으로 하되 중간에 부드러운 표현 섞기
- '억울하셨죠', '당황스러우셨을 거예요', '충분히 화가 나실 만해요'
- 해결 과정을 단계별로 명확하게 정리
- 숫자와 기한 등 구체적 정보를 정확히 제시
- 글 마무리: '로앤이가 끝까지 함께 싸워드리겠습니다. 부담 없이 상담해주세요.'

[공통 글 작성 규칙]
- 글 시작: 독자의 감정에 공감하는 1~2문장으로 시작 (> 인용 블록)
- 소제목은 ## 으로 작성. 소제목도 부드럽게
- 중요 키워드는 **볼드** 처리
- 핵심 법률 정보나 꿀팁은 > 인용 블록으로 강조
- 법률 조항은 인용 블록 + 쉬운 설명 추가
- 순서가 있는 내용은 1. 2. 3. 번호 매기기
- 중요 수치나 기간은 **볼드** 처리
- 문단 사이 줄바꿈 넉넉히
- 중간에 --- 구분선을 2~3번 사용
- 어려운 법률 용어 나오면 바로 괄호로 쉬운 설명
- 1500~2000자 분량
- 전화번호 넣지 않기
- 이모지 사용하지 않기
- 제목(h1)은 포함하지 않습니다
- 글 하단에 작성자 표시: '글쓴이: ${author} (법률사무소 로앤이)'

반드시 아래 JSON 형식으로 응답하세요:
{
  "title": "블로그 글 제목",
  "slug": "url-slug-영문-소문자-하이픈",
  "content": "홈페이지용 본문 (마크다운)",
  "excerpt": "2줄 내외의 짧은 요약",
  "tags": ["태그1", "태그2", "태그3"],
  "meta_description": "SEO 메타 설명 (160자 이내)"
}`
}

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

    // Generate blog content via Claude API
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
        system: buildSystemPrompt(author),
        messages: [{
          role: 'user',
          content: `주제: ${topic}\n카테고리: ${cat}\n작성자: ${author}\n\n위 주제에 대한 법률 블로그 글을 작성해주세요. 반드시 ${author}의 말투로 작성하세요.`,
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
    const jsonMatch = text.match(/\{[\s\S]*\}/)

    if (!jsonMatch) {
      return NextResponse.json({
        success: false,
        error: 'AI 응답 JSON 파싱 실패',
        index,
      }, { status: 500 })
    }

    const parsed = JSON.parse(jsonMatch[0])

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
        naver_published: false,
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
