import React, { useState } from 'react';
import { PhotoItem } from '../types';
import { PHOTOGRAPHY_WORKS } from '../data/portfolioData';
import { PhotoModal } from './PhotoModal';
import { Camera, Eye, ArrowUpRight } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface PhotographyGalleryProps {
  onOpenBooking: () => void;
}

export const PhotographyGallery: React.FC<PhotographyGalleryProps> = ({ onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);

  const categories = [
    { label: 'All Candids', value: 'all' },
    { label: 'Portraits', value: 'portrait' },
    { label: 'Events & Culture', value: 'event' },
    { label: 'Street & Raw', value: 'street' },
    { label: 'Low-Light & Night', value: 'low-light' },
  ];

  const filteredPhotos = selectedCategory === 'all'
    ? PHOTOGRAPHY_WORKS
    : PHOTOGRAPHY_WORKS.filter((p) => p.category === selectedCategory);

  // Partition into portraits and landscapes so landscape works sit side-by-side at the end for complete view
  const portraitPhotos = filteredPhotos.filter((p) => p.aspectRatio !== 'landscape');
  const landscapePhotos = filteredPhotos.filter((p) => p.aspectRatio === 'landscape');

  const renderPhotoCard = (photo: PhotoItem, isWide: boolean = false, extraClass: string = '') => {
    const isPortrait = photo.aspectRatio === 'portrait';
    return (
      <div
        key={photo.id}
        onClick={() => {
          soundEngine.playQuickSnap();
          setActivePhoto(photo);
        }}
        className={`group relative rounded-3xl bg-[#0b0c15] border border-purple-500/15 hover:border-purple-500/50 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-purple-700/25 flex flex-col h-full ${extraClass}`}
      >
        {/* Image Preview Container with Dynamic Aspect Ratio */}
        <div className={`relative w-full overflow-hidden bg-black/60 ${
          isWide || !isPortrait ? 'aspect-[16/10] sm:aspect-[16/9.5]' : 'aspect-[3/4]'
        }`}>
          <img
            src={photo.imageUrl}
            alt={photo.title}
            style={{
              objectPosition: photo.focalPoint || (isPortrait ? 'center 22%' : 'center center')
            }}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Hover overlay with EXIF Inspection */}
          <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-slate-950 font-nav font-medium text-xs tracking-wide shadow-xl">
              <Eye className="w-4 h-4 text-purple-600" />
              Inspect Just Candids EXIF
            </span>
          </div>

          {/* Category Badge */}
          <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4">
            <span className="font-project-label px-3 py-1 rounded-full text-[10px] sm:text-[11px] bg-black/75 backdrop-blur-md text-purple-200 border border-purple-500/30">
              {photo.category}
            </span>
          </div>

          {/* Camera Settings Indicator */}
          <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 text-[10px] sm:text-[11px] font-mono text-purple-300 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-purple-500/30 leading-none">
            {photo.settings.aperture} • ISO {photo.settings.iso}
          </div>
        </div>

        {/* Card Footer with Strict Text Hierarchy */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-1.5">
            <h3 className="text-lg sm:text-xl font-section-title text-white group-hover:text-purple-300 transition-colors leading-snug flex items-start justify-between gap-3">
              <span className="line-clamp-1">{photo.title}</span>
              <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0 mt-0.5" />
            </h3>
            <p className="font-body text-xs sm:text-[13px] text-slate-400 line-clamp-2 leading-relaxed [text-wrap:pretty]">
              {photo.description}
            </p>
          </div>

          {/* Camera Tag Bar */}
          <div className="pt-3.5 border-t border-purple-500/15 flex items-center justify-between text-xs text-slate-400 font-mono tracking-wide leading-none">
            <span className="truncate pr-2 font-['Neue_Montreal'] font-medium">Just Candids &bull; {photo.year}</span>
            <span className="text-purple-400 font-semibold shrink-0">{photo.settings.focalLength}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="photography" className="py-20 lg:py-28 relative overflow-hidden bg-[#050508] border-t border-purple-500/15 scroll-mt-24 lg:scroll-mt-28">
      <div className="max-w-[1560px] 2xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">

        {/* Section Header with Neue Montreal Medium & Cormorant Garamond Italic */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 lg:mb-14">
          <div className="space-y-3 max-w-2xl min-w-0">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-semibold tracking-wide backdrop-blur-md">
              <Camera className="w-3.5 h-3.5 text-purple-300 shrink-0" />
              <span className="font-project-label text-[11px]">JUST CANDIDS &bull; Visual Storytelling Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-section-title text-white tracking-tight leading-tight [text-wrap:balance]">
              Just Candids Portfolio
            </h2>
            <p className="font-body text-slate-300 text-sm sm:text-base leading-relaxed [text-wrap:pretty]">
              Authentic emotion, spontaneous expressions, and intentional ambient lighting captured in high-resolution RAW.
            </p>
            <p className="font-featured-statement text-purple-200/90 text-sm sm:text-base italic pt-0.5">
              “Unscripted human laughter, spontaneous glances, and the magic of genuine presence.”
            </p>
          </div>

          {/* Filter Pills with Horizontal Balance and Smooth Scroll */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-[#0b0c14]/90 p-1.5 rounded-2xl border border-purple-500/20 backdrop-blur-md shrink-0 overflow-x-auto no-scrollbar max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => {
                  soundEngine.playDialClick();
                  setSelectedCategory(cat.value);
                }}
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-nav font-medium tracking-wide transition-all whitespace-nowrap shrink-0 ${selectedCategory === cat.value
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40'
                  : 'text-slate-400 hover:text-white hover:bg-purple-950/30'
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 1. Portrait Works Grid (3 columns on desktop, 2 on tablet, 1 on mobile) - Filled 100% without gaps */}
        {portraitPhotos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 items-start">
            {portraitPhotos.map((photo, index) => {
              const isLastOdd = portraitPhotos.length % 2 !== 0 && index === portraitPhotos.length - 1;
              return renderPhotoCard(photo, false, isLastOdd ? 'md:col-span-2 lg:col-span-1' : '');
            })}
          </div>
        )}

        {/* 2. Panoramic Landscape Works (Positioned at the last, side-by-side in a 2-column wide grid for complete view) */}
        {landscapePhotos.length > 0 && (
          <div className={portraitPhotos.length > 0 ? 'mt-6 sm:mt-7 lg:mt-8' : ''}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 lg:gap-8 items-start">
              {landscapePhotos.map((photo) => renderPhotoCard(photo, true))}
            </div>
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      <PhotoModal
        photo={activePhoto}
        onClose={() => setActivePhoto(null)}
        onOpenBooking={onOpenBooking}
      />
    </section>
  );
};
