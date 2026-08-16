"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useRonStore } from "@/lib/store";
import {
  Search,
  Zap,
  ArrowRight,
  Shield,
  Layers,
  Radio,
  Cpu,
  Vote,
  Compass,
  Code2,
  Lock,
} from "lucide-react";

interface CommandItem {
  id: string;
  title: string;
  category: "Navigation" | "Action" | "System" | "Protocol";
  shortcut?: string;
  icon: React.ElementType;
  action: () => void;
}

export const CommandCenter: React.FC = () => {
  const router = useRouter();
  const {
    isCommandCenterOpen,
    setCommandCenterOpen,
    setWalletModalOpen,
    setDiagnosticsOpen,
  } = useRonStore();

  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const executeAndClose = (action: () => void) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCommandCenterOpen(false);
      setIsTransitioning(false);
      action();
    }, 240);
  };

  const COMMANDS: CommandItem[] = [
    {
      id: "nav-network",
      title: "Open Network Operations Center (NOC)",
      category: "Navigation",
      shortcut: "N",
      icon: Radio,
      action: () => router.push("/network"),
    },
    {
      id: "nav-token",
      title: "View Tokenomics & Vesting Engine",
      category: "Navigation",
      shortcut: "T",
      icon: Layers,
      action: () => router.push("/token"),
    },
    {
      id: "nav-swap",
      title: "Launch RON Swap (DEX)",
      category: "Protocol",
      shortcut: "S",
      icon: Zap,
      action: () => router.push("/swap"),
    },
    {
      id: "nav-stake",
      title: "Open Staking & Validator Delegation",
      category: "Protocol",
      shortcut: "K",
      icon: Lock,
      action: () => router.push("/stake"),
    },
    {
      id: "nav-explorer",
      title: "Search Blockchain Explorer (Blocks & Txs)",
      category: "Navigation",
      shortcut: "E",
      icon: Compass,
      action: () => router.push("/explorer"),
    },
    {
      id: "nav-governance",
      title: "View Active DAO Proposals & Vote",
      category: "Protocol",
      shortcut: "G",
      icon: Vote,
      action: () => router.push("/governance"),
    },
    {
      id: "nav-intelligence",
      title: "Launch RON Intelligence Terminal",
      category: "Protocol",
      shortcut: "I",
      icon: Cpu,
      action: () => router.push("/intelligence"),
    },
    {
      id: "nav-developers",
      title: "Developer Portal & SDK Playground",
      category: "Navigation",
      shortcut: "D",
      icon: Code2,
      action: () => router.push("/developers"),
    },
    {
      id: "act-wallet",
      title: "Connect Sovereign Web3 Wallet",
      category: "Action",
      shortcut: "W",
      icon: Shield,
      action: () => setWalletModalOpen(true),
    },
    {
      id: "act-diagnostics",
      title: "Run System Kernel Diagnostics",
      category: "System",
      icon: Radio,
      action: () => setDiagnosticsOpen(true),
    },
  ];

  const filteredCommands = COMMANDS.filter((cmd) => {
    const q = query.toLowerCase();
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandCenterOpen(!isCommandCenterOpen);
      }
      if (e.key === "Escape" && isCommandCenterOpen) {
        setCommandCenterOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCommandCenterOpen, setCommandCenterOpen]);

  useEffect(() => {
    if (isCommandCenterOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [isCommandCenterOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        executeAndClose(filteredCommands[selectedIndex].action);
      }
    }
  };

  if (!isCommandCenterOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/80 backdrop-blur-md transition-all duration-200">
      {/* Laser Transition Line */}
      {isTransitioning && (
        <div className="fixed top-0 left-0 right-0 h-[2px] bg-ron-cyan animate-laser-line z-50" />
      )}

      <div className="w-full max-w-xl surface-type-c tech-corner-tl tech-corner-br shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden font-mono">
        {/* Search Header */}
        <div className="p-3.5 border-b border-white/[0.08] flex items-center gap-3 bg-black/60">
          <Search className="w-4 h-4 text-ron-cyan shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or jump to route (e.g. swap, stake, explorer)..."
            className="w-full bg-transparent text-xs text-white placeholder-ron-muted focus:outline-none"
          />
          <span className="text-[10px] text-ron-dim px-1.5 py-0.5 rounded-[2px] bg-white/[0.04] border border-white/10">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="p-6 text-center text-xs text-ron-muted">
              No matching commands or routes found for &quot;{query}&quot;
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              const Icon = cmd.icon;
              return (
                <div
                  key={cmd.id}
                  onClick={() => executeAndClose(cmd.action)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-2.5 rounded-[4px] cursor-pointer text-xs transition-colors ${
                    isSelected
                      ? "bg-ron-violet/20 text-white border border-ron-violet/40"
                      : "text-ron-muted hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-ron-cyan" : "text-ron-dim"}`} />
                    <span className="font-medium text-[11px]">{cmd.title}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[9px] uppercase tracking-wider text-ron-dim px-1.5 py-0.5 rounded-[2px] bg-white/[0.04]">
                      {cmd.category}
                    </span>
                    {cmd.shortcut && (
                      <span className="text-[9px] text-ron-cyan font-bold px-1 rounded-[2px] border border-ron-cyan/30">
                        {cmd.shortcut}
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Command Center Footer */}
        <div className="p-2.5 bg-black/80 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-ron-dim">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Execute</span>
          </div>
          <span className="text-ron-cyan">RON OS V2.4</span>
        </div>
      </div>
    </div>
  );
};
