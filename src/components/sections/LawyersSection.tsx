'use client'

import Image from 'next/image'
import ScrollReveal from '@/components/ScrollReveal'

const lawyers = [
  {
    name: '이유림',
    role: '대표변호사',
    specialty: '성범죄피해자 전문 변호사',
    description: '끝까지 당신의 편에 서겠습니다.\n피해자의 시간 앞에서 겸허히 걷겠습니다.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=800&fit=crop&q=80',
    alt: '이유림 대표변호사 프로필',
  },
  {
    name: '노채은',
    role: '대표변호사',
    specialty: '재산범죄피해자 전문 변호사',
    description: '무뎌진 언어 뒤에도 도저히 묻혀지지 않는\n마음이 있습니다.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=800&fit=crop&q=80',
    alt: '노채은 대표변호사 프로필',
  },
]

export default function LawyersSection() {
  return (
    <section id="lawyers" className="py-28 sm:py-40 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">
            Our Lawyers
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-center text-black mb-20">
            변호사 소개
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {lawyers.map((lawyer, i) => (
            <ScrollReveal key={lawyer.name} delay={i * 0.15}>
              <div className="text-center">
                <div className="w-full aspect-[3/4] max-w-sm mx-auto bg-gray-100 rounded-2xl overflow-hidden mb-8 shadow-sm">
                  <Image
                    src={lawyer.image}
                    alt={lawyer.alt}
                    width={600}
                    height={800}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 hover:scale-[1.03] transition-all duration-700 ease-out"
                  />
                </div>
                <h3 className="font-serif text-xl font-bold text-black">
                  {lawyer.name} <span className="font-sans text-base font-normal text-gray-400">대표변호사</span>
                </h3>
                <p className="mt-1 text-sm text-accent font-medium">{lawyer.specialty}</p>
                <p className="mt-5 text-sm text-gray-400 leading-relaxed whitespace-pre-line">
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
