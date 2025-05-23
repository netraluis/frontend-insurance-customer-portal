'use server'
import type React from "react"
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { LocaleSwitcher } from "@/components/locale-switcher";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params:  Promise<{locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale}>
          <div key={locale}>
            {children}
            <div className="fixed top-4 right-4 z-50">
              <LocaleSwitcher />
            </div>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}





