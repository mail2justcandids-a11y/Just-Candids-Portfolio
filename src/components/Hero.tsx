import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Camera, Palette, Sparkles, ArrowRight, ArrowDown, Zap, Sliders, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/soundEngine';
import { PortfolioTab } from '../types';

interface HeroProps {
  activeTab: PortfolioTab;
  onOpenBooking: () => void;
  onExplorePhotography: () => void;
  onExploreDesign: () => void;
  onExploreDarkroom?: () => void;
  onExploreToolkit?: () => void;
  onExploreVectorLab?: () => void;
}

type StudioMood = 'royal' | 'golden' | 'emerald' | 'noir';

const MOODS: Record<StudioMood, {
  name: string;
  gradient: string;
  accent: string;
  glow: string;
  badgeBg: string;
  confettiColors: string[];
}> = {
  royal: {
    name: 'Cyber Royal',
    gradient: 'radial-gradient(135% 95% at var(--spot-x, 50%) var(--spot-y, 10%), #8f05ff 0%, #6f00e6 28%, #440092 52%, #190038 78%, #050508 100%)',
    accent: '#a855f7',
    glow: 'rgba(143, 5, 255, 0.45)',
    badgeBg: 'bg-purple-950/70 border-purple-500/40 text-purple-300',
    confettiColors: ['#8f05ff', '#a855f7', '#c084fc', '#e9d5ff'],
  },
  golden: {
    name: 'Golden Hour',
    gradient: 'radial-gradient(135% 95% at var(--spot-x, 50%) var(--spot-y, 10%), #d95300 0%, #aa3900 28%, #6d1f00 52%, #260a00 78%, #050508 100%)',
    accent: '#f59e0b',
    glow: 'rgba(217, 83, 0, 0.45)',
    badgeBg: 'bg-amber-950/70 border-amber-500/40 text-amber-300',
    confettiColors: ['#d95300', '#f59e0b', '#fbbf24', '#fef3c7'],
  },
  emerald: {
    name: 'Prism Cyan',
    gradient: 'radial-gradient(135% 95% at var(--spot-x, 50%) var(--spot-y, 10%), #00a896 0%, #028090 28%, #004b6e 52%, #031c36 78%, #050508 100%)',
    accent: '#06b6d4',
    glow: 'rgba(0, 168, 150, 0.45)',
    badgeBg: 'bg-cyan-950/70 border-cyan-500/40 text-cyan-300',
    confettiColors: ['#00a896', '#028090', '#06b6d4', '#cffafe'],
  },
  noir: {
    name: 'Silver Noir',
    gradient: 'radial-gradient(135% 95% at var(--spot-x, 50%) var(--spot-y, 10%), #52525b 0%, #3f3f46 28%, #27272a 52%, #18181b 78%, #050508 100%)',
    accent: '#cbd5e1',
    glow: 'rgba(161, 161, 170, 0.35)',
    badgeBg: 'bg-zinc-900/80 border-zinc-600/40 text-zinc-300',
    confettiColors: ['#ffffff', '#cbd5e1', '#94a3b8', '#52525b'],
  },
};

export const Hero: React.FC<HeroProps> = ({
  activeTab,
  onOpenBooking,
  onExplorePhotography,
  onExploreDesign,
  onExploreDarkroom,
  onExploreToolkit,
  onExploreVectorLab,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMood, setActiveMood] = useState<StudioMood>('royal');
  const [isFlashing, setIsFlashing] = useState(false);
  const [flashMessage, setFlashMessage] = useState<string | null>(null);

  const isDesign = activeTab === 'graphic-design';

  // High-performance 3D Parallax Mouse Physics
  const rawMouseX = useMotionValue(50);
  const rawMouseY = useMotionValue(20);

  const springX = useSpring(rawMouseX, { stiffness: 140, damping: 22 });
  const springY = useSpring(rawMouseY, { stiffness: 140, damping: 22 });

  // 3D Tilt angles for Siva's cutout
  const portraitRotateY = useTransform(springX, [0, 100], [-7, 7]);
  const portraitRotateX = useTransform(springY, [0, 100], [5, -5]);
  const portraitTranslateX = useTransform(springX, [0, 100], [-8, 8]);

  // Dynamic light position
  const spotX = useTransform(springX, (val) => `${val}%`);
  const spotY = useTransform(springY, (val) => `${val}%`);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const yPct = ((e.clientY - rect.top) / rect.height) * 100;
    rawMouseX.set(Math.min(Math.max(xPct, 10), 90));
    rawMouseY.set(Math.min(Math.max(yPct, 10), 90));
  };

  const handleMouseLeave = () => {
    rawMouseX.set(50);
    rawMouseY.set(20);
  };

  // Interactive Shutter Flash Trigger with Dual Celebratory Poppers & Mechanical Audio
  const triggerShutterFlash = () => {
    soundEngine.playMechanicalShutter();
    setIsFlashing(true);
    setFlashMessage(
      isDesign
        ? '✦ Vector Artboard Rendered in 300 DPI!'
        : '📸 4K RAW Candid Captured • 1/250s ƒ/1.4 ISO 100'
    );

    try {
      const colors = isDesign
        ? ['#c084fc', '#a855f7', '#e879f9', '#ffd700', '#ffffff', '#38bdf8']
        : ['#ffd700', '#f59e0b', '#d4af37', '#fef08a', '#fbbf24', '#ffffff', '#ffedd5'];

      // Left celebratory cannon
      confetti({
        particleCount: 75,
        angle: 60,
        spread: 65,
        origin: { x: 0.1, y: 0.7 },
        colors,
      });

      // Right celebratory cannon
      confetti({
        particleCount: 75,
        angle: 120,
        spread: 65,
        origin: { x: 0.9, y: 0.7 },
        colors,
      });

      // Center high-burst golden fireworks
      confetti({
        particleCount: 90,
        spread: 100,
        origin: { x: 0.5, y: 0.45 },
        colors,
      });
    } catch (err) {
      // Ignore
    }

    setTimeout(() => setIsFlashing(false), 380);
    setTimeout(() => setFlashMessage(null), 3200);
  };

  const currentTheme = MOODS[activeMood];

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] lg:min-h-screen pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20 flex items-center overflow-hidden w-full transition-colors duration-700 select-none"
      style={{
        background: currentTheme.gradient,
        ['--spot-x' as any]: spotX.get(),
        ['--spot-y' as any]: spotY.get(),
      }}
    >
      {/* Interactive Camera Shutter Flash Overlay */}
      <AnimatePresence>
        {isFlashing && (
          <motion.div
            initial={{ opacity: 0.95 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.38, ease: 'easeOut' }}
            className="absolute inset-0 bg-white z-50 pointer-events-none mix-blend-screen"
          />
        )}
      </AnimatePresence>

      {/* Floating Flash Toast Notification */}
      <AnimatePresence>
        {flashMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-4 sm:px-5 py-2.5 rounded-full bg-[#0a0b14]/95 border border-purple-500/40 text-purple-200 text-xs font-semibold shadow-2xl backdrop-blur-xl flex items-center gap-2"
          >
            <Zap className="w-3.5 h-3.5 text-purple-400 animate-bounce shrink-0" />
            <span>{flashMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1560px] 2xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 relative z-20 w-full overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full min-w-0">

          {/* Left Column: Headline, Bio & CTAs (6 cols) */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start w-full min-w-0 max-w-full">

            {/* Mode-Sensitive Status Pill */}
            <div className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full border text-[10.5px] sm:text-xs font-semibold tracking-wide backdrop-blur-md shadow-lg leading-normal max-w-[calc(100vw-40px)] sm:max-w-full overflow-hidden transition-all duration-500 ${currentTheme.badgeBg}`}>
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500 shadow-sm shadow-purple-400" />
              </span>
              <span className="truncate">
                {isDesign
                  ? 'Siva Subramaniyam • Brand Identity & Graphic Design'
                  : 'Just Candids by Siva Subramaniyam • Unscripted Visual Storytelling'}
              </span>
            </div>

            {/* Main Headline Block */}
            <div className="space-y-3.5 sm:space-y-4 w-full flex flex-col items-center lg:items-start min-w-0">
              <div className="inline-flex items-center gap-2 bg-purple-950/50 px-3.5 py-1.5 rounded-2xl border border-purple-500/30 backdrop-blur-md shadow-sm">
                <img
                  src="/just-candids-logo.png"
                  alt="Just Candids Official Logo"
                  className="h-6 sm:h-7.5 md:h-8 w-auto object-contain filter drop-shadow-[0_0_15px_rgba(168,85,247,0.45)]"
                />
              </div>

              {/* Mode-Sensitive Headline */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.4rem] font-hero-title tracking-tight text-white leading-[1.05] break-words [text-wrap:balance] max-w-full">
                {isDesign ? (
                  <>
                    <span>Bespoke Identity.</span>{' '}
                    <span className="font-hero-italic bg-gradient-to-r from-purple-200 via-pink-200 to-amber-200 bg-clip-text text-transparent glow-text block mt-1">
                      Visual Precision.
                    </span>
                  </>
                ) : (
                  <>
                    <span>Unposed Moments.</span>{' '}
                    <span className="font-hero-italic bg-gradient-to-r from-purple-200 via-pink-200 to-amber-200 bg-clip-text text-transparent glow-text block mt-1">
                      Pure Emotion.
                    </span>
                  </>
                )}
              </h1>

              {/* Mode-Sensitive Intro Copy */}
              <p className="font-body text-sm sm:text-base lg:text-lg text-slate-200 max-w-xl font-normal leading-relaxed mx-auto lg:mx-0 [text-wrap:pretty]">
                {isDesign ? (
                  <>
                    Hi, I'm <strong className="text-white font-medium">Siva Subramaniyam</strong>. I craft distinctive brand identities, official commemorative certificates, social media marketing creatives, and editorial typography using Adobe Photoshop & Illustrator.
                  </>
                ) : (
                  <>
                    Hi, I'm <strong className="text-white font-medium">Siva Subramaniyam</strong>, the creative eye behind <strong className="text-purple-300 font-medium">Just Candids</strong>. I capture authentic, unscripted human stories, candid moments, and celebration atmospheres on Canon EOS R10 RAW captures.
                  </>
                )}
              </p>
            </div>

            {/* Mode-Sensitive Direct Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 pt-2 w-full max-w-md sm:max-w-none">
              {isDesign ? (
                <>
                  {/* Design Mode Buttons */}
                  <button
                    onClick={() => {
                      soundEngine.playFocusBeep();
                      onOpenBooking();
                    }}
                    className="liquid-cta-button group relative inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-nav font-medium text-xs sm:text-sm tracking-wide text-white overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] select-none"
                  >
                    <Sparkles className="w-4 h-4 text-purple-100 shrink-0 animate-pulse" />
                    <span>Commission Design</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0 text-purple-200" />
                  </button>

                  <button
                    onClick={() => {
                      soundEngine.playQuickSnap();
                      onExploreDesign();
                    }}
                    className="liquid-glass-track inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full font-nav font-medium text-xs sm:text-sm tracking-wide text-white hover:bg-white/[0.12] hover:border-white/40 transition-all hover:scale-[1.03] active:scale-[0.98] select-none"
                  >
                    <Palette className="w-4 h-4 text-fuchsia-300 shrink-0 filter drop-shadow-[0_0_6px_rgba(244,114,182,0.8)]" />
                    <span>Explore Design Works</span>
                    <ArrowDown className="w-3.5 h-3.5 text-purple-300/80 shrink-0" />
                  </button>

                  {onExploreVectorLab && (
                    <button
                      onClick={() => {
                        soundEngine.playDialClick();
                        onExploreVectorLab();
                      }}
                      className="liquid-glass-track inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 rounded-full font-nav font-medium text-xs sm:text-sm tracking-wide text-white hover:bg-white/[0.12] hover:border-white/40 transition-all hover:scale-[1.03] active:scale-[0.98] select-none"
                    >
                      <Layers className="w-4 h-4 text-purple-300 shrink-0" />
                      <span>Vector Studio Lab</span>
                    </button>
                  )}
                </>
              ) : (
                <>
                  {/* Photography Mode Buttons */}
                  <button
                    onClick={() => {
                      soundEngine.playFocusBeep();
                      onOpenBooking();
                    }}
                    className="liquid-cta-button group relative inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-nav font-medium text-xs sm:text-sm tracking-wide text-white overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] select-none"
                  >
                    <Sparkles className="w-4 h-4 text-purple-100 shrink-0 animate-pulse" />
                    <span>Book a Session</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0 text-purple-200" />
                  </button>

                  <button
                    onClick={() => {
                      soundEngine.playQuickSnap();
                      onExplorePhotography();
                    }}
                    className="liquid-glass-track inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full font-nav font-medium text-xs sm:text-sm tracking-wide text-white hover:bg-white/[0.12] hover:border-white/40 transition-all hover:scale-[1.03] active:scale-[0.98] select-none"
                  >
                    <Camera className="w-4 h-4 text-purple-300 shrink-0 filter drop-shadow-[0_0_6px_rgba(192,132,252,0.8)]" />
                    <span>Explore Candids</span>
                    <ArrowDown className="w-3.5 h-3.5 text-purple-300/80 shrink-0" />
                  </button>

                  {onExploreDarkroom && (
                    <button
                      onClick={() => {
                        soundEngine.playDialClick();
                        onExploreDarkroom();
                      }}
                      className="liquid-glass-track inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 rounded-full font-nav font-medium text-xs sm:text-sm tracking-wide text-white hover:bg-white/[0.12] hover:border-white/40 transition-all hover:scale-[1.03] active:scale-[0.98] select-none"
                    >
                      <Sliders className="w-4 h-4 text-purple-300 shrink-0" />
                      <span>Digital Darkroom</span>
                    </button>
                  )}
                </>
              )}
            </div>

            {/* Studio Lighting Mood Selector & Shutter Trigger */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 w-full max-w-full">
              <div className="flex flex-col sm:flex-row items-center gap-2 max-w-full">
                <span className="text-[10px] sm:text-[11px] font-project-label text-purple-300/90 font-medium shrink-0">
                  {isDesign ? 'Design Mood:' : 'Studio Lighting:'}
                </span>

                <div className="liquid-glass-track flex items-center gap-1 p-1 rounded-xl max-w-full overflow-x-auto no-scrollbar">
                  {(Object.keys(MOODS) as StudioMood[]).map((key) => {
                    const mood = MOODS[key];
                    const isSelected = activeMood === key;
                    return (
                      <button
                        key={key}
                        onClick={() => {
                          soundEngine.playDialClick();
                          setActiveMood(key);
                        }}
                        className={`px-2 sm:px-2.5 py-1 rounded-lg text-[9.5px] sm:text-[11px] font-nav font-medium tracking-wide transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap ${isSelected
                          ? 'bg-white text-black font-semibold shadow-md shadow-white/20'
                          : 'text-slate-300 hover:text-white hover:bg-white/10'
                          }`}
                      >
                        <span
                          className="w-2 h-2 rounded-full shrink-0 shadow-sm"
                          style={{ backgroundColor: mood.accent }}
                        />
                        <span>{mood.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Prominent High-Speed Studio Shutter & Popper Trigger Button */}
              <button
                onClick={triggerShutterFlash}
                className={`group relative inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-nav font-bold tracking-wide transition-all active:scale-95 shadow-xl shrink-0 select-none cursor-pointer border ${
                  isDesign
                    ? 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 hover:from-purple-500 hover:to-fuchsia-500 text-white border-purple-400/70 shadow-purple-600/40 hover:shadow-purple-500/60'
                    : 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-black border-amber-200 shadow-amber-500/40 hover:shadow-amber-400/60'
                }`}
                title={isDesign ? "Click to trigger creative vector glow & celebratory poppers!" : "Click to fire high-speed studio flash & celebratory poppers!"}
              >
                {/* Live Shutter Indicator Light */}
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    isDesign ? 'bg-fuchsia-300' : 'bg-black'
                  }`} />
                  <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                    isDesign ? 'bg-white' : 'bg-black'
                  }`} />
                </span>

                <Zap className={`w-4 h-4 group-hover:scale-110 transition-transform filter ${
                  isDesign ? 'text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]' : 'text-black'
                }`} />

                <span className="font-semibold tracking-wide">
                  {isDesign ? 'Trigger Vector Glow' : 'Snap 4K Flash'}
                </span>

                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider ${
                  isDesign ? 'bg-white/20 text-white' : 'bg-black/20 text-black'
                }`}>
                  Poppers! 📸
                </span>
              </button>
            </div>

          </div>

          {/* Right Column: Siva's Portrait with 3D Parallax & Depth (6 cols) */}
          <div className="lg:col-span-6 relative flex items-end justify-center lg:justify-end w-full pt-4 lg:pt-0 perspective-[1000px] min-w-0 max-w-full overflow-visible">
            <motion.div
              style={{
                rotateY: portraitRotateY,
                rotateX: portraitRotateX,
                x: portraitTranslateX,
                transformStyle: 'preserve-3d',
              }}
              className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl flex items-end justify-center transition-transform duration-100 ease-out"
            >
              {/* Dynamic Soft Key-Light Glow behind Siva's Head/Shoulders */}
              <motion.div
                animate={{
                  backgroundColor: currentTheme.accent,
                  opacity: 0.28,
                }}
                transition={{ duration: 0.6 }}
                className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 rounded-full pointer-events-none -z-10 blur-[85px]"
              />

              {/* Siva's Portrait Cutout - Solid Sharp Torso with Clean Micro-Blend at Base */}
              <picture
                className="relative z-10 w-full flex items-end justify-center cursor-pointer"
                onClick={triggerShutterFlash}
                title={isDesign ? "Click for creative vector glow" : "Click to trigger studio flash"}
              >
                <source srcSet="/images/siva-cutout@2x.png 2x, /images/siva-cutout.png 1x" type="image/png" />
                <img
                  src="/images/siva-cutout.png"
                  alt="Siva Subramaniyam - Just Candids"
                  style={{
                    WebkitMaskImage: 'linear-gradient(to bottom, black 95%, transparent 100%)',
                    maskImage: 'linear-gradient(to bottom, black 95%, transparent 100%)',
                  }}
                  className="w-full max-h-[480px] sm:max-h-[580px] lg:max-h-[660px] object-contain object-bottom pointer-events-none"
                />
              </picture>

              {/* Interactive Viewfinder Shutter HUD Badge on Portrait */}
              <button
                onClick={triggerShutterFlash}
                className={`absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 group inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/85 hover:bg-black text-white shadow-2xl backdrop-blur-md text-[10.5px] sm:text-xs font-mono tracking-wider transition-all hover:scale-105 active:scale-95 cursor-pointer border ${
                  isDesign
                    ? 'border-purple-400/60 hover:border-fuchsia-300 shadow-purple-500/30'
                    : 'border-amber-400/60 hover:border-amber-300 shadow-amber-500/30'
                }`}
                title={isDesign ? "Click to trigger creative vector glow & poppers" : "Click to fire studio shutter flash & poppers"}
              >
                <span className={`w-2 h-2 rounded-full animate-pulse shadow-sm ${
                  isDesign ? 'bg-fuchsia-400 shadow-fuchsia-400' : 'bg-amber-400 shadow-amber-400'
                }`} />
                <span className={`font-bold ${isDesign ? 'text-purple-200 group-hover:text-white' : 'text-amber-200 group-hover:text-amber-100'}`}>
                  {isDesign ? '✦ CLICK TO GLOW' : '📸 CLICK TO SNAP'}
                </span>
              </button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
