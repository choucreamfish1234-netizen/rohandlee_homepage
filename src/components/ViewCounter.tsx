'use client'

import { useEffect } from 'react'
import { incrementViewCount } from '@/lib/blog'

export default function ViewCounter({ postId }: { postId: number }) {
  useEffect(() => {
    incrementViewCount(postId)
  }, [postId])
  return null
}
