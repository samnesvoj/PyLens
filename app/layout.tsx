import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { AnimatedBackground } from "@/components/AnimatedBackground";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "PyLens — Наглядное изучение Python",
  description:
    "Интерактивное веб-приложение для наглядного изучения функций и методов языка Python",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark">
      <body className={`${inter.variable} ${jetbrains.variable} font-sans`}>
        <AnimatedBackground />
        <Navbar />
        <main className="relative z-10 min-h-screen pt-16">{children}</main>
      </body>
    </html>
  );
}
