import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FiloLogoFull } from "@/components/brand/FiloLogo";

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#030303] py-16 mt-24 overflow-hidden">
      {/* Subtle top glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[500px] bg-white/[0.015] blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 relative z-10">
        <div className="col-span-1 md:col-span-2">
          <FiloLogoFull size={28} className="mb-5 opacity-90" />
          <p className="text-[#B5B5BE] max-w-sm text-sm leading-relaxed">
            Galatea per appuntamenti beauty, Cricchetto per officine, Atlas per
            automazioni operative, Igea per studi professionali e Hermes per lead intake.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold flex items-center gap-2 mb-6 text-sm tracking-widest uppercase">Soluzioni</h4>
          <ul className="space-y-4">
            <li><Link href="#galatea" className="group flex items-center text-[#B5B5BE] hover:text-white text-sm transition-colors">Galatea <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" /></Link></li>
            <li><Link href="#cricchetto" className="group flex items-center text-[#B5B5BE] hover:text-white text-sm transition-colors">Cricchetto <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" /></Link></li>
            <li><Link href="#atlas" className="group flex items-center text-[#B5B5BE] hover:text-white text-sm transition-colors">Atlas <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" /></Link></li>
            <li><Link href="#igea" className="group flex items-center text-[#B5B5BE] hover:text-white text-sm transition-colors">Igea <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" /></Link></li>
            <li><Link href="#hermes" className="group flex items-center text-[#B5B5BE] hover:text-white text-sm transition-colors">Hermes <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" /></Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold flex items-center gap-2 mb-6 text-sm tracking-widest uppercase">Azienda</h4>
          <ul className="space-y-4">
            <li><Link href="#why-filo" className="text-[#B5B5BE] hover:text-white text-sm transition-colors">Perché Filò</Link></li>
            <li><Link href="#contact" className="text-[#B5B5BE] hover:text-white text-sm transition-colors">Contatti</Link></li>
            <li><Link href="/privacy" className="text-[#B5B5BE] hover:text-white text-sm transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-white/40 relative z-10">
        <p>© {new Date().getFullYear()} Filò. Tutti i diritti riservati.</p>
        <p className="mt-2 md:mt-0 tracking-widest uppercase text-[10px]">AI operativa per aziende</p>
      </div>
    </footer>
  );
}
