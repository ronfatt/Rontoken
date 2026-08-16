"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("System boundary caught error:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 font-mono">
      <div className="max-w-md surface-type-c tech-corner-tl tech-corner-br p-8 sm:p-10 space-y-6 shadow-2xl">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[3px] bg-ron-red/[0.08] border border-ron-red/30 text-ron-red text-[10px] uppercase font-bold">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>SYSTEM INTERRUPTION</span>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white font-sans">
            Execution Anomaly
          </h2>
          <p className="text-xs text-ron-muted leading-relaxed font-sans">
            This interface encountered an unexpected condition. Consensus state remains safe.
          </p>
        </div>

        <div className="p-3 surface-type-d text-[10px] text-ron-dim text-left">
          <span>ERROR ID: 0xERR_{Math.random().toString(36).substring(2, 9).toUpperCase()}</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
          <Button
            variant="primary"
            size="md"
            onClick={() => reset()}
            className="w-full sm:w-auto text-xs"
            leftIcon={<RefreshCw className="w-3.5 h-3.5 text-black" />}
          >
            RETRY EXECUTION
          </Button>

          <Link href="/" className="w-full sm:w-auto">
            <Button
              variant="secondary"
              size="md"
              className="w-full sm:w-auto text-xs"
              leftIcon={<Home className="w-3.5 h-3.5" />}
            >
              RETURN TO HOME
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
