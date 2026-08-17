'use client'

import ScrollReveal from '@/components/ScrollReveal'

const stats = [
  { value: '18건', label: '100명 신고 시 실형', color: 'text-red-600' },
  { value: '5%', label: '성범죄 무죄율', color: 'text-red-600' },
  { value: '1.4%', label: '무고죄 유죄율', color: 'text-[#1B3B2F]' },
]

export default function VictimSocietySection() {
  return (
    <section className="py-28 sm:py-40 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">
            Authority
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-12">
            우리는 &lsquo;피해자 감별사회&rsquo;에서 살고 있습니다
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="text-base text-gray-700 leading-8 space-y-5">
            <p className="text-lg font-medium text-black">
              &ldquo;변호사님, 저는 정말 피해자가 맞나요?&rdquo;
            </p>
            <p>이유림 변호사가 상담실에서 가장 많이 듣는 질문입니다.</p>
            <p className="text-gray-500 text-sm leading-7">
              성폭력을 당하고도 자신이 피해자인지 의심하는 사람들.<br />
              인터넷에서 &ldquo;유죄추정 사회&rdquo;라는 말을 보고 신고를 포기하는 사람들.<br />
              &ldquo;그 사람 인생은 생각 안 해요?&rdquo;라는 말에 죄책감을 느끼는 사람들.
            </p>
            <p>
              이유림·노채은 변호사는 이 구조적 문제를 박영사 베스트셀러<br className="hidden sm:inline" />
              《피해자 감별사회: 법정은 왜 피해자를 의심하는가》에서 분석했습니다.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-10 bg-[#f8faf9] border border-gray-100 rounded-2xl p-8">
            <p className="text-sm font-semibold text-[#1B3B2F] mb-6">《피해자 감별사회》가 밝힌 현실</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
              {stats.map(s => (
                <div key={s.label} className="text-center">
                  <p className={`text-2xl sm:text-3xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 bg-[#1B3B2F] rounded-full flex-shrink-0" />
                성폭력 신고 32,824건 중 기소는 13,284건(40.5%), 불기소 59.5%
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 bg-[#1B3B2F] rounded-full flex-shrink-0" />
                &ldquo;성범죄 무고가 80%&rdquo;라는 주장의 실체: 실제 무고죄 유죄율 1.4%, 성범죄 허위신고 기소율 0.78%
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 bg-[#1B3B2F] rounded-full flex-shrink-0" />
                성폭력 피해자 70%가 동결반응(freeze), 42%가 사후에도 가해자와 관계 지속(트라우마 본딩)
              </li>
            </ul>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <p className="mt-10 text-base text-gray-700 leading-8">
            법정이 피해자를 의심하는 구조를 아는 변호사가,<br className="hidden sm:inline" />
            그 의심을 정면으로 반박하는 변호를 합니다.
          </p>
          <p className="mt-4 text-sm text-gray-500">
            법률사무소 로앤이의 이유림 변호사는 박영사 베스트셀러 《피해자 감별사회》의 공동저자로, 수사와 재판에서 피해자가 겪는 구조적 불합리를 분석하고 이를 실무에서 직접 반박하는 변호를 수행한다.
          </p>
          <div className="mt-6">
            <a
              href="https://product.kyobobook.co.kr/detail/S000220843163"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#1B3B2F] font-medium hover:underline"
            >
              《피해자 감별사회》 더 알아보기 &rarr;
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
