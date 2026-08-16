"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRonStore } from "@/lib/store";
import { formatNumber, formatAddress } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  Vote,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  MinusCircle,
  Clock,
  ShieldCheck,
  Check,
  ExternalLink,
} from "lucide-react";

export default function ProposalDetailPage() {
  const params = useParams();
  const idParam = Array.isArray(params.id) ? params.id[0] : params.id;
  const proposalId = idParam || "RIP-024";

  const {
    proposals,
    castVote,
    ronBalance,
    stakedBalance,
    txStage,
    activeTxReceipt,
    resetTxStage,
  } = useRonStore();

  const [voteChoice, setVoteChoice] = useState<"YES" | "NO" | "ABSTAIN">("YES");
  const [voteSheetOpen, setVoteSheetOpen] = useState(false);
  const [voteError, setVoteError] = useState<string | null>(null);

  const proposal =
    proposals.find((p) => p.id === proposalId) || proposals[0];

  const totalVotingPower = ronBalance + stakedBalance * 1.5;

  const handleExecuteVote = async () => {
    setVoteError(null);
    const res = await castVote(proposal.id, voteChoice);
    if (!res.success) {
      setVoteError("Voting failed. Please verify your connection.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 font-mono text-xs pb-24 sm:pb-12">
      {/* Back to Governance */}
      <div>
        <Link
          href="/governance"
          className="inline-flex items-center gap-2 text-ron-muted hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO GOVERNANCE</span>
        </Link>
      </div>

      {/* Main Proposal Card (Surface Type C) */}
      <div className="surface-type-c tech-corner-tl tech-corner-br p-5 sm:p-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="mono-label text-ron-cyan font-bold text-[10px]">
                {proposal.id}
              </span>
              <span className="text-[10px] text-ron-dim">• {proposal.category}</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-black text-white font-sans tracking-tight">
              {proposal.title}
            </h1>
          </div>

          <StatusBadge status={proposal.status} size="md" />
        </div>

        {/* Voting Progress Strip */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-ron-green font-bold">YES: {proposal.votes.yes}%</span>
            <span className="text-ron-red font-bold">NO: {proposal.votes.no}%</span>
            <span className="text-ron-dim">ABSTAIN: {proposal.votes.abstain}%</span>
          </div>

          <div className="h-2 rounded-full bg-white/10 overflow-hidden flex">
            <div
              style={{ width: `${proposal.votes.yes}%` }}
              className="h-full bg-ron-green"
            />
            <div
              style={{ width: `${proposal.votes.no}%` }}
              className="h-full bg-ron-red"
            />
            <div
              style={{ width: `${proposal.votes.abstain}%` }}
              className="h-full bg-ron-dim"
            />
          </div>

          <div className="flex justify-between text-[10px] text-ron-dim pt-1">
            <span>QUORUM: {proposal.quorumPercent}% MET</span>
            <span>TOTAL BALLOTS: {proposal.totalVotesCount || 1420}</span>
          </div>
        </div>

        {/* Proposal Body */}
        <div className="p-4 surface-type-a space-y-2">
          <span className="mono-label text-[9px] uppercase block text-ron-cyan">
            SPECIFICATION ABSTRACT
          </span>
          <p className="text-ron-text font-sans text-xs sm:text-sm leading-relaxed">
            {proposal.body || proposal.summary}
          </p>
        </div>

        {/* User Vote Status or Voting CTA */}
        <div className="pt-2">
          {proposal.userVoted ? (
            <div className="p-3.5 surface-type-d flex items-center justify-between">
              <div className="flex items-center gap-2 text-ron-green font-bold">
                <Check className="w-4 h-4" />
                <span>YOU VOTED {proposal.userVoted} ON THIS PROPOSAL</span>
              </div>
              <span className="text-ron-dim text-[10px]">ON-CHAIN SEALED</span>
            </div>
          ) : (
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                resetTxStage();
                setVoteSheetOpen(true);
              }}
              className="w-full text-xs h-12"
            >
              CAST ON-CHAIN VOTE
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Vote Bottom Sheet */}
      <BottomSheet
        isOpen={voteSheetOpen}
        onClose={() => setVoteSheetOpen(false)}
        title={`Vote on ${proposal.id}`}
        subtitle={`Your Sovereign Voting Power: ${formatNumber(totalVotingPower, 0)} vRON`}
      >
        <div className="space-y-4">
          {txStage === "CONFIRMED" && activeTxReceipt ? (
            <div className="p-5 surface-type-d space-y-3 text-left">
              <div className="flex items-center gap-2 text-ron-green font-bold text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>BALLOT SEALED ON-CHAIN</span>
              </div>
              <div className="space-y-1 text-ron-muted text-[11px]">
                <div className="flex justify-between">
                  <span>BALLOT CHOICE:</span>
                  <span className="text-white font-bold">{voteChoice}</span>
                </div>
                <div className="flex justify-between">
                  <span>VOTING WEIGHT:</span>
                  <span className="text-ron-cyan font-bold mono-data">{formatNumber(totalVotingPower, 0)} vRON</span>
                </div>
                <div className="flex justify-between">
                  <span>TX HASH:</span>
                  <span className="text-white mono-data">{formatAddress(activeTxReceipt.txHash, 8, 6)}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  resetTxStage();
                  setVoteSheetOpen(false);
                }}
                className="w-full text-xs"
              >
                DONE
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* 3 Large Touch Targets */}
              <div className="space-y-2">
                {[
                  { key: "YES", label: "VOTE YES", color: "border-ron-green text-ron-green bg-ron-green/10" },
                  { key: "NO", label: "VOTE NO", color: "border-ron-red text-ron-red bg-ron-red/10" },
                  { key: "ABSTAIN", label: "ABSTAIN", color: "border-ron-dim text-white bg-white/5" },
                ].map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setVoteChoice(opt.key as any)}
                    className={`w-full p-4 rounded-[6px] border text-left font-bold text-xs flex items-center justify-between transition-all active:scale-98 ${
                      voteChoice === opt.key ? `${opt.color} shadow-lg ring-1 ring-white/20` : "surface-type-a text-ron-muted"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {voteChoice === opt.key && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </div>

              {voteError && (
                <p className="text-ron-red text-[11px] font-bold">{voteError}</p>
              )}

              <Button
                variant="primary"
                size="lg"
                onClick={handleExecuteVote}
                isLoading={txStage !== "IDLE" && txStage !== "CONFIRMED"}
                className="w-full text-xs font-mono h-12"
              >
                {txStage === "PREPARING" && "PREPARING BALLOT..."}
                {txStage === "SIGNATURE" && "SIGNING WITH CRYPTOGRAPHIC KEY..."}
                {txStage === "BROADCASTING" && "RECORDING ON-CHAIN..."}
                {txStage === "VALIDATING" && "CONFIRMING WITH 184 HUBS..."}
                {txStage === "IDLE" && `SUBMIT ${voteChoice} BALLOT`}
              </Button>
            </div>
          )}
        </div>
      </BottomSheet>
    </div>
  );
}
