"use client";

import React, { useState } from "react";
import { SDK_CODE_SNIPPETS } from "@/lib/mock-data";
import { Button } from "@/components/ui/Button";
import {
  Code2,
  Copy,
  CheckCircle2,
  Terminal,
  Key,
  ShieldCheck,
  Zap,
  Cpu,
  Layers,
  Sparkles,
} from "lucide-react";

export default function DevelopersPage() {
  const [activeLang, setActiveLang] = useState("Typescript");
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedInstall, setCopiedInstall] = useState(false);

  const handleGenerateKey = () => {
    const key = `ron_live_${Math.random().toString(36).substring(2, 15)}_${Math.random().toString(36).substring(2, 15)}`;
    setApiKey(key);
  };

  const handleCopyKey = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 font-mono text-xs">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto font-sans">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-ron-violet uppercase tracking-widest px-3 py-1 rounded-full bg-ron-violet/10 border border-ron-violet/30">
          <Code2 className="w-3.5 h-3.5 text-ron-cyan" />
          <span>DEVELOPER PROTOCOL ENGINE</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Build On RON
        </h1>
        <p className="text-xs sm:text-sm text-ron-muted leading-relaxed font-mono">
          Integrate sub-second Web3 payments, zero-knowledge sovereign identity credentials, and autonomous AI agents in minutes.
        </p>
      </div>

      {/* Quick Install Bar */}
      <div className="max-w-xl mx-auto flex items-center justify-between p-4 rounded-xl bg-black/80 border border-ron-violet/40 shadow-[0_0_25px_rgba(117,92,255,0.15)]">
        <div className="flex items-center gap-3">
          <span className="text-ron-cyan font-bold text-sm">$</span>
          <span className="text-white font-bold">npm install @ron-network/sdk</span>
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText("npm install @ron-network/sdk");
            setCopiedInstall(true);
            setTimeout(() => setCopiedInstall(false), 2000);
          }}
          className="flex items-center gap-1 text-[11px] text-ron-muted hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1 rounded transition-colors"
        >
          {copiedInstall ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-ron-green" />
              <span className="text-ron-green font-bold">COPIED</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>COPY</span>
            </>
          )}
        </button>
      </div>

      {/* Code Playground */}
      <div className="rounded-2xl bg-ron-surface/90 border border-white/10 overflow-hidden shadow-2xl backdrop-blur-2xl">
        <div className="px-6 py-3.5 bg-black/60 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {Object.keys(SDK_CODE_SNIPPETS).map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveLang(lang)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
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
            onClick={() => {
              navigator.clipboard.writeText(SDK_CODE_SNIPPETS[activeLang]);
              setCopiedCode(true);
              setTimeout(() => setCopiedCode(false), 2000);
            }}
            className="flex items-center gap-1.5 text-xs text-ron-muted hover:text-white"
          >
            {copiedCode ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-ron-green" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span>{copiedCode ? "COPIED" : "COPY CODE"}</span>
          </button>
        </div>

        <div className="p-6 overflow-x-auto bg-black/90 leading-relaxed text-[#a6accd]">
          <pre>
            <code>{SDK_CODE_SNIPPETS[activeLang]}</code>
          </pre>
        </div>
      </div>

      {/* API Key Generator Box */}
      <div className="p-8 rounded-2xl bg-ron-surface/80 border border-white/10 shadow-2xl backdrop-blur-xl space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-ron-cyan" />
            <h3 className="font-bold text-white uppercase tracking-wider text-sm font-sans">
              Live RPC Gateway & Instant API Key
            </h3>
          </div>
          <span className="text-ron-green font-bold">UNLIMITED TESTNET & MAINNET ACCESS</span>
        </div>

        <p className="text-ron-muted text-xs leading-relaxed">
          Generate an institutional-grade API key to access high-frequency Websocket streams, Mempool
          telemetry, and dedicated RPC endpoints.
        </p>

        {apiKey ? (
          <div className="p-4 rounded-xl bg-black/60 border border-ron-green/40 flex items-center justify-between gap-4">
            <span className="text-ron-green font-bold break-all text-xs">{apiKey}</span>
            <button
              onClick={handleCopyKey}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white shrink-0 flex items-center gap-1.5"
            >
              {copiedKey ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-ron-green" />
                  <span className="text-ron-green">COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>COPY</span>
                </>
              )}
            </button>
          </div>
        ) : (
          <Button
            variant="primary"
            onClick={handleGenerateKey}
            leftIcon={<Sparkles className="w-4 h-4" />}
            className="text-xs font-mono"
          >
            GENERATE FREE API KEY
          </Button>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/5 text-[11px] text-ron-muted">
          <div>
            <span className="text-ron-dim block uppercase">RPC ENDPOINT</span>
            <span className="text-white font-bold block mt-0.5">https://rpc.ron.network/v1</span>
          </div>
          <div>
            <span className="text-ron-dim block uppercase">WEBSOCKET FEED</span>
            <span className="text-white font-bold block mt-0.5">wss://ws.ron.network/live</span>
          </div>
          <div>
            <span className="text-ron-dim block uppercase">RATE LIMIT</span>
            <span className="text-ron-green font-bold block mt-0.5">10,000 Req / Sec</span>
          </div>
        </div>
      </div>
    </div>
  );
}
