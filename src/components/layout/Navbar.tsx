"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRonStore } from "@/lib/store";
import { formatAddress, formatCurrency } from "@/lib/utils";
import {
  Bell,
  Command,
  Menu,
  X,
  Wallet,
  Settings,
  RefreshCw,
} from "lucide-react";
import { Button } from "../ui/Button";

const NAV_LINKS = [
  { name: "Network", href: "/network" },
  { name: "Token", href: "/token" },
  { name: "Ecosystem", href: "/ecosystem" },
  { name: "Stake", href: "/stake" },
  { name: "Swap", href: "/swap" },
  { name: "Explorer", href: "/explorer" },
  { name: "Governance", href: "/governance" },
  { name: "Intelligence", href: "/intelligence" },
  { name: "Status", href: "/status" },
  { name: "Developers", href: "/developers" },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const {
    metrics,
    isConnected,
    walletAddress,
    ronBalance,
    setWalletModalOpen,
    setCommandCenterOpen,
    setNotificationOpen,
    unreadNotificationCount,
    setDiagnosticsOpen,
    activeNetwork,
    setActiveNetwork,
    resetDemoEnvironment,
  } = useRonStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = () => {
    setLogoClickCount((prev) => {
      const next = prev + 1;
      if (next >= 3) {
        setDiagnosticsOpen(true);
        return 0;
      }
      setTimeout(() => setLogoClickCount(0), 1200);
      return next;
    });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#050507]/92 backdrop-blur-md border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.8)] py-2.5"
          : "bg-transparent py-4 border-b border-white/[0.04]"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Brand Identity & Telemetry Tag */}
        <div className="flex items-center gap-6">
          <div
            onClick={handleLogoClick}
            className="flex items-center gap-3 cursor-pointer select-none group"
            title="Triple-click for Kernel Diagnostics"
          >
            <div className="w-7 h-7 bg-white text-black font-mono font-black text-xs flex items-center justify-center rounded-[4px] tracking-tight group-hover:bg-ron-cyan transition-colors">
              R
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-bold text-sm tracking-[0.18em] text-white leading-none">
                RON
              </span>
              <span className="font-mono text-[9px] text-ron-cyan tracking-wider mt-0.5">
                V2.4 {activeNetwork.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Micro Ticker Chip */}
          <div className="hidden xl:flex items-center gap-2 px-2.5 py-0.5 rounded-[3px] bg-white/[0.03] border border-white/[0.06] font-mono text-[11px]">
            <span className="text-ron-dim">RON:</span>
            <span className="text-white font-medium">{formatCurrency(metrics.ronPrice, 3)}</span>
            <span className="text-ron-green font-semibold">+{metrics.price24hChange}%</span>
          </div>
        </div>

        {/* Center: Clean Thin Navigation Surface */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-2.5 py-1.5 text-xs font-mono tracking-wide uppercase transition-all ${
                  isActive
                    ? "text-white font-bold"
                    : "text-ron-muted hover:text-white"
                }`}
              >
                <span>{link.name}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-ron-cyan shadow-[0_0_8px_#00DFF7]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Network Selector, Command, Notifications & Wallet Trigger */}
        <div className="flex items-center gap-2">
          {/* Network Switcher Toggle */}
          <button
            onClick={() =>
              setActiveNetwork(activeNetwork === "RON Mainnet" ? "RON Testnet" : "RON Mainnet")
            }
            className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-[3px] bg-ron-green/[0.06] border border-ron-green/20 font-mono text-[10px] text-ron-green hover:bg-ron-green/15 transition-colors"
            title="Click to switch network"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-ron-green animate-pulse" />
            <span className="tracking-wider">{activeNetwork.toUpperCase()}</span>
          </button>

          {/* Reset Demo State Trigger */}
          <button
            onClick={resetDemoEnvironment}
            className="hidden md:flex p-1.5 rounded-[4px] bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-ron-muted hover:text-white transition-colors"
            title="Reset Demo Environment"
          >
            <RefreshCw className="w-3 h-3 text-ron-cyan" />
          </button>

          {/* Command Center Trigger (⌘K) */}
          <button
            onClick={() => setCommandCenterOpen(true)}
            className="flex items-center gap-1 px-2 py-1.5 rounded-[4px] bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-ron-muted hover:text-white font-mono text-[11px] transition-colors"
            title="Open Command Center (⌘K)"
          >
            <Command className="w-3 h-3 text-ron-cyan" />
            <span className="hidden md:inline">⌘K</span>
          </button>

          {/* Notifications Trigger */}
          <button
            onClick={() => setNotificationOpen(true)}
            className="relative p-1.5 rounded-[4px] bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-ron-muted hover:text-white transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-3.5 h-3.5" />
            {unreadNotificationCount > 0 && (
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-ron-cyan" />
            )}
          </button>

          {/* Wallet Trigger */}
          {isConnected && walletAddress ? (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setWalletModalOpen(true)}
              className="text-[11px]"
              leftIcon={<Wallet className="w-3 h-3 text-ron-cyan" />}
            >
              <span>{formatAddress(walletAddress, 4, 4)}</span>
              <span className="hidden md:inline text-ron-muted text-[10px]">
                ({ronBalance.toLocaleString(undefined, { maximumFractionDigits: 0 })} RON)
              </span>
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setWalletModalOpen(true)}
              className="text-[11px]"
              leftIcon={<Wallet className="w-3 h-3 text-black" />}
            >
              Connect
            </Button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-[4px] bg-white/5 hover:bg-white/10 text-ron-muted hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#050507]/98 border-b border-white/10 px-4 py-4 space-y-2">
          <div className="grid grid-cols-2 gap-1.5">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-2.5 rounded-[4px] font-mono text-xs uppercase tracking-wider border transition-colors ${
                    isActive
                      ? "bg-ron-violet/20 border-ron-cyan text-white font-bold"
                      : "bg-white/[0.02] border-white/5 text-ron-muted hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
