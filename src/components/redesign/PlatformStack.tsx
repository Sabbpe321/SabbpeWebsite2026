'use client';

import { useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import clsx from 'clsx';
import { useAutoStep } from './hooks';
import { Chip, FOCUS, H2, Wrap } from './ui';

const LAYERS = [
  { name: 'Channels', role: 'Where your customers pay', items: ['Hosted checkout', 'Payment links', 'QR', 'APIs'] },
  { name: 'SabbPe', role: 'Payment orchestration', items: ['Collections', 'Smart routing', 'Disbursements', 'Settlement', 'Reconciliation'] },
  { name: 'Gift360', role: 'CRM and loyalty, on in one click', items: ['Loyalty points', 'Cashback', 'Coupons and offers', 'Campaigns', 'Brand vouchers', 'SuperCoins'] },
  { name: 'Core', role: 'What everything runs on', items: ['Onboarding and KYC', 'Rules engine', 'Notifications', 'Reports', 'Security'] },
];

const RAIL = [
  { title: 'Guided KYC', text: 'Documents checked as you upload them' },
  { title: 'Integration help', text: 'Hosted checkout, API or sandbox first' },
  { title: 'Support after launch', text: 'Settlement and reconciliation queries' },
];

/** Layers light up one at a time while the section is on screen; hovering or focusing a layer holds it. */
export default function PlatformStack() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduce = useReducedMotion();
  const [held, setHeld] = useState(false);
  const [active, setActive] = useAutoStep(LAYERS.length, 2600, inView && !held && !reduce);

  return (
    <section className="bg-white text-[#0F172A] border-t border-slate-100">
      <Wrap className="flex flex-col gap-9 py-24">
        <div className="flex flex-col items-center gap-4 text-center">
          <Chip>SabbPe platform</Chip>
          <h2 className={clsx(H2, 'max-w-[800px] text-[#0F172A]')}>One platform to move money and keep customers</h2>
        </div>

        <div ref={ref} className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="flex flex-col gap-3" onMouseLeave={() => setHeld(false)}>
            {LAYERS.map((layer, index) => {
              const on = reduce || index === active;
              return (
                <motion.button
                  key={layer.name}
                  type="button"
                  aria-pressed={index === active}
                  onMouseEnter={() => {
                    setHeld(true);
                    setActive(index);
                  }}
                  onFocus={() => {
                    setHeld(true);
                    setActive(index);
                  }}
                  onClick={() => {
                    setHeld(true);
                    setActive(index);
                  }}
                  animate={{ opacity: on ? 1 : 0.5 }}
                  transition={{ duration: 0.35 }}
                  className={clsx(
                    'flex flex-col gap-3 rounded-2xl border p-5 text-left transition-all',
                    FOCUS,
                    on && !reduce
                      ? 'border-[#0457F1] bg-[#EFF6FF] shadow-sm'
                      : 'border-slate-200 bg-[#F8FAFC] hover:border-slate-300',
                  )}
                >
                  <span className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-display text-xl font-bold text-[#0F172A]">{layer.name}</span>
                    <span className="text-[13px] font-bold text-[#0457F1]">{layer.role}</span>
                  </span>
                  <span className="flex flex-wrap gap-2 text-sm">
                    {layer.items.map((item) => (
                      <span key={item} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-medium text-[#334155] shadow-2xs">
                        {item}
                      </span>
                    ))}
                  </span>
                </motion.button>
              );
            })}
          </div>

          <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
            <div className="border-b border-slate-200 bg-[#F8FAFC] px-6 py-5">
              <div className="font-bold text-[#0F172A]">Assisted go-live</div>
              <div className="text-sm text-[#475569]">A SabbPe contact from start to finish</div>
            </div>
            {RAIL.map((item, index) => (
              <div key={item.title} className={clsx('px-6 py-4.5', index < RAIL.length - 1 && 'border-b border-slate-100')}>
                <div className="font-semibold text-[#0F172A]">{item.title}</div>
                <div className="text-sm text-[#475569]">{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </Wrap>
    </section>
  );
}
