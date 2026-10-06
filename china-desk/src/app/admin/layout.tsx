import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "China Desk 관리자",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-mist">{children}</body>
    </html>
  );
}
