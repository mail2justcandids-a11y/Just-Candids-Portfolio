import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Sparkles, Sliders, Type, Move, Palette, PenTool, Check } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface DesignElementsProps {
  isTriggered: boolean;
  onGlow: () => void;
}

const SWATCHES = [
  { name: 'Royal', cmyk: 'C:72 M:95 Y:0 K:0', hex: '#8f05ff', color: 'from-purple-600 to-indigo-700' },
  { name: 'Magenta', cmyk: 'C:0 M:85 Y:25 K:0', hex: '#ec4899', color: 'from-pink-500 to-rose-600' },
  { name: 'Cyan', cmyk: 'C:80 M:0 Y:20 K:0', hex: '#06b6d4', color: 'from-cyan-400 to-teal-500' },
  { name: 'Amber', cmyk: 'C:0 M:40 Y:100 K:0', hex: '#f59e0b', color: 'from-amber-400 to-orange-500' },
];

export const DesignElements: React.FC<DesignElementsProps> = ({ isTriggered, onGlow }) => {
  const [activeSwatch, setActiveSwatch] = useState(0);
  const [activeLayer, setActiveLayer] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [activeTool, setActiveTool] = useState<'pen' | 'layers' | 'type'>('pen');
  const [strokeProgress, setStrokeProgress] = useState(1);

  // Handle external trigger from Hero "Vector Glow" button
  useEffect(() => {
    if (isTriggered) {
      triggerVectorAnimation();
    }
  }, [isTriggered]);

  const triggerVectorAnimation = () => {
    setIsDrawing(true);
    setStrokeProgress(0);

    setTimeout(() => {
      setStrokeProgress(1);
    }, 50);

    setTimeout(() => {
      setIsDrawing(false);
    }, 1800);
  };

  const handleInteractiveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playMechanicalShutter();
    onGlow();
    triggerVectorAnimation();
  };

  const handleSwatchClick = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playDialClick();
    setActiveSwatch(idx);
    triggerVectorAnimation();
  };

  const handleLayerClick = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playTick();
    setActiveLayer(idx);
  };

  return (
    <div
      onClick={handleInteractiveClick}
      className="relative select-none w-full max-w-sm sm:max-w-md lg:max-w-lg pointer-events-auto filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
      title="Click graphic design studio elements to trigger creative vector glow!"
    >
      {/* 1. Top Floating Mini Layers Palette (Photoshop / Illustrator Style) */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute -top-12 -left-4 sm:-left-8 z-30 w-52 sm:w-56 p-2.5 rounded-2xl bg-[#0b0c16]/95 border border-purple-500/40 shadow-2xl backdrop-blur-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-purple-500/20 text-[10px] font-mono text-purple-300">
          <div className="flex items-center gap-1.5 font-bold">
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span>LAYERS PALETTE</span>
          </div>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-500/30">
            300 DPI
          </span>
        </div>

        {/* Layer Rows */}
        <div className="space-y-1">
          {[
            { name: 'Siva_Vector_Portrait.svg', type: 'Vector' },
            { name: 'Identity_Typography.ai', type: 'Text' },
            { name: 'Cyber_Artboard_Grid', type: 'Grid' },
          ].map((layer, idx) => (
            <div
              key={layer.name}
              onClick={(e) => handleLayerClick(idx, e)}
              className={`flex items-center justify-between px-2 py-1 rounded-lg text-[9.5px] font-mono cursor-pointer transition-all ${
                activeLayer === idx
                  ? 'bg-purple-600/30 border border-purple-400/50 text-white font-medium shadow-sm'
                  : 'hover:bg-white/5 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-1.5 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                <span className="truncate">{layer.name}</span>
              </div>
              <span className="text-[8px] text-purple-300/70 shrink-0 uppercase">{layer.type}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 2. Central Interactive Vector Canvas with Animated Bézier Curve & Pen Tool */}
      <div className="relative w-full h-48 sm:h-56 rounded-3xl bg-gradient-to-br from-[#0c0d1e]/90 via-[#070712]/95 to-[#030308] border border-purple-500/30 p-4 overflow-hidden shadow-2xl">
        {/* Subtle Isometric Coordinate Grid */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(168, 85, 247, 0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(168, 85, 247, 0.25) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Vector Curve SVG with Dynamic Bezier Path and Control Points */}
        <svg
          viewBox="0 0 400 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10"
        >
          <defs>
            <linearGradient id="vectorStrokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>
            <filter id="vectorGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Tangent Control Handle Lines */}
          <line x1="80" y1="140" x2="130" y2="40" stroke="#a855f7" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />
          <line x1="280" y1="60" x2="330" y2="150" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />

          {/* Smooth Dynamic S-Bezier Curve */}
          <motion.path
            d="M 50 140 C 130 40, 260 180, 350 60"
            stroke="url(#vectorStrokeGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#vectorGlow)"
            initial={{ pathLength: 1 }}
            animate={{ pathLength: strokeProgress }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />

          {/* Anchor Points (Hollow Squares with glowing centers) */}
          {/* P1 */}
          <g>
            <circle cx="50" cy="140" r="5" fill="#a855f7" />
            <rect x="46" y="136" width="8" height="8" fill="#ffffff" stroke="#7e22ce" strokeWidth="1.5" />
            <text x="35" y="160" fill="#c084fc" fontSize="9" fontFamily="monospace">P1 (50, 140)</text>
          </g>

          {/* Handle 1 Knob */}
          <circle cx="130" cy="40" r="4" fill="#a855f7" />
          <text x="110" y="30" fill="#a855f7" fontSize="8" fontFamily="monospace">H1</text>

          {/* P2 Mid Anchor */}
          <g>
            <rect x="195" y="105" width="8" height="8" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
            <text x="180" y="130" fill="#38bdf8" fontSize="9" fontFamily="monospace">NODE #02</text>
          </g>

          {/* Handle 2 Knob */}
          <circle cx="280" cy="60" r="4" fill="#38bdf8" />

          {/* P3 End Anchor */}
          <g>
            <circle cx="350" cy="60" r="5" fill="#f472b6" />
            <rect x="346" y="56" width="8" height="8" fill="#ffffff" stroke="#db2777" strokeWidth="1.5" />
            <text x="330" y="45" fill="#f472b6" fontSize="9" fontFamily="monospace">P3 [END]</text>
          </g>

          {/* Animated Stylus / Pen Tool Cursor moving along path */}
          <motion.g
            animate={
              isDrawing
                ? { x: [50, 200, 350], y: [140, 110, 60] }
                : { x: [200, 206, 200], y: [108, 104, 108] }
            }
            transition={
              isDrawing
                ? { duration: 1.2, ease: 'easeInOut' }
                : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
            }
          >
            {/* Pen Tool Nib Icon */}
            <path
              d="M 0 0 L 16 6 L 10 10 L 6 16 Z"
              fill="#ffffff"
              stroke="#0f172a"
              strokeWidth="1.5"
              filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))"
            />
            {/* Glowing Laser Drawing Tip */}
            <circle cx="0" cy="0" r="3" fill="#a855f7" className="animate-ping" />
          </motion.g>
        </svg>

        {/* Status Chip in Vector Canvas */}
        <div className="absolute bottom-3 left-4 z-20 flex items-center gap-2">
          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-[9px] font-mono text-purple-200">
            <PenTool className="w-2.5 h-2.5 text-purple-300" />
            <span>PEN TOOL // BEZIER CURVE</span>
          </div>
          <span className="text-[9px] font-mono text-slate-400">Ctrl + Click to Edit</span>
        </div>
      </div>

      {/* 3. Bottom Floating Pantone & CMYK Color Swatches Bar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-3 flex flex-wrap items-center justify-between gap-2 p-2 rounded-2xl bg-[#0d0e1b]/95 border border-purple-500/30 backdrop-blur-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-1.5 pl-1">
          <Palette className="w-3.5 h-3.5 text-fuchsia-400 shrink-0" />
          <span className="text-[10px] font-mono font-bold text-slate-200">PANTONE & CMYK:</span>
        </div>

        {/* Swatch Chips */}
        <div className="flex items-center gap-1.5">
          {SWATCHES.map((swatch, idx) => (
            <button
              key={swatch.name}
              onClick={(e) => handleSwatchClick(idx, e)}
              className={`group/swatch relative flex items-center gap-1 px-2 py-1 rounded-lg border text-[9.5px] font-mono transition-all ${
                activeSwatch === idx
                  ? 'bg-white/15 border-white text-white font-bold scale-105 shadow-md'
                  : 'border-white/10 text-slate-300 hover:border-white/30 hover:bg-white/5'
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full shadow-sm shrink-0"
                style={{ backgroundColor: swatch.hex }}
              />
              <span className="hidden sm:inline">{swatch.name}</span>
            </button>
          ))}
        </div>

        {/* 300 DPI Export Badge */}
        <div className="pr-1 flex items-center gap-1 text-[9px] font-mono text-purple-300/80">
          <Sparkles className="w-3 h-3 text-amber-300" />
          <span>Vector OK</span>
        </div>
      </motion.div>
    </div>
  );
};
