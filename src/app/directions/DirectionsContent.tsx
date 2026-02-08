'use client'

import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'

export default function DirectionsContent() {
  return (
    <section className="pt-32 pb-28 sm:pb-40 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-4">
            Location
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-black">
            오시는 길
          </h1>
          <p className="mt-5 text-gray-400 text-sm">
            법률사무소 로앤이를 찾아오시는 방법
          </p>
        </motion.div>

        {/* 네이버 지도 */}
        <ScrollReveal>
          <div className="overflow-hidden rounded-2xl mb-12">
            <iframe
              src="https://map.naver.com/p/search/%EA%B2%BD%EA%B8%B0%EB%8F%84%20%EB%B6%80%EC%B2%9C%EC%8B%9C%20%EB%B6%80%EC%9D%BC%EB%A1%9C205%EB%B2%88%EA%B8%B8%2054"
              width="100%"
              height="500"
              style={{ border: 0, borderRadius: '16px' }}
              allowFullScreen
              loading="lazy"
              title="법률사무소 로앤이 위치"
            />
          </div>
        </ScrollReveal>

        {/* 정보 카드 3개 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20">
          <ScrollReveal delay={0.1}>
            <div className="bg-gray-50 p-8 border border-gray-100 text-center">
              <p className="text-2xl mb-4">📍</p>
              <h3 className="text-sm font-semibold text-black mb-3">주소</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                경기도 부천시<br />
                부일로205번길 54, 205호
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="bg-gray-50 p-8 border border-gray-100 text-center">
              <p className="text-2xl mb-4">📞</p>
              <h3 className="text-sm font-semibold text-black mb-3">연락처</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                <a href="tel:055-261-8788" className="hover:text-black transition-colors">055-261-8788</a>
                <br />
                <a href="mailto:roandlee@roandlee.com" className="hover:text-black transition-colors">roandlee@roandlee.com</a>
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="bg-gray-50 p-8 border border-gray-100 text-center">
              <p className="text-2xl mb-4">🕐</p>
              <h3 className="text-sm font-semibold text-black mb-3">상담시간</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                평일 09:00 - 18:00
                <br />
                토요일·공휴일 예약 상담
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* 교통편 안내 */}
        <ScrollReveal>
          <div className="border-t border-gray-100 pt-16">
            <h2 className="font-serif text-2xl font-bold text-black text-center mb-12">
              교통편 안내
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
              <div>
                <h3 className="text-sm font-semibold text-black mb-3">🚇 지하철</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  7호선 부천시청역 2번 출구<br />
                  도보 약 5분
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-black mb-3">🚌 버스</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  부천시청 정류장 하차<br />
                  12, 23, 37, 83번 외 다수
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-black mb-3">🅿️ 주차</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  건물 내 주차 가능<br />
                  상담 시 주차비 지원
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
