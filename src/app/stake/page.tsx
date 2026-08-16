"use client";

import React, { useState } from "react";
import { useRonStore } from "@/lib/store";
import { formatNumber, formatCurrency, formatCompactNumber } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { ShieldCheck, Server } from "lucide-react";
import { ValidatorData } from "@/lib/types";

export default function StakePage() {
  const {
    ronBalance,
    stakedBalance,
    validators,
    stakeRon,
    unstakeRon,
    claimStakingRewards,
    metrics,
  } = useRonStore();

  const [selectedValidator, setSelectedValidator] = useState<ValidatorData | null>(null);
  const [stakeModalOpen, setStakeModalOpen] = useState(false);
  const [unstakeModalOpen, setUnstakeModalOpen] = useState(false);
  const [stakeAmount, setStakeAmount] = useState("1000");
  const [unstakeAmount, setUnstakeAmount] = useState("500");
  const [durationDays, setDurationDays] = useState(365);

  const handleOpenStake = (val: ValidatorData) => {
    setSelectedValidator(val);
    setStakeModalOpen(true);
  };

  const handleExecuteStake = async () => {
    if (!selectedValidator) return;
    await stakeRon(parseFloat(stakeAmount) || 0, selectedValidator.id, durationDays);
    setStakeModalOpen(false);
  };

  const handleExecuteUnstake = async () => {
    await unstakeRon(parseFloat(unstakeAmount) || 0);
    setUnstakeModalOpen(false);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto font-sans">
        <span className="mono-label block tracking-[0.2em] text-ron-cyan">
          CONSENSUS SECURITY & LIQUID DELEGATION
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          RON Staking Hub
        </h1>
        <p className="text-xs sm:text-sm text-ron-muted leading-relaxed font-mono">
          Delegate your RON tokens to institutional validator nodes across 42 jurisdictions.
          Earn compounding yields up to 18.42% APY with insured slashing protection.
        </p>
      </div>

      {/* Portfolio Staking Overview Matrix (Surface Type A) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
        <div className="p-4 surface-type-a space-y-1">
          <span className="mono-label text-[9px] uppercase">TOTAL STAKED PORTFOLIO</span>
          <span className="text-2xl font-bold text-white block mono-data">
            {formatNumber(stakedBalance, 2)} RON
          </span>
          <span className="text-[10px] text-ron-cyan mono-data">
            {formatCurrency(stakedBalance * metrics.ronPrice, 2)}
          </span>
        </div>

        <div className="p-4 surface-type-a space-y-1">
          <span className="mono-label text-[9px] uppercase">AVAILABLE BALANCE</span>
          <span className="text-2xl font-bold text-ron-cyan block mono-data">
            {formatNumber(ronBalance, 2)} RON
          </span>
          <span className="text-[10px] text-ron-muted mono-data">
            {formatCurrency(ronBalance * metrics.ronPrice, 2)}
          </span>
        </div>

        <div className="p-4 surface-type-a space-y-1">
          <span className="mono-label text-[9px] uppercase">UNCLAIMED REWARDS</span>
          <span className="text-2xl font-bold text-ron-green block mono-data">+142.85 RON</span>
          <div className="pt-2">
            <button
              onClick={() => claimStakingRewards()}
              className="px-2 py-0.5 rounded-[2px] bg-ron-green/20 hover:bg-ron-green/30 border border-ron-green/40 text-ron-green font-bold text-[9.5px] transition-colors"
            >
              CLAIM REWARDS
            </button>
          </div>
        </div>

        <div className="p-4 surface-type-a space-y-1">
          <span className="mono-label text-[9px] uppercase">DAO VOTING POWER</span>
          <span className="text-2xl font-bold text-ron-violet block mono-data">
            {formatNumber(stakedBalance * 1.5, 0)} vRON
          </span>
          <div className="pt-2">
            <button
              onClick={() => setUnstakeModalOpen(true)}
              className="px-2 py-0.5 rounded-[2px] bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-ron-muted hover:text-white font-bold text-[9.5px] transition-colors"
            >
              UNSTAKE ASSETS
            </button>
          </div>
        </div>
      </div>

      {/* Global Validators Table (Surface Type B with Tech Corners) */}
      <div className="p-6 surface-type-b tech-corner-tl tech-corner-br space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs border-b border-white/[0.08] pb-4">
          <div>
            <h3 className="text-base font-bold text-white uppercase tracking-wider">Tier-1 Validator Registry</h3>
            <p className="text-xs text-ron-muted mt-0.5 font-sans">
              Select a cluster to delegate and earn time-weighted rewards.
            </p>
          </div>
          <span className="text-ron-green font-bold text-[10px]">184 / 184 ACTIVE & VALIDATING</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-black/80 border-b border-white/[0.08] text-ron-dim uppercase tracking-wider text-[9.5px]">
              <tr>
                <th className="py-3 px-4">VALIDATOR</th>
                <th className="py-3 px-4">LOCATION</th>
                <th className="py-3 px-4">APR</th>
                <th className="py-3 px-4">TOTAL STAKE</th>
                <th className="py-3 px-4">COMMISSION</th>
                <th className="py-3 px-4">UPTIME</th>
                <th className="py-3 px-4">RISK</th>
                <th className="py-3 px-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04] text-ron-muted">
              {validators.map((val) => (
                <tr key={val.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-ron-green" />
                    <span>{val.name}</span>
                  </td>
                  <td className="py-3.5 px-4">{val.location}</td>
                  <td className="py-3.5 px-4 text-ron-green font-bold text-sm mono-data">{val.apr}%</td>
                  <td className="py-3.5 px-4 text-ron-cyan font-bold mono-data">
                    {formatCompactNumber(val.totalStake)} RON
                  </td>
                  <td className="py-3.5 px-4 mono-data">{val.commission}%</td>
                  <td className="py-3.5 px-4 mono-data">{val.uptime}%</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-1.5 py-0.5 rounded-[2px] text-[9.5px] font-bold border ${
                        val.risk === "LOW"
                          ? "bg-ron-green/10 text-ron-green border-ron-green/30"
                          : "bg-ron-amber/10 text-ron-amber border-ron-amber/30"
                      }`}
                    >
                      {val.risk}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleOpenStake(val)}
                      className="text-[11px]"
                    >
                      STAKE
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stake Modal */}
      <Modal
        isOpen={stakeModalOpen}
        onClose={() => setStakeModalOpen(false)}
        title={`Delegate to ${selectedValidator?.name}`}
        subtitle="Lock RON tokens to earn compounding network staking emissions"
      >
        <div className="space-y-4 font-mono text-xs">
          <div className="p-3.5 surface-type-a space-y-1.5">
            <span className="mono-label text-[9px] uppercase block">STAKE AMOUNT</span>
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
            <span className="mono-label text-[9px] uppercase block">LOCK DURATION & APY</span>
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
            onClick={handleExecuteStake}
            className="w-full text-xs font-mono mt-3"
          >
            CONFIRM DELEGATION ({stakeAmount} RON)
          </Button>
        </div>
      </Modal>

      {/* Unstake Modal */}
      <Modal
        isOpen={unstakeModalOpen}
        onClose={() => setUnstakeModalOpen(false)}
        title="Unstake RON Tokens"
        subtitle="Withdraw delegated stake back to your sovereign wallet"
      >
        <div className="space-y-4 font-mono text-xs">
          <div className="p-3.5 surface-type-a space-y-1.5">
            <span className="mono-label text-[9px] uppercase block">WITHDRAWAL AMOUNT</span>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={unstakeAmount}
                onChange={(e) => setUnstakeAmount(e.target.value)}
                className="w-full bg-transparent text-xl font-bold text-white focus:outline-none mono-data"
              />
              <span className="text-ron-cyan font-bold">RON</span>
            </div>
          </div>

          <p className="text-ron-amber text-[10.5px]">
            Notice: Unstaking withdraws active principal and unlocks sovereign tokens instantly via Liquid vRON relayer.
          </p>

          <Button
            variant="danger"
            size="lg"
            onClick={handleExecuteUnstake}
            className="w-full text-xs font-mono mt-3"
          >
            UNSTAKE {unstakeAmount} RON
          </Button>
        </div>
      </Modal>
    </div>
  );
}
