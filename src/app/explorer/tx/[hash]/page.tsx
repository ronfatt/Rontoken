"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRonStore } from "@/lib/store";
import { formatAddress, formatNumber, formatTimeAgo } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  ArrowLeft,
  Copy,
  CheckCircle2,
  ArrowRight,
  Zap,
  Layers,
  FileCode,
  ShieldCheck,
} from "lucide-react";

export default function TxDetailsPage() {
  const params = useParams();
  const hashStr = Array.isArray(params.hash) ? params.hash[0] : params.hash;
  const txHash = hashStr || "0x7f4819a82b9012384f9812739481928374918273948172938471928374918273";

  const { transactions, metrics } = useRonStore();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Find matching tx or provide realistic default
  const tx =
    transactions.find((t) => t.hash === txHash) || {
      hash: txHash,
      blockHeight: metrics.blockHeight,
      timestamp: Date.now() - 3000,
      from: "0x72a819b208efbc912384a89012384f981238491f",
      to: "0x000000000000000000000000000000000000755c",
      value: 1000,
      tokenSymbol: "RON",
      type: "SWAP" as const,
      status: "SUCCESS" as const,
      gasFee: 0.00042,
      gasPriceGwei: 0.08,
      nonce: 142,
      contractAddress: "0x000000000000000000000000000000000000755c",
      inputData:
        "0x38ed173900000000000000000000000000000000000000000000000000000000000003e8000000000000000000000000000000000000000000000000000000000000015f",
      logs: [
        {
          event: "SwapExecuted",
          contract: "RON Router v2",
          params: { sender: "0x72a8...91f3", amountIn: "1000 USDT", amountOut: "351.28 RON" },
        },
      ],
    };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 font-mono text-xs">
      {/* Back link & Title */}
      <div className="space-y-4">
        <Link
          href="/explorer"
          className="inline-flex items-center gap-2 text-ron-muted hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO EXPLORER</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-sans">
              Transaction Details
            </h1>
            <span className="text-ron-dim text-[11px] block mt-0.5">
              Verified {formatTimeAgo(tx.timestamp)}
            </span>
          </div>

          <StatusBadge status={tx.status} size="md" />
        </div>
      </div>

      {/* Transaction Flow Visualizer (FROM -> CONTRACT -> TO) */}
      <div className="p-6 sm:p-8 rounded-2xl bg-ron-surface/90 border border-white/10 shadow-2xl backdrop-blur-xl space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <span className="font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-4 h-4 text-ron-cyan" />
            <span>EXECUTION FLOW GRAPH</span>
          </span>
          <span className="text-ron-green font-bold">SUB-SECOND SETTLEMENT (0.42s)</span>
        </div>

        {/* Step Flow Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center text-center">
          {/* Origin Address */}
          <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-1">
            <span className="text-[10px] text-ron-dim uppercase block">ORIGIN (SENDER)</span>
            <Link
              href={`/explorer/address/${tx.from}`}
              className="text-ron-cyan font-bold block hover:underline text-[11px]"
            >
              {formatAddress(tx.from, 8, 6)}
            </Link>
            <span className="text-[10px] text-ron-muted block">Sovereign Account</span>
          </div>

          {/* Smart Contract Execution Node */}
          <div className="p-4 rounded-xl bg-ron-violet/10 border border-ron-violet/40 space-y-1 relative">
            <span className="text-[10px] text-ron-violet uppercase block font-bold">
              SMART CONTRACT
            </span>
            <span className="text-white font-bold block text-[11px]">
              {tx.contractAddress ? "RON Execution Engine" : "Direct P2P Transfer"}
            </span>
            <span className="text-[10px] text-ron-green block">
              {tx.type} • 0.08 Gwei Gas
            </span>
          </div>

          {/* Destination Address */}
          <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-1">
            <span className="text-[10px] text-ron-dim uppercase block">DESTINATION (RECIPIENT)</span>
            <Link
              href={`/explorer/address/${tx.to}`}
              className="text-ron-cyan font-bold block hover:underline text-[11px]"
            >
              {formatAddress(tx.to, 8, 6)}
            </Link>
            <span className="text-[10px] text-ron-muted block">
              {formatNumber(tx.value, 2)} {tx.tokenSymbol} Credited
            </span>
          </div>
        </div>

        {/* Technical Ledger Parameter Rows */}
        <div className="space-y-3 pt-4 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg bg-black/40 border border-white/5">
            <span className="text-ron-muted font-bold">TRANSACTION HASH:</span>
            <div className="flex items-center gap-2">
              <span className="text-white break-all">{tx.hash}</span>
              <button
                onClick={() => handleCopy(tx.hash, "txhash")}
                className="p-1 text-ron-muted hover:text-white"
              >
                {copiedKey === "txhash" ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-ron-green" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg bg-black/40 border border-white/5">
            <span className="text-ron-muted font-bold">INCLUDED IN BLOCK:</span>
            <Link
              href={`/explorer/block/${tx.blockHeight}`}
              className="text-ron-cyan font-bold hover:underline"
            >
              #{tx.blockHeight.toLocaleString()}
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg bg-black/40 border border-white/5">
            <span className="text-ron-muted font-bold">NETWORK GAS FEE:</span>
            <span className="text-ron-green font-bold">
              ${tx.gasFee.toFixed(5)} ({tx.gasFee} RON)
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg bg-black/40 border border-white/5">
            <span className="text-ron-muted font-bold">NONCE:</span>
            <span className="text-white">{tx.nonce}</span>
          </div>

          {/* Input Data Box */}
          {tx.inputData && (
            <div className="p-3.5 rounded-lg bg-black/60 border border-white/5 space-y-1">
              <span className="text-ron-dim text-[10px] uppercase block">CALLDATA INPUT PAYLOAD</span>
              <p className="text-ron-muted break-all text-[11px] leading-relaxed">
                {tx.inputData}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
