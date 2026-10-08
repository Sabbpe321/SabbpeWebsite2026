'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { Wrap } from './ui';

const STATS: { value: number | null; text: string; suffix: string; label: string }[] = [
  { value: null, text: 'T+0', suffix: '', label: 'Settlement cycle' },
  { value: 10, text: '', suffix: '+', label: 'Banking and aggregator alliances' },
  { value: 400, text: '', suffix: '+', label: 'Brands on Gift360' },
  { value: 500, text: '', suffix: '+', label: 'Merchants served' },
];

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, { duration: 1.4, ease: 'easeOut', onUpdate: (latest) => setValue(Math.round(latest)) });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return (
    <span ref={ref} className="text-[#0457F1]">
      {reduce ? to : value}
      {suffix}
    </span>
  );
}

export default function StatsCard() {
  return (
    <section className="bg-white pb-24 text-[#0F172A]">
      <Wrap>
        <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.04)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
          <div className="flex flex-col gap-4 bg-gradient-to-br from-[#EFF6FF] via-[#F8FAFC] to-[#F1F5F9] p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-slate-200">
            <div className="font-display text-[28px] font-bold leading-tight text-[#0F172A]">
              Bank-grade payments for every business
            </div>
            <p className="text-[16px] leading-relaxed text-[#475569]">
              Faster onboarding, lower cost and money in your account without the wait.
            </p>
            <div className="mt-2 flex flex-wrap gap-2.5 text-[13px] font-bold">
              <span className="rounded-full border border-blue-200 bg-white px-3.5 py-1.5 text-[#0457F1] shadow-2xs">
                ISO 27001
              </span>
              <span className="rounded-full border border-blue-200 bg-white px-3.5 py-1.5 text-[#0457F1] shadow-2xs">
                DPIIT recognised
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 bg-white">
            {STATS.map((stat, index) => (
              <div
                key={stat.label}
                className={`border-slate-100 p-7 sm:p-8 ${index % 2 === 0 ? 'lg:border-l' : 'border-l'} ${index < 2 ? 'border-b' : ''} border-t lg:border-t-0`}
              >
                <div className="font-display text-[40px] font-bold leading-none text-[#0457F1] sm:text-5xl">
                  {stat.value === null ? (
                    <span className="text-[#0457F1]">{stat.text}</span>
                  ) : (
                    <CountUp to={stat.value} suffix={stat.suffix} />
                  )}
                </div>
                <div className="mt-2.5 text-sm font-semibold text-[#64748B]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Wrap>
    </section>
  );
}
