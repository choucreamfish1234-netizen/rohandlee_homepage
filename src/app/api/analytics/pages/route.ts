import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const days = parseInt(searchParams.get('days') || '30')
    const since = new Date()
    since.setDate(since.getDate() - days)
    const sinceISO = since.toISOString()

    const [{ data: pageViews }, { data: sessions }] = await Promise.all([
      supabaseAdmin
        .from('page_views')
        .select('page_path, page_title, time_on_page, scroll_depth, is_bounce')
        .gte('created_at', sinceISO),

      supabaseAdmin
        .from('visitor_sessions')
        .select('landing_page, exit_page')
        .gte('started_at', sinceISO),
    ])

    // Popular pages
    const pageMap: Record<string, { views: number; title: string; avgTime: number; avgScroll: number; bounces: number }> = {}
    pageViews?.forEach((v) => {
      if (!pageMap[v.page_path]) {
        pageMap[v.page_path] = { views: 0, title: v.page_title || v.page_path, avgTime: 0, avgScroll: 0, bounces: 0 }
      }
      const p = pageMap[v.page_path]
      p.views++
      p.avgTime += v.time_on_page || 0
      p.avgScroll += v.scroll_depth || 0
      if (v.is_bounce) p.bounces++
    })

    const popularPages = Object.entries(pageMap)
      .map(([path, data]) => ({
        path,
        title: data.title,
        views: data.views,
        avgTime: data.views > 0 ? Math.round(data.avgTime / data.views) : 0,
        avgScroll: data.views > 0 ? Math.round(data.avgScroll / data.views) : 0,
        bounceRate: data.views > 0 ? Math.round((data.bounces / data.views) * 100) : 0,
      }))
      .sort((a, b) => b.views - a.views)

    // Landing pages
    const landingMap: Record<string, number> = {}
    sessions?.forEach((s) => {
      if (s.landing_page) {
        landingMap[s.landing_page] = (landingMap[s.landing_page] || 0) + 1
      }
    })
    const landingPages = Object.entries(landingMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([path, count]) => ({ path, count }))

    // Exit pages
    const exitMap: Record<string, number> = {}
    sessions?.forEach((s) => {
      if (s.exit_page) {
        exitMap[s.exit_page] = (exitMap[s.exit_page] || 0) + 1
      }
    })
    const exitPages = Object.entries(exitMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([path, count]) => ({ path, count }))

    return NextResponse.json({ popularPages, landingPages, exitPages })
  } catch (error) {
    const msg = error instanceof Error ? error.message : '알 수 없는 오류'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
