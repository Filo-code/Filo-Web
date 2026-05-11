import { HeroActions } from "@/components/sections/HeroActions";

export function Hero() {
  return (
    <section className="relative min-h-[95vh] flex flex-col items-center justify-center pt-24 overflow-hidden">
      {/* Background glow — hidden on mobile: blur-[150px] is GPU-intensive on small devices */}
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white opacity-[0.015] blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 text-center z-10 flex flex-col items-center">
        <div className="flex flex-col items-center">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-[#0A0A0A]/50 px-3 py-1.5 text-xs text-[#B5B5BE] backdrop-blur-md mb-8 tracking-widest uppercase font-mono shadow-sm">
            <span className="flex w-2 h-2 rounded-full bg-white/80 mr-2 animate-pulse" />
            Soluzioni AI con Piano Base e Piano Pro
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white max-w-5xl mb-6 leading-[1.05] text-balance">
            Ogni richiesta nel flusso giusto: <br className="hidden md:block" />
            <span className="text-gradient">appuntamenti, lead e operazioni</span>
          </h1>

          <p className="text-lg md:text-xl text-[#B5B5BE] max-w-2xl mb-12 leading-relaxed">
            Galatea resta il centro per appuntamenti beauty. Cricchetto porta ordine
            nelle officine. Atlas collega workflow e processi interni, mentre Igea
            e Hermes sono in arrivo per studi professionali e lead intake.
          </p>

          <HeroActions />
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
