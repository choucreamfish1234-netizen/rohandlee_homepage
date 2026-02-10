import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const days = parseInt(searchParams.get('days') || '30')
    const since = new Date()
    since.setDate(since.getDate() - days)
    const sinceISO = since.toISOString()

    const { data: views } = await supabaseAdmin
      .from('page_views')
      .select('device_type, device_brand, browser, os, screen_resolution')
      .gte('created_at', sinceISO)

    const countField = (field: string) => {
      const map: Record<string, number> = {}
      views?.forEach((v) => {
        const val = (v as Record<string, string>)[field]
        if (val) map[val] = (map[val] || 0) + 1
      })
      return Object.entries(map)
        .sort((a, b) => b[1] - a[1])
        .map(([name, count]) => ({ name, count }))
    }

    return NextResponse.json({
      deviceTypes: countField('device_type'),
      brands: countField('device_brand'),
      browsers: countField('browser'),
      operatingSystems: countField('os'),
      resolutions: countField('screen_resolution').slice(0, 15),
    })
  } catch (error) {
    const msg = error instanceof Error ? error.message : '알 수 없는 오류'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
