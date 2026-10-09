'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown, Lock, BookOpen } from 'lucide-react';
import clsx from 'clsx';
import { DOCS_GROUPS } from '@/app/docs/docsNav';

export default function DocsSidebar({ showUat = false }: { showUat?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const item = (href: string, label: string, locked = false) => {
    const active = pathname === href;
    return (
      <Link key={href} href={href} onClick={() => setOpen(false)}
        className={clsx('flex items-center justify-between rounded-lg px-3 py-2 text-[14px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0457F1]',
          active ? 'bg-[#EEF5FF] font-semibold text-[#0457F1]' : 'text-[#334155] hover:bg-[#F8FAFC] hover:text-[#0F172A]')}>
        <span>{label}</span>
        {locked && <Lock aria-label="API reference needs login" className="h-3.5 w-3.5 text-[#94A3B8]" />}
      </Link>
    );
  };
  const tree = (
    <nav aria-label="Developer docs" className="space-y-6">
      <div>{item('/docs', 'Introduction')}</div>
      {showUat && (
        <div>
          <p className="px-3 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#64748B]">UAT</p>
          <div className="space-y-0.5">{item('/docs/uat', 'Credentials')}</div>
        </div>
      )}
      {DOCS_GROUPS.map((g) => (
        <div key={g.title}>
          <p className="px-3 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#64748B]">{g.title}</p>
          <div className="space-y-0.5">{g.products.map((p) => item(`/docs/${p.slug}`, p.name, p.access === 'api'))}</div>
        </div>
      ))}
    </nav>
  );
  return (
    <>
      <div className="lg:hidden border-b border-slate-200 bg-white px-4 py-3">
        <button type="button" onClick={() => setOpen(!open)} aria-expanded={open}
          className="flex w-full items-center justify-between rounded-lg border border-slate-200 px-3 py-2.5 text-[14px] font-semibold text-[#0F172A]">
          <span className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-[#0457F1]" />Browse docs</span>
          <ChevronDown className={clsx('h-4 w-4 transition-transform', open && 'rotate-180')} />
        </button>
        {open && <div className="mt-3 max-h-[60vh] overflow-y-auto pb-2">{tree}</div>}
      </div>
      <aside className="hidden lg:block w-[272px] shrink-0 border-r border-slate-200">
        <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto px-4 py-8">{tree}</div>
      </aside>
    </>
  );
}
