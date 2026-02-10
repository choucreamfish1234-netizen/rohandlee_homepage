'use client'

import { useEffect, useRef, useState } from 'react'

function useCountUp(end: number, duration = 2000) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const startTime = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress >= 1) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [started, end, duration])

  return { count, ref }
}

function StatItem({ label, end, suffix, isDecimal, showDivider = true }: {
  label: string
  end: number
  suffix: string
  isDecimal?: boolean
  showDivider?: boolean
}) {
  const { count, ref } = useCountUp(end, 2200)

  return (
    <div className="text-center relative">
      <span ref={ref} className="block text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
        {isDecimal ? (count / 10).toFixed(1) : count}
        {suffix}
      </span>
      <span className="block mt-2 text-[11px] sm:text-xs text-white/60">{label}</span>
      {showDivider && (
        <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-white/20" />
      )}
    </div>
  )
}

function StaticItem({ value, label, showDivider = true }: {
  value: string
  label: string
  showDivider?: boolean
}) {
  return (
    <div className="text-center relative">
      <span className="block text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
        {value}
      </span>
      <span className="block mt-2 text-[11px] sm:text-xs text-white/60">{label}</span>
      {showDivider && (
        <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-white/20" />
      )}
    </div>
  )
}

export default function StatsBar() {
  return (
    <section className="bg-[#1B3B2F]">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 sm:gap-4">
          <StatItem label="로톡 평점" end={49} suffix=" ★" isDecimal />
          <StatItem label="상담 후기" end={600} suffix="+" />
          <StatItem label="피해자 전담률" end={100} suffix="%" />
          <StaticItem value="무료" label="첫 상담" />
          <StaticItem value="A-Z" label="원스톱 변호" showDivider={false} />
        </div>
      </div>
    </section>
  )
}
