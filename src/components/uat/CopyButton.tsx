'use client';

import { useState, type ReactNode } from 'react';
import { Check, Copy } from 'lucide-react';
import clsx from 'clsx';
import { copyText } from '@/lib/clipboard';

type Props = {
  value: string;
  label: string;
  onCopied?: (message: string) => void;
  children?: ReactNode;
  className?: string;
};

export default function CopyButton({ value, label, onCopied, children, className }: Props) {
  const [done, setDone] = useState(false);

  async function handleClick() {
    const ok = await copyText(value);
    if (!ok) return;
    setDone(true);
    onCopied?.('Copied');
    setTimeout(() => setDone(false), 1500);
  }

  const icon = done ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />;

  if (children) {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label={`Copy ${label}`}
        className={clsx(
          'inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-[13px] font-semibold text-[#334155] transition-colors hover:border-[#0457F1] hover:text-[#0457F1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0457F1] sm:min-h-0',
          done && 'border-[#BBF7D0] text-[#166534]',
          className,
        )}
      >
        {icon}
        {children}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Copy ${label}`}
      title={`Copy ${label}`}
      className={clsx(
        'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-[#64748B] transition-colors hover:border-[#0457F1] hover:text-[#0457F1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0457F1] sm:h-9 sm:w-9',
        done && 'border-[#BBF7D0] text-[#166534]',
        className,
      )}
    >
      {icon}
    </button>
  );
}
