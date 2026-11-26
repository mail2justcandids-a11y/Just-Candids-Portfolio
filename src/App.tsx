import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PhotographyGallery } from './components/PhotographyGallery';
import { GraphicDesignGallery } from './components/GraphicDesignGallery';
import { VectorStudioLab } from './components/VectorStudioLab';
import { DarkroomLab } from './components/DarkroomLab';
import { GearAndToolkit } from './components/GearAndToolkit';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AmbientCanvas } from './components/AmbientCanvas';
import { soundEngine } from './utils/soundEngine';
import { PortfolioTab } from './types';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PortfolioTab>('photography');

  // Initialize Lenis Smooth Kinetic Scrolling
  useEffect(() => {
    // Ensure clean start at the top on page load/refresh unless a specific anchor hash is present
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }

    // Respect user's reduced motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.8,
    });

    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    let animationFrameId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    };

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      (window as unknown as { lenis?: Lenis }).lenis = undefined;
      lenis.destroy();
    };
  }, []);

  const smoothScrollTo = (id: string) => {
    const el = document.getElementById(id) || document.getElementById(`${id}-lab`);
    const winLenis = (window as unknown as { lenis?: Lenis }).lenis;
    if (winLenis && el) {
      winLenis.scrollTo(el, { duration: 1.2, offset: -85 });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToBooking = () => {
    soundEngine.playTick();
    smoothScrollTo('contact');
  };

  const scrollToPhotography = () => {
    soundEngine.playApertureClick();
    setActiveTab('photography');
    smoothScrollTo('photography');
  };

  const scrollToDesign = () => {
    soundEngine.playApertureClick();
    setActiveTab('graphic-design');
    smoothScrollTo('graphic-design');
  };

  return (
    <div className="min-h-screen bg-[#050508] text-slate-100 flex flex-col font-['Neue_Montreal',sans-serif] overflow-x-hidden w-full relative selection:bg-purple-600 selection:text-white">
      {/* Cinematic Ambient Darkroom Dust & Bokeh Particles */}
      <AmbientCanvas />

      {/* Navigation Bar with Discipline Mode Toggle (Frames vs Vectors) & Audio Control */}
      <Navbar
        activeTab={activeTab}
        onTabChange={(tab) => {
          soundEngine.playApertureClick();
          setActiveTab(tab);
        }}
        onOpenBooking={scrollToBooking}
      />

      {/* Main Content Sections - Strictly Filtered By Active Discipline */}
      <main className="flex-1 relative z-10">
        {/* 1. Hero with Camera Viewfinder Experience & 3D Lighting */}
        <Hero
          activeTab={activeTab}
          onOpenBooking={scrollToBooking}
          onExplorePhotography={scrollToPhotography}
          onExploreDesign={scrollToDesign}
          onExploreDarkroom={() => smoothScrollTo('darkroom')}
          onExploreToolkit={() => smoothScrollTo('gear-toolkit')}
          onExploreVectorLab={() => smoothScrollTo('vector-lab')}
        />

        {/* 2. Photography Portfolio & Darkroom (ONLY rendered in 'photography' Frames mode) */}
        {activeTab === 'photography' && (
          <>
            <PhotographyGallery onOpenBooking={scrollToBooking} />
            <DarkroomLab />
          </>
        )}

        {/* 3. Graphic Design Portfolio & Vector Proofing Lab (ONLY rendered in 'graphic-design' Vectors mode) */}
        {activeTab === 'graphic-design' && (
          <>
            <GraphicDesignGallery onOpenBooking={scrollToBooking} />
            <VectorStudioLab />
          </>
        )}

        {/* 4. Gear & Creative Toolkit (Mode-aware: Optics vs Adobe Creative Suite) */}
        <GearAndToolkit activeTab={activeTab} />

        {/* 5. About Siva (Mode-aware: Candid Storyteller vs Graphic Designer) */}
        <AboutSection activeTab={activeTab} onOpenBooking={scrollToBooking} />

        {/* 6. Bookings & Inquiries (Mode-aware: Photo Sessions vs Design Commissions) */}
        <ContactSection activeTab={activeTab} />
      </main>

      {/* Footer (Mode-aware branding & channels) */}
      <Footer activeTab={activeTab} />
    </div>
  );
};

export default App;
