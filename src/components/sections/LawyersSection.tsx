'use client'

import { motion } from 'framer-motion'
import { EditableText, EditableImage } from '@/components/Editable'

const lawyers = [
  {
    key: 'lee',
    name: '이유림',
    role: '대표변호사',
    tags: ['성범죄 전문', '피해자 전담', '로톡 평점 4.9'],
    description: '끝까지 당신의 편에 서겠습니다.\n피해자의 시간 앞에서 겸허히 걷겠습니다.',
    image: '/lawyer-lee.svg',
    alt: '이유림 대표변호사',
  },
  {
    key: 'noh',
    name: '노채은',
    role: '대표변호사',
    tags: ['재산범죄 전문', '회생·파산 전문'],
    description: '무뎌진 언어 뒤에도 도저히 묻혀지지 않는\n마음이 있습니다.',
    image: '/lawyer-noh.svg',
    alt: '노채은 대표변호사',
  },
]

export default function LawyersSection() {
  return (
    <section id="lawyers" className="bg-white">
      <div className="max-w-5xl mx-auto px-6 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <p className="text-xs tracking-widest text-gray-400 uppercase mb-4">
            Attorneys
          </p>
          <EditableText
            page="home"
            section="lawyers"
            fieldKey="heading"
            defaultValue="로앤이를 이끄는 변호사"
            tag="h2"
            className="text-3xl font-medium text-gray-900 tracking-tight mb-12 md:mb-16"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {lawyers.map((lawyer, i) => (
            <motion.div
              key={lawyer.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15, ease: 'easeOut' }}
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 mb-6">
                <EditableImage
                  page="home"
                  section="lawyers"
                  fieldKey={`lawyer-${lawyer.key}-photo`}
                  defaultSrc={lawyer.image}
                  alt={lawyer.alt}
                  width={600}
                  height={800}
                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <EditableText
                    page="home"
                    section="lawyers"
                    fieldKey={`lawyer-${lawyer.key}-name`}
                    defaultValue={lawyer.name}
                    tag="h3"
                    className="text-xl font-medium text-gray-900"
                  />
                  <span className="text-sm text-gray-400">{lawyer.role}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {lawyer.tags.map((tag) => (
                    <span key={tag} className="text-xs border border-gray-200 rounded-full px-3 py-1 text-gray-500">
                      {tag}
                    </span>
                  ))}
                </div>
                <EditableText
                  page="home"
                  section="lawyers"
                  fieldKey={`lawyer-${lawyer.key}-description`}
                  defaultValue={lawyer.description}
                  tag="p"
                  className="mt-4 text-sm text-gray-500 leading-relaxed whitespace-pre-line"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
