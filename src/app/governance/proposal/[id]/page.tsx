"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRonStore } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Vote, Clock, CheckCircle2 } from "lucide-react";

export default function ProposalDetailPage() {
  const params = useParams();
  const idStr = Array.isArray(params.id) ? params.id[0] : params.id;
  const propId = idStr || "RIP-024";

  const { proposals, castVote, isConnected, setWalletModalOpen } = useRonStore();
  const [isVoting, setIsVoting] = useState(false);

  const proposal =
    proposals.find((p) => p.id === propId) || proposals[0];

  const handleVote = async (choice: "YES" | "NO" | "ABSTAIN") => {
    if (!isConnected) {
      setWalletModalOpen(true);
      return;
    }
    setIsVoting(true);
    await castVote(proposal.id, choice);
    setIsVoting(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-mono text-xs">
      {/* Back button & Title */}
      <div className="space-y-4">
        <Link
          href="/governance"
          className="inline-flex items-center gap-2 text-ron-muted hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO PROPOSALS</span>
        </Link>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-[2px] bg-ron-violet/20 border border-ron-violet/40 text-ron-cyan font-bold text-[11px]">
              {proposal.id}
            </span>
            <span className="text-ron-muted">{proposal.category} Category</span>
          </div>
          <span className="text-ron-green flex items-center gap-1.5 font-bold text-[11px]">
            <Clock className="w-3.5 h-3.5" />
            CLOSES IN: {proposal.closesIn}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white font-sans">
          {proposal.title}
        </h1>

        <div className="text-ron-dim text-[11px] pb-4 border-b border-white/[0.08]">
          Authored by <strong className="text-ron-muted">{proposal.author}</strong> on{" "}
          {proposal.createdDate}
        </div>
      </div>

      {/* Voting Station Box (Surface Type C) */}
      <div className="surface-type-c tech-corner-tl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
          <span className="font-bold text-white uppercase tracking-wider flex items-center gap-2 text-[11px]">
            <Vote className="w-3.5 h-3.5 text-ron-green" />
            <span>ON-CHAIN BALLOT TALLY</span>
          </span>
          <span className="text-ron-green font-bold text-[10px]">QUORUM: {proposal.quorumPercent}% REACHED</span>
        </div>

        {/* Voting Bars */}
        <div className="space-y-2.5">
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-ron-green font-bold text-[11px]">YES ({proposal.votes.yes}%)</span>
              <span className="text-ron-dim text-[11px] mono-data">
                {((proposal.votes.yes / 100) * 12840000).toLocaleString()} vRON
              </span>
            </div>
            <div className="w-full h-1.5 bg-black/80 rounded-full overflow-hidden">
              <div
                className="h-full bg-ron-green rounded-full transition-all duration-500"
                style={{ width: `${proposal.votes.yes}%` }}
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-ron-red font-bold text-[11px]">NO ({proposal.votes.no}%)</span>
              <span className="text-ron-dim text-[11px] mono-data">
                {((proposal.votes.no / 100) * 12840000).toLocaleString()} vRON
              </span>
            </div>
            <div className="w-full h-1.5 bg-black/80 rounded-full overflow-hidden">
              <div
                className="h-full bg-ron-red rounded-full transition-all duration-500"
                style={{ width: `${proposal.votes.no}%` }}
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-ron-muted font-bold text-[11px]">ABSTAIN ({proposal.votes.abstain}%)</span>
              <span className="text-ron-dim text-[11px] mono-data">
                {((proposal.votes.abstain / 100) * 12840000).toLocaleString()} vRON
              </span>
            </div>
            <div className="w-full h-1.5 bg-black/80 rounded-full overflow-hidden">
              <div
                className="h-full bg-white/20 rounded-full transition-all duration-500"
                style={{ width: `${proposal.votes.abstain}%` }}
              />
            </div>
          </div>
        </div>

        {/* Cast Vote Buttons */}
        <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
          {proposal.userVoted ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-[3px] bg-ron-green/[0.08] border border-ron-green/30 text-ron-green font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>RECORDED ON-CHAIN: {proposal.userVoted}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <Button
                variant="primary"
                onClick={() => handleVote("YES")}
                isLoading={isVoting}
                className="text-xs flex-1 sm:flex-initial"
              >
                VOTE YES
              </Button>
              <Button
                variant="danger"
                onClick={() => handleVote("NO")}
                isLoading={isVoting}
                className="text-xs flex-1 sm:flex-initial"
              >
                VOTE NO
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleVote("ABSTAIN")}
                isLoading={isVoting}
                className="text-xs flex-1 sm:flex-initial"
              >
                ABSTAIN
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Full Proposal Specification Body */}
      <div className="surface-type-b p-6 sm:p-8 space-y-4 font-sans text-xs sm:text-sm text-ron-text leading-relaxed">
        <h3 className="font-mono font-bold text-xs text-white uppercase tracking-wider pb-3 border-b border-white/[0.08]">
          Technical Specification & Impact
        </h3>
        <div className="whitespace-pre-line text-ron-muted font-mono text-xs leading-relaxed">
          {proposal.body}
        </div>
      </div>
    </div>
  );
}
