'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useConsultation } from './ConsultationProvider'

const navLinks = [
  { href: '/#centers', label: '사무실 소개' },
  { href: '/#lawyers', label: '변호사 소개' },
  { href: '/cases', label: '성공사례' },
  { href: '/directions', label: '오시는 길' },
  { href: '/blog', label: '블로그' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { openConsultation } = useConsultation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#1B3B2F]/95 backdrop-blur-sm shadow-sm'
          : 'bg-[#1B3B2F]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-sm font-medium tracking-tight text-white">
            법률사무소 로앤이
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-white/70 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => openConsultation()}
              className="bg-white text-[#1B3B2F] text-sm px-4 py-2.5 rounded-full hover:bg-white/90 transition-colors font-medium min-h-[44px]"
            >
              상담 예약
            </button>
            <button
              className="md:hidden w-11 h-11 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="메뉴 열기"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                {mobileOpen ? (
                  <path d="M5 5L17 17M17 5L5 17" stroke="white" strokeWidth="1.5" />
                ) : (
                  <>
                    <path d="M3 6H19" stroke="white" strokeWidth="1.5" />
                    <path d="M3 11H19" stroke="white" strokeWidth="1.5" />
                    <path d="M3 16H19" stroke="white" strokeWidth="1.5" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#1B3B2F] border-t border-white/10"
          >
            <nav className="px-4 py-3 flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-base text-white/70 hover:text-white hover:bg-white/5 transition-colors py-3.5 px-2 rounded-lg"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
