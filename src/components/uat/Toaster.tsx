'use client';

import { Check } from 'lucide-react';

export default function Toaster({ message }: { message: string }) {
  return (
    <div aria-live="polite" role="status" className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
      {message && (
        <span className="inline-flex items-center gap-2 rounded-lg bg-[#0F172A] px-4 py-2.5 text-[14px] font-semibold text-white shadow-lg">
          <Check className="h-4 w-4 text-[#22C55E]" aria-hidden="true" />
          {message}
        </span>
      )}
    </div>
  );
}
