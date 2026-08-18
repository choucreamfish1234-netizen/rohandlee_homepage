import type { Metadata } from 'next'
import { getPageSeo } from '@/lib/seo'
import ConsultationForm from './ConsultationForm'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('/consultation', {
    title: '상담 안내',
    description: '법률사무소 로앤이 상담 안내. 성범죄·재산범죄·신체범죄·부동산·손해배상·학교폭력 등 8대 전문센터 변호사가 직접 상담합니다. 전화 032-207-8788 또는 온라인 상담.',
    ogTitle: '상담 안내 | 법률사무소 로앤이',
    ogDescription: '8대 전문센터 변호사가 직접 상담합니다. 전화 032-207-8788.',
  })
}

export default function Page() {
  return (
    <>
      <section className="pt-24 pb-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-black mb-4">법률사무소 로앤이 상담 안내</h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
            국내1호 종합 피해자 전문 로펌 법률사무소 로앤이는 성범죄, 재산범죄, 신체범죄, 부동산, 손해배상, 재산회복, 개인정보보호, 학교폭력 등 8대 전문센터를 운영하며 모든 분야의 피해자를 대리합니다.
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
              <p className="text-xs text-gray-500">032-207-8788로 전화하시면 바로 상담이 가능합니다.</p>
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
      <ConsultationForm />
    </>
  )
}
