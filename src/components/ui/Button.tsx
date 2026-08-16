"use client";

import React, { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "icon" | "system" | "outline" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
  isMagnetic?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      isMagnetic = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const btnRef = useRef<HTMLButtonElement | null>(null);

    const baseStyles =
      "relative inline-flex items-center justify-center font-mono font-bold transition-all duration-150 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed select-none active:scale-[0.97] tracking-wider uppercase";

    const sizeStyles = {
      sm: "text-[10.5px] px-3 py-1.5 gap-1.5 rounded-[3px]",
      md: "text-xs px-4 py-2.5 gap-2 rounded-[4px]",
      lg: "text-xs px-6 py-3.5 gap-2.5 rounded-[4px] tracking-widest",
      icon: "p-2 w-8 h-8 rounded-[4px]",
    };

    const variantStyles = {
      primary:
        "bg-white text-black hover:bg-[#E8EDF5] border border-white shadow-[0_0_20px_rgba(0,231,255,0.3)] hover:shadow-[0_0_30px_rgba(0,231,255,0.55)]",
      secondary:
        "bg-[#070913] text-[#F5F7FA] hover:bg-[#0D1020] hover:text-white border border-ron-violet/40 hover:border-ron-cyan/70 shadow-[0_4px_15px_rgba(0,0,0,0.6)]",
      ghost:
        "bg-transparent text-ron-muted hover:text-white hover:bg-white/[0.04] border border-transparent",
      system:
        "bg-[#070913] text-ron-cyan border border-ron-cyan/40 hover:bg-ron-cyan/10 hover:border-ron-cyan shadow-[0_0_15px_rgba(0,231,255,0.2)]",
      outline:
        "bg-transparent text-ron-text border border-white/15 hover:border-ron-cyan/50 hover:bg-white/[0.02]",
      danger:
        "bg-ron-red/10 text-ron-red border border-ron-red/30 hover:bg-ron-red/20",
      icon: "bg-transparent text-ron-muted hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10",
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!isMagnetic || disabled || isLoading) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      e.currentTarget.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!isMagnetic) return;
      e.currentTarget.style.transform = "translate(0px, 0px)";
    };

    return (
      <button
        ref={(el) => {
          btnRef.current = el;
          if (typeof ref === "function") ref(el);
          else if (ref) ref.current = el;
        }}
        disabled={disabled || isLoading}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {isLoading ? (
          <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin mr-1.5" />
        ) : (
          leftIcon
        )}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
