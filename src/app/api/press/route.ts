import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

async function ensurePressTable() {
  const { error } = await supabaseAdmin
    .from('press_articles')
    .select('id')
    .limit(1)

  if (error && error.message.includes('does not exist')) {
    // Create the table via SQL
    const { error: createError } = await supabaseAdmin.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS press_articles (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          outlet TEXT NOT NULL DEFAULT '',
          title TEXT NOT NULL DEFAULT '',
          url TEXT DEFAULT '',
          date TEXT DEFAULT '',
          image_url TEXT DEFAULT '',
          display_order INTEGER DEFAULT 0,
          visible BOOLEAN DEFAULT true,
          created_at TIMESTAMPTZ DEFAULT now()
        );
        ALTER TABLE press_articles ENABLE ROW LEVEL SECURITY;
        CREATE POLICY "Allow public read" ON press_articles FOR SELECT USING (true);
        CREATE POLICY "Allow service role all" ON press_articles FOR ALL USING (true);
      `
    })
    if (createError) {
      // If rpc doesn't exist, return the original error for manual table creation
      console.error('Could not auto-create press_articles table:', createError.message)
      return error
    }
  }
  return null
}

export async function GET() {
  const tableError = await ensurePressTable()
  if (tableError) {
    // Gracefully return empty array if table doesn't exist
    console.error('press_articles table error:', tableError.message)
    return NextResponse.json([])
  }

  const { data, error } = await supabaseAdmin
    .from('press_articles')
    .select('*')
    .order('display_order', { ascending: true })

  if (error) {
    console.error('Press GET error:', error.message)
    return NextResponse.json([])
  }
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { data, error } = await supabaseAdmin
    .from('press_articles')
    .insert(body)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json(data)
}

export async function PATCH(req: NextRequest) {
  const body = await req.json()
  const { id, ...updates } = body
  const { data, error } = await supabaseAdmin
    .from('press_articles')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json(data)
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json()
  const { error } = await supabaseAdmin
    .from('press_articles')
    .delete()
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ success: true })
}
