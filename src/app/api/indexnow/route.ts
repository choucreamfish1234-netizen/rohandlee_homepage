import { NextRequest, NextResponse } from 'next/server'
import { publishedGuides } from '@/lib/editorial-guides'
import { submitIndexNow } from '@/lib/indexnow'
import { isAdminRequest } from '@/lib/admin-auth'

const BASE = 'https://lawfirmrohandlee.com'

// 매일 Vercel Cron이 호출해 최근 공개된 기획 글을 IndexNow로 알린다.
// 관리자로 로그인한 상태에서 ?all=1 로 열면 공개된 기획 글 전체를 한 번에 제출한다.
export const dynamic = 'force-dynamic'

function authorized(req: NextRequest) {
  const secret = process.env.CRON_SECRET
  if (secret && req.headers.get('authorization') === `Bearer ${secret}`) return true
  if (!secret && (req.headers.get('user-agent') || '').startsWith('vercel-cron')) return true
  return isAdminRequest(req)
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const all = req.nextUrl.searchParams.get('all') === '1' && isAdminRequest(req)
  const since = Date.now() - 26 * 60 * 60 * 1000
  const guides = publishedGuides().filter((g) => all || new Date(g.publishedAt).getTime() >= since)
  const urls = guides.map((g) => `${BASE}/blog/${g.slug}`)
  if (urls.length) urls.push(`${BASE}/blog`, `${BASE}/llms.txt`)
  try {
    const result = await submitIndexNow(urls)
    return NextResponse.json({ ...result, urls: urls.length })
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'failed' }, { status: 502 })
  }
}
