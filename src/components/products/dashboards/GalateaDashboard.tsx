"use client";

import { motion } from "framer-motion";
import { Mic, Play, CalendarPlus, Hand, Activity, CheckCircle2, TrendingUp, Bot } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface Appt {
  time?: string;
  name?: string;
  service?: string;
  status?: string;
  color?: string;
}

interface GalateaDashboardProps {
  appointments?: Appt[];
}

const defaultAppointments: Appt[] = [
  { time: "09:30", name: "Giulia Bianchi",  service: "Balayage + Piega",         status: "In Salone",              color: "bg-emerald-500/10 text-emerald-400" },
  { time: "11:15", name: "Marco Verdi",     service: "Taglio Uomo",               status: "Confermato via WA",      color: "bg-emerald-500/10 text-emerald-400" },
  { time: "14:00", name: "Elena F.",        service: "Consulenza Extension",      status: "In attesa di risposta",  color: "bg-amber-500/10 text-amber-400" },
  { time: "16:30", name: "Chiara R.",       service: "Colore",                    status: "Confermato",             color: "bg-white/5 text-white/70" },
  { time: "17:45", name: "Sofia M.",        service: "Piega + Trattamento",       status: "Nuovo",                  color: "bg-white/5 text-white/50" },
];

export function GalateaDashboard({ appointments = defaultAppointments }: GalateaDashboardProps) {
  const safeAppointments = Array.isArray(appointments) ? appointments : [];

  return (
    <div
      className="w-full h-full bg-[#030303] rounded-xl overflow-hidden flex flex-col shadow-2xl relative text-white"
      style={{ border: "1px solid rgba(16,185,129,0.15)" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.03] to-transparent pointer-events-none" />

      {/* ── Header bar ── */}
      <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-white/[0.015] backdrop-blur-md relative z-10 shrink-0">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-white/10" />
          <div className="w-3 h-3 rounded-full bg-white/10" />
          <div className="w-3 h-3 rounded-full bg-white/10" />
        </div>
        <div className="flex items-center gap-2.5 text-xs font-mono text-[#B5B5BE] tracking-widest uppercase">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" style={{ boxShadow: "0 0 8px #10B981" }} />
          Galatea · AI Assistant Attivo
        </div>
        <Button variant="outline" size="sm" className="h-7 text-[10px] bg-white/5 border-white/10 hover:bg-white/10 hidden sm:flex">
          <Hand className="w-3 h-3 mr-1.5" /> Prendi Controllo
        </Button>
      </div>

      {/* ── Main content area ── */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden relative z-10">

        {/* Left: Agenda (Order 2 on mobile) */}
        <div className="order-2 lg:order-none w-full lg:w-[260px] xl:w-[300px] border-t lg:border-t-0 lg:border-r border-white/5 bg-[#050505] p-5 flex flex-col gap-4 shrink-0">
          <h4 className="text-sm font-semibold flex items-center gap-2 text-white/80">
            <CalendarPlus className="w-4 h-4 text-emerald-500/60" />
            Agenda di Oggi
          </h4>
          <div className="flex flex-col gap-2.5">
            {safeAppointments.map((app, i) => (
              <div key={i} className="p-3.5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors relative overflow-hidden">
                {typeof app?.status === "string" && app.status.includes("Confermato") && (
                  <div className="absolute top-0 left-0 w-1 h-full rounded-l-xl" style={{ background: "#10B981", opacity: 0.5 }} />
                )}
                <div className="flex justify-between items-center mb-1.5">
                  <p className="text-sm font-medium text-white/90">{app?.name || "—"}</p>
                  <span className="text-[10px] font-mono text-white/40">{app?.time || "—"}</span>
                </div>
                <p className="text-xs text-white/50 mb-2">{app?.service || "—"}</p>
                <Badge variant="outline" className={cn("text-[9px] px-1.5 py-0 border-transparent", app?.color || "bg-white/5")}>
                  {app?.status || "—"}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Center: WhatsApp simulation (Order 1 on mobile) */}
        <div className="order-1 lg:order-none flex-1 flex flex-col lg:border-r border-white/5 bg-[#080808] min-w-0 min-h-[400px] lg:min-h-0">

          {/* Chat header */}
          <div className="p-4 border-b border-white/5 flex items-center gap-3 bg-white/[0.01] shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white">Marco Verdi</p>
              <p className="text-[11px] text-[#B5B5BE]">App. ore 11:15 · Taglio Uomo</p>
            </div>
            <Button variant="outline" size="sm" className="h-7 text-[10px] bg-white/5 border-white/10 hover:bg-white/10 hidden md:flex shrink-0">
              Prendi Controllo Chat
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-5 flex flex-col gap-5 overflow-y-auto">
            <div className="text-center text-[11px] text-white/25 my-1">Oggi</div>

            {/* Client message */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              className="self-start max-w-[78%] bg-white/5 border border-white/5 rounded-2xl rounded-tl-sm px-4 py-3.5 shadow-sm"
            >
              <p className="text-sm text-white/90 leading-relaxed">
                Ciao! Sarei dovuto venire oggi alle 11:15 per il taglio, ma starò ritardando di circa 15 minuti causa traffico. È un problema?
              </p>
              <div className="text-[10px] text-white/35 text-right mt-2">09:42</div>
            </motion.div>

            {/* AI response */}
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="self-end max-w-[78%] rounded-2xl rounded-tr-sm px-4 py-3.5 shadow-sm"
              style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Bot className="w-3.5 h-3.5" style={{ color: "#10B981" }} />
                <span className="text-[11px] font-semibold" style={{ color: "#10B981" }}>Galatea AI</span>
              </div>
              <p className="text-sm text-white/90 leading-relaxed">
                Nessun problema Marco! Ho controllato l&apos;agenda del salone e ho spostato l&apos;appuntamento alle 11:30. Guida con prudenza, ti aspettiamo!
              </p>
              <div className="flex items-center justify-end gap-1.5 mt-2">
                <span className="text-[10px] text-white/35">09:43</span>
                <CheckCircle2 className="w-3 h-3" style={{ color: "#10B981" }} />
              </div>
            </motion.div>

            {/* Voice note */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="self-start max-w-[72%] bg-white/5 border border-white/5 rounded-2xl rounded-tl-sm px-4 py-3.5 flex items-center gap-4"
            >
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Play className="w-4 h-4 text-white ml-0.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                  <div className="w-[30%] h-full" style={{ background: "#10B981" }} />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-[10px] text-white/40">0:12</span>
                  <span className="text-[10px] text-white/25 hidden sm:block">Trascrizione: &quot;Grazie mille a dopo...&quot;</span>
                </div>
              </div>
              <Mic className="w-4 h-4 text-white/30 shrink-0" />
            </motion.div>
          </div>

          {/* Chat input (disabled) */}
          <div className="p-4 border-t border-white/5 bg-white/[0.01] shrink-0">
            <div className="w-full bg-[#111111] border border-white/8 rounded-full h-11 px-5 flex items-center text-sm text-white/25 cursor-not-allowed">
              Galatea sta gestendo questa conversazione autonomamente...
            </div>
          </div>
        </div>

        {/* Right: KPIs + Impact (Order 3 on mobile) */}
        <div className="order-3 lg:order-none w-full lg:w-[240px] xl:w-[280px] border-t lg:border-t-0 border-white/5 p-5 flex flex-col gap-4 bg-[#050505] shrink-0">
          <h4 className="text-sm font-semibold flex items-center gap-2 text-white/80">
            <Activity className="w-4 h-4 text-white/40" />
            Metriche Ecosistema
          </h4>

          <div className="flex flex-col gap-3">
            {/* KPI 1 */}
            <div
              className="p-4 rounded-xl border relative overflow-hidden"
              style={{ background: "rgba(16,185,129,0.04)", borderColor: "rgba(16,185,129,0.15)" }}
            >
              <p className="text-[10px] text-emerald-400/70 uppercase tracking-widest font-mono mb-1.5">Prenotazioni AI</p>
              <p className="text-3xl font-bold text-white">128</p>
              <p className="text-[11px] text-emerald-400 mt-1">+14% vs mese scorso</p>
            </div>

            {/* KPI 2 */}
            <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
              <p className="text-[10px] text-[#B5B5BE] uppercase tracking-widest font-mono mb-1.5">Ore Salvate</p>
              <p className="text-3xl font-bold text-white">42h</p>
              <p className="text-[11px] text-white/35 mt-1">Tempo reception ridotto</p>
            </div>

            {/* KPI 3 */}
            <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
              <p className="text-[10px] text-[#B5B5BE] uppercase tracking-widest font-mono mb-1.5">No-Show Evitati</p>
              <p className="text-3xl font-bold text-white">14</p>
              <p className="text-[11px] text-emerald-400 mt-1">Con recupero slot automatico</p>
            </div>
          </div>

          {/* Revenue impact */}
          <div
            className="mt-auto p-5 rounded-xl border relative overflow-hidden"
            style={{ background: "rgba(16,185,129,0.06)", borderColor: "rgba(16,185,129,0.2)" }}
          >
            <div className="absolute top-0 right-0 p-3 opacity-8">
              <TrendingUp className="w-14 h-14 text-emerald-400" />
            </div>
            <p className="text-[10px] font-semibold text-emerald-400/80 mb-2 uppercase tracking-widest">Impatto Stimato</p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-white">€ 3.840</span>
            </div>
            <p className="text-[10px] text-emerald-100/40 mt-1.5 leading-snug">
              Generato tramite up-sell automatici e recupero buchi questo mese.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
