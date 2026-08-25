import type { Metadata } from 'next'
import Link from 'next/link'
import { getPageSeo } from '@/lib/seo'
import ConsultationForm from './ConsultationForm'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('/consultation', {
    title: '상담 안내',
    description: '법률사무소 로앤이 상담 안내. 성범죄·재산범죄·신체범죄·부동산·손해배상·학교폭력 등 9대 전문센터 변호사가 직접 상담합니다. 전화 032-207-8788 또는 온라인 상담.',
    ogTitle: '상담 안내',
    ogDescription: '9대 전문센터 변호사가 직접 상담합니다. 전화 032-207-8788.',
  })
}

export default function Page() {
  return (
    <>
      <section className="pt-24 pb-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-black mb-4">법률사무소 로앤이 상담 안내</h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
            국내1호 종합 피해자 전문 로펌 법률사무소 로앤이는 성범죄, 재산범죄, 신체범죄, 부동산, 손해배상, 재산회복, 개인정보보호, 학교폭력 등 9대 전문센터를 운영하며 모든 분야의 피해자를 대리합니다.
          </p>
        </div>
      </section>

      <section className="pb-8 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm font-semibold text-black mb-1">온라인 상담</p>
              <p className="text-xs text-gray-500">아래 폼을 작성해 주시면 변호사가 직접 연락드립니다.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm font-semibold text-black mb-1">전화 상담</p>
              <p className="text-xs text-gray-500"><a href="tel:032-207-8788" className="hover:text-black transition-colors">032-207-8788</a>로 전화하시면 바로 상담이 가능합니다.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm font-semibold text-black mb-1">카카오톡 상담</p>
              <p className="text-xs text-gray-500">카카오톡 채널에서 편하게 상담을 시작하세요.</p>
            </div>
          </div>
          <p className="mt-6 text-xs text-gray-400 text-center">
            대표변호사 이유림(성범죄·스토킹·디지털성범죄)과 노채은(재산범죄·사기·부동산)이 사건을 직접 검토하고 대응 방향을 안내합니다.
          </p>
        </div>
      </section>

      <section className="pb-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-black mb-3">상담 방법</h2>
              <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
                <p>
                  전화(<a href="tel:032-207-8788" className="text-[#1B3B2F] font-medium">032-207-8788</a>), 카카오톡, 온라인 폼 세 가지 방법으로 상담을 시작할 수 있습니다. 전화와 카카오톡은 평일 오전 9시부터 오후 6시까지 운영하며, 온라인 폼은 24시간 접수 가능합니다. 접수 후 담당 변호사가 직접 연락을 드리며, 긴급한 사안의 경우 당일 내 회신을 원칙으로 합니다.
                </p>
                <p>
                  전국 어디서든 전화·화상 상담이 가능합니다. 수사기관 동행, 법원 출석이 필요한 경우에도 전국 어디든 직접 갑니다.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-black mb-3">상담 시 준비하면 좋은 것</h2>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#1B3B2F] font-bold mt-0.5">1.</span>
                  <span>사건 경위 정리 — 날짜, 시간, 장소, 상대방, 피해 내용을 시간 순서대로 정리해 주세요.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1B3B2F] font-bold mt-0.5">2.</span>
                  <span>증거 자료 — 카카오톡 캡처, 문자, 녹음 파일, 사진, CCTV, 진단서, 계약서 등 관련 자료를 준비해 주세요.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1B3B2F] font-bold mt-0.5">3.</span>
                  <span>기존 진행 상황 — 경찰 신고 여부, 고소 여부, 수사 진행 상황 등을 알려주시면 보다 정확한 안내가 가능합니다.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1B3B2F] font-bold mt-0.5">4.</span>
                  <span>원하는 결과 — 형사 처벌, 손해배상, 접근금지 등 피해자로서 원하는 방향을 말씀해 주세요.</span>
                </li>
              </ul>
              <p className="mt-3 text-xs text-gray-400">증거가 부족하더라도 상담은 가능합니다. 상담 과정에서 증거 확보 방법도 함께 안내합니다.</p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-black mb-3">9대 전문센터</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { name: '성범죄', href: '/centers/sexual-crime' },
                  { name: '재산범죄', href: '/centers/property-crime' },
                  { name: '신체범죄', href: '/centers/physical-crime' },
                  { name: '이혼·가사', href: '/centers/divorce' },
                  { name: '부동산', href: '/centers/real-estate' },
                  { name: '손해배상', href: '/centers/damages' },
                  { name: '재산회복', href: '/centers/asset-recovery' },
                  { name: '기업법무', href: '/centers/corporate' },
                  { name: '학교폭력', href: '/centers/school-violence' },
                ].map(center => (
                  <Link key={center.href} href={center.href} className="block p-3 bg-white border border-gray-100 rounded-lg text-center hover:border-[#1B3B2F]/30 transition-colors">
                    <span className="text-xs font-medium text-black">{center.name}</span>
                  </Link>
                ))}
              </div>
              <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                각 센터 전문 변호사가 사건을 직접 담당합니다. 여러 분야에 걸친 복합 피해(예: 성범죄 + 스토킹, 사기 + 폭행)도 한 팀에서 동시에 대응합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ConsultationForm />
    </>
  )
}
