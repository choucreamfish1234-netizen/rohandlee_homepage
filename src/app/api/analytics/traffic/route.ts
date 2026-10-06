import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { fetchAllRows } from '@/lib/fetch-all-rows'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const days = searchParams.get('days')

    const sinceISO = (() => {
      if (!days || days === 'all') return null
      const since = new Date()
      since.setDate(since.getDate() - parseInt(days))
      return since.toISOString()
    })()

    const visits = await fetchAllRows<{ channel: string | null; page: string | null; created_at: string }>(() => {
      const query = supabaseAdmin.from('visits').select('channel, page, created_at')
      return (sinceISO ? query.gte('created_at', sinceISO) : query).order('created_at', { ascending: false })
    })

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
