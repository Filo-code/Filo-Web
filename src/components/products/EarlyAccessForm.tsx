"use client";

import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface EarlyAccessFormProps {
  productName: string;
  accentColor: string;
  accentColorRgb: string;
  primaryCtaText: string;
  secondaryCtaText: string;
}

/**
 * Early-access call-to-action for coming-soon products.
 *
 * Backend list management is not wired here. The button routes users to the
 * main contact form, which has a real submission path and explicit privacy consent.
 */
export function EarlyAccessForm({
  productName,
  accentColor,
  accentColorRgb,
  primaryCtaText,
  secondaryCtaText,
}: EarlyAccessFormProps) {
  const scrollToContact = (label: string) => {
    trackEvent("product_cta_click", {
      location: "early_access",
      product: productName.toLowerCase(),
      label,
      path: window.location.pathname,
    });
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="relative rounded-xl border p-6 overflow-hidden"
      style={{
        borderColor: `rgba(${accentColorRgb}, 0.15)`,
        background: `linear-gradient(135deg, rgba(${accentColorRgb}, 0.04) 0%, transparent 60%)`,
      }}
    >
      <div
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[60px] pointer-events-none"
        style={{ background: `rgba(${accentColorRgb}, 0.08)` }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <div
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: accentColor }}
            aria-hidden="true"
          />
          <span
            className="text-[10px] font-mono tracking-[0.15em] uppercase font-medium"
            style={{ color: accentColor }}
          >
            Disponibilità limitata
          </span>
        </div>
        <p className="text-sm font-semibold text-white mb-1">
          Vuoi valutare {productName}?
        </p>
        <p className="text-xs text-white/40 mb-5 leading-relaxed">
          Il prodotto non è ancora attivabile come soluzione completa. Lasciaci il tuo caso:
          ti ricontatteremo quando avremo un percorso coerente con la tua attività.
        </p>

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            onClick={() => scrollToContact("early_access_primary")}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-1"
            style={{
              background: `rgba(${accentColorRgb}, 0.12)`,
              border: `1px solid rgba(${accentColorRgb}, 0.25)`,
              color: accentColor,
            }}
          >
            {primaryCtaText} <ArrowRight className="w-3 h-3" />
          </button>
          <button
            type="button"
            onClick={() => scrollToContact("early_access_secondary")}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold text-white/60 transition-all hover:text-white focus-visible:outline-none focus-visible:ring-1"
          >
            {secondaryCtaText}
          </button>
        </div>
      </div>
    </div>
  );
}
