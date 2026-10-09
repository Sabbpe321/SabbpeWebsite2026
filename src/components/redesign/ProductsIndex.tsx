'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { ArrowUpRight } from 'lucide-react';
import { Chip, FOCUS, H2, Wrap } from './ui';

const PAYMENTS_SERVICES = [
  { name: 'Online payments', text: 'UPI, cards, net banking and wallets in one integration', href: '/services/online-payments' },
  { name: 'Collections and recurring', text: 'UPI Autopay mandates and scheduled collections', href: '/services/collections-recurring' },
  { name: 'UPI and QR', text: 'In-store QR and assisted payments', href: '/services/upi-qr' },
  { name: 'Disbursements', text: 'Single and bulk payouts to vendors and customers', href: '/services/disbursements' },
];

const SETTLEMENT_SERVICES = [
  { name: 'Settlement and reporting', text: 'T+0 and T+1 settlement with downloadable reports', href: '/services/settlement-reporting' },
  { name: 'Reconciliation', text: 'Payments matched to settlements automatically', href: '/services/reconciliation' },
  { name: 'Dashboard and analytics', text: 'Collections, payouts and settlements in one view', href: '/services/dashboard' },
  { name: 'Gift360 Engine', text: 'CRM and loyalty for your customers, on in one click', href: '/services/gift360' },
];

export default function ProductsIndex() {
  return (
    <section className="bg-white text-[#0F172A] border-t border-slate-100">
      <Wrap className="flex flex-col gap-6 py-12 sm:py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-4 text-center"
        >
          <Chip>Services</Chip>
          <h2 className={clsx(H2, 'max-w-[720px] text-[#0F172A]')}>One platform. Every way money moves.</h2>
        </motion.div>
        <div className="grid gap-x-12 border-t border-slate-200 md:grid-cols-2">
          <div>
            {PAYMENTS_SERVICES.map((product, index) => {
              const external = product.href.startsWith('http');
              return (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={product.href}
                    prefetch={true}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className={clsx('group flex items-center justify-between gap-4 border-b border-slate-200 py-6 transition-colors', FOCUS)}
                  >
                    <span>
                      <span className="block font-display text-[22px] font-bold text-[#0F172A] transition-colors group-hover:text-[#0457F1]">{product.name}</span>
                      <span className="mt-1 block text-sm text-[#475569]">{product.text}</span>
                    </span>
                    <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-[#F8FAFC] text-[#64748B] transition-all group-hover:bg-[#0457F1] group-hover:text-white">
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
          <div>
            {SETTLEMENT_SERVICES.map((product, index) => {
              const external = product.href.startsWith('http');
              return (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.45, delay: 0.15 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={product.href}
                    prefetch={true}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className={clsx('group flex items-center justify-between gap-4 border-b border-slate-200 py-6 transition-colors', FOCUS)}
                  >
                    <span>
                      <span className="block font-display text-[22px] font-bold text-[#0F172A] transition-colors group-hover:text-[#0457F1]">{product.name}</span>
                      <span className="mt-1 block text-sm text-[#475569]">{product.text}</span>
                    </span>
                    <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-[#F8FAFC] text-[#64748B] transition-all group-hover:bg-[#0457F1] group-hover:text-white">
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Wrap>
    </section>
  );
}
