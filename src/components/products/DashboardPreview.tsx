"use client";

import { GalateaDashboard } from "./dashboards/GalateaDashboard";
import { CricchettoDashboard } from "./dashboards/CricchettoDashboard";
import { AtlasDashboard } from "./dashboards/AtlasDashboard";
import { IgeaDashboard } from "./dashboards/IgeaDashboard";
import { HermesDashboard } from "./dashboards/HermesDashboard";

interface DashboardPreviewProps {
  productType: "galatea" | "cricchetto" | "atlas" | "igea" | "hermes";
}

export function DashboardPreview({ productType }: DashboardPreviewProps) {
  if (productType === "cricchetto") {
    return <CricchettoDashboard />;
  }

  if (productType === "atlas") {
    return <AtlasDashboard />;
  }
  
  if (productType === "igea") {
    return <IgeaDashboard />;
  }
  
  if (productType === "hermes") {
    return <HermesDashboard />;
  }

  return <GalateaDashboard />;
}
