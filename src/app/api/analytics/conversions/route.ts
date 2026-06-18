import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const days = parseInt(searchParams.get('days') || '30')
    const since = new Date()
    since.setDate(since.getDate() - days)
    const sinceISO = since.toISOString()

    const [
      { data: convEvents },
      { data: legacyEvents },
      { count: totalSessions },
    ] = await Promise.all([
      supabaseAdmin
        .from('conversion_events')
        .select('event_type, page, referrer, channel, created_at')
        .gte('created_at', sinceISO),

      supabaseAdmin
        .from('consultation_events')
        .select('event_type, event_label, page_path, referrer_type, device_type, created_at')
        .gte('created_at', sinceISO),

      supabaseAdmin
        .from('visitor_sessions')
        .select('id', { count: 'exact', head: true })
        .gte('started_at', sinceISO),
    ])

    const allEvents = [
      ...(convEvents || []).map(e => ({
        event_type: e.event_type,
        page: e.page || '',
        channel: e.channel || 'direct',
      })),
      ...(legacyEvents || []).map(e => ({
        event_type: e.event_type,
        page: e.page_path || '',
        channel: e.referrer_type || 'direct',
      })),
    ]

    const funnelTypes = [
      'consultation_open', 'email_consultation_select', 'rapid_consultation_click',
      'form_submit', 'kakao_click', 'phone_click',
      'form_open',
    ]
    const funnel = funnelTypes
      .map(type => ({
        type,
        count: allEvents.filter(e => e.event_type === type).length,
      }))
      .filter(f => f.count > 0)

    const eventMap: Record<string, number> = {}
    allEvents.forEach(e => {
      eventMap[e.event_type] = (eventMap[e.event_type] || 0) + 1
    })
    const eventCounts = Object.entries(eventMap)
      .sort((a, b) => b[1] - a[1])
      .map(([type, count]) => ({ type, count }))

    const conversionTypes = ['form_submit', 'kakao_click', 'phone_click', 'rapid_consultation_click']
    const pathMap: Record<string, number> = {}
    allEvents.forEach(e => {
      if (conversionTypes.includes(e.event_type)) {
        pathMap[e.page] = (pathMap[e.page] || 0) + 1
      }
    })
    const conversionPaths = Object.entries(pathMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([path, count]) => ({ path, count }))

    const channelConv: Record<string, { sessions: number; conversions: number }> = {}
    allEvents.forEach(e => {
      const ch = e.channel || 'direct'
      if (!channelConv[ch]) channelConv[ch] = { sessions: 0, conversions: 0 }
      channelConv[ch].sessions++
      if (conversionTypes.includes(e.event_type)) {
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

    const totalConversions = allEvents.filter(e => conversionTypes.includes(e.event_type)).length
    const overallRate =
      totalSessions && totalSessions > 0
        ? parseFloat(((totalConversions / totalSessions) * 100).toFixed(1))
        : 0

    return NextResponse.json({
      funnel,
      eventCounts,
      conversionPaths,
      channelPerformance,
      overallConversionRate: overallRate,
      totalSessions: totalSessions || 0,
    })
  } catch (error) {
    const msg = error instanceof Error ? error.message : '알 수 없는 오류'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
