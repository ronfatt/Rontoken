"use client";

import React from "react";
import { useRonStore } from "@/lib/store";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { Terminal, Shield, Activity, Cpu, CheckCircle2 } from "lucide-react";

export const DiagnosticsModal: React.FC = () => {
  const { isDiagnosticsOpen, setDiagnosticsOpen, metrics, blocks, validators } = useRonStore();

  return (
    <Modal
      isOpen={isDiagnosticsOpen}
      onClose={() => setDiagnosticsOpen(false)}
      title="RON Network Kernel Diagnostics"
      subtitle="Direct node telemetric output & consensus state vector"
      maxWidth="lg"
    >
      <div className="space-y-4 font-mono text-xs">
        {/* Core telemetry grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-lg bg-black/50 border border-ron-cyan/20">
            <span className="text-ron-dim text-[10px] block">CONSENSUS ENGINE</span>
            <span className="text-ron-cyan font-bold mt-1 block">Turing-BFT v2.4</span>
          </div>

          <div className="p-3 rounded-lg bg-black/50 border border-ron-green/20">
            <span className="text-ron-dim text-[10px] block">SLOT FINALITY</span>
            <span className="text-ron-green font-bold mt-1 block">{metrics.finalitySec}s (Sub-second)</span>
          </div>

          <div className="p-3 rounded-lg bg-black/50 border border-ron-violet/20">
            <span className="text-ron-dim text-[10px] block">PEER VALIDATORS</span>
            <span className="text-ron-violet font-bold mt-1 block">{validators.length} / 184 Active</span>
          </div>
        </div>

        {/* Live log stream */}
        <div className="p-4 rounded-xl bg-black/80 border border-white/10 text-[11px] text-ron-muted space-y-1.5 max-h-48 overflow-y-auto">
          <p className="text-ron-green font-semibold">
            [SYS_OK] Genesis state root verified. Zero-Knowledge state prover online.
          </p>
          <p className="text-white">
            [BLOCK #{metrics.blockHeight}] Validator: {blocks[0]?.validator.name} | Reward: {blocks[0]?.reward} RON
          </p>
          <p className="text-ron-cyan">
            [MEMPOOL] Stream rate: {metrics.currentTps.toLocaleString()} TPS | Gas target: {metrics.avgGasGwei} Gwei
          </p>
          <p className="text-ron-dim">
            [PEERS] 18,482 global infrastructure nodes synced across 42 jurisdictions.
          </p>
          <p className="text-ron-violet">
            [AI_AGENT] Neural mempool anomaly scan: 0 critical vulnerabilities detected.
          </p>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setDiagnosticsOpen(false)}
          >
            Close Diagnostics
          </Button>
        </div>
      </div>
    </Modal>
  );
};
