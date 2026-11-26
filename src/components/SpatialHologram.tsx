import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, PenTool, Layers, Compass, Zap, Move } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface SpatialHologramProps {
  isTriggered: boolean;
  onGlow: () => void;
}

export const SpatialHologram: React.FC<SpatialHologramProps> = ({ isTriggered, onGlow }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [spiralSpeed, setSpiralSpeed] = useState<number>(20);
  const [activeGlyph, setActiveGlyph] = useState<'Aa' | '✦' | '&' | '1.618'>('Aa');
  const [speech, setSpeech] = useState<string>('Spatial 3D Canvas Active');

  useEffect(() => {
    if (isTriggered) {
      triggerSpatialBurst();
    }
  }, [isTriggered]);

  const triggerSpatialBurst = () => {
    setIsActive(true);
    setSpiralSpeed(4);
    soundEngine.playVectorPenSnap();

    setTimeout(() => {
      setSpiralSpeed(20);
      setIsActive(false);
    }, 2400);
  };

  const handlePencilClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onGlow();
    triggerSpatialBurst();
  };

  const handleGlyphClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playDialClick();
    const glyphs: ('Aa' | '✦' | '&' | '1.618')[] = ['Aa', '✦', '&', '1.618'];
    const next = glyphs[(glyphs.indexOf(activeGlyph) + 1) % glyphs.length];
    setActiveGlyph(next);
  };

  return (
    <div
      onClick={handlePencilClick}
      className="group relative cursor-pointer select-none flex flex-col items-center filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.9)]"
      title="Click the spatial hologram to trigger 3D vector illumination!"
    >
      {/* 1. Spatial Telemetry Bubble (Normal layout flow - zero overlap) */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-40 mb-2 whitespace-nowrap"
      >
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#090b16]/95 border border-cyan-500/50 shadow-xl backdrop-blur-xl text-[10px] sm:text-[11px] font-mono text-cyan-200">
          <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] animate-ping shrink-0" />
          <span className="font-semibold text-white tracking-tight">
            {isActive ? '✦ 3D VECTOR BEAM LOCKED' : 'Spatial Studio // φ = 1.618'}
          </span>
        </div>
      </motion.div>

      {/* 2. Floating 3D Spatial Hologram Core Stage */}
      <div className="relative w-64 sm:w-72 h-64 sm:h-72 flex items-center justify-center perspective-[1200px]">
        {/* Subtle Spatial Gyroscope Rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-4 rounded-full border border-purple-500/20 border-dashed pointer-events-none"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-8 rounded-full border border-cyan-500/25 pointer-events-none"
        />

        {/* 3D Fibonacci Golden Ratio Spiral */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: spiralSpeed, repeat: Infinity, ease: 'linear' }}
          className="relative w-44 h-44 flex items-center justify-center pointer-events-none"
        >
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-80">
            <defs>
              <linearGradient id="goldSpiral" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#f43f5e" />
              </linearGradient>
            </defs>
            {/* Golden Ratio Spiral Path */}
            <path
              d="M 100 100 A 10 10 0 0 1 110 100 A 20 20 0 0 1 90 100 A 40 40 0 0 1 130 100 A 70 70 0 0 1 60 100 A 110 110 0 0 1 170 100"
              stroke="url(#goldSpiral)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              className={isActive ? 'filter drop-shadow-[0_0_12px_#38bdf8]' : ''}
            />
            {/* Sacred Geometry Golden Rectangle Guides */}
            <rect x="30" y="30" width="140" height="86" stroke="#a855f7" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
            <rect x="30" y="30" width="86" height="86" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
          </svg>
        </motion.div>

        {/* Levitating Apple Pencil / Stylus (Tilted 45 Deg in Mid-Air) */}
        <motion.div
          animate={
            isActive
              ? { x: [0, 20, -15, 0], y: [-15, 10, -20, -15], rotate: [45, 55, 38, 45] }
              : { y: [0, -8, 0], rotate: [45, 43, 45] }
          }
          transition={
            isActive
              ? { duration: 1.2, ease: 'easeInOut' }
              : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
          }
          className="absolute z-30 pointer-events-none"
        >
          {/* Apple Pencil Body SVG */}
          <svg width="180" height="40" viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="pencilBody" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#f1f5f9" />
                <stop offset="100%" stopColor="#cbd5e1" />
              </linearGradient>
              <linearGradient id="nibLaser" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>

            {/* Pencil Shaft with Flat Magnetic Side */}
            <rect x="25" y="14" width="130" height="12" rx="6" fill="url(#pencilBody)" stroke="#94a3b8" strokeWidth="1" />
            {/* Top Cap */}
            <rect x="150" y="14" width="10" height="12" rx="3" fill="#e2e8f0" stroke="#64748b" strokeWidth="1" />
            {/* Apple Logo engraved */}
            <text x="135" y="23" fill="#64748b" fontSize="8" fontFamily="sans-serif"></text>

            {/* Front Conical Tip */}
            <polygon points="25,14 25,26 8,20" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
            {/* Precision Ceramic Nib Tip */}
            <circle cx="8" cy="20" r="2.5" fill="#38bdf8" />
            {/* Laser Spark Flare */}
            <circle cx="8" cy="20" r="6" fill="#38bdf8" opacity="0.6" className="animate-ping" />

            {/* Floating Magnetic Energy Rings Around Pencil */}
            <ellipse cx="60" cy="20" rx="4" ry="12" stroke="#38bdf8" strokeWidth="1.5" opacity="0.8" />
            <ellipse cx="110" cy="20" rx="4" ry="12" stroke="#a855f7" strokeWidth="1.5" opacity="0.8" />
          </svg>
        </motion.div>

        {/* Refractive CMYK Glass Prism Token */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-2 right-4 z-20 w-16 h-16 rounded-2xl bg-gradient-to-br from-white/20 via-cyan-500/10 to-pink-500/20 border border-white/40 shadow-xl backdrop-blur-md p-2 flex flex-col items-center justify-between"
        >
          <span className="text-[7.5px] font-mono text-cyan-300 font-bold">PRISM CMYK</span>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
          </div>
          <span className="text-[7px] font-mono text-slate-300">300 DPI</span>
        </motion.div>

        {/* Interactive 3D Typography Specimen Cube */}
        <motion.div
          onClick={handleGlyphClick}
          whileHover={{ scale: 1.1, rotateY: 180 }}
          transition={{ duration: 0.6 }}
          className="absolute bottom-6 left-2 z-20 w-16 h-16 rounded-2xl bg-[#0d0e20]/95 border border-purple-500/50 shadow-2xl backdrop-blur-md p-2 flex flex-col items-center justify-center cursor-pointer group/cube"
          title="Click to cycle typographic glyph"
        >
          <span className="text-xl font-bold font-hero-italic bg-gradient-to-r from-purple-200 to-cyan-200 bg-clip-text text-transparent group-hover/cube:scale-110 transition-transform">
            {activeGlyph}
          </span>
          <span className="text-[6.5px] font-mono text-purple-300 mt-1 uppercase tracking-tighter">
            GLYPH SPECIMEN
          </span>
        </motion.div>
      </div>

      {/* 3. Sleek Studio Floor Deck (Grounding the Hologram Unit) */}
      <div className="relative w-64 sm:w-72 mt-1 z-20 flex flex-col items-center">
        <div className="relative w-full rounded-2xl bg-gradient-to-b from-[#141528] via-[#0d0e1b] to-[#06070e] border-2 border-cyan-500/40 p-2.5 shadow-[0_20px_40px_rgba(0,0,0,0.95)] overflow-hidden">
          <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-cyan-500/25">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
              <span className="text-[9.5px] font-mono font-bold text-slate-200 tracking-tight">
                SPATIAL VECTOR EMITTER
              </span>
            </div>
            <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
              VISION 3D
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 px-1 text-[8.5px] font-mono text-slate-400">
            <div className="flex items-center gap-1 bg-black/50 px-2 py-1 rounded-lg border border-white/10">
              <Compass className="w-3 h-3 text-cyan-400" />
              <span className="text-slate-300 text-[8px]">φ = 1.618</span>
            </div>

            <div className="flex items-center gap-1 bg-cyan-950/50 px-2 py-1 rounded-lg border border-cyan-500/30">
              <Zap className="w-3 h-3 text-fuchsia-400 shrink-0" />
              <span className="text-cyan-200 text-[8px] font-bold">BEZIER OK</span>
            </div>

            <div className="flex items-center gap-1 bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-lg border border-cyan-400/50 text-white font-semibold transition-all">
              <PenTool className="w-3 h-3 text-cyan-300" />
              <span className="text-[8.5px]">ILLUMINATE</span>
            </div>
          </div>
        </div>

        {/* Telescopic Struts & Studio Cables */}
        <div className="relative w-full h-12 flex justify-between items-start px-6 -mt-0.5 pointer-events-none">
          <div className="flex flex-col items-center">
            <div className="w-4 h-8 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-500 rounded-b shadow-md border border-slate-600" />
            <div className="w-8 h-2.5 bg-[#0a0b14] rounded-full border border-cyan-500/40 -mt-1 shadow-lg" />
          </div>

          <svg viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-24 h-10 overflow-visible">
            <path d="M 15 0 C 10 25, 45 15, 50 35 C 55 45, 80 25, 95 40" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.9" />
            <path d="M 25 0 C 35 30, 20 20, 65 30 C 75 35, 85 38, 90 40" stroke="#c084fc" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8" />
          </svg>

          <div className="flex flex-col items-center">
            <div className="w-4 h-8 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-500 rounded-b shadow-md border border-slate-600" />
            <div className="w-8 h-2.5 bg-[#0a0b14] rounded-full border border-cyan-500/40 -mt-1 shadow-lg" />
          </div>
        </div>

        {/* Ground Floor Shadow */}
        <div className="w-60 sm:w-68 h-4 rounded-[100%] bg-black/90 blur-[6px] -mt-5 pointer-events-none" />
      </div>
    </div>
  );
};
