import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

function markdownToHtml(md: string): string {
  let html = md
  // ### 소제목 → <h3>
  html = html.replace(/^### (.+)$/gm, '<h3 style="font-size:18px;font-weight:bold;margin:20px 0 10px;">$1</h3>')
  // ## 제목 → <h2>
  html = html.replace(/^## (.+)$/gm, '<h2 style="font-size:20px;font-weight:bold;margin:24px 0 12px;">$1</h2>')
  // # 제목 → <h1>
  html = html.replace(/^# (.+)$/gm, '<h1 style="font-size:24px;font-weight:bold;margin:28px 0 14px;">$1</h1>')
  // **볼드** → <strong>
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  // *이탤릭* → <em>
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')
  // > 인용 → <blockquote>
  html = html.replace(/^> (.+)$/gm, '<blockquote style="border-left:3px solid #1B3B2F;padding-left:12px;color:#555;margin:12px 0;">$1</blockquote>')
  // - 리스트 → <li>
  html = html.replace(/^- (.+)$/gm, '<li style="margin:4px 0;">$1</li>')
  // 빈줄 → <br><br>
  html = html.replace(/\n\n/g, '<br><br>')
  // 줄바꿈 → <br>
  html = html.replace(/\n/g, '<br>')
  return html
}

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

export async function POST(req: NextRequest) {
  try {
    const { postId } = await req.json()

    if (!postId) {
      return NextResponse.json({ error: 'postId가 필요합니다.' }, { status: 400 })
    }

    // Fetch the post
    const { data: post, error: fetchError } = await supabaseAdmin
      .from('blog_posts')
      .select('id, title, content, category')
      .eq('id', postId)
      .single()

    if (fetchError || !post) {
      return NextResponse.json({ error: '해당 글을 찾을 수 없습니다.' }, { status: 404 })
    }

    // Convert markdown to HTML
    const author = getAuthorByCategory(post.category)
    const naverContent = markdownToHtml(post.content)

    // Add footer info box
    const footer = `<div style="background:#f5f5f5;padding:20px;border-radius:8px;margin-top:30px;">
<b>법률사무소 로앤이</b> | ${author}<br>
오직 피해자만 변호합니다.<br><br>
무료 상담: 032-207-8788<br>
카카오톡: <a href="https://pf.kakao.com/_YxgWxcn/chat">카카오톡 상담</a><br>
홈페이지: <a href="https://lawfirmrohandlee.com">lawfirmrohandlee.com</a>
</div>`

    const fullContent = naverContent + footer

    // Update the post
    const { error: updateError } = await supabaseAdmin
      .from('blog_posts')
      .update({ naver_content: fullContent, naver_published: true })
      .eq('id', postId)

    if (updateError) {
      return NextResponse.json({
        error: `DB 업데이트 실패: ${updateError.message}`,
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      id: post.id,
      title: post.title,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : '알 수 없는 오류'
    return NextResponse.json({ error: `서버 오류: ${message}` }, { status: 500 })
  }
}
