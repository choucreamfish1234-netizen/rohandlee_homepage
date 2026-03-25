import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    console.log('Latpeed webhook received:', JSON.stringify(body))

    // 래피드 연동 테스트 요청 처리 (데이터가 비어있을 수 있음)
    if (!body || !body.payment) {
      return NextResponse.json({ success: true, message: 'webhook connected' })
    }

    const payment = body.payment

    // 결제 성공인 경우 DB에 저장
    if (payment.status === 'SUCCESS') {
      const { error } = await supabaseAdmin.from('paid_consultations').insert({
        name: payment.name || '미입력',
        email: payment.email || null,
        phone: payment.phoneNumber || null,
        amount: payment.amount || 0,
        option: payment.option || null,
        method: payment.method || null,
        status: '결제완료',
        callback_status: '회신대기',
        raw_data: body,
      })

      if (error) {
        console.error('DB insert error:', error)
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
      }
    }

    // 결제 취소인 경우
    if (payment.status === 'CANCEL') {
      const { error } = await supabaseAdmin
        .from('paid_consultations')
        .update({ status: '결제취소' })
        .eq('phone', payment.phoneNumber)
        .order('created_at', { ascending: false })
        .limit(1)

      if (error) {
        console.error('DB update error:', error)
      }
    }

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    console.error('Webhook error:', err)
    // 에러가 나도 200을 반환해야 래피드가 재시도 안 함
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ success: false, error: message })
  }
}

// GET 요청도 처리 (연동 테스트용)
export async function GET() {
  return NextResponse.json({ status: 'ok', message: 'Latpeed webhook endpoint' })
}
