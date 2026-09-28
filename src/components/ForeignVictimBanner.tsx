import Link from 'next/link'

export default function ForeignVictimBanner() {
  return (
    <section className="py-6 sm:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/centers/foreign-victim" className="block bg-[#1B3B2F] text-white rounded-xl p-5 sm:p-6 hover:bg-[#153126] transition-colors">
          <div className="flex items-start gap-4">
            <span className="text-2xl flex-shrink-0">🌐</span>
            <div>
              <h3 className="text-base font-bold mb-1">
                외국인 피해자이신가요? | Are you a foreign victim?
              </h3>
              <p className="text-sm text-white/60">
                中文 · English · Tiếng Việt 상담 가능
              </p>
              <span className="inline-block mt-2 text-xs text-[#C9A24B] font-medium">
                외국인 범죄피해 지원센터 →
              </span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  )
}
