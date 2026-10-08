import React from 'react';
import Link from 'next/link';
import {
  Code2,
  Cpu,
  Smartphone,
  Palette,
  Lightbulb,
  Users,
  Briefcase,
  Target,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/premium/Footer';
import { Wrap, FOCUS } from '@/components/redesign/ui';
import { TECH_ITEMS } from './techData';

export const metadata = {
  title: 'Technology & Engineering Solutions | SabbPe',
  description: 'Enterprise custom application development, UI/UX design thinking, and specialized technical recruitment solutions for high-growth businesses.',
};

export default function TechnologyIndexPage() {
  const categories = [
    {
      title: 'DEVELOPMENT',
      desc: 'Bespoke enterprise applications, cloud-native modernization, and cross-platform mobile infrastructure.',
      slugs: ['custom-app-development', 'digital-transformation', 'enterprise-mobility'],
    },
    {
      title: 'DESIGN & STRATEGY',
      desc: 'High-converting checkout UX, compliance architecture advisory, and embedded senior engineering teams.',
      slugs: ['ui-ux-design', 'consulting', 'staff-augmentation'],
    },
    {
      title: 'RECRUITMENT',
      desc: 'End-to-end technical talent acquisition, executive search, and flexible agile sprint squads.',
      slugs: ['managed-recruitment', 'talent-solutions', 'strategic-staffing'],
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#0F172A]">
      <Navbar />

      <main className="pt-32 pb-24 sm:pt-40">
        {/* Hero */}
        <section className="border-b border-slate-100 bg-gradient-to-b from-[#F0F7FF] via-[#F8FAFC] to-white pb-16 pt-8">
          <Wrap className="flex flex-col items-center text-center gap-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0457F1] shadow-2xs">
              <Cpu className="h-3.5 w-3.5 text-[#0457F1]" />
              SabbPe Technology Solutions
            </div>
            <h1 className="max-w-[800px] font-display text-4xl font-bold tracking-tight text-[#0F172A] sm:text-5xl lg:text-6xl">
              Engineering, Design &{' '}
              <span className="bg-gradient-to-r from-[#0457F1] via-[#0284C7] to-[#00A3FF] bg-clip-text text-transparent">
                Technical Talent
              </span>
            </h1>
            <p className="max-w-[640px] text-base leading-relaxed text-[#475569] sm:text-lg">
              Empower your enterprise with world-class custom software development, conversion-focused design systems, and specialized technical recruitment.
            </p>
          </Wrap>
        </section>

        {/* 3 Categories Section */}
        <section className="py-16">
          <Wrap className="flex flex-col gap-16">
            {categories.map((cat) => (
              <div key={cat.title} className="flex flex-col gap-6">
                <div className="flex flex-col gap-1 border-b border-slate-200 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0457F1]">{cat.title}</span>
                  <h2 className="font-display text-2xl font-bold text-[#0F172A]">{cat.title} Solutions</h2>
                  <p className="text-xs text-slate-500 max-w-[600px]">{cat.desc}</p>
                </div>

                <div className="grid gap-6 sm:grid-cols-3">
                  {cat.slugs.map((slug) => {
                    const item = TECH_ITEMS[slug];
                    if (!item) return null;
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.slug}
                        href={`/technology/${item.slug}`}
                        className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs transition-all hover:border-[#0457F1]/50 hover:shadow-md hover:-translate-y-1"
                      >
                        <div>
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#0457F1] group-hover:bg-[#0457F1] group-hover:text-white transition-colors mb-4">
                            <Icon className="h-5 w-5" />
                          </div>
                          <h3 className="font-display text-lg font-bold text-[#0F172A] group-hover:text-[#0457F1] transition-colors">
                            {item.name}
                          </h3>
                          <p className="mt-2 text-xs text-[#64748B] leading-relaxed">
                            {item.tagline}
                          </p>
                        </div>

                        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold text-[#0457F1]">
                          <span>Learn more</span>
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </Wrap>
        </section>
      </main>

      <Footer />
    </div>
  );
}
