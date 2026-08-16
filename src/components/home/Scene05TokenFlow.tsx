"use client";

import React, { useState } from "react";
import { TOKEN_ALLOCATIONS } from "@/lib/mock-data";
import { formatCompactNumber } from "@/lib/utils";
import { useRonStore } from "@/lib/store";
import { Flame, ArrowRight } from "lucide-react";
import Link from "next/link";

export const Scene05TokenFlow: React.FC = () => {
  const { metrics } = useRonStore();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const activeAllocation =
    TOKEN_ALLOCATIONS.find((a) => a.id === hoveredId) || TOKEN_ALLOCATIONS[0];

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="mono-label block tracking-[0.2em] text-ron-violet">
            04 // DYNAMIC SUPPLY MECHANICS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Token Flow Engine
          </h2>
          <p className="text-xs sm:text-sm text-ron-muted max-w-xl mx-auto font-sans">
            1,000,000,000 Fixed Genesis Supply. Non-inflationary utility architecture with algorithmic
            burn mechanics.
          </p>
        </div>

        {/* Live Token Distribution Engine (Surface Type B) */}
        <div className="p-6 sm:p-10 surface-type-b tech-corner-tl tech-corner-br shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Center Genesis Core (4 cols) */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-8 surface-type-d text-center font-mono relative overflow-hidden">
              <span className="mono-label text-[10px] tracking-widest text-ron-cyan">
                GENESIS FIXED SUPPLY
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-2 mono-data">
                1,000,000,000
              </h3>
              <span className="text-xs font-bold text-ron-violet tracking-widest mt-1">
                RON TOKEN
              </span>

              <div className="w-full mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-ron-muted">
                <span className="flex items-center gap-1 text-ron-red font-semibold">
                  <Flame className="w-3.5 h-3.5" />
                  Burned: {formatCompactNumber(metrics.burnedRon)}
                </span>
                <span className="text-ron-green font-semibold">
                  Circ: {formatCompactNumber(metrics.circulatingSupply)}
                </span>
              </div>
            </div>

            {/* Interactive Allocation Flow Streams (8 cols) */}
            <div className="lg:col-span-8 space-y-2.5">
              {TOKEN_ALLOCATIONS.map((alloc) => {
                const isHovered = hoveredId === alloc.id;
                const isDimmed = hoveredId !== null && !isHovered;

                return (
                  <div
                    key={alloc.id}
                    onMouseEnter={() => setHoveredId(alloc.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className={`p-3.5 rounded-[4px] border transition-all duration-200 cursor-pointer ${
                      isHovered
                        ? "bg-black/90 border-ron-cyan shadow-[0_0_15px_rgba(0,223,247,0.15)]"
                        : isDimmed
                        ? "opacity-30 bg-black/20 border-white/[0.03]"
                        : "bg-white/[0.02] border-white/[0.06] hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-xs">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-2.5 h-2.5 rounded-[2px] shrink-0"
                          style={{ backgroundColor: alloc.color }}
                        />
                        <span className="font-bold text-white text-[11px]">{alloc.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-ron-dim text-[11px]">{alloc.vestingPeriod}</span>
                        <span
                          className="font-bold text-xs mono-data"
                          style={{ color: alloc.color }}
                        >
                          {alloc.percentage}%
                        </span>
                      </div>
                    </div>

                    {/* Progress Fill Bar */}
                    <div className="w-full h-1 bg-black/80 rounded-full mt-2.5 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${alloc.percentage}%`,
                          backgroundColor: alloc.color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dynamic Inspector Detail Card */}
          <div className="mt-8 pt-6 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-3 surface-type-a">
              <span className="mono-label text-[9px] block">SELECTED POOL</span>
              <span className="text-white font-bold mt-0.5 block">{activeAllocation.name}</span>
            </div>

            <div className="p-3 surface-type-a">
              <span className="mono-label text-[9px] block">TOTAL ALLOCATION</span>
              <span className="text-ron-cyan font-bold mt-0.5 block mono-data">
                {formatCompactNumber(activeAllocation.amount)} RON
              </span>
            </div>

            <div className="p-3 surface-type-a">
              <span className="mono-label text-[9px] block">RELEASED</span>
              <span className="text-ron-green font-bold mt-0.5 block mono-data">
                {formatCompactNumber(activeAllocation.released)} RON
              </span>
            </div>

            <div className="p-3 surface-type-a">
              <span className="mono-label text-[9px] block">LOCKED IN VESTING</span>
              <span className="text-ron-amber font-bold mt-0.5 block mono-data">
                {formatCompactNumber(activeAllocation.locked)} RON
              </span>
            </div>
          </div>

          {/* Deep Token Page Link */}
          <div className="mt-6 text-center">
            <Link
              href="/token"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-ron-cyan hover:text-white transition-colors uppercase tracking-wider"
            >
              <span>INSPECT COMPLETE VESTING CURVES & EMISSIONS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
