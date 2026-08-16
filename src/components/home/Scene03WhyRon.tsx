"use client";

import React from "react";
import { ArrowUpRight, Zap, Code2, Users2 } from "lucide-react";
import Link from "next/link";

const PILLARS = [
  {
    step: "01",
    name: "MOVE",
    title: "Instant Global Settlement",
    description: "Decentralized value transfer finalized in 0.42 seconds at $0.0004 average fee without intermediary gatekeepers.",
    tag: "SUB-SECOND FINALITY",
    link: "/swap",
    icon: Zap,
  },
  {
    step: "02",
    name: "BUILD",
    title: "Programmable Infrastructure",
    description: "High-throughput smart contract environment with zero-knowledge state provers, native AI agents, and modular APIs.",
    tag: "TURING-COMPLETE",
    link: "/developers",
    icon: Code2,
  },
  {
    step: "03",
    name: "OWN",
    title: "Sovereign Participation",
    description: "Direct on-chain governance, liquid staking delegation up to 18.42% APY, and transparent treasury asset steering.",
    tag: "DECENTRALIZED DAO",
    link: "/governance",
    icon: Users2,
  },
];

export const Scene03WhyRon: React.FC = () => {
  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Typographic Core Hook */}
        <div className="space-y-4 text-center">
          <span className="mono-label block tracking-[0.2em] text-ron-violet">
            02 // THE PARADIGM SHIFT
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight">
            RON IS NOT A TOKEN. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-ron-text to-ron-cyan">
              IT IS AN ECONOMY.
            </span>
          </h2>
        </div>

        {/* 3 Pillars Grid (Surface Type B with Technical Corners) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.name}
                className="group relative p-8 surface-type-b tech-corner-tl hover:border-ron-violet/50 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-xs text-ron-cyan tracking-widest font-bold">
                      {p.step} // {p.name}
                    </span>
                    <span className="p-2 rounded-[4px] bg-white/[0.04] text-ron-muted group-hover:text-white group-hover:bg-ron-violet/20 transition-colors">
                      <Icon className="w-4 h-4" />
                    </span>
                  </div>

                  <span className="inline-block font-mono text-[9px] uppercase tracking-widest text-ron-green mb-3 px-2 py-0.5 rounded-[2px] bg-ron-green/[0.08] border border-ron-green/20">
                    {p.tag}
                  </span>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-ron-cyan transition-colors">
                    {p.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-ron-muted leading-relaxed font-sans">
                    {p.description}
                  </p>
                </div>

                <div className="pt-8 mt-6 border-t border-white/[0.06] flex items-center justify-between">
                  <Link
                    href={p.link}
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-ron-text hover:text-ron-cyan transition-colors"
                  >
                    <span>EXPLORE {p.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
