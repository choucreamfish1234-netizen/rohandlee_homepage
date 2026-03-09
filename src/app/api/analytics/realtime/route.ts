import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString()
    const thirtyMinAgo = new Date(Date.now() - 30 * 60 * 1000).toISOString()

    const [{ data: activeViews }, { data: recentEvents }, { data: recentViews }] =
      await Promise.all([
        // Active visitors (page views in last 5 minutes)
        supabaseAdmin
          .from('page_views')
          .select('visitor_id, page_path, page_title, created_at, device_type, referrer_type')
          .gte('created_at', fiveMinAgo)
          .order('created_at', { ascending: false }),

        // Recent events (last 30 min)
        supabaseAdmin
          .from('consultation_events')
          .select('event_type, event_label, page_path, created_at, device_type')
          .gte('created_at', thirtyMinAgo)
          .order('created_at', { ascending: false })
          .limit(50),

        // Recent page views (last 30 min) for live feed
        supabaseAdmin
          .from('page_views')
          .select('page_path, page_title, referrer_type, device_type, created_at')
          .gte('created_at', thirtyMinAgo)
          .order('created_at', { ascending: false })
          .limit(50),
      ])

    // Unique active visitors
    const activeVisitors = new Set(activeViews?.map((v) => v.visitor_id)).size

    // Current page distribution
    const pageDistribution: Record<string, number> = {}
    activeViews?.forEach((v) => {
      pageDistribution[v.page_path] = (pageDistribution[v.page_path] || 0) + 1
    })
    const topPages = Object.entries(pageDistribution)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([path, count]) => ({ path, count }))

    return NextResponse.json({
      activeVisitors,
      topPages,
      recentEvents: recentEvents || [],
      liveFeed: recentViews || [],
    })
  } catch (error) {
    const msg = error instanceof Error ? error.message : '알 수 없는 오류'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
