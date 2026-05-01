"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function WhyFilo() {
  return (
    <section id="why-filo" className="py-40 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      {/* Abstract shape */}
      <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[80%] bg-gradient-to-b from-white/[0.02] to-transparent border border-white/5 rounded-full mix-blend-screen pointer-events-none transform rotate-12" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Base quando serve partire. Pro quando serve controllo.
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-[#B5B5BE] mb-10 leading-relaxed">
              Filò non sostituisce il modo in cui lavori: lo rende più ordinato.
              Il Piano Base copre le funzioni essenziali per gestire richieste e notifiche.
              Il Piano Pro aggiunge dashboard, automazioni avanzate e maggiore visibilità per il titolare.
            </motion.p>
            <ul className="space-y-6">
              {[
                "Base: richieste in ingresso, risposte standard, raccolta dati e notifiche al titolare.",
                "Pro: dashboard operativa, reporting, logiche più avanzate e integrazioni dove tecnicamente possibile.",
                "Prodotti distinti per problemi distinti: appuntamenti, officine, processi interni, studi e lead intake.",
              ].map((item, i) => (
                <motion.li variants={itemVariants} key={i} className="flex items-start group">
                  <div className="mt-1 mr-4 w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
                    <CheckCircle2 className="w-3 h-3 text-white/50 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-[#B5B5BE] leading-relaxed group-hover:text-white transition-colors">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
