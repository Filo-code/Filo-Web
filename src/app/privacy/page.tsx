import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: { absolute: "Privacy Policy | Filò" },
  description: "Informativa privacy di Filò sul trattamento dei dati inviati tramite sito, form di contatto e richieste commerciali.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />

      <main className="flex-1 pt-32 pb-24 border-t border-white/5 bg-[#030303] min-h-screen">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-white/50" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">Privacy Policy</h1>
              <p className="text-xs text-white/40 font-mono tracking-widest uppercase mt-1">
                Ultimo aggiornamento: Aprile 2026
              </p>
            </div>
          </div>

          <div className="prose prose-invert prose-sm md:prose-base prose-p:text-[#B5B5BE] prose-headings:text-white prose-a:text-emerald-400 max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold border-b border-white/10 pb-2 mb-4">1. Informazioni generali</h2>
              <p>
                Questa informativa descrive come vengono trattati i dati personali degli utenti che
                consultano il sito <strong>filo-ai.it</strong> o inviano una richiesta tramite il form
                di contatto. L&apos;informativa riguarda solo questo dominio e non eventuali siti esterni
                raggiunti tramite link.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold border-b border-white/10 pb-2 mb-4">2. Titolare del trattamento</h2>
              <p>
                Il titolare del trattamento è <strong>MOUAL HICHAM</strong> (P.IVA 04781590981), con
                sede legale in Brescia. Per richieste generali puoi scrivere a{" "}
                <a href="mailto:info@filo-ai.it">info@filo-ai.it</a>. Per richieste relative alla
                privacy puoi scrivere a <a href="mailto:privacy@filo-ai.it">privacy@filo-ai.it</a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold border-b border-white/10 pb-2 mb-4">3. Dati trattati e finalità</h2>
              <p>
                <strong>Dati di navigazione:</strong> i sistemi tecnici necessari al funzionamento del
                sito possono acquisire dati trasmessi normalmente dai protocolli Internet, come indirizzo
                IP, log tecnici e informazioni sul browser.
              </p>
              <p>
                <strong>Dati forniti volontariamente:</strong> l&apos;invio del form comporta
                l&apos;acquisizione dei dati inseriti, tra cui nome, attività, settore, email, telefono,
                città, prodotto di interesse, messaggio e consenso privacy. Questi dati sono usati per
                rispondere alla richiesta, distinguere l&apos;area di interesse e valutare una possibile
                configurazione tra Piano Base, Piano Pro o prodotti non ancora disponibili.
              </p>
              <p>
                I dati inviati tramite il form non vengono ceduti a terzi per finalità di marketing.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold border-b border-white/10 pb-2 mb-4">4. Base giuridica e conservazione</h2>
              <p>
                Il trattamento dei dati inviati tramite form si basa sul consenso espresso
                dall&apos;utente e sulla necessità di rispondere alla richiesta ricevuta. I dati sono
                conservati per il tempo necessario a gestire la richiesta, l&apos;eventuale follow-up
                commerciale e gli eventuali rapporti conseguenti, salvo obblighi di legge o richiesta
                di cancellazione applicabile.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold border-b border-white/10 pb-2 mb-4">5. Cookie, preferenze e analytics</h2>
              <p>
                Alla data di ultimo aggiornamento, il sito non attiva cookie di profilazione, pixel di
                marketing, Meta Pixel o tag pubblicitari.
              </p>
              <p>
                Per ricordare le preferenze di consenso viene usata una voce di{" "}
                <code>localStorage</code> nel browser, con chiave <code>filo_consent_v1</code>. Le categorie
                previste sono: necessari, analytics e marketing. I necessari sono sempre attivi;
                analytics e marketing sono disattivati di default.
              </p>
              <p>
                Gli eventi analytics interni, come pageview, click sulle CTA e stato di invio del form,
                non includono email, telefono, messaggi o altri dati personali inseriti nel form. Eventuali
                provider analytics esterni saranno collegati solo dopo consenso analytics.
              </p>
              <p>
                Eventuali strumenti marketing futuri, inclusi Meta Pixel o funzionalità advertising di GA4,
                resteranno disattivati finché non sarà raccolto un consenso marketing dedicato e questa
                informativa sarà aggiornata.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold border-b border-white/10 pb-2 mb-4">6. Diritti dell&apos;interessato</h2>
              <p>
                L&apos;utente può chiedere accesso, rettifica, aggiornamento, cancellazione, limitazione
                del trattamento, portabilità dei dati e opposizione nei casi previsti dalla normativa.
                Le richieste possono essere inviate all&apos;indirizzo{" "}
                <a href="mailto:privacy@filo-ai.it">privacy@filo-ai.it</a>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
