'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { ArrowRight } from 'lucide-react';
import DemoModal from '@/components/modals/DemoModal';
import { FOCUS, Wrap } from './ui';

const PARTNER_BRANDS = [
  { name: 'Yes Bank', logo: '/yes-bank.png' },
  { name: 'NTT Data', logo: '/ntt-data.png' },
  { name: 'Mswipe', logo: '/mswipe.png' },
  { name: 'Innoviti', logo: '/innoviti.png' },
  { name: 'ValueDesign', logo: '/valuedesign.png' },
  { name: 'Augmont', logo: '/augmont.png' },
  { name: 'Vi', logo: '/vi.png' },
  { name: 'PAX', logo: '/pax.png' },
  { name: 'Aisino', logo: '/aisino.png' },
  { name: 'Google Workspace', logo: '/google-workspace.png' },
  { name: 'NASSCOM', logo: '/nasscom.png' },
  { name: 'IIM Lucknow', logo: '/iim-lucknow.png' },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-screen sm:min-h-[100dvh] flex-col justify-center overflow-hidden bg-gradient-to-b from-[#F0F7FF] via-[#F8FAFC] to-white text-[#0F172A] pt-20 pb-10 sm:pt-24 sm:pb-12">
      {/* Subtle background ambient light */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[450px] w-[700px] -translate-x-1/2 rounded-full bg-blue-100/50 blur-[120px]" aria-hidden="true" />

      <Wrap className="relative my-auto flex flex-col items-center justify-center gap-5 text-center">
        {/* Recognition Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex flex-wrap items-center justify-center gap-x-3.5 gap-y-1 rounded-full border border-blue-200/80 bg-white/90 px-4 py-1.5 text-[13px] text-[#475569] shadow-2xs backdrop-blur-sm"
        >
          <span className="font-bold text-[#0457F1]">Recognised by</span>
          <span className="font-medium text-[#334155]">NASSCOM</span>
          <span className="text-slate-300">•</span>
          <span className="font-medium text-[#334155]">IIM Lucknow</span>
          <span className="text-slate-300">•</span>
          <span className="font-medium text-[#334155]">Wadhwani</span>
          <span className="text-slate-300">•</span>
          <span className="font-medium text-[#334155]">DPIIT</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[920px] font-display text-[38px] font-bold leading-[1.08] tracking-[-0.03em] text-[#0F172A] sm:text-[54px] lg:text-[64px]"
        >
          Collect payments. Pay out.{' '}
          <span className="bg-gradient-to-r from-[#0457F1] via-[#0284C7] to-[#00A3FF] bg-clip-text text-transparent">
            Bring customers back.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[680px] text-[16px] leading-relaxed text-[#475569] sm:text-[18px]"
        >
          SabbPe is the payment orchestration platform for collections and disbursements. Gift360 adds CRM and customer loyalty for the same merchants, switched on in one click.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-3.5 pt-1"
        >
          <DemoModal
            trigger={
              <button
                type="button"
                className={clsx(
                  'rounded-xl bg-[#0457F1] px-7 py-3.5 text-sm font-bold text-white shadow-[0_4px_16px_rgba(4,87,241,0.3)] transition-all hover:bg-[#0339A8] hover:shadow-[0_8px_24px_rgba(4,87,241,0.4)] active:scale-[0.98]',
                  FOCUS,
                )}
              >
                Book a demo
              </button>
            }
          />
          <a
            href="https://onboarding.sabbpe.com"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              'inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-bold text-[#0F172A] shadow-2xs hover:border-[#0457F1] hover:text-[#0457F1] hover:bg-slate-50 transition-all active:scale-[0.98]',
              FOCUS,
            )}
          >
            <span>Onboard</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>

        {/* Continuous Looping Brand Logos Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="relative mt-8 w-full max-w-[1020px] overflow-hidden pt-2"
        >
          {/* Edge fade gradients */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 sm:w-24 bg-gradient-to-r from-[#F0F7FF] to-transparent" aria-hidden="true" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent" aria-hidden="true" />

          <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
            Trusted Partners & Brands
          </div>

          <div className="flex w-full overflow-hidden py-1">
            <motion.div
              className="flex items-center gap-5 shrink-0"
              animate={{ x: ['0%', '-50%'] }}
              transition={{
                duration: 26,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {[...PARTNER_BRANDS, ...PARTNER_BRANDS].map((brand, index) => (
                <div
                  key={`${brand.name}-${index}`}
                  className="group flex h-12 min-w-[130px] items-center justify-center rounded-xl border border-slate-200/90 bg-white px-4 py-2 shadow-2xs backdrop-blur-xs transition-all hover:border-blue-300 hover:shadow-xs"
                >
                  <div className="relative h-7 w-24">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      fill
                      className="object-contain transition-transform duration-200 group-hover:scale-105"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </Wrap>
    </section>
  );
}
