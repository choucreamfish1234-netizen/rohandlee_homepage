import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { requireAdmin } from '@/lib/admin-auth'
import { fetchAllRows } from '@/lib/fetch-all-rows'

export async function GET(req: NextRequest) {
  const denied = requireAdmin(req)
  if (denied) return denied
  try {
    const rows = await fetchAllRows(() =>
      supabaseAdmin.from('paid_consultations').select('*').order('created_at', { ascending: false }).order('id')
    )
    return NextResponse.json({ items: rows })
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'error' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  const denied = requireAdmin(req)
  if (denied) return denied
  try {
    const { id, ...updateData } = await req.json()

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 })
    }

    const { error } = await supabaseAdmin
      .from('paid_consultations')
      .update(updateData)
      .eq('id', id)

    if (error) {
      console.error('Paid consultation update error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Paid consultation PATCH error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const denied = requireAdmin(req)
  if (denied) return denied
  try {
    const { id } = await req.json()

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 })
    }

    const { error } = await supabaseAdmin
      .from('paid_consultations')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Paid consultation delete error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Paid consultation DELETE error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
