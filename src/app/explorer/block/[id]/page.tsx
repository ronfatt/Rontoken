"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRonStore } from "@/lib/store";
import { formatAddress, formatTimeAgo, formatNumber } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ArrowLeft, Layers, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function BlockDetailPage() {
  const params = useParams();
  const idParam = Array.isArray(params.id) ? params.id[0] : params.id;
  const blockNum = parseInt(idParam || "248934", 10);

  const { blocks, metrics } = useRonStore();

  const block =
    blocks.find((b) => b.height === blockNum) || {
      height: blockNum || metrics.blockHeight,
      hash: "0x89f41029c8712398471203984710293847102938471029384710293847102938",
      parentHash: "0x78e30918b7601287360192873601928736019287360192873601928736019287",
      timestamp: Date.now() - 6000,
      txCount: 184,
      gasUsed: 14800000,
      gasLimit: 30000000,
      gasUtilization: 49.3,
      validator: "Apex SG Validator (Singapore)",
      validatorId: "val-01",
      blockReward: 2.4,
      stateRoot: "0x55aa112233445566778899aabbccddeeff00112233445566778899aabbccddee",
      status: "FINALIZED" as const,
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

      {/* Block Profile Card (Surface Type C) */}
      <div className="surface-type-c tech-corner-tl tech-corner-br p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[6px] bg-black/80 border border-ron-cyan flex items-center justify-center text-ron-cyan">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="mono-label text-[9px] uppercase text-ron-cyan block font-bold">
                CONSENSUS BLOCK SPECIFICATION
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-white mono-data">
                Block #{block.height}
              </h1>
            </div>
          </div>

          <StatusBadge status={block.status || "FINALIZED"} size="md" />
        </div>

        {/* Telemetry Metrics Grid (Surface Type A) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 surface-type-a">
            <span className="mono-label text-[9px] uppercase block">TRANSACTION COUNT</span>
            <span className="text-xl font-bold text-white mt-1 block mono-data">
              {block.txCount} TXS
            </span>
          </div>

          <div className="p-3.5 surface-type-a">
            <span className="mono-label text-[9px] uppercase block">GAS UTILIZATION</span>
            <span className="text-xl font-bold text-ron-cyan mt-1 block mono-data">
              {block.gasUtilization || 49.3}%
            </span>
          </div>

          <div className="p-3.5 surface-type-a">
            <span className="mono-label text-[9px] uppercase block">VALIDATOR REWARD</span>
            <span className="text-xl font-bold text-ron-green mt-1 block mono-data">
              +{block.blockReward || block.reward || 2.4} RON
            </span>
          </div>

          <div className="p-3.5 surface-type-a">
            <span className="mono-label text-[9px] uppercase block">FINALITY SPEED</span>
            <span className="text-xl font-bold text-ron-violet mt-1 block mono-data">
              0.42 SEC
            </span>
          </div>
        </div>

        {/* Detailed Parameters List */}
        <div className="space-y-3 pt-2 text-ron-muted text-[11px]">
          <div className="flex justify-between py-2 border-b border-white/[0.04]">
            <span className="mono-label text-[9.5px]">BLOCK HASH:</span>
            <span className="text-white mono-data break-all">{block.hash}</span>
          </div>

          <div className="flex justify-between py-2 border-b border-white/[0.04]">
            <span className="mono-label text-[9.5px]">PARENT HASH:</span>
            <span className="text-ron-dim mono-data break-all">{block.parentHash}</span>
          </div>

          <div className="flex justify-between py-2 border-b border-white/[0.04]">
            <span className="mono-label text-[9.5px]">PROPOSING VALIDATOR:</span>
            <Link href={`/validators/${block.validatorId || "val-01"}`} className="text-ron-cyan font-bold hover:underline">
              {typeof block.validator === "string" ? block.validator : block.validator?.name || "Apex SG Validator"}
            </Link>
          </div>

          <div className="flex justify-between py-2 border-b border-white/[0.04]">
            <span className="mono-label text-[9.5px]">TIMESTAMP:</span>
            <span className="text-white mono-data">
              {new Date(block.timestamp).toLocaleString()} ({formatTimeAgo(block.timestamp)})
            </span>
          </div>

          <div className="flex justify-between py-2">
            <span className="mono-label text-[9.5px]">STATE ROOT:</span>
            <span className="text-ron-dim mono-data break-all">{block.stateRoot}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
