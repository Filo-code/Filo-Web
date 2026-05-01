"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export function Hero() {
  const scrollToSection = (targetId: string, label: string) => {
    trackEvent("cta_click", {
      location: "hero",
      label,
      path: window.location.pathname,
    });
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[95vh] flex flex-col items-center justify-center pt-24 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white opacity-[0.015] blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 text-center z-10 flex flex-col items-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center rounded-full border border-white/10 bg-[#0A0A0A]/50 px-3 py-1.5 text-xs text-[#B5B5BE] backdrop-blur-md mb-8 tracking-widest uppercase font-mono shadow-sm"
          >
            <span className="flex w-2 h-2 rounded-full bg-white/80 mr-2 animate-pulse" />
            Soluzioni AI con Piano Base e Piano Pro
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white max-w-5xl mb-6 leading-[1.05] text-balance"
          >
            Ogni richiesta nel flusso giusto: <br className="hidden md:block" />
            <span className="text-gradient">appuntamenti, lead e operazioni</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-[#B5B5BE] max-w-2xl mb-12 leading-relaxed"
          >
            Galatea resta il centro per appuntamenti beauty. Cricchetto porta ordine
            nelle officine. Atlas collega workflow e processi interni, mentre Igea
            e Hermes sono in arrivo per studi professionali e lead intake.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto mt-2"
          >
            <Button
              variant="premium"
              size="lg"
              className="w-full sm:w-auto px-8 h-12 text-sm"
              onClick={() => scrollToSection("contact", "book_consultation")}
            >
              Richiedi una demo
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto px-8 h-12 text-sm"
              onClick={() => scrollToSection("products", "view_solutions")}
            >
              Confronta le soluzioni
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Bottom Line */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
