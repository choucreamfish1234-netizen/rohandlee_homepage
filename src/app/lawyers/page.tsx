import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getPageSeo } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('/lawyers', {
    title: '변호사 소개',
    description: '법률사무소 로앤이 대표변호사 이유림·노채은을 소개합니다. 성범죄·재산범죄·신체범죄 피해자 전문.',
    ogTitle: '변호사 소개',
    ogDescription: '법률사무소 로앤이 대표변호사 이유림·노채은',
  })
}

const lawyers = [
  {
    name: '이유림',
    role: '대표변호사',
    specialty: '성범죄·디지털성범죄·명예훼손 피해자 전문',
    desc: '《피해자 감별사회》 공동저자 · 《진심의 무게》 개발자',
    image: '/images/lawyers/lawyer-lee.svg',
    href: '/lawyers/lee-yurim',
  },
  {
    name: '노채은',
    role: '대표변호사',
    specialty: '사기·횡령·배임·보이스피싱 피해자 전문',
    desc: '《피해자 감별사회》 공동저자',
    image: '/images/lawyers/lawyer-noh.svg',
    href: '/lawyers/roh-chaeeun',
  },
]

export default function Page() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-3">Attorneys</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-black">변호사 소개</h1>
          <p className="mt-4 text-gray-500 text-sm">
            법률사무소 로앤이는 피해자만을 대리합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {lawyers.map(lawyer => (
            <Link key={lawyer.href} href={lawyer.href} className="group block">
              <div className="bg-white border border-gray-100 rounded-2xl p-8 hover:border-[#1B3B2F]/20 hover:shadow-lg transition-all duration-300 text-center h-full">
                <div className="w-28 h-28 mx-auto mb-6 rounded-full overflow-hidden bg-gray-100">
                  <Image
                    src={lawyer.image}
                    alt={`${lawyer.name} 변호사`}
                    width={112}
                    height={112}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs text-[#1B3B2F] font-medium tracking-wide uppercase mb-1">{lawyer.role}</p>
                <h2 className="text-xl font-bold text-black group-hover:text-[#1B3B2F] transition-colors">{lawyer.name}</h2>
                <p className="mt-2 text-sm text-gray-600">{lawyer.specialty}</p>
                <p className="mt-1 text-xs text-gray-400">{lawyer.desc}</p>
                <span className="inline-block mt-4 text-sm text-[#1B3B2F] font-medium">프로필 보기 &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
