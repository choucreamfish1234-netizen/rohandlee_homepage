import type { Metadata } from 'next'
import { getPageSeo } from '@/lib/seo'
import ConsultationForm from './ConsultationForm'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('/consultation', {
    title: '상담 안내',
    description: '법률사무소 로앤이 상담 안내. 성범죄·재산범죄·신체범죄·부동산·손해배상·학교폭력 등 11대 전문센터 변호사가 직접 상담합니다. 전화 032-207-8788 또는 온라인 상담.',
    ogTitle: '상담 안내',
    ogDescription: '11대 전문센터 변호사가 직접 상담합니다. 전화 032-207-8788.',
  })
}

export default function Page() {
  return (
    <>
      <section className="pt-24 pb-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-black mb-4">법률사무소 로앤이 상담 안내</h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
            개인의 사건부터 기업의 계약과 분쟁까지. 문의 내용을 남겨주시거나 원하시는 일정에 전화·방문 상담을 예약해주세요.
          </p>
        </div>
      </section>

      <section className="pb-8 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <a href="#inquiry" className="p-5 bg-[#f6f5f0] rounded-xl"><strong className="block text-[#243b2d] mb-2">문의하기</strong><span className="text-sm text-gray-600">사건내용을 남겨주세요</span></a>
            <a href="https://www.latpeed.com/products/vy4Pu" target="_blank" rel="noopener noreferrer" className="p-5 bg-[#243b2d] text-white rounded-xl"><strong className="block mb-2">상담예약하기 ↗</strong><span className="text-sm">전화상담, 방문상담을 원하시는 일정에 예약하세요</span></a>
            <a href="https://pf.kakao.com/_YxgWxcn/chat" target="_blank" rel="noopener noreferrer" className="p-5 bg-[#FEE500] text-[#191919] rounded-xl"><strong className="block mb-2">기타 문의 · 카카오톡 ↗</strong><span className="text-sm">기타 문의는 카카오톡으로 문의해주세요.</span></a>
          </div>

        </div>
      </section>

      <div id="inquiry" className="scroll-mt-24"><ConsultationForm /></div>
    </>
  )
}
