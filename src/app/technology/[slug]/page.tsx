import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import clsx from 'clsx';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Building2,
  Cpu,
  Layers,
  Zap,
} from 'lucide-react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/premium/Footer';
import { Wrap, FOCUS } from '@/components/redesign/ui';
import { TECH_ITEMS } from '../techData';

export async function generateStaticParams() {
  return Object.keys(TECH_ITEMS).map((slug) => ({ slug }));
}

export default async function TechnologyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = TECH_ITEMS[slug];

  if (!item) {
    notFound();
  }

  const IconComponent = item.icon;
  const otherItems = Object.values(TECH_ITEMS).filter((i) => i.slug !== item.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-white text-[#0F172A]">
      <Navbar />

      <main className="pt-32 pb-24 sm:pt-40">
        {/* Breadcrumb & Hero Header */}
        <section className="border-b border-slate-100 bg-gradient-to-b from-[#F0F7FF] via-[#F8FAFC] to-white pb-16 pt-6">
          <Wrap className="flex flex-col gap-6">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Link href="/" className="hover:text-[#0457F1]">Home</Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              <Link href="/technology" className="hover:text-[#0457F1]">Technology</Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-[#0457F1]">{item.category}</span>
            </div>

            <div className="flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0457F1] shadow-2xs w-fit">
                <Sparkles className="h-3.5 w-3.5 text-[#0457F1]" />
                {item.category}
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-[#0457F1] text-white shadow-md">
                  <IconComponent className="h-7 w-7" />
                </div>
                <h1 className="font-display text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl lg:text-5xl">
                  {item.name}
                </h1>
              </div>

              <p className="max-w-[720px] text-lg font-medium text-[#0457F1]">
                {item.tagline}
              </p>

              <p className="max-w-[760px] text-base leading-relaxed text-[#475569]">
                {item.description}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href="/contact"
                  className={clsx(
                    'inline-flex items-center gap-2 rounded-xl bg-[#0457F1] px-6 py-3.5 text-sm font-bold text-white shadow-[0_4px_14px_rgba(4,87,241,0.25)] transition-all hover:bg-[#0339A8]',
                    FOCUS,
                  )}
                >
                  <span>Book Consultation</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <a
                  href="https://onboarding.sabbpe.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-[#0F172A] hover:bg-slate-50 transition-colors"
                >
                  Start Project
                </a>
              </div>
            </div>
          </Wrap>
        </section>

        {/* Key Metrics HUD Bar */}
        <section className="border-b border-slate-100 bg-white py-10">
          <Wrap>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
              {item.metrics.map((metric, idx) => (
                <div key={metric.label} className={clsx('flex flex-col items-center text-center gap-1', idx > 0 && 'pt-4 sm:pt-0 sm:pl-6')}>
                  <span className="font-display text-3xl font-bold text-[#0457F1] sm:text-4xl">{metric.value}</span>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{metric.label}</span>
                </div>
              ))}
            </div>
          </Wrap>
        </section>

        {/* Deliverables & Capabilities */}
        <section className="py-16">
          <Wrap className="flex flex-col gap-10">
            <div className="flex flex-col items-center text-center gap-3">
              <h2 className="font-display text-2xl font-bold text-[#0F172A] sm:text-3xl">
                Core Capabilities & Scope of Work
              </h2>
              <p className="max-w-[600px] text-sm text-[#475569]">
                Structured engineering methodologies and enterprise deliverables tailored for zero-failure operational standards.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {item.deliverables.map((deliv, dIdx) => (
                <div
                  key={deliv.title}
                  className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs transition-all hover:border-[#0457F1]/40 hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-xs font-bold text-[#0457F1]">
                        0{dIdx + 1}
                      </span>
                      <h3 className="font-display text-lg font-bold text-[#0F172A] group-hover:text-[#0457F1] transition-colors">
                        {deliv.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-[#64748B]">
                      {deliv.desc}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-[#0457F1]">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Included in Engagement</span>
                  </div>
                </div>
              ))}
            </div>
          </Wrap>
        </section>

        {/* Tech Stack & Tooling Architecture */}
        <section className="border-y border-slate-100 bg-[#F8FAFC] py-14">
          <Wrap className="flex flex-col gap-6 text-center items-center">
            <h2 className="font-display text-xl font-bold text-[#0F172A] sm:text-2xl">
              Technology Stack & Frameworks
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-[720px]">
              {item.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-2xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Wrap>
        </section>

        {/* Explore Other Technology Services */}
        <section className="py-16">
          <Wrap className="flex flex-col gap-8">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h2 className="font-display text-xl font-bold text-[#0F172A]">Related Technology Services</h2>
              <Link href="/technology" className="text-xs font-bold text-[#0457F1] hover:underline">
                View All Services →
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {otherItems.map((other) => {
                const OtherIcon = other.icon;
                return (
                  <Link
                    key={other.slug}
                    href={`/technology/${other.slug}`}
                    className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs transition-all hover:border-[#0457F1]/50 hover:shadow-md hover:-translate-y-1"
                  >
                    <div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#0457F1] group-hover:bg-[#0457F1] group-hover:text-white transition-colors mb-3">
                        <OtherIcon className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#0457F1]">
                        {other.category}
                      </span>
                      <h3 className="font-display text-base font-bold text-[#0F172A] mt-1 group-hover:text-[#0457F1] transition-colors">
                        {other.name}
                      </h3>
                      <p className="mt-2 text-xs text-slate-500 line-clamp-2">
                        {other.tagline}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center gap-1 text-xs font-bold text-[#0457F1] group-hover:translate-x-1 transition-transform">
                      <span>Explore</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </Wrap>
        </section>

        {/* Consultation CTA Banner */}
        <section className="mt-8">
          <Wrap>
            <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] p-8 text-white sm:p-12 shadow-xl flex flex-col items-center text-center gap-4">
              <h2 className="font-display text-2xl font-bold sm:text-3xl">
                Ready to build with SabbPe Technology?
              </h2>
              <p className="max-w-[540px] text-sm text-slate-300">
                Speak directly with our principal architects and engineering leads to scope your technical initiative.
              </p>
              <Link
                href="/contact"
                className="mt-2 rounded-xl bg-[#0457F1] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#0339A8]"
              >
                Schedule Technical Discovery
              </Link>
            </div>
          </Wrap>
        </section>
      </main>

      <Footer />
    </div>
  );
}
