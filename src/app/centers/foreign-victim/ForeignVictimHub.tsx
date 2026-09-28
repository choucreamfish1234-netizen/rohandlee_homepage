'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'
import { useConsultation } from '@/components/ConsultationProvider'
import { type Locale, localeNames, buildLocalePath } from '@/lib/i18n'
import ko from '@/lib/i18n/locales/ko.json'
import en from '@/lib/i18n/locales/en.json'
import zh from '@/lib/i18n/locales/zh.json'
import vi from '@/lib/i18n/locales/vi.json'

const translations: Record<string, typeof ko> = { ko, en, zh, vi }

export default function ForeignVictimHub({ locale }: { locale: Locale }) {
  const t = translations[locale] || ko
  const { openConsultation } = useConsultation()

  return (
    <>
      {/* Language Switcher */}
      <div className="bg-[#1B3B2F] text-white py-2">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-end gap-3 text-xs">
          <span className="text-white/50">🌐</span>
          {(['ko', 'en', 'zh', 'vi'] as Locale[]).map(l => (
            <Link
              key={l}
              href={buildLocalePath(l, '')}
              className={`px-2 py-1 rounded transition-colors ${locale === l ? 'bg-white/20 font-bold' : 'hover:bg-white/10'}`}
            >
              {localeNames[l]}
            </Link>
          ))}
        </div>
      </div>

      {/* Hero */}
      <section className="min-h-[55vh] flex flex-col items-center justify-center px-5 bg-[#FAFAFA]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1B3B2F]/5 border border-[#1B3B2F]/10 mb-6">
            <span className="text-[10px] font-semibold tracking-wider text-[#1B3B2F]">🌐 {t.hero.badge}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-black leading-tight">
            {t.hero.title}
          </h1>
          <p className="mt-6 text-sm sm:text-base text-gray-500 leading-relaxed max-w-xl mx-auto whitespace-pre-line">
            {t.hero.subtitle}
          </p>
          <p className="mt-3 text-xs text-[#1B3B2F] font-medium">{t.hero.stats}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => openConsultation('외국인 범죄피해 상담')}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#1B3B2F] text-white text-sm font-medium rounded-full hover:bg-[#153126] transition-colors min-h-[48px]"
            >
              {t.hero.cta}
            </button>
            <a
              href="tel:032-207-8788"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-[#1B3B2F]/20 text-[#1B3B2F] text-sm font-medium rounded-full hover:bg-[#1B3B2F]/5 transition-colors min-h-[48px]"
            >
              {t.hero.phone}
            </a>
          </div>
        </motion.div>
      </section>

      {/* Fears Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-12">{t.fears.title}</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.fears.items.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="bg-red-50 border border-red-100 rounded-xl p-5 text-center h-full">
                  <p className="text-sm font-medium text-red-800">{item}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={0.5}>
            <div className="mt-8 bg-[#1B3B2F] rounded-xl p-5 text-center">
              <p className="text-white text-sm font-semibold leading-relaxed">{t.fears.truth}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Crime Types Grid */}
      <section className="py-16 sm:py-24 bg-[#FAFAFA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-12">{t.crimeTypes.title}</h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {t.crimeTypes.items.map((item, i) => (
              <ScrollReveal key={item.slug} delay={i * 0.08}>
                <Link
                  href={buildLocalePath(locale, `/${item.slug}`)}
                  className="block bg-white border border-gray-100 rounded-xl p-6 text-center hover:border-[#1B3B2F]/30 hover:shadow-md transition-all h-full"
                >
                  <span className="text-3xl block mb-3">{item.icon}</span>
                  <span className="text-sm font-bold text-black">{item.title}</span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Ro&Lee */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-12">{t.whyRohandlee.title}</h2>
          </ScrollReveal>
          <div className="space-y-5">
            {t.whyRohandlee.blocks.map((block, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 sm:p-8">
                  <h3 className="text-base sm:text-lg font-bold text-black mb-3">{block.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{block.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 sm:py-24 bg-[#1B3B2F] text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold mb-8">{t.contact.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <a href="tel:032-207-8788" className="block bg-white/10 rounded-xl p-5 hover:bg-white/20 transition-colors">
                <p className="text-lg font-bold">📞</p>
                <p className="text-sm font-medium mt-2">{t.contact.phone}</p>
              </a>
              <a href="mailto:rohetlee@naver.com" className="block bg-white/10 rounded-xl p-5 hover:bg-white/20 transition-colors">
                <p className="text-lg font-bold">📧</p>
                <p className="text-sm font-medium mt-2">{t.contact.email}</p>
              </a>
              <Link href="/consultation" className="block bg-white/10 rounded-xl p-5 hover:bg-white/20 transition-colors">
                <p className="text-lg font-bold">💬</p>
                <p className="text-sm font-medium mt-2">{t.contact.form}</p>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Guides */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-12">{t.guides.title}</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {t.guides.items.map((guide, i) => (
              <ScrollReveal key={guide.slug} delay={i * 0.1}>
                <Link
                  href={buildLocalePath(locale, `/guide/${guide.slug}`)}
                  className="block bg-white border border-gray-100 rounded-xl p-6 hover:border-[#1B3B2F]/30 transition-colors text-center"
                >
                  <span className="text-sm font-bold text-black">{guide.title}</span>
                  <span className="block mt-2 text-xs text-[#1B3B2F]">&rarr;</span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* GEO */}
      <p className="sr-only">{t.geo}</p>
    </>
  )
}
