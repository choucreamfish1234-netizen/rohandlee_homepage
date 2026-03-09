import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('page_seo')
    .select('*')
    .order('page_path')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { page_path, title, description, keywords, og_title, og_description } = body

    if (!page_path) {
      return NextResponse.json({ error: 'page_path는 필수입니다.' }, { status: 400 })
    }

    // Fetch current values for change tracking
    const { data: current } = await supabaseAdmin
      .from('page_seo')
      .select('*')
      .eq('page_path', page_path)
      .single()

    const updates = {
      title: title ?? null,
      description: description ?? null,
      keywords: keywords ?? null,
      og_title: og_title ?? null,
      og_description: og_description ?? null,
      updated_at: new Date().toISOString(),
    }

    // Upsert the page_seo record
    const { data, error } = await supabaseAdmin
      .from('page_seo')
      .upsert({ page_path, ...updates }, { onConflict: 'page_path' })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Track changes in seo_changes
    const changes: { page_path: string; field_changed: string; old_value: string | null; new_value: string | null; reason: string }[] = []
    const fields = ['title', 'description', 'keywords', 'og_title', 'og_description'] as const

    for (const field of fields) {
      const oldVal = current?.[field] || null
      const newVal = updates[field] || null
      if (oldVal !== newVal) {
        changes.push({
          page_path,
          field_changed: field,
          old_value: oldVal,
          new_value: newVal,
          reason: '관리자 직접 수정',
        })
      }
    }

    if (changes.length > 0) {
      await supabaseAdmin.from('seo_changes').insert(changes)
    }

    return NextResponse.json(data)
  } catch (error) {
    const msg = error instanceof Error ? error.message : '알 수 없는 오류'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
