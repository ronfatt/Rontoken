"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRonStore } from "@/lib/store";
import { formatCurrency, formatNumber, formatAddress } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ValidatorData } from "@/lib/types";
import {
  Lock,
  Coins,
  ShieldCheck,
  Zap,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  RefreshCw,
} from "lucide-react";

export default function StakePage() {
  const {
    ronBalance,
    stakedBalance,
    stakingPositions,
    validators,
    stakeRon,
    unstakeRon,
    claimStakingRewards,
    txStage,
    activeTxReceipt,
    resetTxStage,
    metrics,
  } = useRonStore();

  const [stakeSheetOpen, setStakeSheetOpen] = useState(false);
  const [claimSheetOpen, setClaimSheetOpen] = useState(false);
  const [selectedValidator, setSelectedValidator] = useState<ValidatorData>(validators[0]);
  const [stakeAmount, setStakeAmount] = useState("1000");
  const [lockDays, setLockDays] = useState(365);
  const [stakeStep, setStakeStep] = useState<1 | 2 | 3>(1); // 1: Amount & Validator, 2: Duration, 3: Review
  const [stakeError, setStakeError] = useState<string | null>(null);

  const numAmount = parseFloat(stakeAmount) || 0;
  const isInsufficient = numAmount > ronBalance;

  const apyMultiplier = lockDays === 365 ? 1.0 : lockDays === 180 ? 0.85 : 0.65;
  const effectiveApy = (selectedValidator.apr * apyMultiplier).toFixed(2);
  const estAnnualReward = ((numAmount * parseFloat(effectiveApy)) / 100).toFixed(2);

  const totalAccruedRewards = stakingPositions.reduce((sum, p) => sum + p.accruedRewards, 0);

  const handleExecuteStake = async () => {
    setStakeError(null);
    if (isInsufficient || numAmount <= 0) {
      setStakeError("Invalid stake amount.");
      return;
    }
    const res = await stakeRon(numAmount, selectedValidator.id, lockDays);
    if (!res.success) {
      setStakeError(res.error || "Staking transaction failed.");
    }
  };

  const handleExecuteClaim = async () => {
    await claimStakingRewards();
    setClaimSheetOpen(false);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-10 font-mono text-xs pb-24 sm:pb-12">
      {/* Header Profile */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="mono-label block tracking-[0.2em] text-ron-green">
          LIQUID CONSENSUS DELEGATION
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-sans tracking-tight">
          RON Staking Hub
        </h1>
        <p className="text-xs text-ron-muted leading-relaxed font-sans">
          Secure Turing-BFT consensus, earn up to 18.42% APY, and participate in sovereign governance.
        </p>
      </div>

      {/* Portfolio Staking Overview Strip (Surface Type C) */}
      <div className="surface-type-c tech-corner-tl tech-corner-br p-5 sm:p-8 space-y-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 surface-type-a">
            <span className="mono-label text-[9px] uppercase block">TOTAL STAKED</span>
            <span className="text-2xl font-bold text-white mt-1 block mono-data">
              {formatNumber(stakedBalance, 2)} RON
            </span>
            <span className="text-[10px] text-ron-dim mono-data">
              {formatCurrency(stakedBalance * metrics.ronPrice, 2)}
            </span>
          </div>

          <div className="p-3.5 surface-type-a">
            <span className="mono-label text-[9px] uppercase block">ACCRUED REWARDS</span>
            <span className="text-2xl font-bold text-ron-green mt-1 block mono-data">
              +{formatNumber(totalAccruedRewards, 4)} RON
            </span>
            <span className="text-[10px] text-ron-cyan">Compounding Daily</span>
          </div>

          <div className="p-3.5 surface-type-a">
            <span className="mono-label text-[9px] uppercase block">MAX APY</span>
            <span className="text-2xl font-bold text-ron-violet mt-1 block mono-data">
              18.42%
            </span>
            <span className="text-[10px] text-ron-green">100% Slashing Insured</span>
          </div>

          <div className="p-3.5 surface-type-a">
            <span className="mono-label text-[9px] uppercase block">VOTING POWER</span>
            <span className="text-2xl font-bold text-ron-cyan mt-1 block mono-data">
              {formatNumber(ronBalance + stakedBalance * 1.5, 0)} vRON
            </span>
            <span className="text-[10px] text-ron-dim">1.5x Multiplier</span>
          </div>
        </div>

        {/* Primary Staking Action Strip */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              resetTxStage();
              setStakeStep(1);
              setStakeSheetOpen(true);
            }}
            className="w-full sm:w-auto flex-1 text-xs h-12"
          >
            STAKE RON TOKENS
          </Button>

          {totalAccruedRewards > 0 && (
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setClaimSheetOpen(true)}
              className="w-full sm:w-auto flex-1 text-xs h-12 text-ron-green border-ron-green/40 hover:bg-ron-green/10"
            >
              CLAIM +{formatNumber(totalAccruedRewards, 3)} RON REWARDS
            </Button>
          )}
        </div>
      </div>

      {/* Active Positions Feed */}
      <div className="surface-type-b p-5 sm:p-6 space-y-4">
        <h3 className="font-bold text-white uppercase tracking-wider text-xs border-b border-white/[0.08] pb-3">
          Your Active Staking Delegations ({stakingPositions.length})
        </h3>

        {stakingPositions.length === 0 ? (
          <p className="text-ron-muted text-xs py-4">No active staking delegations yet.</p>
        ) : (
          <div className="space-y-2.5">
            {stakingPositions.map((pos) => (
              <div
                key={pos.id}
                className="p-4 rounded-[6px] surface-type-a hover:border-ron-green/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-xs">{pos.validatorName}</span>
                    <span className="px-1.5 py-0.5 rounded-[2px] bg-ron-green/10 text-ron-green text-[9.5px] font-bold">
                      {pos.apy}% APY
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-ron-dim mt-1">
                    <span>Delegated: {formatNumber(pos.amount, 2)} RON</span>
                    <span>Lock: {pos.lockDays} Days</span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/[0.06]">
                  <div className="text-left sm:text-right">
                    <span className="mono-label text-[8.5px] block">ACCRUED</span>
                    <span className="text-xs font-bold text-ron-green mono-data">
                      +{formatNumber(pos.accruedRewards, 4)} RON
                    </span>
                  </div>

                  <button
                    onClick={() => unstakeRon(pos.id, pos.amount)}
                    className="px-3 py-1.5 rounded-[4px] bg-white/[0.04] hover:bg-white/10 text-white text-[11px] font-mono"
                  >
                    UNSTAKE
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Step-by-Step Staking Flow Bottom Sheet */}
      <BottomSheet
        isOpen={stakeSheetOpen}
        onClose={() => setStakeSheetOpen(false)}
        title="Stake RON"
        subtitle={`Step ${stakeStep} of 3: ${
          stakeStep === 1 ? "Amount & Validator" : stakeStep === 2 ? "Lock Duration" : "Review Delegation"
        }`}
      >
        <div className="space-y-4">
          {txStage === "CONFIRMED" && activeTxReceipt ? (
            <div className="p-5 surface-type-d space-y-3 text-left">
              <div className="flex items-center gap-2 text-ron-green font-bold text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>STAKE SEALED ON-CHAIN</span>
              </div>
              <div className="space-y-1 text-ron-muted text-[11px]">
                <div className="flex justify-between">
                  <span>DELEGATED AMOUNT:</span>
                  <span className="text-white font-bold mono-data">{stakeAmount} RON</span>
                </div>
                <div className="flex justify-between">
                  <span>VALIDATOR HUB:</span>
                  <span className="text-ron-cyan">{selectedValidator.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>APY RATE:</span>
                  <span className="text-ron-green font-bold">{effectiveApy}% APY</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  resetTxStage();
                  setStakeSheetOpen(false);
                }}
                className="w-full text-xs"
              >
                DONE
              </Button>
            </div>
          ) : stakeStep === 1 ? (
            /* Step 1: Amount & Validator */
            <div className="space-y-3.5">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <label className="mono-label text-[9.5px]">STAKE AMOUNT</label>
                  <span className="text-ron-dim">BAL: {formatNumber(ronBalance, 2)} RON</span>
                </div>
                <div className="p-3 surface-type-a space-y-2">
                  <input
                    type="number"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    placeholder="1000"
                    className="w-full bg-transparent text-2xl font-bold font-mono text-white focus:outline-none mono-data"
                  />
                  {/* Quick percentage chips */}
                  <div className="flex items-center gap-1.5">
                    {[25, 50, 75, 100].map((pct) => (
                      <button
                        key={pct}
                        type="button"
                        onClick={() =>
                          setStakeAmount(((ronBalance * pct) / 100).toFixed(0))
                        }
                        className="flex-1 py-1 rounded-[3px] bg-white/[0.04] hover:bg-white/10 text-white font-mono text-[10px] font-bold active:scale-95"
                      >
                        {pct === 100 ? "MAX" : `${pct}%`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Validator Selector */}
              <div className="space-y-1">
                <label className="mono-label text-[9.5px]">SELECT VALIDATOR</label>
                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                  {validators.map((v) => (
                    <div
                      key={v.id}
                      onClick={() => setSelectedValidator(v)}
                      className={`p-2.5 rounded-[4px] border cursor-pointer transition-all flex items-center justify-between ${
                        selectedValidator.id === v.id
                          ? "bg-ron-violet/20 border-ron-cyan text-white"
                          : "surface-type-a text-ron-muted hover:text-white"
                      }`}
                    >
                      <div>
                        <span className="font-bold text-xs block">{v.name}</span>
                        <span className="text-[10px] text-ron-dim">{v.location} • Uptime {v.uptime}%</span>
                      </div>
                      <span className="text-xs font-bold text-ron-green mono-data">{v.apr}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                onClick={() => setStakeStep(2)}
                disabled={isInsufficient || numAmount <= 0}
                className="w-full text-xs h-12"
              >
                CONTINUE TO DURATION
              </Button>
            </div>
          ) : stakeStep === 2 ? (
            /* Step 2: Lock Duration */
            <div className="space-y-4">
              <span className="mono-label text-[9.5px]">SELECT LOCK PERIOD</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { days: 90, label: "90 DAYS", apy: "12.0%" },
                  { days: 180, label: "180 DAYS", apy: "15.6%" },
                  { days: 365, label: "365 DAYS", apy: "18.42%" },
                ].map((tier) => (
                  <button
                    key={tier.days}
                    type="button"
                    onClick={() => setLockDays(tier.days)}
                    className={`p-3 rounded-[6px] border text-center transition-all ${
                      lockDays === tier.days
                        ? "bg-ron-violet/20 border-ron-cyan text-white"
                        : "surface-type-a text-ron-muted hover:text-white"
                    }`}
                  >
                    <span className="text-xs font-bold block">{tier.label}</span>
                    <span className="text-ron-green font-bold text-[11px] block mt-1 mono-data">
                      {tier.apy}
                    </span>
                  </button>
                ))}
              </div>

              <div className="p-3.5 surface-type-a space-y-1 text-ron-dim text-[11px]">
                <div className="flex justify-between">
                  <span>ESTIMATED ANNUAL YIELD:</span>
                  <span className="text-ron-green font-bold mono-data">+{estAnnualReward} RON</span>
                </div>
                <div className="flex justify-between">
                  <span>SLASHING PROTECTION:</span>
                  <span className="text-white">100% Protocol Reserve Insured</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => setStakeStep(1)}
                  className="w-1/3 text-xs"
                >
                  BACK
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setStakeStep(3)}
                  className="w-2/3 text-xs h-12"
                >
                  REVIEW STAKE
                </Button>
              </div>
            </div>
          ) : (
            /* Step 3: Review */
            <div className="space-y-4">
              <div className="p-4 surface-type-a space-y-2 text-[11px] text-ron-muted">
                <div className="flex justify-between">
                  <span>DELEGATION AMOUNT:</span>
                  <span className="text-white font-bold mono-data text-sm">{stakeAmount} RON</span>
                </div>
                <div className="flex justify-between">
                  <span>TARGET VALIDATOR:</span>
                  <span className="text-ron-cyan font-bold">{selectedValidator.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>LOCK DURATION:</span>
                  <span className="text-white font-bold">{lockDays} Days</span>
                </div>
                <div className="flex justify-between">
                  <span>ESTIMATED APY:</span>
                  <span className="text-ron-green font-bold text-sm mono-data">{effectiveApy}% APY</span>
                </div>
              </div>

              {stakeError && (
                <p className="text-ron-red text-[11px] font-bold">{stakeError}</p>
              )}

              <Button
                variant="primary"
                size="lg"
                onClick={handleExecuteStake}
                isLoading={txStage !== "IDLE" && txStage !== "CONFIRMED"}
                className="w-full text-xs font-mono h-12"
              >
                {txStage === "PREPARING" && "PREPARING DELEGATION..."}
                {txStage === "SIGNATURE" && "SIGNING STAKING CONTRACT..."}
                {txStage === "BROADCASTING" && "BROADCASTING TO MEMPOOL..."}
                {txStage === "VALIDATING" && "CONFIRMING WITH 184 HUBS..."}
                {txStage === "IDLE" && `CONFIRM & STAKE ${stakeAmount} RON`}
              </Button>
            </div>
          )}
        </div>
      </BottomSheet>

      {/* Claim Rewards Bottom Sheet */}
      <BottomSheet
        isOpen={claimSheetOpen}
        onClose={() => setClaimSheetOpen(false)}
        title="Claim Staking Rewards"
        subtitle="Direct credit to your sovereign wallet balance"
      >
        <div className="space-y-4">
          <div className="p-4 surface-type-d space-y-1 text-center">
            <span className="mono-label text-[9px] uppercase">AVAILABLE REWARD</span>
            <span className="text-3xl font-black text-ron-green block mono-data">
              +{formatNumber(totalAccruedRewards, 4)} RON
            </span>
            <span className="text-xs text-ron-dim mono-data">
              {formatCurrency(totalAccruedRewards * metrics.ronPrice, 2)}
            </span>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={handleExecuteClaim}
            className="w-full text-xs h-12"
          >
            CLAIM TO LIQUID WALLET
          </Button>
        </div>
      </BottomSheet>
    </div>
  );
}
