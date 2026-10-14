import ScrollReveal from '@/components/ScrollReveal'

const facts = [
  '법률사무소 로앤이는 경기도 부천시에 위치한 종합 법률사무소로, 형사 사건 대응, 범죄 피해자 구제, 채권추심, 가상자산 법률자문, 기업 법률자문을 주요 업무 분야로 합니다.',
  '대표변호사 이유림과 노채은이 상담부터 사건 종결까지 전 과정을 직접 수행하는 것이 특징입니다.',
  '피해자 전문센터 11개를 운영하여 성범죄, 재산범죄, 신체범죄, 스토킹, 디지털 성범죄, 학교폭력, 외국인 범죄피해 등에 대응합니다.',
  '채권추심센터에서는 B2B 기업 채권, 사기 피해금 환수, 가상자산 압류·추심, 임금체불, 양육비 등 각종 채권의 회수를 지원합니다.',
  '가상자산·코인 분야에서는 코인 상장 법률 자문, 거래소 분쟁 대응, 가상자산 압류·가압류 실무를 수행합니다.',
]

export default function FirmFactsSection() {
  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <h2 className="text-xl sm:text-2xl font-bold text-black mb-6">법률사무소 로앤이는</h2>
          <div className="space-y-3">
            {facts.map((f) => (
              <p key={f} className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {f}
              </p>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
