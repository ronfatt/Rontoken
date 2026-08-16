"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRonStore } from "@/lib/store";
import { formatNumber, formatCurrency } from "@/lib/utils";
import { Button } from "../ui/Button";
import { ShieldCheck, TrendingUp, ArrowRight } from "lucide-react";

const DURATION_TIERS = [
  { days: 30, apy: 7.4, multiplier: 1.0 },
  { days: 90, apy: 10.2, multiplier: 1.1 },
  { days: 180, apy: 14.6, multiplier: 1.25 },
  { days: 365, apy: 18.42, multiplier: 1.5 },
];

export const Scene08StakeSimulation: React.FC = () => {
  const {
    ronBalance,
    validators,
    stakeRon,
    txStage,
    metrics,
  } = useRonStore();

  const [stakeAmount, setStakeAmount] = useState<string>("1000");
  const [selectedDuration, setSelectedDuration] = useState<number>(365);
  const [selectedValidator, setSelectedValidator] = useState<string>(validators[0]?.id || "val-01");
  const [isSuccess, setIsSuccess] = useState(false);

  const numericAmount = parseFloat(stakeAmount) || 0;
  const activeTier = DURATION_TIERS.find((t) => t.days === selectedDuration) || DURATION_TIERS[3];

  const estimatedRewardYearly = (numericAmount * activeTier.apy) / 100;
  const estimatedRewardDuration = (estimatedRewardYearly * selectedDuration) / 365;
  const votingPower = numericAmount * activeTier.multiplier;

  const handleStake = async () => {
    setIsSuccess(false);
    await stakeRon(numericAmount, selectedValidator, selectedDuration);
    setIsSuccess(true);
  };

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/[0.04]">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="mono-label block tracking-[0.2em] text-ron-cyan">
            07 // VALIDATOR DELEGATION & CONSENSUS YIELD
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Stake RON Simulator
          </h2>
          <p className="text-xs sm:text-sm text-ron-muted max-w-lg mx-auto font-sans">
            Delegate directly to tier-1 global validator nodes. Secure consensus and earn up to 18.42% APY.
          </p>
        </div>

        {/* Staking Simulation Terminal (Asymmetric 7/5 Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Input & Duration Selector (7 cols) */}
          <div className="lg:col-span-7 surface-type-b tech-corner-tl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between font-mono text-xs text-ron-muted pb-3 border-b border-white/[0.08]">
              <span className="mono-label text-[10px]">AVAILABLE BALANCE</span>
              <span className="text-white font-bold mono-data">{formatNumber(ronBalance, 2)} RON</span>
            </div>

            {/* Stake Amount Input */}
            <div className="space-y-1.5">
              <label className="mono-label text-[10px]">AMOUNT TO DELEGATE</label>
              <div className="flex items-center gap-3 p-3.5 surface-type-a">
                <input
                  type="number"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  className="w-full bg-transparent text-xl font-bold font-mono text-white focus:outline-none mono-data"
                  placeholder="1000"
                />
                <button
                  onClick={() => setStakeAmount(ronBalance.toString())}
                  className="font-mono text-[10px] px-2 py-0.5 rounded-[2px] bg-white/10 hover:bg-white/20 text-ron-cyan font-bold"
                >
                  MAX
                </button>
              </div>
            </div>

            {/* Duration Selector */}
            <div className="space-y-1.5">
              <label className="mono-label text-[10px]">LOCK PERIOD & EMISSION MULTIPLIER</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {DURATION_TIERS.map((tier) => {
                  const isSelected = selectedDuration === tier.days;
                  return (
                    <button
                      key={tier.days}
                      onClick={() => setSelectedDuration(tier.days)}
                      className={`p-2.5 rounded-[4px] border text-center font-mono transition-all ${
                        isSelected
                          ? "bg-ron-violet/20 border-ron-violet text-white shadow-[0_0_12px_rgba(117,92,255,0.25)]"
                          : "bg-white/[0.02] border-white/[0.06] text-ron-muted hover:text-white"
                      }`}
                    >
                      <span className="text-[10px] block font-bold">{tier.days}D</span>
                      <span className="text-xs block font-bold text-ron-cyan mt-0.5 mono-data">
                        {tier.apy}%
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Validator Selector */}
            <div className="space-y-1.5">
              <label className="mono-label text-[10px]">ASSIGNED VALIDATOR CLUSTER</label>
              <select
                value={selectedValidator}
                onChange={(e) => setSelectedValidator(e.target.value)}
                className="w-full p-3 rounded-[4px] bg-black/60 border border-white/10 text-xs font-mono text-white focus:outline-none"
              >
                {validators.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} ({v.location}) — {v.uptime}% Uptime
                  </option>
                ))}
              </select>
            </div>

            {/* Action Button */}
            <Button
              variant="primary"
              size="lg"
              onClick={handleStake}
              isLoading={txStage !== "IDLE" && txStage !== "CONFIRMED"}
              className="w-full text-xs font-mono"
            >
              {txStage === "PREPARING" && "APPROVAL REQUESTED..."}
              {txStage === "SIGNATURE" && "SIGNATURE RECEIVED..."}
              {txStage === "BROADCASTING" && "VALIDATOR ASSIGNED..."}
              {txStage === "VALIDATING" && "STAKE CONFIRMED..."}
              {txStage === "CONFIRMED" && isSuccess && "STAKE SUCCESSFUL"}
              {txStage === "IDLE" && `DELEGATE ${numericAmount.toLocaleString()} RON`}
            </Button>
          </div>

          {/* Reward & Telemetry Projection Card (5 cols) */}
          <div className="lg:col-span-5 surface-type-b tech-corner-br p-6 sm:p-8 space-y-6 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <span className="text-white font-bold uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
                <TrendingUp className="w-3.5 h-3.5 text-ron-green" />
                <span>PROJECTED RETURN</span>
              </span>
              <span className="text-ron-cyan font-bold mono-data">{activeTier.apy}% APY</span>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 surface-type-a space-y-1">
                <span className="mono-label text-[9px] uppercase">ESTIMATED YIELD ({selectedDuration} DAYS)</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-ron-green mono-data">
                    +{formatNumber(estimatedRewardDuration, 2)} RON
                  </span>
                  <span className="text-[11px] text-ron-muted mono-data">
                    ({formatCurrency(estimatedRewardDuration * metrics.ronPrice, 2)})
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-ron-muted text-[11px] pt-1">
                <div className="flex justify-between">
                  <span className="mono-label text-[9px]">VOTING MULTIPLIER</span>
                  <span className="text-white font-bold mono-data">{activeTier.multiplier}x</span>
                </div>
                <div className="flex justify-between">
                  <span className="mono-label text-[9px]">DAO VOTING WEIGHT</span>
                  <span className="text-ron-cyan font-bold mono-data">{formatNumber(votingPower, 0)} vRON</span>
                </div>
                <div className="flex justify-between">
                  <span className="mono-label text-[9px]">SLASHING PROTECTION</span>
                  <span className="text-ron-green font-bold">INSURED 100%</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.08] text-center">
              <Link
                href="/stake"
                className="inline-flex items-center gap-1.5 text-ron-cyan hover:text-white transition-colors uppercase tracking-wider text-[11px]"
              >
                <span>OPEN FULL STAKING & VALIDATOR DASHBOARD</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
