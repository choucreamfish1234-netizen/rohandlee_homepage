import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { getRandomThumbnail } from '@/lib/blog'

export async function POST() {
  try {
    // Fetch all published posts
    const { data: posts, error: fetchError } = await supabaseAdmin
      .from('blog_posts')
      .select('id, category, thumbnail_url')
      .order('published_at', { ascending: true })

    if (fetchError) {
      return NextResponse.json({ error: `조회 실패: ${fetchError.message}` }, { status: 500 })
    }

    if (!posts || posts.length === 0) {
      return NextResponse.json({ message: '업데이트할 글이 없습니다.', updated: 0 })
    }

    // Track used thumbnails per category to avoid duplicates
    const usedThumbnails: Record<string, string[]> = {}
    let updated = 0

    for (const post of posts) {
      const category = post.category || '일반'
      if (!usedThumbnails[category]) usedThumbnails[category] = []

      const newUrl = getRandomThumbnail(category, usedThumbnails[category])
      usedThumbnails[category].push(newUrl)

      const { error: updateError } = await supabaseAdmin
        .from('blog_posts')
        .update({ thumbnail_url: newUrl })
        .eq('id', post.id)

      if (!updateError) {
        updated++
      }
    }

    return NextResponse.json({
      message: `${updated}개 글의 썸네일이 업데이트되었습니다.`,
      updated,
      total: posts.length,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : '알 수 없는 오류'
    return NextResponse.json({ error: `서버 오류: ${message}` }, { status: 500 })
  }
}
