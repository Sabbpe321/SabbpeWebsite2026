import Link from 'next/link';
import { ArrowRight, Lock, PlayCircle } from 'lucide-react';
import { DOCS_GROUPS } from './docsNav';
import { getSession, LOGIN_URL } from '@/lib/docsAuth';

export default async function DocsHome() {
  const session = await getSession();
  const loggedIn = session !== null;
  return (
    <div className="max-w-5xl">
      <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0457F1]">Developer docs</p>
      <h1 className="mt-2 text-[34px] font-semibold leading-tight tracking-tight sm:text-[40px]">Build with SabbPe</h1>
      <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-[#475569]">
        Every product has a short guide and a walkthrough video. Products with an API also have a full reference, with the endpoints, request fields and samples you need to integrate.
      </p>

      {!loggedIn && (
        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <Lock className="mt-0.5 h-5 w-5 shrink-0 text-[#0457F1]" />
            <p className="text-[15px] leading-relaxed text-[#1E3A8A]">Guides and videos are open to everyone. API details are shown to developers after they sign up and log in.</p>
          </div>
          <div className="flex shrink-0 gap-2"><a href="/signup?next=/docs" className="inline-flex items-center justify-center rounded-lg border border-[#0457F1] bg-white px-4 py-2.5 text-[14px] font-semibold text-[#0457F1] hover:bg-[#EEF5FF]">Sign up</a><a href={`${LOGIN_URL}?next=/docs`} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#0457F1] px-4 py-2.5 text-[14px] font-semibold text-white hover:bg-[#0346C4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0457F1]">Log in<ArrowRight className="h-4 w-4" /></a></div>
        </div>
      )}

      {session && (
        <form action="/api/auth/logout" method="post" className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#BBF7D0] bg-[#F0FDF4] px-5 py-4">
          <p className="text-[15px] text-[#166534]">Logged in as <span className="font-semibold">{session.email}</span>. API details are unlocked.</p>
          <button type="submit" className="rounded-lg border border-[#86EFAC] bg-white px-3.5 py-2 text-[14px] font-semibold text-[#166534] hover:bg-[#DCFCE7]">Log out</button>
        </form>
      )}

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
