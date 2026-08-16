"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/Button";
import { Terminal, Send, ArrowRight, Cpu, Sparkles } from "lucide-react";

interface AIResponse {
  query: string;
  status: "OPTIMAL" | "SECURE" | "EVALUATED";
  metrics: { label: string; value: string; positive: boolean }[];
  summary: string;
  recommendation: string;
}

const PRESET_QUERIES: Record<string, AIResponse> = {
  "Analyze network health": {
    query: "Analyze network health",
    status: "OPTIMAL",
    metrics: [
      { label: "Network Activity", value: "+14.82%", positive: true },
      { label: "Liquidity Depth", value: "+8.20%", positive: true },
      { label: "Validator Participation", value: "98.7%", positive: true },
      { label: "Congestion Risk", value: "LOW (0.04s)", positive: true },
    ],
    summary:
      "RON consensus is executing at peak efficiency. 184 validators are synchronized with zero missed slots in the last 2,400 epochs. Base gas is stable at 0.08 Gwei.",
    recommendation:
      "Network throughput capacity allows a 300% surge without gas fee escalation.",
  },
  "Explain current liquidity": {
    query: "Explain current liquidity",
    status: "EVALUATED",
    metrics: [
      { label: "Total TVL", value: "$428.4M", positive: true },
      { label: "DEX 24h Vol", value: "$182.5M", positive: true },
      { label: "Average Slippage", value: "0.03%", positive: true },
      { label: "MEV Shielding", value: "100% Protected", positive: true },
    ],
    summary:
      "Liquidity depth is concentrated across RON/USDT and RON/ETH teleport pools. Capital efficiency has improved by 24% under Turing-AMM v2.4.",
    recommendation:
      "Cross-chain bridge arbitrage routes are clearing in under 420ms.",
  },
  "Forecast staking yield": {
    query: "Forecast staking yield",
    status: "SECURE",
    metrics: [
      { label: "Current Base APY", value: "14.80%", positive: true },
      { label: "365-Day Locked APY", value: "18.42%", positive: true },
      { label: "Inflation Offset", value: "+11.4%", positive: true },
      { label: "Total Staked Ratio", value: "66.2%", positive: true },
    ],
    summary:
      "Staking yields remain sustained via transaction fee recycling from high DEX throughput and RPC node subscription burns.",
    recommendation:
      "365-day delegation maximizes multiplier to 1.5x with weighted governance influence.",
  },
};

export const Scene10IntelligenceAssistant: React.FC = () => {
  const [inputQuery, setInputQuery] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeResponse, setActiveResponse] = useState<AIResponse>(
    PRESET_QUERIES["Analyze network health"]
  );

  const handleQuery = async (queryText: string) => {
    setIsAnalyzing(true);
    setInputQuery(queryText);
    await new Promise((r) => setTimeout(r, 500));

    const response =
      PRESET_QUERIES[queryText] || {
        query: queryText,
        status: "OPTIMAL",
        metrics: [
          { label: "Query State", value: "VERIFIED", positive: true },
          { label: "Mempool Status", value: "NOMINAL", positive: true },
          { label: "Confidence", value: "99.4%", positive: true },
          { label: "Congestion", value: "ZERO", positive: true },
        ],
        summary: `RON Intelligence processed: "${queryText}". Autonomous neural inspection confirms consensus parameters remain within optimal institutional tolerances.`,
        recommendation:
          "Zero anomalies detected across global RPC clusters and validator sets.",
      };

    setActiveResponse(response);
    setIsAnalyzing(false);
  };

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06] bg-[#04050A] overflow-hidden">
      {/* Ambient background lighting */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-ron-violet/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="mono-label block tracking-[0.2em] text-ron-cyan">
            09 // AUTONOMOUS COGNITIVE MONITORING
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            AI Oracle. Neural Telemetry.
          </h2>
          <p className="text-xs sm:text-sm text-ron-muted max-w-lg mx-auto font-sans">
            Direct natural language querying over live consensus parameters, mempool flows, and smart contract health.
          </p>
        </div>

        {/* Dual-Column Layout: Left Cyber AI Avatar + Right Interactive Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Cyber AI Oracle Line Art (4 cols) */}
          <div className="lg:col-span-4">
            <div className="relative rounded-[12px] p-2 bg-gradient-to-b from-ron-violet/40 via-ron-cyan/20 to-transparent border border-ron-violet/40 shadow-[0_0_35px_rgba(122,92,255,0.25)] tech-corner-tl tech-corner-br overflow-hidden group">
              <div className="absolute inset-0 cyber-scanlines opacity-50 z-10 pointer-events-none" />
              <div className="relative aspect-square w-full rounded-[8px] overflow-hidden bg-black">
                <Image
                  src="/images/cyber_oracle.jpg"
                  alt="RON Cyber AI Oracle"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
              </div>
              <div className="absolute bottom-4 left-4 right-4 z-20 p-2.5 rounded-[6px] bg-[#070913]/90 border border-ron-violet/40 backdrop-blur-md flex items-center justify-between font-mono">
                <div>
                  <span className="mono-label text-[8px] text-ron-violet font-bold block">NEURAL COGNITIVE CORE</span>
                  <span className="text-white font-bold text-[11px]">ORACLE // KAIROS</span>
                </div>
                <span className="text-ron-cyan font-bold text-[10px] mono-data">0.42s SYNC</span>
              </div>
            </div>
          </div>

          {/* Right Column: AI Assistant Terminal (8 cols) */}
          <div className="lg:col-span-8 surface-type-c tech-corner-tl tech-corner-br overflow-hidden shadow-2xl">
            {/* Header Terminal Bar */}
            <div className="px-6 py-3.5 bg-black/80 border-b border-white/[0.08] flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2 text-ron-cyan font-bold">
                <Terminal className="w-3.5 h-3.5" />
                <span>RON INTELLIGENCE TERMINAL V2.4</span>
              </div>
              <span className="text-ron-green flex items-center gap-1.5 text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-ron-green animate-pulse" />
                NEURAL PROVER ONLINE
              </span>
            </div>

            {/* Quick Preset Queries Pills */}
            <div className="p-3.5 bg-black/40 border-b border-white/[0.04] flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="mono-label text-[10px] mr-1">PROMPTS:</span>
              {Object.keys(PRESET_QUERIES).map((q) => (
                <button
                  key={q}
                  onClick={() => handleQuery(q)}
                  className="px-2.5 py-1 rounded-[3px] bg-white/[0.04] hover:bg-ron-violet/20 border border-white/[0.08] text-ron-muted hover:text-white transition-colors text-[10px]"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Response Terminal Content */}
            <div className="p-6 sm:p-8 space-y-6 font-mono text-xs">
              {isAnalyzing ? (
                <div className="flex items-center gap-3 p-8 justify-center text-ron-cyan">
                  <span className="w-4 h-4 border-2 border-ron-cyan border-t-transparent rounded-full animate-spin" />
                  <span>SYNTHESIZING CONSENSUS PROOFS & TELEMETRY...</span>
                </div>
              ) : (
                <>
                  {/* Query Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                    <div>
                      <span className="mono-label text-[9.5px]">QUERY:</span>
                      <p className="text-white font-bold text-sm mt-0.5 font-sans">
                        "{activeResponse.query}"
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded-[2px] bg-ron-green/10 text-ron-green text-[10px] font-bold">
                      {activeResponse.status}
                    </span>
                  </div>

                  {/* 4 Metric Tags */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {activeResponse.metrics.map((m) => (
                      <div key={m.label} className="p-2.5 surface-type-a space-y-0.5">
                        <span className="mono-label text-[8.5px] block">{m.label}</span>
                        <span className="text-white font-bold text-xs mono-data block">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Summary */}
                  <div className="p-4 surface-type-a space-y-1 text-ron-text font-sans text-xs leading-relaxed">
                    <span className="mono-label text-[9px] text-ron-cyan font-bold uppercase block font-mono">
                      SYNTHESIS FINDING
                    </span>
                    <p>{activeResponse.summary}</p>
                  </div>
                </>
              )}

              {/* Terminal Query Input */}
              <div className="flex items-center gap-2 pt-2 border-t border-white/[0.08]">
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleQuery(inputQuery);
                  }}
                  placeholder="Ask 'Analyze my portfolio' or query consensus..."
                  className="w-full bg-black/60 border border-white/10 rounded-[4px] px-3.5 py-2.5 text-xs text-white placeholder-ron-muted focus:outline-none focus:border-ron-cyan font-mono"
                />
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleQuery(inputQuery)}
                  className="text-xs shrink-0 px-4"
                >
                  <Send className="w-3.5 h-3.5 text-black" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
