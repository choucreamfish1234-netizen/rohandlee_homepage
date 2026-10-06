import Link from "next/link";
import { site } from "@/config/site";
import type { Dictionary } from "@/content/types";
import { BrandMark } from "./BrandMark";
import { KakaoLink, PhoneLink } from "../contact";

export function Footer({ dict }: { dict: Dictionary }) {
  const base = `/${dict.locale}`;
  const f = dict.footer;
  const regular = dict.caseList.filter((c) => !c.guide);
  const guides = dict.caseList.filter((c) => c.guide);

  return (
    <footer className="bg-navy-deep pb-24 text-[13.5px] text-white/70 lg:pb-0">
      <div className="mx-auto grid max-w-site gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_0.8fr_1.4fr]">
        <div>
          <BrandMark dict={dict} href={base} inverse />
          <p className="mt-4 max-w-xs leading-relaxed">{f.service}</p>
        </div>

        <div>
          <h2 className="mb-3 text-[14px] font-semibold text-white">{dict.nav.cases}</h2>
          <ul className="space-y-2">
            {regular.map((c) => (
              <li key={c.slug}>
                <Link href={`${base}/${c.slug}`} className="hover:text-white">{c.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-[14px] font-semibold text-white">{dict.nav.menu}</h2>
          <ul className="space-y-2">
            {guides.map((c) => (
              <li key={c.slug}>
                <Link href={`${base}/${c.slug}`} className="hover:text-white">{c.title}</Link>
              </li>
            ))}
            <li><Link href={`${base}#process`} className="hover:text-white">{dict.nav.process}</Link></li>
            <li><Link href={`${base}#about`} className="hover:text-white">{dict.nav.about}</Link></li>
            <li><Link href={`${base}#faq`} className="hover:text-white">{dict.nav.faq}</Link></li>
            <li><Link href={`${base}/consult`} className="hover:text-white">{dict.nav.consult}</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-[14px] font-semibold text-white">{f.operator}</h2>
          <dl className="space-y-1.5">
            <Row k={f.operator} v={dict.firmInfo.name} />
            <Row k={f.address} v={site.address.detail ? `${dict.firmInfo.address} ${site.address.detail}` : dict.firmInfo.address} />
            <Row k={f.phone} v={<PhoneLink location="footer" className="hover:text-white">{site.phone.intl}</PhoneLink>} />
            <Row k={f.kakao} v={<KakaoLink location="footer" className="hover:text-white">{site.kakao.id}</KakaoLink>} />
            <Row k={f.email} v={<a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a>} />
            {site.bizNo && <Row k={f.bizNo} v={site.bizNo} />}
            <Row k={f.adLawyer} v={dict.firmInfo.adLawyer} />
          </dl>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-site flex-col gap-3 px-4 py-6 text-[12.5px] sm:px-6 md:flex-row md:items-center md:justify-between">
          <p className="text-white/50">{f.notice}</p>
          <div className="flex shrink-0 items-center gap-5">
            <Link href={`${base}/privacy`} className="font-semibold text-white/80 hover:text-white">{f.privacy}</Link>
            <a href={site.mainSite} target="_blank" rel="noopener" className="hover:text-white">{f.mainSite} ↗</a>
          </div>
        </div>
        <p className="mx-auto max-w-site px-4 pb-8 text-[12px] text-white/40 sm:px-6">© {new Date().getFullYear()} Law Firm Roh&amp;Lee · 법률사무소 로앤이</p>
      </div>
    </footer>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <dt className="w-[6.5em] shrink-0 text-white/45">{k}</dt>
      <dd className="min-w-0 break-words">{v}</dd>
    </div>
  );
}
