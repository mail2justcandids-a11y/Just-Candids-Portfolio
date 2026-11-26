import React, { useState } from 'react';
import { DesignProject } from '../types';
import { GRAPHIC_DESIGN_WORKS } from '../data/portfolioData';
import { Palette, Sparkles, ArrowUpRight, X, CheckCircle2 } from 'lucide-react';

interface GraphicDesignGalleryProps {
  onOpenBooking: () => void;
}

export const GraphicDesignGallery: React.FC<GraphicDesignGalleryProps> = ({ onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<DesignProject | null>(null);

  const categories = [
    { label: 'All Designs', value: 'all' },
    { label: 'Brand Identity', value: 'branding' },
    { label: 'Social Media', value: 'social-media' },
    { label: 'Print & Certificates', value: 'print' },
  ];

  const filteredDesigns = selectedCategory === 'all'
    ? GRAPHIC_DESIGN_WORKS
    : GRAPHIC_DESIGN_WORKS.filter((d) => d.category === selectedCategory);

  return (
    <section id="graphic-design" className="py-20 lg:py-28 relative overflow-hidden bg-[#06060b] border-t border-purple-500/15 scroll-mt-24 lg:scroll-mt-28">
      <div className="max-w-[1560px] 2xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 lg:mb-14">
          <div className="space-y-3 max-w-2xl min-w-0">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-semibold tracking-wide backdrop-blur-md">
              <Palette className="w-3.5 h-3.5 text-purple-300 shrink-0" />
              <span className="font-project-label text-[11px]">Identity, Typography & Marketing Creatives</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-section-title text-white tracking-tight leading-tight [text-wrap:balance]">
              Graphic Design Portfolio
            </h2>
            <p className="font-body text-slate-300 text-sm sm:text-base leading-relaxed [text-wrap:pretty]">
              From high-conversion social media ads and boutique branding to official ceremonial certificates crafted in Adobe Photoshop & Illustrator.
            </p>
            <p className="font-featured-statement text-purple-200/90 text-sm sm:text-base italic pt-0.5">
              “Where purposeful typography meets balanced geometry and high-end aesthetic precision.”
            </p>
          </div>

          {/* Filter Pills with Horizontal Balance and Smooth Scroll */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-[#0b0c15]/90 p-1.5 rounded-2xl border border-purple-500/20 backdrop-blur-md shrink-0 overflow-x-auto no-scrollbar max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-nav font-medium tracking-wide transition-all whitespace-nowrap shrink-0 ${
                  selectedCategory === cat.value
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40'
                    : 'text-slate-400 hover:text-white hover:bg-purple-950/30'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Designs Grid or Empty State - 1080:1920 (9:16) Vertical Story & Poster Layout */}
        {filteredDesigns.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-7 items-start">
            {filteredDesigns.map((project) => {
              const isBanner = project.id === 'graduation-day-banner';
              return (
                <div
                  key={project.id}
                  onClick={() => setActiveProject(project)}
                  className={`group relative rounded-3xl bg-[#0b0c15] border border-purple-500/15 hover:border-purple-500/50 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-700/25 flex flex-col ${
                    isBanner ? 'sm:col-span-2 lg:col-span-3 xl:col-span-4' : ''
                  }`}
                >
                  {/* Media Preview Container - 1080:1920 (9:16) Ratio */}
                  <div
                    className={`relative w-full overflow-hidden bg-[#070810] border-b border-purple-500/15 flex items-center justify-center p-2 sm:p-2.5 ${
                      isBanner ? 'aspect-[16/5] sm:aspect-[16/4]' : 'aspect-[9/16]'
                    }`}
                  >
                    {/* Atmospheric Ambient Glow behind contained artwork */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25 filter blur-2xl scale-110">
                      <img
                        src={project.imageUrl}
                        alt=""
                        aria-hidden="true"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="relative z-10 w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_8px_24px_rgba(0,0,0,0.85)]"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 sm:top-3.5 sm:left-3.5 z-20 max-w-[70%]">
                      <span className="font-project-label px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] bg-black/85 backdrop-blur-md text-purple-300 border border-purple-400/30 truncate block">
                        {project.client}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 z-20 text-[10px] font-mono text-slate-300 bg-black/75 backdrop-blur-md px-2 py-0.5 rounded-full border border-purple-500/20 leading-none">
                      {project.year}
                    </div>

                    {/* Ratio Tag Badge */}
                    <div className="absolute bottom-2.5 right-2.5 z-20 text-[9px] font-mono text-purple-300/80 bg-black/75 backdrop-blur-md px-2 py-0.5 rounded-md border border-purple-500/20 leading-none opacity-0 group-hover:opacity-100 transition-opacity">
                      {isBanner ? '1600 × 400 Banner' : '1080 × 1920 (9:16)'}
                    </div>
                  </div>

                  {/* Body with Balanced Typography */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5">
                    <div className="space-y-1.5">
                      <h3 className="text-base sm:text-lg font-section-title text-white group-hover:text-purple-300 transition-colors leading-snug flex items-start justify-between gap-2">
                        <span className="line-clamp-2">{project.title}</span>
                        <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0 mt-0.5" />
                      </h3>
                      <p className="font-body text-xs text-slate-400 leading-relaxed line-clamp-2 [text-wrap:pretty]">
                        {project.description}
                      </p>
                    </div>

                    {/* Color Palette & Tools */}
                    <div className="space-y-2.5 pt-3 border-t border-purple-500/15">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-1">
                          <span className="text-[9px] font-project-label text-purple-300/80 mr-0.5">Palette:</span>
                          {project.colorPalette?.map((color) => (
                            <span
                              key={color}
                              style={{ backgroundColor: color }}
                              className="w-3 h-3 rounded-full border border-white/20 shadow-sm"
                              title={color}
                            />
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {project.tools.slice(0, 2).map((tool) => (
                            <span
                              key={tool}
                              className="px-2 py-0.5 rounded text-[9px] font-mono tracking-wide bg-purple-950/40 text-purple-300 border border-purple-500/20 leading-tight"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl bg-[#090a14] border border-dashed border-purple-500/30 p-10 sm:p-16 text-center max-w-3xl mx-auto space-y-6 shadow-2xl shadow-purple-950/30">
            <div className="w-16 h-16 rounded-2xl bg-purple-950/70 border border-purple-500/40 text-purple-300 flex items-center justify-center mx-auto shadow-lg shadow-purple-950/50">
              <Palette className="w-8 h-8 text-purple-400" />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl sm:text-3xl font-section-title text-white tracking-tight">
                Awaiting Your Curated Design Works
              </h3>
              <p className="font-body text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg mx-auto [text-wrap:pretty]">
                Previous sample assets have been removed. To showcase your signature branding, vector logos, or commercial posters, drop your files into your dedicated folder on your Desktop:
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0c0d18] border border-purple-500/30 font-mono text-xs sm:text-sm text-purple-300 shadow-inner">
                <span>📁 /Users/shiva/Desktop/Just Candids/design-works</span>
              </div>
              <p className="text-xs text-slate-400 pt-1 font-['Neue_Montreal']">
                Drop PNG, JPG, or SVG files into that folder and they will be displayed here immediately.
              </p>
            </div>
          </div>
        )}

      </div>

      {/* Design Detail Modal */}
      {activeProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-200"
          onClick={() => setActiveProject(null)}
        >
          <div 
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#090a12] border border-purple-500/25 shadow-2xl p-5 sm:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative w-full rounded-2xl overflow-hidden bg-[#06070d] border border-purple-500/20 flex items-center justify-center p-3 sm:p-5">
              <img
                src={activeProject.imageUrl}
                alt={activeProject.title}
                className="w-auto h-auto max-h-[72vh] max-w-full object-contain rounded-xl drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)]"
              />
            </div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-500/20 pb-4">
                <div>
                  <span className="font-project-label text-xs text-purple-400">
                    Client: {activeProject.client}
                  </span>
                  <h3 className="text-2xl font-section-title text-white mt-1">
                    {activeProject.title}
                  </h3>
                </div>
                <div className="text-xs font-mono text-purple-300 bg-purple-950/40 px-3 py-1.5 rounded-full border border-purple-500/30 self-start sm:self-auto">
                  YEAR {activeProject.year}
                </div>
              </div>

              <p className="font-body text-sm text-slate-300 leading-relaxed">
                {activeProject.description}
              </p>

              {activeProject.deliverables && (
                <div className="space-y-2">
                  <div className="font-project-label text-xs text-purple-300">
                    Project Deliverables:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeProject.deliverables.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs font-body text-slate-300 bg-[#0f101d] p-2.5 rounded-xl border border-purple-500/10">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 flex items-center justify-between border-t border-purple-500/15">
                <span className="font-body text-xs text-slate-400">Ready to commission branding or graphic design?</span>
                <button
                  onClick={() => {
                    setActiveProject(null);
                    onOpenBooking();
                  }}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-700 via-purple-600 to-violet-600 text-white font-nav font-medium text-xs sm:text-sm hover:opacity-95 transition-opacity flex items-center gap-2 shadow-lg shadow-purple-600/40"
                >
                  <Sparkles className="w-4 h-4 text-purple-200" />
                  Commission Design
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
};
