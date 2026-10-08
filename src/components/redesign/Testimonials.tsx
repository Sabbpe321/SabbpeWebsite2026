import { Wrap } from './ui';
import HScroller from './HScroller';
import { TESTIMONIALS } from './testimonialsData';

// Horizontal slider of approved merchant testimonials.
// This is a server component: drafts are filtered out here and never sent to the browser (see testimonialsData.ts).
export default function Testimonials() {
  const preview = process.env.NEXT_PUBLIC_SHOW_DRAFT_TESTIMONIALS === 'true';
  const items = TESTIMONIALS.filter((t) => t.approved || preview);
  if (items.length === 0) return null;

  return (
    <section className="border-t border-slate-100 bg-[#F8FAFC] py-16" aria-labelledby="testimonials-heading">
      <Wrap>
        <HScroller label="testimonials" header={<>
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0457F1]">Merchants on SabbPe</p>
          <h2 id="testimonials-heading" className="mt-2 font-display text-[30px] font-bold leading-[1.15] tracking-[-0.025em] text-[#0F172A] sm:text-[36px]">What merchants say</h2>
        </>}>
          {items.map((t) => (
            <li key={t.business} className="flex shrink-0 basis-[86%] snap-start flex-col rounded-2xl border border-slate-200 bg-white p-6 sm:basis-[calc(50%-8px)] lg:basis-[calc(33.333%-11px)]">
              {!t.approved && <span className="mb-3 w-fit rounded-full bg-[#FEF3C7] px-2.5 py-1 text-[12px] font-semibold text-[#92400E]">Draft, awaiting merchant approval</span>}
              <blockquote className="flex-1 text-[16px] leading-relaxed text-[#0F172A]">&ldquo;{t.quote}&rdquo;</blockquote>
              <div className="mt-5 border-t border-slate-100 pt-4">
                <p className="text-[15px] font-semibold text-[#0F172A]">{t.name || t.business}</p>
                <p className="min-h-[20px] text-[13px] text-[#64748B]">{[t.name ? t.business : '', t.city].filter(Boolean).join(', ')}</p>
                <p className="mt-2 w-fit rounded-full bg-[#EEF5FF] px-2.5 py-1 text-[12px] font-semibold text-[#0457F1]">{t.product}</p>
              </div>
            </li>
          ))}
        </HScroller>
      </Wrap>
    </section>
  );
}
