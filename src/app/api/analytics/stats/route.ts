import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { fetchAllRows } from '@/lib/fetch-all-rows'

const KST_OFFSET_MS = 9 * 60 * 60 * 1000

function toKst(iso: string) {
  return new Date(new Date(iso).getTime() + KST_OFFSET_MS)
}

function kstDateKey(date: Date) {
  return new Date(date.getTime() + KST_OFFSET_MS).toISOString().split('T')[0]
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const days = parseInt(searchParams.get('days') || '30')

    const since = new Date()
    since.setDate(since.getDate() - days)
    const sinceISO = since.toISOString()

    const [{ count: totalViews }, { count: totalEvents }, pageViews, sessions] = await Promise.all([
      supabaseAdmin
        .from('page_views')
        .select('id', { count: 'exact', head: true })
        .gte('created_at', sinceISO),

      supabaseAdmin
        .from('consultation_events')
        .select('id', { count: 'exact', head: true })
        .gte('created_at', sinceISO),

      fetchAllRows<{ created_at: string; session_id: string; time_on_page: number | null }>(() =>
        supabaseAdmin
          .from('page_views')
          .select('created_at, session_id, time_on_page')
          .gte('created_at', sinceISO)
          .order('id')
      ),

      fetchAllRows<{
        session_id: string
        visitor_id: string
        is_bounce: boolean | null
        is_new_visitor: boolean | null
        total_duration: number | null
        page_count: number | null
      }>(() =>
        supabaseAdmin
          .from('visitor_sessions')
          .select('session_id, visitor_id, is_bounce, is_new_visitor, total_duration, page_count')
          .gte('started_at', sinceISO)
          .order('id')
      ),
    ])

    const dailyMap: Record<string, number> = {}
    const today = new Date()
    for (let d = days - 1; d >= 0; d--) {
      const date = new Date(today)
      date.setDate(date.getDate() - d)
      dailyMap[kstDateKey(date)] = 0
    }

    const hourlyMap: number[] = new Array(24).fill(0)
    const durationBySession: Record<string, number> = {}

    for (const v of pageViews) {
      const kst = toKst(v.created_at)
      const day = kst.toISOString().split('T')[0]
      if (dailyMap[day] !== undefined) dailyMap[day]++
      hourlyMap[kst.getUTCHours()]++
      if (v.time_on_page && v.time_on_page > 0) {
        durationBySession[v.session_id] = (durationBySession[v.session_id] || 0) + v.time_on_page
      }
    }
    const dailyChart = Object.entries(dailyMap).map(([date, views]) => ({ date, views }))

    const totalSessions = sessions.length
    const uniqueVisitors = new Set(sessions.map((s) => s.visitor_id)).size
    const bounces = sessions.filter((s) => s.is_bounce).length
    const bounceRate = totalSessions > 0 ? Math.round((bounces / totalSessions) * 100) : 0
    const newVisitors = sessions.filter((s) => s.is_new_visitor).length

    // Only sessions where a duration was actually recorded; unmeasured sessions would drag the average to 0.
    const measuredDurations = sessions
      .map((s) => Math.max(s.total_duration || 0, durationBySession[s.session_id] || 0))
      .filter((d) => d > 0)
    const avgDuration =
      measuredDurations.length > 0
        ? Math.round(measuredDurations.reduce((sum, d) => sum + d, 0) / measuredDurations.length)
        : 0

    const avgPages =
      totalSessions > 0
        ? parseFloat((sessions.reduce((sum, s) => sum + (s.page_count || 0), 0) / totalSessions).toFixed(1))
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
