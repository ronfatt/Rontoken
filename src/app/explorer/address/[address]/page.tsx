"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRonStore } from "@/lib/store";
import { formatAddress, formatCurrency, formatNumber, formatTimeAgo } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  Wallet,
  Copy,
  CheckCircle2,
  ArrowLeft,
  Layers,
  ArrowLeftRight,
  ShieldCheck,
  Vote,
  Sparkles,
} from "lucide-react";

export default function AddressOverviewPage() {
  const params = useParams();
  const addrStr = Array.isArray(params.address) ? params.address[0] : params.address;
  const address = addrStr || "0x72a819b208efbc912384a89012384f981238491f";

  const { metrics, ronBalance, stakedBalance, tokenBalances, transactions } = useRonStore();
  const [activeTab, setActiveTab] = useState<"TRANSACTIONS" | "TOKENS" | "STAKING">("TRANSACTIONS");
  const [copied, setCopied] = useState(false);

  const totalValue =
    ronBalance * metrics.ronPrice +
    stakedBalance * metrics.ronPrice +
    tokenBalances.reduce((acc, t) => acc + (t.symbol !== "RON" ? t.balance * t.price : 0), 0);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 font-mono text-xs">
      {/* Back button & Title */}
      <div className="space-y-4">
        <Link
          href="/explorer"
          className="inline-flex items-center gap-2 text-ron-muted hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO EXPLORER</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-ron-violet/20 border border-ron-violet/40 text-ron-cyan font-bold text-base">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white font-sans">
                  {formatAddress(address, 10, 8)}
                </h1>
                <button
                  onClick={handleCopy}
                  className="p-1 rounded bg-white/5 hover:bg-white/10 text-ron-muted hover:text-white transition-colors"
                >
                  {copied ? (
                    <CheckCircle2 className="w-4 h-4 text-ron-green" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              <span className="text-ron-cyan text-[11px] block mt-0.5">
                RON SOVEREIGN ACCOUNT
              </span>
            </div>
          </div>

          <StatusBadge status="ACTIVE" size="md" />
        </div>
      </div>

      {/* Portfolio Balance KPI Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-ron-surface/80 border border-white/10 space-y-1 shadow-lg">
          <span className="text-ron-dim text-[10px] uppercase">ESTIMATED NET WORTH</span>
          <span className="text-2xl font-bold text-white block">
            {formatCurrency(totalValue, 2)}
          </span>
          <span className="text-ron-green text-[10px]">Multi-Asset Sovereign Custody</span>
        </div>

        <div className="p-5 rounded-xl bg-ron-surface/80 border border-white/10 space-y-1 shadow-lg">
          <span className="text-ron-dim text-[10px] uppercase">AVAILABLE RON BALANCE</span>
          <span className="text-2xl font-bold text-ron-cyan block">
            {formatNumber(ronBalance, 2)} RON
          </span>
          <span className="text-ron-muted text-[10px]">
            {formatCurrency(ronBalance * metrics.ronPrice, 2)}
          </span>
        </div>

        <div className="p-5 rounded-xl bg-ron-surface/80 border border-white/10 space-y-1 shadow-lg">
          <span className="text-ron-dim text-[10px] uppercase">STAKED DELEGATION</span>
          <span className="text-2xl font-bold text-ron-violet block">
            {formatNumber(stakedBalance, 2)} RON
          </span>
          <span className="text-ron-green text-[10px]">Earning up to 18.42% APY</span>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="p-6 sm:p-8 rounded-2xl bg-ron-surface/80 border border-white/10 shadow-2xl backdrop-blur-xl space-y-6">
        <div className="flex items-center gap-2 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab("TRANSACTIONS")}
            className={`px-4 py-2 rounded-lg font-mono text-xs transition-colors ${
              activeTab === "TRANSACTIONS"
                ? "bg-ron-violet text-white font-bold"
                : "text-ron-muted hover:text-white hover:bg-white/5"
            }`}
          >
            TRANSACTIONS ({transactions.length})
          </button>
          <button
            onClick={() => setActiveTab("TOKENS")}
            className={`px-4 py-2 rounded-lg font-mono text-xs transition-colors ${
              activeTab === "TOKENS"
                ? "bg-ron-violet text-white font-bold"
                : "text-ron-muted hover:text-white hover:bg-white/5"
            }`}
          >
            TOKEN BALANCES ({tokenBalances.length})
          </button>
          <button
            onClick={() => setActiveTab("STAKING")}
            className={`px-4 py-2 rounded-lg font-mono text-xs transition-colors ${
              activeTab === "STAKING"
                ? "bg-ron-violet text-white font-bold"
                : "text-ron-muted hover:text-white hover:bg-white/5"
            }`}
          >
            STAKING POSITIONS
          </button>
        </div>

        {/* Tab 1: Transactions */}
        {activeTab === "TRANSACTIONS" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-black/50 border-b border-white/10 text-ron-dim uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4">TX HASH</th>
                  <th className="py-3 px-4">TYPE</th>
                  <th className="py-3 px-4">VALUE</th>
                  <th className="py-3 px-4">STATUS</th>
                  <th className="py-3 px-4 text-right">TIME</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-ron-muted">
                {transactions.slice(0, 8).map((tx) => (
                  <tr key={tx.hash} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-4 text-white font-bold">
                      <Link href={`/explorer/tx/${tx.hash}`} className="hover:text-ron-cyan">
                        {formatAddress(tx.hash, 8, 4)}
                      </Link>
                    </td>
                    <td className="py-3 px-4">{tx.type}</td>
                    <td className="py-3 px-4 text-ron-cyan font-bold">
                      {formatNumber(tx.value, 2)} {tx.tokenSymbol}
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={tx.status} size="sm" />
                    </td>
                    <td className="py-3 px-4 text-right text-ron-dim">
                      {formatTimeAgo(tx.timestamp)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Tokens */}
        {activeTab === "TOKENS" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {tokenBalances.map((t) => (
              <div
                key={t.symbol}
                className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{t.icon}</span>
                  <div>
                    <span className="font-bold text-white block">{t.symbol}</span>
                    <span className="text-ron-dim text-[10px] block">{t.name}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-white block">
                    {formatNumber(t.balance, 2)}
                  </span>
                  <span className="text-ron-muted text-[10px] block">
                    {formatCurrency(t.balance * t.price, 2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Staking */}
        {activeTab === "STAKING" && (
          <div className="p-6 rounded-xl bg-black/40 border border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-white text-sm">Active Delegation Position</h4>
                <p className="text-ron-muted text-xs mt-0.5">
                  Delegated to Apex Node Singapore (18.42% APY tier)
                </p>
              </div>
              <span className="text-ron-green font-bold text-sm">
                +142.85 RON UNCLAIMED
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5 text-[11px] text-ron-muted">
              <div>
                <span className="text-ron-dim block">TOTAL PRINCIPAL</span>
                <span className="text-white font-bold mt-1 block">50,000.00 RON</span>
              </div>
              <div>
                <span className="text-ron-dim block">UNLOCK DATE</span>
                <span className="text-white font-bold mt-1 block">2027-08-16 (365 Days)</span>
              </div>
              <div>
                <span className="text-ron-dim block">VOTING POWER</span>
                <span className="text-ron-cyan font-bold mt-1 block">75,000 vRON</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
