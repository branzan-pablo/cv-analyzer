import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CV Analyzer - Analise seu Currículo com IA",
  description: "Analise seu currículo gratuitamente e descubra como melhorá-lo para se destacar em processos seletivos. Compatível com sistemas ATS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased font-sans text-gray-900 bg-gray-50`}
      >
        {children}
      </body>
    </html>
  );
}
