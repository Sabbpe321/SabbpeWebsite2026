import Link from 'next/link';
import { PlayCircle } from 'lucide-react';
import { DOCS_GROUPS } from './docsNav';

export default function DocsHome() {
  return (
    <div className="max-w-5xl">
      <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0457F1]">Developer docs</p>
      <h1 className="mt-2 text-[34px] font-semibold leading-tight tracking-tight sm:text-[40px]">Build with SabbPe</h1>
      <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-[#475569]">
        Every product has a short guide and a walkthrough video. Products with an API also have a full reference, with the endpoints, request fields and samples you need to integrate.
      </p>

      {DOCS_GROUPS.map((g) => (
        <section key={g.title} className="mt-12">
          <h2 className="text-[20px] font-semibold">{g.title}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {g.products.map((p) => (
              <Link key={p.slug} href={`/docs/${p.slug}`} className="group rounded-xl border border-slate-200 p-5 transition-colors hover:border-[#0457F1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0457F1]">
                <div className="flex items-center justify-between">
                  <h3 className="text-[16px] font-semibold group-hover:text-[#0457F1]">{p.name}</h3>
                  {p.video && <PlayCircle aria-label="Has a video" className="h-4 w-4 text-[#94A3B8]" />}
                </div>
                <p className="mt-1.5 text-[14px] leading-relaxed text-[#475569]">{p.tagline}</p>
                <p className="mt-3 text-[12px] font-semibold text-[#64748B]">{p.access === 'api' ? 'Guide, video and API reference' : p.access === 'dashboard' ? 'Guide and video' : 'Guide and video, API reference coming'}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
