"use client";

import React from "react";
import Image from "next/image";
import { Zap, ShieldCheck, Cpu, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/Button";

const CORE_PILLARS = [
  {
    icon: Zap,
    tag: "01 // SUB-SECOND LATENCY",
    title: "Instant Finality Engine",
    desc: "0.42-second verifiable cryptographic state settlement with deterministic slot production. Zero mempool congestion.",
    color: "#00E7FF",
  },
  {
    icon: Cpu,
    tag: "02 // COGNITIVE INFRASTRUCTURE",
    title: "AI-Native Turing Sharding",
    desc: "Autonomous neural verification optimizing multi-asset execution routes and mitigating MEV vulnerability vectors.",
    color: "#7A5CFF",
  },
  {
    icon: ShieldCheck,
    tag: "03 // SOVEREIGN SECURITY",
    title: "Zero-Knowledge Enclaves",
    desc: "Hardware-isolated validator clusters operating across 42 sovereign jurisdictions with $22.5M slashing reserve.",
    color: "#96FF4B",
  },
];

export const Scene03WhyRon: React.FC = () => {
  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06] bg-[#04050A] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-ron-cyan/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-ron-violet/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Cyber Character Line Art Hero Display (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[12px] p-2 bg-gradient-to-b from-ron-cyan/30 via-ron-violet/20 to-transparent border border-ron-cyan/40 shadow-[0_0_40px_rgba(0,231,255,0.25)] tech-corner-tl tech-corner-br overflow-hidden group">
              {/* Scanline overlay */}
              <div className="absolute inset-0 cyber-scanlines opacity-50 z-10 pointer-events-none" />

              {/* Character Line Art Image */}
              <div className="relative aspect-square w-full rounded-[8px] overflow-hidden bg-black">
                <Image
                  src="/images/cyber_operator.jpg"
                  alt="RON Cyber Operator Line Art"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
              </div>

              {/* HUD Tag Overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-20 p-3 rounded-[6px] bg-[#070913]/90 border border-ron-cyan/30 backdrop-blur-md flex items-center justify-between font-mono">
                <div>
                  <span className="mono-label text-[8.5px] text-ron-cyan font-bold block">SOVEREIGN OPERATOR</span>
                  <span className="text-white font-bold text-xs">UNIT 01 // NEON VOID</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-ron-green/10 border border-ron-green/30 text-ron-green text-[9px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-ron-green animate-pulse" />
                  AUTHENTICATED
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Strategic Pillars (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[3px] bg-ron-cyan/10 border border-ron-cyan/30 text-ron-cyan font-mono text-[10px] font-bold tracking-widest uppercase">
                <span>NEXT-ERA ARCHITECTURE</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white font-sans tracking-tight">
                Engineered for the Cyber Economy
              </h2>
              <p className="text-xs sm:text-sm text-ron-muted leading-relaxed font-sans max-w-xl">
                RON bridges institutional financial precision with futuristic decentralized computing.
                Every block, transaction, and state transition is sealed with sub-second finality.
              </p>
            </div>

            {/* 3 Pillars */}
            <div className="space-y-4 font-mono text-xs">
              {CORE_PILLARS.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.title}
                    className="p-4 sm:p-5 rounded-[8px] surface-type-b hover:border-ron-cyan/50 transition-all flex flex-col sm:flex-row items-start gap-4 group"
                  >
                    <div
                      className="p-3 rounded-[6px] bg-black/80 border flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                      style={{ borderColor: `${p.color}40`, color: p.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="space-y-1">
                      <span className="mono-label text-[9px] block" style={{ color: p.color }}>
                        {p.tag}
                      </span>
                      <h4 className="font-bold text-white text-sm font-sans">{p.title}</h4>
                      <p className="text-[11px] text-ron-muted leading-relaxed font-sans">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <Link href="/network">
                <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4 text-black" />}>
                  VIEW NETWORK TELEMETRY
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
