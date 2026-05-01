"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { defaultConsent, hasSavedConsent, saveConsentState } from "@/lib/consent";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!hasSavedConsent()) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleNecessaryOnly = () => {
    saveConsentState(defaultConsent);
    setIsVisible(false);
  };

  const handleAnalyticsConsent = () => {
    saveConsentState({
      necessary: true,
      analytics: true,
      marketing: false,
    });
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-0 sm:bottom-6 inset-x-0 z-[200] flex justify-center px-4 md:px-0 pointer-events-none"
        >
          <div className="bg-[#0A0A0A] border border-white/10 p-5 rounded-2xl w-full max-w-lg shadow-[0_8px_32px_rgba(0,0,0,0.8)] backdrop-blur-md flex flex-col gap-4 pointer-events-auto">
            <div>
              <h4 className="text-sm font-semibold text-white mb-1.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B5B5BE] animate-pulse" aria-hidden="true" />
                Privacy e preferenze
              </h4>
              <p className="text-xs text-white/50 leading-relaxed">
                Usiamo solo preferenze tecniche necessarie di default. Puoi autorizzare analytics
                privacy-first per misurare pageview e interazioni senza inviare dati personali. I tag
                marketing, come GA4 advertising o Meta Pixel, restano disattivati finché non ci sarà
                un consenso dedicato. Dettagli nella{" "}
                <Link href="/privacy" className="text-white/80 underline hover:text-white transition-colors">Privacy Policy</Link>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Button variant="outline" size="sm" className="w-full sm:flex-1 text-[11px] h-9" onClick={handleNecessaryOnly}>
                Solo necessari
              </Button>
              <Button variant="premium" size="sm" className="w-full sm:flex-1 text-[11px] h-9" onClick={handleAnalyticsConsent}>
                Consenti analytics
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
