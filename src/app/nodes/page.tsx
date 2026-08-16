"use client";

import React, { useState } from "react";
import { GLOBAL_NODES_DATA } from "@/lib/mock-data";
import { GlobalNodeData } from "@/lib/types";
import { formatCompactNumber } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Server, Globe2, Radio, ShieldCheck, Filter, Search, Layers } from "lucide-react";

const NODE_TYPES = ["ALL", "Validator", "RPC", "Bridge", "Archive"];

export default function NodesPage() {
  const [selectedType, setSelectedType] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNode, setSelectedNode] = useState<GlobalNodeData>(GLOBAL_NODES_DATA[0]);

  const filtered = GLOBAL_NODES_DATA.filter((n) => {
    const matchType = selectedType === "ALL" || n.type === selectedType;
    const matchSearch =
      n.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 font-mono text-xs">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto font-sans">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-ron-cyan uppercase tracking-widest px-3 py-1 rounded-full bg-ron-cyan/10 border border-ron-cyan/30">
          <Globe2 className="w-3.5 h-3.5" />
          <span>GLOBAL PHYSICAL INFRASTRUCTURE</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          RON Node Atlas
        </h1>
        <p className="text-xs sm:text-sm text-ron-muted leading-relaxed font-mono">
          18,482 active physical nodes running Turing-BFT client clusters across 42 sovereign jurisdictions.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-ron-surface/80 border border-white/10 backdrop-blur-xl">
        <div className="flex flex-wrap items-center gap-2">
          {NODE_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-3.5 py-1.5 rounded-lg text-xs transition-colors ${
                selectedType === t
                  ? "bg-ron-violet text-white font-bold shadow-[0_0_15px_rgba(117,92,255,0.3)]"
                  : "bg-white/5 text-ron-muted hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-ron-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by city / country / ID..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-black/50 border border-white/10 text-xs text-white placeholder-ron-muted focus:outline-none focus:border-ron-cyan"
          />
        </div>
      </div>

      {/* Selected Node Inspector Detail Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-ron-surface/90 border border-ron-cyan/30 shadow-2xl backdrop-blur-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-ron-cyan/10 border border-ron-cyan/30 text-ron-cyan">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white font-sans">{selectedNode.name}</h3>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-ron-cyan">
                  {selectedNode.type}
                </span>
              </div>
              <span className="text-ron-muted text-[11px] block mt-0.5">
                {selectedNode.city}, {selectedNode.country} (Coordinates: {selectedNode.coordinates[0]}, {selectedNode.coordinates[1]})
              </span>
            </div>
          </div>

          <StatusBadge status={selectedNode.status} size="md" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3.5 rounded-xl bg-black/50 border border-white/5">
            <span className="text-ron-dim text-[10px] uppercase block">LATENCY</span>
            <span className="text-base font-bold text-ron-green mt-1 block">
              {selectedNode.latencyMs}ms
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-black/50 border border-white/5">
            <span className="text-ron-dim text-[10px] uppercase block">UPTIME SCORE</span>
            <span className="text-base font-bold text-white mt-1 block">
              {selectedNode.uptime}%
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-black/50 border border-white/5">
            <span className="text-ron-dim text-[10px] uppercase block">CLIENT VERSION</span>
            <span className="text-base font-bold text-ron-violet mt-1 block">
              {selectedNode.version}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-black/50 border border-white/5">
            <span className="text-ron-dim text-[10px] uppercase block">TOTAL STAKE</span>
            <span className="text-base font-bold text-ron-cyan mt-1 block">
              {selectedNode.stake ? `${formatCompactNumber(selectedNode.stake)} RON` : "N/A"}
            </span>
          </div>
        </div>
      </div>

      {/* Nodes Table */}
      <div className="p-6 rounded-2xl bg-ron-surface/80 border border-white/10 shadow-2xl backdrop-blur-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <h3 className="font-bold text-white uppercase tracking-wider">All Regional Clusters</h3>
          <span className="text-ron-dim">{filtered.length} NODES DISPLAYED</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-black/50 border-b border-white/10 text-ron-dim uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">NODE ID</th>
                <th className="py-3 px-4">NAME</th>
                <th className="py-3 px-4">TYPE</th>
                <th className="py-3 px-4">LOCATION</th>
                <th className="py-3 px-4">LATENCY</th>
                <th className="py-3 px-4">UPTIME</th>
                <th className="py-3 px-4">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-ron-muted">
              {filtered.map((node) => (
                <tr
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`cursor-pointer transition-colors ${
                    selectedNode.id === node.id
                      ? "bg-ron-violet/10 text-white font-bold"
                      : "hover:bg-white/[0.02]"
                  }`}
                >
                  <td className="py-3 px-4 text-ron-cyan">{node.id}</td>
                  <td className="py-3 px-4 text-white font-bold">{node.name}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px]">
                      {node.type}
                    </span>
                  </td>
                  <td className="py-3 px-4">{node.city}, {node.country}</td>
                  <td className="py-3 px-4 text-ron-green">{node.latencyMs}ms</td>
                  <td className="py-3 px-4">{node.uptime}%</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={node.status} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
