import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { site } from "@/config/site";
import { dictionaries, isLocale, locales } from "@/content/locales";
import { Analytics } from "@/components/Analytics";
import { ContactProvider } from "@/components/contact";
import { Footer } from "@/components/layout/Footer";
import { Header, UtilityBar } from "@/components/layout/Header";
import { MobileCta } from "@/components/layout/MobileCta";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0C1830",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = dictionaries[locale];
  return {
    metadataBase: new URL(site.url),
    title: { default: dict.meta.title, template: `%s` },
    applicationName: dict.brand.name,
    formatDetection: { telephone: false },
    icons: { icon: "/icon.svg" },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = dictionaries[locale];

  return (
    <html lang={dict.htmlLang}>
      <body>
        <ContactProvider labels={{ locale, wechatModal: dict.wechatModal, phone: dict.common.phone }}>
          <UtilityBar dict={dict} />
          <Header dict={dict} />
          <main>{children}</main>
          <Footer dict={dict} />
          <MobileCta dict={dict} />
        </ContactProvider>
        <Analytics />
      </body>
    </html>
  );
}
