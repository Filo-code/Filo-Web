"use client";

import { motion } from "framer-motion";

export function About() {
  return (
    <section id="how-it-works" className="py-40 border-t border-white/5 relative bg-[#050505]">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Un problema diverso, una soluzione diversa.
          </h2>
          <p className="text-xl text-[#B5B5BE] leading-relaxed">
            Non tutte le automazioni servono allo stesso scopo. Galatea lavora sugli
            appuntamenti beauty, Cricchetto sulle officine, Atlas sui processi interni,
            Igea sugli studi professionali e Hermes sul primo contatto commerciale. Il Base copre le
            funzioni chiave; il Pro aggiunge dashboard, visibilità e automazioni più complete.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
