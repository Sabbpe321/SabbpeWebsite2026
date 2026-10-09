'use client';

import type { UatField } from '@/lib/uat';
import CopyButton from '@/components/uat/CopyButton';
import SecretField from '@/components/uat/SecretField';

export default function CredentialRow({ field, onCopied }: { field: UatField; onCopied?: (message: string) => void }) {
  return (
    <div className="flex items-center gap-3 border-t border-slate-100 py-2.5 first:border-t-0">
      <code className="w-[40%] shrink-0 truncate font-mono text-[12px] text-[#64748B]" title={field.label}>{field.label}</code>
      <span className="min-w-0 flex-1">
        {field.secret ? <SecretField value={field.value} /> : <code className="break-all font-mono text-[13px] text-[#0F172A]">{field.value}</code>}
      </span>
      {/* Always copies the real value, never the masked dots. */}
      <CopyButton value={field.value} label={field.label} onCopied={onCopied} />
    </div>
  );
}
