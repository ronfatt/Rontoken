export interface LiveMetrics {
  ronPrice: number;
  price24hChange: number;
  marketCap: number;
  circulatingSupply: number;
  burnedRon: number;
  currentTps: number;
  peakTps?: number;
  blockHeight: number;
  epochNumber?: number;
  finalitySec: number;
  activeValidators: number;
  totalTransactions: number;
  avgGasGwei: number;
  networkUptime: number;
  tvl: number;
  holders?: number;
}

export interface BlockData {
  height: number;
  hash: string;
  parentHash: string;
  timestamp: number;
  txCount: number;
  gasUsed: number;
  gasLimit: number;
  gasUtilization?: number;
  validator: string | { name: string; address?: string };
  validatorId?: string;
  blockReward?: number;
  reward?: number;
  stateRoot: string;
  sizeBytes?: number;
  status?: "FINALIZED" | "SEALED" | "COMMITTED";
}

export type TxType =
  | "TRANSFER"
  | "SWAP"
  | "STAKE"
  | "UNSTAKE"
  | "CLAIM"
  | "VOTE"
  | "BRIDGE"
  | "MINT"
  | "APPROVE";

export interface TransactionData {
  hash: string;
  blockHeight: number;
  timestamp: number;
  from: string;
  to: string;
  value: number;
  tokenSymbol: string;
  type: TxType;
  networkFee?: number;
  gasFee?: number;
  gasPriceGwei?: number;
  gasUsed?: number;
  nonce?: number;
  confirmations?: number;
  inputData?: string;
  contractAddress?: string;
  logs?: Array<{ event: string; [key: string]: any }>;
  status: "SUCCESS" | "PENDING" | "FAILED";
  route?: string;
  metadata?: Record<string, any>;
}

export interface ValidatorData {
  id: string;
  name: string;
  location: string;
  city?: string;
  country?: string;
  totalStake: number;
  apr: number;
  uptime: number;
  commission: number;
  latencyMs: number;
  status: "ONLINE" | "SYNCED" | "VALIDATING" | "DEGRADED" | "ACTIVE";
  delegatorsCount?: number;
  delegators?: number;
  blocksProduced?: number;
  blocksValidated?: number;
  missedBlocks?: number;
  performanceScore?: number;
  performance?: number;
  nodeVersion?: string;
  version?: string;
  address?: string;
  risk: "LOW" | "MEDIUM" | "HIGH";
  coordinates?: [number, number];
}

export interface StakingPosition {
  id: string;
  validatorId: string;
  validatorName: string;
  amount: number;
  lockDays: number;
  apy: number;
  startDate: number;
  unlockDate: number;
  accruedRewards: number;
  status: "ACTIVE" | "UNSTAKING" | "UNLOCKED";
}

export interface ProposalData {
  id: string;
  title: string;
  category: "Network" | "Economics" | "Development" | "Grants" | "Security" | "Ecosystem";
  author: string;
  createdDate: string;
  closesIn: string;
  summary: string;
  body: string;
  quorumPercent: number;
  votes: {
    yes: number;
    no: number;
    abstain: number;
  };
  totalVotesCount?: number;
  discussionCount?: number;
  userVoted?: "YES" | "NO" | "ABSTAIN";
  status: "ACTIVE" | "PASSED" | "REJECTED";
}

export interface TokenAllocation {
  id: string;
  name: string;
  percentage: number;
  amount: number;
  released: number;
  locked: number;
  vestingPeriod: string;
  color: string;
  description?: string;
}

export interface GlobalNodeData {
  id: string;
  name?: string;
  city: string;
  country: string;
  type: "Validator" | "RPC" | "Bridge" | "Archive" | "Infrastructure";
  status: "ONLINE" | "OPTIMAL" | "STANDBY";
  latency?: number;
  latencyMs?: number;
  stake?: number;
  uptime: number;
  version?: string;
  performanceScore?: number;
  lastBlock?: number;
  coordinates: [number, number]; // [lat, lng]
}

export interface EcosystemProduct {
  id: string;
  name: string;
  category: "DeFi" | "Infrastructure" | "AI & Data" | "AI" | "Identity" | "Bridge" | "Governance" | "Developers" | string;
  tagline: string;
  description: string;
  status: "LIVE" | "TESTNET" | "DEPLOYED" | string;
  metrics: string;
  color: string;
  route: string;
}

export interface DemoToken {
  symbol: string;
  name: string;
  balance: number;
  price: number;
  icon?: string;
  change24h?: number;
}

export interface SystemNotification {
  id: string;
  title: string;
  description: string;
  type: "TX" | "SYSTEM" | "GOVERNANCE" | "STAKE" | "SWAP" | "SECURITY";
  timestamp: number;
  read: boolean;
  link?: string;
}

export interface SubsystemStatus {
  id: string;
  name: string;
  category: "Core" | "Protocol" | "API" | "Bridge";
  status: "OPERATIONAL" | "DEGRADED" | "MAINTENANCE";
  uptime90d: number;
  latencyMs: number;
  description: string;
}
