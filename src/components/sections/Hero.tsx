"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

export function Hero() {
  const scrollToSection = (targetId: string, eventName: "hero_primary_cta_click" | "hero_secondary_cta_click") => {
    trackEvent(eventName, {
      location: "hero",
      route: window.location.pathname,
    });
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[95vh] flex flex-col items-center justify-center pt-24 overflow-hidden">
      {/* Background glow — hidden on mobile: blur-[150px] is GPU-intensive on small devices */}
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white opacity-[0.015] blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 text-center z-10 flex flex-col items-center">
        <div className="flex flex-col items-center">
          {/* Badge — animated decoration, not the LCP element */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center rounded-full border border-white/10 bg-[#0A0A0A]/50 px-3 py-1.5 text-xs text-[#B5B5BE] backdrop-blur-md mb-8 tracking-widest uppercase font-mono shadow-sm"
          >
            <span className="flex w-2 h-2 rounded-full bg-white/80 mr-2 animate-pulse" />
            Soluzioni AI con Piano Base e Piano Pro
          </motion.div>

          {/* H1 — static render: LCP element must not wait for JS hydration */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white max-w-5xl mb-6 leading-[1.05] text-balance">
            Ogni richiesta nel flusso giusto: <br className="hidden md:block" />
            <span className="text-gradient">appuntamenti, lead e operazioni</span>
          </h1>

          {/* P — static render */}
          <p className="text-lg md:text-xl text-[#B5B5BE] max-w-2xl mb-12 leading-relaxed">
            Galatea resta il centro per appuntamenti beauty. Cricchetto porta ordine
            nelle officine. Atlas collega workflow e processi interni, mentre Igea
            e Hermes sono in arrivo per studi professionali e lead intake.
          </p>

          {/* CTA buttons — subtle entrance animation */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto mt-2"
          >
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
          </motion.div>
        </div>
      </div>

      {/* Decorative Bottom Line */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
