"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRonStore } from "@/lib/store";
import { formatCurrency, formatCompactNumber, formatNumber } from "@/lib/utils";
import { Button } from "../ui/Button";
import {
  ArrowRight,
  Activity,
  ShieldCheck,
  Zap,
  Radio,
  Cpu,
  Terminal,
  Layers,
  Sparkles,
} from "lucide-react";

const PROTOCOL_ORBITS = [
  { name: "LIQUIDITY AMM", color: "#7A5CFF", angle: 0, radius: 195, status: "OPTIMAL" },
  { name: "STAKING VAULT", color: "#00E7FF", angle: 60, radius: 220, status: "18.42% APY" },
  { name: "DAO SENATE", color: "#96FF4B", angle: 120, radius: 180, status: "ACTIVE" },
  { name: "VALIDATOR HUBS", color: "#7A5CFF", angle: 180, radius: 240, status: "184 SYNCED" },
  { name: "NEURAL PROVER", color: "#00E7FF", angle: 240, radius: 205, status: "COGNITIVE" },
  { name: "ZK RELAY MESH", color: "#96FF4B", angle: 300, radius: 215, status: "SUB-SECOND" },
];

export const Scene01Core: React.FC = () => {
  const { metrics, setWalletModalOpen, blocks, transactions } = useRonStore();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 1000);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 720);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left - width / 2) / (width / 2);
      const ny = (e.clientY - rect.top - height / 2) / (height / 2);
      mouseRef.current.targetX = Math.max(-1, Math.min(1, nx));
      mouseRef.current.targetY = Math.max(-1, Math.min(1, ny));
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleTouchMove = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      const rect = canvas.getBoundingClientRect();
      const nx = (e.touches[0].clientX - rect.left - width / 2) / (width / 2);
      const ny = (e.touches[0].clientY - rect.top - height / 2) / (height / 2);
      mouseRef.current.targetX = Math.max(-1, Math.min(1, nx));
      mouseRef.current.targetY = Math.max(-1, Math.min(1, ny));
    };
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Responsive 3D Particle Cloud
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 80 : 220;
    const particles: Array<{
      baseX: number;
      baseY: number;
      baseZ: number;
      radius: number;
      color: string;
      alpha: number;
      speed: number;
    }> = [];

    const palette = ["#7A5CFF", "#00E7FF", "#96FF4B", "#FFFFFF", "#FF4FD8"];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 110 + Math.random() * 70;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      particles.push({
        baseX: x,
        baseY: y,
        baseZ: z,
        radius: Math.random() * 2 + 0.8,
        color: palette[Math.floor(Math.random() * palette.length)],
        alpha: Math.random() * 0.7 + 0.3,
        speed: (Math.random() - 0.5) * 0.02,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.012;

      // Smooth camera interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2 - 10;
      const scrollOffset = scrollRef.current * 0.15;

      const rotY = time * 0.3 + mouseRef.current.x * 0.6;
      const rotX = mouseRef.current.y * 0.4 + scrollOffset * 0.002;

      // 1. Draw Volumetric Holographic Backdrop Glow
      const bgGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 320);
      bgGrad.addColorStop(0, "rgba(122, 92, 255, 0.22)");
      bgGrad.addColorStop(0.35, "rgba(0, 231, 255, 0.08)");
      bgGrad.addColorStop(0.7, "rgba(150, 255, 75, 0.02)");
      bgGrad.addColorStop(1, "transparent");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Multi-Layered Gyroscopic Orbit Rings
      const rings = [
        { r: 230, tilt: 0.45, speed: 0.25, color: "rgba(122, 92, 255, 0.25)", dash: [6, 12] },
        { r: 190, tilt: -0.35, speed: -0.35, color: "rgba(0, 231, 255, 0.35)", dash: [10, 8] },
        { r: 150, tilt: 0.65, speed: 0.5, color: "rgba(150, 255, 75, 0.3)", dash: [4, 6] },
      ];

      rings.forEach((ring) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(time * ring.speed + mouseRef.current.x * 0.2);
        ctx.scale(1, Math.cos(ring.tilt));
        ctx.beginPath();
        ctx.arc(0, 0, ring.r, 0, Math.PI * 2);
        ctx.strokeStyle = ring.color;
        ctx.lineWidth = 1.2;
        ctx.setLineDash(ring.dash);
        ctx.stroke();
        ctx.restore();
      });

      // 3. 3D Particle Cloud Projection
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      particles.forEach((p) => {
        // Rotate around Y
        const x1 = p.baseX * cosY - p.baseZ * sinY;
        const z1 = p.baseZ * cosY + p.baseX * sinY;

        // Rotate around X
        const y1 = p.baseY * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.baseY * sinX;

        // Perspective projection
        const fov = 420;
        const scale = fov / (fov + z2);

        const projX = cx + x1 * scale;
        const projY = cy + y1 * scale;

        if (z2 > -fov) {
          const depthAlpha = Math.max(0.1, Math.min(1, (z2 + 200) / 400)) * p.alpha;
          ctx.beginPath();
          ctx.arc(projX, projY, Math.max(0.5, p.radius * scale), 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = depthAlpha;
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1;

      // 4. Central Reactor Nucleus with Pulsing Energy
      const corePulse = Math.sin(time * 3) * 6;
      const coreR = Math.max(24, 38 + corePulse);

      const coreGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, coreR);
      coreGrad.addColorStop(0, "#FFFFFF");
      coreGrad.addColorStop(0.3, "#00E7FF");
      coreGrad.addColorStop(0.7, "#7A5CFF");
      coreGrad.addColorStop(1, "transparent");

      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      // Nucleus Symbol Glyph (R)
      ctx.fillStyle = "#04050A";
      ctx.font = "900 20px -apple-system, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("R", cx, cy);

      // 5. Orbiting Protocol HUD Nodes
      PROTOCOL_ORBITS.forEach((sys, idx) => {
        const orbitAngle = ((sys.angle + time * 18) * Math.PI) / 180;
        const ox = cx + Math.cos(orbitAngle) * sys.radius;
        const oy = cy + Math.sin(orbitAngle) * (sys.radius * 0.45);

        // Connection beam from nucleus to node
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(ox, oy);
        ctx.strokeStyle = "rgba(122, 92, 255, 0.12)";
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Node Beacon Dot
        ctx.beginPath();
        ctx.arc(ox, oy, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = sys.color;
        ctx.shadowColor = sys.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Micro Data Tag
        ctx.fillStyle = sys.color;
        ctx.font = "bold 8.5px monospace";
        ctx.fillText(sys.name, ox, oy - 8);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="relative min-h-[96vh] flex flex-col justify-between items-center text-center px-4 sm:px-6 lg:px-8 pt-12 pb-16 overflow-hidden bg-radial-glow">
      {/* 3D Holographic Reactor Canvas */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full max-w-6xl" />
      </div>

      {/* Cyber Grid Horizon Overlay */}
      <div className="absolute inset-0 bg-cyber-void opacity-40 pointer-events-none" />
      <div className="absolute inset-0 cyber-scanlines pointer-events-none opacity-60" />

      {/* Top Protocol Status Banner */}
      <div className="relative z-10 pt-2">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-[4px] bg-[#070913]/90 border border-ron-cyan/40 backdrop-blur-xl shadow-[0_0_20px_rgba(0,231,255,0.15)]">
          <span className="w-2 h-2 rounded-full bg-ron-green animate-pulse" />
          <span className="font-mono text-[10.5px] text-white uppercase tracking-[0.2em] font-bold">
            RON PROTOCOL ENGINE V2.4 • MAINNET CONVERGENCE
          </span>
        </div>
      </div>

      {/* Main Command Chamber Center Piece */}
      <div className="relative z-10 max-w-5xl mx-auto space-y-6 pt-4">
        {/* Grand Cyber Title */}
        <div className="space-y-2">
          <h1 className="text-6xl sm:text-8xl lg:text-[112px] font-black tracking-[-0.04em] text-white leading-none drop-shadow-[0_0_35px_rgba(122,92,255,0.35)]">
            RON
          </h1>
          <p className="font-mono text-sm sm:text-base lg:text-lg uppercase tracking-[0.3em] text-ron-cyan font-bold">
            THE PROGRAMMABLE ECONOMY
          </p>
        </div>

        <p className="text-xs sm:text-sm text-ron-muted max-w-xl mx-auto leading-relaxed font-sans">
          One Token. Infinite Utility. An intelligent, sub-second settlement digital economic infrastructure
          engineered for global value routing and autonomous on-chain execution.
        </p>

        {/* High-Impact Tactical CTA Array */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button
            size="lg"
            variant="primary"
            isMagnetic={true}
            onClick={() => setWalletModalOpen(true)}
            rightIcon={<ArrowRight className="w-4 h-4 text-black" />}
            className="h-12 px-6 font-mono text-xs tracking-wider shadow-[0_0_25px_rgba(0,231,255,0.4)]"
          >
            ENTER NETWORK
          </Button>

          <Link href="/explorer">
            <Button
              size="lg"
              variant="secondary"
              isMagnetic={true}
              leftIcon={<Activity className="w-4 h-4 text-ron-cyan" />}
              className="h-12 px-6 font-mono text-xs tracking-wider hover:border-ron-cyan"
            >
              EXPLORE LEDGER
            </Button>
          </Link>
        </div>
      </div>

      {/* Flanking Cyber HUD Telemetry Panels (Desktop / Tablet) */}
      <div className="relative z-10 w-full max-w-[1380px] mx-auto hidden xl:grid grid-cols-12 gap-4 mt-8">
        {/* Left HUD: Node Enclave */}
        <div className="col-span-3 p-3.5 rounded-[6px] cyber-hud-card tech-corner-tl text-left space-y-2">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-1.5">
            <span className="mono-label text-[9px] text-ron-cyan font-bold">NODE ENCLAVE</span>
            <span className="text-ron-green text-[9px] font-mono">ONLINE</span>
          </div>
          <div className="space-y-1 text-[11px] font-mono">
            <div className="flex justify-between">
              <span className="text-ron-dim">BLOCK HEIGHT:</span>
              <span className="text-white font-bold mono-data">#{metrics.blockHeight.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ron-dim">SLOT FINALITY:</span>
              <span className="text-ron-green font-bold mono-data">0.42s SUB-SECOND</span>
            </div>
          </div>
        </div>

        <div className="col-span-6" />

        {/* Right HUD: Defense & Throughput */}
        <div className="col-span-3 p-3.5 rounded-[6px] cyber-hud-card tech-corner-br text-left space-y-2">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-1.5">
            <span className="mono-label text-[9px] text-ron-violet font-bold">SHIELD & THROUGHPUT</span>
            <span className="text-ron-cyan text-[9px] font-mono">ZK-PROVER</span>
          </div>
          <div className="space-y-1 text-[11px] font-mono">
            <div className="flex justify-between">
              <span className="text-ron-dim">REAL-TIME TPS:</span>
              <span className="text-ron-cyan font-bold mono-data">{metrics.currentTps.toLocaleString()} TPS</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ron-dim">GAS TARGET:</span>
              <span className="text-white font-bold mono-data">{metrics.avgGasGwei} GWEI ($0.08)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cyber Console Live Telemetry Strip */}
      <div className="relative z-10 w-full max-w-6xl mx-auto mt-6 sm:mt-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 p-2 rounded-[8px] bg-[#070913]/90 border border-white/[0.12] backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
          {/* Price */}
          <div className="p-3 rounded-[4px] surface-type-a text-left hover:border-ron-cyan/40 transition-colors">
            <span className="mono-label block text-[9.5px]">RON PRICE</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="mono-data font-bold text-sm text-white">
                {formatCurrency(metrics.ronPrice, 3)}
              </span>
              <span className="font-mono text-[10px] text-ron-green font-semibold">
                +{metrics.price24hChange}%
              </span>
            </div>
          </div>

          {/* Market Cap */}
          <div className="p-3 rounded-[4px] surface-type-a text-left hover:border-ron-cyan/40 transition-colors">
            <span className="mono-label block text-[9.5px]">MARKET CAP</span>
            <span className="mono-data font-bold text-sm text-white mt-0.5 block">
              ${formatCompactNumber(metrics.marketCap)}
            </span>
          </div>

          {/* TVL */}
          <div className="p-3 rounded-[4px] surface-type-a text-left hover:border-ron-cyan/40 transition-colors">
            <span className="mono-label block text-[9.5px]">TOTAL TVL</span>
            <span className="mono-data font-bold text-sm text-ron-cyan mt-0.5 block">
              ${formatCompactNumber(metrics.tvl)}
            </span>
          </div>

          {/* TPS */}
          <div className="p-3 rounded-[4px] surface-type-a text-left hover:border-ron-green/40 transition-colors">
            <span className="mono-label block text-[9.5px]">LIVE TPS</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-ron-green animate-pulse" />
              <span className="mono-data font-bold text-sm text-ron-green">
                {metrics.currentTps.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Finality */}
          <div className="p-3 rounded-[4px] surface-type-a text-left hover:border-ron-violet/40 transition-colors">
            <span className="mono-label block text-[9.5px]">FINALITY</span>
            <span className="mono-data font-bold text-sm text-white mt-0.5 block">
              {metrics.finalitySec} SEC
            </span>
          </div>

          {/* Validators */}
          <div className="p-3 rounded-[4px] surface-type-a text-left hover:border-ron-violet/40 transition-colors">
            <span className="mono-label block text-[9.5px]">VALIDATORS</span>
            <span className="mono-data font-bold text-sm text-ron-violet mt-0.5 block">
              {metrics.activeValidators} HUBS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
