/**
 * 운영 정보 — 언어와 무관한 고정값. 연락 수단은 모두 여기서만 고친다.
 */
export const site = {
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://china.lawfirmrohandlee.com").replace(/\/$/, ""),
  gaId: process.env.NEXT_PUBLIC_GA_ID || "",

  phone: {
    display: "032-207-8788",
    intl: "+82-32-207-8788",
    tel: "+82322078788",
  },
  email: "rohetlee@naver.com",
  address: {
    ko: "경기도 부천시",
    // TODO: 도로명 상세 주소 확정 후 입력
    detail: "",
  },
  // TODO: 사업자등록번호 확정 후 입력 (비어 있으면 푸터에 표시하지 않음)
  bizNo: "",

  kakao: {
    id: "@법률사무소로앤이",
    url: "https://pf.kakao.com/_YxgWxcn",
  },
  wechat: {
    qr: "/images/wechat-qr.png",
    url: "https://u.wechat.com/kJUeofCrP0oA6Fgc0Nt28DU?s=3",
    // TODO: 위챗 ID 를 공개할 경우 입력 (비어 있으면 모달에 ID 복사 줄을 숨김)
    id: "",
  },

  mainSite: "https://lawfirmrohandlee.com",
} as const;

export type Site = typeof site;
