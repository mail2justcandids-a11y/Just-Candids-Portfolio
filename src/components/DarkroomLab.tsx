import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Sliders,
  Sun,
  Contrast,
  Droplets,
  RotateCcw,
  Move,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Sparkles,
  RefreshCw,
  Eye,
} from 'lucide-react';
import { PHOTOGRAPHY_WORKS } from '../data/portfolioData';
import { soundEngine } from '../utils/soundEngine';

type ColorProfile = 'natural' | 'portra' | 'monochrome' | 'cinematic';
type FitMode = 'fit' | 'fill';

export const DarkroomLab: React.FC = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [profile, setProfile] = useState<ColorProfile>('natural');
  const [contrast, setContrast] = useState<number>(105);
  const [brightness, setBrightness] = useState<number>(100);
  const [saturate, setSaturate] = useState<number>(105);
  const [warmth, setWarmth] = useState<number>(0);

  // Move & Pan Tool State
  const [fitMode, setFitMode] = useState<FitMode>('fit');
  const [zoom, setZoom] = useState<number>(1.0);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ startX: number; startY: number; initialPanX: number; initialPanY: number }>({
    startX: 0,
    startY: 0,
    initialPanX: 0,
    initialPanY: 0,
  });

  // RAW vs Graded Split Comparison State
  const [isSplitMode, setIsSplitMode] = useState<boolean>(false);
  const [splitRatio, setSplitRatio] = useState<number>(50);
  const isDraggingSplit = useRef<boolean>(false);

  const filmstripRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  const photo = PHOTOGRAPHY_WORKS[selectedPhotoIndex];
  const totalFrames = PHOTOGRAPHY_WORKS.length;
  const isMonochromeCapture = ['siva-frame-06', 'siva-frame-07', 'siva-frame-17'].includes(photo.id);

  // Auto-scroll active thumbnail into view in filmstrip container only (never scrolls the main window)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (filmstripRef.current) {
      const activeThumb = filmstripRef.current.children[selectedPhotoIndex] as HTMLElement;
      if (activeThumb) {
        const container = filmstripRef.current;
        const thumbLeft = activeThumb.offsetLeft;
        const thumbWidth = activeThumb.offsetWidth;
        const containerWidth = container.offsetWidth;
        const targetScrollLeft = thumbLeft - containerWidth / 2 + thumbWidth / 2;
        container.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
      }
    }
  }, [selectedPhotoIndex]);

  // Reset pan and zoom when changing photo or fit mode
  const handleSelectPhoto = (idx: number) => {
    soundEngine.playQuickSnap();
    setSelectedPhotoIndex(idx);
    setPan({ x: 0, y: 0 });
    setZoom(1.0);
  };

  const handlePrevPhoto = () => {
    const prev = (selectedPhotoIndex - 1 + totalFrames) % totalFrames;
    handleSelectPhoto(prev);
  };

  const handleNextPhoto = () => {
    const next = (selectedPhotoIndex + 1) % totalFrames;
    handleSelectPhoto(next);
  };

  const handleFirstPhoto = () => {
    handleSelectPhoto(0);
  };

  const handleLastPhoto = () => {
    handleSelectPhoto(totalFrames - 1);
  };

  const handleResetPanZoom = () => {
    soundEngine.playTick();
    setPan({ x: 0, y: 0 });
    setZoom(1.0);
  };

  const handleToggleFitMode = () => {
    soundEngine.playDialClick();
    const nextMode = fitMode === 'fit' ? 'fill' : 'fit';
    setFitMode(nextMode);
    setPan({ x: 0, y: 0 });
    setZoom(nextMode === 'fill' ? 1.2 : 1.0);
  };

  const handleZoomIn = () => {
    soundEngine.playTick();
    setZoom((prev) => Math.min(3.0, +(prev + 0.25).toFixed(2)));
  };

  const handleZoomOut = () => {
    soundEngine.playTick();
    setZoom((prev) => Math.max(0.75, +(prev - 0.25).toFixed(2)));
  };

  // Drag-to-Pan Handlers (Mouse & Touch)
  const handleSplitMove = useCallback(
    (clientX: number) => {
      if (!isDraggingSplit.current || !viewportRef.current) return;
      const rect = viewportRef.current.getBoundingClientRect();
      const relativeX = clientX - rect.left;
      const pct = Math.max(5, Math.min(95, Math.round((relativeX / rect.width) * 100)));
      setSplitRatio(pct);
    },
    []
  );

  useEffect(() => {
    const handleWindowMouseMove = (e: MouseEvent) => {
      if (isDraggingSplit.current) {
        handleSplitMove(e.clientX);
      }
    };
    const handleWindowMouseUp = () => {
      isDraggingSplit.current = false;
    };
    const handleWindowTouchMove = (e: TouchEvent) => {
      if (isDraggingSplit.current && e.touches.length > 0) {
        handleSplitMove(e.touches[0].clientX);
      }
    };
    const handleWindowTouchEnd = () => {
      isDraggingSplit.current = false;
    };

    window.addEventListener('mousemove', handleWindowMouseMove);
    window.addEventListener('mouseup', handleWindowMouseUp);
    window.addEventListener('touchmove', handleWindowTouchMove);
    window.addEventListener('touchend', handleWindowTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('mouseup', handleWindowMouseUp);
      window.removeEventListener('touchmove', handleWindowTouchMove);
      window.removeEventListener('touchend', handleWindowTouchEnd);
    };
  }, [handleSplitMove]);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialPanX: pan.x,
      initialPanY: pan.y,
    };
  };

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStartRef.current.startX;
      const dy = e.clientY - dragStartRef.current.startY;
      setPan({
        x: Math.round(dragStartRef.current.initialPanX + dx),
        y: Math.round(dragStartRef.current.initialPanY + dy),
      });
    },
    [isDragging]
  );

  const onMouseUp = () => {
    setIsDragging(false);
  };

  // Touch support for mobile / tablet drag
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setIsDragging(true);
      dragStartRef.current = {
        startX: touch.clientX,
        startY: touch.clientY,
        initialPanX: pan.x,
        initialPanY: pan.y,
      };
    }
  };

  const onTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (!isDragging || e.touches.length !== 1) return;
      const touch = e.touches[0];
      const dx = touch.clientX - dragStartRef.current.startX;
      const dy = touch.clientY - dragStartRef.current.startY;
      setPan({
        x: Math.round(dragStartRef.current.initialPanX + dx),
        y: Math.round(dragStartRef.current.initialPanY + dy),
      });
    },
    [isDragging]
  );

  const onTouchEnd = () => {
    setIsDragging(false);
  };

  const applyPreset = (preset: ColorProfile) => {
    soundEngine.playApertureClick();
    setProfile(preset);
    switch (preset) {
      case 'natural':
        setContrast(105);
        setBrightness(100);
        setSaturate(105);
        setWarmth(0);
        break;
      case 'portra':
        setContrast(112);
        setBrightness(104);
        setSaturate(115);
        setWarmth(12);
        break;
      case 'monochrome':
        setContrast(130);
        setBrightness(98);
        setSaturate(0);
        setWarmth(0);
        break;
      case 'cinematic':
        setContrast(120);
        setBrightness(96);
        setSaturate(110);
        setWarmth(-8);
        break;
    }
  };

  const resetAllFilters = () => {
    soundEngine.playMechanicalShutter();
    applyPreset('natural');
    handleResetPanZoom();
  };

  const getComputedFilter = () => {
    return `contrast(${contrast}%) brightness(${brightness}%) saturate(${saturate}%) sepia(${Math.max(0, warmth)}%) hue-rotate(${warmth < 0 ? warmth * 2 : 0}deg)`;
  };

  return (
    <section
      id="darkroom"
      className="py-20 lg:py-28 relative overflow-hidden bg-[#050508] border-t border-purple-500/15 scroll-mt-28 lg:scroll-mt-32"
    >
      <div id="darkroom-lab" className="sr-only" aria-hidden="true" />
      <div className="max-w-[1560px] 2xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">

        {/* Section Header with Strict Neue Montreal & Cormorant Garamond */}
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-14 space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-semibold tracking-wide backdrop-blur-md">
            <Sliders className="w-3.5 h-3.5 text-purple-300" />
            <span className="font-project-label text-[11px]">JUST CANDIDS • Signature Color Lab</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-section-title text-white tracking-tight leading-tight [text-wrap:balance]">
            Just Candids Digital Darkroom
          </h2>

          <p className="font-body text-slate-300 text-sm sm:text-base leading-relaxed [text-wrap:pretty] max-w-2xl mx-auto">
            Explore the signature color grading profiles of Just Candids on real Canon EOS R10 RAW captures. Inspect dynamic range, contrast roll-off, and warmth grading in real time.
          </p>

          <p className="font-featured-statement text-purple-200/90 text-base sm:text-lg italic pt-1">
            “Every raw shadow and highlight tells the unscripted truth of that exact second.”
          </p>
        </div>

        {/* Simulator Studio Card in Deep Black & Royal Purple */}
        <div className="rounded-3xl bg-[#090a14] border border-purple-500/25 shadow-2xl p-4 sm:p-7 lg:p-8 shadow-purple-950/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-8 items-start">

            {/* Left Column: Interactive Move & Pan Viewport (7 cols) */}
            <div className="lg:col-span-7 space-y-4">

              {/* Viewport Toolbar HUD: Move Tool, Fit/Fill Toggle, Zoom, Reset */}
              <div className="flex flex-wrap items-center justify-between gap-2 bg-[#0c0d18] px-3.5 py-2.5 rounded-2xl border border-purple-500/20 text-xs">

                {/* Left: Active Tool Indicator */}
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-950/70 text-purple-300 border border-purple-500/30 font-medium">
                    <Move className="w-3.5 h-3.5 text-purple-400" />
                    <span className="font-['Neue_Montreal']">Move Tool Active</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                    Drag to pan every aspect
                  </span>
                </div>

                {/* Right: Split Mode Toggle, Fit Toggle, Zoom Controls, Reset */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {/* RAW vs Graded Split Slider Toggle */}
                  <button
                    onClick={() => {
                      soundEngine.playDialClick();
                      setIsSplitMode((prev) => !prev);
                    }}
                    title="Toggle RAW vs Graded Split Comparison"
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition-all ${
                      isSplitMode
                        ? 'bg-gradient-to-r from-amber-500 to-purple-600 text-white shadow-md shadow-purple-600/30'
                        : 'bg-[#121324] text-slate-300 hover:text-white border border-purple-500/20'
                    }`}
                  >
                    <Sliders className="w-3 h-3 text-amber-300" />
                    <span className="font-['Neue_Montreal'] text-xs font-semibold">
                      {isSplitMode ? 'Split: ON' : 'RAW vs Graded'}
                    </span>
                  </button>

                  {/* Fit Whole Photo vs Fill/Pan */}
                  <button
                    onClick={handleToggleFitMode}
                    title={fitMode === 'fit' ? 'Switch to Fill & Pan View' : 'Switch to Fit Whole Photo'}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition-all ${fitMode === 'fit'
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                      : 'bg-[#121324] text-slate-300 hover:text-white border border-purple-500/20'
                      }`}
                  >
                    {fitMode === 'fit' ? (
                      <>
                        <Maximize2 className="w-3 h-3 text-purple-200" />
                        <span className="font-['Neue_Montreal'] text-xs">Fit View</span>
                      </>
                    ) : (
                      <>
                        <Minimize2 className="w-3 h-3 text-purple-200" />
                        <span className="font-['Neue_Montreal'] text-xs">Pan View</span>
                      </>
                    )}
                  </button>

                  {/* Zoom Controls */}
                  <div className="flex items-center gap-0.5 bg-[#121324] rounded-lg border border-purple-500/20 p-0.5">
                    <button
                      onClick={handleZoomOut}
                      title="Zoom Out"
                      className="p-1 text-slate-400 hover:text-white rounded hover:bg-white/10 transition-colors"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-1.5 text-[11px] font-mono text-purple-300 min-w-[36px] text-center">
                      {Math.round(zoom * 100)}%
                    </span>
                    <button
                      onClick={handleZoomIn}
                      title="Zoom In"
                      className="p-1 text-slate-400 hover:text-white rounded hover:bg-white/10 transition-colors"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Center / Reset Position */}
                  <button
                    onClick={handleResetPanZoom}
                    title="Center Photo"
                    className="p-1.5 rounded-lg bg-[#121324] hover:bg-purple-950/50 text-slate-400 hover:text-purple-300 border border-purple-500/20 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Interactive Viewport Canvas */}
              <div
                ref={viewportRef}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                className={`relative w-full rounded-2xl overflow-hidden bg-[#030306] border border-purple-500/25 shadow-inner select-none ${photo.aspectRatio === 'portrait'
                  ? 'aspect-[4/3] sm:aspect-[14/11] lg:aspect-[4/3]'
                  : 'aspect-[16/10]'
                  } ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
              >
                {/* Subtle darkroom grid & matte guide */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.05)_0%,transparent_70%)] pointer-events-none" />

                {/* Ambient Illuminated Backdrop Fill to eliminate dead black side spaces */}
                {fitMode === 'fit' && (
                  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 filter blur-3xl scale-125 transition-all duration-300">
                    <img
                      src={photo.imageUrl}
                      alt=""
                      aria-hidden="true"
                      className="w-full h-full object-cover"
                      style={{ filter: getComputedFilter() }}
                    />
                    <div className="absolute inset-0 bg-[#050508]/50" />
                  </div>
                )}

                {/* Pannable & Zoomable Image Container */}
                <div
                  className="w-full h-full flex items-center justify-center transition-transform duration-75 ease-out relative z-10"
                  style={{
                    transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                    transformOrigin: 'center center',
                  }}
                >
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    draggable={false}
                    style={{
                      filter: getComputedFilter(),
                      objectFit: fitMode === 'fit' ? 'contain' : 'cover',
                      objectPosition:
                        photo.focalPoint ||
                        (photo.aspectRatio === 'portrait' ? 'center 22%' : 'center center'),
                    }}
                    className={`w-full h-full pointer-events-none transition-all duration-200 ${fitMode === 'fit' ? 'max-h-full max-w-full drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]' : ''
                      }`}
                  />
                </div>

                {/* RAW Sensor Overlay Layer (Split View Mode) */}
                {isSplitMode && (
                  <div
                    className="absolute inset-0 pointer-events-none z-20 overflow-hidden"
                    style={{
                      clipPath: `polygon(0 0, ${splitRatio}% 0, ${splitRatio}% 100%, 0 100%)`,
                    }}
                  >
                    <div
                      className="w-full h-full flex items-center justify-center transition-transform duration-75 ease-out"
                      style={{
                        transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                        transformOrigin: 'center center',
                      }}
                    >
                      <img
                        src={photo.imageUrl}
                        alt="Flat RAW Sensor"
                        draggable={false}
                        style={{
                          filter: 'contrast(88%) brightness(96%) saturate(78%) sepia(4%)',
                          objectFit: fitMode === 'fit' ? 'contain' : 'cover',
                          objectPosition:
                            photo.focalPoint ||
                            (photo.aspectRatio === 'portrait' ? 'center 22%' : 'center center'),
                        }}
                        className={`w-full h-full pointer-events-none transition-all duration-200 ${
                          fitMode === 'fit' ? 'max-h-full max-w-full drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]' : ''
                        }`}
                      />
                    </div>
                  </div>
                )}

                {/* Draggable Split Divider Line & Handle */}
                {isSplitMode && (
                  <div
                    className="absolute top-0 bottom-0 z-30 pointer-events-auto cursor-ew-resize flex items-center justify-center select-none group"
                    style={{ left: `${splitRatio}%`, transform: 'translateX(-50%)' }}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      isDraggingSplit.current = true;
                    }}
                    onTouchStart={(e) => {
                      e.stopPropagation();
                      isDraggingSplit.current = true;
                    }}
                  >
                    {/* Glowing Vertical Divider Line */}
                    <div className="w-[2px] h-full bg-gradient-to-b from-amber-400 via-white to-purple-400 shadow-[0_0_10px_rgba(255,255,255,0.9)]" />

                    {/* Draggable Center Knob */}
                    <div className="absolute w-8 h-8 rounded-full bg-black/90 border-2 border-white shadow-[0_4px_16px_rgba(0,0,0,0.95)] flex items-center justify-center text-xs text-white font-bold group-hover:scale-115 transition-transform backdrop-blur-md">
                      ⇄
                    </div>
                  </div>
                )}

                {/* Viewport Info Overlay Top Left */}
                <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 sm:gap-2 max-w-[70%] sm:max-w-[80%] pointer-events-none">
                  {isSplitMode ? (
                    <div className="flex items-center gap-2 bg-black/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-500/50 text-[10px] sm:text-[11px] font-mono text-amber-200 leading-none shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-sm shadow-amber-400" />
                      <span className="font-bold">RAW SENSOR (FLAT)</span>
                      <span className="text-slate-400">vs</span>
                      <span className="text-purple-300 font-bold">COLOR GRADED</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-purple-500/30 text-[10px] sm:text-[11px] font-mono text-white leading-none">
                      <span className="w-2 h-2 rounded-full bg-purple-400 shadow-sm shadow-purple-400" />
                      <span>JUST CANDIDS • {profile.toUpperCase()}</span>
                      <span className="text-purple-300/80 uppercase">({photo.aspectRatio})</span>
                    </div>
                  )}
                  {isMonochromeCapture && (
                    <div className="hidden sm:inline-flex items-center gap-1 bg-purple-950/85 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-purple-500/40 text-[10px] font-mono text-purple-200 leading-none">
                      <span>✦ B&W RAW Capture</span>
                    </div>
                  )}
                </div>

                {/* Move Coordinates Pill (Top Right) */}
                {(pan.x !== 0 || pan.y !== 0 || zoom !== 1.0) && (
                  <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-purple-500/30 text-[10px] font-mono text-purple-300 leading-none pointer-events-none">
                    X: {pan.x}px • Y: {pan.y}px • {Math.round(zoom * 100)}%
                  </div>
                )}

                {/* Camera EXIF Overlay at Bottom */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] sm:text-xs font-mono text-white bg-black/85 backdrop-blur-md px-3 sm:px-4 py-2 rounded-xl border border-purple-500/30 leading-none pointer-events-none">
                  <span className="truncate pr-2">{photo.camera} • {photo.lens}</span>
                  <span className="text-purple-300 font-bold shrink-0">
                    {photo.settings.aperture} • ISO {photo.settings.iso} • {photo.settings.shutter}
                  </span>
                </div>
              </div>

              {/* Arranger Bar: Steppers & First/Last Controls */}
              <div className="flex items-center justify-between gap-2 pt-1 text-xs">
                {/* Stepper Buttons */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleFirstPhoto}
                    title="Jump to First Frame (Frame 01)"
                    className="p-1.5 rounded-lg bg-[#0e0f1d] hover:bg-purple-950/50 text-slate-400 hover:text-white border border-purple-500/15 transition-colors flex items-center gap-1"
                  >
                    <ChevronsLeft className="w-4 h-4" />
                    <span className="text-[11px] font-['Neue_Montreal'] font-medium hidden sm:inline">First</span>
                  </button>

                  <button
                    onClick={handlePrevPhoto}
                    title="Previous Frame"
                    className="p-1.5 rounded-lg bg-[#0e0f1d] hover:bg-purple-950/50 text-slate-300 hover:text-white border border-purple-500/15 transition-colors flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="text-[11px] font-['Neue_Montreal'] font-medium">Prev</span>
                  </button>
                </div>

                {/* Current Frame Title & Counter */}
                <div className="text-center min-w-0 px-2">
                  <div className="text-[11px] sm:text-xs font-['Neue_Montreal'] font-medium text-white truncate max-w-[220px] sm:max-w-[340px]">
                    <span className="text-purple-400 font-bold mr-1">
                      Frame {String(selectedPhotoIndex + 1).padStart(2, '0')}:
                    </span>
                    {photo.title}
                  </div>
                  <div className="text-[10px] font-mono text-purple-300/70 uppercase">
                    {selectedPhotoIndex + 1} of {totalFrames} frames
                  </div>
                </div>

                {/* Stepper Buttons */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleNextPhoto}
                    title="Next Frame"
                    className="p-1.5 rounded-lg bg-[#0e0f1d] hover:bg-purple-950/50 text-slate-300 hover:text-white border border-purple-500/15 transition-colors flex items-center gap-1"
                  >
                    <span className="text-[11px] font-['Neue_Montreal'] font-medium">Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleLastPhoto}
                    title={`Jump to Last Frame (Frame ${String(totalFrames).padStart(2, '0')})`}
                    className="p-1.5 rounded-lg bg-[#0e0f1d] hover:bg-purple-950/50 text-slate-400 hover:text-white border border-purple-500/15 transition-colors flex items-center gap-1"
                  >
                    <span className="text-[11px] font-['Neue_Montreal'] font-medium hidden sm:inline">Last</span>
                    <ChevronsRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Complete Filmstrip Thumbnail Arranger (Frame 01 to Frame 12) */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-project-label text-purple-300/80">
                    Arrange & Inspect All Frames (01 - {String(totalFrames).padStart(2, '0')}):
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    Click any frame to inspect
                  </span>
                </div>

                <div
                  ref={filmstripRef}
                  className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-2 pt-1"
                >
                  {PHOTOGRAPHY_WORKS.map((item, idx) => {
                    const isSelected = selectedPhotoIndex === idx;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelectPhoto(idx)}
                        className={`group relative shrink-0 rounded-xl overflow-hidden transition-all duration-200 text-left ${isSelected
                          ? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-[#090a14] scale-105 shadow-lg shadow-purple-600/40'
                          : 'opacity-65 hover:opacity-100 hover:scale-[1.02] border border-purple-500/20'
                          }`}
                        style={{ width: '84px' }}
                      >
                        <div className="w-full h-14 bg-black/80 relative overflow-hidden">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                          <span className="absolute bottom-1 left-1.5 text-[9px] font-mono text-white font-bold bg-black/70 px-1 rounded">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <div
                          className={`p-1 text-[10px] font-['Neue_Montreal'] truncate leading-tight ${isSelected ? 'bg-purple-900/80 text-white font-medium' : 'bg-[#0c0d18] text-slate-400'
                            }`}
                        >
                          Frame {String(idx + 1).padStart(2, '0')}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Column: Color Grading Controls & Presets (5 cols) */}
            <div className="lg:col-span-5 space-y-5 sm:space-y-6 bg-[#0c0d18]/90 p-4 sm:p-6 rounded-2xl border border-purple-500/15">

              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-section-title text-white tracking-tight">
                  Color Grading Controls
                </h3>
                <button
                  onClick={resetAllFilters}
                  className="flex items-center gap-1.5 text-xs font-mono tracking-wide text-slate-400 hover:text-purple-300 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All</span>
                </button>
              </div>

              {/* Signature Film Profiles Grid */}
              <div className="space-y-2">
                <label className="text-xs font-project-label text-purple-300/80">
                  Signature Film Profiles:
                </label>
                <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                  {[
                    { id: 'natural', label: 'Natural Clean', desc: 'True-to-life tones' },
                    { id: 'portra', label: 'Kodak Portra', desc: 'Warm flattering skin' },
                    { id: 'monochrome', label: 'Silver B&W', desc: 'High-contrast grain' },
                    { id: 'cinematic', label: 'Teal & Orange', desc: 'Moody contrast' },
                  ].map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => applyPreset(preset.id as ColorProfile)}
                      className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all ${profile === preset.id
                        ? 'bg-purple-950/70 border-purple-500/60 text-purple-200 shadow-md shadow-purple-900/30'
                        : 'bg-[#0f101d] border-purple-500/10 text-slate-400 hover:text-white hover:border-purple-500/30'
                        }`}
                    >
                      <div className="text-xs font-['Neue_Montreal'] font-medium text-white tracking-wide leading-tight truncate">
                        {preset.label}
                      </div>
                      <div className="text-[10px] font-['Neue_Montreal'] text-slate-400 leading-snug mt-1 truncate">
                        {preset.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Manual Adjustment Sliders with Strict Numeric Alignment */}
              <div className="space-y-3.5 pt-2 border-t border-purple-500/15 text-xs font-mono">

                {/* Contrast */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-slate-300 tracking-wide font-['Neue_Montreal']">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Contrast className="w-3.5 h-3.5 text-purple-400" />
                      Contrast
                    </span>
                    <span className="text-purple-300 font-semibold font-mono tabular-nums">{contrast}%</span>
                  </div>
                  <input
                    type="range"
                    min="80"
                    max="160"
                    value={contrast}
                    onChange={(e) => setContrast(Number(e.target.value))}
                    className="w-full accent-purple-500 bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Brightness */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-slate-300 tracking-wide font-['Neue_Montreal']">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Sun className="w-3.5 h-3.5 text-purple-400" />
                      Exposure
                    </span>
                    <span className="text-purple-300 font-semibold font-mono tabular-nums">{brightness}%</span>
                  </div>
                  <input
                    type="range"
                    min="70"
                    max="130"
                    value={brightness}
                    onChange={(e) => setBrightness(Number(e.target.value))}
                    className="w-full accent-purple-500 bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Saturation */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-slate-300 tracking-wide font-['Neue_Montreal']">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Droplets className="w-3.5 h-3.5 text-purple-400" />
                      Saturation
                    </span>
                    <span className="text-purple-300 font-semibold font-mono tabular-nums">{saturate}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="180"
                    value={saturate}
                    onChange={(e) => setSaturate(Number(e.target.value))}
                    className="w-full accent-purple-500 bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
