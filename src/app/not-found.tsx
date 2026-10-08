import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/premium/Footer';
import { Wrap } from '@/components/redesign/ui';
import { ArrowLeft, Home, Search, ShieldCheck } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-[#0F172A]">
      <Navbar />

      <main className="flex min-h-[70vh] flex-col items-center justify-center pt-32 pb-24 text-center">
        <Wrap className="flex flex-col items-center gap-6 max-w-[640px]">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0457F1]">
            404 Page Not Found
          </div>

          <h1 className="font-display text-4xl font-bold tracking-tight text-[#0F172A] sm:text-5xl">
            We couldn't find the page you're looking for.
          </h1>

          <p className="text-base leading-relaxed text-[#475569]">
            The page might have been moved, renamed, or is temporarily unavailable. Explore our core services or head back to the home page.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-[#0457F1] px-6 py-3 text-sm font-bold text-white shadow-[0_4px_14px_rgba(4,87,241,0.28)] transition-all hover:bg-[#0339A8]"
            >
              <Home className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-[#0F172A] hover:bg-slate-50 transition-colors"
            >
              <span>Explore Services</span>
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full border-t border-slate-100 pt-8 text-xs font-semibold">
            <Link href="/services/online-payments" className="p-3 rounded-lg bg-[#F8FAFC] hover:bg-[#EFF6FF] hover:text-[#0457F1] transition-colors">
              Online Payments
            </Link>
            <Link href="/services/collections-recurring" className="p-3 rounded-lg bg-[#F8FAFC] hover:bg-[#EFF6FF] hover:text-[#0457F1] transition-colors">
              UPI Autopay
            </Link>
            <Link href="/saas/reconciliation" className="p-3 rounded-lg bg-[#F8FAFC] hover:bg-[#EFF6FF] hover:text-[#0457F1] transition-colors">
              Reconciliation
            </Link>
            <Link href="/contact" className="p-3 rounded-lg bg-[#F8FAFC] hover:bg-[#EFF6FF] hover:text-[#0457F1] transition-colors">
              Contact Us
            </Link>
          </div>
        </Wrap>
      </main>

      <Footer />
    </div>
  );
}
