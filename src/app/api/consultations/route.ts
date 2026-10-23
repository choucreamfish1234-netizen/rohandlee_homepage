import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { validateConsultation, type ConsultationInput } from '@/lib/consultation-validation'

const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT = 3

function clientInfo(req: NextRequest) {
  const forwarded = req.headers.get('x-forwarded-for')
  const ip = req.headers.get('x-real-ip') || (forwarded ? forwarded.split(',')[0].trim() : null)
  const city = req.headers.get('x-vercel-ip-city')
  return {
    ip,
    user_agent: req.headers.get('user-agent')?.slice(0, 500) ?? null,
    referer: req.headers.get('referer')?.slice(0, 500) ?? null,
    country: req.headers.get('x-vercel-ip-country'),
    city: city ? decodeURIComponent(city) : null,
  }
}

type ClientInfo = ReturnType<typeof clientInfo>

async function logAccess(info: ClientInfo, extra: { consultation_id?: string; blocked?: boolean; reason?: string }) {
  const { error } = await supabaseAdmin.from('consultation_ip_logs').insert({ ...info, ...extra })
  if (error) console.error('consultation_ip_logs insert error:', error.message)
}

async function recentSubmissions(ip: string) {
  const since = new Date(Date.now() - RATE_WINDOW_MS).toISOString()
  const { count, error } = await supabaseAdmin
    .from('consultation_ip_logs')
    .select('id', { count: 'exact', head: true })
    .eq('ip', ip)
    .eq('blocked', false)
    .gte('created_at', since)
  // 기록 테이블이 아직 없으면 제한 없이 접수한다.
  return error ? 0 : count ?? 0
}

// POST: 상담 신청 접수 (접속 IP를 별도 테이블에 기록)
export async function POST(req: NextRequest) {
  const info = clientInfo(req)
  let body: ConsultationInput
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 })
  }

  // 숨김 필드가 채워졌으면 봇으로 보고, 접수한 것처럼 응답만 한다.
  if (body.website) {
    await logAccess(info, { blocked: true, reason: 'honeypot' })
    return NextResponse.json({ success: true })
  }

  const invalid = validateConsultation(body)
  if (invalid) {
    await logAccess(info, { blocked: true, reason: `invalid: ${invalid}` })
    return NextResponse.json({ error: invalid }, { status: 400 })
  }

  if (info.ip && (await recentSubmissions(info.ip)) >= RATE_LIMIT) {
    await logAccess(info, { blocked: true, reason: 'rate_limit' })
    return NextResponse.json(
      { error: '짧은 시간에 여러 번 접수되었습니다. 잠시 후 다시 시도하거나 전화(032-207-8788)로 문의해주세요.' },
      { status: 429 }
    )
  }

  const { data, error } = await supabaseAdmin
    .from('consultations')
    .insert([
      {
        name: body.name.trim(),
        phone: body.phone.trim(),
        email: body.email.trim(),
        category: body.category || null,
        content: body.content?.trim() || null,
        ...(typeof body.privacy_consent === 'boolean' ? { privacy_consent: body.privacy_consent } : {}),
        status: 'new',
        created_at: new Date().toISOString(),
      },
    ])
    .select('id')
    .single()

  if (error) {
    console.error('Consultation insert error:', error)
    return NextResponse.json({ error: '일시적인 오류가 발생했습니다. 전화(032-207-8788)로 문의해주세요.' }, { status: 500 })
  }

  await logAccess(info, { consultation_id: String(data.id) })
  return NextResponse.json({ success: true })
}

// PATCH: Update consultation (status change, notes, etc.)
export async function PATCH(req: NextRequest) {
  try {
    const { id, ...updateData } = await req.json()

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 })
    }

    const { error } = await supabaseAdmin
      .from('consultations')
      .update(updateData)
      .eq('id', id)

    if (error) {
      console.error('Consultation update error:', error)
      // 실패 시 status 필드만 있으면 다른 필드 제외하고 재시도
      if (updateData.status && Object.keys(updateData).length > 1) {
        const { error: retryError } = await supabaseAdmin
          .from('consultations')
          .update({ status: updateData.status })
          .eq('id', id)
        if (retryError) {
          console.error('Consultation status-only update error:', retryError)
          return NextResponse.json({ error: retryError.message }, { status: 500 })
        }
        return NextResponse.json({ success: true, warning: 'status updated but some fields failed' })
      }
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Consultation PATCH error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE: Delete consultation
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json()

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 })
    }

    const { error } = await supabaseAdmin
      .from('consultations')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Consultation delete error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Consultation DELETE error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
