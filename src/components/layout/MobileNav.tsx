"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Compass,
  ArrowDownUp,
  Lock,
  Wallet,
  Grid,
  Radio,
  Cpu,
  Vote,
  Globe2,
  Code2,
  Activity,
  Layers,
  RefreshCw,
  X,
} from "lucide-react";
import { BottomSheet } from "../ui/BottomSheet";
import { useRonStore } from "@/lib/store";

export const MobileNav: React.FC = () => {
  const pathname = usePathname();
  const { resetDemoEnvironment } = useRonStore();
  const [moreDrawerOpen, setMoreDrawerOpen] = useState(false);

  const PRIMARY_TABS = [
    { name: "HOME", href: "/", icon: Home },
    { name: "EXPLORER", href: "/explorer", icon: Compass },
    { name: "SWAP", href: "/swap", icon: ArrowDownUp },
    { name: "STAKE", href: "/stake", icon: Lock },
    { name: "WALLET", href: "/wallet", icon: Wallet },
  ];

  const SECONDARY_MODULES = [
    { name: "Network NOC", href: "/network", icon: Radio, desc: "Throughput & live telemetry" },
    { name: "RON Intelligence", href: "/intelligence", icon: Cpu, desc: "Autonomous cognitive AI" },
    { name: "DAO Governance", href: "/governance", icon: Vote, desc: "On-chain proposal votes" },
    { name: "Node Atlas", href: "/nodes", icon: Globe2, desc: "18,482 physical hubs" },
    { name: "Ecosystem Apps", href: "/ecosystem", icon: Layers, desc: "Sovereign protocol matrix" },
    { name: "Developers SDK", href: "/developers", icon: Code2, desc: "APIs, RPC & Code playground" },
    { name: "Network Status", href: "/status", icon: Activity, desc: "Operational subsystem health" },
    { name: "Tokenomics", href: "/token", icon: Layers, desc: "Fixed 1B supply & vesting" },
  ];

  return (
    <>
      {/* Persistent Bottom Mobile Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#090A0E]/95 backdrop-blur-xl border-t border-white/[0.08] shadow-[0_-4px_25px_rgba(0,0,0,0.8)]">
        <div
          className="flex items-center justify-around px-2 pt-2"
          style={{
            paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))",
          }}
        >
          {PRIMARY_TABS.map((tab) => {
            const isActive =
              tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
            const Icon = tab.icon;

            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={`flex flex-col items-center justify-center py-1 px-2 rounded-[6px] transition-all min-w-[56px] ${
                  isActive ? "text-white" : "text-ron-muted hover:text-white"
                }`}
              >
                <div className="relative p-1">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? "text-ron-cyan" : "text-ron-muted"
                    }`}
                  />
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-ron-cyan shadow-[0_0_8px_#00DFF7]" />
                  )}
                </div>
                <span
                  className={`text-[9.5px] font-mono tracking-wider mt-0.5 ${
                    isActive ? "font-bold text-white" : "text-ron-dim"
                  }`}
                >
                  {tab.name}
                </span>
              </Link>
            );
          })}

          {/* More Drawer Trigger */}
          <button
            onClick={() => setMoreDrawerOpen(true)}
            className="flex flex-col items-center justify-center py-1 px-2 text-ron-muted hover:text-white transition-all min-w-[56px]"
          >
            <div className="p-1">
              <Grid className="w-4 h-4 text-ron-violet" />
            </div>
            <span className="text-[9.5px] font-mono tracking-wider mt-0.5 text-ron-dim">
              MORE
            </span>
          </button>
        </div>
      </div>

      {/* System More Drawer Bottom Sheet */}
      <BottomSheet
        isOpen={moreDrawerOpen}
        onClose={() => setMoreDrawerOpen(false)}
        title="RON System Matrix"
        subtitle="Pocket Web3 Operating System Modules"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {SECONDARY_MODULES.map((mod) => {
              const Icon = mod.icon;
              return (
                <Link
                  key={mod.name}
                  href={mod.href}
                  onClick={() => setMoreDrawerOpen(false)}
                  className="p-3 rounded-[6px] surface-type-a hover:surface-type-b hover:border-ron-violet/50 transition-all flex flex-col justify-between space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <Icon className="w-4 h-4 text-ron-cyan group-hover:text-ron-violet transition-colors" />
                    <span className="text-[9px] text-ron-dim uppercase font-mono">GO</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs">{mod.name}</h4>
                    <p className="text-[10px] text-ron-muted leading-tight mt-0.5">
                      {mod.desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Reset Demo State in Mobile Drawer */}
          <div className="pt-2 border-t border-white/[0.08]">
            <button
              onClick={() => {
                resetDemoEnvironment();
                setMoreDrawerOpen(false);
              }}
              className="w-full py-2.5 rounded-[6px] bg-white/[0.04] hover:bg-white/10 border border-white/10 text-white font-mono text-xs flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5 text-ron-cyan" />
              <span>RESET DEMO ENVIRONMENT</span>
            </button>
          </div>
        </div>
      </BottomSheet>
    </>
  );
};
