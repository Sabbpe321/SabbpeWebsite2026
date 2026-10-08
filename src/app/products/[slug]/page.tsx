import React from 'react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/premium/Footer';
import ServicesVideoSuite from '@/components/redesign/ServicesVideoSuite';
import SaasProductDetail from '@/components/redesign/SaasProductDetail';
import { SAAS_MODULES } from '@/app/saas/saasData';

export async function generateStaticParams() {
  return [
    { slug: 'online-payments' },
    { slug: 'collections-recurring' },
    { slug: 'upi-assisted' },
    { slug: 'assisted-solutions' },
    { slug: 'settlement-reporting' },
    { slug: 'gift360' },
  ];
}

export default async function ProductSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const clean = decodeURIComponent(slug).toLowerCase().trim();

  const isSaas = Boolean(SAAS_MODULES[clean] || clean === 'dashboard-and-analytics');
  if (isSaas) {
    return (
      <div className="min-h-screen bg-white text-[#0F172A]">
        <Navbar />
        <SaasProductDetail slug={clean} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#0F172A]">
      <Navbar />
      <main className="pt-24 sm:pt-28">
        <ServicesVideoSuite key={slug} initialCategory={slug} />
      </main>
      <Footer />
    </div>
  );
}
