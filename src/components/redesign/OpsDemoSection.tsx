'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { Wrap, FOCUS } from './ui';

type Role = { key: string; tab: string; definition: string; src: string; poster: string };
type Demo = { headline: string; narrative: string; src?: string; poster?: string; roles?: Role[] };

// Demo video and short narrative shown near the top of the Settlement, Reconciliation and Dashboard pages.
const DEMOS: Record<string, Demo> = {
  'settlement-reporting': {
    headline: "Your money shouldn't wait for someone to press a button",
    narrative: 'Share your bank account once, choose your timeline, and a SabbPe agent settles on schedule.',
    src: '/videos/settlement.mp4',
    poster: '/videos/settlement.jpg',
  },
  reconciliation: {
    headline: "Month-end shouldn't mean a week of spreadsheets",
    narrative: 'Drop in your files. An agent matches every record and shows what is missing.',
    src: '/videos/reconciliation.mp4',
    poster: '/videos/reconciliation.jpg',
  },
  dashboard: {
    headline: 'One platform, seen two ways',
    narrative: 'A merchant runs their payments. A distributor grows their merchant network. Pick your role to see your view.',
    roles: [
      { key: 'merchant', tab: "I'm a merchant", definition: 'A merchant is a business that accepts payments through SabbPe.', src: '/videos/merchant_dashboard.mp4', poster: '/videos/merchant_dashboard.jpg' },
      { key: 'distributor', tab: "I'm a distributor", definition: 'A distributor is a partner who brings merchants to SabbPe and earns commission.', src: '/videos/distributor_dashboard.mp4', poster: '/videos/distributor_dashboard.jpg' },
    ],
  },
};

const WHO = [
  ['Merchant', 'Accepts payments'],
  ['Distributor', 'Brings merchants'],
  ['SabbPe admin', 'Runs the platform'],
];

export default function OpsDemoSection({ slug }: { slug: string }) {
  const demo = DEMOS[slug];
  const [role, setRole] = useState(0);
  if (!demo) return null;
  const active = demo.roles ? demo.roles[role] : null;
  const src = active ? active.src : demo.src!;
  const poster = active ? active.poster : demo.poster!;

  return (
    <section className="border-b border-slate-100 bg-white py-16" aria-labelledby="ops-demo-heading">
      <Wrap>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0457F1]">See it in action</p>
            <h2 id="ops-demo-heading" className="mt-3 font-display text-[30px] font-bold leading-[1.15] tracking-[-0.02em] text-[#0F172A] sm:text-[36px]">{demo.headline}</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-[#475569]">{demo.narrative}</p>

            {demo.roles && (
              <>
                <ul className="mt-7 grid grid-cols-3 gap-2.5" aria-label="Who is who on SabbPe">
                  {WHO.map(([name, does]) => (
                    <li key={name} className="rounded-xl border border-slate-200 bg-[#F8FAFC] px-3 py-2.5">
                      <span className="block text-[13px] font-semibold text-[#0F172A]">{name}</span>
                      <span className="block text-[12px] text-[#64748B]">{does}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 inline-flex rounded-xl border border-slate-200 bg-[#F8FAFC] p-1" role="tablist" aria-label="Choose your role">
                  {demo.roles.map((r, i) => (
                    <button key={r.key} type="button" role="tab" aria-selected={i === role} onClick={() => setRole(i)}
                      className={clsx('rounded-lg px-4 py-2 text-[14px] font-semibold transition-colors', FOCUS, i === role ? 'bg-[#0457F1] text-white' : 'text-[#334155] hover:text-[#0457F1]')}>
                      {r.tab}
                    </button>
                  ))}
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-[#334155]">{active!.definition}</p>
              </>
            )}
          </div>

          <video key={src} controls preload="none" playsInline poster={poster}
            className="aspect-video w-full rounded-2xl border border-slate-200 bg-[#0B1220] shadow-sm"
            aria-label={active ? `${active.key} dashboard demo video` : `${demo.headline} demo video`}>
            <source src={src} type="video/mp4" />
          </video>
        </div>
      </Wrap>
    </section>
  );
}
