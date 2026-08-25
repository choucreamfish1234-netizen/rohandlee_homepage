'use client'

import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'

export default function DirectionsContent() {
  return (
    <section className="pt-24 sm:pt-32 pb-16 sm:pb-40 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-4">Location</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black">오시는 길</h1>
          <p className="mt-5 text-gray-400 text-sm">법률사무소 로앤이를 찾아오시는 방법</p>
        </motion.div>

        {/* 지도 — 외부 링크로 대체 */}
        <ScrollReveal>
          <div className="overflow-hidden rounded-xl sm:rounded-2xl mb-8 sm:mb-12 bg-gray-100">
            <a
              href="https://map.naver.com/p/search/%EA%B2%BD%EA%B8%B0%EB%8F%84%20%EB%B6%80%EC%B2%9C%EC%8B%9C%20%EB%B6%80%EC%9D%BC%EB%A1%9C205%EB%B2%88%EA%B8%B8%2054"
              target="_blank"
              rel="noopener noreferrer"
              className="block h-[300px] sm:h-[400px] flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 transition-colors"
            >
              <div className="text-center">
                <span className="text-5xl mb-4 block">📍</span>
                <p className="text-lg font-bold text-black mb-2">경기도 부천시 부일로205번길 54, 205호</p>
                <p className="text-sm text-[#1B3B2F] font-medium">네이버 지도에서 보기 &rarr;</p>
              </div>
            </a>
          </div>
        </ScrollReveal>

        {/* 정보 카드 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <ScrollReveal delay={0.1}>
            <div className="bg-gray-50 p-8 border border-gray-100 text-center rounded-xl">
              <p className="text-2xl mb-4">📍</p>
              <h3 className="text-sm font-semibold text-black mb-3">주소</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                경기도 부천시<br />부일로205번길 54, 205호<br />
                <span className="text-xs text-gray-400">(우편번호 14544)</span>
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="bg-gray-50 p-8 border border-gray-100 text-center rounded-xl">
              <p className="text-2xl mb-4">📞</p>
              <h3 className="text-sm font-semibold text-black mb-3">연락처</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                <a href="tel:032-207-8788" className="hover:text-black transition-colors font-medium">032-207-8788</a>
              </p>
              <p className="text-sm text-gray-500 mt-1">rohetlee@naver.com</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="bg-gray-50 p-8 border border-gray-100 text-center rounded-xl">
              <p className="text-2xl mb-4">🕐</p>
              <h3 className="text-sm font-semibold text-black mb-3">상담시간</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                평일 09:00 – 18:00<br />토요일·공휴일 예약 상담
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* 교통편 상세 안내 */}
        <ScrollReveal>
          <div className="border-t border-gray-100 pt-16">
            <h2 className="text-2xl font-bold text-black text-center mb-12">교통편 안내</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="text-base font-bold text-black mb-4 flex items-center gap-2">
                  <span className="text-xl">🚇</span> 지하철
                </h3>
                <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
                  <p>
                    <span className="font-semibold text-black">7호선 부천시청역 2번 출구</span>에서 도보 약 5분 거리입니다.
                  </p>
                  <p>
                    2번 출구로 나오신 후 부일로205번길 방향으로 직진하시면 좌측에 건물이 보입니다. 205호로 올라오시면 됩니다.
                  </p>
                  <p className="text-xs text-gray-400">
                    서울역 기준 약 50분 (1호선→7호선 환승), 강남역 기준 약 1시간 소요.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="text-base font-bold text-black mb-4 flex items-center gap-2">
                  <span className="text-xl">🚌</span> 버스
                </h3>
                <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
                  <p>
                    <span className="font-semibold text-black">부천시청 정류장</span> 하차 후 도보 3분.
                  </p>
                  <p>
                    경유 노선: 12번, 23번, 37번, 83번 외 다수.<br />
                    인천·서울 방면에서 광역버스로도 접근 가능합니다.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="text-base font-bold text-black mb-4 flex items-center gap-2">
                  <span className="text-xl">🚗</span> 자가용
                </h3>
                <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
                  <p>
                    네비게이션에 <span className="font-semibold text-black">&ldquo;부천시 부일로205번길 54&rdquo;</span>를 검색하세요.
                  </p>
                  <p>
                    경인고속도로 부천IC에서 약 10분, 서울외곽순환도로 중동IC에서 약 15분 소요됩니다.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="text-base font-bold text-black mb-4 flex items-center gap-2">
                  <span className="text-xl">🅿️</span> 주차 안내
                </h3>
                <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
                  <p>
                    <span className="font-semibold text-black">건물 내 주차장</span>을 이용하실 수 있습니다.
                  </p>
                  <p>
                    상담 시 주차비를 지원해 드립니다. 방문 시 안내데스크에 주차 확인을 요청해 주세요.
                  </p>
                </div>
              </div>
            </div>

            {/* 근처 랜드마크 */}
            <div className="bg-[#1B3B2F]/5 rounded-xl p-6 border border-[#1B3B2F]/10">
              <h3 className="text-sm font-bold text-black mb-3">근처 랜드마크</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                부천시청, 부천시청역(7호선), 부천시민공원이 도보 5분 이내에 있습니다.
                부천시청역 2번 출구에서 부천시청 방향으로 걸으시면 사무소가 위치한 건물을 쉽게 찾으실 수 있습니다.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
