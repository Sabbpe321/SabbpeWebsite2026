import Link from 'next/link';
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
  { name: 'Reconciliation', text: 'Payments matched to settlements automatically', href: '/saas/reconciliation' },
  { name: 'Dashboard and analytics', text: 'Collections, payouts and settlements in one view', href: '/saas/dashboard' },
  { name: 'Gift360 Engine', text: 'CRM and loyalty for your customers, on in one click', href: '/services/gift360' },
];

export default function ProductsIndex() {
  return (
    <section className="bg-white text-[#0F172A] border-t border-slate-100">
      <Wrap className="flex flex-col gap-9 py-24">
        <div className="flex flex-col items-center gap-4 text-center">
          <Chip>Services</Chip>
          <h2 className={clsx(H2, 'max-w-[720px] text-[#0F172A]')}>One platform. Every way money moves.</h2>
        </div>
        <div className="grid gap-x-12 border-t border-slate-200 md:grid-cols-2">
          <div>
            {PAYMENTS_SERVICES.map((product) => {
              const external = product.href.startsWith('http');
              return (
                <Link
                  key={product.name}
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
              );
            })}
          </div>
          <div>
            {SETTLEMENT_SERVICES.map((product) => {
              const external = product.href.startsWith('http');
              return (
                <Link
                  key={product.name}
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
              );
            })}
          </div>
        </div>
      </Wrap>
    </section>
  );
}
