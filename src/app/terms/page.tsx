import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '이용약관',
  description: '법률사무소 로앤이 이용약관',
}

export default function TermsPage() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-black mb-10">
          이용약관
        </h1>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-black mb-3">제1조 (목적)</h2>
            <p>
              이 약관은 법률사무소 로앤이(이하 &quot;사무소&quot;)가 운영하는 웹사이트(이하 &quot;사이트&quot;)에서
              제공하는 인터넷 관련 서비스의 이용조건 및 절차에 관한 사항을 규정함을 목적으로 합니다.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-black mb-3">제2조 (정의)</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>&quot;사이트&quot;란 사무소가 서비스를 제공하기 위하여 운영하는 인터넷 웹사이트를 말합니다.</li>
              <li>&quot;이용자&quot;란 사이트에 접속하여 이 약관에 따라 사무소가 제공하는 서비스를 이용하는 자를 말합니다.</li>
              <li>&quot;서비스&quot;란 사이트를 통해 제공되는 법률 상담 신청, 정보 열람 등 일체의 서비스를 말합니다.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-black mb-3">제3조 (약관의 효력 및 변경)</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>이 약관은 사이트에 게시함으로써 효력을 발생합니다.</li>
              <li>사무소는 관련 법령에 위배되지 않는 범위 내에서 이 약관을 변경할 수 있으며, 변경된 약관은 사이트에 공지함으로써 효력을 발생합니다.</li>
              <li>이용자가 변경된 약관에 동의하지 않는 경우 서비스 이용을 중단할 수 있습니다.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-black mb-3">제4조 (서비스의 제공 및 변경)</h2>
            <p>사무소는 다음과 같은 서비스를 제공합니다.</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>법률 상담 신청 접수</li>
              <li>법률 정보 및 사례 제공</li>
              <li>사무소 소개 및 안내 정보 제공</li>
              <li>기타 사무소가 정하는 서비스</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-black mb-3">제5조 (서비스의 중단)</h2>
            <p>
              사무소는 컴퓨터 등 정보통신설비의 보수, 점검, 교체 및 고장, 통신두절 등의 사유가
              발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-black mb-3">제6조 (이용자의 의무)</h2>
            <p>이용자는 다음 행위를 하여서는 안 됩니다.</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>허위 정보를 기재하는 행위</li>
              <li>사이트의 정보를 변경하거나 서비스 운영을 방해하는 행위</li>
              <li>사무소 및 제3자의 명예를 훼손하거나 업무를 방해하는 행위</li>
              <li>외설 또는 폭력적인 내용을 게시하는 행위</li>
              <li>기타 관련 법령에 위반되는 행위</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-black mb-3">제7조 (저작권)</h2>
            <p>
              사이트에 게시된 콘텐츠(텍스트, 이미지, 영상 등)의 저작권은 사무소에 귀속됩니다.
              이용자는 사무소의 사전 동의 없이 이를 상업적 목적으로 복제, 배포, 전송, 출판할 수 없습니다.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-black mb-3">제8조 (면책사항)</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>사이트에 게시된 법률 정보는 일반적인 안내 목적이며, 구체적인 법률 조언을 대체하지 않습니다.</li>
              <li>사이트를 통한 상담 신청은 법률 서비스 이용계약의 체결을 의미하지 않습니다.</li>
              <li>사무소는 천재지변 또는 이에 준하는 불가항력으로 인해 서비스를 제공할 수 없는 경우 책임이 면제됩니다.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-black mb-3">제9조 (분쟁해결)</h2>
            <p>
              사무소와 이용자 간에 발생한 분쟁에 대해서는 대한민국 법률을 적용하며,
              사무소 소재지를 관할하는 법원을 전속 관할 법원으로 합니다.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-black mb-3">제10조 (사무소 정보)</h2>
            <ul className="list-none space-y-1">
              <li>사업자명: 법률사무소 로앤이</li>
              <li>대표: 이유림</li>
              <li>주소: 경기도 부천시 부일로205번길 54, 205호</li>
              <li>전화: 032-207-8788</li>
              <li>이메일: rohetlee@naver.com</li>
            </ul>
          </div>

          <p className="text-sm text-gray-500 mt-8">
            본 약관은 2024년 1월 1일부터 시행됩니다.
          </p>
        </div>
      </div>
    </section>
  )
}
