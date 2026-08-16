"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ECOSYSTEM_PRODUCTS } from "@/lib/mock-data";
import { EcosystemProduct } from "@/lib/types";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Compass, ArrowUpRight, Search, Filter } from "lucide-react";

const CATEGORIES = ["ALL", "DeFi", "Infrastructure", "AI", "Governance", "Identity", "Interoperability"];

export default function EcosystemPage() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = ECOSYSTEM_PRODUCTS.filter((p) => {
    const matchCategory = selectedCategory === "ALL" || p.category === selectedCategory;
    const matchSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-ron-cyan uppercase tracking-widest px-3 py-1 rounded-full bg-ron-cyan/10 border border-ron-cyan/30">
          <Compass className="w-3.5 h-3.5" />
          <span>NATIVE LAYER-1 APPLICATIONS</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          RON Sovereign Ecosystem
        </h1>
        <p className="text-xs sm:text-sm text-ron-muted leading-relaxed">
          Institutional DeFi primitives, zero-knowledge sovereign identity credentials, autonomous AI
          agents, and cross-chain state provers built on the RON core.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-ron-surface/80 border border-white/10 backdrop-blur-xl">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-colors ${
                selectedCategory === cat
                  ? "bg-ron-violet text-white font-bold shadow-[0_0_15px_rgba(117,92,255,0.4)]"
                  : "bg-white/5 text-ron-muted hover:text-white hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-ron-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-black/50 border border-white/10 text-xs font-mono text-white placeholder-ron-muted focus:outline-none focus:border-ron-cyan"
          />
        </div>
      </div>

      {/* Ecosystem Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((prod) => (
          <div
            key={prod.id}
            className="p-6 rounded-2xl bg-ron-surface/70 border border-white/10 hover:border-ron-violet/40 transition-all duration-200 backdrop-blur-xl shadow-xl flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-ron-cyan font-bold uppercase tracking-wider">
                  {prod.category}
                </span>
                <StatusBadge status={prod.status} size="sm" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-ron-cyan transition-colors">
                  {prod.name}
                </h3>
                <p className="text-xs text-ron-dim font-mono mt-0.5">{prod.tagline}</p>
              </div>

              <p className="text-xs text-ron-muted leading-relaxed">{prod.description}</p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/5 space-y-3">
              <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 font-mono text-[11px] text-ron-green">
                {prod.metrics}
              </div>

              <Link href={prod.route} className="block">
                <Button
                  variant="secondary"
                  className="w-full text-xs font-mono group-hover:border-ron-violet/40"
                  rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
                >
                  LAUNCH {prod.name.toUpperCase()}
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
