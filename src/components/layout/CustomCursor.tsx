"use client";

import React, { useEffect, useState } from "react";

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState<"default" | "link" | "cta" | "drag" | "explore" | "copy">("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    // Check if device supports touch or user requested reduced motion
    const mqTouch = window.matchMedia("(pointer: coarse)");
    const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mqTouch.matches || mqReduced.matches) {
      setIsTouch(true);
      return;
    }
    setIsTouch(false);

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorType = target.closest("[data-cursor]")?.getAttribute("data-cursor");
      if (cursorType === "drag") {
        setCursorState("drag");
      } else if (cursorType === "explore") {
        setCursorState("explore");
      } else if (cursorType === "copy") {
        setCursorState("copy");
      } else if (target.closest("button") || target.closest("a") || target.tagName === "BUTTON" || target.tagName === "A") {
        const isPrimary = target.closest(".bg-white") || target.classList.contains("bg-white");
        setCursorState(isPrimary ? "cta" : "link");
      } else {
        setCursorState("default");
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  const isExpanded = cursorState !== "default";

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-75 ease-out"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
    >
      {/* Central Core Pointer */}
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center font-mono uppercase text-[8px] font-bold tracking-widest ${
          isExpanded
            ? "w-10 h-10 bg-ron-violet/30 border border-ron-cyan text-white backdrop-blur-[2px] shadow-[0_0_15px_rgba(0,223,247,0.3)]"
            : "w-2.5 h-2.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
        }`}
      >
        {cursorState === "drag" && "DRAG"}
        {cursorState === "explore" && "VIEW"}
        {cursorState === "copy" && "COPY"}
      </div>
    </div>
  );
};
