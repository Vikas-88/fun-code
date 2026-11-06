import React, { useState } from 'react';
import { Upload, Cpu, BookOpen, ArrowRight, CheckCircle2, Play, RefreshCw, Sparkles, Terminal } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface SampleCode {
  title: string;
  lang: string;
  code: string;
  analysis: string;
  comicSummary: string;
  explanation: string;
  errorSolution: string;
}

const SAMPLE_CODES: SampleCode[] = [
  {
    title: 'Python: Recursive Fibonacci Bug',
    lang: 'python',
    code: `def fibonacci(n):\n    # Missing base case for 0\n    if n == 1:\n        return 1\n    return fibonacci(n - 1) + fibonacci(n - 2)\n\nprint(fibonacci(4))`,
    analysis: 'Recursion Depth: 4 layers. Base case incomplete. When n drops to 0, it calls fibonacci(-1), causing infinite stack overflow.',
    comicSummary: '🧙‍♂️ "The Sorcerer’s Mirror": A wizard commands his reflection to calculate a spell, but forgotten zeroes cause millions of mirrors to shatter the castle tower.',
    explanation: 'Lines 1-4 execute a recursive tree. Without `if n <= 0: return 0`, the function never stops decrementing negative numbers.',
    errorSolution: 'Add the guard clause: `if n <= 0: return 0` right before checking `if n == 1: return 1`.',
  },
  {
    title: 'JavaScript: Unhandled Async Fetch',
    lang: 'javascript',
    code: `function fetchMatrixStatus() {\n  const res = fetch('/api/matrix/pulse');\n  const data = res.json();\n  console.log(data.status);\n}`,
    analysis: 'Promise unresolved. `fetch()` returns a Promise object, not the raw response body. Calling `.json()` synchronously yields a second pending Promise.',
    comicSummary: '⚡ "The Impatient Mailman": A mail carrier opens a sealed envelope before the postal truck has even arrived at the depot, reading blank air.',
    explanation: 'JavaScript fetch operations run asynchronously on the event loop. Without `await` or `.then()`, the execution attempts to access properties that do not exist yet.',
    errorSolution: 'Mark function as `async` and add `await`: `const res = await fetch(...); const data = await res.json();`.',
  },
  {
    title: 'C++: Vector Out of Bounds',
    lang: 'cpp',
    code: `#include <vector>\n#include <iostream>\n\nint main() {\n    std::vector<int> matrix = {10, 20, 30};\n    std::cout << matrix[5] << std::endl;\n    return 0;\n}`,
    analysis: 'Undefined behavior / Segmentation fault risk. Vector contains 3 elements (indices 0..2). Accessing index 5 reads arbitrary memory.',
    comicSummary: '🚪 "Room Beyond the Wall": An explorer walks past room 2 and steps into the void where reality has not yet been coded, falling through cyberspace.',
    explanation: 'Vector operator `[]` does not perform bounds checking in release builds. Reading past vector boundaries can cause silent memory corruption.',
    errorSolution: 'Use `matrix.at(5)` for bounds-checked access which safely throws `std::out_of_range`, or verify `if (index < matrix.size())`.',
  },
];

export const HowItWorks: React.FC = () => {
  const [selectedSampleIndex, setSelectedSampleIndex] = useState(0);
  const [customCode, setCustomCode] = useState(SAMPLE_CODES[0].code);
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  const activeSample = SAMPLE_CODES[selectedSampleIndex];

  const handleSelectSample = (idx: number) => {
    soundFx.playKeyClick();
    setSelectedSampleIndex(idx);
    setCustomCode(SAMPLE_CODES[idx].code);
    setHasResult(false);
    setActiveStep(1);
  };

  const handleRunAnalysis = () => {
    soundFx.playKeyClick();
    setIsAnalyzing(true);
    setActiveStep(2);
    setHasResult(false);

    setTimeout(() => {
      setIsAnalyzing(false);
      setActiveStep(3);
      setHasResult(true);
      soundFx.playSuccess();
    }, 1200);
  };

  const steps = [
    {
      step: 1,
      title: 'Paste or upload code.',
      desc: 'Insert raw code snippets or upload files in any of the 10 supported programming languages.',
      icon: Upload,
    },
    {
      step: 2,
      title: 'AI analyzes code and logic.',
      desc: 'The neural engine scans AST syntax trees, detects anomalies, evaluates call stacks, and builds mental models.',
      icon: Cpu,
    },
    {
      step: 3,
      title: 'Understand through stories, explanations and error solutions.',
      desc: 'Receive multi-dimensional clarity: entertaining comic narrative, line-by-line breakdown, and precise bug fixes.',
      icon: BookOpen,
    },
  ];

  return (
    <section id="how-it-works" className="relative py-24 border-t border-[#00FF66]/20 bg-black/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-[#00FF66]/30 bg-black/60 text-xs font-mono text-[#00FF66] tracking-widest uppercase mb-3">
            <span>THE 3-STEP PIPELINE</span>
          </div>
          <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-wide uppercase mb-4">
            HOW <span className="text-[#00FF66] matrix-text-glow">IT WORKS</span>
          </h2>
          <p className="font-mono text-zinc-300 text-sm sm:text-base leading-relaxed text-balance">
            Effortless transformation from impenetrable code syntax into memorable stories and crystal-clear logic.
          </p>
        </div>

        {/* 3 Steps Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {steps.map((st) => {
            const Icon = st.icon;
            const isCurrent = activeStep === st.step;
            return (
              <div
                key={st.step}
                className={`relative p-6 sm:p-8 rounded-lg border transition-all duration-300 ${
                  isCurrent
                    ? 'border-[#00FF66] bg-[#021808]/90 shadow-[0_0_25px_rgba(0,255,102,0.25)]'
                    : 'border-[#00FF66]/20 bg-black/60 hover:border-[#00FF66]/40'
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded border border-[#00FF66]/40 bg-black/80 flex items-center justify-center text-[#00FF66] shadow-[0_0_10px_rgba(0,255,102,0.2)]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-orbitron text-2xl font-black text-[#00FF66]">
                    0{st.step}
                  </span>
                </div>
                <h3 className="font-orbitron text-lg font-bold text-white mb-2">
                  {st.title}
                </h3>
                <p className="font-mono text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Interactive Live Workbench */}
        <div className="rounded-lg border border-[#00FF66]/40 bg-[#020b04]/95 backdrop-blur-md p-6 sm:p-8 shadow-[0_0_35px_rgba(0,255,102,0.2)]">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#00FF66]/20 pb-4 mb-6">
            <div>
              <div className="text-xs font-mono text-[#00FF66] tracking-widest uppercase mb-1">
                INTERACTIVE PIPELINE SIMULATOR
              </div>
              <h3 className="font-orbitron text-xl font-bold text-white">
                Test the Transformation Engine
              </h3>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-zinc-400">Load Preset:</span>
              {SAMPLE_CODES.map((s, idx) => (
                <button
                  key={s.title}
                  type="button"
                  onClick={() => handleSelectSample(idx)}
                  className={`px-3 py-1 text-xs font-mono rounded transition-colors ${
                    selectedSampleIndex === idx
                      ? 'bg-[#00FF66] text-black font-bold shadow-[0_0_8px_#00FF66]'
                      : 'bg-black/60 text-zinc-300 border border-[#00FF66]/30 hover:border-[#00FF66]'
                  }`}
                >
                  {s.lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Split View: Editor + Transformation Output */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Input Code */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>STEP 1: CODE INPUT ({activeSample.lang.toUpperCase()})</span>
                <span>Editable</span>
              </div>
              <textarea
                value={customCode}
                onChange={(e) => {
                  setCustomCode(e.target.value);
                  setHasResult(false);
                }}
                rows={10}
                className="w-full p-4 rounded bg-black/90 border border-[#00FF66]/30 text-[#85f5a0] font-mono text-xs sm:text-sm focus:outline-none focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66] leading-relaxed resize-none"
              />
              <button
                type="button"
                disabled={isAnalyzing}
                onClick={handleRunAnalysis}
                className="w-full py-3 text-xs sm:text-sm font-mono font-bold tracking-widest uppercase text-black bg-[#00FF66] hover:bg-[#39FF14] rounded-sm transition-all duration-200 shadow-[0_0_15px_rgba(0,255,102,0.4)] hover:shadow-[0_0_25px_rgba(0,255,102,0.8)] flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>AI ANALYZING LOGIC & SYNTAX...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-black" />
                    <span>ANALYZE CODE WITH FUN CODE</span>
                  </>
                )}
              </button>
            </div>

            {/* Right: Output / Results */}
            <div className="space-y-4">
              <div className="text-xs font-mono text-zinc-400">
                STEP 3: DECODED OUTPUT & STORIES
              </div>

              {isAnalyzing && (
                <div className="h-64 rounded bg-black/70 border border-[#00FF66]/30 flex flex-col items-center justify-center gap-3 text-[#00FF66] font-mono text-xs">
                  <Cpu className="w-8 h-8 animate-pulse text-[#00FF66]" />
                  <span className="tracking-widest">DISMANTLING AST SYNTAX TREE...</span>
                  <div className="w-48 h-1 bg-black rounded-full overflow-hidden border border-[#00FF66]/30">
                    <div className="h-full bg-[#00FF66] animate-pulse w-3/4" />
                  </div>
                </div>
              )}

              {!isAnalyzing && !hasResult && (
                <div className="h-64 rounded bg-black/50 border border-dashed border-[#00FF66]/30 flex flex-col items-center justify-center gap-2 p-6 text-center text-zinc-400 font-mono text-xs">
                  <Terminal className="w-8 h-8 text-[#00FF66]/50 mb-1" />
                  <p className="text-zinc-300 font-semibold">Ready for Transformation</p>
                  <p className="max-w-xs text-[11px] text-zinc-500">
                    Click &quot;Analyze Code With FUN CODE&quot; to trigger the story synthesizer, logic explainer, and error solver.
                  </p>
                </div>
              )}

              {!isAnalyzing && hasResult && (
                <div className="space-y-3 font-mono text-xs">
                  {/* Analysis Result */}
                  <div className="p-3.5 rounded bg-[#031508] border border-[#00FF66]/40 text-[#00FF66]">
                    <div className="font-bold flex items-center gap-2 mb-1 text-[11px]">
                      <Cpu className="w-3.5 h-3.5" />
                      <span>SYNTAX & LOGIC DIAGNOSTIC:</span>
                    </div>
                    <p className="text-zinc-200 text-xs leading-relaxed">
                      {activeSample.analysis}
                    </p>
                  </div>

                  {/* Comic Story */}
                  <div className="p-3.5 rounded bg-black/80 border border-[#00FF66]/30">
                    <div className="font-bold text-[#00FF66] flex items-center gap-2 mb-1 text-[11px]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>COMIC STORY NARRATIVE:</span>
                    </div>
                    <p className="text-zinc-200 text-xs italic leading-relaxed">
                      {activeSample.comicSummary}
                    </p>
                  </div>

                  {/* Line by line explanation */}
                  <div className="p-3.5 rounded bg-black/80 border border-[#00FF66]/30">
                    <div className="font-bold text-[#00FF66] flex items-center gap-2 mb-1 text-[11px]">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>LINE LOGIC BREAKDOWN:</span>
                    </div>
                    <p className="text-zinc-300 text-xs leading-relaxed">
                      {activeSample.explanation}
                    </p>
                  </div>

                  {/* Error Solution */}
                  <div className="p-3.5 rounded bg-black/90 border border-emerald-500/50">
                    <div className="font-bold text-emerald-400 flex items-center gap-2 mb-1 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>STEP-BY-STEP SOLUTION:</span>
                    </div>
                    <p className="text-white text-xs font-semibold">
                      {activeSample.errorSolution}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
