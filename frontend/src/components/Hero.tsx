import React, { useState, useEffect } from 'react';
import { Terminal, Shield, ArrowRight, Sparkles, CheckCircle2, Play, RefreshCw } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface HeroProps {
  onOpenSystem: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenSystem }) => {
  const [activeTab, setActiveTab] = useState<'sys' | 'stream' | 'comic'>('sys');
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'FUN CODE NEURAL CORE: Initializing subsystem modules...',
    'VIRTUAL ENVIRONMENT: Black & Neon Matrix protocol established.',
    'SYNTAX PARSER: 10 programming languages loaded successfully.',
    'LOGIC STORYTELLER: Ready to synthesize code into narrative comics.',
    'AI ERROR SOLVER: Diagnostic heuristics calibrated at 99.8% precision.',
    'STATUS: 🟢 AI ENGINE ONLINE // READY FOR HUMAN TRANSMISSION',
  ]);

  // Terminal simulated live stream ticker
  const [streamTicks, setStreamTicks] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStreamTicks((prev) => prev + 1);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    soundFx.playKeyClick();
    const cmd = terminalInput.trim().toLowerCase();
    let response = '';

    if (cmd === 'help') {
      response = 'AVAILABLE COMMANDS: status, explain, comic, languages, clear, matrix';
    } else if (cmd === 'status') {
      response = 'SYSTEM STATUS: 100% OPERATIONAL // AI ENGINES: DUAL NEURAL MATRIX ONLINE';
    } else if (cmd === 'explain') {
      response = 'AI EXPLAINER: Ready. Select any code block or navigate to #how-it-works.';
    } else if (cmd === 'comic') {
      response = 'COMIC ENGINE: Converting function call stacks into 4-panel illustrated comic!';
    } else if (cmd === 'languages') {
      response = 'SUPPORTED: Python, Java, C, C++, JavaScript, HTML, CSS, PHP, SQL, C#';
    } else if (cmd === 'clear') {
      setTerminalLogs([]);
      setTerminalInput('');
      return;
    } else if (cmd === 'matrix') {
      response = 'Wake up, Neo... The Matrix has you. Follow the green code.';
    } else {
      response = `Command recognized: "${cmd}". Neural parser initialized for this routine.`;
    }

    setTerminalLogs((prev) => [...prev, `> ${terminalInput}`, response]);
    setTerminalInput('');
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Top Kicker */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-[#00FF66]/40 bg-black/60 backdrop-blur-sm text-xs font-mono text-[#00FF66] tracking-wider uppercase shadow-[0_0_12px_rgba(0,255,102,0.2)]">
            <span className="w-2 h-2 rounded-full bg-[#00FF66] shadow-[0_0_8px_#00FF66] animate-ping" />
            <span>AI ENGINE ONLINE</span>
            <span className="text-[#00FF66]/40">·</span>
            <span className="text-[#a8f8b8]">MATRIX V4.0 PROTOCOL</span>
          </div>
        </div>

        {/* Brand & Headline */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          {/* Glowing Futuristic Logo */}
          <div className="mb-4 inline-block">
            <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-black tracking-widest text-[#00FF66] matrix-text-glow uppercase hover-glitch cursor-default select-none">
              FUN CODE
            </h2>
          </div>

          {/* Primary Headline */}
          <h1 className="font-orbitron text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 uppercase leading-tight">
            ENTER THE WORLD <span className="text-[#00FF66] matrix-text-glow">OF CODE.</span>
          </h1>

          {/* Subtitle */}
          <p className="font-mono text-lg sm:text-xl md:text-2xl font-semibold text-[#a8f8b8] tracking-wide mb-4 text-balance">
            Don&apos;t just write code. Understand it. Debug it. Master it.
          </p>

          {/* Description */}
          <p className="font-mono text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed text-balance">
            Your AI-powered coding companion that transforms complex programming into simple stories,
            explains logic and solves coding errors.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => {
                soundFx.playSuccess();
                onOpenSystem();
              }}
              className="group relative px-8 py-3.5 text-sm font-mono font-bold tracking-widest uppercase text-black bg-[#00FF66] hover:bg-[#39FF14] rounded-sm transition-all duration-200 shadow-[0_0_20px_rgba(0,255,102,0.5)] hover:shadow-[0_0_35px_rgba(0,255,102,0.9)] hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>ENTER THE SYSTEM</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <a
              href="#features"
              onClick={() => soundFx.playKeyClick()}
              className="px-8 py-3.5 text-sm font-mono font-semibold tracking-widest uppercase text-[#00FF66] hover:text-white border border-[#00FF66]/50 hover:border-[#00FF66] bg-black/60 hover:bg-[#00FF66]/10 rounded-sm transition-all duration-200 backdrop-blur-sm shadow-[0_0_10px_rgba(0,255,102,0.1)] hover:shadow-[0_0_20px_rgba(0,255,102,0.3)]"
            >
              EXPLORE FEATURES
            </a>
          </div>
        </div>

        {/* Futuristic Animated Terminal */}
        <div className="max-w-4xl mx-auto">
          <div className="rounded-lg border border-[#00FF66]/40 bg-black/85 backdrop-blur-md shadow-[0_0_35px_rgba(0,255,102,0.15)] overflow-hidden">
            {/* Terminal Top Window Bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#00FF66]/20 bg-[#031407]/90 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 border border-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-[#00FF66] border border-[#39FF14] shadow-[0_0_6px_#00FF66]" />
                <span className="ml-2 text-zinc-400 tracking-wider hidden sm:inline">
                  funcode-terminal://neural-stream.v4
                </span>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1 bg-black/60 p-1 rounded border border-[#00FF66]/20">
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playKeyClick();
                    setActiveTab('sys');
                  }}
                  className={`px-2.5 py-1 text-[11px] rounded transition-colors ${
                    activeTab === 'sys'
                      ? 'bg-[#00FF66]/20 text-[#00FF66] font-bold border border-[#00FF66]/40 shadow-[0_0_8px_rgba(0,255,102,0.2)]'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  SYSTEM.log
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playKeyClick();
                    setActiveTab('stream');
                  }}
                  className={`px-2.5 py-1 text-[11px] rounded transition-colors ${
                    activeTab === 'stream'
                      ? 'bg-[#00FF66]/20 text-[#00FF66] font-bold border border-[#00FF66]/40 shadow-[0_0_8px_rgba(0,255,102,0.2)]'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  LOGIC_DIAGNOSTIC.py
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playKeyClick();
                    setActiveTab('comic');
                  }}
                  className={`px-2.5 py-1 text-[11px] rounded transition-colors ${
                    activeTab === 'comic'
                      ? 'bg-[#00FF66]/20 text-[#00FF66] font-bold border border-[#00FF66]/40 shadow-[0_0_8px_rgba(0,255,102,0.2)]'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  COMIC_STORY.ai
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-4 sm:p-6 text-xs sm:text-sm font-mono leading-relaxed h-80 overflow-y-auto">
              {activeTab === 'sys' && (
                <div className="space-y-2">
                  <div className="text-[#00FF66] font-bold matrix-text-glow-subtle flex items-center justify-between border-b border-[#00FF66]/20 pb-2">
                    <span>================================================================</span>
                    <span className="text-[10px] text-zinc-400">INIT: 2026.11.05</span>
                  </div>
                  <div className="text-zinc-400 text-xs">
                    [KERNEL] Initializing FUN CODE AI Runtime Architecture...
                  </div>

                  {terminalLogs.map((log, index) => (
                    <div
                      key={index}
                      className={
                        log.startsWith('>')
                          ? 'text-white font-bold'
                          : log.includes('🟢')
                          ? 'text-[#00FF66] font-bold matrix-text-glow-subtle'
                          : log.includes('PARSER') || log.includes('AI')
                          ? 'text-[#85f5a0]'
                          : 'text-[#5cd67c]'
                      }
                    >
                      {log}
                    </div>
                  ))}

                  <div className="pt-3 border-t border-[#00FF66]/15 flex items-center gap-2 text-zinc-400 text-xs">
                    <span className="text-[#00FF66] font-bold">&gt;</span>
                    <form onSubmit={handleCommandSubmit} className="flex-1 flex items-center">
                      <input
                        type="text"
                        value={terminalInput}
                        onChange={(e) => setTerminalInput(e.target.value)}
                        placeholder="Type 'help', 'status', 'comic', or 'languages'..."
                        className="w-full bg-transparent text-[#00FF66] focus:outline-none placeholder-zinc-600 font-mono"
                      />
                      <button
                        type="submit"
                        className="ml-2 text-[10px] text-[#00FF66] border border-[#00FF66]/40 px-2 py-0.5 rounded hover:bg-[#00FF66]/20"
                      >
                        RUN
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {activeTab === 'stream' && (
                <div className="space-y-3">
                  <div className="text-xs text-zinc-400">
                    # Real-time code execution with automated line-by-line breakdown
                  </div>
                  <div className="p-3 rounded bg-black/60 border border-[#00FF66]/20 text-[#85f5a0]">
                    <div className="text-zinc-500">// 1. Raw code input</div>
                    <div className="text-zinc-200">def calculate_matrix_pulse(depth=4):</div>
                    <div className="text-zinc-200 pl-4">if depth &lt;= 0: return 1</div>
                    <div className="text-[#00FF66] pl-4 font-semibold">
                      return depth * calculate_matrix_pulse(depth - 1)
                    </div>
                  </div>

                  <div className="p-3 rounded bg-[#031407] border border-[#00FF66]/30">
                    <div className="flex items-center gap-2 text-[#00FF66] font-semibold mb-1 text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>FUN CODE AI LOGIC INSIGHT:</span>
                    </div>
                    <p className="text-zinc-300 text-xs">
                      &quot;This recursive factorial multiplies each layer down to base depth 0.
                      Depth 4 cascades through 4 * 3 * 2 * 1 = 24. No memory leak detected.&quot;
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'comic' && (
                <div className="space-y-3">
                  <div className="text-xs text-[#00FF66] font-semibold">
                    🎬 STORY ENGINE: &quot;The Tale of the Unhandled Exception&quot;
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="p-2.5 rounded bg-black/70 border border-[#00FF66]/30">
                      <div className="text-[10px] text-zinc-400">ACT 1: THE INCOMING PACKET</div>
                      <div className="text-2xl my-1">📦 ➡️ ⚡</div>
                      <p className="text-zinc-300 text-xs">
                        A courier packet knocks on the server door carrying user login data.
                      </p>
                    </div>
                    <div className="p-2.5 rounded bg-black/70 border border-[#00FF66]/30">
                      <div className="text-[10px] text-zinc-400">ACT 2: THE MISSING PASSWORD</div>
                      <div className="text-2xl my-1">🔍 ❌ 💥</div>
                      <p className="text-zinc-300 text-xs">
                        The gatekeeper reaches into the box, but password is `undefined`! Alarm rings!
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-zinc-400">
                    💡 Moral: Always validate input keys before reading properties!
                  </div>
                </div>
              )}
            </div>

            {/* Terminal Footer Bar */}
            <div className="px-4 py-2 bg-black/95 border-t border-[#00FF66]/20 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-zinc-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-[#00FF66]">
                  <span className="w-2 h-2 rounded-full bg-[#00FF66] shadow-[0_0_6px_#00FF66]" />
                  ENGINE: ACTIVE
                </span>
                <span>LATENCY: 14ms</span>
                <span>MEMORY: 128MB / OK</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  soundFx.playKeyClick();
                  setTerminalLogs((prev) => [
                    ...prev,
                    `[TEST] Ping sent at ${new Date().toLocaleTimeString()} - Response 200 OK`,
                  ]);
                }}
                className="text-[#00FF66] hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>PING NEURAL MATRIX</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
