'use client';

import { CreditCard, Landmark, Link2, Link as LinkIcon, RefreshCw, Send, type LucideIcon } from 'lucide-react';
import { buildCopyAll, buildEnvBlock, type UatProduct } from '@/lib/uat';
import CredentialRow from '@/components/uat/CredentialRow';
import CopyButton from '@/components/uat/CopyButton';

const ICONS: Record<string, LucideIcon> = {
  upi_deeplink: Link2,
  enach_mandates: Landmark,
  upi_autopay: RefreshCw,
  checkout_page: CreditCard,
  pay_by_link: LinkIcon,
  payouts: Send,
};

export default function CredentialCard({ product, onCopied }: { product: UatProduct; onCopied?: (message: string) => void }) {
  const Icon = ICONS[product.key] ?? LinkIcon;
  return (
    <section
      aria-labelledby={`product-${product.key}`}
      className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md"
    >
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EFF6FF] text-[#0457F1]" aria-hidden="true">
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <h2 id={`product-${product.key}`} className="text-[16px] font-semibold text-[#0F172A]">{product.name}</h2>
          {product.description && <p className="mt-0.5 text-[13px] leading-relaxed text-[#64748B]">{product.description}</p>}
        </div>
      </div>

      <div className="mt-4 border-t border-slate-100">
        {product.fields.map((field) => (
          <CredentialRow key={`${product.key}-${field.label}`} field={field} onCopied={onCopied} />
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
        <CopyButton value={buildCopyAll(product.fields)} label={`all ${product.name} fields`} onCopied={onCopied}>Copy all</CopyButton>
        <CopyButton value={buildEnvBlock(product.fields)} label={`${product.name} as .env`} onCopied={onCopied}>Copy as .env</CopyButton>
      </div>
    </section>
  );
}
