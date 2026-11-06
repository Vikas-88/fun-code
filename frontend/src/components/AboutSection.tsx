import React from 'react';
import { Terminal, Shield, Eye, Zap, Binary, Check } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      title: 'No More Dry Manuals',
      desc: 'Traditional textbooks treat code as cold math equations. FUN CODE treats code as living narratives, character interactions, and logical puzzles.',
      icon: Terminal,
    },
    {
      title: 'Total Logic Transparency',
      desc: 'We reject "copy-paste without comprehension". Every single line of syntax is illuminated so you truly own the knowledge.',
      icon: Eye,
    },
    {
      title: 'Instant Error Solvers',
      desc: 'Compiler errors are often hostile and opaque. FUN CODE translates cryptic stack traces into plain English diagnostics and step-by-step remedies.',
      icon: Zap,
    },
  ];

  const stats = [
    { value: '10+', label: 'Supported Languages' },
    { value: '4', label: 'Neural Explainer Engines' },
    { value: '100%', label: 'Human-Readable Clarity' },
    { value: '0', label: 'Fake AI Jargon' },
  ];

  return (
    <section id="about" className="relative py-24 border-t border-[#00FF66]/20 bg-black/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Mission Prose */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-[#00FF66]/30 bg-black/60 text-xs font-mono text-[#00FF66] tracking-widest uppercase mb-4">
              <span>THE FUN CODE MANIFESTO</span>
            </div>
            <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-wide uppercase mb-6">
              FREEING MINDS FROM <span className="text-[#00FF66] matrix-text-glow">CONFUSION</span>
            </h2>
            <div className="space-y-4 font-mono text-zinc-300 text-sm sm:text-base leading-relaxed">
              <p>
                In the movie <em className="text-white">The Matrix</em>, operators don&apos;t just see cascading green glyphs—they see people, buildings, helicopters, and reality itself.
              </p>
              <p>
                That is exactly what <strong className="text-[#00FF66]">FUN CODE</strong> accomplishes for programming. When beginners and experienced developers look at code, they often see an intimidating wall of characters and confusing compiler errors.
              </p>
              <p>
                FUN CODE strips away the digital illusion. By converting algorithms into captivating comic stories, deconstructing syntax line by line, and debugging errors with crystal clarity, we give you the sight to master the system.
              </p>
            </div>

            {/* Quick Pillars */}
            <div className="mt-8 space-y-4">
              {pillars.map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.title} className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded border border-[#00FF66]/40 bg-[#021808] flex items-center justify-center text-[#00FF66] shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-orbitron text-sm font-bold text-white mb-0.5">
                        {p.title}
                      </h4>
                      <p className="font-mono text-xs text-zinc-400 leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Cyber Visual / Stats Matrix */}
          <div className="relative">
            <div className="rounded-lg border border-[#00FF66]/40 bg-[#020e05]/90 backdrop-blur-md p-6 sm:p-8 shadow-[0_0_35px_rgba(0,255,102,0.15)] relative overflow-hidden">
              {/* Corner decor */}
              <div className="absolute top-0 right-0 p-3 opacity-20 font-mono text-[9px] text-[#00FF66]">
                01000110 01010101 01001110
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-[#00FF66] uppercase tracking-widest mb-6">
                <Binary className="w-4 h-4" />
                <span>SYSTEM METRICS & SPECIFICATIONS</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="p-4 rounded border border-[#00FF66]/20 bg-black/60 font-mono"
                  >
                    <div className="font-orbitron text-2xl sm:text-3xl font-black text-[#00FF66] matrix-text-glow-subtle tabular-nums">
                      {s.value}
                    </div>
                    <div className="text-xs text-zinc-400 mt-1 uppercase tracking-wider">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Terminal Quote */}
              <div className="p-4 rounded bg-black/80 border border-[#00FF66]/30 font-mono text-xs text-zinc-300">
                <div className="text-[#00FF66] font-bold mb-1">&gt; ORACLE_TRANSMISSION.txt:</div>
                <p className="italic text-[#97f8b0]">
                  &quot;You take the red pill—you stay in wonderland, and FUN CODE shows you how deep the logic rabbit-hole goes.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
