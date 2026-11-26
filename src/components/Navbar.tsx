import React, { useState, useEffect } from 'react';
import { Camera, Palette, ArrowUpRight, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import { PortfolioTab } from '../types';
import { soundEngine } from '../utils/soundEngine';

interface NavbarProps {
  activeTab: PortfolioTab;
  onTabChange: (tab: PortfolioTab) => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange, onOpenBooking }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(soundEngine.getMuted());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleModeSwitch = (mode: 'photography' | 'graphic-design') => {
    soundEngine.playDialClick();
    onTabChange(mode);
    // Keep user on the Hero page so the headline and discipline transform directly in view
    const winLenis = (window as unknown as { lenis?: { scrollTo: (target: number | HTMLElement, opts?: object) => void } }).lenis;
    if (winLenis) {
      winLenis.scrollTo(0, { duration: 0.9 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleToggleSound = () => {
    const newMuted = soundEngine.toggleMute();
    setIsMuted(newMuted);
  };

  const isFrames = activeTab === 'photography' || activeTab === 'all';
  const isVectors = activeTab === 'graphic-design';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'py-2.5 sm:py-3 bg-[#050508]/90 backdrop-blur-2xl border-b border-purple-500/20 shadow-2xl shadow-black/90'
        : 'py-3.5 sm:py-5 bg-transparent'
        }`}
    >
      <div className="max-w-[1560px] 2xl:max-w-[1720px] mx-auto px-3 sm:px-6 lg:px-10 xl:px-12 flex items-center justify-between gap-1.5 sm:gap-4">

        {/* Brand: Just Candids Official Logo (Responsive Mark / Wordmark) */}
        <a
          href="#"
          className="group flex items-center gap-2.5 text-white transition-opacity hover:opacity-90 shrink-0 min-w-0"
        >
          <div className="flex flex-col items-start justify-center min-w-0">
            <picture>
              <source media="(min-width: 640px)" srcSet="/just-candids-logo.png" />
              <img
                src="/just-candids-mark.png"
                alt="Just Candids Official Logo"
                className="h-6 sm:h-7 md:h-8 w-auto object-contain filter drop-shadow-[0_0_14px_rgba(168,85,247,0.4)] transition-transform duration-300 group-hover:scale-105"
              />
            </picture>
            <span className="font-project-label text-[8px] sm:text-[9px] tracking-[0.14em] text-purple-300/80 mt-0.5 leading-tight whitespace-nowrap hidden md:inline">
              {isVectors ? 'Siva Subramaniyam • Graphic Design' : 'Just Candids • Candid Photography'}
            </span>
          </div>
        </a>

        {/* Hyper-Premium Liquid Glass Slider Button: Frames vs Vectors */}
        <div className="liquid-glass-track relative p-1 sm:p-1.5 rounded-full flex items-center shadow-2xl shrink-0">
          {/* 1. Frames (Photography Works) */}
          <button
            onClick={() => handleModeSwitch('photography')}
            className={`relative z-10 flex items-center justify-center gap-1 sm:gap-2 px-2.5 sm:px-7 py-1.5 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-200 select-none ${isFrames
              ? 'text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]'
              : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
              }`}
          >
            <Camera
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-all duration-300 ${isFrames
                ? 'text-white filter drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] scale-105'
                : 'text-slate-400'
                }`}
            />
            <span className="font-nav font-medium tracking-wide text-xs sm:text-[13px]">Frames</span>

            {isFrames && (
              <motion.div
                layoutId="liquid-glass-indicator"
                className="liquid-glass-indicator absolute inset-0 rounded-full -z-10 overflow-hidden pointer-events-none"
                transition={{ type: 'spring', stiffness: 360, damping: 26, mass: 0.75 }}
              >
                <div className="liquid-glass-sheen" />
              </motion.div>
            )}
          </button>

          {/* 2. Vectors (Graphic Design Works) */}
          <button
            onClick={() => handleModeSwitch('graphic-design')}
            className={`relative z-10 flex items-center justify-center gap-1 sm:gap-2 px-2.5 sm:px-7 py-1.5 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-200 select-none ${isVectors
              ? 'text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]'
              : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
              }`}
          >
            <Palette
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-all duration-300 ${isVectors
                ? 'text-white filter drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] scale-105'
                : 'text-slate-400'
                }`}
            />
            <span className="font-nav font-medium tracking-wide text-xs sm:text-[13px]">Vectors</span>

            {isVectors && (
              <motion.div
                layoutId="liquid-glass-indicator"
                className="liquid-glass-indicator absolute inset-0 rounded-full -z-10 overflow-hidden pointer-events-none"
                transition={{ type: 'spring', stiffness: 360, damping: 26, mass: 0.75 }}
              >
                <div className="liquid-glass-sheen" />
              </motion.div>
            )}
          </button>
        </div>

        {/* Right Section: Sound Toggle & Action CTA */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Haptic / Sound FX Toggle Button */}
          <button
            onClick={handleToggleSound}
            aria-label={isMuted ? 'Enable Sound FX' : 'Mute Sound FX'}
            title={isMuted ? 'Sound FX: Off (Click to Enable)' : 'Sound FX: On (Click to Mute)'}
            className="p-1.5 sm:p-2.5 rounded-full liquid-glass-track text-slate-300 hover:text-white hover:border-purple-400/50 transition-all duration-200 flex items-center justify-center"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-slate-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-purple-300 animate-pulse" />
            )}
          </button>

          {/* Action Button (Mode-Aware) */}
          <div className="hidden sm:flex items-center">
            <button
              onClick={() => {
                soundEngine.playFocusBeep();
                onOpenBooking();
              }}
              className="liquid-cta-button group relative inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-nav font-medium text-xs sm:text-sm tracking-wide text-white overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-100 shrink-0 animate-pulse" />
              <span className="font-nav font-medium">
                {isVectors ? 'Commission Design' : 'Book a Session'}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0 text-purple-200" />
            </button>
          </div>
        </div>

      </div>
    </header>
  );
};
