import Link from 'next/link'

export default function Footer() {
  return (
    <footer id="location" className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* 사무소 정보 */}
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold text-black mb-4">법률사무소 로앤이</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              오직 피해자만 변호합니다.<br />
              끝까지 함께하는 법률 파트너
            </p>
          </div>

          {/* 전문센터 */}
          <div>
            <h4 className="text-xs font-semibold text-black mb-4">전문센터</h4>
            <ul className="space-y-2">
              {[
                { href: '/centers/sexual-crime', label: '성범죄 피해 전문센터' },
                { href: '/centers/property-crime', label: '재산범죄 피해 전문센터' },
                { href: '/centers/bankruptcy', label: '회생·파산 전문센터(리셋)' },
                { href: '/centers/corporate', label: '기업경영 법무센터' },
                { href: '/centers/it-security', label: 'IT보안 법률센터' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs text-gray-500 hover:text-black transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <h4 className="text-xs font-semibold text-black mb-4">연락처</h4>
            <ul className="space-y-2 text-xs text-gray-500">
              <li>
                <a href="tel:055-261-8788" className="hover:text-black transition-colors">
                  T. 055-261-8788
                </a>
              </li>
              <li>
                <a href="mailto:roandlee@roandlee.com" className="hover:text-black transition-colors">
                  E. roandlee@roandlee.com
                </a>
              </li>
              <li>평일 09:00 - 18:00</li>
              <li>토요일·공휴일 예약 상담</li>
            </ul>
          </div>

          {/* 주소 */}
          <div>
            <h4 className="text-xs font-semibold text-black mb-4">오시는 길</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              부산광역시 연제구 법원로13번길 24 3층<br />
              (부산가정법원 앞)
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} 법률사무소 로앤이. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-gray-400">
            <Link href="/privacy" className="hover:text-black transition-colors">개인정보처리방침</Link>
            <Link href="/terms" className="hover:text-black transition-colors">이용약관</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
