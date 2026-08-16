"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRonStore } from "@/lib/store";
import { DEMO_TOKENS } from "@/lib/mock-data";
import { formatCurrency, formatNumber, formatAddress } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import {
  ArrowDownUp,
  CheckCircle2,
  Copy,
  ExternalLink,
  Zap,
} from "lucide-react";

export default function SwapPage() {
  const { metrics, executeTransaction, resetTxStage, txStage, activeTxReceipt } =
    useRonStore();

  const [fromTokenSymbol, setFromTokenSymbol] = useState("USDT");
  const [toTokenSymbol, setToTokenSymbol] = useState("RON");
  const [fromAmount, setFromAmount] = useState<string>("1000");
  const [slippage, setSlippage] = useState("0.1%");
  const [copied, setCopied] = useState(false);

  const tokenFrom =
    DEMO_TOKENS.find((t) => t.symbol === fromTokenSymbol) || DEMO_TOKENS[1];
  const tokenTo =
    DEMO_TOKENS.find((t) => t.symbol === toTokenSymbol) || DEMO_TOKENS[0];

  const numFrom = parseFloat(fromAmount) || 0;
  const toAmount =
    tokenFrom.symbol === "RON"
      ? (numFrom * metrics.ronPrice) / tokenTo.price
      : tokenTo.symbol === "RON"
      ? (numFrom * tokenFrom.price) / metrics.ronPrice
      : (numFrom * tokenFrom.price) / tokenTo.price;

  const handleSwapDirection = () => {
    setFromTokenSymbol(toTokenSymbol);
    setToTokenSymbol(fromTokenSymbol);
  };

  const handleExecuteSwap = async () => {
    await executeTransaction("SWAP", {
      fromAmount: numFrom,
      toAmount: toAmount,
      tokenFrom: fromTokenSymbol,
      tokenTo: toTokenSymbol,
    });
  };

  const handleCopy = () => {
    if (activeTxReceipt?.txHash) {
      navigator.clipboard.writeText(activeTxReceipt.txHash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="mono-label block tracking-[0.2em] text-ron-violet">
          FLAGSHIP EXECUTION PRIMITIVE
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          RON Swap Terminal
        </h1>
        <p className="text-xs sm:text-sm text-ron-muted leading-relaxed font-sans">
          Institutional liquidity routing, sub-second settlement, and MEV-shielded execution across multi-asset pools.
        </p>
      </div>

      {/* Main Swap Terminal Box (Surface Type C) */}
      <div className="max-w-lg mx-auto surface-type-c tech-corner-tl tech-corner-br p-6 sm:p-8 space-y-6 shadow-2xl">
        {txStage === "CONFIRMED" && activeTxReceipt ? (
          /* Confirmed Receipt Card */
          <div className="p-6 surface-type-d space-y-4 text-left font-mono text-xs">
            <div className="flex items-center gap-2 text-ron-green font-bold tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>SWAP EXECUTED & SEALED</span>
            </div>

            <div className="space-y-2 text-ron-muted pt-3 border-t border-white/[0.08]">
              <div className="flex justify-between">
                <span className="mono-label text-[10px]">SWAPPED</span>
                <span className="text-white font-bold mono-data">
                  {fromAmount} {fromTokenSymbol} → {toAmount.toFixed(4)} {toTokenSymbol}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="mono-label text-[10px]">TX HASH</span>
                <span className="text-ron-cyan font-bold mono-data">
                  {formatAddress(activeTxReceipt.txHash, 8, 6)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="mono-label text-[10px]">BLOCK HEIGHT</span>
                <span className="text-white mono-data">#{activeTxReceipt.blockHeight}</span>
              </div>
              <div className="flex justify-between">
                <span className="mono-label text-[10px]">NETWORK GAS</span>
                <span className="text-ron-green mono-data">$0.08 (0.00042 RON)</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={handleCopy}
                className="flex-1 py-2.5 rounded-[4px] bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white flex items-center justify-center gap-1.5 transition-colors font-mono text-xs"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? "COPIED" : "COPY HASH"}</span>
              </button>
              <Link
                href={`/explorer/tx/${activeTxReceipt.txHash}`}
                className="flex-1 py-2.5 rounded-[4px] bg-ron-violet/20 hover:bg-ron-violet/30 border border-ron-violet/40 text-white flex items-center justify-center gap-1.5 transition-colors font-mono text-xs"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>EXPLORER</span>
              </Link>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={resetTxStage}
              className="w-full text-xs font-mono text-ron-muted hover:text-white"
            >
              EXECUTE ANOTHER SWAP
            </Button>
          </div>
        ) : (
          /* Swap Form */
          <div className="space-y-3.5">
            {/* Header with slippage setting */}
            <div className="flex items-center justify-between font-mono text-xs text-ron-muted pb-1">
              <span className="mono-label text-[10px] text-white">ORDER ROUTER</span>
              <div className="flex items-center gap-1.5">
                <span className="mono-label text-[9px]">SLIPPAGE:</span>
                <span className="text-ron-cyan font-bold px-1.5 py-0.5 rounded-[2px] bg-white/[0.04] border border-white/10 text-[10px]">
                  {slippage}
                </span>
              </div>
            </div>

            {/* Input 1: Pay */}
            <div className="p-3.5 surface-type-a space-y-1.5">
              <div className="flex items-center justify-between font-mono text-[10px] text-ron-muted">
                <span className="mono-label text-[9px]">YOU PAY</span>
                <span className="mono-data">BAL: {formatNumber(tokenFrom.balance, 2)} {tokenFrom.symbol}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <input
                  type="number"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  className="w-full bg-transparent text-2xl font-bold font-mono text-white focus:outline-none mono-data"
                  placeholder="0.0"
                />
                <select
                  value={fromTokenSymbol}
                  onChange={(e) => setFromTokenSymbol(e.target.value)}
                  className="p-1.5 rounded-[4px] bg-black/80 border border-white/10 font-mono font-bold text-xs text-white focus:outline-none"
                >
                  {DEMO_TOKENS.map((t) => (
                    <option key={t.symbol} value={t.symbol}>
                      {t.symbol}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Invert Button */}
            <div className="flex justify-center -my-2 relative z-10">
              <button
                onClick={handleSwapDirection}
                className="p-2 rounded-[4px] bg-[#050507] border border-white/20 text-ron-muted hover:text-ron-cyan hover:border-ron-cyan transition-colors shadow-lg"
              >
                <ArrowDownUp className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Input 2: Receive */}
            <div className="p-3.5 surface-type-a space-y-1.5">
              <div className="flex items-center justify-between font-mono text-[10px] text-ron-muted">
                <span className="mono-label text-[9px]">YOU RECEIVE</span>
                <span className="mono-data">1 {tokenFrom.symbol} = {formatCurrency(tokenFrom.price / (tokenTo.symbol === "RON" ? metrics.ronPrice : tokenTo.price), 3)} {tokenTo.symbol}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-2xl font-bold font-mono text-ron-cyan mono-data">
                  {toAmount > 0 ? toAmount.toFixed(4) : "0.00"}
                </span>
                <select
                  value={toTokenSymbol}
                  onChange={(e) => setToTokenSymbol(e.target.value)}
                  className="p-1.5 rounded-[4px] bg-black/80 border border-white/10 font-mono font-bold text-xs text-white focus:outline-none"
                >
                  {DEMO_TOKENS.map((t) => (
                    <option key={t.symbol} value={t.symbol}>
                      {t.symbol}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Routing Parameter Details */}
            <div className="p-3.5 surface-type-a space-y-1 font-mono text-[11px] text-ron-muted">
              <div className="flex justify-between">
                <span className="mono-label text-[9px]">PRICE IMPACT</span>
                <span className="text-ron-green font-bold">0.03% (OPTIMAL)</span>
              </div>
              <div className="flex justify-between">
                <span className="mono-label text-[9px]">NETWORK FEE</span>
                <span className="text-white">$0.08 (~0.00042 RON)</span>
              </div>
              <div className="flex justify-between">
                <span className="mono-label text-[9px]">POOL ROUTE</span>
                <span className="text-ron-violet font-bold">RON Turing-AMM v2.4</span>
              </div>
              <div className="flex justify-between">
                <span className="mono-label text-[9px]">MINIMUM GUARANTEED</span>
                <span className="text-white mono-data">
                  {(toAmount * 0.999).toFixed(4)} {tokenTo.symbol}
                </span>
              </div>
            </div>

            {/* Execute Button */}
            <Button
              variant="primary"
              size="lg"
              onClick={handleExecuteSwap}
              isLoading={txStage !== "IDLE" && txStage !== "CONFIRMED"}
              className="w-full text-xs font-mono mt-1"
            >
              {txStage === "PREPARING" && "PREPARING ROUTE..."}
              {txStage === "SIGNATURE" && "OPTIMIZING LIQUIDITY..."}
              {txStage === "BROADCASTING" && "SIGNING TRANSACTION..."}
              {txStage === "VALIDATING" && "BROADCASTING TO MEMPOOL..."}
              {txStage === "FINALIZING" && "FINALIZING SLOT..."}
              {txStage === "IDLE" && `SWAP ${tokenFrom.symbol} FOR ${tokenTo.symbol}`}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
