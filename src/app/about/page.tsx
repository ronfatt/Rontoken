"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, Zap, Globe2, Cpu, ArrowRight, Layers } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="font-mono text-xs text-ron-cyan uppercase tracking-widest block font-bold">
          ARCHITECTURAL MANIFESTO • WHITE PAPER
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
          The Programmable Economy
        </h1>
        <p className="text-base sm:text-lg text-ron-muted leading-relaxed">
          RON is not just a cryptocurrency token. It is an intelligent, high-frequency digital economic infrastructure engineered to move global value with zero friction.
        </p>
      </div>

      {/* Manifesto Body Sections */}
      <div className="space-y-10 text-sm text-ron-muted leading-relaxed">
        {/* Section 1 */}
        <div className="p-8 rounded-2xl bg-ron-surface/80 border border-white/10 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 font-sans">
            <Zap className="w-5 h-5 text-ron-cyan" />
            <span>01. The Problem: Friction in Global Value Transfer</span>
          </h2>
          <p>
            Traditional global financial networks remain partitioned by legacy banking rails, high fee structures, and multi-day settlement delays. Early blockchain systems solved the problem of centralized custody but introduced severe throughput bottlenecks, unpredictable gas spikes, and latency constraints unsuitable for high-frequency institutional commerce.
          </p>
        </div>

        {/* Section 2 */}
        <div className="p-8 rounded-2xl bg-ron-surface/80 border border-white/10 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 font-sans">
            <ShieldCheck className="w-5 h-5 text-ron-green" />
            <span>02. The Architecture: Turing-BFT Consensus</span>
          </h2>
          <p>
            RON implements a high-throughput Turing-BFT consensus engine coupled with native Zero-Knowledge state verifiers. By decoupling state execution from transaction ordering, RON achieves 12,800+ transactions per second with deterministic 0.42-second finality and sub-cent fee predictability.
          </p>
        </div>

        {/* Section 3 */}
        <div className="p-8 rounded-2xl bg-ron-surface/80 border border-white/10 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 font-sans">
            <Cpu className="w-5 h-5 text-ron-violet" />
            <span>03. Native Cognitive Layer: RON Intelligence</span>
          </h2>
          <p>
            Unlike static state machines, RON natively embeds an autonomous neural layer for real-time mempool inspection, automated MEV shielding, liquidity stress mitigation, and anomaly prevention. The protocol monitors its own consensus health to optimize routing parameters in real time.
          </p>
        </div>
      </div>

      {/* Next Steps CTA */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-ron-violet/20 via-ron-cyan/20 to-ron-green/20 border border-white/10 text-center space-y-4">
        <h3 className="text-xl font-bold text-white">Experience the Network</h3>
        <p className="text-xs text-ron-muted max-w-md mx-auto">
          Explore the live blocks, test the DEX order router, simulate staking delegation, or review developer documentation.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link href="/explorer">
            <Button variant="primary" className="text-xs font-mono">
              OPEN EXPLORER
            </Button>
          </Link>
          <Link href="/developers">
            <Button variant="secondary" className="text-xs font-mono">
              DEVELOPER DOCS
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
