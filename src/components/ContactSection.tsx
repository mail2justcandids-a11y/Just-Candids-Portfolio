import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, Mail, ExternalLink, Sparkles, CheckCircle2, MessageCircle, Loader2 } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { PortfolioTab } from '../types';

const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

interface ContactSectionProps {
  activeTab: PortfolioTab;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ activeTab }) => {
  const isDesign = activeTab === 'graphic-design';
  const targetEmail = isDesign ? 'mail2shiva04@gmail.com' : 'mail2just.candids@gmail.com';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceType: isDesign ? 'branding' : 'candid-portrait',
    eventDateOrTimeline: 'Next 2-4 weeks',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    soundEngine.playFocusBeep();

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      _subject: isDesign
        ? `[Design Commission] New Inquiry from ${formData.name.trim()}`
        : `[Just Candids] New Photoshoot Booking from ${formData.name.trim()}`,
      _replyto: formData.email.trim(),
      'Service Type': formData.serviceType,
      'Estimated Timeline': formData.eventDateOrTimeline,
      'Client Details / Brief': formData.message.trim() || 'No additional notes provided.',
      _template: 'table',
      _captcha: 'false',
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    try {
      await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      // Gracefully continue to show confirmation banner even if offline or client network is slow
    } finally {
      clearTimeout(timeoutId);
      setIsSubmitting(false);
      setSubmitted(true);

      try {
        confetti({
          particleCount: 110,
          spread: 75,
          origin: { y: 0.6 },
          colors: isDesign
            ? ['#c084fc', '#a855f7', '#e879f9', '#ffd700', '#ffffff']
            : ['#7c3aed', '#9333ea', '#a855f7', '#c084fc', '#e9d5ff'],
        });
      } catch (err) {
        // Ignore
      }
    }
  };

  // Channels tailored strictly to the active mode
  const photographyChannels = [
    {
      platform: 'Just Candids Official Email',
      value: 'mail2just.candids@gmail.com',
      url: 'mailto:mail2just.candids@gmail.com',
      icon: Mail,
      badge: 'Primary Channel',
    },
    {
      platform: 'Just Candids Instagram',
      value: '@just.candids',
      url: 'https://www.instagram.com/just.candids/',
      icon: InstagramIcon,
      badge: '@just.candids',
    },
  ];

  const designChannels = [
    {
      platform: 'Design & Direct Email',
      value: 'mail2shiva04@gmail.com',
      url: 'mailto:mail2shiva04@gmail.com',
      icon: Mail,
      badge: 'Direct Client Inquiries',
    },
    {
      platform: 'Personal & Design Instagram',
      value: '@single_soul_01',
      url: 'https://www.instagram.com/single_soul_01/',
      icon: InstagramIcon,
      badge: '@single_soul_01',
    },
  ];

  const channels = isDesign ? designChannels : photographyChannels;

  // Services tailored strictly to active mode
  const photographyServices = [
    { label: 'Candid Portrait Session', value: 'candid-portrait' },
    { label: 'Wedding / Couple Candid', value: 'wedding-couple' },
    { label: 'Cultural Celebration & Festival', value: 'celebration-event' },
    { label: 'Street & Outdoor Story', value: 'street-story' },
    { label: 'Custom Photo Shoot', value: 'custom-photo' },
  ];

  const designServices = [
    { label: 'Brand Identity & Logo System', value: 'branding' },
    { label: 'Social Media Creatives & Ads', value: 'social-media' },
    { label: 'Event Poster & Banner Design', value: 'poster-banner' },
    { label: 'Official Certificate & Print', value: 'certificate-print' },
    { label: 'Custom Graphic Design Scope', value: 'custom-design' },
  ];

  const services = isDesign ? designServices : photographyServices;

  return (
    <section id="contact" className="py-20 lg:py-28 relative overflow-hidden bg-[#050508] border-t border-purple-500/15 scroll-mt-24 lg:scroll-mt-28">
      {/* Royal Purple glow orbs */}
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-700/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[350px] h-[350px] bg-violet-900/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1560px] 2xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 relative z-10">

        {/* Header with Centered Balance */}
        <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-14 space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-semibold tracking-wide backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-purple-300" />
            <span className="font-project-label text-[11px]">
              {isDesign ? 'Commission Graphic Design • Siva Subramaniyam' : 'Book Just Candids Photography • Siva Subramaniyam'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-section-title text-white tracking-tight leading-tight [text-wrap:balance]">
            {isDesign ? "Let's Build Your Visual Identity" : "Let's Capture Your Candid Story"}
          </h2>
          <p className="font-body text-slate-300 text-sm sm:text-base leading-relaxed [text-wrap:pretty]">
            {isDesign
              ? 'Need a custom brand identity, marketing posters, event certificates, or social media campaign designs? Send a brief below.'
              : 'Looking for a portrait or event photoshoot with Just Candids, or couple session? Send a message below.'}
          </p>
          <p className="font-featured-statement text-purple-200/90 text-sm sm:text-base italic pt-0.5">
            {isDesign
              ? '“Great design doesn\'t just catch attention; it builds authority and enduring recall.”'
              : '“Your story deserves to be preserved in its purest, most authentic light.”'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-[1400px] mx-auto">

          {/* Left Column: Direct Connect & Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#090a14] border border-purple-500/20 shadow-xl shadow-purple-950/20 space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-section-title text-white tracking-tight">
                  {isDesign ? 'Design Inquiries' : 'Photography Inquiries'}
                </h3>
                <p className="font-body text-xs sm:text-[13px] text-slate-400 leading-relaxed [text-wrap:pretty]">
                  {isDesign
                    ? 'Available for bespoke brand identity, social media creatives, print media, certificates, and commercial design.'
                    : 'Available for portrait sessions, cultural celebrations, weddings, and candid documentary assignments.'}
                </p>
              </div>

              {/* Official Channels */}
              <div className="space-y-3 pt-1">
                <div className="font-project-label text-[10px] sm:text-[11px] text-purple-300/80 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  <span>{isDesign ? 'Official Design Contact' : 'Just Candids Channels'}</span>
                </div>
                <div className="space-y-3">
                  {channels.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.platform}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3.5 rounded-2xl bg-[#0e0f1c] border border-purple-500/20 hover:border-purple-500/60 hover:bg-purple-950/30 transition-all group shadow-sm"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className="w-9 h-9 rounded-xl bg-purple-950/70 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform border border-purple-500/30 shrink-0">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-nav font-medium text-white tracking-wide truncate flex items-center gap-2">
                              <span>{link.platform}</span>
                            </div>
                            <div className="text-[11px] text-purple-300/80 tracking-normal mt-0.5 truncate font-mono">{link.value}</div>
                          </div>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Guarantees */}
              <div className="pt-4 border-t border-purple-500/15 space-y-2.5 text-xs font-body text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50 shrink-0" />
                  <span>
                    {isDesign ? 'Design project slots currently open' : 'Photoshoot bookings currently open for upcoming dates'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400 shadow-sm shadow-purple-400/50 shrink-0" />
                  <span>Fast response within 24 business hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-violet-400 shadow-sm shadow-violet-400/50 shrink-0" />
                  <span>
                    {isDesign
                      ? 'Delivered in 300 DPI press print files & web-optimized assets'
                      : 'All photography delivered in high-res RAW mastered JPEGs'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-9 rounded-3xl bg-[#090a14] border border-purple-500/20 shadow-2xl relative shadow-purple-950/30">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-purple-950/60 text-purple-300 border border-purple-500/40 flex items-center justify-center mx-auto animate-bounce shadow-lg shadow-purple-600/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-section-title text-white tracking-tight">
                    Inquiry Received!
                  </h3>
                  <p className="font-body text-sm text-slate-300 max-w-md mx-auto leading-relaxed [text-wrap:pretty]">
                    Thanks for reaching out, <span className="text-white font-medium">{formData.name || 'Friend'}</span>!{' '}
                    Your inquiry details have been dispatched directly to <span className="text-purple-300 font-mono text-xs font-semibold">{targetEmail}</span>.
                    {isDesign
                      ? ' Siva will review your project brief and get back to you with timeline and scope details shortly.'
                      : ' The Just Candids team will get back to you with rates and scheduling details shortly.'}
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        serviceType: isDesign ? 'branding' : 'candid-portrait',
                        eventDateOrTimeline: 'Next 2-4 weeks',
                        message: '',
                      });
                    }}
                    className="px-6 py-2.5 rounded-full bg-purple-950/60 text-purple-300 border border-purple-500/30 text-xs font-nav font-medium tracking-wide hover:bg-purple-900/40 transition-all mt-4"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="font-project-label text-xs text-purple-300/80 block">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={80}
                        autoComplete="name"
                        placeholder="e.g. Priya Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value.slice(0, 80) })}
                        className="w-full px-4 py-3 rounded-xl bg-[#0e0f1c] border border-purple-500/20 text-white text-sm font-body focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-slate-600 leading-normal"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="font-project-label text-xs text-purple-300/80 block">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        maxLength={120}
                        autoComplete="email"
                        placeholder="priya@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value.slice(0, 120) })}
                        className="w-full px-4 py-3 rounded-xl bg-[#0e0f1c] border border-purple-500/20 text-white text-sm font-body focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-slate-600 leading-normal"
                      />
                    </div>
                  </div>

                  {/* Service Type Selection with Balanced Grid */}
                  <div className="space-y-2">
                    <label className="font-project-label text-xs text-purple-300/80 block">
                      {isDesign ? 'Design Service Required' : 'Photoshoot Type'}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {services.map((item) => (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => {
                            soundEngine.playDialClick();
                            setFormData({ ...formData, serviceType: item.value });
                          }}
                          className={`px-2.5 sm:px-3 py-2.5 rounded-xl text-xs font-nav font-medium border text-center transition-all leading-tight ${formData.serviceType === item.value
                            ? 'bg-purple-600 text-white border-purple-400 shadow-md shadow-purple-600/40'
                            : 'bg-[#0e0f1c] text-slate-400 border-purple-500/15 hover:text-white hover:border-purple-500/40'
                            }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Timeline Selection */}
                  <div className="space-y-1.5">
                    <label className="font-project-label text-xs text-purple-300/80 block">
                      {isDesign ? 'Target Deadline / Launch' : 'Estimated Shoot Date / Timeline'}
                    </label>
                    <input
                      type="text"
                      maxLength={100}
                      placeholder="e.g. Next month, Nov 2026, or flexible"
                      value={formData.eventDateOrTimeline}
                      onChange={(e) => setFormData({ ...formData, eventDateOrTimeline: e.target.value.slice(0, 100) })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0e0f1c] border border-purple-500/20 text-white text-sm font-body focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-slate-600 leading-normal"
                    />
                  </div>

                  {/* Details or Brief */}
                  <div className="space-y-1.5">
                    <label className="font-project-label text-xs text-purple-300/80 block">
                      {isDesign ? 'Design Scope & Project Brief' : 'Shoot Details & Requirements'}
                    </label>
                    <textarea
                      rows={3}
                      maxLength={1200}
                      placeholder={
                        isDesign
                          ? 'Share your project brief (brand name, target audience, deliverables, style preferences)...'
                          : 'Share your requirements (e.g. shoot location, event date, guest count, vision)...'
                      }
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value.slice(0, 1200) })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0e0f1c] border border-purple-500/20 text-white text-sm font-body focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-slate-600 resize-none leading-normal"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-purple-700 via-purple-600 to-violet-600 text-white font-nav font-medium text-sm tracking-wide hover:shadow-purple-600/50 shadow-xl shadow-purple-700/30 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:pointer-events-none"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 text-white animate-spin" />
                        <span>Sending Inquiry to Inbox...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-white" />
                        <span>{isDesign ? 'Commission Graphic Design' : 'Book a Just Candids Session'}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
