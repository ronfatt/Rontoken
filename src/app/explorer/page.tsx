"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRonStore } from "@/lib/store";
import { formatAddress, formatNumber, formatTimeAgo, formatCompactNumber } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import {
  Search,
  Layers,
  Activity,
  Compass,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

export default function ExplorerPage() {
  const router = useRouter();
  const { blocks, transactions, metrics, walletAddress } = useRonStore();
  const [searchInput, setSearchInput] = useState("");
  const [detectedType, setDetectedType] = useState<string | null>(null);

  const handleInputChange = (val: string) => {
    setSearchInput(val);
    const clean = val.trim();
    if (!clean) {
      setDetectedType(null);
    } else if (clean.startsWith("0x") && clean.length > 50) {
      setDetectedType("TRANSACTION HASH");
    } else if (clean.startsWith("0x") && clean.length <= 44) {
      setDetectedType("SOVEREIGN ADDRESS");
    } else if (/^\d+$/.test(clean)) {
      setDetectedType("BLOCK NUMBER");
    } else if (clean.toUpperCase() === "RON" || clean.toUpperCase() === "USDT") {
      setDetectedType("TOKEN CONTRACT");
    } else {
      setDetectedType("SEARCH QUERY");
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = searchInput.trim();
    if (!clean) return;

    if (clean.startsWith("0x") && clean.length > 50) {
      router.push(`/explorer/tx/${clean}`);
    } else if (clean.startsWith("0x") || clean.toLowerCase() === "my" || clean.toLowerCase() === "wallet") {
      router.push(`/explorer/address/${clean.startsWith("0x") ? clean : walletAddress}`);
    } else if (/^\d+$/.test(clean)) {
      router.push(`/explorer/block/${clean}`);
    } else {
      router.push(`/explorer/tx/${transactions[0]?.hash || clean}`);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 font-mono text-xs">
      {/* Header & Search Infrastructure */}
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 text-ron-cyan text-xs font-bold mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span className="mono-label text-[10px]">CONSENSUS LEDGER TELEMETRY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-sans tracking-tight">
            RON Blockchain Explorer
          </h1>
          <p className="text-xs sm:text-sm text-ron-muted mt-1 font-sans">
            Authoritative real-time indexing of sub-second blocks, sovereign addresses, and transactions on RON Mainnet.
          </p>
        </div>

        {/* Search Bar Bar */}
        <form onSubmit={handleSearchSubmit} className="relative">
          <div className="relative flex items-center surface-type-c tech-corner-tl tech-corner-br shadow-2xl p-1.5">
            <Search className="w-4 h-4 text-ron-cyan ml-3 shrink-0" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Search by Block Number (#248934), Tx Hash (0x...), Address (0x...), or Token..."
              className="w-full bg-transparent px-3 py-2.5 text-xs sm:text-sm text-white placeholder-ron-muted focus:outline-none"
            />
            {detectedType && (
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-[2px] bg-ron-violet/20 border border-ron-violet/40 text-ron-cyan text-[9.5px] font-bold mr-2 whitespace-nowrap">
                {detectedType}
              </span>
            )}
            <Button variant="primary" size="md" type="submit" className="text-xs shrink-0">
              SEARCH
            </Button>
          </div>
        </form>
      </div>

      {/* Real-time Explorer KPI Strip (Surface Type A) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 surface-type-a space-y-1">
          <span className="mono-label text-[9px] uppercase">LATEST BLOCK HEIGHT</span>
          <span className="text-2xl font-bold text-white block mono-data">
            #{metrics.blockHeight.toLocaleString()}
          </span>
          <span className="text-[10px] text-ron-green">0.42s Finality</span>
        </div>

        <div className="p-4 surface-type-a space-y-1">
          <span className="mono-label text-[9px] uppercase">TOTAL TRANSACTIONS</span>
          <span className="text-2xl font-bold text-ron-cyan block mono-data">
            {metrics.totalTransactions.toLocaleString()}
          </span>
          <span className="text-[10px] text-ron-dim">{metrics.currentTps.toLocaleString()} TPS</span>
        </div>

        <div className="p-4 surface-type-a space-y-1">
          <span className="mono-label text-[9px] uppercase">ACTIVE VALIDATOR HUBS</span>
          <span className="text-2xl font-bold text-ron-violet block mono-data">
            {metrics.activeValidators}
          </span>
          <span className="text-[10px] text-ron-green">100% Consensus Sync</span>
        </div>

        <div className="p-4 surface-type-a space-y-1">
          <span className="mono-label text-[9px] uppercase">BASE GAS PRICE</span>
          <span className="text-2xl font-bold text-ron-green block mono-data">
            {metrics.avgGasGwei} GWEI
          </span>
          <span className="text-[10px] text-ron-dim">$0.08 Avg Fee</span>
        </div>
      </div>

      {/* Dual Feed Grid: Latest Blocks & Latest Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latest Blocks */}
        <div className="surface-type-b tech-corner-tl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-2 font-bold text-white uppercase tracking-wider text-xs">
              <Layers className="w-3.5 h-3.5 text-ron-cyan" />
              <span>Latest Sealed Blocks</span>
            </div>
            <span className="text-[10px] text-ron-green flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-ron-green animate-pulse" />
              LIVE FEED
            </span>
          </div>

          <div className="space-y-2">
            {blocks.slice(0, 7).map((block) => (
              <div
                key={block.height}
                className="p-3 surface-type-a hover:surface-type-b hover:border-ron-cyan/40 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-[3px] bg-black/60 border border-white/10 text-center">
                    <span className="mono-label text-[8px] block">BLOCK</span>
                    <Link
                      href={`/explorer/block/${block.height}`}
                      className="text-ron-cyan font-bold text-xs hover:underline mono-data"
                    >
                      #{block.height}
                    </Link>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white text-xs font-bold">
                        {typeof block.validator === "string" ? block.validator : block.validator?.name || "Apex SG Validator"}
                      </span>
                      <span className="text-[10px] text-ron-dim">{block.txCount} txs</span>
                    </div>
                    <span className="text-[10px] text-ron-dim block mono-data">
                      Gas: {block.gasUtilization || 49.3}% • Reward: {block.blockReward || block.reward || 2.4} RON
                    </span>
                  </div>
                </div>

                <div className="text-right text-[10px] text-ron-dim mono-data">
                  {formatTimeAgo(block.timestamp)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Transactions */}
        <div className="surface-type-b tech-corner-br p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-2 font-bold text-white uppercase tracking-wider text-xs">
              <Activity className="w-3.5 h-3.5 text-ron-violet" />
              <span>Latest Transactions</span>
            </div>
            <span className="text-[10px] text-ron-dim">Mempool Stream</span>
          </div>

          <div className="space-y-2">
            {transactions.slice(0, 7).map((tx) => (
              <div
                key={tx.hash}
                className="p-3 surface-type-a hover:surface-type-b hover:border-ron-violet/40 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-[3px] bg-black/60 border border-white/10 text-center">
                    <span className="text-[9px] font-bold text-ron-text">{tx.type}</span>
                  </div>
                  <div>
                    <Link
                      href={`/explorer/tx/${tx.hash}`}
                      className="text-white font-bold text-xs hover:text-ron-cyan hover:underline mono-data block"
                    >
                      {formatAddress(tx.hash, 8, 4)}
                    </Link>
                    <div className="flex items-center gap-2 text-[10px] text-ron-dim">
                      <span>From: {formatAddress(tx.from, 4, 4)}</span>
                      <span>To: {formatAddress(tx.to, 4, 4)}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-ron-cyan block mono-data">
                    {formatNumber(tx.value, 2)} {tx.tokenSymbol}
                  </span>
                  <span className="text-[10px] text-ron-dim mono-data">{formatTimeAgo(tx.timestamp)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
