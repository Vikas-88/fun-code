import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Terminal, Shield } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface NavbarProps {
  onOpenSystem: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSystem }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(soundFx.getMuted());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const nextMuted = soundFx.toggleMute();
    setIsMuted(nextMuted);
  };

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Studio IDE', href: '#studio' },
    { label: 'Features', href: '#features' },
    { label: 'Languages', href: '#languages' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'About', href: '#about' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-[#00FF66]/20 py-3 shadow-[0_4px_25px_rgba(0,255,102,0.08)]'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Single element Brand Wordmark */}
          <a
            href="#hero"
            onClick={() => soundFx.playKeyClick()}
            className="flex items-center gap-2.5 text-xl font-black tracking-wider text-[#00FF66] hover:text-[#70FF9D] transition-colors whitespace-nowrap shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF66]"
          >
            <span className="w-8 h-8 rounded border border-[#00FF66]/50 bg-black/60 flex items-center justify-center text-[#00FF66] group-hover:border-[#00FF66] group-hover:shadow-[0_0_12px_#00FF66] transition-all">
              <Terminal className="w-4 h-4" />
            </span>
            <span className="font-orbitron font-extrabold matrix-text-glow">FUN CODE</span>
          </a>

          {/* Zone 2: Navigation Links (Clean single-line labels) */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-mono tracking-widest uppercase">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => soundFx.playKeyClick()}
                className="text-[#9fe8b0] hover:text-[#00FF66] transition-colors relative py-1 group whitespace-nowrap shrink-0"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00FF66] transition-all duration-200 group-hover:w-full shadow-[0_0_8px_#00FF66]" />
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action & Controls */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Audio Feedback Toggle */}
            <button
              type="button"
              onClick={handleToggleSound}
              title={isMuted ? 'Enable Matrix audio blips' : 'Mute Matrix audio'}
              className="p-2 rounded border border-[#00FF66]/30 bg-black/50 text-[#00FF66]/80 hover:text-[#00FF66] hover:border-[#00FF66] hover:bg-[#00FF66]/10 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00FF66]"
              aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-pulse" />}
            </button>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={() => {
                soundFx.playSuccess();
                onOpenSystem();
              }}
              className="relative px-4 py-2 text-xs font-mono font-bold tracking-wider uppercase text-black bg-[#00FF66] hover:bg-[#39FF14] rounded-sm transition-all duration-200 shadow-[0_0_15px_rgba(0,255,102,0.4)] hover:shadow-[0_0_25px_rgba(0,255,102,0.8)] hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Enter System
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => {
                soundFx.playKeyClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden p-2 rounded border border-[#00FF66]/30 text-[#00FF66] hover:bg-[#00FF66]/10"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-b border-[#00FF66]/30 px-6 py-6 shadow-2xl">
          <nav className="flex flex-col gap-4 text-sm font-mono uppercase tracking-wider">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  soundFx.playKeyClick();
                  setMobileMenuOpen(false);
                }}
                className="text-[#9fe8b0] hover:text-[#00FF66] hover:pl-2 transition-all border-b border-[#00FF66]/10 pb-2"
              >
                &gt; {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                soundFx.playSuccess();
                onOpenSystem();
              }}
              className="mt-2 w-full py-2.5 text-center font-bold text-xs uppercase bg-[#00FF66] text-black rounded-sm shadow-[0_0_15px_rgba(0,255,102,0.5)]"
            >
              Enter System
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
