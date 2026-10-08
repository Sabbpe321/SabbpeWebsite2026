'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Play, X } from 'lucide-react';
import clsx from 'clsx';
import { Wrap, FOCUS } from './ui';

// Why merchants drop off during onboarding, and what SabbPe does about each reason.
const REASONS = [
  { why: 'Complex documentation', detail: 'Multiple forms, unclear requirements, repeated submissions.', fix: 'Documents are read automatically. Upload a PAN or Aadhaar and the fields fill themselves.' },
  { why: 'Lengthy process', detail: 'Days of back-and-forth and lost momentum.', fix: 'Identity is confirmed in real time by a short selfie video.' },
  { why: 'Poor communication', detail: 'No status updates and unclear next steps.', fix: 'The merchant sees the status at every stage on their own dashboard.' },
  { why: 'Technical barriers', detail: 'No guidance and no hand-holding.', fix: 'Sahil, the SabbPe guide, walks them through each step.' },
];

export default function OnboardingStory() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open]);

  return (
    <section className="border-y border-slate-100 bg-[#F8FAFC] py-16" aria-labelledby="onboarding-story-heading">
      <Wrap>
        <div className="max-w-3xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0457F1]">Merchant onboarding</p>
          <h2 id="onboarding-story-heading" className="mt-3 font-display text-[32px] font-bold leading-[1.15] tracking-[-0.025em] text-[#0F172A] sm:text-[40px]">Onboard in minutes, not days</h2>
          <p className="mt-4 text-[17px] leading-relaxed text-[#475569]">Most merchants who start onboarding never finish it. SabbPe gives each reason they drop off to an agent.</p>
        </div>

        <ul className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {REASONS.map((r) => (
            <li key={r.why} className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#B45309]">Why merchants drop off</p>
              <p className="mt-1.5 text-[17px] font-semibold text-[#0F172A]">{r.why}</p>
              <p className="mt-1 text-[14px] leading-relaxed text-[#64748B]">{r.detail}</p>
              <p className="mt-4 border-t border-slate-100 pt-3 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#0457F1]">What SabbPe does</p>
              <p className="mt-1.5 text-[15px] leading-relaxed text-[#334155]">{r.fix}</p>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href="https://onboarding.sabbpe.com" className={clsx('inline-flex items-center gap-2 rounded-xl bg-[#0457F1] px-5 py-3 text-[15px] font-semibold text-white hover:bg-[#0346C4]', FOCUS)}>
            Onboard now <ArrowRight className="h-4 w-4" />
          </a>
          <button type="button" onClick={() => setOpen(true)} className={clsx('inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-[15px] font-semibold text-[#0F172A] hover:border-[#0457F1] hover:text-[#0457F1]', FOCUS)}>
            <Play className="h-4 w-4" /> Watch how onboarding works
          </button>
          <span className="text-[14px] text-[#64748B]">From the first hello to a signed agreement.</span>
        </div>
      </Wrap>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4" role="dialog" aria-modal="true" aria-label="Merchant onboarding video" onClick={() => setOpen(false)}>
          <div className="w-full max-w-4xl overflow-hidden rounded-2xl bg-[#0B1220]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-[14px] font-semibold text-white">Merchant onboarding</span>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close video" className={clsx('rounded-lg p-1.5 text-white/80 hover:bg-white/10 hover:text-white', FOCUS)}><X className="h-5 w-5" /></button>
            </div>
            <video controls autoPlay playsInline poster="/videos/merchant_onboarding.jpg" className="aspect-video w-full bg-black">
              <source src="/videos/merchant_onboarding.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </section>
  );
}
