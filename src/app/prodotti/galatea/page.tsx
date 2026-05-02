import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Galatea — Segretaria AI per saloni e centri estetici",
  description:
    "Galatea gestisce richieste, appuntamenti, conferme, promemoria e follow-up per parrucchieri, barbieri, estetiste e centri beauty. Piano Base e Piano Pro disponibili.",
  alternates: { canonical: "/prodotti/galatea" },
  openGraph: {
    title: "Galatea — Segretaria AI per saloni e centri estetici | Filò",
    description:
      "Galatea gestisce richieste, appuntamenti, conferme, promemoria e follow-up per parrucchieri, barbieri, estetiste e centri beauty.",
    url: "https://filo-ai.it/prodotti/galatea",
    siteName: "Filò",
    locale: "it_IT",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Galatea — Filò" }],
  },
};

const BASE_FEATURES = [
  "Gestione delle richieste in ingresso da web o WhatsApp",
  "Risposte automatiche base per richieste frequenti e disponibilità",
  "Raccolta dati cliente prima della prenotazione",
  "Notifiche al titolare quando arriva una nuova richiesta",
  "Reminder base per ridurre dimenticanze e no-show",
  "Follow-up semplice dopo appuntamento o richiesta",
];

const PRO_FEATURES = [
  "Tutto il Piano Base, con logiche più avanzate sui flussi",
  "Dashboard Pro Studio con richieste, chat, appuntamenti e metriche in un punto unico",
  "Automazioni complete per conferme, reminder, follow-up e riattivazioni",
  "Personalizzazione maggiore di messaggi, regole operative e passaggi al team",
  "Controllo operativo sullo stato delle richieste e delle conversazioni",
  "Reporting essenziale per capire volumi, andamento appuntamenti e attività gestite",
];

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://filo-ai.it/" },
        { "@type": "ListItem", "position": 2, "name": "Galatea", "item": "https://filo-ai.it/prodotti/galatea" },
      ],
    },
    {
      "@type": "Service",
      "name": "Galatea",
      "provider": { "@type": "Organization", "name": "Filò", "url": "https://filo-ai.it" },
      "description": "Segretaria AI per saloni e centri estetici. Gestisce richieste in ingresso, appuntamenti, conferme, promemoria e follow-up per parrucchieri, barbieri, estetiste e centri beauty.",
      "url": "https://filo-ai.it/prodotti/galatea",
      "serviceType": "Software as a Service",
      "areaServed": "IT",
    },
  ],
};

export default function GalateaPage() {
  return (
    <>
      <JsonLd data={STRUCTURED_DATA} />
      <Navbar />

      <main className="flex-1 pt-32 pb-24 bg-[#030303] min-h-screen">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">

          {/* Breadcrumb */}
          <nav aria-label="Navigazione breadcrumb" className="mb-10">
            <ol className="flex items-center gap-2 text-xs text-white/40 font-mono uppercase tracking-widest">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li className="text-white/20">/</li>
              <li><span className="text-white/60">Galatea</span></li>
            </ol>
          </nav>

          {/* Hero */}
          <div className="mb-16">
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide border mb-6"
              style={{ color: "#10B981", borderColor: "rgba(16,185,129,0.3)", background: "rgba(16,185,129,0.08)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#10B981", boxShadow: "0 0 6px #10B981" }} />
              Disponibile ora
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              Galatea — Segretaria AI<br className="hidden md:block" /> per saloni e centri estetici
            </h1>

            <p className="text-xl text-[#B5B5BE] leading-relaxed max-w-2xl mb-4">
              Galatea è la soluzione Filò per parrucchieri, barbieri, estetiste e centri beauty.
              Gestisce le richieste in ingresso, coordina appuntamenti, invia conferme e promemoria,
              e mantiene il follow-up con i clienti — con un tono rapido e naturale.
            </p>

            <p className="text-sm text-white/40 font-mono uppercase tracking-widest mb-10">
              Per: parrucchieri · barbieri · estetiste · centri beauty
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors"
              >
                Richiedi una demo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/#products"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-white/10 text-white/80 text-sm font-medium hover:bg-white/5 hover:text-white transition-colors"
              >
                Confronta tutte le soluzioni
              </Link>
            </div>
          </div>

          <div className="space-y-14 border-t border-white/5 pt-14">

            <section>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4">
                Gestione delle richieste in ingresso
              </h2>
              <p className="text-[#B5B5BE] leading-relaxed">
                Galatea raccoglie le richieste che arrivano da web o WhatsApp, risponde alle domande
                frequenti sulla disponibilità e raccoglie i dati del cliente prima della prenotazione.
                Il titolare riceve una notifica ogni volta che arriva una nuova richiesta, senza dover
                controllare manualmente ogni canale.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4">
                Appuntamenti, conferme e promemoria
              </h2>
              <p className="text-[#B5B5BE] leading-relaxed">
                Il sistema coordina le conferme degli appuntamenti e invia promemoria automatici per
                ridurre le dimenticanze e i no-show. Ogni appuntamento viene gestito con un flusso
                chiaro, senza richiedere intervento manuale per le comunicazioni standard verso il cliente.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4">
                Follow-up automatico con i clienti
              </h2>
              <p className="text-[#B5B5BE] leading-relaxed">
                Dopo ogni appuntamento o richiesta, Galatea gestisce il follow-up — mantenendo un
                contatto ordinato con il cliente senza richiedere tempo manuale al titolare o al personale.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-6">
                Piano Base — Funzioni incluse
              </h2>
              <ul className="space-y-4">
                {BASE_FEATURES.map((feature, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div
                      className="mt-0.5 rounded-full p-1 shrink-0 border"
                      style={{ background: "rgba(16,185,129,0.08)", borderColor: "rgba(16,185,129,0.2)" }}
                    >
                      <Check className="w-3 h-3" style={{ color: "#10B981" }} />
                    </div>
                    <span className="text-[#B5B5BE] leading-relaxed text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4">
                Piano Pro — Dashboard Pro Studio e automazioni avanzate
              </h2>
              <p className="text-[#B5B5BE] leading-relaxed mb-6">
                Il Piano Pro aggiunge la Dashboard Pro Studio — richieste, chat, appuntamenti e metriche
                in un unico pannello operativo — insieme ad automazioni complete, personalizzazione
                dei flussi e reporting essenziale sull&apos;andamento delle attività.
              </p>
              <ul className="space-y-4">
                {PRO_FEATURES.map((feature, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div
                      className="mt-0.5 rounded-full p-1 shrink-0 border"
                      style={{ background: "rgba(16,185,129,0.08)", borderColor: "rgba(16,185,129,0.2)" }}
                    >
                      <Check className="w-3 h-3" style={{ color: "#10B981" }} />
                    </div>
                    <span className="text-[#B5B5BE] leading-relaxed text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4">
                Per chi è pensata Galatea
              </h2>
              <p className="text-[#B5B5BE] leading-relaxed">
                Galatea è progettata per parrucchieri, barbieri, estetiste e centri beauty che ricevono
                richieste su più canali e vogliono un sistema più ordinato — senza cambiare il modo in
                cui lavorano. Il Piano Base copre le funzioni essenziali; il Piano Pro aggiunge la
                dashboard operativa quando serve maggiore controllo e visibilità.
              </p>
            </section>

            <section>
              <p className="text-xs font-mono uppercase tracking-widest text-white/30 mb-4">Altre soluzioni Filò</p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/prodotti/cricchetto"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-white/60 text-sm hover:bg-white/5 hover:text-white transition-colors"
                >
                  Cricchetto — officine <ArrowRight className="w-3 h-3" />
                </Link>
                <Link
                  href="/prodotti/atlas"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-white/60 text-sm hover:bg-white/5 hover:text-white transition-colors"
                >
                  Atlas — automazioni <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </section>

          </div>

          {/* Bottom CTA */}
          <div className="mt-20 pt-12 border-t border-white/5 flex flex-col sm:flex-row gap-4">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors"
            >
              Richiedi una demo di Galatea <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-white/10 text-white/80 text-sm font-medium hover:bg-white/5 hover:text-white transition-colors"
            >
              Torna alla home
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
