import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Melodify",
  description: "Upload Your Fav Song Where Everyone Can Listean",
};
import React from 'react';

export default function RootLayout({ children }: React.PropsWithChildren<object>) {
  return (
    <html lang="en">
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui"/>
      <meta name="apple-mobile-web-app-capable" content="yes"/>
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} max-w-[1400px] items-center mx-auto antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
