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
    { slug: 'upi-qr' },
    { slug: 'upi-payments' },
    { slug: 'upi-assisted' },
    { slug: 'disbursements' },
    { slug: 'settlement-reporting' },
    { slug: 'assisted-solutions' },
    { slug: 'reconciliation' },
    { slug: 'dashboard' },
    { slug: 'gift360' },
  ];
}

export default async function ServiceSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const clean = decodeURIComponent(slug).toLowerCase().trim();

  return (
    <div className="min-h-screen bg-white text-[#0F172A]">
      <Navbar />
      <main className="pt-20 sm:pt-24">
        <ServicesVideoSuite key={clean} initialCategory={clean} initialFeature={clean} />
      </main>
      <Footer />
    </div>
  );
}
