"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface FiloLogoProps {
  /** Height of the symbol mark in px. Wordmark scales optically to perfectly balance it. */
  size?: number;
  className?: string;
}

/**
 * FiloLogoFull
 * Official Filò brand lockup. Uses the exact provided official SVG assets
 * (`filo_brand_symbol.svg` and `filo_brand_wordmark.svg`) ensuring perfect
 * geometry, cohesive presentation, and uncompromised rendering fidelity.
 */
export function FiloLogoFull({ size = 28, className }: FiloLogoProps) {
  // Optically refined scaling for a sharper, more intentional lockup
  const symbolHeight = size;
  const symbolWidth = size * (133 / 119); // Derived from symbol viewBox (133x119)

  // The wordmark sits proportionately slightly smaller than the symbol's full bounding box
  // for an elegant, premium balance rather than competing for dominance.
  const wordmarkRatio = 0.58; 
  const wordmarkHeight = size * wordmarkRatio;
  const wordmarkWidth = wordmarkHeight * (157 / 80); // Derived from wordmark viewBox (157x80)

  // Tighter, more intentional spacing (gap) between the mark and the text
  const gap = size * 0.38;

  return (
    <span
      className={cn("inline-flex items-center select-none", className)}
      style={{ gap }}
      aria-label="Filò"
    >
      <Image
        src="/Brand/filo_brand_symbol.svg"
        alt=""
        aria-hidden="true"
        width={133}
        height={119}
        priority
        unoptimized // Ensures raw, crisp SVG delivery exactly as provided
        className="shrink-0"
        style={{
          width: symbolWidth,
          height: symbolHeight,
          objectFit: "contain",
        }}
      />
      {/* ── Wordmark Wrapper ── */}
      <span className="flex items-center">
        <Image
          src="/Brand/filo_brand_wordmark.svg"
          alt=""
          aria-hidden="true"
          width={157}
          height={80}
          priority
          unoptimized
          className="shrink-0"
          style={{
            width: wordmarkWidth,
            height: wordmarkHeight,
            objectFit: "contain",
          }}
        />
      </span>
    </span>
  );
}

/**
 * FiloLogoSymbol
 * Symbol-only variant — for favicons, micro-branding, compact areas.
 */
export function FiloLogoSymbol({ size = 28, className }: FiloLogoProps) {
  const symbolWidth = size * (133 / 119);
  
  return (
    <Image
      src="/Brand/filo_brand_symbol.svg"
      alt="Filò"
      width={133}
      height={119}
      priority
      unoptimized
      className={cn("shrink-0 select-none", className)}
      style={{
        width: symbolWidth,
        height: size,
        objectFit: "contain",
      }}
    />
  );
}
