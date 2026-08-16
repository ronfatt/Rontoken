"use client";

import React, { useState } from "react";
import { useRonStore } from "@/lib/store";
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
} from "lucide-react";

const NAV_ITEMS = [
  { id: "overview", name: "Overview", icon: Activity },
  { id: "network", name: "Network Health", icon: Radio },
  { id: "wallets", name: "Wallet Profiler", icon: Layers },
  { id: "liquidity", name: "Liquidity Depth", icon: Zap },
  { id: "validators", name: "Validator Risk", icon: ShieldCheck },
  { id: "governance", name: "DAO Analytics", icon: Cpu },
];

export default function IntelligencePage() {
  const { metrics } = useRonStore();
  const [activeTab, setActiveTab] = useState("overview");
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<Array<{ sender: "AI" | "USER"; text: string; time: string }>>([
    {
      sender: "AI",
      text: "RON Intelligence initialized. Monitoring 184 validators and 12,840 TPS. Type a command (/network, /risk, /liquidity) or query any protocol state.",
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

    await new Promise((r) => setTimeout(r, 650));

    let aiReply = "Telemetry analyzed. All consensus metrics are nominal.";
    const lower = text.toLowerCase();

    if (lower.includes("/network") || lower.includes("network")) {
      aiReply = `Network state: OPTIMAL. Slot height #${metrics.blockHeight}. TPS is currently ${metrics.currentTps.toLocaleString()} with 0.42s finality across 184 active validator clusters.`;
    } else if (lower.includes("/risk") || lower.includes("risk")) {
      aiReply = `Risk Assessment: MINIMAL (Score 99.8/100). Zero invalid ZK state proofs detected in the last 10,000 blocks. Insured slashing pool holds $22.5M in reserve.`;
    } else if (lower.includes("/liquidity") || lower.includes("liquidity")) {
      aiReply = `Liquidity Depth: $428.4M TVL. DEX pools are clearing with 0.03% average slippage. Turing-AMM v2.4 route optimization active.`;
    } else if (lower.includes("/validators") || lower.includes("validator")) {
      aiReply = `Validators: 184 synchronized clusters across 42 jurisdictions. Top validator by stake is Apex SG (42.8M RON) with 99.999% uptime.`;
    } else if (lower.includes("/wallet") || lower.includes("wallet")) {
      aiReply = `Wallet profiling active: Sovereign addresses on RON benefit from sub-cent gas execution and hardware-grade enclave signature verification.`;
    } else {
      aiReply = `RON Cognitive Agent processed: "${text}". Consensus verification confirms continuous 0.42s block settlement with 99.998% network uptime.`;
    }

    const aiMsg = { sender: "AI" as const, text: aiReply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages((prev) => [...prev, aiMsg]);
    setIsThinking(false);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-mono text-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 text-ron-cyan text-xs font-bold mb-1">
            <Cpu className="w-3.5 h-3.5 text-ron-green" />
            <span className="mono-label text-[10px]">NEURAL PROTOCOL AUDITOR V2.4</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-sans tracking-tight">
            RON Intelligence Center
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-ron-green animate-pulse" />
          <span className="text-ron-green font-bold text-[11px]">AUTONOMOUS COGNITION ACTIVE</span>
        </div>
      </div>

      {/* 3-Zone Analytical Layout: Left Sub-nav, Center Telemetry, Right Assistant Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Sub-nav (3 cols) */}
        <div className="lg:col-span-3 space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isSel = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-[4px] border text-left transition-all ${
                  isSel
                    ? "bg-ron-violet/20 border-ron-violet text-white font-bold"
                    : "surface-type-a text-ron-muted hover:text-white"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSel ? "text-ron-cyan" : "text-ron-dim"}`} />
                <span className="text-xs">{item.name}</span>
              </button>
            );
          })}

          <div className="p-4 surface-type-a space-y-2 mt-4">
            <span className="mono-label text-[9px] uppercase block">SLASH COMMAND SHORTCUTS</span>
            <div className="space-y-1 text-[11px] text-ron-cyan font-mono">
              <p onClick={() => handleSendMessage("/network")} className="cursor-pointer hover:underline">
                /network
              </p>
              <p onClick={() => handleSendMessage("/risk")} className="cursor-pointer hover:underline">
                /risk
              </p>
              <p onClick={() => handleSendMessage("/liquidity")} className="cursor-pointer hover:underline">
                /liquidity
              </p>
              <p onClick={() => handleSendMessage("/validators")} className="cursor-pointer hover:underline">
                /validators
              </p>
            </div>
          </div>
        </div>

        {/* Center Analytics Display (5 cols) */}
        <div className="lg:col-span-5 p-6 surface-type-b tech-corner-tl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <h3 className="font-bold text-white uppercase tracking-wider text-xs">
              {NAV_ITEMS.find((n) => n.id === activeTab)?.name} Inspection
            </h3>
            <span className="text-ron-green text-[10px] font-bold">100% HEALTH</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 surface-type-a space-y-0.5">
              <span className="mono-label text-[9px] uppercase block">MEMPOOL STRESS</span>
              <span className="text-base font-bold text-ron-green block mono-data">
                {metrics.currentTps.toLocaleString()} TPS
              </span>
              <span className="text-[9.5px] text-ron-dim">51% Max Throughput</span>
            </div>

            <div className="p-3 surface-type-a space-y-0.5">
              <span className="mono-label text-[9px] uppercase block">ANOMALY INDEX</span>
              <span className="text-base font-bold text-ron-cyan block mono-data">0.00%</span>
              <span className="text-[9.5px] text-ron-green">Zero exploits detected</span>
            </div>

            <div className="p-3 surface-type-a space-y-0.5">
              <span className="mono-label text-[9px] uppercase block">CONSENSUS SYNC</span>
              <span className="text-base font-bold text-ron-violet block mono-data">98.7%</span>
              <span className="text-[9.5px] text-ron-dim">184 Nodes</span>
            </div>

            <div className="p-3 surface-type-a space-y-0.5">
              <span className="mono-label text-[9px] uppercase block">SLOT DELAY</span>
              <span className="text-base font-bold text-white block mono-data">0.04s</span>
              <span className="text-[9.5px] text-ron-green">0.08 Gwei base</span>
            </div>
          </div>

          <div className="p-4 surface-type-d space-y-2">
            <span className="mono-label text-[9px] text-ron-cyan font-bold uppercase block">
              COGNITIVE AUDIT FINDING
            </span>
            <p className="text-ron-muted leading-relaxed text-[11px] font-sans">
              Continuous neural auditor runs 48 algorithmic tests every block. Mempool ordering is verified
              with zero miner extractable value (MEV) leakage.
            </p>
          </div>
        </div>

        {/* Right AI Terminal (4 cols) */}
        <div className="lg:col-span-4 flex flex-col h-[520px] rounded-[6px] bg-black/90 border border-ron-violet/30 shadow-2xl backdrop-blur-2xl overflow-hidden">
          {/* Header */}
          <div className="p-3 bg-[#090A0E] border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2 text-ron-cyan font-bold text-xs">
              <Terminal className="w-3.5 h-3.5" />
              <span>RON ASSISTANT</span>
            </div>
            <span className="text-ron-dim text-[10px]">LLM V2.4</span>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-2.5">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-[4px] max-w-[92%] text-[11px] leading-relaxed ${
                  m.sender === "USER"
                    ? "ml-auto bg-ron-violet/20 border border-ron-violet/40 text-white"
                    : "mr-auto surface-type-a text-ron-text"
                }`}
              >
                <span className="mono-label text-[8.5px] font-bold block mb-1 text-ron-cyan">
                  {m.sender === "USER" ? "OPERATOR" : "RON COGNITIVE CORE"}
                </span>
                <p className="font-sans text-[11px] leading-relaxed">{m.text}</p>
              </div>
            ))}

            {isThinking && (
              <div className="flex items-center gap-2 p-2 text-ron-cyan text-xs">
                <span className="w-3 h-3 border-2 border-ron-cyan border-t-transparent rounded-full animate-spin" />
                <span>Auditing protocol telemetry...</span>
              </div>
            )}
          </div>

          {/* Input field */}
          <div className="p-2.5 bg-[#090A0E] border-t border-white/[0.08] flex items-center gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage(chatInput);
              }}
              placeholder="Query protocol or /network..."
              className="w-full bg-black/60 border border-white/10 rounded-[4px] px-3 py-1.5 text-xs text-white placeholder-ron-muted focus:outline-none focus:border-ron-cyan font-mono"
            />
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleSendMessage(chatInput)}
              className="text-xs shrink-0 px-2.5"
            >
              <Send className="w-3 h-3 text-black" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
