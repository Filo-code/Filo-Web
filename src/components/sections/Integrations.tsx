"use client";

import { motion } from "framer-motion";
import { MessageCircle, Bot, Calendar, Database, Workflow, Cloud, Send } from "lucide-react";

const integrations = [
  { name: "WhatsApp Business API", icon: MessageCircle },
  { name: "Telegram Protocol", icon: Send },
  { name: "OpenAI Engine", icon: Bot },
  { name: "Supabase DB", icon: Database },
  { name: "Google Calendar", icon: Calendar },
  { name: "n8n Automations", icon: Workflow },
  { name: "Cloud Infrastructure", icon: Cloud },
];

export function Integrations() {
  return (
    <section aria-labelledby="integrations-heading" className="py-24 border-t border-white/5 bg-[#030303] overflow-hidden relative">
       <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#030303] to-transparent z-10" />
       <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#030303] to-transparent z-10" />

       <h2 id="integrations-heading" className="container mx-auto px-6 mb-12 text-center text-xs font-mono tracking-[0.2em] uppercase text-white/30 font-normal">
          Infrastruttura tecnologica e connessioni native
       </h2>

       {/* Infinite Marquee Container */}
       <div className="flex w-[200%] md:w-full overflow-hidden">
         <motion.div 
           initial={{ x: "0%" }}
           animate={{ x: "-50%" }}
           transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
           className="flex items-center gap-16 md:gap-32 pr-16 md:pr-32 whitespace-nowrap"
         >
           {[...integrations, ...integrations, ...integrations].map((item, i) => (
              <div key={i} className="flex items-center gap-3 opacity-30 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0">
                 <item.icon className="w-5 h-5 text-white" />
                 <span className="text-sm font-medium text-white/90">{item.name}</span>
              </div>
           ))}
         </motion.div>
       </div>
    </section>
  );
}
