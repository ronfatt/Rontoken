"use client";

import React from "react";
import { Scene01Core } from "@/components/home/Scene01Core";
import { Scene02NetworkAwakens } from "@/components/home/Scene02NetworkAwakens";
import { Scene03WhyRon } from "@/components/home/Scene03WhyRon";
import { Scene04LiveVisualizer } from "@/components/home/Scene04LiveVisualizer";
import { Scene05TokenFlow } from "@/components/home/Scene05TokenFlow";
import { Scene06EcosystemUniverse } from "@/components/home/Scene06EcosystemUniverse";
import { Scene07SwapWidget } from "@/components/home/Scene07SwapWidget";
import { Scene08StakeSimulation } from "@/components/home/Scene08StakeSimulation";
import { Scene09ExplorerStream } from "@/components/home/Scene09ExplorerStream";
import { Scene10IntelligenceAssistant } from "@/components/home/Scene10IntelligenceAssistant";
import { Scene11GovernanceVotes } from "@/components/home/Scene11GovernanceVotes";
import { Scene12GlobalNetworkGlobe } from "@/components/home/Scene12GlobalNetworkGlobe";
import { Scene13DevelopersHub } from "@/components/home/Scene13DevelopersHub";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#04050A] text-[#F5F7FA] overflow-hidden">
      {/* Cyber Void Ambient Horizon */}
      <div className="fixed inset-0 bg-cyber-void opacity-50 pointer-events-none" />
      <div className="fixed inset-0 cyber-scanlines opacity-40 pointer-events-none" />

      {/* Cinematic Scroll-Driven Scenes */}
      <Scene01Core />
      <div className="w-full h-px laser-line opacity-40" />
      <Scene02NetworkAwakens />
      <Scene03WhyRon />
      <div className="w-full h-px laser-line opacity-40" />
      <Scene04LiveVisualizer />
      <Scene05TokenFlow />
      <div className="w-full h-px laser-line opacity-40" />
      <Scene06EcosystemUniverse />
      <Scene07SwapWidget />
      <Scene08StakeSimulation />
      <div className="w-full h-px laser-line opacity-40" />
      <Scene09ExplorerStream />
      <Scene10IntelligenceAssistant />
      <Scene11GovernanceVotes />
      <div className="w-full h-px laser-line opacity-40" />
      <Scene12GlobalNetworkGlobe />
      <Scene13DevelopersHub />
    </div>
  );
}
