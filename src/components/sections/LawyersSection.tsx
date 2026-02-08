'use client'

import ScrollReveal from '@/components/ScrollReveal'

const lawyers = [
  {
    name: '이유림',
    role: '대표변호사',
    specialty: '성범죄피해자 전문 변호사',
    description: '끝까지 당신의 편에 서겠습니다.\n피해자의 시간 앞에서 겸허히 걷겠습니다.',
    image: '/images/lawyer-lee.jpg',
  },
  {
    name: '노채은',
    role: '대표변호사',
    specialty: '재산범죄피해자 전문 변호사',
    description: '무뎌진 언어 뒤에도 도저히 묻혀지지 않는\n마음이 있습니다.',
    image: '/images/lawyer-noh.jpg',
  },
]

export default function LawyersSection() {
  return (
    <section id="lawyers" className="py-24 sm:py-32 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.2em] text-gray-400 uppercase text-center mb-4">
            Our Lawyers
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-16">
            변호사 소개
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {lawyers.map((lawyer, i) => (
            <ScrollReveal key={lawyer.name} delay={i * 0.15}>
              <div className="text-center">
                <div className="w-full aspect-[3/4] max-w-sm mx-auto bg-gray-100 rounded-xl overflow-hidden mb-6 img-placeholder">
                  <div className="w-full h-full bg-gradient-to-b from-gray-200 to-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-black">{lawyer.name} 대표변호사</h3>
                <p className="mt-1 text-sm text-accent font-medium">{lawyer.specialty}</p>
                <p className="mt-4 text-sm text-gray-500 leading-relaxed whitespace-pre-line">
                  {lawyer.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
