import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "종합광고 | 네이버 · 당근마켓 · SNS 통합 광고 솔루션",
  description: "네이버 파워링크, 쇼핑검색, 플레이스 광고부터 당근마켓, 인스타그램, 유튜브까지 모든 광고를 한 곳에서. 제이코리아가 제공하는 프리미엄 종합 광고 서비스",
  keywords: "네이버광고, 당근마켓광고, 인스타그램광고, 유튜브광고, 검색광고, 플레이스광고, 종합광고",
  openGraph: {
    title: "종합광고 | 네이버 · 당근마켓 · SNS 통합 광고 솔루션",
    description: "모든 광고를 한 곳에서. 제이코리아가 제공하는 프리미엄 종합 광고 서비스",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
