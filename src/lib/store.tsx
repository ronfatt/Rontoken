"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import {
  LiveMetrics,
  BlockData,
  TransactionData,
  ValidatorData,
  StakingPosition,
  ProposalData,
  SystemNotification,
  DemoToken,
  TxType,
} from "./types";
import {
  INITIAL_METRICS,
  INITIAL_BLOCKS,
  INITIAL_TRANSACTIONS,
  INITIAL_VALIDATORS,
  INITIAL_PROPOSALS,
  INITIAL_NOTIFICATIONS,
  DEMO_TOKENS,
} from "./mock-data";
import { generateRandomHash } from "./utils";

const STORAGE_KEY = "ron_ecosystem_demo_state_v4";

interface RonStoreContextType {
  // Network & Metrics
  metrics: LiveMetrics;
  blocks: BlockData[];
  transactions: TransactionData[];
  validators: ValidatorData[];
  proposals: ProposalData[];
  notifications: SystemNotification[];
  tokens: DemoToken[];
  stakingPositions: StakingPosition[];
  activeNetwork: "RON Mainnet" | "RON Testnet";
  setActiveNetwork: (net: "RON Mainnet" | "RON Testnet") => void;

  // Wallet
  isConnected: boolean;
  walletAddress: string;
  ronBalance: number;
  stakedBalance: number;
  totalVotingPower: number;
  portfolioValueUSD: number;
  connectWallet: (walletType?: string) => void;
  disconnectWallet: () => void;

  // Modals & UI States
  isWalletModalOpen: boolean;
  setWalletModalOpen: (open: boolean) => void;
  isCommandCenterOpen: boolean;
  setCommandCenterOpen: (open: boolean) => void;
  isNotificationOpen: boolean;
  setNotificationOpen: (open: boolean) => void;
  isDiagnosticsOpen: boolean;
  setDiagnosticsOpen: (open: boolean) => void;
  isSettingsOpen: boolean;
  setSettingsOpen: (open: boolean) => void;
  unreadNotificationCount: number;
  markNotificationsAsRead: () => void;

  // Transaction Execution Pipeline
  txStage: "IDLE" | "PREPARING" | "SIGNATURE" | "BROADCASTING" | "VALIDATING" | "FINALIZING" | "CONFIRMED" | "FAILED";
  activeTxReceipt: { txHash: string; blockHeight: number; fee: string } | null;
  executeTransaction: (
    type: TxType,
    payload: any
  ) => Promise<{ success: boolean; txHash?: string; error?: string }>;
  resetTxStage: () => void;

  // Direct Operations
  sendTokens: (
    toAddress: string,
    amount: number,
    tokenSymbol: string
  ) => Promise<{ success: boolean; txHash?: string; error?: string }>;
  swapTokens: (
    fromSymbol: string,
    toSymbol: string,
    fromAmount: number,
    toAmount: number
  ) => Promise<{ success: boolean; txHash?: string; error?: string }>;
  stakeRon: (
    amount: number,
    validatorId: string,
    durationDays?: number
  ) => Promise<{ success: boolean; txHash?: string; error?: string }>;
  unstakeRon: (
    positionIdOrAmount: string | number,
    amountToUnstake?: number
  ) => Promise<{ success: boolean; txHash?: string; error?: string }>;
  claimStakingRewards: () => Promise<{ success: boolean; txHash?: string; claimedAmount: number }>;
  castVote: (
    proposalId: string,
    choice: "YES" | "NO" | "ABSTAIN"
  ) => Promise<{ success: boolean; txHash?: string }>;

  // Search & Global State Management
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  resetDemoEnvironment: () => void;
}

const DEFAULT_WALLET_ADDRESS = "0x72A8F34C918B52E5A7710F93D13A91F3";

const RonStoreContext = createContext<RonStoreContextType | null>(null);

export const RonStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State variables with default initializations
  const [metrics, setMetrics] = useState<LiveMetrics>(INITIAL_METRICS);
  const [blocks, setBlocks] = useState<BlockData[]>(INITIAL_BLOCKS);
  const [transactions, setTransactions] = useState<TransactionData[]>(INITIAL_TRANSACTIONS);
  const [validators, setValidators] = useState<ValidatorData[]>(INITIAL_VALIDATORS);
  const [proposals, setProposals] = useState<ProposalData[]>(INITIAL_PROPOSALS);
  const [notifications, setNotifications] = useState<SystemNotification[]>(INITIAL_NOTIFICATIONS);
  const [tokens, setTokens] = useState<DemoToken[]>(DEMO_TOKENS);
  const [activeNetwork, setActiveNetwork] = useState<"RON Mainnet" | "RON Testnet">("RON Mainnet");

  // Wallet
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [walletAddress, setWalletAddress] = useState<string>(DEFAULT_WALLET_ADDRESS);

  // Staking Positions
  const [stakingPositions, setStakingPositions] = useState<StakingPosition[]>([
    {
      id: "pos-01",
      validatorId: "val-01",
      validatorName: "Apex SG Validator",
      amount: 1000,
      lockDays: 365,
      apy: 18.42,
      startDate: Date.now() - 30 * 86400000,
      unlockDate: Date.now() + 335 * 86400000,
      accruedRewards: 142.85,
      status: "ACTIVE",
    },
  ]);

  // Modals
  const [isWalletModalOpen, setWalletModalOpen] = useState(false);
  const [isCommandCenterOpen, setCommandCenterOpen] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isDiagnosticsOpen, setDiagnosticsOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Transaction Pipeline
  const [txStage, setTxStage] = useState<
    "IDLE" | "PREPARING" | "SIGNATURE" | "BROADCASTING" | "VALIDATING" | "FINALIZING" | "CONFIRMED" | "FAILED"
  >("IDLE");
  const [activeTxReceipt, setActiveTxReceipt] = useState<{
    txHash: string;
    blockHeight: number;
    fee: string;
  } | null>(null);

  // 1. Hydrate from localStorage once on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.tokens) setTokens(parsed.tokens);
        if (parsed.stakingPositions) setStakingPositions(parsed.stakingPositions);
        if (parsed.proposals) setProposals(parsed.proposals);
        if (parsed.transactions) setTransactions(parsed.transactions);
        if (parsed.notifications) setNotifications(parsed.notifications);
        if (parsed.walletAddress) setWalletAddress(parsed.walletAddress);
        if (typeof parsed.isConnected === "boolean") setIsConnected(parsed.isConnected);
        if (parsed.activeNetwork) setActiveNetwork(parsed.activeNetwork);
      }
    } catch (e) {
      console.warn("Could not load stored state, using defaults.");
    }
  }, []);

  // 2. Persist state changes to localStorage
  useEffect(() => {
    try {
      const stateToSave = {
        tokens,
        stakingPositions,
        proposals,
        transactions: transactions.slice(0, 40),
        notifications: notifications.slice(0, 30),
        walletAddress,
        isConnected,
        activeNetwork,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      // ignore storage errors
    }
  }, [tokens, stakingPositions, proposals, transactions, notifications, walletAddress, isConnected, activeNetwork]);

  // Derived balances
  const ronToken = useMemo(() => tokens.find((t) => t.symbol === "RON") || tokens[0], [tokens]);
  const ronBalance = ronToken ? ronToken.balance : 12840.42;

  const stakedBalance = useMemo(
    () =>
      stakingPositions
        .filter((p) => p.status === "ACTIVE" || p.status === "UNSTAKING")
        .reduce((sum, p) => sum + p.amount, 0),
    [stakingPositions]
  );

  const totalVotingPower = useMemo(
    () =>
      ronBalance +
      stakingPositions.reduce((sum, p) => sum + p.amount * (p.lockDays >= 365 ? 1.5 : 1.1), 0),
    [ronBalance, stakingPositions]
  );

  const portfolioValueUSD = useMemo(() => {
    return (
      tokens.reduce((acc, t) => {
        const price = t.symbol === "RON" ? metrics.ronPrice : t.price;
        return acc + t.balance * price;
      }, 0) +
      stakedBalance * metrics.ronPrice
    );
  }, [tokens, metrics.ronPrice, stakedBalance]);

  const unreadNotificationCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const markNotificationsAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  // 3. Live Simulation Engine: Micro Price & TPS fluctuations + deterministic block ticks
  useEffect(() => {
    const priceInterval = setInterval(() => {
      setMetrics((prev) => {
        const jitter = (Math.random() - 0.49) * 0.003;
        const newPrice = Math.max(1.5, +(prev.ronPrice + jitter).toFixed(4));
        const tpsJitter = Math.floor((Math.random() - 0.48) * 120);
        const newTps = Math.max(11500, Math.min(24000, prev.currentTps + tpsJitter));

        return {
          ...prev,
          ronPrice: newPrice,
          marketCap: Math.floor(newPrice * prev.circulatingSupply),
          currentTps: newTps,
          totalTransactions: prev.totalTransactions + Math.floor(newTps * 2.2),
        };
      });
    }, 2200);

    // Block generation interval (every 3.2s)
    const blockInterval = setInterval(() => {
      setMetrics((prev) => {
        const nextHeight = prev.blockHeight + 1;
        const randomVal = INITIAL_VALIDATORS[Math.floor(Math.random() * INITIAL_VALIDATORS.length)];
        const txCount = Math.floor(Math.random() * 80) + 140;
        const gasUsed = Math.floor(Math.random() * 8000000) + 12000000;

        const newBlock: BlockData = {
          height: nextHeight,
          hash: generateRandomHash(),
          parentHash: generateRandomHash(),
          timestamp: Date.now(),
          txCount,
          gasUsed,
          gasLimit: 30000000,
          gasUtilization: +(gasUsed / 30000000 * 100).toFixed(1),
          validator: randomVal.name,
          validatorId: randomVal.id,
          blockReward: +(Math.random() * 0.8 + 2.0).toFixed(2),
          stateRoot: generateRandomHash(),
          status: "FINALIZED",
        };

        setBlocks((prevBlocks) => [newBlock, ...prevBlocks.slice(0, 24)]);

        // Generate synthetic ambient transactions
        const randomTypes: TxType[] = ["TRANSFER", "SWAP", "STAKE", "VOTE", "BRIDGE", "MINT"];
        const chosenType = randomTypes[Math.floor(Math.random() * randomTypes.length)];
        const syntheticTx: TransactionData = {
          hash: generateRandomHash(),
          blockHeight: nextHeight,
          timestamp: Date.now(),
          from: generateRandomHash().slice(0, 42),
          to: generateRandomHash().slice(0, 42),
          value: +(Math.random() * 850 + 20).toFixed(2),
          tokenSymbol: chosenType === "SWAP" ? "USDT" : "RON",
          type: chosenType,
          networkFee: 0.00042,
          gasUsed: 42000,
          nonce: Math.floor(Math.random() * 400),
          confirmations: 1,
          status: "SUCCESS",
        };

        setTransactions((prevTxs) => [syntheticTx, ...prevTxs.slice(0, 49)]);

        return {
          ...prev,
          blockHeight: nextHeight,
          epochNumber: Math.floor(nextHeight / 1000),
        };
      });
    }, 3200);

    // Staking reward accumulation tick (every 5s)
    const rewardInterval = setInterval(() => {
      setStakingPositions((prev) =>
        prev.map((pos) => {
          if (pos.status !== "ACTIVE") return pos;
          const rewardGrowth = (pos.amount * (pos.apy / 100) * 5) / (365 * 86400);
          return {
            ...pos,
            accruedRewards: +(pos.accruedRewards + rewardGrowth).toFixed(5),
          };
        })
      );
    }, 5000);

    return () => {
      clearInterval(priceInterval);
      clearInterval(blockInterval);
      clearInterval(rewardInterval);
    };
  }, []);

  // Reset Demo Environment
  const resetDemoEnvironment = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setMetrics(INITIAL_METRICS);
    setBlocks(INITIAL_BLOCKS);
    setTransactions(INITIAL_TRANSACTIONS);
    setValidators(INITIAL_VALIDATORS);
    setProposals(INITIAL_PROPOSALS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setTokens(DEMO_TOKENS);
    setIsConnected(true);
    setWalletAddress(DEFAULT_WALLET_ADDRESS);
    setStakingPositions([
      {
        id: "pos-01",
        validatorId: "val-01",
        validatorName: "Apex SG Validator",
        amount: 1000,
        lockDays: 365,
        apy: 18.42,
        startDate: Date.now() - 30 * 86400000,
        unlockDate: Date.now() + 335 * 86400000,
        accruedRewards: 142.85,
        status: "ACTIVE",
      },
    ]);
  }, []);

  const connectWallet = useCallback((walletType: string = "MetaMask") => {
    setIsConnected(true);
    setWalletAddress(DEFAULT_WALLET_ADDRESS);
    setWalletModalOpen(false);

    const newNotif: SystemNotification = {
      id: `notif-${Date.now()}`,
      title: "Wallet Connected",
      description: `Connected to ${walletType} on ${DEFAULT_WALLET_ADDRESS.slice(0, 6)}...${DEFAULT_WALLET_ADDRESS.slice(-4)}`,
      type: "SYSTEM",
      timestamp: Date.now(),
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  }, []);

  const disconnectWallet = useCallback(() => {
    setIsConnected(false);
    setWalletModalOpen(false);
  }, []);

  const resetTxStage = useCallback(() => {
    setTxStage("IDLE");
    setActiveTxReceipt(null);
  }, []);

  // Generic 5-stage transaction execution pipeline
  const executeTransaction = useCallback(
    async (type: TxType, payload: any): Promise<{ success: boolean; txHash?: string; error?: string }> => {
      try {
        setTxStage("PREPARING");
        await new Promise((r) => setTimeout(r, 450));

        setTxStage("SIGNATURE");
        await new Promise((r) => setTimeout(r, 550));

        setTxStage("BROADCASTING");
        await new Promise((r) => setTimeout(r, 600));

        setTxStage("VALIDATING");
        await new Promise((r) => setTimeout(r, 650));

        setTxStage("FINALIZING");
        await new Promise((r) => setTimeout(r, 450));

        const newHash = generateRandomHash();
        const currentHeight = metrics.blockHeight;

        const newTx: TransactionData = {
          hash: newHash,
          blockHeight: currentHeight,
          timestamp: Date.now(),
          from: walletAddress,
          to: payload.toAddress || "0x9812A...DEXRouter",
          value: payload.amount || payload.fromAmount || 0,
          tokenSymbol: payload.tokenSymbol || payload.tokenFrom || "RON",
          type,
          networkFee: 0.00042,
          gasUsed: 42000,
          nonce: Math.floor(Math.random() * 900) + 1,
          confirmations: 1,
          status: "SUCCESS",
          metadata: payload,
        };

        setTransactions((prev) => [newTx, ...prev]);
        setActiveTxReceipt({
          txHash: newHash,
          blockHeight: currentHeight,
          fee: "$0.08 (~0.00042 RON)",
        });
        setTxStage("CONFIRMED");

        // Notification
        const notif: SystemNotification = {
          id: `notif-${Date.now()}`,
          title: `${type} Transaction Sealed`,
          description: `Hash: ${newHash.slice(0, 10)}... in Block #${currentHeight}`,
          type: "TX",
          timestamp: Date.now(),
          read: false,
          link: `/explorer/tx/${newHash}`,
        };
        setNotifications((prev) => [notif, ...prev]);

        return { success: true, txHash: newHash };
      } catch (err: any) {
        setTxStage("FAILED");
        return { success: false, error: err.message || "Transaction rejected" };
      }
    },
    [metrics.blockHeight, walletAddress]
  );

  // Send tokens with balance deduction
  const sendTokens = useCallback(
    async (toAddress: string, amount: number, tokenSymbol: string) => {
      const token = tokens.find((t) => t.symbol === tokenSymbol);
      if (!token || token.balance < amount) {
        return { success: false, error: `Insufficient ${tokenSymbol} balance.` };
      }

      const res = await executeTransaction("TRANSFER", {
        toAddress,
        amount,
        tokenSymbol,
      });

      if (res.success) {
        setTokens((prev) =>
          prev.map((t) =>
            t.symbol === tokenSymbol
              ? { ...t, balance: +(t.balance - amount - (tokenSymbol === "RON" ? 0.00042 : 0)).toFixed(4) }
              : t
          )
        );
      }

      return res;
    },
    [tokens, executeTransaction]
  );

  // Swap tokens with balance mutation
  const swapTokens = useCallback(
    async (fromSymbol: string, toSymbol: string, fromAmount: number, toAmount: number) => {
      const fromTok = tokens.find((t) => t.symbol === fromSymbol);
      if (!fromTok || fromTok.balance < fromAmount) {
        return { success: false, error: `Insufficient ${fromSymbol} balance.` };
      }

      const res = await executeTransaction("SWAP", {
        fromAmount,
        toAmount,
        tokenFrom: fromSymbol,
        tokenTo: toSymbol,
      });

      if (res.success) {
        setTokens((prev) =>
          prev.map((t) => {
            if (t.symbol === fromSymbol) {
              return { ...t, balance: +(t.balance - fromAmount).toFixed(4) };
            }
            if (t.symbol === toSymbol) {
              return { ...t, balance: +(t.balance + toAmount).toFixed(4) };
            }
            return t;
          })
        );
      }

      return res;
    },
    [tokens, executeTransaction]
  );

  // Stake RON with position creation
  const stakeRon = useCallback(
    async (amount: number, validatorId: string, durationDays: number = 365) => {
      if (ronBalance < amount) {
        return { success: false, error: "Insufficient liquid RON balance to stake." };
      }

      const val = validators.find((v) => v.id === validatorId) || validators[0];
      const apy = durationDays >= 365 ? 18.42 : durationDays >= 180 ? 14.6 : durationDays >= 90 ? 10.2 : 7.4;

      const res = await executeTransaction("STAKE", {
        amount,
        validatorId,
        validatorName: val.name,
        durationDays,
      });

      if (res.success) {
        // Deduct RON balance
        setTokens((prev) =>
          prev.map((t) =>
            t.symbol === "RON" ? { ...t, balance: +(t.balance - amount).toFixed(4) } : t
          )
        );

        // Add Staking Position
        const newPos: StakingPosition = {
          id: `pos-${Date.now()}`,
          validatorId: val.id,
          validatorName: val.name,
          amount,
          lockDays: durationDays,
          apy,
          startDate: Date.now(),
          unlockDate: Date.now() + durationDays * 86400000,
          accruedRewards: 0,
          status: "ACTIVE",
        };
        setStakingPositions((prev) => [newPos, ...prev]);
      }

      return res;
    },
    [ronBalance, validators, executeTransaction]
  );

  // Unstake RON
  const unstakeRon = useCallback(
    async (positionIdOrAmount: string | number, amountToUnstake?: number) => {
      let amount = 0;
      if (typeof positionIdOrAmount === "number") {
        amount = positionIdOrAmount;
      } else {
        const pos = stakingPositions.find((p) => p.id === positionIdOrAmount);
        amount = amountToUnstake || pos?.amount || 0;
      }

      if (stakedBalance < amount || amount <= 0) {
        return { success: false, error: "Invalid unstake amount or insufficient staked balance." };
      }

      const res = await executeTransaction("UNSTAKE", { amount });

      if (res.success) {
        // Return RON to wallet
        setTokens((prev) =>
          prev.map((t) =>
            t.symbol === "RON" ? { ...t, balance: +(t.balance + amount).toFixed(4) } : t
          )
        );

        // Update positions
        setStakingPositions((prev) => {
          let remaining = amount;
          return prev
            .map((pos) => {
              if (remaining <= 0) return pos;
              if (pos.amount <= remaining) {
                remaining -= pos.amount;
                return null;
              } else {
                const updated = { ...pos, amount: +(pos.amount - remaining).toFixed(4) };
                remaining = 0;
                return updated;
              }
            })
            .filter(Boolean) as StakingPosition[];
        });
      }

      return res;
    },
    [stakedBalance, stakingPositions, executeTransaction]
  );

  // Claim staking rewards
  const claimStakingRewards = useCallback(async () => {
    const totalClaimable = stakingPositions.reduce((sum, p) => sum + p.accruedRewards, 0);
    if (totalClaimable <= 0) {
      return { success: false, claimedAmount: 0 };
    }

    const res = await executeTransaction("CLAIM", { amount: totalClaimable });
    if (res.success) {
      // Credit to RON balance
      setTokens((prev) =>
        prev.map((t) =>
          t.symbol === "RON" ? { ...t, balance: +(t.balance + totalClaimable).toFixed(4) } : t
        )
      );

      // Reset accrued rewards
      setStakingPositions((prev) => prev.map((p) => ({ ...p, accruedRewards: 0 })));
    }

    return { success: true, claimedAmount: totalClaimable };
  }, [stakingPositions, executeTransaction]);

  // Cast vote on proposal
  const castVote = useCallback(
    async (proposalId: string, choice: "YES" | "NO" | "ABSTAIN") => {
      const res = await executeTransaction("VOTE", { proposalId, choice });
      if (res.success) {
        setProposals((prev) =>
          prev.map((p) => {
            if (p.id !== proposalId) return p;
            const updatedVotes = { ...p.votes };
            if (choice === "YES") updatedVotes.yes = Math.min(99, updatedVotes.yes + 1);
            if (choice === "NO") updatedVotes.no = Math.min(99, updatedVotes.no + 1);
            if (choice === "ABSTAIN") updatedVotes.abstain = Math.min(99, updatedVotes.abstain + 1);

            return {
              ...p,
              votes: updatedVotes,
              userVoted: choice,
              totalVotesCount: (p.totalVotesCount || 1420) + 1,
            };
          })
        );
      }
      return res;
    },
    [executeTransaction]
  );

  const contextValue = useMemo<RonStoreContextType>(
    () => ({
      metrics,
      blocks,
      transactions,
      validators,
      proposals,
      notifications,
      tokens,
      stakingPositions,
      activeNetwork,
      setActiveNetwork,
      isConnected,
      walletAddress,
      ronBalance,
      stakedBalance,
      totalVotingPower,
      portfolioValueUSD,
      connectWallet,
      disconnectWallet,
      isWalletModalOpen,
      setWalletModalOpen,
      isCommandCenterOpen,
      setCommandCenterOpen,
      isNotificationOpen,
      setNotificationOpen,
      isDiagnosticsOpen,
      setDiagnosticsOpen,
      isSettingsOpen,
      setSettingsOpen,
      unreadNotificationCount,
      markNotificationsAsRead,
      txStage,
      activeTxReceipt,
      executeTransaction,
      resetTxStage,
      sendTokens,
      swapTokens,
      stakeRon,
      unstakeRon,
      claimStakingRewards,
      castVote,
      searchQuery,
      setSearchQuery,
      resetDemoEnvironment,
    }),
    [
      metrics,
      blocks,
      transactions,
      validators,
      proposals,
      notifications,
      tokens,
      stakingPositions,
      activeNetwork,
      isConnected,
      walletAddress,
      ronBalance,
      stakedBalance,
      totalVotingPower,
      portfolioValueUSD,
      connectWallet,
      disconnectWallet,
      isWalletModalOpen,
      isCommandCenterOpen,
      isNotificationOpen,
      isDiagnosticsOpen,
      isSettingsOpen,
      unreadNotificationCount,
      markNotificationsAsRead,
      txStage,
      activeTxReceipt,
      executeTransaction,
      resetTxStage,
      sendTokens,
      swapTokens,
      stakeRon,
      unstakeRon,
      claimStakingRewards,
      castVote,
      searchQuery,
      resetDemoEnvironment,
    ]
  );

  return <RonStoreContext.Provider value={contextValue}>{children}</RonStoreContext.Provider>;
};

export const useRonStore = () => {
  const context = useContext(RonStoreContext);
  if (!context) {
    throw new Error("useRonStore must be used within a RonStoreProvider");
  }
  return context;
};
