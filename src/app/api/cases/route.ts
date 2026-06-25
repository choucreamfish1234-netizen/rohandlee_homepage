import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { DEFAULT_CASES } from '@/lib/cases'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('success_cases')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error || !data || data.length === 0) {
      return NextResponse.json({ cases: DEFAULT_CASES, source: 'hardcoded' })
    }

    return NextResponse.json({ cases: data, source: 'database' })
  } catch {
    return NextResponse.json({ cases: DEFAULT_CASES, source: 'hardcoded' })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { title, slug, tag, category, summary, content, badge, badge_color, tag_color, image_url, published } = body

    if (!title || !summary) {
      return NextResponse.json({ error: '제목과 요약이 필요합니다.' }, { status: 400 })
    }

    const { data: maxOrder } = await supabaseAdmin
      .from('success_cases')
      .select('sort_order')
      .order('sort_order', { ascending: false })
      .limit(1)
      .maybeSingle()

    const nextOrder = (maxOrder?.sort_order ?? -1) + 1
    const now = new Date().toISOString()

    const { data, error } = await supabaseAdmin
      .from('success_cases')
      .insert({
        title,
        slug: slug || title.toLowerCase().replace(/\s+/g, '-').substring(0, 100),
        tag: tag || category || '일반',
        category: category || '일반',
        summary,
        content: content || null,
        badge: badge || '',
        badge_color: badge_color || 'bg-gray-50 text-gray-700 border-gray-200',
        tag_color: tag_color || 'bg-gray-50 text-gray-600',
        image_url: image_url || '',
        sort_order: nextOrder,
        published: published ?? true,
        created_at: now,
        updated_at: now,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ case: data })
  } catch (error) {
    const message = error instanceof Error ? error.message : '알 수 없는 오류'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, slug: _slug, ...updates } = body

    if (!id) {
      return NextResponse.json({ error: 'ID가 필요합니다.' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('success_cases')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ case: data })
  } catch (error) {
    const message = error instanceof Error ? error.message : '알 수 없는 오류'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json()
    const { id } = body

    if (!id) {
      return NextResponse.json({ error: 'ID가 필요합니다.' }, { status: 400 })
    }

    const { error } = await supabaseAdmin
      .from('success_cases')
      .delete()
      .eq('id', id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : '알 수 없는 오류'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
