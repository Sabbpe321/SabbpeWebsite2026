import React, { Suspense } from 'react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/premium/Footer';
import ServicesVideoSuite from '@/components/redesign/ServicesVideoSuite';
import ServicesPageClient from './ServicesPageClient';

export const metadata = {
  title: 'Services & Product Suite | SabbPe Payment Orchestration',
  description: 'Explore live video demonstrations and interactive walkthroughs of SabbPe payment services: Online Payments, UPI & QR, Collections & Recurring, and Disbursements.',
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white text-[#0F172A]">
      <Navbar />
      <main className="pt-24 sm:pt-28">
        <Suspense fallback={<div className="min-h-[600px] flex items-center justify-center text-slate-400 font-mono">Loading Services Suite...</div>}>
          <ServicesPageClient />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
