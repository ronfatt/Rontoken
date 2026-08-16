import type { Metadata, Viewport } from "next";
import "./globals.css";
import { RonStoreProvider } from "@/lib/store";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CommandCenter } from "@/components/layout/CommandCenter";
import { WalletModal } from "@/components/layout/WalletModal";
import { NotificationCenter } from "@/components/layout/NotificationCenter";
import { BootSequence } from "@/components/layout/BootSequence";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { DiagnosticsModal } from "@/components/layout/DiagnosticsModal";

export const metadata: Metadata = {
  title: {
    default: "RON — The Programmable Economy",
    template: "%s | RON Network",
  },
  description:
    "RON is an intelligent digital economic infrastructure demonstrating sub-second settlement, liquid staking, sovereign governance, decentralized exchange, and autonomous cognitive telemetry.",
  keywords: [
    "RON",
    "RON Network",
    "Programmable Economy",
    "Web3 Infrastructure",
    "Blockchain Explorer",
    "DeFi Swap",
    "Liquid Staking",
    "Decentralized Governance",
  ],
  authors: [{ name: "RON Network Architecture Team" }],
  creator: "RON Foundation",
  publisher: "RON Network",
  metadataBase: new URL("https://ron.network"),
  openGraph: {
    title: "RON — The Programmable Economy",
    description: "One Token. Infinite Utility. High-throughput digital economic infrastructure.",
    url: "https://ron.network",
    siteName: "RON Network",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RON — The Programmable Economy",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#050507",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#050507] text-[#F5F7FA] min-h-screen flex flex-col antialiased selection:bg-ron-violet/40 selection:text-white">
        <RonStoreProvider>
          <BootSequence />
          <CustomCursor />
          <Navbar />
          <main className="flex-1 pt-16 sm:pt-20">{children}</main>
          <Footer />
          <CommandCenter />
          <WalletModal />
          <NotificationCenter />
          <DiagnosticsModal />
        </RonStoreProvider>
      </body>
    </html>
  );
}
