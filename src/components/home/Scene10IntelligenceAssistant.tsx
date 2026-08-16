"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/Button";
import { Terminal, Send, ArrowRight } from "lucide-react";

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
    await new Promise((r) => setTimeout(r, 600));

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
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/[0.04]">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="mono-label block tracking-[0.2em] text-ron-cyan">
            09 // AUTONOMOUS COGNITIVE MONITORING
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            NETWORK INTELLIGENCE. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-ron-text to-ron-cyan">
              NOT JUST DATA.
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-ron-muted max-w-lg mx-auto font-sans">
            Direct natural language querying over live consensus parameters, mempool flows, and smart contract health.
          </p>
        </div>

        {/* AI Assistant Interface Box (Surface Type C) */}
        <div className="surface-type-c tech-corner-tl tech-corner-br overflow-hidden shadow-2xl">
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
              <div className="py-10 flex flex-col items-center justify-center space-y-2">
                <span className="w-5 h-5 border-2 border-ron-cyan border-t-transparent rounded-full animate-spin" />
                <span className="text-ron-cyan text-xs">ANALYZING CONSENSUS & MEMPOOL STATE...</span>
              </div>
            ) : (
              <>
                {/* Query Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <span className="mono-label text-[10px]">QUERY:</span>
                    <span className="text-white font-bold">{activeResponse.query}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-[2px] bg-ron-green/[0.08] border border-ron-green/30 text-ron-green text-[9px] font-bold">
                    {activeResponse.status}
                  </span>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {activeResponse.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="p-3 surface-type-a"
                    >
                      <span className="mono-label text-[9px] block">{m.label}</span>
                      <span className="text-sm font-bold text-ron-cyan mt-1 block mono-data">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Synthesis Summary & Recommendation */}
                <div className="p-4 surface-type-d space-y-2">
                  <span className="mono-label text-[9px] text-ron-violet font-bold block">
                    NEURAL SYNTHESIS
                  </span>
                  <p className="text-ron-text leading-relaxed text-xs font-sans">
                    {activeResponse.summary}
                  </p>
                  <p className="text-ron-green text-xs font-mono font-semibold pt-1">
                    FINDING: {activeResponse.recommendation}
                  </p>
                </div>
              </>
            )}

            {/* Input prompt field */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && inputQuery) handleQuery(inputQuery);
                }}
                placeholder="Query RON Intelligence (e.g. /network or 'Analyze validator risk')..."
                className="w-full bg-black/60 border border-white/10 rounded-[4px] px-3.5 py-2.5 text-xs text-white placeholder-ron-muted focus:outline-none focus:border-ron-cyan font-mono"
              />
              <Button
                variant="primary"
                onClick={() => {
                  if (inputQuery) handleQuery(inputQuery);
                }}
                className="text-xs shrink-0"
                rightIcon={<Send className="w-3 h-3 text-black" />}
              >
                QUERY
              </Button>
            </div>
          </div>

          {/* Full App link */}
          <div className="p-3 bg-black/70 border-t border-white/[0.06] text-center">
            <Link
              href="/intelligence"
              className="inline-flex items-center gap-1.5 text-ron-cyan hover:text-white font-mono text-xs transition-colors uppercase tracking-wider"
            >
              <span>LAUNCH FULL SCREEN RON INTELLIGENCE WORKBENCH</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
