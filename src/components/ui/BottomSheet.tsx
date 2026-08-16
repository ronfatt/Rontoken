"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxHeight?: string;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxHeight = "max-h-[90vh]",
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
      />

      {/* Sheet Container */}
      <div
        className={`relative z-10 w-full rounded-t-[24px] bg-[#090A0E] border-t border-white/[0.12] shadow-[0_-10px_40px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col ${maxHeight} animate-in slide-in-from-bottom duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]`}
        style={{
          paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))",
        }}
      >
        {/* Drag Handle */}
        <div
          onClick={onClose}
          className="w-full pt-3 pb-2 flex justify-center cursor-pointer select-none shrink-0"
        >
          <div className="w-10 h-1 rounded-full bg-white/20 hover:bg-white/40 transition-colors" />
        </div>

        {/* Header (optional) */}
        {(title || subtitle) && (
          <div className="px-5 pb-3 border-b border-white/[0.06] flex items-center justify-between shrink-0">
            <div>
              {title && (
                <h3 className="text-base font-bold text-white font-sans">{title}</h3>
              )}
              {subtitle && (
                <p className="text-[11px] text-ron-muted font-mono mt-0.5">{subtitle}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/[0.04] text-ron-muted hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Scrollable Content */}
        <div className="p-5 overflow-y-auto flex-1 font-mono text-xs">{children}</div>
      </div>
    </div>
  );
};
