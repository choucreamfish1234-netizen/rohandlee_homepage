import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '개인정보처리방침',
  description: '법률사무소 로앤이 개인정보처리방침',
}

export default function PrivacyPage() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-black mb-10">
          개인정보처리방침
        </h1>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">
          <p>
            법률사무소 로앤이(이하 &quot;사무소&quot;)는 「개인정보 보호법」 제30조에 따라 정보주체의
            개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여
            다음과 같이 개인정보처리방침을 수립·공개합니다.
          </p>

          <div>
            <h2 className="text-xl font-semibold text-black mb-3">제1조 (개인정보의 처리 목적)</h2>
            <p>사무소는 다음의 목적을 위하여 개인정보를 처리합니다.</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>법률 상담 접수 및 처리: 상담 신청자의 신원 확인, 상담 내용 파악, 상담 결과 회신</li>
              <li>사건 수임 및 법률 서비스 제공: 의뢰인 관리, 사건 진행, 법률 서비스 제공</li>
              <li>고충처리: 민원인의 신원 확인, 민원사항 확인, 처리결과 통보</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-black mb-3">제2조 (개인정보의 처리 및 보유 기간)</h2>
            <p>
              사무소는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에
              동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>법률 상담 기록: 상담 완료 후 3년</li>
              <li>사건 수임 관련 기록: 사건 종결 후 5년</li>
              <li>관련 법령에 의한 보존 기간이 있는 경우 해당 기간</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-black mb-3">제3조 (처리하는 개인정보의 항목)</h2>
            <p>사무소는 다음의 개인정보 항목을 처리하고 있습니다.</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>필수항목: 성명, 연락처(전화번호)</li>
              <li>선택항목: 이메일 주소, 상담 내용, 사건 관련 정보</li>
              <li>인터넷 서비스 이용 과정에서 자동 생성되어 수집되는 항목: 접속 IP, 방문 일시, 서비스 이용 기록</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-black mb-3">제4조 (개인정보의 제3자 제공)</h2>
            <p>
              사무소는 정보주체의 개인정보를 제1조에서 명시한 범위 내에서만 처리하며, 정보주체의
              동의, 법률의 특별한 규정 등 「개인정보 보호법」 제17조 및 제18조에 해당하는 경우에만
              개인정보를 제3자에게 제공합니다.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-black mb-3">제5조 (개인정보의 파기)</h2>
            <p>
              사무소는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는
              지체없이 해당 개인정보를 파기합니다.
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>전자적 파일 형태: 복구 및 재생이 불가능하도록 안전하게 삭제</li>
              <li>그 밖의 기록물: 파쇄 또는 소각</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-black mb-3">제6조 (정보주체의 권리·의무 및 행사방법)</h2>
            <p>정보주체는 사무소에 대해 언제든지 다음의 개인정보 보호 관련 권리를 행사할 수 있습니다.</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>개인정보 열람 요구</li>
              <li>오류 등이 있을 경우 정정 요구</li>
              <li>삭제 요구</li>
              <li>처리정지 요구</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-black mb-3">제7조 (개인정보의 안전성 확보조치)</h2>
            <p>사무소는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>관리적 조치: 내부관리계획 수립·시행, 직원 교육</li>
              <li>기술적 조치: 개인정보 암호화, 접근권한 관리, 보안프로그램 설치</li>
              <li>물리적 조치: 서류 보관 시설 잠금장치 설치</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-black mb-3">제8조 (개인정보 보호책임자)</h2>
            <ul className="list-none space-y-1">
              <li>사업자명: 법률사무소 로앤이</li>
              <li>대표: 이유림</li>
              <li>주소: 경기도 부천시 부일로205번길 54, 205호</li>
              <li>전화: 032-207-8788</li>
              <li>이메일: rohetlee@naver.com</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-black mb-3">제9조 (개인정보처리방침의 변경)</h2>
            <p>
              이 개인정보처리방침은 2024년 1월 1일부터 적용됩니다. 변경 사항이 있을 경우
              웹사이트를 통하여 공지할 예정입니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
