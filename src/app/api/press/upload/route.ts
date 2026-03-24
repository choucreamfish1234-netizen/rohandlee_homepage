import { NextRequest, NextResponse } from 'next/server'
import { createClient, SupabaseClient } from '@supabase/supabase-js'

const BUCKET_NAME = 'press-images'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function ensureBucket(supabase: SupabaseClient<any, any, any>) {
  const { data: buckets } = await supabase.storage.listBuckets()
  const exists = buckets?.some((b: { name: string }) => b.name === BUCKET_NAME)
  if (!exists) {
    const { error } = await supabase.storage.createBucket(BUCKET_NAME, {
      public: true,
      fileSizeLimit: 20 * 1024 * 1024,
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    })
    if (error && !error.message.includes('already exists')) {
      console.error('Bucket creation error:', error)
      return error
    }
  }
  return null
}

export async function POST(req: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json({ error: 'Supabase 설정이 필요합니다.' }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey)

    // Ensure the storage bucket exists
    const bucketError = await ensureBucket(supabase)
    if (bucketError) {
      return NextResponse.json({ error: '스토리지 버킷 생성에 실패했습니다.' }, { status: 500 })
    }

    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: '파일이 필요합니다.' }, { status: 400 })
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'jpg, png, webp 형식만 지원합니다.' }, { status: 400 })
    }

    if (file.size > 20 * 1024 * 1024) {
      return NextResponse.json({ error: '파일 크기는 20MB 이하여야 합니다.' }, { status: 400 })
    }

    const ext = file.name.split('.').pop() || 'jpg'
    const fileName = `press_${Date.now()}_${file.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9가-힣_-]/g, '_')}.${ext}`

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, buffer, { contentType: file.type, upsert: true })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return NextResponse.json({ error: '이미지 업로드에 실패했습니다.' }, { status: 500 })
    }

    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName)

    return NextResponse.json({ url: urlData.publicUrl })
  } catch (error) {
    console.error('Upload press image error:', error)
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}
