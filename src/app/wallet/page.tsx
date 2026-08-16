"use client";

import React from "react";
import Link from "next/link";
import { useRonStore } from "@/lib/store";
import { formatAddress, formatCurrency, formatNumber } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import {
  Wallet,
  ArrowLeftRight,
  ShieldCheck,
  TrendingUp,
  Layers,
  ArrowUpRight,
  LogOut,
  Sparkles,
} from "lucide-react";

export default function WalletPage() {
  const {
    isConnected,
    walletAddress,
    walletName,
    ronBalance,
    stakedBalance,
    tokenBalances,
    metrics,
    setWalletModalOpen,
    disconnectWallet,
  } = useRonStore();

  const totalValue =
    ronBalance * metrics.ronPrice +
    stakedBalance * metrics.ronPrice +
    tokenBalances.reduce((acc, t) => acc + (t.symbol !== "RON" ? t.balance * t.price : 0), 0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 font-mono text-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-ron-cyan text-xs font-bold mb-1">
            <Wallet className="w-4 h-4" />
            <span>SOVEREIGN PORTFOLIO TERMINAL</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-sans">
            RON Wallet
          </h1>
        </div>

        {isConnected ? (
          <Button
            variant="danger"
            size="sm"
            onClick={disconnectWallet}
            leftIcon={<LogOut className="w-3.5 h-3.5" />}
          >
            DISCONNECT
          </Button>
        ) : (
          <Button
            variant="primary"
            size="sm"
            onClick={() => setWalletModalOpen(true)}
            leftIcon={<Wallet className="w-3.5 h-3.5" />}
          >
            CONNECT WALLET
          </Button>
        )}
      </div>

      {/* Hero Portfolio Stats */}
      <div className="p-8 rounded-2xl bg-ron-surface/90 border border-white/10 shadow-2xl backdrop-blur-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <div className="space-y-1">
            <span className="text-ron-dim text-[10px] uppercase">TOTAL ESTIMATED PORTFOLIO VALUE</span>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-bold text-white font-sans">
                {formatCurrency(totalValue, 2)}
              </span>
              <span className="text-xs text-ron-green font-bold">+12.48% (24H)</span>
            </div>
          </div>

          <div className="text-left sm:text-right space-y-0.5">
            <span className="text-ron-dim text-[10px] uppercase">ACCOUNT ADDRESS</span>
            <span className="text-ron-cyan font-bold block">
              {walletAddress ? formatAddress(walletAddress, 10, 8) : "NOT CONNECTED"}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
          <Link href="/swap">
            <Button variant="secondary" className="w-full text-xs" leftIcon={<ArrowLeftRight className="w-3.5 h-3.5 text-ron-violet" />}>
              SWAP
            </Button>
          </Link>
          <Link href="/stake">
            <Button variant="secondary" className="w-full text-xs" leftIcon={<ShieldCheck className="w-3.5 h-3.5 text-ron-cyan" />}>
              STAKE
            </Button>
          </Link>
          <Link href="/governance">
            <Button variant="secondary" className="w-full text-xs" leftIcon={<Layers className="w-3.5 h-3.5 text-ron-green" />}>
              GOVERNANCE
            </Button>
          </Link>
          <Link href={`/explorer/address/${walletAddress || "0x72a819b208efbc912384a89012384f981238491f"}`}>
            <Button variant="outline" className="w-full text-xs" rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}>
              EXPLORER
            </Button>
          </Link>
        </div>
      </div>

      {/* Asset Holdings Table */}
      <div className="p-6 sm:p-8 rounded-2xl bg-ron-surface/80 border border-white/10 shadow-2xl backdrop-blur-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <h3 className="font-bold text-white uppercase tracking-wider text-sm font-sans">
            Sovereign Asset Holdings
          </h3>
          <span className="text-ron-dim">{tokenBalances.length} ASSETS</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-black/50 border-b border-white/10 text-ron-dim uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">ASSET</th>
                <th className="py-3 px-4">PRICE</th>
                <th className="py-3 px-4">BALANCE</th>
                <th className="py-3 px-4 text-right">VALUE (USD)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-ron-muted">
              {tokenBalances.map((t) => {
                const bal = t.symbol === "RON" ? ronBalance : t.balance;
                const val = t.symbol === "RON" ? ronBalance * metrics.ronPrice : bal * t.price;
                return (
                  <tr key={t.symbol} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white flex items-center gap-3">
                      <span className="text-xl">{t.icon}</span>
                      <div>
                        <span>{t.symbol}</span>
                        <span className="text-ron-dim text-[10px] block font-normal">{t.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      {t.symbol === "RON" ? formatCurrency(metrics.ronPrice, 3) : formatCurrency(t.price, 2)}
                    </td>
                    <td className="py-3.5 px-4 text-white font-bold">{formatNumber(bal, 2)}</td>
                    <td className="py-3.5 px-4 text-right text-ron-cyan font-bold">
                      {formatCurrency(val, 2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
