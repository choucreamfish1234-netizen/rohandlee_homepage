// 클라이언트 컴포넌트(헤더·푸터·홈 탭)용 경량 메뉴 데이터.
// 페이지 본문 데이터(defense.ts 등)를 클라이언트 번들에 싣지 않기 위해 분리한다.

export interface NavLink {
  href: string
  label: string
}

export interface NavArea {
  href: string
  label: string
  links: NavLink[]
}

export const victimCenters: NavLink[] = [
  { href: '/centers/sexual-crime', label: '성범죄 피해 전문센터' },
  { href: '/centers/financial-fraud', label: '금융사기 피해자 전담센터' },
  { href: '/centers/physical-crime', label: '신체범죄 피해 전담센터' },
  { href: '/centers/divorce', label: '이혼·가사 전담센터' },
  { href: '/centers/real-estate', label: '부동산 피해 전담센터' },
  { href: '/centers/asset-recovery', label: '재산회복 전담센터' },
  { href: '/centers/damages', label: '손해배상 전담센터' },
  { href: '/centers/corporate', label: '기업법무·개인정보보호센터' },
  { href: '/centers/school-violence', label: '학교폭력 전문센터' },
  { href: '/centers/foreign-victim', label: '외국인 범죄피해 지원센터' },
  { href: '/centers/lgbtq-crime', label: '성소수자 범죄피해 지원센터' },
]

export const defenseNav: NavArea = {
  href: '/defense',
  label: '형사 사건 대응',
  links: [
    { href: '/defense/dui', label: '음주운전' },
    { href: '/defense/drugs', label: '마약' },
    { href: '/defense/sexual-offense', label: '성범죄 혐의 대응' },
    { href: '/defense/traffic', label: '교통사고·교통범죄' },
    { href: '/defense/assault', label: '폭행·상해' },
    { href: '/defense/fraud', label: '사기·횡령' },
    { href: '/defense/defamation', label: '명예훼손·모욕' },
    { href: '/defense/gambling', label: '도박' },
    { href: '/defense/voice-phishing', label: '보이스피싱 연루' },
    { href: '/defense/medical', label: '의료사건' },
    { href: '/defense/corporate', label: '기업 형사' },
    { href: '/defense/warrant', label: '구속영장·긴급체포 대응' },
  ],
}

export const victimNav: NavArea = {
  href: '/centers',
  label: '피해자 전문센터',
  links: victimCenters,
}

export const collectionNav: NavArea = {
  href: '/collection',
  label: '채권추심센터',
  links: [
    { href: '/collection/b2b', label: 'B2B 기업 채권' },
    { href: '/collection/personal-loan', label: '개인 대여금' },
    { href: '/collection/fraud-recovery', label: '사기 피해금 환수' },
    { href: '/collection/crypto-recovery', label: '가상자산 추심' },
    { href: '/collection/wage', label: '임금체불' },
    { href: '/collection/alimony', label: '양육비' },
    { href: '/collection/construction', label: '공사대금' },
    { href: '/collection/process', label: '추심 절차 안내' },
  ],
}

export const cryptoNav: NavArea = {
  href: '/crypto',
  label: '가상자산·코인',
  links: [
    { href: '/crypto/listing', label: '코인 상장 자문' },
    { href: '/crypto/ico-compliance', label: 'ICO·토큰 발행 규제' },
    { href: '/crypto/exchange-dispute', label: '거래소 분쟁' },
    { href: '/crypto/fraud-defense', label: '코인 사기 혐의 대응' },
    { href: '/crypto/seizure', label: '가상자산 압류·가압류' },
    { href: '/crypto/tax', label: '가상자산 과세' },
    { href: '/crypto/defi', label: 'DeFi·NFT 법적 쟁점' },
  ],
}

export const businessNav: NavArea = {
  href: '/business',
  label: '기업 법률자문',
  links: [
    { href: '/business/startup', label: '스타트업 자문' },
    { href: '/business/compliance', label: '컴플라이언스' },
    { href: '/business/contract', label: '계약서 검토·작성' },
  ],
}

/** 홈 분야별 바로가기 탭 순서 */
export const areaNavs: NavArea[] = [defenseNav, victimNav, collectionNav, cryptoNav, businessNav]
