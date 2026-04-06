'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'

interface Webtoon {
  id: string
  title: string
  description: string | null
  image_url: string | null
  link_url: string | null
  display_order: number
}

export default function WebtoonSection() {
  const [webtoons, setWebtoons] = useState<Webtoon[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchWebtoons() {
      const { data } = await supabase
        .from('webtoons')
        .select('id, title, description, image_url, link_url, display_order')
        .eq('visible', true)
        .order('display_order', { ascending: true })
      if (data) setWebtoons(data)
    }
    fetchWebtoons()
  }, [])

  if (webtoons.length === 0) return null

  const showSlider = webtoons.length >= 3

  return (
    <section className="bg-white py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center mb-12"
      >
        <span className="text-xs tracking-widest text-[#1B3B2F] uppercase">WEBTOON</span>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">
          피해자들이 직접 참여한 범죄예방 인스타툰
        </h2>
        <p className="text-sm text-gray-500 mt-3">
          실제 사건을 바탕으로, 피해를 예방하는 이야기를 전합니다
        </p>
      </motion.div>

      {showSlider ? (
        <>
          <div
            ref={scrollRef}
            className="overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          >
            <div
              className="flex gap-4 px-4 md:px-8 lg:px-16 pb-4"
              style={{ width: 'max-content' }}
            >
              {webtoons.map((item, i) => (
                <WebtoonCard key={item.id} item={item} index={i} />
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={() => scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' })}
              className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-900 transition"
            >
              &larr;
            </button>
            <button
              onClick={() => scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' })}
              className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-900 transition"
            >
              &rarr;
            </button>
          </div>
        </>
      ) : (
        <div className="flex justify-center gap-4 px-4 md:px-8 lg:px-16">
          {webtoons.map((item, i) => (
            <WebtoonCard key={item.id} item={item} index={i} />
          ))}
        </div>
      )}
    </section>
  )
}

function WebtoonCard({
  item,
  index,
}: {
  item: Webtoon
  index: number
}) {
  const cardContent = (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 h-full">
      {item.image_url ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={item.image_url}
          alt={item.title}
          className="w-full aspect-square object-cover rounded-t-xl"
        />
      ) : (
        <div className="w-full aspect-square bg-[#1B3B2F] flex items-center justify-center rounded-t-xl">
          <span className="text-white text-sm font-semibold">WEBTOON</span>
        </div>
      )}
      <div className="p-4">
        <h3 className="font-medium text-gray-900 line-clamp-2">{item.title}</h3>
        {item.description && (
          <p className="text-sm text-gray-500 mt-1 line-clamp-1">{item.description}</p>
        )}
      </div>
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className="flex-shrink-0 w-[260px] md:w-[280px] snap-start"
    >
      {item.link_url ? (
        <a href={item.link_url} target="_blank" rel="noopener noreferrer" className="block h-full">
          {cardContent}
        </a>
      ) : (
        <div className="block h-full">{cardContent}</div>
      )}
    </motion.div>
  )
}
