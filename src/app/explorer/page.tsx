"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRonStore } from "@/lib/store";
import { formatAddress, formatCompactNumber, formatCurrency, formatNumber, formatTimeAgo } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import {
  Search,
  Compass,
  Layers,
  Activity,
  ArrowRight,
  Boxes,
  Zap,
  Flame,
  CheckCircle2,
} from "lucide-react";

export default function ExplorerPage() {
  const router = useRouter();
  const { metrics, blocks, transactions } = useRonStore();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    if (query.startsWith("0x")) {
      if (query.length > 50) {
        // Transaction hash
        router.push(`/explorer/tx/${query}`);
      } else {
        // Address
        router.push(`/explorer/address/${query}`);
      }
    } else if (!isNaN(Number(query))) {
      // Block height
      router.push(`/explorer/block/${query}`);
    } else {
      router.push(`/explorer/tx/${query}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Explorer Search Header */}
      <div className="space-y-6 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-ron-cyan uppercase tracking-widest px-3 py-1 rounded-full bg-ron-cyan/10 border border-ron-cyan/30">
          <Compass className="w-3.5 h-3.5" />
          <span>RON BLOCKCHAIN EXPLORER</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Sovereign Ledger Explorer
        </h1>

        {/* Global Search Bar */}
        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
          <Search className="w-5 h-5 text-ron-cyan absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Address / Transaction Hash (0x...) / Block Height..."
            className="w-full pl-12 pr-28 py-4 rounded-2xl bg-ron-surface/90 border border-ron-violet/40 text-sm font-mono text-white placeholder-ron-muted shadow-[0_0_30px_rgba(117,92,255,0.15)] focus:outline-none focus:border-ron-cyan"
          />
          <Button
            type="submit"
            size="sm"
            variant="primary"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-mono"
          >
            SEARCH
          </Button>
        </form>
      </div>

      {/* Explorer Telemetry Overview Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono text-xs">
        <div className="p-4 rounded-xl bg-ron-surface/80 border border-white/10 space-y-1">
          <span className="text-ron-dim text-[10px] uppercase">RON PRICE</span>
          <span className="text-base font-bold text-white block">
            {formatCurrency(metrics.ronPrice, 3)}
          </span>
          <span className="text-[10px] text-ron-green">+{metrics.price24hChange}%</span>
        </div>

        <div className="p-4 rounded-xl bg-ron-surface/80 border border-white/10 space-y-1">
          <span className="text-ron-dim text-[10px] uppercase">MARKET CAP</span>
          <span className="text-base font-bold text-white block">
            ${formatCompactNumber(metrics.marketCap)}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-ron-surface/80 border border-white/10 space-y-1">
          <span className="text-ron-dim text-[10px] uppercase">TOTAL TRANSACTIONS</span>
          <span className="text-base font-bold text-ron-cyan block">
            {formatCompactNumber(metrics.totalTransactions)}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-ron-surface/80 border border-white/10 space-y-1">
          <span className="text-ron-dim text-[10px] uppercase">BLOCK HEIGHT</span>
          <span className="text-base font-bold text-white block">
            #{metrics.blockHeight.toLocaleString()}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-ron-surface/80 border border-white/10 space-y-1">
          <span className="text-ron-dim text-[10px] uppercase">AVERAGE GAS</span>
          <span className="text-base font-bold text-ron-green block">
            {metrics.avgGasGwei} GWEI
          </span>
        </div>

        <div className="p-4 rounded-xl bg-ron-surface/80 border border-white/10 space-y-1">
          <span className="text-ron-dim text-[10px] uppercase">TPS RATE</span>
          <span className="text-base font-bold text-ron-violet block">
            {metrics.currentTps.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Split Grid: Latest Blocks & Latest Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Latest Blocks (Left) */}
        <div className="p-6 rounded-2xl bg-ron-surface/80 border border-white/10 shadow-2xl backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between font-mono text-xs border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <Boxes className="w-4 h-4 text-ron-cyan" />
              <h3 className="font-bold text-white uppercase tracking-wider">Latest Sealed Blocks</h3>
            </div>
            <span className="text-ron-green text-[10px]">REAL-TIME (3.5s)</span>
          </div>

          <div className="space-y-2.5 font-mono text-xs">
            {blocks.slice(0, 7).map((b) => (
              <Link
                key={b.height}
                href={`/explorer/block/${b.height}`}
                className="flex items-center justify-between p-3 rounded-xl bg-black/40 hover:bg-ron-violet/10 border border-white/5 hover:border-ron-violet/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/5 text-ron-cyan font-bold text-xs">
                    BK
                  </div>
                  <div>
                    <span className="font-bold text-white hover:underline">#{b.height}</span>
                    <span className="text-ron-dim text-[10px] block">
                      {formatTimeAgo(b.timestamp)}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-ron-muted text-[11px] block">{b.validator.name}</span>
                  <span className="text-[10px] text-ron-green">{b.txCount} txs • {b.reward} RON</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Latest Transactions (Right) */}
        <div className="p-6 rounded-2xl bg-ron-surface/80 border border-white/10 shadow-2xl backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between font-mono text-xs border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-ron-violet" />
              <h3 className="font-bold text-white uppercase tracking-wider">Latest Transactions</h3>
            </div>
            <span className="text-ron-green text-[10px]">MEMPOOL ACTIVE</span>
          </div>

          <div className="space-y-2.5 font-mono text-xs">
            {transactions.slice(0, 7).map((tx) => (
              <Link
                key={tx.hash}
                href={`/explorer/tx/${tx.hash}`}
                className="flex items-center justify-between p-3 rounded-xl bg-black/40 hover:bg-ron-violet/10 border border-white/5 hover:border-ron-violet/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/5 text-ron-violet font-bold text-[10px]">
                    TX
                  </div>
                  <div>
                    <span className="font-bold text-white hover:underline">
                      {formatAddress(tx.hash, 8, 4)}
                    </span>
                    <span className="text-ron-dim text-[10px] block">
                      {tx.type} • {formatTimeAgo(tx.timestamp)}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-ron-cyan font-bold block">
                    {formatNumber(tx.value, tx.value < 10 ? 2 : 0)} {tx.tokenSymbol}
                  </span>
                  <span className="text-[10px] text-ron-green">
                    Gas: ${tx.gasFee.toFixed(4)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
