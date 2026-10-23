import { NextRequest, NextResponse } from 'next/server'
import { checkAdminPassword, createSessionCookie } from '@/lib/admin-auth'

export async function POST(req: NextRequest) {
  const { password } = await req.json().catch(() => ({ password: '' }))
  if (!checkAdminPassword(password)) {
    // 무차별 대입을 늦추기 위한 지연
    await new Promise((r) => setTimeout(r, 800))
    return NextResponse.json({ error: '비밀번호가 올바르지 않습니다.' }, { status: 401 })
  }
  const res = NextResponse.json({ success: true })
  try {
    createSessionCookie(res)
  } catch {
    return NextResponse.json(
      { error: '서버 설정 오류: Vercel 환경변수 SUPABASE_SERVICE_ROLE_KEY 또는 ADMIN_SESSION_SECRET이 필요합니다.' },
      { status: 500 }
    )
  }
  return res
}
