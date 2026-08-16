"use client";

import React, { useState } from "react";
import { useRonStore } from "@/lib/store";
import { formatAddress, formatCurrency } from "@/lib/utils";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";
import {
  Wallet,
  CheckCircle2,
  Copy,
  ExternalLink,
  Shield,
  Layers,
  ArrowRight,
} from "lucide-react";

interface WalletOption {
  id: string;
  name: string;
  type: string;
  installed: boolean;
}

const WALLET_OPTIONS: WalletOption[] = [
  { id: "metamask", name: "MetaMask", type: "EVM & Snap", installed: true },
  { id: "walletconnect", name: "WalletConnect", type: "Mobile & QR", installed: true },
  { id: "coinbase", name: "Coinbase Wallet", type: "Smart Wallet", installed: true },
  { id: "ron_wallet", name: "RON Sovereign Wallet", type: "Native Enclave", installed: true },
  { id: "ledger", name: "Ledger Hardware", type: "USB / Bluetooth", installed: true },
];

export const WalletModal: React.FC = () => {
  const {
    isWalletModalOpen,
    setWalletModalOpen,
    isConnected,
    walletAddress,
    ronBalance,
    connectWallet,
    disconnectWallet,
    metrics,
  } = useRonStore();

  const [connectingId, setConnectingId] = useState<string | null>(null);
  const [connectStep, setConnectStep] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const handleConnect = async (id: string) => {
    setConnectingId(id);
    setConnectStep("CONNECTING TO ENCLAVE...");
    await new Promise((r) => setTimeout(r, 350));

    setConnectStep("REQUESTING CRYPTOGRAPHIC SIGNATURE...");
    await new Promise((r) => setTimeout(r, 450));

    setConnectStep("VERIFYING WITH 184 VALIDATORS...");
    await new Promise((r) => setTimeout(r, 400));

    connectWallet(id);
    setConnectingId(null);
    setConnectStep("");
  };

  const handleCopy = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Modal
      isOpen={isWalletModalOpen}
      onClose={() => setWalletModalOpen(false)}
      title={isConnected ? "Sovereign Account Profile" : "Connect Sovereign Web3 Wallet"}
      subtitle={
        isConnected
          ? "Connected to RON Mainnet v2.4"
          : "Select your preferred cryptographic key management provider"
      }
    >
      <div className="space-y-4 font-mono text-xs">
        {isConnected && walletAddress ? (
          /* Connected State */
          <div className="space-y-4">
            {/* Account Card (Surface Type D) */}
            <div className="p-4 surface-type-d space-y-3">
              <div className="flex items-center justify-between">
                <span className="mono-label text-[9px] uppercase text-ron-cyan font-bold">
                  ACTIVE SOVEREIGN ADDRESS
                </span>
                <span className="px-1.5 py-0.5 rounded-[2px] bg-ron-green/[0.08] text-ron-green text-[9px] font-bold">
                  VERIFIED
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white mono-data">
                  {formatAddress(walletAddress, 10, 8)}
                </span>
                <button
                  onClick={handleCopy}
                  className="p-1 rounded-[2px] bg-white/[0.04] hover:bg-white/10 text-ron-muted hover:text-white transition-colors"
                  title="Copy address"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Balances */}
              <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-xs">
                <span className="mono-label text-[9px]">RON BALANCE:</span>
                <span className="font-bold text-ron-cyan mono-data">
                  {ronBalance.toLocaleString()} RON ({formatCurrency(ronBalance * metrics.ronPrice, 2)})
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={disconnectWallet}
                className="w-full text-xs text-ron-red hover:border-ron-red/40"
              >
                DISCONNECT WALLET
              </Button>
            </div>
          </div>
        ) : (
          /* Wallet Selector List */
          <div className="space-y-2">
            {connectingId ? (
              <div className="p-8 surface-type-d text-center space-y-3">
                <span className="w-6 h-6 border-2 border-ron-cyan border-t-transparent rounded-full animate-spin mx-auto block" />
                <span className="text-white font-bold text-xs block">{connectStep}</span>
                <span className="text-ron-dim text-[10px]">Zero private keys transmitted</span>
              </div>
            ) : (
              WALLET_OPTIONS.map((w) => (
                <button
                  key={w.id}
                  onClick={() => handleConnect(w.id)}
                  className="w-full flex items-center justify-between p-3 surface-type-a hover:surface-type-b hover:border-ron-violet/50 transition-all text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-[4px] bg-black/60 border border-white/10 flex items-center justify-center text-ron-cyan group-hover:border-ron-cyan">
                      <Wallet className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-xs">{w.name}</h4>
                      <p className="text-[10px] text-ron-dim">{w.type}</p>
                    </div>
                  </div>

                  <ArrowRight className="w-3.5 h-3.5 text-ron-dim group-hover:text-ron-cyan group-hover:translate-x-0.5 transition-all" />
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};
