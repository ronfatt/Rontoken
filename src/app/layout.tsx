import type { Metadata } from "next";
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
  title: "RON — The Programmable Economy | One Token. Infinite Utility.",
  description:
    "RON is not just a token. It is an intelligent digital economic infrastructure. Ultra-low latency, sub-second finality, and zero-knowledge sovereign execution.",
  keywords: [
    "RON Network",
    "Programmable Economy",
    "Web3 Infrastructure",
    "Layer 1 Blockchain",
    "DeFi",
    "Staking",
    "Blockchain Explorer",
    "Zero Knowledge",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark bg-[#050507]">
      <body className="min-h-screen bg-[#050507] text-[#F5F7FA] antialiased selection:bg-ron-violet/30 selection:text-white relative">
        <RonStoreProvider>
          {/* Custom Dynamic Precision Cursor (Desktop) */}
          <CustomCursor />

          {/* Cinematic Boot Sequence (First visit per session) */}
          <BootSequence />

          {/* Global Shell Header */}
          <Navbar />

          {/* Main Application Routes */}
          <main className="min-h-screen pt-20">{children}</main>

          {/* Institutional Global Footer */}
          <Footer />

          {/* Global OS Shell Modals & Triggers */}
          <CommandCenter />
          <WalletModal />
          <NotificationCenter />
          <DiagnosticsModal />
        </RonStoreProvider>
      </body>
    </html>
  );
}
