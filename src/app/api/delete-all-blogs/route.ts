import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { requireAdmin } from '@/lib/admin-auth'

export async function DELETE(req: Request) {
  const denied = requireAdmin(req)
  if (denied) return denied
  try {
    const { error, count } = await supabaseAdmin
      .from('blog_posts')
      .delete()
      .neq('id', 0)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, deleted: count || 0 })
  } catch (err) {
    const msg = err instanceof Error ? err.message : '알 수 없는 오류'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
