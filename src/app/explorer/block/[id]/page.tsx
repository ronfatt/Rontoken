"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRonStore } from "@/lib/store";
import { formatAddress, formatNumber, formatTimeAgo } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import {
  Boxes,
  Copy,
  CheckCircle2,
  ArrowLeft,
  Server,
  Layers,
  Fuel,
  ShieldCheck,
} from "lucide-react";

export default function BlockDetailsPage() {
  const params = useParams();
  const idStr = Array.isArray(params.id) ? params.id[0] : params.id;
  const blockHeight = parseInt(idStr || "24893441", 10);

  const { blocks, transactions } = useRonStore();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Find or fallback to simulated block data
  const block =
    blocks.find((b) => b.height === blockHeight) || {
      height: blockHeight,
      hash: "0x89f41b9c4d28e7a031952fbc9821a7df39218d098e918bcde765a0b9821e9124",
      parentHash: "0x3e18a90184b912f7ca8912e750198adfb12759182390aefbc7819028471e9821",
      stateRoot: "0x9182abcf12389104812ef90123847a9812903847192837491028374619283746",
      timestamp: Date.now() - 4000,
      txCount: 412,
      validator: {
        name: "Apex Node Singapore",
        address: "0x72a819b208efbc912384a89012384f981238491f",
      },
      reward: 2.5,
      gasUsed: 14820941,
      gasLimit: 30000000,
      sizeBytes: 84210,
    };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 font-mono text-xs">
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
              BK
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white font-sans">
                Block #{block.height.toLocaleString()}
              </h1>
              <span className="text-ron-dim text-[11px] block mt-0.5">
                Sealed {formatTimeAgo(block.timestamp)}
              </span>
            </div>
          </div>

          <StatusBadge status="VALIDATED" size="md" />
        </div>
      </div>

      {/* Block Specification Details Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-ron-surface/80 border border-white/10 shadow-2xl backdrop-blur-xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-white/10">
          <div className="space-y-1">
            <span className="text-ron-dim text-[10px] uppercase">TRANSACTIONS IN BLOCK</span>
            <span className="text-lg font-bold text-white block">{block.txCount} Verified Txs</span>
          </div>

          <div className="space-y-1">
            <span className="text-ron-dim text-[10px] uppercase">BLOCK REWARD</span>
            <span className="text-lg font-bold text-ron-green block">{block.reward} RON</span>
          </div>

          <div className="space-y-1">
            <span className="text-ron-dim text-[10px] uppercase">BLOCK SIZE</span>
            <span className="text-lg font-bold text-ron-cyan block">
              {(block.sizeBytes / 1024).toFixed(2)} KB
            </span>
          </div>
        </div>

        {/* Key hashes & addresses */}
        <div className="space-y-4 text-xs">
          {/* Block Hash */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-xl bg-black/40 border border-white/5">
            <span className="text-ron-muted font-bold">BLOCK HASH:</span>
            <div className="flex items-center gap-2">
              <span className="text-white break-all">{block.hash}</span>
              <button
                onClick={() => handleCopy(block.hash, "hash")}
                className="p-1 text-ron-muted hover:text-white"
              >
                {copiedKey === "hash" ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-ron-green" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* Parent Hash */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-xl bg-black/40 border border-white/5">
            <span className="text-ron-muted font-bold">PARENT HASH:</span>
            <div className="flex items-center gap-2">
              <Link
                href={`/explorer/block/${block.height - 1}`}
                className="text-ron-cyan hover:underline break-all"
              >
                {block.parentHash}
              </Link>
              <button
                onClick={() => handleCopy(block.parentHash, "parent")}
                className="p-1 text-ron-muted hover:text-white"
              >
                {copiedKey === "parent" ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-ron-green" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* State Root */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-xl bg-black/40 border border-white/5">
            <span className="text-ron-muted font-bold">STATE ROOT:</span>
            <div className="flex items-center gap-2">
              <span className="text-white break-all">{block.stateRoot}</span>
              <button
                onClick={() => handleCopy(block.stateRoot, "state")}
                className="p-1 text-ron-muted hover:text-white"
              >
                {copiedKey === "state" ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-ron-green" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* Validator Hub */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-xl bg-black/40 border border-white/5">
            <span className="text-ron-muted font-bold">VALIDATOR:</span>
            <div className="flex items-center gap-2">
              <Link
                href={`/explorer/address/${block.validator.address}`}
                className="text-ron-violet font-bold hover:underline"
              >
                {block.validator.name} ({formatAddress(block.validator.address)})
              </Link>
            </div>
          </div>
        </div>

        {/* Gas Utilization Bar */}
        <div className="p-4 rounded-xl bg-black/50 border border-white/5 space-y-2">
          <div className="flex justify-between text-ron-muted text-[11px]">
            <span>GAS UTILIZATION</span>
            <span>
              {block.gasUsed.toLocaleString()} / {block.gasLimit.toLocaleString()} (
              {((block.gasUsed / block.gasLimit) * 100).toFixed(1)}%)
            </span>
          </div>
          <div className="w-full h-2 bg-black/80 rounded-full overflow-hidden">
            <div
              className="h-full bg-ron-cyan rounded-full"
              style={{ width: `${(block.gasUsed / block.gasLimit) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
