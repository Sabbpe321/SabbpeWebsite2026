'use client';

import { useRef, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { FOCUS } from './ui';

/** One horizontal, swipeable row with previous and next buttons. Keeps long lists from adding page height. */
export default function HScroller({ header, label, children }: { header: ReactNode; label: string; children: ReactNode }) {
  const ref = useRef<HTMLUListElement>(null);
  const move = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.9, behavior: 'smooth' });
  const btn = clsx('flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-[#0F172A] hover:border-[#0457F1] hover:text-[#0457F1]', FOCUS);
  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div className="min-w-0">{header}</div>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={() => move(-1)} aria-label={`Previous ${label}`} className={btn}><ChevronLeft className="h-5 w-5" /></button>
          <button type="button" onClick={() => move(1)} aria-label={`Next ${label}`} className={btn}><ChevronRight className="h-5 w-5" /></button>
        </div>
      </div>
      <ul ref={ref} tabIndex={0} aria-label={label} className={clsx('mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden', FOCUS)}>
        {children}
      </ul>
    </div>
  );
}
