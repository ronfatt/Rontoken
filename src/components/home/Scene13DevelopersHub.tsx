"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SDK_CODE_SNIPPETS } from "@/lib/mock-data";
import { useRonStore } from "@/lib/store";
import { Button } from "../ui/Button";
import {
  Code2,
  Copy,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Cpu,
  Layers,
} from "lucide-react";

const SDK_MODULES = [
  { name: "WALLET", tag: "Keypairs & Multi-sig", icon: ShieldCheck },
  { name: "TOKEN", tag: "EIP-20 / Native Hooks", icon: Layers },
  { name: "PAYMENTS", tag: "Streaming Settlement", icon: Zap },
  { name: "CONTRACTS", tag: "EVM & WASM Engine", icon: Code2 },
  { name: "IDENTITY", tag: "ZK Sovereign Passports", icon: ShieldCheck },
  { name: "AI", tag: "Autonomous Mempool Agents", icon: Cpu },
];

export const Scene13DevelopersHub: React.FC = () => {
  const { setWalletModalOpen } = useRonStore();
  const [activeLang, setActiveLang] = useState("Typescript");
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyInstall = () => {
    navigator.clipboard.writeText("npm install @ron-network/sdk");
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(SDK_CODE_SNIPPETS[activeLang]);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto space-y-28">
        {/* Section 13: Developer SDK Hub */}
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <span className="mono-label block tracking-[0.2em] text-ron-violet">
              12 // HIGH-PERFORMANCE DEVELOPER PROTOCOL
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Build on RON
            </h2>
            <p className="text-xs sm:text-sm text-ron-muted max-w-lg mx-auto font-sans">
              Modular TypeScript, Python, Rust, and Go SDKs for seamless sub-second blockchain integration.
            </p>
          </div>

          {/* Quick Install Bar */}
          <div className="max-w-md mx-auto flex items-center justify-between p-3.5 rounded-[4px] bg-black/90 border border-ron-violet/40 shadow-[0_0_20px_rgba(117,92,255,0.15)] font-mono text-xs">
            <div className="flex items-center gap-2.5">
              <span className="text-ron-cyan font-bold">$</span>
              <span className="text-white font-bold">npm install @ron-network/sdk</span>
            </div>
            <button
              onClick={handleCopyInstall}
              className="flex items-center gap-1 text-[10px] text-ron-muted hover:text-white bg-white/[0.04] hover:bg-white/10 px-2 py-1 rounded-[2px] transition-colors"
            >
              {copiedInstall ? (
                <>
                  <CheckCircle2 className="w-3 h-3 text-ron-green" />
                  <span className="text-ron-green font-bold">COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>COPY</span>
                </>
              )}
            </button>
          </div>

          {/* Interactive Multi-Language Code Playground Box (Surface Type C) */}
          <div className="surface-type-c tech-corner-tl tech-corner-br overflow-hidden shadow-2xl">
            {/* Tab Bar */}
            <div className="px-4 py-3 bg-black/80 border-b border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                {Object.keys(SDK_CODE_SNIPPETS).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setActiveLang(lang)}
                    className={`px-3 py-1 rounded-[3px] text-xs font-mono transition-colors ${
                      activeLang === lang
                        ? "bg-ron-violet/20 text-ron-cyan border border-ron-violet/40 font-bold"
                        : "text-ron-muted hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1 text-[11px] font-mono text-ron-muted hover:text-white"
              >
                {copiedCode ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-ron-green" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedCode ? "COPIED" : "COPY"}</span>
              </button>
            </div>

            {/* Code Body */}
            <div className="p-6 overflow-x-auto bg-black/95 text-xs font-mono leading-relaxed text-ron-text">
              <pre className="text-[#a6accd]">
                <code>{SDK_CODE_SNIPPETS[activeLang]}</code>
              </pre>
            </div>

            {/* SDK Modules Strip */}
            <div className="p-3.5 bg-black/60 border-t border-white/[0.06] flex flex-wrap items-center justify-around gap-2 font-mono text-[10.5px] text-ron-muted">
              {SDK_MODULES.slice(0, 5).map((mod) => (
                <div key={mod.name} className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-ron-cyan" />
                  <span className="font-bold text-white">{mod.name}:</span>
                  <span className="text-ron-dim">{mod.tag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dev CTA Links */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/developers">
              <Button
                variant="primary"
                className="text-xs"
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                READ DOCUMENTATION
              </Button>
            </Link>
            <Link href="/developers">
              <Button
                variant="secondary"
                className="text-xs"
                leftIcon={<Code2 className="w-3.5 h-3.5 text-ron-cyan" />}
              >
                GENERATE API KEY
              </Button>
            </Link>
          </div>
        </div>

        {/* Final Scene: Cinematic Network Convergence Finale */}
        <div className="relative p-12 sm:p-20 surface-type-c tech-corner-tl tech-corner-br text-center space-y-8 shadow-[0_0_80px_rgba(117,92,255,0.12)] overflow-hidden">
          <div className="relative z-10 space-y-4">
            <span className="mono-label text-[10px] text-ron-green uppercase tracking-[0.25em] font-bold block">
              ALL SYSTEMS CONVERGED & SYNCHRONIZED
            </span>

            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight">
              THE NETWORK IS READY.
            </h2>

            <p className="font-mono text-sm sm:text-base uppercase tracking-[0.25em] text-ron-text font-bold">
              RON — The Programmable Economy
            </p>

            <p className="text-xs sm:text-sm text-ron-muted max-w-md mx-auto font-sans">
              Enter institutional-grade Web3 infrastructure engineered for the next era of global digital value.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              size="lg"
              variant="primary"
              onClick={() => setWalletModalOpen(true)}
              className="text-xs"
            >
              ENTER RON NETWORK
            </Button>
            <Link href="/explorer">
              <Button size="lg" variant="secondary" className="text-xs">
                EXPLORE BLOCKS
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
