"use client";

import React, { useEffect, useState } from "react";

export const BootSequence: React.FC = () => {
  const [bootVisible, setBootVisible] = useState(false);
  const [bootStep, setBootStep] = useState(0);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Check session storage so boot only runs once per browser session
    const hasBooted = sessionStorage.getItem("ron_booted_session");
    if (!hasBooted) {
      setBootVisible(true);

      const t1 = setTimeout(() => setBootStep(1), 400); // Pulse & Mark resolves
      const t2 = setTimeout(() => setBootStep(2), 900); // Telemetry 1: Network Online
      const t3 = setTimeout(() => setBootStep(3), 1400); // Telemetry 2: Validators Synced
      const t4 = setTimeout(() => setBootStep(4), 1900); // Telemetry 3: Intelligence Ready
      const t5 = setTimeout(() => {
        setIsClosing(true);
        setTimeout(() => {
          setBootVisible(false);
          sessionStorage.setItem("ron_booted_session", "true");
        }, 500);
      }, 2400);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
        clearTimeout(t5);
      };
    }
  }, []);

  const handleSkip = () => {
    setIsClosing(true);
    setTimeout(() => {
      setBootVisible(false);
      sessionStorage.setItem("ron_booted_session", "true");
    }, 200);
  };

  if (!bootVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#050507] flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isClosing ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      <div className="max-w-md w-full px-6 space-y-6 text-center font-mono">
        {/* Core Mark Resolve */}
        <div className="relative inline-flex items-center justify-center">
          <div
            className={`w-12 h-12 rounded-[6px] bg-white text-black font-black text-lg flex items-center justify-center transition-all duration-500 ${
              bootStep >= 1
                ? "opacity-100 scale-100 shadow-[0_0_40px_rgba(117,92,255,0.4)]"
                : "opacity-0 scale-75"
            }`}
          >
            R
          </div>
          {bootStep >= 1 && (
            <span className="absolute -inset-2 rounded-[8px] border border-ron-violet/40 animate-ping" />
          )}
        </div>

        {/* Brand statement */}
        <div
          className={`space-y-1 transition-all duration-300 ${
            bootStep >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <h2 className="text-xl font-bold tracking-[0.2em] text-white font-sans">RON</h2>
          <p className="text-[10px] text-ron-cyan tracking-widest uppercase">
            THE PROGRAMMABLE ECONOMY
          </p>
        </div>

        {/* Sequential Telemetry Readout */}
        <div className="surface-type-d p-3.5 space-y-2 text-left text-[11px] text-ron-muted min-h-[96px]">
          {bootStep >= 2 && (
            <div className="flex items-center justify-between text-ron-green animate-in fade-in slide-in-from-left-2 duration-300">
              <span>&gt; NETWORK PROTOCOL:</span>
              <span className="font-bold">ONLINE (184 HUBS)</span>
            </div>
          )}
          {bootStep >= 3 && (
            <div className="flex items-center justify-between text-ron-cyan animate-in fade-in slide-in-from-left-2 duration-300">
              <span>&gt; BFT CONSENSUS:</span>
              <span className="font-bold">VALIDATED (0.42s)</span>
            </div>
          )}
          {bootStep >= 4 && (
            <div className="flex items-center justify-between text-ron-violet animate-in fade-in slide-in-from-left-2 duration-300">
              <span>&gt; AI COGNITIVE AGENT:</span>
              <span className="font-bold">INITIALIZED</span>
            </div>
          )}
        </div>

        {/* Skip button */}
        <button
          onClick={handleSkip}
          className="text-[10px] text-ron-dim hover:text-white uppercase tracking-widest px-3 py-1 rounded-[2px] bg-white/[0.04] hover:bg-white/10 transition-colors"
        >
          [ PRESS TO ENTER ]
        </button>
      </div>
    </div>
  );
};
