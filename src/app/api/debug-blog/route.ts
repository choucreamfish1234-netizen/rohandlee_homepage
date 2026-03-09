import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')

  // Check which key is being used
  const hasServiceKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY
  const hasAnonKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '(not set)'

  if (slug) {
    const decodedSlug = decodeURIComponent(slug)

    // Query with published filter
    const withFilter = await supabaseAdmin
      .from('blog_posts')
      .select('id, title, slug, status, published_at, created_at, category, author')
      .eq('slug', decodedSlug)
      .eq('status', 'published')
      .maybeSingle()

    // Query without status filter
    const withoutFilter = await supabaseAdmin
      .from('blog_posts')
      .select('id, title, slug, status, published_at, created_at, category, author')
      .eq('slug', decodedSlug)
      .maybeSingle()

    return NextResponse.json({
      query: 'by_slug',
      slug,
      decodedSlug,
      env: { hasServiceKey, hasAnonKey, supabaseUrl },
      withPublishedFilter: {
        found: !!withFilter.data,
        data: withFilter.data,
        error: withFilter.error?.message || null,
      },
      withoutFilter: {
        found: !!withoutFilter.data,
        data: withoutFilter.data,
        error: withoutFilter.error?.message || null,
      },
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
    env: { hasServiceKey, hasAnonKey, supabaseUrl },
    count: data?.length || 0,
    posts: data,
    error: error?.message || null,
  })
}
