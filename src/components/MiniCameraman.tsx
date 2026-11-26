import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Sparkles, Crosshair, Zap, Eye, RotateCcw } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface MiniCameramanProps {
  isTriggered: boolean;
  onSnap: () => void;
}

export const MiniCameraman: React.FC<MiniCameramanProps> = ({ isTriggered, onSnap }) => {
  const [animStage, setAnimStage] = useState<'idle' | 'dolly_in' | 'aiming' | 'flash' | 'eject' | 'celebrate'>('idle');
  const [speech, setSpeech] = useState<string>('Dialing 85mm ƒ/1.4...');
  const [polaroidDeveloped, setPolaroidDeveloped] = useState(false);
  const [dollyPosition, setDollyPosition] = useState(0);
  const [filmCount, setFilmCount] = useState(1);

  // Periodic idle chatter & camera tweaking
  useEffect(() => {
    if (animStage !== 'idle') return;

    const phrases = [
      'Setting 85mm ƒ/1.4...',
      'ISO 100 locked in...',
      'Checking light meter...',
      'Framing the shot...',
      'Standby on slider...',
    ];

    const interval = setInterval(() => {
      const p = phrases[Math.floor(Math.random() * phrases.length)];
      setSpeech(p);
      setDollyPosition((prev) => (prev === 0 ? 10 : 0));
    }, 4500);

    return () => clearInterval(interval);
  }, [animStage]);

  // Sync external snap trigger (e.g. Snap Flash button in Hero)
  useEffect(() => {
    if (isTriggered && animStage === 'idle') {
      runFullCameramanSequence();
    }
  }, [isTriggered]);

  const runFullCameramanSequence = () => {
    // Stage 1: Dolly rush forward towards the subject
    setAnimStage('dolly_in');
    setSpeech('Rolling forward! 🎬');
    soundEngine.playLensMotorWhir();

    // Stage 2: Raise camera to eye, zoom lens, lock focus reticle
    setTimeout(() => {
      setAnimStage('aiming');
      setSpeech('Hold that smile! 🎯');
      soundEngine.playFocusBeep();
    }, 400);

    // Stage 3: THE FLASH & SNAP
    setTimeout(() => {
      setAnimStage('flash');
      setSpeech('SAY CHEESE! 📸');
      soundEngine.playMechanicalShutter();
    }, 950);

    // Stage 4: Ejecting developing chemical Polaroid
    setTimeout(() => {
      setAnimStage('eject');
      setSpeech('Developing print... ✨');
      soundEngine.playPolaroidEject();
      setPolaroidDeveloped(false);

      // Chemical development reveal (fade from dark chemical mask into photograph)
      setTimeout(() => {
        setPolaroidDeveloped(true);
      }, 700);
    }, 1300);

    // Stage 5: Celebration & Thumbs Up
    setTimeout(() => {
      setAnimStage('celebrate');
      setSpeech('Picture Perfect! 🔥');
      setFilmCount((c) => c + 1);
    }, 2800);

    // Stage 6: Reset to standby
    setTimeout(() => {
      setAnimStage('idle');
      setSpeech('Ready for next shot!');
    }, 5200);
  };

  const handleCameramanClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (animStage === 'idle') {
      onSnap();
      runFullCameramanSequence();
    }
  };

  return (
    <div
      onClick={handleCameramanClick}
      className="group relative cursor-pointer select-none flex flex-col items-center filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)]"
      title="Click our miniature cameraman to roll forward and snap a 4K photo!"
    >
      {/* 1. Dynamic Speech & Status Bubble (Normal layout flow - zero overlap) */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-40 mb-2 whitespace-nowrap"
      >
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0b0c16]/95 border border-purple-500/60 shadow-xl backdrop-blur-xl text-[10px] sm:text-[11px] font-mono text-purple-200">
          <span
            className={`w-2 h-2 rounded-full shrink-0 ${
              animStage === 'flash'
                ? 'bg-amber-400 shadow-[0_0_12px_#fbbf24] animate-ping'
                : animStage === 'aiming'
                ? 'bg-emerald-400 shadow-[0_0_10px_#34d399] animate-pulse'
                : 'bg-purple-400'
            }`}
          />
          <span className="font-semibold text-white tracking-tight">{speech}</span>
        </div>
      </motion.div>

      {/* 2. High-Tech Viewfinder HUD Laser Target (When Aiming) */}
      <AnimatePresence>
        {animStage === 'aiming' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.4 }}
            className="absolute -top-24 -right-16 z-50 pointer-events-none flex flex-col items-center"
          >
            <div className="relative w-20 h-20 border border-emerald-400/80 rounded-lg flex items-center justify-center p-1 bg-emerald-950/20 backdrop-blur-[2px]">
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-emerald-400" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-emerald-400" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-emerald-400" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-emerald-400" />

              <Crosshair className="w-8 h-8 text-emerald-400 animate-spin" />
              <span className="absolute bottom-1 text-[7.5px] font-mono text-emerald-300 font-bold tracking-wider bg-black/90 px-1 rounded">
                [AF-LOCK 9PT]
              </span>
            </div>
            <div className="mt-1 flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/85 text-[7px] font-mono text-emerald-400 border border-emerald-500/30">
              <span>ƒ/1.4</span>
              <span>•</span>
              <span>1/500s</span>
              <span>•</span>
              <span>ISO 100</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. REAL CHEMICAL POLAROID PRINT (Ejected from Camera & Developed Live) */}
      <AnimatePresence>
        {(animStage === 'eject' || animStage === 'celebrate') && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.2, rotate: -25 }}
            animate={{
              opacity: 1,
              y: -95,
              scale: 1,
              rotate: -4,
              transition: { type: 'spring', stiffness: 200, damping: 16 },
            }}
            exit={{ opacity: 0, y: -150, scale: 0.7, rotate: 12 }}
            className="absolute -top-24 -left-12 z-50 pointer-events-none w-32 sm:w-36 p-2.5 bg-slate-50 rounded-lg shadow-[0_25px_50px_rgba(0,0,0,0.9)] border-2 border-slate-200"
          >
            <div className="w-full h-24 sm:h-28 bg-[#111] rounded overflow-hidden relative border border-black/20 shadow-inner">
              <img
                src="/images/siva-cutout.png"
                alt="Captured Snapshot"
                className="w-full h-full object-cover object-top filter contrast-110 saturate-105"
              />
              <motion.div
                initial={{ opacity: 0.95 }}
                animate={{ opacity: polaroidDeveloped ? 0 : 0.95 }}
                transition={{ duration: 1.8, ease: 'easeOut' }}
                className="absolute inset-0 bg-gradient-to-b from-[#2d1b4e] via-[#1a0f30] to-[#0a0515] flex flex-col items-center justify-center pointer-events-none"
              >
                <Sparkles className="w-5 h-5 text-purple-300 animate-spin" />
                <span className="text-[7px] font-mono text-purple-200 mt-1 uppercase tracking-widest font-bold">
                  DEVELOPING...
                </span>
              </motion.div>
              <div className="absolute top-1 left-1 px-1 py-0.5 rounded bg-black/60 text-[6.5px] font-mono text-white/90">
                RAW 4K
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between text-[7.5px] font-mono text-slate-700 font-bold px-0.5">
              <span className="tracking-tight text-purple-900">JUST CANDIDS</span>
              <span className="text-slate-500 font-normal">#{String(filmCount).padStart(3, '0')}</span>
            </div>
            <div className="text-[6.5px] font-mono text-slate-500 tracking-tighter truncate px-0.5">
              CANON EOS R10 • 85mm
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Speedlite Flash Pulse Ring Flare */}
      <AnimatePresence>
        {animStage === 'flash' && (
          <motion.div
            initial={{ opacity: 1, scale: 0.1 }}
            animate={{ opacity: 0, scale: 3.5 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="absolute top-6 right-4 w-20 h-20 rounded-full bg-white pointer-events-none z-50 blur-[3px] mix-blend-screen"
          />
        )}
      </AnimatePresence>

      {/* 5. Stylized Living Miniature Cameraman Character */}
      <motion.div
        animate={
          animStage === 'dolly_in'
            ? { x: 25, y: -4, rotate: 3 }
            : animStage === 'aiming'
            ? { x: 22, y: -8, scale: 1.06 }
            : animStage === 'flash'
            ? { x: 20, y: -10, scale: [1.06, 1.14, 1.06] }
            : animStage === 'celebrate'
            ? { x: 10, y: [-4, 0, -4], rotate: [-2, 2, -2] }
            : { x: dollyPosition, y: [0, -3, 0] }
        }
        transition={
          animStage === 'celebrate'
            ? { duration: 0.8, repeat: Infinity }
            : { duration: 0.4, ease: 'easeInOut' }
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
            <linearGradient id="camJacketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2e1065" />
              <stop offset="50%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="proLensGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="40%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
            <linearGradient id="lensOpticGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
            <linearGradient id="mascotSkin" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#c2410c" />
            </linearGradient>
            <radialGradient id="burstFlash" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Slider Dolly Carriage Wheels on Rails */}
          <g>
            <rect x="80" y="210" width="60" height="10" rx="3" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
            <circle cx="90" cy="222" r="5" fill="#334155" stroke="#a855f7" strokeWidth="1.5" />
            <circle cx="130" cy="222" r="5" fill="#334155" stroke="#a855f7" strokeWidth="1.5" />
            <line x1="88" y1="222" x2="92" y2="222" stroke="#ffffff" strokeWidth="1" />
            <line x1="128" y1="222" x2="132" y2="222" stroke="#ffffff" strokeWidth="1" />
          </g>

          {/* Telescopic Tripod Center Mast */}
          <g>
            <line x1="110" y1="150" x2="110" y2="210" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
            <rect x="106" y="175" width="8" height="6" rx="1.5" fill="#a855f7" />
          </g>

          {/* Lower Body & Stool */}
          <rect x="90" y="145" width="40" height="30" rx="6" fill="#1e293b" />
          <path d="M92 175 L86 212 L98 212 L102 175 Z" fill="#0f172a" />
          <path d="M128 175 L134 212 L122 212 L118 175 Z" fill="#0f172a" />

          {/* Photographer Torso & Utility Gear Vest */}
          <rect x="82" y="85" width="56" height="65" rx="14" fill="url(#camJacketGrad)" stroke="#6b21a8" strokeWidth="2" />
          <path d="M92 85 L95 145" stroke="#c084fc" strokeWidth="3" opacity="0.8" strokeDasharray="4 2" />
          <path d="M128 85 L125 145" stroke="#c084fc" strokeWidth="3" opacity="0.8" strokeDasharray="4 2" />
          <rect x="96" y="122" width="28" height="18" rx="3" fill="#3b0764" stroke="#a855f7" strokeWidth="1" />

          {/* Photographer Head & Expressive Character Face */}
          <g>
            <rect x="102" y="74" width="16" height="14" rx="3" fill="url(#mascotSkin)" />
            <circle cx="110" cy="62" r="20" fill="url(#mascotSkin)" />
            <path d="M88 56 C88 42 132 42 132 56 L138 58 C142 59 146 58 148 56 L132 56 Z" fill="#7e22ce" />
            <path d="M88 56 C82 55 77 60 74 63 C80 63 85 61 90 57 Z" fill="#581c87" />
            <circle cx="110" cy="42" r="2.5" fill="#facc15" />
            <circle cx="91" cy="62" r="4" fill="#c2410c" />
            <path
              d={animStage === 'aiming' ? 'M 115 52 L 126 56' : 'M 115 54 L 125 54'}
              stroke="#451a03"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {animStage === 'celebrate' ? (
              <path d="M 116 62 Q 122 67 127 62" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            ) : (
              <g>
                <circle cx="121" cy="60" r="4" fill="#0f172a" />
                <circle cx="122" cy="59" r="1.5" fill="#ffffff" />
              </g>
            )}
            <path
              d={animStage === 'celebrate' ? 'M 114 70 Q 122 78 128 70' : 'M 116 70 Q 121 74 126 70'}
              stroke="#451a03"
              strokeWidth="2"
              strokeLinecap="round"
              fill={animStage === 'celebrate' ? '#ffffff' : 'none'}
            />
          </g>

          {/* Full Pro Camera Rig with Canon Lens & Flashgun */}
          <g>
            <rect
              x="118"
              y="78"
              width="50"
              height="35"
              rx="6"
              fill="url(#proLensGrad)"
              stroke="#94a3b8"
              strokeWidth="1.5"
            />
            <rect x="160" y="82" width="9" height="28" rx="3.5" fill="#020617" />
            <path d="M132 78 L140 70 L152 70 L160 78 Z" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
            <rect x="157" y="74" width="7" height="5" rx="1.5" fill="#ef4444" />
            <rect x="124" y="74" width="8" height="5" rx="1" fill="#cbd5e1" />

            <g>
              <rect x="167" y="84" width="18" height="24" rx="2" fill="#1e293b" />
              <rect x="183" y="84" width="3.5" height="24" fill="#ef4444" />
              <rect
                x={animStage === 'aiming' || animStage === 'flash' ? 188 : 186}
                y="83"
                width={animStage === 'aiming' || animStage === 'flash' ? 22 : 18}
                height="26"
                rx="2"
                fill="url(#proLensGrad)"
              />
              <ellipse
                cx={animStage === 'aiming' || animStage === 'flash' ? 210 : 204}
                cy="96"
                rx="4"
                ry="17"
                fill="url(#lensOpticGrad)"
              />
              <path
                d={animStage === 'aiming' || animStage === 'flash' ? 'M209 86 Q212 96 209 106' : 'M203 86 Q206 96 203 106'}
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.85"
              />
            </g>

            <g>
              <rect x="138" y="58" width="14" height="12" rx="2" fill="#334155" />
              <rect x="134" y="40" width="28" height="18" rx="4" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
              <rect x="156" y="42" width="6" height="14" rx="1" fill="#f8fafc" opacity="0.9" />
              <circle
                cx="139"
                cy="52"
                r="2"
                fill={animStage === 'flash' ? '#ef4444' : '#10b981'}
                className="animate-pulse"
              />
            </g>

            <g>
              <ellipse cx="163" cy="90" rx="5" ry="6" fill="url(#mascotSkin)" />
              <path d="M96 110 Q140 125 188 102" stroke="url(#camJacketGrad)" strokeWidth="8" strokeLinecap="round" fill="none" />
              <ellipse cx="190" cy="100" rx="6" ry="6" fill="url(#mascotSkin)" />
              {animStage === 'celebrate' && (
                <g>
                  <circle cx="85" cy="95" r="7" fill="url(#mascotSkin)" />
                  <rect x="83" y="80" width="5" height="12" rx="2.5" fill="url(#mascotSkin)" />
                </g>
              )}
            </g>
          </g>

          {animStage === 'flash' && (
            <g>
              <circle cx="160" cy="50" r="45" fill="url(#burstFlash)" />
              <line x1="160" y1="20" x2="160" y2="0" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
              <line x1="190" y1="35" x2="215" y2="20" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
              <line x1="190" y1="65" x2="215" y2="80" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
              <line x1="130" y1="35" x2="105" y2="20" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
            </g>
          )}
        </svg>
      </motion.div>

      {/* 6. Carbon-Fiber Cine-Slider Rails with Bearing Carriage */}
      <div className="relative w-56 sm:w-64 h-5 -mt-3 z-20 flex flex-col items-center">
        <div className="relative w-full h-2.5 rounded-full bg-gradient-to-r from-[#0d0e1b] via-[#1a1b2e] to-[#0d0e1b] border border-purple-500/40 shadow-inner flex items-center justify-between px-3">
          <div className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_#a855f7]" />
          <div className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_#a855f7]" />
        </div>
        <div className="flex items-center justify-between w-[90%] px-1 text-[7.5px] font-mono text-purple-300/60 mt-0.5">
          <span>0cm</span>
          <span>15cm</span>
          <span>● CENTER</span>
          <span>45cm</span>
          <span>60cm</span>
        </div>
      </div>

      {/* 7. HEAVY-DUTY CINEMA ROAD CASE RISER STAGE (Grounds the Cameraman firmly) */}
      <div className="relative w-64 sm:w-72 mt-1 z-20 flex flex-col items-center">
        {/* Road Case Chassis Box */}
        <div className="relative w-full rounded-2xl bg-gradient-to-b from-[#161729] via-[#0f101d] to-[#07080f] border-2 border-purple-500/40 p-2.5 shadow-[0_20px_40px_rgba(0,0,0,0.95)] overflow-hidden">
          {/* Brushed Aluminum Corner Brackets with Rivets */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-slate-300 rounded-tl-lg pointer-events-none" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-slate-300 rounded-tr-lg pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-slate-300 rounded-bl-lg pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-slate-300 rounded-br-lg pointer-events-none" />

          {/* Flight Case Bevel Striping */}
          <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-purple-500/25">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
              <span className="text-[9.5px] font-mono font-bold text-slate-200 tracking-tight">
                JUST CANDIDS • STAGE RIG
              </span>
            </div>
            <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-purple-950/80 border border-purple-500/40 text-purple-300">
              UNIT #01
            </span>
          </div>

          {/* Road Case Face Details: Latches, Power Telemetry & Handle */}
          <div className="flex items-center justify-between gap-2 px-1 text-[8.5px] font-mono text-slate-400">
            {/* Recessed Butterfly Twist Latch */}
            <div className="flex items-center gap-1 bg-black/50 px-2 py-1 rounded-lg border border-white/10">
              <span className="text-[10px] text-amber-400">🔒</span>
              <span className="text-slate-300 text-[8px]">LOCKED</span>
            </div>

            {/* V-Mount 14.8V Cine Power Battery */}
            <div className="flex items-center gap-1 bg-purple-950/50 px-2 py-1 rounded-lg border border-purple-500/30">
              <Zap className="w-3 h-3 text-amber-400 shrink-0" />
              <span className="text-purple-200 text-[8px] font-bold">14.8V // 98%</span>
            </div>

            {/* Snap Action Button on Deck */}
            <div className="flex items-center gap-1 bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-lg border border-purple-400/50 text-white font-semibold transition-all">
              <Camera className="w-3 h-3 text-purple-300" />
              <span className="text-[8.5px]">SNAP</span>
            </div>
          </div>
        </div>

        {/* 8. Telescopic Chrome Hydraulic Support Struts & Coiled Cables */}
        <div className="relative w-full h-12 flex justify-between items-start px-6 -mt-0.5 pointer-events-none">
          {/* Left Hydraulic Damper Column */}
          <div className="flex flex-col items-center">
            <div className="w-4 h-8 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-500 rounded-b shadow-md border border-slate-600" />
            <div className="w-8 h-2.5 bg-[#0a0b14] rounded-full border border-purple-500/40 -mt-1 shadow-lg" />
          </div>

          {/* Center Coiled Studio Tether Cables (High-Vis Orange + BNC Video) */}
          <svg
            viewBox="0 0 100 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-24 h-10 overflow-visible"
          >
            {/* Orange High-Voltage Studio Cable */}
            <path
              d="M 15 0 C 10 25, 45 15, 50 35 C 55 45, 80 25, 95 40"
              stroke="#f97316"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              opacity="0.9"
            />
            {/* Black Braided BNC SDI Video Cable */}
            <path
              d="M 25 0 C 35 30, 20 20, 65 30 C 75 35, 85 38, 90 40"
              stroke="#475569"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.8"
            />
          </svg>

          {/* Right Hydraulic Damper Column */}
          <div className="flex flex-col items-center">
            <div className="w-4 h-8 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-500 rounded-b shadow-md border border-slate-600" />
            <div className="w-8 h-2.5 bg-[#0a0b14] rounded-full border border-purple-500/40 -mt-1 shadow-lg" />
          </div>
        </div>

        {/* 9. Soft Realistic Studio Floor Contact Shadow */}
        <div className="w-60 sm:w-68 h-4 rounded-[100%] bg-black/90 blur-[6px] -mt-5 pointer-events-none" />
      </div>
    </div>
  );
};
