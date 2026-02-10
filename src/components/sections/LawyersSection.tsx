'use client'

import ScrollReveal from '@/components/ScrollReveal'
import { EditableText, EditableImage } from '@/components/Editable'

const lawyers = [
  {
    key: 'lee',
    name: '이유림',
    role: '대표변호사',
    specialty: '성범죄 피해자 전문 변호사',
    description: '끝까지 당신의 편에 서겠습니다.\n피해자의 시간 앞에서 겸허히 걷겠습니다.',
    image: '/lawyer-lee.svg',
    alt: '이유림 대표변호사 프로필',
  },
  {
    key: 'noh',
    name: '노채은',
    role: '대표변호사',
    specialty: '재산범죄 피해자 전문 변호사',
    description: '무뎌진 언어 뒤에도 도저히 묻혀지지 않는\n마음이 있습니다.',
    image: '/lawyer-noh.svg',
    alt: '노채은 대표변호사 프로필',
  },
]

export default function LawyersSection() {
  return (
    <section id="lawyers" className="py-12 sm:py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase text-center mb-4">
            Our Lawyers
          </p>
          <h2 className="text-xl sm:text-3xl font-bold text-center text-black mb-10 sm:mb-20">
            변호사 소개
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16">
          {lawyers.map((lawyer, i) => (
            <ScrollReveal key={lawyer.key} delay={i * 0.15}>
              <div className="text-center">
                <div className="w-full aspect-[3/4] max-w-sm mx-auto bg-gray-100 overflow-hidden mb-8 shadow-sm">
                  <EditableImage
                    page="home"
                    section="lawyers"
                    fieldKey={`lawyer-${lawyer.key}-photo`}
                    defaultSrc={lawyer.image}
                    alt={lawyer.alt}
                    width={600}
                    height={800}
                    className="w-full h-full object-cover hover:scale-[1.03] transition-all duration-700 ease-out"
                  />
                </div>
                <h3 className="text-xl font-bold text-black">
                  <EditableText
                    page="home"
                    section="lawyers"
                    fieldKey={`lawyer-${lawyer.key}-name`}
                    defaultValue={lawyer.name}
                    tag="span"
                  />
                  {' '}
                  <span className="font-sans text-base font-normal text-gray-400">{lawyer.role}</span>
                </h3>
                <EditableText
                  page="home"
                  section="lawyers"
                  fieldKey={`lawyer-${lawyer.key}-specialty`}
                  defaultValue={lawyer.specialty}
                  tag="p"
                  className="mt-1 text-sm text-accent font-medium"
                />
                <EditableText
                  page="home"
                  section="lawyers"
                  fieldKey={`lawyer-${lawyer.key}-description`}
                  defaultValue={lawyer.description}
                  tag="p"
                  className="mt-5 text-sm text-gray-400 leading-relaxed whitespace-pre-line"
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
