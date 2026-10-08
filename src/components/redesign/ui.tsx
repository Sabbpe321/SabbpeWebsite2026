import clsx from 'clsx';
import type { ReactNode } from 'react';

/** Standard brand theme colors */
export const COLORS = {
  primary: '#0457F1',
  primaryDark: '#0339A8',
  sky: '#0284C7',
  dark: '#0F172A',
  body: '#475569',
  muted: '#64748B',
  border: '#E2E8F0',
  lightBg: '#F8FAFC',
  tint: '#EFF6FF',
} as const;

/** Clean centered responsive wrapper */
export function Wrap({ className, children }: { dark?: boolean; className?: string; children: ReactNode }) {
  return (
    <div className={clsx('mx-auto w-full max-w-[1140px] px-5 sm:px-8', className)}>
      {children}
    </div>
  );
}

export function Chip({ children }: { dark?: boolean; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-[#EFF6FF] px-3.5 py-1 text-[13px] font-bold text-[#0457F1] shadow-2xs">
      <span className="h-1.5 w-1.5 rounded-full bg-[#0457F1]" aria-hidden="true" />
      {children}
    </span>
  );
}

export const H2 = 'font-display text-[32px] font-bold leading-[1.15] tracking-[-0.025em] text-[#0F172A] sm:text-[40px] lg:text-[46px]';
export const FOCUS = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0457F1]';
