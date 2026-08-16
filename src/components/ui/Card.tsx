"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  surface?: "A" | "B" | "C" | "D" | "E";
  hasTechCorners?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  className,
  surface = "B",
  hasTechCorners = false,
  children,
  ...props
}) => {
  const surfaceClass = {
    A: "surface-type-a p-4",
    B: "surface-type-b p-5",
    C: "surface-type-c p-6",
    D: "surface-type-d p-5",
    E: "surface-type-e p-4",
  }[surface];

  return (
    <div
      className={cn(
        "relative",
        surfaceClass,
        hasTechCorners && "tech-corner-tl tech-corner-br",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
