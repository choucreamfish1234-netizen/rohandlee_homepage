import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

// 관리자 화면에서 상담 신청 접속 기록(IP 등)을 조회한다.
// ADMIN_PASSWORD(서버 전용 환경변수)를 설정하면 그 값으로만 조회할 수 있다.
function isAdmin(req: NextRequest) {
  const expected = process.env.ADMIN_PASSWORD || process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'roandlee2026'
  return req.headers.get('x-admin-key') === expected
}

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const id = req.nextUrl.searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 })

  const { data, error } = await supabaseAdmin
    .from('consultation_ip_logs')
    .select('ip, user_agent, referer, country, city, created_at')
    .eq('consultation_id', id)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!data?.ip) return NextResponse.json({ log: data ?? null, sameIpCount: 0 })

  // 같은 IP에서 들어온 다른 접수·차단 기록 수
  const { count } = await supabaseAdmin
    .from('consultation_ip_logs')
    .select('id', { count: 'exact', head: true })
    .eq('ip', data.ip)

  return NextResponse.json({ log: data, sameIpCount: Math.max((count ?? 1) - 1, 0) })
}
