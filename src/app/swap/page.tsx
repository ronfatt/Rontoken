"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRonStore } from "@/lib/store";
import { formatCurrency, formatNumber, formatAddress } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { BottomSheet } from "@/components/ui/BottomSheet";
import {
  ArrowDownUp,
  CheckCircle2,
  Copy,
  ExternalLink,
  Zap,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function SwapPage() {
  const {
    metrics,
    tokens,
    swapTokens,
    resetTxStage,
    txStage,
    activeTxReceipt,
  } = useRonStore();

  const [fromTokenSymbol, setFromTokenSymbol] = useState("USDT");
  const [toTokenSymbol, setToTokenSymbol] = useState("RON");
  const [fromAmount, setFromAmount] = useState<string>("1000");
  const [slippage, setSlippage] = useState("0.1%");
  const [reviewSheetOpen, setReviewSheetOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [swapError, setSwapError] = useState<string | null>(null);

  const tokenFrom =
    tokens.find((t) => t.symbol === fromTokenSymbol) || tokens[1] || {
      symbol: "USDT",
      name: "Tether USD",
      balance: 8420,
      price: 1.0,
    };
  const tokenTo =
    tokens.find((t) => t.symbol === toTokenSymbol) || tokens[0] || {
      symbol: "RON",
      name: "RON Token",
      balance: 12840.42,
      price: metrics.ronPrice,
    };

  const numFrom = parseFloat(fromAmount) || 0;
  const priceFrom = tokenFrom.symbol === "RON" ? metrics.ronPrice : tokenFrom.price;
  const priceTo = tokenTo.symbol === "RON" ? metrics.ronPrice : tokenTo.price;

  const toAmount = numFrom > 0 && priceTo > 0 ? (numFrom * priceFrom) / priceTo : 0;
  const isInsufficientBalance = numFrom > tokenFrom.balance;

  const handleSwapDirection = () => {
    setFromTokenSymbol(toTokenSymbol);
    setToTokenSymbol(fromTokenSymbol);
  };

  const handleExecuteSwap = async () => {
    setSwapError(null);
    if (isInsufficientBalance) {
      setSwapError(`Insufficient ${tokenFrom.symbol} balance.`);
      return;
    }
    const res = await swapTokens(fromTokenSymbol, toTokenSymbol, numFrom, toAmount);
    if (!res.success) {
      setSwapError(res.error || "Swap execution failed.");
    }
  };

  const handleCopy = () => {
    if (activeTxReceipt?.txHash) {
      navigator.clipboard.writeText(activeTxReceipt.txHash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-6 sm:space-y-12 font-mono text-xs pb-24 sm:pb-12">
      {/* Header */}
      <div className="text-center space-y-2 sm:space-y-4 max-w-2xl mx-auto">
        <span className="mono-label block tracking-[0.2em] text-ron-violet">
          FLAGSHIP EXECUTION PRIMITIVE
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-sans tracking-tight">
          RON Swap
        </h1>
        <p className="text-xs text-ron-muted leading-relaxed font-sans">
          Institutional liquidity routing, sub-second settlement, and MEV-shielded execution.
        </p>
      </div>

      {/* Main Swap Box (Surface Type C) */}
      <div className="max-w-lg mx-auto surface-type-c tech-corner-tl tech-corner-br p-5 sm:p-8 space-y-5 shadow-2xl">
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
          <div className="p-4 surface-type-a space-y-2">
            <div className="flex items-center justify-between font-mono text-[10px] text-ron-muted">
              <span className="mono-label text-[9px]">YOU PAY</span>
              <span className="mono-data">BAL: {formatNumber(tokenFrom.balance, 2)} {tokenFrom.symbol}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <input
                type="number"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                className="w-full bg-transparent text-3xl font-bold font-mono text-white focus:outline-none mono-data"
                placeholder="0.0"
              />
              <select
                value={fromTokenSymbol}
                onChange={(e) => setFromTokenSymbol(e.target.value)}
                className="p-2 rounded-[6px] bg-black/80 border border-white/10 font-mono font-bold text-xs text-white focus:outline-none shrink-0"
              >
                {tokens.map((t) => (
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
              className="p-2.5 rounded-[6px] bg-[#050507] border border-white/20 text-ron-muted hover:text-ron-cyan hover:border-ron-cyan active:scale-90 transition-all shadow-lg"
            >
              <ArrowDownUp className="w-4 h-4" />
            </button>
          </div>

          {/* Input 2: Receive */}
          <div className="p-4 surface-type-a space-y-2">
            <div className="flex items-center justify-between font-mono text-[10px] text-ron-muted">
              <span className="mono-label text-[9px]">YOU RECEIVE</span>
              <span className="mono-data">1 {tokenFrom.symbol} = {formatCurrency(priceFrom / (priceTo || 1), 3)} {tokenTo.symbol}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-3xl font-bold font-mono text-ron-cyan mono-data">
                {toAmount > 0 ? toAmount.toFixed(4) : "0.00"}
              </span>
              <select
                value={toTokenSymbol}
                onChange={(e) => setToTokenSymbol(e.target.value)}
                className="p-2 rounded-[6px] bg-black/80 border border-white/10 font-mono font-bold text-xs text-white focus:outline-none shrink-0"
              >
                {tokens.map((t) => (
                  <option key={t.symbol} value={t.symbol}>
                    {t.symbol}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Error message */}
          {swapError && (
            <p className="text-ron-red text-[11px] font-bold">{swapError}</p>
          )}

          {/* Telemetry rows */}
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
              <span className="mono-label text-[9px]">GUARANTEED MIN</span>
              <span className="text-white mono-data">
                {(toAmount * 0.999).toFixed(4)} {tokenTo.symbol}
              </span>
            </div>
          </div>

          {/* Review Swap Trigger Button */}
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              resetTxStage();
              setSwapError(null);
              setReviewSheetOpen(true);
            }}
            disabled={isInsufficientBalance || numFrom <= 0}
            className="w-full text-xs font-mono h-12 mt-1"
          >
            {isInsufficientBalance
              ? `INSUFFICIENT ${tokenFrom.symbol} BALANCE`
              : numFrom <= 0
              ? "ENTER AN AMOUNT"
              : "REVIEW SWAP"}
          </Button>
        </div>
      </div>

      {/* Swap Review & Execution Bottom Sheet */}
      <BottomSheet
        isOpen={reviewSheetOpen}
        onClose={() => setReviewSheetOpen(false)}
        title="Confirm Swap Execution"
        subtitle="MEV-Shielded Liquid AMM Order Routing"
      >
        <div className="space-y-4">
          {txStage === "CONFIRMED" && activeTxReceipt ? (
            <div className="p-5 surface-type-d space-y-4 text-left font-mono text-xs">
              <div className="flex items-center gap-2 text-ron-green font-bold tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>SWAP EXECUTED & SEALED</span>
              </div>

              <div className="space-y-2 text-ron-muted pt-2 border-t border-white/[0.08] text-[11px]">
                <div className="flex justify-between">
                  <span className="mono-label text-[9.5px]">SWAPPED:</span>
                  <span className="text-white font-bold mono-data">
                    {fromAmount} {fromTokenSymbol} → {toAmount.toFixed(4)} {toTokenSymbol}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="mono-label text-[9.5px]">TX HASH:</span>
                  <span className="text-ron-cyan font-bold mono-data">
                    {formatAddress(activeTxReceipt.txHash, 8, 6)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="mono-label text-[9.5px]">BLOCK HEIGHT:</span>
                  <span className="text-white mono-data">#{activeTxReceipt.blockHeight}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={handleCopy}
                  className="flex-1 py-2.5 rounded-[4px] bg-white/[0.04] border border-white/10 text-white flex items-center justify-center gap-1.5 font-mono text-xs"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? "COPIED" : "COPY HASH"}</span>
                </button>
                <Link
                  href={`/explorer/tx/${activeTxReceipt.txHash}`}
                  className="flex-1 py-2.5 rounded-[4px] bg-ron-violet/20 border border-ron-violet/40 text-white flex items-center justify-center gap-1.5 font-mono text-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>EXPLORER</span>
                </Link>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  resetTxStage();
                  setReviewSheetOpen(false);
                }}
                className="w-full text-xs"
              >
                DONE
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Route breakdown */}
              <div className="p-4 surface-type-a space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-ron-dim">YOU PAY:</span>
                  <span className="text-white font-bold mono-data text-sm">
                    {fromAmount} {fromTokenSymbol}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-ron-dim">YOU RECEIVE:</span>
                  <span className="text-ron-cyan font-bold mono-data text-sm">
                    {toAmount.toFixed(4)} {toTokenSymbol}
                  </span>
                </div>
                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px]">
                  <span className="text-ron-dim">ROUTE:</span>
                  <span className="text-ron-violet font-bold">
                    {fromTokenSymbol} → RON Turing-AMM → {toTokenSymbol}
                  </span>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                onClick={handleExecuteSwap}
                isLoading={txStage !== "IDLE" && txStage !== "CONFIRMED"}
                className="w-full text-xs font-mono h-12"
              >
                {txStage === "PREPARING" && "PREPARING ROUTE..."}
                {txStage === "SIGNATURE" && "OPTIMIZING LIQUIDITY..."}
                {txStage === "BROADCASTING" && "SIGNING TRANSACTION..."}
                {txStage === "VALIDATING" && "CONFIRMING WITH 184 HUBS..."}
                {txStage === "FINALIZING" && "FINALIZING SLOT..."}
                {txStage === "IDLE" && `CONFIRM SWAP (${fromAmount} ${fromTokenSymbol})`}
              </Button>
            </div>
          )}
        </div>
      </BottomSheet>
    </div>
  );
}
