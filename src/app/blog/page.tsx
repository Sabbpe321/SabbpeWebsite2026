import React from 'react';
import { Sparkles } from 'lucide-react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/premium/Footer';
import { Wrap } from '@/components/redesign/ui';
import BlogVideoGallery from '@/components/blog/BlogVideoGallery';

export const metadata = {
  title: 'Video Knowledge Hub & Walkthroughs | SabbPe',
  description: 'Comprehensive video library and deep dives into SabbPe payment orchestration, multi-gateway routing, T+0 settlements, and Gift360 CRM loyalty.',
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white text-[#0F172A]">
      <Navbar />

      <main className="pt-28 pb-16 sm:pt-36">
        {/* Compact Hero Header */}
        <section className="border-b border-slate-100 bg-gradient-to-b from-[#F0F7FF] via-[#F8FAFC] to-white pb-10 pt-4">
          <Wrap className="flex flex-col items-center text-center gap-3">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-white px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#0457F1] shadow-2xs">
              <Sparkles className="h-3 w-3 text-[#0457F1]" />
              SabbPe Video Knowledge Hub
            </div>
            <h1 className="max-w-[760px] font-display text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl lg:text-5xl">
              Video walkthroughs,{' '}
              <span className="bg-gradient-to-r from-[#0457F1] via-[#0284C7] to-[#00A3FF] bg-clip-text text-transparent">
                architecture & demos.
              </span>
            </h1>
            <p className="max-w-[620px] text-sm leading-relaxed text-[#475569] sm:text-base">
              Explore our complete 21-video library covering payment orchestration, instant settlements, UPI autopay, reconciliation, and Gift360 customer loyalty.
            </p>
          </Wrap>
        </section>

        {/* Video Library & Deep Dives */}
        <BlogVideoGallery />

        {/* Compact Stay Updated Card */}
        <section className="py-8">
          <Wrap>
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] p-6 text-white text-center sm:p-8 shadow-md">
              <h3 className="font-display text-xl font-bold sm:text-2xl">Stay updated with SabbPe Product Releases</h3>
              <p className="mx-auto mt-1.5 max-w-[480px] text-xs text-slate-300">
                Get notified when new video walkthroughs, API features, and payment orchestration updates go live.
              </p>
              <form action="#" method="GET" className="mx-auto mt-4 flex max-w-md flex-col gap-2 sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your work email"
                  required
                  className="flex-1 rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:border-[#0457F1] focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-[#0457F1] px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#0339A8]"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </Wrap>
        </section>
      </main>

      <Footer />
    </div>
  );
}
