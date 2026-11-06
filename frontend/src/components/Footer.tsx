import React from 'react';
import { Terminal, ArrowUp } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface FooterProps {
  onOpenSystem: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSystem }) => {
  const scrollToTop = () => {
    soundFx.playKeyClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-[#00FF66]/20 bg-black/95 py-12 text-zinc-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#00FF66]/10">
          {/* Logo & Slogan */}
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded border border-[#00FF66]/50 bg-[#021406] flex items-center justify-center text-[#00FF66] shadow-[0_0_10px_rgba(0,255,102,0.3)]">
              <Terminal className="w-4 h-4" />
            </span>
            <div>
              <span className="font-orbitron font-extrabold text-lg text-[#00FF66] tracking-wider matrix-text-glow-subtle">
                FUN CODE
              </span>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                Understand it. Debug it. Master it.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-wider">
            <a
              href="#hero"
              onClick={() => soundFx.playKeyClick()}
              className="hover:text-[#00FF66] transition-colors"
            >
              Home
            </a>
            <a
              href="#features"
              onClick={() => soundFx.playKeyClick()}
              className="hover:text-[#00FF66] transition-colors"
            >
              Features
            </a>
            <a
              href="#languages"
              onClick={() => soundFx.playKeyClick()}
              className="hover:text-[#00FF66] transition-colors"
            >
              Languages
            </a>
            <a
              href="#how-it-works"
              onClick={() => soundFx.playKeyClick()}
              className="hover:text-[#00FF66] transition-colors"
            >
              How It Works
            </a>
            <a
              href="#about"
              onClick={() => soundFx.playKeyClick()}
              className="hover:text-[#00FF66] transition-colors"
            >
              About
            </a>
            <button
              type="button"
              onClick={() => {
                soundFx.playSuccess();
                onOpenSystem();
              }}
              className="text-[#00FF66] hover:underline"
            >
              Enter System
            </button>
          </nav>

          {/* Scroll to top */}
          <button
            type="button"
            onClick={scrollToTop}
            title="Scroll to top"
            className="p-2.5 rounded border border-[#00FF66]/30 bg-black/60 text-[#00FF66] hover:bg-[#00FF66]/10 hover:border-[#00FF66] transition-all shadow-[0_0_8px_rgba(0,255,102,0.1)]"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Metadata & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            &copy; 2026 FUN CODE. All rights reserved. The Matrix Movie Design Theme.
          </div>
          <div className="flex items-center gap-4 text-[#00FF66]/60">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66]" />
              SYS: ONLINE
            </span>
            <span>·</span>
            <span>CANVAS RAIN: 60FPS</span>
            <span>·</span>
            <span>ENCRYPTION: 256-BIT</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
