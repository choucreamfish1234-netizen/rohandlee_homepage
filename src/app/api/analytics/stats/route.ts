import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const days = parseInt(searchParams.get('days') || '30')

    const since = new Date()
    since.setDate(since.getDate() - days)
    const sinceISO = since.toISOString()

    // Parallel queries
    const [
      { count: totalViews },
      { data: sessions },
      { count: totalEvents },
      { data: dailyViews },
      { data: hourlyViews },
    ] = await Promise.all([
      // Total page views
      supabaseAdmin
        .from('page_views')
        .select('id', { count: 'exact', head: true })
        .gte('created_at', sinceISO),

      // Sessions for visitor/bounce calculations
      supabaseAdmin
        .from('visitor_sessions')
        .select('visitor_id, is_bounce, is_new_visitor, total_duration, page_count')
        .gte('started_at', sinceISO),

      // Total events
      supabaseAdmin
        .from('consultation_events')
        .select('id', { count: 'exact', head: true })
        .gte('created_at', sinceISO),

      // Daily page views (for chart)
      supabaseAdmin
        .from('page_views')
        .select('created_at')
        .gte('created_at', sinceISO)
        .order('created_at'),

      // Hourly distribution (for heatmap)
      supabaseAdmin
        .from('page_views')
        .select('created_at')
        .gte('created_at', sinceISO),
    ])

    // Calculate daily chart data
    const dailyMap: Record<string, number> = {}
    for (let d = 0; d < days; d++) {
      const date = new Date(since)
      date.setDate(date.getDate() + d)
      dailyMap[date.toISOString().split('T')[0]] = 0
    }
    dailyViews?.forEach((v) => {
      const day = new Date(v.created_at).toISOString().split('T')[0]
      if (dailyMap[day] !== undefined) dailyMap[day]++
    })
    const dailyChart = Object.entries(dailyMap).map(([date, views]) => ({ date, views }))

    // Calculate hourly heatmap
    const hourlyMap: number[] = new Array(24).fill(0)
    hourlyViews?.forEach((v) => {
      const hour = new Date(v.created_at).getHours()
      hourlyMap[hour]++
    })

    // Session stats
    const totalSessions = sessions?.length || 0
    const uniqueVisitors = new Set(sessions?.map((s) => s.visitor_id)).size
    const bounces = sessions?.filter((s) => s.is_bounce)?.length || 0
    const bounceRate = totalSessions > 0 ? Math.round((bounces / totalSessions) * 100) : 0
    const newVisitors = sessions?.filter((s) => s.is_new_visitor)?.length || 0
    const avgDuration =
      totalSessions > 0
        ? Math.round(
            (sessions?.reduce((sum, s) => sum + (s.total_duration || 0), 0) || 0) / totalSessions
          )
        : 0
    const avgPages =
      totalSessions > 0
        ? parseFloat(
            (
              (sessions?.reduce((sum, s) => sum + (s.page_count || 0), 0) || 0) / totalSessions
            ).toFixed(1)
          )
        : 0

    return NextResponse.json({
      totalViews: totalViews || 0,
      uniqueVisitors,
      totalSessions,
      bounceRate,
      newVisitors,
      avgDuration,
      avgPages,
      totalEvents: totalEvents || 0,
      dailyChart,
      hourlyHeatmap: hourlyMap,
    })
  } catch (error) {
    const msg = error instanceof Error ? error.message : '알 수 없는 오류'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
