"use client";

import React from "react";
import { useRonStore } from "@/lib/store";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SubsystemStatus } from "@/lib/types";
import { Activity, ShieldCheck, Server, Radio, Cpu, Layers, Zap } from "lucide-react";

const SUBSYSTEMS: SubsystemStatus[] = [
  { id: "core", name: "RON Consensus Core (Turing-BFT)", category: "Core", status: "OPERATIONAL", uptime90d: 99.998, latencyMs: 14, description: "184 globally distributed validator clusters sealing sub-second slots" },
  { id: "rpc", name: "Global RPC Node Mesh", category: "API", status: "OPERATIONAL", uptime90d: 99.995, latencyMs: 18, description: "18,482 active edge endpoints supporting JSON-RPC 2.0 and WebSockets" },
  { id: "explorer", name: "RON Blockchain Explorer Indexer", category: "API", status: "OPERATIONAL", uptime90d: 99.999, latencyMs: 12, description: "Real-time ledger state indexing, token transfer parser, and contract telemetry" },
  { id: "swap", name: "RON Swap Liquidity Protocol (DEX)", category: "Protocol", status: "OPERATIONAL", uptime90d: 99.992, latencyMs: 22, description: "Automated market maker smart contracts and MEV-shielded batch routing" },
  { id: "stake", name: "Liquid Staking & Slashing Relayer", category: "Protocol", status: "OPERATIONAL", uptime90d: 100.0, latencyMs: 16, description: "Insured validator delegation registry and compounding reward distributer" },
  { id: "ai", name: "RON Intelligence Cognitive Agent", category: "Core", status: "OPERATIONAL", uptime90d: 99.989, latencyMs: 28, description: "Neural state analyzer, risk classification, and mempool anomaly detection" },
  { id: "bridge", name: "EVM & WASM Teleport Relayer", category: "Bridge", status: "OPERATIONAL", uptime90d: 99.974, latencyMs: 42, description: "Zero-knowledge cross-chain cryptographic state verifier and relayer" },
  { id: "gov", name: "RON DAO Governance Engine", category: "Protocol", status: "OPERATIONAL", uptime90d: 100.0, latencyMs: 15, description: "On-chain ballot registry, quorum verification, and execution timelock" },
];

export default function StatusPage() {
  const { metrics } = useRonStore();

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 font-mono text-xs">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 text-ron-green text-xs font-bold mb-1">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span className="mono-label text-[10px]">ALL SYSTEMS OPERATIONAL</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-sans tracking-tight">
            Network Status & Health
          </h1>
          <p className="text-xs sm:text-sm text-ron-muted mt-1 font-sans">
            Real-time operational status, 90-day uptime metrics, and infrastructure cluster latency.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 surface-type-a text-left">
            <span className="mono-label text-[9px] block">GLOBAL UPTIME</span>
            <span className="text-base font-bold text-ron-green mono-data">{metrics.networkUptime}%</span>
          </div>
          <div className="p-3 surface-type-a text-left">
            <span className="mono-label text-[9px] block">CURRENT EPOCH</span>
            <span className="text-base font-bold text-white mono-data">#{metrics.epochNumber}</span>
          </div>
        </div>
      </div>

      {/* Subsystem Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SUBSYSTEMS.map((sub) => (
          <div
            key={sub.id}
            className="surface-type-b p-5 tech-corner-tl space-y-3 hover:border-ron-violet/40 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-ron-green" />
                <h3 className="font-bold text-white text-xs">{sub.name}</h3>
              </div>
              <StatusBadge status={sub.status} size="sm" />
            </div>

            <p className="text-xs text-ron-muted font-sans leading-relaxed">
              {sub.description}
            </p>

            <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10.5px] text-ron-dim">
              <span>90-Day Uptime: <strong className="text-white">{sub.uptime90d}%</strong></span>
              <span>Avg Latency: <strong className="text-ron-cyan">{sub.latencyMs}ms</strong></span>
            </div>
          </div>
        ))}
      </div>

      {/* Incident History Notice */}
      <div className="surface-type-a p-6 text-center space-y-2">
        <span className="mono-label text-[10px] text-ron-green font-bold uppercase block">
          PAST 90 DAYS INCIDENT LOG
        </span>
        <p className="text-xs text-ron-muted max-w-md mx-auto font-sans">
          Zero major outages recorded across consensus and mempool infrastructure in the last 2,160,000 blocks.
        </p>
      </div>
    </div>
  );
}
