"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRonStore } from "@/lib/store";
import { formatCompactNumber, formatNumber, formatAddress } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { ArrowLeft, Server, ShieldCheck, Activity, Globe2, Lock } from "lucide-react";

export default function ValidatorDetailPage() {
  const params = useParams();
  const idStr = Array.isArray(params.id) ? params.id[0] : params.id;
  const valId = idStr || "val-01";

  const { validators, stakeRon, ronBalance } = useRonStore();
  const [stakeModalOpen, setStakeModalOpen] = useState(false);
  const [stakeAmount, setStakeAmount] = useState("1000");
  const [durationDays, setDurationDays] = useState(365);

  const validator =
    validators.find((v) => v.id === valId || v.name.toLowerCase().includes(valId.toLowerCase())) ||
    validators[0];

  const handleStake = async () => {
    await stakeRon(parseFloat(stakeAmount) || 0, validator.id, durationDays);
    setStakeModalOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-mono text-xs">
      {/* Back button */}
      <div>
        <Link
          href="/network"
          className="inline-flex items-center gap-2 text-ron-muted hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO OPERATIONS CENTER</span>
        </Link>
      </div>

      {/* Validator Header Profile */}
      <div className="surface-type-c tech-corner-tl tech-corner-br p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-[6px] bg-black/80 border border-ron-violet flex items-center justify-center text-ron-cyan">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white font-sans">{validator.name}</h1>
                <StatusBadge status={validator.status} size="sm" />
              </div>
              <span className="text-ron-muted text-[11px] mt-0.5 block">
                {validator.location} • Node Version: {validator.nodeVersion}
              </span>
            </div>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={() => setStakeModalOpen(true)}
            className="text-xs"
            leftIcon={<Lock className="w-3.5 h-3.5 text-black" />}
          >
            DELEGATE STAKE
          </Button>
        </div>

        {/* Telemetry KPI Grid (Surface Type A) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 surface-type-a">
            <span className="mono-label text-[9px] uppercase block">TOTAL DELEGATION</span>
            <span className="text-xl font-bold text-ron-cyan mt-1 block mono-data">
              {formatCompactNumber(validator.totalStake)} RON
            </span>
          </div>

          <div className="p-3.5 surface-type-a">
            <span className="mono-label text-[9px] uppercase block">ESTIMATED APR</span>
            <span className="text-xl font-bold text-ron-green mt-1 block mono-data">
              {validator.apr}%
            </span>
          </div>

          <div className="p-3.5 surface-type-a">
            <span className="mono-label text-[9px] uppercase block">HISTORICAL UPTIME</span>
            <span className="text-xl font-bold text-white mt-1 block mono-data">
              {validator.uptime}%
            </span>
          </div>

          <div className="p-3.5 surface-type-a">
            <span className="mono-label text-[9px] uppercase block">COMMISSION RATE</span>
            <span className="text-xl font-bold text-ron-violet mt-1 block mono-data">
              {validator.commission}%
            </span>
          </div>
        </div>

        {/* Technical Specification Rows */}
        <div className="space-y-2.5 pt-2 border-t border-white/[0.08] text-ron-muted text-[11px]">
          <div className="flex justify-between">
            <span className="mono-label text-[9.5px]">OPERATOR ADDRESS:</span>
            <span className="text-white mono-data">{validator.address || "0x72a819b208efbc912384a89012384f981238491f"}</span>
          </div>
          <div className="flex justify-between">
            <span className="mono-label text-[9.5px]">BLOCKS SEALED:</span>
            <span className="text-white mono-data">{(validator.blocksProduced || validator.blocksValidated || 489210).toLocaleString()} Blocks</span>
          </div>
          <div className="flex justify-between">
            <span className="mono-label text-[9.5px]">ACTIVE DELEGATORS:</span>
            <span className="text-white mono-data">{(validator.delegatorsCount || validator.delegators || 1240).toLocaleString()} Accounts</span>
          </div>
          <div className="flex justify-between">
            <span className="mono-label text-[9.5px]">LATENCY TO CONSENSUS CORE:</span>
            <span className="text-ron-green mono-data">{validator.latencyMs}ms (Optimal)</span>
          </div>
          <div className="flex justify-between">
            <span className="mono-label text-[9.5px]">SLASHING RISK RATING:</span>
            <span className="text-ron-green font-bold">{validator.risk} RISK (INSURED)</span>
          </div>
        </div>
      </div>

      {/* Stake Modal */}
      <Modal
        isOpen={stakeModalOpen}
        onClose={() => setStakeModalOpen(false)}
        title={`Delegate to ${validator.name}`}
        subtitle={`Available balance: ${formatNumber(ronBalance, 2)} RON`}
      >
        <div className="space-y-4 font-mono text-xs">
          <div className="p-3.5 surface-type-a space-y-1.5">
            <span className="mono-label text-[9px] uppercase block">AMOUNT TO DELEGATE</span>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                className="w-full bg-transparent text-xl font-bold text-white focus:outline-none mono-data"
              />
              <span className="text-ron-cyan font-bold">RON</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="mono-label text-[9px] uppercase block">LOCK DURATION</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setDurationDays(90)}
                className={`p-2.5 rounded-[4px] border text-center ${
                  durationDays === 90
                    ? "bg-ron-violet/20 border-ron-violet text-white font-bold"
                    : "bg-white/[0.04] border-white/10 text-ron-muted"
                }`}
              >
                90 Days • 10.2% APY
              </button>
              <button
                onClick={() => setDurationDays(365)}
                className={`p-2.5 rounded-[4px] border text-center ${
                  durationDays === 365
                    ? "bg-ron-violet/20 border-ron-violet text-white font-bold"
                    : "bg-white/[0.04] border-white/10 text-ron-muted"
                }`}
              >
                365 Days • 18.42% APY
              </button>
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={handleStake}
            className="w-full text-xs font-mono mt-2"
          >
            CONFIRM STAKE ({stakeAmount} RON)
          </Button>
        </div>
      </Modal>
    </div>
  );
}
