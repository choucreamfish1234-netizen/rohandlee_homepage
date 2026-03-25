import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const days = searchParams.get('days')

    let query = supabaseAdmin
      .from('visits')
      .select('channel, page, created_at')

    if (days && days !== 'all') {
      const since = new Date()
      since.setDate(since.getDate() - parseInt(days))
      query = query.gte('created_at', since.toISOString())
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const visits = data || []

    // 채널별 방문수
    const channelMap: Record<string, number> = {}
    const pageMap: Record<string, number> = {}

    for (const v of visits) {
      const ch = v.channel || 'other'
      channelMap[ch] = (channelMap[ch] || 0) + 1

      const pg = v.page || '/'
      pageMap[pg] = (pageMap[pg] || 0) + 1
    }

    const channels = Object.entries(channelMap)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }))

    const pages = Object.entries(pageMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([page, count]) => ({ page, count }))

    return NextResponse.json({
      totalVisits: visits.length,
      channels,
      pages,
    })
  } catch (error) {
    const msg = error instanceof Error ? error.message : '알 수 없는 오류'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
