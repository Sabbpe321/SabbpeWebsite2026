'use client';

import { useEffect, useRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { MASK } from '@/lib/uat';

const REMASK_MS = 30_000;

export default function SecretField({ value }: { value: string }) {
  const [revealed, setRevealed] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (revealed) timer.current = setTimeout(() => setRevealed(false), REMASK_MS);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [revealed]);

  return (
    <span className="inline-flex items-center gap-2">
      <code className="break-all font-mono text-[13px] text-[#0F172A]">{revealed ? value : MASK}</code>
      <button
        type="button"
        aria-label={revealed ? 'Hide value' : 'Reveal value'}
        aria-pressed={revealed}
        title={revealed ? 'Hide value' : 'Reveal value'}
        onClick={() => setRevealed((r) => !r)}
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-[#64748B] transition-colors hover:bg-[#F1F5F9] hover:text-[#0457F1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0457F1] sm:h-8 sm:w-8"
      >
        {revealed ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
      </button>
    </span>
  );
}
