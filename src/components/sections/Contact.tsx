"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { CheckCircle2, AlertCircle, ChevronDown, ShieldCheck, Mail, Phone, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

type ContactSubmitError = Error & { status?: number };

const submitFormToWebhook = async (data: Record<string, FormDataEntryValue>) => {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  let parsed: { success?: boolean; error?: string } | null = null;
  try {
    parsed = await response.json();
  } catch {
    parsed = null;
  }

  if (!response.ok || !parsed?.success) {
    const error = new Error(parsed?.error || "Errore durante l'invio della richiesta") as ContactSubmitError;
    error.status = response.status;
    throw error;
  }

  return parsed;
};

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [productInterest, setProductInterest] = useState("");
  const hasTrackedFormStart = useRef(false);

  useEffect(() => {
    const handlePreselect = (e: Event) => {
      const { product } = (e as CustomEvent<{ product: string }>).detail ?? {};
      if (product) setProductInterest(product);
    };
    window.addEventListener("filo_product_interest_selected", handlePreselect);
    return () => window.removeEventListener("filo_product_interest_selected", handlePreselect);
  }, []);

  const trackFormStart = () => {
    if (hasTrackedFormStart.current) return;
    hasTrackedFormStart.current = true;
    trackEvent("contact_form_start", {
      location: "contact_form",
      status: "started",
      path: window.location.pathname,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      await submitFormToWebhook(data);
      trackEvent("contact_form_submit_success", {
        location: "contact_form",
        product: typeof data.interest === "string" ? data.interest : "unknown",
        status: "success",
        path: window.location.pathname,
      });
      setSubmitStatus("success");
    } catch (error) {
      const submitError = error as ContactSubmitError;
      trackEvent("contact_form_submit_error", {
        location: "contact_form",
        product: typeof data.interest === "string" ? data.interest : "unknown",
        status: submitError.status ?? "exception",
        path: window.location.pathname,
      });
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      q: "Perché non mostrate prezzi fissi sul sito?",
      a: "L'offerta è organizzata in Piano Base e Piano Pro, ma il costo dipende da canali, integrazioni e volume operativo. Prima capiamo il flusso reale, poi proponiamo una configurazione coerente.",
    },
    {
      q: "Quanto dura lo sviluppo di un sistema Filò?",
      a: "Dipende dall'integrazione richiesta. Per un ecosistema iniziale, quando materiali e accessi sono disponibili, lavoriamo di norma su una finestra di alcune settimane.",
    },
    {
      q: "Devo cambiare CRM, calendario o strumenti attuali?",
      a: "Non necessariamente. Galatea, Cricchetto, Atlas, Igea e Hermes sono pensati per collegarsi ai processi esistenti quando le integrazioni tecniche lo permettono.",
    },
  ];

  return (
    <section id="contact" className="py-40 relative border-t border-white/5 bg-[#030303] overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-white/[0.01] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="container mx-auto px-6 md:px-12 relative z-10"
      >
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* INFO & FAQ SIDE */}
          <div className="flex flex-col gap-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                Trova il primo flusso da sistemare.
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Raccontaci se il problema è negli appuntamenti, nelle officine, nei lead,
                nelle richieste clienti o nei processi interni. Ti risponderemo con una prima direzione
                concreta e con il livello più adatto tra Base e Pro.
              </p>

              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 text-white/70">
                  <div className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-white/50" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Prima valutazione gratuita</p>
                    <p className="text-xs text-white/50">Risposta di norma entro 1-2 giorni lavorativi.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="border-t border-white/5 pt-12">
              <h3 className="text-lg font-semibold text-white mb-6">Domande frequenti</h3>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="border border-white/5 bg-white/[0.01] rounded-lg overflow-hidden transition-colors hover:bg-white/[0.02]">
                    <button
                      type="button"
                      aria-expanded={openFaq === i}
                      aria-controls={`faq-panel-${i}`}
                      id={`faq-trigger-${i}`}
                      className="w-full px-4 sm:px-6 py-4 flex items-center justify-between text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30 rounded-lg"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      <span className="text-sm font-medium text-white/90 pr-4">{faq.q}</span>
                      <ChevronDown className={cn("w-4 h-4 text-white/50 shrink-0 transition-transform duration-300", openFaq === i && "rotate-180")} />
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div
                          id={`faq-panel-${i}`}
                          role="region"
                          aria-labelledby={`faq-trigger-${i}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 sm:px-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-white/5 pt-4">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FORM SIDE */}
          <div className="glass-card p-8 md:p-10 rounded-2xl relative">
            <div className="absolute -top-px left-10 right-10 flex justify-center">
              <div className="w-3/4 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>

            <AnimatePresence mode="wait">
              {submitStatus === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center py-20"
                >
                  <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Richiesta ricevuta</h3>
                  <p className="text-muted-foreground text-sm max-w-sm mb-8">
                    Abbiamo acquisito la richiesta. La valuteremo e ti contatteremo
                    all&apos;indirizzo email indicato con un primo riscontro operativo.
                  </p>
                  <Button variant="outline" onClick={() => setSubmitStatus("idle")}>
                    Invia un&apos;altra richiesta
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                  onSubmit={handleSubmit}
                  onFocusCapture={trackFormStart}
                >
                  {/* Honeypot hidden from users and assistive tech. */}
                  <div aria-hidden="true" className="hidden">
                    <label htmlFor="contact-website">Website</label>
                    <input
                      id="contact-website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      defaultValue=""
                    />
                  </div>
                  {submitStatus === "error" && (
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-3 mb-6">
                      <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-red-200">
                        C&apos;è stato un problema durante l&apos;invio. Riprova o scrivici direttamente a info@filo-ai.it.
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="contact-name" className="text-xs font-semibold text-white/70 uppercase tracking-widest pl-1">Nome completo *</label>
                      <Input id="contact-name" required name="name" type="text" placeholder="Es. Mario Rossi" autoComplete="name" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-company" className="text-xs font-semibold text-white/70 uppercase tracking-widest pl-1">Nome azienda *</label>
                      <Input id="contact-company" required name="company" type="text" placeholder="Es. Acme Corp" icon={<Building2 />} autoComplete="organization" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="contact-email" className="text-xs font-semibold text-white/70 uppercase tracking-widest pl-1">Email lavorativa *</label>
                      <Input id="contact-email" required name="email" type="email" placeholder="mario@acme.com" icon={<Mail />} autoComplete="email" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-phone" className="text-xs font-semibold text-white/70 uppercase tracking-widest pl-1">Telefono *</label>
                      <Input id="contact-phone" required name="phone" type="tel" placeholder="+39 333 1234567" icon={<Phone />} autoComplete="tel" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="contact-industry" className="text-xs font-semibold text-white/70 uppercase tracking-widest pl-1">Settore *</label>
                      <Input id="contact-industry" required name="industry" type="text" placeholder="Es. estetica, officina, studio professionale..." />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-city" className="text-xs font-semibold text-white/70 uppercase tracking-widest pl-1">Città (opzionale)</label>
                      <Input id="contact-city" name="city" type="text" placeholder="Roma, Milano..." autoComplete="address-level2" />
                    </div>
                  </div>

                  <div className="space-y-2 relative z-20">
                    <label htmlFor="contact-interest" className="text-xs font-semibold text-white/70 uppercase tracking-widest pl-1">Area di interesse *</label>
                    <select id="contact-interest" required name="interest" value={productInterest} onChange={(e) => setProductInterest(e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/30 transition-all appearance-none cursor-pointer">
                      <option value="" disabled hidden>Seleziona la soluzione più vicina al tuo caso...</option>
                      <option value="galatea">Galatea - disponibile ora, appuntamenti beauty</option>
                      <option value="cricchetto">Cricchetto - officine, dashboard e WhatsApp</option>
                      <option value="atlas">Atlas - su richiesta, automazioni e workflow</option>
                      <option value="igea">Igea - in arrivo, studi e professionisti</option>
                      <option value="hermes">Hermes - non ancora disponibile, lead intake</option>
                      <option value="not_sure">Non sono sicuro, voglio orientarmi</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-white/30 absolute right-4 top-[38px] pointer-events-none" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="text-xs font-semibold text-white/70 uppercase tracking-widest pl-1">Dettagli *</label>
                    <Textarea id="contact-message" required name="message" rows={4} placeholder="Descrivi cosa vuoi migliorare: richieste, appuntamenti, officina, lead, reminder, dashboard, WhatsApp o processi interni..." />
                  </div>

                  <div className="flex items-start gap-3 py-2 cursor-pointer relative group">
                    <input required type="checkbox" id="privacy" name="privacy" className="mt-1 w-5 h-5 md:w-4 md:h-4 rounded border-white/20 bg-[#0a0a0a] accent-white cursor-pointer shrink-0" />
                    <label htmlFor="privacy" className="text-[11px] text-white/40 leading-relaxed cursor-pointer select-none group-hover:text-white/60 transition-colors">
                      Acconsento al trattamento dei dati inseriti per ricevere un riscontro sulla mia richiesta, come descritto nella{" "}
                      <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-white/60 underline hover:text-white">Privacy Policy</a>.
                    </label>
                  </div>

                  <Button variant="premium" size="lg" className="w-full h-12 text-sm" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        Invio in corso...
                      </div>
                    ) : "Invia la richiesta"}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
