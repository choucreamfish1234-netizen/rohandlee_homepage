'use client'

import { useState } from 'react'
import Link from 'next/link'
import { type Locale, localeNames, buildLocalePath } from '@/lib/i18n'
import Breadcrumb from '@/components/Breadcrumb'
import {
  crimeTypeContent,
  guideContent,
  type SubPageContent,
} from '@/lib/i18n/foreign-victim-content'
import ko from '@/lib/i18n/locales/ko.json'
import en from '@/lib/i18n/locales/en.json'
import zh from '@/lib/i18n/locales/zh.json'
import vi from '@/lib/i18n/locales/vi.json'

const translations: Record<string, typeof ko> = { ko, en, zh, vi }

interface ForeignVictimSubPageProps {
  locale: Locale
  slug: string
  type: 'crime' | 'guide'
}

export default function ForeignVictimSubPage({ locale, slug, type }: ForeignVictimSubPageProps) {
  const t = translations[locale] || ko

  // Get content for this page
  const contentMap = type === 'crime' ? crimeTypeContent : guideContent
  const content: SubPageContent | undefined = contentMap[slug]?.[locale]

  const crimeItems = t.crimeTypes.items
  const guideItems = t.guides.items

  const currentLabel = type === 'crime'
    ? crimeItems.find(c => c.slug === slug)?.title || slug
    : guideItems.find(g => g.slug === slug)?.title || slug

  // Breadcrumb items
  const breadcrumbItems = type === 'crime'
    ? [
        { name: locale === 'ko' ? '홈' : locale === 'zh' ? '首页' : locale === 'vi' ? 'Trang chủ' : 'Home', href: '/' },
        { name: t.hero.badge, href: buildLocalePath(locale, '') },
        { name: currentLabel },
      ]
    : [
        { name: locale === 'ko' ? '홈' : locale === 'zh' ? '首页' : locale === 'vi' ? 'Trang chủ' : 'Home', href: '/' },
        { name: t.hero.badge, href: buildLocalePath(locale, '') },
        { name: t.guides.title, href: buildLocalePath(locale, '') },
        { name: currentLabel },
      ]

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  if (!content) {
    return <div className="py-20 text-center text-gray-500">Content not found.</div>
  }

  // CTA labels by locale
  const ctaLabels: Record<string, { phone: string; consult: string }> = {
    ko: { phone: '032-207-8788 전화 상담', consult: '상담 신청하기' },
    en: { phone: 'Call 032-207-8788', consult: 'Request a Consultation' },
    zh: { phone: '电话咨询 032-207-8788', consult: '申请咨询' },
    vi: { phone: 'Gọi 032-207-8788', consult: 'Yêu cầu Tư vấn' },
  }

  const cta = ctaLabels[locale] || ctaLabels.ko

  return (
    <>
      {/* Language Switcher */}
      <div className="bg-[#1B3B2F] text-white py-2">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-end gap-3 text-xs">
          <span className="text-white/50">🌐</span>
          {(['ko', 'en', 'zh', 'vi'] as Locale[]).map(l => {
            const targetHref = type === 'crime'
              ? buildLocalePath(l, `/${slug}`)
              : buildLocalePath(l, `/guide/${slug}`)
            return (
              <Link
                key={l}
                href={targetHref}
                className={`px-2 py-1 rounded transition-colors ${locale === l ? 'bg-white/20 font-bold' : 'hover:bg-white/10'}`}
              >
                {localeNames[l]}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Hero / H1 */}
      <section className="py-12 sm:py-16 bg-[#FAFAFA]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black leading-tight">
            {content.title}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-500 leading-relaxed">
            {content.subtitle}
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {content.sections.map((section, i) => (
            <div key={i}>
              <h2 className="text-lg sm:text-xl font-bold text-black mb-4 leading-snug">
                {section.heading}
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-12 sm:py-16 bg-[#FAFAFA]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-black mb-8 text-center">
            {locale === 'ko' ? '자주 묻는 질문' : locale === 'zh' ? '常见问题' : locale === 'vi' ? 'Câu hỏi thường gặp' : 'Frequently Asked Questions'}
          </h2>
          <div className="space-y-3">
            {content.faq.map((item, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4"
                  aria-expanded={openFaq === i}
                >
                  <span className="text-sm font-semibold text-black">{item.q}</span>
                  <span className="text-gray-400 text-lg flex-shrink-0">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4">
                    <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 bg-[#1B3B2F] text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-6">{t.contact.title}</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:032-207-8788"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-white/30 text-white text-sm font-medium rounded-full hover:bg-white/10 transition-colors min-h-[48px]"
            >
              {cta.phone}
            </a>
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-[#1B3B2F] text-sm font-medium rounded-full hover:bg-gray-100 transition-colors min-h-[48px]"
            >
              {cta.consult}
            </Link>
          </div>
        </div>
      </section>

      {/* Sibling Navigation */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Crime Types */}
          <h3 className="text-base sm:text-lg font-bold text-black mb-4">{t.crimeTypes.title}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
            {crimeItems.map(item => {
              const isActive = type === 'crime' && item.slug === slug
              return (
                <Link
                  key={item.slug}
                  href={buildLocalePath(locale, `/${item.slug}`)}
                  className={`block text-center border rounded-xl px-4 py-3 text-sm transition-all ${
                    isActive
                      ? 'bg-[#1B3B2F] text-white border-[#1B3B2F]'
                      : 'bg-white border-gray-100 text-black hover:border-[#1B3B2F]/30 hover:shadow-sm'
                  }`}
                >
                  <span className="text-lg block mb-1">{item.icon}</span>
                  <span className="font-medium">{item.title}</span>
                </Link>
              )
            })}
          </div>

          {/* Guides */}
          <h3 className="text-base sm:text-lg font-bold text-black mb-4">{t.guides.title}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {guideItems.map(guide => {
              const isActive = type === 'guide' && guide.slug === slug
              return (
                <Link
                  key={guide.slug}
                  href={buildLocalePath(locale, `/guide/${guide.slug}`)}
                  className={`block text-center border rounded-xl px-4 py-3 text-sm transition-all ${
                    isActive
                      ? 'bg-[#1B3B2F] text-white border-[#1B3B2F]'
                      : 'bg-white border-gray-100 text-black hover:border-[#1B3B2F]/30 hover:shadow-sm'
                  }`}
                >
                  <span className="font-medium">{guide.title}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* sr-only GEO text */}
      <p className="sr-only">{content.geo}</p>
    </>
  )
}
