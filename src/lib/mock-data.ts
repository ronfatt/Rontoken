import {
  BlockData,
  TransactionData,
  ValidatorData,
  ProposalData,
  TokenAllocation,
  GlobalNodeData,
  EcosystemProduct,
  LiveMetrics,
} from "./types";

export const INITIAL_METRICS: LiveMetrics = {
  ronPrice: 2.847,
  price24hChange: 12.48,
  marketCap: 1840000000,
  tvl: 428400000,
  holders: 384291,
  totalTransactions: 984210482,
  currentTps: 12842,
  activeValidators: 184,
  finalitySec: 0.42,
  blockHeight: 24893441,
  networkUptime: 99.998,
  avgGasGwei: 0.08,
  circulatingSupply: 646200000,
  burnedRon: 14280910,
};

export const INITIAL_BLOCKS: BlockData[] = [
  {
    height: 24893441,
    hash: "0x89f41b9c4d28e7a031952fbc9821a7df39218d098e918bcde765a0b9821e9124",
    parentHash: "0x3e18a90184b912f7ca8912e750198adfb12759182390aefbc7819028471e9821",
    stateRoot: "0x9182abcf12389104812ef90123847a9812903847192837491028374619283746",
    timestamp: Date.now() - 2000,
    txCount: 412,
    validator: {
      name: "Apex Node Singapore",
      address: "0x72a819b208efbc912384a89012384f981238491f",
    },
    reward: 2.5,
    gasUsed: 14820941,
    gasLimit: 30000000,
    sizeBytes: 84210,
  },
  {
    height: 24893440,
    hash: "0x3e18a90184b912f7ca8912e750198adfb12759182390aefbc7819028471e9821",
    parentHash: "0x5109283746192837461928374619283746192837461928374619283746192837",
    stateRoot: "0x1298471928374619283746192837461928374619283746192837461928374619",
    timestamp: Date.now() - 5000,
    txCount: 389,
    validator: {
      name: "CyberCore Frankfurt",
      address: "0x98124fa981273948719238471928374918273948",
    },
    reward: 2.5,
    gasUsed: 12904812,
    gasLimit: 30000000,
    sizeBytes: 79140,
  },
  {
    height: 24893439,
    hash: "0x5109283746192837461928374619283746192837461928374619283746192837",
    parentHash: "0x8812904812903847192837461928374619283746192837461928374619283746",
    stateRoot: "0x7728192837461928374619283746192837461928374619283746192837461928",
    timestamp: Date.now() - 8000,
    txCount: 456,
    validator: {
      name: "Quantum Relay Tokyo",
      address: "0x3819273948172938471928374918273948172938",
    },
    reward: 2.5,
    gasUsed: 16840129,
    gasLimit: 30000000,
    sizeBytes: 92840,
  },
  {
    height: 24893438,
    hash: "0x8812904812903847192837461928374619283746192837461928374619283746",
    parentHash: "0x1102938471928374619283746192837461928374619283746192837461928374",
    stateRoot: "0x6619283746192837461928374619283746192837461928374619283746192837",
    timestamp: Date.now() - 11000,
    txCount: 312,
    validator: {
      name: "Nexus San Francisco",
      address: "0x1928374918273948172938471928374918273948",
    },
    reward: 2.5,
    gasUsed: 9840120,
    gasLimit: 30000000,
    sizeBytes: 68120,
  },
  {
    height: 24893437,
    hash: "0x1102938471928374619283746192837461928374619283746192837461928374",
    parentHash: "0x4491827394817293847192837491827394817293847192837491827394817293",
    stateRoot: "0x5519283746192837461928374619283746192837461928374619283746192837",
    timestamp: Date.now() - 14000,
    txCount: 428,
    validator: {
      name: "Vanguard London",
      address: "0x4819273948172938471928374918273948172938",
    },
    reward: 2.5,
    gasUsed: 15120980,
    gasLimit: 30000000,
    sizeBytes: 88400,
  },
];

export const INITIAL_TRANSACTIONS: TransactionData[] = [
  {
    hash: "0x7f4819a82b9012384f9812739481928374918273948172938471928374918273",
    blockHeight: 24893441,
    timestamp: Date.now() - 1000,
    from: "0x72a819b208efbc912384a89012384f981238491f",
    to: "0x3819273948172938471928374918273948172938",
    value: 12500,
    tokenSymbol: "RON",
    type: "TRANSFER",
    status: "SUCCESS",
    gasFee: 0.00042,
    gasPriceGwei: 0.08,
    nonce: 142,
    inputData: "0x",
  },
  {
    hash: "0x91b2837461928374619283746192837461928374619283746192837461928374",
    blockHeight: 24893441,
    timestamp: Date.now() - 2500,
    from: "0x8849182739481729384719283749182739481729",
    to: "0x000000000000000000000000000000000000755c", // RON Swap Router
    value: 1000,
    tokenSymbol: "USDT",
    type: "SWAP",
    status: "SUCCESS",
    gasFee: 0.00184,
    gasPriceGwei: 0.08,
    nonce: 88,
    contractAddress: "0x000000000000000000000000000000000000755c",
    logs: [
      {
        event: "SwapExecuted",
        contract: "RON DEX Pool v2",
        params: { inputAmount: "1000 USDT", outputAmount: "351.28 RON", fee: "0.08 USD" },
      },
    ],
  },
  {
    hash: "0x2291827394817293847192837491827394817293847192837491827394817293",
    blockHeight: 24893440,
    timestamp: Date.now() - 4000,
    from: "0x1290384719283746192837461928374619283746",
    to: "0x00000000000000000000000000000000000057ac", // RON Staking Hub
    value: 50000,
    tokenSymbol: "RON",
    type: "STAKE",
    status: "SUCCESS",
    gasFee: 0.00095,
    gasPriceGwei: 0.08,
    nonce: 31,
    contractAddress: "0x00000000000000000000000000000000000057ac",
    logs: [
      {
        event: "DelegatedStake",
        contract: "RON Staking Engine",
        params: { validator: "Apex Node Singapore", durationDays: 365, apr: "18.42%" },
      },
    ],
  },
  {
    hash: "0x6619283746192837461928374619283746192837461928374619283746192837",
    blockHeight: 24893440,
    timestamp: Date.now() - 6000,
    from: "0x5519283746192837461928374619283746192837",
    to: "0x000000000000000000000000000000000000da00", // RON Governance DAO
    value: 0,
    tokenSymbol: "RON",
    type: "VOTE",
    status: "SUCCESS",
    gasFee: 0.00031,
    gasPriceGwei: 0.08,
    nonce: 19,
    contractAddress: "0x000000000000000000000000000000000000da00",
    logs: [
      {
        event: "VoteCast",
        contract: "RON DAO Governor",
        params: { proposalId: "RIP-024", support: "YES", weight: "128400 RON" },
      },
    ],
  },
  {
    hash: "0x3348192739481729384719283749182739481729384719283749182739481729",
    blockHeight: 24893439,
    timestamp: Date.now() - 8500,
    from: "0x9918273948172938471928374918273948172938",
    to: "0x000000000000000000000000000000000000b81d", // RON Teleport Bridge
    value: 3.5,
    tokenSymbol: "ETH",
    type: "BRIDGE",
    status: "SUCCESS",
    gasFee: 0.0024,
    gasPriceGwei: 0.08,
    nonce: 55,
    contractAddress: "0x000000000000000000000000000000000000b81d",
  },
  {
    hash: "0x8891827394817293847192837491827394817293847192837491827394817293",
    blockHeight: 24893438,
    timestamp: Date.now() - 11000,
    from: "0x4419283746192837461928374619283746192837",
    to: "0x7719283746192837461928374619283746192837",
    value: 8400,
    tokenSymbol: "RON",
    type: "TRANSFER",
    status: "SUCCESS",
    gasFee: 0.00042,
    gasPriceGwei: 0.08,
    nonce: 64,
  },
  {
    hash: "0xaa19283746192837461928374619283746192837461928374619283746192837",
    blockHeight: 24893437,
    timestamp: Date.now() - 13500,
    from: "0x2219283746192837461928374619283746192837",
    to: "0x0000000000000000000000000000000000001d00", // RON ID Registry
    value: 25,
    tokenSymbol: "RON",
    type: "MINT",
    status: "SUCCESS",
    gasFee: 0.0012,
    gasPriceGwei: 0.08,
    nonce: 12,
  },
];

export const VALIDATORS_LIST: ValidatorData[] = [
  {
    id: "val-01",
    name: "Apex Node Singapore",
    address: "0x72a819b208efbc912384a89012384f981238491f",
    location: "Singapore, SG",
    coordinates: [1.3521, 103.8198],
    apr: 18.42,
    totalStake: 42800000,
    commission: 1.5,
    uptime: 99.999,
    performance: 99.8,
    risk: "LOW",
    status: "ACTIVE",
    blocksValidated: 489210,
    version: "v2.4.1",
    latencyMs: 14,
  },
  {
    id: "val-02",
    name: "CyberCore Frankfurt",
    address: "0x98124fa981273948719238471928374918273948",
    location: "Frankfurt, Germany",
    coordinates: [50.1109, 8.6821],
    apr: 17.95,
    totalStake: 38200000,
    commission: 2.0,
    uptime: 99.998,
    performance: 99.6,
    risk: "LOW",
    status: "ACTIVE",
    blocksValidated: 421094,
    version: "v2.4.1",
    latencyMs: 18,
  },
  {
    id: "val-03",
    name: "Quantum Relay Tokyo",
    address: "0x3819273948172938471928374918273948172938",
    location: "Tokyo, Japan",
    coordinates: [35.6762, 139.6503],
    apr: 18.15,
    totalStake: 35100000,
    commission: 1.8,
    uptime: 99.997,
    performance: 99.4,
    risk: "LOW",
    status: "ACTIVE",
    blocksValidated: 398412,
    version: "v2.4.0",
    latencyMs: 22,
  },
  {
    id: "val-04",
    name: "Nexus San Francisco",
    address: "0x1928374918273948172938471928374918273948",
    location: "San Francisco, USA",
    coordinates: [37.7749, -122.4194],
    apr: 17.8,
    totalStake: 31900000,
    commission: 2.2,
    uptime: 99.995,
    performance: 99.1,
    risk: "LOW",
    status: "ACTIVE",
    blocksValidated: 354120,
    version: "v2.4.1",
    latencyMs: 26,
  },
  {
    id: "val-05",
    name: "Vanguard London",
    address: "0x4819273948172938471928374918273948172938",
    location: "London, UK",
    coordinates: [51.5074, -0.1278],
    apr: 18.05,
    totalStake: 29400000,
    commission: 1.9,
    uptime: 99.996,
    performance: 99.3,
    risk: "LOW",
    status: "ACTIVE",
    blocksValidated: 312984,
    version: "v2.4.1",
    latencyMs: 19,
  },
  {
    id: "val-06",
    name: "Solaris Dubai",
    address: "0x5519283746192837461928374619283746192837",
    location: "Dubai, UAE",
    coordinates: [25.2048, 55.2708],
    apr: 18.25,
    totalStake: 26800000,
    commission: 1.6,
    uptime: 99.998,
    performance: 99.5,
    risk: "LOW",
    status: "ACTIVE",
    blocksValidated: 284192,
    version: "v2.4.1",
    latencyMs: 21,
  },
  {
    id: "val-07",
    name: "Seoul Genesis",
    address: "0x7719283746192837461928374619283746192837",
    location: "Seoul, South Korea",
    coordinates: [37.5665, 126.978],
    apr: 17.9,
    totalStake: 24100000,
    commission: 2.0,
    uptime: 99.994,
    performance: 98.9,
    risk: "LOW",
    status: "ACTIVE",
    blocksValidated: 261094,
    version: "v2.4.0",
    latencyMs: 25,
  },
  {
    id: "val-08",
    name: "Gotham Sentinel New York",
    address: "0x8819283746192837461928374619283746192837",
    location: "New York, USA",
    coordinates: [40.7128, -74.006],
    apr: 17.65,
    totalStake: 22500000,
    commission: 2.5,
    uptime: 99.991,
    performance: 98.7,
    risk: "MEDIUM",
    status: "ACTIVE",
    blocksValidated: 241908,
    version: "v2.4.1",
    latencyMs: 28,
  },
];

export const PROPOSALS_LIST: ProposalData[] = [
  {
    id: "RIP-024",
    title: "Increase Validator Capacity & Dynamic Gas Elasticity",
    category: "Network",
    author: "0x72a8...91f3 (Core Architecture DAO)",
    status: "ACTIVE",
    createdDate: "2026-08-14",
    closesIn: "2D 14H 31M",
    summary:
      "Expands active validator set from 184 to 256 nodes and adjusts base block gas target to sustain 25,000 TPS under surge loads without fee inflation.",
    body: `### Summary
This proposal provisions an expansion of the active consensus set on the RON Network to accelerate decentralization and reduce round-trip finality below 0.35 seconds.

### Technical Specification
1. Update consensus parameter \`MAX_ACTIVE_VALIDATORS\` from 184 to 256.
2. Introduce dynamic state elasticity target to allow block sizes up to 45M gas during high congestion windows.
3. Validator slash thresholds remain calibrated at 5.0% for double-signing and 0.1% for 1,000 consecutive missed slots.

### Impact Analysis
- Expected TPS capacity increase: +45%
- Quorum finality reduction: ~70ms
- Network security budget increase: +$110M equivalent staked TVL.`,
    votes: {
      yes: 72,
      no: 18,
      abstain: 10,
    },
    quorumPercent: 88.4,
    discussionCount: 64,
  },
  {
    id: "RIP-025",
    title: "RON Ecosystem Innovation Grant Program (Season 4)",
    category: "Grants",
    author: "0x9812...3948 (Ecosystem Council)",
    status: "ACTIVE",
    createdDate: "2026-08-12",
    closesIn: "4D 08H 15M",
    summary:
      "Allocation of 15,000,000 RON from the ecosystem treasury to fund institutional DeFi primitives, zero-knowledge identity, and autonomous AI agents.",
    body: `### Overview
Season 4 grants focus on mission-critical developer tools, confidential computing modules, and cross-chain liquidity anchors.

### Funding Breakdown
- Institutional DeFi: 5,000,000 RON
- Decentralized Identity & ZK: 4,000,000 RON
- Autonomous AI Agents: 3,500,000 RON
- Developer SDK & Tooling: 2,500,000 RON`,
    votes: {
      yes: 89,
      no: 6,
      abstain: 5,
    },
    quorumPercent: 92.1,
    discussionCount: 42,
  },
  {
    id: "RIP-026",
    title: "Teleport Bridge v3: Native Zero-Knowledge EVM State Prover",
    category: "Development",
    author: "0x3819...2938 (Bridge Working Group)",
    status: "ACTIVE",
    createdDate: "2026-08-10",
    closesIn: "1D 02H 45M",
    summary:
      "Integrates light client ZK-SNARK verifiers directly into the RON Chain core, enabling trustless 2-second cross-chain bridge settlement with Ethereum and Solana.",
    body: `### Architecture
Replaces multi-sig validator relayers with mathematically verified ZK state proofs generated directly from source chain headers.

### Security Guarantees
Eliminates trusted custodian risk. Maximum cross-chain bridge security parity with underlying L1 consensus.`,
    votes: {
      yes: 94,
      no: 3,
      abstain: 3,
    },
    quorumPercent: 95.8,
    discussionCount: 89,
  },
  {
    id: "RIP-027",
    title: "Validator Reward Curve Adjustment for Long-Term Delegators",
    category: "Economics",
    author: "0x1928...3948 (Economics Committee)",
    status: "ACTIVE",
    createdDate: "2026-08-08",
    closesIn: "5D 19H 20M",
    summary:
      "Implements a time-weighted reward multiplier scaling up to 1.35x for delegators locking their stake for 365 days or longer.",
    body: `### Economic Motivation
Incentivizes long-term economic alignment and reduces circulating float volatility during macro swings.`,
    votes: {
      yes: 68,
      no: 24,
      abstain: 8,
    },
    quorumPercent: 79.3,
    discussionCount: 31,
  },
];

export const TOKEN_ALLOCATIONS: TokenAllocation[] = [
  {
    id: "eco",
    name: "Ecosystem & Grants",
    percentage: 35,
    amount: 350000000,
    released: 175000000,
    locked: 175000000,
    vestingPeriod: "48 months linear",
    description: "Incentivizing builders, liquidity growth, and partner protocol onboarding.",
    color: "#755CFF",
  },
  {
    id: "comm",
    name: "Community & Staking",
    percentage: 25,
    amount: 250000000,
    released: 180000000,
    locked: 70000000,
    vestingPeriod: "Continuous epoch emissions",
    description: "Validator security rewards, delegator yields, and governance participation.",
    color: "#00DFF7",
  },
  {
    id: "liq",
    name: "Liquidity & Markets",
    percentage: 15,
    amount: 150000000,
    released: 150000000,
    locked: 0,
    vestingPeriod: "100% unlocked at genesis",
    description: "Deep cross-chain liquidity, DEX pool reserves, and institutional market making.",
    color: "#9DFF57",
  },
  {
    id: "val",
    name: "Validator Security Reserve",
    percentage: 10,
    amount: 100000000,
    released: 60000000,
    locked: 40000000,
    vestingPeriod: "36 months with slashing cushion",
    description: "Decentralized physical infrastructure network hardware and uptime collateral.",
    color: "#FFB84D",
  },
  {
    id: "dev",
    name: "Core Development",
    percentage: 10,
    amount: 100000000,
    released: 45000000,
    locked: 55000000,
    vestingPeriod: "4-year cliff + 24-month linear",
    description: "Long-term R&D, cryptographic audit engineering, and core client development.",
    color: "#FF4D67",
  },
  {
    id: "treasury",
    name: "DAO Treasury",
    percentage: 5,
    amount: 50000000,
    released: 36200000,
    locked: 13800000,
    vestingPeriod: "Governed via DAO RIPs",
    description: "Strategic reserve controlled directly by token holder voting.",
    color: "#E2E8F0",
  },
];

export const ECOSYSTEM_PRODUCTS: EcosystemProduct[] = [
  {
    id: "ron-swap",
    name: "RON Swap",
    tagline: "Sub-second decentralized execution engine",
    category: "DeFi",
    description: "Institutional order routing with near-zero slippage, MEV protection, and multi-asset pools.",
    metrics: "$182M Daily Volume • 0.03% Slippage",
    route: "/swap",
    status: "LIVE",
    color: "#755CFF",
  },
  {
    id: "ron-stake",
    name: "RON Stake",
    tagline: "Liquid & delegated network validation",
    category: "Infrastructure",
    description: "Stake RON with top global tier-1 validators to earn up to 18.42% APY while securing consensus.",
    metrics: "428M RON Staked • 18.42% Max APY",
    route: "/stake",
    status: "LIVE",
    color: "#00DFF7",
  },
  {
    id: "ron-ai",
    name: "RON Intelligence",
    tagline: "Autonomous on-chain cognitive agent",
    category: "AI",
    description: "Deep neural network analyzing live mempool flows, liquidity risks, anomaly vectors, and smart contract health.",
    metrics: "12.8K TPS Monitored • 99.98% Anomaly Catch",
    route: "/intelligence",
    status: "LIVE",
    color: "#9DFF57",
  },
  {
    id: "ron-dao",
    name: "RON Governance",
    tagline: "Decentralized economic steering",
    category: "Governance",
    description: "Direct on-chain parameter voting, treasury budget execution, and validator whitelist curation.",
    metrics: "88.4% Average Turnout • 24 Passed RIPs",
    route: "/governance",
    status: "LIVE",
    color: "#FFB84D",
  },
  {
    id: "ron-bridge",
    name: "RON Teleport Bridge",
    tagline: "Trustless zero-knowledge state bridge",
    category: "Interoperability",
    description: "Mathematical state verification across Ethereum, Solana, Bitcoin, and Cosmos with zero intermediary custodians.",
    metrics: "$840M Cross-Chain Vol • 2.4s Settlement",
    route: "/ecosystem",
    status: "LIVE",
    color: "#755CFF",
  },
  {
    id: "ron-id",
    name: "RON Identity",
    tagline: "Zero-knowledge sovereign credentials",
    category: "Identity",
    description: "Cryptographically verifiable institutional passports and permissioned DeFi compliance without revealing identity.",
    metrics: "142,000+ IDs Issued • SOC-2 Type II Compliant",
    route: "/ecosystem",
    status: "LIVE",
    color: "#00DFF7",
  },
  {
    id: "ron-nodes",
    name: "RON Nodes",
    tagline: "Global physical infrastructure network",
    category: "Infrastructure",
    description: "Deploy ultra-low latency RPC endpoints, archive nodes, and validation clusters across 42 countries.",
    metrics: "18,482 Nodes • 99.998% Network Uptime",
    route: "/nodes",
    status: "LIVE",
    color: "#9DFF57",
  },
  {
    id: "ron-pay",
    name: "RON Pay",
    tagline: "Global instant value settlement SDK",
    category: "DeFi",
    description: "Programmable high-throughput micropayments, recurring subscriptions, and institutional invoicing rails.",
    metrics: "$0.0004 Avg Fee • 0.42s Finality",
    route: "/ecosystem",
    status: "LIVE",
    color: "#FF4D67",
  },
  {
    id: "ron-market",
    name: "RON Market",
    tagline: "Decentralized computational resources exchange",
    category: "Infrastructure",
    description: "Spot and futures marketplace for decentralized GPU computing, storage bandwidth, and zero-knowledge prover capacity.",
    metrics: "48,000 GPU Hours Traded / Day",
    route: "/ecosystem",
    status: "BETA",
    color: "#FFB84D",
  },
];

export const GLOBAL_NODES_DATA: GlobalNodeData[] = [
  {
    id: "node-sg-01",
    name: "Apex Node SG",
    type: "Validator",
    city: "Singapore",
    country: "Singapore",
    coordinates: [1.3521, 103.8198],
    status: "ONLINE",
    latencyMs: 12,
    uptime: 99.999,
    version: "v2.4.1",
    stake: 42800000,
    performanceScore: 99.8,
    lastBlock: 24893441,
  },
  {
    id: "node-de-01",
    name: "CyberCore Frankfurt",
    type: "Validator",
    city: "Frankfurt",
    country: "Germany",
    coordinates: [50.1109, 8.6821],
    status: "ONLINE",
    latencyMs: 16,
    uptime: 99.998,
    version: "v2.4.1",
    stake: 38200000,
    performanceScore: 99.6,
    lastBlock: 24893441,
  },
  {
    id: "node-jp-01",
    name: "Quantum Relay Tokyo",
    type: "Validator",
    city: "Tokyo",
    country: "Japan",
    coordinates: [35.6762, 139.6503],
    status: "ONLINE",
    latencyMs: 20,
    uptime: 99.997,
    version: "v2.4.0",
    stake: 35100000,
    performanceScore: 99.4,
    lastBlock: 24893441,
  },
  {
    id: "node-us-sf",
    name: "Nexus San Francisco",
    type: "Validator",
    city: "San Francisco",
    country: "USA",
    coordinates: [37.7749, -122.4194],
    status: "ONLINE",
    latencyMs: 24,
    uptime: 99.995,
    version: "v2.4.1",
    stake: 31900000,
    performanceScore: 99.1,
    lastBlock: 24893440,
  },
  {
    id: "node-uk-01",
    name: "Vanguard London",
    type: "Validator",
    city: "London",
    country: "UK",
    coordinates: [51.5074, -0.1278],
    status: "ONLINE",
    latencyMs: 18,
    uptime: 99.996,
    version: "v2.4.1",
    stake: 29400000,
    performanceScore: 99.3,
    lastBlock: 24893441,
  },
  {
    id: "node-ae-01",
    name: "Solaris Dubai",
    type: "Validator",
    city: "Dubai",
    country: "UAE",
    coordinates: [25.2048, 55.2708],
    status: "ONLINE",
    latencyMs: 21,
    uptime: 99.998,
    version: "v2.4.1",
    stake: 26800000,
    performanceScore: 99.5,
    lastBlock: 24893441,
  },
  {
    id: "node-kr-01",
    name: "Seoul Genesis",
    type: "Validator",
    city: "Seoul",
    country: "South Korea",
    coordinates: [37.5665, 126.978],
    status: "ONLINE",
    latencyMs: 23,
    uptime: 99.994,
    version: "v2.4.0",
    stake: 24100000,
    performanceScore: 98.9,
    lastBlock: 24893440,
  },
  {
    id: "node-us-ny",
    name: "Gotham Sentinel NY",
    type: "Validator",
    city: "New York",
    country: "USA",
    coordinates: [40.7128, -74.006],
    status: "ONLINE",
    latencyMs: 26,
    uptime: 99.991,
    version: "v2.4.1",
    stake: 22500000,
    performanceScore: 98.7,
    lastBlock: 24893439,
  },
  {
    id: "node-my-01",
    name: "Petronas Relay KL",
    type: "RPC",
    city: "Kuala Lumpur",
    country: "Malaysia",
    coordinates: [3.139, 101.6869],
    status: "ONLINE",
    latencyMs: 14,
    uptime: 99.997,
    version: "v2.4.1",
    performanceScore: 99.2,
    lastBlock: 24893441,
  },
  {
    id: "node-hk-01",
    name: "Victoria Hub HK",
    type: "Bridge",
    city: "Hong Kong",
    country: "Hong Kong",
    coordinates: [22.3193, 114.1694],
    status: "ONLINE",
    latencyMs: 17,
    uptime: 99.996,
    version: "v2.4.1",
    performanceScore: 99.1,
    lastBlock: 24893441,
  },
  {
    id: "node-au-01",
    name: "Harbour Cluster Sydney",
    type: "Archive",
    city: "Sydney",
    country: "Australia",
    coordinates: [-33.8688, 151.2093],
    status: "ONLINE",
    latencyMs: 38,
    uptime: 99.992,
    version: "v2.4.1",
    performanceScore: 98.5,
    lastBlock: 24893440,
  },
];

export const DEMO_TOKENS = [
  { symbol: "RON", name: "RON Network", price: 2.847, balance: 12840.42, icon: "⚡" },
  { symbol: "USDT", name: "Tether USD", price: 1.0, balance: 45000.0, icon: "💵" },
  { symbol: "USDC", name: "USD Coin", price: 1.0, balance: 28400.0, icon: "🪙" },
  { symbol: "ETH", name: "Ethereum", price: 3420.5, balance: 8.42, icon: "🔷" },
  { symbol: "BTC", name: "Bitcoin (RON Bridge)", price: 89450.0, balance: 0.85, icon: "₿" },
  { symbol: "SOL", name: "Solana (RON Teleport)", price: 194.2, balance: 42.1, icon: "🟣" },
  { symbol: "BNB", name: "BNB Chain", price: 620.8, balance: 14.2, icon: "🟡" },
];

export const SDK_CODE_SNIPPETS: Record<string, string> = {
  Typescript: `import { RonClient, RonWallet } from "@ron-network/sdk";

// Initialize institutional-grade client
const ron = new RonClient({
  network: "mainnet",
  rpcUrl: "https://rpc.ron.network/v1",
});

// Connect sovereign wallet
const wallet = RonWallet.fromPrivateKey(process.env.RON_PRIVATE_KEY!);

// Execute sub-second value transfer with 0.42s finality
const receipt = await ron.transfer({
  from: wallet.address,
  to: "0x72a819b208efbc912384a89012384f981238491f",
  amount: 1000, // RON
  token: "RON",
  gasOptimization: "ULTRA_FAST",
});

console.log(\`Finalized in block #\${receipt.blockHeight} with hash \${receipt.txHash}\`);`,

  Javascript: `const { RonClient } = require("@ron-network/sdk");

const ron = new RonClient({ network: "mainnet" });

async function streamLiveTransactions() {
  const stream = ron.mempool.subscribe({
    filter: { minTps: 10000 },
  });

  stream.on("transaction", (tx) => {
    console.log("Verified Tx:", tx.hash, "Value:", tx.value, "Gas:", tx.gasFee);
  });
}

streamLiveTransactions();`,

  Python: `from ron_sdk import RonClient, NetworkConfig

# Initialize Python asynchronous client
client = RonClient(config=NetworkConfig.MAINNET)

async def check_network_telemetry():
    telemetry = await client.get_network_health()
    print(f"TPS: {telemetry.current_tps}")
    print(f"Finality: {telemetry.finality_sec}s")
    print(f"Active Validators: {telemetry.validator_count}")

# Run AI-assisted anomaly detection
anomalies = client.ai_assistant.audit_mempool()`,

  Rust: `use ron_sdk::prelude::*;

#[tokio::main]
async fn main() -> Result<(), RonError> {
    let client = RonClient::builder()
        .mainnet()
        .with_zk_snark_verification()
        .build()?;

    let balance = client.get_balance("0x72a8...91f3").await?;
    println!("RON Balance: {} RON", balance.as_formatted());
    Ok(())
}`,

  Go: `package main

import (
	"context"
	"fmt"
	"github.com/ron-network/go-sdk/ron"
)

func main() {
	client, err := ron.Dial("wss://ws.ron.network")
	if err != nil {
		panic(err)
	}

	block, err := client.GetLatestBlock(context.Background())
	fmt.Printf("Block #%d sealed by %s\n", block.Height, block.Validator)
}`,
};

export const INITIAL_VALIDATORS = VALIDATORS_LIST;
export const INITIAL_PROPOSALS = PROPOSALS_LIST;
export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-01",
    title: "Consensus Finalized",
    description: "Slot #24893441 finalized in 0.42s by 184 validators.",
    type: "SYSTEM" as const,
    timestamp: Date.now() - 30000,
    read: false,
  },
  {
    id: "notif-02",
    title: "RIP-024 Quorum Met",
    description: "Sub-Second State Roots proposal reached 94.2% YES votes.",
    type: "GOVERNANCE" as const,
    timestamp: Date.now() - 120000,
    read: false,
    link: "/governance/proposal/RIP-024",
  },
  {
    id: "notif-03",
    title: "Staking Reward Disbursed",
    description: "+14.82 RON accrued from Apex SG Validator delegation.",
    type: "STAKE" as const,
    timestamp: Date.now() - 360000,
    read: true,
  },
];
