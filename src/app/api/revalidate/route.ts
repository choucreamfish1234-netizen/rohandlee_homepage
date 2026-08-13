import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(req: NextRequest) {
  try {
    const { paths } = await req.json()
    const targets = Array.isArray(paths) ? paths : ['/blog']

    for (const p of targets) {
      revalidatePath(p)
    }

    return NextResponse.json({ revalidated: targets })
  } catch {
    revalidatePath('/blog')
    return NextResponse.json({ revalidated: ['/blog'] })
  }
}
