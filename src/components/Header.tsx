'use client'

import { useState, useEffect } from 'react'
import RenewalHeader from './RenewalHeader'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useConsultation } from './ConsultationProvider'
import { defenseNav, cryptoNav, victimCenters } from '@/data/practice/nav'

interface NavChild {
  href: string
  label: string
}

interface NavItem {
  href: string
  label: string
  children?: NavChild[]
}

const navItems: NavItem[] = [
  { href: '/', label: '홈' },
  {
    href: '/defense',
    label: '형사사건대응',
    children: defenseNav.links,
  },
  { href: '/centers', label: '피해자센터', children: victimCenters },
  { href: '/collection', label: '채권추심' },
  {
    href: '/crypto',
    label: '코인·가상자산',
    children: cryptoNav.links,
  },
  { href: '/business', label: '기업자문' },
  { href: '/cases', label: '대응사례' },
  { href: '/lawyers', label: '변호사소개' },
  { href: '/consultation', label: '상담신청' },
]

const mobileExtras: NavChild[] = [
  { href: '/blog', label: '법률상식' },
  { href: '/directions', label: '오시는 길' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openSection, setOpenSection] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const { openConsultation } = useConsultation()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setOpenSection(null)
  }, [pathname])

  if (pathname === '/cases' || pathname.startsWith('/cases/') || pathname === '/blog' || pathname.startsWith('/blog/')) return <RenewalHeader />

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
          <Link href="/" className="flex items-baseline gap-2 text-white flex-shrink-0">
            <span className="font-serif text-lg font-semibold tracking-wide">ROH&amp;LEE</span>
            <span className="text-[11px] text-white/60 tracking-tight lg:hidden xl:inline">법률사무소 로앤이</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 h-full" aria-label="주 메뉴">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.href} className="relative group h-full flex items-center">
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 text-[13px] text-white/75 hover:text-white group-hover:text-white transition-colors"
                    aria-haspopup="true"
                  >
                    {item.label}
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                  </Link>
                  <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-opacity duration-200 absolute top-full left-1/2 -translate-x-1/2 pt-0">
                    <div className="bg-[#F6F2EA] shadow-2xl border-t-2 border-[#B8955A] p-4 w-[440px]">
                      <ul className="grid grid-cols-2 gap-x-2">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block text-[13px] text-[#1C1C1A]/75 hover:text-[#1B3B2F] hover:bg-white px-3 py-2 transition-colors"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={item.href}
                        className="mt-3 block text-center text-xs font-semibold tracking-wide text-[#1B3B2F] border-t border-[#1B3B2F]/10 pt-3 pb-1 hover:text-[#B8955A] transition-colors"
                      >
                        {item.label} 전체 보기 &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[13px] text-white/75 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => openConsultation()}
              className="bg-[#F6F2EA] text-[#1B3B2F] text-[13px] px-4 sm:px-5 py-2.5 hover:bg-white transition-colors font-semibold tracking-wide min-h-[44px]"
            >
              상담 예약
            </button>
            <button
              className="lg:hidden w-11 h-11 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? '메뉴 닫기' : '메뉴 열기'}
              aria-expanded={mobileOpen}
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
            className="lg:hidden bg-[#1B3B2F] border-t border-white/10 max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            <nav className="px-4 py-3 flex flex-col" aria-label="모바일 메뉴">
              {navItems.map((item) =>
                item.children ? (
                  <div key={item.href}>
                    <button
                      type="button"
                      onClick={() => setOpenSection(openSection === item.href ? null : item.href)}
                      className="w-full flex items-center justify-between text-base text-white/70 hover:text-white hover:bg-white/5 transition-colors py-3.5 px-2 rounded-lg"
                      aria-expanded={openSection === item.href}
                    >
                      {item.label}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 10 10"
                        fill="none"
                        className={`transition-transform ${openSection === item.href ? 'rotate-180' : ''}`}
                        aria-hidden
                      >
                        <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.2" />
                      </svg>
                    </button>
                    <AnimatePresence initial={false}>
                      {openSection === item.href && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden pl-3 pb-2"
                        >
                          <li>
                            <Link
                              href={item.href}
                              className="block text-sm font-medium text-[#B8955A] py-2.5 px-2"
                              onClick={() => setMobileOpen(false)}
                            >
                              {item.label} 전체 보기
                            </Link>
                          </li>
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className="block text-sm text-white/60 hover:text-white py-2.5 px-2"
                                onClick={() => setMobileOpen(false)}
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-base text-white/70 hover:text-white hover:bg-white/5 transition-colors py-3.5 px-2 rounded-lg"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              )}
              <div className="mt-2 pt-2 border-t border-white/10 flex gap-4 px-2">
                {mobileExtras.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white py-3"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
