import { notFound } from 'next/navigation';
import { ArrowRight, Lock } from 'lucide-react';
import { ALL_PRODUCTS, findProduct, groupOf } from '../docsNav';
import { isLoggedIn, LOGIN_URL } from '@/lib/docsAuth';
import EndpointBlock from '@/components/docs/EndpointBlock';

export async function generateMetadata({ params }: { params: Promise<{ product: string }> }) {
  const { product } = await params;
  const p = findProduct(product);
  return { title: p ? `${p.name} | SabbPe Developer Docs` : 'SabbPe Developer Docs', description: p?.tagline };
}

export default async function DocsProductPage({ params }: { params: Promise<{ product: string }> }) {
  const { product } = await params;
  const p = findProduct(product);
  if (!p) notFound();
  if (!ALL_PRODUCTS.some((x) => x.slug === product)) notFound();

  const loggedIn = p.access === 'api' ? await isLoggedIn() : false;
  // API details are loaded only for logged-in merchants, on the server.
  const api = loggedIn ? (await import('../apiData')).API_DATA[p.slug] : null;
  const baseUrl = loggedIn ? (await import('../apiData')).TEST_BASE_URL : '';

  return (
    <article className="max-w-6xl">
      <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0457F1]">{groupOf(p.slug)}</p>
      <h1 className="mt-2 text-[34px] font-semibold leading-tight tracking-tight sm:text-[40px]">{p.name}</h1>
      <p className="mt-3 text-[18px] text-[#475569]">{p.tagline}</p>

      <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <div>
          <p className="text-[16px] leading-relaxed text-[#334155]">{p.narration}</p>
          <h2 className="mt-7 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#64748B]">Who it is for</h2>
          <ul className="mt-3 flex flex-wrap gap-2">{p.whoFor.map((w) => (<li key={w} className="rounded-full border border-slate-200 bg-[#F8FAFC] px-3 py-1 text-[13px] font-medium text-[#334155]">{w}</li>))}</ul>
          <h2 className="mt-7 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#64748B]">How it works</h2>
          <ol className="mt-3 space-y-2.5">{p.steps.map((s, i) => (<li key={s} className="flex items-start gap-3 text-[15px] text-[#334155]"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EEF5FF] text-[12px] font-bold text-[#0457F1]">{i + 1}</span>{s}</li>))}</ol>
        </div>
        {p.video
          ? <video controls preload="metadata" playsInline className="w-full rounded-2xl border border-slate-200 bg-[#0B1220] shadow-sm" aria-label={`${p.name} walkthrough video`}><source src={p.video} type="video/mp4" /></video>
          : <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-[#F8FAFC] text-[14px] text-[#64748B]">A walkthrough video for this product is on the way.</div>}
      </div>

      <section className="mt-14" aria-labelledby="api-ref">
        <h2 id="api-ref" className="text-[24px] font-semibold">API reference</h2>

        {p.access === 'dashboard' && <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#475569]">This product is set up from your SabbPe dashboard, so there is no API to integrate. Follow the steps in the video above.</p>}
        {p.access === 'soon' && <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#475569]">The API reference for this product has not been published yet. Contact your SabbPe account manager if you need it now.</p>}

        {p.access === 'api' && !api && (
          <div className="mt-5 rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6">
            <div className="flex items-start gap-3">
              <Lock className="mt-0.5 h-5 w-5 shrink-0 text-[#0457F1]" />
              <div>
                <p className="text-[16px] font-semibold">Sign up or log in to see the API details</p>
                <p className="mt-1 text-[14px] leading-relaxed text-[#475569]">Endpoints, request fields and sample responses are available with a free developer account.</p>
              </div>
            </div>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">{(p.endpointNames ?? []).map((n) => (<li key={n} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[14px] text-[#334155]"><Lock className="h-3.5 w-3.5 text-[#94A3B8]" />{n}</li>))}</ul>
            <div className="mt-5 flex flex-wrap gap-2"><a href={`/signup?next=/docs/${p.slug}`} className="inline-flex items-center rounded-lg bg-[#0457F1] px-4 py-2.5 text-[14px] font-semibold text-white hover:bg-[#0346C4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0457F1]">Create developer account</a><a href={`${LOGIN_URL}?next=/docs/${p.slug}`} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-[14px] font-semibold text-[#0F172A] hover:border-[#0457F1]">Log in<ArrowRight className="h-4 w-4" /></a></div>
          </div>
        )}

        {api && (
          <>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#475569]">{api.intro}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-[13px]"><span className="font-semibold text-[#64748B]">Test base URL</span><code className="rounded-md bg-[#F1F5F9] px-2 py-1">{baseUrl}</code></div>
            <nav aria-label="Endpoints on this page" className="mt-5 flex flex-wrap gap-2">{api.endpoints.map((e) => (<a key={e.id} href={`#${e.id}`} className="rounded-full border border-slate-200 px-3 py-1 text-[13px] font-medium text-[#334155] hover:border-[#0457F1] hover:text-[#0457F1]">{e.title}</a>))}</nav>
            <div className="mt-4">{api.endpoints.map((e) => (<EndpointBlock key={e.id} endpoint={e} baseUrl={baseUrl} />))}</div>
          </>
        )}
      </section>
    </article>
  );
}
