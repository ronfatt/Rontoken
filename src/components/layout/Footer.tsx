"use client";

import React from "react";
import Link from "next/link";
import { useRonStore } from "@/lib/store";
import { Radio } from "lucide-react";

export const Footer: React.FC = () => {
  const { metrics } = useRonStore();

  return (
    <footer className="relative bg-[#050507] border-t border-white/[0.08] pt-20 pb-14 overflow-hidden">
      {/* Grand Ambient RON Watermark Fading Into Infrastructure */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 font-sans font-black text-[22vw] text-white/[0.015] select-none pointer-events-none tracking-tighter leading-none whitespace-nowrap">
        RON
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 lg:gap-14 mb-16">
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-white text-black font-mono font-black text-xs flex items-center justify-center rounded-[4px] tracking-tight">
                R
              </div>
              <div>
                <span className="font-sans font-bold text-sm tracking-[0.18em] text-white block leading-none">
                  RON
                </span>
                <span className="font-mono text-[9px] text-ron-cyan tracking-wider">
                  THE PROGRAMMABLE ECONOMY
                </span>
              </div>
            </div>

            <p className="text-xs text-ron-muted max-w-sm leading-relaxed font-sans">
              High-throughput digital economic infrastructure. Sub-second BFT consensus, zero-knowledge
              sovereign verification, and autonomous cognitive routing.
            </p>

            <div className="flex items-center gap-3 pt-2 font-mono text-xs">
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-[3px] bg-ron-green/[0.06] border border-ron-green/20 text-ron-green text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-ron-green animate-pulse" />
                <span>CONSENSUS OPTIMAL</span>
              </div>
              <span className="text-ron-dim text-[10px]">
                UPTIME: {metrics.networkUptime}%
              </span>
            </div>
          </div>

          {/* Network Links */}
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-widest text-white font-bold mb-4">
              Infrastructure
            </h4>
            <ul className="space-y-2.5 font-mono text-xs text-ron-muted">
              <li>
                <Link href="/explorer" className="hover:text-white transition-colors">
                  Blockchain Explorer
                </Link>
              </li>
              <li>
                <Link href="/network" className="hover:text-white transition-colors">
                  Operations Center
                </Link>
              </li>
              <li>
                <Link href="/nodes" className="hover:text-white transition-colors">
                  Validator Node Atlas
                </Link>
              </li>
              <li>
                <Link href="/token" className="hover:text-white transition-colors">
                  Tokenomics & Flow
                </Link>
              </li>
            </ul>
          </div>

          {/* Ecosystem Links */}
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-widest text-white font-bold mb-4">
              Protocols
            </h4>
            <ul className="space-y-2.5 font-mono text-xs text-ron-muted">
              <li>
                <Link href="/swap" className="hover:text-white transition-colors">
                  RON Swap (DEX)
                </Link>
              </li>
              <li>
                <Link href="/stake" className="hover:text-white transition-colors">
                  RON Staking Hub
                </Link>
              </li>
              <li>
                <Link href="/intelligence" className="hover:text-white transition-colors">
                  RON Intelligence
                </Link>
              </li>
              <li>
                <Link href="/governance" className="hover:text-white transition-colors">
                  RON DAO Governance
                </Link>
              </li>
              <li>
                <Link href="/ecosystem" className="hover:text-white transition-colors">
                  Sovereign App Directory
                </Link>
              </li>
            </ul>
          </div>

          {/* Developers & Docs */}
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-widest text-white font-bold mb-4">
              Developers
            </h4>
            <ul className="space-y-2.5 font-mono text-xs text-ron-muted">
              <li>
                <Link href="/developers" className="hover:text-white transition-colors">
                  SDK & API Reference
                </Link>
              </li>
              <li>
                <Link href="/developers" className="hover:text-white transition-colors">
                  RPC Endpoints
                </Link>
              </li>
              <li>
                <Link href="/developers" className="hover:text-white transition-colors">
                  Smart Contract Standards
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Architecture Whitepaper
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[11px] text-ron-dim">
          <p className="max-w-2xl text-center md:text-left leading-relaxed">
            <span className="text-ron-muted font-bold">Important Notice:</span> RON Network is
            currently presented as a conceptual technology demonstration. Network metrics,
            transaction activity, and token parameters are simulated for demonstration purposes.
          </p>

          <div className="flex items-center gap-4 shrink-0">
            <span>SLOT #{metrics.blockHeight.toLocaleString()}</span>
            <span>•</span>
            <span>© 2026 RON NETWORK</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
