'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { ArrowRight } from 'lucide-react';
import DemoModal from '@/components/modals/DemoModal';
import { FOCUS, Wrap } from './ui';

const PRODUCTS = [
  {
    name: 'Collections',
    kind: 'SabbPe',
    line: 'Accept every way your customers pay, through one integration.',
    points: ['UPI, cards, net banking and wallets', 'QR codes and payment links', 'UPI Autopay for recurring payments'],
  },
  {
    name: 'Smart routing',
    kind: 'SabbPe',
    line: 'Each payment is sent to the gateway best placed to complete it.',
    points: ['Multiple gateways behind one integration', 'Routing rules by success rate and cost', 'One dashboard across all gateways'],
  },
  {
    name: 'Disbursements',
    kind: 'SabbPe',
    line: 'Pay vendors, partners and customers one at a time or in bulk.',
    points: ['Bank transfer, IMPS and NEFT', 'Bulk payout files', 'Status for every transfer'],
  },
  {
    name: 'Settlement',
    kind: 'SabbPe',
    line: 'Reconciled funds in your bank on your schedule.',
    points: ['T+0 and T+1 settlement cycles', 'Automatic bank reconciliation', 'Reports ready for accounting'],
  },
  {
    name: 'Gift360 CRM',
    kind: 'Gift360',
    line: 'Keep the customers you just got paid by.',
    points: ['Customer profiles from payment data', 'Targeted campaigns by SMS and WhatsApp', 'Cashback, vouchers and rewards'],
  },
  {
    name: 'Gift360 Loyalty',
    kind: 'Gift360',
    line: 'Branded gift cards and reward points in one click.',
    points: ['Physical and digital gift cards', 'Points earned and spent across channels', '400+ third-party brand vouchers'],
  },
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const product = PRODUCTS[active];

  return (
    <section className="bg-gradient-to-b from-[#F0F7FF] via-[#F8FAFC] to-white text-[#0F172A]">
      <Wrap className="flex flex-col items-center gap-7 pb-24 pt-36 text-center sm:pt-44">
        {/* Recognition Badge */}
        <div className="inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-1 rounded-full border border-blue-200 bg-white/90 px-4 py-2 text-[13px] text-[#475569] shadow-sm backdrop-blur-sm">
          <span className="font-bold text-[#0457F1]">Recognised by</span>
          <span className="font-medium text-[#334155]">NASSCOM</span>
          <span className="text-slate-300">•</span>
          <span className="font-medium text-[#334155]">IIM Lucknow</span>
          <span className="text-slate-300">•</span>
          <span className="font-medium text-[#334155]">Wadhwani</span>
          <span className="text-slate-300">•</span>
          <span className="font-medium text-[#334155]">DPIIT</span>
        </div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[920px] font-display text-[40px] font-bold leading-[1.08] tracking-[-0.03em] text-[#0F172A] sm:text-[56px] lg:text-[68px]"
        >
          Collect payments. Pay out.{' '}
          <span className="bg-gradient-to-r from-[#0457F1] to-[#0284C7] bg-clip-text text-transparent">
            Bring customers back.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <p className="max-w-[680px] text-[17px] leading-relaxed text-[#475569] sm:text-lg">
          SabbPe is the payment orchestration platform for collections and disbursements. Gift360 adds CRM and loyalty for the same merchants, switched on in one click.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <DemoModal
            trigger={
              <button
                type="button"
                className={clsx(
                  'rounded-xl bg-[#0457F1] px-7 py-3.5 text-sm font-bold text-white shadow-[0_4px_14px_rgba(4,87,241,0.3)] transition-all hover:bg-[#0339A8]',
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
              'inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-bold text-[#0F172A] shadow-xs hover:border-[#0457F1] hover:text-[#0457F1] hover:bg-slate-50 transition-all',
              FOCUS,
            )}
          >
            <span>Onboard</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Product Showcase */}
        <div className="mt-8 grid w-full gap-5 text-left lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* Active Product Details */}
          <div className="min-h-[280px] rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:p-8">
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-3.5"
            >
              <div className="inline-block w-max rounded-md bg-[#EFF6FF] px-2.5 py-1 text-[12px] font-bold uppercase tracking-wider text-[#0457F1]">
                {product.kind}
              </div>
              <h3 className="font-display text-2xl font-bold text-[#0F172A] sm:text-3xl">
                {product.name}
              </h3>
              <p className="text-[17px] leading-relaxed text-[#475569]">{product.line}</p>
              <ul className="mt-2 flex flex-col gap-2.5 text-[15px] text-[#334155]">
                {product.points.map((point) => (
                  <li key={point} className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#0457F1]" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Product Switcher Grid */}
          <div className="flex flex-col gap-3.5 rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5 text-[#0F172A] shadow-[0_10px_30px_rgba(15,23,42,0.03)]">
            <div className="text-center text-[15px] font-bold text-[#0F172A]">Every rupee, in one place</div>
            <div className="grid grid-cols-2 gap-2.5">
              {PRODUCTS.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  aria-pressed={index === active}
                  onClick={() => setActive(index)}
                  className={clsx(
                    'min-h-[64px] rounded-lg border px-2.5 text-sm font-semibold transition-all',
                    FOCUS,
                    index === active
                      ? 'border-[#0457F1] bg-[#0457F1] text-white shadow-sm'
                      : 'border-slate-200 bg-white text-[#334155] hover:border-[#0457F1] hover:text-[#0457F1]',
                  )}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Wrap>
    </section>
  );
}
