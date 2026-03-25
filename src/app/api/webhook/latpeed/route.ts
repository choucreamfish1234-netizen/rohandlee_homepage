import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

interface LatpeedPayment {
  name: string
  email: string
  phoneNumber: string
  amount: number
  status: string
  date: string
  method: string
  canceledReason?: string
  option?: string
}

interface LatpeedForm {
  question: string
  answer: string
}

interface LatpeedAgreement {
  question: string
  answer: boolean
}

interface LatpeedWebhookData {
  type: string
  payment: LatpeedPayment
  forms?: LatpeedForm[]
  agreements?: LatpeedAgreement[]
}

export async function POST(req: NextRequest) {
  try {
    const body: LatpeedWebhookData = await req.json()
    const { payment, forms, agreements } = body

    if (!payment) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    if (payment.status === 'SUCCESS') {
      const { error } = await supabaseAdmin
        .from('paid_consultations')
        .insert({
          name: payment.name,
          email: payment.email,
          phone: payment.phoneNumber,
          amount: payment.amount,
          payment_method: payment.method,
          product_option: payment.option || null,
          paid_at: payment.date,
          status: '결제완료',
          callback_status: '회신대기',
          forms: forms || null,
          agreements: agreements || null,
          raw_data: body,
        })

      if (error) {
        console.error('Latpeed webhook INSERT error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
    } else if (payment.status === 'CANCEL') {
      // Find by name + phone + amount and update to 결제취소
      const { error } = await supabaseAdmin
        .from('paid_consultations')
        .update({
          status: '결제취소',
          callback_status: '결제취소',
          canceled_reason: payment.canceledReason || null,
          raw_data: body,
        })
        .eq('phone', payment.phoneNumber)
        .eq('amount', payment.amount)
        .eq('name', payment.name)
        .neq('status', '결제취소')
        .order('created_at', { ascending: false })
        .limit(1)

      if (error) {
        console.error('Latpeed webhook CANCEL error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Latpeed webhook error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
