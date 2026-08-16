"use client";

import React from "react";
import { useRonStore } from "@/lib/store";
import { formatCompactNumber } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  Activity,
  ShieldCheck,
  Server,
  Radio,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TPS_SERIES = [
  { time: "10:00", tps: 12450 },
  { time: "10:05", tps: 12890 },
  { time: "10:10", tps: 13120 },
  { time: "10:15", tps: 12640 },
  { time: "10:20", tps: 13450 },
  { time: "10:25", tps: 12842 },
];

export default function NetworkPage() {
  const { metrics, validators } = useRonStore();

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* NOC Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-ron-cyan mb-1">
            <Radio className="w-3.5 h-3.5 text-ron-green animate-pulse" />
            <span className="mono-label text-[10px]">MISSION CONTROL • WEBSOCKET STREAM ACTIVE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Network Operations Center
          </h1>
          <p className="text-xs sm:text-sm text-ron-muted mt-1 font-sans">
            Real-time consensus telemetry, mempool pressure, and global physical validator cluster performance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <StatusBadge status="OPTIMAL" size="md" />
          <span className="font-mono text-[11px] text-ron-dim px-2.5 py-1 rounded-[3px] bg-black/60 border border-white/10">
            SLOT #{metrics.blockHeight}
          </span>
        </div>
      </div>

      {/* Top Telemetry KPI Matrix (Surface Type A) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
        <div className="p-4 surface-type-a space-y-1">
          <span className="mono-label text-[9px] uppercase">THROUGHPUT</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-ron-green mono-data">
              {metrics.currentTps.toLocaleString()}
            </span>
            <span className="text-xs text-ron-dim">TPS</span>
          </div>
          <span className="text-[10px] text-ron-dim">Peak: 25,000 TPS</span>
        </div>

        <div className="p-4 surface-type-a space-y-1">
          <span className="mono-label text-[9px] uppercase">CONSENSUS FINALITY</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white mono-data">
              {metrics.finalitySec}
            </span>
            <span className="text-xs text-ron-dim">SEC</span>
          </div>
          <span className="text-[10px] text-ron-cyan">Sub-second BFT</span>
        </div>

        <div className="p-4 surface-type-a space-y-1">
          <span className="mono-label text-[9px] uppercase">VALIDATORS</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-ron-violet mono-data">
              {metrics.activeValidators}
            </span>
            <span className="text-xs text-ron-dim">HUBS</span>
          </div>
          <span className="text-[10px] text-ron-muted">42 Jurisdictions</span>
        </div>

        <div className="p-4 surface-type-a space-y-1">
          <span className="mono-label text-[9px] uppercase">UPTIME</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-ron-green mono-data">
              {metrics.networkUptime}%
            </span>
          </div>
          <span className="text-[10px] text-ron-green">Zero slashing</span>
        </div>
      </div>

      {/* Real-time Throughput & Security Analysis (Asymmetric 8/4 Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 p-6 surface-type-b tech-corner-tl space-y-6">
          <div className="flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-ron-cyan" />
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">
                Mempool Throughput (TPS)
              </h3>
            </div>
            <span className="text-ron-green text-[10px]">LIVE REFRESH 2s</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={TPS_SERIES}>
                <defs>
                  <linearGradient id="tpsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#755CFF" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#755CFF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#555C68" fontSize={9.5} />
                <YAxis stroke="#555C68" fontSize={9.5} domain={["dataMin - 400", "dataMax + 400"]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#090A0E",
                    borderColor: "#755CFF",
                    borderRadius: "4px",
                    fontFamily: "monospace",
                    fontSize: "11px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="tps"
                  stroke="#755CFF"
                  strokeWidth={1.5}
                  fillOpacity={1}
                  fill="url(#tpsGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Protocol Security & Health Card (Surface Type C) */}
        <div className="lg:col-span-4 p-6 surface-type-c tech-corner-br space-y-5 font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <span className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-ron-green" />
              <span>CONSENSUS INTEGRITY</span>
            </span>
            <span className="text-ron-green font-bold text-[10px]">100% SECURE</span>
          </div>

          <div className="space-y-3 text-ron-muted text-[11px]">
            <div className="flex justify-between">
              <span className="mono-label text-[9px]">ZK PROVERS</span>
              <span className="text-ron-green font-bold">ACTIVE (0.02s)</span>
            </div>
            <div className="flex justify-between">
              <span className="mono-label text-[9px]">SLASHING GUARD</span>
              <span className="text-white">ARMED (5% SLICE)</span>
            </div>
            <div className="flex justify-between">
              <span className="mono-label text-[9px]">BLOCK GAS LOAD</span>
              <span className="text-white mono-data">14.8M / 30M (49%)</span>
            </div>
            <div className="flex justify-between">
              <span className="mono-label text-[9px]">BASE GAS PRICE</span>
              <span className="text-ron-cyan font-bold mono-data">{metrics.avgGasGwei} GWEI</span>
            </div>
            <div className="flex justify-between">
              <span className="mono-label text-[9px]">MEV SHIELD</span>
              <span className="text-ron-green font-bold">ENCRYPTED MEMPOOL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Validator Clusters Table */}
      <div className="p-6 surface-type-b tech-corner-tl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-2">
            <Server className="w-3.5 h-3.5 text-ron-violet" />
            <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Active Validator Cluster Telemetry
            </h3>
          </div>
          <span className="text-ron-dim">{validators.length} / 184 Synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-black/80 border-b border-white/[0.08] text-ron-dim uppercase tracking-wider text-[9.5px]">
              <tr>
                <th className="py-3 px-4">VALIDATOR CLUSTER</th>
                <th className="py-3 px-4">LOCATION</th>
                <th className="py-3 px-4">STAKED RON</th>
                <th className="py-3 px-4">DYNAMIC APR</th>
                <th className="py-3 px-4">UPTIME</th>
                <th className="py-3 px-4">LATENCY</th>
                <th className="py-3 px-4">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04] text-ron-muted">
              {validators.map((val) => (
                <tr key={val.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-ron-green" />
                    <span>{val.name}</span>
                  </td>
                  <td className="py-3 px-4">{val.location}</td>
                  <td className="py-3 px-4 text-ron-cyan font-bold mono-data">
                    {formatCompactNumber(val.totalStake)} RON
                  </td>
                  <td className="py-3 px-4 text-ron-green font-bold mono-data">{val.apr}%</td>
                  <td className="py-3 px-4 mono-data">{val.uptime}%</td>
                  <td className="py-3 px-4 mono-data">{val.latencyMs}ms</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={val.status} size="sm" />
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
