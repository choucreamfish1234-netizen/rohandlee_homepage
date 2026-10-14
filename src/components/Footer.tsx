'use client'

import Link from 'next/link'
import { EditableText } from '@/components/Editable'
import { defenseNav, victimNav, collectionNav, cryptoNav, businessNav } from '@/data/practice/nav'

const linkColumns = [defenseNav, victimNav, collectionNav, cryptoNav, businessNav]

export default function Footer() {
  return (
    <footer id="location" className="bg-[#F6F2EA] border-t border-[#1C1C1A]/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <div className="mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 pb-10 border-b border-[#1C1C1A]/15">
          <div>
            <p className="font-serif text-3xl sm:text-4xl font-semibold text-[#1C1C1A]">ROH&amp;LEE</p>
            <p className="mt-2 text-sm text-[#1C1C1A]/60">법률사무소 로앤이 — 사건의 시작부터 끝까지</p>
          </div>
          <a href="tel:+82322078788" className="font-serif text-2xl sm:text-3xl text-[#1B3B2F] hover:text-[#B8955A] transition-colors">032-207-8788</a>
        </div>
        {/* 분야별 링크 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10">
          {linkColumns.map((col) => (
            <div key={col.href}>
              <h4 className="font-serif text-sm font-semibold text-[#1C1C1A] mb-4">
                <Link href={col.href} className="hover:text-[#1B3B2F] transition-colors">
                  {col.label}
                </Link>
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-xs text-[#1C1C1A]/60 hover:text-black transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-10 border-t border-[#1C1C1A]/15 grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* 사무소 정보 */}
          <div>
            <h3 className="text-sm font-semibold text-black mb-4">법률사무소 로앤이</h3>
            <p className="text-xs text-[#1C1C1A]/60 leading-relaxed">
              형사 사건 대응 · 피해 구제 · 채권 회수 · 가상자산 · 기업 자문<br />
              대표변호사가 직접 상담하고, 사건을 수행합니다.
            </p>
            <ul className="mt-4 space-y-2 text-xs text-[#1C1C1A]/60">
              <li><Link href="/cases" className="hover:text-black transition-colors">대응 사례</Link></li>
              <li><Link href="/lawyers" className="hover:text-black transition-colors">변호사 소개</Link></li>
              <li><Link href="/blog" className="hover:text-black transition-colors">블로그</Link></li>
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <h4 className="text-xs font-semibold text-black mb-4">연락처</h4>
            <ul className="space-y-2 text-xs text-[#1C1C1A]/60">
              <li>
                <a href="tel:032-207-8788" className="hover:text-black transition-colors">
                  T. 032-207-8788
                </a>
              </li>
              <li>
                <a href="mailto:rohetlee@naver.com" className="hover:text-black transition-colors">
                  E. rohetlee@naver.com
                </a>
              </li>
              <li>
                <a
                  href="https://pf.kakao.com/_YxgWxcn/chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-black transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 28 28" fill="none">
                    <path
                      d="M14 4C8.477 4 4 7.477 4 11.667c0 2.7 1.737 5.067 4.36 6.433-.14.507-.9 3.267-.933 3.5 0 0-.02.167.087.233.107.067.233.033.233.033.307-.043 3.56-2.327 4.12-2.733.7.1 1.413.2 2.133.2 5.523 0 10-3.477 10-7.667S19.523 4 14 4z"
                      fill="currentColor"
                    />
                  </svg>
                  카카오톡 상담
                </a>
              </li>
              <li>
                <EditableText
                  page="home"
                  section="footer"
                  fieldKey="hours"
                  defaultValue="평일 09:00 - 18:00"
                  tag="span"
                />
              </li>
              <li>토요일·공휴일 예약 상담</li>
            </ul>
          </div>

          {/* 주소 */}
          <div>
            <h4 className="text-xs font-semibold text-black mb-4">오시는 길</h4>
            <EditableText
              page="home"
              section="footer"
              fieldKey="address"
              defaultValue="경기도 부천시 부일로205번길 54, 205호"
              tag="p"
              className="text-xs text-[#1C1C1A]/60 leading-relaxed"
            />
            <Link href="/directions" className="inline-block mt-3 text-xs text-[#1C1C1A]/60 hover:text-black transition-colors">
              오시는 길 안내 &rarr;
            </Link>
          </div>

          {/* 상담 */}
          <div>
            <h4 className="text-xs font-semibold text-black mb-4">상담 신청</h4>
            <p className="text-xs text-[#1C1C1A]/60 leading-relaxed">대표변호사가 직접 상담합니다.</p>
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center mt-4 px-6 py-3 bg-[#1B3B2F] text-white text-xs font-semibold tracking-wide hover:bg-[#152f25] transition-colors"
            >
              상담 신청하기
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#1C1C1A]/15 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#1C1C1A]/45">
            © {new Date().getFullYear()} 법률사무소 로앤이. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-[#1C1C1A]/45">
            <Link href="/privacy" className="hover:text-black transition-colors">개인정보처리방침</Link>
            <Link href="/terms" className="hover:text-black transition-colors">이용약관</Link>
            <a href="https://akpul.co.kr" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">악플닷컴</a>
          </div>
          <div className="flex gap-3 text-xs text-[#1C1C1A]/45">
            <Link href="/en/foreign-victim" className="hover:text-black transition-colors">English</Link>
            <Link href="/zh/foreign-victim" className="hover:text-black transition-colors">中文</Link>
            <Link href="/vi/foreign-victim" className="hover:text-black transition-colors">Tiếng Việt</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
