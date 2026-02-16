import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { consultationId, emailBody, emailSubject } = body

    if (!consultationId || !emailBody || !emailSubject) {
      console.error('[send-consultation-email] 필수 항목 누락:', { consultationId: !!consultationId, emailBody: !!emailBody, emailSubject: !!emailSubject })
      return NextResponse.json({ error: '필수 항목이 누락되었습니다.' }, { status: 400 })
    }

    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      console.error('[send-consultation-email] RESEND_API_KEY 환경변수가 설정되지 않았습니다.')
      return NextResponse.json({ error: 'RESEND_API_KEY가 설정되지 않았습니다.' }, { status: 500 })
    }

    // Fetch consultation to get email
    const { data: consultation, error: fetchError } = await supabaseAdmin
      .from('consultations')
      .select('email, name')
      .eq('id', consultationId)
      .single()

    if (fetchError || !consultation) {
      console.error('[send-consultation-email] Supabase 조회 실패:', fetchError)
      return NextResponse.json({ error: '상담 데이터를 찾을 수 없습니다.' }, { status: 404 })
    }

    if (!consultation.email) {
      console.error('[send-consultation-email] 의뢰인 이메일 없음, consultationId:', consultationId)
      return NextResponse.json({ error: '의뢰인 이메일이 등록되지 않았습니다.' }, { status: 400 })
    }

    // Convert plain text email to simple HTML
    const htmlBody = emailBody
      .split('\n\n')
      .map((paragraph: string) => `<p style="margin:0 0 16px 0;line-height:1.7;color:#333;">${paragraph.replace(/\n/g, '<br>')}</p>`)
      .join('')

    const htmlEmail = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:'Apple SD Gothic Neo','Malgun Gothic',sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;">
  <div style="border-bottom:2px solid #1B3B2F;padding-bottom:20px;margin-bottom:30px;">
    <h2 style="color:#1B3B2F;margin:0;font-size:18px;">법률사무소 로앤이</h2>
  </div>
  ${htmlBody}
  <div style="border-top:1px solid #eee;padding-top:20px;margin-top:30px;font-size:13px;color:#888;">
    <p style="margin:0;">법률사무소 로앤이 | 032-207-8788 | roandlee@naver.com</p>
    <p style="margin:4px 0 0 0;">경기도 부천시 부일로205번길 54, 205호</p>
  </div>
</body>
</html>`

    // Send email via Resend
    // 도메인 인증 전이므로 onboarding@resend.dev 사용
    // 도메인 인증 완료 후 실제 도메인 이메일로 변경 필요
    const resend = new Resend(resendApiKey)
    console.log('[send-consultation-email] 이메일 발송 시도:', { to: consultation.email, subject: emailSubject })

    const { data: sendData, error: sendError } = await resend.emails.send({
      from: '법률사무소 로앤이 <onboarding@resend.dev>',
      to: [consultation.email],
      subject: emailSubject,
      html: htmlEmail,
    })

    if (sendError) {
      console.error('[send-consultation-email] Resend 발송 실패:', JSON.stringify(sendError, null, 2))
      return NextResponse.json({ error: '이메일 발송에 실패했습니다.', detail: sendError.message }, { status: 500 })
    }

    console.log('[send-consultation-email] 이메일 발송 성공:', sendData)

    // Update consultation status
    const { error: updateError } = await supabaseAdmin
      .from('consultations')
      .update({
        email_draft: emailBody,
        status: 'sent',
        email_sent_at: new Date().toISOString(),
      })
      .eq('id', consultationId)

    if (updateError) {
      console.error('[send-consultation-email] Supabase 상태 업데이트 실패:', updateError)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[send-consultation-email] 예기치 않은 서버 오류:', error instanceof Error ? { message: error.message, stack: error.stack } : error)
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}
