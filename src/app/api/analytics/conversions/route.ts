import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const days = parseInt(searchParams.get('days') || '30')
    const since = new Date()
    since.setDate(since.getDate() - days)
    const sinceISO = since.toISOString()

    const [{ data: events }, { count: totalSessions }, { data: eventSessions }] =
      await Promise.all([
        // All conversion events
        supabaseAdmin
          .from('consultation_events')
          .select('event_type, event_label, page_path, referrer_type, device_type, created_at')
          .gte('created_at', sinceISO),

        // Total sessions for conversion rate
        supabaseAdmin
          .from('visitor_sessions')
          .select('id', { count: 'exact', head: true })
          .gte('started_at', sinceISO),

        // Sessions with events (for channel conversion)
        supabaseAdmin
          .from('consultation_events')
          .select('session_id, referrer_type, event_type')
          .gte('created_at', sinceISO),
      ])

    // Event type counts (funnel)
    const funnelTypes = ['form_open', 'form_submit', 'kakao_click', 'phone_click']
    const funnel = funnelTypes.map((type) => ({
      type,
      count: events?.filter((e) => e.event_type === type).length || 0,
    }))

    // All event type counts
    const eventMap: Record<string, number> = {}
    events?.forEach((e) => {
      eventMap[e.event_type] = (eventMap[e.event_type] || 0) + 1
    })
    const eventCounts = Object.entries(eventMap)
      .sort((a, b) => b[1] - a[1])
      .map(([type, count]) => ({ type, count }))

    // Conversion paths (which pages lead to conversions)
    const pathMap: Record<string, number> = {}
    events?.forEach((e) => {
      if (['form_submit', 'kakao_click', 'phone_click'].includes(e.event_type)) {
        pathMap[e.page_path] = (pathMap[e.page_path] || 0) + 1
      }
    })
    const conversionPaths = Object.entries(pathMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([path, count]) => ({ path, count }))

    // Channel performance
    const channelConv: Record<string, { sessions: number; conversions: number }> = {}
    eventSessions?.forEach((e) => {
      const ch = e.referrer_type || 'direct'
      if (!channelConv[ch]) channelConv[ch] = { sessions: 0, conversions: 0 }
      channelConv[ch].sessions++
      if (['form_submit', 'kakao_click', 'phone_click'].includes(e.event_type)) {
        channelConv[ch].conversions++
      }
    })
    const channelPerformance = Object.entries(channelConv)
      .map(([channel, data]) => ({
        channel,
        ...data,
        rate: data.sessions > 0 ? Math.round((data.conversions / data.sessions) * 100) : 0,
      }))
      .sort((a, b) => b.conversions - a.conversions)

    // Blog contribution (blog_read events that lead to conversions in same session)
    const blogSessions = new Set(
      events?.filter((e) => e.event_type === 'blog_read').map((e) => e.page_path)
    )

    const overallRate =
      totalSessions && totalSessions > 0
        ? parseFloat(
            (((events?.filter((e) => ['form_submit', 'kakao_click', 'phone_click'].includes(e.event_type)).length || 0) / totalSessions) * 100).toFixed(1)
          )
        : 0

    return NextResponse.json({
      funnel,
      eventCounts,
      conversionPaths,
      channelPerformance,
      blogContribution: blogSessions.size,
      overallConversionRate: overallRate,
      totalSessions: totalSessions || 0,
    })
  } catch (error) {
    const msg = error instanceof Error ? error.message : '알 수 없는 오류'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
