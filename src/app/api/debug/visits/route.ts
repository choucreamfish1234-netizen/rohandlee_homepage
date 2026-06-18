import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'

export async function GET() {
  const results: Record<string, unknown> = {}

  // 1. visits 테이블 최근 데이터
  const { data: recentVisits, error: visitsErr, count: visitsCount } = await supabaseAdmin
    .from('visits')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(5)

  results.visits = {
    total_count: visitsCount,
    error: visitsErr?.message || null,
    recent: recentVisits,
  }

  // 2. page_views 테이블 최근 데이터
  const { data: recentPageViews, error: pvErr, count: pvCount } = await supabaseAdmin
    .from('page_views')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(5)

  results.page_views = {
    total_count: pvCount,
    error: pvErr?.message || null,
    recent: recentPageViews,
  }

  // 3. visitor_sessions 테이블
  const { data: recentSessions, error: sessErr, count: sessCount } = await supabaseAdmin
    .from('visitor_sessions')
    .select('*', { count: 'exact' })
    .order('started_at', { ascending: false })
    .limit(5)

  results.visitor_sessions = {
    total_count: sessCount,
    error: sessErr?.message || null,
    recent: recentSessions,
  }

  // 4. 5/27 이후 데이터 있는지 확인
  const { count: visitsAfter527 } = await supabaseAdmin
    .from('visits')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', '2025-05-27T00:00:00')

  const { count: pvAfter527 } = await supabaseAdmin
    .from('page_views')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', '2025-05-27T00:00:00')

  results.after_may_27 = {
    visits: visitsAfter527,
    page_views: pvAfter527,
  }

  // 5. RLS 테스트 - anon key로도 insert 가능한지
  results.env_check = {
    has_service_role_key: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    has_supabase_url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    has_anon_key: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  }

  return NextResponse.json(results)
}
