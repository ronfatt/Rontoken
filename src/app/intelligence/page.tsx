"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRonStore } from "@/lib/store";
import { formatNumber, formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import {
  Cpu,
  Terminal,
  Send,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
  Radio,
  Lock,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const QUICK_CHIPS = [
  { label: "MY PORTFOLIO", query: "Analyze my portfolio" },
  { label: "STAKING YIELD", query: "Analyze my staking positions" },
  { label: "NETWORK RISK", query: "/risk" },
  { label: "LIVE TPS", query: "/network" },
  { label: "LIQUIDITY DEPTH", query: "/liquidity" },
  { label: "DAO PROPOSALS", query: "Show active proposals" },
];

export default function IntelligencePage() {
  const { metrics, ronBalance, stakedBalance, portfolioValueUSD, stakingPositions, validators, proposals } = useRonStore();
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<Array<{
    sender: "AI" | "USER";
    title?: string;
    text: string;
    metrics?: Record<string, string>;
    cta?: { label: string; href: string };
    time: string;
  }>>([
    {
      sender: "AI",
      title: "COGNITIVE PROTOCOL AUDITOR",
      text: "RON Intelligence initialized. Autonomous cognitive telemetry connected across 184 validators with 0.42s state observation. Select a prompt or ask any question.",
      time: "10:00",
    },
  ]);
  const [isThinking, setIsThinking] = useState(false);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg = { sender: "USER" as const, text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setIsThinking(true);

    await new Promise((r) => setTimeout(r, 500));

    let aiReplyTitle = "NETWORK TELEMETRY";
    let aiReplyText = "Telemetry analyzed. All consensus metrics are nominal.";
    let aiMetrics: Record<string, string> | undefined = undefined;
    let aiCta: { label: string; href: string } | undefined = undefined;

    const lower = text.toLowerCase();

    if (lower.includes("portfolio") || lower.includes("balance") || lower.includes("my account")) {
      aiReplyTitle = "SOVEREIGN PORTFOLIO ANALYSIS";
      aiReplyText = `Your portfolio is valued at ${formatCurrency(portfolioValueUSD, 2)}. You maintain ${formatNumber(ronBalance, 2)} liquid RON and ${formatNumber(stakedBalance, 2)} staked RON across ${stakingPositions.length} validator hub(s). Total voting power is ${formatNumber(ronBalance + stakedBalance * 1.5, 0)} vRON. Zero unfinalized transactions in mempool.`;
      aiMetrics = {
        "PORTFOLIO VALUE": formatCurrency(portfolioValueUSD, 2),
        "LIQUID RON": `${formatNumber(ronBalance, 2)} RON`,
        "STAKED RON": `${formatNumber(stakedBalance, 2)} RON`,
        "VOTING POWER": `${formatNumber(ronBalance + stakedBalance * 1.5, 0)} vRON`,
      };
      aiCta = { label: "VIEW FULL WALLET", href: "/wallet" };
    } else if (lower.includes("staking") || lower.includes("stake") || lower.includes("yield")) {
      aiReplyTitle = "STAKING & YIELD INSPECTION";
      const accrued = stakingPositions.reduce((s, p) => s + p.accruedRewards, 0);
      aiReplyText = `You have ${stakingPositions.length} active delegation(s) totaling ${formatNumber(stakedBalance, 2)} RON earning up to 18.42% APY. Slashing insurance status is 100% protocol backed.`;
      aiMetrics = {
        "STAKED PRINCIPAL": `${formatNumber(stakedBalance, 2)} RON`,
        "ACCRUED REWARDS": `+${formatNumber(accrued, 4)} RON`,
        "MAX APY": "18.42%",
        "STATUS": "INSURED",
      };
      aiCta = { label: "MANAGE STAKING", href: "/stake" };
    } else if (lower.includes("/network") || lower.includes("network") || lower.includes("tps")) {
      aiReplyTitle = "CONSENSUS & MEMPOOL TELEMETRY";
      aiReplyText = `Consensus is operating at ${metrics.currentTps.toLocaleString()} TPS with 0.42s finality across 184 globally distributed validator clusters.`;
      aiMetrics = {
        "CURRENT TPS": `${metrics.currentTps.toLocaleString()} TPS`,
        "FINALITY": "0.42s Sub-second",
        "VALIDATORS": `${metrics.activeValidators} Active`,
        "GAS TARGET": `${metrics.avgGasGwei} Gwei`,
      };
      aiCta = { label: "NETWORK NOC", href: "/network" };
    } else if (lower.includes("/risk") || lower.includes("risk") || lower.includes("security")) {
      aiReplyTitle = "SECURITY & RISK ASSESSMENT";
      aiReplyText = `Risk index is OPTIMAL (Score 99.8/100). Zero invalid ZK state proofs detected in the last 10,000 blocks. Slashing insurance cushion is funded with $22.5M reserve.`;
      aiMetrics = {
        "RISK SCORE": "99.8 / 100",
        "EXPLOITS": "0 Detected",
        "RESERVE FUND": "$22.5M Insured",
      };
      aiCta = { label: "VIEW NODE ATLAS", href: "/nodes" };
    } else if (lower.includes("/liquidity") || lower.includes("liquidity") || lower.includes("swap")) {
      aiReplyTitle = "DEX LIQUIDITY DEPTH";
      aiReplyText = `Aggregated TVL across Turing-AMM pools is $${(metrics.tvl / 1000000).toFixed(1)}M USD with average route slippage of 0.03%.`;
      aiMetrics = {
        "AMM TVL": `$${(metrics.tvl / 1000000).toFixed(1)}M`,
        "AVG SLIPPAGE": "0.03%",
        "ROUTING": "Turing-AMM v2.4",
      };
      aiCta = { label: "OPEN SWAP", href: "/swap" };
    } else {
      aiReplyTitle = "PROTOCOL OBSERVATION";
      aiReplyText = `Telemetry query processed for "${text}". Blockchain state root #24893441 is verified with continuous 0.42s block settlement.`;
    }

    const aiMsg = {
      sender: "AI" as const,
      title: aiReplyTitle,
      text: aiReplyText,
      metrics: aiMetrics,
      cta: aiCta,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, aiMsg]);
    setIsThinking(false);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 font-mono text-xs pb-28 sm:pb-12">
      {/* Header Profile with Cyber AI Oracle Banner */}
      <div className="surface-type-c tech-corner-tl tech-corner-br p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-[10px] overflow-hidden border-2 border-ron-violet/50 shrink-0 shadow-[0_0_25px_rgba(122,92,255,0.35)]">
            <Image
              src="/images/cyber_oracle.jpg"
              alt="Cyber AI Oracle"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 text-ron-cyan text-xs font-bold mb-0.5">
              <Cpu className="w-3.5 h-3.5 text-ron-green" />
              <span className="mono-label text-[9.5px]">NEURAL PROTOCOL AUDITOR V2.4</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">
              RON Intelligence Core
            </h1>
            <p className="text-xs text-ron-muted font-sans mt-0.5">
              ORACLE // KAIROS • Connected to 184 validator clusters with sub-second cognition.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-[4px] bg-ron-green/10 border border-ron-green/30 text-ron-green font-bold text-xs">
          <span className="w-2 h-2 rounded-full bg-ron-green animate-pulse" />
          <span>COGNITIVE CORE ONLINE</span>
        </div>
      </div>

      {/* Horizontal Quick Prompt Chips (Scrollable on mobile) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {QUICK_CHIPS.map((chip) => (
          <button
            key={chip.label}
            onClick={() => handleSendMessage(chip.query)}
            className="px-3.5 py-2 rounded-full surface-type-a hover:surface-type-b hover:border-ron-cyan/50 text-white text-[11px] font-bold whitespace-nowrap active:scale-95 transition-all shrink-0 shadow-md"
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Message Feed Display */}
      <div className="space-y-3">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`p-4 sm:p-5 rounded-[8px] space-y-2.5 ${
              m.sender === "USER"
                ? "ml-auto bg-ron-violet/20 border border-ron-violet/40 text-white max-w-[85%]"
                : "mr-auto surface-type-b text-ron-text max-w-[95%] sm:max-w-[85%]"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="mono-label text-[9.5px] font-bold text-ron-cyan">
                {m.sender === "USER" ? "OPERATOR" : m.title || "RON COGNITIVE CORE"}
              </span>
              <span className="text-[9px] text-ron-dim">{m.time}</span>
            </div>

            <p className="font-sans text-xs leading-relaxed text-ron-text">
              {m.text}
            </p>

            {/* Structured telemetry card block (if metrics present) */}
            {m.metrics && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/[0.06]">
                {Object.entries(m.metrics).map(([k, v]) => (
                  <div key={k} className="p-2.5 rounded-[4px] bg-black/60 border border-white/5">
                    <span className="mono-label text-[8.5px] block text-ron-dim">{k}</span>
                    <span className="text-xs font-bold text-white mono-data mt-0.5 block">{v}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Action CTA link (if present) */}
            {m.cta && (
              <div className="pt-2">
                <Link
                  href={m.cta.href}
                  className="inline-flex items-center gap-1.5 text-ron-cyan hover:underline font-bold text-[11px]"
                >
                  <span>{m.cta.label}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            )}
          </div>
        ))}

        {isThinking && (
          <div className="flex items-center gap-2 p-3.5 surface-type-a text-ron-cyan text-xs rounded-[6px] max-w-xs">
            <span className="w-3.5 h-3.5 border-2 border-ron-cyan border-t-transparent rounded-full animate-spin" />
            <span>Scanning consensus state roots & telemetry...</span>
          </div>
        )}
      </div>

      {/* Fixed Bottom AI Query Bar (Thumb reachable on mobile) */}
      <div className="fixed bottom-16 sm:bottom-0 left-0 right-0 p-3 bg-[#04050A]/95 backdrop-blur-xl border-t border-white/[0.08] z-30">
        <div className="max-w-3xl mx-auto flex items-center gap-2">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage(chatInput);
            }}
            placeholder="Ask 'Analyze my portfolio' or query /network..."
            className="w-full bg-black/80 border border-white/15 rounded-[6px] px-4 py-2.5 text-xs text-white placeholder-ron-muted focus:outline-none focus:border-ron-cyan font-mono"
          />
          <Button
            variant="primary"
            size="md"
            onClick={() => handleSendMessage(chatInput)}
            className="text-xs shrink-0 px-4"
          >
            <Send className="w-3.5 h-3.5 text-black" />
          </Button>
        </div>
      </div>
    </div>
  );
}
