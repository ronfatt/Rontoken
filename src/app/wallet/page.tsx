"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRonStore } from "@/lib/store";
import { formatAddress, formatCurrency, formatNumber, formatTimeAgo } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DemoToken } from "@/lib/types";
import {
  Wallet,
  Send,
  QrCode,
  ArrowDownUp,
  Lock,
  Copy,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Activity,
  ArrowUpRight,
  ArrowDownLeft,
  ChevronRight,
} from "lucide-react";

export default function WalletPage() {
  const {
    isConnected,
    walletAddress,
    ronBalance,
    stakedBalance,
    portfolioValueUSD,
    tokens,
    transactions,
    stakingPositions,
    sendTokens,
    setWalletModalOpen,
    txStage,
    activeTxReceipt,
    resetTxStage,
    metrics,
  } = useRonStore();

  const [activeTab, setActiveTab] = useState<"TOKENS" | "ACTIVITY" | "STAKING">("TOKENS");
  const [sendSheetOpen, setSendSheetOpen] = useState(false);
  const [receiveSheetOpen, setReceiveSheetOpen] = useState(false);
  const [tokenDetailSheetOpen, setTokenDetailSheetOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<DemoToken>(tokens[0]);

  const [recipientAddress, setRecipientAddress] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  const [copied, setCopied] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const handleExecuteSend = async () => {
    setSendError(null);
    const amt = parseFloat(sendAmount);
    if (!recipientAddress || !amt || amt <= 0) {
      setSendError("Please provide a valid recipient address and amount.");
      return;
    }
    const res = await sendTokens(recipientAddress, amt, selectedToken.symbol);
    if (!res.success) {
      setSendError(res.error || "Transfer failed");
    }
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openTokenDetail = (tok: DemoToken) => {
    setSelectedToken(tok);
    setTokenDetailSheetOpen(true);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-10 font-mono text-xs">
      {/* Sovereign Account Header Profile */}
      <div className="surface-type-c tech-corner-tl tech-corner-br p-5 sm:p-8 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-ron-green animate-pulse" />
            <span className="mono-label text-[10px] text-ron-cyan font-bold uppercase">
              RON MAINNET V2.4
            </span>
          </div>

          <div
            onClick={handleCopyAddress}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-white/[0.04] border border-white/10 text-white cursor-pointer select-none active:scale-95 transition-transform"
          >
            <span className="mono-data text-[11px] font-bold">{formatAddress(walletAddress, 6, 4)}</span>
            <Copy className="w-3 h-3 text-ron-dim" />
          </div>
        </div>

        {/* Portfolio Value Display */}
        <div className="space-y-1">
          <span className="mono-label text-[10px] uppercase text-ron-dim">TOTAL PORTFOLIO VALUE</span>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl sm:text-5xl font-black text-white font-sans tracking-tight mono-data">
              {formatCurrency(portfolioValueUSD, 2)}
            </span>
            <span className="text-xs font-bold text-ron-green font-mono">
              +4.82% 24h
            </span>
          </div>
        </div>

        {/* Quick Action 4-Button Grid (Thumb Reachable) */}
        <div className="grid grid-cols-4 gap-2 pt-2 border-t border-white/[0.08]">
          <button
            onClick={() => {
              resetTxStage();
              setSendError(null);
              setSendSheetOpen(true);
            }}
            className="py-3 px-1 rounded-[6px] bg-white text-black font-bold flex flex-col items-center justify-center gap-1.5 shadow-lg active:scale-95 transition-transform"
          >
            <Send className="w-4 h-4 text-black" />
            <span className="text-[10px] tracking-wider font-mono uppercase">SEND</span>
          </button>

          <button
            onClick={() => setReceiveSheetOpen(true)}
            className="py-3 px-1 rounded-[6px] bg-ron-elevated border border-white/10 text-white font-bold flex flex-col items-center justify-center gap-1.5 active:scale-95 transition-transform hover:border-ron-cyan"
          >
            <QrCode className="w-4 h-4 text-ron-cyan" />
            <span className="text-[10px] tracking-wider font-mono uppercase">RECEIVE</span>
          </button>

          <Link
            href="/swap"
            className="py-3 px-1 rounded-[6px] bg-ron-elevated border border-white/10 text-white font-bold flex flex-col items-center justify-center gap-1.5 active:scale-95 transition-transform hover:border-ron-violet"
          >
            <ArrowDownUp className="w-4 h-4 text-ron-violet" />
            <span className="text-[10px] tracking-wider font-mono uppercase">SWAP</span>
          </Link>

          <Link
            href="/stake"
            className="py-3 px-1 rounded-[6px] bg-ron-elevated border border-white/10 text-white font-bold flex flex-col items-center justify-center gap-1.5 active:scale-95 transition-transform hover:border-ron-green"
          >
            <Lock className="w-4 h-4 text-ron-green" />
            <span className="text-[10px] tracking-wider font-mono uppercase">STAKE</span>
          </Link>
        </div>
      </div>

      {/* Segmented Tab Navigation */}
      <div className="flex items-center p-1 rounded-[6px] bg-black/60 border border-white/10">
        {(["TOKENS", "ACTIVITY", "STAKING"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-[4px] font-mono text-[11px] font-bold uppercase tracking-wider transition-colors ${
              activeTab === tab
                ? "bg-ron-violet text-white shadow-md"
                : "text-ron-muted hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab 1: Tokens List */}
      {activeTab === "TOKENS" && (
        <div className="space-y-2">
          {tokens.map((tok) => {
            const price = tok.symbol === "RON" ? metrics.ronPrice : tok.price;
            const valUSD = tok.balance * price;
            return (
              <div
                key={tok.symbol}
                onClick={() => openTokenDetail(tok)}
                className="p-3.5 rounded-[8px] surface-type-b hover:border-ron-cyan/40 transition-all flex items-center justify-between cursor-pointer active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-[6px] bg-white/[0.04] border border-white/10 flex items-center justify-center font-bold text-xs text-ron-cyan">
                    {tok.symbol.slice(0, 1)}
                  </div>
                  <div>
                    <span className="font-bold text-white text-xs block">{tok.name}</span>
                    <span className="text-[10px] text-ron-dim mono-data">
                      {formatNumber(tok.balance, 3)} {tok.symbol}
                    </span>
                  </div>
                </div>

                <div className="text-right flex items-center gap-2">
                  <div>
                    <span className="text-xs font-bold text-white block mono-data">
                      {formatCurrency(valUSD, 2)}
                    </span>
                    <span className="text-[10px] text-ron-green font-bold mono-data">
                      +{tok.change24h || 4.8}%
                    </span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-ron-dim" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Activity List */}
      {activeTab === "ACTIVITY" && (
        <div className="space-y-2">
          {transactions.slice(0, 10).map((tx) => (
            <Link
              key={tx.hash}
              href={`/explorer/tx/${tx.hash}`}
              className="p-3.5 rounded-[8px] surface-type-b hover:border-ron-violet/40 transition-all flex items-center justify-between block active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-[4px] bg-black/60 border border-white/10 text-center font-bold text-[9px] text-white">
                  {tx.type}
                </div>
                <div>
                  <span className="font-bold text-white text-xs block mono-data">
                    {formatAddress(tx.hash, 6, 4)}
                  </span>
                  <span className="text-[10px] text-ron-dim mono-data">{formatTimeAgo(tx.timestamp)}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-ron-cyan block mono-data">
                  {formatNumber(tx.value, 2)} {tx.tokenSymbol}
                </span>
                <StatusBadge status={tx.status} size="sm" />
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Tab 3: Staking Positions */}
      {activeTab === "STAKING" && (
        <div className="space-y-3">
          {stakingPositions.map((pos) => (
            <div key={pos.id} className="p-4 rounded-[8px] surface-type-b space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs">{pos.validatorName}</span>
                <span className="px-2 py-0.5 rounded-[2px] bg-ron-green/10 text-ron-green font-bold text-[10px]">
                  {pos.apy}% APY
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-white/[0.06]">
                <div>
                  <span className="mono-label text-[9px] block">DELEGATED:</span>
                  <span className="text-white font-bold mono-data">{formatNumber(pos.amount, 2)} RON</span>
                </div>
                <div>
                  <span className="mono-label text-[9px] block">ACCRUED YIELD:</span>
                  <span className="text-ron-green font-bold mono-data">+{formatNumber(pos.accruedRewards, 4)} RON</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <Link href="/stake" className="w-full">
                  <Button variant="secondary" size="sm" className="w-full text-xs">
                    MANAGE STAKE
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Send Bottom Sheet */}
      <BottomSheet
        isOpen={sendSheetOpen}
        onClose={() => setSendSheetOpen(false)}
        title={`Send ${selectedToken.symbol}`}
        subtitle="Sub-second cryptographic transfer on RON Mainnet"
      >
        <div className="space-y-4">
          {txStage === "CONFIRMED" && activeTxReceipt ? (
            <div className="p-5 surface-type-d space-y-3 text-left">
              <div className="flex items-center gap-2 text-ron-green font-bold text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>TRANSFER CONFIRMED</span>
              </div>
              <div className="space-y-1 text-ron-muted text-[11px]">
                <div className="flex justify-between">
                  <span>AMOUNT:</span>
                  <span className="text-white font-bold mono-data">{sendAmount} {selectedToken.symbol}</span>
                </div>
                <div className="flex justify-between">
                  <span>RECIPIENT:</span>
                  <span className="text-ron-cyan mono-data">{formatAddress(recipientAddress, 6, 6)}</span>
                </div>
                <div className="flex justify-between">
                  <span>TX HASH:</span>
                  <span className="text-white mono-data">{formatAddress(activeTxReceipt.txHash, 8, 6)}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  resetTxStage();
                  setSendSheetOpen(false);
                }}
                className="w-full text-xs"
              >
                DONE
              </Button>
            </div>
          ) : (
            <div className="space-y-3.5">
              <div className="space-y-1">
                <label className="mono-label text-[9.5px]">RECIPIENT ADDRESS</label>
                <input
                  type="text"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  placeholder="0x..."
                  className="w-full p-3 rounded-[6px] bg-black/80 border border-white/10 text-white font-mono text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <label className="mono-label text-[9.5px]">AMOUNT</label>
                  <span className="text-ron-dim">BAL: {selectedToken.balance}</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 surface-type-a">
                  <input
                    type="number"
                    value={sendAmount}
                    onChange={(e) => setSendAmount(e.target.value)}
                    placeholder="0.0"
                    className="w-full bg-transparent text-xl font-bold text-white font-mono focus:outline-none mono-data"
                  />
                  <button
                    onClick={() => setSendAmount(selectedToken.balance.toString())}
                    className="px-2.5 py-1 rounded-[3px] bg-white/10 text-xs text-ron-cyan font-bold"
                  >
                    MAX
                  </button>
                </div>
              </div>

              {sendError && (
                <p className="text-ron-red text-[11px] font-bold">{sendError}</p>
              )}

              <div className="p-3 surface-type-a space-y-1 text-ron-dim text-[10.5px]">
                <div className="flex justify-between">
                  <span>ESTIMATED GAS:</span>
                  <span className="text-white">0.00042 RON ($0.08)</span>
                </div>
                <div className="flex justify-between">
                  <span>FINALITY:</span>
                  <span className="text-ron-green font-bold">0.42s Sub-second</span>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                onClick={handleExecuteSend}
                isLoading={txStage !== "IDLE" && txStage !== "CONFIRMED"}
                className="w-full text-xs font-mono h-12"
              >
                {txStage === "PREPARING" && "PREPARING TRANSFER..."}
                {txStage === "SIGNATURE" && "SIGNING ENCLAVE..."}
                {txStage === "BROADCASTING" && "BROADCASTING TO MEMPOOL..."}
                {txStage === "VALIDATING" && "CONFIRMING WITH 184 HUBS..."}
                {txStage === "IDLE" && `CONFIRM SEND ${selectedToken.symbol}`}
              </Button>
            </div>
          )}
        </div>
      </BottomSheet>

      {/* Receive Bottom Sheet */}
      <BottomSheet
        isOpen={receiveSheetOpen}
        onClose={() => setReceiveSheetOpen(false)}
        title="Receive Crypto Assets"
        subtitle="Your sovereign address on RON Mainnet"
      >
        <div className="space-y-4 text-center font-mono text-xs">
          <div className="w-44 h-44 mx-auto p-3 rounded-[8px] bg-white text-black flex flex-col items-center justify-center space-y-2 shadow-2xl">
            <QrCode className="w-32 h-32 text-black" />
            <span className="text-[9px] font-black tracking-widest uppercase">RON MAINNET</span>
          </div>

          <div className="p-3 surface-type-d text-left space-y-1.5">
            <span className="mono-label text-[9px] text-ron-cyan uppercase block">SOVEREIGN ADDRESS</span>
            <span className="text-white font-bold text-xs break-all mono-data block">{walletAddress}</span>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={handleCopyAddress}
            className="w-full text-xs h-12"
          >
            {copied ? "COPIED TO CLIPBOARD" : "COPY WALLET ADDRESS"}
          </Button>
        </div>
      </BottomSheet>

      {/* Token Detail Bottom Sheet */}
      <BottomSheet
        isOpen={tokenDetailSheetOpen}
        onClose={() => setTokenDetailSheetOpen(false)}
        title={`${selectedToken.name} (${selectedToken.symbol})`}
        subtitle="Asset Balance & Quick Actions"
      >
        <div className="space-y-4">
          <div className="p-4 surface-type-d space-y-1 text-center">
            <span className="mono-label text-[9px] uppercase">YOUR BALANCE</span>
            <span className="text-3xl font-black text-white block mono-data">
              {formatNumber(selectedToken.balance, 4)} {selectedToken.symbol}
            </span>
            <span className="text-xs text-ron-cyan mono-data">
              {formatCurrency(selectedToken.balance * (selectedToken.symbol === "RON" ? metrics.ronPrice : selectedToken.price), 2)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={() => {
                setTokenDetailSheetOpen(false);
                setSendSheetOpen(true);
              }}
              className="py-3 rounded-[6px] bg-white text-black font-bold text-xs"
            >
              SEND {selectedToken.symbol}
            </button>
            <Link
              href="/swap"
              className="py-3 rounded-[6px] bg-ron-violet/20 border border-ron-violet/40 text-white font-bold text-xs flex items-center justify-center"
            >
              SWAP {selectedToken.symbol}
            </Link>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}
