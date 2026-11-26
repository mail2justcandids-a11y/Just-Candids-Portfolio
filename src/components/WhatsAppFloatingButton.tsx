import React from 'react';
import { motion } from 'framer-motion';
import { PortfolioTab } from '../types';
import { soundEngine } from '../utils/soundEngine';

interface WhatsAppFloatingButtonProps {
  activeTab: PortfolioTab;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({ activeTab }) => {
  const isDesign = activeTab === 'graphic-design';
  const message = isDesign
    ? 'Hi Shiva! I came across your portfolio and would like to inquire about a brand identity / graphic design commission.'
    : 'Hi Shiva! I saw your Just Candids portfolio and would like to inquire about booking a photography session.';

  const url = `https://wa.me/917092280024?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => soundEngine.playFocusBeep()}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-[#0a0b16]/95 hover:bg-[#111322] text-white border border-emerald-500/50 shadow-[0_12px_30px_rgba(0,0,0,0.85)] backdrop-blur-xl group transition-all"
      title="Chat on WhatsApp (+91 70922 80024)"
    >
      <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-[#25D366] text-white shadow-md shadow-emerald-500/40 shrink-0">
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.59 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.44 19.65L5.27 16.62L5.07 16.3C4.24 14.98 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.95 7.15C8.75 7.15 8.42 7.23 8.16 7.51C7.89 7.8 7.14 8.5 7.14 9.94C7.14 11.37 8.19 12.75 8.33 12.95C8.48 13.15 10.37 16.07 13.27 17.32C13.96 17.62 14.5 17.8 14.92 17.93C15.61 18.15 16.24 18.12 16.74 18.05C17.29 17.96 18.45 17.35 18.69 16.67C18.93 15.99 18.93 15.41 18.86 15.29C18.79 15.17 18.59 15.09 18.29 14.94C17.99 14.79 16.53 14.07 16.26 13.97C15.99 13.87 15.79 13.82 15.59 14.12C15.39 14.42 14.83 15.09 14.65 15.29C14.48 15.49 14.31 15.52 14.01 15.37C13.71 15.22 12.75 14.91 11.61 13.89C10.73 13.1 10.13 12.13 9.96 11.83C9.79 11.53 9.94 11.37 10.09 11.22C10.23 11.08 10.39 10.87 10.54 10.7C10.69 10.53 10.74 10.4 10.84 10.2C10.94 10 10.89 9.83 10.81 9.68C10.74 9.53 10.14 8.05 9.89 7.45C9.65 6.87 9.4 6.95 9.22 6.94C9.05 6.94 8.85 6.94 8.65 6.94L8.95 7.15Z" />
        </svg>
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
      </div>
      <div className="flex flex-col text-left">
        <span className="text-[11px] font-mono font-bold text-white group-hover:text-emerald-300 transition-colors">
          WhatsApp Direct
        </span>
        <span className="text-[9px] font-mono text-emerald-400">Available • Quick Reply</span>
      </div>
    </motion.a>
  );
};
