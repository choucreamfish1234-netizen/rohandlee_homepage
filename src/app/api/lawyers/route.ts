import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('lawyers')
      .select('*')
      .order('display_order', { ascending: true })

    if (error) {
      console.error('Lawyers GET error:', error.message)
      if (error.message.includes('does not exist') || error.code === '42P01') {
        return NextResponse.json([])
      }
      return NextResponse.json([])
    }
    return NextResponse.json(data)
  } catch (error) {
    console.error('Lawyers GET exception:', error)
    return NextResponse.json([])
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { data, error } = await supabaseAdmin
      .from('lawyers')
      .insert(body)
      .select()
      .single()

    if (error) {
      console.error('Lawyers POST error:', error)
      return NextResponse.json(
        { error: `저장 실패: ${error.message}` },
        { status: 500 }
      )
    }
    return NextResponse.json(data)
  } catch (error) {
    console.error('Lawyers POST exception:', error)
    return NextResponse.json(
      { error: `서버 오류: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    )
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, ...updates } = body
    const { data, error } = await supabaseAdmin
      .from('lawyers')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Lawyers PATCH error:', error)
      return NextResponse.json(
        { error: `수정 실패: ${error.message}` },
        { status: 500 }
      )
    }
    return NextResponse.json(data)
  } catch (error) {
    console.error('Lawyers PATCH exception:', error)
    return NextResponse.json(
      { error: `서버 오류: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json()
    const { error } = await supabaseAdmin
      .from('lawyers')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Lawyers DELETE error:', error)
      return NextResponse.json(
        { error: `삭제 실패: ${error.message}` },
        { status: 500 }
      )
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Lawyers DELETE exception:', error)
    return NextResponse.json(
      { error: `서버 오류: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    )
  }
}
