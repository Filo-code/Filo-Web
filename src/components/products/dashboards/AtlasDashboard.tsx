"use client";

import { motion } from "framer-motion";
import { Users, Activity, Zap, Network, ArrowUpRight, BarChart3, Database } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const ATLAS_STATS = [
  { label: "Workflow Attivi",         val: "18",    inc: "+4 questo mese",       icon: Users,    accent: false },
  { label: "Task Automatizzati",      val: "842",   inc: "+12% vs prec.",        icon: Database, accent: false },
  { label: "Reminder Eseguiti",       val: "96%",   inc: "Senza intervento",     icon: Activity, accent: true  },
  { label: "Sync CRM / Automaz.",     val: "842",   inc: "Sync 100%",            icon: Zap,      accent: false },
];

const ATLAS_FUNNEL = [
  { stage: "Trigger Workflow",      users: "842", percent: "100%", w: "100%", bg: "rgba(255,255,255,0.06)",  bold: false },
  { stage: "Task Creati",           users: "842", percent: "100%", w: "78%",  bg: "rgba(255,255,255,0.10)", bold: false },
  { stage: "Reminder Inviati",      users: "811", percent: "96%",  w: "54%",  bg: "rgba(99,102,241,0.2)",   bold: false },
  { stage: "CRM Aggiornato",        users: "842", percent: "100%", w: "38%",  bg: "rgba(99,102,241,0.5)",   bold: true  },
];

const ATLAS_ROUTING = [
  { title: "Task Ricorrente Creato",  desc: "Attività generata da regola operativa e assegnata al flusso corretto.", badge: "Atlas Core"  },
  { title: "Reminder Automatico",     desc: "Promemoria inviato quando una scadenza resta aperta.",                 badge: "Automazione" },
  { title: "Sync CRM",                desc: "Aggiornamento del record cliente nello strumento collegato.",           badge: "Integrazione" },
  { title: "Notifica Team",           desc: "Avviso operativo inviato al responsabile del passaggio successivo.",    badge: "Esecuzione"  },
];

export function AtlasDashboard() {
  return (
    <div
      className="w-full h-full bg-[#030303] rounded-xl overflow-hidden flex flex-col shadow-2xl relative text-white"
      style={{ border: "1px solid rgba(99,102,241,0.15)" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] to-transparent pointer-events-none" />

      {/* ── Header ── */}
      <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-white/[0.015] backdrop-blur-md relative z-10 shrink-0">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-white/10" />
          <div className="w-3 h-3 rounded-full bg-white/10" />
          <div className="w-3 h-3 rounded-full bg-white/10" />
        </div>
        <div className="flex items-center gap-2.5 text-xs font-mono text-[#B5B5BE] tracking-widest uppercase">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#6366F1", boxShadow: "0 0 8px #6366F1" }} />
          Atlas · Workflow Backend
        </div>
        <Badge
          variant="outline"
          className="text-[10px] py-0.5"
          style={{ background: "rgba(99,102,241,0.1)", borderColor: "rgba(99,102,241,0.3)", color: "#818CF8" }}
        >
          Online
        </Badge>
      </div>

      {/* ── Body ── */}
      <div className="flex-1 flex flex-col p-4 md:p-6 overflow-y-auto md:overflow-hidden relative z-10 gap-4 md:gap-6">

        {/* Top KPI row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 shrink-0">
          {ATLAS_STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-xl border border-white/5 hover:bg-white/[0.04] transition-colors relative overflow-hidden group"
              style={{ background: stat.accent ? "rgba(99,102,241,0.05)" : "rgba(255,255,255,0.01)" }}
            >
              <div
                className="absolute -right-4 -top-4 w-16 h-16 rounded-full blur-xl"
                style={{ background: stat.accent ? "rgba(99,102,241,0.1)" : "rgba(255,255,255,0.02)" }}
              />
              <div className="flex items-center gap-2 mb-3">
                <stat.icon className="w-4 h-4" style={{ color: stat.accent ? "#818CF8" : "rgba(255,255,255,0.35)" }} />
                <p className="text-[10px] text-[#B5B5BE] tracking-wider font-medium uppercase">{stat.label}</p>
              </div>
              <p className="text-3xl font-bold tracking-tight text-white mb-1">{stat.val}</p>
              <p className={cn("text-[11px] font-medium", stat.accent ? "text-indigo-400" : "text-emerald-400")}>{stat.inc}</p>
            </motion.div>
          ))}
        </div>

        {/* Funnel + Routing grid */}
        <div className="flex-none md:flex-1 grid md:grid-cols-2 gap-4 md:gap-6 min-h-0">

          {/* Visual funnel */}
          <div className="rounded-xl border border-white/5 bg-[#050505] p-5 md:p-6 flex flex-col relative overflow-hidden">
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h4 className="text-sm font-semibold flex items-center gap-2 text-white/80">
                <BarChart3 className="w-4 h-4 text-white/40" />
                Flusso Operativo
              </h4>
              <div className="text-[10px] text-white/40 bg-white/5 px-2.5 py-1 rounded-md">Ultimi 30 giorni</div>
            </div>

            <div className="flex-1 flex flex-col justify-center gap-2.5">
              {ATLAS_FUNNEL.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ width: 0 }}
                  animate={{ width: step.w }}
                  transition={{ duration: 1.2, delay: idx * 0.2, ease: "easeOut" }}
                  className={cn(
                    "h-12 rounded-r-lg flex items-center justify-between px-4 border-y border-r border-white/5",
                    step.bold ? "font-semibold" : ""
                  )}
                  style={{ background: step.bg }}
                >
                  <span className="text-sm text-white/85">{step.stage}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-white/50 hidden sm:block">{step.percent}</span>
                    <span className="text-sm text-white font-medium">{step.users}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Routing & automation timeline */}
          <div className="rounded-xl border border-white/5 bg-gradient-to-br from-[#080808] to-[#040404] p-5 md:p-6 flex flex-col overflow-hidden">
            <h4 className="text-sm font-semibold flex items-center gap-2 mb-6 shrink-0 text-white/80">
              <Network className="w-4 h-4 text-white/40" />
              Workflow e Integrazioni
            </h4>

            <div className="relative border-l border-white/10 ml-4 space-y-6 flex-1 overflow-y-auto">
              {ATLAS_ROUTING.map((node, i) => (
                <div key={i} className="relative pl-7">
                  <div
                    className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ring-4 ring-[#030303]"
                    style={{ background: "#6366F1" }}
                  />
                  <div className="flex items-center gap-2 mb-1.5">
                    <p className="text-sm font-medium text-white">{node.title}</p>
                    <Badge variant="outline" className="text-[8px] bg-white/5 border-white/10 px-1.5 py-0">{node.badge}</Badge>
                  </div>
                  <p className="text-xs text-white/45 leading-relaxed">{node.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-white/5 shrink-0">
              <p className="text-[11px] text-white/35 flex items-center gap-1 cursor-pointer hover:text-white/60 transition-colors">
                Esplora mappa flussi completa <ArrowUpRight className="w-3 h-3" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
