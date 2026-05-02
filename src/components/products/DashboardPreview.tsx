"use client";

import dynamic from "next/dynamic";

const GalateaDashboard = dynamic(
  () => import("./dashboards/GalateaDashboard").then((m) => ({ default: m.GalateaDashboard })),
  { ssr: false }
);
const CricchettoDashboard = dynamic(
  () => import("./dashboards/CricchettoDashboard").then((m) => ({ default: m.CricchettoDashboard })),
  { ssr: false }
);
const AtlasDashboard = dynamic(
  () => import("./dashboards/AtlasDashboard").then((m) => ({ default: m.AtlasDashboard })),
  { ssr: false }
);
const IgeaDashboard = dynamic(
  () => import("./dashboards/IgeaDashboard").then((m) => ({ default: m.IgeaDashboard })),
  { ssr: false }
);
const HermesDashboard = dynamic(
  () => import("./dashboards/HermesDashboard").then((m) => ({ default: m.HermesDashboard })),
  { ssr: false }
);

interface DashboardPreviewProps {
  productType: "galatea" | "cricchetto" | "atlas" | "igea" | "hermes";
}

export function DashboardPreview({ productType }: DashboardPreviewProps) {
  if (productType === "cricchetto") return <CricchettoDashboard />;
  if (productType === "atlas") return <AtlasDashboard />;
  if (productType === "igea") return <IgeaDashboard />;
  if (productType === "hermes") return <HermesDashboard />;
  return <GalateaDashboard />;
}
