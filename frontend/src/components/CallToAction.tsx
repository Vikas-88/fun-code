import React from 'react';
import { ArrowRight, Terminal, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface CallToActionProps {
  onOpenSystem: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({ onOpenSystem }) => {
  return (
    <section className="relative py-28 border-t border-[#00FF66]/20 bg-black overflow-hidden">
      {/* Background glow ambient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00FF66]/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Futuristic Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded border border-[#00FF66]/40 bg-black/80 backdrop-blur-sm text-xs font-mono text-[#00FF66] tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(0,255,102,0.2)]">
          <Terminal className="w-3.5 h-3.5" />
          <span>NEURAL ACCESS POINT: UNRESTRICTED</span>
        </div>

        {/* Headline */}
        <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-wide uppercase mb-6 text-balance">
          READY TO DECODE <span className="text-[#00FF66] matrix-text-glow">THE FUTURE?</span>
        </h2>

        {/* Supporting Copy */}
        <p className="font-mono text-zinc-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed text-balance">
          Leave cryptic bugs and frustrating tutorials behind. Step into an intuitive coding reality where every algorithm tells a story you will never forget.
        </p>

        {/* Button: START YOUR JOURNEY */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => {
              soundFx.playSuccess();
              onOpenSystem();
            }}
            className="group relative px-10 py-4 text-base font-mono font-bold tracking-widest uppercase text-black bg-[#00FF66] hover:bg-[#39FF14] rounded-sm transition-all duration-200 shadow-[0_0_25px_rgba(0,255,102,0.6)] hover:shadow-[0_0_45px_rgba(0,255,102,1)] hover:scale-105 active:scale-95 flex items-center gap-3"
          >
            <span>START YOUR JOURNEY</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
          </button>
        </div>

        {/* Binary Footer Watermark Line */}
        <div className="mt-12 text-[10px] font-mono text-[#00FF66]/40 tracking-[0.25em] select-none">
          01000110 01010101 01001110 00100000 01000011 01001111 01000100 01000101
        </div>
      </div>
    </section>
  );
};
