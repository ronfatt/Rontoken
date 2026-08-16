"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRonStore } from "@/lib/store";
import { formatCurrency, formatAddress } from "@/lib/utils";
import { Button } from "../ui/Button";
import { ArrowDownUp, CheckCircle2, Copy, ExternalLink, Zap } from "lucide-react";

export const Scene07SwapWidget: React.FC = () => {
  const { metrics, executeTransaction, resetTxStage, txStage, activeTxReceipt } =
    useRonStore();

  const [fromAmount, setFromAmount] = useState<string>("1000");
  const [tokenFrom, setTokenFrom] = useState("USDT");
  const [tokenTo, setTokenTo] = useState("RON");
  const [copied, setCopied] = useState(false);

  const numericFrom = parseFloat(fromAmount) || 0;
  const toAmount =
    tokenFrom === "USDT"
      ? numericFrom / metrics.ronPrice
      : numericFrom * metrics.ronPrice;

  const handleSwapDirection = () => {
    setTokenFrom(tokenTo);
    setTokenTo(tokenFrom);
  };

  const handleExecuteSwap = async () => {
    await executeTransaction("SWAP", {
      fromAmount: numericFrom,
      toAmount: toAmount,
      tokenFrom,
      tokenTo,
    });
  };

  const handleCopyHash = () => {
    if (activeTxReceipt?.txHash) {
      navigator.clipboard.writeText(activeTxReceipt.txHash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/[0.04]">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="mono-label block tracking-[0.2em] text-ron-violet">
            06 // INSTITUTIONAL LIQUIDITY ROUTER
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            RON Swap Terminal
          </h2>
          <p className="text-xs sm:text-sm text-ron-muted max-w-lg mx-auto font-sans">
            Sub-second multi-pool liquidity routing with zero front-running and 0.03% guaranteed slippage.
          </p>
        </div>

        {/* Swap Module (Surface Type B with Technical Corners) */}
        <div className="max-w-md mx-auto surface-type-c p-6 sm:p-8 tech-corner-tl tech-corner-br space-y-4">
          {txStage === "CONFIRMED" && activeTxReceipt ? (
            /* Confirmed Receipt Card */
            <div className="p-6 surface-type-d space-y-4 text-left font-mono">
              <div className="flex items-center gap-2 text-ron-green text-xs font-bold tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>SWAP EXECUTED & SEALED</span>
              </div>

              <div className="space-y-2 text-xs text-ron-muted pt-3 border-t border-white/[0.08]">
                <div className="flex justify-between">
                  <span className="mono-label text-[10px]">SWAPPED</span>
                  <span className="text-white font-bold mono-data">
                    {fromAmount} {tokenFrom} → {toAmount.toFixed(2)} {tokenTo}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="mono-label text-[10px]">TX HASH</span>
                  <span className="text-ron-cyan font-bold mono-data">{formatAddress(activeTxReceipt.txHash, 8, 6)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="mono-label text-[10px]">BLOCK HEIGHT</span>
                  <span className="text-white mono-data">#{activeTxReceipt.blockHeight}</span>
                </div>
                <div className="flex justify-between">
                  <span className="mono-label text-[10px]">GAS FEE</span>
                  <span className="text-ron-green mono-data">$0.08 (0.00042 RON)</span>
                </div>
                <div className="flex justify-between">
                  <span className="mono-label text-[10px]">LATENCY</span>
                  <span className="text-white mono-data">0.42s FINALITY</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={handleCopyHash}
                  className="flex-1 py-2 rounded-[4px] bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs text-white flex items-center justify-center gap-1.5 transition-colors font-mono"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? "COPIED" : "COPY HASH"}</span>
                </button>
                <Link
                  href={`/explorer/tx/${activeTxReceipt.txHash}`}
                  className="flex-1 py-2 rounded-[4px] bg-ron-violet/20 hover:bg-ron-violet/30 border border-ron-violet/40 text-xs text-white flex items-center justify-center gap-1.5 transition-colors font-mono"
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
                SWAP AGAIN
              </Button>
            </div>
          ) : (
            /* Swap Input Form */
            <div className="space-y-3">
              {/* Token From */}
              <div className="p-3.5 surface-type-a space-y-1.5">
                <div className="flex items-center justify-between font-mono text-[10px] text-ron-muted">
                  <span className="mono-label text-[9px]">YOU PAY</span>
                  <span>BAL: 45,000.00 {tokenFrom}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <input
                    type="number"
                    value={fromAmount}
                    onChange={(e) => setFromAmount(e.target.value)}
                    className="w-full bg-transparent text-2xl font-bold text-white font-mono focus:outline-none mono-data"
                    placeholder="0.0"
                  />
                  <span className="font-mono font-bold text-xs text-white px-2.5 py-1 rounded-[3px] bg-white/10 border border-white/10 shrink-0">
                    {tokenFrom}
                  </span>
                </div>
              </div>

              {/* Swap Direction Toggle */}
              <div className="flex justify-center -my-2 relative z-10">
                <button
                  onClick={handleSwapDirection}
                  className="p-1.5 rounded-[4px] bg-[#050507] border border-white/20 text-ron-muted hover:text-ron-cyan hover:border-ron-cyan transition-colors"
                >
                  <ArrowDownUp className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Token To */}
              <div className="p-3.5 surface-type-a space-y-1.5">
                <div className="flex items-center justify-between font-mono text-[10px] text-ron-muted">
                  <span className="mono-label text-[9px]">YOU RECEIVE</span>
                  <span>RATE: 1 RON = {formatCurrency(metrics.ronPrice, 3)}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-2xl font-bold text-ron-cyan font-mono mono-data">
                    {toAmount > 0 ? toAmount.toFixed(2) : "0.00"}
                  </span>
                  <span className="font-mono font-bold text-xs text-white px-2.5 py-1 rounded-[3px] bg-ron-violet/20 border border-ron-violet/40 shrink-0">
                    {tokenTo}
                  </span>
                </div>
              </div>

              {/* Routing Telemetry */}
              <div className="p-3 surface-type-a space-y-1 font-mono text-[11px] text-ron-muted">
                <div className="flex justify-between">
                  <span className="mono-label text-[9px]">PRICE IMPACT</span>
                  <span className="text-ron-green font-bold">0.03% (OPTIMAL)</span>
                </div>
                <div className="flex justify-between">
                  <span className="mono-label text-[9px]">NETWORK FEE</span>
                  <span className="text-white">$0.08 (~0.00042 RON)</span>
                </div>
                <div className="flex justify-between">
                  <span className="mono-label text-[9px]">MIN RECEIVED</span>
                  <span className="text-white">
                    {(toAmount * 0.999).toFixed(2)} {tokenTo}
                  </span>
                </div>
              </div>

              {/* Execution Button */}
              <Button
                variant="primary"
                size="lg"
                onClick={handleExecuteSwap}
                isLoading={txStage !== "IDLE" && txStage !== "CONFIRMED"}
                className="w-full text-xs font-mono mt-2"
              >
                {txStage === "PREPARING" && "PREPARING ROUTE..."}
                {txStage === "SIGNATURE" && "OPTIMIZING LIQUIDITY..."}
                {txStage === "BROADCASTING" && "SIGNING TRANSACTION..."}
                {txStage === "VALIDATING" && "BROADCASTING TO 184 HUBS..."}
                {txStage === "FINALIZING" && "FINALIZING SLOT..."}
                {txStage === "IDLE" && `SWAP ${tokenFrom} FOR ${tokenTo}`}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
