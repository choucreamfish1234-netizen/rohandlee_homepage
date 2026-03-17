import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

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
