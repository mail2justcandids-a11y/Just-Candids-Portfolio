/**
 * Studio-Grade Web Audio API Sound Engine for Just Candids
 * Generates authentic acoustic feedback modeled after real Canon EOS R10 & L-series optics:
 * - Dual-Curtain Focal Plane Mechanical Shutter (Heavy studio actuation)
 * - Quick Snap / Street Leaf Shutter (Crisp gallery inspection)
 * - Machined Mode Dial Ratchet (Knurled tactile switch)
 * - Lens Aperture Ring Detent (Precision optical click)
 * - Dual Pixel AF Focus Confirmation (Double-pip lock)
 * - Subtle Micro-Tick (Precision haptic slider adjustment)
 * 
 * 100% zero external audio assets, zero latency, zero network dependencies.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('just_candids_sound_muted');
      if (saved !== null) {
        this.isMuted = saved === 'true';
      }
    }
  }

  private initContext(): AudioContext | null {
    if (this.isMuted) return null;
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('just_candids_sound_muted', muted ? 'true' : 'false');
    }
  }

  public toggleMute(): boolean {
    const newState = !this.isMuted;
    this.setMuted(newState);
    if (!newState) {
      this.playDialClick();
    }
    return newState;
  }

  /**
   * Helper to generate a bandpassed noise burst transient
   */
  private createNoiseTransient(
    ctx: AudioContext,
    startTime: number,
    duration: number,
    centerFreq: number,
    q: number,
    peakGain: number
  ) {
    const bufferSize = Math.max(1, Math.floor(ctx.sampleRate * duration));
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp((-4 * i) / bufferSize);
    }

    const src = ctx.createBufferSource();
    src.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(centerFreq, startTime);
    filter.Q.setValueAtTime(q, startTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(peakGain, startTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    src.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    src.start(startTime);
    src.stop(startTime + duration + 0.01);
  }

  /**
   * 1. FLAGSHIP MECHANICAL SHUTTER (Canon EOS R10 Dual-Curtain Actuation)
   * Multi-stage physical acoustic model:
   * - Front curtain release click (metallic transient)
   * - High-speed focal blade travel
   * - Rear curtain brake catch (heavier metallic transient)
   * - Chassis resonance (deep 65Hz chassis body thump)
   * - Cocking spring dampener reset
   */
  public playMechanicalShutter() {
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Stage 1: Front curtain trip (crisp metallic click, 2800 Hz)
    this.createNoiseTransient(ctx, now, 0.022, 2800, 3.8, 0.65);

    // Subtle high-pitch release ping
    const pingOsc = ctx.createOscillator();
    const pingGain = ctx.createGain();
    pingOsc.type = 'triangle';
    pingOsc.frequency.setValueAtTime(3600, now);
    pingOsc.frequency.exponentialRampToValueAtTime(1200, now + 0.015);
    pingGain.gain.setValueAtTime(0.25, now);
    pingGain.gain.exponentialRampToValueAtTime(0.001, now + 0.015);
    pingOsc.connect(pingGain);
    pingGain.connect(ctx.destination);
    pingOsc.start(now);
    pingOsc.stop(now + 0.018);

    // Stage 2: Curtain travel whisper (t + 15ms)
    this.createNoiseTransient(ctx, now + 0.015, 0.03, 1600, 2.0, 0.18);

    // Stage 3: Rear curtain mechanical catch (t + 48ms - deep solid snap)
    const catchTime = now + 0.048;
    this.createNoiseTransient(ctx, catchTime, 0.035, 1750, 2.5, 0.7);

    // Stage 4: Camera Body Chassis Resonance (65Hz -> 28Hz sub thump)
    const bodyOsc = ctx.createOscillator();
    const bodyGain = ctx.createGain();
    bodyOsc.type = 'sine';
    bodyOsc.frequency.setValueAtTime(72, catchTime);
    bodyOsc.frequency.exponentialRampToValueAtTime(28, catchTime + 0.09);
    bodyGain.gain.setValueAtTime(0.45, catchTime);
    bodyGain.gain.exponentialRampToValueAtTime(0.001, catchTime + 0.09);
    bodyOsc.connect(bodyGain);
    bodyGain.connect(ctx.destination);
    bodyOsc.start(catchTime);
    bodyOsc.stop(catchTime + 0.095);

    // Stage 5: Micro gear-reset detent (t + 85ms)
    this.createNoiseTransient(ctx, now + 0.082, 0.015, 3400, 4.0, 0.2);
  }

  // Alias for backward compatibility
  public playShutter() {
    this.playMechanicalShutter();
  }

  /**
   * 2. QUICK SNAP / LEAF SHUTTER (Street & Gallery Inspection)
   * Crisp, immediate, high-satisfaction single-stroke snapshot
   */
  public playQuickSnap() {
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Metallic blade snap (3100Hz)
    this.createNoiseTransient(ctx, now, 0.02, 3100, 3.2, 0.45);

    // Body click transient (110Hz)
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.025);
    gain.gain.setValueAtTime(0.28, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.028);
  }

  /**
   * 3. CAMERA MODE DIAL CLICK (Knurled Ratchet Detent)
   * Used for mode switches (Frames vs Vectors, Studio lighting dials)
   */
  public playDialClick() {
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // First detent bump
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(1900, now);
    osc1.frequency.exponentialRampToValueAtTime(750, now + 0.014);
    gain1.gain.setValueAtTime(0.3, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.014);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.016);

    // Spring catch (t + 9ms)
    this.createNoiseTransient(ctx, now + 0.009, 0.016, 2400, 4.5, 0.25);
  }

  /**
   * 4. LENS APERTURE RING DETENT (Precision Optical Detent)
   * Used for Darkroom Color Grading Presets
   */
  public playApertureClick() {
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Machined ring click
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(3200, now);
    osc.frequency.exponentialRampToValueAtTime(950, now + 0.018);
    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.018);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.02);

    this.createNoiseTransient(ctx, now, 0.012, 4200, 5.0, 0.2);
  }

  /**
   * 5. DUAL PIXEL AF CONFIRMATION BEEP (Canon Focus Lock Double-Pip)
   * Used for "Book a Session" CTAs & confirmations
   */
  public playFocusBeep() {
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Pip 1: 1760 Hz (A6)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(1760, now);
    gain1.gain.setValueAtTime(0.16, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.038);

    // Pip 2: 2093 Hz (C7) - t + 32ms
    const pip2Time = now + 0.032;
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(2093, pip2Time);
    gain2.gain.setValueAtTime(0.18, pip2Time);
    gain2.gain.exponentialRampToValueAtTime(0.001, pip2Time + 0.045);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(pip2Time);
    osc2.stop(pip2Time + 0.048);
  }

  /**
   * 6. HAPTIC MICRO-TICK
   * Used for sliders (contrast, exposure), zoom controls, and fine-tuning
   */
  public playTick() {
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1400, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.008);

    gain.gain.setValueAtTime(0.09, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.008);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.01);
  }
}

export const soundEngine = new SoundEngine();
