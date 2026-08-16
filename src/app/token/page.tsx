"use client";

import React, { useState } from "react";
import { TOKEN_ALLOCATIONS } from "@/lib/mock-data";
import { useRonStore } from "@/lib/store";
import { formatCompactNumber, formatCurrency, formatNumber } from "@/lib/utils";
import { Layers, Flame, Lock, Unlock, Zap, ShieldCheck, Vote, Coins } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const UTILITIES = [
  {
    title: "Gas & Computational Settlement",
    desc: "Every transaction, smart contract execution, and ZK state proof verification is settled instantly in sub-cent RON.",
    icon: Zap,
    metric: "$0.0004 Avg Gas",
  },
  {
    title: "Validator Staking & Slashing Collateral",
    desc: "184 institutional validators stake RON to participate in Turing-BFT consensus. Misbehavior triggers automatic 5% slashing.",
    icon: ShieldCheck,
    metric: "18.42% Max Yield",
  },
  {
    title: "Decentralized DAO Governance",
    desc: "Token holders vote on network upgrades, parameter adjustments, and ecosystem grant distributions using time-weighted vRON.",
    icon: Vote,
    metric: "100% On-Chain",
  },
  {
    title: "Algorithmic Mempool Fee Burn (EIP-1559+)",
    desc: "80% of all base transaction fees are automatically and permanently burned, making RON deflationary as throughput surges.",
    icon: Flame,
    metric: "14.2M+ Burned",
  },
];

export default function TokenPage() {
  const { metrics, setWalletModalOpen } = useRonStore();
  const [activeAllocId, setActiveAllocId] = useState(TOKEN_ALLOCATIONS[0].id);

  const selectedAlloc =
    TOKEN_ALLOCATIONS.find((a) => a.id === activeAllocId) || TOKEN_ALLOCATIONS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-ron-violet uppercase tracking-widest px-3 py-1 rounded-full bg-ron-violet/10 border border-ron-violet/30">
          <Coins className="w-3.5 h-3.5" />
          <span>NATIVE NETWORK ASSET • RON</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Tokenomics & Distribution Engine
        </h1>
        <p className="text-xs sm:text-sm text-ron-muted leading-relaxed">
          1,000,000,000 fixed genesis supply. Engineered for sustainable long-term economic alignment,
          zero inflationary dilution, and algorithmic fee burning.
        </p>
      </div>

      {/* Key Token Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
        <div className="p-4 rounded-xl bg-ron-surface/80 border border-white/10 space-y-1">
          <span className="text-ron-dim text-[10px] uppercase">TOTAL SUPPLY</span>
          <span className="text-xl font-bold text-white block">1,000,000,000 RON</span>
          <span className="text-[10px] text-ron-cyan">Fixed Genesis Cap</span>
        </div>

        <div className="p-4 rounded-xl bg-ron-surface/80 border border-white/10 space-y-1">
          <span className="text-ron-dim text-[10px] uppercase">CIRCULATING FLOAT</span>
          <span className="text-xl font-bold text-ron-green block">
            {formatCompactNumber(metrics.circulatingSupply)} RON
          </span>
          <span className="text-[10px] text-ron-green">64.6% Circulating</span>
        </div>

        <div className="p-4 rounded-xl bg-ron-surface/80 border border-white/10 space-y-1">
          <span className="text-ron-dim text-[10px] uppercase">BURNED SUPPLY</span>
          <span className="text-xl font-bold text-ron-red block flex items-center gap-1">
            <Flame className="w-4 h-4" />
            {formatCompactNumber(metrics.burnedRon)} RON
          </span>
          <span className="text-[10px] text-ron-red">Algorithmic Gas Destruction</span>
        </div>

        <div className="p-4 rounded-xl bg-ron-surface/80 border border-white/10 space-y-1">
          <span className="text-ron-dim text-[10px] uppercase">TOTAL STAKED</span>
          <span className="text-xl font-bold text-ron-violet block">
            {formatCompactNumber(428000000)} RON
          </span>
          <span className="text-[10px] text-ron-violet">66.2% of Float Staked</span>
        </div>
      </div>

      {/* Token Utility Matrix Grid */}
      <div className="space-y-6">
        <div className="border-b border-white/10 pb-4">
          <h2 className="text-2xl font-bold text-white">Four Pillars of Utility</h2>
          <p className="text-xs text-ron-muted mt-1 font-mono">
            Every layer of the programmable economy drives sustained token demand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {UTILITIES.map((u) => {
            const Icon = u.icon;
            return (
              <div
                key={u.title}
                className="p-6 rounded-2xl bg-ron-surface/70 border border-white/10 space-y-4 hover:border-ron-violet/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-ron-violet/10 border border-ron-violet/30 flex items-center justify-center text-ron-cyan">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-white">{u.title}</h3>
                  <p className="text-xs text-ron-muted leading-relaxed">{u.desc}</p>
                </div>

                <div className="pt-3 border-t border-white/5 font-mono text-xs text-ron-green font-bold">
                  {u.metric}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Allocation Breakdown & Interactive Vesting Inspector */}
      <div className="p-8 rounded-2xl bg-ron-surface/80 border border-white/10 shadow-2xl backdrop-blur-xl space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white">Genesis Allocation & Vesting Curves</h3>
            <p className="text-xs text-ron-muted font-mono mt-1">
              Select a pool to inspect vesting milestones and lock schedules.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="primary"
              onClick={() => setWalletModalOpen(true)}
              className="text-xs font-mono"
            >
              ACQUIRE RON
            </Button>
          </div>
        </div>

        {/* Allocation Categories Selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {TOKEN_ALLOCATIONS.map((alloc) => {
            const isSelected = activeAllocId === alloc.id;
            return (
              <button
                key={alloc.id}
                onClick={() => setActiveAllocId(alloc.id)}
                className={`p-3 rounded-xl border font-mono text-left transition-all ${
                  isSelected
                    ? "bg-ron-violet/20 border-ron-cyan text-white shadow-[0_0_15px_rgba(0,223,247,0.2)]"
                    : "bg-black/30 border-white/5 text-ron-muted hover:text-white"
                }`}
              >
                <span className="text-[10px] block truncate">{alloc.name}</span>
                <span className="text-sm font-bold block mt-1" style={{ color: alloc.color }}>
                  {alloc.percentage}%
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Pool Deep Inspector */}
        <div className="p-6 rounded-xl bg-black/60 border border-white/10 grid grid-cols-1 md:grid-cols-4 gap-6 font-mono text-xs">
          <div className="space-y-1">
            <span className="text-ron-dim text-[10px] uppercase">ALLOCATION POOL</span>
            <span className="text-base font-bold text-white block">{selectedAlloc.name}</span>
            <span className="text-[11px] text-ron-muted leading-tight block">
              {selectedAlloc.description}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-ron-dim text-[10px] uppercase">TOTAL ALLOCATED</span>
            <span className="text-base font-bold text-ron-cyan block">
              {formatCompactNumber(selectedAlloc.amount)} RON
            </span>
            <span className="text-[11px] text-ron-muted block">
              {formatCurrency(selectedAlloc.amount * metrics.ronPrice)}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-ron-dim text-[10px] uppercase">RELEASE STATUS</span>
            <span className="text-base font-bold text-ron-green block">
              {formatCompactNumber(selectedAlloc.released)} RELEASED
            </span>
            <span className="text-[11px] text-ron-amber block">
              {formatCompactNumber(selectedAlloc.locked)} LOCKED
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-ron-dim text-[10px] uppercase">VESTING SCHEDULE</span>
            <span className="text-base font-bold text-white block">
              {selectedAlloc.vestingPeriod}
            </span>
            <span className="text-[11px] text-ron-muted block">Smart contract timelock verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}
