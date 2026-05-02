import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { WhyFilo } from "@/components/sections/WhyFilo";
import { Integrations } from "@/components/sections/Integrations";
import { Contact } from "@/components/sections/Contact";
import { ProductBlock } from "@/components/products/ProductBlock";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://filo-ai.it/#organization",
      name: "Filò",
      url: "https://filo-ai.it",
      email: "info@filo-ai.it",
      description:
        "Soluzioni AI per appuntamenti, lead intake, dashboard operative e automazioni di processo, con Piano Base e Piano Pro.",
      makesOffer: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Galatea", url: "https://filo-ai.it/prodotti/galatea", description: "Segretaria AI per saloni e attività beauty: richieste, appuntamenti, conferme, promemoria e follow-up." } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cricchetto", url: "https://filo-ai.it/prodotti/cricchetto", description: "Sistema operativo per officine: dashboard web, gestione targa-prima e comandi operativi anche da WhatsApp per aggiornare lavorazioni, note, ricambi, manodopera e stato degli interventi." } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Atlas", url: "https://filo-ai.it/prodotti/atlas", description: "Automazioni operative per workflow, integrazioni, task ripetitivi, processi interni e routing." } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Igea", description: "Assistente AI in arrivo per studi e professionisti: richieste, appuntamenti, organizzazione clienti e promemoria." } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hermes", description: "Sistema non ancora disponibile per lead intake, primo contatto, qualificazione, smistamento e notifiche." } },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://filo-ai.it/#website",
      url: "https://filo-ai.it",
      name: "Filò",
      publisher: { "@id": "https://filo-ai.it/#organization" },
      inLanguage: "it-IT",
    },
  ],
};

export default function Home() {
  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="flex-1">
        <Hero />

        <About />

        <section id="products" className="py-40 relative border-t border-white/5 bg-[#030303]">
          <div className="container mx-auto px-6 md:px-12 border-l border-white/5 pb-24">
            <p className="text-sm uppercase tracking-widest text-[#B5B5BE] mb-4 pl-4 border-l border-white/20 font-medium">
              Soluzioni e piani
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white pl-4">
              Cinque prodotti, due livelli di servizio.
            </h2>
            <p className="text-[#B5B5BE] text-lg leading-relaxed max-w-3xl pl-4 mt-6">
              Galatea resta il prodotto principale per richieste e appuntamenti beauty.
              Cricchetto porta ordine nelle officine. Atlas collega processi, strumenti e lavoro operativo.
              Igea e Hermes restano soluzioni in arrivo per studi professionali e lead intake.
              Ogni soluzione parte dal Piano Base e può crescere nel Piano Pro con dashboard e controllo completo.
            </p>
          </div>

          <div className="container mx-auto px-6 md:px-12 space-y-24">
            <ProductBlock
              id="galatea"
              name="Galatea"
              description="La segretaria AI per saloni e attività beauty. Gestisce richieste, appuntamenti, conferme, promemoria e follow-up con un tono rapido e naturale."
              target="Parrucchieri, barbieri, estetiste, centri beauty"
              mainBenefit="Agenda più ordinata, meno richieste perse"
              status="active"
              type="galatea"
              baseFeatures={[
                "Gestione delle richieste in ingresso da web o WhatsApp",
                "Risposte automatiche base per richieste frequenti e disponibilità",
                "Raccolta dati cliente prima della prenotazione",
                "Notifiche al titolare quando arriva una nuova richiesta",
                "Reminder base per ridurre dimenticanze e no-show",
                "Follow-up semplice dopo appuntamento o richiesta",
              ]}
              proFeatures={[
                "Tutto il Piano Base, con logiche più avanzate sui flussi",
                "Dashboard Pro Studio con richieste, chat, appuntamenti e metriche in un punto unico",
                "Automazioni complete per conferme, reminder, follow-up e riattivazioni",
                "Personalizzazione maggiore di messaggi, regole operative e passaggi al team",
                "Controllo operativo sullo stato delle richieste e delle conversazioni",
                "Reporting essenziale per capire volumi, andamento appuntamenti e attività gestite",
              ]}
              ctaBaseText="Richiedi una demo"
              ctaFinalText="Richiedi una demo Pro"
              ctaSecondaryText="Scopri come gestisce gli appuntamenti"
            />

            <ProductBlock
              id="cricchetto"
              name="Cricchetto"
              description="Sistema operativo per officine: dashboard web, gestione targa-prima e comandi operativi anche da WhatsApp per aggiornare lavorazioni, note, ricambi, manodopera e stato degli interventi."
              target="Officine"
              mainBenefit="Dashboard web e WhatsApp per tenere sotto controllo ogni intervento"
              metaChips={[
                { label: "Interfaccia", value: "Dashboard web + WhatsApp" },
                { label: "Flusso", value: "Targa-prima" },
                { label: "Stato", value: "Attivo" },
              ]}
              status="active"
              type="cricchetto"
              baseFeatures={[
                "Schede veicolo ordinate con targa e informazioni operative",
                "Lavorazioni e ordini di lavoro raccolti in un unico punto",
                "Ricambi, manodopera e note collegati all'intervento",
                "Stato dei lavori visibile senza recuperare appunti o chat sparse",
                "Comandi operativi anche da WhatsApp per aggiornare note e stati",
                "Dashboard web per cercare, filtrare e controllare le schede attive",
              ]}
              proFeatures={[
                "Vista operativa per veicoli, targhe, lavorazioni, ricambi e manodopera",
                "Controllo dello stato degli interventi e dei lavori aperti",
                "Ricerca targa-prima per trovare rapidamente veicoli e storico operativo",
                "Aggiornamenti operativi anche via WhatsApp per note, stati e avanzamento",
                "Organizzazione più chiara tra accettazione, lavorazione, pronto ritiro e consegna",
                "Riduzione del rischio di lavori non tracciati o informazioni ricordate a memoria",
              ]}
              ctaBaseText="Scopri Cricchetto"
              ctaFinalText="Scopri Cricchetto"
              ctaSecondaryText="Parla con noi di Cricchetto"
              externalCtaHref="https://cricchetto.filo-ai.it"
              externalCtaLabel="Scopri Cricchetto"
            />

            <ProductBlock
              id="atlas"
              name="Atlas"
              description="Le automazioni che fanno scorrere il lavoro. Atlas collega sistemi, workflow, task ripetitivi, reminder e passaggi interni per ridurre il lavoro manuale."
              target="Processi interni, CRM, integrazioni, routing operativo"
              mainBenefit="Processi collegati, meno lavoro ripetitivo"
              status="active"
              type="atlas"
              baseFeatures={[
                "Gestione delle richieste operative in ingresso",
                "Risposte automatiche base o conferme standard",
                "Raccolta dei dati necessari per avviare il processo",
                "Notifiche al titolare o al referente del flusso",
                "Passaggio minimo verso CRM, calendario o strumento compatibile",
                "Task ricorrenti semplici per non perdere scadenze",
              ]}
              proFeatures={[
                "Tutto il Piano Base, con automazioni complete tra strumenti e reparti",
                "Dashboard operativa per vedere stato richieste, task, scadenze e metriche",
                "Workflow personalizzati con logiche, condizioni e passaggi più articolati",
                "Gestione più ricca dei flussi: assegnazioni, reminder, follow-up e aggiornamenti",
                "Integrazioni operative più evolute con CRM e sistemi compatibili",
                "Monitoraggio dei passaggi critici per capire cosa è fermo, completato o da gestire",
              ]}
              ctaBaseText="Automatizza i processi"
              ctaFinalText="Automatizza i processi con Atlas Pro"
              ctaSecondaryText="Scopri le integrazioni"
            />

            <ProductBlock
              id="igea"
              name="Igea"
              description="L&apos;assistente AI per studi e professionisti. Riprende la logica di Galatea con un tono più sobrio, utile per richieste, appuntamenti, organizzazione clienti e promemoria. Soluzione in arrivo."
              target="Medici, fisioterapisti, nutrizionisti, psicologi, studi professionali"
              mainBenefit="Studio più ordinato, comunicazioni più affidabili"
              status="coming_soon"
              type="igea"
              baseFeatures={[
                "Raccolta ordinata delle richieste in ingresso",
                "Risposte automatiche standard con tono professionale",
                "Raccolta dei dati cliente necessari alla prima valutazione organizzativa",
                "Notifiche allo studio o al referente",
                "Promemoria base sugli appuntamenti",
                "Pannello operativo previsto, non ancora disponibile",
              ]}
              proFeatures={[
                "Funzioni avanzate previste per studi con più operatori",
                "Dashboard operativa prevista per richieste, appuntamenti e stato attività",
                "Integrazioni future con agenda e canali di messaggistica compatibili",
                "Reporting e visibilità operativa in valutazione",
              ]}
              ctaBaseText="Richiedi aggiornamenti"
              ctaFinalText="Organizza meglio il tuo studio"
              ctaSecondaryText="Parla con noi di Igea"
            />

            <ProductBlock
              id="hermes"
              name="Hermes"
              description="Il sistema che raccoglie e ordina i lead. Acquisisce richieste, avvia il primo contatto, qualifica il bisogno e notifica il titolare o il team corretto. Non ancora disponibile."
              target="Lead intake, primo contatto, qualificazione, notifiche"
              mainBenefit="Meno richieste perse, lead più ordinati"
              status="coming_soon"
              type="hermes"
              baseFeatures={[
                "Raccolta ordinata delle richieste in ingresso",
                "Messaggi automatici standard per il primo contatto",
                "Raccolta dati essenziali del lead",
                "Notifica rapida al titolare o al team commerciale",
                "Qualificazione iniziale tramite flussi guidati prevista",
                "Stato richieste base previsto per seguire i lead aperti",
              ]}
              proFeatures={[
                "Tutto il Piano Base, con logiche di intake più avanzate",
                "Dashboard prevista per lead, stato richieste e metriche commerciali",
                "Smistamento più evoluto verso team o canali diversi",
                "Collegamento futuro con CRM o strumenti di follow-up compatibili",
              ]}
              ctaBaseText="Entra in lista d'attesa"
              ctaFinalText="Non perdere più richieste"
              ctaSecondaryText="Chiedi disponibilità"
            />
          </div>
        </section>

        <WhyFilo />

        <Integrations />

        <Contact />
      </main>

      <Footer />
    </>
  );
}
