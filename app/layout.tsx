import type { Metadata } from "next";
import { Shippori_Mincho, Yuji_Syuku, Klee_One } from "next/font/google";
import "./globals.css";

const shipporiMincho = Shippori_Mincho({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "800"],
});

const yujiSyuku = Yuji_Syuku({
  variable: "--font-brush",
  subsets: ["latin"],
  weight: "400",
});

const kleeOne = Klee_One({
  variable: "--font-handwritten",
  subsets: ["latin"],
  weight: "600",
});

export const metadata: Metadata = {
  title: "麺道 極 - Ultimate Ramen Experience",
  description: "限界を超えた一杯が、あなたの味覚を革命する",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${shipporiMincho.variable} ${yujiSyuku.variable} ${kleeOne.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
