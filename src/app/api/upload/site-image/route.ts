import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const settingKey = formData.get('key') as string | null

    if (!file || !settingKey) {
      return NextResponse.json({ error: '파일과 key가 필요합니다.' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const fileName = `site/${settingKey}_${Date.now()}.jpg`

    const { error: uploadError } = await supabaseAdmin.storage
      .from('press-images')
      .upload(fileName, buffer, {
        contentType: 'image/jpeg',
        upsert: true,
      })

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 })
    }

    const { data: urlData } = supabaseAdmin.storage
      .from('press-images')
      .getPublicUrl(fileName)

    const publicUrl = urlData.publicUrl

    const { error: settingsError } = await supabaseAdmin
      .from('site_settings')
      .upsert(
        { key: settingKey, value: publicUrl, updated_at: new Date().toISOString() },
        { onConflict: 'key' }
      )

    if (settingsError) {
      return NextResponse.json({ error: settingsError.message }, { status: 500 })
    }

    return NextResponse.json({ url: publicUrl })
  } catch (error) {
    const msg = error instanceof Error ? error.message : '알 수 없는 오류'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
