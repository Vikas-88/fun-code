import React, { useState } from 'react';
import { X, Terminal, CheckCircle2, Shield, ArrowRight, Sparkles, Copy, Check } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface EnterSystemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EnterSystemModal: React.FC<EnterSystemModalProps> = ({ isOpen, onClose }) => {
  const [handle, setHandle] = useState('');
  const [preferredLang, setPreferredLang] = useState('python');
  const [isGenerated, setIsGenerated] = useState(false);
  const [accessKey, setAccessKey] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleGenerateKey = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playKeyClick();

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const key = `FC-SYS-${preferredLang.toUpperCase()}-${randomSuffix}`;
    setAccessKey(key);
    setIsGenerated(true);
    soundFx.playSuccess();
  };

  const handleCopyKey = () => {
    soundFx.playKeyClick();
    navigator.clipboard.writeText(accessKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-lg border-2 border-[#00FF66] bg-[#020b04] p-6 sm:p-8 shadow-[0_0_50px_rgba(0,255,102,0.4)] text-left">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => {
            soundFx.playKeyClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 rounded border border-[#00FF66]/30 text-[#00FF66] hover:bg-[#00FF66]/20 transition-colors"
          aria-label="Close system window"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#00FF66] tracking-widest uppercase mb-2">
          <Terminal className="w-4 h-4" />
          <span>INITIALIZE SYSTEM ACCESS</span>
        </div>

        <h3 className="font-orbitron text-2xl font-black text-white mb-2 matrix-text-glow">
          ENTER FUN CODE
        </h3>

        <p className="font-mono text-xs sm:text-sm text-zinc-300 mb-6">
          Initialize your connection to the FUN CODE neural network. Access our comic storytelling engine, logic decoders, and diagnostic tools.
        </p>

        {!isGenerated ? (
          <form onSubmit={handleGenerateKey} className="space-y-4 font-mono text-xs">
            <div>
              <label className="block text-zinc-300 mb-1.5 uppercase tracking-wider text-[11px]">
                Developer Handle / Callsign:
              </label>
              <input
                type="text"
                required
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="e.g. NeoCoder_42"
                className="w-full px-3.5 py-2.5 rounded bg-black border border-[#00FF66]/40 text-[#00FF66] focus:outline-none focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66]"
              />
            </div>

            <div>
              <label className="block text-zinc-300 mb-1.5 uppercase tracking-wider text-[11px]">
                Primary Language of Focus:
              </label>
              <select
                value={preferredLang}
                onChange={(e) => setPreferredLang(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded bg-black border border-[#00FF66]/40 text-[#00FF66] focus:outline-none focus:border-[#00FF66]"
              >
                <option value="python">Python (AI & Scripting)</option>
                <option value="javascript">JavaScript / TypeScript (Web & Fullstack)</option>
                <option value="java">Java (Enterprise & Android)</option>
                <option value="cpp">C++ (High Performance & Systems)</option>
                <option value="c">C (Kernels & Low-Level)</option>
                <option value="csharp">C# (Games & .NET)</option>
                <option value="html">HTML (Markup & Semantics)</option>
                <option value="css">CSS (Styling & Animation)</option>
                <option value="php">PHP (Modern Backend)</option>
                <option value="sql">SQL (Relational Databases)</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 text-xs font-mono font-bold uppercase tracking-widest text-black bg-[#00FF66] hover:bg-[#39FF14] rounded-sm transition-all duration-200 shadow-[0_0_20px_rgba(0,255,102,0.5)] flex items-center justify-center gap-2"
              >
                <span>GENERATE ACCESS CREDENTIAL</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4 font-mono text-xs">
            <div className="p-4 rounded bg-[#031508] border border-[#00FF66] shadow-[0_0_15px_rgba(0,255,102,0.2)]">
              <div className="flex items-center gap-2 text-[#00FF66] font-bold mb-2 text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>ACCESS AUTHORIZATION GRANTED</span>
              </div>
              <p className="text-zinc-300 text-xs mb-3">
                Welcome, operative <strong className="text-white">{handle || 'Operative'}</strong>. Your FUN CODE gateway token is active for {preferredLang.toUpperCase()}.
              </p>
              <div className="p-3 bg-black rounded border border-[#00FF66]/40 flex items-center justify-between">
                <code className="text-[#00FF66] font-bold tracking-wider">{accessKey}</code>
                <button
                  type="button"
                  onClick={handleCopyKey}
                  className="px-2 py-1 text-[11px] rounded border border-[#00FF66]/40 text-[#00FF66] hover:bg-[#00FF66]/20 flex items-center gap-1"
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <div className="text-[11px] text-zinc-400">
              💡 Keep your access key ready. You can now use the interactive sandboxes on the page or explore our language modules!
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  soundFx.playKeyClick();
                  onClose();
                }}
                className="w-full py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-[#00FF66] hover:bg-[#39FF14] rounded-sm transition-all"
              >
                Enter Platform
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
