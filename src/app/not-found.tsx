import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#030303] text-white relative overflow-hidden">
      {/* Premium glow effect background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.04] via-transparent to-transparent pointer-events-none" aria-hidden="true" />

      <div className="text-center z-10 p-6 flex flex-col items-center">
        {/* Giant Monospace 404 Watermark — decorative only */}
        <span
          aria-hidden="true"
          className="text-[120px] md:text-[180px] font-bold tracking-tighter leading-none text-white/5 font-mono mb-4 pointer-events-none select-none"
        >
          404
        </span>

        <h1 className="text-2xl md:text-3xl font-semibold mb-4 tracking-tight">Vicolo cieco.</h1>
        <p className="text-[#B5B5BE] mb-10 max-w-sm mx-auto text-sm leading-relaxed">
          Sembra che l&apos;infrastruttura o la pagina che stai cercando non esista più all&apos;interno dell&apos;ecosistema Filò.
        </p>
        
        <Link
          href="/"
          className={cn(
            "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            "button-premium h-12 px-8"
          )}
        >
          Torna alla Base
        </Link>
      </div>
    </main>
  );
}
