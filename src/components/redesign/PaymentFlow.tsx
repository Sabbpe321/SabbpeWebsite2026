'use client';

import { useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import clsx from 'clsx';
import { useAutoStep } from './hooks';
import { Chip, FOCUS, H2, Wrap } from './ui';

const STEPS = [
  { title: 'Customer pays', who: 'Your customer', text: 'By UPI, card, QR or payment link, on your website, app or counter.' },
  { title: 'SabbPe secures and checks', who: 'SabbPe', text: 'Every request is authenticated, screened and validated before it moves on.' },
  { title: 'Smart routing', who: 'SabbPe', text: 'The orchestration engine sends the payment to a gateway using its routing rules.' },
  { title: 'Bank or gateway', who: 'Banking partner', text: 'The partner bank or gateway processes the payment and confirms the result.' },
  { title: 'Merchant gets paid', who: 'You', text: 'The money settles to your account, ready to pay out, with every customer already in Gift360.' },
];

const OUTCOMES = [
  { title: 'Collections settled', text: 'Money reaches your bank account on a T+0 or T+1 cycle.' },
  { title: 'Disbursements', text: 'Pay vendors, partners and customers one at a time or in bulk.' },
  { title: 'Gift360 CRM and loyalty', text: 'Rewards, offers and campaigns for the same customers, on in one click.' },
];

/** One payment followed from customer to merchant. Steps advance on their own until one is clicked. */
export default function PaymentFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [touched, setTouched] = useState(false);
  const [active, setActive] = useAutoStep(STEPS.length, 2800, inView && !touched && !reduce);
  const step = STEPS[active];

  return (
    <section className="bg-white py-24">
      <Wrap>
        <div ref={ref} className="flex flex-col gap-9">
          <div className="flex flex-col items-center gap-4 text-center">
            <Chip>How it works</Chip>
            <h2 className={clsx(H2, 'max-w-[760px] text-[#0F172A]')}>
              Follow one payment from your customer to your bank
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-0 right-0 top-0 hidden h-1 rounded bg-slate-200 lg:block" aria-hidden="true">
              <motion.div className="h-full rounded bg-[#0457F1]" animate={{ width: `${((active + 1) / STEPS.length) * 100}%` }} transition={{ duration: 0.5, ease: 'easeInOut' }} />
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:pt-4">
              {STEPS.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  aria-pressed={index === active}
                  onClick={() => {
                    setTouched(true);
                    setActive(index);
                  }}
                  className={clsx(
                    'flex min-h-[96px] flex-col gap-1.5 rounded-xl border p-4 text-left transition-all',
                    FOCUS,
                    index === active
                      ? 'border-[#0457F1] bg-[#EFF6FF] shadow-sm'
                      : index < active
                      ? 'border-blue-200 bg-[#F8FAFC]'
                      : 'border-slate-200 bg-white hover:border-blue-300',
                  )}
                >
                  <span className={clsx('text-[13px] font-bold', index === active ? 'text-[#0457F1]' : 'text-[#64748B]')}>
                    Step {index + 1}
                  </span>
                  <span className="font-display text-base font-bold leading-tight text-[#0F172A]">{item.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Step Details */}
          <div className="min-h-[150px] rounded-2xl border border-blue-100 bg-gradient-to-br from-[#EFF6FF] via-[#F8FAFC] to-white p-7 text-[#0F172A] shadow-sm sm:p-8">
            <motion.div key={step.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }} className="flex flex-col gap-2">
              <div className="text-[13px] font-bold uppercase tracking-wider text-[#0457F1]">{step.who}</div>
              <div className="font-display text-2xl font-bold text-[#0F172A]">{step.title}</div>
              <p className="max-w-[640px] text-[16px] leading-relaxed text-[#475569]">{step.text}</p>
            </motion.div>
          </div>

          {/* Outcome Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            {OUTCOMES.map((item) => (
              <div key={item.title} className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-6 transition-all hover:bg-white hover:shadow-md">
                <div className="font-display text-lg font-bold text-[#0F172A]">{item.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-[#475569]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Wrap>
    </section>
  );
}
