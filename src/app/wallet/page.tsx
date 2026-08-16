"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRonStore } from "@/lib/store";
import { formatAddress, formatCurrency, formatNumber, formatTimeAgo } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { StatusBadge } from "@/components/ui/StatusBadge";
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
    sendTokens,
    setWalletModalOpen,
    txStage,
    activeTxReceipt,
    resetTxStage,
    metrics,
  } = useRonStore();

  const [sendModalOpen, setSendModalOpen] = useState(false);
  const [receiveModalOpen, setReceiveModalOpen] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  const [selectedTokenSymbol, setSelectedTokenSymbol] = useState("RON");
  const [copied, setCopied] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const selectedToken = tokens.find((t) => t.symbol === selectedTokenSymbol) || tokens[0];

  const handleExecuteSend = async () => {
    setSendError(null);
    const amt = parseFloat(sendAmount);
    if (!recipientAddress || !amt || amt <= 0) {
      setSendError("Please provide a valid recipient address and amount.");
      return;
    }
    const res = await sendTokens(recipientAddress, amt, selectedTokenSymbol);
    if (!res.success) {
      setSendError(res.error || "Transfer failed");
    }
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 font-mono text-xs">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 text-ron-cyan text-xs font-bold mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-ron-green" />
            <span className="mono-label text-[10px]">SOVEREIGN ACCOUNT MANAGER</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-sans tracking-tight">
            Sovereign Wallet
          </h1>
        </div>

        {/* Address Badge */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-2 rounded-[4px] bg-black/60 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-ron-green" />
            <span className="text-white font-bold mono-data">{formatAddress(walletAddress, 8, 6)}</span>
            <button
              onClick={handleCopyAddress}
              className="p-1 text-ron-muted hover:text-white transition-colors"
              title="Copy Address"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Portfolio Balance Strip (Surface Type A) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 surface-type-a space-y-1">
          <span className="mono-label text-[9px] uppercase">TOTAL ESTIMATED PORTFOLIO</span>
          <span className="text-2xl font-bold text-white block mono-data">
            {formatCurrency(portfolioValueUSD, 2)}
          </span>
          <span className="text-[10px] text-ron-green">+4.82% 24h</span>
        </div>

        <div className="p-4 surface-type-a space-y-1">
          <span className="mono-label text-[9px] uppercase">LIQUID RON BALANCE</span>
          <span className="text-2xl font-bold text-ron-cyan block mono-data">
            {formatNumber(ronBalance, 2)} RON
          </span>
          <span className="text-[10px] text-ron-muted mono-data">
            {formatCurrency(ronBalance * metrics.ronPrice, 2)}
          </span>
        </div>

        <div className="p-4 surface-type-a space-y-1">
          <span className="mono-label text-[9px] uppercase">STAKED RON</span>
          <span className="text-2xl font-bold text-ron-violet block mono-data">
            {formatNumber(stakedBalance, 2)} RON
          </span>
          <span className="text-[10px] text-ron-cyan">18.42% Compounding APR</span>
        </div>

        <div className="p-4 surface-type-a space-y-1">
          <span className="mono-label text-[9px] uppercase">MAINNET NETWORK</span>
          <span className="text-2xl font-bold text-ron-green block">RON MAINNET</span>
          <span className="text-[10px] text-ron-dim">Chain ID: 2026</span>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant="primary"
          size="md"
          onClick={() => {
            resetTxStage();
            setSendError(null);
            setSendModalOpen(true);
          }}
          leftIcon={<Send className="w-3.5 h-3.5 text-black" />}
        >
          SEND ASSETS
        </Button>

        <Button
          variant="secondary"
          size="md"
          onClick={() => setReceiveModalOpen(true)}
          leftIcon={<QrCode className="w-3.5 h-3.5 text-ron-cyan" />}
        >
          RECEIVE
        </Button>

        <Link href="/swap">
          <Button
            variant="secondary"
            size="md"
            leftIcon={<ArrowDownUp className="w-3.5 h-3.5 text-ron-violet" />}
          >
            SWAP TOKENS
          </Button>
        </Link>

        <Link href="/stake">
          <Button
            variant="secondary"
            size="md"
            leftIcon={<Lock className="w-3.5 h-3.5 text-ron-green" />}
          >
            STAKE RON
          </Button>
        </Link>
      </div>

      {/* Multi-Asset Holdings Table (Surface Type B with Tech Corners) */}
      <div className="surface-type-b tech-corner-tl tech-corner-br p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <h3 className="font-bold text-white uppercase tracking-wider text-xs">Token Balances</h3>
          <span className="text-ron-dim">{tokens.length} Assets</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-black/80 border-b border-white/[0.08] text-ron-dim uppercase tracking-wider text-[9.5px]">
              <tr>
                <th className="py-3 px-4">ASSET</th>
                <th className="py-3 px-4">PRICE</th>
                <th className="py-3 px-4">BALANCE</th>
                <th className="py-3 px-4">TOTAL VALUE</th>
                <th className="py-3 px-4">24H CHANGE</th>
                <th className="py-3 px-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04] text-ron-muted">
              {tokens.map((token) => {
                const currentPrice = token.symbol === "RON" ? metrics.ronPrice : token.price;
                const valueUSD = token.balance * currentPrice;
                return (
                  <tr key={token.symbol} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                      <span className="w-6 h-6 rounded-[4px] bg-white/[0.04] border border-white/10 flex items-center justify-center font-bold text-[10px] text-ron-cyan">
                        {token.symbol.slice(0, 1)}
                      </span>
                      <span>{token.name} ({token.symbol})</span>
                    </td>
                    <td className="py-3.5 px-4 mono-data">{formatCurrency(currentPrice, 3)}</td>
                    <td className="py-3.5 px-4 text-white font-bold mono-data">
                      {formatNumber(token.balance, 4)} {token.symbol}
                    </td>
                    <td className="py-3.5 px-4 text-ron-cyan font-bold mono-data">{formatCurrency(valueUSD, 2)}</td>
                    <td className="py-3.5 px-4 text-ron-green font-bold mono-data">+{token.change24h}%</td>
                    <td className="py-3.5 px-4 text-right">
                      <Link href="/swap">
                        <Button variant="ghost" size="sm" className="text-[10px]">
                          SWAP
                        </Button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Account Transaction History */}
      <div className="surface-type-b tech-corner-tl tech-corner-br p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <h3 className="font-bold text-white uppercase tracking-wider text-xs">Recent Account Activity</h3>
          <Link href="/explorer" className="text-ron-cyan hover:underline text-[11px]">
            View All in Explorer
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-black/80 border-b border-white/[0.08] text-ron-dim uppercase tracking-wider text-[9.5px]">
              <tr>
                <th className="py-3 px-4">TX HASH</th>
                <th className="py-3 px-4">TYPE</th>
                <th className="py-3 px-4">VALUE</th>
                <th className="py-3 px-4">FEE</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4 text-right">TIME</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04] text-ron-muted">
              {transactions
                .filter((tx) => tx.from === walletAddress || tx.to === walletAddress || true)
                .slice(0, 8)
                .map((tx) => (
                  <tr key={tx.hash} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 text-ron-cyan font-bold mono-data">
                      <Link href={`/explorer/tx/${tx.hash}`} className="hover:underline">
                        {formatAddress(tx.hash, 8, 4)}
                      </Link>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-1.5 py-0.5 rounded-[2px] bg-white/[0.04] border border-white/[0.08] text-[9.5px] font-bold text-white">
                        {tx.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-white mono-data">
                      {formatNumber(tx.value, 2)} {tx.tokenSymbol}
                    </td>
                    <td className="py-3 px-4 mono-data">{tx.networkFee} RON</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={tx.status} size="sm" />
                    </td>
                    <td className="py-3 px-4 text-right text-ron-dim text-[10.5px] mono-data">
                      {formatTimeAgo(tx.timestamp)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Send Modal */}
      <Modal
        isOpen={sendModalOpen}
        onClose={() => setSendModalOpen(false)}
        title="Send Crypto Assets"
        subtitle="Sub-second zero-knowledge value transfer across RON Mainnet"
      >
        <div className="space-y-4 font-mono text-xs">
          {txStage === "CONFIRMED" && activeTxReceipt ? (
            <div className="p-6 surface-type-d space-y-4 text-left">
              <div className="flex items-center gap-2 text-ron-green font-bold tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>TRANSFER CONFIRMED</span>
              </div>
              <div className="space-y-1.5 text-ron-muted text-[11px]">
                <div className="flex justify-between">
                  <span>AMOUNT:</span>
                  <span className="text-white font-bold mono-data">{sendAmount} {selectedTokenSymbol}</span>
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
                  setSendModalOpen(false);
                }}
                className="w-full text-xs"
              >
                DONE
              </Button>
            </div>
          ) : (
            <div className="space-y-3.5">
              {/* Asset Select */}
              <div className="space-y-1">
                <label className="mono-label text-[9.5px]">SELECT ASSET</label>
                <select
                  value={selectedTokenSymbol}
                  onChange={(e) => setSelectedTokenSymbol(e.target.value)}
                  className="w-full p-2.5 rounded-[4px] bg-black/80 border border-white/10 text-white font-mono text-xs focus:outline-none"
                >
                  {tokens.map((t) => (
                    <option key={t.symbol} value={t.symbol}>
                      {t.name} ({t.symbol}) — Balance: {formatNumber(t.balance, 2)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Recipient Input */}
              <div className="space-y-1">
                <label className="mono-label text-[9.5px]">RECIPIENT ADDRESS</label>
                <input
                  type="text"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  placeholder="0x..."
                  className="w-full p-2.5 rounded-[4px] bg-black/80 border border-white/10 text-white font-mono text-xs focus:outline-none"
                />
              </div>

              {/* Amount Input */}
              <div className="space-y-1">
                <div className="flex justify-between">
                  <label className="mono-label text-[9.5px]">AMOUNT</label>
                  <span className="text-ron-dim">MAX: {selectedToken.balance}</span>
                </div>
                <div className="flex items-center gap-2 p-2 surface-type-a">
                  <input
                    type="number"
                    value={sendAmount}
                    onChange={(e) => setSendAmount(e.target.value)}
                    placeholder="0.0"
                    className="w-full bg-transparent text-lg font-bold text-white font-mono focus:outline-none mono-data"
                  />
                  <button
                    onClick={() => setSendAmount(selectedToken.balance.toString())}
                    className="px-2 py-0.5 rounded-[2px] bg-white/10 text-[10px] text-ron-cyan font-bold"
                  >
                    MAX
                  </button>
                </div>
              </div>

              {sendError && (
                <p className="text-ron-red text-[11px] font-bold">{sendError}</p>
              )}

              <div className="p-2.5 surface-type-a space-y-1 text-ron-dim text-[10.5px]">
                <div className="flex justify-between">
                  <span>ESTIMATED GAS:</span>
                  <span className="text-white">0.00042 RON ($0.08)</span>
                </div>
                <div className="flex justify-between">
                  <span>FINALITY:</span>
                  <span className="text-ron-green">0.42s Sub-second</span>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                onClick={handleExecuteSend}
                isLoading={txStage !== "IDLE" && txStage !== "CONFIRMED"}
                className="w-full text-xs font-mono"
              >
                {txStage === "PREPARING" && "PREPARING TRANSFER..."}
                {txStage === "SIGNATURE" && "SIGNATURE VERIFIED..."}
                {txStage === "BROADCASTING" && "BROADCASTING TO MEMPOOL..."}
                {txStage === "VALIDATING" && "CONFIRMING WITH 184 HUBS..."}
                {txStage === "IDLE" && `SEND ${selectedTokenSymbol}`}
              </Button>
            </div>
          )}
        </div>
      </Modal>

      {/* Receive Modal */}
      <Modal
        isOpen={receiveModalOpen}
        onClose={() => setReceiveModalOpen(false)}
        title="Receive Crypto Assets"
        subtitle="Your sovereign account address on RON Mainnet"
      >
        <div className="space-y-5 text-center font-mono text-xs">
          {/* Simulated QR Box */}
          <div className="w-44 h-44 mx-auto p-3 rounded-[6px] bg-white text-black flex flex-col items-center justify-center space-y-2 shadow-2xl">
            <QrCode className="w-32 h-32 text-black" />
            <span className="text-[9px] font-black tracking-widest uppercase">RON MAINNET</span>
          </div>

          <div className="p-3 surface-type-d text-left space-y-2">
            <span className="mono-label text-[9px] text-ron-cyan block uppercase">SOVEREIGN ADDRESS</span>
            <div className="flex items-center justify-between">
              <span className="text-white font-bold text-[11px] break-all mono-data">{walletAddress}</span>
              <button
                onClick={handleCopyAddress}
                className="ml-2 p-1.5 rounded-[3px] bg-white/10 hover:bg-white/20 text-white shrink-0"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <p className="text-ron-dim text-[10.5px] leading-relaxed">
            Important: Only send assets supported on RON Network or compatible bridges to this address.
          </p>

          <Button
            variant="primary"
            size="md"
            onClick={handleCopyAddress}
            className="w-full text-xs"
          >
            {copied ? "ADDRESS COPIED" : "COPY WALLET ADDRESS"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
