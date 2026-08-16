"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ECOSYSTEM_PRODUCTS } from "@/lib/mock-data";
import { EcosystemProduct } from "@/lib/types";
import { ArrowUpRight } from "lucide-react";
import { Button } from "../ui/Button";

export const Scene06EcosystemUniverse: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<EcosystemProduct>(
    ECOSYSTEM_PRODUCTS[0]
  );
  const [rotationAngle, setRotationAngle] = useState(0);

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/[0.04]">
      <div className="max-w-[1440px] mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="mono-label block tracking-[0.2em] text-ron-cyan">
            05 // SPATIAL APPLICATION MATRIX
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Ecosystem Universe
          </h2>
          <p className="text-xs sm:text-sm text-ron-muted max-w-xl mx-auto font-sans">
            Native Layer-1 primitives engineered directly on top of the RON consensus protocol.
          </p>
        </div>

        {/* Spatial Universe Visualizer & Feature Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Interactive Orbit Canvas / Radial Map (7 cols) */}
          <div
            className="lg:col-span-7 relative aspect-square max-w-md sm:max-w-lg mx-auto w-full surface-type-b tech-corner-tl p-8 flex items-center justify-center shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing"
            data-cursor="explore"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left - rect.width / 2;
              setRotationAngle((x / (rect.width / 2)) * 25);
            }}
            onMouseLeave={() => setRotationAngle(0)}
          >
            {/* Background Orbit Ring SVG */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
              <div className="w-[85%] h-[85%] rounded-full border border-dashed border-ron-violet" />
              <div className="w-[60%] h-[60%] rounded-full border border-white/10" />
            </div>

            {/* Center Core */}
            <div className="relative z-10 w-20 h-20 rounded-[6px] bg-gradient-to-br from-ron-violet to-ron-cyan p-[1.5px] shadow-[0_0_30px_rgba(117,92,255,0.3)]">
              <div className="w-full h-full bg-[#050507] rounded-[5px] flex flex-col items-center justify-center font-mono">
                <span className="text-[9px] text-ron-cyan font-bold tracking-wider">CORE</span>
                <span className="text-sm font-black text-white">RON</span>
                <span className="text-[8px] text-ron-green">HUB</span>
              </div>
            </div>

            {/* Orbiting Satellite Products */}
            {ECOSYSTEM_PRODUCTS.map((prod, index) => {
              const total = ECOSYSTEM_PRODUCTS.length;
              const angleDeg = (index * (360 / total) + rotationAngle) % 360;
              const angleRad = (angleDeg * Math.PI) / 180;
              const radius = 165;
              const ox = Math.cos(angleRad) * radius;
              const oy = Math.sin(angleRad) * radius;

              const isSelected = selectedProduct.id === prod.id;

              return (
                <button
                  key={prod.id}
                  onClick={() => setSelectedProduct(prod)}
                  style={{
                    transform: `translate(${ox}px, ${oy}px)`,
                    borderColor: isSelected ? prod.color : undefined,
                  }}
                  className={`absolute z-20 p-2 rounded-[4px] transition-all duration-200 flex items-center gap-2 select-none font-mono text-[9px] ${
                    isSelected
                      ? "bg-ron-elevated border-2 scale-110 shadow-[0_0_20px_rgba(117,92,255,0.3)] z-30"
                      : "bg-black/85 border border-white/15 hover:scale-105 hover:bg-black"
                  }`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: prod.color }}
                  />
                  <span className="font-bold text-white whitespace-nowrap">
                    {prod.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Product Inspector Detail Panel (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="surface-type-c p-8 tech-corner-tl space-y-6">
              <div className="flex items-center justify-between">
                <span className="mono-label text-[10px] text-ron-cyan font-bold">
                  {selectedProduct.category} PROTOCOL
                </span>
                <span
                  className="font-mono text-[9px] font-bold px-2 py-0.5 rounded-[2px] border"
                  style={{
                    borderColor: selectedProduct.color,
                    color: selectedProduct.color,
                    backgroundColor: `${selectedProduct.color}15`,
                  }}
                >
                  {selectedProduct.status}
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-white">{selectedProduct.name}</h3>
                <p className="text-xs text-ron-cyan font-mono mt-1">
                  {selectedProduct.tagline}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-ron-muted leading-relaxed font-sans">
                {selectedProduct.description}
              </p>

              {/* Metrics Chip */}
              <div className="p-3 surface-type-a font-mono text-xs text-ron-text">
                <span className="mono-label text-[9px] block mb-1">
                  THROUGHPUT TELEMETRY
                </span>
                <span className="text-ron-green font-semibold">
                  {selectedProduct.metrics}
                </span>
              </div>

              {/* Direct Navigation Button */}
              <div className="pt-2">
                <Link href={selectedProduct.route}>
                  <Button
                    variant="primary"
                    className="w-full text-xs"
                    rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
                  >
                    LAUNCH {selectedProduct.name.toUpperCase()}
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
