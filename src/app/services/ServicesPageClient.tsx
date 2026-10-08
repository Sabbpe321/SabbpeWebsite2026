'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import ServicesVideoSuite from '@/components/redesign/ServicesVideoSuite';

export default function ServicesPageClient() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || undefined;
  const demo = searchParams.get('demo') || undefined;

  return (
    <div>
      <ServicesVideoSuite key={`${category || 'default'}-${demo || 'default'}`} initialCategory={category} initialFeature={demo} />
    </div>
  );
}
