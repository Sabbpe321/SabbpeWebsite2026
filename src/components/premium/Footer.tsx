'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-[#F8FAFC] text-[#475569] text-sm">
      <div className="mx-auto max-w-[1120px] px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="relative h-8 w-32 flex items-center">
                <Image
                  src="/sabbpe_logo.png"
                  alt="SabbPe"
                  fill
                  sizes="128px"
                  className="object-contain object-left"
                />
              </div>
              <span className="rounded-md border border-blue-200 bg-[#EFF6FF] px-2 py-0.5 text-xs font-bold text-[#0457F1]">
                Payments & Loyalty
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[#475569] max-w-sm">
              SabbPe is the next-generation payment orchestration and payouts platform. Powering seamless collections, smart routing, instant settlements, and customer retention with Gift360.
            </p>
            <div className="mt-2 text-xs font-medium text-[#64748B]">
              Recognised by DPIIT, NASSCOM, IIM Lucknow & Wadhwani Foundation.
            </div>
          </div>

          {/* Solutions */}
          <div className="flex flex-col gap-3">
            <div className="font-bold text-[#0F172A]">Solutions</div>
            <Link href="/services/upi-payments" className="hover:text-[#0457F1] transition-colors">Collections & UPI</Link>
            <Link href="/services/payment-gateway" className="hover:text-[#0457F1] transition-colors">Smart Routing</Link>
            <Link href="/services/payouts" className="hover:text-[#0457F1] transition-colors">Disbursements</Link>
            <Link href="/services/subscriptions" className="hover:text-[#0457F1] transition-colors">Instant Settlements</Link>
            <a href="https://www.gift360.io/" target="_blank" rel="noopener noreferrer" className="hover:text-[#0457F1] transition-colors">Gift360 Loyalty</a>
          </div>

          {/* Developers */}
          <div className="flex flex-col gap-3">
            <div className="font-bold text-[#0F172A]">Developers</div>
            <Link href="/docs" className="hover:text-[#0457F1] transition-colors">API Documentation</Link>
            <Link href="/saas" className="hover:text-[#0457F1] transition-colors">Sandbox Testing</Link>
            <Link href="/services/integration" className="hover:text-[#0457F1] transition-colors">Integrations</Link>
            <Link href="/saas/dashboard" className="hover:text-[#0457F1] transition-colors">Platform Status</Link>
            <Link href="/saas/reconciliation" className="hover:text-[#0457F1] transition-colors">SDKs & Plugins</Link>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-3">
            <div className="font-bold text-[#0F172A]">Company</div>
            <Link href="/about" className="hover:text-[#0457F1] transition-colors">About Us</Link>
            <Link href="/contact" className="hover:text-[#0457F1] transition-colors">Contact Support</Link>
            <Link href="/privacy" className="hover:text-[#0457F1] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#0457F1] transition-colors">Terms of Service</Link>
            <Link href="/about" className="hover:text-[#0457F1] transition-colors">Security & ISO 27001</Link>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <p suppressHydrationWarning>© {new Date().getFullYear()} SabbPe Technologies Pvt Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-[#0457F1] transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-[#0457F1] transition-colors">Privacy</Link>
            <Link href="/about" className="hover:text-[#0457F1] transition-colors">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
