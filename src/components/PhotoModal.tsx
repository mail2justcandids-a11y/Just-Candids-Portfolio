import React, { useEffect } from 'react';
import { PhotoItem } from '../types';
import { X, Camera, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface PhotoModalProps {
  photo: PhotoItem | null;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const PhotoModal: React.FC<PhotoModalProps> = ({ photo, onClose, onOpenBooking }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundEngine.playTick();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!photo) return null;

  const handleClose = () => {
    soundEngine.playTick();
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div 
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#090a12] border border-purple-500/25 shadow-2xl p-4 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* High Res Image Viewport */}
        <div className="relative w-full max-h-[65vh] rounded-2xl overflow-hidden bg-black/70 border border-purple-500/20 flex items-center justify-center">
          <img
            src={photo.imageUrl}
            alt={photo.title}
            className="w-full h-auto max-h-[65vh] object-contain"
          />
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="font-project-label px-3 py-1 rounded-full text-xs bg-black/80 backdrop-blur-md text-purple-300 border border-purple-400/40">
              JUST CANDIDS • {photo.category}
            </span>
          </div>
        </div>

        {/* Details & Metadata Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-500/20 pb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-section-title text-white">
                {photo.title}
              </h2>
              <p className="font-body text-xs sm:text-sm text-slate-400 mt-1">
                {photo.description}
              </p>
            </div>
            <div className="text-xs font-mono text-purple-300 bg-purple-950/40 px-3 py-1.5 rounded-full border border-purple-500/30 self-start sm:self-auto">
              YEAR {photo.year}
            </div>
          </div>

          {/* Real Camera EXIF Matrix */}
          <div className="space-y-2">
            <div className="font-project-label text-xs text-purple-400 flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5" />
              <span>Just Candids Camera Setup & Exposure</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-[#0f101d] border border-purple-500/15">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Camera Body</div>
                <div className="text-sm font-['Neue_Montreal'] font-medium text-white mt-0.5">
                  {photo.camera}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0f101d] border border-purple-500/15">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Lens Model</div>
                <div className="text-sm font-['Neue_Montreal'] font-medium text-purple-300 mt-0.5 truncate" title={photo.lens}>
                  {photo.lens}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0f101d] border border-purple-500/15">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Aperture & Shutter</div>
                <div className="text-sm font-['Neue_Montreal'] font-medium text-white mt-0.5">
                  {photo.settings.aperture} • {photo.settings.shutter}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0f101d] border border-purple-500/15">
                <div className="text-[10px] text-slate-400 uppercase font-mono">ISO & Focal Length</div>
                <div className="text-sm font-['Neue_Montreal'] font-medium text-white mt-0.5">
                  ISO {photo.settings.iso} • {photo.settings.focalLength}
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
            <div className="font-body text-xs text-slate-400">
              Want a candid session with this mood and visual quality?
            </div>
            <button
              onClick={() => {
                soundEngine.playFocusBeep();
                onClose();
                onOpenBooking();
              }}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-700 via-purple-600 to-violet-600 text-white font-nav font-medium text-xs sm:text-sm hover:opacity-95 transition-opacity flex items-center gap-2 shadow-lg shadow-purple-600/40"
            >
              <Sparkles className="w-4 h-4 text-purple-200" />
              Book a Just Candids Session
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
