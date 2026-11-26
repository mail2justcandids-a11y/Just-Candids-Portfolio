import React from 'react';
import { Camera, Palette, Sparkles, ShieldCheck, Film, Layers, Award, Aperture } from 'lucide-react';
import { PortfolioTab } from '../types';

interface GearAndToolkitProps {
  activeTab: PortfolioTab;
}

export const GearAndToolkit: React.FC<GearAndToolkitProps> = ({ activeTab }) => {
  const isDesign = activeTab === 'graphic-design';

  // Photography-Exclusive Hardware & Optics System
  const photographyPillars = [
    {
      title: 'Camera Body & Sensor System',
      icon: Camera,
      badge: 'Hardware',
      description: 'Canon Dual Pixel CMOS autofocus paired with 24.2 MP APS-C sensor for ultra-fast subject tracking and low-light fidelity.',
      items: [
        { name: 'Canon EOS R10 (24.2 MP Dual Pixel AF II)', role: 'Primary Body' },
        { name: '23 FPS High-Speed Electronic Shutter', role: 'Action & Candid Burst' },
        { name: '4K 60p Oversampled Dynamic Range', role: 'Cinematic Visuals' },
        { name: 'High-ISO Low-Noise Sensitivity', role: 'Atmospheric Low-Light' },
      ],
    },
    {
      title: 'Flagship L-Series & Prime Optics',
      icon: Aperture,
      badge: 'Optics',
      description: 'Optically stabilized professional glass and ultra-fast prime apertures for creamy, natural background separation.',
      items: [
        { name: 'Canon RF 24-105mm F4 L IS USM (Red Ring)', role: 'Flagship Event Lens' },
        { name: 'Canon EF 50mm Prime f/1.8 STM', role: 'Portrait & Bokeh Master' },
        { name: 'Godox TTL Wireless Speedlite & Softbox', role: 'Fill & Rim Studio Light' },
        { name: 'Nano AR Coating & Lens Hoods', role: 'Flare & Glare Suppression' },
      ],
    },
    {
      title: 'RAW Color Science & Archival Standards',
      icon: Film,
      badge: 'Standards',
      description: 'Full 14-bit uncompressed Canon RAW color grading workflow delivering true skin tones and client archival longevity.',
      items: [
        { name: 'Adobe Lightroom Classic Custom Color LUTs', role: 'Film Color Profiling' },
        { name: '300 DPI Fine-Art Print Ready Outputs', role: 'Physical Albums' },
        { name: 'sRGB & DCI-P3 Color Gamut Calibration', role: 'Web & Display Delivery' },
        { name: 'Dual SD Card Redundancy & Cold Storage Archive', role: 'Client Backup Vault' },
      ],
    },
  ];

  // Graphic Design-Exclusive Creative Suite & Typography System
  const designPillars = [
    {
      title: 'Adobe Creative Cloud Suite',
      icon: Palette,
      badge: 'Software',
      description: 'Industry-standard vector and raster design software pipelines engineered for brand identity and high-impact digital campaigns.',
      items: [
        { name: 'Adobe Photoshop 2026', role: 'Compositing & Retouching' },
        { name: 'Adobe Illustrator 2026', role: 'Vector Branding & Logos' },
        { name: 'Adobe InDesign 2026', role: 'Editorial & Print Layout' },
        { name: 'Adobe Premiere Pro / After Effects', role: 'Motion & Video Creatives' },
      ],
    },
    {
      title: 'Typography & Vector Precision',
      icon: Layers,
      badge: 'Typography',
      description: 'Mathematical bezier curve purity, custom display logotypes, optical kerning, and strict modular grid systems.',
      items: [
        { name: 'Mathematical Bezier Curve Purity', role: 'Infinite Scalability' },
        { name: 'Custom Display Logotypes & Optical Kerning', role: 'Brand Distinctions' },
        { name: 'Modular Grid Systems & Visual Hierarchy', role: 'Structural Balance' },
        { name: 'Scalable SVG, EPS & Vector PDF Master Files', role: 'Production Formats' },
      ],
    },
    {
      title: 'Press Production & Print Standards',
      icon: ShieldCheck,
      badge: 'Standards',
      description: 'Strict adherence to CMYK color separation, high-DPI output, guilloche anti-copy patterns, and press preflight checks.',
      items: [
        { name: '300 DPI High-Resolution Press Print Output', role: 'Print Ready' },
        { name: 'CMYK Color Separation & Preflight Proofing', role: 'Offset & Digital Press' },
        { name: 'Guilloche Vector Security & Certificate Borders', role: 'Official Certificates' },
        { name: 'Bleed, Trim & Die-Cut Master Specifications', role: 'Packaging & Merch' },
      ],
    },
  ];

  const pillars = isDesign ? designPillars : photographyPillars;

  return (
    <section id="gear-toolkit" className="py-20 lg:py-28 relative overflow-hidden bg-[#06060c] border-t border-purple-500/15 scroll-mt-24 lg:scroll-mt-28">
      <div className="max-w-[1560px] 2xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
        
        {/* Header with Centered Balance */}
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-14 space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-semibold tracking-wide backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-purple-300" />
            <span className="font-project-label text-[11px]">
              {isDesign ? 'Adobe Creative Suite • Vector Precision • Press Ready' : 'Canon R10 • L-Series Optics • RAW Fidelity'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-section-title text-white tracking-tight leading-tight [text-wrap:balance]">
            {isDesign ? 'Graphic Design & Creative Suite' : 'Camera Optics & Technical System'}
          </h2>
          <p className="font-body text-slate-300 text-sm sm:text-base leading-relaxed [text-wrap:pretty] max-w-2xl mx-auto">
            {isDesign
              ? 'Industry-standard vector and raster design pipelines engineered for brand longevity, typographic precision, and press print accuracy.'
              : 'Calibrated Canon RF optics, prime apertures, and 14-bit RAW processing pipeline for exceptional dynamic range and candid sharpness.'}
          </p>
          <p className="font-featured-statement text-purple-200/90 text-sm sm:text-base italic pt-0.5">
            {isDesign
              ? '“Form follows purpose; visual precision creates enduring brand impact.”'
              : '“Optics that capture light truthfully; moments preserved with unscripted authenticity.”'}
          </p>
        </div>

        {/* 3 Pillars Grid with Equal Height Balance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-6 sm:p-8 rounded-3xl bg-[#0b0c15] border border-purple-500/15 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-700/25 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-purple-700 via-purple-600 to-violet-500 p-[1px] shadow-md shadow-purple-600/30">
                      <div className="w-full h-full bg-[#0a0b12] rounded-[15px] flex items-center justify-center">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-300" />
                      </div>
                    </div>
                    <span className="font-project-label text-[10px] sm:text-[11px] bg-purple-950/40 px-2.5 py-1 rounded-full text-purple-300 border border-purple-500/30 leading-none">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-section-title text-white tracking-tight leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="font-body text-xs sm:text-[13px] text-slate-400 leading-relaxed [text-wrap:pretty]">
                    {pillar.description}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-purple-500/15">
                  {pillar.items.map((item) => (
                    <div key={item.name} className="flex flex-col text-xs space-y-0.5">
                      <span className="font-body text-slate-200 font-medium leading-snug">{item.name}</span>
                      <span className="font-mono text-[10px] sm:text-[11px] text-purple-400 tracking-wide mt-0.5">
                        {item.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
