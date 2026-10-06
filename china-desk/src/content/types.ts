/**
 * 콘텐츠 스키마 — 모든 언어가 이 타입을 따른다.
 * 새 언어 추가: src/content/<locale>/ 폴더를 만들고 index.ts 에서 Dictionary 를 export → locales.ts 에 등록.
 */

/** 첫 화면 경로 구분: 피해자 / 피의자·피고인 */
export type Audience = "victim" | "accused";

export type CaseSlug =
  | "criminal-investigation"
  | "sex-crime-defense"
  | "sex-crime-victim"
  | "detention"
  | "fraud"
  | "assault"
  | "dui"
  | "rental-deposit"
  | "criminal-procedure"
  | "legal-fees";

export type IconName =
  | "badge" | "shield" | "heart" | "lock" | "alert" | "fist" | "car" | "home" | "route" | "receipt";

export interface FaqItem { q: string; a: string }

export interface ProcedureStep { title: string; body: string }

export interface CaseDetail {
  slug: CaseSlug;
  icon: IconName;
  /** 어느 경로 선택 시 노출할지. 둘 다면 공통 카드 */
  audiences: Audience[];
  /** 절차·비용 같은 안내형 페이지 — 카드 그리드 아래 가로형으로 표시 */
  guide?: boolean;
  /** 카드 제목 = 상세 H1 */
  title: string;
  /** 카드 한 줄 설명 */
  summary: string;
  /** 카드 CTA */
  cardCta: string;
  seo: { title: string; description: string; keywords: string[] };
  /** 1. 현재 상황 */
  situation: { lead: string; body: string[] };
  /** 2. 지금 가장 먼저 할 일 */
  firstSteps: string[];
  /** 3. 하지 말아야 할 행동 */
  donts: string[];
  /** 4. 한국 절차 */
  procedure: { intro?: string; steps: ProcedureStep[] };
  /** 5. 변호사가 도울 수 있는 부분 */
  lawyerHelp: string[];
  /** 6. FAQ */
  faq: FaqItem[];
  /** 7. 상담 CTA */
  cta: { title: string; body: string; button: string };
}

export interface Lawyer {
  /** 사진 저장 키 — 언어판끼리 같아야 한다 */
  id: "lee" | "roh";
  name: string;
  nameKo: string;
  role: string;
  title: string;
  /** 관리자 페이지에서 올린 사진 URL — 비어 있으면 이니셜 표시 */
  photo?: string;
  focus: string[];
  bio: string[];
}

export interface SelectOption { value: string; label: string }

export interface Dictionary {
  locale: string;
  htmlLang: string;
  /** 언어 전환 메뉴에 표시할 자기 언어 이름 (中文 / 한국어) */
  langLabel: string;
  ogLocale: string;
  brand: { name: string; sub: string };
  meta: { title: string; description: string; keywords: string[] };
  nav: { cases: string; process: string; about: string; faq: string; contact: string; consult: string; menu: string; close: string };
  firmInfo: { name: string; address: string; adLawyer: string };
  common: {
    home: string;
    wechatConsult: string;
    wechatContact: string;
    consultNow: string;
    chineseLegalConsult: string;
    phone: string;
    backHome: string;
    relatedCases: string;
    operatedBy: string;
    disclaimer: string;
  };
  hero: {
    eyebrow: string;
    headline: [string, string];
    topics: string[];
    trustLine: string;
    audienceLine: string;
    pathPrompt: string;
    paths: Record<Audience, { title: string; desc: string }>;
    quickTitle: string;
    quickOr: string;
    quickForm: string;
  };
  trust: { title: string; body: string }[];
  cases: {
    title: string;
    subtitle: string;
    filterAll: string;
    filterLabels: Record<Audience, string>;
  };
  why: { title: string; body: string[]; listLead: string; list: string[]; note: string };
  direct: { title: string; body: string };
  process: { title: string; steps: { no: string; title: string; body: string }[] };
  about: { title: string; firmEn: string; firmKo: string; body: string[]; lawyersTitle: string; lawyers: Lawyer[] };
  faq: { title: string; items: FaqItem[] };
  finalCta: { title: string; body: [string, string]; tag: string };
  wechatModal: { title: string; body: string; idLabel: string; copy: string; copied: string; qrAlt: string; fallback: string; formLabel: string; close: string; openInWechat: string };
  form: {
    title: string;
    subtitle: string;
    fields: {
      name: string; namePh: string;
      contactMethod: string; contactValue: string; contactValuePh: string;
      /** 답변 채널 (위챗 / 카카오톡) */
      replyTitle: string; replyNote: string;
      wechatId: string; wechatPh: string; wechatHint: string;
      kakaoId: string; kakaoPh: string; kakaoHint: string;
      phone: string; phonePh: string;
      replyVia: string; replyNeedOne: string;
      country: string;
      caseType: string; caseTypePh: string;
      role: string;
      stage: string;
      description: string; descriptionPh: string;
      urgent: string; urgentHint: string;
      consent: string; consentLink: string;
    };
    contactMethods: SelectOption[];
    countries: SelectOption[];
    roles: SelectOption[];
    stages: SelectOption[];
    otherCaseType: string;
    submit: string;
    submitting: string;
    required: string;
    error: string;
    privacyNote: string;
  };
  received: { title: string; body: [string, string]; nextTitle: string; next: string[]; urgentTitle: string; urgentBody: string; addUsTitle: string; addUsBody: string };
  footer: {
    operator: string;
    service: string;
    address: string;
    phone: string;
    email: string;
    kakao: string;
    bizNo: string;
    adLawyer: string;
    privacy: string;
    mainSite: string;
    notice: string;
  };
  privacy: { title: string; updated: string; sections: { h: string; p: string[] }[] };
  contact: { title: string; subtitle: string; channels: string; emailLabel: string; phoneNote: string; kakaoLabel: string; kakaoNote: string };
  notFound: { title: string; back: string };
  caseDetail: {
    sidebarTitle: string;
    consultBoxTitle: string;
    consultBoxBody: string;
    situation: string;
    firstSteps: string;
    donts: string;
    procedure: string;
    lawyerHelp: string;
    faq: string;
    onThisPage: string;
  };
  caseList: CaseDetail[];
}
