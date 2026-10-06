import Script from "next/script";
import { site } from "@/config/site";

/** GA4 — NEXT_PUBLIC_GA_ID 가 있을 때만 로드. dataLayer 는 항상 준비해 GTM 과 공유한다. */
export function Analytics() {
  if (!site.gaId) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${site.gaId}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${site.gaId}');`}
      </Script>
    </>
  );
}
