import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PenTool, Compass, Sparkles, User, Wand2 } from 'lucide-react';
import { MiniDesigner } from './MiniDesigner';
import { SpatialHologram } from './SpatialHologram';
import { soundEngine } from '../utils/soundEngine';

interface DesignElementsProps {
  isTriggered: boolean;
  onGlow: () => void;
}

type DesignConceptMode = 'artist' | 'spatial';

export const DesignElements: React.FC<DesignElementsProps> = ({ isTriggered, onGlow }) => {
  const [conceptMode, setConceptMode] = useState<DesignConceptMode>('artist');

  const handleModeChange = (mode: DesignConceptMode) => {
    soundEngine.playDialClick();
    setConceptMode(mode);
  };

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* Interactive Concept Switcher Pill (Lets Shiva preview both live!) */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-2 z-50 flex items-center gap-1 p-1 rounded-2xl bg-[#090a16]/95 border border-purple-500/40 shadow-xl backdrop-blur-xl"
      >
        <button
          onClick={() => handleModeChange('artist')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-[10px] font-mono transition-all ${
            conceptMode === 'artist'
              ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-600/30'
              : 'text-purple-300 hover:text-white hover:bg-white/5'
          }`}
          title="Preview Concept 1: The Miniature Digital Artist & Wacom Desk"
        >
          <User className="w-3 h-3" />
          <span>1. Digital Artist</span>
        </button>

        <button
          onClick={() => handleModeChange('spatial')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-[10px] font-mono transition-all ${
            conceptMode === 'spatial'
              ? 'bg-cyan-600 text-white font-bold shadow-md shadow-cyan-600/30'
              : 'text-cyan-300 hover:text-white hover:bg-white/5'
          }`}
          title="Preview Concept 3: Floating Spatial 3D Hologram & Levitating Apple Pencil"
        >
          <Compass className="w-3 h-3" />
          <span>3. Spatial 3D</span>
        </button>
      </motion.div>

      {/* Render Selected Concept with Smooth Fluid Transition */}
      <AnimatePresence mode="wait">
        {conceptMode === 'artist' ? (
          <motion.div
            key="concept-1-artist"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.3 }}
            className="w-full flex justify-center"
          >
            <MiniDesigner isTriggered={isTriggered} onGlow={onGlow} />
          </motion.div>
        ) : (
          <motion.div
            key="concept-3-spatial"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.3 }}
            className="w-full flex justify-center"
          >
            <SpatialHologram isTriggered={isTriggered} onGlow={onGlow} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
