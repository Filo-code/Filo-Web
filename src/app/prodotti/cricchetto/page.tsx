import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Cricchetto — Sistema operativo per officine",
  description:
    "Cricchetto è il sistema operativo per officine: dashboard web, gestione targa-prima e comandi operativi anche da WhatsApp per lavorazioni, ricambi, manodopera e stato degli interventi.",
  alternates: { canonical: "/prodotti/cricchetto" },
  openGraph: {
    title: "Cricchetto — Sistema operativo per officine | Filò",
    description:
      "Dashboard web, gestione targa-prima e comandi operativi anche da WhatsApp per tenere sotto controllo ogni intervento.",
    url: "https://filo-ai.it/prodotti/cricchetto",
    siteName: "Filò",
    locale: "it_IT",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Cricchetto — Filò" }],
  },
};

const BASE_FEATURES = [
  "Schede veicolo ordinate con targa e informazioni operative",
  "Lavorazioni e ordini di lavoro raccolti in un unico punto",
  "Ricambi, manodopera e note collegati all'intervento",
  "Stato dei lavori visibile senza recuperare appunti o chat sparse",
  "Comandi operativi anche da WhatsApp per aggiornare note e stati",
  "Dashboard web per cercare, filtrare e controllare le schede attive",
];

const PRO_FEATURES = [
  "Vista operativa per veicoli, targhe, lavorazioni, ricambi e manodopera",
  "Controllo dello stato degli interventi e dei lavori aperti",
  "Ricerca targa-prima per trovare rapidamente veicoli e storico operativo",
  "Aggiornamenti operativi anche via WhatsApp per note, stati e avanzamento",
  "Organizzazione più chiara tra accettazione, lavorazione, pronto ritiro e consegna",
  "Riduzione del rischio di lavori non tracciati o informazioni ricordate a memoria",
];

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://filo-ai.it/" },
        { "@type": "ListItem", position: 2, name: "Cricchetto", item: "https://filo-ai.it/prodotti/cricchetto" },
      ],
    },
    {
      "@type": "Service",
      name: "Cricchetto",
      provider: { "@type": "Organization", name: "Filò", url: "https://filo-ai.it" },
      description: "Sistema operativo per officine: dashboard web, gestione targa-prima e comandi operativi anche da WhatsApp per lavorazioni, ricambi, manodopera e stato degli interventi.",
      url: "https://filo-ai.it/prodotti/cricchetto",
      serviceType: "Software as a Service",
      areaServed: "IT",
    },
  ],
};

export default function CricchettoPage() {
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
              <li><span className="text-white/60">Cricchetto</span></li>
            </ol>
          </nav>

          {/* Hero */}
          <div className="mb-16">
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide border mb-6"
              style={{ color: "#F97316", borderColor: "rgba(249,115,22,0.3)", background: "rgba(249,115,22,0.08)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#F97316", boxShadow: "0 0 6px #F97316" }} />
              Attivo
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              Cricchetto — Sistema operativo<br className="hidden md:block" /> per officine
            </h1>

            <p className="text-xl text-[#B5B5BE] leading-relaxed max-w-2xl mb-4">
              Cricchetto è la soluzione Filò per le officine. Dashboard web, gestione targa-prima e
              comandi operativi anche da WhatsApp per aggiornare lavorazioni, note, ricambi,
              manodopera e stato degli interventi — senza recuperare appunti o chat sparse.
            </p>

            <p className="text-sm text-white/40 font-mono uppercase tracking-widest mb-10">
              Per: officine meccaniche · carrozzerie · centri di assistenza
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://cricchetto.filo-ai.it"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors"
              >
                Scopri Cricchetto <ArrowRight className="w-4 h-4" />
              </a>
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
                Schede veicolo e gestione targa-prima
              </h2>
              <p className="text-[#B5B5BE] leading-relaxed">
                Cricchetto organizza ogni veicolo in una scheda operativa collegata alla targa.
                Lavorazioni, ricambi, manodopera e note sono tutti raccolti in un unico punto —
                accessibile dalla dashboard web o via WhatsApp, senza dover recuperare appunti,
                fogli o chat sparse tra colleghi.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4">
                Dashboard web per il controllo dell&apos;officina
              </h2>
              <p className="text-[#B5B5BE] leading-relaxed">
                La dashboard web permette di cercare e filtrare le schede attive, vedere lo stato
                dei lavori in corso e tenere traccia dei veicoli tra accettazione, lavorazione,
                pronto ritiro e consegna. Tutto è visibile senza dover chiedere aggiornamenti a voce
                o controllare più strumenti separati.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4">
                Comandi operativi anche da WhatsApp
              </h2>
              <p className="text-[#B5B5BE] leading-relaxed">
                Cricchetto supporta comandi operativi direttamente da WhatsApp: aggiornare note,
                cambiare lo stato di un intervento, registrare un ricambio o segnalare un avanzamento
                senza dover aprire la dashboard. Utile quando si lavora in officina e si vuole tenere
                il sistema aggiornato senza interrompere il flusso di lavoro.
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
                      style={{ background: "rgba(249,115,22,0.08)", borderColor: "rgba(249,115,22,0.2)" }}
                    >
                      <Check className="w-3 h-3" style={{ color: "#F97316" }} />
                    </div>
                    <span className="text-[#B5B5BE] leading-relaxed text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4">
                Piano Pro — Vista operativa completa
              </h2>
              <p className="text-[#B5B5BE] leading-relaxed mb-6">
                Il Piano Pro estende la dashboard con una vista operativa completa su veicoli, targhe,
                lavorazioni, ricambi e manodopera. La ricerca targa-prima permette di trovare rapidamente
                qualsiasi veicolo e il suo storico operativo, riducendo il rischio di lavori non tracciati
                o informazioni tenute a memoria.
              </p>
              <ul className="space-y-4">
                {PRO_FEATURES.map((feature, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div
                      className="mt-0.5 rounded-full p-1 shrink-0 border"
                      style={{ background: "rgba(249,115,22,0.08)", borderColor: "rgba(249,115,22,0.2)" }}
                    >
                      <Check className="w-3 h-3" style={{ color: "#F97316" }} />
                    </div>
                    <span className="text-[#B5B5BE] leading-relaxed text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4">
                Per chi è pensato Cricchetto
              </h2>
              <p className="text-[#B5B5BE] leading-relaxed">
                Cricchetto è progettato per officine meccaniche, carrozzerie e centri di assistenza
                che gestiscono più veicoli in parallelo e vogliono un sistema più ordinato per
                tracciare lavorazioni, ricambi e stato degli interventi — senza cambiare il modo in
                cui lavorano. Il Piano Base copre le funzioni operative essenziali; il Piano Pro aggiunge
                la vista operativa completa quando serve maggiore controllo e visibilità.
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
            <a
              href="https://cricchetto.filo-ai.it"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors"
            >
              Scopri Cricchetto <ArrowRight className="w-4 h-4" />
            </a>
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
