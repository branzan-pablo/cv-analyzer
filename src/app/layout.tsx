import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: 'swap',
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
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased font-sans text-gray-900 bg-gray-50`}
      >
        {children}
      </body>
    </html>
  );
}
