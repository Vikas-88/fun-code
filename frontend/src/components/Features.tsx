import React, { useState } from 'react';
import {
  Sparkles,
  Terminal,
  ShieldAlert,
  Cpu,
  ArrowRight,
  X,
  CheckCircle2,
  BookOpen,
  Code2,
  Bug,
  Lightbulb,
} from 'lucide-react';
import { FEATURES_DATA, FeatureItem } from '../data/featuresData';
import { soundFx } from '../utils/soundEffects';

export const Features: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<FeatureItem | null>(null);

  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#00FF66]" />;
      case 'Terminal':
        return <Terminal className="w-6 h-6 text-[#00FF66]" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-6 h-6 text-[#00FF66]" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-[#00FF66]" />;
      default:
        return <Code2 className="w-6 h-6 text-[#00FF66]" />;
    }
  };

  return (
    <section id="features" className="relative py-24 border-t border-[#00FF66]/20 bg-black/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-[#00FF66]/30 bg-black/60 text-xs font-mono text-[#00FF66] tracking-widest uppercase mb-3">
            <span>NEURAL MATRIX MODULES</span>
          </div>
          <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-wide uppercase mb-4">
            RE-ENGINEERED <span className="text-[#00FF66] matrix-text-glow">CODE LEARNING</span>
          </h2>
          <p className="font-mono text-zinc-300 text-sm sm:text-base leading-relaxed text-balance">
            Four specialized AI engines designed to dismantle coding friction, turn dry syntax into captivating narratives, and unlock effortless mastery.
          </p>
        </div>

        {/* 4 Premium Glowing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {FEATURES_DATA.map((feature, idx) => (
            <div
              key={feature.id}
              className="group relative rounded-lg border border-[#00FF66]/30 bg-[#020a04]/90 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-[#00FF66] hover:shadow-[0_0_30px_rgba(0,255,102,0.25)] flex flex-col justify-between"
            >
              {/* Corner tech accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00FF66] opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00FF66] opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00FF66] opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00FF66] opacity-60 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Header row: Icon + Index */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded border border-[#00FF66]/40 bg-black/70 flex items-center justify-center shadow-[0_0_12px_rgba(0,255,102,0.2)] group-hover:shadow-[0_0_20px_#00FF66] group-hover:scale-105 transition-all">
                    {getFeatureIcon(feature.iconName)}
                  </div>
                  <span className="font-orbitron text-xs font-bold text-[#00FF66]/60 tracking-widest">
                    MODULE 0{idx + 1}
                  </span>
                </div>

                {/* Title & Tagline */}
                <div className="mb-3">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#00FF66]">
                    {feature.tagline}
                  </span>
                  <h3 className="font-orbitron text-xl sm:text-2xl font-bold text-white group-hover:text-[#00FF66] transition-colors mt-1">
                    {feature.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="font-mono text-zinc-300 text-sm leading-relaxed mb-6">
                  {feature.description}
                </p>

                {/* Code Preview Box */}
                <div className="mb-6 rounded bg-black/80 border border-[#00FF66]/20 p-3 text-xs font-mono text-zinc-300 overflow-x-auto shadow-inner">
                  <pre className="text-[#a1eab0] whitespace-pre-wrap font-mono text-[11px] sm:text-xs">
                    {feature.previewSnippet}
                  </pre>
                </div>
              </div>

              {/* Action Button to launch interactive test */}
              <button
                type="button"
                onClick={() => {
                  soundFx.playKeyClick();
                  setSelectedFeature(feature);
                }}
                className="w-full py-2.5 px-4 rounded border border-[#00FF66]/50 bg-black/60 hover:bg-[#00FF66] hover:text-black text-[#00FF66] font-mono text-xs font-bold uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2 group/btn shadow-[0_0_10px_rgba(0,255,102,0.1)] hover:shadow-[0_0_20px_rgba(0,255,102,0.5)]"
              >
                <span>OPEN LIVE DEMO</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Interactive Demo Modal */}
      {selectedFeature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg border border-[#00FF66] bg-[#020b04] p-6 sm:p-8 shadow-[0_0_50px_rgba(0,255,102,0.35)]">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#00FF66]/30 pb-4 mb-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00FF66] uppercase tracking-wider mb-1">
                  <span>LIVE MATRIX DEMONSTRATION</span>
                  <span>·</span>
                  <span>{selectedFeature.tagline}</span>
                </div>
                <h3 className="font-orbitron text-2xl font-bold text-white matrix-text-glow-subtle">
                  {selectedFeature.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  soundFx.playKeyClick();
                  setSelectedFeature(null);
                }}
                className="p-1.5 rounded border border-[#00FF66]/40 text-[#00FF66] hover:bg-[#00FF66]/20 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content depending on feature */}
            <div className="space-y-6">
              <p className="font-mono text-sm text-zinc-300">
                {selectedFeature.interactiveDemo.description}
              </p>

              {/* 1. Comic Explainer Demo */}
              {selectedFeature.interactiveDemo.panels && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedFeature.interactiveDemo.panels.map((panel, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-4 rounded border border-[#00FF66]/40 bg-black/70 flex flex-col justify-between"
                    >
                      <div>
                        <div className="text-[10px] font-mono text-[#00FF66] tracking-widest mb-2 font-bold">
                          {panel.caption}
                        </div>
                        <div className="text-3xl mb-2">{panel.visualEmoji}</div>
                        <div className="text-xs font-bold text-white mb-1">{panel.role}</div>
                        <p className="text-xs font-mono text-zinc-300 italic leading-relaxed">
                          {panel.dialogue}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 2. AI Code Explainer Demo */}
              {selectedFeature.interactiveDemo.breakdown && (
                <div className="space-y-3">
                  {selectedFeature.interactiveDemo.breakdown.map((item) => (
                    <div
                      key={item.line}
                      className="p-3 rounded border border-[#00FF66]/30 bg-black/70 font-mono text-xs space-y-1.5"
                    >
                      <div className="flex items-center gap-2 text-[#00FF66] font-bold">
                        <span className="w-5 h-5 rounded-full bg-[#00FF66]/20 flex items-center justify-center text-[10px]">
                          {item.line}
                        </span>
                        <code className="text-white font-mono bg-black/80 px-2 py-0.5 rounded border border-[#00FF66]/20">
                          {item.code}
                        </code>
                      </div>
                      <p className="text-zinc-300 pl-7">{item.explanation}</p>
                      <div className="text-[11px] text-[#7cefa0] pl-7 italic">
                        💡 Real-world Analogy: {item.analogy}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 3. Smart Error Solver Demo */}
              {selectedFeature.interactiveDemo.errorCase && (
                <div className="space-y-4">
                  <div className="p-3.5 rounded bg-red-950/40 border border-red-500/40 text-xs font-mono">
                    <div className="flex items-center gap-2 text-red-400 font-bold mb-1">
                      <Bug className="w-4 h-4" />
                      <span>DETECTED ERROR:</span>
                    </div>
                    <code className="text-red-300">
                      {selectedFeature.interactiveDemo.errorCase.errorPrompt}
                    </code>
                    <p className="text-zinc-300 mt-2 text-[11px]">
                      <strong>Root Cause:</strong> {selectedFeature.interactiveDemo.errorCase.rootCause}
                    </p>
                  </div>

                  <div className="p-3.5 rounded bg-[#031508] border border-[#00FF66]/40 text-xs font-mono">
                    <div className="flex items-center gap-2 text-[#00FF66] font-bold mb-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>STEP-BY-STEP RECTIFICATION:</span>
                    </div>
                    <ul className="list-disc pl-5 space-y-1 text-zinc-300 text-xs mb-3">
                      {selectedFeature.interactiveDemo.errorCase.steps.map((st, i) => (
                        <li key={i}>{st}</li>
                      ))}
                    </ul>
                    <div className="p-2.5 rounded bg-black/90 border border-[#00FF66]/30 text-[#88f5a3]">
                      <pre className="text-[11px] whitespace-pre-wrap">
                        {selectedFeature.interactiveDemo.errorCase.fixedCode}
                      </pre>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. Logic Builder Demo */}
              {selectedFeature.interactiveDemo.logicSteps && (
                <div className="space-y-3">
                  {selectedFeature.interactiveDemo.logicSteps.map((step) => (
                    <div
                      key={step.step}
                      className="p-3.5 rounded border border-[#00FF66]/30 bg-black/70 font-mono text-xs"
                    >
                      <div className="flex items-center gap-2 text-[#00FF66] font-bold mb-1">
                        <span className="w-5 h-5 rounded bg-[#00FF66] text-black font-extrabold flex items-center justify-center text-[10px]">
                          {step.step}
                        </span>
                        <span className="text-white text-sm">{step.title}</span>
                      </div>
                      <p className="text-zinc-300 pl-7 mb-2">{step.thoughtProcess}</p>
                      <div className="pl-7">
                        <code className="text-[#a5f8b9] bg-black px-2 py-1 rounded border border-[#00FF66]/20 block text-[11px]">
                          {step.template}
                        </code>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="mt-6 pt-4 border-t border-[#00FF66]/20 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  soundFx.playKeyClick();
                  setSelectedFeature(null);
                }}
                className="px-5 py-2 text-xs font-mono font-bold uppercase tracking-wider text-black bg-[#00FF66] hover:bg-[#39FF14] rounded-sm transition-all"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
