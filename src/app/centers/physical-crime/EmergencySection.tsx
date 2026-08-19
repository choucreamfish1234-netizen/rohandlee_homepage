'use client'

import ScrollReveal from '@/components/ScrollReveal'

export default function EmergencySection() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="bg-red-50 border border-red-200/50 rounded-xl p-6 sm:p-8 text-center">
            <span className="text-3xl mb-4 block">🚨</span>
            <h2 className="text-xl sm:text-2xl font-bold text-red-800 mb-6">지금 위험한 상황이라면, 즉시 연락하세요</h2>
            <div className="space-y-4">
              <a href="tel:112" className="block bg-white rounded-lg p-4 border border-red-100 hover:border-red-300 transition-colors">
                <p className="text-lg font-bold text-red-700">📞 경찰 112</p>
                <p className="text-sm text-gray-600">스토킹·폭행 긴급 신고</p>
              </a>
              <a href="tel:1366" className="block bg-white rounded-lg p-4 border border-red-100 hover:border-red-300 transition-colors">
                <p className="text-lg font-bold text-red-700">📞 여성긴급전화 1366</p>
                <p className="text-sm text-gray-600">24시간 상담, 긴급 피난처 연계</p>
              </a>
              <a href="tel:032-207-8788" className="block bg-white rounded-lg p-4 border border-[#1B3B2F]/20 hover:border-[#1B3B2F]/50 transition-colors">
                <p className="text-lg font-bold text-[#1B3B2F]">📞 법률사무소 로앤이 032-207-8788</p>
                <p className="text-sm text-gray-600">법적 대응 상담</p>
              </a>
            </div>
            <p className="mt-6 text-sm text-gray-500">안전이 확보된 후, 법적 대응을 시작해도 늦지 않습니다.</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
