import type { AreaKey } from './types'
import { getAreaPage } from './index'
import { defenseABodies } from './case-bodies/defense-a'
import { defenseBBodies } from './case-bodies/defense-b'
import { collectionBodies } from './case-bodies/collection'
import { advisoryBodies } from './case-bodies/advisory'

export type CaseArea = AreaKey | 'victim'

export interface PracticeCase {
  slug: string
  area: CaseArea
  /** 해당 분야 하위 페이지 slug */
  page?: string
  category: string
  title: string
  summary: string
  charge?: string
  situation?: string
  issue?: string
  response?: string
  result: string
  /** 상세 서술 (있는 경우) */
  body?: { heading: string; text: string }[]
}

export const CASE_DISCLAIMER =
  '* 본 사례는 실제 사건을 바탕으로 재구성한 것으로, 개인정보 보호를 위해 세부사항이 변경되었습니다. 개별 사건의 결과는 사실관계와 법적 쟁점에 따라 달라질 수 있습니다.'

export const CASE_CATEGORIES = [
  '음주운전',
  '마약',
  '성범죄',
  '교통사고',
  '폭행·상해',
  '사기·횡령',
  '명예훼손',
  '도박',
  '보이스피싱',
  '의료',
  '기업형사',
  '구속영장',
  '채권추심',
  '가상자산',
  '기업자문',
  '피해자 구제',
] as const

export const AREA_LABEL: Record<CaseArea, string> = {
  defense: '형사 사건 대응',
  collection: '채권추심',
  crypto: '가상자산',
  business: '기업자문',
  victim: '피해자 구제',
}

const rawCases: PracticeCase[] = [
  // ── 형사 · 음주운전
  {
    slug: 'dui-008-fine-reduction',
    area: 'defense',
    page: 'dui',
    category: '음주운전',
    title: '혈중알코올 0.08% 초과, 징역형 구형에서 벌금형으로',
    summary: '음주측정 절차의 하자와 운전 경위를 다투어 벌금형을 이끌어낸 사례',
    charge: '도로교통법 위반(음주운전)',
    situation: '회사 회식 후 대리기사를 기다리던 중 주차장 내 차량을 이동하다 단속',
    issue: '음주측정 절차 적법성, 운전 장소의 도로 해당 여부',
    response: '음주측정기 정기검사 기록 확인, 운전 장소와 경위에 대한 법리 검토, 양형 자료 제출',
    result: '벌금 300만원 (검찰 구형 징역 6월)',
  },
  {
    slug: 'dui-repeat-probation',
    area: 'defense',
    page: 'dui',
    category: '음주운전',
    title: '음주운전 재범, 실형 위기에서 집행유예',
    summary: '벌금 전력이 있는 상태에서 다시 적발된 사건에서 집행유예를 이끌어낸 사례',
    charge: '도로교통법 위반(음주운전)',
    situation: '1회 벌금 전과가 있는 상태에서 2차 적발 (혈중알코올농도 0.12%)',
    issue: '재범 가중처벌 요건, 양형 감경 사유',
    response: '알코올 치료 프로그램 수료, 반성문, 재발 방지 서약서 제출',
    result: '징역 8월, 집행유예 2년',
  },
  {
    slug: 'dui-hit-and-run-partial',
    area: 'defense',
    page: 'dui',
    category: '음주운전',
    title: '음주 뺑소니 혐의 중 뺑소니 부분 무죄',
    summary: '접촉사고를 인지하지 못한 채 이동한 사건에서 도주 혐의 무죄를 받은 사례',
    charge: '특정범죄가중처벌법 위반(도주치상), 도로교통법 위반(음주운전)',
    situation: '접촉사고 후 사고를 인지하지 못하고 현장 이탈',
    issue: '특정범죄가중처벌법 제5조의3 도주의 고의 유무',
    response: '블랙박스 영상 분석, 접촉 인지 불가능성 입증',
    result: '음주운전만 인정, 뺑소니 부분 무죄',
  },

  // ── 형사 · 마약
  {
    slug: 'drugs-cannabis-first-offense',
    area: 'defense',
    page: 'drugs',
    category: '마약',
    title: '대마 초범, 집행유예와 수강명령으로 실형 면해',
    summary: '대마 흡연 초범 사건에서 치료 의지를 소명해 집행유예를 받은 사례',
    charge: '마약류관리법 위반(대마)',
    situation: 'SNS를 통해 대마를 구매·흡연, 모발검사에서 양성 반응',
    issue: '초범 양형, 자발적 치료 의사 표시',
    response: '마약류 중독 치료 프로그램 사전 등록, 반성문 제출',
    result: '징역 10월, 집행유예 2년, 수강명령 80시간',
  },
  {
    slug: 'drugs-hair-test-dispute',
    area: 'defense',
    page: 'drugs',
    category: '마약',
    title: '필로폰 투약 혐의, 모발감정 신뢰성 다투어 무죄',
    summary: '소변검사 음성·모발검사 양성 사건에서 감정 결과의 신뢰성을 다툰 사례',
    charge: '마약류관리법 위반(향정)',
    situation: '소변검사는 음성이나 모발검사에서 양성, 의뢰인은 투약 부인',
    issue: '모발감정 결과의 증명력, 외부 오염 가능성',
    response: '감정 결과의 신뢰도에 대한 반박, 재감정 요청',
    result: '증거불충분 무죄',
  },
  {
    slug: 'drugs-medical-professional',
    area: 'defense',
    page: 'drugs',
    category: '마약',
    title: '의료인 프로포폴 투약, 면허 자격정지 최소화',
    summary: '형사 절차와 행정심판을 병행해 면허취소를 피한 사례',
    charge: '마약류관리법 위반(향정)',
    situation: '성형외과 의사가 프로포폴을 자가투약, 동료의 신고로 수사 개시',
    issue: '향정신성의약품 자가투약, 의료인 행정처분 병행',
    response: '형사 대응과 행정심판 병행, 치료 이력 소명',
    result: '형사 — 벌금형 / 행정 — 자격정지 3월 (면허취소 면함)',
  },

  // ── 형사 · 성범죄 혐의
  {
    slug: 'sexual-offense-false-accusation',
    area: 'defense',
    page: 'sexual-offense',
    category: '성범죄',
    title: '합의하에 이루어진 관계 후 일방적 고소, 불기소 처분',
    summary: '관계 종료 후 제기된 강간 고소에서 혐의없음 처분을 받은 사례',
    charge: '강간',
    situation: '연인 관계 종료 후 전 연인이 강간 혐의로 고소',
    issue: '관계 당시 합의 여부, 폭행·협박 행사 여부',
    response: '카카오톡 대화 기록, 관계 정황 증거를 체계적으로 정리',
    result: '불기소 (혐의없음)',
  },
  {
    slug: 'sexual-offense-workplace-harassment',
    area: 'defense',
    page: 'sexual-offense',
    category: '성범죄',
    title: '직장 내 강제추행 혐의, 추행 해당 여부 다투어 불기소',
    summary: '어깨에 손을 올린 행위의 강제추행 해당 여부를 다툰 사례',
    charge: '강제추행',
    situation: '직장 상사가 어깨에 손을 올린 행위로 형사 고소',
    issue: '해당 행위의 강제추행 구성요건 충족 여부',
    response: '행위의 객관적 성질, 당시 상황과 맥락 분석',
    result: '불기소 (증거불충분)',
  },
  {
    slug: 'sexual-offense-digital-allegation',
    area: 'defense',
    page: 'sexual-offense',
    category: '성범죄',
    title: '촬영물 유포 혐의, 유포 행위 부인하여 일부 무죄',
    summary: '유포 경로를 분석해 유포 부분 무죄를 받은 사례',
    charge: '성폭력처벌법 위반(카메라등이용촬영·반포)',
    situation: '전 연인이 촬영물 유포를 주장하며 고소',
    issue: '유포 경로 특정, 의뢰인 행위와의 인과관계',
    response: '디지털 포렌식 결과 분석, 제3자에 의한 유포 가능성 제시',
    result: '촬영 부분 벌금 / 유포 부분 무죄',
  },

  // ── 형사 · 교통
  {
    slug: 'traffic-intersection-suspended-indictment',
    area: 'defense',
    page: 'traffic',
    category: '교통사고',
    title: '교차로 사고 치상, 합의와 기소유예',
    summary: '교차로 교통사고로 상대방이 다친 사건에서 합의 후 기소유예 처분을 받은 사례',
    charge: '교통사고처리특례법 위반(치상)',
    result: '합의, 기소유예',
  },
  {
    slug: 'traffic-unlicensed-sentence-reduction',
    area: 'defense',
    page: 'traffic',
    category: '교통사고',
    title: '무면허 운전 중 사고, 양형 감경',
    summary: '무면허 상태에서 발생한 교통사고 사건에서 양형 감경을 이끌어낸 사례',
    charge: '도로교통법 위반(무면허운전), 교통사고처리특례법 위반',
    result: '양형 감경',
  },
  {
    slug: 'traffic-hit-and-run-no-charge',
    area: 'defense',
    page: 'traffic',
    category: '교통사고',
    title: '뺑소니 혐의, 사고 미인지 입증하여 무혐의',
    summary: '사고를 인지하지 못했다는 점을 입증해 도주 혐의를 벗은 사례',
    charge: '특정범죄가중처벌법 위반(도주치상)',
    result: '무혐의',
  },

  // ── 형사 · 폭행·상해
  {
    slug: 'assault-self-defense-acquittal',
    area: 'defense',
    page: 'assault',
    category: '폭행·상해',
    title: '쌍방폭행에서 정당방위 인정, 무죄',
    summary: '쌍방폭행으로 기소된 사건에서 정당방위가 인정되어 무죄를 받은 사례',
    charge: '폭행',
    result: '정당방위 인정, 무죄',
  },
  {
    slug: 'assault-dating-cctv-no-charge',
    area: 'defense',
    page: 'assault',
    category: '폭행·상해',
    title: '데이트 중 폭행 혐의, CCTV 확보하여 불기소',
    summary: 'CCTV 영상을 확보해 폭행 혐의에서 불기소 처분을 받은 사례',
    charge: '폭행',
    result: '불기소',
  },
  {
    slug: 'assault-child-discipline-fine',
    area: 'defense',
    page: 'assault',
    category: '폭행·상해',
    title: '훈육 과정의 아동학대 혐의, 약식 벌금으로 감경',
    summary: '훈육 과정에서 문제된 아동학대 혐의에서 약식 벌금으로 마무리한 사례',
    charge: '아동학대처벌법 위반',
    result: '약식 벌금',
  },

  // ── 형사 · 사기·횡령
  {
    slug: 'fraud-investment-civil-dispute',
    area: 'defense',
    page: 'fraud',
    category: '사기·횡령',
    title: '투자금 반환 불이행, 민사 분쟁임을 밝혀 불기소',
    summary: '투자금을 돌려주지 못해 사기로 고소된 사건에서 민사 분쟁임을 입증한 사례',
    charge: '사기',
    result: '불기소',
  },
  {
    slug: 'fraud-corporate-card-embezzlement',
    area: 'defense',
    page: 'fraud',
    category: '사기·횡령',
    title: '법인카드 사적 사용, 업무상 횡령 일부 인정 — 벌금형',
    summary: '법인카드 사용 내역을 다투어 횡령 범위를 줄이고 벌금형을 받은 사례',
    charge: '업무상 횡령',
    result: '일부 인정, 벌금형',
  },
  {
    slug: 'fraud-secondhand-delivery-delay',
    area: 'defense',
    page: 'fraud',
    category: '사기·횡령',
    title: '중고거래 배송 지연, 다수 사기 고소 — 이행 의사 입증으로 불기소',
    summary: '배송 지연으로 여러 건의 사기 고소를 당한 사건에서 이행 의사를 입증한 사례',
    charge: '사기',
    result: '불기소',
  },
  {
    slug: 'fraud-account-transfer-aiding',
    area: 'defense',
    page: 'fraud',
    category: '사기·횡령',
    title: '보이스피싱 대포통장 양도, 사기방조 — 벌금 200만원',
    summary: '통장 양도로 사기방조 혐의를 받은 사건에서 벌금형으로 마무리한 사례',
    charge: '사기방조',
    result: '벌금 200만원',
  },

  // ── 형사 · 명예훼손
  {
    slug: 'defamation-public-interest-acquittal',
    area: 'defense',
    page: 'defamation',
    category: '명예훼손',
    title: '온라인 커뮤니티 게시글, 공익성 항변으로 무죄',
    summary: '온라인 게시글로 기소된 명예훼손 사건에서 공익성이 인정된 사례',
    charge: '정보통신망법 위반(명예훼손)',
    result: '무죄',
  },
  {
    slug: 'defamation-workplace-insult-no-publicity',
    area: 'defense',
    page: 'defamation',
    category: '명예훼손',
    title: '직장 내 험담 모욕죄, 공연성 부정하여 불기소',
    summary: '직장 내 발언에 대한 모욕 고소에서 공연성이 부정된 사례',
    charge: '모욕',
    result: '불기소',
  },
  {
    slug: 'defamation-consumer-review-opinion',
    area: 'defense',
    page: 'defamation',
    category: '명예훼손',
    title: '소비자 리뷰 작성, 업체의 명예훼손 고소 — 의견 표현으로 무죄',
    summary: '소비자 리뷰가 의견 표현으로 인정되어 무죄를 받은 사례',
    charge: '정보통신망법 위반(명예훼손)',
    result: '무죄',
  },

  // ── 형사 · 도박
  {
    slug: 'gambling-sports-first-offense',
    area: 'defense',
    page: 'gambling',
    category: '도박',
    title: '온라인 스포츠 도박 초범, 기소유예',
    summary: '불법 스포츠 도박 이용 초범 사건에서 기소유예 처분을 받은 사례',
    charge: '국민체육진흥법 위반',
    result: '기소유예',
  },
  {
    slug: 'gambling-telegram-participation',
    area: 'defense',
    page: 'gambling',
    category: '도박',
    title: '텔레그램 도박방, 개설 혐의 부인 — 참여만 인정',
    summary: '도박방 개설 혐의를 벗고 단순 참여만 인정된 사례',
    charge: '도박장소개설, 도박',
    result: '개설 혐의 부정, 참여만 인정',
  },

  // ── 형사 · 보이스피싱 연루
  {
    slug: 'voicephishing-account-rental-fine',
    area: 'defense',
    page: 'voice-phishing',
    category: '보이스피싱',
    title: '아르바이트로 통장 양도, 전자금융거래법 위반 — 벌금형',
    summary: '아르바이트 제안에 통장을 넘긴 사건에서 벌금형으로 마무리한 사례',
    charge: '전자금융거래법 위반',
    result: '벌금형',
  },
  {
    slug: 'voicephishing-courier-no-intent',
    area: 'defense',
    page: 'voice-phishing',
    category: '보이스피싱',
    title: '모르고 현금 수거책 역할, 사기방조 혐의 — 고의 부정 불기소',
    summary: '현금 수거 행위에 대한 고의가 부정되어 불기소 처분을 받은 사례',
    charge: '사기방조',
    result: '불기소',
  },
  {
    slug: 'voicephishing-company-account-cleared',
    area: 'defense',
    page: 'voice-phishing',
    category: '보이스피싱',
    title: '회사 계좌가 보이스피싱에 이용, 대표 혐의 — 무혐의',
    summary: '회사 계좌가 범행에 이용된 사건에서 대표의 혐의가 벗겨진 사례',
    charge: '사기방조',
    result: '무혐의',
  },

  // ── 형사 · 의료
  {
    slug: 'medical-surgery-negligence-fine',
    area: 'defense',
    page: 'medical',
    category: '의료',
    title: '수술 과실 업무상과실치상, 과실 범위 다툼 — 벌금형',
    summary: '수술 과정의 과실 범위를 다투어 벌금형으로 마무리한 사례',
    charge: '업무상과실치상',
    result: '벌금형',
  },
  {
    slug: 'medical-unlicensed-procedure-cleared',
    area: 'defense',
    page: 'medical',
    category: '의료',
    title: '무면허 시술 공동정범 의료법 위반, 의사 무혐의',
    summary: '무면허 의료행위 공동정범으로 지목된 의사가 무혐의 처분을 받은 사례',
    charge: '의료법 위반',
    result: '무혐의',
  },
  {
    slug: 'medical-license-suspension-reduced',
    area: 'defense',
    page: 'medical',
    category: '의료',
    title: '의료인 면허 정지 위기, 행정심판으로 1월 감경',
    summary: '자격정지 처분에 대해 행정심판으로 정지 기간을 줄인 사례',
    charge: '의료법상 자격정지 처분',
    result: '행정심판으로 자격정지 1월 감경',
  },

  // ── 형사 · 기업 형사
  {
    slug: 'corporate-breach-business-judgment',
    area: 'defense',
    page: 'corporate',
    category: '기업형사',
    title: '대표이사 배임 혐의, 경영판단 원칙 적용 — 불기소',
    summary: '경영상 판단이 배임으로 고소된 사건에서 불기소 처분을 받은 사례',
    charge: '업무상 배임',
    result: '불기소',
  },
  {
    slug: 'corporate-trade-secret-partial',
    area: 'defense',
    page: 'corporate',
    category: '기업형사',
    title: '퇴사자 영업비밀 유출, 비밀관리성 다툼 — 일부 인정',
    summary: '영업비밀의 비밀관리성을 다투어 혐의 범위를 줄인 사례',
    charge: '부정경쟁방지법 위반(영업비밀누설)',
    result: '일부 인정',
  },
  {
    slug: 'corporate-subcontract-suspended-indictment',
    area: 'defense',
    page: 'corporate',
    category: '기업형사',
    title: '하도급법 위반 고발, 자진시정으로 기소유예',
    summary: '하도급법 위반 고발 사건에서 자진시정을 통해 기소유예 처분을 받은 사례',
    charge: '하도급법 위반',
    result: '기소유예',
  },

  // ── 형사 · 구속영장
  {
    slug: 'warrant-fraud-dismissed',
    area: 'defense',
    page: 'warrant',
    category: '구속영장',
    title: '사기 혐의 구속영장, 영장실질심사에서 기각',
    summary: '사기 혐의로 청구된 구속영장이 영장실질심사에서 기각된 사례',
    charge: '사기',
    result: '구속영장 기각',
  },
  {
    slug: 'warrant-drugs-bail',
    area: 'defense',
    page: 'warrant',
    category: '구속영장',
    title: '마약 혐의 구속 후, 보석 허가',
    summary: '마약 혐의로 구속 기소된 후 보석 허가를 받은 사례',
    charge: '마약류관리법 위반',
    result: '보석 허가',
  },
  {
    slug: 'warrant-emergency-arrest-release',
    area: 'defense',
    page: 'warrant',
    category: '구속영장',
    title: '긴급체포 후 48시간 내 석방',
    summary: '긴급체포된 의뢰인이 48시간 안에 석방된 사례',
    result: '48시간 내 석방',
  },

  // ── 채권추심
  {
    slug: 'b2b-receivable-120m',
    area: 'collection',
    page: 'b2b',
    category: '채권추심',
    title: '거래처 미수금 1억 2천만원 — 부동산 가압류로 90% 회수',
    summary: '납품대금 6개월 미지급, 부동산 가압류 신청 후 즉시 합의',
    situation: '납품대금 6개월 미지급',
    response: '거래처 부동산 가압류',
    result: '1억 800만원 회수',
  },
  {
    slug: 'b2b-overseas-arbitration',
    area: 'collection',
    page: 'b2b',
    category: '채권추심',
    title: '해외 거래처 계약 불이행, 국제중재 판정으로 해결',
    summary: '해외 거래처의 계약 불이행 분쟁을 국제중재로 해결한 사례',
    result: '국제중재 판정',
  },
  {
    slug: 'b2b-subcontract-direct-payment',
    area: 'collection',
    page: 'b2b',
    category: '채권추심',
    title: '하도급 대금 체불, 직불청구권 행사로 원청에서 회수',
    summary: '하도급 대금을 직접지급 청구로 발주처에서 회수한 사례',
    result: '직접지급 청구로 회수',
  },
  {
    slug: 'loan-no-iou-30m',
    area: 'collection',
    page: 'personal-loan',
    category: '채권추심',
    title: '차용증 없는 3천만원, 카톡 대화로 지급명령 인용',
    summary: '카카오톡 대화와 송금 내역으로 대여 사실을 입증해 급여를 압류한 사례',
    situation: '차용증 미작성',
    response: '카카오톡 대화·송금 내역으로 대여 사실 입증, 지급명령 신청',
    result: '지급명령 인용, 급여 압류',
  },
  {
    slug: 'loan-hidden-assets-50m',
    area: 'collection',
    page: 'personal-loan',
    category: '채권추심',
    title: '지인에게 빌려준 5천만원, 은닉 재산 추적·회수',
    summary: '재산을 숨긴 채무자의 재산을 추적해 대여금을 회수한 사례',
    result: '재산 추적 후 회수',
  },
  {
    slug: 'recovery-investment-fraud-80m',
    area: 'collection',
    page: 'fraud-recovery',
    category: '채권추심',
    title: '투자 사기 8천만원, 부동산 가압류 후 합의금 6천만원 회수',
    summary: '투자 사기 상대방의 부동산을 가압류해 합의를 이끌어낸 사례',
    result: '합의금 6천만원 회수',
  },
  {
    slug: 'recovery-used-car-full',
    area: 'collection',
    page: 'fraud-recovery',
    category: '채권추심',
    title: '중고차 사기, 형사합의와 민사소송 병행으로 전액 환수',
    summary: '형사와 민사 절차를 병행해 중고차 사기 피해금을 전액 환수한 사례',
    result: '전액 환수',
  },
  {
    slug: 'crypto-fraud-50m-seizure',
    area: 'collection',
    page: 'crypto-recovery',
    category: '가상자산',
    title: '코인 투자 사기 5천만원 — 거래소 계정 가압류 성공',
    summary: '업비트 계정을 특정하여 가압류 집행, 피해금 일부 환수',
    situation: '코인 투자 사기로 5천만원 피해',
    response: '상대방 거래소 계정 특정, 가압류 신청 및 집행',
    result: '2천만원 회수',
  },
  {
    slug: 'crypto-p2p-wallet-trace',
    area: 'collection',
    page: 'crypto-recovery',
    category: '가상자산',
    title: 'P2P 거래 사기, 지갑 추적으로 거래소 계정 특정 후 회수',
    summary: '지갑 이동 경로를 추적해 다른 거래소 계정을 특정하고 회수한 사례',
    result: '계정 특정 후 회수',
  },
  {
    slug: 'wage-8-months-full',
    area: 'collection',
    page: 'wage',
    category: '채권추심',
    title: '퇴사 후 8개월분 밀린 임금, 노동청 진정으로 전액 회수',
    summary: '노동청 진정을 통해 밀린 임금 전액을 회수한 사례',
    result: '전액 회수',
  },
  {
    slug: 'wage-freelancer-worker-status',
    area: 'collection',
    page: 'wage',
    category: '채권추심',
    title: '프리랜서 용역비 미지급, 근로자성 입증 후 임금 인정',
    summary: '프리랜서 계약자의 근로자성을 입증해 임금으로 인정받은 사례',
    result: '근로자성 인정, 임금 인정',
  },
  {
    slug: 'alimony-detention-order',
    area: 'collection',
    page: 'alimony',
    category: '채권추심',
    title: '양육비 2년 체불, 감치명령 신청 후 즉시 지급 합의',
    summary: '장기 체불된 양육비에 대해 감치명령을 신청해 지급 합의를 이끌어낸 사례',
    result: '즉시 지급 합의',
  },
  {
    slug: 'alimony-salary-garnishment',
    area: 'collection',
    page: 'alimony',
    category: '채권추심',
    title: '양육비 이행확보 제도를 활용한 급여·예금 압류',
    summary: '양육비 이행확보 제도로 급여와 예금을 압류한 사례',
    result: '급여·예금 압류',
  },
  {
    slug: 'construction-interior-40m',
    area: 'collection',
    page: 'construction',
    category: '채권추심',
    title: '인테리어 공사대금 4천만원, 유치권 행사와 소송으로 회수',
    summary: '유치권 행사와 공사대금 소송을 병행해 대금을 회수한 사례',
    result: '공사대금 회수',
  },
  {
    slug: 'construction-subcontract-direct-payment',
    area: 'collection',
    page: 'construction',
    category: '채권추심',
    title: '하도급 공사대금, 직불청구권 행사로 회수',
    summary: '하도급 공사대금을 직접지급 청구로 회수한 사례',
    result: '직접지급 청구로 회수',
  },

  // ── 가상자산
  {
    slug: 'crypto-listing-a-token',
    area: 'crypto',
    page: 'listing',
    category: '가상자산',
    title: 'A토큰 국내 거래소 2곳 상장 — 법률 의견서와 AML 체계 구축 자문',
    summary: '법률 의견서 작성과 AML 체계 구축 자문으로 국내 거래소 상장을 지원한 사례',
    result: '국내 거래소 2곳 상장',
  },
  {
    slug: 'crypto-listing-b-security-issue',
    area: 'crypto',
    page: 'listing',
    category: '가상자산',
    title: 'B프로젝트 토큰 증권성 이슈 해소 — 구조 변경 자문으로 상장',
    summary: '토큰 구조 변경 자문으로 증권성 이슈를 해소하고 상장한 사례',
    result: '증권성 이슈 해소, 상장',
  },
  {
    slug: 'crypto-listing-overseas-entry',
    area: 'crypto',
    page: 'listing',
    category: '가상자산',
    title: '해외 프로젝트 한국 시장 진출 — 특금법 준수 체계와 법률 의견서',
    summary: '해외 프로젝트의 국내 진출을 위해 특금법 준수 체계 구축과 법률 의견서를 제공한 사례',
    result: '특금법 준수 체계 구축, 법률 의견서 제공',
  },
  {
    slug: 'crypto-token-fund-raising-no-charge',
    area: 'crypto',
    page: 'fraud-defense',
    category: '가상자산',
    title: '토큰 발행 유사수신 혐의, 사업 구조 변경으로 불기소',
    summary: '유사수신 혐의를 받은 토큰 발행 사업에서 구조 변경을 통해 불기소 처분을 받은 사례',
    result: '불기소',
  },
  {
    slug: 'crypto-nft-rugpull-no-intent',
    area: 'crypto',
    page: 'fraud-defense',
    category: '가상자산',
    title: 'NFT 프로젝트 러그풀 혐의, 개발 로그로 사기 고의 부정',
    summary: '개발 기록으로 사업의 실체를 입증해 사기 고의를 부정한 사례',
    result: '사기 고의 부정',
  },
  {
    slug: 'crypto-otc-normal-trade',
    area: 'crypto',
    page: 'fraud-defense',
    category: '가상자산',
    title: 'P2P OTC 거래 사기 혐의, 정상 거래 입증 — 불기소',
    summary: 'OTC 거래가 정상 거래였음을 입증해 불기소 처분을 받은 사례',
    result: '불기소',
  },
  {
    slug: 'crypto-withdrawal-freeze-injunction',
    area: 'crypto',
    page: 'exchange-dispute',
    category: '가상자산',
    title: '거래소 출금 정지 3개월, 가처분으로 해제',
    summary: '3개월간 지속된 거래소 출금 정지를 가처분으로 해제한 사례',
    result: '가처분으로 출금 정지 해제',
  },
  {
    slug: 'crypto-account-suspension-restored',
    area: 'crypto',
    page: 'exchange-dispute',
    category: '가상자산',
    title: '이용약관 위반 계정 정지, 원상회복 인용',
    summary: '이용약관 위반을 이유로 한 계정 정지에 대해 원상회복을 받은 사례',
    result: '원상회복 인용',
  },

  // ── 기업자문
  {
    slug: 'startup-series-a-antidilution',
    area: 'business',
    page: 'startup',
    category: '기업자문',
    title: '시리즈A 투자계약 — 불리한 희석방지 조항 수정, 투자 유치',
    summary: '투자계약서의 불리한 희석방지 조항을 수정하고 투자 유치를 마무리한 사례',
    result: '조항 수정, 투자 유치 완료',
  },
  {
    slug: 'startup-cofounder-exit',
    area: 'business',
    page: 'startup',
    category: '기업자문',
    title: '공동창업자 지분 분쟁 — 주주간계약 기반 원만한 이탈 합의',
    summary: '주주간계약을 근거로 공동창업자의 이탈을 원만히 합의한 사례',
    result: '이탈 합의',
  },
  {
    slug: 'startup-saas-terms',
    area: 'business',
    page: 'startup',
    category: '기업자문',
    title: 'SaaS 서비스 이용약관 — 분쟁 예방 조항 설계',
    summary: 'SaaS 서비스의 이용약관에 분쟁 예방 조항을 설계한 사례',
    result: '이용약관 설계',
  },
  {
    slug: 'compliance-privacy-breach-penalty',
    area: 'business',
    page: 'compliance',
    category: '기업자문',
    title: '개인정보 유출 사고 대응 — 과징금 70% 감경',
    summary: '개인정보 유출 사고 이후 대응으로 과징금을 감경받은 사례',
    result: '과징금 70% 감경',
  },
  {
    slug: 'compliance-subcontract-ftc',
    area: 'business',
    page: 'compliance',
    category: '기업자문',
    title: '하도급법 위반 공정위 조사 대응 — 자진시정으로 과징금 면제',
    summary: '공정위 조사 과정에서 자진시정해 과징금을 면제받은 사례',
    result: '과징금 면제',
  },

  // ── 피해자 구제
  {
    slug: 'digital-sex-crime-deletion',
    area: 'victim',
    category: '피해자 구제',
    title: '디지털 성범죄 피해 — 촬영물 전량 삭제 및 합의',
    summary: '불법촬영물 유포 전 긴급 삭제 조치 및 형사·민사 병행 대응',
    result: '촬영물 전량 삭제, 합의금 수령',
  },
]

const caseBodies = { ...defenseABodies, ...defenseBBodies, ...collectionBodies, ...advisoryBodies }

/** 사례 상세 본문은 case-bodies/* 에서 관리한다 */
export const practiceCases: PracticeCase[] = rawCases.map((c) => ({ ...c, body: caseBodies[c.slug] ?? c.body }))

export const FEATURED_CASE_SLUGS = [
  'dui-008-fine-reduction',
  'b2b-receivable-120m',
  'crypto-fraud-50m-seizure',
  'digital-sex-crime-deletion',
]

export function findPracticeCase(slug: string) {
  return practiceCases.find((c) => c.slug === slug) ?? null
}

export function casesForPage(area: CaseArea, page?: string) {
  return practiceCases.filter((c) => c.area === area && (!page || c.page === page))
}

/** 사례가 속한 분야 페이지 링크 */
export function caseAreaLink(c: PracticeCase): { href: string; label: string } {
  if (c.area === 'victim') return { href: '/centers/sexual-crime', label: '성범죄 피해 전문센터' }
  const base = `/${c.area}`
  const page = c.page ? getAreaPage(c.area, c.page) : null
  return page ? { href: `${base}/${page.slug}`, label: page.name } : { href: base, label: AREA_LABEL[c.area] }
}
