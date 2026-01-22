import { SocketSync } from "@/components/socket-sync";
import type { Metadata, Viewport } from "next";
import { Caprasimo, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Caprasimo({
  variable: "--font-serif",
  weight: "400",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#f5f5f5",
};

export const metadata: Metadata = {
  title: "Le Pierrier",
  description: "Topographie interactive",
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`h-dvh w-dvw ${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground overflow-hidden`}
    >
      <body className="w-full h-full font-mono overflow-visible">
        <SocketSync>{children}</SocketSync>
      </body>
    </html>
  );
}
