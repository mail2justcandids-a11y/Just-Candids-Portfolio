import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PortfolioTab } from '../types';

interface FooterProps {
  activeTab: PortfolioTab;
}

export const Footer: React.FC<FooterProps> = ({ activeTab }) => {
  const isDesign = activeTab === 'graphic-design';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-10 sm:py-12 bg-[#040407] border-t border-purple-500/15 relative z-10 text-xs text-slate-400">
      <div className="max-w-[1560px] 2xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Brand & Tagline with Strict Baseline Alignment */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:left">
          <img
            src="/just-candids-logo.png"
            alt="Just Candids by Siva"
            className="h-6 sm:h-7.5 w-auto object-contain filter drop-shadow-[0_0_12px_rgba(168,85,247,0.35)]"
          />
          <div className="border-t sm:border-t-0 sm:border-l border-purple-500/20 pt-2 sm:pt-0 sm:pl-3.5">
            <div className="font-project-label text-white tracking-[0.12em] text-[11px] sm:text-xs leading-none">
              {isDesign ? 'SIVA SUBRAMANIYAM • GRAPHIC DESIGN' : 'JUST CANDIDS • CANDID PHOTOGRAPHY'}
            </div>
            <div className="font-body text-[10px] text-purple-300/70 tracking-wide mt-1 leading-normal">
              {isDesign
                ? 'Brand Identity & Editorial Typography • Crafted in Adobe Creative Suite'
                : 'Unscripted Visual Storytelling • Captured on Canon EOS R10 RAW'}
            </div>
          </div>
        </div>

        {/* Center Credits & Social Links */}
        <div className="flex flex-col items-center gap-2 text-slate-400 text-center tracking-wide leading-normal max-w-full px-2">
          <span className="font-body text-[11px] sm:text-xs">
            &copy; {new Date().getFullYear()} {isDesign ? 'Siva Subramaniyam. All rights reserved.' : 'Just Candids by Siva Subramaniyam.'}
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 text-purple-400 text-[11px] sm:text-xs font-nav font-medium">
            {isDesign ? (
              <>
                <a
                  href="https://www.instagram.com/single_soul_01/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-300 transition-colors"
                >
                  @single_soul_01
                </a>
                <span>&bull;</span>
                <a
                  href="mailto:mail2shiva04@gmail.com"
                  className="hover:text-purple-300 transition-colors break-all"
                >
                  mail2shiva04@gmail.com
                </a>
              </>
            ) : (
              <>
                <a
                  href="https://www.instagram.com/just.candids/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-300 transition-colors"
                >
                  @just.candids
                </a>
                <span>&bull;</span>
                <a
                  href="mailto:mail2just.candids@gmail.com"
                  className="hover:text-purple-300 transition-colors break-all"
                >
                  mail2just.candids@gmail.com
                </a>
              </>
            )}
          </div>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-purple-950/30 border border-purple-500/25 hover:border-purple-500/60 text-purple-200 hover:text-white transition-all text-xs font-nav font-medium tracking-wide shrink-0"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5 text-purple-300" />
        </button>

      </div>
    </footer>
  );
};
