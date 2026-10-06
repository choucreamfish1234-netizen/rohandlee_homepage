import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

function clampInt(value: unknown, max: number) {
  const n = Math.round(Number(value))
  if (!Number.isFinite(n) || n < 0) return 0
  return Math.min(n, max)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const sessionId = typeof body.sessionId === 'string' ? body.sessionId.slice(0, 64) : ''
    const path = typeof body.path === 'string' ? body.path.slice(0, 500) : ''
    if (!sessionId || !path) return new NextResponse(null, { status: 204 })

    const timeOnPage = clampInt(body.timeOnPage, 6 * 60 * 60)
    const scrollDepth = clampInt(body.scrollDepth, 100)
    const clickCount = clampInt(body.clickCount, 10_000)
    const sessionDuration = clampInt(body.sessionDuration, 24 * 60 * 60)
    const isBounce = clickCount <= 1 && timeOnPage < 10

    let pageViewId = Number.isSafeInteger(body.pageViewId) ? (body.pageViewId as number) : null
    if (pageViewId === null) {
      const { data } = await supabaseAdmin
        .from('page_views')
        .select('id')
        .eq('session_id', sessionId)
        .eq('page_path', path)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()
      pageViewId = data?.id ?? null
    }

    if (pageViewId !== null) {
      await supabaseAdmin
        .from('page_views')
        .update({ time_on_page: timeOnPage, scroll_depth: scrollDepth, click_count: clickCount, is_bounce: isBounce })
        .eq('id', pageViewId)
        .eq('session_id', sessionId)
    }

    await supabaseAdmin
      .from('visitor_sessions')
      .update({
        ended_at: new Date().toISOString(),
        exit_page: path,
        is_bounce: isBounce,
        total_duration: sessionDuration,
      })
      .eq('session_id', sessionId)

    return new NextResponse(null, { status: 204 })
  } catch {
    return new NextResponse(null, { status: 204 })
  }
}
