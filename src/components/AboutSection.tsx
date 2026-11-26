import React from 'react';
import { Camera, Palette, MapPin, ArrowUpRight, Sparkles, Sliders } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { PortfolioTab } from '../types';

interface AboutSectionProps {
  activeTab: PortfolioTab;
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ activeTab, onOpenBooking }) => {
  const isDesign = activeTab === 'graphic-design';

  return (
    <section id="about" className="py-20 lg:py-28 relative overflow-hidden bg-[#050508] border-t border-purple-500/15 scroll-mt-24 lg:scroll-mt-28">
      <div className="max-w-[1560px] 2xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Visual Profile Card (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-purple-500/25 shadow-2xl bg-[#090a12] shadow-purple-950/40">
              <img
                src="/images/siva_about_action.jpg"
                alt="Siva Subramaniyam behind the lens - Just Candids"
                className="w-full h-[440px] sm:h-[520px] lg:h-[560px] object-cover object-center filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/30 to-transparent" />
              
              {/* Floating Profile Badge with Clean Spacing */}
              <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 p-3.5 sm:p-4 rounded-2xl bg-[#0a0b14]/95 border border-purple-500/30 backdrop-blur-xl">
                <div className="flex items-center justify-between gap-3">
                  <div className="space-y-1 min-w-0">
                    <img
                      src="/just-candids-logo.png"
                      alt="Just Candids"
                      className="h-5 sm:h-6 w-auto object-contain"
                    />
                    <p className="font-project-label text-[10px] sm:text-[11px] text-purple-300 font-medium tracking-wide truncate">
                      {isDesign ? 'Siva Subramaniyam • Graphic Designer & Art Director' : 'Founder: Siva Subramaniyam • Candid Storyteller'}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-purple-300/80 font-mono tracking-wider shrink-0">
                    <MapPin className="w-3.5 h-3.5 text-purple-400" />
                    <span className="font-['Neue_Montreal'] font-medium">Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative & Philosophy (7 cols) */}
          <div className="lg:col-span-7 space-y-6 min-w-0">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-semibold tracking-wide backdrop-blur-md">
              {isDesign ? (
                <Palette className="w-3.5 h-3.5 text-purple-300" />
              ) : (
                <Camera className="w-3.5 h-3.5 text-purple-300" />
              )}
              <span className="font-project-label text-[11px]">
                {isDesign ? 'Visual Design Philosophy' : 'The Story Behind Just Candids'}
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-section-title text-white tracking-tight leading-[1.15] [text-wrap:balance]">
              {isDesign
                ? 'Visual Precision. Purposeful Design. Lasting Brand Presence.'
                : 'Why "Just Candids"? Because real emotion can never be posed.'}
            </h2>

            <div className="space-y-4 font-body text-slate-300 text-sm sm:text-base leading-relaxed [text-wrap:pretty]">
              {isDesign ? (
                <>
                  <p>
                    I am <strong className="text-white font-medium">Siva Subramaniyam</strong>, a multidisciplinary graphic designer specializing in bespoke brand identity systems, editorial typography, ceremonial certificates, and digital marketing collateral.
                  </p>
                  <p>
                    Using <strong className="text-white">Adobe Photoshop</strong>, <strong className="text-purple-300">Illustrator</strong>, and InDesign, I transform conceptual visions into crisp, memorable visual artifacts engineered for both digital engagement and high-end 300 DPI press print production.
                  </p>
                  <p>
                    Every design I craft is governed by rigorous grid systems, deliberate typographic hierarchy, and psychological color harmony. Whether launching a new brand or designing official event credentials, I ensure visual clarity and lasting distinction.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    I am <strong className="text-white font-medium">Siva Subramaniyam</strong>, the creator behind <strong className="text-purple-300 font-medium">Just Candids</strong>. I started this journey with a clear artistic conviction: the greatest, most enduring moments in life happen when nobody is conscious of the camera lens.
                  </p>
                  <p>
                    Armed with my <strong className="text-white">Canon EOS R10</strong> and the flagship <strong className="text-purple-300">Canon RF 24-105mm F4 L Series</strong> lens, I specialize in freezing unscripted laughter, authentic glances, and celebratory atmospheres without the rigidity of stiff, artificial poses.
                  </p>
                  <p>
                    Every frame is captured with intentional composition, natural light awareness, and authentic color balance. Whether documenting an intimate portrait or covering a grand celebration, I ensure every image carries heart, genuine emotion, and timeless permanence.
                  </p>
                </>
              )}
            </div>

            <p className="font-featured-statement text-purple-200 text-base sm:text-lg italic pt-1 border-l-2 border-purple-500/40 pl-4">
              {isDesign
                ? '“Form follows purpose; visual precision creates enduring brand authority.”'
                : '“Photography is the art of catching a split-second soul truth before the mind puts on a mask.”'}
            </p>

            {/* Core Values with Symmetry */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-1">
              {isDesign ? (
                <>
                  <div className="p-4 rounded-2xl bg-[#0b0c15] border border-purple-500/15 space-y-1.5">
                    <div className="text-sm font-section-title text-white flex items-center gap-2 tracking-tight">
                      <Palette className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>Vector Precision & Craft</span>
                    </div>
                    <p className="font-body text-xs text-slate-400 leading-relaxed [text-wrap:pretty]">
                      Pixel-perfect bezier curves, custom display typography, and modular grid balance across all touchpoints.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0b0c15] border border-purple-500/15 space-y-1.5">
                    <div className="text-sm font-section-title text-white flex items-center gap-2 tracking-tight">
                      <Sparkles className="w-4 h-4 text-violet-400 shrink-0" />
                      <span>Color Theory & Pre-Press Standards</span>
                    </div>
                    <p className="font-body text-xs text-slate-400 leading-relaxed [text-wrap:pretty]">
                      Rigorous CMYK separation, 300 DPI press preflight checks, and sRGB digital optimization for flawless reproduction.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-4 rounded-2xl bg-[#0b0c15] border border-purple-500/15 space-y-1.5">
                    <div className="text-sm font-section-title text-white flex items-center gap-2 tracking-tight">
                      <Camera className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>100% Unforced Emotion</span>
                    </div>
                    <p className="font-body text-xs text-slate-400 leading-relaxed [text-wrap:pretty]">
                      Stepping back into the background to let true personalities and candid celebrations shine through naturally.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0b0c15] border border-purple-500/15 space-y-1.5">
                    <div className="text-sm font-section-title text-white flex items-center gap-2 tracking-tight">
                      <Sliders className="w-4 h-4 text-violet-400 shrink-0" />
                      <span>Natural Light & Cinematic Optics</span>
                    </div>
                    <p className="font-body text-xs text-slate-400 leading-relaxed [text-wrap:pretty]">
                      Harnessing ambient illumination and fast L-series glass for natural skin tones and rich depth.
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Action CTA with Balanced Spacing */}
            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => {
                  soundEngine.playFocusBeep();
                  onOpenBooking();
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-700 via-purple-600 to-violet-600 text-white font-nav font-medium text-xs sm:text-sm tracking-wide hover:shadow-purple-600/50 shadow-lg shadow-purple-700/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{isDesign ? 'Commission a Design Project' : 'Book a Just Candids Session'}</span>
                <ArrowUpRight className="w-4 h-4 text-white" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
