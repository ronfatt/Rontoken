"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRonStore } from "@/lib/store";
import { formatCompactNumber } from "@/lib/utils";
import { Vote, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

const CATEGORIES = ["ALL", "Network", "Economics", "Development", "Grants", "Security", "Ecosystem"];

export default function GovernancePage() {
  const { proposals } = useRonStore();
  const [selectedCat, setSelectedCat] = useState("ALL");

  const filtered = proposals.filter(
    (p) => selectedCat === "ALL" || p.category === selectedCat
  );

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 font-mono text-xs">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto font-sans">
        <span className="mono-label block tracking-[0.2em] text-ron-green">
          ON-CHAIN PROTOCOL STEERING
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          RON DAO Governance
        </h1>
        <p className="text-xs sm:text-sm text-ron-muted leading-relaxed font-mono">
          Protocol parameter updates, developer grant disbursements, and validator curation governed directly by token holders.
        </p>
      </div>

      {/* DAO Metrics Grid (Surface Type A) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 surface-type-a space-y-1">
          <span className="mono-label text-[9px] uppercase">TOTAL VOTING POWER</span>
          <span className="text-2xl font-bold text-white block mono-data">
            {formatCompactNumber(642000000)} vRON
          </span>
          <span className="text-[10px] text-ron-cyan">Time-weighted weight</span>
        </div>

        <div className="p-4 surface-type-a space-y-1">
          <span className="mono-label text-[9px] uppercase">ACTIVE PROPOSALS</span>
          <span className="text-2xl font-bold text-ron-green block mono-data">{proposals.length} RIPS</span>
          <span className="text-[10px] text-ron-green">Voting open now</span>
        </div>

        <div className="p-4 surface-type-a space-y-1">
          <span className="mono-label text-[9px] uppercase">TURNOUT RATE</span>
          <span className="text-2xl font-bold text-ron-violet block mono-data">88.4%</span>
          <span className="text-[10px] text-ron-muted">Meets quorum</span>
        </div>

        <div className="p-4 surface-type-a space-y-1">
          <span className="mono-label text-[9px] uppercase">TREASURY RESERVE</span>
          <span className="text-2xl font-bold text-ron-amber block mono-data">$142.5M</span>
          <span className="text-[10px] text-ron-amber">50,000,000 RON</span>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-[4px] bg-black/60 border border-white/[0.08]">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-3 py-1.5 rounded-[3px] text-xs transition-colors ${
              selectedCat === cat
                ? "bg-ron-violet text-white font-bold"
                : "text-ron-muted hover:text-white hover:bg-white/5"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Proposals List (Surface Type B with Tech Corners) */}
      <div className="space-y-4">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="surface-type-b tech-corner-tl p-6 sm:p-8 hover:border-ron-violet/50 transition-all space-y-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-[2px] bg-ron-violet/20 border border-ron-violet/40 text-ron-cyan font-bold text-[11px]">
                  {p.id}
                </span>
                <span className="text-ron-muted">{p.category}</span>
                <span className="text-ron-dim">•</span>
                <span className="text-ron-dim">By {p.author}</span>
              </div>
              <span className="text-ron-green flex items-center gap-1.5 font-bold text-[11px]">
                <Clock className="w-3.5 h-3.5" />
                CLOSES IN: {p.closesIn}
              </span>
            </div>

            <div>
              <Link href={`/governance/proposal/${p.id}`}>
                <h3 className="text-xl font-bold text-white hover:text-ron-cyan transition-colors font-sans">
                  {p.title}
                </h3>
              </Link>
              <p className="text-xs sm:text-sm text-ron-muted mt-1.5 leading-relaxed font-sans">
                {p.summary}
              </p>
            </div>

            {/* Voting bar */}
            <div className="space-y-1.5 text-xs pt-1">
              <div className="flex justify-between">
                <span className="text-ron-green font-bold text-[11px]">YES: {p.votes.yes}%</span>
                <span className="text-ron-red font-bold text-[11px]">NO: {p.votes.no}%</span>
                <span className="text-ron-muted text-[11px]">ABSTAIN: {p.votes.abstain}%</span>
              </div>
              <div className="w-full h-1.5 bg-black/80 rounded-full overflow-hidden flex">
                <div style={{ width: `${p.votes.yes}%` }} className="h-full bg-ron-green" />
                <div style={{ width: `${p.votes.no}%` }} className="h-full bg-ron-red" />
                <div style={{ width: `${p.votes.abstain}%` }} className="h-full bg-white/20" />
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-xs">
              <span className="text-ron-dim">
                QUORUM: {p.quorumPercent}% MET • {p.discussionCount} COMMENTS
              </span>

              <Link href={`/governance/proposal/${p.id}`}>
                <Button
                  variant="primary"
                  size="sm"
                  className="text-xs"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  INSPECT & VOTE
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
