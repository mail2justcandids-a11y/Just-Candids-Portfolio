import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Sparkles, Palette, PenTool, Move, Split, Check, Sliders } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface DesignElementsProps {
  isTriggered: boolean;
  onGlow: () => void;
}

interface SwatchItem {
  name: string;
  pantone: string;
  cmyk: string;
  hex: string;
  accent: string;
}

const PANTONE_SWATCHES: SwatchItem[] = [
  { name: 'Ultra Violet', pantone: 'PANTONE 18-3838', cmyk: 'C:72 M:95 Y:0 K:0', hex: '#8f05ff', accent: '#a855f7' },
  { name: 'Neon Magenta', pantone: 'PANTONE 17-2036', cmyk: 'C:0 M:88 Y:22 K:0', hex: '#ec4899', accent: '#f472b6' },
  { name: 'Cyan Electric', pantone: 'PANTONE 16-4535', cmyk: 'C:85 M:0 Y:15 K:0', hex: '#06b6d4', accent: '#22d3ee' },
  { name: 'Golden Amber', pantone: 'PANTONE 14-1064', cmyk: 'C:0 M:42 Y:100 K:0', hex: '#f59e0b', accent: '#fbbf24' },
];

export const DesignElements: React.FC<DesignElementsProps> = ({ isTriggered, onGlow }) => {
  const [selectedSwatch, setSelectedSwatch] = useState<number>(0);
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [strokeLength, setStrokeLength] = useState<number>(1);
  const [activeLayer, setActiveLayer] = useState<number>(0);

  // Live Interactive Draggable Bézier Control Point (P2)
  const [bezierHandle, setBezierHandle] = useState<{ x: number; y: number }>({ x: 200, y: 55 });
  const [isDraggingHandle, setIsDraggingHandle] = useState<boolean>(false);
  const svgRef = useRef<SVGSVGElement>(null);

  // Handle external trigger from "Vector Glow" in Hero
  useEffect(() => {
    if (isTriggered) {
      triggerCreativeGlowSequence();
    }
  }, [isTriggered]);

  const triggerCreativeGlowSequence = () => {
    setIsDrawing(true);
    setStrokeLength(0);
    soundEngine.playVectorPenSnap();

    setTimeout(() => {
      setStrokeLength(1);
    }, 60);

    setTimeout(() => {
      setIsDrawing(false);
    }, 1800);
  };

  const handleTriggerExploder = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playMechanicalShutter();
    setIsExploded(true);
    setTimeout(() => {
      setIsExploded(false);
      soundEngine.playDialClick();
    }, 2400);
  };

  const handleSwatchSelect = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playDialClick();
    setSelectedSwatch(idx);
    triggerCreativeGlowSequence();
  };

  // SVG Mouse Drag Physics for Bézier Curve Handle
  const handleSvgMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDraggingHandle || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = Math.max(80, Math.min(320, ((e.clientX - rect.left) / rect.width) * 400));
    const y = Math.max(20, Math.min(180, ((e.clientY - rect.top) / rect.height) * 200));
    setBezierHandle({ x, y });
  };

  const handleSvgMouseUp = () => {
    if (isDraggingHandle) {
      setIsDraggingHandle(false);
      soundEngine.playTick();
    }
  };

  const currentSwatch = PANTONE_SWATCHES[selectedSwatch];

  return (
    <div
      className="relative select-none w-full max-w-sm sm:max-w-md lg:max-w-lg filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.85)]"
      title="Interactive Graphic Design Studio: Drag vector handles or explode CMYK print plates!"
    >
      {/* 1. Top Adobe-Style Floating Layers Palette */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute -top-14 -left-3 sm:-left-6 z-30 w-52 sm:w-60 p-2.5 rounded-2xl bg-[#0c0d1b]/95 border border-purple-500/40 shadow-2xl backdrop-blur-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-purple-500/20 text-[10px] font-mono text-purple-300">
          <div className="flex items-center gap-1.5 font-bold">
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span>STUDIO ARTBOARD</span>
          </div>
          <span className="text-[8.5px] px-1.5 py-0.5 rounded bg-purple-950/90 text-purple-200 border border-purple-500/30">
            300 DPI // VECTOR
          </span>
        </div>

        {/* Clickable Layers */}
        <div className="space-y-1">
          {[
            { name: 'Siva_Vector_Artboard.ai', tag: 'Curves', color: '#c084fc' },
            { name: 'Brand_Identity_Specimen.eps', tag: 'Type', color: '#38bdf8' },
            { name: 'CMYK_Offset_Plates.pdf', tag: 'Print', color: '#f472b6' },
          ].map((layer, idx) => (
            <div
              key={layer.name}
              onClick={() => {
                soundEngine.playTick();
                setActiveLayer(idx);
              }}
              className={`flex items-center justify-between px-2 py-1 rounded-lg text-[9.5px] font-mono cursor-pointer transition-all ${
                activeLayer === idx
                  ? 'bg-purple-600/30 border border-purple-400/60 text-white font-medium shadow-sm'
                  : 'hover:bg-white/5 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-1.5 truncate">
                <span
                  className="w-2 h-2 rounded-full shrink-0 shadow-sm"
                  style={{ backgroundColor: layer.color }}
                />
                <span className="truncate">{layer.name}</span>
              </div>
              <span className="text-[8px] text-purple-300/80 font-semibold">{layer.tag}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 2. Interactive Vector Canvas with Real-Time Draggable Bézier Handles */}
      <div
        className="relative w-full h-52 sm:h-60 rounded-3xl bg-gradient-to-br from-[#0c0d1e]/95 via-[#080816]/95 to-[#020206] border border-purple-500/40 p-3 sm:p-4 overflow-hidden shadow-2xl"
        onMouseUp={handleSvgMouseUp}
        onMouseLeave={handleSvgMouseUp}
      >
        {/* Engineering Isometric Grid Lines */}
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(168, 85, 247, 0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(168, 85, 247, 0.25) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        {/* CMYK Isometric Exploded Layers (Triggered on Click) */}
        <AnimatePresence>
          {isExploded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 z-40 bg-[#050508]/90 backdrop-blur-md p-4 flex flex-col justify-center items-center pointer-events-none"
            >
              <div className="text-[10px] font-mono font-bold text-cyan-300 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                <span>CMYK OFFSET SEPARATION IN PROGRESS</span>
              </div>
              <div className="flex items-center gap-3">
                {[
                  { name: 'C', color: '#06b6d4', offset: '-translate-y-4' },
                  { name: 'M', color: '#ec4899', offset: '-translate-y-1' },
                  { name: 'Y', color: '#eab308', offset: 'translate-y-2' },
                  { name: 'K', color: '#ffffff', offset: 'translate-y-5' },
                ].map((plate) => (
                  <motion.div
                    key={plate.name}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="w-14 h-20 rounded-lg border flex flex-col items-center justify-between p-1.5 shadow-2xl backdrop-blur-sm"
                    style={{ borderColor: plate.color, backgroundColor: `${plate.color}15` }}
                  >
                    <span className="text-[8px] font-mono font-bold" style={{ color: plate.color }}>
                      PLATE {plate.name}
                    </span>
                    <span className="text-[14px] font-bold font-mono" style={{ color: plate.color }}>
                      ✛
                    </span>
                    <span className="text-[7px] font-mono text-slate-300">100% REG</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Live Vector SVG Surface */}
        <svg
          ref={svgRef}
          viewBox="0 0 400 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onMouseMove={handleSvgMouseMove}
          className="w-full h-full relative z-10 cursor-crosshair"
        >
          <defs>
            <linearGradient id="neonPathGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={currentSwatch.hex} />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>
            <filter id="neonFilterGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Tangent Handle Guideline */}
          <line
            x1="50"
            y1="140"
            x2={bezierHandle.x}
            y2={bezierHandle.y}
            stroke="#a855f7"
            strokeWidth="1.2"
            strokeDasharray="4 3"
            opacity="0.75"
          />
          <line
            x1={bezierHandle.x}
            y1={bezierHandle.y}
            x2="350"
            y2="70"
            stroke="#38bdf8"
            strokeWidth="1.2"
            strokeDasharray="4 3"
            opacity="0.75"
          />

          {/* Interactive Dynamic Cubic Bézier Path */}
          <motion.path
            d={`M 50 140 Q ${bezierHandle.x} ${bezierHandle.y} 350 70`}
            stroke="url(#neonPathGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            filter="url(#neonFilterGlow)"
            initial={{ pathLength: 1 }}
            animate={{ pathLength: strokeLength }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />

          {/* Anchor Point 1 */}
          <g>
            <rect x="45" y="135" width="10" height="10" fill="#ffffff" stroke="#9333ea" strokeWidth="2" />
            <text x="35" y="162" fill="#c084fc" fontSize="9" fontFamily="monospace">P1 (50, 140)</text>
          </g>

          {/* Draggable Mid Control Node Knob */}
          <g
            onMouseDown={(e) => {
              e.stopPropagation();
              setIsDraggingHandle(true);
              soundEngine.playDialClick();
            }}
            className="cursor-grab active:cursor-grabbing group/knob"
          >
            {/* Glowing drag area target */}
            <circle
              cx={bezierHandle.x}
              cy={bezierHandle.y}
              r="14"
              fill={currentSwatch.hex}
              opacity="0.2"
              className="animate-pulse"
            />
            <circle
              cx={bezierHandle.x}
              cy={bezierHandle.y}
              r="7"
              fill="#ffffff"
              stroke={currentSwatch.hex}
              strokeWidth="2.5"
            />
            <text
              x={bezierHandle.x - 28}
              y={bezierHandle.y - 12}
              fill="#ffffff"
              fontSize="9"
              fontFamily="monospace"
              fontWeight="bold"
            >
              DRAG ({Math.round(bezierHandle.x)}, {Math.round(bezierHandle.y)})
            </text>
          </g>

          {/* Anchor Point 3 */}
          <g>
            <rect x="345" y="65" width="10" height="10" fill="#ffffff" stroke="#0284c7" strokeWidth="2" />
            <text x="320" y="52" fill="#38bdf8" fontSize="9" fontFamily="monospace">P3 (350, 70)</text>
          </g>

          {/* Animated Digital Pen Tool Cursor */}
          <motion.g
            animate={
              isDrawing
                ? { x: [50, bezierHandle.x, 350], y: [140, bezierHandle.y, 70] }
                : { x: [bezierHandle.x, bezierHandle.x + 8, bezierHandle.x], y: [bezierHandle.y, bezierHandle.y - 4, bezierHandle.y] }
            }
            transition={
              isDrawing
                ? { duration: 1.2, ease: 'easeInOut' }
                : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
            }
          >
            <path
              d="M 0 0 L 16 6 L 10 10 L 6 16 Z"
              fill="#ffffff"
              stroke="#0f172a"
              strokeWidth="1.5"
            />
            <circle cx="0" cy="0" r="3.5" fill={currentSwatch.hex} className="animate-ping" />
          </motion.g>
        </svg>

        {/* Live Bézier Tip Badge */}
        <div className="absolute bottom-3 left-4 z-20 flex items-center gap-2">
          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-950/85 border border-purple-500/40 text-[9px] font-mono text-purple-200">
            <Move className="w-2.5 h-2.5 text-purple-300" />
            <span>DRAG NODE TO BEND CURVE</span>
          </div>
        </div>
      </div>

      {/* 3. Bottom Pantone Swatches + CMYK Exploder Toolbar */}
      <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 p-2 rounded-2xl bg-[#0c0d1c]/95 border border-purple-500/30 backdrop-blur-md shadow-xl">
        {/* Pantone Swatch Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {PANTONE_SWATCHES.map((swatch, idx) => (
            <button
              key={swatch.name}
              onClick={(e) => handleSwatchSelect(idx, e)}
              className={`group flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-[9.5px] font-mono transition-all ${
                selectedSwatch === idx
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

        {/* CMYK Offset Exploder Action Button */}
        <button
          onClick={handleTriggerExploder}
          className="liquid-glass-track flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[9.5px] font-mono text-purple-200 hover:text-white border border-purple-500/30 hover:border-purple-400 transition-all active:scale-95 shadow-sm"
          title="Click to explode design into 4 CMYK print plates"
        >
          <Split className="w-3 h-3 text-cyan-400 shrink-0" />
          <span>Explode CMYK</span>
        </button>
      </div>
    </div>
  );
};
