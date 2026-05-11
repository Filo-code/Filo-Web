"use client";

import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

function scrollToSection(
  targetId: string,
  eventName: "hero_primary_cta_click" | "hero_secondary_cta_click"
) {
  trackEvent(eventName, {
    location: "hero",
    route: window.location.pathname,
  });
  document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
}

export function HeroActions() {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto mt-2">
      <Button
        variant="premium"
        size="lg"
        className="w-full sm:w-auto px-8 h-12 text-sm"
        onClick={() => scrollToSection("contact", "hero_primary_cta_click")}
      >
        Richiedi una demo
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="w-full sm:w-auto px-8 h-12 text-sm"
        onClick={() => scrollToSection("products", "hero_secondary_cta_click")}
      >
        Confronta le soluzioni
      </Button>
    </div>
  );
}
