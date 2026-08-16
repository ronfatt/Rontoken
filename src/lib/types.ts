export type NetworkStatusType = 'ONLINE' | 'SYNCED' | 'VALIDATED' | 'PENDING' | 'SUCCESS' | 'FAILED' | 'WARNING' | 'OPTIMAL' | 'DEGRADED';

export interface BlockData {
  height: number;
  hash: string;
  parentHash: string;
  stateRoot: string;
  timestamp: number;
  txCount: number;
  validator: {
    name: string;
    address: string;
    avatar?: string;
  };
  reward: number; // e.g., 2.5 RON
  gasUsed: number;
  gasLimit: number;
  sizeBytes: number;
}

export type TxType = 'TRANSFER' | 'SWAP' | 'STAKE' | 'VOTE' | 'BRIDGE' | 'MINT' | 'CONTRACT_EXEC';
export type TxStatus = 'SUCCESS' | 'PENDING' | 'FAILED' | 'FINALIZING';

export interface TransactionData {
  hash: string;
  blockHeight: number;
  timestamp: number;
  from: string;
  to: string;
  value: number; // in RON or USD
  tokenSymbol: string;
  type: TxType;
  status: TxStatus;
  gasFee: number;
  gasPriceGwei: number;
  nonce: number;
  inputData?: string;
  contractAddress?: string;
  logs?: Array<{
    event: string;
    contract: string;
    params: Record<string, string | number>;
  }>;
}

export interface ValidatorData {
  id: string;
  name: string;
  address: string;
  location: string;
  coordinates: [number, number]; // [lat, lng]
  apr: number; // e.g. 14.8%
  totalStake: number; // RON
  commission: number; // %
  uptime: number; // 99.99%
  performance: number; // score 0-100
  risk: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'ACTIVE' | 'SYNCING' | 'INACTIVE';
  blocksValidated: number;
  version: string;
  latencyMs: number;
}

export interface ProposalData {
  id: string; // e.g. RIP-024
  title: string;
  category: 'Network' | 'Economics' | 'Development' | 'Grants' | 'Security' | 'Ecosystem';
  author: string;
  status: 'ACTIVE' | 'PASSED' | 'REJECTED' | 'EXECUTED';
  createdDate: string;
  closesIn: string; // "2D 14H 31M"
  summary: string;
  body: string;
  votes: {
    yes: number;
    no: number;
    abstain: number;
  };
  quorumPercent: number;
  userVoted?: 'YES' | 'NO' | 'ABSTAIN';
  discussionCount: number;
}

export interface TokenAllocation {
  id: string;
  name: string;
  percentage: number;
  amount: number; // in RON
  released: number;
  locked: number;
  vestingPeriod: string;
  description: string;
  color: string;
}

export interface GlobalNodeData {
  id: string;
  name: string;
  type: 'Validator' | 'RPC' | 'Archive' | 'Bridge' | 'Infrastructure';
  city: string;
  country: string;
  coordinates: [number, number];
  status: 'ONLINE' | 'SYNCING' | 'STANDBY';
  latencyMs: number;
  uptime: number;
  version: string;
  stake?: number;
  performanceScore: number;
  lastBlock: number;
}

export interface EcosystemProduct {
  id: string;
  name: string;
  tagline: string;
  category: 'DeFi' | 'Infrastructure' | 'Identity' | 'Governance' | 'AI' | 'Interoperability';
  description: string;
  metrics: string;
  route: string;
  status: 'LIVE' | 'BETA' | 'AUDITED';
  color: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: number;
  type: 'STAKE' | 'GOV' | 'TX' | 'SYSTEM' | 'SECURITY';
  read: boolean;
  link?: string;
}

export interface LiveMetrics {
  ronPrice: number;
  price24hChange: number;
  marketCap: number;
  tvl: number;
  holders: number;
  totalTransactions: number;
  currentTps: number;
  activeValidators: number;
  finalitySec: number;
  blockHeight: number;
  networkUptime: number;
  avgGasGwei: number;
  circulatingSupply: number;
  burnedRon: number;
}
