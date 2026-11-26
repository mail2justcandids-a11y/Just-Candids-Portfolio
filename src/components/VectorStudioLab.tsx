import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Palette,
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Move,
  Sparkles,
  Grid,
  Scissors,
  CheckCircle2,
  FileCheck,
  Printer,
  Eye,
  Sliders,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ShieldCheck,
} from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

type ProofingMode = 'rgb' | 'cmyk' | 'key-plate' | 'wireframe';
type SubstrateMode = 'standard' | 'gold-foil' | 'linen' | 'obsidian';

interface DesignShowcaseItem {
  id: string;
  title: string;
  client: string;
  category: string;
  imageUrl: string;
  cmykValues: { c: number; m: number; y: number; k: number };
  hexColor: string;
  year: string;
  dimensions: string;
  vectorNodes: number;
  printSpec: string;
}

const DESIGN_SHOWCASE: DesignShowcaseItem[] = [
  {
    id: 'up-ryla-dress-code',
    title: 'UP RYLA Official Dress Code & Identity Guide',
    client: 'District Rotaract Council • District 3234',
    category: 'Event Identity & Wardrobe Specs',
    imageUrl: '/designs/up-ryla-dress-code.png',
    cmykValues: { c: 20, m: 45, y: 75, k: 30 },
    hexColor: '#d48f45',
    year: '2026',
    dimensions: '1080 × 1920 px',
    vectorNodes: 3820,
    printSpec: 'FOGRA39 CMYK Offset Press • 3mm Bleed',
  },
  {
    id: 'rotacode-terminal',
    title: 'Rota-Code Cyber Puzzle Challenge',
    client: 'Rotaract Club of Coastal Legacy',
    category: 'Cyberpunk Terminal Graphic Campaign',
    imageUrl: '/designs/rotacode-terminal-poster.png',
    cmykValues: { c: 0, m: 0, y: 0, k: 95 },
    hexColor: '#22c55e',
    year: '2026',
    dimensions: '1080 × 1920 px',
    vectorNodes: 4120,
    printSpec: 'Digital Display & Screen Print Vector',
  },
  {
    id: 'graduation-banner',
    title: '21st Graduation Day Dignitary Stage Banner',
    client: 'Dhanalakshmi College of Engineering',
    category: 'Large-Format Official Stage Banner',
    imageUrl: '/designs/graduation-day-banner.png',
    cmykValues: { c: 45, m: 95, y: 0, k: 20 },
    hexColor: '#770187',
    year: '2026',
    dimensions: '1600 × 400 px',
    vectorNodes: 5640,
    printSpec: 'Grand Format Vinyl 300 DPI Stage Backdrop',
  },
  {
    id: 'raja-iyer-kitchen',
    title: 'Raja Iyer Kitchen Festive Campaign',
    client: 'Raja Iyer Kitchen Catering',
    category: 'Commercial Gastronomy Advertising',
    imageUrl: '/designs/raja-iyer-kitchen-vinayagar.png',
    cmykValues: { c: 15, m: 40, y: 85, k: 25 },
    hexColor: '#deb686',
    year: '2025',
    dimensions: '941 × 1672 px',
    vectorNodes: 3100,
    printSpec: 'sRGB Digital Screen & High-DPI Press',
  },
  {
    id: 'elysian-2k26-launch',
    title: 'Elysian 2K26 AI & Data Science Symposium',
    client: 'Dept of Artificial Intelligence & Data Science',
    category: 'Futuristic Symposium Visual Identity',
    imageUrl: '/designs/elysian-2k26-countdown.png',
    cmykValues: { c: 80, m: 15, y: 0, k: 0 },
    hexColor: '#199fcf',
    year: '2026',
    dimensions: '900 × 1600 px',
    vectorNodes: 4780,
    printSpec: 'RGB Display + High-Res Campus Poster',
  },
  {
    id: 'just-candids-mark',
    title: 'Just Candids Camera Shutter Vector Mark',
    client: 'Just Candids Official Studio Emblem',
    category: 'Vector Brand Identity',
    imageUrl: '/just-candids-mark.png',
    cmykValues: { c: 35, m: 85, y: 0, k: 0 },
    hexColor: '#a855f7',
    year: '2026',
    dimensions: '2000 × 2000 px',
    vectorNodes: 1480,
    printSpec: 'Pantone 2665 C Royal Purple • 300 DPI Press',
  },
];

export const VectorStudioLab: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [proofingMode, setProofingMode] = useState<ProofingMode>('rgb');
  const [substrate, setSubstrate] = useState<SubstrateMode>('standard');
  const [showCropBleed, setShowCropBleed] = useState(true);
  const [showGrid, setShowGrid] = useState(false);
  const [zoom, setZoom] = useState(1.0);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  // Mouse tilt for metallic gold foil sheen
  const [foilTilt, setFoilTilt] = useState({ x: 50, y: 50 });

  const activeProject = DESIGN_SHOWCASE[selectedIndex];
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ startX: number; startY: number; initialPanX: number; initialPanY: number }>({
    startX: 0,
    startY: 0,
    initialPanX: 0,
    initialPanY: 0,
  });

  const handleZoomIn = () => {
    soundEngine.playTick();
    setZoom((prev) => Math.min(prev + 0.35, 2.8));
  };

  const handleZoomOut = () => {
    soundEngine.playTick();
    setZoom((prev) => Math.max(prev - 0.35, 0.75));
  };

  const handleReset = () => {
    soundEngine.playApertureClick();
    setZoom(1.0);
    setPan({ x: 0, y: 0 });
    setProofingMode('rgb');
    setSubstrate('standard');
    setShowCropBleed(true);
    setShowGrid(false);
  };

  // Drag Pan Logic
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1.0) return;
    setIsDragging(true);
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialPanX: pan.x,
      initialPanY: pan.y,
    };
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      // Calculate foil tilt percentage
      if (viewportRef.current) {
        const rect = viewportRef.current.getBoundingClientRect();
        const px = ((e.clientX - rect.left) / rect.width) * 100;
        const py = ((e.clientY - rect.top) / rect.height) * 100;
        setFoilTilt({ x: px, y: py });
      }

      if (!isDragging) return;
      const dx = e.clientX - dragStartRef.current.startX;
      const dy = e.clientY - dragStartRef.current.startY;
      setPan({
        x: dragStartRef.current.initialPanX + dx,
        y: dragStartRef.current.initialPanY + dy,
      });
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  // Compute CSS filter styling based on Proofing Mode
  const getFilterStyle = (): React.CSSProperties => {
    switch (proofingMode) {
      case 'cmyk':
        // Simulates rich offset press ink density with slight dot gain roll-off
        return {
          filter: 'contrast(1.08) saturate(0.96) brightness(0.98)',
        };
      case 'key-plate':
        // Simulates K-Plate (Black Separation Plate) in offset pre-press
        return {
          filter: 'grayscale(100%) contrast(1.35) brightness(0.95)',
        };
      case 'wireframe':
        // Inverts into vector path outline mode (Illustrator Cmd+Y feel)
        return {
          filter: 'invert(1) hue-rotate(180deg) contrast(1.8) saturate(0)',
          outline: '1px dashed rgba(168, 85, 247, 0.6)',
        };
      case 'rgb':
      default:
        return {};
    }
  };

  // Substrate Paper Texture Background
  const getSubstrateStyle = (): React.CSSProperties => {
    switch (substrate) {
      case 'gold-foil':
        return {
          background: `radial-gradient(circle at ${foilTilt.x}% ${foilTilt.y}%, rgba(254, 240, 138, 0.3) 0%, rgba(202, 138, 4, 0.15) 35%, rgba(10, 11, 20, 0.95) 70%)`,
          boxShadow: '0 0 50px rgba(234, 179, 8, 0.25)',
        };
      case 'linen':
        return {
          backgroundColor: '#0c0d18',
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 0)',
          backgroundSize: '12px 12px',
        };
      case 'obsidian':
        return {
          background: 'linear-gradient(145deg, #020204 0%, #08080f 50%, #000000 100%)',
          boxShadow: 'inset 0 0 80px rgba(0, 0, 0, 0.9)',
        };
      case 'standard':
      default:
        return {
          background: 'radial-gradient(circle at 50% 50%, #0c0d1c 0%, #06070e 100%)',
        };
    }
  };

  return (
    <section id="vector-lab" className="py-20 lg:py-28 relative overflow-hidden bg-[#040408] border-t border-purple-500/15 scroll-mt-24 lg:scroll-mt-28">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-violet-950/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1560px] 2xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 relative z-10">
        
        {/* Section Header with Balance */}
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-14 space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-semibold tracking-wide backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-purple-300" />
            <span className="font-project-label text-[11px]">Interactive Vector & Print Preflight Studio</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-section-title text-white tracking-tight leading-tight [text-wrap:balance]">
            Vector Proofing & Print Lab
          </h2>
          <p className="font-body text-slate-300 text-sm sm:text-base leading-relaxed [text-wrap:pretty] max-w-2xl mx-auto">
            Step into Siva's digital prepress studio. Test CMYK offset ink density, inspect 300 DPI crop & bleed margins, toggle mathematical alignment grids, and audit vector bezier curve purity in real time.
          </p>
          <p className="font-featured-statement text-purple-200/90 text-sm sm:text-base italic pt-0.5">
            “True design precision doesn't fear the loupe; it shines under 300 DPI inspection.”
          </p>
        </div>

        {/* Studio Main Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Inspection Viewport (8 cols) */}
          <div className="lg:col-span-8 flex flex-col space-y-4">
            
            {/* Viewport Canvas Card */}
            <div
              ref={viewportRef}
              style={getSubstrateStyle()}
              className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-3xl border border-purple-500/25 overflow-hidden flex items-center justify-center p-6 sm:p-10 select-none shadow-2xl transition-all duration-500"
            >
              {/* Press Calibration Densitometer Color Bar (Top) */}
              {showCropBleed && (
                <div className="absolute top-3 left-10 right-10 flex items-center justify-between text-[9px] font-mono text-slate-400 opacity-80 pointer-events-none z-20">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400 inline-block shadow-sm" title="Cyan 100%" />
                    <span className="w-2.5 h-2.5 rounded-sm bg-fuchsia-500 inline-block shadow-sm" title="Magenta 100%" />
                    <span className="w-2.5 h-2.5 rounded-sm bg-yellow-400 inline-block shadow-sm" title="Yellow 100%" />
                    <span className="w-2.5 h-2.5 rounded-sm bg-black inline-block shadow-sm" title="Black Key 100%" />
                    <span className="text-slate-400 font-mono tracking-widest pl-2">CMYK PRESS CALIBRATION</span>
                  </span>
                  <span className="font-mono text-purple-300 hidden sm:inline">300 DPI • 3.00mm BLEED MARGIN</span>
                </div>
              )}

              {/* Offset Corner Registration Targets & Crop Marks */}
              {showCropBleed && (
                <>
                  {/* Top-Left Crop Mark */}
                  <div className="absolute top-3 left-3 w-6 h-6 pointer-events-none z-20 opacity-70">
                    <div className="w-full h-[1px] bg-purple-400/80 mb-2" />
                    <div className="w-[1px] h-full bg-purple-400/80 -mt-2" />
                  </div>
                  {/* Top-Right Crop Mark */}
                  <div className="absolute top-3 right-3 w-6 h-6 pointer-events-none z-20 opacity-70 flex flex-col items-end">
                    <div className="w-full h-[1px] bg-purple-400/80 mb-2" />
                    <div className="w-[1px] h-full bg-purple-400/80 -mt-2" />
                  </div>
                  {/* Bottom-Left Crop Mark */}
                  <div className="absolute bottom-3 left-3 w-6 h-6 pointer-events-none z-20 opacity-70 flex items-end">
                    <div className="w-full h-[1px] bg-purple-400/80 mt-2" />
                    <div className="w-[1px] h-full bg-purple-400/80" />
                  </div>
                  {/* Bottom-Right Crop Mark */}
                  <div className="absolute bottom-3 right-3 w-6 h-6 pointer-events-none z-20 opacity-70 flex flex-col items-end justify-end">
                    <div className="w-full h-[1px] bg-purple-400/80 mt-2" />
                    <div className="w-[1px] h-full bg-purple-400/80" />
                  </div>
                </>
              )}

              {/* Mathematical Grid Overlay */}
              {showGrid && (
                <div
                  className="absolute inset-6 rounded-2xl pointer-events-none z-20 border border-cyan-400/30"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, rgba(6, 182, 212, 0.15) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(6, 182, 212, 0.15) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                  }}
                >
                  {/* Golden Ratio Center Reticle */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border border-purple-400/30 animate-pulse" />
                    <div className="w-[1px] h-full bg-cyan-400/30 absolute" />
                    <div className="h-[1px] w-full bg-cyan-400/30 absolute" />
                  </div>
                </div>
              )}

              {/* Artwork Container with Pan & Zoom */}
              <div
                onMouseDown={handleMouseDown}
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                  cursor: zoom > 1.0 ? (isDragging ? 'grabbing' : 'grab') : 'default',
                  transition: isDragging ? 'none' : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="relative max-h-full max-w-full flex items-center justify-center p-2"
              >
                {/* 3mm Safety Bleed Visual Border */}
                {showCropBleed && (
                  <div className="absolute -inset-2.5 rounded-lg border border-dashed border-red-500/40 pointer-events-none z-10">
                    <span className="absolute -top-3 left-2 font-mono text-[8px] bg-red-950/80 text-red-300 px-1 rounded">
                      +3mm Bleed Limit
                    </span>
                  </div>
                )}

                <img
                  src={activeProject.imageUrl}
                  alt={activeProject.title}
                  style={getFilterStyle()}
                  className="max-h-[380px] sm:max-h-[440px] w-auto max-w-full object-contain filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)] rounded-lg pointer-events-none transition-all duration-300"
                />
              </div>

              {/* Mode Watermark Overlay (e.g. Wireframe / CMYK) */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 z-20">
                <span className="font-project-label px-3 py-1 rounded-full text-[10px] bg-black/85 backdrop-blur-md text-purple-300 border border-purple-400/30 flex items-center gap-1.5 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                  <span>
                    {proofingMode === 'wireframe' && 'VECTOR OUTLINE WIREFRAME (CMD+Y)'}
                    {proofingMode === 'key-plate' && 'OFFSET K-PLATE KEY SEPARATION'}
                    {proofingMode === 'cmyk' && 'FOGRA39 CMYK PRESS PROOF'}
                    {proofingMode === 'rgb' && 'DIGITAL sRGB COLOR MASTER'}
                  </span>
                </span>
              </div>

              {/* Zoom & View Controls Overlay */}
              <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-[#0a0b14]/90 backdrop-blur-md p-1.5 rounded-2xl border border-purple-500/25 z-20 shadow-xl">
                <button
                  onClick={handleZoomOut}
                  title="Zoom Out"
                  className="p-1.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="font-mono text-xs text-purple-300 px-1 font-semibold min-w-[42px] text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  title="Zoom In"
                  className="p-1.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <div className="w-[1px] h-4 bg-purple-500/25 mx-0.5" />
                <button
                  onClick={handleReset}
                  title="Reset Canvas"
                  className="p-1.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Project Quick Strip Carousel */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {DESIGN_SHOWCASE.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => {
                    soundEngine.playQuickSnap();
                    setSelectedIndex(idx);
                  }}
                  className={`flex items-center gap-2.5 p-2 pr-3.5 rounded-2xl border transition-all shrink-0 select-none ${
                    selectedIndex === idx
                      ? 'bg-purple-950/70 border-purple-400 text-white shadow-lg shadow-purple-600/20'
                      : 'bg-[#0a0b14] border-purple-500/15 text-slate-400 hover:text-white hover:border-purple-500/35'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-black/60 overflow-hidden flex items-center justify-center p-1 border border-purple-500/20 shrink-0">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-contain" />
                  </div>
                  <div className="text-left min-w-0">
                    <div className="text-xs font-nav font-medium truncate max-w-[140px] sm:max-w-[180px]">
                      {item.title}
                    </div>
                    <div className="text-[10px] text-purple-300/80 font-mono truncate">
                      {item.year} &bull; {item.category}
                    </div>
                  </div>
                </button>
              ))}
            </div>

          </div>

          {/* Right Control Console (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* 1. Color Proofing Engine Console */}
            <div className="p-5 sm:p-6 rounded-3xl bg-[#0a0b16] border border-purple-500/20 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-purple-500/15 pb-3">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-purple-400" />
                  <h3 className="text-sm font-section-title text-white tracking-wide">
                    Prepress Proofing Modes
                  </h3>
                </div>
                <span className="font-project-label text-[10px] text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded-full border border-purple-500/20">
                  Live Engine
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'rgb', label: 'sRGB Digital', sub: 'Web & Display' },
                  { id: 'cmyk', label: 'CMYK Press', sub: 'Offset Simulation' },
                  { id: 'key-plate', label: 'K-Plate Key', sub: 'Black Separation' },
                  { id: 'wireframe', label: 'Wireframe Cmd+Y', sub: 'Vector Outline' },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => {
                      soundEngine.playDialClick();
                      setProofingMode(mode.id as ProofingMode);
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      proofingMode === mode.id
                        ? 'bg-purple-600 text-white border-purple-300 shadow-md shadow-purple-600/30'
                        : 'bg-[#0e101f] border-purple-500/15 text-slate-300 hover:text-white hover:border-purple-500/40'
                    }`}
                  >
                    <div className="text-xs font-nav font-medium leading-tight">{mode.label}</div>
                    <div className="text-[10px] text-purple-200/70 mt-0.5 font-mono">{mode.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Substrate & Tactile Stock Finishes */}
            <div className="p-5 sm:p-6 rounded-3xl bg-[#0a0b16] border border-purple-500/20 shadow-xl space-y-4">
              <div className="flex items-center gap-2 border-b border-purple-500/15 pb-3">
                <Printer className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-section-title text-white tracking-wide">
                  Substrate & Paper Stock
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'standard', label: 'Raw Artboard', sub: 'Neutral Canvas' },
                  { id: 'gold-foil', label: 'Gold Foil Press', sub: 'Specular Sheen' },
                  { id: 'linen', label: 'Woven Linen', sub: 'Fine-Art Tooth' },
                  { id: 'obsidian', label: 'Obsidian Mount', sub: 'Museum Gallery' },
                ].map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => {
                      soundEngine.playApertureClick();
                      setSubstrate(sub.id as SubstrateMode);
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      substrate === sub.id
                        ? 'bg-purple-600 text-white border-purple-300 shadow-md shadow-purple-600/30'
                        : 'bg-[#0e101f] border-purple-500/15 text-slate-300 hover:text-white hover:border-purple-500/40'
                    }`}
                  >
                    <div className="text-xs font-nav font-medium leading-tight">{sub.label}</div>
                    <div className="text-[10px] text-purple-200/70 mt-0.5 font-mono">{sub.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Preflight Overlay Toggles */}
            <div className="p-5 sm:p-6 rounded-3xl bg-[#0a0b16] border border-purple-500/20 shadow-xl space-y-3.5">
              <div className="flex items-center gap-2 border-b border-purple-500/15 pb-2.5">
                <Scissors className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-section-title text-white tracking-wide">
                  Pre-Press Guides & Calibration
                </h3>
              </div>

              <div className="space-y-2">
                {/* Crop & Bleed Toggle */}
                <button
                  onClick={() => {
                    soundEngine.playTick();
                    setShowCropBleed(!showCropBleed);
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-nav transition-all ${
                    showCropBleed
                      ? 'bg-purple-950/60 border-purple-400 text-white'
                      : 'bg-[#0e101f] border-purple-500/15 text-slate-400'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Scissors className="w-3.5 h-3.5 text-purple-300" />
                    <span>3mm Crop & Bleed Registration</span>
                  </span>
                  <span className="font-mono text-[10px] uppercase">{showCropBleed ? 'Active' : 'Off'}</span>
                </button>

                {/* Grid Overlay Toggle */}
                <button
                  onClick={() => {
                    soundEngine.playTick();
                    setShowGrid(!showGrid);
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-nav transition-all ${
                    showGrid
                      ? 'bg-purple-950/60 border-purple-400 text-white'
                      : 'bg-[#0e101f] border-purple-500/15 text-slate-400'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Grid className="w-3.5 h-3.5 text-cyan-300" />
                    <span>Mathematical 12-Col Grid Reticle</span>
                  </span>
                  <span className="font-mono text-[10px] uppercase">{showGrid ? 'Active' : 'Off'}</span>
                </button>
              </div>
            </div>

            {/* 4. Live Preflight Telemetry Specs */}
            <div className="p-5 sm:p-6 rounded-3xl bg-[#090a14] border border-purple-500/20 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-project-label text-purple-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Heidelberg Press Preflight Specs</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  PASSED
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="p-2.5 rounded-xl bg-[#0d0e1b] border border-purple-500/10">
                  <span className="text-slate-500 block text-[9.5px]">CANVAS DIMENSIONS</span>
                  <span className="text-slate-200 font-semibold">{activeProject.dimensions}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#0d0e1b] border border-purple-500/10">
                  <span className="text-slate-500 block text-[9.5px]">OUTPUT RESOLUTION</span>
                  <span className="text-purple-300 font-semibold">300 DPI Press</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#0d0e1b] border border-purple-500/10">
                  <span className="text-slate-500 block text-[9.5px]">BEZIER CONTINUITY</span>
                  <span className="text-slate-200 font-semibold">{activeProject.vectorNodes} Nodes</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#0d0e1b] border border-purple-500/10">
                  <span className="text-slate-500 block text-[9.5px]">ESTIMATED CMYK DENSITY</span>
                  <span className="text-cyan-300 font-semibold">
                    C:{activeProject.cmykValues.c} M:{activeProject.cmykValues.m} Y:{activeProject.cmykValues.y}
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
