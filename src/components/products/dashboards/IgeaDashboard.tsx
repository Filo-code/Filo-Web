"use client";

import { CalendarSync, FileText, Hand } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const IGEA_ITEMS = [
  { time: "09:00", label: "Richieste in ingresso", type: "2 documenti allegati", status: "Da verificare" },
  { time: "10:30", label: "Appuntamenti", type: "Disponibilità da proporre", status: "In revisione" },
  { time: "11:45", label: "Follow-up", type: "Conferme da preparare", status: "Bozza AI" },
];

export function IgeaDashboard() {
  return (
    <div className="w-full h-full bg-[#030303] rounded-xl border overflow-hidden flex flex-col opacity-60 saturate-50 relative text-white" style={{ borderColor: "rgba(34,211,238,0.12)" }}>
      <div className="absolute inset-0 bg-white/[0.01] mix-blend-overlay pointer-events-none" />

      <div className="h-10 border-b border-white/5 flex items-center px-4 bg-white/[0.02] relative z-10 flex-shrink-0">
        <div className="mx-auto text-[10px] text-[#B5B5BE] uppercase tracking-widest font-mono flex items-center gap-2">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#22D3EE" }} /> Igea • Anteprima in sviluppo
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-white/5 border-transparent text-[9px] hidden sm:flex cursor-not-allowed">
            <Hand className="w-3 h-3 mr-1" />
            Preview studio
          </Badge>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden relative z-10">
        <div className="order-2 md:order-none w-full md:w-1/3 border-t md:border-t-0 md:border-r border-white/5 p-4 flex flex-col gap-3 min-w-[200px] shrink-0 bg-[#050505]">
          <h4 className="text-sm font-semibold flex items-center gap-2 mb-2"><CalendarSync className="w-4 h-4 text-white/50" /> Stato studio</h4>

          {IGEA_ITEMS.map((item, i) => (
            <div key={i} className="p-3 rounded-lg border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors relative overflow-hidden">
              <div className="flex justify-between items-start mb-1">
                <p className="text-sm font-medium">{item.label}</p>
                <span className="text-[10px] font-mono text-white/40">{item.time}</span>
              </div>
              <p className="text-[10px] text-white/50 mb-2">{item.type}</p>
              <Badge variant="outline" className={cn("text-[9px] px-1.5 py-0 border-transparent", item.status.includes("AI") ? "bg-blue-500/10 text-blue-400" : "bg-white/5 text-white/60")}>{item.status}</Badge>
            </div>
          ))}
        </div>

        <div className="order-1 md:order-none flex-1 flex flex-col bg-[#040404] min-h-[400px] md:min-h-0">
          <div className="flex border-b border-white/5 bg-white/[0.01]">
            <div className="p-4 border-r border-white/5 flex-1 hover:bg-white/[0.02]">
              <p className="text-[10px] text-white/50 uppercase">Richieste in revisione</p>
              <p className="text-xl font-bold">4</p>
            </div>
            <div className="p-4 flex-1 hover:bg-white/[0.02]">
              <p className="text-[10px] text-white/50 uppercase">Documenti ricevuti</p>
              <p className="text-xl font-bold" style={{ color: "#22D3EE" }}>2 PDF</p>
            </div>
          </div>

          <div className="flex-1 p-4 flex flex-col gap-4 overflow-hidden relative">
            <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-[#040404] to-transparent z-10" />
            <div className="text-[10px] text-white/30 text-center">Anteprima: flusso professionale in valutazione</div>

            <div className="self-start max-w-[85%] bg-white/5 border border-white/5 rounded-2xl rounded-tl-sm p-3">
              <p className="text-sm text-white/90">Buongiorno, allego il PDF con la documentazione relativa alla pratica. Quando potrei venire in studio per discuterne di persona?</p>
              <div className="mt-2 rounded border border-white/10 bg-white/[0.03] px-2 py-1 text-[10px] text-white/55">
                PDF allegato · documentazione_pratica.pdf
              </div>
            </div>

            <div className="self-end max-w-[85%] rounded-2xl rounded-tr-sm p-3" style={{ background: "rgba(34,211,238,0.07)", border: "1px solid rgba(34,211,238,0.2)" }}>
              <div className="flex items-center gap-2 mb-1">
                <FileText className="w-3 h-3" style={{ color: "#22D3EE" }} />
                <span className="text-[10px] font-medium" style={{ color: "#22D3EE" }}>Bozza Igea</span>
              </div>
              <p className="text-sm text-white/90">Documento ricevuto. Possiamo proporre un appuntamento in studio martedì alle 16:30 o mercoledì alle 10:00, previa conferma della segreteria.</p>
            </div>

            <div className="self-start max-w-[85%] bg-white/5 border border-white/5 rounded-2xl rounded-tl-sm p-3">
              <p className="text-sm text-white/90">Perfetto, preferirei martedì alle 16:30. Grazie.</p>
            </div>

            <div className="self-end max-w-[85%] bg-blue-900/10 border border-blue-500/20 rounded-2xl rounded-tr-sm p-3">
              <p className="text-sm text-white/90">Bozza promemoria: appuntamento da confermare e documento da collegare alla pratica.</p>
            </div>

            <div className="mt-auto p-2 bg-[#111] border border-white/5 rounded flex text-[10px] text-white/40 justify-center">
              Anteprima non operativa di un pannello di supporto alla segreteria AI.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
