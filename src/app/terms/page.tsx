import React from 'react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/premium/Footer';
import { Wrap } from '@/components/redesign/ui';
import { FileText, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | SabbPe',
  description: 'Terms and conditions governing the use of SabbPe payment orchestration services.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-[#0F172A]">
      <Navbar />

      <main className="pt-32 pb-24 sm:pt-40">
        <section className="bg-gradient-to-b from-[#F0F7FF] via-[#F8FAFC] to-white pb-16 text-center border-b border-slate-100">
          <Wrap className="flex flex-col items-center gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0457F1] shadow-2xs">
              <FileText className="h-3.5 w-3.5 text-[#0457F1]" />
              Merchant Agreement
            </div>
            <h1 className="font-display text-4xl font-bold tracking-tight text-[#0F172A] sm:text-5xl">
              Terms of Service
            </h1>
            <p className="max-w-[640px] text-base text-[#475569]">
              Please review the terms and conditions governing the use of SabbPe platform and APIs.
            </p>
          </Wrap>
        </section>

        <section className="py-16">
          <Wrap className="max-w-[840px] flex flex-col gap-8 text-sm leading-relaxed text-[#334155]">
            <div>
              <h2 className="text-xl font-bold text-[#0F172A] mb-3">1. Service Provisioning</h2>
              <p>
                SabbPe Technologies Pvt Ltd provides payment gateway aggregation, smart routing, merchant settlement, and loyalty software services subject to merchant KYC verification and approval.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0F172A] mb-3">2. Settlement & Fees</h2>
              <p>
                Settlements are credited as per agreed T+0 or T+1 cycles after statutory MDR deductions, refund adjustments, and chargeback reserves into the verified merchant nodal bank account.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0F172A] mb-3">3. Prohibited Activities</h2>
              <p>
                Merchants agree not to use the platform for gambling, unauthorized forex transactions, counterfeit products, or any activities prohibited by Indian law or NPCI/RBI guidelines.
              </p>
            </div>
          </Wrap>
        </section>
      </main>

      <Footer />
    </div>
  );
}
