import React from 'react';
import { notFound } from 'next/navigation';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/premium/Footer';
import SaasProductDetail from '@/components/redesign/SaasProductDetail';
import { SAAS_MODULES } from '../saasData';

export async function generateStaticParams() {
  return Object.keys(SAAS_MODULES).map((slug) => ({ slug }));
}

export default async function SaasSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Normalize slug
  let cleanSlug = slug.toLowerCase();
  if (cleanSlug === 'dashboard-and-analytics' || cleanSlug === 'analytics-dashboard') {
    cleanSlug = 'dashboard';
  }

  const item = SAAS_MODULES[cleanSlug];

  if (!item) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-[#0F172A]">
      <Navbar />
      <SaasProductDetail slug={cleanSlug} />
      <Footer />
    </div>
  );
}
