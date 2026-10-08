'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Cpu,
  Zap,
  ShieldCheck,
  RefreshCw,
  Server,
  Layers,
  ArrowRight,
  Activity,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { Chip, FOCUS, H2, Wrap } from './ui';

// Homepage video.
// Set a Google Drive file ID to play that video in Drive's player. The file must be shared as
// "Anyone with the link", or visitors will see a Google access message.
// Set this to null to play the self-hosted file at /tech_stack_video.mp4 instead (autoplay, loop, custom controls).
const HOMEPAGE_VIDEO_DRIVE_ID: string | null = null;

const ARCHITECTURE_FEATURES = [
  {
    icon: Zap,
    title: 'Smart Gateway Routing',
    desc: 'Dynamic transaction routing powered by real-time bank gateway success rate telemetry with sub-second failover.',
    badge: '<150ms Switch',
  },
  {
    icon: Server,
    title: 'High-Throughput Core',
    desc: 'Scalable cloud infrastructure processing 10,000+ TPS with 99.998% high-availability SLA.',
    badge: '10K+ TPS',
  },
  {
    icon: RefreshCw,
    title: 'Instant T+0 Settlement',
    desc: 'Automated bank clearing cycles with instant penny drop verification and automated ledger reconciliation.',
    badge: 'T+0 Available',
  },
  {
    icon: Sparkles,
    title: 'Gift360 Loyalty Engine',
    desc: 'One-click CRM activation converting payment data into customer loyalty points, cashback, and brand vouchers.',
    badge: '1-Click Sync',
  },
];

export default function TechStackShowcase() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [activeStage, setActiveStage] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-cycle through the 4 orchestration nodes for a smooth animated tech stack flow
  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % 4);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds) || timeInSeconds < 0) return '0:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && !isSeeking) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  return (
    <section className="relative overflow-hidden border-t border-slate-100 bg-gradient-to-b from-white via-[#F8FAFC] to-[#F1F5F9]/60 py-24 text-[#0F172A]">
      {/* Background Decorative Glows */}
      <div className="pointer-events-none absolute -top-40 right-1/4 h-[550px] w-[550px] rounded-full bg-blue-100/40 blur-[100px]" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 left-10 h-[450px] w-[450px] rounded-full bg-sky-100/30 blur-[90px]" aria-hidden="true" />

      <Wrap className="relative flex flex-col gap-14">
        {/* Section Header */}
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0457F1] shadow-2xs backdrop-blur-xs">
            <Cpu className="h-3.5 w-3.5 text-[#0457F1]" />
            Architecture & Tech Stack
          </div>
          <h2 className={clsx(H2, 'max-w-[800px] text-[#0F172A]')}>
            See the engine in motion.{' '}
            <span className="bg-gradient-to-r from-[#0457F1] via-[#0284C7] to-[#00A3FF] bg-clip-text text-transparent">
              Real-time payment orchestration.
            </span>
          </h2>
          <p className="max-w-[660px] text-base leading-relaxed text-[#475569]">
            Watch how SabbPe moves money across payment channels, orchestrates intelligent multi-bank routing, settles funds instantly, and activates Gift360 CRM loyalty.
          </p>
        </div>

        {/* Master Enterprise Dashboard Window Frame */}
        <div className="relative mx-auto w-full max-w-[1080px] overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-[0_25px_70px_-15px_rgba(15,23,42,0.12)]">
          {/* macOS Style Window Title Bar */}
          <div className="flex items-center justify-between border-b border-slate-200/80 bg-[#F8FAFC] px-5 py-3.5 text-xs font-medium text-slate-500">
            {/* Window Controls (Red, Yellow, Green) */}
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#FF5F56] shadow-2xs" />
              <span className="h-3 w-3 rounded-full bg-[#FFBD2E] shadow-2xs" />
              <span className="h-3 w-3 rounded-full bg-[#27C93F] shadow-2xs" />
              <span className="ml-3 hidden text-[11px] font-semibold text-slate-400 sm:inline-block">
                SabbPe Orchestration Engine v3.4
              </span>
            </div>

            {/* URL / Telemetry Bar */}
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1 text-[11.5px] text-slate-600 shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-slate-400">https://</span>
              <span className="font-medium text-[#0F172A]">orchestration.sabbpe.com</span>
              <span className="text-slate-300">/</span>
              <span className="font-mono text-[#0457F1]">live-stream</span>
            </div>

            {/* Live Uptime & Status Badge */}
            <div className="flex items-center gap-2">
              <span className="hidden items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200 md:inline-flex">
                <Activity className="h-3 w-3" /> 99.99% Uptime
              </span>
              <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-bold text-[#0457F1] border border-blue-200">
                Live Engine
              </span>
            </div>
          </div>

          {/* Video Player & Dynamic Interactive Canvas Container */}
          <div className="relative aspect-video w-full overflow-hidden bg-[#0A1120]">
            {/* HTML5 Native Looping Video Player */}
            {HOMEPAGE_VIDEO_DRIVE_ID ? (
              <iframe
                src={`https://drive.google.com/file/d/${HOMEPAGE_VIDEO_DRIVE_ID}/preview`}
                title="SabbPe platform video"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 h-full w-full border-0"
              />
            ) : !videoError ? (
              <video
                ref={videoRef}
                src="/tech_stack_video.mp4"
                poster="/hero-poster.jpg"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onDurationChange={handleLoadedMetadata}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onError={() => setVideoError(true)}
                className="h-full w-full object-cover"
              />
            ) : null}

            {/* High-Tech Fallback Interactive Architecture Simulation */}
            {!HOMEPAGE_VIDEO_DRIVE_ID && videoError && (
              <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-br from-[#070D1B] via-[#0B1528] to-[#131F37] p-5 text-white sm:p-8 overflow-hidden">
                {/* Tech Canvas Grid Overlay */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, #38BDF8 1px, transparent 0)',
                    backgroundSize: '24px 24px',
                  }}
                  aria-hidden="true"
                />

                {/* Animated Cybernetic Sweep Scanline */}
                <motion.div
                  className="pointer-events-none absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent blur-xs opacity-40"
                  animate={{
                    top: ['-20%', '120%'],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  aria-hidden="true"
                />

                {/* Top Status Stream */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  <div className="flex items-center gap-2 text-cyan-400">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 animate-ping" />
                    <span>SYSTEM_ACTIVE // CLUSTER: MUMBAI-DC1</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="hidden sm:inline-block text-[11px] text-slate-400">LATENCY: <strong className="text-emerald-400">18ms</strong></span>
                    <div className="rounded-full border border-cyan-500/30 bg-cyan-950/70 px-3 py-1 text-cyan-300 backdrop-blur-sm shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                      TPS: 12,480 • 99.998% SLA
                    </div>
                  </div>
                </div>

                {/* Center Visual: Real-Time Flow Architecture Nodes with Animated Connectivity */}
                <div className="relative z-10 my-auto grid grid-cols-1 items-center gap-3.5 sm:grid-cols-4 sm:gap-4 text-center">
                  {/* Node 1: Input Channels */}
                  <button
                    type="button"
                    onClick={() => setActiveStage(0)}
                    className={clsx(
                      'group relative flex flex-col items-center rounded-2xl border p-4 transition-all duration-300 text-left sm:text-center',
                      activeStage === 0
                        ? 'border-cyan-400/80 bg-gradient-to-b from-blue-900/80 to-blue-950/90 shadow-[0_0_25px_rgba(56,189,248,0.35)] scale-105'
                        : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/60 opacity-80',
                    )}
                  >
                    <div
                      className={clsx(
                        'mb-2 flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300',
                        activeStage === 0
                          ? 'bg-[#0457F1] text-white shadow-[0_0_15px_rgba(4,87,241,0.6)] scale-110'
                          : 'bg-blue-500/20 text-cyan-300',
                      )}
                    >
                      <Layers className="h-5 w-5" />
                    </div>
                    <div className="text-xs font-bold text-white">1. Ingestion</div>
                    <div className="text-[11px] text-slate-400 mt-1">UPI, Dynamic QR, Cards</div>
                    <div className="mt-2 text-[10px] font-mono text-emerald-400 font-semibold">
                      {activeStage === 0 ? '● Ingesting Payload ₹4,850' : '● 100% Ingested'}
                    </div>
                  </button>

                  {/* Node 2: SabbPe Routing Engine */}
                  <button
                    type="button"
                    onClick={() => setActiveStage(1)}
                    className={clsx(
                      'group relative flex flex-col items-center rounded-2xl border p-4 transition-all duration-300 text-left sm:text-center',
                      activeStage === 1
                        ? 'border-[#0457F1] bg-gradient-to-b from-blue-900/90 to-blue-950 shadow-[0_0_30px_rgba(4,87,241,0.45)] scale-105'
                        : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/60 opacity-80',
                    )}
                  >
                    <div
                      className={clsx(
                        'mb-2 flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300',
                        activeStage === 1
                          ? 'bg-[#0457F1] text-white shadow-[0_0_15px_rgba(4,87,241,0.7)] scale-110'
                          : 'bg-[#0457F1]/20 text-blue-300',
                      )}
                    >
                      <Zap className="h-5 w-5" />
                    </div>
                    <div className="text-xs font-bold text-white">2. Smart Routing</div>
                    <div className="text-[11px] text-blue-200 mt-1">AI Routing & Instant Failover</div>
                    <div className="mt-2 rounded-full bg-blue-500/30 px-2 py-0.5 text-[9.5px] font-mono text-cyan-300 font-bold">
                      {activeStage === 1 ? '⚡ HDFC Selected (99.8%)' : 'Optimal Route Active'}
                    </div>
                  </button>

                  {/* Node 3: Settlement */}
                  <button
                    type="button"
                    onClick={() => setActiveStage(2)}
                    className={clsx(
                      'group relative flex flex-col items-center rounded-2xl border p-4 transition-all duration-300 text-left sm:text-center',
                      activeStage === 2
                        ? 'border-indigo-400/80 bg-gradient-to-b from-indigo-950/90 to-slate-950 shadow-[0_0_25px_rgba(129,140,248,0.35)] scale-105'
                        : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/60 opacity-80',
                    )}
                  >
                    <div
                      className={clsx(
                        'mb-2 flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300',
                        activeStage === 2
                          ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.6)] scale-110'
                          : 'bg-indigo-500/20 text-indigo-300',
                      )}
                    >
                      <RefreshCw className="h-5 w-5" />
                    </div>
                    <div className="text-xs font-bold text-white">3. T+0 Settlement</div>
                    <div className="text-[11px] text-slate-400 mt-1">Direct Bank Account Credit</div>
                    <div className="mt-2 text-[10px] font-mono text-emerald-400 font-semibold">
                      {activeStage === 2 ? '● IMPS / Penny Drop Cleared' : '● Reconciled'}
                    </div>
                  </button>

                  {/* Node 4: Gift360 */}
                  <button
                    type="button"
                    onClick={() => setActiveStage(3)}
                    className={clsx(
                      'group relative flex flex-col items-center rounded-2xl border p-4 transition-all duration-300 text-left sm:text-center',
                      activeStage === 3
                        ? 'border-amber-400/80 bg-gradient-to-b from-amber-950/90 to-slate-950 shadow-[0_0_25px_rgba(245,158,11,0.35)] scale-105'
                        : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/60 opacity-80',
                    )}
                  >
                    <div
                      className={clsx(
                        'mb-2 flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300',
                        activeStage === 3
                          ? 'bg-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.7)] scale-110'
                          : 'bg-amber-500/20 text-amber-300',
                      )}
                    >
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div className="text-xs font-bold text-white">4. Gift360 Engine</div>
                    <div className="text-[11px] text-slate-400 mt-1">Rewards & Loyalty Triggered</div>
                    <div className="mt-2 text-[10px] font-mono text-amber-400 font-semibold">
                      {activeStage === 3 ? '★ +145 SuperCoins Awarded' : '● 1-Click Active'}
                    </div>
                  </button>
                </div>

                {/* Bottom Live Telemetry Stream Bar */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3 text-[11px] text-slate-400 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-300 font-semibold">LIVE PIPELINE:</span>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={activeStage}
                        initial={{ opacity: 0, x: 5 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -5 }}
                        transition={{ duration: 0.2 }}
                        className="text-slate-200"
                      >
                        {activeStage === 0 && 'Transaction #SB-9410 Ingested (UPI QR @ ₹4,850.00)'}
                        {activeStage === 1 && 'Intelligent AI Gateway Selected: HDFC PG (Latency 18ms)'}
                        {activeStage === 2 && 'Automated T+0 Bank Settlement & Penny-Drop Verified'}
                        {activeStage === 3 && 'Gift360 Loyalty Active: +145 Rewards Dispatched'}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    STREAMING_CONTINUOUSLY
                  </span>
                </div>
              </div>
            )}

            {/* Floating Player Control Bar Overlay with Interactive Timebar */}
            <div className={clsx('absolute bottom-4 left-4 right-4 z-20 flex flex-col gap-2 rounded-xl border border-white/15 bg-black/75 p-3.5 text-white backdrop-blur-md transition-all', HOMEPAGE_VIDEO_DRIVE_ID && 'hidden')}>
              {/* Interactive Scrub / Time Progress Bar */}
              <div className="group/timebar relative flex w-full items-center py-1 cursor-pointer">
                <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/20 transition-all group-hover/timebar:h-2.5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#0457F1] to-[#38BDF8] shadow-[0_0_8px_rgba(56,189,248,0.6)]"
                    style={{
                      width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                    }}
                  />
                </div>
                {/* Scrub Thumb Handle */}
                <div
                  className="pointer-events-none absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-white shadow-[0_0_8px_rgba(4,87,241,0.9)] opacity-0 transition-opacity group-hover/timebar:opacity-100"
                  style={{
                    left: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                  }}
                />
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  step={0.1}
                  value={currentTime}
                  onChange={handleSeekChange}
                  onMouseDown={() => setIsSeeking(true)}
                  onMouseUp={() => setIsSeeking(false)}
                  onTouchStart={() => setIsSeeking(true)}
                  onTouchEnd={() => setIsSeeking(false)}
                  aria-label="Seek video playback time"
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
              </div>

              {/* Controls Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 text-white transition-colors hover:bg-white/30"
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-white" />}
                  </button>

                  {/* Monospace Timestamp Display */}
                  <div className="flex items-center gap-1 rounded-md bg-white/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-slate-200 shadow-inner">
                    <span className="text-cyan-300">{formatTime(currentTime)}</span>
                    <span className="text-slate-400">/</span>
                    <span className="text-slate-300">{formatTime(duration)}</span>
                  </div>

                  <div className="hidden items-center gap-2 text-xs font-medium text-slate-300 sm:flex">
                    <span className="h-2 w-2 rounded-full bg-[#00D2FF]" />
                    <span className="font-semibold text-white">SabbPe Tech Stack Architecture</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 text-white transition-colors hover:bg-white/30"
                    aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={handleFullscreen}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 text-white transition-colors hover:bg-white/30"
                    aria-label="Fullscreen"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Feature Architecture Cards Under Dashboard */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ARCHITECTURE_FEATURES.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-300 hover:border-[#0457F1]/40 hover:shadow-md hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#0457F1] transition-colors group-hover:bg-[#0457F1] group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-600 transition-colors group-hover:bg-blue-50 group-hover:text-[#0457F1]">
                      {feat.badge}
                    </span>
                  </div>
                  <h3 className="font-display text-[16px] font-bold text-[#0F172A] transition-colors group-hover:text-[#0457F1]">
                    {feat.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#64748B]">
                    {feat.desc}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-[#0457F1]">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Enterprise Grade</span>
                </div>
              </div>
            );
          })}
        </div>
      </Wrap>
    </section>
  );
}
