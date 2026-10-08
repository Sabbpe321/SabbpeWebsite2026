import React from 'react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/premium/Footer';
import { Wrap } from '@/components/redesign/ui';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | SabbPe',
  description: 'Learn how SabbPe protects and manages your personal and financial data.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-[#0F172A]">
      <Navbar />

      <main className="pt-32 pb-24 sm:pt-40">
        <section className="bg-gradient-to-b from-[#F0F7FF] via-[#F8FAFC] to-white pb-16 text-center border-b border-slate-100">
          <Wrap className="flex flex-col items-center gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0457F1] shadow-2xs">
              <ShieldCheck className="h-3.5 w-3.5 text-[#0457F1]" />
              Data Protection & Compliance
            </div>
            <h1 className="font-display text-4xl font-bold tracking-tight text-[#0F172A] sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="max-w-[640px] text-base text-[#475569]">
              Last updated: October 2026. Your privacy and security are fundamental to how we build our products.
            </p>
          </Wrap>
        </section>

        <section className="py-16">
          <Wrap className="max-w-[840px] flex flex-col gap-8 text-sm leading-relaxed text-[#334155]">
            <div>
              <h2 className="text-xl font-bold text-[#0F172A] mb-3">1. Information We Collect</h2>
              <p>
                SabbPe collects necessary business identity information, merchant KYC documents, banking coordinates, and payment transaction metadata required under Reserve Bank of India (RBI) guidelines to deliver payment processing, reconciliation, and disbursement services.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0F172A] mb-3">2. How We Use Information</h2>
              <p>
                We use collected information solely to authenticate merchant transactions, route payments to scheduled banking partners, perform automated settlement reconciliations, prevent fraudulent activities, and maintain statutory audit logs.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0F172A] mb-3">3. Data Security & Storage</h2>
              <p>
                All data is encrypted in-transit with TLS 1.3 and at-rest using AES-256 encryption within Tier-4 data centers located in India in strict compliance with RBI data localization mandates and PCI-DSS Level 1 specifications.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0F172A] mb-3">4. Contact Grievance Officer</h2>
              <p>
                For questions regarding this policy, contact our Data Protection Officer at <a href="mailto:privacy@sabbpe.com" className="text-[#0457F1] font-bold hover:underline">privacy@sabbpe.com</a>.
              </p>
            </div>
          </Wrap>
        </section>
      </main>

      <Footer />
    </div>
  );
}
