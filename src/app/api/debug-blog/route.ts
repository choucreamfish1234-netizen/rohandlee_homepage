import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')

  if (slug) {
    // Query specific post by slug (no filters — raw data)
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .select('id, title, slug, status, published_at, created_at, category, author')
      .eq('slug', slug)
      .maybeSingle()

    return NextResponse.json({
      query: 'by_slug',
      slug,
      found: !!data,
      data,
      error: error?.message || null,
    })
  }

  // List all posts with key fields
  const { data, error } = await supabaseAdmin
    .from('blog_posts')
    .select('id, title, slug, status, published_at, created_at')
    .order('created_at', { ascending: false })
    .limit(20)

  return NextResponse.json({
    query: 'all_posts',
    count: data?.length || 0,
    posts: data,
    error: error?.message || null,
  })
}
