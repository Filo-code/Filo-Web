"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  Clock3,
  MessageCircle,
  Plus,
  Search,
  Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

const NAV_ITEMS = ["Cruscotto", "Schede lavoro", "Veicoli", "Revisioni"];

const METRICS = [
  { label: "Schede attive",     value: "5", hint: "Aperte in officina",    icon: ClipboardList, tone: "text-orange-300" },
  { label: "Pronte al ritiro",  value: "2", hint: "In attesa del cliente", icon: CheckCircle2,  tone: "text-emerald-300" },
  { label: "Accettate",         value: "1", hint: "Nuove schede",          icon: Clock3,        tone: "text-sky-300" },
  { label: "Revisioni scadute", value: "0", hint: "Da verificare",         icon: AlertTriangle, tone: "text-amber-300" },
];

const WORK_ROWS = [
  { title: "Scheda lavoro", status: "Pronta al ritiro", note: "Note aggiornate",  tone: "text-emerald-200 bg-emerald-500/10 border-emerald-400/20" },
  { title: "Scheda lavoro", status: "Accettata",        note: "Stato intervento", tone: "text-amber-200 bg-amber-500/10 border-amber-400/20" },
  { title: "Scheda lavoro", status: "In lavorazione",   note: "Note aggiornate",  tone: "text-sky-200 bg-sky-500/10 border-sky-400/20" },
];

const ACTIVITY_ROWS = ["Scheda creata", "Stato aggiornato", "Nota aggiunta"];

const REVISION_ROWS = [
  { label: "Veicolo · Scadenza prossima",   dot: "bg-amber-400/70" },
  { label: "Veicolo · Entro 30 giorni",     dot: "bg-orange-400/50" },
  { label: "Veicolo · In verifica",         dot: "bg-white/20" },
];

const up = (delay: number) =>
  ({
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut", delay },
  }) as const;

const fade = (delay: number) =>
  ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.45, ease: "easeOut", delay },
  }) as const;

export function CricchettoDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="w-full h-full bg-[#030303] rounded-xl overflow-hidden flex flex-col shadow-2xl relative text-white"
      style={{ border: "1px solid rgba(249,115,22,0.15)" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(249,115,22,0.08),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.025),transparent_45%)] pointer-events-none" />

      {/* ── Header bar ── */}
      <motion.div
        {...fade(0.1)}
        className="h-14 border-b border-white/5 flex items-center justify-between px-4 sm:px-6 bg-white/[0.015] backdrop-blur-md relative z-10 shrink-0"
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-white/10" />
          <div className="w-3 h-3 rounded-full bg-white/10" />
          <div className="w-3 h-3 rounded-full bg-white/10" />
        </div>
        <div className="hidden sm:flex items-center gap-2.5 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-[10px] font-mono text-white/55 tracking-[0.16em] uppercase">
          <span className="font-sans normal-case tracking-normal text-white/80">Cricchetto</span>
          <span className="h-3 w-px bg-white/10" />
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400" style={{ boxShadow: "0 0 8px #F97316" }} />
          Officina · Attiva
        </div>
        <Badge
          variant="outline"
          className="text-[10px] py-0.5"
          style={{ background: "rgba(249,115,22,0.1)", borderColor: "rgba(249,115,22,0.3)", color: "#FDBA74" }}
        >
          Attivo
        </Badge>
      </motion.div>

      {/* ── Content ── */}
      <div className="relative z-10 flex-1 overflow-hidden p-3 sm:p-4 lg:p-5">
        <div className="mx-auto flex h-full max-w-6xl flex-col gap-3 min-h-0">

          {/* Title area + nav */}
          <motion.div
            {...up(0.2)}
            className="flex flex-col gap-4 border-b border-white/5 pb-3 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5 text-[11px] text-white/60">
                <Wrench className="h-3.5 w-3.5 text-orange-300" />
                Cricchetto
                <span className="h-3 w-px bg-white/10" />
                <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                Officina · Attiva
              </div>
              <h4 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">Officina Filò</h4>
              <p className="mt-1 text-xs sm:text-sm text-white/40">Vista operativa targa-prima</p>
            </div>

            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {NAV_ITEMS.map((item, index) => (
                <div
                  key={item}
                  className={`shrink-0 rounded-lg border px-3 py-2 text-xs font-medium ${
                    index === 0
                      ? "border-orange-400/25 bg-orange-500/10 text-orange-100"
                      : "border-white/10 bg-white/[0.025] text-white/65"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Search row */}
          <motion.div
            {...up(0.35)}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-3"
          >
            <Search className="h-4 w-4 shrink-0 text-white/35" />
            <span className="text-[10px] uppercase tracking-[0.18em] text-white/25">Targa</span>
            <div className="min-w-0 flex-1 rounded-lg border border-white/10 bg-[#101010] px-4 py-2.5 text-sm text-white/35">
              Cerca per targa o nome cliente...
            </div>
            <button
              type="button"
              className="hidden sm:inline-flex rounded-lg bg-orange-300 px-4 py-2.5 text-xs font-semibold text-black shadow-[0_0_24px_rgba(249,115,22,0.18)]"
            >
              Cerca
            </button>
          </motion.div>

          {/* Metric cards — staggered */}
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {METRICS.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: "easeOut", delay: 0.45 + i * 0.08 }}
                className="rounded-xl border border-white/10 bg-white/[0.025] p-3"
              >
                <metric.icon className={`mb-3 h-4 w-4 ${metric.tone}`} />
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">{metric.label}</p>
                <div className="mt-2 flex items-end gap-2">
                  <span className="text-2xl font-semibold text-white">{metric.value}</span>
                  <span className="pb-1 text-[11px] text-white/35">{metric.hint}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Main + side panels */}
          <div className="grid flex-1 min-h-0 gap-3 lg:grid-cols-[1fr_0.56fr]">

            {/* Schede attive — slides up */}
            <motion.div
              {...up(0.85)}
              className="flex min-h-0 flex-col rounded-xl border border-white/10 bg-[#060606] p-4"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">Tutte · 5</p>
                  <h5 className="mt-1 text-base font-semibold text-white">Schede attive</h5>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-lg bg-orange-300 px-3 py-2 text-xs font-semibold text-black shadow-[0_0_24px_rgba(249,115,22,0.18)]"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Nuova scheda
                </button>
              </div>

              <div className="space-y-2 overflow-hidden">
                {WORK_ROWS.map((row, index) => (
                  <motion.div
                    key={`${row.status}-${index}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.95 + index * 0.1 }}
                    className="rounded-xl border border-white/10 bg-white/[0.025] p-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-white">{row.title}</p>
                          <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${row.tone}`}>
                            {row.status}
                          </span>
                        </div>
                        <p className="mt-1 text-[11px] text-white/35">Targa · {row.note}</p>
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.16em] text-white/25">Stato intervento</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Side panels */}
            <div className="grid min-h-0 gap-3">

              {/* Revisioni in scadenza */}
              <motion.div
                {...fade(0.9)}
                className="rounded-xl border border-white/10 bg-white/[0.025] p-4"
              >
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">Prossimi 30 giorni</p>
                <h5 className="mt-2 text-base font-semibold text-white">Revisioni in scadenza</h5>
                <div className="mt-3 space-y-2">
                  {REVISION_ROWS.map((r) => (
                    <div key={r.label} className="flex items-center gap-3 text-xs text-white/45">
                      <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${r.dot}`} />
                      <span>{r.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Attività recente */}
              <motion.div
                {...fade(1.0)}
                className="rounded-xl border border-white/10 bg-white/[0.025] p-4"
              >
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">Registro</p>
                <h5 className="mt-2 text-base font-semibold text-white">Attività recente</h5>
                <div className="mt-3 space-y-2">
                  {ACTIVITY_ROWS.map((activity) => (
                    <div key={activity} className="flex items-center gap-3 text-xs text-white/55">
                      <span className="h-2 w-2 rounded-full bg-orange-300/70 shrink-0" />
                      <span>{activity}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* WhatsApp chip — last */}
              <motion.div
                {...up(1.1)}
                className="rounded-xl border border-orange-400/20 bg-orange-500/[0.07] p-4"
              >
                <div className="flex items-start gap-3">
                  <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-orange-200" />
                  <div>
                    <p className="text-sm font-semibold text-orange-50">Comandi WhatsApp</p>
                    <p className="mt-1 text-xs leading-relaxed text-orange-100/60">Note e stati aggiornabili da chat</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
