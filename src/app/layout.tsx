import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "1도플러스 - 프리미엄 전기매트 & 건강사우나",
  description: "최고급 원적외선 전기매트와 건강사우나로 온 가족의 건강을 지켜드립니다. 20년 전통 제조 기술력으로 만든 프리미엄 제품을 만나보세요.",
  keywords: "전기매트, 건강사우나, 원적외선, 온열매트, 찜질, 건강",
  openGraph: {
    title: "1도플러스 - 프리미엄 전기매트 & 건강사우나",
    description: "최고급 원적외선 전기매트와 건강사우나로 온 가족의 건강을 지켜드립니다.",
    images: [
      {
        url: "/누끼_썬돔E_모델_옆면 2.png",
        width: 1200,
        height: 630,
        alt: "금운모 돔사우나",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
