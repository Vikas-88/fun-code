import React, { useState } from 'react';
import { LANGUAGES, LanguageInfo } from '../data/languages';
import { soundFx } from '../utils/soundEffects';
import { Code, Check, Copy, Terminal, Sparkles, AlertTriangle } from 'lucide-react';

export const LanguagesGrid: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState<LanguageInfo>(LANGUAGES[0]);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'syntax' | 'error' | 'comic'>('syntax');

  const handleCopy = (code: string) => {
    soundFx.playKeyClick();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="languages" className="relative py-24 border-t border-[#00FF66]/20 bg-black/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-[#00FF66]/30 bg-black/60 text-xs font-mono text-[#00FF66] tracking-widest uppercase mb-3">
            <span>SYNTAX MATRIX ECOSYSTEM</span>
          </div>
          <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-wide uppercase mb-4">
            SUPPORTED <span className="text-[#00FF66] matrix-text-glow">LANGUAGES</span>
          </h2>
          <p className="font-mono text-zinc-300 text-sm sm:text-base leading-relaxed text-balance">
            Native parsing across the ten industry pillars. Seamless translation from raw code to understandable narrative models.
          </p>
        </div>

        {/* 10 Languages Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 mb-12">
          {LANGUAGES.map((lang) => {
            const isSelected = selectedLang.id === lang.id;
            return (
              <button
                key={lang.id}
                type="button"
                onClick={() => {
                  soundFx.playKeyClick();
                  setSelectedLang(lang);
                }}
                className={`relative p-4 rounded-lg border text-left transition-all duration-200 group flex flex-col justify-between h-32 ${
                  isSelected
                    ? 'border-[#00FF66] bg-[#021808] shadow-[0_0_20px_rgba(0,255,102,0.35)] scale-[1.02]'
                    : 'border-[#00FF66]/25 bg-black/60 hover:border-[#00FF66]/60 hover:bg-[#00FF66]/5'
                }`}
              >
                {/* Tech Badge */}
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`font-orbitron text-xs font-bold px-2 py-0.5 rounded ${
                      isSelected
                        ? 'bg-[#00FF66] text-black shadow-[0_0_8px_#00FF66]'
                        : 'bg-black text-[#00FF66] border border-[#00FF66]/40'
                    }`}
                  >
                    {lang.badge}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">{lang.fileExt}</span>
                </div>

                <div>
                  <h3
                    className={`font-orbitron text-base font-bold transition-colors ${
                      isSelected ? 'text-white' : 'text-zinc-200 group-hover:text-[#00FF66]'
                    }`}
                  >
                    {lang.name}
                  </h3>
                  <p className="text-[10px] font-mono text-zinc-400 truncate mt-0.5">
                    {lang.category}
                  </p>
                </div>

                {isSelected && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#00FF66] shadow-[0_0_8px_#00FF66]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Interactive Language Inspection Terminal */}
        <div className="rounded-lg border border-[#00FF66]/40 bg-[#020d04]/90 backdrop-blur-md p-6 sm:p-8 shadow-[0_0_30px_rgba(0,255,102,0.15)]">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#00FF66]/20 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded border border-[#00FF66]/60 bg-black flex items-center justify-center font-orbitron font-bold text-[#00FF66] shadow-[0_0_10px_rgba(0,255,102,0.3)]">
                {selectedLang.badge}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-orbitron text-xl font-bold text-white">
                    {selectedLang.name}
                  </h3>
                  <span className="text-xs font-mono text-[#00FF66] bg-[#00FF66]/10 px-2 py-0.5 rounded border border-[#00FF66]/30">
                    {selectedLang.category}
                  </span>
                </div>
                <p className="text-xs font-mono text-zinc-400 mt-1">
                  {selectedLang.description}
                </p>
              </div>
            </div>

            {/* Sub-Tabs: Syntax / Error Solver / Comic Premise */}
            <div className="flex items-center gap-2 bg-black p-1 rounded border border-[#00FF66]/30 text-xs font-mono">
              <button
                type="button"
                onClick={() => {
                  soundFx.playKeyClick();
                  setActiveTab('syntax');
                }}
                className={`px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors ${
                  activeTab === 'syntax'
                    ? 'bg-[#00FF66] text-black font-bold shadow-[0_0_10px_rgba(0,255,102,0.5)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>Syntax</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  soundFx.playKeyClick();
                  setActiveTab('error');
                }}
                className={`px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors ${
                  activeTab === 'error'
                    ? 'bg-[#00FF66] text-black font-bold shadow-[0_0_10px_rgba(0,255,102,0.5)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Error Solver</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  soundFx.playKeyClick();
                  setActiveTab('comic');
                }}
                className={`px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors ${
                  activeTab === 'comic'
                    ? 'bg-[#00FF66] text-black font-bold shadow-[0_0_10px_rgba(0,255,102,0.5)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Comic Story</span>
              </button>
            </div>
          </div>

          {/* Tab Content Display */}
          <div className="font-mono text-xs sm:text-sm">
            {activeTab === 'syntax' && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => handleCopy(selectedLang.syntaxSnippet)}
                  className="absolute top-3 right-3 px-2.5 py-1 rounded border border-[#00FF66]/30 bg-black/80 hover:bg-[#00FF66]/20 text-xs text-[#00FF66] flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3 h-3 text-[#00FF66]" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
                <pre className="p-4 sm:p-6 rounded bg-black/90 border border-[#00FF66]/20 text-[#a0f5b4] overflow-x-auto leading-relaxed">
                  {selectedLang.syntaxSnippet}
                </pre>
              </div>
            )}

            {activeTab === 'error' && (
              <div className="space-y-4">
                <div className="p-4 rounded bg-red-950/30 border border-red-500/30 text-red-300">
                  <div className="text-[11px] font-bold text-red-400 uppercase tracking-wider mb-1">
                    Typical Compiler / Runtime Error:
                  </div>
                  <code className="text-sm font-bold text-red-200">{selectedLang.sampleError}</code>
                </div>
                <div className="p-4 rounded bg-[#031508] border border-[#00FF66]/30 text-zinc-300">
                  <div className="text-[11px] font-bold text-[#00FF66] uppercase tracking-wider mb-1">
                    FUN CODE Intelligent Solution:
                  </div>
                  <p className="leading-relaxed">{selectedLang.errorSolution}</p>
                </div>
              </div>
            )}

            {activeTab === 'comic' && (
              <div className="p-5 rounded bg-black/80 border border-[#00FF66]/30 space-y-3">
                <div className="flex items-center gap-2 text-[#00FF66] font-orbitron text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Storyline Premise Generated for {selectedLang.name}</span>
                </div>
                <p className="text-zinc-200 font-mono text-sm sm:text-base leading-relaxed italic">
                  &ldquo;{selectedLang.comicPremise}&rdquo;
                </p>
                <div className="text-xs text-zinc-400">
                  This narrative is paired with custom comic illustration panels to anchor memory for life.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
