import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Calendar,
  Clock,
  Tag,
  ChevronRight,
  Share2,
  TrendingUp,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/premium/Footer';
import { Wrap, Chip, H2 } from '@/components/redesign/ui';

export const metadata = {
  title: 'Blog & Insights | SabbPe Payment Orchestration',
  description: 'Latest insights, engineering deep dives, and industry trends on payment orchestration, UPI Autopay, instant settlements, and customer loyalty.',
};

const FEATURED_POST = {
  slug: 'payment-orchestration-architecture-2026',
  title: 'The Future of Payment Orchestration: How AI Smart Routing Boosts Transaction Success Rates to 99.4%',
  excerpt: 'A deep dive into how multi-gateway intelligent routing eliminates single points of failure, cuts processing costs, and delivers sub-second failover for high-scale enterprise merchants.',
  author: 'SabbPe Engineering Team',
  date: 'October 2026',
  readTime: '6 min read',
  category: 'Engineering & Tech',
  image: '/blog-featured.jpg',
  tags: ['Smart Routing', 'UPI', 'FinTech Architecture'],
};

const BLOG_POSTS = [
  {
    slug: 'instant-t0-settlements-guide',
    title: 'Demystifying T+0 Settlements: How SabbPe Delivers Real-Time Bank Liquidity',
    excerpt: 'Explore the mechanics behind automated penny drops, bank clearing rails, and how intraday settlements unlock working capital for modern commerce.',
    author: 'Finance & Treasury Desk',
    date: 'October 2026',
    readTime: '4 min read',
    category: 'Settlement & Ops',
    icon: Zap,
  },
  {
    slug: 'gift360-crm-loyalty-monetization',
    title: 'Transforming Transactions into Loyalty: The SabbPe + Gift360 Integration Playbook',
    excerpt: 'Learn how merchants turn first-time buyers into repeat brand champions using automatic CRM customer profiling, cashback, and 400+ brand vouchers.',
    author: 'Product & Growth',
    date: 'September 2026',
    readTime: '5 min read',
    category: 'Product Growth',
    icon: Sparkles,
  },
  {
    slug: 'upi-autopay-subscription-economy',
    title: 'Mastering UPI AutoPay: Best Practices for Recurring Billing Mandates in India',
    excerpt: 'Step-by-step architectural breakdown for setting up friction-free recurring subscription mandates on UPI 2.0 with automated retry logics.',
    author: 'Payments Team',
    date: 'September 2026',
    readTime: '7 min read',
    category: 'UPI & Collections',
    icon: TrendingUp,
  },
  {
    slug: 'iso-27001-fintech-security',
    title: 'Enterprise FinTech Security: Inside SabbPe’s Zero-Trust Compliance Framework',
    excerpt: 'An overview of how our ISO 27001 certified vault, end-to-end tokenization, and automated fraud prevention protect millions of transactions daily.',
    author: 'Security & Compliance',
    date: 'August 2026',
    readTime: '5 min read',
    category: 'Security & Compliance',
    icon: ShieldCheck,
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white text-[#0F172A]">
      <Navbar />

      <main className="pt-32 pb-24 sm:pt-40">
        {/* Header Hero */}
        <section className="border-b border-slate-100 bg-gradient-to-b from-[#F0F7FF] via-[#F8FAFC] to-white pb-16 pt-8">
          <Wrap className="flex flex-col items-center text-center gap-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0457F1] shadow-2xs">
              <Sparkles className="h-3.5 w-3.5 text-[#0457F1]" />
              SabbPe Knowledge Hub
            </div>
            <h1 className="max-w-[800px] font-display text-4xl font-bold tracking-tight text-[#0F172A] sm:text-5xl lg:text-6xl">
              Insights on payments,{' '}
              <span className="bg-gradient-to-r from-[#0457F1] via-[#0284C7] to-[#00A3FF] bg-clip-text text-transparent">
                infrastructure & growth.
              </span>
            </h1>
            <p className="max-w-[640px] text-base leading-relaxed text-[#475569] sm:text-lg">
              Explore product updates, engineering deep dives, and expert perspectives on modern payment orchestration and customer loyalty.
            </p>
          </Wrap>
        </section>

        {/* Featured Blog Story */}
        <section className="py-14">
          <Wrap>
            <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-50/50 via-white to-slate-50 p-8 shadow-sm transition-all hover:border-[#0457F1]/40 hover:shadow-lg sm:p-12">
              <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                <div className="flex flex-col gap-4 lg:col-span-8">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-[#0457F1]">
                    <span className="rounded-full bg-[#0457F1] px-3 py-1 text-white font-semibold shadow-2xs">
                      Featured Story
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="uppercase tracking-wider">{FEATURED_POST.category}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500 font-medium">{FEATURED_POST.readTime}</span>
                  </div>

                  <h2 className="font-display text-2xl font-bold leading-snug text-[#0F172A] sm:text-3xl lg:text-4xl group-hover:text-[#0457F1] transition-colors">
                    {FEATURED_POST.title}
                  </h2>

                  <p className="text-base leading-relaxed text-[#475569]">
                    {FEATURED_POST.excerpt}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200/80">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0457F1] text-white font-bold text-sm">
                        SP
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#0F172A]">{FEATURED_POST.author}</div>
                        <div className="text-xs text-[#64748B]">{FEATURED_POST.date}</div>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-2 text-sm font-bold text-[#0457F1] group-hover:translate-x-1 transition-transform">
                      <span>Read Full Article</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                <div className="hidden lg:flex lg:col-span-4 flex-col justify-center items-center rounded-2xl border border-blue-100 bg-[#EFF6FF]/60 p-8 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0457F1] text-white shadow-md mb-4">
                    <Zap className="h-8 w-8" />
                  </div>
                  <div className="font-display text-xl font-bold text-[#0F172A]">AI Smart Routing</div>
                  <div className="mt-2 text-xs text-slate-600 leading-relaxed">
                    Zero manual failovers. 100% automated orchestration across Yes Bank, NTT Data, Mswipe, and more.
                  </div>
                </div>
              </div>
            </div>
          </Wrap>
        </section>

        {/* Recent Articles Grid */}
        <section className="py-8">
          <Wrap className="flex flex-col gap-10">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h2 className="font-display text-2xl font-bold text-[#0F172A]">Recent Articles & Insights</h2>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0457F1]">4 Articles Published</span>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              {BLOG_POSTS.map((post) => {
                const IconComponent = post.icon;
                return (
                  <article
                    key={post.slug}
                    className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 shadow-2xs transition-all duration-300 hover:border-[#0457F1]/40 hover:shadow-md hover:-translate-y-1"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#0457F1] border border-blue-100">
                          {post.category}
                        </span>
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-slate-500 group-hover:bg-[#0457F1] group-hover:text-white transition-colors">
                          <IconComponent className="h-4 w-4" />
                        </div>
                      </div>

                      <h3 className="font-display text-xl font-bold leading-snug text-[#0F172A] group-hover:text-[#0457F1] transition-colors">
                        {post.title}
                      </h3>

                      <p className="mt-3 text-sm leading-relaxed text-[#475569]">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-[#64748B]">
                      <span>{post.readTime} • {post.date}</span>
                      <span className="flex items-center gap-1 font-bold text-[#0457F1] group-hover:underline">
                        Read more <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </Wrap>
        </section>

        {/* Newsletter Subscription Card */}
        <section className="mt-14">
          <Wrap>
            <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] p-8 text-white text-center sm:p-12 shadow-xl">
              <h2 className="font-display text-2xl font-bold sm:text-3xl">Stay updated with SabbPe Engineering</h2>
              <p className="mx-auto mt-2 max-w-[540px] text-sm text-slate-300">
                Get monthly deep dives into payment orchestration architectures, UPI 2.0 developments, and loyalty technology.
              </p>
              <form action="#" method="GET" className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your work email"
                  required
                  className="flex-1 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-[#0457F1] focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-[#0457F1] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0339A8]"
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
