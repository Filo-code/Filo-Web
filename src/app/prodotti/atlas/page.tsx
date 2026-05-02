import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Atlas — Automazioni operative per processi interni",
  description:
    "Atlas collega sistemi, workflow e task ripetitivi per ridurre il lavoro manuale. Gestione richieste operative, reminder, passaggi tra reparti e integrazioni CRM — su richiesta.",
  alternates: { canonical: "/prodotti/atlas" },
  openGraph: {
    title: "Atlas — Automazioni operative per processi interni | Filò",
    description:
      "Atlas collega sistemi, workflow e task ripetitivi per ridurre il lavoro manuale. Disponibile su richiesta.",
    url: "https://filo-ai.it/prodotti/atlas",
    siteName: "Filò",
    locale: "it_IT",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Atlas — Filò" }],
  },
};

const BASE_FEATURES = [
  "Gestione delle richieste operative in ingresso",
  "Risposte automatiche base o conferme standard",
  "Raccolta dei dati necessari per avviare il processo",
  "Notifiche al titolare o al referente del flusso",
  "Passaggio minimo verso CRM, calendario o strumento compatibile",
  "Task ricorrenti semplici per non perdere scadenze",
];

const PRO_FEATURES = [
  "Tutto il Piano Base, con automazioni complete tra strumenti e reparti",
  "Dashboard operativa per vedere stato richieste, task, scadenze e metriche",
  "Workflow personalizzati con logiche, condizioni e passaggi più articolati",
  "Gestione più ricca dei flussi: assegnazioni, reminder, follow-up e aggiornamenti",
  "Integrazioni operative più evolute con CRM e sistemi compatibili",
  "Monitoraggio dei passaggi critici per capire cosa è fermo, completato o da gestire",
];

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://filo-ai.it/" },
        { "@type": "ListItem", position: 2, name: "Atlas", item: "https://filo-ai.it/prodotti/atlas" },
      ],
    },
    {
      "@type": "Service",
      name: "Atlas",
      provider: { "@type": "Organization", name: "Filò", url: "https://filo-ai.it" },
      description: "Automazioni operative per workflow, task ripetitivi, reminder, passaggi tra reparti e integrazioni con CRM e strumenti compatibili. Disponibile su richiesta.",
      url: "https://filo-ai.it/prodotti/atlas",
      serviceType: "Software as a Service",
      areaServed: "IT",
    },
  ],
};

export default function AtlasPage() {
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
              <li><span className="text-white/60">Atlas</span></li>
            </ol>
          </nav>

          {/* Hero */}
          <div className="mb-16">
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide border mb-6"
              style={{ color: "#6366F1", borderColor: "rgba(99,102,241,0.3)", background: "rgba(99,102,241,0.08)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#6366F1" }} />
              Su richiesta
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              Atlas — Automazioni operative<br className="hidden md:block" /> per processi interni
            </h1>

            <p className="text-xl text-[#B5B5BE] leading-relaxed max-w-2xl mb-4">
              Atlas collega sistemi, workflow, task ripetitivi, reminder e passaggi interni per
              ridurre il lavoro manuale. Dalla gestione delle richieste operative in ingresso
              alle integrazioni con CRM e strumenti compatibili — con automazioni configurabili
              sul flusso reale dell&apos;organizzazione.
            </p>

            <p className="text-sm text-white/40 font-mono uppercase tracking-widest mb-10">
              Per: processi interni · CRM · integrazioni · routing operativo
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors"
              >
                Automatizza i processi <ArrowRight className="w-4 h-4" />
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
                Richieste operative e task ricorrenti
              </h2>
              <p className="text-[#B5B5BE] leading-relaxed">
                Atlas raccoglie le richieste operative in ingresso, risponde con conferme standard,
                raccoglie i dati necessari per avviare il processo e invia notifiche al referente
                corretto. I task ricorrenti vengono generati automaticamente in base alle regole
                operative configurate, riducendo il rischio di scadenze mancate.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4">
                Integrazioni con CRM e strumenti compatibili
              </h2>
              <p className="text-[#B5B5BE] leading-relaxed">
                Atlas può collegarsi a CRM e strumenti compatibili per aggiornare record, sincronizzare
                stati e passare informazioni tra sistemi senza intervento manuale. Le integrazioni
                vengono configurate sul flusso reale dell&apos;organizzazione e attivate dove
                tecnicamente possibile.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4">
                Passaggi tra reparti e reminder automatici
              </h2>
              <p className="text-[#B5B5BE] leading-relaxed">
                Quando un passaggio rimane aperto o una scadenza si avvicina, Atlas invia un reminder
                automatico al responsabile del passaggio successivo. Il flusso continua senza dover
                rincorrere aggiornamenti a voce o controllare più strumenti separati.
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
                      style={{ background: "rgba(99,102,241,0.08)", borderColor: "rgba(99,102,241,0.2)" }}
                    >
                      <Check className="w-3 h-3" style={{ color: "#6366F1" }} />
                    </div>
                    <span className="text-[#B5B5BE] leading-relaxed text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4">
                Piano Pro — Dashboard operativa e workflow avanzati
              </h2>
              <p className="text-[#B5B5BE] leading-relaxed mb-6">
                Il Piano Pro aggiunge la dashboard operativa — stato richieste, task, scadenze e
                metriche in un pannello unico — insieme a workflow personalizzati con logiche e
                condizioni più articolate, integrazioni più evolute e monitoraggio dei passaggi
                critici per capire cosa è fermo, completato o da gestire.
              </p>
              <ul className="space-y-4">
                {PRO_FEATURES.map((feature, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div
                      className="mt-0.5 rounded-full p-1 shrink-0 border"
                      style={{ background: "rgba(99,102,241,0.08)", borderColor: "rgba(99,102,241,0.2)" }}
                    >
                      <Check className="w-3 h-3" style={{ color: "#6366F1" }} />
                    </div>
                    <span className="text-[#B5B5BE] leading-relaxed text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4">
                Per chi è pensato Atlas
              </h2>
              <p className="text-[#B5B5BE] leading-relaxed">
                Atlas è pensato per organizzazioni che gestiscono processi interni ripetitivi,
                passaggi tra reparti e integrazioni con strumenti esterni. È disponibile su richiesta
                e viene configurato sul flusso reale dell&apos;organizzazione. Il Piano Base copre
                le funzioni operative essenziali; il Piano Pro aggiunge la dashboard operativa
                e workflow più articolati quando serve maggiore controllo sui processi.
              </p>
            </section>

            <section>
              <p className="text-xs font-mono uppercase tracking-widest text-white/30 mb-4">Altre soluzioni Filò</p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/prodotti/galatea"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-white/60 text-sm hover:bg-white/5 hover:text-white transition-colors"
                >
                  Galatea — saloni <ArrowRight className="w-3 h-3" />
                </Link>
                <Link
                  href="/prodotti/cricchetto"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-white/60 text-sm hover:bg-white/5 hover:text-white transition-colors"
                >
                  Cricchetto — officine <ArrowRight className="w-3 h-3" />
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
              Automatizza i processi con Atlas <ArrowRight className="w-4 h-4" />
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
