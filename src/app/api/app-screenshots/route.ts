import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const BUCKET = 'app-screenshots'

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function ensureBucket(supabase: any) {
  const { data } = await supabase.storage.getBucket(BUCKET)
  if (!data) {
    await supabase.storage.createBucket(BUCKET, { public: true })
  }
}

// GET: list app screenshots
export async function GET() {
  try {
    const supabase = getSupabase()
    if (!supabase) {
      return NextResponse.json({ images: [] })
    }

    await ensureBucket(supabase)

    const { data, error } = await supabase.storage.from(BUCKET).list('', {
      sortBy: { column: 'name', order: 'asc' },
    })

    if (error) {
      console.error('List error:', error)
      return NextResponse.json({ images: [] })
    }

    const images = (data || [])
      .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f.name))
      .map(f => ({
        name: f.name,
        url: supabase.storage.from(BUCKET).getPublicUrl(f.name).data.publicUrl,
      }))

    return NextResponse.json({ images })
  } catch (error) {
    console.error('App screenshots GET error:', error)
    return NextResponse.json({ images: [] })
  }
}

// POST: upload screenshot
export async function POST(req: NextRequest) {
  try {
    const supabase = getSupabase()
    if (!supabase) {
      return NextResponse.json({ error: 'Supabase 설정이 필요합니다.' }, { status: 500 })
    }

    await ensureBucket(supabase)

    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const order = formData.get('order') as string | null

    if (!file) {
      return NextResponse.json({ error: '파일이 필요합니다.' }, { status: 400 })
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'jpg, png, webp 형식만 지원합니다.' }, { status: 400 })
    }

    if (file.size > 20 * 1024 * 1024) {
      return NextResponse.json({ error: '20MB 이하 파일만 가능합니다.' }, { status: 400 })
    }

    const ext = file.name.split('.').pop() || 'jpg'
    const prefix = order || String(Date.now())
    const fileName = `${prefix}_${Date.now()}.${ext}`

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(fileName, buffer, { contentType: file.type, upsert: true })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return NextResponse.json({ error: '업로드 실패' }, { status: 500 })
    }

    const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(fileName)

    return NextResponse.json({ name: fileName, url: urlData.publicUrl })
  } catch (error) {
    console.error('App screenshots POST error:', error)
    return NextResponse.json({ error: '서버 오류' }, { status: 500 })
  }
}

// DELETE: delete screenshot
export async function DELETE(req: NextRequest) {
  try {
    const supabase = getSupabase()
    if (!supabase) {
      return NextResponse.json({ error: 'Supabase 설정이 필요합니다.' }, { status: 500 })
    }

    const { name } = await req.json()
    if (!name) {
      return NextResponse.json({ error: '파일명이 필요합니다.' }, { status: 400 })
    }

    const { error } = await supabase.storage.from(BUCKET).remove([name])
    if (error) {
      console.error('Delete error:', error)
      return NextResponse.json({ error: '삭제 실패' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('App screenshots DELETE error:', error)
    return NextResponse.json({ error: '서버 오류' }, { status: 500 })
  }
}

// PUT: reorder (rename files with new prefixes)
export async function PUT(req: NextRequest) {
  try {
    const supabase = getSupabase()
    if (!supabase) {
      return NextResponse.json({ error: 'Supabase 설정이 필요합니다.' }, { status: 500 })
    }

    const { order } = await req.json() as { order: string[] }
    if (!order || !Array.isArray(order)) {
      return NextResponse.json({ error: '순서 배열이 필요합니다.' }, { status: 400 })
    }

    for (let i = 0; i < order.length; i++) {
      const oldName = order[i]
      const ext = oldName.split('.').pop() || 'jpg'
      const basePart = oldName.replace(/^\d+_/, '')
      const newName = `${String(i).padStart(2, '0')}_${basePart}`

      if (oldName === newName) continue

      const { data: fileData } = await supabase.storage.from(BUCKET).download(oldName)
      if (!fileData) continue

      const buffer = Buffer.from(await fileData.arrayBuffer())
      await supabase.storage.from(BUCKET).upload(newName, buffer, {
        contentType: `image/${ext === 'jpg' ? 'jpeg' : ext}`,
        upsert: true,
      })
      await supabase.storage.from(BUCKET).remove([oldName])
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('App screenshots PUT error:', error)
    return NextResponse.json({ error: '서버 오류' }, { status: 500 })
  }
}
