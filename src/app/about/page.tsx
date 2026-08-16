"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, Zap, Globe2, Cpu, ArrowRight, Layers, Terminal, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 font-mono text-xs pb-24 sm:pb-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="mono-label text-ron-cyan uppercase tracking-[0.25em] block font-bold">
          ARCHITECTURAL MANIFESTO • WHITE PAPER
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight font-sans">
          The Programmable Economy
        </h1>
        <p className="text-sm sm:text-base text-ron-muted leading-relaxed font-sans">
          RON is not just a token. It is an intelligent, high-frequency digital economic infrastructure engineered to move global value with zero friction.
        </p>
      </div>

      {/* Cyber Characters Grid (Trendy Web3 Vibe) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Operator */}
        <div className="p-4 rounded-[10px] surface-type-c tech-corner-tl space-y-3 group hover:border-ron-cyan/60 transition-all">
          <div className="relative aspect-square w-full rounded-[8px] overflow-hidden border border-white/10 shadow-lg">
            <Image
              src="/images/cyber_operator.jpg"
              alt="RON Cyber Operator"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div>
            <span className="mono-label text-[8.5px] text-ron-cyan font-bold block">SOVEREIGN CORE</span>
            <h4 className="text-white font-bold text-sm font-sans mt-0.5">Sovereign Operators</h4>
            <p className="text-[11px] text-ron-muted font-sans mt-1">
              Permissionless value control with sub-second cryptographic finality.
            </p>
          </div>
        </div>

        {/* Card 2: AI Oracle */}
        <div className="p-4 rounded-[10px] surface-type-c tech-corner-tl space-y-3 group hover:border-ron-violet/60 transition-all">
          <div className="relative aspect-square w-full rounded-[8px] overflow-hidden border border-white/10 shadow-lg">
            <Image
              src="/images/cyber_oracle.jpg"
              alt="RON AI Oracle"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div>
            <span className="mono-label text-[8.5px] text-ron-violet font-bold block">NEURAL LAYER</span>
            <h4 className="text-white font-bold text-sm font-sans mt-0.5">AI Oracle & Telemetry</h4>
            <p className="text-[11px] text-ron-muted font-sans mt-1">
              Autonomous cognitive monitoring of mempool flows and liquidity depth.
            </p>
          </div>
        </div>

        {/* Card 3: Cyber Runner */}
        <div className="p-4 rounded-[10px] surface-type-c tech-corner-tl space-y-3 group hover:border-ron-green/60 transition-all">
          <div className="relative aspect-square w-full rounded-[8px] overflow-hidden border border-white/10 shadow-lg">
            <Image
              src="/images/cyber_runner.jpg"
              alt="RON Cyber Runner"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div>
            <span className="mono-label text-[8.5px] text-ron-green font-bold block">GLOBAL FABRIC</span>
            <h4 className="text-white font-bold text-sm font-sans mt-0.5">Decentralized Mesh</h4>
            <p className="text-[11px] text-ron-muted font-sans mt-1">
              18,482 global physical nodes connected across 42 sovereign jurisdictions.
            </p>
          </div>
        </div>
      </div>

      {/* Manifesto Body Sections */}
      <div className="space-y-6 text-xs text-ron-muted leading-relaxed font-sans">
        {/* Section 1 */}
        <div className="p-6 sm:p-8 rounded-[8px] surface-type-b space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-ron-cyan" />
            <span>01. The Problem: Friction in Global Value Transfer</span>
          </h2>
          <p>
            Traditional global financial networks remain partitioned by legacy banking rails, high fee structures, and multi-day settlement delays. Early blockchain systems solved the problem of centralized custody but introduced severe throughput bottlenecks, unpredictable gas spikes, and latency constraints unsuitable for high-frequency institutional commerce.
          </p>
        </div>

        {/* Section 2 */}
        <div className="p-6 sm:p-8 rounded-[8px] surface-type-b space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-ron-green" />
            <span>02. The Architecture: Turing-BFT Consensus</span>
          </h2>
          <p>
            RON implements a high-throughput Turing-BFT consensus engine coupled with native Zero-Knowledge state verifiers. By decoupling state execution from transaction ordering, RON achieves 12,800+ transactions per second with deterministic 0.42-second finality and sub-cent fee predictability.
          </p>
        </div>

        {/* Section 3 */}
        <div className="p-6 sm:p-8 rounded-[8px] surface-type-b space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-ron-violet" />
            <span>03. Native Cognitive Layer: RON Intelligence</span>
          </h2>
          <p>
            Unlike static state machines, RON natively embeds an autonomous neural layer for real-time mempool inspection, automated MEV shielding, liquidity stress mitigation, and anomaly prevention. The protocol monitors its own consensus health to optimize routing parameters in real time.
          </p>
        </div>
      </div>

      {/* Next Steps CTA */}
      <div className="p-8 rounded-[8px] surface-type-c text-center space-y-4">
        <h3 className="text-xl sm:text-2xl font-black text-white font-sans">
          Ready to Build on the Programmable Economy?
        </h3>
        <p className="text-xs text-ron-muted max-w-md mx-auto font-sans">
          Deploy high-frequency smart contracts, configure validator nodes, or integrate the multi-language SDK.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link href="/developers">
            <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4 text-black" />}>
              EXPLORE DEVELOPER SDK
            </Button>
          </Link>
          <Link href="/network">
            <Button variant="secondary" size="md">
              VIEW LIVE NOC
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
