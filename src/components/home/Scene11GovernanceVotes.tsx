"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRonStore } from "@/lib/store";
import { Button } from "../ui/Button";
import { Vote, CheckCircle2, Clock, ArrowRight } from "lucide-react";

export const Scene11GovernanceVotes: React.FC = () => {
  const { proposals, castVote, isConnected, setWalletModalOpen } = useRonStore();
  const [votingOnId, setVotingOnId] = useState<string | null>(null);

  const activeProposal = proposals[0];

  const handleVote = async (choice: "YES" | "NO" | "ABSTAIN") => {
    if (!isConnected) {
      setWalletModalOpen(true);
      return;
    }
    setVotingOnId(activeProposal.id);
    await castVote(activeProposal.id, choice);
    setVotingOnId(null);
  };

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="mono-label block tracking-[0.2em] text-ron-cyan">
              10 // DECENTRALIZED PROTOCOL STEERING
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              RON DAO Governance
            </h2>
            <p className="text-xs sm:text-sm text-ron-muted max-w-lg font-sans">
              Token holders and validator delegates directly control economic parameters, treasury allocations, and network upgrades.
            </p>
          </div>

          <Link href="/governance">
            <Button
              variant="secondary"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              className="text-xs"
            >
              VIEW ALL PROPOSALS
            </Button>
          </Link>
        </div>

        {/* Featured Live Proposal Voting Card (Surface Type C) */}
        <div className="surface-type-c tech-corner-tl tech-corner-br p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-[2px] bg-ron-violet/20 border border-ron-violet/40 text-ron-cyan font-bold text-[11px]">
                {activeProposal.id}
              </span>
              <span className="text-ron-muted">{activeProposal.category} Category</span>
            </div>
            <span className="text-ron-green flex items-center gap-1.5 font-bold text-[11px]">
              <Clock className="w-3.5 h-3.5" />
              CLOSES IN: {activeProposal.closesIn}
            </span>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-sans">
              {activeProposal.title}
            </h3>
            <p className="text-xs sm:text-sm text-ron-muted leading-relaxed font-sans">
              {activeProposal.summary}
            </p>
          </div>

          {/* Dynamic Voting Progress Bars */}
          <div className="space-y-2.5 font-mono text-xs pt-2">
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-ron-green font-bold text-[11px]">YES ({activeProposal.votes.yes}%)</span>
                <span className="text-ron-dim text-[11px] mono-data">
                  {((activeProposal.votes.yes / 100) * 12840000).toLocaleString()} vRON
                </span>
              </div>
              <div className="w-full h-1.5 bg-black/80 rounded-full overflow-hidden">
                <div
                  className="h-full bg-ron-green rounded-full transition-all duration-500"
                  style={{ width: `${activeProposal.votes.yes}%` }}
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-ron-red font-bold text-[11px]">NO ({activeProposal.votes.no}%)</span>
                <span className="text-ron-dim text-[11px] mono-data">
                  {((activeProposal.votes.no / 100) * 12840000).toLocaleString()} vRON
                </span>
              </div>
              <div className="w-full h-1.5 bg-black/80 rounded-full overflow-hidden">
                <div
                  className="h-full bg-ron-red rounded-full transition-all duration-500"
                  style={{ width: `${activeProposal.votes.no}%` }}
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-ron-muted font-bold text-[11px]">ABSTAIN ({activeProposal.votes.abstain}%)</span>
                <span className="text-ron-dim text-[11px] mono-data">
                  {((activeProposal.votes.abstain / 100) * 12840000).toLocaleString()} vRON
                </span>
              </div>
              <div className="w-full h-1.5 bg-black/80 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white/20 rounded-full transition-all duration-500"
                  style={{ width: `${activeProposal.votes.abstain}%` }}
                />
              </div>
            </div>
          </div>

          {/* Voting Action Section */}
          <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-mono text-[11px] text-ron-dim">
              <span>QUORUM: {activeProposal.quorumPercent}% (MET)</span>
            </div>

            {activeProposal.userVoted ? (
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-[4px] bg-ron-green/[0.08] border border-ron-green/30 font-mono text-xs text-ron-green font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>VOTE RECORDED: {activeProposal.userVoted}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleVote("YES")}
                  isLoading={votingOnId === activeProposal.id}
                  className="text-xs"
                >
                  VOTE YES
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleVote("NO")}
                  isLoading={votingOnId === activeProposal.id}
                  className="text-xs"
                >
                  VOTE NO
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleVote("ABSTAIN")}
                  isLoading={votingOnId === activeProposal.id}
                  className="text-xs"
                >
                  ABSTAIN
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Other Active Proposals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          {proposals.slice(1).map((p) => (
            <Link
              key={p.id}
              href={`/governance/proposal/${p.id}`}
              className="p-5 surface-type-b hover:border-ron-violet/50 transition-all group"
            >
              <div className="flex justify-between items-center text-[10px] text-ron-muted mb-2">
                <span className="text-ron-cyan font-bold">{p.id}</span>
                <span className="text-ron-dim">{p.closesIn}</span>
              </div>
              <h4 className="font-bold text-white text-xs group-hover:text-ron-cyan transition-colors mb-2 line-clamp-2 font-sans">
                {p.title}
              </h4>
              <div className="flex items-center justify-between text-[11px] text-ron-green pt-2 border-t border-white/[0.06]">
                <span>YES: {p.votes.yes}%</span>
                <span className="text-ron-dim">QUORUM: {p.quorumPercent}%</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
