"use client";

import React, { useEffect, useState } from "react";
import { Network, Radio } from "lucide-react";

export const Scene02NetworkAwakens: React.FC = () => {
  const [activePacketIndex, setActivePacketIndex] = useState(0);

  const packets = [
    { label: "TX VERIFIED", hash: "0x72a8...91f3", latency: "14ms", color: "text-ron-green" },
    { label: "BLOCK SEALED", hash: "0x89f4...9124", latency: "0.42s", color: "text-ron-cyan" },
    { label: "NODE SYNC", hash: "Apex SG #184", latency: "100%", color: "text-ron-violet" },
    { label: "ROUTE OPTIMIZED", hash: "DEX Pool v2", latency: "0.03% slip", color: "text-ron-amber" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActivePacketIndex((prev) => (prev + 1) % packets.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/[0.04] overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Typographic Statement */}
        <div className="text-center space-y-4">
          <span className="mono-label block tracking-[0.2em] text-ron-cyan">
            01 // DECENTRALIZED DATA DYNAMICS
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            VALUE SHOULD MOVE <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-ron-text to-ron-cyan">
              LIKE INFORMATION.
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-ron-muted max-w-xl mx-auto leading-relaxed font-sans">
            Legacy blockchains structure transactions as slow isolated ledgers. RON processes economic
            throughput as a high-frequency computational neural network.
          </p>
        </div>

        {/* Dynamic Interactive Flow Visualizer (Surface Type B with Technical Corners) */}
        <div className="relative p-6 sm:p-10 surface-type-b tech-corner-tl tech-corner-br shadow-2xl overflow-hidden">
          {/* Animated Connecting Vector Paths */}
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <line
                x1="15%"
                y1="50%"
                x2="85%"
                y2="50%"
                stroke="#755CFF"
                strokeWidth="1.2"
                className="animate-energy-line"
              />
              <line
                x1="30%"
                y1="30%"
                x2="70%"
                y2="70%"
                stroke="#00DFF7"
                strokeWidth="1"
                className="animate-energy-line"
              />
              <line
                x1="30%"
                y1="70%"
                x2="70%"
                y2="30%"
                stroke="#9DFF57"
                strokeWidth="1"
                className="animate-energy-line"
              />
            </svg>
          </div>

          {/* Node Grid Array */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 relative z-10 font-mono text-xs">
            {packets.map((pkt, idx) => {
              const isActive = idx === activePacketIndex;
              return (
                <div
                  key={pkt.label}
                  className={`p-4 rounded-[4px] border transition-all duration-200 ${
                    isActive
                      ? "bg-black/90 border-ron-cyan shadow-[0_0_20px_rgba(0,223,247,0.15)]"
                      : "bg-black/40 border-white/[0.06] hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="mono-label text-[9px]">HUB 0{idx + 1}</span>
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isActive ? "bg-ron-green animate-ping" : "bg-white/20"
                      }`}
                    />
                  </div>

                  <h4 className="font-bold text-xs text-white mb-1">{pkt.label}</h4>
                  <div className="flex items-center justify-between text-[11px] mt-3 pt-2 border-t border-white/[0.06]">
                    <span className="text-ron-muted">{pkt.hash}</span>
                    <span className={`font-semibold ${pkt.color}`}>{pkt.latency}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Telemetric System Banner */}
          <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-ron-muted">
            <div className="flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-ron-green animate-pulse" />
              <span>CONSENSUS: HIGH-FREQUENCY TURING-BFT (184 HUBS)</span>
            </div>
            <div className="flex items-center gap-4 text-ron-dim">
              <span>PROPAGATION: 0.04s</span>
              <span>•</span>
              <span>ZERO MEMPOOL LEAKAGE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
