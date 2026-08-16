"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRonStore } from "@/lib/store";
import { formatAddress, formatNumber, formatTimeAgo } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Copy, CheckCircle2, ArrowRight, ShieldCheck, Activity } from "lucide-react";

export default function TxDetailPage() {
  const params = useParams();
  const hashParam = Array.isArray(params.hash) ? params.hash[0] : params.hash;
  const hash = hashParam || "0x9812A8F34C918B52E5A7710F93D13A91F3E9012384759";

  const { transactions, metrics, walletAddress } = useRonStore();
  const [copied, setCopied] = useState(false);

  const tx =
    transactions.find((t) => t.hash.toLowerCase() === hash.toLowerCase()) || {
      hash,
      blockHeight: metrics.blockHeight,
      timestamp: Date.now() - 12000,
      from: walletAddress,
      to: "0x7890123456789012345678901234567890123456",
      value: 1000.0,
      tokenSymbol: "RON",
      type: "SWAP" as const,
      networkFee: 0.00042,
      gasUsed: 42000,
      nonce: 184,
      confirmations: 12,
      status: "SUCCESS" as const,
    };

  const handleCopy = () => {
    navigator.clipboard.writeText(tx.hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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

      {/* Transaction Overview Card (Surface Type C) */}
      <div className="surface-type-c tech-corner-tl tech-corner-br p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div>
            <span className="mono-label text-[9px] uppercase text-ron-cyan block font-bold">
              TRANSACTION RECEIPT
            </span>
            <div className="flex items-center gap-2 mt-1">
              <h1 className="text-sm sm:text-base font-bold text-white mono-data break-all">
                {tx.hash}
              </h1>
              <button
                onClick={handleCopy}
                className="p-1 text-ron-muted hover:text-white transition-colors shrink-0"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <StatusBadge status={tx.status} size="md" />
        </div>

        {/* Execution Flow Diagram (Sender → Smart Contract → Recipient) */}
        <div className="p-4 surface-type-a space-y-3">
          <span className="mono-label text-[9px] uppercase block text-ron-violet font-bold">
            EXECUTION FLOW GRAPH
          </span>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="p-3 surface-type-d text-center flex-1 w-full">
              <span className="mono-label text-[8px] block">ORIGIN (FROM)</span>
              <Link href={`/explorer/address/${tx.from}`} className="text-ron-cyan font-bold hover:underline mono-data">
                {formatAddress(tx.from, 6, 6)}
              </Link>
            </div>

            <ArrowRight className="w-4 h-4 text-ron-muted shrink-0 hidden sm:inline" />

            <div className="p-3 surface-type-d text-center flex-1 w-full border-ron-violet/40">
              <span className="mono-label text-[8px] text-ron-violet block">ACTION TYPE</span>
              <span className="text-white font-bold">{tx.type} ({formatNumber(tx.value, 2)} {tx.tokenSymbol})</span>
            </div>

            <ArrowRight className="w-4 h-4 text-ron-muted shrink-0 hidden sm:inline" />

            <div className="p-3 surface-type-d text-center flex-1 w-full">
              <span className="mono-label text-[8px] block">DESTINATION (TO)</span>
              <Link href={`/explorer/address/${tx.to}`} className="text-ron-green font-bold hover:underline mono-data">
                {formatAddress(tx.to, 6, 6)}
              </Link>
            </div>
          </div>
        </div>

        {/* Detailed Transaction Parameters Table */}
        <div className="space-y-3 pt-2 text-ron-muted text-[11px]">
          <div className="flex justify-between py-2 border-b border-white/[0.04]">
            <span className="mono-label text-[9.5px]">BLOCK HEIGHT:</span>
            <Link href={`/explorer/block/${tx.blockHeight}`} className="text-ron-cyan font-bold hover:underline mono-data">
              #{tx.blockHeight}
            </Link>
          </div>

          <div className="flex justify-between py-2 border-b border-white/[0.04]">
            <span className="mono-label text-[9.5px]">TIMESTAMP:</span>
            <span className="text-white mono-data">
              {new Date(tx.timestamp).toLocaleString()} ({formatTimeAgo(tx.timestamp)})
            </span>
          </div>

          <div className="flex justify-between py-2 border-b border-white/[0.04]">
            <span className="mono-label text-[9.5px]">TRANSFERRED VALUE:</span>
            <span className="text-white font-bold text-sm mono-data">
              {formatNumber(tx.value, 4)} {tx.tokenSymbol}
            </span>
          </div>

          <div className="flex justify-between py-2 border-b border-white/[0.04]">
            <span className="mono-label text-[9.5px]">NETWORK TRANSACTION FEE:</span>
            <span className="text-ron-green font-bold mono-data">
              {tx.networkFee || tx.gasFee || 0.00042} RON ($0.08)
            </span>
          </div>

          <div className="flex justify-between py-2 border-b border-white/[0.04]">
            <span className="mono-label text-[9.5px]">GAS UTILIZATION:</span>
            <span className="text-white mono-data">{(tx.gasUsed || 42000).toLocaleString()} Gas Units</span>
          </div>

          <div className="flex justify-between py-2 border-b border-white/[0.04]">
            <span className="mono-label text-[9.5px]">ACCOUNT NONCE:</span>
            <span className="text-white mono-data">#{tx.nonce ?? 142}</span>
          </div>

          <div className="flex justify-between py-2">
            <span className="mono-label text-[9.5px]">CONFIRMATIONS:</span>
            <span className="text-ron-green font-bold mono-data">
              {tx.confirmations ?? 12} Validator Confirmations (FINALIZED)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
