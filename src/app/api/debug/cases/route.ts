import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'

export async function GET() {
  const results: Record<string, unknown> = {}

  // 1. 환경변수 확인
  results.env = {
    has_supabase_url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabase_url: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + '...',
    has_service_role_key: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    has_anon_key: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  }

  // 2. success_cases 테이블 전체 조회
  const { data: allCases, error: casesErr } = await supabaseAdmin
    .from('success_cases')
    .select('id, slug, title, published, content')
    .order('sort_order', { ascending: true })

  results.success_cases = {
    error: casesErr?.message || null,
    count: allCases?.length || 0,
    rows: (allCases || []).map(c => ({
      id: c.id,
      slug: c.slug,
      title: c.title?.substring(0, 30),
      published: c.published,
      has_content: !!(c.content && c.content.trim().length > 0),
      content_length: c.content?.length || 0,
    })),
  }

  // 3. /api/cases 가 반환하는 것과 동일한 쿼리 테스트
  const { data: apiData, error: apiErr } = await supabaseAdmin
    .from('success_cases')
    .select('*')
    .order('sort_order', { ascending: true })

  results.api_cases_query = {
    error: apiErr?.message || null,
    count: apiData?.length || 0,
    source: apiData && apiData.length > 0 ? 'database' : 'would_fallback_to_hardcoded',
  }

  // 4. 테이블 컬럼 확인 (content 컬럼 존재 여부)
  const { data: singleRow, error: singleErr } = await supabaseAdmin
    .from('success_cases')
    .select('*')
    .limit(1)
    .maybeSingle()

  results.table_columns = {
    error: singleErr?.message || null,
    columns: singleRow ? Object.keys(singleRow) : [],
    has_content_column: singleRow ? 'content' in singleRow : false,
    has_slug_column: singleRow ? 'slug' in singleRow : false,
    has_published_column: singleRow ? 'published' in singleRow : false,
  }

  return NextResponse.json(results, { status: 200 })
}
