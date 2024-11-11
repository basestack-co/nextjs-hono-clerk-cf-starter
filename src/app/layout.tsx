import React from "react";
import type { Metadata } from "next";
// Providers
import Providers from "./Providers";
// Fonts
import { Inter } from "next/font/google";
// Styles
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Next.js + Hono + Cloudflare Pages",
  description: "A starter template for Next.js + Hono + Cloudflare Pages",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
