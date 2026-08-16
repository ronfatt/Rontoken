"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRonStore } from "@/lib/store";
import { formatAddress, formatNumber, formatTimeAgo } from "@/lib/utils";
import { StatusBadge } from "../ui/StatusBadge";
import { Button } from "../ui/Button";
import { ArrowRight } from "lucide-react";
import { TransactionData } from "@/lib/types";

export const Scene09ExplorerStream: React.FC = () => {
  const { transactions } = useRonStore();
  const [hoveredTx, setHoveredTx] = useState<TransactionData | null>(null);

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/[0.04]">
      <div className="max-w-[1440px] mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="mono-label block tracking-[0.2em] text-ron-cyan">
              08 // REAL-TIME CONSENSUS LEDGER
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              RON Explorer Preview
            </h2>
            <p className="text-xs sm:text-sm text-ron-muted max-w-lg font-sans">
              Inspect sub-second transactions streaming through the global validator mempool.
            </p>
          </div>

          <Link href="/explorer">
            <Button
              variant="secondary"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              className="text-xs"
            >
              OPEN FULL EXPLORER
            </Button>
          </Link>
        </div>

        {/* Live Transaction Stream Table Container (Surface Type B) */}
        <div className="surface-type-b tech-corner-tl tech-corner-br overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-black/80 border-b border-white/[0.08] text-ron-dim uppercase tracking-wider text-[9.5px]">
                <tr>
                  <th className="py-3 px-4">BLOCK</th>
                  <th className="py-3 px-4">TX HASH</th>
                  <th className="py-3 px-4">TYPE</th>
                  <th className="py-3 px-4">FROM</th>
                  <th className="py-3 px-4">TO</th>
                  <th className="py-3 px-4">VALUE</th>
                  <th className="py-3 px-4">STATUS</th>
                  <th className="py-3 px-4 text-right">TIME</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {transactions.slice(0, 8).map((tx) => {
                  const isHovered = hoveredTx?.hash === tx.hash;
                  return (
                    <tr
                      key={tx.hash}
                      onMouseEnter={() => setHoveredTx(tx)}
                      onMouseLeave={() => setHoveredTx(null)}
                      className={`transition-colors cursor-pointer ${
                        isHovered
                          ? "bg-white/[0.04] text-white"
                          : "hover:bg-white/[0.02] text-ron-muted"
                      }`}
                    >
                      <td className="py-3 px-4 text-ron-cyan font-bold mono-data">
                        <Link href={`/explorer/block/${tx.blockHeight}`} className="hover:underline">
                          #{tx.blockHeight}
                        </Link>
                      </td>
                      <td className="py-3 px-4 font-mono text-white mono-data">
                        <Link href={`/explorer/tx/${tx.hash}`} className="hover:text-ron-cyan">
                          {formatAddress(tx.hash, 6, 4)}
                        </Link>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-1.5 py-0.5 rounded-[2px] bg-white/[0.04] border border-white/[0.08] text-[9.5px] font-bold text-ron-text">
                          {tx.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-ron-muted hover:text-white mono-data">
                        <Link href={`/explorer/address/${tx.from}`}>
                          {formatAddress(tx.from, 4, 4)}
                        </Link>
                      </td>
                      <td className="py-3 px-4 text-ron-muted hover:text-white mono-data">
                        <Link href={`/explorer/address/${tx.to}`}>
                          {formatAddress(tx.to, 4, 4)}
                        </Link>
                      </td>
                      <td className="py-3 px-4 font-bold text-white mono-data">
                        {formatNumber(tx.value, tx.value < 10 ? 2 : 0)} {tx.tokenSymbol}
                      </td>
                      <td className="py-3 px-4">
                        <StatusBadge status={tx.status} size="sm" />
                      </td>
                      <td className="py-3 px-4 text-right text-ron-dim text-[10px] mono-data">
                        {formatTimeAgo(tx.timestamp)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer Live Pulse */}
          <div className="p-3 bg-black/80 border-t border-white/[0.06] flex items-center justify-between font-mono text-[11px] text-ron-dim">
            <div className="flex items-center gap-2 text-ron-green">
              <span className="w-1.5 h-1.5 rounded-full bg-ron-green animate-pulse" />
              <span>MEMPOOL SOCKET ACTIVE</span>
            </div>
            <span>FEED LATENCY: 0.04s</span>
          </div>
        </div>
      </div>
    </section>
  );
};
