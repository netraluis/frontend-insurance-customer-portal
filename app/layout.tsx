'use server'
import type React from "react"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import { Toaster } from "@/components/ui/sonner";
// import { use, 
//   // useEffect, useRef, useState 
// } from "react";
// import { useMediaQuery } from "@/hooks/use-media-query";
// import { useScreenSize } from "@/hooks/use-screen-size";
// import { Button } from "@/components/ui/button";
// import { ArrowLeft, MessageSquare, X } from "lucide-react";
// import ChatWidget from "@/components/chat-widget/chat-widget";
// import { LocaleSwitcher } from "@/components/locale-switcher";
import {NextIntlClientProvider} from 'next-intl';





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
  params: Promise<{locale: string}>;
}>) {
  const { locale } = await params;

  return (
    <html lang={locale}>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale} >
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}





