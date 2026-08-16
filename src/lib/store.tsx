"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  BlockData,
  TransactionData,
  ValidatorData,
  ProposalData,
  LiveMetrics,
  NotificationItem,
  TxType,
} from "./types";
import {
  INITIAL_METRICS,
  INITIAL_BLOCKS,
  INITIAL_TRANSACTIONS,
  VALIDATORS_LIST,
  PROPOSALS_LIST,
  DEMO_TOKENS,
} from "./mock-data";
import { generateRandomHash } from "./utils";

export type TransactionSimulationStage =
  | "IDLE"
  | "PREPARING"
  | "SIGNATURE"
  | "BROADCASTING"
  | "VALIDATING"
  | "FINALIZING"
  | "CONFIRMED"
  | "FAILED";

export interface TransactionReceipt {
  txHash: string;
  blockHeight: number;
  timestamp: number;
  gasFee: number;
  type: TxType;
  details?: Record<string, any>;
}

interface RonStoreContextType {
  metrics: LiveMetrics;
  blocks: BlockData[];
  transactions: TransactionData[];
  validators: ValidatorData[];
  proposals: ProposalData[];
  notifications: NotificationItem[];
  unreadNotificationCount: number;

  // Wallet
  isConnected: boolean;
  walletAddress: string | null;
  walletName: string | null;
  ronBalance: number;
  stakedBalance: number;
  tokenBalances: typeof DEMO_TOKENS;
  connectWallet: (walletName?: string) => Promise<void>;
  disconnectWallet: () => void;

  // UI Modals
  isCommandCenterOpen: boolean;
  setCommandCenterOpen: (open: boolean) => void;
  isWalletModalOpen: boolean;
  setWalletModalOpen: (open: boolean) => void;
  isNotificationOpen: boolean;
  setNotificationOpen: (open: boolean) => void;
  isDiagnosticsOpen: boolean;
  setDiagnosticsOpen: (open: boolean) => void;

  // Transaction simulation
  txStage: TransactionSimulationStage;
  activeTxReceipt: TransactionReceipt | null;
  resetTxStage: () => void;
  executeTransaction: (
    type: TxType,
    params: {
      fromAmount?: number;
      toAmount?: number;
      tokenFrom?: string;
      tokenTo?: string;
      validatorId?: string;
      durationDays?: number;
      proposalId?: string;
      voteChoice?: "YES" | "NO" | "ABSTAIN";
      recipient?: string;
    }
  ) => Promise<TransactionReceipt>;

  // Governance
  castVote: (proposalId: string, choice: "YES" | "NO" | "ABSTAIN") => Promise<void>;

  // Staking
  stakeRon: (amount: number, validatorId: string, durationDays: number) => Promise<TransactionReceipt>;
  unstakeRon: (amount: number) => Promise<TransactionReceipt>;
  claimStakingRewards: () => Promise<TransactionReceipt>;

  // Notifications
  addNotification: (title: string, description: string, type?: NotificationItem["type"]) => void;
  markNotificationsAsRead: () => void;
}

const RonStoreContext = createContext<RonStoreContextType | null>(null);

export function RonStoreProvider({ children }: { children: React.ReactNode }) {
  const [metrics, setMetrics] = useState<LiveMetrics>(INITIAL_METRICS);
  const [blocks, setBlocks] = useState<BlockData[]>(INITIAL_BLOCKS);
  const [transactions, setTransactions] = useState<TransactionData[]>(INITIAL_TRANSACTIONS);
  const [validators, setValidators] = useState<ValidatorData[]>(VALIDATORS_LIST);
  const [proposals, setProposals] = useState<ProposalData[]>(PROPOSALS_LIST);

  // Wallet
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletName, setWalletName] = useState<string | null>(null);
  const [ronBalance, setRonBalance] = useState<number>(12840.42);
  const [stakedBalance, setStakedBalance] = useState<number>(50000);
  const [tokenBalances, setTokenBalances] = useState(DEMO_TOKENS);

  // Modals
  const [isCommandCenterOpen, setCommandCenterOpen] = useState(false);
  const [isWalletModalOpen, setWalletModalOpen] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isDiagnosticsOpen, setDiagnosticsOpen] = useState(false);

  // Transaction simulation
  const [txStage, setTxStage] = useState<TransactionSimulationStage>("IDLE");
  const [activeTxReceipt, setActiveTxReceipt] = useState<TransactionReceipt | null>(null);

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "notif-1",
      title: "Staking Reward Distributed",
      description: "+24.85 RON credited from Apex Node Singapore validator delegation.",
      timestamp: Date.now() - 1000 * 60 * 12,
      type: "STAKE",
      read: false,
    },
    {
      id: "notif-2",
      title: "Governance Proposal Quorum Met",
      description: "RIP-024 (Validator Capacity) has achieved 88.4% quorum with 72% YES.",
      timestamp: Date.now() - 1000 * 60 * 45,
      type: "GOV",
      read: false,
    },
    {
      id: "notif-3",
      title: "Network Teleport Upgrade",
      description: "Zero-Knowledge EVM state relayer verified with sub-second finality.",
      timestamp: Date.now() - 1000 * 60 * 180,
      type: "SYSTEM",
      read: true,
    },
  ]);

  const addNotification = useCallback((title: string, description: string, type: NotificationItem["type"] = "SYSTEM") => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      title,
      description,
      timestamp: Date.now(),
      type,
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev.slice(0, 19)]);
  }, []);

  const markNotificationsAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  // Restore wallet connection on mount
  useEffect(() => {
    const saved = localStorage.getItem("ron_wallet_connected");
    if (saved === "true") {
      setIsConnected(true);
      setWalletAddress("0x72a819b208efbc912384a89012384f981238491f");
      setWalletName("RON Core Sovereign Wallet");
    }
  }, []);

  const connectWallet = async (name = "RON Sovereign Wallet") => {
    setIsConnected(true);
    setWalletAddress("0x72a819b208efbc912384a89012384f981238491f");
    setWalletName(name);
    localStorage.setItem("ron_wallet_connected", "true");
    setWalletModalOpen(false);
    addNotification("Wallet Connected", `Connected to ${name} (${"0x72a8...91f3"})`, "SECURITY");
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress(null);
    setWalletName(null);
    localStorage.removeItem("ron_wallet_connected");
    addNotification("Wallet Disconnected", "Sovereign session terminated.", "SECURITY");
  };

  // Keyboard shortcut for Command Center (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandCenterOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Real-time deterministic live simulation clock
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => {
        const priceDelta = (Math.random() - 0.48) * 0.006;
        const newPrice = Math.max(2.7, Number((prev.ronPrice + priceDelta).toFixed(4)));
        const tpsDelta = Math.floor((Math.random() - 0.5) * 80);
        const newTps = Math.min(13500, Math.max(12200, prev.currentTps + tpsDelta));
        const txDelta = Math.floor(Math.random() * 8) + 3;

        return {
          ...prev,
          ronPrice: newPrice,
          marketCap: Math.floor(newPrice * prev.circulatingSupply),
          currentTps: newTps,
          totalTransactions: prev.totalTransactions + txDelta,
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // New Block generator every 3.5 seconds
  useEffect(() => {
    const blockInterval = setInterval(() => {
      const randomVal = VALIDATORS_LIST[Math.floor(Math.random() * VALIDATORS_LIST.length)];
      const newHeight = metrics.blockHeight + 1;
      const newHash = generateRandomHash();

      const newBlock: BlockData = {
        height: newHeight,
        hash: newHash,
        parentHash: blocks[0]?.hash || generateRandomHash(),
        stateRoot: generateRandomHash(),
        timestamp: Date.now(),
        txCount: Math.floor(Math.random() * 250) + 280,
        validator: {
          name: randomVal.name,
          address: randomVal.address,
        },
        reward: 2.5,
        gasUsed: Math.floor(Math.random() * 6000000) + 10000000,
        gasLimit: 30000000,
        sizeBytes: Math.floor(Math.random() * 20000) + 75000,
      };

      setBlocks((prev) => [newBlock, ...prev.slice(0, 24)]);
      setMetrics((prev) => ({ ...prev, blockHeight: newHeight }));

      // Generate a simulated transaction for the new block
      const txTypes: TxType[] = ["TRANSFER", "SWAP", "STAKE", "VOTE", "BRIDGE", "MINT"];
      const randomType = txTypes[Math.floor(Math.random() * txTypes.length)];
      const randomValue =
        randomType === "TRANSFER"
          ? Math.floor(Math.random() * 5000) + 100
          : randomType === "SWAP"
          ? Math.floor(Math.random() * 2500) + 50
          : Math.floor(Math.random() * 10000) + 500;

      const newTx: TransactionData = {
        hash: generateRandomHash(),
        blockHeight: newHeight,
        timestamp: Date.now(),
        from: generateRandomHash().slice(0, 42),
        to: generateRandomHash().slice(0, 42),
        value: randomValue,
        tokenSymbol: randomType === "SWAP" ? (Math.random() > 0.5 ? "USDT" : "RON") : "RON",
        type: randomType,
        status: "SUCCESS",
        gasFee: Number((Math.random() * 0.001 + 0.0003).toFixed(5)),
        gasPriceGwei: 0.08,
        nonce: Math.floor(Math.random() * 500),
      };

      setTransactions((prev) => [newTx, ...prev.slice(0, 29)]);
    }, 3500);

    return () => clearInterval(blockInterval);
  }, [metrics.blockHeight, blocks]);

  const resetTxStage = () => {
    setTxStage("IDLE");
    setActiveTxReceipt(null);
  };

  // Generalized multi-stage transaction pipeline executor
  const executeTransaction = async (
    type: TxType,
    params: {
      fromAmount?: number;
      toAmount?: number;
      tokenFrom?: string;
      tokenTo?: string;
      validatorId?: string;
      durationDays?: number;
      proposalId?: string;
      voteChoice?: "YES" | "NO" | "ABSTAIN";
      recipient?: string;
    }
  ): Promise<TransactionReceipt> => {
    setTxStage("PREPARING");
    await new Promise((r) => setTimeout(r, 450));

    setTxStage("SIGNATURE");
    await new Promise((r) => setTimeout(r, 650));

    setTxStage("BROADCASTING");
    await new Promise((r) => setTimeout(r, 600));

    setTxStage("VALIDATING");
    await new Promise((r) => setTimeout(r, 550));

    setTxStage("FINALIZING");
    await new Promise((r) => setTimeout(r, 400));

    const receipt: TransactionReceipt = {
      txHash: generateRandomHash(),
      blockHeight: metrics.blockHeight + 1,
      timestamp: Date.now(),
      gasFee: 0.00042,
      type,
      details: params,
    };

    // Update balances and state based on type
    if (type === "SWAP" && params.fromAmount && params.toAmount) {
      if (params.tokenFrom === "USDT" && params.tokenTo === "RON") {
        setRonBalance((prev) => prev + (params.toAmount || 0));
      } else if (params.tokenFrom === "RON" && params.tokenTo === "USDT") {
        setRonBalance((prev) => Math.max(0, prev - (params.fromAmount || 0)));
      }
      addNotification(
        "Swap Executed",
        `Swapped ${params.fromAmount} ${params.tokenFrom} for ${params.toAmount?.toFixed(2)} ${params.tokenTo}.`,
        "TX"
      );
    } else if (type === "STAKE" && params.fromAmount) {
      setRonBalance((prev) => Math.max(0, prev - (params.fromAmount || 0)));
      setStakedBalance((prev) => prev + (params.fromAmount || 0));
      addNotification(
        "Staking Position Active",
        `Delegated ${params.fromAmount} RON for ${params.durationDays || 365} days.`,
        "STAKE"
      );
    } else if (type === "VOTE" && params.proposalId && params.voteChoice) {
      addNotification(
        "Vote Recorded",
        `Cast ${params.voteChoice} on proposal ${params.proposalId}.`,
        "GOV"
      );
    }

    setActiveTxReceipt(receipt);
    setTxStage("CONFIRMED");

    // Prepend to live transactions
    const newTx: TransactionData = {
      hash: receipt.txHash,
      blockHeight: receipt.blockHeight,
      timestamp: receipt.timestamp,
      from: walletAddress || "0x72a819b208efbc912384a89012384f981238491f",
      to: params.recipient || "0x000000000000000000000000000000000000755c",
      value: params.fromAmount || 0,
      tokenSymbol: params.tokenFrom || "RON",
      type,
      status: "SUCCESS",
      gasFee: receipt.gasFee,
      gasPriceGwei: 0.08,
      nonce: Math.floor(Math.random() * 900),
    };
    setTransactions((prev) => [newTx, ...prev]);

    return receipt;
  };

  const castVote = async (proposalId: string, choice: "YES" | "NO" | "ABSTAIN") => {
    await executeTransaction("VOTE", { proposalId, voteChoice: choice });
    setProposals((prev) =>
      prev.map((p) => {
        if (p.id === proposalId) {
          const newVotes = { ...p.votes };
          if (choice === "YES") newVotes.yes += 1;
          if (choice === "NO") newVotes.no += 1;
          if (choice === "ABSTAIN") newVotes.abstain += 1;
          return {
            ...p,
            votes: newVotes,
            userVoted: choice,
          };
        }
        return p;
      })
    );
  };

  const stakeRon = async (amount: number, validatorId: string, durationDays: number) => {
    return await executeTransaction("STAKE", {
      fromAmount: amount,
      validatorId,
      durationDays,
    });
  };

  const unstakeRon = async (amount: number) => {
    const receipt = await executeTransaction("TRANSFER", {
      fromAmount: amount,
      tokenFrom: "RON",
    });
    setStakedBalance((prev) => Math.max(0, prev - amount));
    setRonBalance((prev) => prev + amount);
    addNotification("Unstake Complete", `Withdrew ${amount} RON from delegation pool.`, "STAKE");
    return receipt;
  };

  const claimStakingRewards = async () => {
    const rewardAmount = 142.85;
    const receipt = await executeTransaction("TRANSFER", {
      toAmount: rewardAmount,
      tokenTo: "RON",
    });
    setRonBalance((prev) => prev + rewardAmount);
    addNotification("Rewards Claimed", `Claimed ${rewardAmount} RON in staking yield.`, "STAKE");
    return receipt;
  };

  return (
    <RonStoreContext.Provider
      value={{
        metrics,
        blocks,
        transactions,
        validators,
        proposals,
        notifications,
        unreadNotificationCount,
        isConnected,
        walletAddress,
        walletName,
        ronBalance,
        stakedBalance,
        tokenBalances,
        connectWallet,
        disconnectWallet,
        isCommandCenterOpen,
        setCommandCenterOpen,
        isWalletModalOpen,
        setWalletModalOpen,
        isNotificationOpen,
        setNotificationOpen,
        isDiagnosticsOpen,
        setDiagnosticsOpen,
        txStage,
        activeTxReceipt,
        resetTxStage,
        executeTransaction,
        castVote,
        stakeRon,
        unstakeRon,
        claimStakingRewards,
        addNotification,
        markNotificationsAsRead,
      }}
    >
      {children}
    </RonStoreContext.Provider>
  );
}

export function useRonStore() {
  const context = useContext(RonStoreContext);
  if (!context) {
    throw new Error("useRonStore must be used within a RonStoreProvider");
  }
  return context;
}
