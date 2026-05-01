export default function Loading() {
  return (
    <div role="status" aria-live="polite" aria-label="Caricamento dell'ecosistema Filò in corso" className="fixed inset-0 bg-[#030303] z-[999] flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center">
        {/* Outer glowing ring */}
        <div className="absolute w-24 h-24 border border-white/5 rounded-full animate-[spin_3s_linear_infinite]" />
        
        {/* Core pulsing brand element */}
        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 relative overflow-hidden">
          <div className="w-full h-full bg-gradient-to-tr from-white/20 to-transparent animate-pulse" />
        </div>
        
        {/* Rotating dash */}
        <svg className="absolute w-24 h-24 animate-[spin_2s_ease-in-out_infinite]" viewBox="0 0 100 100">
           <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="60 300" strokeLinecap="round" />
        </svg>
      </div>
      
      <p className="mt-8 text-[10px] uppercase font-mono tracking-[0.2em] text-white/40 animate-pulse">
        Caricamento Ecosistema...
      </p>
    </div>
  );
}
