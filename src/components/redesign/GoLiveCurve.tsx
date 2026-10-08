'use client';

import { useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import clsx from 'clsx';
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Code2,
  FileCheck2,
  Clock,
  Check,
} from 'lucide-react';
import { Chip, FOCUS, H2, Wrap } from './ui';
import { useAutoStep } from './hooks';

const STEP_DURATION_MS = 4000;

const MILESTONES = [
  {
    at: 0,
    step: '01',
    label: 'Apply online',
    sublabel: 'Online application',
    icon: FileCheck2,
    badge: 'Day 0',
    title: 'Smart Digital Application',
    text: 'Start online at onboarding.sabbpe.com. The AI onboarding assistant guides you through each required detail with zero physical paperwork.',
    facts: [
      { big: '100% Online', small: 'Zero branch visits required', icon: Sparkles },
      { big: '5 Minutes', small: 'Guided by onboarding assistant', icon: Clock },
    ],
    cta: 'Start Application',
    href: 'https://onboarding.sabbpe.com',
  },
  {
    at: 0.36,
    step: '02',
    label: 'KYC complete',
    sublabel: 'Instant verification',
    icon: ShieldCheck,
    badge: 'Day 1',
    title: 'Digital KYC & Verification',
    text: 'Your business documents, bank account, and UPI ID are verified digitally in real-time with automated compliance checks.',
    facts: [
      { big: 'Digital KYC', small: 'Documents validated online', icon: ShieldCheck },
      { big: 'Penny Drop', small: 'Bank account & UPI verified', icon: CheckCircle2 },
    ],
    cta: 'Learn About KYC',
    href: 'https://onboarding.sabbpe.com',
  },
  {
    at: 0.7,
    step: '03',
    label: 'Connect integration',
    sublabel: 'APIs & hosted checkout',
    icon: Code2,
    badge: 'Day 1-2',
    title: 'Integration & Sandbox Testing',
    text: 'Connect with hosted checkout or REST APIs, and test thoroughly in the sandbox environment before going live.',
    facts: [
      { big: 'Hosted & APIs', small: 'Customizable checkout & SDKs', icon: Code2 },
      { big: 'Sandbox', small: 'Test transactions before launch', icon: Zap },
    ],
    cta: 'View API Platform',
    href: '/saas/api',
  },
  {
    at: 1,
    step: '04',
    label: 'First payment live',
    sublabel: 'Live payouts & Gift360',
    icon: Zap,
    badge: 'Day 2',
    title: 'First Payment & Loyalty Live',
    text: 'Collections and disbursements are running live at scale, and Gift360 CRM & loyalty is activated in one click.',
    facts: [
      { big: 'T+0 & T+1', small: 'Instant settlement cycles enabled', icon: Zap },
      { big: 'One Click', small: 'Gift360 CRM & rewards active', icon: Sparkles },
    ],
    cta: 'Explore Gift360',
    href: 'https://www.gift360.io',
  },
];

const W = 1000;
const H = 380;
const curveY = (t: number) => 340 - 290 * t * t;

export default function GoLiveCurve() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.25 });
  const reduce = useReducedMotion();
  const [touched, setTouched] = useState(false);
  const [active, setActive] = useAutoStep(MILESTONES.length, STEP_DURATION_MS, inView && !touched && !reduce);
  const current = MILESTONES[active];

  // SVG Curve path points and area fill polygon
  const { path, areaPath } = useMemo(() => {
    const points: string[] = [];
    const areaPoints: string[] = [`M0,${H}`];

    for (let i = 0; i <= 60; i += 1) {
      const t = i / 60;
      const x = (t * W).toFixed(1);
      const y = curveY(t).toFixed(1);
      points.push(`${i === 0 ? 'M' : 'L'}${x} ${y}`);
      areaPoints.push(`L${x},${y}`);
    }
    areaPoints.push(`L${W},${H} Z`);

    return { path: points.join(' '), areaPath: areaPoints.join(' ') };
  }, []);

  const progressFraction = current.at;
  const activeX = current.at * W;
  const activeY = curveY(current.at);

  return (
    <section className="relative overflow-hidden border-t border-slate-100 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9]/30 to-white py-24 text-[#0F172A]">
      {/* Dynamic Background Ambient Blobs */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-[520px] w-[600px] rounded-full bg-blue-100/40 blur-[100px]" aria-hidden="true" />
      <div className="pointer-events-none absolute top-1/2 right-10 h-[400px] w-[400px] rounded-full bg-sky-100/30 blur-[90px]" aria-hidden="true" />

      <Wrap className="relative">
        <div ref={ref} className="flex flex-col gap-12">
          {/* Section Header */}
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0457F1] shadow-2xs backdrop-blur-xs">
              <Sparkles className="h-3.5 w-3.5 text-[#0457F1]" />
              SabbPe Onboarding Velocity
            </div>
            <h2 className={clsx(H2, 'max-w-[780px] text-[#0F172A]')}>
              Your business, <span className="bg-gradient-to-r from-[#0457F1] via-[#0284C7] to-[#00A3FF] bg-clip-text text-transparent">live in days, not months.</span>
            </h2>
            <p className="max-w-[640px] text-base leading-relaxed text-[#475569]">
              Experience automated onboarding with zero branch visits. Track your real-time trajectory from application to live transaction processing.
            </p>
          </div>

          {/* Master Interactive Container */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white/95 p-6 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.07)] backdrop-blur-xl sm:p-10">
            
            {/* Top 4 Step Cards Grid */}
            <div className="relative grid grid-cols-2 gap-3.5 sm:grid-cols-4 pb-8 border-b border-slate-100">
              {MILESTONES.map((item, index) => {
                const isActive = index === active;
                const isPast = index < active;
                const Icon = item.icon;

                return (
                  <button
                    key={item.step}
                    type="button"
                    onClick={() => {
                      setTouched(true);
                      setActive(index);
                    }}
                    className={clsx(
                      'group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-4 sm:p-5 text-left transition-all duration-300',
                      FOCUS,
                      isActive
                        ? 'border-transparent shadow-[0_8px_25px_-5px_rgba(4,87,241,0.18)] scale-[1.02]'
                        : isPast
                        ? 'border-blue-200/80 bg-white/80 hover:border-[#0457F1]/60 hover:shadow-xs'
                        : 'border-slate-200/90 bg-[#F8FAFC]/90 hover:border-slate-300 hover:bg-white',
                    )}
                  >
                    {/* Animated Sliding Highlight Background for Active Box */}
                    {isActive && (
                      <motion.div
                        layoutId="active-step-box-highlight"
                        className="absolute inset-0 rounded-2xl border-2 border-[#0457F1] bg-gradient-to-b from-[#EFF6FF] via-[#DBEAFE]/30 to-white"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}

                    {/* Top row of card */}
                    <div className="relative z-10 flex items-center justify-between mb-3.5">
                      <div className="flex items-center gap-2.5">
                        <motion.span
                          animate={isActive ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                          transition={{ duration: 0.35 }}
                          className={clsx(
                            'flex h-7 w-7 items-center justify-center rounded-lg text-xs font-black transition-colors',
                            isActive
                              ? 'bg-[#0457F1] text-white shadow-[0_2px_8px_rgba(4,87,241,0.35)]'
                              : isPast
                              ? 'bg-blue-100 text-[#0457F1]'
                              : 'bg-slate-200/80 text-slate-600',
                          )}
                        >
                          {isPast ? <Check className="h-4 w-4 stroke-[3]" /> : item.step}
                        </motion.span>
                        <span
                          className={clsx(
                            'text-[11px] font-bold uppercase tracking-wider transition-colors',
                            isActive ? 'text-[#0457F1]' : 'text-slate-400',
                          )}
                        >
                          {item.badge}
                        </span>
                      </div>

                      <motion.div
                        animate={isActive ? { rotate: [0, -10, 10, 0], scale: 1.12 } : { rotate: 0, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className={clsx(
                          'flex h-7 w-7 items-center justify-center rounded-lg transition-colors',
                          isActive ? 'bg-[#0457F1] text-white shadow-xs' : 'bg-slate-100 text-slate-400 group-hover:text-slate-600',
                        )}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </motion.div>
                    </div>

                    {/* Labels */}
                    <div className="relative z-10">
                      <div
                        className={clsx(
                          'text-[14.5px] font-bold leading-snug transition-colors',
                          isActive ? 'text-[#0457F1]' : 'text-[#0F172A]',
                        )}
                      >
                        {item.label}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">{item.sublabel}</div>
                    </div>

                    {/* Animated Progress Bar under active card */}
                    {isActive && inView && !reduce && !touched && (
                      <motion.div
                        key={`progress-${active}`}
                        className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#0457F1] via-[#0284C7] to-[#00A3FF] z-20"
                        initial={{ scaleX: 0, originX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: STEP_DURATION_MS / 1000, ease: 'linear' }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Split Content: Animated Details (Left) + The Signature Curve Graph (Right) */}
            <div className="grid items-center gap-10 pt-8 lg:grid-cols-12">
              {/* Left Details Panel */}
              <div className="flex flex-col gap-6 lg:col-span-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.step}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="flex flex-col gap-5"
                  >
                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0457F1]">
                      <span className="flex h-2.5 w-2.5 rounded-full bg-[#0457F1] ring-4 ring-blue-100" />
                      Milestone {current.step} of 04 • {current.badge}
                    </div>

                    <h3 className="font-display text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">
                      {current.title}
                    </h3>

                    <p className="text-[15px] leading-relaxed text-[#475569]">{current.text}</p>

                    {/* Facts Grid */}
                    <div className="grid grid-cols-2 gap-3.5">
                      {current.facts.map((fact) => {
                        const FactIcon = fact.icon;
                        return (
                          <div
                            key={fact.big}
                            className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-[#F8FAFC] p-4 transition-all hover:border-[#0457F1]/40 hover:bg-white hover:shadow-xs"
                          >
                            <div className="flex items-center justify-between text-[#0457F1] mb-2.5">
                              <span className="font-display text-lg font-bold text-[#0457F1]">{fact.big}</span>
                              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-50 text-[#0457F1]">
                                <FactIcon className="h-3.5 w-3.5" />
                              </div>
                            </div>
                            <div className="text-xs text-[#64748B] font-medium leading-snug">{fact.small}</div>
                          </div>
                        );
                      })}
                    </div>

                    {/* CTA Button */}
                    <div className="pt-2">
                      <a
                        href={current.href}
                        target={current.href.startsWith('http') ? '_blank' : '_self'}
                        rel="noopener noreferrer"
                        className={clsx(
                          'group inline-flex items-center gap-2.5 rounded-xl bg-[#0457F1] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(4,87,241,0.25)] transition-all hover:bg-[#0339A8] hover:shadow-[0_8px_24px_rgba(4,87,241,0.35)] active:scale-[0.98]',
                          FOCUS,
                        )}
                      >
                        <span>{current.cta}</span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </a>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right: Signature Interactive Fintech Curve Graph SVG Container */}
              <div className="relative flex flex-col justify-center rounded-2xl border border-slate-200/90 bg-gradient-to-br from-[#F8FAFC] via-[#F1F5F9]/60 to-white p-5 shadow-xs lg:col-span-7 sm:p-7">
                {/* Graph Top Header Bar */}
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-3.5 text-xs font-bold text-slate-500">
                  <span className="flex items-center gap-2 text-[#0457F1]">
                    <Zap className="h-4 w-4 fill-[#0457F1]" /> Onboarding Velocity Curve
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="hidden sm:inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Live
                    </span>
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-[11.5px] text-[#0457F1] font-bold border border-blue-200 shadow-2xs">
                      {current.step}. {current.label}
                    </span>
                  </div>
                </div>

                {/* SVG Graph Graphic */}
                <div className="relative mt-4 w-full" style={{ aspectRatio: `${W} / ${H}` }}>
                  <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
                    <defs>
                      {/* Gradient for the Curve Stroke */}
                      <linearGradient id="curveGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#0457F1" />
                        <stop offset="50%" stopColor="#0284C7" />
                        <stop offset="100%" stopColor="#00A3FF" />
                      </linearGradient>

                      {/* Area Fill Gradient under Curve */}
                      <linearGradient id="areaFillGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#0457F1" stopOpacity="0.16" />
                        <stop offset="60%" stopColor="#0284C7" stopOpacity="0.05" />
                        <stop offset="100%" stopColor="#0457F1" stopOpacity="0.0" />
                      </linearGradient>

                      {/* Animated ClipPath that reveals the curve and area */}
                      <clipPath id="golive-hatch-clip">
                        <motion.rect
                          x="0"
                          y="0"
                          height={H}
                          animate={{ width: progressFraction * W + 14 }}
                          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                        />
                      </clipPath>
                    </defs>

                    {/* Subtle Horizontal & Vertical Graph Grid lines */}
                    <line x1="0" y1="90" x2={W} y2="90" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" opacity="0.7" />
                    <line x1="0" y1="180" x2={W} y2="180" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" opacity="0.7" />
                    <line x1="0" y1="270" x2={W} y2="270" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" opacity="0.7" />
                    <line x1="0" y1={H} x2={W} y2={H} stroke="#CBD5E1" strokeWidth="1.5" />

                    {/* Background Track Path */}
                    <path d={path} fill="none" stroke="#E2E8F0" strokeWidth="3" strokeDasharray="3 3" />

                    {/* Smooth Area fill under curve up to active milestone */}
                    <g clipPath="url(#golive-hatch-clip)">
                      <path d={areaPath} fill="url(#areaFillGradient)" />
                    </g>

                    {/* Animated Active Trajectory Path */}
                    <motion.path
                      d={path}
                      fill="none"
                      stroke="url(#curveGradient)"
                      strokeWidth="4.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0.05 }}
                      animate={{ pathLength: progressFraction === 0 ? 0.05 : progressFraction }}
                      transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                    />

                    {/* Animated Streaming Energy Pulse along Active Path */}
                    <g clipPath="url(#golive-hatch-clip)">
                      <motion.path
                        d={path}
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeDasharray="6 14"
                        strokeLinecap="round"
                        animate={{ strokeDashoffset: [0, -40] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
                        opacity={0.75}
                      />
                    </g>

                    {/* Dynamic Smooth Traveling Node Marker */}
                    <motion.g
                      animate={{ x: activeX, y: activeY }}
                      transition={{ type: 'spring', stiffness: 130, damping: 18, mass: 0.8 }}
                    >
                      {/* Outer concentric focal ring */}
                      <circle r="18" fill="#0457F1" fillOpacity="0.12" stroke="#0457F1" strokeWidth="1.5" />
                      {/* Core active dot */}
                      <circle r="6.5" fill="#0457F1" />
                      <circle r="2.5" fill="#FFFFFF" />
                    </motion.g>

                    {/* Milestone Target Nodes on the Curve */}
                    {MILESTONES.map((milestone, index) => {
                      const cx = milestone.at * W;
                      const cy = curveY(milestone.at);
                      const isNodeActive = index === active;
                      const isNodePast = index <= active;

                      return (
                        <g
                          key={milestone.step}
                          className="cursor-pointer group"
                          onClick={() => {
                            setTouched(true);
                            setActive(index);
                          }}
                        >
                          {/* Outer node circle */}
                          <circle
                            cx={cx}
                            cy={cy}
                            r={isNodeActive ? '10' : '7'}
                            fill={isNodePast ? '#0457F1' : '#FFFFFF'}
                            stroke={isNodePast ? '#EFF6FF' : '#94A3B8'}
                            strokeWidth={isNodeActive ? '3' : '2'}
                            className="transition-all duration-300 group-hover:scale-125"
                          />

                          {/* Inner white dot for past */}
                          {isNodePast && !isNodeActive && (
                            <circle cx={cx} cy={cy} r="2.5" fill="#FFFFFF" />
                          )}
                        </g>
                      );
                    })}
                  </svg>

                  {/* Non-overlapping Milestone Floating Badges */}
                  {MILESTONES.map((milestone, index) => {
                    const isNodeActive = index === active;
                    const isNodePast = index <= active;
                    const cy = curveY(milestone.at);

                    let alignClass = '-translate-x-1/2';
                    if (index === 0) alignClass = 'translate-x-0';
                    if (index === MILESTONES.length - 1) alignClass = '-translate-x-full';

                    return (
                      <button
                        key={milestone.step}
                        type="button"
                        onClick={() => {
                          setTouched(true);
                          setActive(index);
                        }}
                        className={clsx(
                          'absolute flex items-center gap-1.5 whitespace-nowrap rounded-xl px-3 py-1.5 text-xs font-bold transition-all duration-300 cursor-pointer',
                          alignClass,
                          isNodeActive
                            ? 'bg-[#0457F1] text-white shadow-[0_4px_12px_rgba(4,87,241,0.3)] scale-105 z-10'
                            : isNodePast
                            ? 'bg-white border border-blue-200 text-[#0457F1] hover:border-[#0457F1] shadow-2xs'
                            : 'bg-white/90 border border-slate-200 text-slate-500 hover:border-slate-300 shadow-2xs',
                        )}
                        style={{
                          left: `${milestone.at * 100}%`,
                          top: `calc(${(cy / H) * 100}% - 46px)`,
                        }}
                      >
                        <span className="font-mono text-[11px]">{milestone.step}.</span>
                        <span>{milestone.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Bottom Interactive Guide Bar */}
                <div className="mt-4 flex items-center justify-between text-[11.5px] text-slate-400 font-semibold border-t border-slate-200/60 pt-3">
                  <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" /> Day 0: Digital Application
                  </span>
                  <span className="hidden sm:inline-block text-blue-600 bg-blue-50/80 px-2.5 py-0.5 rounded-full font-bold border border-blue-200/60">
                    Interactive • Click any step
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                    <span className="h-2 w-2 rounded-full bg-[#0457F1]" /> Day 2: Live Processing
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrap>
    </section>
  );
}
