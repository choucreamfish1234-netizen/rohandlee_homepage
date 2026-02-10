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

function StatItem({ label, end, suffix, isDecimal }: {
  label: string
  end: number
  suffix: string
  isDecimal?: boolean
}) {
  const { count, ref } = useCountUp(end, 2200)

  return (
    <div className="text-center flex flex-col items-center">
      <span ref={ref} className="block text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
        {isDecimal ? (count / 10).toFixed(1) : count}
        {suffix}
      </span>
      <span className="block mt-1.5 sm:mt-2 text-[10px] sm:text-xs text-white/60">{label}</span>
    </div>
  )
}

function StaticItem({ value, label }: {
  value: string
  label: string
}) {
  return (
    <div className="text-center flex flex-col items-center">
      <span className="block text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
        {value}
      </span>
      <span className="block mt-1.5 sm:mt-2 text-[10px] sm:text-xs text-white/60">{label}</span>
    </div>
  )
}

export default function StatsBar() {
  return (
    <section style={{ background: 'linear-gradient(135deg, #1B3B2F 0%, #2d5a47 100%)' }}>
      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-10">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 sm:gap-4">
          <div className="relative">
            <StatItem label="로톡 평점" end={49} suffix="" isDecimal />
            <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-10 bg-white/15" />
          </div>
          <div className="relative">
            <StatItem label="상담 후기" end={600} suffix="+" />
            <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-10 bg-white/15" />
          </div>
          <div className="relative">
            <StatItem label="피해자 전담률" end={100} suffix="%" />
            <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-10 bg-white/15" />
          </div>
          <div className="relative">
            <StaticItem value="무료" label="첫 상담" />
            <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-10 bg-white/15" />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <StaticItem value="A-Z" label="원스톱 변호" />
          </div>
        </div>
      </div>
    </section>
  )
}
