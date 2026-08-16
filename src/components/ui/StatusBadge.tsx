"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type StatusVariant =
  | "LIVE"
  | "ONLINE"
  | "SYNCED"
  | "VALIDATED"
  | "PENDING"
  | "SUCCESS"
  | "FAILED"
  | "WARNING"
  | "OPTIMAL"
  | "ACTIVE";

interface StatusBadgeProps {
  status: StatusVariant | string;
  size?: "sm" | "md";
  showDot?: boolean;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = "sm",
  showDot = true,
  className,
}) => {
  const norm = status.toUpperCase();

  const getColors = () => {
    switch (norm) {
      case "LIVE":
      case "ONLINE":
      case "SYNCED":
      case "VALIDATED":
      case "SUCCESS":
      case "OPTIMAL":
      case "ACTIVE":
        return {
          bg: "bg-ron-green/[0.08]",
          border: "border-ron-green/30",
          text: "text-ron-green",
          dot: "bg-ron-green",
        };
      case "PENDING":
      case "WARNING":
        return {
          bg: "bg-ron-amber/[0.08]",
          border: "border-ron-amber/30",
          text: "text-ron-amber",
          dot: "bg-ron-amber",
        };
      case "FAILED":
      case "CRITICAL":
        return {
          bg: "bg-ron-red/[0.08]",
          border: "border-ron-red/30",
          text: "text-ron-red",
          dot: "bg-ron-red",
        };
      default:
        return {
          bg: "bg-white/[0.04]",
          border: "border-white/10",
          text: "text-ron-muted",
          dot: "bg-ron-muted",
        };
    }
  };

  const colors = getColors();

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-mono uppercase tracking-widest border rounded-[3px]",
        size === "sm" ? "px-1.5 py-0.5 text-[9px]" : "px-2 py-0.5 text-[10px]",
        colors.bg,
        colors.border,
        colors.text,
        className
      )}
    >
      {showDot && (
        <span className={cn("w-1 h-1 rounded-full shrink-0", colors.dot)} />
      )}
      <span>{status}</span>
    </span>
  );
};
