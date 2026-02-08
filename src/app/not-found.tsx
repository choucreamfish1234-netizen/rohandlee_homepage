import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-200">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-black">페이지를 찾을 수 없습니다</h2>
        <p className="mt-2 text-sm text-gray-500">
          요청하신 페이지가 존재하지 않거나 이동되었습니다.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center px-6 py-3 bg-black text-white text-sm rounded-full hover:bg-gray-800 transition-colors"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </section>
  )
}
