'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AlertTriangle, RefreshCw, Search } from 'lucide-react';
import { productMatches, type UatCredentialsResponse, type UatProduct } from '@/lib/uat';
import CredentialCard from '@/components/uat/CredentialCard';
import Toaster from '@/components/uat/Toaster';

function SkeletonGrid() {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3" aria-hidden="true">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="animate-pulse rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-slate-100" />
            <div className="h-4 w-32 rounded bg-slate-100" />
          </div>
          <div className="mt-5 space-y-3">
            <div className="h-4 w-full rounded bg-slate-100" />
            <div className="h-4 w-5/6 rounded bg-slate-100" />
            <div className="h-4 w-2/3 rounded bg-slate-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

function StateCard({ icon, title, body, action }: { icon: React.ReactNode; title: string; body: string; action?: React.ReactNode }) {
  return (
    <div className="mt-6 flex flex-col items-center rounded-xl border border-slate-200 bg-[#F8FAFC] px-6 py-12 text-center">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#64748B] shadow-sm" aria-hidden="true">{icon}</span>
      <p className="mt-4 text-[16px] font-semibold text-[#0F172A]">{title}</p>
      <p className="mt-1 max-w-md text-[14px] leading-relaxed text-[#475569]">{body}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export default function UatCredentialsClient() {
  const [data, setData] = useState<UatCredentialsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [toast, setToast] = useState('');
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/uat-credentials', { cache: 'no-store', credentials: 'same-origin' });
      if (!res.ok) throw new Error(res.status === 401 ? 'Your session has expired. Please log in again.' : 'Could not load UAT credentials.');
      setData((await res.json()) as UatCredentialsResponse);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load UAT credentials.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);
  useEffect(() => () => { if (toastTimer.current) clearTimeout(toastTimer.current); }, []);

  const notify = useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 2000);
  }, []);

  const products: UatProduct[] = data?.products ?? [];
  const filtered = products.filter((p) => productMatches(p, query));

  return (
    <article className="max-w-6xl">
      <header>
        <h1 className="text-[34px] font-semibold leading-tight tracking-tight sm:text-[40px]">UAT Credentials</h1>
      </header>

      <div className="mt-6 max-w-md">
        <label htmlFor="uat-search" className="sr-only">Search products or fields</label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" aria-hidden="true" />
          <input
            id="uat-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products or fields"
            autoComplete="off"
            className="w-full rounded-lg border border-slate-300 py-2.5 pl-9 pr-3 text-[15px] text-[#0F172A] outline-none focus:border-[#0457F1] focus:ring-2 focus:ring-[#0457F1]/20"
          />
        </div>
      </div>

      {loading && <SkeletonGrid />}

      {!loading && error && (
        <StateCard
          icon={<AlertTriangle className="h-5 w-5" />}
          title="Could not load credentials"
          body={error}
          action={
            <button
              type="button"
              onClick={() => void load()}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#0457F1] px-4 py-2.5 text-[14px] font-semibold text-white hover:bg-[#0346C4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0457F1] sm:min-h-0"
            >
              <RefreshCw className="h-4 w-4" aria-hidden="true" />Retry
            </button>
          }
        />
      )}

      {!loading && !error && filtered.length === 0 && (
        <StateCard
          icon={<Search className="h-5 w-5" />}
          title={products.length === 0 ? 'No credentials yet' : 'No matching products'}
          body={products.length === 0
            ? 'No UAT credentials have been published for your account yet. Contact your SabbPe account manager.'
            : `Nothing matches “${query}”. Try another product or field name.`}
        />
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {filtered.map((product) => (
            <CredentialCard key={product.key} product={product} onCopied={notify} />
          ))}
        </div>
      )}

      <Toaster message={toast} />
    </article>
  );
}
