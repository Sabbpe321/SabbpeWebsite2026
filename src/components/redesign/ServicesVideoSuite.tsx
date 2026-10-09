'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import {
  CreditCard,
  QrCode,
  Repeat,
  Send,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Sparkles,
  Layers,
  ArrowRight,
  ArrowLeft,
  Home,
  CheckCircle2,
  Activity,
  Split,
  Smartphone,
  FileCheck2,
  Zap,
  Users,
  ShieldCheck,
  Film,
  Gift,
} from 'lucide-react';
import { Chip, FOCUS, H2, Wrap } from './ui';

export interface VideoSubFeature {
  id: string;
  name: string;
  tagline: string;
  desc: string;
  videoSrc: string;
  posterSrc?: string;
  icon: React.ElementType;
}

export interface ServiceCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  features: VideoSubFeature[];
}

const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'online-payments',
    title: 'Online payments',
    subtitle: 'UPI, cards, net banking and wallets in one integration',
    icon: CreditCard,
    color: '#0457F1',
    features: [
      {
        id: 'pay-by-link',
        name: 'Pay-by-Link',
        tagline: 'Instant payment links via SMS, WhatsApp & Email',
        desc: 'Generate customized, dynamic checkout links with zero code. Send directly to customers via messaging apps with automated expiry and real-time payment webhooks.',
        videoSrc: '/videos/pay_by_link.mp4',
        icon: Send,
      },
      {
        id: 'split-payment',
        name: 'Split Payment',
        tagline: 'Multi-vendor split settlement in one transaction',
        desc: 'Automatically route and divide a single customer payment among multiple vendor accounts and commission pools with customized percentage or fixed splits.',
        videoSrc: '/videos/split_payment.mp4',
        icon: Split,
      },
      {
        id: 'smartpay',
        name: 'Smartpay Checkout',
        tagline: 'Optimized multi-rail payment gateway & checkout',
        desc: 'Intelligent routing across payment gateways, cards, UPI VPAs, and net banking with auto-retry and high conversion checkout experiences.',
        videoSrc: '/videos/Smartpay.mp4',
        icon: CreditCard,
      },
    ],
  },
  {
    id: 'collections-recurring',
    title: 'Collections and recurring',
    subtitle: 'UPI Autopay mandates and scheduled collections',
    icon: Repeat,
    color: '#6366F1',
    features: [
      {
        id: 'upi-autopay',
        name: 'UPI Autopay',
        tagline: 'UPI AutoPay e-mandates with zero OTP friction',
        desc: 'Set up recurring auto-debit rules up to ₹1,00,000 without OTP friction after one-time customer authorization on any UPI app.',
        videoSrc: '/videos/UPI_Autopay.mp4',
        icon: Repeat,
      },
      {
        id: 'easy-collect',
        name: 'Easy Collect',
        tagline: 'Instant collect requests pushed to customer UPI handles',
        desc: 'Push instant payment notifications directly into customer banking apps with custom reference notes, automated retries, and instant approval triggers.',
        videoSrc: '/videos/easy_collect.mp4',
        icon: Zap,
      },
      {
        id: 'sub-merchant',
        name: 'Sub-Merchant Collections',
        tagline: 'Multi-tier partner and distributor recurring collections',
        desc: 'Enable distributor networks, franchisees, and partner platforms to manage multi-tier automated collections with centralized master reporting.',
        videoSrc: '/videos/Sub-merchant.mp4',
        icon: Users,
      },
    ],
  },
  {
    id: 'upi-qr',
    title: 'UPI and QR',
    subtitle: 'In-store QR and assisted payments',
    icon: QrCode,
    color: '#0284C7',
    features: [
      {
        id: 'upi-deeplink',
        name: 'UPI Deeplink',
        tagline: '1-Click App-to-App UPI intent checkout',
        desc: 'Seamlessly launch customer-installed UPI apps directly on mobile checkout with zero manual VPA typing and 99.4% first-time success rates.',
        videoSrc: '/videos/UPI_Deeplink.mp4',
        icon: Smartphone,
      },
      {
        id: 'smartpay-qr',
        name: 'Smartpay QR',
        tagline: 'Dynamic counter codes & Soundbox integration',
        desc: 'Accept payments across GPay, PhonePe, Paytm, and any banking app with instant audio-visual confirmations and real-time merchant settlement.',
        videoSrc: '/videos/Smartpay.mp4',
        icon: QrCode,
      },
    ],
  },
  {
    id: 'disbursements',
    title: 'Disbursements',
    subtitle: 'Single and bulk payouts to vendors and customers',
    icon: Send,
    color: '#059669',
    features: [
      {
        id: 'payouts',
        name: 'Instant Payouts',
        tagline: '24x7 instant single & bulk payouts across India',
        desc: 'Disburse funds instantly to bank accounts, UPI VPAs, and cards using smart payout routing via IMPS, NEFT, RTGS, and UPI with real-time status webhooks.',
        videoSrc: '/videos/Payouts.mp4',
        icon: Send,
      },
    ],
  },
  {
    id: 'settlement-reporting',
    title: 'Settlement and reporting',
    subtitle: 'T+0 and T+1 settlement with downloadable reports',
    icon: FileCheck2,
    color: '#0F766E',
    features: [
      {
        id: 'settlement',
        name: 'Automatic Settlement',
        tagline: 'Automatic settlement on your timeline (T+0 / T+1)',
        desc: 'Share your bank account once at onboarding and choose your settlement cycle. A SabbPe agent settles on schedule, and every settlement displays in real-time.',
        videoSrc: '/videos/settlement.mp4',
        posterSrc: '/videos/settlement.jpg',
        icon: Zap,
      },
    ],
  },
  {
    id: 'reconciliation',
    title: 'Reconciliation',
    subtitle: 'Payments matched to settlements automatically',
    icon: FileCheck2,
    color: '#2563EB',
    features: [
      {
        id: 'reconciliation',
        name: 'Auto Reconciliation',
        tagline: 'Every record matched automatically by AI agent',
        desc: 'Drop in your orders, gateway payments and bank settlements. An autonomous agent matches every record, flags discrepancies and lets you trace any ID across files.',
        videoSrc: '/videos/reconciliation.mp4',
        posterSrc: '/videos/reconciliation.jpg',
        icon: FileCheck2,
      },
    ],
  },
  {
    id: 'dashboard',
    title: 'Dashboard and analytics',
    subtitle: 'Collections, payouts and settlements in one view',
    icon: Activity,
    color: '#7C3AED',
    features: [
      {
        id: 'merchant-dashboard',
        name: 'Merchant Dashboard',
        tagline: 'Unified command center to run your payments',
        desc: 'For businesses that accept payments. Choose products, collect payments, track every transaction in real-time, and disburse payouts directly.',
        videoSrc: '/videos/merchant_dashboard.mp4',
        posterSrc: '/videos/merchant_dashboard.jpg',
        icon: Activity,
      },
      {
        id: 'distributor-dashboard',
        name: 'Distributor Dashboard',
        tagline: 'Onboard merchants, track approvals and see earnings',
        desc: 'For channel partners who bring merchants to SabbPe. Onboard merchants, track approval milestones in real-time, and manage commission payouts.',
        videoSrc: '/videos/distributor_dashboard.mp4',
        posterSrc: '/videos/distributor_dashboard.jpg',
        icon: Users,
      },
    ],
  },
  {
    id: 'gift360',
    title: 'Gift360 Engine',
    subtitle: 'CRM and loyalty for your customers, on in one click',
    icon: Gift,
    color: '#E11D48',
    features: [
      {
        id: 'gift360-rewards',
        name: 'Loyalty & Rewards',
        tagline: 'Instant customer reward points, cashback & vouchers',
        desc: 'Disburse cashback, branded gift vouchers, and customer loyalty rewards in real time with a single API call.',
        videoSrc: '/videos/Gift360.mp4',
        icon: Gift,
      },
      {
        id: 'corporate-gifting',
        name: 'Corporate Gifting',
        tagline: 'Enterprise employee perks, payouts & gift cards',
        desc: 'Bulk issue corporate gift cards, employee incentives, and festive reward disbursements with custom enterprise branding.',
        videoSrc: '/videos/Gift360_corporate.mp4',
        icon: Sparkles,
      },
      {
        id: 'api-suite',
        name: 'API Integration Suite',
        tagline: 'RESTful developer APIs & webhooks for gifting',
        desc: 'Full API documentation and webhook pipelines for automated ledger synchronization, batch transfers, and loyalty reward redemption.',
        videoSrc: '/videos/Gift360-API_Integration.mp4',
        icon: Layers,
      },
      {
        id: 'distributor-mandates',
        name: 'Distributor Rewards',
        tagline: 'B2B dealer recurring rewards & mandate distribution',
        desc: 'Automate high-volume distributor order collections, dealer reward points, and franchise auto-debit billing schedules across India.',
        videoSrc: '/videos/GIFT360-Distributor.mp4',
        icon: Users,
      },
    ],
  },
];

function resolveCategoryIndex(slug?: string): number {
  if (!slug) return 0;
  const clean = decodeURIComponent(slug).toLowerCase().trim().replace(/[-_]/g, ' ');
  
  // 1. Direct category match or feature ID match
  for (let i = 0; i < SERVICE_CATEGORIES.length; i++) {
    const cat = SERVICE_CATEGORIES[i];
    const catId = cat.id.replace(/[-_]/g, ' ');
    const catTitle = cat.title.toLowerCase();
    if (clean === catId || clean === catTitle) return i;
    if (cat.features.some((f) => f.id.replace(/[-_]/g, ' ') === clean || f.name.toLowerCase().includes(clean) || clean.includes(f.id))) {
      return i;
    }
  }

  // 2. Keyword fallback matching
  if (clean.includes('recon')) return 5;
  if (clean.includes('dash') || clean.includes('analytic')) return 6;
  if (clean.includes('settle') || clean.includes('report')) return 4;
  if (clean.includes('gift') || clean.includes('loyalty') || clean.includes('crm') || clean.includes('reward')) return 7;
  if (clean.includes('disburse') || clean.includes('payout')) return 3;
  if (clean.includes('upi') || clean.includes('qr') || clean.includes('assisted') || clean.includes('deeplink')) return 2;
  if (clean.includes('collect') || clean.includes('recurring') || clean.includes('autopay') || clean.includes('mandate')) return 1;
  if (clean.includes('online') || clean.includes('pay') || clean.includes('card') || clean.includes('link') || clean.includes('split')) return 0;

  return 0;
}

export default function ServicesVideoSuite({
  initialCategory,
  initialFeature,
}: {
  initialCategory?: string;
  initialFeature?: string;
}) {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(() => resolveCategoryIndex(initialCategory || initialFeature));
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(() => {
    const catIdx = resolveCategoryIndex(initialCategory || initialFeature);
    const target = (initialFeature || initialCategory || '').toLowerCase().trim().replace(/[-_]/g, ' ');
    const fIdx = SERVICE_CATEGORIES[catIdx]?.features.findIndex(
      (f) => f.id.replace(/[-_]/g, ' ') === target || target.includes(f.id) || f.id.includes(target)
    );
    return fIdx !== -1 ? fIdx : 0;
  });
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds) || timeInSeconds < 0) return '0:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    if (initialCategory || initialFeature) {
      const idx = resolveCategoryIndex(initialCategory || initialFeature);
      setActiveCategoryIndex(idx);
      const target = (initialFeature || initialCategory || '').toLowerCase().trim().replace(/[-_]/g, ' ');
      const fIdx = SERVICE_CATEGORIES[idx]?.features.findIndex(
        (f) => f.id.replace(/[-_]/g, ' ') === target || target.includes(f.id) || f.id.includes(target)
      );
      setActiveFeatureIndex(fIdx !== -1 ? fIdx : 0);
    }
  }, [initialCategory, initialFeature]);

  const currentCategory = SERVICE_CATEGORIES[activeCategoryIndex] || SERVICE_CATEGORIES[0];
  const currentFeature = currentCategory.features[activeFeatureIndex] || currentCategory.features[0];

  // Reset video state when switching tabs
  useEffect(() => {
    setVideoError(false);
    setCurrentTime(0);
    setDuration(0);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [activeCategoryIndex, activeFeatureIndex]);

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
    <section className="relative overflow-hidden border-t border-slate-100 bg-gradient-to-b from-white via-[#F8FAFC] to-[#F1F5F9]/50 py-24 text-[#0F172A]">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -top-40 left-1/3 h-[500px] w-[500px] rounded-full bg-blue-100/40 blur-[100px]" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-[450px] w-[450px] rounded-full bg-sky-100/30 blur-[90px]" aria-hidden="true" />

      <Wrap className="relative flex flex-col gap-8">
        {/* Navigation Bar with Back Button and Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
          <button
            type="button"
            onClick={() => {
              if (typeof window !== 'undefined' && window.history.length > 1) {
                window.history.back();
              } else {
                window.location.href = '/';
              }
            }}
            className={clsx(
              'group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-[#0F172A] shadow-2xs transition-all hover:border-[#0457F1] hover:bg-[#EFF6FF] hover:text-[#0457F1]',
              FOCUS,
            )}
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1 text-[#0457F1]" />
            <span>Go Back</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link href="/" className="hover:text-[#0457F1] flex items-center gap-1">
              <Home className="h-3.5 w-3.5" />
              <span>Home</span>
            </Link>
            <span className="text-slate-300">/</span>
            <Link href="/services" className="hover:text-[#0457F1]">Services</Link>
            <span className="text-slate-300">/</span>
            <span className="font-bold text-[#0457F1]">{currentCategory.title}</span>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0457F1] shadow-2xs backdrop-blur-xs">
            <Film className="h-3.5 w-3.5 text-[#0457F1]" />
            Live System Demonstrations
          </div>
          <h2 className={clsx(H2, 'max-w-[820px] text-[#0F172A]')}>
            Experience how SabbPe powers{' '}
            <span className="bg-gradient-to-r from-[#0457F1] via-[#0284C7] to-[#00A3FF] bg-clip-text text-transparent">
              every payment flow.
            </span>
          </h2>
          <p className="max-w-[660px] text-base leading-relaxed text-[#475569]">
            Select any service below to explore live video demonstrations and interactive feature walkthroughs of our 8 core payment capabilities.
          </p>
        </div>

        {/* Main Service Category Cards - Spacious 4x2 Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICE_CATEGORIES.map((cat, idx) => {
            const isSelected = idx === activeCategoryIndex;
            const Icon = cat.icon;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveCategoryIndex(idx);
                  setActiveFeatureIndex(0);
                  if (typeof window !== 'undefined') {
                    window.history.replaceState(null, '', `/services/${cat.id}`);
                  }
                }}
                className={clsx(
                  'group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-5 text-left transition-all duration-200 cursor-pointer',
                  FOCUS,
                  isSelected
                    ? 'border-[#0457F1] bg-gradient-to-b from-[#EFF6FF] via-[#DBEAFE]/20 to-white shadow-[0_4px_20px_rgba(4,87,241,0.15)] ring-2 ring-[#0457F1]/20 scale-[1.01]'
                    : 'border-slate-200/90 bg-white hover:border-[#0457F1]/50 hover:bg-[#F8FAFC] shadow-2xs hover:shadow-xs',
                )}
              >
                <div className="flex items-center justify-between mb-3.5">
                  <div
                    className={clsx(
                      'flex h-10 w-10 items-center justify-center rounded-xl transition-colors',
                      isSelected ? 'bg-[#0457F1] text-white shadow-xs' : 'bg-blue-50 text-[#0457F1] group-hover:bg-[#0457F1] group-hover:text-white',
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span
                    className={clsx(
                      'rounded-full px-2.5 py-0.5 text-[11px] font-bold transition-colors',
                      isSelected ? 'bg-[#0457F1] text-white' : 'bg-slate-100 text-slate-600',
                    )}
                  >
                    {cat.features.length} {cat.features.length === 1 ? 'Demo' : 'Demos'}
                  </span>
                </div>

                <div>
                  <h3
                    className={clsx(
                      'font-display text-[16px] font-bold leading-snug transition-colors',
                      isSelected ? 'text-[#0457F1]' : 'text-[#0F172A]',
                    )}
                  >
                    {cat.title}
                  </h3>
                  <p className="mt-1.5 text-[12.5px] text-[#64748B] leading-relaxed">
                    {cat.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Master Showcase: Sub-Feature Video Tabs + Continuous Looping Player */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-[0_20px_60px_-15px_rgba(15,23,42,0.1)] p-6 sm:p-10">
          {/* Sub-Feature Video Pills Selector */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1">
                Select Feature Demo:
              </span>
              {currentCategory.features.map((feat, fIdx) => {
                const isFeatureActive = fIdx === activeFeatureIndex;
                const FeatIcon = feat.icon;

                return (
                  <button
                    key={feat.id}
                    type="button"
                    onClick={() => setActiveFeatureIndex(fIdx)}
                    className={clsx(
                      'group relative inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all duration-200 cursor-pointer',
                      FOCUS,
                      isFeatureActive
                        ? 'bg-[#0457F1] text-white shadow-[0_4px_14px_rgba(4,87,241,0.3)] scale-105'
                        : 'bg-[#F8FAFC] text-[#334155] border border-slate-200 hover:border-[#0457F1]/50 hover:bg-white',
                    )}
                  >
                    <FeatIcon className={clsx('h-3.5 w-3.5', isFeatureActive ? 'text-white' : 'text-[#0457F1]')} />
                    <span>{feat.name}</span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined' && window.history.length > 1) {
                  window.history.back();
                } else {
                  window.location.href = '/';
                }
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-[#F8FAFC] px-3.5 py-2 text-xs font-semibold text-slate-600 hover:border-[#0457F1] hover:bg-[#EFF6FF] hover:text-[#0457F1] transition-all cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back</span>
            </button>
          </div>

          {/* Main Content Layout: Video Player (Left 7 Cols) + Feature Insights (Right 5 Cols) */}
          <div className="grid items-center gap-8 pt-8 lg:grid-cols-12">
            {/* Left: Video Player inside Enterprise Mock Frame */}
            <div className="lg:col-span-7 overflow-hidden rounded-2xl border border-slate-200 bg-[#0A1120] shadow-md">
              {/* Frame Header Bar */}
              <div className="flex items-center justify-between border-b border-slate-800 bg-[#0E1726] px-4 py-2.5 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
                  <span className="ml-2 hidden font-mono text-[11px] text-slate-400 sm:inline-block">
                    sabbpe.com/services/{currentCategory.id}/{currentFeature.id}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> LIVE STREAM
                  </span>
                </div>
              </div>

              {/* Video Player & Fallback Sandbox */}
              <div className="relative aspect-video w-full overflow-hidden bg-[#0A1120]">
                {/* HTML5 Native Looping Video */}
                {!videoError && (
                  <video
                    ref={videoRef}
                    key={currentFeature.videoSrc}
                    src={`${currentFeature.videoSrc}#t=1`}
                    poster={currentFeature.posterSrc}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    preload="metadata"
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onDurationChange={handleLoadedMetadata}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onError={() => setVideoError(true)}
                    className="h-full w-full object-cover"
                  />
                )}

                {/* High-Tech Interactive Fallback Animation Canvas for all 8 Features */}
                {videoError && (
                  <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-br from-[#0B132B] via-[#0D1B2A] to-[#1C2541] p-6 text-white sm:p-8">
                    {/* Background Blueprint Grid */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-15"
                      style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, #38BDF8 1px, transparent 0)',
                        backgroundSize: '20px 20px',
                      }}
                      aria-hidden="true"
                    />

                    {/* Top Canvas Header */}
                    <div className="relative z-10 flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2 text-cyan-400">
                        <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                        <span>MODULE: {currentFeature.name.toUpperCase()}</span>
                      </div>
                      <span className="rounded-full bg-blue-900/60 px-3 py-0.5 text-blue-300 border border-blue-500/30 text-[10.5px]">
                        SERVICE: {currentCategory.title}
                      </span>
                    </div>

                    {/* Center Animated Interactive Demonstration Canvas */}
                    <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0457F1] text-white shadow-[0_0_35px_rgba(4,87,241,0.5)] mb-3 scale-110">
                        {React.createElement(currentFeature.icon, { className: 'h-8 w-8' })}
                      </div>
                      <div className="font-display text-xl font-bold text-white sm:text-2xl">
                        {currentFeature.name} Demonstration
                      </div>
                      <p className="mt-1 max-w-[420px] text-xs text-slate-300">
                        {currentFeature.tagline}
                      </p>

                      {/* Live Telemetry Pill */}
                      <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-950/60 px-4 py-2 text-xs font-mono text-cyan-300 backdrop-blur-md">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        <span>Interactive System Demo • Live Preview</span>
                      </div>
                    </div>

                    {/* Bottom Telemetry Info */}
                    <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 font-mono border-t border-white/10 pt-2.5">
                      <span>Status: Verified & Operational</span>
                      <span className="text-emerald-400">● 99.99% Routing SLA</span>
                    </div>
                  </div>
                )}

                {/* Video Control Bar Overlay with Interactive Timebar */}
                <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-col gap-2 rounded-xl border border-white/15 bg-black/75 p-3 text-white backdrop-blur-md transition-all">
                  {/* Interactive Scrub / Time Progress Bar */}
                  <div className="group/timebar relative flex w-full items-center py-1 cursor-pointer">
                    <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/20 transition-all group-hover/timebar:h-2.5">
                      {/* Active Progress Fill */}
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

                  {/* Controls & Metadata Row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={togglePlay}
                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/15 text-white transition-colors hover:bg-white/30"
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                      >
                        {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-white" />}
                      </button>

                      {/* Monospace Timestamp Display */}
                      <div className="flex items-center gap-1 rounded-md bg-white/10 px-2 py-0.5 font-mono text-[11px] font-medium text-slate-200 shadow-inner">
                        <span className="text-cyan-300 font-semibold">{formatTime(currentTime)}</span>
                        <span className="text-slate-400">/</span>
                        <span className="text-slate-300">{formatTime(duration)}</span>
                      </div>

                      <span className="hidden text-xs font-semibold text-white sm:inline-block">
                        {currentFeature.name} <span className="font-normal text-slate-400">• {currentCategory.title}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={toggleMute}
                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/15 text-white transition-colors hover:bg-white/30"
                        aria-label={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                      </button>
                      <button
                        type="button"
                        onClick={handleFullscreen}
                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/15 text-white transition-colors hover:bg-white/30"
                        aria-label="Fullscreen"
                      >
                        <Maximize2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Spacious Feature Details & Integration Card */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-[#F8FAFC]/90 p-6 sm:p-7 shadow-xs">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFeature.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col gap-4"
                >
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0457F1]">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-[#0457F1] ring-4 ring-blue-100" />
                    {currentCategory.title}
                  </div>

                  <h3 className="font-display text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">
                    {currentFeature.name}
                  </h3>

                  <p className="text-[14px] font-semibold text-[#0457F1] leading-snug">
                    {currentFeature.tagline}
                  </p>

                  <p className="text-[14.5px] leading-relaxed text-[#475569]">
                    {currentFeature.desc}
                  </p>

                  {/* Feature Capabilities Checklist */}
                  <div className="flex flex-col gap-2.5 rounded-xl border border-slate-200/80 bg-white p-4.5 text-xs text-slate-700 shadow-2xs mt-1">
                    <div className="flex items-center gap-2.5 font-medium text-[#0F172A]">
                      <CheckCircle2 className="h-4 w-4 text-[#0457F1] shrink-0" />
                      <span>Instant REST API & Webhook Integration</span>
                    </div>
                    <div className="flex items-center gap-2.5 font-medium text-[#0F172A]">
                      <CheckCircle2 className="h-4 w-4 text-[#0457F1] shrink-0" />
                      <span>Smart Multi-Bank Routing & Sub-Second Failover</span>
                    </div>
                    <div className="flex items-center gap-2.5 font-medium text-[#0F172A]">
                      <CheckCircle2 className="h-4 w-4 text-[#0457F1] shrink-0" />
                      <span>Automated T+0 / T+1 Settlement & Reconciliation</span>
                    </div>
                  </div>

                  {/* CTA Link */}
                  <div className="pt-3">
                    <a
                      href="https://onboarding.sabbpe.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={clsx(
                        'group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0457F1] px-6 py-3.5 text-sm font-bold text-white shadow-[0_4px_16px_rgba(4,87,241,0.25)] transition-all hover:bg-[#0339A8] hover:shadow-[0_8px_24px_rgba(4,87,241,0.35)] active:scale-[0.98]',
                        FOCUS,
                      )}
                    >
                      <span>Enable {currentFeature.name}</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Wrap>
    </section>
  );
}
