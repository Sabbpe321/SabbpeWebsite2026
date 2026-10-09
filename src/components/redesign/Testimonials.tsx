'use client';

import { motion } from 'framer-motion';
import { Wrap } from './ui';
import HScroller from './HScroller';
import { TESTIMONIALS } from './testimonialsData';
import { Star, ShieldCheck, Quote } from 'lucide-react';

export default function Testimonials() {
  const items = TESTIMONIALS.filter((t) => t.approved);
  if (items.length === 0) return null;

  return (
    <section className="border-t border-slate-100 bg-[#F8FAFC] py-16 sm:py-20" aria-labelledby="testimonials-heading">
      <Wrap>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <HScroller
            label="testimonials"
            header={
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0457F1]">
                  Merchants on SabbPe
                </p>
                <h2
                  id="testimonials-heading"
                  className="mt-2 font-display text-[28px] font-bold leading-[1.15] tracking-[-0.025em] text-[#0F172A] sm:text-[36px]"
                >
                  What merchants say
                </h2>
                <p className="mt-2 max-w-xl text-sm text-[#64748B]">
                  Real feedback from businesses collecting and disbursing payments daily with SabbPe.
                </p>
              </div>
            }
          >
            {items.map((t, index) => (
              <motion.li
                key={t.business}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="group flex shrink-0 basis-[86%] snap-start flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs transition-all duration-200 hover:border-[#0457F1]/40 hover:shadow-md sm:basis-[calc(50%-8px)] lg:basis-[calc(33.333%-11px)]"
              >
                <div>
                  {/* Rating & Quote icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <Quote className="h-5 w-5 text-blue-200" />
                  </div>

                  <blockquote className="text-[15px] leading-relaxed text-[#1E293B]">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-[14px] font-bold text-[#0F172A]">{t.business}</p>
                      <ShieldCheck className="h-3.5 w-3.5 text-[#0457F1]" aria-label="Verified Merchant" />
                    </div>
                    {t.city && <p className="text-[12px] text-[#64748B]">{t.city}</p>}
                  </div>
                  <span className="shrink-0 rounded-full bg-[#EEF5FF] px-2.5 py-1 text-[11px] font-bold text-[#0457F1] border border-blue-100/80">
                    {t.product}
                  </span>
                </div>
              </motion.li>
            ))}
          </HScroller>
        </motion.div>
      </Wrap>
    </section>
  );
}
