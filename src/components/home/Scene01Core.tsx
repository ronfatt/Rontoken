"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRonStore } from "@/lib/store";
import { formatCurrency, formatCompactNumber } from "@/lib/utils";
import { Button } from "../ui/Button";
import { ArrowRight, Activity } from "lucide-react";

const PROTOCOL_ORBITS = [
  { name: "LIQUIDITY", color: "#755CFF", angle: 0, radius: 175 },
  { name: "STAKING", color: "#00DFF7", angle: 50, radius: 200 },
  { name: "GOVERNANCE", color: "#9DFF57", angle: 110, radius: 165 },
  { name: "VALIDATORS", color: "#755CFF", angle: 170, radius: 215 },
  { name: "AI COGNITION", color: "#00DFF7", angle: 230, radius: 185 },
  { name: "ZK RELAY", color: "#9DFF57", angle: 295, radius: 195 },
];

export const Scene01Core: React.FC = () => {
  const { metrics, setWalletModalOpen } = useRonStore();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 900);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

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

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Layered 3D Particle Cloud
    const PARTICLE_COUNT = 160;
    const particles: Array<{
      baseX: number;
      baseY: number;
      baseZ: number;
      radius: number;
      color: string;
      alpha: number;
    }> = [];

    const palette = ["#755CFF", "#00DFF7", "#9DFF57", "#FFFFFF"];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 100 + Math.random() * 50;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      particles.push({
        baseX: x,
        baseY: y,
        baseZ: z,
        radius: Math.random() * 1.8 + 0.8,
        color: palette[Math.floor(Math.random() * palette.length)],
        alpha: Math.random() * 0.6 + 0.3,
      });
    }

    let angleY = 0;
    let angleX = 0;

    const render = () => {
      // Damped physical inertia
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      angleY += 0.007 + mouseRef.current.x * 0.008;
      angleX = mouseRef.current.y * 0.25;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Scroll expansion factor
      const scrollFactor = Math.min(1.5, 1 + (scrollRef.current / 800) * 0.4);

      // Soft volumetric background glow
      const radialGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 260 * scrollFactor);
      radialGrad.addColorStop(0, "rgba(117, 92, 255, 0.18)");
      radialGrad.addColorStop(0.5, "rgba(0, 223, 247, 0.05)");
      radialGrad.addColorStop(1, "rgba(5, 5, 7, 0)");
      ctx.fillStyle = radialGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 270 * scrollFactor, 0, Math.PI * 2);
      ctx.fill();

      // Precision Vector Rings
      const ringRadii = [150 * scrollFactor, 190 * scrollFactor, 230 * scrollFactor];
      const ringRots = [angleY * 0.5, -angleY * 0.35, angleY * 0.7];

      ringRadii.forEach((r, idx) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(ringRots[idx] + angleX);
        ctx.scale(1, 0.38);
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.strokeStyle = idx === 0 ? "rgba(117, 92, 255, 0.3)" : idx === 1 ? "rgba(0, 223, 247, 0.2)" : "rgba(157, 255, 87, 0.15)";
        ctx.lineWidth = 1;
        ctx.setLineDash([8, 14]);
        ctx.stroke();
        ctx.restore();
      });

      // 3D Particles Projection
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      particles.sort((a, b) => b.baseZ - a.baseZ);

      particles.forEach((p) => {
        const x1 = p.baseX * cosY - p.baseZ * sinY;
        const z1 = p.baseZ * cosY + p.baseX * sinY;
        const y1 = p.baseY * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.baseY * sinX;

        const fov = 380;
        const scale = fov / (fov + z2);
        const px = cx + x1 * scale * scrollFactor;
        const py = cy + y1 * scale * scrollFactor;

        ctx.beginPath();
        ctx.arc(px, py, p.radius * scale, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(0.9, p.alpha * scale));
        ctx.fill();
      });

      ctx.globalAlpha = 1;

      // Central Digital Engine Hub
      ctx.beginPath();
      ctx.arc(cx, cy, 36, 0, Math.PI * 2);
      ctx.fillStyle = "#090A0E";
      ctx.strokeStyle = "#755CFF";
      ctx.lineWidth = 1.5;
      ctx.shadowColor = "#755CFF";
      ctx.shadowBlur = 24;
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Core Monospace Symbol
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 13px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("RON", cx, cy);

      // Orbiting Subsystem Protocol Tags
      PROTOCOL_ORBITS.forEach((sys) => {
        const rad = ((sys.angle + angleY * 26) * Math.PI) / 180;
        const ox = cx + Math.cos(rad) * sys.radius * scrollFactor;
        const oy = cy + Math.sin(rad) * (sys.radius * 0.38) * scrollFactor + mouseRef.current.y * 12;

        ctx.fillStyle = "rgba(5, 5, 7, 0.9)";
        ctx.strokeStyle = sys.color;
        ctx.lineWidth = 0.8;

        const tw = ctx.measureText(sys.name).width;
        const pw = tw + 14;
        const ph = 18;

        ctx.beginPath();
        ctx.roundRect(ox - pw / 2, oy - ph / 2, pw, ph, 3);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = sys.color;
        ctx.font = "bold 8.5px monospace";
        ctx.fillText(sys.name, ox, oy);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="relative min-h-[94vh] flex flex-col justify-between items-center text-center px-4 sm:px-6 lg:px-8 pt-16 pb-20 overflow-hidden bg-radial-glow">
      {/* 3D Canvas Background & Digital Engine Core */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none" data-cursor="explore">
        <canvas ref={canvasRef} className="w-full h-full max-w-5xl" />
      </div>

      {/* Hero Headline & Strategic Text Hierarchy */}
      <div className="relative z-10 max-w-5xl mx-auto space-y-6 pt-6">
        {/* Micro Telemetry Header */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[3px] bg-ron-violet/[0.08] border border-ron-violet/30 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-ron-cyan animate-pulse" />
          <span className="font-mono text-[10px] text-ron-cyan uppercase tracking-[0.2em] font-semibold">
            PROGRAMMABLE ECONOMIC INFRASTRUCTURE • MAINNET V2.4
          </span>
        </div>

        {/* Grand Editorial Display Title */}
        <div className="space-y-3">
          <h1 className="text-6xl sm:text-8xl lg:text-[110px] font-black tracking-[-0.03em] text-white leading-none">
            RON
          </h1>
          <p className="font-mono text-sm sm:text-base lg:text-lg uppercase tracking-[0.25em] text-ron-text font-bold">
            THE PROGRAMMABLE ECONOMY
          </p>
        </div>

        <p className="text-xs sm:text-sm text-ron-muted max-w-xl mx-auto leading-relaxed font-sans">
          One Token. Infinite Utility. An intelligent, sub-second settlement infrastructure
          engineered for global value transfer and autonomous execution.
        </p>

        {/* High-Contrast Action Triggers with Magnetic Interaction */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button
            size="lg"
            variant="primary"
            isMagnetic={true}
            onClick={() => setWalletModalOpen(true)}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            ENTER NETWORK
          </Button>

          <Link href="/explorer">
            <Button
              size="lg"
              variant="secondary"
              isMagnetic={true}
              leftIcon={<Activity className="w-3.5 h-3.5 text-ron-cyan" />}
            >
              VIEW EXPLORER
            </Button>
          </Link>
        </div>
      </div>

      {/* Live System Metrics Strip */}
      <div className="relative z-10 w-full max-w-6xl mx-auto mt-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 p-2 rounded-[6px] bg-black/60 border border-white/[0.08] backdrop-blur-xl">
          {/* Price */}
          <div className="p-3 surface-type-a text-left">
            <span className="mono-label block text-[10px]">RON PRICE</span>
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
          <div className="p-3 surface-type-a text-left">
            <span className="mono-label block text-[10px]">MARKET CAP</span>
            <span className="mono-data font-bold text-sm text-white mt-0.5 block">
              ${formatCompactNumber(metrics.marketCap)}
            </span>
          </div>

          {/* TVL */}
          <div className="p-3 surface-type-a text-left">
            <span className="mono-label block text-[10px]">TOTAL TVL</span>
            <span className="mono-data font-bold text-sm text-ron-cyan mt-0.5 block">
              ${formatCompactNumber(metrics.tvl)}
            </span>
          </div>

          {/* TPS */}
          <div className="p-3 surface-type-a text-left">
            <span className="mono-label block text-[10px]">LIVE TPS</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-ron-green animate-pulse" />
              <span className="mono-data font-bold text-sm text-ron-green">
                {metrics.currentTps.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Finality */}
          <div className="p-3 surface-type-a text-left">
            <span className="mono-label block text-[10px]">FINALITY</span>
            <span className="mono-data font-bold text-sm text-white mt-0.5 block">
              {metrics.finalitySec} SEC
            </span>
          </div>

          {/* Validators */}
          <div className="p-3 surface-type-a text-left">
            <span className="mono-label block text-[10px]">VALIDATORS</span>
            <span className="mono-data font-bold text-sm text-ron-violet mt-0.5 block">
              {metrics.activeValidators} HUBS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
