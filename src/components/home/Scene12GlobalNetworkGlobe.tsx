"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { GLOBAL_NODES_DATA } from "@/lib/mock-data";
import { GlobalNodeData } from "@/lib/types";
import { Button } from "../ui/Button";
import { Globe2, ArrowRight } from "lucide-react";

export const Scene12GlobalNetworkGlobe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedNode, setSelectedNode] = useState<GlobalNodeData>(GLOBAL_NODES_DATA[0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    const globeRadius = Math.min(width, height) * 0.38;
    let rotY = 0;
    let rotX = 0.2;

    const nodes3D = GLOBAL_NODES_DATA.map((node) => {
      const latRad = (node.coordinates[0] * Math.PI) / 180;
      const lngRad = (node.coordinates[1] * Math.PI) / 180;

      const x = globeRadius * Math.cos(latRad) * Math.sin(lngRad);
      const y = -globeRadius * Math.sin(latRad);
      const z = globeRadius * Math.cos(latRad) * Math.cos(lngRad);

      return { ...node, origX: x, origY: y, origZ: z };
    });

    const ringSteps = 12;

    const render = () => {
      rotY += 0.005;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Glow behind globe
      const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, globeRadius * 1.3);
      grad.addColorStop(0, "rgba(117, 92, 255, 0.12)");
      grad.addColorStop(0.6, "rgba(0, 223, 247, 0.04)");
      grad.addColorStop(1, "rgba(5, 5, 7, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, globeRadius * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // Abstract sphere lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 1;

      for (let i = -ringSteps / 2; i <= ringSteps / 2; i++) {
        const lat = (i * Math.PI) / ringSteps;
        const r = globeRadius * Math.cos(lat);
        const y = -globeRadius * Math.sin(lat);

        ctx.save();
        ctx.translate(cx, cy + y * Math.cos(rotX));
        ctx.scale(1, Math.sin(rotX));
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const projected = nodes3D.map((n) => {
        let x1 = n.origX * cosY + n.origZ * sinY;
        let z1 = -n.origX * sinY + n.origZ * cosY;
        let y1 = n.origY * cosX - z1 * sinX;
        let z2 = z1 * cosX + n.origY * sinX;

        return {
          ...n,
          projX: cx + x1,
          projY: cy + y1,
          projZ: z2,
          isFront: z2 > 0,
        };
      });

      // Animated transaction arcs
      ctx.strokeStyle = "rgba(0, 223, 247, 0.3)";
      ctx.lineWidth = 1;

      for (let i = 0; i < projected.length; i++) {
        const next = projected[(i + 3) % projected.length];
        if (projected[i].isFront && next.isFront) {
          ctx.beginPath();
          ctx.moveTo(projected[i].projX, projected[i].projY);
          const midX = (projected[i].projX + next.projX) / 2;
          const midY = (projected[i].projY + next.projY) / 2 - 25;
          ctx.quadraticCurveTo(midX, midY, next.projX, next.projY);
          ctx.stroke();
        }
      }

      // Draw node points
      projected.forEach((node) => {
        if (!node.isFront) return;

        const isSel = selectedNode.id === node.id;
        ctx.beginPath();
        ctx.arc(node.projX, node.projY, isSel ? 4.5 : 3, 0, Math.PI * 2);
        ctx.fillStyle = isSel ? "#00DFF7" : "#755CFF";
        ctx.fill();

        ctx.fillStyle = isSel ? "#FFFFFF" : "#8A909C";
        ctx.font = isSel ? "bold 9.5px monospace" : "8.5px monospace";
        ctx.fillText(node.city, node.projX + 6, node.projY + 3);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [selectedNode]);

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/[0.04]">
      <div className="max-w-[1440px] mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="mono-label block tracking-[0.2em] text-ron-cyan">
            11 // GLOBAL DIGITAL INFRASTRUCTURE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Worldwide Network Mesh
          </h2>
          <p className="text-xs sm:text-sm text-ron-muted max-w-lg mx-auto font-sans">
            184 sovereign validator clusters and 18,482 RPC infrastructure nodes spread across 42 jurisdictions.
          </p>
        </div>

        {/* Globe & Global Telemetry (Asymmetric 7/5 Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* 3D Digital Globe Visualizer (7 cols) */}
          <div
            className="lg:col-span-7 relative aspect-[4/3] surface-type-b tech-corner-tl p-4 flex items-center justify-center shadow-2xl overflow-hidden"
            data-cursor="explore"
          >
            <canvas ref={canvasRef} className="w-full h-full" />
            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-[2px] bg-black/90 border border-white/10 font-mono text-[9px] text-ron-cyan">
              SPHERICAL BFT MESH ACTIVE
            </div>
          </div>

          {/* Side Telemetry Stats (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="surface-type-c tech-corner-br p-8 space-y-6 font-mono text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <span className="text-white font-bold uppercase tracking-wider flex items-center gap-2 text-[11px]">
                  <Globe2 className="w-3.5 h-3.5 text-ron-cyan" />
                  <span>GLOBAL TELEMETRY</span>
                </span>
                <span className="text-ron-green font-bold text-[10px]">99.998% UPTIME</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 surface-type-a">
                  <span className="mono-label text-[9px] block">VALIDATOR HUBS</span>
                  <span className="text-2xl font-bold text-white mt-0.5 block mono-data">184</span>
                </div>

                <div className="p-3.5 surface-type-a">
                  <span className="mono-label text-[9px] block">JURISDICTIONS</span>
                  <span className="text-2xl font-bold text-ron-cyan mt-0.5 block mono-data">42</span>
                </div>

                <div className="p-3.5 surface-type-a">
                  <span className="mono-label text-[9px] block">PHYSICAL NODES</span>
                  <span className="text-2xl font-bold text-ron-green mt-0.5 block mono-data">18,482</span>
                </div>

                <div className="p-3.5 surface-type-a">
                  <span className="mono-label text-[9px] block">AVG LATENCY</span>
                  <span className="text-2xl font-bold text-ron-violet mt-0.5 block mono-data">18ms</span>
                </div>
              </div>

              {/* Node Inspector Selector */}
              <div className="space-y-2 pt-2 border-t border-white/[0.08]">
                <span className="mono-label text-[9px] block">HIGHLIGHT REGIONAL CLUSTER</span>
                <div className="flex flex-wrap gap-1.5">
                  {GLOBAL_NODES_DATA.slice(0, 6).map((node) => (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      className={`px-2 py-1 rounded-[2px] text-[10px] border transition-colors ${
                        selectedNode.id === node.id
                          ? "bg-ron-cyan/20 border-ron-cyan text-white font-bold"
                          : "bg-white/[0.02] border-white/[0.06] text-ron-muted hover:text-white"
                      }`}
                    >
                      {node.city}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <Link href="/nodes">
                  <Button
                    variant="primary"
                    className="w-full text-xs font-mono"
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    EXPLORE NODE ATLAS
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
