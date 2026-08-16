"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Compass, Home, Radio } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 font-mono">
      <div className="max-w-md surface-type-c tech-corner-tl tech-corner-br p-8 sm:p-10 space-y-6 shadow-2xl">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[3px] bg-ron-amber/[0.08] border border-ron-amber/30 text-ron-amber text-[10px] uppercase font-bold">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>SIGNAL NOT FOUND // 404</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl sm:text-5xl font-black text-white font-sans tracking-tight">
            404
          </h1>
          <p className="text-xs text-ron-muted leading-relaxed font-sans">
            The requested network route or cryptographic state does not exist on RON Mainnet.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
          <Link href="/" className="w-full sm:w-auto">
            <Button
              variant="primary"
              size="md"
              className="w-full text-xs"
              leftIcon={<Home className="w-3.5 h-3.5 text-black" />}
            >
              RETURN HOME
            </Button>
          </Link>

          <Link href="/explorer" className="w-full sm:w-auto">
            <Button
              variant="secondary"
              size="md"
              className="w-full text-xs"
              leftIcon={<Compass className="w-3.5 h-3.5 text-ron-cyan" />}
            >
              SEARCH EXPLORER
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
