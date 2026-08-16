"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRonStore } from "@/lib/store";
import { formatCompactNumber, formatNumber } from "@/lib/utils";
import { Button } from "../ui/Button";
import { StatusBadge } from "../ui/StatusBadge";
import { Activity, ArrowRight, Radio } from "lucide-react";

interface NodePoint {
  id: string;
  name: string;
  type: "Validator" | "Bridge" | "Liquidity" | "App" | "RPC";
  location: string;
  latency: number;
  stake: string;
  status: "ONLINE" | "SYNCED";
  performance: string;
  x: number;
  y: number;
  color: string;
}

const VISUALIZER_NODES: NodePoint[] = [
  { id: "VAL-SG-01", name: "Apex SG Validator", type: "Validator", location: "Singapore", latency: 12, stake: "42.8M RON", status: "ONLINE", performance: "99.8%", x: 22, y: 30, color: "#755CFF" },
  { id: "VAL-DE-02", name: "CyberCore Frankfurt", type: "Validator", location: "Frankfurt, DE", latency: 16, stake: "38.2M RON", status: "ONLINE", performance: "99.6%", x: 78, y: 28, color: "#00DFF7" },
  { id: "BRG-ZK-01", name: "EVM Teleport Relayer", type: "Bridge", location: "Tokyo, JP", latency: 18, stake: "15.0M RON", status: "SYNCED", performance: "99.9%", x: 82, y: 72, color: "#9DFF57" },
  { id: "LIQ-US-01", name: "Order Router Prime", type: "Liquidity", location: "New York, USA", latency: 24, stake: "22.5M RON", status: "ONLINE", performance: "99.4%", x: 18, y: 75, color: "#FFB84D" },
  { id: "APP-AI-01", name: "RON Cognitive Node", type: "App", location: "London, UK", latency: 19, stake: "18.0M RON", status: "ONLINE", performance: "99.7%", x: 50, y: 15, color: "#755CFF" },
  { id: "RPC-KL-01", name: "Petronas RPC Cluster", type: "RPC", location: "Kuala Lumpur, MY", latency: 14, stake: "9.5M RON", status: "ONLINE", performance: "99.5%", x: 50, y: 85, color: "#00DFF7" },
];

export const Scene04LiveVisualizer: React.FC = () => {
  const { metrics } = useRonStore();
  const [selectedNode, setSelectedNode] = useState<NodePoint>(VISUALIZER_NODES[0]);
  const [hoveredNode, setHoveredNode] = useState<NodePoint | null>(null);

  const active = hoveredNode || selectedNode;

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/[0.04]">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Visualizer Area (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="mono-label block tracking-[0.2em] text-ron-cyan">
                  03 // TOPOLOGY & ROUTING
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
                  Live Network Visualizer
                </h3>
              </div>
              <StatusBadge status="OPTIMAL" />
            </div>

            {/* Interactive Canvas/SVG Node Graph Container */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-[8px] bg-black/60 border border-white/[0.08] p-6 backdrop-blur-xl overflow-hidden shadow-2xl tech-corner-tl tech-corner-br">
              {/* Background Grid Lines */}
              <div className="absolute inset-0 bg-grid-tech opacity-40 pointer-events-none" />

              {/* Connecting laser routes */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {VISUALIZER_NODES.map((node) => (
                  <line
                    key={node.id}
                    x1="50%"
                    y1="50%"
                    x2={`${node.x}%`}
                    y2={`${node.y}%`}
                    stroke={node.color}
                    strokeWidth="1"
                    strokeOpacity="0.4"
                    className="animate-energy-line"
                  />
                ))}
              </svg>

              {/* Center RON Chain Core */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                <div className="w-16 h-16 rounded-[6px] bg-gradient-to-br from-ron-violet to-ron-cyan p-[1.5px] shadow-[0_0_30px_rgba(117,92,255,0.3)]">
                  <div className="w-full h-full bg-[#050507] rounded-[5px] flex flex-col items-center justify-center font-mono">
                    <span className="text-[8px] text-ron-cyan font-bold tracking-wider">CHAIN</span>
                    <span className="text-xs font-black text-white">RON</span>
                    <span className="text-[7.5px] text-ron-green">12.8K TPS</span>
                  </div>
                </div>
              </div>

              {/* Orbiting Interactive Node Points */}
              {VISUALIZER_NODES.map((node) => {
                const isSelected = active.id === node.id;
                return (
                  <div
                    key={node.id}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer select-none"
                    onMouseEnter={() => setHoveredNode(node)}
                    onMouseLeave={() => setHoveredNode(null)}
                    onClick={() => setSelectedNode(node)}
                  >
                    <div
                      className={`relative p-1.5 rounded-[4px] transition-all duration-200 ${
                        isSelected
                          ? "bg-ron-elevated border-2 scale-110 shadow-[0_0_15px_rgba(0,223,247,0.3)]"
                          : "bg-black/80 border border-white/20 hover:scale-105"
                      }`}
                      style={{ borderColor: isSelected ? node.color : undefined }}
                    >
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: node.color }} />
                      <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[8.5px] text-ron-muted bg-black/90 px-1.5 py-0.5 rounded-[2px] border border-white/5">
                        {node.id}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Node Inspector Floating Badge (Bottom-left) */}
              <div className="absolute bottom-4 left-4 z-40 surface-type-e p-3 max-w-xs font-mono text-xs space-y-1 shadow-xl">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-white font-bold text-[11px]">{active.name}</span>
                  <span className="text-ron-green text-[10px]">{active.latency}ms</span>
                </div>
                <div className="grid grid-cols-2 gap-x-3 text-[10px] text-ron-muted pt-1 border-t border-white/[0.08]">
                  <span>Loc: <strong className="text-white">{active.location}</strong></span>
                  <span>Stake: <strong className="text-ron-cyan">{active.stake}</strong></span>
                  <span>Uptime: <strong className="text-ron-green">{active.performance}</strong></span>
                  <span>Type: <strong className="text-ron-violet">{active.type}</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Side HUD Telemetry Card (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="surface-type-b p-6 tech-corner-tl space-y-5 font-mono">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider">
                  <Activity className="w-3.5 h-3.5 text-ron-cyan" />
                  <span>CONSENSUS HUD</span>
                </div>
                <span className="text-[10px] text-ron-green font-bold">SYNCHRONIZED</span>
              </div>

              {/* Telemetry Rows */}
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="mono-label text-[10px]">BLOCK HEIGHT</span>
                  <span className="mono-data text-white font-bold">#{metrics.blockHeight.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="mono-label text-[10px]">TOTAL TXS</span>
                  <span className="mono-data text-ron-cyan font-bold">{metrics.totalTransactions.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="mono-label text-[10px]">CURRENT TPS</span>
                  <span className="mono-data text-ron-green font-bold">{metrics.currentTps.toLocaleString()} / SEC</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="mono-label text-[10px]">SLOT FINALITY</span>
                  <span className="mono-data text-white font-bold">{metrics.finalitySec} SEC</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="mono-label text-[10px]">VALIDATORS</span>
                  <span className="mono-data text-ron-violet font-bold">{metrics.activeValidators} CLUSTERS</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="mono-label text-[10px]">NETWORK UPTIME</span>
                  <span className="mono-data text-ron-green font-bold">{metrics.networkUptime}%</span>
                </div>
              </div>

              {/* Open Operations Center CTA */}
              <div className="pt-4 border-t border-white/[0.08]">
                <Link href="/network">
                  <Button
                    variant="primary"
                    className="w-full text-xs"
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    OPEN NETWORK NOC
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
