import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import {
  ArrowRight,
  ArrowUpRight,
  LayoutDashboard,
  RefreshCw,
  BarChart3,
  Key,
  Receipt,
  Sparkles,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/premium/Footer';
import { Wrap, Chip, H2, FOCUS } from '@/components/redesign/ui';
import { SAAS_MODULES } from './saasData';

export const metadata = {
  title: 'SaaS Platform & Financial Operations | SabbPe',
  description: 'Enterprise SaaS tools for payment operations: Unified Dashboard, Automated Reconciliation, Settlement Reporting, Analytics Engine, and Developer APIs.',
};

export default function SaasOverviewPage() {
  const modules = Object.values(SAAS_MODULES);

  return (
    <div className="min-h-screen bg-white text-[#0F172A]">
      <Navbar />

      <main className="pb-24 pt-32 sm:pt-40">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[#F0F7FF] via-[#F8FAFC] to-white pb-20 text-center">
          <Wrap className="flex flex-col items-center gap-6">
            <Chip>SaaS Platform & Operations</Chip>
            <h1 className="max-w-[820px] font-display text-4xl font-bold tracking-tight text-[#0F172A] sm:text-5xl lg:text-6xl">
              Everything you need to{' '}
              <span className="bg-gradient-to-r from-[#0457F1] to-[#0284C7] bg-clip-text text-transparent">
                orchestrate & reconcile payments.
              </span>
            </h1>
            <p className="max-w-[680px] text-base leading-relaxed text-[#475569] sm:text-lg">
              A comprehensive suite of automated financial tools, real-time analytics dashboards, 3-way reconciliation engines, and developer APIs to power modern enterprise money movement.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a
                href="https://onboarding.sabbpe.com"
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(
                  'rounded-xl bg-[#0457F1] px-7 py-3.5 text-sm font-bold text-white shadow-[0_4px_14px_rgba(4,87,241,0.28)] transition-all hover:bg-[#0339A8]',
                  FOCUS,
                )}
              >
                Launch Console
              </a>
              <Link
                href="/contact"
                className="rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-bold text-[#0F172A] hover:bg-slate-50 transition-colors"
              >
                Talk to Operations Expert
              </Link>
            </div>
          </Wrap>
        </section>

        {/* Modules Grid */}
        <section className="py-16">
          <Wrap className="flex flex-col gap-10">
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0457F1]">Platform Modules</span>
              <h2 className="font-display text-3xl font-bold text-[#0F172A]">
                Explore our core SaaS capabilities
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {modules.map((m) => {
                const IconComponent = m.icon;
                return (
                  <Link
                    key={m.slug}
                    href={`/saas/${m.slug}`}
                    className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:border-[#0457F1] hover:shadow-[0_12px_35px_rgba(15,23,42,0.08)]"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#0457F1] group-hover:bg-[#0457F1] group-hover:text-white transition-colors">
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-600">
                          {m.badge}
                        </span>
                      </div>

                      <h3 className="font-display text-xl font-bold text-[#0F172A] transition-colors group-hover:text-[#0457F1]">
                        {m.name}
                      </h3>

                      <p className="mt-2 text-xs font-semibold text-[#0457F1]">
                        {m.tagline}
                      </p>

                      <p className="mt-3 text-sm leading-relaxed text-[#475569] line-clamp-3">
                        {m.description}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold text-[#0457F1]">
                      <span>View module details</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </Wrap>
        </section>
      </main>

      <Footer />
    </div>
  );
}
