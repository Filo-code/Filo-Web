"use client";

import { Briefcase, Settings2, Hand, AlertTriangle, Workflow } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const HERMES_KPIS = [
  { val: "24", label: "Lead in Ingresso", alert: false },
  { val: "8.5m", label: "Tempo Medio Primo Contatto", alert: false },
  { val: "3", label: "Richieste ad Alta Priorità", alert: true },
];

const HERMES_LEADS = [
  { id: "LED-991", desc: "Richiesta demo da sito aziendale", action: "Notifica Titolare", status: "Inviato", c: "text-white/60" },
  { id: "LED-223", desc: "Contatto WhatsApp da campagna locale", action: "Routing Commerciale", status: "In Lavorazione", c: "text-amber-400" },
  { id: "REQ-105", desc: "Richiesta urgente per servizio premium", action: "Priorità Alta", status: "Da Richiamare", c: "text-blue-400" },
  { id: "LED-992", desc: "Form consulenza completato", action: "Primo Follow-up", status: "Completato", c: "text-white/60" },
  { id: "MSG-441", desc: "Messaggio da pagina contatti", action: "Instradato", status: "Inoltrato", c: "text-white/60" },
];

export function HermesDashboard() {
  return (
    <div className="w-full h-full bg-[#030303] rounded-xl overflow-hidden flex flex-col opacity-65 saturate-[30%] relative text-white font-sans border" style={{ borderColor: "rgba(245,158,11,0.12)" }}>
      <div className="h-10 border-b border-white/5 flex items-center px-4 bg-white/[0.02] relative z-10 flex-shrink-0">
        <div className="mx-auto text-[10px] text-muted-foreground uppercase tracking-widest font-mono flex items-center gap-2">
          <Briefcase className="w-3 h-3" /> Hermes • Lead Intake
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-amber-500/10 border-transparent text-amber-500 text-[9px] hidden sm:flex cursor-not-allowed">
            <Hand className="w-3 h-3 mr-1" />
            Primo Contatto
          </Badge>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-4 gap-4 overflow-y-auto md:overflow-hidden relative z-10 bg-[#050505]">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 shrink-0">
          {HERMES_KPIS.map((kpi, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/5 rounded-lg p-3">
              <div className="flex items-start justify-between">
                <p className={cn("text-xl font-bold", kpi.alert ? "text-amber-400" : "text-white")}>{kpi.val}</p>
                {kpi.alert && <AlertTriangle className="w-3 h-3 text-amber-400" />}
              </div>
              <p className="text-[10px] text-white/50 mt-1 uppercase tracking-wider">{kpi.label}</p>
            </div>
          ))}
        </div>

        <div className="flex-1 border border-white/5 bg-[#030303] rounded-lg p-4 flex flex-col gap-4 overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <h4 className="text-sm font-semibold flex items-center gap-2"><Workflow className="w-4 h-4 text-white/50" /> Lead Intake</h4>
            <Badge variant="outline" className="text-[9px] bg-white/5 border-transparent">Filtro: Nuove richieste</Badge>
          </div>

          <div className="flex-1 flex flex-col gap-2 overflow-hidden">
            <div className="flex px-4 py-2 text-[10px] text-white/40 uppercase tracking-wider border-b border-white/5">
              <div className="w-16 hidden sm:block">ID</div>
              <div className="flex-1">Richiesta / Canale</div>
              <div className="w-24 hidden sm:block">Azione</div>
              <div className="w-20 text-right">Stato</div>
            </div>

            <div className="flex-col gap-1 overflow-y-auto pr-1">
              {HERMES_LEADS.map((row, i) => (
                <div key={i} className="flex px-4 py-3 bg-white/[0.01] hover:bg-white/[0.03] rounded border border-transparent hover:border-white/5 items-center text-xs transition-colors my-1">
                  <div className="w-16 font-mono text-[10px] text-white/40 hidden sm:block">{row.id}</div>
                  <div className="flex-1 text-white/80 line-clamp-1">{row.desc}</div>
                  <div className="w-24 text-[10px] text-white/50 hidden sm:flex items-center gap-1"><Settings2 className="w-3 h-3 shrink-0" /> {row.action}</div>
                  <div className={cn("w-20 text-right text-[10px] font-medium", row.c)}>{row.status}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
