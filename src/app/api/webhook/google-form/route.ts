import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    console.log('Google Form webhook received:', JSON.stringify(body))

    const { name, phone, email, formResponses } = body

    if (!name && !phone) {
      return NextResponse.json({ success: true, message: 'no data' })
    }

    // paid_consultations에서 같은 전화번호의 회신대기 건을 찾아서 정보 업데이트
    if (phone) {
      const { data: existing } = await supabaseAdmin
        .from('paid_consultations')
        .select('*')
        .eq('phone', phone.replace(/-/g, ''))
        .eq('callback_status', '회신대기')
        .order('created_at', { ascending: false })
        .limit(1)

      if (existing && existing.length > 0) {
        // 기존 래피드 결제 건에 구글 폼 정보 업데이트 (raw_data에 전체 응답 포함)
        await supabaseAdmin
          .from('paid_consultations')
          .update({
            name: name || existing[0].name,
            email: email || existing[0].email,
            memo: (existing[0].memo || '') + '\n[구글폼 접수] ' + new Date().toLocaleString('ko-KR'),
            raw_data: { ...existing[0].raw_data, formResponses, googleFormSubmittedAt: new Date().toISOString() },
          })
          .eq('id', existing[0].id)

        return NextResponse.json({ success: true, matched: true })
      }
    }

    // 매칭되는 래피드 결제 건이 없으면 새로 생성
    const { error } = await supabaseAdmin.from('paid_consultations').insert({
      name: name || '미입력',
      phone: phone ? phone.replace(/-/g, '') : null,
      email: email || null,
      amount: 0,
      status: '폼접수',
      callback_status: '회신대기',
      memo: '[구글폼 직접접수]',
      raw_data: body,
    })

    if (error) {
      console.error('DB insert error:', error)
      return NextResponse.json({ success: false, error: error.message })
    }

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    console.error('Google form webhook error:', err)
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ success: false, error: message })
  }
}

export async function GET() {
  return NextResponse.json({ status: 'ok', message: 'Google Form webhook endpoint' })
}
