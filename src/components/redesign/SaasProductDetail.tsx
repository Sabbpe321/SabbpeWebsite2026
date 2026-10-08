'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import {
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Download,
  FileSpreadsheet,
  FileText,
  Clock,
  RefreshCw,
  Building2,
  TrendingUp,
  ShieldCheck,
  Zap,
  Layers,
  Search,
  ExternalLink,
} from 'lucide-react';
import { Wrap, FOCUS } from './ui';
import OpsDemoSection from './OpsDemoSection';
import { SaasModule, SAAS_MODULES } from '@/app/saas/saasData';

export default function SaasProductDetail({ slug, item: propItem }: { slug: string; item?: SaasModule }) {
  const [activeTab, setActiveTab] = useState<'preview' | 'specs' | 'workflow'>('preview');
  const [selectedCycle, setSelectedCycle] = useState<'t0' | 't1'>('t0');
  const [reconFilter, setReconFilter] = useState<'all' | 'matched' | 'disputed'>('all');

  let cleanSlug = (slug || '').toLowerCase().trim();
  if (cleanSlug === 'dashboard-and-analytics' || cleanSlug === 'analytics-dashboard') {
    cleanSlug = 'dashboard';
  }
  const item = propItem || SAAS_MODULES[cleanSlug] || SAAS_MODULES['reconciliation'];

  const IconComponent = item.icon;
  const otherModules = Object.values(SAAS_MODULES).filter((m) => m.slug !== item.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-white text-[#0F172A]">
      <main className="pb-24 pt-28 sm:pt-32">
        {/* Navigation & Breadcrumb Header */}
        <section className="border-b border-slate-100 bg-gradient-to-b from-[#F0F7FF] via-[#F8FAFC] to-white pb-16 pt-4">
          <Wrap className="flex flex-col gap-6">
            {/* Top Bar with Go Back & Breadcrumbs */}
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
                <Link href="/" className="hover:text-[#0457F1]">Home</Link>
                <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
                <Link href="/services" className="hover:text-[#0457F1]">Services & SaaS</Link>
                <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
                <span className="font-bold text-[#0457F1]">{item.name}</span>
              </div>
            </div>

            {/* Hero Main Block */}
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="flex flex-col gap-4 lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0457F1] shadow-2xs w-fit">
                  <Sparkles className="h-3.5 w-3.5 text-[#0457F1]" />
                  {item.badge}
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-[#0457F1] text-white shadow-md">
                    <IconComponent className="h-7 w-7" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {item.category}
                    </span>
                    <h1 className="font-display text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl">
                      {item.name}
                    </h1>
                  </div>
                </div>

                <p className="text-lg font-semibold text-[#0457F1]">
                  {item.tagline}
                </p>

                <p className="text-base leading-relaxed text-[#475569]">
                  {item.description}
                </p>

                {/* Primary Actions */}
                <div className="flex flex-wrap items-center gap-4 pt-3">
                  <a
                    href="https://onboarding.sabbpe.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={clsx(
                      'inline-flex items-center gap-2 rounded-xl bg-[#0457F1] px-6 py-3.5 text-sm font-bold text-white shadow-[0_4px_14px_rgba(4,87,241,0.28)] transition-all hover:bg-[#0339A8]',
                      FOCUS,
                    )}
                  >
                    <span>Get Started Free</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>

                  <Link
                    href="/contact"
                    className="rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-[#0F172A] hover:bg-slate-50 transition-colors"
                  >
                    Schedule Demo
                  </Link>
                </div>
              </div>

              {/* Top Hero Stats Grid */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
                {item.stats.map((st) => (
                  <div
                    key={st.label}
                    className="rounded-2xl border border-slate-200/90 bg-white/90 p-5 shadow-xs backdrop-blur-xs transition-all hover:border-[#0457F1]/40"
                  >
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {st.label}
                    </div>
                    <div className="mt-1 font-display text-2xl font-bold text-[#0457F1] sm:text-3xl">
                      {st.value}
                    </div>
                    <div className="mt-1 text-[11.5px] leading-snug text-slate-600">
                      {st.helper}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Wrap>
        </section>

        {/* Demo video and narrative */}
        <OpsDemoSection slug={cleanSlug} />

        {/* Interactive Live Showcase Section */}
        <section className="py-16">
          <Wrap className="flex flex-col gap-10">
            <div className="flex flex-col gap-2 text-center items-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1 text-xs font-bold text-[#0457F1]">
                <Zap className="h-3.5 w-3.5" /> Interactive Platform Demonstration
              </div>
              <h2 className="font-display text-2xl font-bold sm:text-3xl text-[#0F172A]">
                See {item.name} in action
              </h2>
              <p className="max-w-[600px] text-sm text-slate-500">
                Explore real-time data structures, automated workflows, and intelligence feeds.
              </p>
            </div>

            {/* Mockup Frame tailored for each service */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_15px_40px_rgba(15,23,42,0.08)]">
              {/* Frame Header */}
              <div className="flex items-center justify-between border-b border-slate-100 bg-[#F8FAFC] px-5 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 font-mono text-xs text-slate-400">
                    app.sabbpe.com/{item.slug}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 font-mono text-[11px] font-bold text-emerald-600 border border-emerald-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    LIVE ENGINE
                  </span>
                </div>
              </div>

              {/* Dynamic Mockup Body */}
              <div className="p-6 sm:p-8">
                {/* 1. RECONCILIATION MOCKUP */}
                {item.slug === 'reconciliation' && (
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                      <div>
                        <h4 className="font-display text-lg font-bold text-[#0F172A]">
                          3-Way Auto-Reconciliation Feed
                        </h4>
                        <p className="text-xs text-slate-500">
                          Automated matching across Payment Gateway, Bank Nodal UTRs, and Ledger Order Books
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setReconFilter('all')}
                          className={clsx(
                            'rounded-lg px-3 py-1.5 text-xs font-bold transition-all',
                            reconFilter === 'all' ? 'bg-[#0457F1] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          )}
                        >
                          All (1,420)
                        </button>
                        <button
                          type="button"
                          onClick={() => setReconFilter('matched')}
                          className={clsx(
                            'rounded-lg px-3 py-1.5 text-xs font-bold transition-all',
                            reconFilter === 'matched' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          )}
                        >
                          Matched (99.98%)
                        </button>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 font-mono">
                            <th className="p-3">ORDER / TXN ID</th>
                            <th className="p-3">GATEWAY AMOUNT</th>
                            <th className="p-3">BANK UTR CREDIT</th>
                            <th className="p-3">MDR & GST FEE</th>
                            <th className="p-3">MATCH STATUS</th>
                            <th className="p-3">ERP JOURNAL SYNC</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-mono">
                          <tr className="hover:bg-blue-50/40 transition-colors">
                            <td className="p-3 font-semibold text-[#0F172A]">ORD_9482103 • UPI</td>
                            <td className="p-3 text-slate-700">₹45,200.00</td>
                            <td className="p-3 text-emerald-600 font-bold">₹45,200.00 (UTR_88291)</td>
                            <td className="p-3 text-slate-500">₹0.00 (Zero MDR UPI)</td>
                            <td className="p-3">
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                                <CheckCircle2 className="h-3 w-3" /> MATCHED 3-WAY
                              </span>
                            </td>
                            <td className="p-3 text-slate-600">Synced to SAP GL #4001</td>
                          </tr>
                          <tr className="hover:bg-blue-50/40 transition-colors">
                            <td className="p-3 font-semibold text-[#0F172A]">ORD_9482104 • CARD</td>
                            <td className="p-3 text-slate-700">₹1,24,000.00</td>
                            <td className="p-3 text-emerald-600 font-bold">₹1,22,264.00 (UTR_88292)</td>
                            <td className="p-3 text-slate-500">₹1,736.00 (1.4% MDR)</td>
                            <td className="p-3">
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                                <CheckCircle2 className="h-3 w-3" /> MATCHED 3-WAY
                              </span>
                            </td>
                            <td className="p-3 text-slate-600">Synced to Tally ERP9</td>
                          </tr>
                          <tr className="hover:bg-blue-50/40 transition-colors">
                            <td className="p-3 font-semibold text-[#0F172A]">ORD_9482105 • AUTOPAY</td>
                            <td className="p-3 text-slate-700">₹8,500.00</td>
                            <td className="p-3 text-emerald-600 font-bold">₹8,500.00 (UTR_88293)</td>
                            <td className="p-3 text-slate-500">₹0.00</td>
                            <td className="p-3">
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                                <CheckCircle2 className="h-3 w-3" /> MATCHED 3-WAY
                              </span>
                            </td>
                            <td className="p-3 text-slate-600">Synced to Zoho Books</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 2. DASHBOARD MOCKUP */}
                {item.slug === 'dashboard' && (
                  <div className="flex flex-col gap-6">
                    {/* Top KPI row */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <div className="rounded-xl border border-slate-100 bg-[#F8FAFC] p-4">
                        <div className="text-xs text-slate-500 font-semibold">Today's Collections (GMV)</div>
                        <div className="mt-1 text-2xl font-bold text-[#0F172A]">₹18,42,800.00</div>
                        <div className="mt-1 text-xs text-emerald-600 font-semibold flex items-center gap-1">
                          <TrendingUp className="h-3.5 w-3.5" /> +14.8% vs yesterday
                        </div>
                      </div>
                      <div className="rounded-xl border border-slate-100 bg-[#F8FAFC] p-4">
                        <div className="text-xs text-slate-500 font-semibold">Total Transactions</div>
                        <div className="mt-1 text-2xl font-bold text-[#0F172A]">4,821 txns</div>
                        <div className="mt-1 text-xs text-emerald-600 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5" /> 98.9% Success Rate
                        </div>
                      </div>
                      <div className="rounded-xl border border-slate-100 bg-[#F8FAFC] p-4">
                        <div className="text-xs text-slate-500 font-semibold">Ready for Settlement</div>
                        <div className="mt-1 text-2xl font-bold text-[#0457F1]">₹16,92,450.00</div>
                        <div className="mt-1 text-xs text-slate-500">T+0 Express Batch at 4:00 PM</div>
                      </div>
                      <div className="rounded-xl border border-slate-100 bg-[#F8FAFC] p-4">
                        <div className="text-xs text-slate-500 font-semibold">Disbursements Outflow</div>
                        <div className="mt-1 text-2xl font-bold text-slate-700">₹6,20,000.00</div>
                        <div className="mt-1 text-xs text-slate-500">142 Vendor transfers executed</div>
                      </div>
                    </div>

                    {/* Breakdown Chart and Routing health */}
                    <div className="grid gap-4 lg:grid-cols-12">
                      <div className="rounded-xl border border-slate-100 bg-[#F8FAFC] p-4 lg:col-span-7">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                          Payment Mode Share & Conversion
                        </div>
                        <div className="flex flex-col gap-3 font-mono text-xs">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span>UPI & QR (74%)</span>
                              <span className="text-emerald-600 font-bold">99.4% Success</span>
                            </div>
                            <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
                              <div className="h-full bg-[#0457F1] rounded-full" style={{ width: '74%' }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span>Cards & Netbanking (18%)</span>
                              <span className="text-emerald-600 font-bold">96.8% Success</span>
                            </div>
                            <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
                              <div className="h-full bg-[#0284C7] rounded-full" style={{ width: '18%' }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span>UPI Autopay & Mandates (8%)</span>
                              <span className="text-emerald-600 font-bold">99.9% Success</span>
                            </div>
                            <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
                              <div className="h-full bg-[#6366F1] rounded-full" style={{ width: '8%' }} />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-xl border border-slate-100 bg-[#F8FAFC] p-4 lg:col-span-5">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                          Gateway Smart Routing Health
                        </div>
                        <div className="flex flex-col gap-2.5 text-xs font-mono">
                          <div className="flex items-center justify-between p-2 rounded bg-white border border-slate-100">
                            <span>HDFC Direct Rail</span>
                            <span className="text-emerald-600 font-bold">● 99.9% Uptime</span>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded bg-white border border-slate-100">
                            <span>ICICI UPI VPA Node</span>
                            <span className="text-emerald-600 font-bold">● 99.8% Uptime</span>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded bg-white border border-slate-100">
                            <span>Axis IMPS Payout Engine</span>
                            <span className="text-emerald-600 font-bold">● 100% Uptime</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. SETTLEMENT & REPORTING MOCKUP */}
                {(item.slug === 'settlement-reporting' || item.slug === 'analytics' || item.slug === 'api') && (
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                      <div>
                        <h4 className="font-display text-lg font-bold text-[#0F172A]">
                          Settlement Cycle & Report Export Center
                        </h4>
                        <p className="text-xs text-slate-500">
                          Configure T+0 / T+1 payout schedules and download audit-ready tax reconciliations
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedCycle('t0')}
                          className={clsx(
                            'rounded-lg px-3 py-1.5 text-xs font-bold transition-all',
                            selectedCycle === 't0' ? 'bg-[#0457F1] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          )}
                        >
                          T+0 Same-Day Express
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedCycle('t1')}
                          className={clsx(
                            'rounded-lg px-3 py-1.5 text-xs font-bold transition-all',
                            selectedCycle === 't1' ? 'bg-[#0457F1] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          )}
                        >
                          T+1 Morning Standard
                        </button>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
                        <div className="text-xs font-bold uppercase tracking-wider text-[#0457F1]">Active Cycle</div>
                        <div className="mt-1 text-xl font-bold text-[#0F172A]">
                          {selectedCycle === 't0' ? 'T+0 Same-Day (Hourly)' : 'T+1 Morning Batch'}
                        </div>
                        <div className="mt-1 text-xs text-slate-600">
                          {selectedCycle === 't0' ? 'Settled directly into bank within 60 mins' : 'Settled by 8:30 AM next working day'}
                        </div>
                      </div>
                      <div className="rounded-xl border border-slate-100 bg-[#F8FAFC] p-4">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Pending Settlement</div>
                        <div className="mt-1 text-xl font-bold text-emerald-600">₹24,80,910.00</div>
                        <div className="mt-1 text-xs text-slate-500">Dispatched via Bank RTGS nodal</div>
                      </div>
                      <div className="rounded-xl border border-slate-100 bg-[#F8FAFC] p-4">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-500">GST Invoice Ready</div>
                        <div className="mt-1 text-xl font-bold text-[#0F172A]">October 2026</div>
                        <div className="mt-1 text-xs text-[#0457F1] font-semibold flex items-center gap-1 cursor-pointer">
                          <Download className="h-3.5 w-3.5" /> Download Tax Breakdown
                        </div>
                      </div>
                    </div>

                    {/* Downloadable Reports list */}
                    <div className="rounded-xl border border-slate-100 bg-[#F8FAFC] p-4">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                        Instant Audit-Ready Report Downloads
                      </div>
                      <div className="grid gap-2 sm:grid-cols-3 text-xs">
                        <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200/70 hover:border-[#0457F1] transition-all cursor-pointer">
                          <div className="flex items-center gap-2">
                            <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
                            <span className="font-semibold text-slate-700">Daily_Settlement_Oct08.xlsx</span>
                          </div>
                          <Download className="h-3.5 w-3.5 text-slate-400" />
                        </div>
                        <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200/70 hover:border-[#0457F1] transition-all cursor-pointer">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-blue-600" />
                            <span className="font-semibold text-slate-700">GST_Fee_Invoice_Oct.pdf</span>
                          </div>
                          <Download className="h-3.5 w-3.5 text-slate-400" />
                        </div>
                        <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200/70 hover:border-[#0457F1] transition-all cursor-pointer">
                          <div className="flex items-center gap-2">
                            <RefreshCw className="h-4 w-4 text-purple-600" />
                            <span className="font-semibold text-slate-700">Refund_Deductions.csv</span>
                          </div>
                          <Download className="h-3.5 w-3.5 text-slate-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Wrap>
        </section>

        {/* 4 Key Highlights Cards */}
        <section className="border-t border-slate-100 bg-[#F8FAFC]/60 py-20">
          <Wrap className="flex flex-col gap-12">
            <div className="flex flex-col gap-2 text-center items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0457F1]">Enterprise Capabilities</span>
              <h2 className="font-display text-2xl font-bold sm:text-3xl text-[#0F172A]">
                Built for scale, security and precision
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {item.keyHighlights.map((hl) => {
                const HlIcon = hl.icon;
                return (
                  <div
                    key={hl.title}
                    className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition-all hover:border-[#0457F1] hover:shadow-md"
                  >
                    <div>
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#0457F1] mb-4">
                        <HlIcon className="h-5 w-5" />
                      </div>
                      <h3 className="font-display text-base font-bold text-[#0F172A] mb-2">
                        {hl.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-[#475569]">
                        {hl.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Wrap>
        </section>

        {/* 3-Step Process & Technical Specs */}
        <section className="py-20">
          <Wrap className="grid gap-12 lg:grid-cols-12">
            {/* Left: Workflow Steps */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0457F1]">Operational Flow</span>
                <h3 className="font-display text-2xl font-bold text-[#0F172A]">
                  How it works step-by-step
                </h3>
              </div>

              <div className="flex flex-col gap-4">
                {item.workflowSteps.map((ws) => (
                  <div
                    key={ws.step}
                    className="flex items-start gap-4 rounded-xl border border-slate-100 bg-[#F8FAFC] p-4 transition-all hover:bg-white hover:shadow-xs"
                  >
                    <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-[#0457F1] text-xs font-mono font-bold text-white">
                      {ws.step}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-[#0F172A]">
                        {ws.title}
                      </h4>
                      <p className="mt-1 text-xs text-[#475569] leading-relaxed">
                        {ws.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Technical Specifications */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0457F1]">Specifications</span>
                <h3 className="font-display text-2xl font-bold text-[#0F172A]">
                  Integration & Compatibility
                </h3>
              </div>

              <div className="flex flex-col gap-4">
                {item.technicalSpecs.map((spec) => (
                  <div key={spec.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#0457F1] mb-3">
                      {spec.title}
                    </h4>
                    <ul className="flex flex-col gap-2">
                      {spec.items.map((it) => (
                        <li key={it} className="flex items-start gap-2 text-xs text-[#334155]">
                          <CheckCircle2 className="h-4 w-4 text-[#0457F1] flex-none mt-0.5" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </Wrap>
        </section>

        {/* Explore Other Solutions Section */}
        <section className="border-t border-slate-100 bg-slate-50/50 py-16">
          <Wrap className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Complete SaaS Suite</span>
                <h3 className="font-display text-xl font-bold text-[#0F172A]">
                  Explore related platforms & tools
                </h3>
              </div>
              <Link
                href="/services"
                className="text-xs font-bold text-[#0457F1] hover:underline flex items-center gap-1"
              >
                View all services <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {otherModules.map((m) => {
                const MIcon = m.icon;
                return (
                  <Link
                    key={m.slug}
                    href={`/saas/${m.slug}`}
                    className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-[#0457F1] hover:shadow-md"
                  >
                    <div>
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-[#0457F1] group-hover:bg-[#0457F1] group-hover:text-white transition-colors mb-3">
                        <MIcon className="h-4 w-4" />
                      </div>
                      <h4 className="font-display text-sm font-bold text-[#0F172A] group-hover:text-[#0457F1]">
                        {m.name}
                      </h4>
                      <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                        {m.tagline}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center gap-1 text-xs font-bold text-[#0457F1]">
                      <span>Learn more</span>
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </Wrap>
        </section>
      </main>
    </div>
  );
}
