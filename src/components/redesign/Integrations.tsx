import Link from 'next/link';
import clsx from 'clsx';
import { FOCUS, H2, Wrap } from './ui';

/** Confirm each name is cleared for public use before launch. */
const PARTNERS = ['Yes Bank', 'NTT Data', 'Easebuzz', 'Mswipe', 'Innoviti', 'PAX', 'Aisino', 'Vi', 'ValueDesign', 'Flipkart SuperCoins', 'Google Workspace'];

export default function Integrations() {
  return (
    <section className="border-t border-slate-200/60 bg-[#F8FAFC] text-[#0F172A]">
      <Wrap className="flex flex-col items-center gap-8 py-24 text-center">
        <h2 className={H2}>
          Connects with what you <span className="text-[#0457F1]">already use</span>
        </h2>
        <div className="grid w-full grid-cols-2 gap-3.5 text-[15px] font-bold sm:grid-cols-3 lg:grid-cols-4">
          {PARTNERS.map((partner) => (
            <div
              key={partner}
              className="rounded-xl border border-slate-200 bg-white px-4 py-5 text-[#0F172A] shadow-2xs transition-all hover:border-[#0457F1] hover:shadow-sm"
            >
              {partner}
            </div>
          ))}
          <div className="rounded-xl border border-dashed border-slate-300 bg-white/60 px-4 py-5 font-semibold text-[#64748B]">
            WooCommerce, coming soon
          </div>
        </div>
        <Link
          href="/saas/api"
          className={clsx(
            'rounded-lg bg-[#0457F1] px-6 py-3.5 font-semibold text-white shadow-sm transition-colors hover:bg-[#0339A8]',
            FOCUS,
          )}
        >
          See the API platform
        </Link>
      </Wrap>
    </section>
  );
}
