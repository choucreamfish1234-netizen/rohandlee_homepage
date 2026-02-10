import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const days = parseInt(searchParams.get('days') || '30')
    const since = new Date()
    since.setDate(since.getDate() - days)
    const sinceISO = since.toISOString()

    const [{ data: views }, { data: keywords }, { data: utmData }] = await Promise.all([
      // Referrer type distribution
      supabaseAdmin
        .from('page_views')
        .select('referrer_type')
        .gte('created_at', sinceISO)
        .not('referrer_type', 'is', null),

      // Top search keywords
      supabaseAdmin
        .from('page_views')
        .select('search_keyword')
        .gte('created_at', sinceISO)
        .not('search_keyword', 'is', null)
        .not('search_keyword', 'eq', ''),

      // UTM campaigns
      supabaseAdmin
        .from('visitor_sessions')
        .select('utm_source, utm_medium, utm_campaign')
        .gte('started_at', sinceISO)
        .not('utm_source', 'is', null),
    ])

    // Channel distribution
    const channelMap: Record<string, number> = {}
    views?.forEach((v) => {
      const ch = v.referrer_type || 'direct'
      channelMap[ch] = (channelMap[ch] || 0) + 1
    })
    const channels = Object.entries(channelMap)
      .sort((a, b) => b[1] - a[1])
      .map(([name, value]) => ({ name, value }))

    // Top keywords
    const kwMap: Record<string, number> = {}
    keywords?.forEach((v) => {
      const kw = v.search_keyword
      kwMap[kw] = (kwMap[kw] || 0) + 1
    })
    const topKeywords = Object.entries(kwMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([keyword, count]) => ({ keyword, count }))

    // UTM campaigns
    const utmMap: Record<string, { source: string; medium: string; campaign: string; count: number }> = {}
    utmData?.forEach((u) => {
      const key = `${u.utm_source}|${u.utm_medium}|${u.utm_campaign}`
      if (!utmMap[key]) {
        utmMap[key] = { source: u.utm_source, medium: u.utm_medium || '', campaign: u.utm_campaign || '', count: 0 }
      }
      utmMap[key].count++
    })
    const campaigns = Object.values(utmMap).sort((a, b) => b.count - a.count)

    return NextResponse.json({ channels, topKeywords, campaigns })
  } catch (error) {
    const msg = error instanceof Error ? error.message : '알 수 없는 오류'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
