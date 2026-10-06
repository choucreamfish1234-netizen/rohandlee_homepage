import Link from "next/link";
import { dictionaries, defaultLocale } from "@/content/locales";

export default function NotFound() {
  const d = dictionaries[defaultLocale];
  return (
    <div className="container-site py-24 text-center">
      <h1 className="text-[24px] font-bold text-navy">{d.notFound.title}</h1>
      <Link href={`/${defaultLocale}`} className="btn-primary mt-6">{d.notFound.back}</Link>
    </div>
  );
}
