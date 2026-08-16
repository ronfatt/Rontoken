"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRonStore } from "@/lib/store";
import { formatAddress, formatCurrency, formatNumber, formatTimeAgo } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Wallet, ShieldCheck, Copy, ArrowDownLeft, ArrowUpRight, Lock } from "lucide-react";

export default function AddressDetailPage() {
  const params = useParams();
  const addrParam = Array.isArray(params.address) ? params.address[0] : params.address;
  const address = addrParam || "0x72A8F34C918B52E5A7710F93D13A91F3";

  const {
    walletAddress,
    ronBalance,
    stakedBalance,
    tokens,
    transactions,
    metrics,
    stakingPositions,
  } = useRonStore();

  const isUserWallet = address.toLowerCase() === walletAddress.toLowerCase();

  const userRonBalance = isUserWallet ? ronBalance : 42500.0;
  const userStakedBalance = isUserWallet ? stakedBalance : 10000.0;

  const relevantTxs = transactions.filter(
    (tx) =>
      tx.from.toLowerCase() === address.toLowerCase() ||
      tx.to.toLowerCase() === address.toLowerCase() ||
      isUserWallet
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-mono text-xs">
      {/* Back button */}
      <div>
        <Link
          href="/explorer"
          className="inline-flex items-center gap-2 text-ron-muted hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO EXPLORER</span>
        </Link>
      </div>

      {/* Address Header Profile Box (Surface Type C) */}
      <div className="surface-type-c tech-corner-tl tech-corner-br p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[6px] bg-black/80 border border-ron-cyan flex items-center justify-center text-ron-cyan">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <span className="mono-label text-[9px] uppercase text-ron-cyan block font-bold">
                SOVEREIGN ACCOUNT PROFILE
              </span>
              <h1 className="text-sm sm:text-base font-bold text-white mono-data break-all">
                {address}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isUserWallet && (
              <span className="px-2 py-0.5 rounded-[2px] bg-ron-green/[0.08] border border-ron-green/30 text-ron-green text-[10px] font-bold">
                YOUR ACTIVE WALLET
              </span>
            )}
          </div>
        </div>

        {/* Balance Grid (Surface Type A) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 surface-type-a">
            <span className="mono-label text-[9px] uppercase block">LIQUID RON BALANCE</span>
            <span className="text-xl font-bold text-white mt-1 block mono-data">
              {formatNumber(userRonBalance, 2)} RON
            </span>
            <span className="text-[10px] text-ron-dim mono-data">
              {formatCurrency(userRonBalance * metrics.ronPrice, 2)}
            </span>
          </div>

          <div className="p-3.5 surface-type-a">
            <span className="mono-label text-[9px] uppercase block">STAKED RON</span>
            <span className="text-xl font-bold text-ron-violet mt-1 block mono-data">
              {formatNumber(userStakedBalance, 2)} RON
            </span>
            <span className="text-[10px] text-ron-cyan">Insured Validator Stake</span>
          </div>

          <div className="p-3.5 surface-type-a">
            <span className="mono-label text-[9px] uppercase block">TOTAL TRANSACTIONS</span>
            <span className="text-xl font-bold text-ron-cyan mt-1 block mono-data">
              {relevantTxs.length} TXS
            </span>
            <span className="text-[10px] text-ron-green">100% Finalized</span>
          </div>

          <div className="p-3.5 surface-type-a">
            <span className="mono-label text-[9px] uppercase block">SECURITY STATUS</span>
            <span className="text-xl font-bold text-ron-green mt-1 block">
              VERIFIED
            </span>
            <span className="text-[10px] text-ron-dim">Enclave Protected</span>
          </div>
        </div>
      </div>

      {/* Multi-Token Holdings Box */}
      {isUserWallet && (
        <div className="surface-type-b p-6 space-y-4">
          <h3 className="font-bold text-white uppercase tracking-wider text-xs border-b border-white/[0.08] pb-3">
            Token Holdings Portfolio
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {tokens.map((t) => (
              <div key={t.symbol} className="p-3 surface-type-a">
                <span className="text-white font-bold text-xs block">{t.symbol}</span>
                <span className="text-ron-cyan font-bold text-sm block mt-0.5 mono-data">
                  {formatNumber(t.balance, 2)}
                </span>
                <span className="text-ron-dim text-[10px] mono-data">
                  {formatCurrency(t.balance * (t.symbol === "RON" ? metrics.ronPrice : t.price), 2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Address Transactions Table */}
      <div className="surface-type-b tech-corner-tl tech-corner-br p-6 space-y-4">
        <h3 className="font-bold text-white uppercase tracking-wider text-xs border-b border-white/[0.08] pb-3">
          On-Chain Activity Stream ({relevantTxs.length} Transactions)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-black/80 border-b border-white/[0.08] text-ron-dim uppercase tracking-wider text-[9.5px]">
              <tr>
                <th className="py-3 px-4">TX HASH</th>
                <th className="py-3 px-4">TYPE</th>
                <th className="py-3 px-4">FROM</th>
                <th className="py-3 px-4">TO</th>
                <th className="py-3 px-4">VALUE</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4 text-right">TIME</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04] text-ron-muted">
              {relevantTxs.slice(0, 10).map((tx) => (
                <tr key={tx.hash} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 text-ron-cyan font-bold mono-data">
                    <Link href={`/explorer/tx/${tx.hash}`} className="hover:underline">
                      {formatAddress(tx.hash, 8, 4)}
                    </Link>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-1.5 py-0.5 rounded-[2px] bg-white/[0.04] border border-white/[0.08] text-[9.5px] font-bold text-white">
                      {tx.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 mono-data">{formatAddress(tx.from, 4, 4)}</td>
                  <td className="py-3.5 px-4 mono-data">{formatAddress(tx.to, 4, 4)}</td>
                  <td className="py-3.5 px-4 font-bold text-white mono-data">
                    {formatNumber(tx.value, 2)} {tx.tokenSymbol}
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={tx.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 text-right text-ron-dim text-[10.5px] mono-data">
                    {formatTimeAgo(tx.timestamp)}
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
