'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useConsultation } from './ConsultationProvider'

const navLinks = [
  { href: '/#centers', label: '우리 소개' },
  { href: '/#lawyers', label: '변호사 소개' },
  { href: '/cases', label: '성공사례' },
  { href: '/directions', label: '오시는 길' },
  { href: '/blog', label: '블로그' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { openConsultation } = useConsultation()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-sm font-medium tracking-tight text-black">
            법률사무소 로앤이
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-gray-500 hover:text-black transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => openConsultation()}
              className="bg-black text-white text-xs px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              상담 예약
            </button>
            <button
              className="md:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="메뉴 열기"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                {mobileOpen ? (
                  <path d="M5 5L15 15M15 5L5 15" stroke="black" strokeWidth="1.5" />
                ) : (
                  <>
                    <path d="M3 6H17" stroke="black" strokeWidth="1.5" />
                    <path d="M3 10H17" stroke="black" strokeWidth="1.5" />
                    <path d="M3 14H17" stroke="black" strokeWidth="1.5" />
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
            className="md:hidden bg-white border-t border-gray-100"
          >
            <nav className="px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-600 hover:text-black transition-colors"
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
