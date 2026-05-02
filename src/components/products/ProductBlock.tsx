"use client";

import { motion } from "framer-motion";
import { Button, buttonClassName } from "@/components/ui/Button";
import { Check, Bot, Workflow, ArrowRight, Wrench } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { DashboardPreview } from "./DashboardPreview";
import { EarlyAccessForm } from "./EarlyAccessForm";
import { trackEvent } from "@/lib/analytics";

interface ProductBlockProps {
  id: string;
  name: string;
  description: string;
  target: string;
  mainBenefit: string;
  metaChips?: Array<{ label: string; value: string }>;
  status: "active" | "coming_soon";
  type: "galatea" | "cricchetto" | "atlas" | "igea" | "hermes";
  baseFeatures: string[];
  proFeatures: string[];
  ctaBaseText: string;
  ctaFinalText: string;
  ctaSecondaryText: string;
  externalCtaHref?: string;
  externalCtaLabel?: string;
}

// ── Per-product design tokens ──────────────────────────────────────────────
const PRODUCT_ACCENT: Record<string, { color: string; rgb: string; glowClass: string; statusBadge: string }> = {
  galatea:    { color: "#10B981", rgb: "16,185,129",  glowClass: "bg-emerald-500", statusBadge: "Disponibile ora"       },
  cricchetto: { color: "#F97316", rgb: "249,115,22",  glowClass: "bg-orange-500",  statusBadge: "Attivo"                },
  atlas:      { color: "#6366F1", rgb: "99,102,241",  glowClass: "bg-indigo-500",  statusBadge: "Su richiesta"          },
  igea:       { color: "#22D3EE", rgb: "34,211,238",  glowClass: "bg-cyan-400",    statusBadge: "In arrivo"             },
  hermes:     { color: "#F59E0B", rgb: "245,158,11",  glowClass: "bg-amber-500",   statusBadge: "Non ancora disponibile" },
};

export function ProductBlock({
  name, description, target, mainBenefit,
  metaChips,
  status, type,
  baseFeatures, proFeatures,
  ctaBaseText, ctaFinalText, ctaSecondaryText,
  externalCtaHref, externalCtaLabel,
  id,
}: ProductBlockProps) {
  const [activeTab, setActiveTab] = useState<"base" | "pro">("base");
  const isActive = status === "active";
  const accent = PRODUCT_ACCENT[type];

  const handleTabChange = (tab: "base" | "pro") => setActiveTab(tab);
  const scrollToContact = (label: string) => {
    trackEvent("product_cta_click", {
      location: "product_block",
      product: type,
      label,
      path: window.location.pathname,
    });
    window.dispatchEvent(
      new CustomEvent("filo_product_interest_selected", { detail: { product: type } })
    );
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };
  const trackExternalCta = (label: string) => {
    trackEvent("product_cta_click", {
      location: "product_block",
      product: type,
      label,
      destination: externalCtaHref,
      path: window.location.pathname,
    });
  };

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "glass-card p-8 md:p-12 transition-all duration-700 relative overflow-hidden group scroll-mt-24",
        !isActive ? "opacity-95 border-white/5 hover:border-white/10" : "hover:-translate-y-0.5"
      )}
    >
      {/* Product accent glow — top-right */}
      <div
        className={cn("absolute -top-40 -right-40 w-96 h-96 rounded-full blur-[140px] pointer-events-none transition-opacity duration-1000", accent.glowClass)}
        style={{ opacity: isActive ? 0.07 : 0.03 }}
      />

      {/* ── HEADER SECTION ────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-8 relative z-10">
        <div className="max-w-2xl">

          {/* Name + Status badge */}
          <div className="flex items-center flex-wrap gap-3 mb-4">
            <h3 className="text-4xl font-bold tracking-tight text-white">{name}</h3>
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide border"
              style={{
                color: accent.color,
                borderColor: `rgba(${accent.rgb}, 0.3)`,
                background: `rgba(${accent.rgb}, 0.08)`,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: accent.color, boxShadow: isActive ? `0 0 6px ${accent.color}` : "none" }}
              />
              {accent.statusBadge}
            </span>
          </div>

          <p className="text-[#B5B5BE] text-lg mb-6 leading-relaxed">{description}</p>

          {/* Meta chips */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center rounded-md bg-[#111111] border border-white/5 px-3 py-1.5 text-xs font-medium text-white/60">
              <span className="text-white/30 mr-2">Target:</span> {target}
            </div>
            {metaChips?.map((chip) => (
              <div
                key={`${name}-${chip.label}-${chip.value}`}
                className="inline-flex items-center rounded-md bg-[#111111] border border-white/5 px-3 py-1.5 text-xs font-medium text-white/60"
              >
                <span className="text-white/30 mr-2">{chip.label}:</span> {chip.value}
              </div>
            ))}
            <div
              className="inline-flex items-center rounded-md border px-3 py-1.5 text-xs font-medium"
              style={{ borderColor: `rgba(${accent.rgb}, 0.2)`, background: `rgba(${accent.rgb}, 0.05)` }}
            >
              <span className="text-white/30 mr-2">Vantaggio:</span>
              <span className="text-white/80">{mainBenefit}</span>
            </div>
          </div>
        </div>

        {/* Tab switcher — active products only */}
        {isActive && (
          <div className="flex items-center w-full md:w-auto overflow-x-auto no-scrollbar bg-[#080808] rounded-lg p-1 border border-white/5 self-start shadow-inner shrink-0">
            <button
              onClick={() => handleTabChange("base")}
              className={cn(
                "px-5 py-2.5 rounded-md text-sm font-medium transition-all duration-300 whitespace-nowrap flex-1 md:flex-none",
                activeTab === "base"
                  ? "bg-white/10 text-white shadow-sm ring-1 ring-white/10"
                  : "text-[#B5B5BE] hover:text-white hover:bg-white/5"
              )}
            >
              Piano Base
            </button>
            <button
              onClick={() => handleTabChange("pro")}
              className={cn(
                "px-5 py-2.5 rounded-md text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap flex-1 md:flex-none",
                activeTab !== "pro" ? "text-[#B5B5BE] hover:text-white hover:bg-white/5" : "text-black shadow-lg"
              )}
              style={activeTab === "pro" ? { background: accent.color } : {}}
            >
              Piano Pro <Workflow className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          ACTIVE PRODUCT · BASE TAB — features side by side w/ visual
          ══════════════════════════════════════════════════════════════════ */}
      {isActive && activeTab === "base" && (
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 mt-4 relative z-10">
          {/* Feature list */}
          <div className="flex flex-col">
            <div className="mb-6 border-b border-white/5 pb-4">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40">Piano Base · Funzioni chiave</h4>
            </div>
            <ul className="space-y-4 flex-1">
              {baseFeatures.map((feature, i) => (
                <motion.li
                  key={`${name}-base-${i}`}
                  initial={{ opacity: 0, y: 5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 + 0.1 }}
                  className="flex items-start group/f"
                >
                  <div
                    className="mr-4 mt-0.5 rounded-full p-1 shrink-0 transition-all duration-300 border"
                    style={{ background: `rgba(${accent.rgb}, 0.08)`, borderColor: `rgba(${accent.rgb}, 0.2)` }}
                  >
                    <Check className="w-3 h-3" style={{ color: accent.color }} />
                  </div>
                  <span className="text-[#B5B5BE] leading-relaxed group-hover/f:text-white/90 transition-colors text-sm">
                    {feature}
                  </span>
                </motion.li>
              ))}
            </ul>
            <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row gap-3">
              {externalCtaHref ? (
                <a
                  href={externalCtaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClassName({ variant: "outline", className: "w-full sm:w-auto group" })}
                  onClick={() => trackExternalCta("external_product_cta")}
                >
                  {externalCtaLabel ?? ctaBaseText}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              ) : (
                <Button
                  variant="outline"
                  className="w-full sm:w-auto group"
                  onClick={() => scrollToContact("base_cta")}
                >
                  {ctaBaseText}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              )}
              <Button
                variant="ghost"
                className="w-full sm:w-auto group"
                onClick={() => scrollToContact("secondary_cta")}
              >
                {ctaSecondaryText}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Visual placeholder — base plan */}
          <div className="hidden lg:flex items-center justify-center w-full min-h-[360px] relative group/cover">
            <div
              className="absolute inset-0 rounded-xl border overflow-hidden flex flex-col items-center justify-center"
              style={{ background: `rgba(${accent.rgb}, 0.02)`, borderColor: `rgba(${accent.rgb}, 0.08)` }}
            >
              {type === "galatea" && (
                <div className="flex flex-col items-center">
                  <div className="w-44 h-44 rounded-full flex items-center justify-center relative"
                    style={{ border: `1px solid rgba(${accent.rgb}, 0.12)` }}>
                    <div className="absolute inset-0 rounded-full border-t animate-spin"
                      style={{ borderColor: `rgba(${accent.rgb}, 0.3)`, animationDuration: "10s" }} />
                    <div className="w-28 h-28 rounded-full flex items-center justify-center"
                      style={{ background: `radial-gradient(circle, rgba(${accent.rgb}, 0.06) 0%, transparent 70%)`, border: `1px solid rgba(${accent.rgb}, 0.08)` }}>
                      <Bot className="w-8 h-8" style={{ color: `rgba(${accent.rgb}, 0.45)` }} />
                    </div>
                  </div>
                  <p className="mt-8 font-mono text-[10px] tracking-[0.2em] text-white/25 uppercase">Struttura Operativa Attiva</p>
                </div>
              )}
              {type === "atlas" && (
                <div className="relative flex flex-col items-center justify-center w-full h-full p-8">
                  <div className="absolute inset-0 opacity-10 rounded-xl"
                    style={{ background: `radial-gradient(ellipse at center, rgba(${accent.rgb},0.4) 0%, transparent 70%)` }} />
                  <div className="flex gap-5 items-end">
                    {[40, 68, 96].map((h, i) => (
                      <div key={i} className="w-5 rounded-t"
                        style={{ height: h, background: i === 2 ? `rgba(${accent.rgb},0.3)` : "rgba(255,255,255,0.06)" }} />
                    ))}
                  </div>
                  <div className="w-48 h-px mt-3"
                    style={{ background: `linear-gradient(to right, transparent, rgba(${accent.rgb},0.4), transparent)` }} />
                  <p className="mt-8 font-mono text-[10px] tracking-[0.2em] text-white/25 uppercase">Workflow Automatizzato</p>
                </div>
              )}
              {type === "cricchetto" && (
                <div className="flex flex-col items-center">
                  <div
                    className="w-44 h-44 rounded-full flex items-center justify-center relative"
                    style={{ border: `1px solid rgba(${accent.rgb}, 0.12)` }}
                  >
                    <div
                      className="absolute inset-0 rounded-full border-t animate-spin"
                      style={{ borderColor: `rgba(${accent.rgb}, 0.3)`, animationDuration: "12s" }}
                    />
                    <div
                      className="w-28 h-28 rounded-full flex items-center justify-center"
                      style={{ background: `radial-gradient(circle, rgba(${accent.rgb}, 0.06) 0%, transparent 70%)`, border: `1px solid rgba(${accent.rgb}, 0.08)` }}
                    >
                      <Wrench className="w-8 h-8" style={{ color: `rgba(${accent.rgb}, 0.45)` }} />
                    </div>
                  </div>
                  <p className="mt-8 font-mono text-[10px] tracking-[0.2em] text-white/25 uppercase">Officina Sotto Controllo</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          ACTIVE PRODUCT · PRO TAB — compact features + IMMERSIVE dashboard
          ══════════════════════════════════════════════════════════════════ */}
      {isActive && activeTab === "pro" && (
        <div className="relative z-10 mt-4">
          {/* Compact pro features — horizontal chips grid */}
          <div className="mb-8">
            <div className="mb-5 border-b border-white/5 pb-4">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40">Piano Pro · Sistema completo</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {proFeatures.map((feature, i) => (
                <motion.div
                  key={`${name}-pro-${i}`}
                  initial={{ opacity: 0, y: 4 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 + 0.05 }}
                  className="flex items-start gap-3 px-4 py-3 rounded-lg border"
                  style={{
                    background: `rgba(${accent.rgb}, 0.04)`,
                    borderColor: `rgba(${accent.rgb}, 0.12)`,
                  }}
                >
                  <div
                    className="mt-0.5 rounded-full p-1 shrink-0 border"
                    style={{ background: `rgba(${accent.rgb}, 0.12)`, borderColor: `rgba(${accent.rgb}, 0.25)` }}
                  >
                    <Check className="w-2.5 h-2.5" style={{ color: accent.color }} />
                  </div>
                  <span className="text-white/75 text-xs leading-relaxed">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-10">
            {externalCtaHref ? (
              <a
                href={externalCtaHref}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClassName({ variant: "premium", className: "group" })}
                onClick={() => trackExternalCta("external_product_cta")}
              >
                {externalCtaLabel ?? ctaFinalText}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            ) : (
              <Button
                variant="premium"
                className="group"
                onClick={() => scrollToContact("pro_cta")}
              >
                {ctaFinalText}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            )}
            <Button
              variant="outline"
              className="group"
              onClick={() => scrollToContact("secondary_cta")}
            >
              {ctaSecondaryText}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-[11px] text-white/30 tracking-wide hidden sm:block">
              Piano Pro include tutto il Base e aggiunge dashboard, controllo e automazioni avanzate.
            </p>
          </div>

          {/* ─── IMMERSIVE FULL-WIDTH DASHBOARD ─── */}
          <div className="relative">
            {/* Accent glow behind dashboard */}
            <div
              className="absolute inset-0 blur-[80px] rounded-full pointer-events-none"
              style={{ background: `rgba(${accent.rgb}, 0.04)` }}
            />

            {/* Label row */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accent.color, boxShadow: `0 0 8px ${accent.color}` }} />
                <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-white/40">
                  {type === "cricchetto" ? "Vista operativa · Dashboard web + WhatsApp" : "Dashboard Pro · Controllo operativo"}
                </span>
              </div>
              <div className="text-[10px] text-white/20 font-mono hidden sm:block">
                {type === "cricchetto" ? "Schede, stati e comandi operativi in un pannello unico" : "Richieste, stato e metriche in un pannello unico"}
              </div>
            </div>

            {/* Dashboard container — large, immersive */}
            <div
              className={cn(
                "w-full rounded-xl overflow-hidden border relative z-10",
                type === "galatea" || type === "atlas" ? "h-[650px] md:h-[720px]" : type === "cricchetto" ? "h-[620px] md:h-[840px]" : "h-[500px] md:h-[580px]"
              )}
              style={{
                borderColor: `rgba(${accent.rgb}, 0.15)`,
                boxShadow: `0 0 60px -20px rgba(${accent.rgb}, 0.12), 0 32px 80px -20px rgba(0,0,0,0.6)`,
              }}
            >
              <DashboardPreview productType={type} />
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          COMING SOON — features + early access form + faded dashboard
          ══════════════════════════════════════════════════════════════════ */}
      {!isActive && (
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 mt-4 relative z-10">
          {/* Left: features + early access */}
          <div className="flex flex-col">
            <div className="mb-6 border-b border-white/5 pb-4">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40">Funzioni previste</h4>
            </div>
            <ul className="space-y-4 mb-10">
              {baseFeatures.map((feature, i) => (
                <motion.li
                  key={`${name}-cs-${i}`}
                  initial={{ opacity: 0, y: 5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 + 0.1 }}
                  className="flex items-start"
                >
                  <div
                    className="mr-4 mt-0.5 rounded-full p-1 shrink-0 border"
                    style={{ background: `rgba(${accent.rgb}, 0.06)`, borderColor: `rgba(${accent.rgb}, 0.15)` }}
                  >
                    <Check className="w-3 h-3" style={{ color: `rgba(${accent.rgb.split(",").join(", ")}, 0.7)` }} />
                  </div>
                  <span className="text-white/40 leading-relaxed text-sm">{feature}</span>
                </motion.li>
              ))}
            </ul>

            {/* Early access form */}
            <EarlyAccessForm
              productName={name}
              accentColor={accent.color}
              accentColorRgb={accent.rgb}
              primaryCtaText={ctaBaseText}
              secondaryCtaText={ctaSecondaryText}
            />
          </div>

          {/* Right: greyed preview dashboard (larger) */}
          <div className="hidden lg:flex items-start justify-center">
            <div
              className="w-full rounded-xl overflow-hidden transition-all duration-700 border"
              style={{
                height: "480px",
                opacity: 0.28,
                filter: "grayscale(60%)",
                borderColor: `rgba(${accent.rgb}, 0.08)`,
              }}
            >
              <DashboardPreview productType={type} />
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
