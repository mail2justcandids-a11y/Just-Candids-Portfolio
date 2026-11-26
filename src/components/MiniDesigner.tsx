import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PenTool, Sparkles, Layers, Coffee, Check, Zap, Move } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface MiniDesignerProps {
  isTriggered: boolean;
  onGlow: () => void;
}

export const MiniDesigner: React.FC<MiniDesignerProps> = ({ isTriggered, onGlow }) => {
  const [animStage, setAnimStage] = useState<'idle' | 'sketching' | 'burst' | 'celebrate'>('idle');
  const [speech, setSpeech] = useState<string>('Refining Bézier curves...');
  const [coffeeSteam, setCoffeeSteam] = useState(false);

  // Periodic idle chatter & designer habits
  useEffect(() => {
    if (animStage !== 'idle') return;

    const phrases = [
      'Refining Bézier curves...',
      'Kerning typography -0.04em...',
      'Balancing CMYK gamut...',
      'Testing 300 DPI vectors...',
      'Sipping iced brew... ☕',
    ];

    const interval = setInterval(() => {
      const p = phrases[Math.floor(Math.random() * phrases.length)];
      setSpeech(p);
      setCoffeeSteam((s) => !s);
    }, 4500);

    return () => clearInterval(interval);
  }, [animStage]);

  // Sync external glow trigger (from Hero button)
  useEffect(() => {
    if (isTriggered && animStage === 'idle') {
      runDesignerAction();
    }
  }, [isTriggered]);

  const runDesignerAction = () => {
    setAnimStage('sketching');
    setSpeech('Rapid Sketching! ✍️');
    soundEngine.playLensMotorWhir();

    setTimeout(() => {
      setAnimStage('burst');
      setSpeech('VECTOR GLOW ACTIVE! ✨');
      soundEngine.playVectorPenSnap();
    }, 700);

    setTimeout(() => {
      setAnimStage('celebrate');
      setSpeech('Pixel Perfection! ✦');
    }, 1800);

    setTimeout(() => {
      setAnimStage('idle');
      setSpeech('Ready for next vector!');
    }, 4200);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (animStage === 'idle') {
      onGlow();
      runDesignerAction();
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group relative cursor-pointer select-none flex flex-col items-center filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)]"
      title="Click our miniature digital artist to sketch vector magic!"
    >
      {/* 1. Dynamic Speech & Status Bubble */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute -top-14 left-1/2 -translate-x-1/2 z-40 whitespace-nowrap"
      >
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0c0d1c]/95 border border-purple-500/60 shadow-2xl backdrop-blur-xl text-[10px] sm:text-[11px] font-mono text-purple-200">
          <span
            className={`w-2 h-2 rounded-full shrink-0 ${
              animStage === 'burst'
                ? 'bg-fuchsia-400 shadow-[0_0_12px_#e879f9] animate-ping'
                : animStage === 'sketching'
                ? 'bg-cyan-400 shadow-[0_0_10px_#22d3ee] animate-pulse'
                : 'bg-purple-400'
            }`}
          />
          <span className="font-semibold text-white tracking-tight">{speech}</span>
        </div>
        <div className="w-2.5 h-2.5 bg-[#0c0d1c] border-r border-b border-purple-500/60 rotate-45 mx-auto -mt-1.5" />
      </motion.div>

      {/* 2. Floating Vector Glyphs & Shapes Burst (When Active) */}
      <AnimatePresence>
        {(animStage === 'burst' || animStage === 'celebrate') && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: -85 }}
            exit={{ opacity: 0, scale: 0.7, y: -120 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            className="absolute -top-24 -left-10 z-50 pointer-events-none flex items-center gap-2"
          >
            {/* Holographic Vector Artboard Stamp */}
            <div className="p-2 bg-[#0c0e24]/95 border-2 border-purple-400/80 rounded-xl shadow-2xl backdrop-blur-md flex flex-col items-center">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono font-bold text-fuchsia-300">✦ VECTOR 300 DPI</span>
                <span className="text-[8px] font-mono px-1 rounded bg-purple-900/60 text-purple-200">OK</span>
              </div>
              <div className="w-24 h-12 rounded bg-gradient-to-r from-purple-900/50 via-cyan-900/50 to-pink-900/50 border border-purple-500/30 flex items-center justify-center relative overflow-hidden">
                <span className="text-lg font-bold font-hero-italic bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                  Aa & ✦
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Miniature Digital Artist SVG Character & Drafting Desk */}
      <motion.div
        animate={
          animStage === 'sketching'
            ? { y: [-2, 2, -2], rotate: [-1, 1, -1] }
            : animStage === 'burst'
            ? { scale: [1, 1.08, 1], y: -8 }
            : animStage === 'celebrate'
            ? { y: [-3, 0, -3], rotate: [0, 2, 0] }
            : { y: [0, -3, 0] }
        }
        transition={
          animStage === 'sketching'
            ? { duration: 0.25, repeat: Infinity }
            : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
        }
        className="w-32 sm:w-36 md:w-40 h-auto transition-transform group-hover:scale-105 relative z-20"
      >
        <svg
          viewBox="0 0 220 250"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="hoodieGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4c1d95" />
              <stop offset="50%" stopColor="#2e1065" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="tabletScreen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="40%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            <linearGradient id="designerSkin" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#c2410c" />
            </linearGradient>
            <linearGradient id="deskGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>

          {/* Drafting Table Legs & Base Frame */}
          <g opacity="0.9">
            <line x1="75" y1="165" x2="60" y2="225" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
            <line x1="145" y1="165" x2="160" y2="225" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
            <line x1="60" y1="205" x2="160" y2="205" stroke="#334155" strokeWidth="3" />
            {/* Rubber Feet */}
            <circle cx="60" cy="225" r="4" fill="#a855f7" />
            <circle cx="160" cy="225" r="4" fill="#a855f7" />
          </g>

          {/* Designer Lower Body / Ergonomic Stool */}
          <rect x="90" y="145" width="40" height="30" rx="6" fill="#1e293b" />
          <path d="M92 175 L86 215 L98 215 L102 175 Z" fill="#0f172a" />
          <path d="M128 175 L134 215 L122 215 L118 175 Z" fill="#0f172a" />

          {/* Designer Torso (Oversized Cyber-Hoodie) */}
          <rect x="82" y="85" width="56" height="65" rx="14" fill="url(#hoodieGrad)" stroke="#7c3aed" strokeWidth="2" />
          {/* Graphic typography print on hoodie */}
          <text x="96" y="120" fill="#c084fc" fontSize="9" fontFamily="monospace" fontWeight="bold">
            DESIGN
          </text>
          <text x="100" y="130" fill="#a855f7" fontSize="7" fontFamily="monospace">
            VECTOR
          </text>

          {/* Designer Head with Glasses & Hair */}
          <g>
            <rect x="102" y="74" width="16" height="14" rx="3" fill="url(#designerSkin)" />
            <circle cx="110" cy="62" r="20" fill="url(#designerSkin)" />

            {/* Stylish Streetwear Beanie */}
            <path d="M88 56 C88 40 132 40 132 56 L134 60 C134 62 130 63 126 63 L94 63 C90 63 86 62 86 60 Z" fill="#2563eb" />
            <circle cx="110" cy="40" r="3" fill="#38bdf8" />

            {/* Ears */}
            <circle cx="91" cy="62" r="4" fill="#c2410c" />

            {/* Glowing AR Designer Glasses */}
            <g>
              {/* Left Lens */}
              <rect x="96" y="56" width="12" height="10" rx="2" fill="#06b6d4" fillOpacity="0.4" stroke="#38bdf8" strokeWidth="1.5" />
              {/* Bridge */}
              <line x1="108" y1="61" x2="114" y2="61" stroke="#38bdf8" strokeWidth="1.5" />
              {/* Right Lens */}
              <rect x="114" y="56" width="12" height="10" rx="2" fill="#06b6d4" fillOpacity="0.4" stroke="#38bdf8" strokeWidth="1.5" />
              {/* Glow reflection */}
              <line x1="98" y1="58" x2="102" y2="58" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
              <line x1="116" y1="58" x2="120" y2="58" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
            </g>

            {/* Smile / Concentrated Expression */}
            <path
              d={animStage === 'celebrate' ? 'M 114 70 Q 120 76 126 70' : 'M 115 70 L 124 70'}
              stroke="#451a03"
              strokeWidth="2"
              strokeLinecap="round"
              fill={animStage === 'celebrate' ? '#ffffff' : 'none'}
            />
          </g>

          {/* Angled Drafting Desk Surface & Wacom Cintiq Tablet */}
          <g>
            {/* Tabletop Surface with Metallic Bevel */}
            <polygon points="50,155 170,155 180,170 40,170" fill="url(#deskGrad)" stroke="#475569" strokeWidth="1.5" />

            {/* Wacom Cintiq / iPad Pro Screen tilted at 20 degrees */}
            <g>
              {/* Tablet chassis */}
              <rect x="85" y="132" width="65" height="34" rx="4" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" transform="rotate(-6 85 132)" />
              {/* Glowing active screen with live vector curve */}
              <rect x="88" y="134" width="59" height="28" rx="2" fill="#090a16" transform="rotate(-6 88 134)" />
              <path
                d="M 94 150 Q 115 136 140 148"
                stroke="url(#tabletScreen)"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                transform="rotate(-6 88 134)"
              />
              <circle cx="115" cy="142" r="2.5" fill="#ffffff" transform="rotate(-6 88 134)" />
            </g>

            {/* Coffee Mug on Desk */}
            <g>
              <rect x="52" y="148" width="12" height="14" rx="2" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
              {/* Mug handle */}
              <path d="M 52 152 Q 46 155 52 158" stroke="#94a3b8" strokeWidth="1.5" fill="none" />
              <rect x="54" y="150" width="8" height="2" fill="#78350f" />
              {/* Steam */}
              <motion.path
                d="M 56 145 Q 58 140 56 135"
                stroke="#ffffff"
                strokeWidth="1"
                opacity="0.6"
                fill="none"
                animate={{ y: [-1, -4, -1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </g>
          </g>

          {/* Designer Arms & Stylus Pen */}
          <g>
            {/* Left Hand Resting / Supporting Canvas */}
            <path d="M 86 112 Q 78 130 92 144" stroke="url(#hoodieGrad)" strokeWidth="7" strokeLinecap="round" fill="none" />
            <circle cx="94" cy="144" r="4.5" fill="url(#designerSkin)" />

            {/* Right Arm & Stylus in Hand */}
            {animStage === 'celebrate' ? (
              // Peace sign / holding stylus high
              <g>
                <path d="M 134 112 Q 150 100 152 82" stroke="url(#hoodieGrad)" strokeWidth="7" strokeLinecap="round" fill="none" />
                <circle cx="152" cy="80" r="5" fill="url(#designerSkin)" />
                {/* Stylus twirl */}
                <line x1="144" y1="74" x2="160" y2="86" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="144" cy="74" r="2" fill="#c084fc" className="animate-ping" />
              </g>
            ) : (
              // Drawing posture on tablet
              <g>
                <path d="M 134 112 Q 146 130 128 142" stroke="url(#hoodieGrad)" strokeWidth="7" strokeLinecap="round" fill="none" />
                {/* Two-finger digital drawing glove */}
                <circle cx="126" cy="143" r="5" fill="#0f172a" stroke="#a855f7" strokeWidth="1" />
                {/* Apple Pencil / Stylus */}
                <line x1="122" y1="140" x2="114" y2="146" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
                {/* Stylus glowing neon tip */}
                <circle cx="114" cy="146" r="2.5" fill="#ec4899" className="animate-ping" />
              </g>
            )}
          </g>
        </svg>
      </motion.div>

      {/* 4. HEAVY-DUTY ROAD CASE RISER DECK (Grounds the Designer Station) */}
      <div className="relative w-64 sm:w-72 mt-1 z-20 flex flex-col items-center">
        <div className="relative w-full rounded-2xl bg-gradient-to-b from-[#18192d] via-[#101120] to-[#070810] border-2 border-purple-500/40 p-2.5 shadow-[0_20px_40px_rgba(0,0,0,0.95)] overflow-hidden">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-slate-300 rounded-tl-lg pointer-events-none" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-slate-300 rounded-tr-lg pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-slate-300 rounded-bl-lg pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-slate-300 rounded-br-lg pointer-events-none" />

          <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-purple-500/25">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
              <span className="text-[9.5px] font-mono font-bold text-slate-200 tracking-tight">
                STUDIO GRAPHIC LAB
              </span>
            </div>
            <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-purple-950/80 border border-purple-500/40 text-purple-300">
              VECTOR #02
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 px-1 text-[8.5px] font-mono text-slate-400">
            <div className="flex items-center gap-1 bg-black/50 px-2 py-1 rounded-lg border border-white/10">
              <span className="text-[9px] text-fuchsia-400">✦</span>
              <span className="text-slate-300 text-[8px]">300 DPI</span>
            </div>

            <div className="flex items-center gap-1 bg-purple-950/50 px-2 py-1 rounded-lg border border-purple-500/30">
              <Zap className="w-3 h-3 text-cyan-400 shrink-0" />
              <span className="text-purple-200 text-[8px] font-bold">CMYK OK</span>
            </div>

            <div className="flex items-center gap-1 bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-lg border border-purple-400/50 text-white font-semibold transition-all">
              <PenTool className="w-3 h-3 text-fuchsia-300" />
              <span className="text-[8.5px]">SKETCH</span>
            </div>
          </div>
        </div>

        {/* Telescopic Chrome Hydraulic Columns */}
        <div className="relative w-full h-12 flex justify-between items-start px-6 -mt-0.5 pointer-events-none">
          <div className="flex flex-col items-center">
            <div className="w-4 h-8 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-500 rounded-b shadow-md border border-slate-600" />
            <div className="w-8 h-2.5 bg-[#0a0b14] rounded-full border border-purple-500/40 -mt-1 shadow-lg" />
          </div>

          {/* Coiled Studio Data Cables (Cyan + Purple) */}
          <svg viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-24 h-10 overflow-visible">
            <path d="M 15 0 C 10 25, 45 15, 50 35 C 55 45, 80 25, 95 40" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.9" />
            <path d="M 25 0 C 35 30, 20 20, 65 30 C 75 35, 85 38, 90 40" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8" />
          </svg>

          <div className="flex flex-col items-center">
            <div className="w-4 h-8 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-500 rounded-b shadow-md border border-slate-600" />
            <div className="w-8 h-2.5 bg-[#0a0b14] rounded-full border border-purple-500/40 -mt-1 shadow-lg" />
          </div>
        </div>

        {/* Floor Contact Shadow */}
        <div className="w-60 sm:w-68 h-4 rounded-[100%] bg-black/90 blur-[6px] -mt-5 pointer-events-none" />
      </div>
    </div>
  );
};
