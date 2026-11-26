import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Sparkles, Check, Crosshair } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface MiniCameramanProps {
  isTriggered: boolean;
  onSnap: () => void;
}

export const MiniCameraman: React.FC<MiniCameramanProps> = ({ isTriggered, onSnap }) => {
  const [isAiming, setIsAiming] = useState(false);
  const [cameramanState, setCameramanState] = useState<'idle' | 'focusing' | 'snapping' | 'celebrating'>('idle');
  const [speechText, setSpeechText] = useState<string>('Dialing 85mm ƒ/1.4...');
  const [showPolaroid, setShowPolaroid] = useState(false);

  // Periodic idle behavior: cameraman checks exposure, twists lens, looks through viewfinder
  useEffect(() => {
    if (cameramanState === 'snapping' || cameramanState === 'celebrating') return;

    const phrases = [
      'Dialing 85mm ƒ/1.4...',
      'Adjusting ISO 100...',
      'Checking focal plane...',
      'Setting shutter 1/500s...',
      'Ready for the shot!',
    ];

    const interval = setInterval(() => {
      setCameramanState((prev) => (prev === 'idle' ? 'focusing' : 'idle'));
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      setSpeechText(randomPhrase);
    }, 4000);

    return () => clearInterval(interval);
  }, [cameramanState]);

  // Handle external snap trigger (e.g. Snap Flash button clicked in Hero)
  useEffect(() => {
    if (isTriggered) {
      handleSnapAction();
    }
  }, [isTriggered]);

  const handleSnapAction = () => {
    setCameramanState('snapping');
    setSpeechText('Say Cheese! 📸');
    setIsAiming(true);

    // After quick aim, trigger flash & pop polaroid
    setTimeout(() => {
      setShowPolaroid(true);
      setCameramanState('celebrating');
      setSpeechText('Picture Perfect! ✨');
    }, 450);

    // Return to idle after celebration
    setTimeout(() => {
      setShowPolaroid(false);
      setIsAiming(false);
      setCameramanState('idle');
      setSpeechText('Ready for next shot!');
    }, 3600);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playQuickSnap();
    onSnap();
    handleSnapAction();
  };

  return (
    <div
      onClick={handleClick}
      className="group relative cursor-pointer select-none filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
      title="Click the cameraman to snap a photo!"
    >
      {/* Speech / Status Bubble */}
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="absolute -top-12 left-1/2 -translate-x-1/2 z-30 whitespace-nowrap"
      >
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0d0e1a]/95 border border-purple-500/50 shadow-xl backdrop-blur-md text-[10px] sm:text-[11px] font-mono text-purple-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
          <span className="font-medium text-white">{speechText}</span>
        </div>
        {/* Tiny downward triangle pointer */}
        <div className="w-2 h-2 bg-[#0d0e1a] border-r border-b border-purple-500/50 rotate-45 mx-auto -mt-1" />
      </motion.div>

      {/* Crosshair Viewfinder Laser when Aiming */}
      <AnimatePresence>
        {isAiming && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: [0.9, 1.1, 1] }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -top-16 -right-16 z-40 pointer-events-none flex items-center justify-center"
          >
            <div className="relative w-16 h-16 flex items-center justify-center">
              <Crosshair className="w-12 h-12 text-emerald-400 animate-spin text-opacity-80" />
              <span className="absolute text-[8px] font-mono text-emerald-300 font-bold tracking-tighter bg-black/80 px-1 py-0.5 rounded">
                [AF-LOCK]
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Mini Polaroid Ejected on Flash */}
      <AnimatePresence>
        {showPolaroid && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.3, rotate: -15 }}
            animate={{ opacity: 1, y: -80, scale: 1, rotate: -6 }}
            exit={{ opacity: 0, y: -120, scale: 0.8, rotate: 10 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            className="absolute -top-24 -left-10 z-50 pointer-events-none w-28 sm:w-32 p-2 bg-white rounded-lg shadow-2xl border border-slate-200 text-slate-900"
          >
            <div className="w-full h-20 sm:h-24 bg-gradient-to-tr from-purple-900 via-purple-700 to-amber-500 rounded overflow-hidden relative flex items-center justify-center">
              <img
                src="/just-candids-mark.png"
                alt="Captured"
                className="w-10 h-10 object-contain drop-shadow-md"
              />
              <span className="absolute bottom-1 right-1 text-[7px] font-mono text-white/90 bg-black/50 px-1 rounded">
                RAW 4K
              </span>
            </div>
            <div className="mt-1.5 flex items-center justify-between text-[8px] font-mono text-slate-600 font-bold">
              <span>JUST CANDIDS</span>
              <span>#001</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flash Head Pulse Ring when Triggered */}
      <AnimatePresence>
        {cameramanState === 'snapping' && (
          <motion.div
            initial={{ opacity: 1, scale: 0.2 }}
            animate={{ opacity: 0, scale: 2.8 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="absolute top-8 right-6 w-16 h-16 rounded-full bg-white pointer-events-none z-40 blur-[4px] mix-blend-screen"
          />
        )}
      </AnimatePresence>

      {/* Stylized Miniature Cameraman SVG Character */}
      <motion.div
        animate={
          cameramanState === 'snapping'
            ? { scale: [1, 1.08, 1], y: [0, -6, 0] }
            : cameramanState === 'focusing'
            ? { rotate: [-1, 2, -1], y: [0, -2, 0] }
            : { y: [0, -3, 0] }
        }
        transition={
          cameramanState === 'snapping'
            ? { duration: 0.35 }
            : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
        }
        className="w-28 sm:w-32 md:w-36 h-auto transition-transform group-hover:scale-105"
      >
        <svg
          viewBox="0 0 200 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Defs & Gradients */}
          <defs>
            <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="50%" stopColor="#2e1065" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="lensGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="40%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
            <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#818cf8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#c084fc" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
            <radialGradient id="flashGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#a855f7" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Tripod Stand Under Cameraman */}
          <g opacity="0.85">
            {/* Center column */}
            <line x1="100" y1="160" x2="100" y2="230" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
            {/* Left leg */}
            <line x1="100" y1="180" x2="45" y2="235" stroke="#334155" strokeWidth="3.5" strokeLinecap="round" />
            {/* Right leg */}
            <line x1="100" y1="180" x2="155" y2="235" stroke="#334155" strokeWidth="3.5" strokeLinecap="round" />
            {/* Leg joints */}
            <circle cx="100" cy="180" r="5" fill="#a855f7" />
            <circle cx="45" cy="235" r="3" fill="#cbd5e1" />
            <circle cx="155" cy="235" r="3" fill="#cbd5e1" />
            <circle cx="100" cy="230" r="3" fill="#cbd5e1" />
          </g>

          {/* Cameraman Lower Body / Stool */}
          <rect x="82" y="145" width="36" height="30" rx="6" fill="#1e293b" />
          <path d="M85 175 L80 205 L92 205 L95 175 Z" fill="#0f172a" />
          <path d="M115 175 L120 205 L108 205 L105 175 Z" fill="#0f172a" />

          {/* Torso / Photographer Jacket */}
          <rect x="74" y="90" width="52" height="60" rx="12" fill="url(#bodyGrad)" stroke="#4c1d95" strokeWidth="2" />
          {/* Utility vest straps */}
          <path d="M82 90 L85 145" stroke="#a855f7" strokeWidth="3" opacity="0.7" strokeDasharray="4 2" />
          <path d="M118 90 L115 145" stroke="#a855f7" strokeWidth="3" opacity="0.7" strokeDasharray="4 2" />
          <rect x="88" y="125" width="24" height="15" rx="3" fill="#312e81" stroke="#6366f1" strokeWidth="1" />

          {/* Cameraman Head */}
          <g>
            {/* Neck */}
            <rect x="92" y="80" width="16" height="14" rx="3" fill="url(#skinGrad)" />
            {/* Head circle */}
            <circle cx="100" cy="68" r="18" fill="url(#skinGrad)" />
            {/* Backwards Cap */}
            <path d="M80 62 C80 50 120 50 120 62 L124 64 C128 65 132 64 135 62 L120 62 Z" fill="#7c3aed" />
            {/* Cap Brim backwards */}
            <path d="M80 62 C74 61 70 65 67 68 C73 68 78 66 82 63 Z" fill="#5b21b6" />
            {/* Ear */}
            <circle cx="83" cy="68" r="3.5" fill="#b45309" />
            {/* Focus Eye */}
            <circle cx="110" cy="66" r="3" fill="#0f172a" />
            <circle cx="111" cy="65" r="1" fill="#ffffff" />
            {/* Smile */}
            <path d="M106 74 Q111 78 115 74" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </g>

          {/* Camera Mount & Rig */}
          <g>
            {/* Tripod Head Platform */}
            <rect x="90" y="105" width="45" height="8" rx="2" fill="#475569" />
            <circle cx="112" cy="109" r="2.5" fill="#fbbf24" />

            {/* Professional Camera Body */}
            <rect
              x="105"
              y="85"
              width="44"
              height="30"
              rx="5"
              fill="url(#lensGrad)"
              stroke="#64748b"
              strokeWidth="1.5"
            />
            {/* Grip */}
            <rect x="141" y="88" width="8" height="24" rx="3" fill="#020617" />
            {/* Viewfinder Hump */}
            <path d="M118 85 L124 77 L134 77 L140 85 Z" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
            {/* Shutter Button with Red Dot */}
            <rect x="138" y="82" width="6" height="4" rx="1" fill="#ef4444" />
            {/* Mode Dial */}
            <rect x="110" y="82" width="7" height="4" rx="1" fill="#94a3b8" />

            {/* Telephoto Pro Lens */}
            <g>
              {/* Lens Base Barrel */}
              <rect x="148" y="90" width="16" height="20" rx="2" fill="#1e293b" />
              {/* Canon L-Series Signature Red Ring */}
              <rect x="162" y="90" width="3" height="20" fill="#ef4444" />
              {/* Zoom & Focus Ribbed Barrel */}
              <rect x="165" y="89" width="16" height="22" rx="2" fill="url(#lensGrad)" />
              <line x1="168" y1="91" x2="168" y2="109" stroke="#475569" strokeWidth="1" />
              <line x1="172" y1="91" x2="172" y2="109" stroke="#475569" strokeWidth="1" />
              <line x1="176" y1="91" x2="176" y2="109" stroke="#475569" strokeWidth="1" />
              {/* Front Element Hood */}
              <path d="M181 87 L190 84 L190 116 L181 113 Z" fill="#0f172a" />
              {/* Front Curved Glass with Reflection */}
              <ellipse cx="190" cy="100" rx="3" ry="15" fill="url(#glassGrad)" />
              <path
                d="M189 92 Q191 100 189 108"
                stroke="#ffffff"
                strokeWidth="1.2"
                strokeLinecap="round"
                opacity="0.8"
              />
            </g>

            {/* Hot-Shoe Mounted Speedlite Flashgun */}
            <g>
              {/* Flash Bracket */}
              <rect x="123" y="68" width="12" height="9" rx="1.5" fill="#334155" />
              {/* Flash Head */}
              <rect
                x="120"
                y="52"
                width="24"
                height="16"
                rx="3"
                fill="#1e293b"
                stroke="#64748b"
                strokeWidth="1"
              />
              {/* Flash Fresnel Lens Diffuser */}
              <rect x="138" y="54" width="5" height="12" rx="1" fill="#e2e8f0" opacity="0.9" />
              {/* Ready LED (Green / Red) */}
              <circle
                cx="124"
                cy="64"
                r="1.8"
                fill={cameramanState === 'snapping' ? '#ef4444' : '#10b981'}
                className="animate-pulse"
              />
            </g>

            {/* Photographer Hands Adjusting Lens & Shutter */}
            <g>
              {/* Right Hand on Grip & Shutter */}
              <ellipse cx="144" cy="95" rx="5" ry="7" fill="url(#skinGrad)" />
              {/* Left Arm & Hand Gripping/Twisting Lens */}
              <motion.g
                animate={
                  cameramanState === 'focusing'
                    ? { x: [-1, 2, -1], rotate: [0, 4, 0] }
                    : { x: 0, rotate: 0 }
                }
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <path d="M85 110 Q120 125 168 108" stroke="url(#bodyGrad)" strokeWidth="7" strokeLinecap="round" fill="none" />
                <ellipse cx="170" cy="105" rx="6" ry="5" fill="url(#skinGrad)" />
              </motion.g>
            </g>
          </g>

          {/* Camera Flash Burst FX (Visible when snapping) */}
          {cameramanState === 'snapping' && (
            <g>
              <circle cx="140" cy="60" r="30" fill="url(#flashGlow)" />
              {/* Light Rays */}
              <line x1="140" y1="30" x2="140" y2="10" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
              <line x1="165" y1="45" x2="185" y2="35" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
              <line x1="165" y1="75" x2="185" y2="85" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
              <line x1="115" y1="45" x2="95" y2="35" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          )}
        </svg>
      </motion.div>

      {/* Interactive CTA Pill Below Mascot */}
      <div className="mt-1 flex items-center justify-center">
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-[9px] font-mono text-purple-300 group-hover:border-purple-400 group-hover:text-white transition-all shadow-md">
          <Camera className="w-2.5 h-2.5 text-purple-400" />
          <span>Click to Snap</span>
        </span>
      </div>
    </div>
  );
};
