'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

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
  const { count, ref } = useCountUp(end, 2000)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="text-center"
    >
      <span ref={ref} className="block text-3xl font-semibold text-gray-900 tracking-tight">
        {isDecimal ? (count / 10).toFixed(1) : count}{suffix}
      </span>
      <span className="block mt-2 text-sm text-gray-500">{label}</span>
    </motion.div>
  )
}

function StaticItem({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="text-center"
    >
      <span className="block text-3xl font-semibold text-gray-900 tracking-tight">{value}</span>
      <span className="block mt-2 text-sm text-gray-500">{label}</span>
    </motion.div>
  )
}

export default function StatsBar() {
  return (
    <section className="bg-[#FAFAFA]">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <StatItem label="로톡 평점" end={49} suffix="" isDecimal />
          <StatItem label="상담 후기" end={600} suffix="+" />
          <StatItem label="피해자 전담" end={100} suffix="%" />
          <StaticItem value="A-Z" label="원스톱 변호" />
        </div>
      </div>
    </section>
  )
}
