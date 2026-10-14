'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useConsultation } from './ConsultationProvider'
import columns from '@/data/renewal-navigation.json'
import './renewal-header.css'

export default function RenewalHeader() {
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()
  const { openConsultation } = useConsultation()
  const close = () => {
    setOpen(false)
    root.current?.querySelectorAll('details').forEach(d => { d.open = false })
  }
  useEffect(() => { close() }, [pathname])
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !root.current) return
      const expanded = root.current.querySelector('details[open]')
      if (open || expanded) { close(); toggle.current?.focus() }
    }
    const outside = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) close() }
    document.addEventListener('keydown', escape)
    document.addEventListener('pointerdown', outside)
    return () => { document.removeEventListener('keydown', escape); document.removeEventListener('pointerdown', outside) }
  }, [open])
  return (
    <header className="renewal-site-header" ref={root}>
      <a className="renewal-brand" href="/"><img src="/renewal/assets/logo.svg" alt="법률사무소 로앤이" width="453" height="95" /></a>
      <button ref={toggle} type="button" className="renewal-menu" aria-expanded={open} aria-controls="renewal-navigation" onClick={() => setOpen(!open)}>{open ? '닫기 −' : '메뉴 +'}</button>
      <nav id="renewal-navigation" aria-label="주 메뉴" className={open ? 'is-open' : ''}>
        <a href="/defense">형사 사건 대응</a>
        <details className="renewal-mega"><summary>업무 분야 <span>+</span></summary><div className="renewal-mega-content">
          {columns.map((column, i) => <div className="renewal-mega-column" key={i}>{column.map((link, j) => <a className={j === 0 ? 'renewal-mega-title' : ''} href={link.href} key={link.href}>{link.label}</a>)}</div>)}
        </div></details>
        <a href="/#lawyers">변호사 소개</a>
        <a href="/centers">피해자 전문센터 ↗</a>
        <a href="/cases" aria-current={pathname === '/cases' ? 'page' : undefined}>성공사례</a>
        <a href="/blog" aria-current={pathname === '/blog' ? 'page' : undefined}>법률상식</a>
        <button className="renewal-nav-cta" type="button" aria-haspopup="dialog" onClick={() => { close(); openConsultation() }}>상담 안내 ↗</button>
      </nav>
    </header>
  )
}
